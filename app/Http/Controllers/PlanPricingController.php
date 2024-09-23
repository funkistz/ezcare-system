<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\PlanPricing;
use App\Models\VehicleGroup;
use App\Models\VehicleBrand;
use App\Models\VehicleModel;
use App\Http\Resources\DefaultResource;
use App\Models\Tax;
use App\Models\WarrantyPlan;
use App\Models\VehiclePowerCapacity;
use App\Models\VehicleCondition;
use Illuminate\Support\Facades\DB;
use App\Models\GeneralSetting;

class PlanPricingController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $data = PlanPricing::paginate(1000);
        $data = DefaultResource::collection($data);
        $settings = GeneralSetting::get()->keyBy('name');

        $brands = VehicleBrand::with([
            'vehicle_groups',
            'vehicle_groups.vehicle_models',
            'vehicle_groups.plan_pricings',
            'vehicle_groups.plan_pricings.vehicle_condition',
            'vehicle_groups.plan_pricings.vehicle_group',
            'vehicle_groups.plan_pricings.vehicle_power_capacity',
            'vehicle_groups.plan_pricings.warranty_plan',
        ])->get();

        $warranty_plans = WarrantyPlan::toSelectData();
        $vehicle_groups = VehicleGroup::toSelectData();
        $vehicle_power_capacities = VehiclePowerCapacity::toSelectData();
        $vehicle_conditions = VehicleCondition::toSelectData();
        $vehicle_brands = VehicleBrand::toSelectData();
        $vehicle_models = VehicleModel::toSelectData();

        return inertia('Settings/PlanPricing/Index', [
            'plan_pricings' => $data,
            'brands' => $brands,
            'warranty_plans' => $warranty_plans,
            'vehicle_groups' => $vehicle_groups,
            'vehicle_power_capacities' => $vehicle_power_capacities,
            'vehicle_conditions' => $vehicle_conditions,
            'vehicle_brands' => $vehicle_brands,
            'vehicle_models' => $vehicle_models,
            'settings' => $settings,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $attr = $request->toArray();

        $power_capacity = VehiclePowerCapacity::find($attr['vehicle_power_capacity_id']);

        if (!empty($power_capacity)) {
            $attr['power_type'] = $power_capacity->type;
            $attr['min_power'] = $power_capacity->min_power;
            $attr['max_power'] = $power_capacity->max_power;
        }

        try {
            PlanPricing::create($attr);

            return back()->with([
                'type' => 'success',
                'message' => 'Plan Pricing has been created',
            ]);
        } catch (\Illuminate\Database\QueryException $ex) {
            return back()->with([
                'type' => 'error',
                'message' => $ex->getMessage(),
            ]);
        }
    }

    /**
     * Display the specified resource.
     */
    public function calculatePrice(Request $request)
    {
        $vehicle_model_id = $request->input('vehicle_model_id');
        $vehicle_condition_id = $request->input('vehicle_condition_id');
        $warranty_plan_id = $request->input('warranty_plan_id');
        $tax_id = $request->input('tax_id');
        // $pricing_type = $request->input('pricing_type');

        $period = $request->input('period') ? (float)$request->input('period') : 1;
        $vehicle_power = $request->input('power_capacity');
        $vehicle_power_type = $request->input('power_type');
        $with_addon = $request->input('with_addon');

        $discounts = $request->input('discounts');
        $coverages = $request->input('coverages');
        // dd($discounts[0]);

        // if (!empty($vehicle_power) && !empty($vehicle_power_type)) {
        //     $vehicle_power_capacity = VehiclePowerCapacity::where('type', $vehicle_power_type)
        //         ->where('min_power', '<=', (int)$vehicle_power)
        //         ->where('max_power', '>=', (int)$vehicle_power)->first();
        // }

        $vehicle_group_ids = VehicleGroup::whereHas('vehicle_models', function ($q) use ($vehicle_model_id) {
            $q->where('vehicle_models.id', $vehicle_model_id);
        })->get()->pluck('id');

        if (!empty($vehicle_group_ids)  && $period) {

            // DB::connection()->enableQueryLog();

            $plan_pricing = PlanPricing::where('vehicle_condition_id', $vehicle_condition_id)
                ->where('warranty_plan_id', $warranty_plan_id)
                ->whereIn('vehicle_group_id', $vehicle_group_ids);

            if (!empty($vehicle_power) && !empty($vehicle_power_type)) {
                // dump($vehicle_power_type);
                // dd($vehicle_power);
                $plan_pricing->where('power_type', $vehicle_power_type)->where('min_power', '<=', (int)$vehicle_power)->where('max_power', '>=', (int)$vehicle_power);
            } else {
            }

            $plan_pricing =  $plan_pricing->first();

            if (empty($plan_pricing)) {
                return response()->json([
                    "status" => "success",
                    "data" => null,
                ]);
            }

            $calculatedPrice = $plan_pricing->calculateAllPrice($period, $tax_id, $with_addon, $discounts, $coverages);

            if (!empty($plan_pricing)) {
                return response()->json([
                    "status" => "success",
                    "data" => $calculatedPrice,
                    // "vehicle_power_capacity" => $vehicle_power_capacity
                ]);
            } else {
                return response()->json([
                    "data" => $request->toArray(),
                    "vehicle_model_id" => $vehicle_model_id,
                    // "vehicle_group" => $vehicle_group,
                    "message" => "No price found",
                    // "vehicle_power_capacity" => $vehicle_power_capacity,
                    "vehicle_power" => $vehicle_power,
                    "vehicle_power_type" => $vehicle_power_type,
                ])->setStatusCode(400);
            }
        }

        $warrantyPlan = WarrantyPlan::find($warranty_plan_id);

        return response()->json([
            "data" => $request->toArray(),
            "vehicle_model_id" => $vehicle_model_id,
            // "vehicle_group" => $vehicle_group,
            "message" => "No price found",
            // "vehicle_power_capacity" => $vehicle_power_capacity,
            "vehicle_power" => $vehicle_power,
            "vehicle_power_type" => $vehicle_power_type,
            "warranty_plan_min_year" => $warrantyPlan->year_package,
        ])->setStatusCode(400);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $model = PlanPricing::find($id);
        $attr = $request->toArray();

        $power_capacity = VehiclePowerCapacity::find($attr['vehicle_power_capacity_id']);

        $attr['power_type'] = $power_capacity->type;
        $attr['min_power'] = $power_capacity->min_power;
        $attr['max_power'] = $power_capacity->max_power;

        $model->update($attr);

        return back()->with([
            'type' => 'success',
            'message' => 'Plan Pricing has been updated',
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $model = PlanPricing::find($id);

        try {
            $model->forceDelete();

            return back()->with([
                'type' => 'success',
                'message' => 'Plan Pricing has been deleted',
            ]);
        } catch (\Illuminate\Database\QueryException $ex) {
            return back()->with([
                'type' => 'error',
                'message' => $ex->getMessage(),
            ]);
        }
    }
}

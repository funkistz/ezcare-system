<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\WarrantyPlan;
use App\Http\Resources\ConfigResource;
use App\Models\File;
use App\Models\OilType;
use App\Models\ServiceType;
use App\Models\VehicleCondition;
use App\Models\WarrantyFirstService;
use App\Models\WarrantyPlanFile;
use App\Models\WarrantyPlanItem;
use App\Models\WarrantyPlanOilType;

class WarrantyPlanController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $data = WarrantyPlan::with(['addonItems', 'addonItems.childs', 'coveredItems', 'coveredItems.childs', 'files', 'firstServices', 'oilTypes', 'claimLimits'])->paginate(1000);
        $data = ConfigResource::collection($data);

        $service_types = ServiceType::all();

        $conditions = VehicleCondition::toSelectData();

        $oil_types = OilType::toSelectData();

        return inertia('Settings/WarrantyPlan/Index', [
            'warranty_plans' => $data,
            'conditions' => $conditions,
            'service_types' => $service_types,
            'oil_types' => $oil_types,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $attr = $request->toArray();

        try {
            WarrantyPlan::create($attr);

            return back()->with([
                'type' => 'success',
                'message' => 'Warranty Plan has been created',
            ]);
        } catch (\Illuminate\Database\QueryException $ex) {
            return back()->with([
                'type' => 'error',
                'message' => $ex->getMessage(),
            ]);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $plan = WarrantyPlan::find($id);
        $attr = $request->toArray();

        $plan->update($attr);

        if (!empty($request->first_services)) {
            foreach ($request->first_services as $key => $first_service) {

                if (!empty($first_service['id'])) {
                    $fs = WarrantyFirstService::find($first_service['id']);
                    $fs->first_service_mileage =  $first_service['first_service_mileage'];
                    $fs->first_service_months =  $first_service['first_service_months'];
                    $fs->save();
                } else {
                    $fs = new WarrantyFirstService();
                    $fs->service_type_id =  $first_service['service_type_id'];
                    $fs->warranty_plan_id =  $first_service['warranty_plan_id'];
                    $fs->first_service_mileage =  !empty($first_service['first_service_mileage']) ? $first_service['first_service_mileage'] : null;
                    $fs->first_service_months =  !empty($first_service['first_service_months']) ? $first_service['first_service_months'] : null;
                    $fs->save();
                }
            }
        }

        if (!empty($request->oil_type_ids)) {
            foreach ($request->oil_type_ids as $key => $service_type_id) {

                $key = preg_replace('/[^0-9]/', '', $key);
                $curr_service_oils = $service_type_id;
                $service_oils = WarrantyPlanOilType::where('warranty_plan_id', $id)->where('service_type_id', $key)->get()->pluck('oil_type_id')->toArray();

                foreach ($curr_service_oils as $key2 => $curr_service_oil) {

                    if (!in_array($curr_service_oil, $service_oils)) {
                        // $res = WarrantyPlanOilType::where('warranty_plan_id', $id)->where('service_type_id', $key)->where('oil_type_id', $service_oil)->delete();
                        $plan_oil = new WarrantyPlanOilType();
                        $plan_oil->warranty_plan_id = $id;
                        $plan_oil->service_type_id = $key;
                        $plan_oil->oil_type_id = $curr_service_oil;
                        $plan_oil->save();
                    }
                }

                foreach ($service_oils as $key2 => $service_oil) {

                    if (!in_array($service_oil, $curr_service_oils)) {
                        $res = WarrantyPlanOilType::where('warranty_plan_id', $id)->where('service_type_id', $key)->where('oil_type_id', $service_oil)->delete();
                    }
                }
            }
        }

        return back()->with([
            'type' => 'success',
            'message' => 'Warranty Plan has been updated',
        ]);
    }

    public function addPDF(Request $request, string $id)
    {

        $warranty = WarrantyPlan::find($id);
        $attr = $request->toArray();
        $author = auth()->user()->id;

        $file = new WarrantyPlanFile();
        $file->name = $request->name;
        $file->warranty_plan_id = $id;
        $file->vehicle_condition_id = $request->vehicle_condition_id;
        $file->year = $request->year;
        $file->file_id = $request->id;
        $file->remarks = $request->remarks;
        $file->created_by = $author;
        $file->type = $request->type;
        $file->mime = $request->mime;
        $file->url = $request->url;
        $file->thumbnail_url = $request->thumbnail_url;
        $file->save();

        // $file = File::find($request->id);
        // $file = $policy->files()->attach($request->id);

        return back()->with([
            'type' => 'success',
            'message' => 'Attachment has been added',
        ]);
    }

    public function addItem(Request $request)
    {
        $attr = $request->toArray();

        // $CarBrand->update($attr);
        $item = new WarrantyPlanItem();
        $item->name = $attr['name'];
        $item->warranty_plan_id = $attr['warranty_plan_id'];
        $item->save();

        return back()->with([
            'type' => 'success',
            'message' => 'Item',
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $model = WarrantyPlan::find($id);

        if (!$model->plan_pricings->isEmpty()) {
            return back()->with([
                'type' => 'error',
                'message' => 'There is plan pricing that use this record.',
            ]);
        }

        try {
            $model->forceDelete();

            return back()->with([
                'type' => 'success',
                'message' => 'Warranty Plan has been deleted',
            ]);
        } catch (\Illuminate\Database\QueryException $ex) {
            return back()->with([
                'type' => 'error',
                'message' => $ex->getMessage(),
            ]);
        }
    }
}

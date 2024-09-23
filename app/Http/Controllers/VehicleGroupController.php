<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\VehicleBrand;
use App\Models\VehicleGroup;
use App\Http\Resources\DefaultResource;

class VehicleGroupController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $groups = DefaultResource::collection(VehicleGroup::with(['vehicle_models', 'vehicle_brand'])->paginate(1000));
        $brands = VehicleBrand::active()->toSelectData();

        return inertia('Settings/ModelGroup/Index', [
            'brands' => $brands,
            'groups' => $groups,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $attr = $request->toArray();

        try {
            $group = new VehicleGroup();
            $group->name = $attr['name'];
            $group->description = $attr['description'];
            $group->vehicle_brand_id = $attr['vehicle_brand_id'];
            $group->save();

            $group->vehicle_models()->sync($attr['vehicle_models']);
            $group->save();

            return back()->with([
                'type' => 'success',
                'message' => 'Vehicle Group has been created',
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
        $attr = $request->toArray();

        try {
            $group = VehicleGroup::find($id);
            $group->name = $attr['name'];
            $group->description = $attr['description'];
            $group->vehicle_brand_id = $attr['vehicle_brand_id'];
            $group->save();

            $group->vehicle_models()->sync($attr['vehicle_models']);
            $group->save();

            return back()->with([
                'type' => 'success',
                'message' => 'Vehicle Group has been updated',
            ]);
        } catch (\Illuminate\Database\QueryException $ex) {
            return back()->with([
                'type' => 'error',
                'message' => $ex->getMessage(),
            ]);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $model = VehicleGroup::find($id);

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
                'message' => 'Vehicle Group has been deleted',
            ]);
        } catch (\Illuminate\Database\QueryException $ex) {
            return back()->with([
                'type' => 'error',
                'message' => $ex->getMessage(),
            ]);
        }
    }
}

<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\VehicleCondition;
use App\Http\Resources\DefaultResource;

class VehicleConditionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $data = VehicleCondition::paginate(1000);
        $data = DefaultResource::collection($data);

        return inertia('Settings/VehicleCondition/Index', [
            'vehicle_conditions' => $data,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $attr = $request->toArray();

        try {
            VehicleCondition::create($attr);

            return back()->with([
                'type' => 'success',
                'message' => 'Vehicle Condition has been created',
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
        $CarBrand = VehicleCondition::find($id);
        $attr = $request->toArray();

        $CarBrand->update($attr);

        return back()->with([
            'type' => 'success',
            'message' => 'Vehicle Condition has been updated',
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $model = VehicleCondition::find($id);

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
                'message' => 'Warranty Condition has been deleted',
            ]);
        } catch (\Illuminate\Database\QueryException $ex) {
            return back()->with([
                'type' => 'error',
                'message' => $ex->getMessage(),
            ]);
        }
    }
}

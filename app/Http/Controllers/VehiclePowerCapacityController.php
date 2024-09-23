<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Resources\DefaultResource;
use App\Models\VehiclePowerCapacity;

class VehiclePowerCapacityController extends Controller
{
    public function index()
    {
        $vehicle_powers = DefaultResource::collection(VehiclePowerCapacity::paginate(1000));

        return inertia('Settings/VehiclePower/Index', [
            'vehicle_powers' =>  $vehicle_powers,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $attr = $request->toArray();

        try {
            VehiclePowerCapacity::create($attr);

            return back()->with([
                'type' => 'success',
                'message' => 'Vehicle Power Capacity has been created',
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
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $CarBrand = VehiclePowerCapacity::find($id);
        $attr = $request->toArray();

        $CarBrand->update($attr);

        return back()->with([
            'type' => 'success',
            'message' => 'Vehicle Power Capacity has been updated',
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $model = VehiclePowerCapacity::find($id);

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
                'message' => 'Vehicle Power Capacity has been deleted',
            ]);
        } catch (\Illuminate\Database\QueryException $ex) {
            return back()->with([
                'type' => 'error',
                'message' => $ex->getMessage(),
            ]);
        }
    }
}

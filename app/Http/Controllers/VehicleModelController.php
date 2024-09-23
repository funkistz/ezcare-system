<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\VehicleModel;

class VehicleModelController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $attr = $request->toArray();

        try {
            VehicleModel::create($attr);

            return back()->with([
                'type' => 'success',
                'message' => 'Vehicle model has been created',
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
        $CarBrand = VehicleModel::find($id);
        $attr = $request->toArray();

        $CarBrand->update($attr);

        return back()->with([
            'type' => 'success',
            'message' => 'Vehicle model has been updated',
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $model = VehicleModel::find($id);

        if (!$model->vehicle_groups->isEmpty()) {
            return back()->with([
                'type' => 'error',
                'message' => 'There is vehicle group that use this record.',
            ]);
        }

        try {
            $model->forceDelete();

            return back()->with([
                'type' => 'success',
                'message' => 'Vehicle model has been deleted',
            ]);
        } catch (\Illuminate\Database\QueryException $ex) {
            return back()->with([
                'type' => 'error',
                'message' => $ex->getMessage(),
            ]);
        }
    }
}

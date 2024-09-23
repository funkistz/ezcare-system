<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\VehicleVariant;

class VehicleVariantController extends Controller
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
            VehicleVariant::create($attr);

            return back()->with([
                'type' => 'success',
                'message' => 'Vehicle variant has been created',
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
        $CarBrand = VehicleVariant::find($id);
        $attr = $request->toArray();

        $CarBrand->update($attr);

        return back()->with([
            'type' => 'success',
            'message' => 'Vehicle variant has been updated',
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $model = VehicleVariant::find($id);

        try {
            $model->forceDelete();

            return back()->with([
                'type' => 'success',
                'message' => 'Vehicle variant has been deleted',
            ]);
        } catch (\Illuminate\Database\QueryException $ex) {
            return back()->with([
                'type' => 'error',
                'message' => $ex->getMessage(),
            ]);
        }
    }
}

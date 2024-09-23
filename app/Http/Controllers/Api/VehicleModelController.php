<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\VehicleModel;
use App\Models\VehicleBrand;

class VehicleModelController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
    }

    public function findByBrandId(Request $request)
    {
        $brand = VehicleBrand::find($request->brand_id);

        if (!empty($brand)) {
            $models = VehicleModel::where('brand_code', $brand->code)->toSelectData();
        } else {
            $models = [];
        }

        return response()->json([
            "status" => "success",
            "data" => $models,
            "brand_id" => $request->brand_id,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
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
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}

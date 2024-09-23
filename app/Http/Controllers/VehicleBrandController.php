<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\VehicleBrand;
use App\Http\Resources\ConfigResource;

class VehicleBrandController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // $japanBrand = ConfigResource::collection(VehicleBrand::with(['models', 'variants'])->where('type', 'japanese')->orderBy('name')->paginate(1000));
        // $contiBrand = ConfigResource::collection(VehicleBrand::with(['models', 'variants'])->where('type', 'continental')->orderBy('name')->paginate(1000));
        // $localBrand = ConfigResource::collection(VehicleBrand::with(['models', 'variants'])->where('type', 'local')->orderBy('name')->paginate(1000));
        // $koreanBrand = ConfigResource::collection(VehicleBrand::with(['models', 'variants'])->where('type', 'korean')->orderBy('name')->paginate(1000));
        $brands = ConfigResource::collection(VehicleBrand::with(['models', 'variants'])->orderBy('name')->paginate(1000));

        return inertia('Settings/VehicleBrand/Index', [
            // 'japan_brands' =>  $japanBrand,
            // 'conti_brands' =>  $contiBrand,
            // 'local_brand' =>  $localBrand,
            // 'korean_brand' =>  $koreanBrand,
            'brands' =>  $brands,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
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
            VehicleBrand::create($attr);

            return back()->with([
                'type' => 'success',
                'message' => 'Vehicle Brand has been created',
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
        $CarBrand = VehicleBrand::find($id);
        $attr = $request->toArray();

        $CarBrand->update($attr);

        return back()->with([
            'type' => 'success',
            'message' => 'Vehicle brand has been updated',
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $model = VehicleBrand::find($id);

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
                'message' => 'Vehicle brand has been deleted',
            ]);
        } catch (\Illuminate\Database\QueryException $ex) {
            return back()->with([
                'type' => 'error',
                'message' => $ex->getMessage(),
            ]);
        }
    }
}

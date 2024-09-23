<?php

namespace App\Http\Controllers;

use App\Http\Resources\DefaultResource;
use App\Models\OilType;
use App\Models\ServiceType;
use Illuminate\Http\Request;

class OilTypeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $data = OilType::with(['serviceType'])->paginate(1000);
        $data = DefaultResource::collection($data);

        $service_types = ServiceType::toSelectData();

        return inertia('Settings/OilType/Index', [
            'oil_types' => $data,
            'service_types' => $service_types,
        ]);
    }

    public function store(Request $request)
    {
        $attr = $request->toArray();

        try {
            OilType::create($attr);

            return back()->with([
                'type' => 'success',
                'message' => 'Oil Type has been created',
            ]);
        } catch (\Illuminate\Database\QueryException $ex) {
            return back()->with([
                'type' => 'error',
                'message' => $ex->getMessage(),
            ]);
        }
    }

    public function update(Request $request, string $id)
    {
        $CarBrand = OilType::find($id);
        $attr = $request->toArray();

        $CarBrand->update($attr);

        return back()->with([
            'type' => 'success',
            'message' => 'Oil Type has been updated',
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $model = OilType::find($id);

        try {
            $model->forceDelete();

            return back()->with([
                'type' => 'success',
                'message' => 'Oil Type has been deleted',
            ]);
        } catch (\Illuminate\Database\QueryException $ex) {
            return back()->with([
                'type' => 'error',
                'message' => $ex->getMessage(),
            ]);
        }
    }
}

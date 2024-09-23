<?php

namespace App\Http\Controllers;

use App\Models\CarParts;
use Illuminate\Http\Request;
use CountryState;
use App\Http\Resources\DefaultResource;
use App\Models\GeneralSetting;
use App\Models\Supplier;
use App\Models\VehicleBrand;
use App\Models\VehicleModel;
use Illuminate\Support\Facades\DB;

class CarPartsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $data = CarParts::with(['supplier', 'VehicleModel', 'VehicleBrand']);

        $searchModel = $request->model ? '%' . $request->model . '%' : null;
        $searchName = $request->name ? '%' . $request->name . '%' : null;
        $searchYear = $request->year ? '%' . $request->year . '%' : null;


        if ($searchName) {
            $data->where('name', 'LIKE', $searchName);
        }

        if ($searchModel) {
            $data->where('model_id', 'LIKE', $searchModel);
        }

        if ($searchYear) {
            $data->where('year', 'LIKE', $searchYear);
        }

        $data = $data->paginate(30);
        $data = DefaultResource::collection($data);
        $costPrice = GeneralSetting::where('name', 'part_cost_price')->value('value');

        $brand = VehicleBrand::select([DB::raw('CAST(id AS CHAR) as value'), 'name AS label'])
            ->where('is_active', 1)
            ->orderBy('name')
            ->get();

        $model = VehicleModel::select([DB::raw('CAST(id AS CHAR) as value'), 'name AS label'])
            ->where('is_active', 1)
            ->orderBy('name')
            ->get();

        $suppliers = Supplier::getListCarParts();


        return inertia('CarParts/Index', [
            'carparts' => $data,
            'brand' => $brand,
            'model' => $model,
            'costPrice' => $costPrice,
            'suppliers' => $suppliers,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $brand = VehicleBrand::select([DB::raw('CAST(id AS CHAR) as value'), 'name AS label'])
            ->where('is_active', 1)
            ->orderBy('name')
            ->get();

        $model = VehicleModel::select([DB::raw('CAST(id AS CHAR) as value'), 'name AS label'])
            ->where('is_active', 1)
            ->orderBy('name')
            ->get();

        $suppliers = Supplier::getListCarParts();
        $costPrice = GeneralSetting::where('name', 'part_cost_price')->value('value');
        $countries_temp = CountryState::getCountries();
        $countries = [];

        foreach ($countries_temp as $x => $val) {
            array_push($countries, [
                'label' => $val,
                'value' => $x,
            ]);
        }

        return inertia('CarParts/Edit', [
            'brand' => $brand,
            'model' => $model,
            'costPrice' => $costPrice,
            'suppliers' => $suppliers,
            'countries' => $countries,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $attr = $request->toArray();

        try {
            CarParts::create($attr);
            return back()->with([
                'type' => 'success',
                'message' => 'Car Parts has been created',
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
        $data = CarParts::with(['supplier', 'VehicleModel', 'VehicleBrand'])->find($id);
        $brand = VehicleBrand::select([DB::raw('CAST(id AS CHAR) as value'), 'name AS label'])
            ->where('is_active', 1)
            ->orderBy('name')
            ->get();

        $model = VehicleModel::select([DB::raw('CAST(id AS CHAR) as value'), 'name AS label'])
            ->where('is_active', 1)
            ->orderBy('name')
            ->get();

        $suppliers = Supplier::getListCarParts();
        $costPrice = GeneralSetting::where('name', 'part_cost_price')->value('value');
        $countries_temp = CountryState::getCountries();
        $countries = [];

        foreach ($countries_temp as $x => $val) {
            array_push($countries, [
                'label' => $val,
                'value' => $x,
            ]);
        }

        return inertia('CarParts/Edit', [
            'data' => $data,
            'brand' => $brand,
            'model' => $model,
            'costPrice' => $costPrice,
            'suppliers' => $suppliers,
            'countries' => $countries,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $dealer = CarParts::find($id);
        $attr = $request->toArray();

        $dealer->update($attr);

        return back()->with([
            'type' => 'success',
            'message' => 'Car Parts has been updated',
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $model = CarParts::find($id);

        try {
            $model->forceDelete();

            return back()->with([
                'type' => 'success',
                'message' => 'Car Parts has been deleted',
            ]);
        } catch (\Illuminate\Database\QueryException $ex) {
            return back()->with([
                'type' => 'error',
                'message' => $ex->getMessage(),
            ]);
        }
    }
}

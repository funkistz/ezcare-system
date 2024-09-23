<?php

namespace App\Http\Controllers;

use App\Http\Resources\DefaultResource;
use App\Models\Supplier;
use Illuminate\Http\Request;
use CountryState;
use App\Models\Address;

class SupplierController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $data = Supplier::with(['mainAddress']);
        if ($request->search) {
            $search = '%' . $request->search . '%';
            $data = $data->orWhere('name', 'LIKE', $search);
        }

        $data =  $data->paginate(30);
        $data = DefaultResource::collection($data);

        $countries_temp = CountryState::getCountries();
        $countries = [];

        foreach ($countries_temp as $x => $val) {
            array_push($countries, [
                'label' => $val,
                'value' => $x,
            ]);
        }

        return inertia('Supplier/Index', [
            'suppliers' => $data,
            'countries' => $countries,
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
            $supplier = Supplier::create($attr);

            $address = new Address();
            $address->line1 = $attr['line1'];
            $address->line2 = !empty($attr['line2']) ? $attr['line2'] : '';
            $address->line3 = !empty($attr['line3']) ? $attr['line3'] : '';
            $address->city = $attr['city'];
            $address->postcode = $attr['postcode'];
            $address->country = $attr['country'];
            $address->state = $attr['state'];
            $address->is_primary = true;
            $address->addressable_type = Supplier::class;
            $address->addressable_id = $supplier->id;
            $address->save();

            return back()->with([
                'type' => 'success',
                'message' => 'Supplier has been created',
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
        $dealer = Supplier::find($id);
        $attr = $request->toArray();

        $dealer->update($attr);

        $address = $dealer->mainAddress;
        $address->line1 = $attr['line1'];
        $address->line2 = !empty($attr['line2']) ? $attr['line2'] : '';
        $address->line3 = !empty($attr['line3']) ? $attr['line3'] : '';
        $address->city = $attr['city'];
        $address->postcode = $attr['postcode'];
        $address->country = $attr['country'];
        $address->state = $attr['state'];
        $address->save();

        return back()->with([
            'type' => 'success',
            'message' => 'Supplier has been updated',
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $model = Supplier::find($id);

        try {
            $model->forceDelete();

            return back()->with([
                'type' => 'success',
                'message' => 'Supplier has been deleted',
            ]);
        } catch (\Illuminate\Database\QueryException $ex) {
            return back()->with([
                'type' => 'error',
                'message' => $ex->getMessage(),
            ]);
        }
    }
}

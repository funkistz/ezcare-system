<?php

namespace App\Http\Controllers;

use App\Models\Workshop;
use Illuminate\Http\Request;
use App\Http\Resources\DefaultResource;
use CountryState;
use App\Models\Address;

class WorkshopController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $data = Workshop::with(['mainAddress'])->paginate(1000);
        $data = DefaultResource::collection($data);
        $countries_temp = CountryState::getCountries();
        $countries = [];

        foreach ($countries_temp as $x => $val) {
            array_push($countries, [
                'label' => $val,
                'value' => $x,
            ]);
        }

        return inertia('Settings/Workshop/Index', [
            'workshops' => $data,
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
            $workshop = Workshop::create($attr);

            $address = new Address();
            $address->line1 = $attr['line1'];
            $address->line2 = !empty($attr['line2']) ? $attr['line2'] : '';
            $address->line3 = !empty($attr['line3']) ? $attr['line3'] : '';
            $address->city = $attr['city'];
            $address->postcode = $attr['postcode'];
            $address->country = $attr['country'];
            $address->state = $attr['state'];
            $address->is_primary = true;
            $address->addressable_type = Workshop::class;
            $address->addressable_id = $workshop->id;
            $address->save();

            return back()->with([
                'type' => 'success',
                'message' => 'Workshop has been created',
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
        $workshop  = Workshop::find($id);
        $attr = $request->toArray();

        $workshop->update($attr);

        if (!empty($workshop->mainAddress)) {
            $address = $workshop->mainAddress;
            $address->line1 = $attr['line1'];
            $address->line2 = !empty($attr['line2']) ? $attr['line2'] : '';
            $address->line3 = !empty($attr['line3']) ? $attr['line3'] : '';
            $address->city = $attr['city'];
            $address->postcode = $attr['postcode'];
            $address->country = $attr['country'];
            $address->state = $attr['state'];
            $address->is_primary = true;
            $address->addressable_type = Workshop::class;
            $address->addressable_id = $workshop->id;
            $address->save();
        } else {
            $address = new Address();
            $address->line1 = $attr['line1'];
            $address->line2 = !empty($attr['line2']) ? $attr['line2'] : '';
            $address->line3 = !empty($attr['line3']) ? $attr['line3'] : '';
            $address->city = $attr['city'];
            $address->postcode = $attr['postcode'];
            $address->country = $attr['country'];
            $address->state = $attr['state'];
            $address->is_primary = true;
            $address->addressable_type = Workshop::class;
            $address->addressable_id = $workshop->id;
            $address->save();
        }

        return back()->with([
            'type' => 'success',
            'message' => 'Workshop has been updated',
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $model = Workshop::find($id);

        try {
            $model->forceDelete();

            return back()->with([
                'type' => 'success',
                'message' => 'Workshop has been deleted',
            ]);
        } catch (\Illuminate\Database\QueryException $ex) {
            return back()->with([
                'type' => 'error',
                'message' => $ex->getMessage(),
            ]);
        }
    }
}

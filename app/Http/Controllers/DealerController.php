<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Dealer;
use App\Http\Resources\DefaultResource;
use CountryState;
use App\Models\Address;

class DealerController extends Controller
{
    public function index(Request $request)
    {
        $data = Dealer::with(['mainAddress']);
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

        return inertia('Settings/Dealer/Index', [
            'dealers' => $data,
            'countries' => $countries,
        ]);
    }

    public function store(Request $request)
    {
        $attr = $request->toArray();

        try {
            $dealer = Dealer::create($attr);

            $address = new Address();
            $address->line1 = $attr['line1'];
            $address->line2 = !empty($attr['line2']) ? $attr['line2'] : '';
            $address->line3 = !empty($attr['line3']) ? $attr['line3'] : '';
            $address->city = $attr['city'];
            $address->postcode = $attr['postcode'];
            $address->country = $attr['country'];
            $address->state = $attr['state'];
            $address->is_primary = true;
            $address->addressable_type = Dealer::class;
            $address->addressable_id = $dealer->id;
            $address->save();

            return back()->with([
                'type' => 'success',
                'message' => 'Dealer has been created',
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
        $dealer = Dealer::find($id);
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
            'message' => 'Dealer has been updated',
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $model = Dealer::find($id);

        try {
            $model->forceDelete();

            return back()->with([
                'type' => 'success',
                'message' => 'Dealer has been deleted',
            ]);
        } catch (\Illuminate\Database\QueryException $ex) {
            return back()->with([
                'type' => 'error',
                'message' => $ex->getMessage(),
            ]);
        }
    }
}

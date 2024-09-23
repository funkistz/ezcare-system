<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Branch;
use App\Http\Resources\DefaultResource;
use App\Models\Address;
use Illuminate\Support\Carbon;
use CountryState;

class BranchController extends Controller
{
    public function index()
    {
        $data = Branch::with(['mainAddress'])->paginate(1000);
        $data = DefaultResource::collection($data);

        $countries_temp = CountryState::getCountries();
        $countries = [];

        foreach ($countries_temp as $x => $val) {
            array_push($countries, [
                'label' => $val,
                'value' => $x,
            ]);
        }

        return inertia('Settings/Branch/Index', [
            'branches' => $data,
            'countries' => $countries,
        ]);
    }

    public function store(Request $request)
    {
        $attr = $request->toArray();

        try {
            $branch = Branch::create($attr);

            $address = new Address();
            $address->line1 = $attr['line1'];
            $address->line2 = !empty($attr['line2']) ? $attr['line2'] : '';
            $address->line3 = !empty($attr['line3']) ? $attr['line3'] : '';
            $address->city = $attr['city'];
            $address->postcode = $attr['postcode'];
            $address->country = $attr['country'];
            $address->state = $attr['state'];
            $address->is_primary = true;
            $address->addressable_type = Branch::class;
            $address->addressable_id = $branch->id;
            $address->save();

            return back()->with([
                'type' => 'success',
                'message' => 'Branch has been created',
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
        $branch = Branch::find($id);
        $attr = $request->toArray();

        if (!empty($branch->mainAddress)) {
            $address = $branch->mainAddress;
            $address->line1 = $attr['line1'];
            $address->line2 = !empty($attr['line2']) ? $attr['line2'] : '';
            $address->line3 = !empty($attr['line3']) ? $attr['line3'] : '';
            $address->city = $attr['city'];
            $address->postcode = $attr['postcode'];
            $address->country = $attr['country'];
            $address->state = $attr['state'];
            $address->is_primary = true;
            $address->addressable_type = Branch::class;
            $address->addressable_id = $branch->id;
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
            $address->addressable_type = Branch::class;
            $address->addressable_id = $branch->id;
            $address->save();
        }

        $branch->update($attr);

        return back()->with([
            'type' => 'success',
            'message' => 'Branch has been updated',
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $model = Branch::find($id);

        try {
            $model->forceDelete();

            return back()->with([
                'type' => 'success',
                'message' => 'Branch has been deleted',
            ]);
        } catch (\Illuminate\Database\QueryException $ex) {
            return back()->with([
                'type' => 'error',
                'message' => $ex->getMessage(),
            ]);
        }
    }
}

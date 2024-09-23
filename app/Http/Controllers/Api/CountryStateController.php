<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use CountryState;

class CountryStateController extends Controller
{

    public function countries()
    {
        $countries_temp = CountryState::getCountries();
        $countries = [];

        foreach ($countries_temp as $x => $val) {
            array_push($countries, [
                'label' => $val,
                'value' => (string)$x,
            ]);
        }

        return response()->json([
            "status" => "success",
            "data" => $countries,
        ]);
    }

    public function states(string $country)
    {
        $states_temp = CountryState::getStates($country);
        $states = [];

        foreach ($states_temp as $x => $val) {
            array_push($states, [
                'label' => $val,
                'value' => strtolower((string)$val),
            ]);
        }

        return response()->json([
            "status" => "success",
            "data" => $states,
        ]);
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

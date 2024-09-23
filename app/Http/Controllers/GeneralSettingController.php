<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Resources\DefaultResource;
use App\Models\GeneralSetting;
use App\Models\Tax;

class GeneralSettingController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $settings = GeneralSetting::get()->keyBy('name');

        $taxes = Tax::toSelectData();
        $currency_symbols = [
            [
                'label' => 'RM',
                'value' => 'RM',
            ],
            [
                'label' => 'Rp',
                'value' => 'Rp',
            ],
        ];
        $phone_country_codes = [
            [
                'label' => '60',
                'value' => '60',
            ],
            [
                'label' => '62',
                'value' => '62',
            ],
        ];

        return inertia('Settings/GeneralSetting/Index', [
            'settings' =>  $settings,
            'taxes' =>  $taxes,
            'currency_symbols' => $currency_symbols,
            'phone_country_codes' => $phone_country_codes
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $attr = $request->toArray();

        $tax = GeneralSetting::where('name', 'tax')->first();
        $tax->value = $attr['tax'];
        $tax->save();

        $tax = GeneralSetting::where('name', 'currency_symbol')->first();
        $tax->value = $attr['currency_symbol'];
        $tax->save();

        $tax = GeneralSetting::where('name', 'phone_country_code')->first();
        $tax->value = $attr['phone_country_code'];
        $tax->save();

        $tax = GeneralSetting::where('name', 'vehicle_max_year')->first();
        $tax->value = $attr['vehicle_max_year'];
        $tax->save();

        // $CarBrand = GeneralSetting::find($id);
        // $attr = $request->toArray();

        // $CarBrand->update($attr);

        return back()->with([
            'type' => 'success',
            'message' => 'General setting been updated',
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

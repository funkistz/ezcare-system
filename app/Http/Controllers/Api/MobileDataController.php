<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\GeneralSetting;
use App\Models\MobileBanner;
use Illuminate\Http\Request;

class MobileDataController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function banners()
    {
        $banners = MobileBanner::all();

        return response()->json([
            "status" => "success",
            "data" => $banners,
        ]);
    }

    public function settings()
    {
        $settings = GeneralSetting::get()->keyBy('name');

        return response()->json([
            "status" => "success",
            "data" => $settings,
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

<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\CarParts;
use Illuminate\Http\Request;

class CarPartsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $parts = new CarParts();

        if (!empty($request->model)) {
            $parts = $parts->where('model_id', $request->model);
        }
        if (!empty($request->year)) {
            $parts = $parts->where('year', $request->year);
        }

        $parts = $parts->get();
        $array = [];

        foreach ($parts as $part) {
            $array[] = [
                'label' => $part->name,
                'value' => (string)$part->id,
                'name' => $part->name,
                'amount' => $part->selling_price,
                'id' => $part->id,
            ];
        }

        return response()->json([
            "status" => "success",
            "data" => $array,
            "model" => $request->model,
            "year" => $request->year,
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

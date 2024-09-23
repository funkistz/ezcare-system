<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\WarrantyPlanSubplan;

class WarrantyPlanSubPlanController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
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
            WarrantyPlanSubplan::create($attr);

            return back()->with([
                'type' => 'success',
                'message' => 'Warranty Sub Plan has been created',
            ]);
        } catch (\Illuminate\Database\QueryException $ex) {
            return back()->with([
                'type' => 'error',
                'message' => $ex->getMessage(),
            ]);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $data = WarrantyPlanSubplan::find($id);
        $attr = $request->toArray();

        $data->update($attr);

        return back()->with([
            'type' => 'success',
            'message' => 'Warranty Sub Plan has been updated',
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}

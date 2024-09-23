<?php

namespace App\Http\Controllers;

use App\Models\WarrantyPlanItemChild;
use Illuminate\Http\Request;

class WarrantyPlanItemChildController extends Controller
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

            $exist = WarrantyPlanItemChild::where('code', $attr['code'])->where('warranty_plan_item_id', $attr['warranty_plan_item_id'])->first();

            if (!empty($exist)) {
                return back()->with([
                    'type' => 'error',
                    'message' => 'Item already exist',
                ]);
            }

            WarrantyPlanItemChild::create($attr);

            return back()->with([
                'type' => 'success',
                'message' => 'Child has been created',
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
        $item = WarrantyPlanItemChild::find($id);
        $attr = $request->toArray();

        $item->update($attr);

        return back()->with([
            'type' => 'success',
            'message' => 'Child has been updated',
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $item = WarrantyPlanItemChild::find($id)->delete();

        return back()->with([
            'type' => 'success',
            'message' => 'Child has been deleted',
        ]);
    }
}

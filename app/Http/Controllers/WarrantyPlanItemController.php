<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\WarrantyPlanItem;

class WarrantyPlanItemController extends Controller
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

            $exist = WarrantyPlanItem::where('code', $attr['code'])->where('warranty_plan_id', $attr['warranty_plan_id'])->first();

            if (!empty($exist)) {
                return back()->with([
                    'type' => 'error',
                    'message' => 'Item already exist',
                ]);
            }

            WarrantyPlanItem::create($attr);

            return back()->with([
                'type' => 'success',
                'message' => 'Item has been created',
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
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $item = WarrantyPlanItem::find($id);
        $attr = $request->toArray();

        $item->update($attr);

        return back()->with([
            'type' => 'success',
            'message' => 'Item has been updated',
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $item = WarrantyPlanItem::find($id)->delete();

        return back()->with([
            'type' => 'success',
            'message' => 'Item has been deleted',
        ]);
    }
}

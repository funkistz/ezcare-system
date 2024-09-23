<?php

namespace App\Http\Controllers;

use App\Models\WarrantyPlanClaimLimit;
use Illuminate\Http\Request;

class WarrantyPlanClaimLimitController extends Controller
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
        $claim_limits = $request->claim_limits;

        foreach ($claim_limits as $key => $claim_limit) {

            if (!empty($claim_limit['id'])) {
                $new_claim = WarrantyPlanClaimLimit::find($claim_limit['id']);
            } else {
                $new_claim = new WarrantyPlanClaimLimit();
            }

            $new_claim->warranty_plan_id = $request->warranty_plan_id;
            $new_claim->year = $claim_limit['year'];
            $new_claim->amount_limit = $claim_limit['amount_limit'];
            $new_claim->save();
        }

        return back()->with([
            'type' => 'success',
            'message' => 'Warranty Plan has been updated',
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

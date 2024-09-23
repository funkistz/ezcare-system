<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\PlanDiscount;
use App\Http\Resources\DefaultResource;

class PlanDiscountController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $data = PlanDiscount::with([])->paginate(1000);
        $data = DefaultResource::collection($data);

        return inertia('Settings/PlanDiscount/Index', [
            'taxes' => $data,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $attr = $request->toArray();

        try {
            PlanDiscount::create($attr);

            return back()->with([
                'type' => 'success',
                'message' => 'Plan Discount has been created',
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
        $model = PlanDiscount::find($id);
        $attr = $request->toArray();

        $model->update($attr);

        return back()->with([
            'type' => 'success',
            'message' => 'Plan Discount has been updated',
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $model = PlanDiscount::find($id);

        try {
            $model->delete();

            return back()->with([
                'type' => 'success',
                'message' => 'Plan Discount has been deleted',
            ]);
        } catch (\Illuminate\Database\QueryException $ex) {
            return back()->with([
                'type' => 'error',
                'message' => $ex->getMessage(),
            ]);
        }
    }
}

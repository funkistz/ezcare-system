<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\FreePromo;
use App\Http\Resources\DefaultResource;

class FreePromoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $data = FreePromo::with([])->paginate(1000);
        $data = DefaultResource::collection($data);

        return inertia('Settings/FreePromo/Index', [
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
            FreePromo::create($attr);

            return back()->with([
                'type' => 'success',
                'message' => 'Free Promo has been created',
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
        $model = FreePromo::find($id);
        $attr = $request->toArray();

        $model->update($attr);

        return back()->with([
            'type' => 'success',
            'message' => 'Free Promo has been updated',
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $model = FreePromo::find($id);

        try {
            $model->delete();

            return back()->with([
                'type' => 'success',
                'message' => 'Free Promo has been deleted',
            ]);
        } catch (\Illuminate\Database\QueryException $ex) {
            return back()->with([
                'type' => 'error',
                'message' => $ex->getMessage(),
            ]);
        }
    }
}

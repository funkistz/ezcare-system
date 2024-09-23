<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Tax;
use App\Http\Resources\ConfigResource;

class TaxController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $data = Tax::with([])->paginate(1000);
        $data = ConfigResource::collection($data);

        return inertia('Settings/Tax/Index', [
            'taxes' => $data,
        ]);
    }

    public function store(Request $request)
    {
        $attr = $request->toArray();

        try {
            Tax::create($attr);

            return back()->with([
                'type' => 'success',
                'message' => 'Tax has been created',
            ]);
        } catch (\Illuminate\Database\QueryException $ex) {
            return back()->with([
                'type' => 'error',
                'message' => $ex->getMessage(),
            ]);
        }
    }

    public function update(Request $request, string $id)
    {
        $CarBrand = Tax::find($id);
        $attr = $request->toArray();

        $CarBrand->update($attr);

        return back()->with([
            'type' => 'success',
            'message' => 'Tax has been updated',
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $model = Tax::find($id);

        try {
            $model->forceDelete();

            return back()->with([
                'type' => 'success',
                'message' => 'Tax has been deleted',
            ]);
        } catch (\Illuminate\Database\QueryException $ex) {
            return back()->with([
                'type' => 'error',
                'message' => $ex->getMessage(),
            ]);
        }
    }
}

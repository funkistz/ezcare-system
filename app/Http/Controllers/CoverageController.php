<?php

namespace App\Http\Controllers;

use App\Http\Resources\DefaultResource;
use App\Models\Coverage;
use Illuminate\Http\Request;

class CoverageController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $data = Coverage::with(['document'])->paginate(1000);
        $data = DefaultResource::collection($data);

        return inertia('Settings/Coverage/Index', [
            'coverages' => $data,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $attr = $request->toArray();

        try {
            Coverage::create($attr);

            return back()->with([
                'type' => 'success',
                'message' => 'Coverage has been created',
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
        $model = Coverage::find($id);
        $attr = $request->toArray();

        $model->update($attr);

        return back()->with([
            'type' => 'success',
            'message' => 'Coverage has been updated',
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $model = Coverage::find($id);

        try {
            $model->delete();

            return back()->with([
                'type' => 'success',
                'message' => 'Coverage has been deleted',
            ]);
        } catch (\Illuminate\Database\QueryException $ex) {
            return back()->with([
                'type' => 'error',
                'message' => $ex->getMessage(),
            ]);
        }
    }
}

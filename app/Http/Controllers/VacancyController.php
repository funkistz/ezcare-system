<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Vacancy;
use App\Http\Resources\ConfigResource;

class VacancyController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $data = ConfigResource::collection(Vacancy::orderBy('position', 'ASC')->paginate(1000));

        return inertia('Settings/Vacancy/Index', [
            'vacancy' => $data,
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
        $request->validate([
            'name' => 'required',
            'description' => 'required',
            'is_active' => 'required',
            'position' => 'required',
        ]);

        try {
            $vacancy = new Vacancy();
            $vacancy->name = $request->name;
            $vacancy->description = $request->description;
            $vacancy->is_active = $request->is_active;
            $vacancy->position = Vacancy::max('position') ? Vacancy::max('position') : 1;
            $vacancy->save();

            $vacancy->updatePosition($request->position);

            return back()->with([
                'type' => 'success',
                'message' => 'Vacancy has been created',
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
        $request->validate([
            'name' => 'required',
            'description' => 'required',
        ]);


        try {
            
            $vacancy = Vacancy::find($id);

            $vacancy->name = $request->name;
            $vacancy->description = $request->description;
            $vacancy->is_active = $request->is_active;
            $vacancy->save();

            return back()->with([
                'type' => 'success',
                'message' => 'Vacancy has been updated',
            ]);
        } catch (\Illuminate\Database\QueryException $ex) {
            return back()->with([
                'type' => 'error',
                'message' => $ex->getMessage(),
            ]);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }

    public function changePosition(Request $request, string $id)
    {
        try {
            $vacancy = Vacancy::find($id);
            $vacancy->updatePosition($request->position);

            return back()->with([
                'type' => 'success',
                'message' => 'Vacancy has been updated',
            ]);
        } catch (\Illuminate\Database\QueryException $ex) {
            return back()->with([
                'type' => 'error',
                'message' => $ex->getMessage(),
            ]);
        }
    }

    public function changeActive(Request $request, string $id)
    {
        try {
            $vacancy = Vacancy::find($id);
            $vacancy->is_active = $request->is_active;
            $vacancy->save();

            return back()->with([
                'type' => 'success',
                'message' => 'Vacancy has been updated',
            ]);
        } catch (\Illuminate\Database\QueryException $ex) {
            return back()->with([
                'type' => 'error',
                'message' => $ex->getMessage(),
            ]);
        }
    }
}

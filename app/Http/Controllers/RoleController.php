<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use App\Http\Resources\ConfigResource;

class RoleController extends Controller
{

    public function ajax()
    {
        $roles = Role::get()->map(function ($role) {
            return [
                'label' => $role->name,
                'value' => $role->name,
            ];
        });

        return response()->json([
            "status" => "success",
            "data" => $roles,
            "message" => null
        ]);
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {

        $roles = Role::with('permissions')->paginate(1000);
        $roles = ConfigResource::collection($roles);

        return inertia('Settings/Role/Index', [
            'roles' => $roles,
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
        $attr = $request->toArray();

        try {
            $role = Role::create(['name' => $attr['name'], 'description' => $attr['description']]);
            $role->syncPermissions($attr['permissions']);
            $role->save();

            return back()->with([
                'type' => 'success',
                'message' => 'Role has been created',
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
        $attr = $request->toArray();

        try {
            $role = Role::find($id);
            $role->description = $attr['description'];
            $role->syncPermissions($attr['permissions']);
            $role->save();

            return back()->with([
                'type' => 'success',
                'message' => 'Role has been updated',
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
}

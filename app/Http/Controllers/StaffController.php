<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Resources\DefaultResource;
use App\Http\Resources\StaffResource;
use App\Models\Branch;
use App\Models\GeneralSetting;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Role;

class StaffController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        // $users = User::with('roles')->role('staff')->paginate(1000);
        $users = User::with(['roles', 'branches']);
        $roles = Role::get()->map(function ($role) {
            return [
                'label' => $role->name,
                'value' => $role->name,
            ];
        });

        if ($request->search) {
            $search = '%' . $request->search . '%';
            $users = $users->orWhere('name', 'LIKE', $search)->orWhere('email', 'LIKE', $search)->orWhere('username', 'LIKE', $search);
        }

        if ($request->role) {
            $users = $users->role($request->role);
        }

        $users =  $users->paginate(30);
        $users = StaffResource::collection($users);
        $branches =  Branch::get();

        if (empty($mo_exclude_setting)) {
            $setting = new GeneralSetting();
            $setting->name = 'report_mo_exclude_user_ids';
            $setting->value = '[]';
            $setting->save();
        }

        return inertia('Staff/Index', [
            'users' => $users,
            'roles' => $roles,
            'branches' => $branches,
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
            'email' => 'required|unique:users',
            'password' => 'required',
        ]);
        $attr = $request->toArray();

        try {
            $user = new User();
            $user->name = $attr['name'];
            $user->email = $attr['email'];
            $user->password = Hash::make($attr['password']);
            $user->syncRoles($attr['roles']);
            $user->assignRole('staff');
            $user->save();

            return back()->with([
                'type' => 'success',
                'message' => 'Staff has been created',
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
        $request->validate([
            'name' => 'required',
            'email' => 'required|unique:users,email,' . $id,
        ]);
        $attr = $request->toArray();

        try {
            $user = User::find($id);
            $user->name = $attr['name'];
            $user->active = $attr['active'];
            // $user->email = $attr['email'];
            if (!empty($attr['password'])) {
                $user->password = Hash::make($attr['password']);
            }
            $user->syncRoles($attr['roles']);
            $user->assignRole('staff');

            if (!empty($attr['branches'])) {
                $branch_ids =  array_column($attr['branches'], 'id');
                $user->branches()->sync($branch_ids);
            }

            $user->save();

            if ($attr['is_exclude_report']) {
                $user->excludeMoReport();
            } else {
                $user->includeMoReport();
            }

            return back()->with([
                'type' => 'success',
                'message' => 'Staff has been updated',
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
        $model = User::find($id);

        try {
            $model->forceDelete();

            return back()->with([
                'type' => 'success',
                'message' => 'Staff has been deleted',
            ]);
        } catch (\Illuminate\Database\QueryException $ex) {
            return back()->with([
                'type' => 'error',
                'message' => $ex->getMessage(),
            ]);
        }
    }
}

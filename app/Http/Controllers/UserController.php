<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
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
        //
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
        $attr = $request->all();
        $attr['phone_no'] = strval(preg_replace('/[\W]/', '', $attr['phone_no']));

        $user = User::find($id);
        $checkUsername = !empty($attr['username']) ? User::where('id', '!=', $id)->where('username', $attr['username'])->first() : false;
        $checkEmail = !empty($attr['email']) ? User::where('id', '!=', $id)->where('email', $attr['email'])->first() : false;
        $checkPhone = !empty($attr['phone_no']) ? User::where('id', '!=', $id)->where('phone_no', $attr['phone_no'])->first() : false;

        if (!empty($checkUsername) || !empty($checkEmail) || !empty($checkPhone)) {

            if (!empty($checkUsername) && !empty($checkUsername->userable)) {

                $checkUsername = 'Already use by policy:' . $checkUsername->userable->policies->first()->policy_no;
            }
            if (!empty($checkEmail) && !empty($checkEmail->userable)) {

                $checkEmail = 'Already use by policy:' . $checkEmail->userable->policies->first()->policy_no;
            }
            if (!empty($checkPhone) && !empty($checkPhone->userable)) {

                $checkPhone = 'Already use by policy:' . $checkPhone->userable->policies->first()->policy_no;
            }

            return back()->with([
                'type' => 'error',
                'message' => 'Some field already been used.',
                'params' => [
                    'username' => $checkUsername,
                    'email' => $checkEmail,
                    'phone_no' =>  $checkPhone,
                ]
            ]);
        }

        if (!empty($attr['email'])) {
            $user->email = $attr['email'];
        }
        if (!empty($attr['phone_no'])) {
            $user->phone_no = $attr['phone_no'];
            $customer = $user->userable;
            $customer->phone_no = $attr['phone_no'];
            $customer->save();
        }
        if (!empty($attr['username'])) {
            $user->username = $attr['username'];
        }

        if (!empty($attr['password'])) {
            $user->password = Hash::make($attr['password']);
        }

        $user->save();

        return back()->with([
            'type' => 'success',
            'message' => 'User credentials has been updated',
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}

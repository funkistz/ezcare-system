<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Customer;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use App\Models\AccountDeleteRequest;
use App\Models\TacVerification;

class AuthController extends Controller
{

    public function login(Request $request)
    {

        $username = $request->username;
        $password = $request->password;
        $byUsername = false;

        if (is_numeric($username)) {
            $user = User::where('phone_no', $username)->first();
        } else {
            $user = User::where('email', $username)->first();
        }

        if (empty($user)) {
            $byUsername = true;
            $user = User::where('username', $username)->first();
        }

        if (empty($user)) {
            return response()->json([
                "status" => "error",
                "message" => "User does not exist.",
            ], 404);
        }

        $credentials = $request->validate([
            'username' => ['required'],
            'password' => ['required'],
        ]);
        $credentials['email'] = $user->email;
        unset($credentials['username']);

        if ($byUsername) {

            if (!Hash::check($request->password, $user->password)) {
                return response()->json([
                    "status" => "error",
                    "message" => "Wrong Password.",
                    // "attempt" => $attempt,
                    "credentials" => $credentials,
                ], 404);
            }
            $user = User::with(['roles', 'userable'])->where('username', $username)->first();
        } else {
            $attempt = Auth::attempt($credentials);

            if (!$attempt) {
                return response()->json([
                    "status" => "error",
                    "message" => "Wrong Password.",
                    "attempt" => $attempt,
                    "credentials" => $credentials,
                ], 404);
            }

            $user = User::with(['roles', 'userable'])->where('email', $user->email)->first();
        }


        if ($user->userable_type == Customer::class) {
            //customer
            $customer = $user->userable;
            $policies = $customer->policies;

            return response()->json([
                "status" => "success",
                "data" => [
                    'type' => 'customer',
                    'user' => $user,
                    'customer' => $customer,
                    'policies' => $policies,
                ],
            ]);
        } else {
            //staff
            return response()->json([
                "status" => "success",
                "data" => [
                    'type' => 'staff',
                    'user' => $user,
                ],
            ]);
        }
    }

    public function generateTAC(Request $request)
    {

        $phone_no = $request->phone_no;
        $country = $request->country;

        if (empty($phone_no)) {
            return response()->json([
                "status" => "error",
                "message" => "Phone no required.",
            ], 404);
        }

        $phone_no = (int)$phone_no;
        if ($country == 'my') {
            $phone_no = '60' . $phone_no;
        } else {
            $phone_no = '62' . $phone_no;
        }

        $user = User::where('phone_no', $phone_no)->first();

        if (empty($user)) {
            return response()->json([
                "status" => "error",
                "message" => "User does not exist. " .  $phone_no,
            ], 404);
        }

        $tac = TacVerification::checkTAC($user->id);

        if (empty($tac)) {
            return response()->json([
                "status" => "error",
                "message" => 'Unexpected error occured!',
            ], 404);
        }

        if ($tac['status'] == 'error') {
            return response()->json([
                "status" => "error",
                "message" => $tac['message'],
            ], 404);
        } else {
            return response()->json([
                "status" => "success",
                "message" => $tac['message'],
            ], 200);
        }
    }

    public function generateTACEmail(Request $request)
    {

        $email = $request->email;

        if (empty($email)) {
            return response()->json([
                "status" => "error",
                "message" => "Email is required.",
            ], 404);
        }

        $user = User::where('email', $email)->first();

        if (empty($user)) {
            return response()->json([
                "status" => "error",
                "message" => "User does not exist. " .  $email,
            ], 404);
        }

        $tac = TacVerification::checkTAC($user->id, 'email');

        if (empty($tac)) {
            return response()->json([
                "status" => "error",
                "message" => 'Unexpected error occured!',
            ], 404);
        }

        return response()->json([
            "status" => "success",
            "message" => 'Email successfully sent.',
        ], 200);
    }


    public function loginByTac(Request $request)
    {

        $phone_no = $request->phone_no;
        $country = $request->country;
        $tac = $request->tac;

        if (empty($phone_no)) {
            return response()->json([
                "status" => "error",
                "message" => "Phone no required.",
            ], 404);
        }

        $phone_no = (int)$phone_no;
        if ($country == 'my') {
            $phone_no = '60' . $phone_no;
        } else {
            $phone_no = '62' . $phone_no;
        }

        $user = User::where('phone_no', $phone_no)->first();

        if (empty($user)) {
            return response()->json([
                "status" => "error",
                "message" => "User does not exist. " .  $phone_no,
            ], 404);
        }

        $latest_tac = TacVerification::where('user_id', $user->id)->where('tac', $tac)->latest()->first();

        if (empty($latest_tac)) {
            return response()->json([
                "status" => "error",
                "message" => "Wrong verification code.",
            ], 404);
        }

        $user = User::with(['roles', 'userable'])->where('id', $user->id)->first();

        if ($user->userable_type == Customer::class) {
            //customer
            $customer = $user->userable;
            $policies = $customer->policies;

            return response()->json([
                "status" => "success",
                "data" => [
                    'type' => 'customer',
                    'user' => $user,
                    'customer' => $customer,
                    'policies' => $policies,
                ],
            ]);
        } else {
            //staff
            return response()->json([
                "status" => "success",
                "data" => [
                    'type' => 'staff',
                    'user' => $user,
                ],
            ]);
        }
    }

    public function loginByTacEmail(Request $request)
    {

        $email = $request->email;
        $tac = $request->tac;

        if (empty($email)) {
            return response()->json([
                "status" => "error",
                "message" => "Email is required.",
            ], 404);
        }

        $user = User::where('email', $email)->first();

        if (empty($user)) {
            return response()->json([
                "status" => "error",
                "message" => "User does not exist. " .  $email,
            ], 404);
        }

        $latest_tac = TacVerification::where('user_id', $user->id)->where('tac', $tac)->latest()->first();

        if (empty($latest_tac)) {
            return response()->json([
                "status" => "error",
                "message" => "Wrong verification code.",
            ], 404);
        }

        $user = User::with(['roles', 'userable'])->where('id', $user->id)->first();

        if ($user->userable_type == Customer::class) {
            //customer
            $customer = $user->userable;
            $policies = $customer->policies;

            return response()->json([
                "status" => "success",
                "data" => [
                    'type' => 'customer',
                    'user' => $user,
                    'customer' => $customer,
                    'policies' => $policies,
                ],
            ]);
        } else {
            //staff
            return response()->json([
                "status" => "success",
                "data" => [
                    'type' => 'staff',
                    'user' => $user,
                ],
            ]);
        }
    }

    /**
     * Display the specified resource.
     */
    public function requestDeleteAccount(Request $request)
    {
        $username = $request->username;

        if (is_numeric($username)) {
            $user = User::where('phone_no', $username)->first();
        } else {
            $user = User::where('email', $username)->first();
        }

        if (empty($user)) {
            return response()->json([
                "status" => "error",
                "message" => "User does not exist.",
            ], 404);
        }

        $credentials = $request->validate([
            'username' => ['required'],
        ]);
        $credentials['email'] = $user->email;
        unset($credentials['username']);

        $user = User::with(['roles', 'userable'])->where('email', $user->email)->first();

        if ($user->userable_type == Customer::class) {

            $accountRequest = AccountDeleteRequest::where('user_id', $user->id)->where('status_code', config('constant.status.pending.value'))->first();

            // return json_encode($accountRequest);
            if (!$accountRequest) {
                $accountRequest = new AccountDeleteRequest();
                $accountRequest->user_id = $user->id;
                $accountRequest->name = 'delete request';
                $accountRequest->status_code = config('constant.status.pending.value');
                $accountRequest->save();

                return response()->json([
                    "status" => "success",
                    "message" => "Delete account request has been submitted, we will process your request in 1-3 working days.",
                    "data" => [
                        'type' => 'customer',
                        'user' => $user,
                    ],
                ]);
            } else {
                return response()->json([
                    "status" => "error",
                    "message" => "Your request is in progress, please wait while we process it.",
                ], 404);
            }
        } else {
            //staff
            return response()->json([
                "status" => "error",
                "message" => "Your are not a customer.",
            ]);
        }
    }

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

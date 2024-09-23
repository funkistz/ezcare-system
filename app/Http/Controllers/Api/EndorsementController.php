<?php

namespace App\Http\Controllers\Api;

use App\Helpers\FileHelper;
use App\Http\Controllers\Controller;
use App\Http\Resources\EndorsementResource;
use App\Models\Endorsement;
use App\Models\Exgratia;
use App\Models\Notifications;
use App\Models\RequestStatus;
use App\Models\Sponsorship;
use App\Models\User;
use App\Models\UserPushNotificationToken;
use Illuminate\Http\Request;
use Carbon\Carbon;
use Kreait\Firebase\Factory;
use Kreait\Firebase\Messaging\CloudMessage;

class EndorsementController extends Controller
{

    public function allRequest(Request $request)
    {
        $attr = $request->toArray();
        $date = Carbon::parse($attr['date']);
        $user = !empty($attr['user_id']) ? User::find($attr['user_id']) : null;

        if (!empty($user) && $user->hasPermissionTo('endorsement.view_all')) {
            $all = Endorsement::byDate($date)->count();
            $pending = Endorsement::byDate($date)->where('status_code', 'pending')->count();
            $proceed = Endorsement::byDate($date)->where('status_code', 'proceed')->count();
        } else if (!empty($user) && $user->hasPermissionTo('endorsement.view_mine')) {
            $all = Endorsement::byDate($date)->where(function ($query) use ($user) {
                $query->where('dealer_id', $user->id)
                    ->orWhere('created_by', $user->id);
            })->count();
            $pending = Endorsement::byDate($date)->where('status_code', 'pending')->where(function ($query) use ($user) {
                $query->where('dealer_id', $user->id)
                    ->orWhere('created_by', $user->id);
            })->count();
            $proceed = Endorsement::byDate($date)->where('status_code', 'proceed')->where(function ($query) use ($user) {
                $query->where('dealer_id', $user->id)
                    ->orWhere('created_by', $user->id);
            })->count();
        } else {
            $all = 'x';
            $pending = 'x';
            $proceed = 'x';
        }

        if (!empty($user) && $user->hasPermissionTo('exgratia.view_all')) {
            $exgratiaAll = Exgratia::byDate($date)->count();
            $exgratiaPending = Exgratia::byDate($date)->where('status_code', 'pending')->count();
            $exgratiaProceed = Exgratia::byDate($date)->where('status_code', 'proceed')->count();
        } else if (!empty($user) && $user->hasPermissionTo('exgratia.view_mine')) {
            $exgratiaAll = Exgratia::byDate($date)->where(function ($query) use ($user) {
                $query->where('dealer_id', $user->id)
                    ->orWhere('created_by', $user->id);
            })->count();
            $exgratiaPending = Exgratia::byDate($date)->where('status_code', 'pending')->where(function ($query) use ($user) {
                $query->where('dealer_id', $user->id)
                    ->orWhere('created_by', $user->id);
            })->count();
            $exgratiaProceed = Exgratia::byDate($date)->where('status_code', 'proceed')->where(function ($query) use ($user) {
                $query->where('dealer_id', $user->id)
                    ->orWhere('created_by', $user->id);
            })->count();
        } else {
            $exgratiaAll = 'x';
            $exgratiaPending = 'x';
            $exgratiaProceed = 'x';
        }

        if (!empty($user) && $user->hasPermissionTo('sponsorship.view_all')) {
            $sponsorshipAll = Sponsorship::byDate($date)->count();
            $sponsorsPending = Sponsorship::byDate($date)->where('status_code', 'pending')->count();
            $sponsorsProceed = Sponsorship::byDate($date)->where('status_code', 'proceed')->count();
        } else if (!empty($user) && $user->hasPermissionTo('sponsorship.view_mine')) {
            $sponsorshipAll = Sponsorship::byDate($date)->where(function ($query) use ($user) {
                $query->where('dealer_id', $user->id)
                    ->orWhere('created_by', $user->id);
            })->count();
            $sponsorsPending = Sponsorship::byDate($date)->where('status_code', 'pending')->where(function ($query) use ($user) {
                $query->where('dealer_id', $user->id)
                    ->orWhere('created_by', $user->id);
            })->count();
            $sponsorsProceed = Sponsorship::byDate($date)->where('status_code', 'proceed')->where(function ($query) use ($user) {
                $query->where('dealer_id', $user->id)
                    ->orWhere('created_by', $user->id);
            })->count();
        } else {
            $sponsorshipAll = 'x';
            $sponsorsPending = 'x';
            $sponsorsProceed = 'x';
        }

        return response()->json([
            'status' => 'success',
            'data' => [
                'endorsement' => [
                    'all' => $all,
                    'pending' => $pending,
                    'proceed' => $proceed,
                ],
                'exgratia' => [
                    'all' => $exgratiaAll,
                    'pending' => $exgratiaPending,
                    'proceed' => $exgratiaProceed,
                ],
                'sponsorship' => [
                    'all' => $sponsorshipAll,
                    'pending' => $sponsorsPending,
                    'proceed' => $sponsorsProceed,
                ],
                'date' => Carbon::now(),
            ],
        ]);
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $attr = $request->toArray();
        $date = Carbon::parse($attr['date']);
        $user = !empty($attr['user_id']) ? User::find($attr['user_id']) : null;

        if (!empty($user) && $user->hasPermissionTo('endorsement.view_all')) {
            $endorsements = Endorsement::with(['dealer'])->byDate($date)->get();
            $endorsements = EndorsementResource::collection($endorsements);
        } else if (!empty($user) && $user->hasPermissionTo('endorsement.view_mine')) {
            $endorsements = Endorsement::with(['dealer'])->byDate($date)->where(function ($query) use ($user) {
                $query->where('dealer_id', $user->id)
                    ->orWhere('created_by', $user->id);
            })->get();
            $endorsements = EndorsementResource::collection($endorsements);
        } else {
            $endorsements = null;
        }

        return response()->json([
            'status' => 'success',
            'data' => [
                'endorsement' => $endorsements,
                'date' => Carbon::now(),
            ],
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $attr = $request->toArray();
        $attr['status_code'] = 'pending';

        try {

            $files = [];
            if (!empty($attr['files'])) {
                foreach ($attr['files'] as $key => $file) {
                    $saveFile = FileHelper::uploadFile($file['file']['original'], $file['format']);
                    // echo json_encode($saveFile);
                    array_push($files, $saveFile);
                }
            }

            // $attr['activated_at'] = $attr['activated_at'] ? new Carbon($attr['activated_at']) : null;
            // $attr['expired_at'] = $attr['expired_at'] ? new Carbon($attr['expired_at']) : null;

            $request = Endorsement::create($attr);

            if (!empty($files)) {
                foreach ($files as $key => $file) {
                    $request->files()->attach($file);
                }
            }

            RequestStatus::create([
                'requestable_id' => $request->id,
                'requestable_type' => Endorsement::class,
                'status_code' => 'pending',
                'created_by' => $attr['created_by'],
            ]);

            $firebase = (new Factory)->withServiceAccount(base_path() . '/config/ezcare-superapp-firebase-adminsdk.json');
            $messaging = $firebase->createMessaging();

            $text = '';
            if (!empty($request->dealer)) {
                $text .= 'Dealer: ' . $request->dealer->name . '\n';
            }
            if (!empty($request->registration_no)) {
                $text .= 'Registration: ' . $request->registration_no . '\n';
            }
            if (!empty($request->reasons)) {
                $text .= 'Reason: ' . $request->reasons;
            }

            $user = UserPushNotificationToken::where('user_id', $request->created_by)->first();
            $title = 'You have new endorsement request';

            try {
                $message = CloudMessage::withTarget('token', $user->token)
                    ->withNotification(['title' => 'You have new endorsement request', 'body' => $text])
                    ->withDefaultSounds();
                $messaging->send($message);

                $notification = new Notifications();
                $notification->user_id = $user->user_id;
                $notification->title = $title;
                $notification->description = $text;
                $notification->save();

                $approvers = User::permission(['endorsement.approval', 'endorsement.admin'])->get();
                foreach ($approvers as $key => $approver) {
                    if (!empty($approver->AccessToken)) {
                        $message = CloudMessage::withTarget('token', $approver->AccessToken->token)
                            ->withNotification(['title' => 'You have new endorsement request', 'body' => $text])
                            ->withDefaultSounds();
                        $messaging->send($message);

                        $notification = new Notifications();
                        $notification->user_id = $approver->id;
                        $notification->title = $title;
                        $notification->description = $text;
                        $notification->save();
                    }
                }
            } catch (\Throwable $th) {
                //throw $th;
            }

            return response()->json([
                'status' => 'success',
                'message' => 'Endorsement has been created',
            ]);
        } catch (\Illuminate\Database\QueryException $ex) {
            return response()->json([
                'status' => 'error',
                'message' => Endorsement::class,
                // 'message' => $ex->getMessage(),
            ]);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id, Request $request)
    {
        $attr = $request->toArray();
        $user = !empty($attr['user_id']) ? User::find($attr['user_id']) : null;

        $data = Endorsement::with(['files'])->find($id);
        $created_by = $data->created_by;
        $dealer_id = $data->dealer_id;

        if ($data->status_code == 'pending') {
            $data->can_edit = ($user->id = $created_by || $user->hasPermissionTo('endorsement.admin')) ? true : false;
            $data->can_delete = ($user->id = $created_by || $user->hasPermissionTo('endorsement.admin')) ? true : false;
            $data->can_proceed = ($user->hasPermissionTo('endorsement.approval')) ? true : false;
            $data->can_reject = ($user->hasPermissionTo('endorsement.approval')) ? true : false;
        }

        return response()->json([
            "status" => "success",
            "data" => $data,
        ]);
    }

    public function proceedInspection(Request $request)
    {
        $attr = $request->toArray();
        $status_code = 'proceed';

        $request = Endorsement::find($attr['id']);
        $request->status_code = $status_code;
        $request->save();

        RequestStatus::create([
            'requestable_id' => $request->id,
            'requestable_type' => Endorsement::class,
            'status_code' => $status_code,
            'remarks' => $attr['remarks'],
            'created_by' => $attr['user_id'],
        ]);

        return response()->json([
            "status" => "success",
            "data" => $request,
        ]);
    }

    public function rejectInspection(Request $request)
    {
        $attr = $request->toArray();
        $status_code = 'rejected';

        $request = Endorsement::find($attr['id']);
        $request->status_code = $status_code;
        $request->save();

        RequestStatus::create([
            'requestable_id' => $request->id,
            'requestable_type' => Endorsement::class,
            'status_code' => $status_code,
            'remarks' => $attr['remarks'],
            'created_by' => $attr['user_id'],
        ]);

        return response()->json([
            "status" => "success",
            "data" => $request,
        ]);
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
        $endorsement = Endorsement::find($id);
        $endorsement->delete();

        return response()->json([
            "status" => "success",
        ]);
    }
}

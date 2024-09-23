<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Customer;
use App\Models\Notifications;
use App\Models\Policy;
use App\Models\User;
use App\Models\UserPushNotificationToken;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Kreait\Firebase\Factory;
use Kreait\Firebase\Messaging\CloudMessage;

class NotificationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $attr = $request->toArray();

        $notifications = Notifications::where('user_id', $attr['user_id'])->orderBy('created_at', 'desc')->get();

        return response()->json([
            'status' => 'success',
            'data' => $notifications
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    public function updateToken(Request $request)
    {
        $attr = $request->toArray();

        $user = User::find($attr['user_id']);

        if (!empty($user)) {
            $token = UserPushNotificationToken::where('user_id', $user->id)->first();
            if (!empty($token)) {
                $token->token = $attr['token'];
                $token->save();
            } else {
                $token = new UserPushNotificationToken();
                $token->user_id = $user->id;
                $token->token = $attr['token'];
                $token->save();
            }
        }
    }

    public function sendPushNotification()
    {
        $firebase = (new Factory)->withServiceAccount(base_path() . '/config/ezcare-superapp-firebase-adminsdk.json');

        $messaging = $firebase->createMessaging();

        $message = CloudMessage::fromArray([
            'notification' => [
                'title' => 'Hello from Firebase!',
                'body' => 'This is a test notification.'
            ],
            'topic' => 'global'
        ]);

        $message = CloudMessage::withTarget('token', 'fW-_Ft33Q12rg3mA71fz6K:APA91bEMrIE1pxR-S5TeVQtt0DDCAJ5hw1zWKpQkEaFDzm5ME3KC9dVotAtD5vMBD3xGmD0RmIcYP-HqN4bBKJDd_RiqwJnax9KVOjZgQdU4DAbCDJ20DDZArVUhrf6whqFqYIUC5FWK')
            ->withNotification(['title' => 'Notification title', 'body' => 'Notification body'])
            ->withDefaultSounds() // Enables default notifications sounds on iOS and Android devices.
        ;
        $messaging->send($message);

        return response()->json(['message' => 'Push notification sent successfully']);
    }

    /**
     * Display the specified resource.
     */
    public function sendPolicy3MonthsPushNotification()
    {

        $firebase = (new Factory)->withServiceAccount(base_path() . '/config/ezcare-superapp-firebase-adminsdk.json');

        // $policies = Policy::where('created_at', '<=', $date)->get();
        $policies = new Policy();

        for ($i = 3; $i <= 72; $i = $i + 3) {
            // dump(Carbon::now()->subMonths($i)->format('Y-m-d'));
            $policies = $policies->orWhere('activated_at', Carbon::now()->subMonths($i)->format('Y-m-d'));
        }

        $customer_ids = $policies->get(['customer_id'])->pluck('customer_id');

        $user_ids = User::whereIn('userable_id', $customer_ids)->where('userable_type', Customer::class)->get(['id']);
        $userTokens = UserPushNotificationToken::whereIn('user_id', $user_ids)->get(['token', 'user_id'])->toArray();

        foreach ($userTokens as $key => $userToken) {
            $messaging = $firebase->createMessaging();

            $message = CloudMessage::fromArray([
                'notification' => [
                    'title' => 'Hello from Firebase!',
                    'body' => 'This is a test notification.'
                ],
                'topic' => 'global'
            ]);

            $title = 'Service Reminder Notice';
            $description = 'REMINDER. It may be the time for your vehicle service. Please remember that servicing on time is very important to maintain your warranty. If you already service your vehicle accordingly to the service schedule, you can ignore this message.';

            $message = CloudMessage::withTarget('token', $userToken['token'])
                ->withNotification([
                    'title' =>  $title,
                    'body' => $description,
                    // 'title' => 'Service Reminder Notice',
                ])
                ->withDefaultSounds() // Enables default notifications sounds on iOS and Android devices.
            ;
            $messaging->send($message);

            $notification = new Notifications();
            $notification->user_id = $userToken['user_id'];
            $notification->title = $title;
            $notification->description =  $description;
            $notification->save();
        }

        return response()->json(['message' => $userTokens]);
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

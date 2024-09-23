<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Carbon;
use App\Helpers\Sms360;
use App\Helpers\Esms;
use App\Mail\OTPMail;
use Illuminate\Support\Facades\Mail;

class TacVerification extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'tac',
        'is_active',
    ];

    public static function checkTAC($user_id, $type = 'sms')
    {

        $latest_tac = TacVerification::where('user_id', $user_id)->latest()->first();

        // start testing
        // $sms360 = new Esms();
        // $response = $sms360->sendsms('60149224012', 'test');
        // return $response;
        // end testing

        // start testing
        // return self::generateTACEmail($user_id);
        // end testing


        if (!empty($latest_tac)) {

            $duration = new Carbon($latest_tac->created_at);
            $duration = $duration->diffInSeconds(Carbon::now());

            if ($duration < 60) {

                return [
                    "status" => "error",
                    "message" => 'Too many request, Please try again after ' . (60 - $duration) . ' second.',
                ];
            } else {
                if ($type == 'sms') {
                    return self::generateTACEsms($user_id);
                } else {
                    return self::generateTACEmail($user_id);
                }
            }
        } else {
            if ($type == 'sms') {
                return self::generateTACEsms($user_id);
            } else {
                return self::generateTACEmail($user_id);
            }
        }
    }

    public static function generateTACEmail($user_id)
    {
        $six_digit_random_number = random_int(100000, 999999);

        $tac = new TacVerification();
        $tac->tac = $six_digit_random_number;
        $tac->user_id = $user_id;
        $tac->save();

        $user = User::find($user_id);
        $response = Mail::to($user)->send(new OTPMail([
            'otp' => $six_digit_random_number
        ]));

        return $response;
    }

    public static function generateTACEsms($user_id)
    {
        $six_digit_random_number = random_int(100000, 999999);

        $tac = new TacVerification();
        $tac->tac = $six_digit_random_number;
        $tac->user_id = $user_id;
        $tac->save();

        $user = User::find($user_id);

        $to = $user->phone_no;
        $text = '[Ezcare Warranty] - Your Login TAC is *' . $six_digit_random_number . '*. Do not share this code to anyone.';

        $sms360 = new Esms();
        $response = $sms360->sendsms($to, $text);

        return $response;
    }

    public static function generateTAC360($user_id)
    {
        $six_digit_random_number = random_int(100000, 999999);

        $tac = new TacVerification();
        $tac->tac = $six_digit_random_number;
        $tac->user_id = $user_id;
        $tac->save();

        $user = User::find($user_id);

        $to = $user->phone_no;
        $text = 'Your Login TAC is *' . $six_digit_random_number . '*. Do not share this code to anyone.  - Ezcare Warranty';

        $sms360 = new Sms360();
        $response = $sms360->sendsms($to, $text);

        return $response;
    }

    public static function generateTAC($user_id)
    {
        $six_digit_random_number = random_int(100000, 999999);

        $tac = new TacVerification();
        $tac->tac = $six_digit_random_number;
        $tac->user_id = $user_id;
        $tac->save();

        $user = User::find($user_id);

        $data = [
            'phone_number' => $user->phone_no,
            'message' => '[Ezcare Warranty] Your Login TAC is *' . $six_digit_random_number . '*. Do not share this code to anyone.',
        ];

        $response = \Illuminate\Support\Facades\Http::accept('application/json')
            ->withToken('2ba05de8883521284aa883de6900f79d24cf5bc05d8618e3e7c140d5a3c417d9')
            ->post('https://onsend.io/api/v1/send', $data);

        return [
            "status" => "success",
            "message" => $response,
        ];

        return [
            "status" => "success",
            "message" => 'Your login TAC has been send to your Whatsapp number. ',
        ];
    }
}

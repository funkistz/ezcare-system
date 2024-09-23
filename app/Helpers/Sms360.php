<?php

namespace App\Helpers;

use Illuminate\Support\Facades\Http;

class Sms360
{
    var $user   = 'LYqaQKGdnj';
    var $pass   = '3iidWou2pXrcuPWvUnOqtb61kV7ufYbrNskR5b3v';
    var $from   = '66688';
    var $to;
    var $text;

    var $url            = 'https://sms.360.my/gw/bulk360/v3_0/send.php';
    var $balance_url    = 'https://sms.360.my/api/balance/v3_0/getBalance';

    function __construct()
    {
        $this->user = urlencode($this->user);
        $this->pass = urlencode($this->pass);

        $this->url = $this->url . "?user=$this->user&pass=$this->pass";
        $this->balance_url = $this->balance_url . "?user=$this->user&pass=$this->pass";
    }

    function sendsms($to, $text)
    {
        $this->url = $this->url . "&to=" . $to . "&text=" . rawurlencode($text);

        $balanceResult =  Http::get($this->url);

        $response = $balanceResult->object();

        if ($response->code != 200) {
            // echo 'Curl failed for sending sms to bulk360.. ' . curl_error($ch);
            return [
                'status' => 'error',
                'message' => $response->desc
            ];
        }

        // $ch = curl_init();
        // curl_setopt($ch, CURLOPT_URL, $this->url);
        // curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        // curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
        // curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);
        // $sentResult = curl_exec($ch);
        // if ($sentResult == FALSE) {
        //     // echo 'Curl failed for sending sms to bulk360.. ' . curl_error($ch);
        //     return [
        //         'status' => 'error',
        //         'message' => 'Curl failed for sending sms to bulk360.. ' . curl_error($ch)
        //     ];
        // }
        // curl_close($ch);
        return [
            'status' => 'success',
            'message' => 'Success'
        ];
    }

    function checkBalance($country = "")
    {
        $country = ($country) ? "?country="  . $country : "";
        $this->balance_url = $this->balance_url . $country;

        // $ch = curl_init();
        // curl_setopt($ch, CURLOPT_URL, $this->balance_url);
        // curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        // curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
        // curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);
        // $balanceResult = curl_exec($ch);
        // curl_close($ch);

        $balanceResult =  Http::get($this->balance_url);

        if ($balanceResult == FALSE) {
            echo 'Curl failed for balance checking in bulk360.. ' . curl_error($ch);
        }

        echo  $balanceResult;
        // echo 'balanceResult = ' . $balanceResult;
    }
}

// $sms = new Sms360();
// $sms->sendsms('60123240066', 'This is a test message from Bulk360');
// $sms->checkBalance('MYS');

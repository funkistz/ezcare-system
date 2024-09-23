<?php

namespace App\Helpers;

use Illuminate\Support\Facades\Http;

class Esms
{
    var $user   = '32f2e4f7868840c09cbfb1d55f749aff';
    var $pass   = 'wj5zwtuw99imnn8crhp171s0oll8ojl7z0nv5xj0usg87rcb3w8wtvnwkqeual0rp0mh83nbru3dnv43vyhk7f5whwfedqyc1nea';
    var $params = [];
    var $from   = '66688';
    var $to;
    var $text;

    var $url            = 'https://api.esms.com.my/sms/send';
    var $balance_url    = 'https://api.esms.com.my/sms/balance';

    function __construct()
    {
        $this->user = urlencode($this->user);
        $this->pass = urlencode($this->pass);

        // $this->url = $this->url . "?user=$this->user&pass=$this->pass";
        // $this->balance_url = $this->balance_url . "?user=$this->user&pass=$this->pass";

        $this->params = [
            'user' => $this->user,
            'pass' => $this->pass,
        ];
    }

    function sendsms($to, $text)
    {
        $this->params['to'] = $to;
        $this->params['msg'] = 'RM0.00 ' . $text;

        $balanceResult =  Http::asForm()->post($this->url, $this->params);

        $response = $balanceResult->object();

        // echo json_encode($response);

        if ($response->status != 0) {
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
        // $country = ($country) ? "?country="  . $country : "";
        // $this->balance_url = $this->balance_url . $country;

        // $ch = curl_init();
        // curl_setopt($ch, CURLOPT_URL, $this->balance_url);
        // curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        // curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
        // curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);
        // $balanceResult = curl_exec($ch);
        // curl_close($ch);

        $balanceResult =  Http::asForm()->post($this->balance_url, $this->params);

        // if ($balanceResult == FALSE) {
        //     echo 'Curl failed for balance checking in bulk360.. ';
        // }

        // echo $this->balance_url;
        echo json_encode($balanceResult->object());
        return $balanceResult;
        // echo 'balanceResult = ' . $balanceResult;
    }
}

// $sms = new Sms360();
// $sms->sendsms('60123240066', 'This is a test message from Bulk360');
// $sms->checkBalance('MYS');

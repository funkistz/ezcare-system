<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PolicySoaResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {

        // $activated_at = Carbon::parse($this->activated_at);
        // $expired_at = Carbon::parse($this->expired_at)->addDays(1);
        // $real_period = $expired_at->diffInYears($activated_at);
        // $additional_period = $real_period -  $this->period;
        // $additional_period = $additional_period == 0 ? null : $additional_period;

        // $temp = $this->dealerBalancePayment();
        // $balance = $temp >= 0 ? $temp : 0;
        // $outstanding = $temp < 0 ? abs($temp) : 0;

        // $debit = $this->dealer_split_price;
        // $credit = $this->dealer_total_payment ?  $this->dealer_total_payment['total'] : 0;
        // $credit = ($credit > $debit) ? $debit : $credit;

        $payee = $this->payeeDealer;

        $debit = !empty($payee) ? $payee->total_amount : 0;
        $credit = !empty($payee) ? $payee->total_paid : 0;
        $balance = !empty($payee) ? $payee->total_unpaid : 0;

        return [
            'id' => $this->id,
            'policy_no' => strtoupper($this->policy_no),
            'invoice_no' => $this->activeInvoice ?  strtoupper($this->activeInvoice->invoice_no) : '-',
            'invoice_date' => $this->activeInvoice ?  Carbon::parse($this->activeInvoice->date)->format('d/m/Y') : '',
            'registartion_no' => $this->vehicle->registration_no,
            'vehicle' => $this->vehicle->name,
            'chassis_no' => $this->vehicle->chassis_no,
            'paid_at' => $this->total_payment ?  $this->total_payment['latest_date'] : '',
            'payment_remarks' => $this->paymentsRemark,

            'debit' => $debit,
            'credit' => $credit,
            'balance' =>  number_format((float)$balance, 2, '.', ''),

            // 'c_debit' => $c_debit,
            // 'c_credit' => $c_credit,
            // 'c_balance' =>  number_format((float)$c_balance, 2, '.', ''),

            'month' =>  $this->activeInvoice ?  Carbon::parse($this->activeInvoice->date)->format('M Y') : '',
        ];
    }
}

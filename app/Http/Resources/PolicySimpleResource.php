<?php

namespace App\Http\Resources;

use App\Models\Customer;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PolicySimpleResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {

        $activated_at = Carbon::parse($this->activated_at);
        $expired_at = Carbon::parse($this->expired_at)->addDays(1);
        $real_period = $expired_at->diffInYears($activated_at);
        $additional_period = $real_period -  $this->period;
        $additional_period = $additional_period == 0 ? null : $additional_period;

        $report = $this->policyReport;

        $temp = $this->balancePayment();
        $balance = $temp >= 0 ? $temp : 0;
        $outstanding = $temp < 0 ? abs($temp) : 0;
        $customer = $this->customer;

        return [
            'id' => $this->id,
            'policy_no' => strtoupper($this->policy_no),
            'invoice_no' => $this->activeInvoice ?  strtoupper($this->activeInvoice->invoice_no) : '-',
            'invoice_date' => $this->activeInvoice ?  Carbon::parse($this->activeInvoice->date)->format('d/m/Y') : '',
            'name' => $customer->full_name,
            'ic' => (string)$this->customer->ic,
            'phone' => (string)$this->customer->phone_no,

            'vehicle' => $this->vehicle->name,
            'year' => $this->vehicle->year,
            'registartion_date' => Carbon::parse($this->vehicle->registration_date)->format('d/m/Y'),
            'registartion_no' => $this->vehicle->registration_no,
            'chassis_no' => $this->vehicle->chassis_no,
            'engine_no' => $this->vehicle->engine_no,

            'plan' => $this->warrantyPlan ? $this->warrantyPlan->name : '-',
            'period' => $this->period,
            'additional_year' => $additional_period,
            'activated_at' => Carbon::parse($this->activated_at)->format('d/m/Y'),
            'expired_at' => Carbon::parse($this->expired_at)->format('d/m/Y'),

            'dealer' => $this->dealer->name,
            'salesman' => $this->salesman,
            'mo' => $this->marketingOfficer ? $this->marketingOfficer->name : '-',

            'status' => strtoupper($this->status_code),
            'payment_status' => strtoupper($this->payment_status_code),

            'nett' => $report ? $report->total_nett : '-',
            'tax' =>  $report ? $report->total_tax : '-',

            'price' =>  $report ? $report->total_amount : '-',
            'paid' =>  $report ? $report->total_sales : '-',
            'paid_at' => ($report && $report->last_paid_at) ? Carbon::parse($report->last_paid_at)->format('d/m/Y') : '-',
            'outstanding' =>   $report ? $report->total_unpaid : '-',
            'overpaid' =>   $report ? $report->total_overpaid : '-',

            // 'nett' => $this->activeInvoice ?  $this->activeInvoice->subtotal : '',
            // 'tax' => $this->activeInvoice ?  $this->activeInvoice->tax : '',

            // 'price' => $this->activeInvoice ?  $this->activeInvoice->total : '',
            // 'paid' => $this->total_payment ?  $this->total_payment['total'] : '',
            // 'paid_at' => $this->total_payment ?  $this->total_payment['latest_date'] : '',
            // 'balance' =>  $balance,
            // 'outstanding' =>  $outstanding,
            'created_at' =>  Carbon::parse($this->created_at)->format('j/n/Y'),
            // 'paid_at' => $this->total_payment ?  Carbon::parse($this->total_payment['latest_date'])->format('D/M/YYYY') : '-',






        ];
    }
}

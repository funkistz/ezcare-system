<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PolicyAppResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {

        $activated_at = Carbon::parse($this->activated_at);
        $expired_at = Carbon::parse($this->expired_at);
        $real_period = $expired_at->diffInYears($activated_at);
        $additional_period = $real_period -  $this->period;
        $additional_period = $additional_period == 0 ? null : $additional_period;

        $status = [
            'code' => $this->status_code,
            'color' => $this->status_color,
        ];
        $payment_status = [
            'code' => $this->payment_status_code,
            'color' => $this->payment_status_color,
        ];

        return [
            'id' => $this->id,
            'policy_no' => strtoupper($this->policy_no),
            'status' => $status,
            'payment_status' => $payment_status,
            'vehicle' => '' . $this->vehicle->name,
            'registration_no' => '' . $this->vehicle->registration_no,
            'invoice_no' => $this->activeInvoice ?  $this->activeInvoice->invoice_no : '-',
            'invoice_date' => $this->activeInvoice ?  Carbon::parse($this->activeInvoice->date)->format('d/m/Y') : '',
            'chassis_no' => $this->vehicle->chassis_no,
            'activated_at' => $this->activated_at,
            'expired_at' => $this->expired_at,
        ];
    }
}

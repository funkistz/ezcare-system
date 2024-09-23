<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class InvoicePayee extends Model
{
    use HasFactory;

    protected $fillable = [
        'policy_id',
        'invoice_id',
        'userable_id',
        'userable_type',
        'total_amount',
        'total_paid',
        'total_unpaid',
        'status_code'
    ];

    public function calculateAmount()
    {
        $this->total_paid = $this->total_paid_re;
        $this->total_unpaid = $this->total_unpaid_re;
        $this->status_code = $this->payment_status;
        $this->save();
    }

    public function getTypeNameAttribute()
    {
        $parts = explode('\\', $this->userable_type);
        $last = array_pop($parts);

        return $last;
    }

    public function getTotalSaleAttribute()
    {
        return ($this->total_paid > $this->total_amount) ? $this->total_amount : $this->total_paid;
    }

    public function getTotalPaidReAttribute()
    {
        $policy = Policy::find($this->policy_id);
        $payments = $policy->getTotalPaymentByUser($this->type_name);

        return $payments;
    }

    public function getTotalUnpaidReAttribute()
    {
        return $this->total_amount - $this->total_paid_re;
    }

    public function getPaymentStatusAttribute()
    {
        if ($this->total_paid_re == 0) {
            return 'unpaid';
        } else if ($this->total_unpaid_re == 0) {
            return 'paid';
        } else if ($this->total_paid_re <  $this->total_amount && $this->total_paid_re > 0) {
            return 'partial';
        } else {
            return 'overpaid';
        }
    }

    protected $appends = ['type_name'];
}

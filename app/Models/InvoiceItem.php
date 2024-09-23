<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class InvoiceItem extends Model
{
    use HasFactory;

    protected $fillable = [
        'policy_invoice_id',
        'description',
        'remarks',
        'rate',
        'quantity',
        'total'
    ];

    protected $appends = ['rate_with_tax', 'tax_rate', 'tax_amount', 'total_with_tax'];

    public function getTaxRateAttribute()
    {
        if ($this->policyInvoice) {
            return $this->policyInvoice->policyTax->rate;
        } else {
            return 0;
        }
    }

    public function getTaxAmountAttribute()
    {
        if ($this->rate_with_tax && $this->rate) {
            return $this->rate_with_tax - $this->rate;
        } else {
            return 0;
        }
    }

    public function getRateWithTaxAttribute()
    {
        if ($this->policyInvoice) {
            return $this->rate * (1 + $this->tax_rate);
        } else {
            return 0;
        }
    }

    public function getTotalWithTaxAttribute()
    {
        if ($this->rate_with_tax) {
            return $this->rate_with_tax * $this->quantity;
        } else {
            return 0;
        }
    }

    public function policyInvoice()
    {
        return $this->belongsTo(PolicyInvoice::class);
    }

    public function itemable()
    {
        return $this->morphTo();
    }
}

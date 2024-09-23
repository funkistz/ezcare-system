<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use OwenIt\Auditing\Contracts\Auditable;

class PolicyInvoice extends Model implements Auditable
{
    use HasFactory, \OwenIt\Auditing\Auditable;

    protected $fillable = [
        'policy_id',
        'billable_type',
        'billable_id',
        'invoice_no',
        'date',
        'content',
        'created_by',
        'bill_to_name',
        'bill_to_address',
        'type',
        'tax_id',
        'is_main',
        'subtotal',
        'discount',
        'tax',
        'total',
        'note',
    ];

    protected $appends = ['billable_address', 'branch_address', 'warranty_plan', 'free_promos', 'invoice_type', 'latest_payment_date'];

    public function getLatestPaymentDateAttribute()
    {
        if (!empty($this->policy->latestPayments)) {
            return $this->policy->latestPayments->date;
        }

        return '';
    }

    public function getInvoiceTypeAttribute()
    {
        if ($this->billable_type == Dealer::class) {
            return 'Dealer';
        } else if ($this->billable_type == Customer::class) {
            return 'Customer';
        }

        return '';
    }

    public function getBranchAddressAttribute()
    {
        if (!empty($this->policy->branch)) {

            if (!empty($this->policy->branch->mainAddress)) {
                return $this->policy->branch->mainAddress;
            }
        }

        return null;
    }

    public function getBillableAddressAttribute()
    {
        if (!empty($this->billable)) {

            if (!empty($this->billable->mainAddress)) {
                return $this->billable->mainAddress;
            }
        }

        return null;
    }

    public function getWarrantyPlanAttribute()
    {
        if (!empty($this->policy->warrantyPlan)) {
            return $this->policy->warrantyPlan;
        }

        return null;
    }

    public function getFreePromosAttribute()
    {
        if (!empty($this->policy->freePromos)) {
            return $this->policy->freePromos;
        }

        return null;
    }

    public function policy()
    {
        return $this->belongsTo(Policy::class, 'policy_id', 'id');
    }

    public function policyTax()
    {
        return $this->belongsTo(Tax::class, 'tax_id', 'id');
    }

    public function items()
    {
        return $this->hasMany(InvoiceItem::class, 'policy_invoice_id', 'id');
    }

    public function billable()
    {
        return $this->morphTo();
    }

    public static function generateInvoiceNo()
    {
        $latest_invoice = PolicyInvoice::orderBy('invoice_no', 'DESC')->pluck('invoice_no')->toArray();
        $results = array();
        $final = false;

        foreach ($latest_invoice as $value) {
            $value = filter_var($value, FILTER_SANITIZE_NUMBER_INT);
            if (strlen($value) < 8) {
                $results[] = $value;
            }
        }
        $latest_invoice = $results;

        return max($latest_invoice) + 1;

        // $new_invoice_no = filter_var($latest_invoice->invoice_no, FILTER_SANITIZE_NUMBER_INT);

        // $skip = array();

        // if (empty($latest_invoice)) {
        //     $latest_invoice_id = 100001;
        // } else {

        //     $latest_invoice_id = false;
        //     $try = 0;

        //     while (empty($latest_invoice_id)) {
        //         $try++;

        //         if ($try > 30) {
        //             return false;
        //             break;
        //         }

        //         if (strlen($new_invoice_no) > 7) {
        //             array_push($skip, $new_invoice_no);

        //             $new_invoice_no = PolicyInvoice::orderBy('invoice_no', 'DESC');

        //             foreach ($skip as $key => $value) {
        //                 $new_invoice_no =  $new_invoice_no->where('invoice_no', 'not like', '%' . $value . '%');
        //             }

        //             $new_invoice_no = $new_invoice_no->first();
        //             $new_invoice_no = filter_var($new_invoice_no->invoice_no, FILTER_SANITIZE_NUMBER_INT);

        //             continue;
        //         }


        //         $new_invoice_no = $new_invoice_no + 1;
        //         $is_duplicate = PolicyInvoice::where('invoice_no', 'LIKE', $new_invoice_no)->exists();

        //         if (!$is_duplicate) {
        //             $latest_invoice_id =  $new_invoice_no;
        //         }
        //     }
        // }

        // dd($new_invoice_no);

        // return $new_invoice_no;
    }
}

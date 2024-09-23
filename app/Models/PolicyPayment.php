<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Database\Eloquent\Casts\Attribute;
use OwenIt\Auditing\Contracts\Auditable;
use App\Models\Dealer;
use App\Models\User;


class PolicyPayment extends Model implements Auditable
{
    use HasFactory, \OwenIt\Auditing\Auditable;

    protected $casts = [
        'date' => 'datetime',
    ];

    protected $appends = ['created_by_name'];

    public function getCreatedByNameAttribute()
    {
        if ($this->user) {
            return $this->user->name;
        } else {
            return '';
        }
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'created_by', 'id');
    }

    public static function processPayment($attr, $policy)
    {
        $current_total = (float)$policy->invoicePrice();
        $total = $policy->totalPayment();
        $author = auth()->user()->id;

        if ($attr['payment_type'] == 'out') {
            $attr['amount'] =  -abs($attr['amount']);
        }
        $total_combine = $total + $attr['amount'];

        $payment = new PolicyPayment();
        $payment->policy_id = $policy->id;
        isset($attr['type']) ?  $payment->type = $attr['type'] : null;
        isset($attr['remarks']) ?  $payment->remarks = $attr['remarks'] : null;
        isset($attr['amount']) ?  $payment->amount = $attr['amount'] : null;

        isset($attr['reason']) ?  $payment->reason = $attr['reason'] : null;
        isset($attr['userable_id']) ?  $payment->userable_id = $attr['userable_id'] : null;
        isset($attr['reference']) ?  $payment->reference = $attr['reference'] : null;
        isset($attr['from']) ?  $payment->from = $attr['from'] : null;

        if ($attr['userable_type'] == 'Staff') {
            $payment->userable_type = User::class;
        } else if ($attr['userable_type'] == 'Dealer') {
            $payment->userable_type = Dealer::class;
        }

        $date = Carbon::parse($attr['date'])->setTimezone(config('app.timezone'));
        isset($attr['date']) ?  $payment->date = $date : null;

        isset($author) ? $payment->created_by = $author : null;
        $payment->balance = ($current_total - $total_combine);
        $payment->save();

        $policy = Policy::find($policy->id);
        $policy->paymentAdded();
        $policy->generateReport();

        return $payment;
    }
}

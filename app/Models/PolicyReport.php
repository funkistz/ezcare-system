<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PolicyReport extends Model
{
    use HasFactory;

    protected $fillable = [
        'policy_id',
        'total_amount',
        'total_sales',
        'total_paid',
        'total_unpaid',
        'total_overpaid',
        'total_nett',
        'total_tax',
        'last_paid_at',
        'status_code',
    ];

    public static function getTotalAmount($policy_ids)
    {
        $reports = PolicyReport::whereIn('policy_id', $policy_ids)->sum('total_amount');

        return $reports;
    }

    public static function getTotalSales($policy_ids)
    {
        $reports = PolicyReport::whereIn('policy_id', $policy_ids)->sum('total_sales');

        return $reports;
    }

    public static function getTotalNett($policy_ids)
    {
        $reports = PolicyReport::whereIn('policy_id', $policy_ids)->sum('total_nett');

        return $reports;
    }

    public static function getTotalPaid($policy_ids)
    {
        $reports = PolicyReport::whereIn('policy_id', $policy_ids)->sum('total_paid');

        return $reports;
    }

    public static function getTotalUnpaid($policy_ids)
    {
        $reports = PolicyReport::whereIn('policy_id', $policy_ids)->sum('total_unpaid');

        return $reports;
    }
}

<?php

namespace App\Models;

use App\Http\Traits\InspectionTrait;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;

class ScheduleInspection extends Model
{
    use HasFactory, InspectionTrait;

    protected $fillable = [
        'type',
        'date',
        'policy_no',
        'location',
        'period',
        'vehicle_total',
        'remarks',
        'status_code',
        'technician_id',
        'technician_branch_id',
        'marketing_officer_id',
        'dealer_id',
        'warranty_plan_id',
        'free_promo_id',
        'branch_id',
        'created_by',
    ];

    protected $appends = [
        'title', 'created_by_name', 'time', 'marketing_officer_name',
        'technician_name', 'dealer_name', 'warranty_plan_name',
        'free_promo_name', 'branch_name', 'status_color',
        'technician_branch_name',
        'period_name',
        'promo_name',
    ];
}

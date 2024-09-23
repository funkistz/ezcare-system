<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Http\Traits\InspectionTrait;

class NonInspection extends Model
{
    use HasFactory, InspectionTrait;

    protected $fillable = [
        'type',
        'date',
        'policy_no',
        'period',
        'vehicle',
        'chassis',
        'mileage',
        'remarks',
        'status_code',
        'technician_id',
        'branch_id',
        'marketing_officer_id',
        'dealer_id',
        'warranty_plan_id',
        'free_promo_id',
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

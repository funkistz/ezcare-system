<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Http\Traits\RequestTrait;

class Endorsement extends Model
{
    use HasFactory, RequestTrait;

    protected $fillable = [
        'vehicle',
        'registration_no',
        'warranty_plan_id',
        'dealer_id',
        'reasons',
        'created_by',
        'status_code',
        'activated_at',
        'expired_at',
    ];

    protected $appends = [
        'created_by_name',
        'dealer_name', 'warranty_plan_name',
        'status_color',
    ];
}

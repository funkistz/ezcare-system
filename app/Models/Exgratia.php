<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Http\Traits\RequestTrait;

class Exgratia extends Model
{
    use HasFactory, RequestTrait;

    protected $fillable = [
        'vehicle',
        'registration_no',
        'warranty_plan_id',
        'dealer_id',
        'reasons',
        'total_last_year_prod',
        'total_this_year_prod',
        'total_last_year_claim',
        'total_this_year_claim',
        'created_by',
        'status_code',
    ];

    protected $appends = [
        'created_by_name',
        'dealer_name', 'warranty_plan_name',
        'status_color',
    ];
}

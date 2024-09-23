<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Http\Traits\RequestTrait;

class Sponsorship extends Model
{
    use HasFactory, RequestTrait;

    protected $fillable = [
        'marketing_officer_id',
        'dealer_id',
        'reasons',
        'amount',
        'created_by',
        'status_code',
    ];

    protected $appends = [
        'created_by_name', 'marketing_officer_name',
        'dealer_name', 'warranty_plan_name',
        'status_color',
    ];
}

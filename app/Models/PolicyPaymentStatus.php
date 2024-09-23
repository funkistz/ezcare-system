<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PolicyPaymentStatus extends Model
{
    use HasFactory;

    protected $fillable = [
        'policy_id',
        'status_code',
        'reason_code',
        'remarks',
        'amount',
        'created_by'
    ];
}

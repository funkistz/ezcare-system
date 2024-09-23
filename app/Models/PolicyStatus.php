<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PolicyStatus extends Model
{
    use HasFactory;

    protected $fillable = [
        'policy_id',
        'status_code',
        'reason_code',
        'remarks',
        'created_by'
    ];
}

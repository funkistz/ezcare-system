<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class PolicyOverwrite extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'policy_id',
        'field',
        'amount',
        'value',
        'remarks',
        'status_code',
        'created_by',
    ];
}

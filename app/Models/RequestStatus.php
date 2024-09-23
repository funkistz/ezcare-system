<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RequestStatus extends Model
{
    use HasFactory;

    protected $fillable = [
        'requestable_id',
        'requestable_type',
        'status_code',
        'remarks',
        'created_by',
    ];

    public function requestable()
    {
        return $this->morphTo();
    }
}

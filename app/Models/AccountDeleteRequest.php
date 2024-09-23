<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AccountDeleteRequest extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'status_code',
        'user_id',
    ];

    public function item()
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }
}

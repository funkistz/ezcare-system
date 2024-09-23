<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PolicyFile extends Model
{
    use HasFactory;

    protected $fillable = [
        'type',
        'name',
        'remarks',
        'policy_id',
        'file_id',
        'created_by',
    ];

    public function policy()
    {
        return $this->belongsTo(Policy::class);
    }

    public function file()
    {
        return $this->belongsTo(File::class);
    }
}

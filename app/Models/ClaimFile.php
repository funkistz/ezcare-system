<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ClaimFile extends Model
{
    use HasFactory;

    protected $fillable = [
        'type',
        'name',
        'remarks',
        'claim_id',
        'file_id',
        'created_by',
    ];

    public function claim()
    {
        return $this->belongsTo(Claim::class);
    }

    public function file()
    {
        return $this->belongsTo(File::class);
    }
}

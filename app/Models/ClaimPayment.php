<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ClaimPayment extends Model
{
    use HasFactory;

    protected $fillable = [
        'claim_id',
        'amount',
        'date',
        'reference_no',
        'remarks',
        'created_by',
    ];

    public function claim()
    {
        return $this->belongsTo(PolicyClaim::class, 'claim_id', 'id');
    }

    public function files()
    {
        return $this->morphToMany(File::class, 'fileable');
    }
}

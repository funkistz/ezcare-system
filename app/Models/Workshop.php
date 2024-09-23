<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Workshop extends Model
{
    use HasFactory,
        SoftDeletes,
        \App\Http\Traits\HasActiveTrait,
        \App\Http\Traits\ToSelectDataTrait;

    protected $fillable = [
        'code',
        'name',
        'description',
        'phone_no_1',
        'phone_no_2',
        'lat',
        'lng',
        'is_ev',
        'is_hybrid',
    ];

    public function mainAddress()
    {
        return $this->morphOne(Address::class, 'addressable')->where('is_primary', 1);
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Branch extends Model
{
    use HasFactory,
        SoftDeletes,
        \App\Http\Traits\HasActiveTrait,
        \App\Http\Traits\ToSelectDataTrait;

    protected $fillable = [
        'code',
        'name',
        'description',
    ];

    public function mainAddress()
    {
        return $this->morphOne(Address::class, 'addressable')->where('is_primary', 1);
    }

    public function users()
    {
        return $this->belongsToMany(User::class, 'branch_user');
    }
}

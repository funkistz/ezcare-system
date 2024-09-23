<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;

class FreePromo extends Model
{
    use HasFactory;

    use HasFactory,
        \App\Http\Traits\HasActiveTrait,
        \App\Http\Traits\ToSelectDataTrait;

    protected $fillable = [
        'name',
        'description',
        'type',
        'amount',
    ];

    protected $appends = ['real_amount'];

    public function getRealAmountAttribute()
    {
        if ($this->type == 'month') {
            return (int)$this->amount . ' Months';
        } else {
            return $this->amount;
        }
    }

    public function scopeToRealDiscount(Builder $query)
    {
        return $query->get()->map(function ($brand) {

            if ($brand->type == 'month') {
                $brand->discount = (int)$brand->amount . ' month';
            }

            return $brand;
        });
    }
}

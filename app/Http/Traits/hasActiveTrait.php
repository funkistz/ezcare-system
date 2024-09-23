<?php

namespace App\Http\Traits;

use Illuminate\Database\Eloquent\Builder;

trait HasActiveTrait
{

    public function scopeActive(Builder $query): void
    {
        $query->where('is_active', 1);
    }
}

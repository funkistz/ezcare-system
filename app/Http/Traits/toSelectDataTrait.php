<?php

namespace App\Http\Traits;

use Illuminate\Database\Eloquent\Builder;

trait ToSelectDataTrait
{

    public function scopeToSelectData(Builder $query, $extra = null)
    {
        return $query->get()->map(function ($brand) use ($extra) {

            $temp = [
                'label' => ucwords($brand->name),
                'value' => strval($brand->id),
            ];

            if (!empty($extra)) {

                foreach ($extra as $key => $field) {
                    $temp[$field] = $brand->{$field};
                }
            }

            return $temp;
        });
    }

    public function scopeToSelectDataCode(Builder $query, $extra)
    {
        return $query->get()->map(function ($brand) use ($extra) {

            $temp = [
                'label' => ucwords($brand->name),
                'value' => $brand->code,
            ];

            if (!empty($extra)) {

                foreach ($extra as $key => $field) {
                    $temp[$field] = $brand->{$field};
                }
            }

            return $temp;
        });
    }
}

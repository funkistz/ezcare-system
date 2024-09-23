<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use DougSisk\CountryState\CountryState;
use Illuminate\Support\Facades\DB;

class Supplier extends Model
{
    use HasFactory,
        SoftDeletes,
        \App\Http\Traits\HasActiveTrait,
        \App\Http\Traits\ToSelectDataTrait;

    protected $fillable = [
        'code',
        'name',
        'description',
        'phone_no',
        'phone_no2',
    ];

    protected $appends = ['full_name'];

    public function getFullNameAttribute()
    {
        return $this->name;
    }

    public function mainAddress()
    {
        return $this->morphOne(Address::class, 'addressable')->where('is_primary', 1);
    }

    public function getAddressFullAttribute()
    {
        $address = $this->mainAddress;
        $country_state = new CountryState();

        $address_full = '';
        !empty($address->line1) ? ($address_full .=  $address->line1) : '';
        !empty($address->line2) ? ($address_full .= '\n' . $address->line2) : '';
        !empty($address->line3) ? ($address_full .= '\n' . $address->line3) : '';
        !empty($address->postcode) ? ($address_full .= '\n' . $address->postcode) : '';
        !empty($address->city) ? ($address_full .= ' ' . ucfirst($address->city)) : '';
        !empty($address->state) ? ($address_full .= '\n' . ucfirst($address->state)) : '';
        !empty($address->country) ? ($address_full .= ', ' . $country_state->getCountryName($address->country)) : '';

        return $address_full;
    }

    public static function getListCarParts()
    {
        $result = Supplier::select([DB::raw('CAST(id AS CHAR) as value'), 'name AS label'])
            ->where('is_active', 1)
            ->orderBy('name')
            ->get();

        return $result;
    }
}

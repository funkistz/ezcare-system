<?php

namespace App\Models;

use DougSisk\CountryState\CountryState;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Lwwcas\LaravelCountries\Models\Country;
use OwenIt\Auditing\Contracts\Auditable;

class Customer extends Model implements Auditable
{
    use HasFactory, \OwenIt\Auditing\Auditable;

    protected $fillable = [
        'ic',
        'first_name',
        'last_name',
        'nationality',
        'phone_no',
    ];

    protected $appends = ['full_name', 'email', 'address_full'];

    public function getFullNameAttribute()
    {
        $name = $this->first_name;

        if (!empty($this->last_name)) {
            $name .= ' ' . $this->last_name;
        }

        return $name;
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

    public function getEmailAttribute()
    {
        if (isset($this->user)) {
            return $this->user->email;
        }
        return '';
    }

    public function policies()
    {
        return $this->hasMany(Policy::class)->orderBy('created_at', 'DESC');
    }

    public static function addOrUpdate($attr)
    {
        $attr['phone_no'] = preg_replace('/[^0-9]/', '', $attr['phone_no']);


        $customer = Customer::where('ic', $attr['ic'])->first();

        if (empty($customer)) {
            $customer = new Customer();
            $customer->first_name = $attr['first_name'];
            $customer->last_name = $attr['last_name'];
            $customer->ic = $attr['ic'];
            $customer->nationality = $attr['nationality'];
            if ($attr['phone_no']) {
                $customer->phone_no = $attr['phone_no'];
            }
            $customer->save();
        } else {
            $customer->first_name = $attr['first_name'];
            $customer->last_name = $attr['last_name'];
            $customer->ic = $attr['ic'];
            $customer->nationality = $attr['nationality'];
            if ($attr['phone_no']) {
                $customer->phone_no = $attr['phone_no'];
            }
            $customer->save();
        }

        if (!empty($customer->mainAddress)) {
            $address = $customer->mainAddress;
            $address->line1 = $attr['line1'];
            $address->line2 = !empty($attr['line2']) ? $attr['line2'] : '';
            $address->line3 = !empty($attr['line3']) ? $attr['line3'] : '';
            $address->city = $attr['city'];
            $address->postcode = $attr['postcode'];
            $address->country = $attr['country'];
            $address->state = $attr['state'];
            $address->is_primary = true;
            $address->addressable_type = Customer::class;
            $address->addressable_id = $customer->id;
            $address->save();
        } else {
            $address = new Address();
            $address->line1 = $attr['line1'];
            $address->line2 = !empty($attr['line2']) ? $attr['line2'] : '';
            $address->line3 = !empty($attr['line3']) ? $attr['line3'] : '';
            $address->city = $attr['city'];
            $address->postcode = $attr['postcode'];
            $address->country = $attr['country'];
            $address->state = $attr['state'];
            $address->is_primary = true;
            $address->addressable_type = Customer::class;
            $address->addressable_id = $customer->id;
            $address->save();
        }

        if (empty($customer->user)) {
            $user = new User();

            if ($attr['email']) {
                $user->email = $attr['email'];
            }
            if ($attr['phone_no']) {
                $user->phone_no = $attr['phone_no'];
            }
            if ($attr['username']) {
                $user->username = $attr['username'];
            }

            $user->name = $attr['first_name'];
            $user->username = $attr['ic'];


            $user->password = Hash::make($attr['ic']);
            $user->userable_type = Customer::class;
            $user->userable_id = $customer->id;
            $user->save();

            $user->assignRole('customer');
        } else {
            $user = $customer->user;
            $user->email = $attr['email'];
            if ($attr['email']) {
                $user->email = $attr['email'];
            }
            if ($attr['phone_no']) {
                $user->phone_no = $attr['phone_no'];
            }
            if ($attr['username']) {
                $user->username = $attr['username'];
            } else {
                $user->username = $attr['ic'];
            }
            $user->name = $attr['first_name'];

            $user->save();
        }

        return $customer;
    }

    public function user()
    {
        return $this->morphOne(User::class, 'userable');
    }

    public function addresses()
    {
        return $this->morphMany(Address::class, 'addressable');
    }

    public function mainAddress()
    {
        return $this->morphOne(Address::class, 'addressable')->where('is_primary', 1);
    }
}

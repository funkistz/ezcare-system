<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Customer;
use App\Http\Resources\DefaultResource;
use App\Models\Address;
use CountryState;
use App\Models\User;
use App\Models\GeneralSetting;
use App\Models\Policy;
use Illuminate\Support\Facades\Hash;

class CustomerController extends Controller
{
    public function index(Request $request)
    {
        $data = Customer::with(['mainAddress', 'addresses']);

        if ($request->search) {
            $search_like = '%' . $request->search . '%';
            $data = $data->orWhere('first_name', 'LIKE', $search_like)->orWhere('last_name', 'LIKE', $search_like)->orWhere('ic', 'LIKE', $search_like);
        }
        $data = $data->paginate(30);

        $data = DefaultResource::collection($data);
        $settings = GeneralSetting::get()->keyBy('name');

        $countries_temp = CountryState::getCountries();
        $countries = [];

        foreach ($countries_temp as $x => $val) {
            array_push($countries, [
                'label' => $val,
                'value' => $x,
            ]);
        }

        return inertia('Customer/Index', [
            'customers' => $data,
            'countries' => $countries,
            'settings' => $settings,
        ]);
    }

    public function store(Request $request)
    {

        $request->validate([
            'first_name' => 'required',
            'ic' => 'required|unique:customers',
            'phone_no' => 'required|unique:customers',
            'email' => 'unique:users',
        ]);

        $attr = $request->toArray();
        $attr['phone_no'] = preg_replace('/[^0-9]/', '', $attr['phone_no']);

        try {
            $customer = new Customer();
            $customer->first_name = $attr['first_name'];
            $customer->last_name = $attr['last_name'];
            $customer->ic = $attr['ic'];
            $customer->nationality = $attr['nationality'];
            if ($attr['phone_no']) {
                $customer->phone_no = $attr['phone_no'];
            }
            $customer->save();

            $address = new Address();
            $address->line1 = $attr['address_line_1'];
            $address->line2 = !empty($attr['address_line_2']) ? $attr['address_line_2'] : '';
            $address->line3 = !empty($attr['address_line_3']) ? $attr['address_line_3'] : '';
            $address->city = $attr['address_city'];
            $address->postcode = $attr['address_postcode'];
            $address->country = $attr['address_country'];
            $address->state = $attr['address_state'];
            $address->is_primary = true;
            $address->addressable_type = Customer::class;
            $address->addressable_id = $customer->id;
            $address->save();

            $user = new User();
            $user->email = $attr['email'];
            $user->username = $attr['email'];
            $user->name = $attr['first_name'];
            $user->username = $attr['ic'];

            if ($attr['phone_no']) {
                $user->phone_no = $attr['phone_no'];
            }
            $user->password = Hash::make($attr['ic']);
            $user->userable_type = Customer::class;
            $user->userable_id = $customer->id;
            $user->save();

            $user->assignRole('customer');

            return back()->with([
                'type' => 'success',
                'message' => 'Customer has been created',
            ]);
        } catch (\Illuminate\Database\QueryException $ex) {
            return back()->with([
                'type' => 'error',
                'message' => $ex->getMessage(),
            ]);
        }
    }

    public function update(Request $request, string $id)
    {

        $customer = Customer::find($id);
        $user = $customer->user;

        $request->validate([
            'first_name' => 'required',
            'ic' => 'required|unique:customers,ic,' . $customer->id,
            'phone_no' => 'required|unique:customers,phone_no,' . $customer->id,
            // 'email' => 'unique:users,email,' . $user->id,
        ]);

        try {
            $attr = $request->toArray();
            $attr['phone_no'] = preg_replace('/[^0-9]/', '', $attr['phone_no']);

            $customer = Customer::find($id);
            $customer->first_name = $attr['first_name'];
            $customer->last_name = $attr['last_name'];
            $customer->ic = $attr['ic'];
            $customer->nationality = $attr['nationality'];
            if ($attr['phone_no']) {
                $customer->phone_no = $attr['phone_no'];
            }
            $customer->save();

            if ($attr['email']) {
                $user->email = $attr['email'];
            }

            $user->name = $attr['first_name'];
            // $user->username = $attr['ic'];
            if ($attr['phone_no']) {
                $user->phone_no = $attr['phone_no'];
            }
            if (!empty($attr['password'])) {
                $user->password = Hash::make($attr['password']);
            }
            $user->save();

            if (!empty($attr['address_id'])) {
                $address = Address::find($attr['address_id']);
                $address->line1 = $attr['line1'];
                $address->line2 = !empty($attr['line2']) ? $attr['line2'] : '';
                $address->line3 = !empty($attr['line3']) ? $attr['line3'] : '';
                $address->city = $attr['city'];
                $address->postcode = $attr['postcode'];
                $address->country = $attr['country'];
                $address->state = $attr['state'];
                $address->save();
            }

            return back()->with([
                'type' => 'success',
                'message' => 'Customer has been updated',
            ]);
        } catch (\Illuminate\Database\QueryException $ex) {
            return back()->with([
                'type' => 'error',
                'message' => $ex->getMessage(),
            ]);
        }
    }

    public function destroy(string $id)
    {
        $model = Customer::find($id);
        $policy_count = Policy::where('customer_id', $id)->count();

        if ($policy_count > 0) {
            return back()->with([
                'type' => 'error',
                'message' => 'Cannot delete, this customer has atleast 1 policy.',
            ]);
        }

        try {

            $model->forceDelete();

            return back()->with([
                'type' => 'success',
                'message' => 'Customer has been deleted',
            ]);
        } catch (\Illuminate\Database\QueryException $ex) {
            return back()->with([
                'type' => 'error',
                'message' => $ex->getMessage(),
            ]);
        }
    }
}

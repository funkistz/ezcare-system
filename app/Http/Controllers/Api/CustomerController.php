<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Customer;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;

class CustomerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $customer = Customer::with(['user', 'mainAddress'])->where('ic', $request->ic)->first();

        if (!empty($customer->user)) {
            $customer->email = $customer->user->email;
        }

        if (!empty($customer->mainAddress)) {
            $customer->line1 = $customer->mainAddress->line1;
            $customer->line2 = $customer->mainAddress->line2;
            $customer->line3 = $customer->mainAddress->line3;
            $customer->country = $customer->mainAddress->country;
            $customer->state = $customer->mainAddress->state;
            $customer->city = $customer->mainAddress->city;
            $customer->postcode = $customer->mainAddress->postcode;
        }

        return response()->json([
            "status" => "success",
            "data" => $customer,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }

    public function policies(Request $request, string $id)
    {

        $customer = Customer::find($id);
        $policies = $customer->policies()->where('status_code', '!=', config('constant.status.deactivated.value'))->with(['vehicle', 'warrantyPlan', 'services', 'services.files'])->get();

        foreach ($policies as $key => $policy) {
            $policy->warrantyFiles = $policy->warrantyPlanFilesByYear()->values();

            $nextServices = $policy->nextService['next_services'];

            foreach ($nextServices as $key => $nextService) {
                $nextServices[$key]['next_mileage'] = $nextService['next_mileage'] . 'KM';
            }

            $policy->nextService = $nextServices;


            $policy->allServices = $policy->allServices;
            $policy->groupedServices = $policy->groupedServices;

            $policy->activated_at = Carbon::parse($policy->activated_at)->format('j/n/Y');
            $policy->expired_at = Carbon::parse($policy->expired_at)->format('j/n/Y');

            $activated_at = Carbon::createFromFormat('j/n/Y', $policy->activated_at);
            $expired_at = Carbon::createFromFormat('j/n/Y', $policy->expired_at)->addDay();

            $diffInMonths = $activated_at->diffInMonths($expired_at);
            $duration = '';

            if ($diffInMonths == 1) {
                $duration = '1 Month';
            } else if ($diffInMonths < 12) {
                $duration =  $diffInMonths . ' Months';
            } else {
                $years =  $diffInMonths / 12;

                if ($years == 1) {
                    $duration = '1 Year';
                } else {
                    $duration = $years . ' Year';
                }
            }

            $policy->display_data =  [
                [
                    'label' => 'Policy',
                    'value' => $duration,
                    'type' => 'badge_value',
                    'color' => 'primary.9',
                ],
                [
                    'label' => 'Activation Date:',
                    'value' => $policy->activated_at,
                    'type' => 'label',
                ],
                [
                    'label' => 'Expiry Date:',
                    'value' => $policy->expired_at,
                    'type' => 'label',
                ],
            ];

            $policy->display_data2 =  [
                [
                    'label' => 'Policy',
                    'value' => $duration,
                    'type' => 'badge_value',
                    'color' => 'primary.9',
                ],
                [
                    'label' => 'Activation Date:',
                    'value' => $policy->activated_at,
                    'type' => 'label',
                ],
                [
                    'label' => 'Expiry Date:',
                    'value' => $policy->expired_at,
                    'type' => 'label',
                ],
                [
                    'label' => 'Year:',
                    'value' => !empty($policy->vehicle) ? $policy->vehicle->year : '',
                    'type' => 'label',
                ],
                [
                    'label' => 'Power:',
                    'value' => !empty($policy->vehicle) ? $policy->vehicle->power : '',
                    'type' => 'label',
                ],
                [
                    'label' => 'Engine No:',
                    'value' => !empty($policy->vehicle) ? $policy->vehicle->engine_no : '',
                    'type' => 'label',
                ],
                [
                    'label' => 'Chassis No:',
                    'value' => !empty($policy->vehicle) ? $policy->vehicle->chassis_no : '',
                    'type' => 'label',
                ],
            ];

            foreach ($policy->coverages as $key2 => $coverage) {

                if ($coverage->pivot->period < 1) {
                    continue;
                }

                $expired_at = $activated_at->copy()->addMonths(12 * $coverage->pivot->period);

                $diffInMonths = $activated_at->diffInMonths($expired_at);
                $duration = '';

                if ($diffInMonths == 1) {
                    $duration = '1 Month';
                } else if ($diffInMonths < 12) {
                    $duration =  $diffInMonths . ' Months';
                } else {
                    $years =  $diffInMonths / 12;

                    if ($years == 1) {
                        $duration = '1 Year';
                    } else {
                        $duration = $years . ' Year';
                    }
                }

                $temp_Data = [
                    [
                        'type' => 'divider',
                        'color' => 'primary.2',
                    ],
                    [
                        'label' => $coverage->name,
                        'value' => $duration,
                        'type' => 'badge_value',
                        'color' => 'primary.9',
                    ],
                    [
                        'label' => 'Activation Date:',
                        'value' => $policy->activated_at,
                        'type' => 'label',
                    ],
                    [
                        'label' => 'Expiry Date:',
                        'value' => $expired_at->format('j/n/Y'),
                        'type' => 'label',
                    ],
                ];

                $policy->display_data = array_merge(
                    $policy->display_data,
                    $temp_Data
                );

                $policy->display_data2 = array_merge(
                    $policy->display_data2,
                    $temp_Data
                );

                $coverageActiveDate = Carbon::createFromFormat('j/n/Y', $policy->activated_at);
                $coverageExpiredAt = $coverageActiveDate->addYear()->subDay();
                $formattedCoverageExpiredAt = $coverageExpiredAt->format('j/n/Y');
                
                $coverage->document = $coverage->getDocByCondition($policy->activated_at);
                $coverage->coverage_activate_at = $policy->activated_at;
                $coverage->coverage_expired_at = $formattedCoverageExpiredAt;
                
            }
        }

        return response()->json([
            "status" => "success",
            "data" => $policies,
        ]);
    }
}

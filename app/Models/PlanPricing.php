<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PlanPricing extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'description',
        'vehicle_condition_id',
        'vehicle_group_id',
        'vehicle_power_capacity_id',
        'warranty_plan_id',
        'price',
        'addon_price',
        'dealer_price',
        'dealer_addon_price',
        'power_type',
        'min_power',
        'max_power',
    ];

    public function vehicle_condition()
    {
        return $this->belongsTo(VehicleCondition::class);
    }

    public function vehicle_group()
    {
        return $this->belongsTo(VehicleGroup::class);
    }

    public function vehicle_power_capacity()
    {
        return $this->belongsTo(VehiclePowerCapacity::class);
    }

    public function warranty_plan()
    {
        return $this->belongsTo(WarrantyPlan::class);
    }

    public function calculatePrice($pricing_type = 'dealer', $period = 1, $tax_id = null, $with_addon = false, $discounts = [], $coverages = [], $override_warranty = false)
    {
        $new_price = [
            'warranty_plan_price' => 0,
            'total_price' => 0,
            'subtotal' => 0,
            'subtotal_without_tax' => 0,
            'tax_price' => 0,
            'total_price' => 0,
            'discounts' => [],
        ];

        if ($override_warranty) {
            $plan_price = $override_warranty;
        } else {
            $plan_price = ($pricing_type == 'retail') ? $this->price : $this->dealer_price;
        }
        // $plan_addon_price = ($pricing_type == 'retail') ? $this->addon_price : $this->dealer_addon_price;
        $plan_addon_price = 0;

        $new_price['warranty_plan_price'] =  $plan_price;
        $new_price['warranty_plan_price_without_tax'] =  $plan_price;

        if ($with_addon == 'true' || $with_addon == 1) {
            $new_price['final_price_one'] =  $plan_price + $plan_addon_price;
            $new_price['final_price_one_without_tax'] =  $plan_price + $plan_addon_price;
            $new_price['addon_price'] =  $plan_addon_price;
            $new_price['addon_price_without_tax'] =  $plan_addon_price;
        } else {
            $new_price['final_price_one'] =  $plan_price;
            $new_price['final_price_one_without_tax'] =  $plan_price;
            $new_price['addon_price'] =  0;
            $new_price['addon_price_without_tax'] =  0;
        }

        $warranty_plan = $this->warranty_plan;
        $year_package = $warranty_plan->year_package;
        if ($year_package > 1) {
            $period =  $period / $year_package;
        }

        $new_price['total_price'] =  $new_price['final_price_one'] * $period;
        $new_price['total_price_without_tax'] =   $new_price['final_price_one_without_tax'] * $period;

        $new_price['subtotal'] = $new_price['total_price'];
        $new_price['subtotal_without_tax'] = $new_price['total_price_without_tax'];

        // dump('warranty_plan_price');
        // dump($plan_price);
        // dump('total_price');
        // dump($new_price);

        if (!empty($tax_id)) {
            $tax = Tax::find($tax_id);
        }

        $total_coverage = 0;
        if (!empty($coverages)) {
            foreach ($coverages as $key => $coverage) {
                $temp_coverage = 0;

                $temp_coverage = ($pricing_type == 'retail') ? (float)$coverage['price'] : (float)$coverage['dealer_price'];
                $temp_coverage *= $coverage['period'];
                $total_coverage += $temp_coverage;

                $coverages[$key]['total_price'] = $temp_coverage;
                $coverages[$key]['total_price_without_tax'] = $temp_coverage;

                if (!empty($tax_id)) {
                    $coverages[$key]['total_price_without_tax'] = $temp_coverage / (1 + $tax->rate);
                }
            }

            $new_price['total_price'] = $new_price['total_price'] + $total_coverage;
        }
        $new_price['total_coverage'] = $total_coverage;

        $total_discount = 0;
        if (!empty($discounts)) {
            foreach ($discounts as $key => $discount) {
                $temp_discount = 0;

                if ($discount['type'] == 'year') {
                    $temp_discount = ($new_price['final_price_one'] * (int)$discount['amount']);
                } else if ($discount['type'] == 'percentage') {
                    $temp_discount = ($new_price['total_price'] * (float)$discount['amount'] / 100);
                } else if ($discount['type'] == 'exact') {
                    $temp_discount = (float)$discount['amount'];
                }
                $total_discount += $temp_discount;

                $discounts[$key]['total_discount'] = $temp_discount;
                $discounts[$key]['total_discount_without_tax'] = $temp_discount;

                if (!empty($tax_id)) {
                    $discounts[$key]['total_discount_without_tax'] = $temp_discount / (1 + $tax->rate);
                }
            }

            $new_price['total_price'] = $new_price['total_price'] - $total_discount;
        }
        $new_price['total_discount'] = $total_discount;

        if (!empty($tax_id)) {
            $before_tax_final_price_one =  ($new_price['final_price_one'] / (1 + $tax->rate));
            $before_tax_addon =  ($new_price['addon_price'] / (1 + $tax->rate));
            $before_tax_warranty_price =  ($new_price['warranty_plan_price'] / (1 + $tax->rate));
            $before_tax_total =  ($new_price['total_price'] / (1 + $tax->rate));
            $before_tax_subtotal =  ($new_price['subtotal'] / (1 + $tax->rate));
            $before_tax_total_discount =  ($new_price['total_discount'] / (1 + $tax->rate));
            $before_tax_coverage =  ($new_price['total_coverage'] / (1 + $tax->rate));

            $new_price['tax_price'] = $new_price['total_price'] - $before_tax_total;

            $new_price['final_price_one_without_tax'] = $before_tax_final_price_one;
            $new_price['addon_price_without_tax'] = $before_tax_addon;
            $new_price['warranty_plan_price_without_tax'] = $before_tax_warranty_price;
            $new_price['total_price_without_tax'] = $before_tax_total;
            $new_price['subtotal_without_tax'] = $before_tax_subtotal;
            $new_price['total_discount_without_tax'] = $before_tax_total_discount;
            $new_price['total_coverage_without_tax'] = $before_tax_coverage;
        }

        $new_price['warranty_plan_price'] = number_format((float)$new_price['warranty_plan_price'], 2, '.', '');
        $new_price['warranty_plan_price_without_tax'] = number_format((float)$new_price['warranty_plan_price_without_tax'], 2, '.', '');

        $new_price['final_price_one'] = number_format((float)$new_price['final_price_one'], 2, '.', '');
        $new_price['final_price_one_without_tax'] = number_format((float)$new_price['final_price_one_without_tax'], 2, '.', '');

        $new_price['addon_price'] = number_format((float)$new_price['addon_price'], 2, '.', '');
        $new_price['addon_price_without_tax'] = number_format((float)$new_price['addon_price_without_tax'], 2, '.', '');

        $new_price['subtotal'] = number_format((float)$new_price['subtotal'], 2, '.', '');
        $new_price['subtotal_without_tax'] = number_format((float)$new_price['subtotal_without_tax'], 2, '.', '');

        $new_price['total_discount'] = number_format((float)$new_price['total_discount'], 2, '.', '');
        $new_price['total_discount_without_tax'] = number_format((float)$new_price['total_discount_without_tax'], 2, '.', '');

        $new_price['total_coverage'] = number_format((float)$new_price['total_coverage'], 2, '.', '');
        $new_price['total_coverage_without_tax'] = number_format((float)$new_price['total_coverage_without_tax'], 2, '.', '');

        $new_price['total_price'] = number_format((float)$new_price['total_price'], 2, '.', '');
        $new_price['total_price_without_tax'] = number_format((float)$new_price['total_price_without_tax'], 2, '.', '');

        $new_price['tax_price'] = number_format((float)$new_price['tax_price'], 2, '.', '');

        $new_price['coverages'] = $coverages;
        $new_price['discounts'] = $discounts;

        // dump($discounts);

        return $new_price;
    }

    public function calculateAllPrice($period = 1, $tax_id = null, $with_addon = false, $discounts = [], $coverages = [], $override_warranty = null)
    {
        return [
            'dealer' => $this->calculatePrice('dealer', $period, $tax_id, $with_addon, $discounts, $coverages, $override_warranty),
            'retail' => $this->calculatePrice('retail', $period, $tax_id, $with_addon, $discounts, $coverages)
        ];
    }

    public static function getPlanPricingByPolicy($policy_id, $override_warranty = null)
    {
        $policy = Policy::find($policy_id);

        $warranty_plan_id = $policy->warranty_plan_id;
        $tax_id = $policy->tax_id;
        $period = $policy->period;
        $with_addon = $policy->with_addon;
        $discounts = $policy->discounts;
        $coverages = $policy->coverages;

        $coverage_temp = [];
        foreach ($coverages as $key => $coverage) {

            $coverage_temp[] = [
                "id" => $coverage->id,
                "name" => $coverage->name . ': ' . $coverage->pivot->period . ' YEAR' . (($coverage->pivot->period > 1) ? 'S' : ''),
                "description" => $coverage->description,
                "price" => $coverage->price,
                "dealer_price" => $coverage->dealer_price,
                "period" => $coverage->pivot->period,
            ];
        }

        $discount_temp = [];
        foreach ($discounts as $key => $discount) {
            $discount_temp[] = [
                "id" => $discount->id,
                "name" => $discount->name,
                "description" => $discount->description,
                "type" => $discount->type,
                "amount" => $discount->amount,
            ];
        }

        $vehicle = $policy->vehicle;

        $vehicle_model_id = $vehicle->vehicle_model_id;
        $vehicle_condition_id = $vehicle->vehicle_condition_id;
        $vehicle_power = $vehicle->power_capacity;
        $vehicle_power_type = $vehicle->power_type;

        // $vehicle_group = VehicleGroup::whereHas('vehicle_models', function ($q) use ($vehicle_model_id) {
        //     $q->where('vehicle_models.id', $vehicle_model_id);
        // })->first();

        $vehicle_group_ids = VehicleGroup::whereHas('vehicle_models', function ($q) use ($vehicle_model_id) {
            $q->where('vehicle_models.id', $vehicle_model_id);
        })->get()->pluck('id');

        if (!empty($vehicle_group_ids)  && $period) {

            $plan_pricing = PlanPricing::where('vehicle_condition_id', $vehicle_condition_id)
                ->where('warranty_plan_id', $warranty_plan_id)
                ->whereIn('vehicle_group_id', $vehicle_group_ids);

            if (!empty($vehicle_power) && !empty($vehicle_power_type)) {
                $plan_pricing->where('power_type', $vehicle_power_type)->where('min_power', '<=', (int)$vehicle_power)->where('max_power', '>=', (int)$vehicle_power);
            } else {
            }

            $plan_pricing =  $plan_pricing->first();

            if (empty($plan_pricing)) {
                return false;
            }

            $calculatedPrice = $plan_pricing->calculateAllPrice($period, $tax_id, $with_addon, $discount_temp, $coverage_temp, $override_warranty);

            return $calculatedPrice;
        }

        return false;
    }
}

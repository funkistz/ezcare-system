<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Carbon;
use OwenIt\Auditing\Contracts\Auditable;
use App\Helpers\FileHelper;
use Illuminate\Database\Eloquent\Builder;


class Policy extends Model implements Auditable
{
    use HasFactory, \OwenIt\Auditing\Auditable;

    protected $appends = ['can_activate', 'technical_staff_name', 'mo_name', 'dealer_name', 'created_by_name', 'status_color', 'payment_status_color'];

    public function getCreatedByNameAttribute()
    {
        if ($this->user) {
            return $this->user->name;
        } else {
            return '';
        }
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'created_by', 'id');
    }

    public function getTotalPaymentAttribute()
    {
        $payments = $this->payments;
        $total = 0;
        $latest_date = '-';
        $latest_date_ori = null;
        foreach ($payments as $key => $payment) {
            $total += (float)$payment->amount;

            if ((float)$payment->amount >= 0) {
                $latest_date = Carbon::parse($payment->date)->format('d/m/Y');
                $latest_date_ori = $payment->date;
            }
        }

        return [
            'total' => $total,
            'latest_date' => $latest_date,
            'latest_date_ori' => $latest_date_ori,
        ];
    }

    public function getDealerTotalPaymentAttribute()
    {
        $payments = $this->dealerPayments;
        $total = 0;
        $latest_date = '-';
        foreach ($payments as $key => $payment) {
            $total += (float)$payment->amount;
            $latest_date = Carbon::parse($payment->date)->format('d/m/Y');
        }

        return [
            'total' => $total,
            'latest_date' => $latest_date,
        ];
    }

    public function getCustomerTotalPaymentAttribute()
    {
        $payments = $this->customerPayments;
        $total = 0;
        $latest_date = '-';
        foreach ($payments as $key => $payment) {
            $total += (float)$payment->amount;
            $latest_date = Carbon::parse($payment->date)->format('d/m/Y');
        }

        return [
            'total' => $total,
            'latest_date' => $latest_date,
        ];
    }

    public function getTechnicalStaffNameAttribute()
    {
        if ($this->technicalStaff) {
            return $this->technicalStaff->name;
        } else {
            return '';
        }
    }

    public function getMoNameAttribute()
    {
        if ($this->marketingOfficer) {
            return $this->marketingOfficer->name;
        } else {
            return '';
        }
    }

    public function getDealerNameAttribute()
    {
        if ($this->dealer) {
            return $this->dealer->name;
        } else {
            return '';
        }
    }

    public function getCanActivateAttribute()
    {
        $required_docs = GeneralSetting::where('name', 'policy_mandatory_documents')->first();
        $required_docs = $required_docs ? explode(",", $required_docs->value) : [];

        $count_ic = count($this->icFiles);
        if (in_array("ic", $required_docs) && $count_ic <= 0) {
            return false;
        }
        $count_grant = count($this->grantFiles);
        if (in_array("grant", $required_docs) && $count_grant <= 0) {
            return false;
        }
        $count_vehicle = count($this->vehicleFiles);
        if (in_array("vehicle", $required_docs) && $count_vehicle <= 0) {
            return false;
        }
        $count_chassis = count($this->chassisFiles);
        if (in_array("chassis", $required_docs) && $count_chassis <= 0) {
            return false;
        }
        $count_speedometer = count($this->speedometerFiles);
        if (in_array("speedometer", $required_docs) && $count_speedometer <= 0) {
            return false;
        }
        $count_mileage = count($this->mileageFiles);
        if (in_array("mileage", $required_docs) && $count_mileage <= 0) {
            return false;
        }
        $count_diagnose = count($this->diagnoseFiles);
        if (in_array("diagnose", $required_docs) && $count_diagnose <= 0) {
            return false;
        }

        return true;

        // if (
        //     (in_array("ic", $required_docs) && $count_ic > 0) &&
        //     (in_array("grant", $required_docs) && $count_grant > 0)  &&
        //     (in_array("vehicle", $required_docs) && $count_vehicle > 0)  &&
        //     (in_array("chassis", $required_docs) && $count_chassis > 0)  &&
        //     (in_array("speedometer", $required_docs) && $count_speedometer > 0) &&
        //     (in_array("diagnose", $required_docs) && $count_diagnose > 0) &&
        //     (in_array("mileage", $required_docs) && $count_mileage > 0)
        // ) {
        //     return true;
        // } else {
        //     return false;
        // }
    }

    public function getNextServiceAttribute($service_type_id = null)
    {
        $current_mileage = $this->vehicle->mileage;
        $current_date = $this->activated_at;
        $services = $this->services;

        $engine_service = [];
        $atf_service = [];

        // $last_engine_service = $this->lastEngineService;
        // $last_atf_service = $this->lastAtfService;

        if (empty($this->warrantyPlan)) {
            return ['status' => 'failed', 'message' => 'Policy do not have any warranty plan!'];
        }

        // dd($this->warrantyPlan->firstServices);

        if (!empty($this->warrantyPlan->firstServices) && count($this->warrantyPlan->firstServices) == 0) {
            return ['status' => 'failed', 'message' => 'First service setting not setup, please set it on seeting to proceed.'];
        }

        $service_types = ServiceType::where('power_type', $this->vehicle->power_type)->get();

        $next_services = [];

        foreach ($service_types as $key => $service_type) {

            $curr_services = Service::where('service_type_id', $service_type->id)->where('policy_id', $this->id)->orderBy('current_date', 'desc')->get();

            if ($curr_services->isEmpty()) {

                $first_service_rule = WarrantyFirstService::where('warranty_plan_id', $this->warranty_plan_id)->where('service_type_id', $service_type->id)->first();

                // dump($first_service_rule);

                if ($first_service_rule) {
                    //first service
                    $next_services[] = [
                        'service_type_id' => $service_type->id,
                        'service_name' => $service_type->name,
                        'name' => $service_type->name,
                        'next_mileage' => ($current_mileage + $first_service_rule->first_service_mileage),
                        'next_date' => Carbon::parse($current_date)->addMonths($first_service_rule->first_service_months)->format('j/n/Y'),
                    ];
                } else {
                    return ['status' => 'failed', 'message' => 'First service setting not setup, please set it on seeting to proceed.'];
                }
            } else {

                $next_services[] = [
                    'service_type_id' => $service_type->id,
                    'service_name' => $service_type->name,
                    'name' => $service_type->name,
                    'next_mileage' => $curr_services[0]->next_mileage,
                    'next_date' => Carbon::parse($curr_services[0]->next_date)->format('j/n/Y'),
                ];
            }
        }

        if (!empty($service_type_id)) {
            $objs = array_column($next_services, null, "service_type_id");
            $objs['a']['value'] = 5;

            foreach ($next_services as $next_service) {
                if ($next_service['service_type_id'] == $service_type_id) {
                    $next_services = $next_service;
                };
            }
        }

        return [
            'status' => 'success',
            'next_services' => $next_services
        ];
    }

    public function getNextServiceAllAttribute()
    {
        $current_mileage = $this->vehicle->mileage;
        $current_date = $this->activated_at;
        $services = $this->services;

        $engine_service = [];
        $atf_service = [];

        $last_engine_service = $this->lastEngineService;
        $last_atf_service = $this->lastAtfService;

        $services = [];

        if (empty($last_engine_service)) {

            array_push($services, [
                'name' => 'Engine Oil',
                'next_mileage' => ($current_mileage + 7000) . 'KM',
                'next_date' => Carbon::parse($current_date)->addMonths(4)->format('j/n/Y'),
            ]);
        } else {

            array_push($services, [
                'name' => 'Engine Oil (' .  $last_engine_service->oil_name . ')',
                'next_mileage' => $last_engine_service->next_mileage . 'KM',
                'next_date' => Carbon::parse($last_engine_service->next_date)->format('j/n/Y'),
            ]);
        }

        if (empty($last_atf_service)) {

            array_push($services, [
                'name' => 'ATF Oil',
                'next_mileage' => ($current_mileage + 30000) . 'KM',
                'next_date' => Carbon::parse($current_date)->addMonths(12)->format('j/n/Y'),
            ]);
        } else {

            array_push($services, [
                'name' => 'ATF Oil',
                'next_mileage' => $last_atf_service->next_mileage . 'KM',
                'next_date' => Carbon::parse($last_atf_service->next_date)->format('j/n/Y'),
            ]);
        }

        return  $services;
    }

    public function getAllServicesAttribute()
    {
        $current_mileage = $this->vehicle->mileage;
        $current_date = $this->activated_at;
        $services = $this->services;


        $engine_service = $this->engineServices;
        $atf_service = $this->atfServices;

        $engines = [];
        $atfs = [];

        foreach ($engine_service as $key => $engine) {
            array_push($engines, [
                'name' =>  $engine->oil_name,
                'mileage' => $engine->current_mileage . 'KM',
                'date' => Carbon::parse($engine->current_date)->format('j/n/Y'),
            ]);
        }

        foreach ($atf_service as $key => $atf) {
            array_push($atfs, [
                'name' => $atf->oil_name,
                'mileage' => $atf->current_mileage . 'KM',
                'date' => Carbon::parse($atf->current_date)->format('j/n/Y'),
            ]);
        }


        return  [
            [
                'name' => 'Engine Oil',
                'data' => $engines
            ],
            [
                'name' => 'ATF Oil',
                'data' => $atfs
            ]
        ];
    }

    public function getGroupedServicesAttribute()
    {
        $service_types = ServiceType::where('power_type', $this->vehicle->power_type)->get();

        $all_services = [];

        foreach ($service_types as $key => $service_type) {
            $curr_services = Service::where('service_type_id', $service_type->id)->where('policy_id', $this->id)->orderBy('current_date', 'asc')->get();

            foreach ($curr_services as $key => $curr_service) {
                $curr_service['name'] = $curr_service->oil_name;
                $curr_service['mileage'] = $curr_service->current_mileage . 'KM';
                $curr_service['date'] = Carbon::parse($curr_service->current_date)->format('j/n/Y');
                $curr_service['invoice_date'] = Carbon::parse($curr_service->invoice_date)->format('j/n/Y');
                $curr_service['reminder_files'] = $curr_service->reminderFiles;
                $curr_service['workshop_files'] = $curr_service->workshopFiles;
                $curr_service['mileage_files'] = $curr_service->mileageFiles;
            }

            if (!$curr_services->isEmpty()) {
                $all_services[] = [
                    'name' => $service_type->name,
                    'data' => $curr_services,
                ];
            }
        }


        return  $all_services;
    }

    public function getStatusColorAttribute()
    {
        if ($this->status_code == 'draft') {
            return 'gray';
        } else  if ($this->status_code == 'activated') {
            return 'green';
        } else  if ($this->status_code == 'deactivated') {
            return 'red';
        } else  if ($this->status_code == 'void') {
            return 'red';
        } else {
            return 'gray';
        }
    }

    public function getPaymentStatusColorAttribute()
    {
        if ($this->payment_status_code == 'unpaid') {
            return 'red';
        } else  if ($this->payment_status_code == 'paid') {
            return 'green';
        } else  if ($this->payment_status_code == 'partial') {
            return 'orange';
        } else  if ($this->payment_status_code == 'foc') {
            return 'pink';
        } else {
            return 'gray';
        }
    }

    public function services()
    {
        return $this->hasMany(Service::class);
    }

    public function engineServices()
    {
        return $this->hasMany(Service::class)->where('service_type_id', 1);
    }

    public function atfServices()
    {
        return $this->hasMany(Service::class)->where('service_type_id', 2);
    }

    public function lastEngineService()
    {
        return $this->hasOne(Service::class)->where('service_type_id', 1)->latest();
    }

    public function lastAtfService()
    {
        return $this->hasOne(Service::class)->where('service_type_id', 2)->latest();
    }

    public function claims()
    {
        return $this->hasMany(PolicyClaim::class);
    }

    public function technicalStaff()
    {
        return $this->belongsTo(User::class, 'technical_staff_id', 'id');
    }

    public function marketingOfficer()
    {
        return $this->belongsTo(User::class, 'marketing_officer_id', 'id');
    }

    public function vehicle()
    {
        return $this->belongsTo(Vehicle::class);
    }

    public function customer()
    {
        return $this->belongsTo(Customer::class);
    }

    public function dealer()
    {
        return $this->belongsTo(Dealer::class);
    }

    public function branch()
    {
        return $this->belongsTo(Branch::class);
    }

    public function status()
    {
        return $this->belongsTo(Status::class, 'code', 'status_code');
    }

    public function warrantyPlan()
    {
        return $this->belongsTo(WarrantyPlan::class);
    }

    public function warrantyPlanFiles()
    {
        return $this->warrantyPlan->filesByCondition($this->vehicle->vehicle_condition_id, $this->with_addon);
    }

    public function warrantyPlanFilesByYear()
    {
        $year = Carbon::parse($this->activated_at)->format('Y');
        return $this->warrantyPlan->filesByCondition($this->vehicle->vehicle_condition_id, $this->with_addon, $year);
    }

    public function statuses()
    {
        return $this->hasMany(PolicyStatus::class);
    }

    public function paymentStatuses()
    {
        return $this->hasMany(PolicyPaymentStatus::class, 'policy_id', 'id');
    }

    public function payments()
    {
        return $this->hasMany(PolicyPayment::class, 'policy_id', 'id');
    }

    public function customerPayments()
    {
        return $this->hasMany(PolicyPayment::class, 'policy_id', 'id')->where('from', 'customer');
    }

    public function dealerPayments()
    {
        return $this->hasMany(PolicyPayment::class, 'policy_id', 'id')->where('from', 'dealer');
    }

    public function latestPayments()
    {
        return $this->hasOne(PolicyPayment::class, 'policy_id', 'id')->where('amount', '>', 0)->orderBy('date', 'DESC');
    }

    // public function getPaymentsRemarkAttribute()
    // {
    //     $remark = '';
    //     if (count($this->payments) > 0) {

    //         foreach ($this->payments as $key => $payment) {
    //             $remark .= $payment->remarks . ', ';
    //         }
    //         return $remark;
    //     } else {
    //         return '';
    //     }
    // }

    public function getLatestPaymentAttribute()
    {
        $remark = '';
        if (count($this->payments) > 0) {

            foreach ($this->payments as $key => $payment) {
                $remark .= $payment->remarks . ', ';
            }
            return $remark;
        } else {
            return '';
        }
    }

    public function coverages()
    {
        return $this->belongsToMany(Coverage::class, 'coverages_policies', 'policy_id', 'coverage_id')->withPivot('amount', 'period');
    }

    public function discounts()
    {
        return $this->belongsToMany(PlanDiscount::class, 'policies_plan_discounts', 'policy_id', 'plan_discount_id')->withPivot('amount');
    }

    public function freePromos()
    {
        return $this->belongsToMany(FreePromo::class, 'policies_free_promos', 'policy_id', 'free_promo_id')->withPivot('amount');
    }

    public function files()
    {
        return $this->hasMany(PolicyFile::class, 'policy_id', 'id');
    }

    public function icFiles()
    {
        return $this->hasMany(PolicyFile::class, 'policy_id', 'id')->where('variant', 'ic');
    }

    public function grantFiles()
    {
        return $this->hasMany(PolicyFile::class, 'policy_id', 'id')->where('variant', 'grant');
    }

    public function vehicleFiles()
    {
        return $this->hasMany(PolicyFile::class, 'policy_id', 'id')->where('variant', 'vehicle');
    }

    public function chassisFiles()
    {
        return $this->hasMany(PolicyFile::class, 'policy_id', 'id')->where('variant', 'chassis');
    }

    public function speedometerFiles()
    {
        return $this->hasMany(PolicyFile::class, 'policy_id', 'id')->where('variant', 'speedometer');
    }
    public function mileageFiles()
    {
        return $this->hasMany(PolicyFile::class, 'policy_id', 'id')->where('variant', 'mileage');
    }

    public function diagnoseFiles()
    {
        return $this->hasMany(PolicyFile::class, 'policy_id', 'id')->where('variant', 'diagnose');
    }

    public function otherFiles()
    {
        return $this->hasMany(PolicyFile::class, 'policy_id', 'id')->where('variant', 'other');
    }

    public function totalPayment($payee = null)
    {
        if (empty($payee)) {
            $payments = $this->payments;
            $total = 0;
            foreach ($payments as $key => $payment) {
                $total += (float)$payment->amount;
            }

            return $total;
        } else {
            $payments = [];

            if ($payee == 'customer') {
                $payments = $this->customerPayments;
            } else if ($payee == 'dealer') {
                $payments = $this->dealerPayments;
            }
            $total = 0;
            foreach ($payments as $key => $payment) {
                $total += (float)$payment->amount;
            }

            return $total;
        }
    }

    public function invoicePrice()
    {
        $invoice = $this->activeInvoice;

        return !empty($invoice) ? $invoice->total : 0;
    }

    public function balancePayment()
    {
        $policy_price = (float)$this->invoicePrice();
        $total = $this->totalPayment();

        return $policy_price - $total;
    }

    public function getUnpaidPaymentAttribute()
    {
        $policy_price = (float)$this->invoicePrice();
        $total_payment = $this->totalPayment();

        return ($total_payment > $policy_price) ? 0 : ($policy_price - $total_payment);
    }

    public function dealerBalancePayment()
    {
        $policy_price = (float)$this->dealer_split_price;
        $total = $this->totalPayment('dealer');

        return $policy_price - $total;
    }

    public function customerBalancePayment()
    {
        $policy_price = (float)$this->customer_split_price;
        $total = $this->totalPayment('customer');

        return $policy_price - $total;
    }

    public function paymentAdded()
    {
        $policy_price = (float)$this->invoicePrice();
        $total = $this->totalPayment();

        if ($total == 0) {
            $this->payment_status_code = config('constant.status.unpaid.value');
            $this->save();
        } else  if ($total < $policy_price) {
            //partial
            $this->payment_status_code = config('constant.status.partial.value');
            $this->save();
        } else {
            $this->payment_status_code = config('constant.status.paid.value');
            $this->save();
        }

        return;
    }

    public function activeInvoice()
    {
        return $this->hasOne(PolicyInvoice::class)->where('is_main', true);
    }

    public function invoices()
    {
        return $this->hasMany(PolicyInvoice::class);
    }

    public function onActivate($remarks)
    {
        if (!isset($this->id)) {
            return;
        }

        $author = auth()->user()->id;

        $this->status_code = config('constant.status.activated.value');
        $this->save();

        //NO NEED because this one after invoice

        $policy_status = PolicyStatus::create([
            'policy_id' => $this->id,
            'status_code' => config('constant.status.activated.value'),
            'remarks' => $remarks,
            'created_by' => $author
        ]);

        // if (!empty($this->is_foc)) {
        //     $this->payment_status_code = config('constant.status.foc.value');
        //     $this->save();
        // } else {
        //     if (count($this->paymentStatuses) <= 0) {
        //         $policy_payment_status = PolicyPaymentStatus::create([
        //             'policy_id' => $this->id,
        //             'status_code' => config('constant.status.unpaid.value'),
        //             'created_by' => $author
        //         ]);
        //         $this->payment_status_code = config('constant.status.unpaid.value');
        //         $this->save();
        //     }
        // }
    }

    public function onDeactivate($remarks)
    {
        if (!isset($this->id)) {
            return;
        }

        $author = auth()->user()->id;

        $this->status_code = config('constant.status.deactivated.value');
        $this->save();

        $policy_status = PolicyStatus::create([
            'policy_id' => $this->id,
            'status_code' => config('constant.status.deactivated.value'),
            'remarks' => $remarks,
            'created_by' => $author
        ]);
    }

    public function onVoid($remarks)
    {
        if (!isset($this->id)) {
            return;
        }

        $author = auth()->user()->id;

        $this->status_code = config('constant.status.void.value');
        $this->save();

        $policy_status = PolicyStatus::create([
            'policy_id' => $this->id,
            'status_code' => config('constant.status.void.value'),
            'remarks' => $remarks,
            'created_by' => $author
        ]);
    }

    public function PolicyOverwrite()
    {
        return $this->hasMany(PolicyOverwrite::class, 'policy_id', 'id');
    }

    public function WarrantyPriceOverwrite()
    {
        return $this->hasOne(PolicyOverwrite::class, 'policy_id', 'id')->where('field', 'warranty_price')->where('status_code', 'approved');
    }

    public function generateInvoices($date, $regenerate = false)
    {
        if (!empty($this->WarrantyPriceOverwrite)) {
            $invoices = PlanPricing::getPlanPricingByPolicy($this->id, (float)$this->WarrantyPriceOverwrite->amount);
        } else {
            $invoices = PlanPricing::getPlanPricingByPolicy($this->id);
        }


        $warranty_plan = $this->warrantyPlan;
        $author = auth()->user() ? auth()->user()->id : null;

        $latest_invoice_id = PolicyInvoice::generateInvoiceNo();

        if (empty($latest_invoice_id)) {
            return false;
        }
        $branch_name = $this->branch->code;
        $generated_invoice_no = $branch_name . $latest_invoice_id;

        $warranty_plan = $this->warrantyPlan;
        $year_package = $warranty_plan->year_package;
        $period = $year_package;
        if ($year_package > 1) {
            $period =  $this->period / $year_package;
        }

        try {
            if (!is_array($invoices)) {
                return $invoices;
            };
            foreach ($invoices as $key => $invoice) {
                $items = [];

                $rate = $invoice['warranty_plan_price_without_tax'];
                $total_price = $invoice['warranty_plan_price_without_tax'] * $period;

                array_push(
                    $items,
                    [
                        'itemable_type' => WarrantyPlan::class,
                        'itemable_id' => $warranty_plan->id,
                        'description' => $warranty_plan->name,
                        'rate' => number_format((float)$rate, 2, '.', ''),
                        'quantity' => $period,
                        'total' => number_format((float)$total_price, 2, '.', '')
                    ]
                );

                if (floatval($invoice['addon_price']) > 0) {

                    $rate = $invoice['addon_price_without_tax'];
                    $total_price = $invoice['addon_price_without_tax'] * $period;

                    array_push(
                        $items,
                        [
                            'itemable_type' => null,
                            'itemable_id' => null,
                            'description' =>  $warranty_plan->name . ' Addon',
                            'rate' => number_format((float)$rate, 2, '.', ''),
                            'quantity' => $period,
                            'total' => number_format((float)$total_price, 2, '.', '')
                        ]
                    );
                }

                $policy = Policy::with(['vehicle', 'customer'])->where('id', $this->id)->first();
                // $content = json_encode($policy);

                $is_main = ($key == $policy->pricing_type);

                if ($key == 'dealer') {
                    $billable = $policy->dealer;
                    $billable_id = $policy->dealer_id;
                    $billable_type = Dealer::class;
                    $final_generated_invoice_no = $generated_invoice_no . 'D';
                } else {
                    $billable = $policy->customer;
                    $billable_id = $policy->customer_id;
                    $billable_type = Customer::class;
                    $final_generated_invoice_no =  $generated_invoice_no . 'C';
                }

                //process discount
                foreach ($invoice['discounts'] as $key2 => $discount) {
                    array_push(
                        $items,
                        [
                            'itemable_type' => PlanDiscount::class,
                            'itemable_id' => $discount['id'],
                            'description' => $discount['name'],
                            'rate' => -number_format((float)$discount['total_discount_without_tax'], 2, '.', ''),
                            'quantity' => 1,
                            'total' =>  -number_format((float)$discount['total_discount_without_tax'], 2, '.', '')
                        ]
                    );
                }

                //process coverage
                foreach ($invoice['coverages'] as $key2 => $coverage) {
                    array_push(
                        $items,
                        [
                            'itemable_type' => Coverage::class,
                            'itemable_id' => $coverage['id'],
                            'description' => $coverage['name'],
                            'rate' => number_format((float)$coverage['total_price_without_tax'], 2, '.', ''),
                            'quantity' => 1,
                            'total' =>  number_format((float)$coverage['total_price_without_tax'], 2, '.', '')
                        ]
                    );
                }

                // dump($invoice['discounts']);
                // dd(Carbon::parse($date));

                if (!$regenerate) {

                    $invoice = PolicyInvoice::create([
                        'policy_id' => $this->id,
                        'invoice_no' => $final_generated_invoice_no,
                        'date' => Carbon::parse($date),
                        'billable_type' =>  $billable_type,
                        'billable_id' =>  $billable_id,
                        'bill_to_name' => $billable->full_name,
                        'bill_to_address' => $billable->address_full,
                        'type' => $key,
                        'tax_id' => $policy->tax_id,
                        'is_main' => $is_main,
                        'subtotal' => $invoice['subtotal_without_tax'],
                        'discount' => $invoice['total_discount_without_tax'],
                        'tax' => $invoice['tax_price'],
                        'total' => $invoice['total_price'],
                        'created_by' => $author
                    ]);

                    foreach ($items as $key => $item) {
                        $item = InvoiceItem::create([
                            'policy_invoice_id' => $invoice->id,
                            'description' => $item['description'],
                            'remarks' => '',
                            'rate' => $item['rate'],
                            'quantity' => $item['quantity'],
                            'total' => $item['total']
                        ]);
                    }

                    if (!empty($this->is_foc)) {
                        $this->payment_status_code = config('constant.status.foc.value');
                        $this->save();
                    } else {
                        if (count($this->paymentStatuses) <= 0) {
                            $policy_payment_status = PolicyPaymentStatus::create([
                                'policy_id' => $this->id,
                                'status_code' => config('constant.status.unpaid.value'),
                                'created_by' => $author
                            ]);
                            $this->payment_status_code = config('constant.status.unpaid.value');
                            $this->save();
                        }
                    }
                } else {

                    if ($key == 'dealer') {
                        $policy_invoice = PolicyInvoice::where('policy_id', $this->id)->where('billable_type', Dealer::class)->first();
                        $temp_policy_invoice = $policy_invoice->replicate();

                        $policy_invoice->delete();
                    } else {

                        $policy_invoice = PolicyInvoice::where('policy_id', $this->id)->where('billable_type', Customer::class)->first();
                        $temp_policy_invoice = $policy_invoice->replicate();

                        $policy_invoice->delete();
                    }

                    // dump($key);
                    // dump($temp_policy_invoice->invoice_no);

                    $invoice = PolicyInvoice::create([
                        'policy_id' => $this->id,
                        'invoice_no' => $temp_policy_invoice->invoice_no,
                        'date' => $temp_policy_invoice->date,
                        'billable_type' =>  $temp_policy_invoice->billable_type,
                        'billable_id' =>  $billable_id,
                        'bill_to_name' => $billable->full_name,
                        'bill_to_address' => $billable->address_full,
                        'type' => $key,
                        'tax_id' => $policy->tax_id,
                        'is_main' => $is_main,
                        'subtotal' => $invoice['subtotal_without_tax'],
                        'discount' => $invoice['total_discount_without_tax'],
                        'tax' => $invoice['tax_price'],
                        'total' => $invoice['total_price'],
                        'created_by' => $author
                    ]);

                    foreach ($items as $key => $item) {
                        $item = InvoiceItem::create([
                            'policy_invoice_id' => $invoice->id,
                            'description' => $item['description'],
                            'remarks' => '',
                            'rate' => $item['rate'],
                            'quantity' => $item['quantity'],
                            'total' => $item['total']
                        ]);
                    }
                }

                if ($is_main) {

                    $other_payees = InvoicePayee::where('policy_id', $this->id)->get();

                    foreach ($other_payees as $key => $other_payee) {
                        $other_payee->delete();
                    }

                    $payee = new InvoicePayee();
                    $payee->policy_id = $this->id;
                    $payee->invoice_id = $invoice->id;

                    $payee->userable_id =  $policy->dealer->id;
                    $payee->userable_type = Dealer::class;

                    $payee->total_amount = $invoice['total'];
                    $payee->save();
                    $payee->calculateAmount();
                }
            }

            // dd($invoices);

            $this->generateReport();

            return $invoice;
        } catch (\Throwable $th) {
            dd($th);
        }
    }

    public function generateInvoice($data) {}

    public function addService($request)
    {
        $reminders = [];
        $workshops = [];
        $mileages = [];

        if (!empty($request->reminder_stickers)) {
            foreach ($request->reminder_stickers as $key => $reminder_sticker) {
                $saveFile = FileHelper::uploadFile($reminder_sticker['file']['original'], $reminder_sticker['format']);
                // echo json_encode($saveFile);
                array_push($reminders, $saveFile);
            }
        }
        if (!empty($request->workshop_receipts)) {
            foreach ($request->workshop_receipts as $key => $workshop_receipt) {
                $saveFile = FileHelper::uploadFile($workshop_receipt['file']['original'], $workshop_receipt['format']);
                // echo json_encode($saveFile);
                array_push($workshops, $saveFile);
            }
        }
        if (!empty($request->mileage_images)) {
            foreach ($request->mileage_images as $key => $mileage_image) {
                $saveFile = FileHelper::uploadFile($mileage_image['file']['original'], $mileage_image['format']);
                // echo json_encode($saveFile);
                array_push($mileages, $saveFile);
            }
        }

        $oil_type = OilType::find($request->oil_type_id);

        $attr = $request->toArray();
        $author = !empty(auth()->user()) ? auth()->user()->id : $request->user_id;

        $service = new Service();
        $service->policy_id = $this->id;
        $service->service_type_id = $request->service_type_id;
        $service->remarks = $request->remarks;
        $service->oil_type_id = $request->oil_type_id;
        $service->invoice_no = $request->invoice_no;

        $service->invoice_date = new Carbon($request->invoice_date);
        $service->workshop_name = $request->workshop_name;

        $service->current_mileage = $request->current_mileage;

        $current_service_date = Carbon::parse($request->current_date)->setTimezone(config('app.timezone'));
        $service->current_date = $current_service_date;

        $next_service = $this->getNextServiceAttribute($request->service_type_id);

        if ($next_service['status'] != 'success') {
            return false;
        } else {
            $next_service = $next_service['next_services'];
        }

        $next_cycle = $oil_type->getCycle($this->services()->where('service_type_id', $request->service_type_id)->count() + 1);

        $service->expected_mileage = $next_service['next_mileage'];
        $service->expected_date = Carbon::createFromFormat('j/n/Y', $next_service['next_date']);

        $service->next_mileage = $request->current_mileage + $next_cycle['mileage_cycle'];
        $service->next_date =  Carbon::parse($current_service_date)->addMonths($next_cycle['month_cycle'])->format('Y-m-d');


        if ($service->current_mileage > $service->expected_mileage || $current_service_date > $service->expected_date) {
            $service->status = 'los';
        } else {
            $service->status = 'ok';
        }

        $service->created_by = $author;
        $service->save();

        if (!empty($reminders)) {
            foreach ($reminders as $key => $reminder) {
                $serviceFile = new ServiceFile();
                $serviceFile->variant = 'reminder';
                $serviceFile->type = $reminder['type'];
                $serviceFile->mime = $reminder['mime'];
                $serviceFile->name = $reminder['name'];
                $serviceFile->service_id = $service->id;
                $serviceFile->file_id = $reminder['id'];
                $serviceFile->thumbnail_url = $reminder['thumbnail_url'];
                $serviceFile->url = $reminder['url'];
                $serviceFile->created_by = $author;
                $serviceFile->save();
            }
        }
        if (!empty($workshops)) {
            foreach ($workshops as $key => $workshop) {
                $serviceFile = new ServiceFile();
                $serviceFile->variant = 'workshop';
                $serviceFile->type = $workshop['type'];
                $serviceFile->mime = $workshop['mime'];
                $serviceFile->name = $workshop['name'];
                $serviceFile->service_id = $service->id;
                $serviceFile->file_id = $workshop['id'];
                $serviceFile->thumbnail_url = $workshop['thumbnail_url'];
                $serviceFile->url = $workshop['url'];
                $serviceFile->created_by = $author;
                $serviceFile->save();
            }
        }
        if (!empty($mileages)) {
            foreach ($mileages as $key => $mileage) {
                $serviceFile = new ServiceFile();
                $serviceFile->variant = 'mileage';
                $serviceFile->type = $mileage['type'];
                $serviceFile->mime = $mileage['mime'];
                $serviceFile->name = $mileage['name'];
                $serviceFile->service_id = $service->id;
                $serviceFile->file_id = $mileage['id'];
                $serviceFile->thumbnail_url = $mileage['thumbnail_url'];
                $serviceFile->url = $mileage['url'];
                $serviceFile->created_by = $author;
                $serviceFile->save();
            }
        }

        return [
            'reminders' => $reminders,
            'workshops' => $workshops,
            'mileages' => $mileages,
        ];

        return $service;
    }

    public function scopeByBranch(Builder $query, $branch_id): void
    {
        if (!empty($branch_id) && $branch_id != 'all') {
            $query->where('branch_id', $branch_id);
        } else {
            // $query;
        }
    }

    public function scopeByActivatedDate(Builder $query, $date): void
    {
        $start = $date->copy()->startOfMonth();
        $end = $date->copy()->endOfMonth();

        $query->where('activated_at', '>=', $start)->where('activated_at', '<=', $end);
    }

    public function scopeActiveOnly(Builder $query): void
    {
        $query->where('status_code', 'activated');
    }

    public function scopePaidOnly(Builder $query): void
    {
        $query->where('payment_status_code', 'paid');
    }

    public function scopeNotFOC(Builder $query): void
    {
        $query->where('payment_status_code', '!=', 'foc');
    }

    public function scopeNotPaidOnly(Builder $query): void
    {
        $query->whereIn('payment_status_code', ['unpaid', 'partial']);
    }

    public function scopeMoReportOnly(Builder $query, $exclude_mo_ids): void
    {
        $query->whereNotIn('marketing_officer_id', $exclude_mo_ids);
    }

    public function scopeByCreatedDate(Builder $query, $date): void
    {
        $start = $date->copy()->startOfMonth();
        $end = $date->copy()->endOfMonth();

        $query->where('created_at', '>=', $start)->where('created_at', '<=', $end);
    }

    public function getCustomerSplitPriceAttribute()
    {
        $customer_payment = $this->customer_payment;

        return !empty($customer_payment) ? $customer_payment : 0;
    }

    public function getDealerSplitPriceAttribute()
    {
        $invoice = $this->activeInvoice;
        $customer_payment = $this->customer_payment;

        return !empty($invoice) ? ($invoice->total - $customer_payment) : 0;
    }

    public function payees()
    {
        return $this->hasMany(InvoicePayee::class);
    }

    public function payeeDealer()
    {
        return $this->hasOne(InvoicePayee::class)->where('userable_type', Dealer::class);
    }

    public function getTotalPaymentByUser($type)
    {
        $payments = $this->payments()->where('from', $type)->get();

        $total = 0;
        foreach ($payments as $key => $payment) {
            $total += (float)$payment->amount;
        }

        return $total;
    }

    public function calculatePayeesAmount()
    {
        foreach ($this->payees as $key => $payee) {
            $payee->calculateAmount();
        }
    }

    public function generateDefaultPayee()
    {
        if (count($this->payees) == 0 && !empty($this->activeInvoice)) {
            $payee = new InvoicePayee();
            $payee->policy_id = $this->id;
            $payee->invoice_id = $this->activeInvoice->id;
            $payee->userable_id =  $this->dealer_id;
            $payee->userable_type = Dealer::class;
            $payee->total_amount = $this->activeInvoice->total;
            $payee->save();
            $payee->calculateAmount();
        }
    }

    public function getSalePaidAttribute()
    {
        $total_payment = $this->total_payment['total'];
        $total_amount = $this->activeInvoice->total;

        return ($total_payment >= $total_amount) ? $total_amount : $total_payment;
    }

    public function policyReport()
    {
        return $this->hasOne(PolicyReport::class);
    }

    public function scopeByPaidDate(Builder $query, $date): void
    {
        $start = $date->copy()->startOfMonth();
        $end = $date->copy()->endOfMonth();

        // $query->where('activated_at', '>=', $start)->where('activated_at', '<=', $end);
        $query->whereHas('policyReport', function ($q) use ($start, $end) {
            $q->where('last_paid_at', '>=', $start)->where('last_paid_at', '<=', $end);
        })->get();
    }

    public function generateReport()
    {
        // dd([
        //     'total_amount' => $this->activeInvoice->total,
        //     'total_sales' => $this->sale_paid,
        //     'total_paid' => $this->total_payment['total'],
        //     'total_unpaid' => $this->unpaid_payment,
        //     'status_code' => $this->status_code,
        // ]);

        if (!empty($this->activeInvoice)) {

            $overpaid = ($this->sale_paid > $this->activeInvoice->total) ? ($this->sale_paid - $this->activeInvoice->total) : 0;

            $policyReport = PolicyReport::updateOrCreate(
                ['policy_id' => $this->id],
                [
                    'total_amount' => $this->activeInvoice->total,
                    'total_sales' => $this->sale_paid,
                    'total_paid' => $this->sale_paid,
                    'total_unpaid' => $this->unpaid_payment,
                    'total_overpaid' => $overpaid,
                    'total_nett' => ($this->activeInvoice->subtotal - ($this->activeInvoice->discount ?? 0)),
                    'total_tax' => $this->activeInvoice->tax,
                    'last_paid_at' => $this->total_payment ?  $this->total_payment['latest_date_ori'] : null,
                    'status_code' => $this->status_code,
                ]
            );

            return $policyReport;
        }
    }
}

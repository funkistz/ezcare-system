<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Policy;
use App\Http\Resources\DefaultResource;
use App\Models\Branch;
use App\Models\Coverage;
use App\Models\Customer;
use App\Models\Dealer;
use App\Models\VehicleBrand;
use App\Models\WarrantyPlan;
use App\Models\VehiclePowerCapacity;
use App\Models\VehicleCondition;
use App\Models\VehicleGroup;
use App\Models\VehicleModel;
use App\Models\Tax;
use App\Models\GeneralSetting;
use App\Models\PlanDiscount;
use App\Models\PolicyInvoice;
use App\Models\PolicyPayment;
use CountryState;
use App\Models\User;
use App\Models\Vehicle;
use App\Models\File;
use App\Models\FreePromo;
use App\Models\OilType;
use App\Models\PolicyFile;
use App\Models\PolicyOverwrite;
use App\Models\Service;
use App\Models\ServiceType;
use App\Models\WarrantyPlanItem;
use Illuminate\Support\Carbon;
use PSpell\Config;

class PolicyController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        // $approvers = User::permission(['endorsement.approval', 'endorsement.admin'])->get();

        // foreach ($approvers as $key => $approver) {
        //     dump($approver->AccessToken);
        // }
        // dd($approvers);
        $policies = Policy::with(['vehicle', 'vehicle.brand', 'customer', 'activeInvoice']);

        $c_search_like = '%' . $request->customer_search . '%';
        $d_search_like = '%' . $request->document_search . '%';
        // $created_from = Carbon::parse($request->date_created_from)->format('Y-m-d');

        if ($request->customer_search) {
            $customer_ids = Customer::orWhere('first_name', 'LIKE', $c_search_like)->orWhere('last_name', 'LIKE', $c_search_like)->orWhere('ic', 'LIKE', $c_search_like)->pluck('id')->toArray();
            $policies->orWhereIn('customer_id', $customer_ids);
        }

        if ($request->document_search) {
            $vehicle_ids = Vehicle::orWhere('registration_no', 'LIKE', $d_search_like)->orWhere('chassis_no', 'LIKE', $d_search_like)->pluck('id')->toArray();
            // $invoice_ids = PolicyInvoice::orWhere('invoice_no', 'LIKE', $d_search_like)->pluck('id')->toArray();
            $policies->orWhere('policy_no', 'LIKE', $d_search_like)->orWhereIn('vehicle_id', $vehicle_ids);

            $policies->orWhereHas('invoices', function ($q) use ($d_search_like) {
                $q->where('invoice_no', 'LIKE',  $d_search_like);
            });
            // $policies->orWhereHas('vehicle', function ($q) use ($d_search_like) {
            //     $q->where('registration_no', 'LIKE',  $d_search_like);
            // });
        }

        if ($request->date_created_from && $request->date_created_to) {
            $policies->where('created_at', '>=', $request->date_created_from)->where('created_at', '<=', $request->date_created_to);
        } else if ($request->date_created_from) {
            $policies->where('created_at', '>=', $request->date_created_from);
        } else if ($request->date_created_to) {
            $policies->where('created_at', '<=', $request->date_created_to);
        }

        if ($request->date_activated_from && $request->date_activated_to) {
            $policies->where('created_at', '>=', $request->date_activated_from)->where('created_at', '<=', $request->date_activated_to);
        } else if ($request->date_activated_from) {
            $policies->where('created_at', '>=', $request->date_activated_from);
        } else if ($request->date_activated_to) {
            $policies->where('created_at', '<=', $request->date_activated_to);
        }

        if ($request->date_expired_from && $request->date_expired_to) {
            $policies->where('created_at', '>=', $request->date_expired_from)->where('created_at', '<=', $request->date_expired_to);
        } else if ($request->date_expired_from) {
            $policies->where('created_at', '>=', $request->date_expired_from);
        } else if ($request->date_expired_to) {
            $policies->where('created_at', '<=', $request->date_expired_to);
        }

        if ($request->date_payment_from && $request->date_payment_to) {
            $policies->whereHas('policyReport', function ($q) use ($request) {
                $q->where('last_paid_at', '>=', $request->date_payment_from)->where('last_paid_at', '<=', $request->date_payment_to);
            });
        } else if ($request->date_payment_from) {
            $policies->whereHas('policyReport', function ($q) use ($request) {
                $q->where('last_paid_at', '>=', $request->date_payment_from);
            });
        } else if ($request->date_payment_to) {
            $policies->whereHas('policyReport', function ($q) use ($request) {
                $q->where('last_paid_at', '<=', $request->date_payment_to);
            });
        }

        if ($request->status) {
            $policies->where('status_code', $request->status);
        }
        if ($request->payment_status) {
            $policies->where('payment_status_code', $request->payment_status);
        }

        $policies = $policies->orderBy('created_at', 'desc')->paginate(30);

        $policies->getCollection()->transform(function ($value) {

            $policy = Policy::find($value->id);

            return  [
                'policy_no' => $value->policy_no,
                'active_invoice' => $value->active_invoice,
                'customer' => $value->customer,
                'vehicle' => $value->vehicle,
                'status_code' => $value->status_code,
                'payment_status_code' => $value->payment_status_code,
                'balance_payment' => $value->balance_payment,
                'created_at' => $value->created_at,
                'created_by_name' => $value->created_by_name,
                'activated_at' => $value->activated_at,
                'expired_at' => $value->expired_at,
                'id' => $value->id,
                'balance_payment' => $policy->balancePayment(),
                'created_by' => $policy->created_by,
            ];
        });

        $policies = DefaultResource::collection($policies);

        return inertia('Policy/Index', [
            'policies' => $policies,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $policies = VehicleBrand::paginate(1000);
        $policies = DefaultResource::collection($policies);

        $warranty_plans = WarrantyPlan::toSelectData(['year_package']);
        $vehicle_groups = VehicleGroup::toSelectData();
        $vehicle_power_capacities = VehiclePowerCapacity::toSelectData();
        $vehicle_conditions = VehicleCondition::toSelectData();
        $vehicle_models = VehicleModel::toSelectData();
        $vehicle_brands = VehicleBrand::toSelectData();
        $taxes = Tax::toSelectData();
        $branches = Branch::toSelectData();

        $settings = GeneralSetting::get()->keyBy('name');

        $countries_temp = CountryState::getCountries();
        $countries = [];

        foreach ($countries_temp as $x => $val) {
            array_push($countries, [
                'label' => $val,
                'value' => $x,
            ]);
        }

        $dealers = Dealer::toSelectData();
        $mos = User::role('mo')->active()->toSelectData();
        $technicals = User::role('technical')->active()->toSelectData();
        $coverages = Coverage::get();
        $discounts = PlanDiscount::toRealDiscount();
        $freePromos = FreePromo::toRealDiscount();
        $discountsSelect = PlanDiscount::toSelectData();
        $freePromosSelect = FreePromo::toSelectData();
        $coverageSelect = Coverage::toSelectData();

        $warranty_plans_real = WarrantyPlan::all();

        $policy_years = !empty(GeneralSetting::where('name', 'policy_years')->first()) ? json_decode(GeneralSetting::where('name', 'policy_years')->first()->value) : [];

        return inertia('Policy/Create', [
            'policies' => $policies,
            'warranty_plans' => $warranty_plans,
            'warranty_plans_real' => $warranty_plans_real,
            'vehicle_groups' => $vehicle_groups,
            'vehicle_power_capacities' => $vehicle_power_capacities,
            'vehicle_conditions' => $vehicle_conditions,
            'vehicle_brands' => $vehicle_brands,
            'vehicle_models' => $vehicle_models,
            'taxes' => $taxes,
            'settings' => $settings,
            'branches' => $branches,
            'countries' => $countries,
            'mos' => $mos,
            'technicals' => $technicals,
            'dealers' => $dealers,
            'coverages' => $coverages,
            'discounts' => $discounts,
            'freePromos' => $freePromos,
            'discountsSelect' => $discountsSelect,
            'freePromosSelect' => $freePromosSelect,
            'coverageSelect' => $coverageSelect,
            'policy_years' => $policy_years,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'policy_no' => 'unique:policies',
        ]);

        $attr = $request->toArray();
        $registration_date = new Carbon($attr['registration_date']);
        $diff = $registration_date->diffInYears(Carbon::now());
        $settings = GeneralSetting::get()->keyBy('name');
        $max_years = (int)$settings['vehicle_max_year']->value;

        if ($diff > $max_years) {
            return back()->with([
                'type' => 'error',
                'message' => 'Vehicle age cannot more than ' . $max_years . ' years',
            ]);
        }

        // dd($attr['discountWithAmounts']);

        try {

            $find_customer = Customer::where('ic', $request->ic)->first();

            if (!empty($attr['username'])) {
                $find_user = User::where('username', $request->username)->first();
            } else {
                $find_user = User::where('email', $request->email)->first();
            }

            if (!empty($find_user)) {

                if (empty($find_customer->user)) {

                    return back()->with([
                        'type' => 'error',
                        'message' => 'Email or Username already been used.',
                    ]);
                } else {
                    if ($find_customer->user->email != $request->email) {
                        return back()->with([
                            'type' => 'error',
                            'message' => 'Email or Username already been used.',
                        ]);
                    }
                }
            }

            $customer = Customer::addOrUpdate($attr);
            $vehicle = Vehicle::addOrUpdate($attr);

            $author = auth()->user()->id;

            $policy = new Policy();
            $policy->vehicle_id = $vehicle->id;
            $policy->customer_id = $customer->id;
            isset($attr['policy_no']) ? $policy->policy_no = $attr['policy_no'] : null;
            isset($attr['marketing_officer_id']) ? $policy->marketing_officer_id = $attr['marketing_officer_id'] : null;
            isset($attr['technical_staff_id']) ?  $policy->technical_staff_id = $attr['technical_staff_id'] : null;
            isset($attr['dealer_id']) ?  $policy->dealer_id = $attr['dealer_id'] : null;
            isset($attr['is_foc']) ?  $policy->is_foc = $attr['is_foc'] : null;
            isset($attr['tax_id']) ?  $policy->tax_id = $attr['tax_id'] : null;
            isset($attr['with_addon']) ?  $policy->with_addon = $attr['with_addon'] : null;
            isset($attr['pricing_type']) ?  $policy->pricing_type = $attr['pricing_type'] : null;

            isset($attr['warranty_plan_price']) ? $policy->warranty_plan_price =  $attr['warranty_plan_price'] : null;
            isset($attr['subtotal_without_tax']) ?  $policy->subtotal_without_tax = $attr['subtotal_without_tax'] : null;
            isset($attr['subtotal_with_tax']) ? $policy->subtotal_with_tax = $attr['subtotal_with_tax'] : null;
            isset($attr['total_discount']) ?  $policy->total_discount = $attr['total_discount'] : null;
            isset($attr['total_tax']) ? $policy->total_tax = $attr['total_tax'] : null;
            isset($attr['total_price']) ? $policy->total_price = $attr['total_price'] : null;

            isset($attr['dealer_warranty_plan_price']) ? $policy->dealer_warranty_plan_price =  $attr['dealer_warranty_plan_price'] : null;
            isset($attr['dealer_subtotal_without_tax']) ?  $policy->dealer_subtotal_without_tax = $attr['dealer_subtotal_without_tax'] : null;
            isset($attr['dealer_subtotal_with_tax']) ? $policy->dealer_subtotal_with_tax = $attr['dealer_subtotal_with_tax'] : null;
            isset($attr['dealer_total_discount']) ?  $policy->dealer_total_discount = $attr['dealer_total_discount'] : null;
            isset($attr['dealer_total_tax']) ? $policy->dealer_total_tax = $attr['dealer_total_tax'] : null;
            isset($attr['dealer_total_price']) ? $policy->dealer_total_price = $attr['dealer_total_price'] : null;

            isset($attr['salesman']) ? $policy->salesman = $attr['salesman'] : null;
            isset($attr['branch_id']) ?  $policy->branch_id = $attr['branch_id'] : null;
            isset($attr['warranty_plan_id']) ? $policy->warranty_plan_id = $attr['warranty_plan_id'] : null;
            isset($attr['activated_at']) ? $policy->activated_at = new Carbon($attr['activated_at']) : null;
            isset($attr['expired_at']) ?  $policy->expired_at = new Carbon($attr['expired_at']) : null;
            isset($attr['period']) ? $policy->period = $attr['period'] : null;
            isset($attr['type']) ? $policy->type = $attr['type'] : null;
            isset($attr['remarks']) ? $policy->remarks = $attr['remarks'] : null;
            isset($author) ? $policy->created_by = $author : null;
            $policy->status_code = config('constant.status.draft.value');
            $policy->save();

            if (isset($attr['discountWithAmounts'])) {
                foreach ($attr['discountWithAmounts'] as $key => $discount) {
                    $policy->discounts()->attach($discount['id'], ['amount' => $discount['total_discount']]);
                }
            }

            if (isset($attr['coveragesWithAmounts'])) {
                foreach ($attr['coveragesWithAmounts'] as $key => $coverage) {
                    $policy->coverages()->attach($coverage['id'], [
                        'amount' => $coverage['total_price'],
                        'year' => $coverage['year'],
                    ]);
                }
            }

            // dd($attr['freePromos']);

            if (!empty($attr['freePromos'])) {

                $temp_expired_at = new Carbon($policy->expired_at);

                foreach ($attr['freePromos'] as $key => $freePromo) {
                    $policy->freePromos()->attach($freePromo['id'], ['amount' => $freePromo['amount']]);

                    if ($freePromo['type'] == 'month' || $freePromo['type'] == 'year') {
                        $temp_expired_at->addMonths($freePromo['amount']);
                    }
                }

                $policy->expired_at = $temp_expired_at;
                $policy->save();
            }

            return redirect()->route('policy.show', $policy->id)->with([
                'type' => 'success',
                'message' => 'Policy has been created',
            ]);
        } catch (\Illuminate\Database\QueryException $ex) {
            return back()->with([
                'type' => 'error',
                'message' => $ex->getMessage(),
            ]);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $policy = Policy::with([
            'branch',
            'customer',
            'activeInvoice',
            'vehicle',
            'payments',
            'statuses',
            'paymentStatuses',
            'invoices',
            'invoices.items',
            'icFiles',
            'grantFiles',
            'vehicleFiles',
            'chassisFiles',
            'speedometerFiles',
            'mileageFiles',
            'diagnoseFiles',
            'otherFiles',
            'coverages',
            'discounts',
            'freePromos',
            'services',
            'services.oilType',
            'services.files',
            'warrantyPlan',
            'warrantyPlan.oilTypes',
            'claims',
            'claims.policy',
            'claims.files',
            'claims.claim_statuses',
            'claims.claim_items',
            'claims.claim_payments',
            'claims.claim_payments.files',
            // 'claims.uncovered_items',
            // 'claims.claim_items', 'claims.claim_statuses', 'claims.audits', 'claims.files', 
            'payees',
        ])->where('id', $id)->first();
        $policy->balance_payment = $policy->balancePayment();
        $policy->customer_balance_payment = $policy->customerBalancePayment();
        $policy->dealer_balance_payment = $policy->dealerBalancePayment();
        $settings = GeneralSetting::get()->keyBy('name');
        $policy->next_service = $policy->next_service;
        $policy->customer_split_price = $policy->customer_split_price;
        $policy->dealer_split_price = $policy->dealer_split_price;
        $policy->payees = $policy->payees;

        $engine_oils = OilType::where('type', 'engine')->toSelectData();
        $atf_oils = OilType::where('type', 'atf')->toSelectData();

        $warranty_plan = $policy->warrantyPlan;
        $claim_items = $warranty_plan->itemChilds($policy->with_addon);

        $claim_items_select = [];
        foreach ($claim_items as $key => $child) {
            array_push($claim_items_select, [
                'label' => $child->name,
                'value' => (string)$child->id,
            ]);
        }

        $payment_reason_select = [];
        $payment_reasons = Config('constant.payment_reasons');
        foreach ($payment_reasons as $key => $child) {
            array_push($payment_reason_select, $child);
        }

        $dealers = Dealer::toSelectData();
        $staffs = User::role('staff')->active()->toSelectData();
        $mos = User::role('mo')->active()->toSelectData();
        $technicals = User::role('technical')->active()->toSelectData();

        $service_types = ServiceType::toSelectData();

        $countries_temp = CountryState::getCountries();
        $countries = [];

        foreach ($countries_temp as $x => $val) {
            array_push($countries, [
                'label' => $val,
                'value' => $x,
            ]);
        }

        $discounts = PlanDiscount::toRealDiscount();
        $freePromos = FreePromo::toRealDiscount();
        $discountsSelect = PlanDiscount::toSelectData();
        $freePromosSelect = FreePromo::toSelectData();
        $coverageSelect = Coverage::toSelectData();
        $branches = Branch::toSelectData();
        $warranty_price_change = PolicyOverwrite::where('policy_id', $policy->id)->where('field', 'warranty_price')->where('status_code', '!=', 'rejected')->first();
        $vehicle_models = VehicleModel::toSelectData();

        $claim_denied_statuses = [
            [
                'label' => 'Lack of Servicing',
                'value' => '1',
            ],
            [
                'label' => 'No Supporting Documents',
                'value' => '2',
            ],
            [
                'label' => 'Items No Covered',
                'value' => '3',
            ],
            [
                'label' => 'Cooling Off Period',
                'value' => '4',
            ],
            [
                'label' => 'No Quotation From Workshop',
                'value' => '5',
            ],
            [
                'label' => 'Repair Without Permission',
                'value' => '6',
            ],
            [
                'label' => 'Fraudulent Claim',
                'value' => '7',
            ],
            [
                'label' => 'Claim Denial And Policy Continue',
                'value' => '8',
            ],
            [
                'label' => 'Mileage Overlimit',
                'value' => '9',
            ],
            [
                'label' => 'Claim Overlimit',
                'value' => '10',
            ]
        ];

        $policy->calculatePayeesAmount();

        $policy->generateReport();

        return inertia('Policy/View', [
            'policy' => $policy,
            'settings' => $settings,
            'engine_oils' => $engine_oils,
            'atf_oils' => $atf_oils,
            'claim_items' => $claim_items,
            'claim_items_select' => $claim_items_select,
            'payment_reasons' => $payment_reasons,
            'payment_reason_select' => $payment_reason_select,
            'dealers' => $dealers,
            'staffs' => $staffs,
            'warranty_plan' => $warranty_plan,
            'mos' => $mos,
            'technicals' => $technicals,
            'countries' => $countries,
            'discounts' => $discounts,
            'freePromos' => $freePromos,
            'discountsSelect' => $discountsSelect,
            'freePromosSelect' => $freePromosSelect,
            'coverageSelect' => $coverageSelect,
            'branches' => $branches,
            'warranty_price_change' => $warranty_price_change,
            'vehicle_models' => $vehicle_models,
            'claim_denied_statuses' => $claim_denied_statuses,
        ]);
    }

    public function activate(string $id, Request $request)
    {
        $policy = Policy::find($id);

        if (!$policy->can_activate) {
            return back()->with([
                'type' => 'error',
                'message' => 'Kindly upload the requirements photo to activate the policy. Thank you.',
            ]);
        }

        if (in_array($policy->status_code, [config('constant.status.draft.value'), config('constant.status.deactivated.value')])) {
            $policy->onActivate($request->remarks);
            return back()->with([
                'type' => 'success',
                'message' => 'Policy has been activated',
            ]);
        } else {
            return back()->with([
                'type' => 'error',
                'message' => 'Policy status cannot be change',
            ]);
        }
    }

    public function deactivate(string $id, Request $request)
    {
        $policy = Policy::find($id);

        if (in_array($policy->status_code, [config('constant.status.activated.value')])) {
            $policy->onDeactivate($request->remarks);

            return back()->with([
                'type' => 'success',
                'message' => 'Policy has been deactivated',
            ]);
        } else {
            return back()->with([
                'type' => 'error',
                'message' => 'Policy status cannot be change',
            ]);
        }
    }

    public function void(string $id, Request $request)
    {
        $policy = Policy::find($id);

        if (in_array($policy->status_code, [config('constant.status.activated.value')])) {
            $policy->onVoid($request->remarks);
            return back()->with([
                'type' => 'success',
                'message' => 'Policy has been voided',
            ]);
        } else {
            return back()->with([
                'type' => 'error',
                'message' => 'Policy status cannot be change',
            ]);
        }
    }

    public function generateInvoice(string $id, Request $request)
    {
        $policy = Policy::find($id);

        if (in_array($policy->status_code, [config('constant.status.activated.value')])) {
            $invoice = $policy->generateInvoices($request->invoice_date);

            if (!empty($invoice)) {
                return back()->with([
                    'type' => 'success',
                    'message' => 'Invoice has been generated',
                ]);
            } else {
                return back()->with([
                    'type' => 'error',
                    'message' => 'Some error occurred!',
                ]);
            }
        } else {
            return back()->with([
                'type' => 'error',
                'message' => 'Invoice cannot be generate',
            ]);
        }
    }

    public function regenerateInvoice(string $id, Request $request)
    {
        $policy = Policy::find($id);

        if (in_array($policy->status_code, [config('constant.status.activated.value')])) {
            $invoice = $policy->generateInvoices(null, true);

            if (!empty($invoice)) {
                return back()->with([
                    'type' => 'success',
                    'message' => 'Invoice has been generated',
                ]);
            } else {
                return back()->with([
                    'type' => 'error',
                    'message' => 'Some error occurred!',
                ]);
            }
        } else {
            return back()->with([
                'type' => 'error',
                'message' => 'Invoice cannot be generate',
            ]);
        }
    }

    public function addPayment(string $id, Request $request)
    {
        $policy = Policy::find($id);
        $attr = $request->toArray();

        if (in_array($policy->status_code, [config('constant.status.activated.value')])) {

            $payment = PolicyPayment::processPayment($attr, $policy);

            return back()->with([
                'type' => 'success',
                'message' => 'Payment has been added',
            ]);
        } else {
            return back()->with([
                'type' => 'error',
                'message' => 'Payment cannot be added',
            ]);
        }
    }

    public function addAttachment(string $id, Request $request)
    {

        $policy = Policy::find($id);
        $attr = $request->toArray();
        $author = auth()->user()->id;
        $file_ids = $request->file_ids;

        if (!empty($file_ids)) {

            foreach ($file_ids as $key => $file_id) {

                $fileR = File::find($file_id);

                $file = new PolicyFile();
                $file->variant = $request->variant;
                $file->name = $fileR->name;
                $file->policy_id = $id;
                $file->file_id = $fileR->id;
                $file->created_by = $author;
                $file->type = $fileR->type;
                $file->mime = $fileR->mime;
                $file->url = $fileR->url;
                $file->thumbnail_url = $fileR->thumbnail_url;
                $file->save();
            }
        } else {

            $file = new PolicyFile();
            $file->variant = $request->variant;
            $file->name = $request->name;
            $file->policy_id = $id;
            $file->file_id = $request->id;
            $file->created_by = $author;
            $file->type = $request->type;
            $file->mime = $request->mime;
            $file->url = $request->url;
            $file->thumbnail_url = $request->thumbnail_url;

            $file->save();
        }
        // $file = File::find($request->id);
        // $file = $policy->files()->attach($request->id);

        return back()->with([
            'type' => 'success',
            'message' => 'Attachment has been added',
        ]);
    }

    public function addService(string $id, Request $request)
    {
        $policy = Policy::find($id);
        $oil_type = OilType::find($request->oil_type_id);

        $attr = $request->toArray();
        $author = auth()->user()->id;

        $service = new Service();
        $service->policy_id = $id;
        $service->service_type_id = $request->service_type_id;
        $service->remarks = $request->remarks;
        $service->oil_type_id = $request->oil_type_id;
        $service->invoice_no = $request->invoice_no;

        $service->invoice_date = new Carbon($request->invoice_date);
        $service->workshop_name = $request->workshop_name;

        $service->current_mileage = $request->current_mileage;

        $current_service_date = Carbon::parse($request->current_date)->setTimezone(config('app.timezone'));
        $service->current_date = $current_service_date;

        $next_service = $policy->getNextServiceAttribute($request->service_type_id);

        if ($next_service['status'] != 'success') {
            return back()->with([
                'type' => 'error',
                'message' => $next_service['message'],
            ]);
        } else {
            $next_service = $next_service['next_services'];
        }

        // dd($policy->services()->where('service_type_id', $request->service_type_id)->count());
        // policy.next_service

        // if ($request->type == 'engine') {
        //     $next_service = $next_service['engine_service'];
        //     $next_cycle = $oil_type->getCycle(count($policy->engineServices) + 1);
        // } else {
        //     $next_service = $next_service['atf_service'];
        //     $next_cycle = $oil_type->getCycle(count($policy->atfServices) + 1);
        // }

        $next_cycle = $oil_type->getCycle($policy->services()->where('service_type_id', $request->service_type_id)->count() + 1);

        $service->expected_mileage = $next_service['next_mileage'];
        $service->expected_date = Carbon::parse($next_service['next_date']);

        $service->next_mileage = $request->current_mileage + $next_cycle['mileage_cycle'];
        $service->next_date =  Carbon::parse($current_service_date)->addMonths($next_cycle['month_cycle'])->format('Y-m-d');


        if ($service->current_mileage > $service->expected_mileage || $current_service_date > $service->expected_date) {
            $service->status = 'los';
        } else {
            $service->status = 'ok';
        }

        // dd($service->toArray());

        $service->created_by = $author;
        $service->save();

        return back()->with([
            'type' => 'success',
            'message' => 'Service has been added',
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        try {
            $attr = $request->toArray();

            $policy = Policy::find($id);
            isset($attr['marketing_officer_id']) ? $policy->marketing_officer_id = $attr['marketing_officer_id'] : null;
            isset($attr['technical_staff_id']) ?  $policy->technical_staff_id = $attr['technical_staff_id'] : null;
            isset($attr['dealer_id']) ?  $policy->dealer_id = $attr['dealer_id'] : null;
            isset($attr['salesman']) ? $policy->salesman = $attr['salesman'] : null;
            $policy->save();

            return back()->with([
                'type' => 'success',
                'message' => 'Policy has been updated',
            ]);
        } catch (\Illuminate\Database\QueryException $ex) {
            return back()->with([
                'type' => 'error',
                'message' => $ex->getMessage(),
            ]);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $policy = Policy::find($id);

        try {
            $policy->forceDelete();

            return back()->with([
                'type' => 'success',
                'message' => 'Policy has been deleted',
            ]);
        } catch (\Illuminate\Database\QueryException $ex) {
            return back()->with([
                'type' => 'error',
                'message' => $ex->getMessage(),
            ]);
        }
    }

    public function addCoverage(string $id, Request $request)
    {
        $policy = Policy::find($id);
        $attr = $request->toArray();

        $request->validate([
            'coverage_id' => 'required',
            'period' => 'required',
        ]);

        if (in_array($policy->status_code, [config('constant.status.activated.value')])) {

            $coverage = Coverage::find($attr['coverage_id']);

            $policy->coverages()->attach($attr['coverage_id'], [
                'amount' => $coverage['dealer_price'],
                'period' => $attr['period'],
            ]);
            $invoice = $policy->generateInvoices(null, true);

            return back()->with([
                'type' => 'success',
                'message' => 'Coverage has been added',
            ]);
        } else {
            return back()->with([
                'type' => 'error',
                'message' => 'Coverage cannot be added',
            ]);
        }
    }

    public function addDiscount(string $id, Request $request)
    {
        $policy = Policy::find($id);
        $attr = $request->toArray();

        if (in_array($policy->status_code, [config('constant.status.activated.value')]) && !empty($attr['discount_id'])) {

            $discount = PlanDiscount::find($attr['discount_id']);
            $policy->discounts()->attach($attr['discount_id'], ['amount' => $discount->amount]);
            $invoice = $policy->generateInvoices(null, true);

            return back()->with([
                'type' => 'success',
                'message' => 'Discount has been added',
            ]);
        } else {
            return back()->with([
                'type' => 'error',
                'message' => 'Discount cannot be added',
            ]);
        }
    }

    public function addFreePromo(string $id, Request $request)
    {
        $policy = Policy::find($id);
        $attr = $request->toArray();

        if (in_array($policy->status_code, [config('constant.status.activated.value')]) && !empty($attr['free_promo_id'])) {

            $temp_expired_at = new Carbon($policy->expired_at);

            $free_promo = FreePromo::find($attr['free_promo_id']);
            $policy->freePromos()->attach($attr['free_promo_id'], ['amount' => $free_promo['amount']]);

            if ($free_promo->type == 'month' || $free_promo->type == 'year') {
                $temp_expired_at->addMonths($free_promo->amount);
            }

            $policy->expired_at = $temp_expired_at;
            $policy->save();
            $invoice = $policy->generateInvoices(null, true);

            return back()->with([
                'type' => 'success',
                'message' => 'Free Promo has been added',
            ]);
        } else {
            return back()->with([
                'type' => 'error',
                'message' => 'Free Promo cannot be added',
            ]);
        }
    }

    public function deleteCoverage(string $id, Request $request)
    {
        $attr = $request->toArray();
        $policy = Policy::find($id);

        try {
            $policy->coverages()->detach($attr['coverage_id']);
            $invoice = $policy->generateInvoices(null, true);

            return back()->with([
                'type' => 'success',
                'message' => 'Coverage has been deleted',
            ]);
        } catch (\Illuminate\Database\QueryException $ex) {
            return back()->with([
                'type' => 'error',
                'message' => $ex->getMessage(),
            ]);
        }
    }

    public function deleteDiscount(string $id, Request $request)
    {
        $attr = $request->toArray();
        $policy = Policy::find($id);

        try {
            $policy->discounts()->detach($attr['discount_id']);
            $invoice = $policy->generateInvoices(null, true);

            return back()->with([
                'type' => 'success',
                'message' => 'Discount has been deleted',
            ]);
        } catch (\Illuminate\Database\QueryException $ex) {
            return back()->with([
                'type' => 'error',
                'message' => $ex->getMessage(),
            ]);
        }
    }

    public function deleteFreePromo(string $id, Request $request)
    {
        $attr = $request->toArray();
        $policy = Policy::find($id);

        try {

            $temp_expired_at = new Carbon($policy->expired_at);

            $free_promo = FreePromo::find($attr['free_promo_id']);
            $policy->freePromos()->detach($attr['free_promo_id']);

            if ($free_promo->type == 'month' || $free_promo->type == 'year') {
                $temp_expired_at->subMonths($free_promo->amount);
            }

            $policy->expired_at = $temp_expired_at;
            $policy->save();
            $invoice = $policy->generateInvoices(null, true);

            return back()->with([
                'type' => 'success',
                'message' => 'Free Promo has been deleted',
            ]);
        } catch (\Illuminate\Database\QueryException $ex) {
            return back()->with([
                'type' => 'error',
                'message' => $ex->getMessage(),
            ]);
        }
    }

    public function deleteService(string $id)
    {
        $service = Service::find($id);

        try {

            $service->delete();

            return back()->with([
                'type' => 'success',
                'message' => 'Service has been deleted',
            ]);
        } catch (\Illuminate\Database\QueryException $ex) {
            return back()->with([
                'type' => 'error',
                'message' => $ex->getMessage(),
            ]);
        }
    }

    public function updateDetails(string $id, Request $request)
    {
        $policy = Policy::find($id);
        $attr = $request->toArray();

        $policy->branch_id = $attr['branch_id'];
        $policy->policy_no = $attr['policy_no'];
        $policy->type = $attr['type'];
        $policy->remarks = $attr['remarks'];
        $policy->save();

        return back()->with([
            'type' => 'success',
            'message' => 'Policy has been updated',
        ]);
    }

    public function updateInvoice(Request $request, string $id)
    {
        try {
            $attr = $request->toArray();

            $findInvoice = PolicyInvoice::where('invoice_no', $attr['invoice_no'])->first();

            if (empty($findInvoice)) {
                $invoice = PolicyInvoice::find($id);
                $invoice->invoice_no = $attr['invoice_no'];
                $invoice->save();

                return back()->with([
                    'type' => 'success',
                    'message' => 'Invoice has been updated',
                ]);
            } else {

                return back()->with([
                    'type' => 'error',
                    'message' => 'Invoice no already exist',
                ]);
            }
        } catch (\Illuminate\Database\QueryException $ex) {
            return back()->with([
                'type' => 'error',
                'message' => $ex->getMessage(),
            ]);
        }
    }

    public function updateCustomerPayment(string $id, Request $request)
    {
        $policy = Policy::find($id);
        $attr = $request->toArray();
        $invoicePrice = $policy->invoicePrice();

        if ($attr['customer_payment'] > $invoicePrice) {
            return back()->with([
                'type' => 'error',
                'message' => 'Amount cannot more than invoice price',
            ]);
        } else {
            $policy->customer_payment = $attr['customer_payment'];
            $policy->save();
        }


        return back()->with([
            'type' => 'success',
            'message' => 'Customer payment has been updated',
        ]);
    }

    public function generatePayee()
    {

        $policies = Policy::doesntHave('payees')->has('activeInvoice')->get();

        foreach ($policies as $key => $policy) {
            $policy->generateDefaultPayee();
        }

        dd($policies);
    }

    public function generateReport()
    {

        $policies = Policy::has('activeInvoice')->get();

        foreach ($policies as $key => $policy) {
            $policy->generateReport();
        }

        dd($policies);
    }

    public function regenerateInvoices(Request $request)
    {
        $attr = $request->toArray();

        $policies = Policy::has('activeInvoice')->whereIn('id', json_decode($attr['ids']))->get();

        foreach ($policies as $key => $policy) {
            $invoice = $policy->generateInvoices(null, true);

            if (!empty($invoice)) {
                dump($invoice->id);
            }
        }
    }
}

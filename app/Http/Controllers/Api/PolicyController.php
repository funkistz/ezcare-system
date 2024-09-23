<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Dealer;
use App\Models\GeneralSetting;
use App\Models\OilType;
use Illuminate\Http\Request;
use App\Models\Policy;
use App\Models\Service;
use App\Models\User;
use Illuminate\Support\Carbon;
use App\Helpers\FileHelper;
use App\Http\Resources\PolicyAppResource;
use App\Models\Vehicle;
use Illuminate\Support\Facades\DB;

class PolicyController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $attr = $request->toArray();
        $start_at = !empty($attr['start_at']) ? Carbon::parse($attr['start_at']) : null;
        $end_at = !empty($attr['end_at']) ? Carbon::parse($attr['end_at']) : null;

        $policies = Policy::whereNotNull('id');

        // return response()->json([
        //     'status' => 'success',
        //     'data' => $attr
        // ]);

        if (!empty($attr['search'])) {
            $vehicle_ids = Vehicle::orWhere('registration_no', 'LIKE', $attr['search'])->orWhere('chassis_no', 'LIKE', $attr['search'])->pluck('id')->toArray();
            $policies = $policies->where('policy_no', 'LIKE', $attr['search'])->orWhereIn('vehicle_id', $vehicle_ids);

            // $policies = $policies->orWhereHas('invoices', function ($q) use ($attr) {
            //     $q->where('invoice_no', 'LIKE',  $attr['search']);
            // });
        }
        if (!empty($start_at)) {
            $policies = $policies->where('created_at', '>=', $start_at->format('Y-m-d H:i:s.u0'));
        }
        if (!empty($end_at)) {
            $policies = $policies->where('created_at', '<=', $end_at->format('Y-m-d H:i:s.u0'));
        }
        if (!empty($attr['status'])) {
            $policies = $policies->where('status_code', $attr['status']);
        }
        if (!empty($attr['payment_status'])) {
            $policies = $policies->where('payment_status_code', $attr['payment_status']);
        }
        if (!empty($attr['dealer_id'])) {
            $policies = $policies->where('dealer_id', $attr['dealer_id']);
        }
        // $attr['per_page'] = 30;
        $policies = $policies->paginate(20);

        $policies = PolicyAppResource::collection($policies)->response()->getData();

        // $unassigned = ScheduleInspection::whereNull('person_in_charge_id')->byDate($date)->get();
        // $mine = ScheduleInspection::where('person_in_charge_id', $attr['user_id'])->orWhere('marketing_officer_id', $attr['user_id'])->byDate($date)->get();
        // $all = ScheduleInspection::byDate($date)->get();
        $dealers = Dealer::toSelectData();
        $statuses = [
            ['label' => 'Draft', 'value' => 'draft'],
            ['label' => 'Activated', 'value' => 'activated'],
            ['label' => 'Deactivated', 'value' => 'deactivated'],
            ['label' => 'Void', 'value' => 'void'],
        ];
        $payment_statuses = [
            ['label' => 'Unpaid', 'value' => 'unpaid'],
            ['label' => 'Paid', 'value' => 'paid'],
            ['label' => 'Partial', 'value' => 'partial'],
            ['label' => 'Free of charge', 'value' => 'foc'],
        ];


        return response()->json([
            'status' => 'success',
            'data' => [
                'policies' => $policies,
                'statuses' => $statuses,
                'payment_statuses' => $payment_statuses,
                'dealers' => $dealers,
                'date' => Carbon::now(),
            ],
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
        $policy = Policy::with([
            'branch', 'customer', 'activeInvoice', 'vehicle', 'payments', 'statuses', 'paymentStatuses', 'invoices', 'invoices.items',
            'icFiles', 'grantFiles', 'vehicleFiles', 'chassisFiles',
            'speedometerFiles', 'mileageFiles', 'diagnoseFiles', 'otherFiles',
            'discounts', 'freePromos', 'services', 'services.files', 'services.oilType', 'warrantyPlan', 'warrantyPlan.oilTypes', 'claims', 'claims.claim_items', 'claims.claim_statuses', 'claims.audits', 'claims.files'
        ])->where('id', $id)->first();

        $policy->balance_payment = $policy->balancePayment();
        $settings = GeneralSetting::get()->keyBy('name');
        $policy->next_service = $policy->next_service;

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
        $staffs = User::role('staff')->toSelectData();

        return response()->json([
            "settings" => GeneralSetting::get()->keyBy('name'),
            'timezone' => Config('app.timezone'),
            "status" => "success",
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
        ]);
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

    public function services(Request $request, string $id)
    {

        $policy = Policy::find($id);
        $services = $policy->nextService;

        return response()->json([
            "status" => "success",
            "data" => $services,
        ]);
    }

    public function addServices(Request $request, string $id)
    {
        $policy = Policy::find($id);

        $service = $policy->addService($request);

        // $service = new Service();
        // $service->policy_id = $policy->id;
        // $service->service_type_id = $request->service_type_id;
        // $service->oil_type_id = $request->oil_type_id;
        // $service->remarks = $request->remarks;
        // $service->workshop_name = $request->workshop_name;
        // $service->invoice_no = $request->invoice_no;
        // $service->invoice_date = new Carbon($request->invoice_date);
        // $service->current_mileage = $request->current_mileage;
        // $service->current_date = Carbon::parse($request->current_date)->setTimezone(config('app.timezone'));

        // service_type_id: '',
        //     oil_type_id: null,
        //     remarks: '',
        //     workshop_name: '',
        //     invoice_no: '',
        //     invoice_date: new Date(),
        //     current_mileage: '',
        //     current_date: new Date(),
        // $service->save();

        return response()->json([
            "status" => "success",
            "message" => "Service successfully added",
            "data" => $service,
        ]);
    }
}

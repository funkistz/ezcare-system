<?php

namespace App\Http\Controllers;

use App\Http\Resources\DefaultResource;
use App\Models\Branch;
use App\Models\PolicyClaim;
use App\Models\User;
use Illuminate\Http\Request;

use App\Models\Policy;
use App\Models\Customer;
use App\Models\Vehicle;
use App\Models\WarrantyPlanClaimLimit;

use Dompdf\Dompdf;
use Dompdf\Options;

use Carbon\Carbon;


class PolicyClaimController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $data = PolicyClaim::with(['policy'])->paginate(1000);
        $data = DefaultResource::collection($data);
        $branches = Branch::toSelectData();
        $mos = User::role('mo')->active()->toSelectData();
        $technicals = User::role('technical')->active()->toSelectData();

        return inertia('PolicyClaim/Index', [
            'claims' => $data,
            'branches' => $branches,
            'mos' => $mos,
            'technicals' => $technicals,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
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
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
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

    public function onGenerateApprovalDoc(Request $request)
    {
        //hantar policy id, claim id untuk dapatkan details
        $date = Carbon::now();
        $currentdatetime = strtoupper($date->format('jS F Y'));
        $claim_id = $request->claim_id;

        $policyClaim = PolicyClaim::with('claim_items')
            ->find($claim_id);

        $totalSum = $policyClaim->claim_items->sum('price_approved');

        $policy = Policy::with(['vehicle', 'dealer', 'claims', 'warrantyPlan'])
            ->where('id', $policyClaim->policy_id)
            ->first();

        $claimLimit = WarrantyPlanClaimLimit::with('warrantyPlan')
            ->where('id', $policy->warrantyPlan->id)
            ->first();

        $vehicle = Vehicle::with(['brand', 'model'])
            ->where('vehicle_brand_id', $policy->vehicle->vehicle_brand_id)
            ->first();

        $customer = Customer::with('mainAddress')->where('id', $policy->customer_id)->first();

        $html = view('document.claimapprovaldoc', compact('currentdatetime', 'policy', 'customer', 'vehicle', 'policyClaim', 'claimLimit', 'totalSum'))->render();

        $options = new Options();
        $options->set('isHtml5ParserEnabled', true);
        $options->set('isRemoteEnabled', true);

        $dompdf = new Dompdf($options);
        $dompdf->loadHtml($html);
        $dompdf->setPaper('A4', 'portrait');

        $dompdf->render();

        $dompdf->stream('claim_approval.pdf', [
            'Attachment' => false
        ]);
    }

    public function onGenerateLosDoc(Request $request)
    {
        $date = Carbon::now();
        $currentdatetime = strtoupper($date->format('jS F Y'));
        $claim_id = $request->claim_id;

        $policyClaim = PolicyClaim::with('claim_items')
            ->find($claim_id);

        $policy = Policy::with(['vehicle', 'dealer', 'claims', 'warrantyPlan'])
            ->where('id', $policyClaim->policy_id)
            ->first();

        $vehicle = Vehicle::with(['brand', 'model'])
            ->where('vehicle_brand_id', $policy->vehicle->vehicle_brand_id)
            ->first();

        $customer = Customer::with('mainAddress')->where('id', $policy->customer_id)->first();

        $html = view('document.lackofservicedoc', compact('currentdatetime', 'policy', 'customer', 'vehicle', 'policyClaim'))->render();

        $options = new Options();
        $options->set('isHtml5ParserEnabled', true);
        $options->set('isRemoteEnabled', true);

        $dompdf = new Dompdf($options);
        $dompdf->loadHtml($html);
        $dompdf->setPaper('A4', 'portrait');

        $dompdf->render();

        $dompdf->stream('LACK OF SERVICE (SERVICES NOT FOLLOWING SERVICE INTERVAL).pdf', [
            'Attachment' => false
        ]);
    }

    public function onGenerateUnavailableServiceDoc(Request $request)
    {
        $date = Carbon::now();
        $currentdatetime = strtoupper($date->format('jS F Y'));
        $claim_id = $request->claim_id;

        $policyClaim = PolicyClaim::with('claim_items')
            ->find($claim_id);

        $policy = Policy::with(['vehicle', 'dealer', 'claims', 'warrantyPlan'])
            ->where('id', $policyClaim->policy_id)
            ->first();

        $vehicle = Vehicle::with(['brand', 'model'])
            ->where('vehicle_brand_id', $policy->vehicle->vehicle_brand_id)
            ->first();

        $customer = Customer::with('mainAddress')->where('id', $policy->customer_id)->first();

        $html = view('document.unavailableservicedoc', compact('currentdatetime', 'policy', 'customer', 'vehicle', 'policyClaim'))->render();

        $options = new Options();
        $options->set('isHtml5ParserEnabled', true);
        $options->set('isRemoteEnabled', true);

        $dompdf = new Dompdf($options);
        $dompdf->loadHtml($html);
        $dompdf->setPaper('A4', 'portrait');

        $dompdf->render();

        $dompdf->stream('LACK OF SERVICE (UNAVAILBLE SERVICE DOCUMENT).pdf', [
            'Attachment' => false
        ]);
    }

    public function onGenerateInsufficentSupportingDoc(Request $request)
    {
        $date = Carbon::now();
        $currentdatetime = strtoupper($date->format('jS F Y'));
        $claim_id = $request->claim_id;

        $policyClaim = PolicyClaim::with('claim_items')
            ->find($claim_id);

        $policy = Policy::with(['vehicle', 'dealer', 'claims', 'warrantyPlan'])
            ->where('id', $policyClaim->policy_id)
            ->first();

        $vehicle = Vehicle::with(['brand', 'model'])
            ->where('vehicle_brand_id', $policy->vehicle->vehicle_brand_id)
            ->first();

        $customer = Customer::with('mainAddress')->where('id', $policy->customer_id)->first();

        $html = view('document.insufficientsupportingdoc', compact('currentdatetime', 'policy', 'customer', 'vehicle', 'policyClaim'))->render();

        $options = new Options();
        $options->set('isHtml5ParserEnabled', true);
        $options->set('isRemoteEnabled', true);

        $dompdf = new Dompdf($options);
        $dompdf->loadHtml($html);
        $dompdf->setPaper('A4', 'portrait');

        $dompdf->render();

        $dompdf->stream('INSUFFICIENT SUPPORTING DOCUMENTS.pdf', [
            'Attachment' => false
        ]);
    }

    public function onGenerateRepairWithoutPermissionDoc(Request $request)
    {
        $date = Carbon::now();
        $currentdatetime = strtoupper($date->format('jS F Y'));
        $claim_id = $request->claim_id;

        $policyClaim = PolicyClaim::with('claim_items')
            ->find($claim_id);

        $policy = Policy::with(['vehicle', 'dealer', 'claims', 'warrantyPlan'])
            ->where('id', $policyClaim->policy_id)
            ->first();

        $vehicle = Vehicle::with(['brand', 'model'])
            ->where('vehicle_brand_id', $policy->vehicle->vehicle_brand_id)
            ->first();

        $customer = Customer::with('mainAddress')->where('id', $policy->customer_id)->first();

        $html = view('document.repairwithoutpermission', compact('currentdatetime', 'policy', 'customer', 'vehicle', 'policyClaim'))->render();

        $options = new Options();
        $options->set('isHtml5ParserEnabled', true);
        $options->set('isRemoteEnabled', true);

        $dompdf = new Dompdf($options);
        $dompdf->loadHtml($html);
        $dompdf->setPaper('A4', 'portrait');

        $dompdf->render();

        $dompdf->stream('REPAIR WITHOUT PERMISSION.pdf', [
            'Attachment' => false
        ]);
    }

    public function onGenerateUnderCoolingOfPeriodDoc(Request $request)
    {
        $date = Carbon::now();
        $currentdatetime = strtoupper($date->format('jS F Y'));
        $claim_id = $request->claim_id;

        $policyClaim = PolicyClaim::with('claim_items')
            ->find($claim_id);

        $policy = Policy::with(['vehicle', 'dealer', 'claims', 'warrantyPlan'])
            ->where('id', $policyClaim->policy_id)
            ->first();

        $vehicle = Vehicle::with(['brand', 'model'])
            ->where('vehicle_brand_id', $policy->vehicle->vehicle_brand_id)
            ->first();

        $customer = Customer::with('mainAddress')->where('id', $policy->customer_id)->first();

        $html = view('document.undercoolingofperiod', compact('currentdatetime', 'policy', 'customer', 'vehicle', 'policyClaim'))->render();

        $options = new Options();
        $options->set('isHtml5ParserEnabled', true);
        $options->set('isRemoteEnabled', true);

        $dompdf = new Dompdf($options);
        $dompdf->loadHtml($html);
        $dompdf->setPaper('A4', 'portrait');

        $dompdf->render();

        $dompdf->stream('STILL UNDER COOLING OFF PERIOD.pdf', [
            'Attachment' => false
        ]);
    }

    public function onGenerateUnavailableRepairQuoteDoc(Request $request)
    {
        $date = Carbon::now();
        $currentdatetime = strtoupper($date->format('jS F Y'));
        $claim_id = $request->claim_id;

        $policyClaim = PolicyClaim::with('claim_items')
            ->find($claim_id);

        $policy = Policy::with(['vehicle', 'dealer', 'claims', 'warrantyPlan'])
            ->where('id', $policyClaim->policy_id)
            ->first();

        $vehicle = Vehicle::with(['brand', 'model'])
            ->where('vehicle_brand_id', $policy->vehicle->vehicle_brand_id)
            ->first();

        $customer = Customer::with('mainAddress')->where('id', $policy->customer_id)->first();

        $html = view('document.unavailablerepairquote', compact('currentdatetime', 'policy', 'customer', 'vehicle', 'policyClaim'))->render();

        $options = new Options();
        $options->set('isHtml5ParserEnabled', true);
        $options->set('isRemoteEnabled', true);

        $dompdf = new Dompdf($options);
        $dompdf->loadHtml($html);
        $dompdf->setPaper('A4', 'portrait');

        $dompdf->render();

        $dompdf->stream('UNAVAILBLE REPAIR QUOTATION FROM WORKSHOP.pdf', [
            'Attachment' => false
        ]);
    }

    public function onGenerateWarrantyContinuationDoc(Request $request)
    {
        $date = Carbon::now();
        $currentdatetime = strtoupper($date->format('jS F Y'));
        $claim_id = $request->claim_id;

        $policyClaim = PolicyClaim::with('claim_items')
            ->find($claim_id);

        $policy = Policy::with(['vehicle', 'dealer', 'claims', 'warrantyPlan'])
            ->where('id', $policyClaim->policy_id)
            ->first();

        $vehicle = Vehicle::with(['brand', 'model'])
            ->where('vehicle_brand_id', $policy->vehicle->vehicle_brand_id)
            ->first();

        $customer = Customer::with('mainAddress')->where('id', $policy->customer_id)->first();

        $html = view('document.warrantycontinuation', compact('currentdatetime', 'policy', 'customer', 'vehicle', 'policyClaim'))->render();

        $options = new Options();
        $options->set('isHtml5ParserEnabled', true);
        $options->set('isRemoteEnabled', true);

        $dompdf = new Dompdf($options);
        $dompdf->loadHtml($html);
        $dompdf->setPaper('A4', 'portrait');

        $dompdf->render();

        $dompdf->stream('WARRANTY CONTINUATION & CLAIM DENIAL.pdf', [
            'Attachment' => false
        ]);
    }
}

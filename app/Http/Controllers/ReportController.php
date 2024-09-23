<?php

namespace App\Http\Controllers;

use App\Exports\PolicySimpleExport;
use App\Models\Policy;
use Illuminate\Http\Request;
use App\Http\Resources\PolicySimpleResource;
use App\Http\Resources\PolicySoaResource;
use App\Models\Branch;
use App\Models\Dealer;
use Carbon\Carbon;
use Maatwebsite\Excel\Facades\Excel;
use Carbon\CarbonPeriod;

class ReportController extends Controller
{

    private function policySimpletCollection($meta)
    {
        $policies = Policy::with(['customer:id,first_name,last_name,phone_no,ic', 'payments', 'policyReport', 'vehicle', 'vehicle.brand', 'vehicle.model', 'activeInvoice', 'dealer:id,name', 'marketingOfficer:id,name', 'warrantyPlan:id,name'])
            ->where('status_code', '!=', 'deactivated');

        // if ($searchTerm) {
        //     $policies->where(function ($subquery) use ($searchTerm) {
        //         $subquery->where('firstname', 'like', '%' . $searchTerm . '%')
        //             ->orWhere('lastname', 'like', '%' . $searchTerm . '%')
        //             ->orWhere('email', 'like', '%' . $searchTerm . '%');
        //     });
        // }

        // dd($meta['branch']);

        // dd($meta['branch']);

        if (!empty($meta['branch'])) {
            $policies->where('branch_id', $meta['branch']);
        }
        if (!empty($meta['createdDateFrom'])) {
            $policies->where('created_at', '>=', $meta['createdDateFrom']);
        }
        if (!empty($meta['createdDateTo'])) {
            $policies->where('created_at', '<=', $meta['createdDateTo']);
        }
        if (!empty($meta['activatedDateFrom'])) {
            $policies->where('activated_at', '>=', $meta['activatedDateFrom']);
        }
        if (!empty($meta['activatedDateTo'])) {
            $policies->where('activated_at', '<=', $meta['activatedDateTo']);
        }
        if (!empty($meta['invoiceDateFrom'])) {
            $policies->whereHas('activeInvoice', function ($q) use ($meta) {
                $q->where('date', '>=', $meta['invoiceDateFrom']);
            });
        }
        if (!empty($meta['invoiceDateTo'])) {
            $policies->whereHas('activeInvoice', function ($q) use ($meta) {
                $q->where('date', '<=', $meta['invoiceDateTo']);
            });
        }
        if (!empty($meta['dealer'])) {
            $policies->where('dealer_id', $meta['dealer']);
        }

        if (!empty($meta['sort_by']) && !empty($meta['order_by'])) {
            $policies = $policies->orderBy($meta['sort_by'], $meta['order_by']);
        }
        if (!empty($meta['paymentDateFrom'])) {
            $policies->whereHas('latestPayments', function ($q) use ($meta) {
                $q->where('date', '>=', $meta['paymentDateFrom']);
            });
        }
        if (!empty($meta['paymentDateTo'])) {
            $policies->whereHas('latestPayments', function ($q) use ($meta) {
                $q->where('date', '<=', $meta['paymentDateTo']);
            });
        }

        return $policies;
    }

    public function policySimple(Request $request)
    {
        $meta = [
            'sort_by' => $request->input('sort_by', 'id'),
            'order_by' => $request->input('order_by', 'asc'),
            'search' =>  $request->input('search'),
            'branch' =>  $request->input('branch'),
            'createdDateFrom' =>  $request->input('createdDateFrom'),
            'createdDateTo' =>  $request->input('createdDateTo'),
            'invoiceDateFrom' =>  $request->input('invoiceDateFrom'),
            'invoiceDateTo' =>  $request->input('invoiceDateTo'),
            'activatedDateFrom' =>  $request->input('activatedDateFrom'),
            'activatedDateTo' =>  $request->input('activatedDateTo'),
            'paymentDateFrom' =>  $request->input('paymentDateFrom'),
            'paymentDateTo' =>  $request->input('paymentDateTo'),
        ];

        $per_page = $request->input('per_page', 50);

        $policies = $this->policySimpletCollection($meta);

        if ($request->type == 'export') {
            $policies = $policies->get();
            $policies = PolicySimpleResource::collection($policies);

            // dd(json_decode(json_encode($policies)));

            return Excel::download(new PolicySimpleExport($policies), 'policy-simple.xlsx');
        } else {
            $policies = $policies->paginate($per_page);
            $policies = PolicySimpleResource::collection($policies)->additional(['meta' =>  $meta]);

            $branches = Branch::toSelectData();

            return inertia('Reports/PolicySimple', [
                'policies' => $policies,
                'branches' => $branches,
            ]);
        }
    }

    public function soa(Request $request)
    {
        $meta = [
            'branch' =>  $request->input('branch', ''),
            'dealer' =>  $request->input('dealer', ''),
            'invoiceDateFrom' =>  $request->input('invoiceDateFrom', ''),
            'invoiceDateTo' =>  $request->input('invoiceDateTo', ''),
            'activatedDateFrom' =>  $request->input('activatedDateFrom'),
            'activatedDateTo' =>  $request->input('activatedDateTo'),
        ];

        $per_page = $request->input('per_page', 50);

        $policies = $this->policySimpletCollection($meta);

        if ($request->type == 'export') {
            $policies = $policies->get();
            $policies = PolicySoaResource::collection($policies);

            // dd(json_decode(json_encode($policies)));

            return Excel::download(new PolicySimpleExport($policies), 'policy-simple.xlsx');
        } else {
            $policies = $policies->paginate($per_page);
            $policies = PolicySoaResource::collection($policies)->additional(['meta' =>  $meta]);

            $branches = Branch::toSelectData();
            $dealers = Dealer::toSelectData();

            $dealer = Dealer::with(['mainAddress'])->find($meta['dealer']);

            $debit = 0;
            $credit = 0;
            $balance = 0;
            $items = $policies->toArray($request);
            $reports = [];
            $total_yearly = 0;

            $end_report = Carbon::now()->endOfMonth();
            $start_report = $end_report->clone()->subMonths(12)->addDays(2)->startOfMonth();

            foreach (CarbonPeriod::create($start_report, '1 month', $end_report) as $month) {
                $reports[$month->format('M Y')] = 0;
            }

            foreach ($items as $key => $item) {

                if (!empty($item['month'])) {
                    $reports[$item['month']] +=  (float)$item['balance'];
                    $total_yearly += (float)$item['balance'];
                }

                $debit += (float)$item['debit'];
                $credit += (float)$item['credit'];
                $balance += (float)$item['balance'];
            }

            foreach ($reports as $key => $value) {
                $reports[$key] = number_format((float)$value, 2, '.', '');
            }

            // unset($meta['invoiceDateFrom']);
            // unset($meta['invoiceDateTo']);


            // $policies_total = $this->policySimpletCollection($meta);

            // $end_report = Carbon::now()->endOfMonth();
            // $start_report = $end_report->clone()->subMonths(12)->addDays(2)->startOfMonth();

            // $policies_total = $policies_total->whereHas('activeInvoice', function ($q) use ($start_report) {
            //     $q->where('date', '>=', $start_report->clone()->subYear(1));
            // });

            // $policies_total = $policies_total->whereHas('activeInvoice', function ($q) use ($end_report) {
            //     $q->where('date', '<=', $end_report->clone()->toDateTimeString());
            // });

            // $policies_total = $policies_total->get();

            // foreach (CarbonPeriod::create($start_report, '1 month', $end_report) as $month) {
            //     $reports[$month->format('M Y')] = 0;
            // }
            // foreach ($policies as $key => $policy) {

            //     if (!empty($policy->activeInvoice)) {
            //         $month = Carbon::parse($policy->activeInvoice->date)->format('M Y');
            //         $reports[$month] +=  (float)$policy->dealerBalancePayment();
            //         $total_yearly += (float)$policy->dealerBalancePayment();
            //     }
            // }


            $data = [
                'dealer' => $dealer,
                'items' => $policies,
                'yearly' => $reports,
                'total_yearly' => number_format((float)$total_yearly, 2, '.', ''),
                'total' => [
                    'debit' => number_format((float)$debit, 2, '.', ''),
                    'credit' => number_format((float)$credit, 2, '.', ''),
                    'balance' => number_format((float)$balance, 2, '.', ''),
                ],
            ];

            return inertia('Reports/SOA', [
                'policies' => $policies,
                'branches' => $branches,
                'dealers' => $dealers,
                'data' => $data,
            ]);
        }
    }

    public function os(Request $request)
    {
        $meta = [
            'branch' =>  $request->input('branch', ''),
            'dealer' =>  $request->input('dealer', ''),
            'invoiceDateFrom' =>  $request->input('invoiceDateFrom', ''),
            'invoiceDateTo' =>  $request->input('invoiceDateTo', ''),
            'activatedDateFrom' =>  $request->input('activatedDateFrom'),
            'activatedDateTo' =>  $request->input('activatedDateTo'),
        ];

        $per_page = $request->input('per_page', 50);

        $policies = $this->policySimpletCollection($meta);

        if ($request->type == 'export') {
            //for OS only filter extra status
            $policies = $policies->notPaidOnly()->get();
            $policies = PolicySoaResource::collection($policies);

            return Excel::download(new PolicySimpleExport($policies), 'policy-simple.xlsx');
        } else {
            //for OS only filter extra status
            $policies = $policies->notPaidOnly()->paginate($per_page);
            $policies = PolicySoaResource::collection($policies)->additional(['meta' =>  $meta]);

            $branches = Branch::toSelectData();
            $dealers = Dealer::toSelectData();

            $dealer = Dealer::with(['mainAddress'])->find($meta['dealer']);

            $debit = 0;
            $credit = 0;
            $balance = 0;
            $items = $policies->toArray($request);
            $reports = [];
            $total_yearly = 0;

            $end_report = Carbon::now()->endOfMonth();
            $start_report = $end_report->clone()->subMonths(12)->addDays(2)->startOfMonth();

            foreach (CarbonPeriod::create($start_report, '1 month', $end_report) as $month) {
                $reports[$month->format('M Y')] = 0;
            }

            foreach ($items as $key => $item) {

                if (!empty($item['month'])) {
                    $reports[$item['month']] +=  (float)$item['balance'];
                    $total_yearly += (float)$item['balance'];
                }

                $debit += (float)$item['debit'];
                $credit += (float)$item['credit'];
                $balance += (float)$item['balance'];
            }

            foreach ($reports as $key => $value) {
                $reports[$key] = number_format((float)$value, 2, '.', '');
            }

            $data = [
                'dealer' => $dealer,
                'items' => $policies,
                'yearly' => $reports,
                'total_yearly' => number_format((float)$total_yearly, 2, '.', ''),
                'total' => [
                    'debit' => number_format((float)$debit, 2, '.', ''),
                    'credit' => number_format((float)$credit, 2, '.', ''),
                    'balance' => number_format((float)$balance, 2, '.', ''),
                ],
            ];

            return inertia('Reports/OS', [
                'policies' => $policies,
                'branches' => $branches,
                'dealers' => $dealers,
                'data' => $data,
            ]);
        }
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
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
}

<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Branch;
use App\Models\GeneralSetting;
use App\Models\Policy;
use App\Models\PolicyReport;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json([
            'status' => 'success',
            'data' => [
                'sale' => [
                    'total' => 1000,
                    'paid' => 200,
                    'unpaid' => 300,
                    'outstanding' => 250,
                    'claim_paid' => 250,
                ],
                'policy' => [
                    'all' => 1000,
                    'draft' => 200,
                    'activated' => 300,
                    'deactivated' => 250,
                    'voided' => 250,
                ],
                'payment' => [
                    'paid' => 200,
                    'unpaid' => 300,
                    'partial' => 300,
                    'foc' => 300,
                ],
            ],
        ]);
    }

    public function dynamic(Request $request)
    {
        $attr = $request->toArray();
        $date = Carbon::parse($attr['date']);
        $user = !empty($attr['user_id']) ? User::find($attr['user_id']) : null;
        $attr['branch_id'] = $attr['branch'] ?? null;

        $reports = [];

        //sales report
        if (!empty($user) && $user->hasPermissionTo('app_dashboard.sales')) {

            $mo_exclude = GeneralSetting::where('name', 'report_mo_exclude_user_ids')->first();
            $mo_exclude_ids = json_decode($mo_exclude->value);

            DB::enableQueryLog();
            $policy_count = Policy::byPaidDate($date)->activeOnly()->byBranch($attr['branch_id'])->paidOnly()->notFOC()->count();
            $policies_id = Policy::byPaidDate($date)->activeOnly()->byBranch($attr['branch_id'])->paidOnly()->notFOC()->get()->pluck('id')->toArray();

            $log = DB::getQueryLog();

            $policy_count_mo = Policy::byPaidDate($date)->activeOnly()->byBranch($attr['branch_id'])->paidOnly()->notFOC()->MoReportOnly($mo_exclude_ids)->count();
            $policies_id_mo = Policy::byPaidDate($date)->activeOnly()->byBranch($attr['branch_id'])->paidOnly()->notFOC()->MoReportOnly($mo_exclude_ids)->get()->pluck('id')->toArray();

            $policy_count_unpaid = Policy::byActivatedDate($date)->activeOnly()->byBranch($attr['branch_id'])->notPaidOnly()->notFOC()->count();
            $policies_id_unpaid = Policy::byActivatedDate($date)->activeOnly()->byBranch($attr['branch_id'])->notPaidOnly()->notFOC()->get()->pluck('id')->toArray();

            $sales = [
                'total' => 0,
                'total_mo' => 0,
                'unpaid' => 0,
                'outstanding' => 0,
                'claim' => 0,
            ];

            $sales['total'] = PolicyReport::getTotalNett($policies_id);
            $sales['total_mo'] = PolicyReport::getTotalNett($policies_id_mo);
            $sales['unpaid'] = PolicyReport::getTotalUnpaid($policies_id_unpaid);
            // $sales['outstanding'] = PolicyReport::getTotalAmount($policies_id);
            // $sales['total'] = PolicyReport::getTotalAmount($policies_id);

            // foreach ($policies as $key => $policy) {
            //     $temp = $policy->balancePayment();
            //     $sales['unpaid'] += $temp >= 0 ? $temp : 0;

            //     $sales['total'] += $policy->activeInvoice ?  $policy->activeInvoice->total : 0;
            //     $sales['paid'] += $policy->total_payment ?  $policy->total_payment['total'] : 0;
            // }

            $sales['total'] = 'RM ' . number_format($sales['total'], 2, '.', ',');
            $sales['total_mo'] = 'RM ' . number_format($sales['total_mo'], 2, '.', ',');
            $sales['unpaid'] = 'RM ' . number_format($sales['unpaid'], 2, '.', ',');
            $sales['outstanding'] = 'RM ' . number_format($sales['outstanding'], 2, '.', ',');
            $sales['claim'] = 'RM ' . number_format($sales['claim'], 2, '.', ',');

            $reports[] = [
                'code' => 'sales',
                'label' => 'Sales',
                'data' => [
                    [
                        'type' => 'long',
                        'col' => 12,
                        'label' => 'Total Sales Paid',
                        'stats' => $sales['total'],
                        'icon' => 'IconCoins',
                        'bg' => 'violet.2',
                        'color' => 'black',
                    ],
                    [
                        'type' => 'long',
                        'col' => 12,
                        'label' => 'Mo Sales Paid',
                        'stats' => $sales['total_mo'],
                        'icon' => 'IconUserDollar',
                        'bg' => 'violet.1',
                        'color' => 'black',
                    ],
                    [
                        'type' => 'long',
                        'col' => 12,
                        'label' => 'Sales Unpaid',
                        'stats' => $sales['unpaid'],
                        'icon' => 'IconTrendingDown',
                        'bg' => 'red.2',
                        'color' => 'black',
                    ],
                    [
                        'type' => 'long',
                        'col' => 12,
                        'label' => 'Mo Target Balance',
                        'stats' => '-',
                        'icon' => 'IconTargetArrow',
                        'bg' => 'blue.2',
                        'color' => 'black',
                    ],
                    [
                        'type' => 'long',
                        'col' => 12,
                        'label' => 'Outstanding',
                        'stats' => '-',
                        'icon' => 'IconReceipt2',
                        'bg' => 'orange.2',
                        'color' => 'black',
                    ],
                    [
                        'type' => 'long',
                        'col' => 12,
                        'label' => 'Claim paid',
                        'stats' => '-',
                        'icon' => 'IconReceiptRefund',
                        'bg' => 'orange.1',
                        'color' => 'black',
                    ],
                    // [
                    //     'type' => 'box',
                    //     'col' => 6,
                    //     'label' => 'Sales Paid',
                    //     'stats' => $sales['paid'],
                    //     'icon' => 'IconTrendingUp',
                    //     'bg' => 'green.2',
                    //     'color' => 'black',
                    // ],
                    // [
                    //     'type' => 'box',
                    //     'col' => 6,
                    //     'label' => 'Sales Unpaid',
                    //     'stats' => $sales['unpaid'],
                    //     'icon' => 'IconTrendingDown',
                    //     'bg' => 'red.2',
                    //     'color' => 'black',
                    // ],
                    // [
                    //     'type' => 'box',
                    //     'col' => 6,
                    //     'label' => 'Outstanding',
                    //     'stats' => '-',
                    //     'icon' => 'IconReceipt2',
                    //     'bg' => 'orange.2',
                    //     'color' => 'black',
                    // ],
                    // [
                    //     'type' => 'box',
                    //     'col' => 6,
                    //     'label' => 'Claim Paid',
                    //     'stats' => '-',
                    //     'icon' => 'IconReceiptRefund',
                    //     'bg' => 'pink.2',
                    //     'color' => 'black',
                    // ]
                ],
            ];
        }

        if (!empty($user) && ($user->hasPermissionTo('app_dashboard.mo') || $user->hasPermissionTo('app_dashboard.admin_mo'))) {

            $mo_id = !empty($attr['mo']) ? $attr['mo'] : $attr['user_id'];


            $policy_count = Policy::byActivatedDate($date)->activeOnly()->notFOC()->where('marketing_officer_id', $mo_id)->count();
            $policies_id = Policy::byActivatedDate($date)->activeOnly()->notFOC()->where('marketing_officer_id', $mo_id)->get()->pluck('id')->toArray();

            // $policies = Policy::byActivatedDate($date)->where('marketing_officer_id', $mo_id)->get();

            $policy_paid_count = Policy::byActivatedDate($date)->activeOnly()->where('marketing_officer_id', $mo_id)->where('payment_status_code', 'paid')->count();
            $policy_unpaid_count = Policy::byActivatedDate($date)->activeOnly()->where('marketing_officer_id', $mo_id)
                ->where('payment_status_code', '!=', 'paid')->where('payment_status_code', '!=', 'foc')->count();

            $sales = [
                'total' => 0,
                'paid_unit' => $policy_paid_count,
                'paid' => 0,
                'unpaid_unit' => $policy_unpaid_count,
                'unpaid' => 0,
            ];

            $sales['total'] = PolicyReport::getTotalAmount($policies_id);
            $sales['paid'] = PolicyReport::getTotalPaid($policies_id);
            $sales['unpaid'] = PolicyReport::getTotalUnpaid($policies_id);

            $sales['total'] = 'RM ' . number_format($sales['total'], 2, '.', ',');
            $sales['paid'] = 'RM ' . number_format($sales['paid'], 2, '.', ',');
            $sales['unpaid'] = 'RM ' . number_format($sales['unpaid'], 2, '.', ',');

            // foreach ($policies as $key => $policy) {
            //     $temp = $policy->balancePayment();
            //     $sales['unpaid_total'] += $temp >= 0 ? $temp : 0;
            //     $sales['paid_total'] += $policy->total_payment ?  $policy->total_payment['total'] : 0;
            // }
            // $sales['unpaid_total'] = 'RM ' . number_format($sales['unpaid_total'], 2, '.', ',');
            // $sales['paid_total'] = 'RM ' . number_format($sales['paid_total'], 2, '.', ',');

            $reports[] = [
                'code' => 'mo',
                'label' => 'MO SALES',
                'mo_filter' => $user->hasPermissionTo('app_dashboard.admin_mo') ? true : false,
                'data' => [
                    [
                        'type' => 'long',
                        'col' => 12,
                        'label' => 'Total Sales',
                        'stats' => $sales['total'],
                        'icon' => 'IconCoins',
                        'bg' => 'violet.2',
                        'color' => 'black',
                    ],
                    [
                        'type' => 'box',
                        'col' => 6,
                        'label' => 'Policy Paid',
                        'stats' => $sales['paid_unit'],
                        'icon' => 'IconReceipt2',
                        'bg' => 'green.2',
                        'color' => 'black',
                    ],
                    [
                        'type' => 'box',
                        'col' => 6,
                        'label' => 'Sales Paid',
                        'stats' => $sales['paid'],
                        'icon' => 'IconTrendingUp',
                        'bg' => 'red.2',
                        'color' => 'black',
                    ],
                    [
                        'type' => 'box',
                        'col' => 6,
                        'label' => 'Policy Unpaid',
                        'stats' => $sales['unpaid_unit'],
                        'icon' => 'IconReceiptRefund',
                        'bg' => 'orange.2',
                        'color' => 'black',
                    ],
                    [
                        'type' => 'box',
                        'col' => 6,
                        'label' => 'Sales Unpaid',
                        'stats' => $sales['unpaid'],
                        'icon' => 'IconTrendingDown',
                        'bg' => 'pink.2',
                        'color' => 'black',
                    ]
                ],
            ];
        }

        if (!empty($user) && $user->hasPermissionTo('app_dashboard.policy')) {
            $policy_draft_count = Policy::byActivatedDate($date)->where('status_code', config('constant.status.draft.value'))->count();
            $policy_active_count = Policy::byActivatedDate($date)->where('status_code', config('constant.status.activated.value'))->count();
            $policy_deactivate_count = Policy::byActivatedDate($date)->where('status_code', config('constant.status.deactivated.value'))->count();
            $policy_void_count = Policy::byActivatedDate($date)->where('status_code', config('constant.status.void.value'))->count();

            $reports[] = [
                'code' => 'policy',
                'label' => 'Policy',
                'data' => [
                    [
                        'type' => 'long',
                        'col' => 12,
                        'label' => 'All',
                        'stats' => $policy_count,
                        'icon' => 'IconCoins',
                        'bg' => 'violet.2',
                        'color' => 'black',
                        'link' => 'tab1/policy',
                    ],
                    [
                        'type' => 'box',
                        'col' => 6,
                        'label' => 'DRAFT',
                        'stats' => $policy_draft_count,
                        'icon' => 'IconFileInfo',
                        'bg' => 'gray.2',
                        'color' => 'black',
                        'link' => 'tab1/policy',
                        'params' => [
                            'status' => 'draft'
                        ]
                    ],
                    [
                        'type' => 'box',
                        'col' => 6,
                        'label' => 'ACTIVATED',
                        'stats' => $policy_active_count,
                        'icon' => 'IconFileCheck',
                        'bg' => 'green.2',
                        'color' => 'black',
                        'link' => 'tab1/policy',
                        'params' => [
                            'status' => 'activated'
                        ]
                    ],
                    [
                        'type' => 'box',
                        'col' => 6,
                        'label' => 'DEACTIVATED',
                        'stats' => $policy_deactivate_count,
                        'icon' => 'IconFileAlert',
                        'bg' => 'orange.2',
                        'color' => 'black',
                        'link' => 'tab1/policy',
                        'params' => [
                            'status' => 'deactivated'
                        ]
                    ],
                    [
                        'type' => 'box',
                        'col' => 6,
                        'label' => 'VOIDED',
                        'stats' => $policy_void_count,
                        'icon' => 'IconFileX',
                        'bg' => 'red.2',
                        'color' => 'black',
                        'link' => 'tab1/policy',
                        'params' => [
                            'status' => 'voided'
                        ]
                    ]
                ],
            ];
        }

        if (!empty($user) && $user->hasPermissionTo('app_dashboard.payment')) {
            $policy_unpaid_count = Policy::byActivatedDate($date)->where('payment_status_code', config('constant.status.unpaid.value'))->count();
            $policy_paid_count = Policy::byActivatedDate($date)->where('payment_status_code', config('constant.status.paid.value'))->count();
            $policy_partial_count = Policy::byActivatedDate($date)->where('payment_status_code', config('constant.status.partial.value'))->count();
            $policy_foc_count = Policy::byActivatedDate($date)->where('payment_status_code', config('constant.status.foc.value'))->count();

            $reports[] = [
                'code' => 'payment',
                'label' => 'Payment',
                'data' => [
                    [
                        'type' => 'box',
                        'col' => 6,
                        'label' => 'UNPAID',
                        'stats' => $policy_unpaid_count,
                        'icon' => 'IconReceiptOff',
                        'bg' => 'red.2',
                        'color' => 'black',
                        'link' => 'tab1/policy',
                        'params' => [
                            'status' => 'draft'
                        ]
                    ],
                    [
                        'type' => 'box',
                        'col' => 6,
                        'label' => 'PAID',
                        'stats' => $policy_paid_count,
                        'icon' => 'IconReceipt',
                        'bg' => 'green.2',
                        'color' => 'black',
                        'link' => 'tab1/policy',
                        'params' => [
                            'status' => 'activated'
                        ]
                    ],
                    [
                        'type' => 'box',
                        'col' => 6,
                        'label' => 'PARTIAL',
                        'stats' => $policy_partial_count,
                        'icon' => 'IconReceiptRefund',
                        'bg' => 'orange.2',
                        'color' => 'black',
                        'link' => 'tab1/policy',
                        'params' => [
                            'status' => 'deactivated'
                        ]
                    ],
                    [
                        'type' => 'box',
                        'col' => 6,
                        'label' => 'FOC',
                        'stats' => $policy_foc_count,
                        'icon' => 'IconReceiptOff',
                        'bg' => 'pink.2',
                        'color' => 'black',
                        'link' => 'tab1/policy',
                        'params' => [
                            'status' => 'voided'
                        ]
                    ]
                ],
            ];
        }

        $mos = User::role('mo')->active()->toSelectData();
        $branches = Branch::toSelectData();


        return response()->json([
            'status' => 'success',
            'mo_exclude_ids' => $mo_exclude_ids,
            'mo' => !empty($attr['mo']) ? $attr['mo'] : null,
            'data' => $reports,
            'mos' => $mos,
            'branches' => $branches,
            'log' => $log
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
}

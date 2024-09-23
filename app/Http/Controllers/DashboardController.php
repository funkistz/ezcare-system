<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Response;
use App\Models\Status;
use Illuminate\Support\Facades\DB;
use App\Models\Vehicle;
use App\Models\Policy;
use App\Models\PolicyReport;

class DashboardController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request): Response
    {
        $policy_count = Policy::pluck('id')->toArray();
        $policy_count_nett = PolicyReport::whereIn('id', $policy_count)->sum('total_nett');

        $policy_draft_count = Policy::where('status_code', config('constant.status.draft.value'))->pluck('id')->toArray();
        $policy_draft_count_nett = PolicyReport::whereIn('id', $policy_draft_count)->sum('total_nett');

        $policy_active_count = Policy::where('status_code', config('constant.status.activated.value'))->pluck('id')->toArray();
        $policy_active_count_nett = PolicyReport::whereIn('id', $policy_active_count)->sum('total_nett');

        $policy_deactivate_count = Policy::where('status_code', config('constant.status.deactivated.value'))->pluck('id')->toArray();
        $policy_deactivate_count_nett = PolicyReport::whereIn('id', $policy_deactivate_count)->sum('total_nett');

        $policy_void_count = Policy::where('status_code', config('constant.status.void.value'))->pluck('id')->toArray();
        $policy_void_count_nett = PolicyReport::whereIn('id', $policy_void_count)->sum('total_nett');


        $policy_unpaid_count = Policy::where('payment_status_code', config('constant.status.unpaid.value'))->pluck('id')->toArray();
        $policy_unpaid_count_nett = PolicyReport::whereIn('id', $policy_unpaid_count)->sum('total_nett');

        $policy_paid_count = Policy::where('payment_status_code', config('constant.status.paid.value'))->pluck('id')->toArray();
        $policy_paid_count_nett = PolicyReport::whereIn('id', $policy_paid_count)->sum('total_nett');

        $policy_partial_count = Policy::where('payment_status_code', config('constant.status.partial.value'))->pluck('id')->toArray();
        $policy_partial_count_nett = PolicyReport::whereIn('id', $policy_partial_count)->sum('total_nett');

        $policy_foc_count = Policy::where('payment_status_code', config('constant.status.foc.value'))->pluck('id')->toArray();
        $policy_foc_count_nett = PolicyReport::whereIn('id', $policy_foc_count)->sum('total_nett');


        return inertia('Dashboard', [
            'policy_count' => count($policy_count),
            'policy_draft_count' => count($policy_draft_count),
            'policy_active_count' => count($policy_active_count),
            'policy_deactivate_count' => count($policy_deactivate_count),
            'policy_void_count' => count($policy_void_count),
            'policy_unpaid_count' => count($policy_unpaid_count),
            'policy_paid_count' => count($policy_paid_count),
            'policy_partial_count' => count($policy_partial_count),
            'policy_foc_count' => count($policy_foc_count),
            'policy_count_nett' => ($policy_count_nett),
            'policy_draft_count_nett' => ($policy_draft_count_nett),
            'policy_active_count_nett' => ($policy_active_count_nett),
            'policy_deactivate_count_nett' => ($policy_deactivate_count_nett),
            'policy_void_count_nett' => ($policy_void_count_nett),
            'policy_unpaid_count_nett' => ($policy_unpaid_count_nett),
            'policy_paid_count_nett' => ($policy_paid_count_nett),
            'policy_partial_count_nett' => ($policy_partial_count_nett),
            'policy_foc_count_nett' => ($policy_foc_count_nett),
        ]);
    }
}

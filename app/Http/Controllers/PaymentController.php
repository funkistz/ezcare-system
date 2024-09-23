<?php

namespace App\Http\Controllers;

use App\Models\Dealer;
use App\Models\Policy;
use App\Models\PolicyPayment;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;

class PaymentController extends Controller
{
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
        $attr = $request->toArray();

        $payment =  PolicyPayment::find($id);
        isset($attr['remarks']) ?  $payment->remarks = $attr['remarks'] : null;
        isset($attr['type']) ?  $payment->type = $attr['type'] : null;
        // isset($attr['amount']) ?  $payment->amount = $attr['amount'] : null;

        isset($attr['reason']) ?  $payment->reason = $attr['reason'] : null;
        isset($attr['userable_id']) ?  $payment->userable_id = $attr['userable_id'] : null;
        isset($attr['reference']) ?  $payment->reference = $attr['reference'] : null;
        isset($attr['from']) ?  $payment->from = $attr['from'] : null;

        if ($attr['userable_type'] == 'Staff') {
            $payment->userable_type = User::class;
        } else if ($attr['userable_type'] == 'Dealer') {
            $payment->userable_type = Dealer::class;
        }

        $date = Carbon::parse($attr['date'])->setTimezone(config('app.timezone'));
        isset($attr['date']) ?  $payment->date = $date : null;
        $payment->save();

        return back()->with([
            'type' => 'success',
            'message' => 'Payment has been update',
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $payment = PolicyPayment::find($id);

        try {
            $payment->forceDelete();

            $policy = Policy::find($payment->policy_id);
            $policy->paymentAdded();
            $policy->generateReport();

            return back()->with([
                'type' => 'success',
                'message' => 'Payment has been deleted',
            ]);
        } catch (\Illuminate\Database\QueryException $ex) {
            return back()->with([
                'type' => 'error',
                'message' => $ex->getMessage(),
            ]);
        }
    }
}

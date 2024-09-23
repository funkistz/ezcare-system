<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use App\Models\Dealer;
use App\Models\InvoicePayee;
use App\Models\Policy;
use Illuminate\Http\Request;

class InvoicePayeeController extends Controller
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

        try {
            $attr = $request->toArray();
            $policy = Policy::find($attr['policy_id']);

            if ($attr['payee_type'] == 'dealer') {
                $userable_type = Dealer::class;
            } else  if ($attr['payee_type'] == 'customer') {
                $userable_type = Customer::class;
            }

            $total = $policy->activeInvoice->total;
            $total_other_payee = 0;

            $other_payees = InvoicePayee::where('policy_id', $attr['policy_id'])->where('userable_type', '!=', $userable_type)->get();
            $payee = InvoicePayee::where('policy_id', $attr['policy_id'])->where('userable_type', $userable_type)->first();

            foreach ($other_payees as $key => $other_payee) {
                $total_other_payee += $other_payee->total_amount;
            }

            if (($total_other_payee + $attr['amount']) > $total) {
                return back()->with([
                    'type' => 'error',
                    'message' => 'Error! Amount exceed invoice total.',
                ]);
            }

            if (empty($payee)) {
                $payee = new InvoicePayee();
                $payee->policy_id = $attr['policy_id'];
                $payee->invoice_id = $attr['invoice_id'];

                if ($attr['payee_type'] == 'dealer') {
                    $payee->userable_id =  $policy->dealer->id;
                    $payee->userable_type = Dealer::class;
                } else  if ($attr['payee_type'] == 'customer') {
                    $payee->userable_id =  $policy->customer->id;
                    $payee->userable_type = Customer::class;
                }

                $payee->total_amount = $attr['amount'];
                $payee->save();
            } else {
                if ($attr['amount'] <= 0) {
                    $payee->delete();
                } else {
                    $payee->total_amount = $attr['amount'];
                    $payee->save();
                }
            }

            return back()->with([
                'type' => 'success',
                'message' => 'Payee has been updated',
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

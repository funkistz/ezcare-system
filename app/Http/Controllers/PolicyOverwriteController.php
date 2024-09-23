<?php

namespace App\Http\Controllers;

use App\Models\Policy;
use App\Models\PolicyOverwrite;
use App\Models\RequestStatus;
use App\Models\TransactionRequest;
use Illuminate\Http\Request;

class PolicyOverwriteController extends Controller
{
    public function store(Request $request)
    {
        $attr = $request->toArray();

        try {
            $author = auth()->user()->id;
            $attr['created_by'] = $author;
            // $attr['status_code'] = 'pending';
            $attr['status_code'] = 'pending';
            $overwrite = PolicyOverwrite::create($attr);
            $policy = Policy::find($attr['policy_id']);

            $transaction = new TransactionRequest();
            $transaction->code = $attr['code'];
            $transaction->model_id =  $overwrite->id;
            $transaction->model_type = PolicyOverwrite::class;
            $transaction->status_code = 'pending';
            $transaction->remarks = $attr['remarks'];
            $transaction->description = 'Warranty Price Change Request for ' . $policy->policy_no;
            $transaction->created_by = $author;
            $transaction->save();

            RequestStatus::create([
                'requestable_id' => $transaction->id,
                'requestable_type' => TransactionRequest::class,
                'status_code' => 'pending',
                'remarks' => $attr['remarks'],
                'created_by' => $author,
            ]);

            // $policy = Policy::find($overwrite->policy_id);
            // $invoice = $policy->generateInvoices(null, true);

            return back()->with([
                'type' => 'success',
                'message' => 'Change Request has been created',
            ]);
        } catch (\Illuminate\Database\QueryException $ex) {
            return back()->with([
                'type' => 'error',
                'message' => $ex->getMessage(),
            ]);
        }
    }

    public function destroy(string $id)
    {
        $model = PolicyOverwrite::find($id);
        $policy = Policy::find($model->policy_id);
        $status = $model->status_code;

        try {
            $model->delete();
            if ($status == 'approved') {
                $invoice = $policy->generateInvoices(null, true);
            }

            return back()->with([
                'type' => 'success',
                'message' => 'Policy Overwrite has been deleted',
            ]);
        } catch (\Illuminate\Database\QueryException $ex) {
            return back()->with([
                'type' => 'error',
                'message' => $ex->getMessage(),
            ]);
        }
    }
}

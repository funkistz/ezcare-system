<?php

namespace App\Http\Controllers;

use App\Models\TransactionRequest;
use Illuminate\Http\Request;
use App\Http\Resources\DefaultResource;
use App\Models\Policy;
use App\Models\PolicyOverwrite;
use App\Models\RequestStatus;

class ApprovalController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $data = TransactionRequest::with('user')->paginate(1000);
        $data = DefaultResource::collection($data);

        return inertia('Approval/Index', [
            'requests' => $data,
        ]);
    }

    public function update(Request $request, string $id)
    {
        $attr = $request->toArray();
        $attr['created_by'] = auth()->user()->id;

        $transaction = TransactionRequest::find($id);
        $transaction->status_code = $attr['status'];
        $transaction->save();

        RequestStatus::create([
            'requestable_id' => $id,
            'requestable_type' => TransactionRequest::class,
            'status_code' => $attr['status'],
            'remarks' => $attr['remarks'],
            'created_by' => $attr['created_by'],
        ]);

        if ($attr['status'] == 'approved') {
            $model_name = $transaction->model_type;
            $model_name = $model_name::find($transaction->model_id);

            if ($transaction->model_type == PolicyOverwrite::class) {
                $policyOverwrite = PolicyOverwrite::find($transaction->model_id);
                $policyOverwrite->status_code = $attr['status'];
                $policyOverwrite->save();

                $policy = Policy::find($model_name->policy_id);
                $invoice = $policy->generateInvoices(null, true);
            }
        } else {
            if ($transaction->model_type == PolicyOverwrite::class) {
                $policyOverwrite = PolicyOverwrite::find($transaction->model_id);
                $policyOverwrite->status_code = $attr['status'];
                $policyOverwrite->save();
            }
        }

        return back()->with([
            'type' => 'success',
            'message' => 'success',
        ]);
    }
}

<?php

namespace App\Http\Controllers;

use App\Http\Resources\DefaultResource;
use App\Models\SupportQuotation;
use Illuminate\Http\Request;
use App\Models\SupportQuoteStatus;
use Carbon\Carbon;

class SupportQuotationController extends Controller
{

    public function index()
    {
        $data = SupportQuotation::with(['status'])->orderBy('id', 'desc')->paginate(1000);
        $data = DefaultResource::collection($data);

        return inertia('Settings/SupportQuotation/Index', [
            'support_quotations' => $data,
        ]);
    }

    public function store(Request $request)
    {
        $attr = $request->toArray();

        try {
            $support = new SupportQuotation();
            $content = [
                'name' => $attr['name'],
                'email' =>  $attr['email'],
                'phone_no' =>  $attr['phone_no'],
                'vehicle_model' =>  $attr['vehicle_model'],
                'vehicle_year' =>  $attr['vehicle_year'],
                'message' =>  $attr['message'],
            ];
            $support->content = json_encode($content);
            $support->save();

            return back()->with([
                'type' => 'success',
                'message' => 'Quotation has been submitted',
            ]);
        } catch (\Illuminate\Database\QueryException $ex) {
            return back()->with([
                'type' => 'error',
                'message' => $ex->getMessage(),
            ]);
        }
    }

    public function updateStatus(Request $request) {
        $status = SupportQuoteStatus::where('support_quote_id', $request->support_quote_id)->first();
        
        try {
            if ($status == null) {
                $quotestat = new SupportQuoteStatus;
                $quotestat->support_quote_id = $request->support_quote_id;
                $quotestat->status = $request->status;
                $quotestat->created_at = Carbon::now();
                $quotestat->save();

            } else {

                SupportQuoteStatus::where('support_quote_id', $request->support_quote_id)
                ->update([
                    'status' => $request->status,
                ]);

            }

            return back()->with([
                'type' => 'success',
                'message' => 'Status has been updated',
            ]);

        } catch (\Illuminate\Database\QueryException $ex) {
            return back()->with([
                'type' => 'error',
                'message' => $ex->getMessage(),
            ]);
        }

        // $suppquotestat = new SupportQuoteStatus;
        
    }
}

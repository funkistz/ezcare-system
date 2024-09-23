<?php

namespace App\Http\Controllers;

use App\Models\ClaimFile;
use App\Models\ClaimPayment;
use App\Models\File;
use Carbon\Carbon;
use Illuminate\Http\Request;

class ClaimPaymentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
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
        $attr = $request->toArray();
        $attr['date'] = Carbon::parse($request->date)->setTimezone(config('app.timezone'));
        $attr['created_by'] = auth()->user()->id;

        try {
            $dealer = ClaimPayment::create($attr);

            return back()->with([
                'type' => 'success',
                'message' => 'Claim Payment has been created',
            ]);
        } catch (\Illuminate\Database\QueryException $ex) {
            return back()->with([
                'type' => 'error',
                'message' => $ex->getMessage(),
            ]);
        }
    }

    public function addAttachment(Request $request, string $id)
    {
        $claim = ClaimPayment::find($id);

        $file = File::find($request->id);

        $paymentFiles = $claim->files()->save($file);

        return back()->with([
            'type' => 'success',
            'message' => 'Attachment has been added',
        ]);
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
}

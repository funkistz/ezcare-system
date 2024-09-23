<?php

namespace App\Http\Controllers;

use App\Models\Claim;
use App\Models\ClaimFile;
use App\Models\ClaimItem;
use App\Models\ClaimStatus;
use App\Models\File;
use App\Models\PolicyClaim;
use App\Models\WarrantyPlanItemChild;
use Illuminate\Support\Carbon;
use Illuminate\Http\Request;

class ClaimController extends Controller
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
        $attr = $request->toArray();
        $attr['status_code'] = config('constant.status.pending.value');
        $attr['inspection_status_code'] = config('constant.status.draft.value');
        $attr['created_by'] = auth()->user()->id;

        try {
            $claim = PolicyClaim::create($attr);

            // if ($claim->type == 'towing') {

            //     $towing_item = WarrantyPlanItemChild::where('code', 'towing')->first();

            //     $claim_item = new ClaimItem();
            //     $claim_item->claim_id = $claim->id;
            //     $claim_item->item_id = $towing_item->id;
            //     $claim_item->item_name = $towing_item->name;
            //     $claim_item->save();
            // }

            $claim_status = new ClaimStatus();
            $claim_status->claim_id = $claim->id;
            $claim_status->status_code = config('constant.status.pending.value');
            $claim_status->created_by = auth()->user()->id;
            $claim_status->save();

            $claim->claim_statuses = $claim->claim_statuses;

            return back()->with([
                'type' => 'success',
                'message' => 'Claim has been created',
                'params' =>  $claim
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
        $claim = PolicyClaim::find($id);
        $attr = $request->toArray();
        // $attr['date'] = Carbon::parse($request->date)->setTimezone(config('app.timezone'));

        $claim->update($attr);

        if (!empty($attr['claim_items'])) {

            foreach ($attr['claim_items'] as $key => $claim_item) {

                if (!empty($claim_item['id'])) {
                    $claimItem = ClaimItem::find($claim_item['id']);
                } else {
                    $claimItem = new ClaimItem();
                }

                $claimItem->claim_id =  $id;
                $claimItem->item_id = !empty($claim_item['item_id']) ? $claim_item['item_id'] : null;
                $claimItem->item_name = !empty($claim_item['item_name']) ? $claim_item['item_name'] : null;
                $claimItem->remarks = $claim_item['remarks'];
                $claimItem->price = $claim_item['price'];
                $claimItem->price_approved = $claim_item['price_approved'];
                $claimItem->save();
            }
        }

        return back()->with([
            'type' => 'success',
            'message' => 'Claim has been updated',
            'params' =>  $claim
        ]);
    }

    public function updateStatus(Request $request, string $id)
    {
        $claim = PolicyClaim::find($id);
        $claim->status_code = $request->status_code;
        $claim->save();

        $claim_status = new ClaimStatus();
        $claim_status->claim_id = $claim->id;
        $claim_status->status_code = $request->status_code;
        $claim_status->remarks = $request->remarks;
        $claim_status->reason_code = $request->reason_code;
        $claim_status->created_by = auth()->user()->id;;
        $claim_status->save();
        $claim->claim_statuses = $claim->claim_statuses;

        return back()->with([
            'type' => 'success',
            'message' => 'Claim status has been updated',
            'params' =>  $claim
        ]);
    }

    public function upsertItem(Request $request, string $id)
    {

        // $claim = Claim::find($id);
        // $attr = $request->toArray();

        // if (!empty($attr['claim_item_id'])) {
        //     $claimItem = ClaimItem::find($claim_item['id']);
        // } else {
        //     $claimItem = new ClaimItem();
        // }

        // $claimItem = new ClaimItem();
        // $claimItem->claim_id =  $id;
        // $claimItem->item_id = $attr['item_id'];
        // $claimItem->remarks = $attr['remarks'];
        // $claimItem->price = $attr['price'];
        // $claimItem->price_approved = $attr['price_approved'];
        // $claimItem->save();

        // return back()->with([
        //     'type' => 'success',
        //     'message' => 'Claim item has been deleted',
        // ]);
    }

    public function deleteItem(Request $request, string $id)
    {
        $ClaimItem = ClaimItem::find($id);
        $ClaimItem->delete();

        return back()->with([
            'type' => 'success',
            'message' => 'Claim item has been deleted',
        ]);
    }

    public function addAttachment(Request $request, string $id)
    {
        $claim = PolicyClaim::find($id);
        $attr = $request->toArray();
        $author = auth()->user()->id;

        $file = File::find($request->id);

        $claim->files()->save($file);

        // $file = new ClaimFile();
        // // $file->variant = $request->variant;
        // $file->name = $request->name;
        // $file->claim_id = $id;
        // $file->file_id = $request->id;
        // $file->created_by = $author;
        // $file->type = $request->type;
        // $file->mime = $request->mime;
        // $file->url = $request->url;
        // $file->thumbnail_url = $request->thumbnail_url;

        // $file->save();

        // $file = File::find($request->id);
        // $file = $policy->files()->attach($request->id);

        return back()->with([
            'type' => 'success',
            'message' => 'Attachment has been added',
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}

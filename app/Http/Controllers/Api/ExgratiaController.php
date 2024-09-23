<?php

namespace App\Http\Controllers\Api;

use App\Helpers\FileHelper;
use App\Http\Controllers\Controller;
use App\Http\Resources\ExgratiaResource;
use App\Models\Exgratia;
use App\Models\RequestStatus;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;

class ExgratiaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $attr = $request->toArray();
        $date = Carbon::parse($attr['date']);
        $user = !empty($attr['user_id']) ? User::find($attr['user_id']) : null;

        if (!empty($user) && $user->hasPermissionTo('endorsement.view_all')) {
            $exgratias = Exgratia::with(['dealer'])->byDate($date)->get();
            $exgratias = ExgratiaResource::collection($exgratias);
        } else if (!empty($user) && $user->hasPermissionTo('endorsement.view_mine')) {
            $exgratias = Exgratia::with(['dealer'])->byDate($date)->where(function ($query) use ($user) {
                $query->where('dealer_id', $user->id)
                    ->orWhere('created_by', $user->id);
            })->get();
            $exgratias = Exgratia::collection($exgratias);
        } else {
            $exgratias = null;
        }

        return response()->json([
            'status' => 'success',
            'data' => [
                'exgratia' => $exgratias,
                'date' => Carbon::now(),
            ],
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $attr = $request->toArray();
        $attr['status_code'] = 'pending';

        try {

            $files = [];
            if (!empty($attr['files'])) {
                foreach ($attr['files'] as $key => $file) {
                    $saveFile = FileHelper::uploadFile($file['file']['original'], $file['format']);
                    // echo json_encode($saveFile);
                    array_push($files, $saveFile);
                }
            }


            $attr['activated_at'] = $attr['activated_at'] ? new Carbon($attr['activated_at']) : null;
            $attr['expired_at'] = $attr['expired_at'] ? new Carbon($attr['expired_at']) : null;

            $request = Exgratia::create($attr);

            if (!empty($files)) {
                foreach ($files as $key => $file) {
                    $request->files()->attach($file);
                }
            }

            RequestStatus::create([
                'requestable_id' => $request->id,
                'requestable_type' => Exgratia::class,
                'status_code' => 'pending',
                'created_by' => $attr['created_by'],
            ]);

            return response()->json([
                'status' => 'success',
                'message' => 'Exgratia has been created',
            ]);
        } catch (\Illuminate\Database\QueryException $ex) {
            return response()->json([
                'status' => 'error',
                'message' => Exgratia::class,
                // 'message' => $ex->getMessage(),
            ]);
        }
    }

    public function show(string $id, Request $request)
    {
        $attr = $request->toArray();
        $user = !empty($attr['user_id']) ? User::find($attr['user_id']) : null;

        $data = Exgratia::with(['files'])->find($id);
        $created_by = $data->created_by;

        if ($data->status_code == 'pending') {
            $data->can_edit = ($user->id = $created_by || $user->hasPermissionTo('endorsement.admin')) ? true : false;
            $data->can_delete = ($user->id = $created_by || $user->hasPermissionTo('endorsement.admin')) ? true : false;
            $data->can_proceed = ($user->hasPermissionTo('endorsement.approval')) ? true : false;
            $data->can_reject = ($user->hasPermissionTo('endorsement.approval')) ? true : false;
        }

        return response()->json([
            "status" => "success",
            "data" => $data,
        ]);
    }

    public function proceedInspection(Request $request)
    {
        $attr = $request->toArray();
        $status_code = 'proceed';

        $request = Exgratia::find($attr['id']);
        $request->status_code = $status_code;
        $request->save();

        RequestStatus::create([
            'requestable_id' => $request->id,
            'requestable_type' => Exgratia::class,
            'status_code' => $status_code,
            'remarks' => $attr['remarks'],
            'created_by' => $attr['user_id'],
        ]);

        return response()->json([
            "status" => "success",
            "data" => $request,
        ]);
    }

    public function rejectInspection(Request $request)
    {
        $attr = $request->toArray();
        $status_code = 'rejected';

        $request = Exgratia::find($attr['id']);
        $request->status_code = $status_code;
        $request->save();

        RequestStatus::create([
            'requestable_id' => $request->id,
            'requestable_type' => Exgratia::class,
            'status_code' => $status_code,
            'remarks' => $attr['remarks'],
            'created_by' => $attr['user_id'],
        ]);

        return response()->json([
            "status" => "success",
            "data" => $request,
        ]);
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
        $endorsement = Exgratia::find($id);
        $endorsement->delete();

        return response()->json([
            "status" => "success",
        ]);
    }
}

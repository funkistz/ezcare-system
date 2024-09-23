<?php

namespace App\Http\Controllers\Api;

use App\Helpers\FileHelper;
use App\Http\Controllers\Controller;
use App\Models\Branch;
use App\Models\Dealer;
use App\Models\FreePromo;
use App\Models\Inspection;
use App\Models\InspectionStatus;
use App\Models\NonInspection;
use App\Models\PolicyClaim;
use App\Models\ScheduleInspection;
use App\Models\User;
use App\Models\WarrantyPlan;
use Carbon\Carbon;
use Illuminate\Http\Request;

class InspectionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $attr = $request->toArray();
        $date = Carbon::parse($attr['date']);

        $unassigned = ScheduleInspection::whereNull('person_in_charge_id')->byDate($date)->byBranch($attr['branch'])->count();
        $mine = ScheduleInspection::where('person_in_charge_id', $attr['user_id'])->orWhere('marketing_officer_id', $attr['user_id'])->byDate($date)->byBranch($attr['branch'])->count();
        $all = ScheduleInspection::byDate($date)->byBranch($attr['branch'])->count();
        $branches = Branch::toSelectData();

        $inspectMine = Inspection::where('created_by', $attr['user_id'])->orWhere('marketing_officer_id', $attr['user_id'])->byCreatedDate($date)->byBranch($attr['branch'])->count();
        $inspectionAll = Inspection::byCreatedDate($date)->byBranch($attr['branch'])->count();

        $nonInspectMine = NonInspection::where('created_by', $attr['user_id'])->orWhere('marketing_officer_id', $attr['user_id'])->byCreatedDate($date)->byBranch($attr['branch'])->count();
        $nonInspectionAll = NonInspection::byCreatedDate($date)->byBranch($attr['branch'])->count();

        return response()->json([
            'status' => 'success',
            'data' => [
                'schedule' => [
                    'unassigned' => $unassigned,
                    'mine' => $mine,
                    'all' => $all,
                ],
                'inspection' => [
                    'mine' => $inspectMine,
                    'all' => $inspectionAll,
                ],
                'nonInspection' => [
                    'mine' => $nonInspectMine,
                    'all' => $nonInspectionAll,
                ],
                'date' => Carbon::now(),
                'branches' => $branches,
            ],
        ]);
    }

    public function scheduleData(Request $request)
    {
        $attr = $request->toArray();
        $date = Carbon::parse($attr['date']);

        $unassigned = ScheduleInspection::whereNull('person_in_charge_id')->byDate($date)->get();
        $mine = ScheduleInspection::where('person_in_charge_id', $attr['user_id'])->orWhere('marketing_officer_id', $attr['user_id'])->byDate($date)->get();
        $all = ScheduleInspection::byDate($date)->get();

        return response()->json([
            'status' => 'success',
            'data' => [
                'inspection' => [
                    'unassigned' => $unassigned,
                    'mine' => $mine,
                    'all' => $all,
                ],
                'date' => Carbon::now(),
            ],
        ]);
    }

    public function inspectionData(Request $request)
    {
        $attr = $request->toArray();
        $date = Carbon::parse($attr['date']);

        $mine = Inspection::with(['files'])->orWhere(function ($query) use ($attr) {
            $query->where('created_by', $attr['user_id']);
            $query->orWhere('marketing_officer_id', $attr['user_id']);
        })->byCreatedDate($date)->get();
        $all = Inspection::with(['files'])->byCreatedDate($date)->get();

        return response()->json([
            'status' => 'success',
            'data' => [
                'inspection' => [
                    'mine' => $mine,
                    'all' => $all,
                ],
                'date' => Carbon::now(),
            ],
        ]);
    }

    public function nonInspectionData(Request $request)
    {
        $attr = $request->toArray();
        $date = Carbon::parse($attr['date']);

        $mine = NonInspection::with(['files'])->orWhere(function ($query) use ($attr) {
            $query->where('created_by', $attr['user_id']);
            $query->orWhere('marketing_officer_id', $attr['user_id']);
        })->byCreatedDate($date)->get();
        $all = NonInspection::with(['files'])->byCreatedDate($date)->get();

        return response()->json([
            'status' => 'success',
            'data' => [
                'inspection' => [
                    'mine' => $mine,
                    'all' => $all,
                ],
                'date' => Carbon::now(),
            ],
        ]);
    }

    public function store(Request $request)
    {
        $attr = $request->toArray();
        $attr['status_code'] = 'pending';

        try {
            if ($attr['data_type'] == 'schedule') {
                $attr['date'] = $attr['date'] ? new Carbon($attr['date']) : null;

                $inspect = ScheduleInspection::create($attr);

                InspectionStatus::create([
                    'inspectable_id' => $inspect->id,
                    'inspectable_type' => ScheduleInspection::class,
                    'status_code' => 'pending',
                    'created_by' => $attr['created_by'],
                ]);

                if (!empty($attr['claim_id'])) {

                    $claim = PolicyClaim::find($attr['claim_id']);
                    $claim->inspection_status_code = 'ongoing';
                    $claim->save();

                    $inspect->person_in_charge_id = $claim->technician_id;
                    $inspect->status_code = 'ongoing';
                    $inspect->save();

                    InspectionStatus::create([
                        'inspectable_id' => $inspect->id,
                        'inspectable_type' => ScheduleInspection::class,
                        'status_code' => 'proceed',
                        'created_by' => $attr['created_by'],
                    ]);
                }

                return response()->json([
                    'status' => 'success',
                    'message' => 'Schedule inspection has been created',
                ]);
            } else if ($attr['data_type'] == 'inspection') {
                $inspect = Inspection::create($attr);

                $files = [];
                if (!empty($attr['files'])) {
                    foreach ($attr['files'] as $key => $file) {
                        $saveFile = FileHelper::uploadFile($file['file']['original'], $file['format']);
                        // echo json_encode($saveFile);
                        array_push($files, $saveFile);
                    }
                }

                InspectionStatus::create([
                    'inspectable_id' => $inspect->id,
                    'inspectable_type' => Inspection::class,
                    'status_code' => 'pending',
                    'created_by' => $attr['created_by'],
                ]);

                if (!empty($files)) {
                    foreach ($files as $key => $file) {
                        $inspect->files()->attach($file);
                    }
                }

                return response()->json([
                    'status' => 'success',
                    'message' => 'Inspection has been created',
                ]);
            } else if ($attr['data_type'] == 'non-inspection') {
                $inspect = NonInspection::create($attr);

                $files = [];
                if (!empty($attr['files'])) {
                    foreach ($attr['files'] as $key => $file) {
                        $saveFile = FileHelper::uploadFile($file['file']['original'], $file['format']);
                        // echo json_encode($saveFile);
                        array_push($files, $saveFile);
                    }
                }

                InspectionStatus::create([
                    'inspectable_id' => $inspect->id,
                    'inspectable_type' => NonInspection::class,
                    'status_code' => 'pending',
                    'created_by' => $attr['created_by'],
                ]);

                if (!empty($files)) {
                    foreach ($files as $key => $file) {
                        $inspect->files()->attach($file);
                    }
                }

                return response()->json([
                    'status' => 'success',
                    'message' => 'Inspection has been created',
                ]);
            }
        } catch (\Illuminate\Database\QueryException $ex) {
            return response()->json([
                'status' => 'error',
                'message' => $ex->getMessage(),
            ]);
        }
    }

    public function data(Request $request)
    {

        $dealers = Dealer::toSelectData();
        $mos = User::role('mo')->active()->toSelectData();
        $technicals = User::role('technical')->active()->toSelectData();
        $freePromosSelect = FreePromo::toSelectData();
        $warranty_plans = WarrantyPlan::toSelectData(['year_package']);
        $branches = Branch::toSelectData();

        $warranty_plans =  $warranty_plans->prepend([
            'label' => 'UNDECIDED WARRANTY PLAN',
            'value' => '0',
        ]);

        $freePromosSelect =  $freePromosSelect->prepend([
            'label' => 'NONE',
            'value' => '0',
        ]);


        return response()->json([
            "status" => "success",
            "data" => [
                'mos' => $mos,
                'technicals' => $technicals,
                'dealers' => $dealers,
                'free_promos' => $freePromosSelect,
                'warranty_plans' => $warranty_plans,
                'branches' => $branches,
                'periods' => [
                    [
                        'label' => 'None',
                        'value' => '0',
                    ],
                    [
                        'label' => '6 Months',
                        'value' => '6',
                    ],
                    [
                        'label' => '1 Year',
                        'value' => '12',
                    ],
                    [
                        'label' => '2 Year',
                        'value' => '24',
                    ],
                    [
                        'label' => '3 Year',
                        'value' => '36',
                    ],
                    [
                        'label' => '4 Year',
                        'value' => '48',
                    ],
                    [
                        'label' => '5 Year',
                        'value' => '60',
                    ],
                    [
                        'label' => '6 Year',
                        'value' => '72',
                    ],
                    [
                        'label' => '7 Year',
                        'value' => '84',
                    ]
                ],
            ],
        ]);
    }

    public function beginPickup(Request $request)
    {
        $attr = $request->toArray();

        if (empty($attr['inspection_ids'])) {
            return response()->json([
                "status" => "success",
                "data" => '',
            ]);
        }

        $schedules = ScheduleInspection::whereIn('id', $attr['inspection_ids'])->get();

        foreach ($schedules as $key => $schedule) {
            $schedule->person_in_charge_id = $attr['user_id'];
            $schedule->status_code = 'ongoing';
            $schedule->save();

            InspectionStatus::create([
                'inspectable_id' => $schedule->id,
                'inspectable_type' => ScheduleInspection::class,
                'status_code' => 'ongoing',
                'created_by' => $attr['user_id'],
            ]);
        }

        return response()->json([
            "status" => "success",
            "data" => $request,
        ]);
    }

    public function unassignedSchedule(Request $request)
    {
        $attr = $request->toArray();

        $schedule = ScheduleInspection::find($attr['inspection_id']);
        $schedule->person_in_charge_id = null;
        $schedule->status_code = 'pending';
        $schedule->save();

        InspectionStatus::create([
            'inspectable_id' => $schedule->id,
            'inspectable_type' => ScheduleInspection::class,
            'status_code' => 'pending',
            'created_by' => $attr['user_id'],
        ]);

        return response()->json([
            "status" => "success",
            "data" => $request,
        ]);
    }

    public function completedSchedule(Request $request)
    {
        $attr = $request->toArray();

        $schedule = ScheduleInspection::find($attr['inspection_id']);
        $schedule->status_code = 'completed';
        $schedule->save();

        InspectionStatus::create([
            'inspectable_id' => $schedule->id,
            'inspectable_type' => ScheduleInspection::class,
            'status_code' => 'completed',
            'remarks' => $attr['remarks'],
            'created_by' => $attr['user_id'],
        ]);

        return response()->json([
            "status" => "success",
            "data" => $request,
        ]);
    }

    public function proceedInspection(Request $request)
    {
        $attr = $request->toArray();
        $status_code = 'proceed';

        if ($attr['dataType'] == 'inspection') {
            $schedule = Inspection::find($attr['inspection_id']);
            $schedule->status_code = $status_code;
            $schedule->save();

            InspectionStatus::create([
                'inspectable_id' => $schedule->id,
                'inspectable_type' => Inspection::class,
                'status_code' => $status_code,
                'remarks' => $attr['remarks'],
                'created_by' => $attr['user_id'],
            ]);
        } else if ($attr['dataType'] == 'non-inspection') {
            $schedule = NonInspection::find($attr['inspection_id']);
            $schedule->status_code = $status_code;
            $schedule->save();

            InspectionStatus::create([
                'inspectable_id' => $schedule->id,
                'inspectable_type' => NonInspection::class,
                'status_code' => $status_code,
                'remarks' => $attr['remarks'],
                'created_by' => $attr['user_id'],
            ]);
        }

        return response()->json([
            "status" => "success",
            "data" => $request,
        ]);
    }

    public function rejectInspection(Request $request)
    {
        $attr = $request->toArray();
        $status_code = 'rejected';

        if ($attr['dataType'] == 'inspection') {
            $schedule = Inspection::find($attr['inspection_id']);
            $schedule->status_code = $status_code;
            $schedule->save();

            InspectionStatus::create([
                'inspectable_id' => $schedule->id,
                'inspectable_type' => Inspection::class,
                'status_code' => $status_code,
                'remarks' => $attr['remarks'],
                'created_by' => $attr['user_id'],
            ]);
        } else if ($attr['dataType'] == 'non-inspection') {
            $schedule = NonInspection::find($attr['inspection_id']);
            $schedule->status_code = $status_code;
            $schedule->save();

            InspectionStatus::create([
                'inspectable_id' => $schedule->id,
                'inspectable_type' => NonInspection::class,
                'status_code' => $status_code,
                'remarks' => $attr['remarks'],
                'created_by' => $attr['user_id'],
            ]);
        }

        return response()->json([
            "status" => "success",
            "data" => $request,
        ]);
    }

    public function showSchedule(string $id, Request $request)
    {
        $attr = $request->toArray();

        $data = ScheduleInspection::find($id);
        // $data->status_color = 'orange';

        if ($data->person_in_charge_id ==  $attr['user_id'] && $data->status_code == 'ongoing') {
            $data->can_unassigned = true;
            $data->can_complete = true;
        }

        return response()->json([
            "status" => "success",
            "data" => $data,
        ]);
    }

    public function showInspection(string $id, Request $request)
    {
        $attr = $request->toArray();

        if ($attr['data_type'] == 'inspection') {
            $data = Inspection::with(['files'])->find($id);
        } else {
            $data = NonInspection::with(['files'])->find($id);
        }

        if ($data->status_code == 'pending') {
            // $data->can_proceed = true;
            // $data->can_reject = true;
        }

        $data->extra = [
            [
                'title' => 'Policy',
                'data' => [
                    ['label' => 'Name:', 'value' => '-'],
                    ['label' => 'Phone:', 'value' => '-'],
                    ['label' => 'Vehicle:', 'value' => '-'],
                    ['label' => 'Reg No:', 'value' => '-'],
                    ['label' => 'Chassis:', 'value' => '-'],
                    ['label' => 'Warranty Plan:', 'value' => '-'],
                    ['label' => 'Mo:', 'value' => '-'],
                ],
            ]
        ];

        return response()->json([
            "status" => "success",
            "data" => $data,
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {

        return response()->json([
            "status" => "success",
            "data" => '',
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
        //
    }
}

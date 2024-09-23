<?php

namespace App\Http\Controllers;

use App\Http\Resources\DefaultResource;
use App\Models\Branch;
use App\Models\Dealer;
use App\Models\FreePromo;
use App\Models\InspectionStatus;
use App\Models\PolicyClaim;
use App\Models\ScheduleInspection;
use App\Models\User;
use App\Models\WarrantyPlan;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ScheduleInspectionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        return inertia('Inspection/ScheduleInspectionPage', [
            'branches' => [],
            'mos' => [],
            'technicals' => [],
            'dealers' => [],
            'free_promos' => [],
            'warranty_plans' => [],
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
            'data' => [
                'data' => []
            ],
        ]);

        $attr = $request->toArray();
        $date = !empty($attr['date']) ? Carbon::parse($attr['date']) : null;
        $author = auth()->user()->id;

        $data = [];

        if (!empty($date) && !empty($attr['type'])) {
            switch ($attr['type']) {
                case 'unsigned':
                    $data = ScheduleInspection::whereNull('person_in_charge_id')->byDate($date)->paginate(30);
                    break;
                case 'mine':
                    $data = ScheduleInspection::where('person_in_charge_id', $author)->orWhere('marketing_officer_id', $author)->byDate($date)->paginate(30);
                    break;
                case 'all':
                    $data = ScheduleInspection::byDate($date)->paginate(30);
                    break;
                default:
                    break;
            }
        }


        $branches = Branch::toSelectData();
        $data = DefaultResource::collection($data);

        $dealers = Dealer::toSelectData();
        $mos = User::role('mo')->active()->toSelectData();
        $technicals = User::role('technical')->active()->toSelectData();
        $freePromosSelect = FreePromo::toSelectData();
        $warranty_plans = WarrantyPlan::toSelectData(['year_package']);
        $branches = Branch::toSelectData();

        return inertia('Inspection/ScheduleInspectionPage', [
            'branches' => $branches,
            'mos' => $mos,
            'technicals' => $technicals,
            'dealers' => $dealers,
            'free_promos' => $freePromosSelect,
            'warranty_plans' => $warranty_plans,
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
            'data' => $data,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {

        $request->validate([
            'date' => 'required',
            'type' => 'required',
            // 'policy_no' => ($request->type != 'claim') ? 'required' : '',
            'technician_id' => ($request->type != 'claim') ? 'required' : '',
            'marketing_officer_id' => ($request->type != 'claim') ? 'required' : '',
            'warranty_plan_id' => ($request->type != 'claim') ? 'required' : '',
            'dealer_id' => ($request->type != 'claim') ? 'required' : '',
            'period' => ($request->type != 'claim') ? 'required' : '',
            'vehicle_total' => ($request->type != 'claim') ? 'required' : '',
            'location' => ($request->type == 'claim') ? 'required' : '',
            'technician_branch_id' => ($request->type == 'claim') ? 'required' : '',
        ]);

        $attr = $request->toArray();
        $date = new Carbon($attr['date']);
        $date = $date->timezone(env("APP_TIMEZONE"));

        $attr['status_code'] = 'pending';
        $attr['created_by'] = auth()->user()->id;
        $attr['date'] = $date ? $date : null;

        try {
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

            return back()->with([
                'type' => 'success',
                'message' => 'Schedule inspection has been created',
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
        $request->validate([
            'date' => 'required',
            'type' => 'required',
            // 'policy_no' => ($request->type != 'claim') ? 'required' : '',
            'technician_id' => ($request->type != 'claim') ? 'required' : '',
            'marketing_officer_id' => ($request->type != 'claim') ? 'required' : '',
            'warranty_plan_id' => ($request->type != 'claim') ? 'required' : '',
            'dealer_id' => ($request->type != 'claim') ? 'required' : '',
            'period' => ($request->type != 'claim') ? 'required' : '',
            'vehicle_total' => ($request->type != 'claim') ? 'required' : '',
            'location' => ($request->type == 'claim') ? 'required' : '',
            'technician_branch_id' => ($request->type == 'claim') ? 'required' : '',
        ]);

        $attr = $request->toArray();
        $date = new Carbon($attr['date']);
        $date = $date->timezone(env("APP_TIMEZONE"));
        $attr['date'] = $date ? $date : null;

        try {
            $inspect = ScheduleInspection::find($id);
            $inspect->update($attr);

            return back()->with([
                'type' => 'success',
                'message' => 'Schedule inspection has been updated',
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
        $model = ScheduleInspection::find($id);

        try {
            $model->forceDelete();

            return back()->with([
                'type' => 'success',
                'message' => 'Schedule Inspection has been deleted',
            ]);
        } catch (\Illuminate\Database\QueryException $ex) {
            return back()->with([
                'type' => 'error',
                'message' => $ex->getMessage(),
            ]);
        }
    }
}

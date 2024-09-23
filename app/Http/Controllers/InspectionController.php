<?php

namespace App\Http\Controllers;

use App\Http\Resources\DefaultResource;
use App\Models\Branch;
use App\Models\Dealer;
use App\Models\FreePromo;
use App\Models\Inspection;
use App\Models\InspectionStatus;
use App\Models\NonInspection;
use App\Models\PolicyClaim;
use App\Models\ScheduleInspection;
use App\Models\User;
use App\Models\Vehicle;
use App\Models\WarrantyPlan;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class InspectionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $attr = $request->toArray();
        $date = !empty($attr['date']) ? Carbon::parse($attr['date']) : null;
        $author = auth()->user()->id;

        $data = [];
        DB::enableQueryLog();

        if (!empty($date) && !empty($attr['type'])) {
            switch ($attr['type']) {
                case 'mine':
                    $data = Inspection::with(['files'])->orWhere(function ($query) use ($attr, $author) {
                        $query->where('created_by', $author);
                        $query->orWhere('marketing_officer_id', $author);
                    })->byCreatedDate($date);
                    break;
                case 'all':
                    $data = Inspection::with(['files'])->byCreatedDate($date);
                    break;
                default:
                    break;
            }
        }

        if (!empty($request->search)) {
            $data = $data->where('chassis', 'LIKE', '%' . $request->search . '%');
        }

        if (!is_array($data)) {
            $data = $data->paginate(30);
        }

        $branches = Branch::toSelectData();
        $data = DefaultResource::collection($data);

        $dealers = Dealer::toSelectData();
        $mos = User::role('mo')->active()->toSelectData();
        $technicals = User::role('technical')->active()->toSelectData();
        $freePromosSelect = FreePromo::toSelectData();
        $warranty_plans = WarrantyPlan::toSelectData(['year_package']);
        $branches = Branch::toSelectData();

        return inertia('Inspection/Index', [
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
            'log' => DB::getQueryLog()
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'type' => 'required',
            'branch_id' => 'required',
            'policy_no' => ($request->type == 'claim') ? 'required' : '',
            'period' => ($request->type != 'claim') ? 'required' : '',
            'technician_id' => 'required',
            'marketing_officer_id' => 'required',
            'warranty_plan_id' => ($request->type != 'claim') ? 'required' : '',
            'dealer_id' => ($request->type != 'claim') ? 'required' : '',
            'free_promo_id' => ($request->type != 'claim') ? 'required' : '',
            'vehicle' => ($request->type != 'claim') ? 'required' : '',
            'chassis' => ($request->type != 'claim') ? 'required' : '',
            'mileage' => 'required',
        ]);

        $attr = $request->toArray();
        $attr['status_code'] = 'pending';
        $attr['created_by'] = auth()->user()->id;

        try {
            $inspect = Inspection::create($attr);

            InspectionStatus::create([
                'inspectable_id' => $inspect->id,
                'inspectable_type' => Inspection::class,
                'status_code' => 'pending',
                'created_by' => $attr['created_by'],
            ]);

            if (!empty($attr['claim_id'])) {
                $inspect->status_code = 'proceed';
                $inspect->save();

                // $claim = PolicyClaim::find($attr['claim_id']);
                // $claim->status_code = '';

                InspectionStatus::create([
                    'inspectable_id' => $inspect->id,
                    'inspectable_type' => Inspection::class,
                    'status_code' => 'proceed',
                    'created_by' => $attr['created_by'],
                ]);
            }

            return back()->with([
                'type' => 'success',
                'message' => 'Inspection has been created',
            ]);
        } catch (\Illuminate\Database\QueryException $ex) {
            return back()->with([
                'type' => 'error',
                'message' => $ex->getMessage(),
            ]);
        }
    }

    public function importImage(Request $request)
    {
        $attr = $request->toArray();
        $attr['policy_no'];
        $attr['chassis_no'];
        $files = [];

        $inspects = Inspection::with(['files'])->orWhere('policy_no', $attr['policy_no'])->orWhere('chassis', $attr['chassis_no'])->get();

        foreach ($inspects as $key => $inspect) {
            $files = array_merge($files, $inspect->files->toArray());
        }

        $inspects = NonInspection::with(['files'])->orWhere('policy_no', $attr['policy_no'])->orWhere('chassis', $attr['chassis_no'])->get();

        foreach ($inspects as $key => $inspect) {
            $files = array_merge($files, $inspect->files->toArray());
        }

        if (!empty($inspect)) {
            return response()->json([
                'status' => 'success',
                "files" => $files
            ]);
        } else {
            return response()->json([
                'status' => 'error',
                'message' => 'No Inspection found!',
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
            'type' => 'required',
            'branch_id' => 'required',
            'policy_no' => ($request->type == 'claim') ? 'required' : '',
            'period' => ($request->type != 'claim') ? 'required' : '',
            'technician_id' => 'required',
            'marketing_officer_id' => 'required',
            'warranty_plan_id' => ($request->type != 'claim') ? 'required' : '',
            'dealer_id' => ($request->type != 'claim') ? 'required' : '',
            'free_promo_id' => ($request->type != 'claim') ? 'required' : '',
            'vehicle' => ($request->type != 'claim') ? 'required' : '',
            'chassis' => ($request->type != 'claim') ? 'required' : '',
            'mileage' => 'required',
        ]);

        $attr = $request->toArray();

        try {
            $inspect = Inspection::find($id);
            $inspect->update($attr);

            return back()->with([
                'type' => 'success',
                'message' => 'Inspection has been updated',
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
        $model = Inspection::find($id);

        try {
            $model->forceDelete();

            return back()->with([
                'type' => 'success',
                'message' => 'Inspection has been deleted',
            ]);
        } catch (\Illuminate\Database\QueryException $ex) {
            return back()->with([
                'type' => 'error',
                'message' => $ex->getMessage(),
            ]);
        }
    }
}

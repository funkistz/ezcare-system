<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Coverage;
use App\Models\CoverageFile;
use App\Models\File;
use Carbon\Carbon;

class AddonCoverageController extends Controller
{
    //
    public function addAttachment(Request $request)
    {
        
        $coverage_id = number_format($request->query('coverage_id'));
        $checkAvailability = CoverageFile::where('coverage_id', $coverage_id)->first();
        $activate_date = $request->query('activate_date');
        $decodedDateInput = urldecode($activate_date);
        $selectedActivateDate = Carbon::createFromFormat('d/m/Y', $decodedDateInput)->setTime(0, 0, 0);

            $file = new CoverageFile();
            $file->coverage_id = $coverage_id;
            $file->url = $request->url;
            $file->name = $request->name;
            $file->type = $request->type;
            $file->mime = $request->mime;
            $file->thumbnail_url = $request->thumbnail_url;
            $file->created_at = $request->created_at;
            $file->created_by = auth()->user()->id;
            $file->updated_at = $request->updated_at;
            $file->file_id = $request->id;
            $file->activate_date = $selectedActivateDate;
            $file->save();

        return back()->with([
            'type' => 'success',
            'message' => 'Attachment has been added',
        ]);
        
    }

}

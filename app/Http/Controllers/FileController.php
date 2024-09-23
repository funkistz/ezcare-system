<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\ImageRequest;
use Image;
use Illuminate\Support\Facades\Storage;
use App\Models\File;
use App\Helpers\FileHelper;
use App\Models\ClaimFile;
use App\Models\PolicyFile;
use App\Models\WarrantyPlanFile;
use App\Models\CoverageFile;

class FileController extends Controller
{
    public function storeImage(ImageRequest $request)
    {
        $image = $request->file('image');
        $input['file'] = time() . '.' . $image->getClientOriginalExtension();

        $thumbnailFolder = 'thumbnails/';
        $ImageFolder = 'images/';

        $thumbnail = Image::make($image)->fit(600, 450)->encode('jpg', 80);
        $store  = Storage::disk('public')->put($thumbnailFolder . $input['file'], $thumbnail);
        $thumbnail_url    = Storage::url($thumbnailFolder . $input['file']);

        $width = 1920; // your max width
        $height = 1920; // your max height

        $image = Image::make($image);

        if ($image->height() > $image->width()) {
            if ($image->height() < $height) {
                $height = $image->height();
            }
            $width = null;
        } else {
            if ($image->width() < $width) {
                $width = $image->width();
            }
            $height = null;
        };

        $image->resize($width, $height, function ($constraint) {
            $constraint->aspectRatio();
        })->encode('jpg', 90);

        $store  = Storage::disk('public')->put($ImageFolder . $input['file'], $image);
        $image_url    = Storage::url($ImageFolder . $input['file']);


        $file = new File();
        $file->type = 'image';
        $file->name = $input['file'];
        $file->mime = Storage::mimeType($store);
        $file->url =  $image_url;
        $file->thumbnail_url = $thumbnail_url;

        if ($request->user_id) {
            $file->created_by = $request->user_id;
        }

        $file->save();

        return response()->json([
            "success" => true,
            "message" => 'Image has successfully uploaded.',
            'image_url' => $image_url
        ]);
    }

    public function cloudUpload(ImageRequest $request)
    {
        $file = $request->file('file');
        $originalName =  $file->getClientOriginalName();
        $extension = $file->getClientOriginalExtension();

        $fileName = FileHelper::generateFileName($file);
        $filePath = FileHelper::uploadPath() . $fileName;

        $savefile = new File();
        $savefile->url =  FileHelper::cdnPath($filePath);
        $savefile->name = $originalName;
        if ($request->user_id) {
            $savefile->created_by = $request->user_id;
        }

        if (@is_array(getimagesize($file))) {

            $imageCompressed = FileHelper::compressImage($file);
            $imageThumb = FileHelper::generateThumbnail($file);
            $imageThumbPath = FileHelper::uploadPath() . 'thumbnails/' . $fileName;

            $result = Storage::disk('spaces')->put($imageThumbPath, $imageThumb);
            $result = Storage::disk('spaces')->put($filePath, $imageCompressed);

            $savefile->type = 'image';
            $savefile->mime = $file->getMimeType();
            $savefile->thumbnail_url = FileHelper::cdnPath($imageThumbPath);
        } else {
            $result = Storage::disk('spaces')->put($filePath, file_get_contents($file));

            $savefile->type = $extension;
            $savefile->mime = $file->getMimeType();
        }

        $savefile->save();

        if ($result) {
            return response()->json(['message' => 'File uploaded', 'result' => $savefile], 200);
        } else {
            return response()->json(['message' => $originalName . ' failed to upload', 'result' => $result], 500);
        }
    }


    public function index(Request $request)
    {
        $files = new File();

        if ($request->type) {
            $files->where('type', $request->type);
        }

        return response()->json([
            "success" => true,
            "data" => $files->get(),
        ]);
    }

    public function destroy($id, Request $request)
    {

        if ($request->type == 'policy') {
            $file = PolicyFile::find($id);
            $file->delete();
        } else if ($request->type == 'warranty_plan') {
            $file = WarrantyPlanFile::find($id);
            $file->delete();
        } else if ($request->type == 'claim') {
            $file = ClaimFile::find($id);
            $file->delete();
        } else if ($request->type == 'coverages') {
            $file = CoverageFile::find($id);
            $file->delete();
        } else {
            $file = File::find($id);
            if (isset($request->fileable_id)) {
                $file->policies()->detach($request->fileable_id);
            }
        }

        $file->delete();

        return back()->with([
            'type' => 'success',
            'message' => 'File has been deleted',
        ]);
    }
}

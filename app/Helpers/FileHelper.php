<?php

namespace App\Helpers;

use Image;
use App\Models\File;
use Illuminate\Support\Facades\Storage;

class FileHelper
{

    public static function cdnPath($path)
    {
        return env("DO_SPACES_CDN_ENDPOINT", '') . $path;
    }

    public static function uploadPath()
    {
        return env("DO_SPACES_FOLDER", '') . '/uploads/';
    }

    public static function generateFileName($file, $ext = null)
    {
        return rand(1000, 9999) . '-' . time() . '.' . (($ext) ? $ext : $file->getClientOriginalExtension());
    }

    public static function compressImage($image)
    {
        $image = Image::make($image);

        $width = 1920; // your max width
        $height = 1920; // your max height

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

        $image = $image->resize($width, $height, function ($constraint) {
            $constraint->aspectRatio();
        })->encode('jpg', 90);

        return $image;
    }

    public static function generateThumbnail($image, $ext = null)
    {
        return Image::make($image)->fit(165, 165)->encode('jpg', 80);
    }

    public static function uploadFile($file, $ext = null, $author = 0)
    {
        $originalName =  $file->getClientOriginalName();
        $extension = $file->getClientOriginalExtension();

        $fileName = self::generateFileName($file, $ext);
        $filePath = self::uploadPath() . $fileName;

        $savefile = new File();
        $savefile->url =  FileHelper::cdnPath($filePath);
        $savefile->name = $originalName;

        $savefile->created_by = $author;

        if (@is_array(getimagesize($file))) {

            $imageCompressed = self::compressImage($file);
            $imageThumb = self::generateThumbnail($file);
            $imageThumbPath = self::uploadPath() . 'thumbnails/' . $fileName;

            $result = Storage::disk('spaces')->put($imageThumbPath, $imageThumb);
            $result = Storage::disk('spaces')->put($filePath, $imageCompressed);

            $savefile->type = 'image';
            $savefile->mime = $file->getMimeType();
            $savefile->thumbnail_url = self::cdnPath($imageThumbPath);
        } else {
            $result = Storage::disk('spaces')->put($filePath, file_get_contents($file));

            $savefile->type = $extension;
            $savefile->mime = $file->getMimeType();
        }

        $savefile->save();

        return $savefile;
    }
}

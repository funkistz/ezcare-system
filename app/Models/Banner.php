<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Banner extends Model
{
    use HasFactory;

    public function updatePosition($new_position)
    {
        if ($new_position != $this->position && $new_position > 0) {

            if ($this->position > $new_position) {
                $banners_after_position = Banner::where([
                    ['position', '<', $this->position],
                    ['position', '>=', $new_position],
                    ['id', '!=', $this->id]
                ])->get();

                if ($banners_after_position) {
                    foreach ($banners_after_position as $key => $banner_after_position) {
                        $banner_after_position->position++;
                        $banner_after_position->save();
                    }
                }
            } else {
                $banners_after_position = Banner::where([
                    ['position', '<=', $new_position],
                    ['position', '>', $this->position],
                    ['id', '!=', $this->id]
                ])->get();

                if ($banners_after_position) {
                    foreach ($banners_after_position as $key => $banner_after_position) {
                        $banner_after_position->position--;
                        $banner_after_position->save();
                    }
                }
            }

            $this->position = $new_position;
            $this->save();
        }
    }
}

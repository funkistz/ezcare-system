<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Vacancy extends Model
{
    use HasFactory,
        SoftDeletes,
        \App\Http\Traits\HasActiveTrait;

    protected $table = 'vacancy';

    protected $fillable = [
        'name',
        'description',
        'is_active',
        'position'
    ];

    public function updatePosition($new_position)
    {
        if ($new_position != $this->position && $new_position > 0) {

            if ($this->position > $new_position) {
                $vacancy_after_position = Vacancy::where([
                    ['position', '<', $this->position],
                    ['position', '>=', $new_position],
                    ['id', '!=', $this->id]
                ])->get();

                if ($vacancy_after_position) {
                    foreach ($vacancy_after_position as $key => $banner_after_position) {
                        $banner_after_position->position++;
                        $banner_after_position->save();
                    }
                }
            } else {
                $vacancy_after_position = Vacancy::where([
                    ['position', '<=', $new_position],
                    ['position', '>', $this->position],
                    ['id', '!=', $this->id]
                ])->get();

                if ($vacancy_after_position) {
                    foreach ($vacancy_after_position as $key => $banner_after_position) {
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

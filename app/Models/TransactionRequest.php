<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphTo;
use Illuminate\Database\Eloquent\Relations\MorphToMany;
use Illuminate\Database\Eloquent\SoftDeletingScope;
use Illuminate\Support\Facades\DB;

class TransactionRequest extends Model
{
    use HasFactory;

    protected $appends = ['real_model_id'];

    public function modelable(): MorphTo
    {
        return $this->morphTo(__FUNCTION__, 'model_type', 'model_id')->withoutGlobalScope(SoftDeletingScope::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'created_by', 'id');
    }

    public function PolicyOverwrite(): MorphToMany
    {
        return $this->morphToMany(PolicyOverwrite::class, 'transaction_requests');
    }

    // public function getDescriptionAttribute()
    // {
    //     $model_name = $this->model_type;
    //     $model_name::find($this->model_id);

    //     $name = substr($this->model_type, strrpos($this->model_type, '\\') + 1);
    //     return config('constant.transaction_requests.' . $this->code);
    // }

    public function getRealModelIdAttribute()
    {
        $model_name = $this->model_type;
        $model_name::find($this->model_id);

        $name = substr($this->model_type, strrpos($this->model_type, '\\') + 1);

        if ($name == 'PolicyOverwrite') {
            return $this->modelable->policy_id;
        }

        return $this->model_id;
    }
}

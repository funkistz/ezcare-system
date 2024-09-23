<?php

namespace App\Models;

//use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Spatie\Permission\Traits\HasRoles;
use Illuminate\Database\Eloquent\Builder;
use OwenIt\Auditing\Contracts\Auditable;

class User extends Authenticatable implements Auditable
{

    use HasApiTokens, HasFactory, Notifiable, HasRoles, \App\Http\Traits\ToSelectDataTrait , \OwenIt\Auditing\Auditable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'username',
        'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function userable()
    {
        return $this->morphTo();
    }

    public function scopeActive(Builder $query): void
    {
        $query->where('active', 1);
    }

    public function branches()
    {
        return $this->belongsToMany(Branch::class, 'branch_user');
    }

    public function excludeMoReport()
    {
        $mo_exclude = GeneralSetting::where('name', 'report_mo_exclude_user_ids')->first();
        $mo_exclude_ids = json_decode($mo_exclude->value);

        $mo_exclude_ids[] = $this->id;

        $mo_exclude->value = json_encode($mo_exclude_ids);
        $mo_exclude->save();
    }

    public function includeMoReport()
    {
        $mo_exclude = GeneralSetting::where('name', 'report_mo_exclude_user_ids')->first();
        $mo_exclude_ids = json_decode($mo_exclude->value);

        foreach (array_keys($mo_exclude_ids, $this->id, true) as $key) {
            unset($mo_exclude_ids[$key]);
        }

        $mo_exclude->value = json_encode($mo_exclude_ids);
        $mo_exclude->save();
    }

    public function IsExcludeReport($mo_exclude_ids)
    {
        if (in_array($this->id, $mo_exclude_ids)) {
            return true;
        } else {
            return false;
        }
    }

    public function AccessToken()
    {
        return $this->hasOne(UserPushNotificationToken::class);
    }
}

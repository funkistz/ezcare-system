<?php

use App\Http\Controllers\Api\AutditController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CarPartsController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\PermissionController;
use App\Http\Controllers\Api\RoleController;
use App\Http\Controllers\Api\CountryStateController;
use App\Http\Controllers\Api\CustomerController;
use App\Http\Controllers\Api\DashboardController;
use App\Http\Controllers\Api\EndorsementController;
use App\Http\Controllers\Api\InspectionController;
use App\Http\Controllers\Api\MobileDataController;
use App\Http\Controllers\Api\PolicyController;
use App\Http\Controllers\Api\VehicleModelController;
use App\Http\Controllers\Api\VehicleController;
use App\Http\Controllers\Api\WorkshopController;
use App\Http\Controllers\Api\VehicleVariantController;
use App\Http\Controllers\ImportController;
use App\Models\WarrantyPlan;
use App\Http\Controllers\Api\EndorsmentController;
use App\Http\Controllers\Api\ExgratiaController;
use App\Http\Controllers\Api\NotificationController;
use App\Http\Controllers\Api\PolicyClaimController;
use App\Http\Controllers\Api\SponsorshipController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::name('api.')->group(function () {

    Route::post('import-csv/dealer', [ImportController::class, 'dealer'])->name('import-csv.dealer');
    Route::resource('import-csv', ImportController::class);

    Route::get('mobile/banners', [MobileDataController::class, 'banners'])->name('mobile.banners');
    Route::get('mobile/settings', [MobileDataController::class, 'settings'])->name('mobile.settings');

    Route::post('auth/generateTACEmail', [AuthController::class, 'generateTACEmail'])->name('auth.generate_tac_email');
    Route::post('auth/generateTAC', [AuthController::class, 'generateTAC'])->name('auth.generate_tac');
    Route::get('auth/generateTAC', [AuthController::class, 'generateTAC'])->name('auth.generate_tac_test');

    Route::post('auth/loginByTac', [AuthController::class, 'loginByTac'])->name('auth.loginByTac');
    Route::post('auth/loginByTacEmail', [AuthController::class, 'loginByTacEmail'])->name('auth.loginByTacEmail');
    Route::post('auth/login', [AuthController::class, 'login'])->name('auth.login');
    Route::post('auth/requestDeleteAccount', [AuthController::class, 'requestDeleteAccount'])->name('auth.requestDeleteAccount');
    Route::apiResource('auth', AuthController::class);

    Route::apiResource('permissions', PermissionController::class);
    Route::apiResource('roles', RoleController::class);

    Route::get('vehicle-variants/findBybrandId', [VehicleVariantController::class, 'findBybrandId'])->name('vehicle-variants.findBybrandId');
    Route::get('vehicle-models/findBybrandId', [VehicleModelController::class, 'findBybrandId'])->name('vehicle-models.findBybrandId');
    Route::apiResource('vehicle-models', VehicleModelController::class);
    Route::apiResource('vehicles', VehicleController::class);

    Route::get('policies/{policy_id}/services', [PolicyController::class, 'services'])->name('policies.services');
    Route::post('policies/{policy_id}/add-services', [PolicyController::class, 'addServices'])->name('policies.addServices');
    Route::apiResource('policies', PolicyController::class);

    Route::get('customers/{customer_id}/policies', [CustomerController::class, 'policies'])->name('customers.policies');
    Route::apiResource('customers', CustomerController::class);

    Route::apiResource('workshops', WorkshopController::class);

    Route::apiResource('warranty-plan', WarrantyPlan::class);

    Route::post('inspection/rejectInspection', [InspectionController::class, 'rejectInspection'])->name('inspection.rejectInspection');
    Route::post('inspection/proceedInspection', [InspectionController::class, 'proceedInspection'])->name('inspection.proceedInspection');

    Route::post('inspection/completedSchedule', [InspectionController::class, 'completedSchedule'])->name('inspection.completedSchedule');
    Route::post('inspection/unassignedSchedule', [InspectionController::class, 'unassignedSchedule'])->name('inspection.unassignedSchedule');
    Route::post('inspection/beginPickup', [InspectionController::class, 'beginPickup'])->name('inspection.beginPickup');
    Route::get('inspection/scheduleData', [InspectionController::class, 'scheduleData'])->name('inspection.scheduleData');
    Route::get('inspection/inspectionData', [InspectionController::class, 'inspectionData'])->name('inspection.inspectionData');
    Route::get('inspection/nonInspectionData', [InspectionController::class, 'nonInspectionData'])->name('inspection.nonInspectionData');
    Route::get('inspection/data', [InspectionController::class, 'data'])->name('inspection.data');
    Route::get('inspection/showSchedule/{id}', [InspectionController::class, 'showSchedule'])->name('inspection.showSchedule');
    Route::get('inspection/showInspection/{id}', [InspectionController::class, 'showInspection'])->name('inspection.showInspection');
    Route::apiResource('inspection', InspectionController::class);

    Route::get('request/allRequest', [EndorsementController::class, 'allRequest'])->name('request.allRequest');

    Route::apiResource('endorsement', EndorsementController::class);
    Route::apiResource('exgratia', ExgratiaController::class);
    Route::apiResource('sponsorship', SponsorshipController::class);
    Route::apiResource('car-parts', CarPartsController::class);


    Route::post('endorsement/rejectInspection', [EndorsementController::class, 'rejectInspection'])->name('endorsement.rejectInspection');
    Route::post('endorsement/proceedInspection', [EndorsementController::class, 'proceedInspection'])->name('endorsement.proceedInspection');

    Route::post('exgratia/rejectInspection', [ExgratiaController::class, 'rejectInspection'])->name('exgratia.rejectInspection');
    Route::post('exgratia/proceedInspection', [ExgratiaController::class, 'proceedInspection'])->name('exgratia.proceedInspection');

    Route::post('sponsorship/rejectInspection', [SponsorshipController::class, 'rejectInspection'])->name('sponsorship.rejectInspection');
    Route::post('sponsorship/proceedInspection', [SponsorshipController::class, 'proceedInspection'])->name('sponsorship.proceedInspection');

    Route::resource('policy-claim', PolicyClaimController::class);

    Route::get('dashboard/dynamic', [DashboardController::class, 'dynamic'])->name('dashboard.dynamic');
    Route::apiResource('dashboard', DashboardController::class);

    Route::controller(CountryStateController::class)->name('country-state.')->group(function () {
        Route::get('country-state/countries', 'countries')->name('countries');
        Route::get('country-state/states/{country}', 'states')->name('states');
    });

    Route::post('notification/update-token', [NotificationController::class, 'updateToken']);
    Route::apiResource('notification', NotificationController::class);

    Route::post('audit/list', [AutditController::class, 'list'])->name('audit.getlist');

    Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
        return $request->user();
    });
});

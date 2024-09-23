<?php

use App\Http\Controllers\Api\NotificationController;
use App\Http\Controllers\ApprovalController;
use App\Http\Controllers\BranchController;
use App\Http\Controllers\ClaimController;
use App\Http\Controllers\CoverageController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\FileController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\PermissionController;
use App\Http\Controllers\StaffController;
use App\Http\Controllers\VehicleBrandController;
use App\Http\Controllers\VehicleModelController;
use App\Http\Controllers\VehicleVariantController;
use App\Http\Controllers\WarrantyPlanController;
use App\Http\Controllers\WarrantyPlanSubPlanController;
use App\Http\Controllers\TaxController;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\DealerController;
use App\Http\Controllers\FreePromoController;
use App\Http\Controllers\GeneralSettingController;
use App\Http\Controllers\ImportController;
use App\Http\Controllers\InspectionController;
use App\Http\Controllers\InvoicePayeeController;
use App\Http\Controllers\MobileBannerController;
use App\Http\Controllers\MobileSettingController;
use App\Http\Controllers\NonInspectionController;
use App\Http\Controllers\OilTypeController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\PlanDiscountController;
use App\Http\Controllers\PlanPricingController;
use App\Http\Controllers\PolicyController;
use App\Http\Controllers\ReportController;
use App\Http\Controllers\ScheduleInspectionController;
use App\Http\Controllers\SupportQuotationController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\VacancyController;
use App\Http\Controllers\VehicleConditionController;
use App\Http\Controllers\VehicleController;
use App\Http\Controllers\VehicleGroupController;
use App\Http\Controllers\VehiclePowerCapacityController;
use App\Http\Controllers\WarrantyPlanClaimLimitController;
use App\Http\Controllers\WarrantyPlanItemChildController;
use App\Http\Controllers\WarrantyPlanItemController;
use App\Http\Controllers\WorkshopController;
use App\Models\PlanDiscount;
use App\Models\WarrantyPlanItem;
use App\Http\Controllers\BannerController;
use App\Http\Controllers\PolicyOverwriteController;
use App\Http\Controllers\CarPartsController;
use App\Http\Controllers\ClaimPaymentController;
use App\Http\Controllers\PolicyClaimController;
use App\Http\Controllers\SupplierController;
use App\Http\Controllers\AddonCoverageController; 

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('notification/sendtestnotification', [NotificationController::class, 'sendPushNotification']);
Route::get('notification/sendPolicy3MonthsPushNotification', [NotificationController::class, 'sendPolicy3MonthsPushNotification']);

Route::get('/my/tiktokEmbed', function () {
    return view('tiktokEmbedMy');
});
Route::get('/id/tiktokEmbed', function () {
    return view('tiktokEmbed');
});
Route::get('/setLanguage', [HomeController::class, 'setLanguage'])->name('setLanguage');
Route::get('/', [HomeController::class, 'index'])->name('home');
Route::get('contact-us', [HomeController::class, 'contactUs'])->name('contact-us');
Route::get('about-us', [HomeController::class, 'aboutUs'])->name('about-us');
Route::get('our-products', [HomeController::class, 'ourProduct'])->name('our-product');
// Route::get('ecw-mobile-services', [HomeController::class, 'ecwMobileServices'])->name('ecw-mobile-services');
Route::get('group-of-companies', [HomeController::class, 'groupOfCompanies'])->name('group-of-companies');
Route::get('media', [HomeController::class, 'media'])->name('media');
Route::get('career', [HomeController::class, 'career'])->name('career');
Route::get('privacy', [HomeController::class, 'privacy'])->name('privacy');

Route::resource('support_quotation', SupportQuotationController::class);
Route::put('update-supportquote-status', [SupportQuotationController::class, 'updateStatus'])->name('support_quotation.updateStatus');

Route::middleware(['auth', 'verified'])->group(function () {

    Route::prefix('admin')->group(function () {

        Route::get('/dashboard', DashboardController::class)->name('dashboard');
        Route::put('banner/{id}/change_position', [BannerController::class, 'changePosition'])->name('vehicle.change_position');
        Route::put('banner/{id}/change_active', [BannerController::class, 'changeActive'])->name('vehicle.change_active');
        Route::resource('banner', BannerController::class);

        // Route::post('approval/reject', [ApprovalController::class, 'reject'])->name('approval.reject');
        // Route::post('approval/approve', [ApprovalController::class, 'approve'])->name('approval.approve');
        Route::resource('approval', ApprovalController::class);

        // Route::middleware(['role:super-admin'])->group(function () {
        Route::put('policy/activate/{id}', [PolicyController::class, 'activate'])->name('policy.activate');
        Route::put('policy/deactivate/{id}', [PolicyController::class, 'deactivate'])->name('policy.deactivate');
        Route::put('policy/void/{id}', [PolicyController::class, 'void'])->name('policy.void');

        Route::put('policy/updateInvoice/{id}', [PolicyController::class, 'updateInvoice'])->name('policy.update_invoice');
        Route::put('policy/generateInvoice/{id}', [PolicyController::class, 'generateInvoice'])->name('policy.generate_invoice');
        Route::put('policy/regenerateInvoice/{id}', [PolicyController::class, 'regenerateInvoice'])->name('policy.regenerate_invoice');
        Route::put('policy/addPayment/{id}', [PolicyController::class, 'addPayment'])->name('policy.add_payment');

        Route::put('policy/addAttachment/{id}', [PolicyController::class, 'addAttachment'])->name('policy.add_attachment');
        Route::put('policy/addService/{id}', [PolicyController::class, 'addService'])->name('policy.add_service');

        Route::post('policy/addCoverage/{id}', [PolicyController::class, 'addCoverage'])->name('policy.addCoverage');
        Route::post('policy/addDiscount/{id}', [PolicyController::class, 'addDiscount'])->name('policy.addDiscount');
        Route::post('policy/addFreePromo/{id}', [PolicyController::class, 'addFreePromo'])->name('policy.addFreePromo');
        Route::delete('policy/deleteCoverage/{id}', [PolicyController::class, 'deleteCoverage'])->name('policy.deleteCoverage');
        Route::delete('policy/deleteDiscount/{id}', [PolicyController::class, 'deleteDiscount'])->name('policy.deleteDiscount');
        Route::delete('policy/deleteFreePromo/{id}', [PolicyController::class, 'deleteFreePromo'])->name('policy.deleteFreePromo');
        Route::delete('policy/deleteService/{id}', [PolicyController::class, 'deleteService'])->name('policy.deleteService');

        Route::put('policy/updateCustomerPayment/{id}', [PolicyController::class, 'updateCustomerPayment'])->name('policy.updateCustomerPayment');

        Route::resource('payment', PaymentController::class);

        Route::resource('invoicePayee', InvoicePayeeController::class);

        Route::put('policy/updateDetails/{id}', [PolicyController::class, 'updateDetails'])->name('policy.updateDetails');
        Route::resource('policy', PolicyController::class);
        Route::resource('vehicle', VehicleController::class);

        Route::resource('policyOverwrite', PolicyOverwriteController::class);

        Route::get('inspection/importImage', [InspectionController::class, 'importImage'])->name('inspection.importImage');

        Route::resource('schedule-inspection', ScheduleInspectionController::class);
        Route::resource('non-inspection', NonInspectionController::class);
        Route::resource('inspection', InspectionController::class);

        Route::put('claim/addAttachment/{id}', [ClaimController::class, 'addAttachment'])->name('claim.add_attachment');
        Route::put('claim/upsertItem/{id}', [ClaimController::class, 'upsertItem'])->name('claim.upsert_item');
        Route::put('claim/deleteItem/{id}', [ClaimController::class, 'deleteItem'])->name('claim.delete_item');
        Route::put('claim/updateStatus/{id}', [ClaimController::class, 'updateStatus'])->name('claim.update_status');
        Route::resource('claim', ClaimController::class);

        Route::resource('policy-claim', PolicyClaimController::class);

        Route::get('generate-approvaldoc', [PolicyClaimController::class, 'onGenerateApprovalDoc'])->name('policy_claim.generate-approvaldoc');
        Route::get('generate-lackofservicedoc', [PolicyClaimController::class, 'onGenerateLosDoc'])->name('policy_claim.generate-losdoc');
        Route::get('generate-unavailableservicedoc', [PolicyClaimController::class, 'onGenerateUnavailableServiceDoc'])->name('policy_claim.generate-unavailable-service');
        Route::get('generate-insufficientsupportingdoc', [PolicyClaimController::class, 'onGenerateInsufficentSupportingDoc'])->name('policy_claim.generate-insufficient-doc');
        Route::get('generate-repairwithoutpermission', [PolicyClaimController::class, 'onGenerateRepairWithoutPermissionDoc'])->name('policy_claim.generate-repair-without-permission-doc');
        Route::get('generate-undercoolingofperiod', [PolicyClaimController::class, 'onGenerateUnderCoolingOfPeriodDoc'])->name('policy_claim.generate-undercoolingperiod-doc');
        Route::get('generate-unavailablerepairquote', [PolicyClaimController::class, 'onGenerateUnavailableRepairQuoteDoc'])->name('policy_claim.generate-unavailrepairquote-doc');
        Route::get('generate-warrantycontinuation', [PolicyClaimController::class, 'onGenerateWarrantyContinuationDoc'])->name('policy_claim.generate-warrantycontinuation-doc');

        Route::put('claim-payment/addAttachment/{id}', [ClaimPaymentController::class, 'addAttachment'])->name('claim_payment.add_attachment');
        Route::resource('claim-payment', ClaimPaymentController::class);

        Route::resource('users', UserController::class);
        Route::resource('staffs', StaffController::class);
        Route::resource('customers', CustomerController::class);
        Route::resource('roles', RoleController::class);
        Route::resource('permissions', PermissionController::class);
        // });

        Route::resource('supplier', SupplierController::class);
        Route::resource('car-parts', CarPartsController::class);

        Route::prefix('settings')->group(function () {
            Route::resource('general-settings', GeneralSettingController::class);
            Route::resource('workshops', WorkshopController::class);
            Route::resource('vehicle-brands', VehicleBrandController::class);
            Route::resource('vehicle-models', VehicleModelController::class);
            Route::resource('vehicle-groups', VehicleGroupController::class);
            Route::resource('vehicle-powers', VehiclePowerCapacityController::class);
            Route::resource('vehicle-conditions', VehicleConditionController::class);

            Route::put('warranty-plans/addPDF/{id}', [WarrantyPlanController::class, 'addPDF'])->name('warranty-plans.add-pdf');
            Route::resource('warranty-plans', WarrantyPlanController::class);
            Route::resource('warranty-plan-items', WarrantyPlanItemController::class);
            Route::resource('warranty-plan-item-childs', WarrantyPlanItemChildController::class);

            Route::resource('claim-limits', WarrantyPlanClaimLimitController::class);

            Route::resource('branches', BranchController::class);

            Route::put('vacancy/{id}/change_position', [VacancyController::class, 'changePosition'])->name('vacancy.change_position');
            Route::put('vacancy/{id}/change_active', [VacancyController::class, 'changeActive'])->name('vacancy.change_active');
            Route::resource('vacancy', VacancyController::class);

            Route::resource('dealers', DealerController::class);

            Route::get('plan-pricing/calculate-price', [PlanPricingController::class, 'calculatePrice'])->name('plan-pricing.calculate-price');
            Route::resource('plan-pricing', PlanPricingController::class);

            Route::resource('vehicle-variants', VehicleVariantController::class);
            Route::resource('warranty-subplans', WarrantyPlanSubPlanController::class);
            Route::resource('taxes', TaxController::class);
            Route::resource('plan-discounts', PlanDiscountController::class);
            Route::resource('free-promos', FreePromoController::class);
            Route::resource('coverages', CoverageController::class);

            Route::post('coverage/addAttachment', [AddonCoverageController::class, 'addAttachment'])->name('coverages.add_attachment');
            Route::put('coverage/addAttachment/{id}', [AddonCoverageController::class, 'updateAttachment'])->name('coverages.update_attachment');

            Route::resource('oil-types', OilTypeController::class);
        });

        Route::prefix('mobile_settings')->name('mobile-settings.')->group(function () {
            Route::resource('generals', MobileSettingController::class);

            Route::put('banner/{id}/change_position', [MobileBannerController::class, 'changePosition'])->name('banners.change_position');
            Route::put('banner/{id}/change_active', [MobileBannerController::class, 'changeActive'])->name('banners.change_active');
            Route::resource('banners', MobileBannerController::class);
        });

        Route::prefix('reports')->group(function () {
            Route::resource('report-policy', VehicleBrandController::class);
            Route::get('reports/policySimple', [ReportController::class, 'policySimple'])->name('reports.policySimple');
            Route::get('reports/soa', [ReportController::class, 'soa'])->name('reports.soa');
            Route::get('reports/os', [ReportController::class, 'os'])->name('reports.os');
        });
    });
});

Route::get('policy/generatePayee', [PolicyController::class, 'generatePayee'])->name('policy.generatePayee');
Route::get('policy/generateReport', [PolicyController::class, 'generateReport'])->name('policy.generateReport');
Route::get('policy/regenerateInvoices', [PolicyController::class, 'regenerateInvoices'])->name('policy.regenerateInvoices');

Route::controller(ProfileController::class)->middleware('auth')->group(function () {
    Route::get('/profile/edit', 'edit')->name('profile.edit');
    Route::patch('/profile', 'update')->name('profile.update');
    Route::delete('/profile', 'destroy')->name('profile.destroy');
});

Route::post('/cloud-upload', [FileController::class, 'cloudUpload']);
Route::post('/upload-image', [FileController::class, 'storeImage']);
Route::apiResource('file', FileController::class);

require __DIR__ . '/auth.php';


Route::get('/token', function () {
    return csrf_token();
});

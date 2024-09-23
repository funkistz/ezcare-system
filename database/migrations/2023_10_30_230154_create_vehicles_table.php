<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use App\Models\VehicleBrand;
use App\Models\VehicleModel;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('vehicles', function (Blueprint $table) {
            $table->id();
            $table->string('registration_no');
            $table->string('chassis_no')->nullable();
            $table->string('engine_no')->nullable();
            $table->text('description')->nullable();
            $table->float('power_capacity')->nullable();

            $table->year('year')->nullable();
            $table->timestamp('registration_date')->nullable();

            $table->unsignedBigInteger('vehicle_brand_id')->nullable();
            $table->unsignedBigInteger('vehicle_model_id')->nullable();
            $table->unsignedBigInteger('vehicle_condition_id')->nullable();


            $table->softDeletes($column = 'deleted_at', $precision = 0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('vehicles');
    }
};

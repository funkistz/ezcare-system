<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

use App\Models\VehicleGroup;
use App\Models\VehiclePowerCapacity;
use App\Models\WarrantyPlan;
use App\Models\VehicleCondition;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('plan_pricings', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('description')->nullable();

            $table->foreignIdFor(VehicleCondition::class, 'vehicle_condition_id')->constrained();
            $table->foreignIdFor(VehicleGroup::class, 'vehicle_group_id')->constrained();
            $table->foreignIdFor(VehiclePowerCapacity::class, 'vehicle_power_capacity_id')->constrained();
            $table->foreignIdFor(WarrantyPlan::class, 'warranty_plan_id')->constrained();

            $table->decimal('price', 10, 2);
            $table->decimal('addon_price', 10, 2);

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('plan_pricings');
    }
};

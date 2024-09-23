<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use App\Models\VehicleModel;
use App\Models\VehicleGroup;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('models_vehicle_groups', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(VehicleModel::class, 'vehicle_model_id')->constrained()->onDelete('cascade');
            $table->foreignIdFor(VehicleGroup::class, 'vehicle_group_id')->constrained()->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('models_vehicle_groups');
    }
};

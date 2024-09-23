<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('warranty_plan_oil_type', function (Blueprint $table) {
            $table->id();
            $table->unsignedBiginteger('warranty_plan_id')->unsigned();
            $table->unsignedBiginteger('oil_type_id')->unsigned();
            $table->unsignedBiginteger('service_type_id')->unsigned();

            $table->foreign('warranty_plan_id')->references('id')
                ->on('warranty_plans')->onDelete('cascade');
            $table->foreign('oil_type_id')->references('id')
                ->on('oil_types')->onDelete('cascade');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('warranty_plan_oil_type');
    }
};

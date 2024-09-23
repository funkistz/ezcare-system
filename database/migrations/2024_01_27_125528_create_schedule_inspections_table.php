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
        Schema::create('schedule_inspections', function (Blueprint $table) {
            $table->id();
            $table->string('type', 20);
            $table->timestamp('date');

            $table->string('policy_no')->nullable();
            $table->string('location')->nullable();

            $table->integer('period')->nullable();
            $table->integer('vehicle_total')->nullable();
            $table->string('remarks')->nullable();

            $table->string('status_code', 20);

            $table->unsignedBigInteger('technician_id')->nullable();
            $table->unsignedBigInteger('technician_branch_id')->nullable();
            $table->unsignedBigInteger('marketing_officer_id')->nullable();
            $table->unsignedBigInteger('dealer_id')->nullable();

            $table->unsignedBigInteger('warranty_plan_id')->nullable();
            $table->unsignedBigInteger('free_promo_id')->nullable();
            $table->unsignedBigInteger('branch_id')->nullable();

            $table->unsignedBiginteger('person_in_charge_id')->unsigned()->nullable();
            $table->unsignedBiginteger('created_by')->unsigned()->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('schedule_inspections');
    }
};

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
        Schema::create('services', function (Blueprint $table) {
            $table->id();

            $table->string('type');
            $table->string('name');
            $table->text('remarks')->nullable();

            $table->unsignedBigInteger('policy_id');
            $table->foreign('policy_id')
                ->references('id')
                ->on('policies');

            $table->string('oil_type');
            $table->unsignedBigInteger('oil_type_id');

            $table->integer('expected_mileage');
            $table->integer('current_mileage');
            $table->integer('next_mileage');

            $table->timestamp('expected_date');
            $table->timestamp('current_date');
            $table->timestamp('next_date');

            $table->string('invoice_no')->nullable();
            $table->timestamp('invoice_date')->nullable();
            $table->string('workshop_name')->nullable();

            $table->string('status')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('services');
    }
};

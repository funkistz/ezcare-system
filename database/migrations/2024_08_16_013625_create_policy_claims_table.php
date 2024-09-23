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
        Schema::create('policy_claims', function (Blueprint $table) {
            $table->id();

            $table->unsignedBigInteger('policy_id');
            $table->foreign('policy_id')
                ->references('id')
                ->on('policies');

            $table->string('customer_phone_no')->nullable();

            $table->integer('location');
            $table->string('workshop_name')->nullable();
            $table->string('workshop_phone_no')->nullable();

            $table->text('remarks')->nullable();

            $table->unsignedBigInteger('technician_id');
            $table->unsignedBigInteger('created_by');

            $table->string('status_code');
            $table->string('inspection_status_code')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('policy_claims');
    }
};

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
        Schema::create('claim_payments', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('claim_id');

            $table->decimal('amount', 15, 2)->default(0);
            $table->timestamp('date');
            $table->string('reference_no')->nullable();
            $table->text('remarks')->nullable();
            $table->unsignedBigInteger('created_by');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('claim_payments');
    }
};

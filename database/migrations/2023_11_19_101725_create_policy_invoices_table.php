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
        Schema::create('policy_invoices', function (Blueprint $table) {
            $table->id();
            $table->string('invoice_no')->unique();
            $table->timestamp('date');
            $table->json('content')->nullable();

            $table->unsignedBigInteger('policy_id')->nullable();
            $table->foreign('policy_id')
                ->references('id')
                ->on('policies');

            $table->unsignedBiginteger('created_by')->unsigned()->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('policy_invoices');
    }
};

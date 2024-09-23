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
        Schema::table('claims', function (Blueprint $table) {
            $table->after('status_code', function ($table) {
                $table->unsignedBigInteger('created_by')->nullable();
            });
        });

        Schema::table('claim_items', function (Blueprint $table) {
            $table->decimal('price', 15, 2)->nullable()->change();

            $table->after('price', function ($table) {
                $table->decimal('price_approved', 15, 2)->nullable();
            });
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};

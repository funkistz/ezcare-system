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
        Schema::table('plan_pricings', function (Blueprint $table) {
            $table->after('addon_price', function ($table) {
                $table->decimal('dealer_price', 10, 2);
                $table->decimal('dealer_addon_price', 10, 2);
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

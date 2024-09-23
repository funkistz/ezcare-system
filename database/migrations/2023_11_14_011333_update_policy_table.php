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
        Schema::table('policies', function (Blueprint $table) {
            $table->dropColumn('salesman_id');
            $table->after('dealer_id', function ($table) {
                $table->string('salesman')->nullable();
                $table->unsignedBigInteger('branch_id')->nullable();
                $table->unsignedBigInteger('vehicle_id')->nullable();
                $table->unsignedBigInteger('warranty_plan_id')->nullable();
                $table->timestamp('activated_at')->nullable();
                $table->timestamp('expired_at')->nullable();
                $table->integer('period')->nullable();
                $table->string('type')->nullable();
                $table->text('remarks')->nullable();

                $table->decimal('warranty_plan_price', 10, 2)->nullable();
                $table->decimal('subtotal_with_tax', 10, 2)->nullable();
                $table->decimal('subtotal_without_tax', 10, 2)->nullable();
                $table->decimal('total_discount', 10, 2)->nullable();
                $table->decimal('total_tax', 10, 2)->nullable();
                $table->decimal('total_price', 10, 2)->nullable();
                $table->boolean('is_foc')->nullable()->default(0);
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

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
        Schema::table('policy_invoices', function (Blueprint $table) {

            $table->after('policy_id', function ($table) {

                $table->morphs('billable');
                $table->text('bill_to_name')->nullable();
                $table->text('bill_to_address')->nullable();

                $table->string('type')->nullable();

                $table->unsignedBigInteger('tax_id')->index();
                $table->foreign('tax_id')->references('id')->on('taxes');

                $table->boolean('is_main');
                $table->decimal('subtotal', 10, 2);
                $table->decimal('discount', 10, 2);
                $table->decimal('tax', 10, 2);
                $table->decimal('total', 10, 2);

                $table->text('note')->nullable();
            });

            $table->softDeletes($column = 'deleted_at', $precision = 0);
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

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
        Schema::create('invoice_items', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('policy_invoice_id')->index();
            $table->nullableMorphs('itemable');

            $table->string('description');
            $table->string('remarks')->nullable();

            $table->decimal('rate', 10, 2);
            $table->integer('quantity');
            $table->decimal('total', 10, 2);

            $table->timestamps();

            $table->foreign('policy_invoice_id')->references('id')->on('policy_invoices')->cascadeOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('invoice_items');
    }
};

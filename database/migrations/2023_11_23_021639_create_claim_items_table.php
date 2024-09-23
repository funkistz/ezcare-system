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
        Schema::create('claim_items', function (Blueprint $table) {
            $table->id();

            $table->unsignedBiginteger('claim_id')->unsigned();

            $table->unsignedBiginteger('item_id')->unsigned();


            $table->decimal('price', 10, 2);

            $table->string('status_code', 20);
            $table->string('reason_code', 20)->nullable();
            $table->string('remarks')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('claim_items');
    }
};

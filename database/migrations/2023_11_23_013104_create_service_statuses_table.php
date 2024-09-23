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
        Schema::create('service_statuses', function (Blueprint $table) {
            $table->id();

            $table->unsignedBiginteger('service_id')->unsigned();
            $table->string('status_code', 20);
            $table->string('reason_code', 20)->nullable();
            $table->string('remarks')->nullable();
            $table->unsignedBiginteger('created_by')->unsigned()->nullable();

            $table->foreign('service_id')->references('id')
                ->on('services')->onDelete('cascade');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('service_statuses');
    }
};

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
        Schema::create('transaction_requests', function (Blueprint $table) {
            $table->id();
            $table->string('code');
            $table->morphs('model');
            $table->string('status_code', 20);
            $table->string('remarks')->nullable();
            $table->unsignedBiginteger('created_by')->unsigned()->nullable();
            $table->string('system_status_code', 20)->nullable();;
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('transaction_requests');
    }
};

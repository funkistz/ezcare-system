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
        Schema::create('policy_overwrites', function (Blueprint $table) {
            $table->id();
            $table->unsignedBiginteger('policy_id')->unsigned();
            $table->string('field');
            $table->decimal('amount', 15, 2)->default(0);
            $table->string('value')->nullable();
            $table->text('remarks')->nullable();
            $table->string('status_code', 20)->nullable(false);
            $table->unsignedBigInteger('created_by')->nullable();
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('policy_overwrites');
    }
};

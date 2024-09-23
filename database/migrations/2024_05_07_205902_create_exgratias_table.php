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
        Schema::create('exgratias', function (Blueprint $table) {
            $table->id();

            $table->string('vehicle')->nullable();
            $table->string('registration_no')->nullable();

            $table->unsignedBigInteger('warranty_plan_id')->nullable();
            $table->unsignedBigInteger('dealer_id')->nullable();

            $table->decimal('total_last_year_prod', 15, 2)->default(0);
            $table->decimal('total_this_year_prod', 15, 2)->default(0);
            $table->decimal('total_last_year_claim', 15, 2)->default(0);
            $table->decimal('total_this_year_claim', 15, 2)->default(0);

            $table->text('reasons')->nullable();
            $table->timestamp('activated_at')->nullable();
            $table->timestamp('expired_at')->nullable();

            $table->unsignedBiginteger('created_by')->unsigned()->nullable();
            $table->string('status_code', 20);


            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('exgratias');
    }
};

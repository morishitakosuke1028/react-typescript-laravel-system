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
        Schema::create('claims', function (Blueprint $table) {
            $table->id();
            $table->foreignId('m_point_departure_id')->nullable()->constrained();
            $table->string('other_point_departure_address')->nullable();
            $table->string('local_address')->nullable();
            $table->string('arrival_point_address')->nullable();
            $table->string('transportation_image')->nullable();
            $table->integer('price')->nullable();
            $table->foreignId('m_insurance_company_id')->constrained();
            $table->integer('status')->comment('0=完了,1=一時保存');
            $table->foreignId('m_unit_price_id')->constrained();
            $table->date('workday')->nullable();
            $table->dateTime('worktime')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('claims');
    }
};

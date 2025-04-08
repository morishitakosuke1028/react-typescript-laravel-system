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
        Schema::create('m_insurance_companies', function (Blueprint $table) {
            $table->id();
            $table->string('insurance_company_name');
            $table->string('insurance_company_kana')->nullable();
            $table->string('policy_number')->unique();
            $table->string('person_name');
            $table->string('tel')->unique()->nullable();
            $table->string('email')->unique()->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('m_insurance_companies');
    }
};

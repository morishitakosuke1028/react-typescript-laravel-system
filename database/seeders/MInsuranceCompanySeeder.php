<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class MInsuranceCompanySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('m_insurance_companies')->insert([
            'insurance_company_name' => '東京海上日動火災保険',
            'insurance_company_kana' => 'トウキョウカイジョウニチドウカサイホケン',
            'policy_number' => '1234-5678-9123',
            'person_name' => '東京　太郎',
            'tel' => '08012345678',
            'email' => 'tokyo@kaijo.com',
        ]);
        DB::table('m_insurance_companies')->insert([
            'insurance_company_name' => '損害保険ジャパン',
            'insurance_company_kana' => 'ソンガイホケンジャパン',
            'policy_number' => '9876-5432-1987',
            'person_name' => '損害　二郎',
            'tel' => '09098765432',
            'email' => 'songai@hoken.com',
        ]);
    }
}

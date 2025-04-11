<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class MUnitPriceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('m_unit_prices')->insert([
            'unit_price_name' => '平日料金',
            'km_unit_price' => '1000',
        ]);
        DB::table('m_unit_prices')->insert([
            'unit_price_name' => '土日料金',
            'km_unit_price' => '1500',
        ]);
        DB::table('m_unit_prices')->insert([
            'unit_price_name' => '長期休暇料金',
            'km_unit_price' => '2000',
        ]);
    }
}

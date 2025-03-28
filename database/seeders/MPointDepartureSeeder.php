<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class MPointDepartureSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('m_point_departures')->insert([
            'point_departure_name' => '自宅',
            'zip' => '611-0042',
            'address' => '京都府宇治市小倉町南浦21-221',
        ]);
        DB::table('m_point_departures')->insert([
            'point_departure_name' => '宇治市役所',
            'zip' => '611-0021',
            'address' => '京都府宇治市宇治琵琶33',
        ]);
    }
}

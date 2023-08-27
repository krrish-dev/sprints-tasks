<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Brand; // Add this line to import the Brand model

class BrandsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Brand::factory(10)->create();
    }
}

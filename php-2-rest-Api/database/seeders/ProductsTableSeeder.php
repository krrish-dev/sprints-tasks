<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Product; // Add this line to import the Product model

class ProductsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Product::factory(10)->create();
    }
}

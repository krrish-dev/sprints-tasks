<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Category; // Add this line to import the Category model

class CategoriesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Category::factory(10)->create();
    }
}

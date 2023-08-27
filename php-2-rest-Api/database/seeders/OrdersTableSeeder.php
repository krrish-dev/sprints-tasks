<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Order; // Add this line to import the Order model

class OrdersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Order::factory(10)->create();
    }
}

<?php

namespace Database\Factories;

use App\Models\User;
use App\Models\Customer;
use App\Models\Category;
use App\Models\Brand;
use App\Models\Product;
use App\Models\Order;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class UserFactory extends Factory
{
    protected $model = User::class;

    public function definition()
    {
        return [
            'username' => $this->faker->userName,
            'email' => $this->faker->unique()->safeEmail,
            'email_verified_at' => now(),
            'password' => bcrypt('password'), // Update this with your desired password
            'remember_token' => Str::random(10),
        ];
    }

    public function unverified()
    {
        return $this->state(function (array $attributes) {
            return [
                'email_verified_at' => null,
            ];
        });
    }

    // Define relationships for other models

    public function withCustomer()
    {
        return $this->has(Customer::factory(), 'customer');
    }

    public function withCategory()
    {
        return $this->has(Category::factory(), 'category');
    }

    public function withBrand()
    {
        return $this->has(Brand::factory(), 'brand');
    }

    public function withProduct()
    {
        return $this->has(Product::factory(), 'product');
    }

    public function withOrder()
    {
        return $this->has(Order::factory(), 'order');
    }
}

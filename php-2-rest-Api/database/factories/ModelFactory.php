<?php
use App\Models\Customer;
use App\Models\Category;
use App\Models\Brand;
use App\Models\Product;
use App\Models\Order;

$factory->define(Customer::class, CustomerFactory::class);
$factory->define(Category::class, CategoryFactory::class);
$factory->define(Brand::class, BrandFactory::class);
$factory->define(Product::class, ProductFactory::class);
$factory->define(Order::class, OrderFactory::class);

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Customer extends Model
{
    use HasFactory;

    protected $fillable = [
        'first_name',
        'last_name',
        'address',
        'city',
        'state',
        'country',
        'postal_code',
        'phone',
        'user_id',
    ];

    // Define relationship to User model
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // Define relationship to Order model
    public function orders()
    {
        return $this->hasMany(Order::class);
    }
}

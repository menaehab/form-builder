<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Model;

class Form extends Model
{
    use HasUlids;

    protected $fillable = [
        'user_id',
        'name',
        'description',
    ];

    public function fields()
    {
        return $this->hasMany(FormField::class);
    }
}

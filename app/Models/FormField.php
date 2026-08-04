<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Model;

class FormField extends Model
{
    use HasUlids;

    protected $fillable = [
        'form_id',
        'label',
        'type',
        'options',
        'answer',
    ];

    protected $casts = [
        'options' => 'array',
        'answer' => 'array',
    ];

    public function form()
    {
        return $this->belongsTo(Form::class);
    }
}

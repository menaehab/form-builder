<?php

namespace App\Enums;

enum FieldTypeEnum: string
{
    case TEXT = 'text';
    case TEXTAREA = 'textarea';
    case NUMBER = 'number';
    case EMAIL = 'email';
    case SELECT = 'select';
    case CHECKBOX = 'checkbox';
    case RADIO = 'radio';
    case DATE = 'date';
    case DATETIME = 'datetime';
    case TIME = 'time';
    case URL = 'url';

    /**
     * @return array<int, string>
     */
    public static function values(): array
    {
        return array_column(self::cases(), 'value');
    }
}

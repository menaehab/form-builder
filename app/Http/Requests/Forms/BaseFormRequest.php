<?php

namespace App\Http\Requests\Forms;

use App\Enums\FieldTypeEnum;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class BaseFormRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'fields' => 'required|array',
            'fields.*.label' => 'required|string|max:255',
            'fields.*.type' => ['required', Rule::enum(FieldTypeEnum::class)],
            'fields.*.options' => 'nullable|array',
            'fields.*.answer' => 'nullable|string|array',
            'fields.*.is_required' => 'nullable|boolean',
            'fields.*.options.*' => 'required|string',
        ];
    }

    /**
     * @return array<int, string>
     */
    protected function fieldTypesRequiringOptions(): array
    {
        return [
            FieldTypeEnum::SELECT->value,
            FieldTypeEnum::CHECKBOX->value,
            FieldTypeEnum::RADIO->value,
        ];
    }

    public function withValidator(Validator $validator): void
    {
        $fields = $this->input('fields', []);

        foreach ($fields as $index => $field) {
            $type = $field['type'] ?? null;

            if ($type !== null && in_array($type, $this->fieldTypesRequiringOptions(), true)) {
                $validator->sometimes(
                    "fields.{$index}.options",
                    'required|array|min:1',
                    fn () => true,
                );
            }
        }
    }
}

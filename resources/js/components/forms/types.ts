export type FieldType =
    | 'text'
    | 'textarea'
    | 'number'
    | 'email'
    | 'select'
    | 'checkbox'
    | 'radio'
    | 'date'
    | 'datetime'
    | 'time'
    | 'url';

export type FormField = {
    label: string;
    type: FieldType;
    is_required: boolean;
    options: string[];
};

export type FormErrors = Record<string, string>;

export const FIELD_TYPES: Array<{ label: string; value: FieldType }> = [
    { label: 'Text', value: 'text' },
    { label: 'Textarea', value: 'textarea' },
    { label: 'Number', value: 'number' },
    { label: 'Email', value: 'email' },
    { label: 'Select', value: 'select' },
    { label: 'Checkbox', value: 'checkbox' },
    { label: 'Radio', value: 'radio' },
    { label: 'Date', value: 'date' },
    { label: 'Date & Time', value: 'datetime' },
    { label: 'Time', value: 'time' },
    { label: 'URL', value: 'url' },
];

export const OPTION_TYPES: FieldType[] = ['select', 'checkbox', 'radio'];

export const requiresOptions = (type: FieldType) => OPTION_TYPES.includes(type);

export const makeEmptyField = (): FormField => ({
    label: '',
    type: 'text',
    is_required: false,
    options: [],
});

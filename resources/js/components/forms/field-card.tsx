import { Trash2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import InputError from '@/components/ui/input-error';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

import FieldOptions from './field-options';
import { FIELD_TYPES, requiresOptions } from './types';
import type { FieldType, FormErrors, FormField } from './types';

type Props = {
    field: FormField;
    fieldIndex: number;
    errors: FormErrors;
    onUpdate: <K extends keyof FormField>(key: K, value: FormField[K]) => void;
    onRemove: () => void;
    onAddOption: () => void;
    onUpdateOption: (optionIndex: number, value: string) => void;
    onRemoveOption: (optionIndex: number) => void;
};

export default function FieldCard({
    field,
    fieldIndex,
    errors,
    onUpdate,
    onRemove,
    onAddOption,
    onUpdateOption,
    onRemoveOption,
}: Props) {
    return (
        <Card>
            <CardHeader>
                <div className="flex items-center gap-2">
                    <CardTitle className="flex-1 text-sm">
                        Field {fieldIndex + 1}
                        {field.label && (
                            <span className="ml-1 font-normal text-muted-foreground">
                                — {field.label}
                            </span>
                        )}
                    </CardTitle>
                    <Button
                        type="button"
                        variant="ghost"
                        size="icon-sm"
                        onClick={onRemove}
                        aria-label="Remove field"
                    >
                        <Trash2 className="text-destructive" />
                    </Button>
                </div>
            </CardHeader>

            <CardContent className="space-y-4">
                <FieldGroup>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <Field>
                            <FieldLabel htmlFor={`fields-${fieldIndex}-label`}>
                                Label <span className="text-destructive">*</span>
                            </FieldLabel>
                            <Input
                                id={`fields-${fieldIndex}-label`}
                                placeholder="e.g. Full Name"
                                value={field.label}
                                onChange={(e) => onUpdate('label', e.target.value)}
                                aria-invalid={!!errors[`fields.${fieldIndex}.label`]}
                            />
                            <InputError message={errors[`fields.${fieldIndex}.label`]} />
                        </Field>

                        <Field>
                            <FieldLabel htmlFor={`fields-${fieldIndex}-type`}>
                                Type <span className="text-destructive">*</span>
                            </FieldLabel>
                            <Select
                                value={field.type}
                                onValueChange={(value) => onUpdate('type', value as FieldType)}
                            >
                                <SelectTrigger
                                    id={`fields-${fieldIndex}-type`}
                                    className="w-full"
                                    aria-invalid={!!errors[`fields.${fieldIndex}.type`]}
                                >
                                    <SelectValue placeholder="Select a type" />
                                </SelectTrigger>
                                <SelectContent>
                                    {FIELD_TYPES.map((t) => (
                                        <SelectItem key={t.value} value={t.value}>
                                            {t.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <InputError message={errors[`fields.${fieldIndex}.type`]} />
                        </Field>
                    </div>

                    <Field orientation="horizontal">
                        <Checkbox
                            id={`fields-${fieldIndex}-required`}
                            checked={field.is_required}
                            onCheckedChange={(checked) => onUpdate('is_required', checked === true)}
                        />
                        <FieldLabel htmlFor={`fields-${fieldIndex}-required`}>
                            Required field
                        </FieldLabel>
                    </Field>
                </FieldGroup>

                {requiresOptions(field.type) && (
                    <FieldOptions
                        fieldIndex={fieldIndex}
                        options={field.options}
                        errors={errors}
                        onAdd={onAddOption}
                        onUpdate={onUpdateOption}
                        onRemove={onRemoveOption}
                    />
                )}
            </CardContent>
        </Card>
    );
}

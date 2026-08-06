import { useForm, Link } from '@inertiajs/react';
import { Plus } from 'lucide-react';

import FieldCard from '@/components/forms/field-card';
import { makeEmptyField, requiresOptions } from '@/components/forms/types';
import type { FieldType, FormErrors, FormField } from '@/components/forms/types';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import InputError from '@/components/ui/input-error';
import { update as formsUpdate, index as formsIndex } from '@/routes/forms';

type Form = {
    id: string;
    name: string;
    description: string;
    fields: FormField[];
};

export default function Edit({ form }: { form: Form }) {
    const { data, setData, put, processing, errors } = useForm({
        name: form.name,
        description: form.description,
        fields: form.fields.length ? form.fields : [makeEmptyField()] as FormField[],
    });

    const fieldErrors = errors as unknown as FormErrors;

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        put(formsUpdate.url({ id: form.id }));
    }

    function addField() {
        setData('fields', [...data.fields, makeEmptyField()]);
    }

    function removeField(index: number) {
        setData('fields', data.fields.filter((_, i) => i !== index));
    }

    function updateField<K extends keyof FormField>(index: number, key: K, value: FormField[K]) {
        setData(
            'fields',
            data.fields.map((field, i) => {
                if (i !== index) {
                    return field;
                }

                const next = { ...field, [key]: value };

                if (key === 'type' && !requiresOptions(value as FieldType)) {
                    next.options = [];
                }

                return next;
            })
        );
    }

    function addOption(fieldIndex: number) {
        setData(
            'fields',
            data.fields.map((field, i) =>
                i === fieldIndex ? { ...field, options: [...field.options, ''] } : field
            )
        );
    }

    function updateOption(fieldIndex: number, optionIndex: number, value: string) {
        setData(
            'fields',
            data.fields.map((field, i) =>
                i === fieldIndex
                    ? {
                          ...field,
                          options: field.options.map((opt, oi) => (oi === optionIndex ? value : opt)),
                      }
                    : field
            )
        );
    }

    function removeOption(fieldIndex: number, optionIndex: number) {
        setData(
            'fields',
            data.fields.map((field, i) =>
                i === fieldIndex ? { ...field, options: field.options.filter((_, oi) => oi !== optionIndex) } : field
            )
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {/* Form Details */}
            <Card>
                <CardContent className="pt-6">
                    <FieldGroup>
                        <Field>
                            <FieldLabel htmlFor="name">
                                Name <span className="text-destructive">*</span>
                            </FieldLabel>
                            <Input
                                id="name"
                                placeholder="e.g. Contact Us"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                aria-invalid={!!errors.name}
                            />
                            <InputError message={errors.name} />
                        </Field>

                        <Field>
                            <FieldLabel htmlFor="description">Description</FieldLabel>
                            <Input
                                id="description"
                                placeholder="Optional description..."
                                value={data.description}
                                onChange={(e) => setData('description', e.target.value)}
                                aria-invalid={!!errors.description}
                            />
                            <InputError message={errors.description} />
                        </Field>
                    </FieldGroup>
                </CardContent>
            </Card>

            {/* Fields */}
            <div className="space-y-3">
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="text-base font-medium">Fields</h3>
                        <p className="text-sm text-muted-foreground">
                            Add the fields your form should collect.
                        </p>
                    </div>
                    <Button type="button" variant="outline" size="sm" onClick={addField}>
                        <Plus />
                        Add Field
                    </Button>
                </div>

                <InputError message={fieldErrors['fields']} />

                {data.fields.length === 0 && (
                    <Card>
                        <CardContent className="flex items-center justify-center py-10 text-sm text-muted-foreground">
                            No fields yet. Click "Add Field" to get started.
                        </CardContent>
                    </Card>
                )}

                {data.fields.map((field, fieldIndex) => (
                    <FieldCard
                        key={fieldIndex}
                        field={field}
                        fieldIndex={fieldIndex}
                        errors={fieldErrors}
                        onUpdate={(key, value) => updateField(fieldIndex, key, value)}
                        onRemove={() => removeField(fieldIndex)}
                        onAddOption={() => addOption(fieldIndex)}
                        onUpdateOption={(oi, val) => updateOption(fieldIndex, oi, val)}
                        onRemoveOption={(oi) => removeOption(fieldIndex, oi)}
                    />
                ))}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3">
                <Button type="submit" disabled={processing}>
                    {processing ? 'Updating...' : 'Update Form'}
                </Button>
                <Link href={formsIndex.url()}>
                    <Button type="button" variant="outline">
                        Cancel
                    </Button>
                </Link>
            </div>
        </form>
    );
}

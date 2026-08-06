import { Link } from '@inertiajs/react';
import { ArrowLeft, Pencil } from 'lucide-react';

import type { FieldType, FormField } from '@/components/forms/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { index as formsIndex, edit as formsEdit } from '@/routes/forms';

type Form = {
    id: string;
    name: string;
    description: string;
    created_at: string;
    fields: FormField[];
};

const FIELD_TYPE_LABELS: Record<FieldType, string> = {
    text: 'Text',
    textarea: 'Textarea',
    number: 'Number',
    email: 'Email',
    select: 'Select',
    checkbox: 'Checkbox',
    radio: 'Radio',
    date: 'Date',
    datetime: 'Date & Time',
    time: 'Time',
    url: 'URL',
};

const formatDate = (date: string) =>
    new Date(date).toLocaleDateString('id-ID', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

export default function Show({ form }: { form: Form }) {
    return (
        <div className="container mx-auto p-4">
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight">{form.name}</h2>
                        <p className="text-muted-foreground">Created {formatDate(form.created_at)}</p>
                    </div>
                    <Link href={formsEdit.url({ id: form.id })}>
                        <Button>
                            <Pencil />
                            Edit Form
                        </Button>
                    </Link>
                </div>

                {form.description && <Card><CardContent>{form.description}</CardContent></Card>}

                <div className="space-y-3">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="text-base font-medium">Fields</h3>
                            <p className="text-sm text-muted-foreground">
                                {form.fields.length} field{form.fields.length === 1 ? '' : 's'}
                            </p>
                        </div>
                    </div>

                    {form.fields.length === 0 ? (
                        <Card>
                            <CardContent className="py-10 text-center text-sm text-muted-foreground">
                                No fields yet.
                            </CardContent>
                        </Card>
                    ) : (
                        form.fields.map((field, i) => (
                            <Card key={i} size="sm">
                                <CardHeader>
                                    <CardTitle className="text-sm">{field.label}</CardTitle>
                                    <CardDescription>
                                        Field {i + 1} · {FIELD_TYPE_LABELS[field.type]}
                                    </CardDescription>
                                    <CardAction>
                                        <Badge variant={field.is_required ? 'default' : 'secondary'}>
                                            {field.is_required ? 'Required' : 'Optional'}
                                        </Badge>
                                    </CardAction>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    <Separator />
                                    <div className="flex items-start justify-between gap-4">
                                        <span className="text-sm text-muted-foreground">Options</span>
                                        {field.options?.length ? (
                                            <div className="flex flex-wrap justify-end gap-1.5">
                                                {field.options.map((option, oi) => (
                                                    <Badge key={oi} variant="outline">
                                                        {option}
                                                    </Badge>
                                                ))}
                                            </div>
                                        ) : (
                                            <span className="text-sm text-muted-foreground">—</span>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        ))
                    )}
                </div>

                <div>
                    <Link href={formsIndex.url()}>
                        <Button variant="outline">
                            <ArrowLeft />
                            Back to Forms
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
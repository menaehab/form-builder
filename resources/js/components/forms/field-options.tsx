import { Trash2, Plus } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import InputError from '@/components/ui/input-error';

import type { FormErrors } from './types';

type Props = {
    fieldIndex: number;
    options: string[];
    errors: FormErrors;
    onAdd: () => void;
    onUpdate: (optionIndex: number, value: string) => void;
    onRemove: (optionIndex: number) => void;
};

export default function FieldOptions({ fieldIndex, options, errors, onAdd, onUpdate, onRemove }: Props) {
    return (
        <div className="space-y-2 border-t pt-4">
            <div className="flex items-center justify-between">
                <p className="text-sm font-medium">Options</p>
                <Button type="button" variant="outline" size="xs" onClick={onAdd}>
                    <Plus />
                    Add Option
                </Button>
            </div>

            <InputError message={errors[`fields.${fieldIndex}.options`]} />

            {options.length === 0 && (
                <p className="text-xs text-muted-foreground">
                    No options yet. Click "Add Option" to add choices.
                </p>
            )}

            <div className="space-y-2">
                {options.map((option, optionIndex) => (
                    <div key={optionIndex} className="flex items-center gap-2">
                        <Input
                            placeholder={`Option ${optionIndex + 1}`}
                            value={option}
                            onChange={(e) => onUpdate(optionIndex, e.target.value)}
                            aria-invalid={!!errors[`fields.${fieldIndex}.options.${optionIndex}`]}
                        />
                        <Button
                            type="button"
                            variant="ghost"
                            size="icon-sm"
                            onClick={() => onRemove(optionIndex)}
                            aria-label="Remove option"
                        >
                            <Trash2 className="text-destructive" />
                        </Button>
                    </div>
                ))}
            </div>
        </div>
    );
}

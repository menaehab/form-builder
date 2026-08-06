import FormForm from '@/components/forms/form-form';

export default function Create() {
    return (
        <div className="container mx-auto p-4">
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight">Forms</h2>
                        <p className="text-muted-foreground">Create Form</p>
                    </div>
                </div>
                <FormForm />
            </div>
        </div>
    );
}

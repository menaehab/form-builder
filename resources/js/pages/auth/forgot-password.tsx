import { Form, Head, Link, setLayoutProps } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import InputError from '@/components/ui/input-error';
import { Label } from '@/components/ui/label';
import { login } from '@/routes';
import { email } from '@/routes/password';

export default function ForgotPassword({ status }: { status?: string }) {
    setLayoutProps({
        title: 'Forgot password',
        description: 'Enter your email to receive a password reset link',
    });

    return (
        <>
            <Head title="Forgot password" />

            <div className="mx-auto my-8 w-full max-w-md space-y-6 rounded-xl border bg-card p-6 shadow-sm sm:p-8">
                <div className="flex flex-col space-y-1.5 text-center">
                    <h1 className="text-2xl font-semibold tracking-tight">
                        Forgot password
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        Enter your email to receive a password reset link
                    </p>
                </div>

                {status && (
                    <div className="text-center text-sm font-medium text-green-600">
                        {status}
                    </div>
                )}

                <Form {...email.form()} className="space-y-6">
                    {({ processing, errors }) => (
                        <>
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email address</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    name="email"
                                    autoComplete="off"
                                    autoFocus
                                    placeholder="email@example.com"
                                />

                                <InputError message={errors.email} />
                            </div>

                            <Button
                                className="w-full"
                                disabled={processing}
                                data-test="email-password-reset-link-button"
                            >
                                {processing && (
                                    <LoaderCircle className="h-4 w-4 animate-spin" />
                                )}
                                Email password reset link
                            </Button>
                        </>
                    )}
                </Form>

                <div className="space-x-1 text-center text-sm text-muted-foreground">
                    <span>Or, return to</span>
                    <Link href={login()} className="underline">
                        log in
                    </Link>
                </div>
            </div>
        </>
    );
}

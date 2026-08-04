import { Form, Head, Link, setLayoutProps } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import InputError from '@/components/ui/input-error';
import { Spinner } from '@/components/ui/spinner';
import { login } from '@/routes';
import { store } from '@/routes/register';

export default function Register() {
    setLayoutProps({
        title: 'Create an account',
        description: 'Enter your details below to create your account',
    });

    return (
        <>
            <Head title="Register" />

            <div className="mx-auto my-8 w-full max-w-md space-y-6 rounded-xl border bg-card p-6 shadow-sm sm:p-8">
                <div className="flex flex-col space-y-1.5 text-center">
                    <h1 className="text-2xl font-semibold tracking-tight">
                        Create an account
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        Enter your details below to create your account
                    </p>
                </div>

                <Form
                    {...store.form()}
                    resetOnSuccess={['password', 'password_confirmation']}
                    disableWhileProcessing
                    className="flex flex-col gap-6"
                >
                    {({ processing, errors }) => (
                        <>
                            <FieldGroup>
                                <Field>
                                    <FieldLabel htmlFor="name">Name</FieldLabel>
                                    <Input
                                        id="name"
                                        type="text"
                                        required
                                        autoFocus
                                        tabIndex={1}
                                        autoComplete="name"
                                        name="name"
                                        placeholder="Full name"
                                    />
                                    <InputError message={errors.name} />
                                </Field>

                                <Field>
                                    <FieldLabel htmlFor="email">
                                        Email address
                                    </FieldLabel>
                                    <Input
                                        id="email"
                                        type="email"
                                        required
                                        tabIndex={2}
                                        autoComplete="email"
                                        name="email"
                                        placeholder="email@example.com"
                                    />
                                    <InputError message={errors.email} />
                                </Field>

                                <Field>
                                    <FieldLabel htmlFor="password">
                                        Password
                                    </FieldLabel>
                                    <Input
                                        id="password"
                                        type="password"
                                        required
                                        tabIndex={3}
                                        autoComplete="new-password"
                                        name="password"
                                        placeholder="Password"
                                    />
                                    <InputError message={errors.password} />
                                </Field>

                                <Field>
                                    <FieldLabel htmlFor="password_confirmation">
                                        Confirm password
                                    </FieldLabel>
                                    <Input
                                        id="password_confirmation"
                                        type="password"
                                        required
                                        tabIndex={4}
                                        autoComplete="new-password"
                                        name="password_confirmation"
                                        placeholder="Confirm password"
                                    />
                                    <InputError
                                        message={errors.password_confirmation}
                                    />
                                </Field>

                                <Button
                                    type="submit"
                                    className="mt-2 w-full"
                                    tabIndex={5}
                                    disabled={processing}
                                    data-test="register-user-button"
                                >
                                    {processing && <Spinner />}
                                    Create account
                                </Button>
                            </FieldGroup>

                            <div className="text-center text-sm text-muted-foreground">
                                Already have an account?{' '}
                                <Link
                                    href={login()}
                                    tabIndex={6}
                                    className="underline"
                                >
                                    Log in
                                </Link>
                            </div>
                        </>
                    )}
                </Form>
            </div>
        </>
    );
}

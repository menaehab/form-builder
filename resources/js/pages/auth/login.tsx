import { Form, Head, Link, setLayoutProps } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import InputError from '@/components/ui/input-error';
import { Spinner } from '@/components/ui/spinner';
import { register } from '@/routes';
import { store } from '@/routes/login';

type Props = {
    status?: string;
    canResetPassword?: boolean;
};

export default function Login({ status }: Props) {
    setLayoutProps({
        title: 'Log in to your account',
        description: 'Enter your email and password below to log in',
    });

    return (
        <>
            <Head title="Log in" />

            <div className="mx-auto my-8 w-full max-w-md space-y-6 rounded-xl border bg-card p-6 shadow-sm sm:p-8">
                <div className="flex flex-col space-y-1.5 text-center">
                    <h1 className="text-2xl font-semibold tracking-tight">
                        Log in to your account
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        Enter your email and password below to log in
                    </p>
                </div>

                <Form
                    {...store.form()}
                    resetOnSuccess={['password']}
                    className="flex flex-col gap-6"
                >
                    {({ processing, errors }) => (
                        <>
                            <FieldGroup>
                                <Field>
                                    <FieldLabel htmlFor="email">
                                        Email address
                                    </FieldLabel>
                                    <Input
                                        id="email"
                                        type="email"
                                        name="email"
                                        required
                                        autoFocus
                                        tabIndex={1}
                                        autoComplete="email"
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
                                        name="password"
                                        required
                                        tabIndex={2}
                                        autoComplete="current-password"
                                        placeholder="Password"
                                    />
                                    <InputError message={errors.password} />
                                </Field>

                                <Field orientation="horizontal">
                                    <Checkbox
                                        id="remember"
                                        name="remember"
                                        tabIndex={3}
                                    />
                                    <FieldLabel
                                        htmlFor="remember"
                                        className="cursor-pointer font-normal"
                                    >
                                        Remember me
                                    </FieldLabel>
                                </Field>

                                <Button
                                    type="submit"
                                    className="mt-2 w-full"
                                    tabIndex={4}
                                    disabled={processing}
                                    data-test="login-button"
                                >
                                    {processing && <Spinner />}
                                    Log in
                                </Button>
                            </FieldGroup>

                            <div className="text-center text-sm text-muted-foreground">
                                Don't have an account?{' '}
                                <Link
                                    href={register()}
                                    tabIndex={5}
                                    className="underline"
                                >
                                    Sign up
                                </Link>
                            </div>
                        </>
                    )}
                </Form>

                {status && (
                    <div className="text-center text-sm font-medium text-green-600">
                        {status}
                    </div>
                )}
            </div>
        </>
    );
}

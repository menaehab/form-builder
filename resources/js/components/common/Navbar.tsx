import { Link, router, usePage } from '@inertiajs/react';
import { Blocks } from 'lucide-react';
import React from 'react';
import { Button, buttonVariants } from '@/components/ui/button';
import { logout } from '@/routes';

interface NavLink {
    name: string;
    href: string;
}

interface NavbarProps {
    domainName?: string;
    logo?: React.ReactNode;
    navLinks?: NavLink[];
    authLinks?: {
        login: { text: string; href: string };
        register: { text: string; href: string };
    };
    className?: string;
}

const Navbar = ({
    domainName = 'FormBuilder',
    logo = <Blocks size={26} />,
    navLinks = [
        // { name: 'Home', href: '/' },
        // { name: 'About Us', href: '#' },
        // { name: 'Contact Us', href: '#' },
    ],
    authLinks = {
        login: { text: 'Login', href: '/login' },
        register: { text: 'Register', href: '/register' },
    },
    className = '',
}: NavbarProps) => {
    const user = usePage<any>().props.auth?.user;

    const handleLogout = () => {
        router.post(logout());
    };

    return (
        <nav
            className={`flex items-center justify-between border-b px-6 py-4 ${className} sticky top-0 z-50`}
        >
            {/* Logo + Domain name */}
            <Link href="/" className="flex items-center gap-2">
                {logo}
                <h1 className="text-xl font-bold">{domainName}</h1>
            </Link>

            {/* Navigation Links */}
            <div className="flex items-center space-x-6 text-sm">
                <div className="hidden space-x-6 md:flex">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="font-medium text-muted-foreground transition-colors hover:text-foreground"
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>
            </div>

            {/* Auth Links */}
            <div className="flex items-center space-x-3">
                {!user ? (
                    <>
                        <Link
                            href={authLinks.login.href}
                            className={buttonVariants({
                                variant: 'outline',
                            })}
                        >
                            {authLinks.login.text}
                        </Link>

                        <Link
                            href={authLinks.register.href}
                            className={buttonVariants({
                                variant: 'default',
                            })}
                        >
                            {authLinks.register.text}
                        </Link>
                    </>
                ) : (
                    <Button
                        onClick={handleLogout}
                        className="cursor-pointer"
                        variant="default"
                    >
                        Logout
                    </Button>
                )}
            </div>
        </nav>
    );
};

export default Navbar;

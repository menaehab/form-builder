import React from 'react';
import Navbar from '@/components/common/navbar';

export default function AppLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex flex-1 flex-col" style={{
                backgroundImage: `
            linear-gradient(to right, rgb(39 39 42 / 0.2) 1px, transparent 1px),
            linear-gradient(to bottom, rgb(39 39 42 / 0.2) 1px, transparent 1px)
            `,
                backgroundSize: '40px 40px',
            }}>{children}</main>
        </div>
    );
}


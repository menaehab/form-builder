import React from 'react';
import Navbar from '@/components/common/Navbar';

export default function AppLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex min-h-screen flex-col bg-background">
            <Navbar />
            <main className="container mx-auto flex-1 px-4 py-6 sm:px-6 lg:px-8">
                {children}
            </main>
        </div>
    );
}

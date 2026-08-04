import React from 'react';
import { Button } from '@/components/ui/button';

export default function Hero() {
    return (
        <div
            className="flex flex-1 items-center justify-center px-4 py-12"
            style={{
                backgroundImage: `
            linear-gradient(to right, rgb(39 39 42 / 0.2) 1px, transparent 1px),
            linear-gradient(to bottom, rgb(39 39 42 / 0.2) 1px, transparent 1px)
            `,
                backgroundSize: '40px 40px',
            }}
        >
            <div className="text-center">
                <h1 className="pb-2 text-5xl font-bold text-foreground md:text-6xl">
                    Create forms that work the way you think
                </h1>
                <p className="mx-auto mt-4 max-w-2xl text-xl text-muted-foreground">
                    Build powerful, custom forms with ease. Drag, drop, and deploy in minutes.
                </p>
                <Button className="mt-6 cursor-pointer px-10 py-7 text-lg">
                    Get Started
                </Button>
            </div>
        </div>
    );
}

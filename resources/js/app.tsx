import { createInertiaApp } from '@inertiajs/react';
import { initializeTheme } from '@/hooks/use-appearance';
import AppLayout from '@/layouts/app-layout';
import DashboardLayout from '@/layouts/dashboard-layout';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => (title ? `${title} - ${appName}` : appName),
    layout: (name) => {
        const lowerName = name.toLowerCase();

        switch (true) {
            case lowerName === 'dashboard' || lowerName.startsWith('dashboard/'):
            case lowerName.startsWith('forms/'):
                return DashboardLayout;
            default:
                return AppLayout;
        }
    },
    strictMode: true,
    withApp(app) {
        return app;
    },
    progress: {
        color: '#000000',
    },
});

// This will set light / dark mode on load...
initializeTheme();

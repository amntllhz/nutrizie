import './bootstrap';
import { createInertiaApp } from '@inertiajs/react';
import { createRoot } from 'react-dom/client';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { Toaster } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';

createInertiaApp({
    title: (title) => `Nutrizie - ${title}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.jsx`,
            import.meta.glob('./Pages/**/*.jsx'),
        ),
    setup({ el, App, props }) {
        createRoot(el).render(
            <>
                <TooltipProvider>
                    <App {...props} />
                    <Toaster position="top-right" richColors />
                </TooltipProvider>
            </>);
    },
    progress: {
        color: '#00b4af',
    },
});
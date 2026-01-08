import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { ArrowRight, MessageSquare } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Messagerie',
        href: '/messages',
    },
];

export default function MessagesIndex({ contacts }: any) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Mes Messages" />

            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                {/* Header */}
                <div className="px-1">
                    <h1 className="text-2xl font-bold text-foreground">Messagerie</h1>
                    <p className="text-muted-foreground">Reprenez vos conversations là où vous les avez laissées.</p>
                </div>

                {/* Content Container */}
                <div className="flex-1 overflow-hidden rounded-xl border border-sidebar-border bg-sidebar dark:bg-sidebar/50 shadow-sm">
                    {contacts.length > 0 ? (
                        <div className="divide-y divide-sidebar-border">
                            {contacts.map((contact: any) => (
                                <div key={contact.id} className="p-4 flex items-center justify-between hover:bg-sidebar-accent/50 transition-colors">
                                    <div className="flex items-center gap-4">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 font-bold text-lg">
                                            {contact.name[0]}
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-foreground">{contact.name}</h3>
                                            <span className="inline-flex items-center rounded-full bg-zinc-100 px-2 py-0.5 text-xs font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400 capitalize">
                                                {contact.role}
                                            </span>
                                        </div>
                                    </div>
                                    <Link
                                        href={`/messages/${contact.id}`}
                                        className="flex items-center gap-2 rounded-md border border-input bg-background px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-all shadow-sm"
                                    >
                                        <MessageSquare className="h-4 w-4" />
                                        <span className="hidden sm:inline">Ouvrir le chat</span>
                                        <ArrowRight className="h-4 w-4" />
                                    </Link>
                                </div>
                            ))}
                        </div>
                    ) : (
                        /* Empty State */
                        <div className="flex flex-col items-center justify-center py-12 px-4 text-center h-full">
                            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-800 text-muted-foreground">
                                <MessageSquare className="h-8 w-8" />
                            </div>
                            <h3 className="text-lg font-medium text-foreground">Aucune conversation</h3>
                            <p className="max-w-sm text-muted-foreground mt-2">
                                Vous n'avez pas encore échangé de messages.
                            </p>
                            <Link
                                href="/"
                                className="mt-6 inline-flex items-center rounded-md bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90 shadow"
                            >
                                Explorer les services
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}

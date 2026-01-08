import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { Briefcase, MessageSquare, Search, ShieldCheck } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard'
    },
];

export default function Dashboard() {
    const { auth } = usePage().props as any;
    const role = auth.user.role;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Tableau de bord" />

            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">

                {/* Welcome Header */}
                <div className="mb-2 px-1">
                    <h1 className="text-2xl font-bold text-foreground">Bienvenue, {auth.user.name} !</h1>
                    <p className="text-muted-foreground">Voici un aperçu de vos activités sur la plateforme.</p>
                </div>

                {/* Grid Section */}
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">

                    {/* 1. MESSAGING - Visible to Everyone */}
                    <Link
                        href="/messages"
                        className="relative group overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border p-6 hover:border-blue-500 transition-all bg-sidebar dark:bg-sidebar/50"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-3 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-full">
                                <MessageSquare className="w-6 h-6" />
                            </div>
                        </div>
                        <h3 className="text-lg font-semibold text-foreground group-hover:text-blue-600 dark:group-hover:text-blue-400">Messagerie</h3>
                        <p className="text-muted-foreground text-sm mt-1">Consultez vos conversations.</p>
                    </Link>

                    {/* 2. FIND SERVICES - Visible to Demandeur & Retraite */}
                    <Link
                        href="/"
                        className="relative group overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border p-6 hover:border-zinc-500 transition-all bg-sidebar dark:bg-sidebar/50"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-3 bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 rounded-full">
                                <Search className="w-6 h-6" />
                            </div>
                        </div>
                        <h3 className="text-lg font-semibold text-foreground">Trouver un service</h3>
                        <p className="text-muted-foreground text-sm mt-1">Recherchez un expert.</p>
                    </Link>

                    {/* 3. RETIREE SPECIFIC - Manage Services */}
                    {role === 'retraite' && (
                        <Link
                            href="/my-services"
                            className="relative group overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border p-6 hover:border-green-500 transition-all bg-sidebar dark:bg-sidebar/50"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <div className="p-3 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 rounded-full">
                                    <Briefcase className="w-6 h-6" />
                                </div>
                            </div>
                            <h3 className="text-lg font-semibold text-foreground group-hover:text-green-600 dark:group-hover:text-green-400">Gérer mes services</h3>
                            <p className="text-muted-foreground text-sm mt-1">Gérez vos annonces.</p>
                        </Link>
                    )}

                    {/* 4. ADMIN SPECIFIC - Admin Panel */}
                    {role === 'admin' && (
                        <Link
                            href="/admin"
                            className="relative group overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border p-6 hover:border-red-500 transition-all bg-sidebar dark:bg-sidebar/50"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <div className="p-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-full">
                                    <ShieldCheck className="w-6 h-6" />
                                </div>
                            </div>
                            <h3 className="text-lg font-semibold text-foreground group-hover:text-red-600 dark:group-hover:text-red-400">Administration</h3>
                            <p className="text-muted-foreground text-sm mt-1">Modération et gestion.</p>
                        </Link>
                    )}
                </div>

            </div>
        </AppLayout>
    );
}

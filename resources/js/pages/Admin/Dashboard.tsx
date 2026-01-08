import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Briefcase, Users, ArrowRight, UserPlus, FileText } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Administration', href: '/admin' },
];

export default function AdminDashboard({ stats, recent }: any) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Admin Dashboard" />

            <div className="flex flex-col gap-6 p-4">
                <div className="px-1">
                    <h1 className="text-2xl font-bold text-foreground">Vue d'ensemble</h1>
                    <p className="text-muted-foreground">Statistiques et activités récentes.</p>
                </div>

                {/* --- STATS SECTION --- */}
                <div className="grid gap-4 md:grid-cols-2">
                    {/* User Stat Card */}
                    <div className="rounded-xl border border-sidebar-border bg-sidebar dark:bg-sidebar/50 p-6 shadow-sm">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400">
                                    <Users className="h-6 w-6" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">Utilisateurs</p>
                                    <h3 className="text-2xl font-bold text-foreground">{stats.total_users}</h3>
                                </div>
                            </div>
                            <Link href="/admin/users" className="text-sm font-medium text-blue-600 hover:underline flex items-center">
                                Gérer <ArrowRight className="ml-1 h-4 w-4" />
                            </Link>
                        </div>
                    </div>

                    {/* Service Stat Card */}
                    <div className="rounded-xl border border-sidebar-border bg-sidebar dark:bg-sidebar/50 p-6 shadow-sm">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400">
                                    <Briefcase className="h-6 w-6" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">Services</p>
                                    <h3 className="text-2xl font-bold text-foreground">{stats.total_services}</h3>
                                </div>
                            </div>
                            <Link href="/admin/services" className="text-sm font-medium text-green-600 hover:underline flex items-center">
                                Gérer <ArrowRight className="ml-1 h-4 w-4" />
                            </Link>
                        </div>
                    </div>
                </div>

                {/* --- RECENT ACTIVITY SECTION --- */}
                <div className="grid gap-6 md:grid-cols-2">

                    {/* Recent Users Column */}
                    <div className="rounded-xl border border-sidebar-border bg-sidebar dark:bg-sidebar/50 shadow-sm overflow-hidden">
                        <div className="p-4 border-b border-sidebar-border flex items-center gap-2">
                            <UserPlus className="h-4 w-4 text-muted-foreground" />
                            <h3 className="font-semibold text-foreground">Derniers Inscrits</h3>
                        </div>
                        <div className="divide-y divide-sidebar-border">
                            {recent.users.map((user: any) => (
                                <div key={user.id} className="p-4 flex items-center justify-between hover:bg-muted/50 transition-colors">
                                    <div className="flex items-center gap-3">
                                        <div className="h-8 w-8 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-xs font-bold text-zinc-500">
                                            {user.name[0]}
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-foreground">{user.name}</p>
                                            <p className="text-xs text-muted-foreground">{user.email}</p>
                                        </div>
                                    </div>
                                    <span className="text-xs text-muted-foreground">
                                        {new Date(user.created_at).toLocaleDateString()}
                                    </span>
                                </div>
                            ))}
                            {recent.users.length === 0 && <p className="p-4 text-sm text-muted-foreground text-center">Aucun inscrit.</p>}
                        </div>
                    </div>

                    {/* Recent Services Column */}
                    <div className="rounded-xl border border-sidebar-border bg-sidebar dark:bg-sidebar/50 shadow-sm overflow-hidden">
                        <div className="p-4 border-b border-sidebar-border flex items-center gap-2">
                            <FileText className="h-4 w-4 text-muted-foreground" />
                            <h3 className="font-semibold text-foreground">Derniers Services</h3>
                        </div>
                        <div className="divide-y divide-sidebar-border">
                            {recent.services.map((service: any) => (
                                <div key={service.id} className="p-4 flex items-center justify-between hover:bg-muted/50 transition-colors">
                                    <div className="flex items-center gap-3">
                                        <div className="h-8 w-8 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-xs font-bold text-blue-600 dark:text-blue-400">
                                            S
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-foreground line-clamp-1">{service.title}</p>
                                            <p className="text-xs text-muted-foreground">par {service.user.name}</p>
                                        </div>
                                    </div>
                                    <span className="text-xs font-medium text-green-600 dark:text-green-400 whitespace-nowrap ml-2">
                                        {service.price ? `${service.price}€` : 'Gratuit'}
                                    </span>
                                </div>
                            ))}
                            {recent.services.length === 0 && <p className="p-4 text-sm text-muted-foreground text-center">Aucun service.</p>}
                        </div>
                    </div>

                </div>
            </div>
        </AppLayout>
    );
}

import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';
import { Briefcase, Trash2, Users, ShieldAlert } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Administration',
        href: '/admin',
    },
];

export default function AdminIndex({ users, services, stats }: any) {

    const handleDeleteUser = (id: number) => {
        if (confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ? Cette action est irréversible.')) {
            router.delete(`/admin/users/${id}`);
        }
    };

    const handleDeleteService = (id: number) => {
        if (confirm('Supprimer ce service ?')) {
            router.delete(`/admin/services/${id}`);
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Administration" />

            <div className="flex h-full flex-1 flex-col gap-6 rounded-xl p-4">

                {/* Header */}
                <div className="px-1">
                    <h1 className="text-2xl font-bold text-foreground">Administration</h1>
                    <p className="text-muted-foreground">Gérez les utilisateurs et modérez le contenu de la plateforme.</p>
                </div>

                {/* Stats Cards */}
                <div className="grid gap-4 md:grid-cols-2">
                    <div className="rounded-xl border border-sidebar-border bg-sidebar dark:bg-sidebar/50 p-6 shadow-sm">
                        <div className="flex items-center gap-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400">
                                <Users className="h-6 w-6" />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Utilisateurs inscrits</p>
                                <h3 className="text-2xl font-bold text-foreground">{stats.total_users}</h3>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-xl border border-sidebar-border bg-sidebar dark:bg-sidebar/50 p-6 shadow-sm">
                        <div className="flex items-center gap-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400">
                                <Briefcase className="h-6 w-6" />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Services actifs</p>
                                <h3 className="text-2xl font-bold text-foreground">{stats.total_services}</h3>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Users Management Section */}
                <div className="space-y-4">
                    <h2 className="text-lg font-semibold text-foreground px-1">Gestion des Utilisateurs</h2>
                    <div className="overflow-hidden rounded-xl border border-sidebar-border bg-sidebar dark:bg-sidebar/50 shadow-sm">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm">
                                <thead className="bg-muted/50 border-b border-sidebar-border text-muted-foreground">
                                <tr>
                                    <th className="px-6 py-3 font-medium">Nom</th>
                                    <th className="px-6 py-3 font-medium">Email</th>
                                    <th className="px-6 py-3 font-medium">Rôle</th>
                                    <th className="px-6 py-3 font-medium text-right">Actions</th>
                                </tr>
                                </thead>
                                <tbody className="divide-y divide-sidebar-border">
                                {users.map((u: any) => (
                                    <tr key={u.id} className="hover:bg-muted/50 transition-colors">
                                        <td className="px-6 py-4 font-medium text-foreground">{u.name}</td>
                                        <td className="px-6 py-4 text-muted-foreground">{u.email}</td>
                                        <td className="px-6 py-4">
                                                <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${
                                                    u.role === 'admin'
                                                        ? 'bg-red-50 text-red-700 ring-red-600/10 dark:bg-red-900/20 dark:text-red-400 dark:ring-red-900/50'
                                                        : u.role === 'retraite'
                                                            ? 'bg-green-50 text-green-700 ring-green-600/20 dark:bg-green-900/20 dark:text-green-400 dark:ring-green-900/50'
                                                            : 'bg-zinc-50 text-zinc-700 ring-zinc-600/20 dark:bg-zinc-800 dark:text-zinc-400 dark:ring-zinc-700/50'
                                                }`}>
                                                    {u.role.charAt(0).toUpperCase() + u.role.slice(1)}
                                                </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            {u.role !== 'admin' ? (
                                                <button
                                                    onClick={() => handleDeleteUser(u.id)}
                                                    className="inline-flex items-center justify-center rounded-md p-2 text-destructive hover:bg-destructive/10 transition-colors"
                                                    title="Supprimer l'utilisateur"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </button>
                                            ) : (
                                                <span className="text-muted-foreground text-xs italic pr-2">Admin</span>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Services Management Section */}
                <div className="space-y-4">
                    <h2 className="text-lg font-semibold text-foreground px-1">Modération des Services</h2>
                    <div className="overflow-hidden rounded-xl border border-sidebar-border bg-sidebar dark:bg-sidebar/50 shadow-sm">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm">
                                <thead className="bg-muted/50 border-b border-sidebar-border text-muted-foreground">
                                <tr>
                                    <th className="px-6 py-3 font-medium">Titre</th>
                                    <th className="px-6 py-3 font-medium">Propriétaire</th>
                                    <th className="px-6 py-3 font-medium">Prix</th>
                                    <th className="px-6 py-3 font-medium text-right">Actions</th>
                                </tr>
                                </thead>
                                <tbody className="divide-y divide-sidebar-border">
                                {services.map((s: any) => (
                                    <tr key={s.id} className="hover:bg-muted/50 transition-colors">
                                        <td className="px-6 py-4 font-medium text-foreground max-w-[200px] truncate" title={s.title}>{s.title}</td>
                                        <td className="px-6 py-4 text-muted-foreground">{s.user?.name || 'Inconnu'}</td>
                                        <td className="px-6 py-4 text-muted-foreground">
                                            {s.price ? `${s.price}€` : 'Gratuit'}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button
                                                onClick={() => handleDeleteService(s.id)}
                                                className="inline-flex items-center justify-center rounded-md p-2 text-destructive hover:bg-destructive/10 transition-colors"
                                                title="Supprimer le service"
                                            >
                                                <ShieldAlert className="h-4 w-4" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                {services.length === 0 && (
                                    <tr>
                                        <td colSpan={4} className="px-6 py-8 text-center text-muted-foreground">
                                            Aucun service à modérer.
                                        </td>
                                    </tr>
                                )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

            </div>
        </AppLayout>
    );
}

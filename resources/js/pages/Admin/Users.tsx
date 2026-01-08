import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';
import { Trash2, Shield } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Admin', href: '/admin' },
    { title: 'Utilisateurs', href: '/admin/users' },
];

export default function AdminUsers({ users }: any) {
    const handleDeleteUser = (id: number) => {
        if (confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
            router.delete(`/admin/users/${id}`);
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Gestion Utilisateurs" />
            <div className="flex flex-col gap-6 p-4">
                <div className="px-1">
                    <h1 className="text-2xl font-bold text-foreground">Gestion des Utilisateurs</h1>
                    <p className="text-muted-foreground">Consultez et modérez les comptes inscrits.</p>
                </div>

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
                                                u.role === 'admin' ? 'bg-red-50 text-red-700 ring-red-600/10' :
                                                    u.role === 'retraite' ? 'bg-green-50 text-green-700 ring-green-600/20' :
                                                        'bg-zinc-50 text-zinc-700 ring-zinc-600/20'
                                            }`}>
                                                {u.role}
                                            </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        {u.role !== 'admin' ? (
                                            <button onClick={() => handleDeleteUser(u.id)} className="text-destructive hover:bg-destructive/10 p-2 rounded transition-colors">
                                                <Trash2 className="h-4 w-4" />
                                            </button>
                                        ) : <Shield className="h-4 w-4 text-muted-foreground inline" />}
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}

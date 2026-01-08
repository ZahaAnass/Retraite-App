import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';
import { Trash2 } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Admin', href: '/admin' },
    { title: 'Services', href: '/admin/services' },
];

export default function AdminServices({ services }: any) {
    const handleDeleteService = (id: number) => {
        if (confirm('Supprimer ce service ?')) {
            router.delete(`/admin/services/${id}`);
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Gestion Services" />
            <div className="flex flex-col gap-6 p-4">
                <div className="px-1">
                    <h1 className="text-2xl font-bold text-foreground">Modération des Services</h1>
                    <p className="text-muted-foreground">Gérez les annonces publiées par les retraités.</p>
                </div>

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
                                    <td className="px-6 py-4 font-medium text-foreground">{s.title}</td>
                                    <td className="px-6 py-4 text-muted-foreground">{s.user?.name}</td>
                                    <td className="px-6 py-4 text-muted-foreground">{s.price ? `${s.price}€` : 'Gratuit'}</td>
                                    <td className="px-6 py-4 text-right">
                                        <button onClick={() => handleDeleteService(s.id)} className="text-destructive hover:bg-destructive/10 p-2 rounded transition-colors">
                                            <Trash2 className="h-4 w-4" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {services.length === 0 && (
                                <tr><td colSpan={4} className="p-6 text-center text-muted-foreground">Aucun service.</td></tr>
                            )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}

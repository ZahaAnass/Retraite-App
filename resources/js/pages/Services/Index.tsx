import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { Plus, Trash2 } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Mes Services',
        href: '/services/mine',
    },
];

export default function ServicesIndex({ services }: any) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Mes Services" />

            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                {/* Header Section */}
                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center px-1">
                    <div>
                        <h1 className="text-2xl font-bold text-foreground">Mes Services</h1>
                        <p className="text-muted-foreground">Gérez les offres que vous proposez aux particuliers.</p>
                    </div>
                    <Link
                        href="/services/create"
                        className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                    >
                        <Plus className="mr-2 h-4 w-4" /> Créer un service
                    </Link>
                </div>

                {/* Table Container */}
                <div className="overflow-hidden rounded-xl border border-sidebar-border bg-sidebar dark:bg-sidebar/50 shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-muted/50 border-b border-sidebar-border text-muted-foreground">
                            <tr>
                                <th className="px-6 py-3 font-medium">Titre</th>
                                <th className="px-6 py-3 font-medium">Prix</th>
                                <th className="px-6 py-3 font-medium">Date de création</th>
                                <th className="px-6 py-3 font-medium text-right">Actions</th>
                            </tr>
                            </thead>
                            <tbody className="divide-y divide-sidebar-border">
                            {services.map((service: any) => (
                                <tr key={service.id} className="hover:bg-muted/50 transition-colors">
                                    <td className="px-6 py-4 font-medium text-foreground">{service.title}</td>
                                    <td className="px-6 py-4 text-muted-foreground">
                                        {service.price ? (
                                            <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20 dark:bg-green-900/20 dark:text-green-400 dark:ring-green-900/50">
                                                    {service.price}€
                                                </span>
                                        ) : (
                                            <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10 dark:bg-blue-900/20 dark:text-blue-400 dark:ring-blue-900/50">
                                                    Gratuit
                                                </span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 text-muted-foreground">
                                        {new Date(service.created_at).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button
                                            onClick={() => {
                                                if (confirm('Êtes-vous sûr de vouloir supprimer ce service ?')) {
                                                    router.delete(`/services/${service.id}`);
                                                }
                                            }}
                                            className="inline-flex items-center justify-center rounded-md p-2 text-destructive hover:bg-destructive/10 transition-colors"
                                            title="Supprimer"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {services.length === 0 && (
                                <tr>
                                    <td colSpan={4} className="px-6 py-12 text-center text-muted-foreground">
                                        Aucun service publié pour le moment.
                                    </td>
                                </tr>
                            )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}

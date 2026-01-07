import DashboardLayout from '@/layouts/DashboardLayout';
import { Head, Link, router } from '@inertiajs/react';
import { Plus, Trash2 } from 'lucide-react';

export default function ServicesIndex({ services }: any) {
    return (
        <DashboardLayout>
            <Head title="Mes Services" />

            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-zinc-900">Mes Services</h1>
                    <p className="text-zinc-500">Gérez les offres que vous proposez aux particuliers.</p>
                </div>
                <Link href={route('services.create')} className="bg-zinc-900 text-white px-4 py-2 rounded-md text-sm font-medium flex items-center hover:bg-zinc-800">
                    <Plus className="w-4 h-4 mr-2" /> Créer un service
                </Link>
            </div>

            <div className="bg-white border border-zinc-200 rounded-lg overflow-hidden shadow-sm">
                <table className="w-full text-left text-sm">
                    <thead className="bg-zinc-50 border-b border-zinc-200">
                    <tr>
                        <th className="px-6 py-3 font-medium text-zinc-700">Titre</th>
                        <th className="px-6 py-3 font-medium text-zinc-700">Prix</th>
                        <th className="px-6 py-3 font-medium text-zinc-700">Date de création</th>
                        <th className="px-6 py-3 font-medium text-zinc-700 text-right">Actions</th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-100">
                    {services.map((service: any) => (
                        <tr key={service.id} className="hover:bg-zinc-50">
                            <td className="px-6 py-4 font-medium text-zinc-900">{service.title}</td>
                            <td className="px-6 py-4 text-zinc-600">{service.price ? `${service.price}€` : 'Gratuit'}</td>
                            <td className="px-6 py-4 text-zinc-500">{new Date(service.created_at).toLocaleDateString()}</td>
                            <td className="px-6 py-4 text-right">
                                <button
                                    onClick={() => confirm('Supprimer ce service ?') && router.delete(route('services.destroy', service.id))}
                                    className="text-red-600 hover:text-red-700 bg-red-50 p-2 rounded-md transition-colors"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </td>
                        </tr>
                    ))}
                    {services.length === 0 && (
                        <tr>
                            <td colSpan={4} className="px-6 py-12 text-center text-zinc-500">
                                Aucun service publié pour le moment.
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
        </DashboardLayout>
    );
}

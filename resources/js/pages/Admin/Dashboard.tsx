import DashboardLayout from '@/layouts/DashboardLayout';
import { Head, router } from '@inertiajs/react';
import { Trash2, Users, Briefcase } from 'lucide-react';

export default function AdminDashboard({ users, services, stats }: any) {
    const handleDeleteUser = (id: number) => {
        if(confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) router.delete(route('admin.deleteUser', id));
    };

    return (
        <DashboardLayout>
            <Head title="Administration" />

            <h1 className="text-2xl font-bold text-zinc-900 mb-6">Vue d'ensemble</h1>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-white p-6 rounded-lg border border-zinc-200 shadow-sm flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium text-zinc-500">Utilisateurs inscrits</p>
                        <p className="text-3xl font-bold text-zinc-900 mt-1">{stats.total_users}</p>
                    </div>
                    <div className="p-3 bg-blue-50 rounded-full text-blue-600"><Users className="w-6 h-6" /></div>
                </div>
                <div className="bg-white p-6 rounded-lg border border-zinc-200 shadow-sm flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium text-zinc-500">Services actifs</p>
                        <p className="text-3xl font-bold text-zinc-900 mt-1">{stats.total_services}</p>
                    </div>
                    <div className="p-3 bg-green-50 rounded-full text-green-600"><Briefcase className="w-6 h-6" /></div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Users Table */}
                <div className="bg-white border border-zinc-200 rounded-lg overflow-hidden shadow-sm">
                    <div className="px-6 py-4 border-b border-zinc-200 font-bold text-zinc-900">Utilisateurs récents</div>
                    <table className="w-full text-left text-sm">
                        <tbody className="divide-y divide-zinc-100">
                        {users.map((u: any) => (
                            <tr key={u.id} className="hover:bg-zinc-50">
                                <td className="px-6 py-3 font-medium">{u.name}</td>
                                <td className="px-6 py-3"><span className="px-2 py-1 rounded-full text-xs font-medium bg-zinc-100 border border-zinc-200">{u.role}</span></td>
                                <td className="px-6 py-3 text-right">
                                    {u.role !== 'admin' && (
                                        <button onClick={() => handleDeleteUser(u.id)} className="text-red-600 hover:bg-red-50 p-1.5 rounded">
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>

                {/* Services Table */}
                <div className="bg-white border border-zinc-200 rounded-lg overflow-hidden shadow-sm">
                    <div className="px-6 py-4 border-b border-zinc-200 font-bold text-zinc-900">Derniers Services</div>
                    <table className="w-full text-left text-sm">
                        <tbody className="divide-y divide-zinc-100">
                        {services.map((s: any) => (
                            <tr key={s.id} className="hover:bg-zinc-50">
                                <td className="px-6 py-3 font-medium truncate max-w-[150px]">{s.title}</td>
                                <td className="px-6 py-3 text-zinc-500">{s.user.name}</td>
                                <td className="px-6 py-3 text-right">
                                    <button onClick={() => router.delete(route('admin.deleteService', s.id))} className="text-red-600 hover:bg-red-50 p-1.5 rounded">
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </DashboardLayout>
    );
}

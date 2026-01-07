import DashboardLayout from '@/layouts/DashboardLayout';
import { Head, Link, usePage } from '@inertiajs/react';
import { Briefcase, MessageSquare, Search, ShieldCheck } from 'lucide-react';

export default function Dashboard() {
    const { auth } = usePage().props as any;
    const role = auth.user.role;

    return (
        <DashboardLayout>
            <Head title="Tableau de bord" />

            <div className="mb-8">
                <h1 className="text-2xl font-bold text-zinc-900">Bienvenue, {auth.user.name} !</h1>
                <p className="text-zinc-500">Voici un aperçu de vos activités sur la plateforme.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                {/* 1. MESSAGING - Visible to Everyone */}
                <Link href={`/messages`}
                    className="group block bg-white border border-zinc-200 p-6 rounded-lg shadow-sm hover:border-blue-500 transition-all">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-3 bg-blue-50 text-blue-600 rounded-full">
                            <MessageSquare className="w-6 h-6" />
                        </div>
                    </div>
                    <h3 className="text-lg font-semibold text-zinc-900 group-hover:text-blue-600">Messagerie</h3>
                    <p className="text-zinc-500 text-sm mt-1">Consultez vos conversations et répondez aux messages.</p>
                </Link>

                {/* 2. FIND SERVICES - Visible to Demandeur & Retraite */}
                <Link href="/" className="group block bg-white border border-zinc-200 p-6 rounded-lg shadow-sm hover:border-zinc-900 transition-all">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-3 bg-zinc-100 text-zinc-900 rounded-full">
                            <Search className="w-6 h-6" />
                        </div>
                    </div>
                    <h3 className="text-lg font-semibold text-zinc-900">Trouver un service</h3>
                    <p className="text-zinc-500 text-sm mt-1">Recherchez un expert ou un service particulier.</p>
                </Link>

                {/* 3. RETIREE SPECIFIC - Manage Services */}
                {role === 'retraite' && (
                    <Link href={`/services/mine`} className="group block bg-white border border-zinc-200 p-6 rounded-lg shadow-sm hover:border-green-500 transition-all">
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-3 bg-green-50 text-green-600 rounded-full">
                                <Briefcase className="w-6 h-6" />
                            </div>
                        </div>
                        <h3 className="text-lg font-semibold text-zinc-900 group-hover:text-green-600">Gérer mes services</h3>
                        <p className="text-zinc-500 text-sm mt-1">Ajoutez, modifiez ou supprimez vos annonces.</p>
                    </Link>
                )}

                {/* 4. ADMIN SPECIFIC - Admin Panel */}
                {role === 'admin' && (
                    <Link href={`/admin/index`} className="group block bg-white border border-zinc-200 p-6 rounded-lg shadow-sm hover:border-red-500 transition-all">
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-3 bg-red-50 text-red-600 rounded-full">
                                <ShieldCheck className="w-6 h-6" />
                            </div>
                        </div>
                        <h3 className="text-lg font-semibold text-zinc-900 group-hover:text-red-600">Administration</h3>
                        <p className="text-zinc-500 text-sm mt-1">Gérer les utilisateurs et modérer le contenu.</p>
                    </Link>
                )}
            </div>
        </DashboardLayout>
    );
}

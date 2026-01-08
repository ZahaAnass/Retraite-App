import { ThemeToggle } from '@/components/theme-toggle';
import { Link, Head } from '@inertiajs/react';
import { ArrowLeft, MessageSquare, CheckCircle, Briefcase } from 'lucide-react';

type ServiceShowProps = {
    service: {
        id: number;
        title: string;
        description: string;
        price: number | null;
        created_at: string;
        user: {
            id: number;
            name: string;
            bio: string | null;
            role: string;
        };
    };
    auth: {
        user: {
            id: number;
            name: string;
            role: string;
        } | null;
    };
};

export default function Show({ service, auth }: ServiceShowProps) {
    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 font-sans text-zinc-900 dark:text-zinc-100 transition-colors duration-300">
            <Head title={service.title} />

            {/* Reused Public Navbar */}
            <nav className="bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 px-6 h-16 flex items-center justify-between sticky top-0 z-10 transition-colors duration-300">
                <Link href="/" className="flex items-center gap-2 text-xl font-bold">
                    <div className="bg-blue-600 p-1.5 rounded-lg">
                        <Briefcase className="w-5 h-5 text-white" />
                    </div>
                    <span>Retraite<span className="text-blue-600 dark:text-blue-500">Pro</span></span>
                </Link>
                <div className="flex items-center gap-4">
                    <ThemeToggle />
                    {auth.user ? (
                        <Link href="/dashboard" className="text-sm font-medium bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 px-4 py-2 rounded-md hover:opacity-90 transition-opacity">
                            Tableau de bord
                        </Link>
                    ) : (
                        <Link href={'/login'} className="text-sm font-medium bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 px-4 py-2 rounded-md hover:opacity-90 transition-opacity">
                            Connexion
                        </Link>
                    )}
                </div>
            </nav>

            {/* Main Content */}
            <div className="max-w-3xl mx-auto py-12 px-4 sm:px-6">
                <Link href="/" className="inline-flex items-center text-sm text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 mb-6 transition-colors">
                    <ArrowLeft className="w-4 h-4 mr-1" /> Retour aux services
                </Link>

                <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-sm overflow-hidden transition-colors duration-300">
                    <div className="p-8">

                        {/* Header */}
                        <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-8">
                            <div>
                                <h1 className="text-3xl font-bold text-zinc-900 dark:text-white mb-3">{service.title}</h1>
                                <div className="flex items-center gap-3 text-zinc-500 dark:text-zinc-400">
                                    <div className="h-8 w-8 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center font-bold text-xs uppercase">
                                        {service.user.name[0]}
                                    </div>
                                    <div className="text-sm">
                                        Proposé par <span className="font-semibold text-zinc-900 dark:text-zinc-200">{service.user.name}</span>
                                    </div>
                                </div>
                            </div>
                            <span className="px-4 py-2 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 rounded-md font-bold shadow-sm whitespace-nowrap">
                                {service.price ? `${service.price}€` : 'Gratuit'}
                            </span>
                        </div>

                        {/* Description */}
                        <div className="prose prose-zinc dark:prose-invert max-w-none mb-10 leading-relaxed text-zinc-600 dark:text-zinc-300">
                            <p className="whitespace-pre-wrap">{service.description}</p>
                        </div>

                        {/* Bio Section (if exists) */}
                        {service.user.bio && (
                            <div className="mb-8 p-4 bg-zinc-50 dark:bg-zinc-800/50 rounded-lg border border-zinc-100 dark:border-zinc-800">
                                <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 mb-1">À propos de {service.user.name}</h4>
                                <p className="text-sm text-zinc-600 dark:text-zinc-400 italic">"{service.user.bio}"</p>
                            </div>
                        )}

                        {/* CTA / Contact Box */}
                        <div className="bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/30 rounded-lg p-6 flex flex-col sm:flex-row items-center justify-between gap-6 transition-colors">
                            <div className="flex items-start gap-4">
                                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-full text-blue-600 dark:text-blue-400">
                                    <CheckCircle className="w-6 h-6 flex-shrink-0" />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-blue-900 dark:text-blue-100 text-lg">Intéressé par ce service ?</h4>
                                    <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">
                                        Contactez {service.user.name} directement pour convenir d'un rendez-vous.
                                    </p>
                                </div>
                            </div>

                            {auth.user ? (
                                // Prevent messaging yourself
                                auth.user.id !== service.user.id ? (
                                    <Link
                                        href={`/messages/${service.user.id}`}
                                        className="w-full sm:w-auto text-center bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500 text-white px-6 py-3 rounded-lg font-medium inline-flex items-center justify-center shadow-sm transition-all"
                                    >
                                        <MessageSquare className="w-4 h-4 mr-2" /> Contacter
                                    </Link>
                                ) : (
                                    <span className="text-sm text-zinc-400 italic">C'est votre service</span>
                                )
                            ) : (
                                <Link href={'/login'} className="w-full sm:w-auto text-center text-blue-700 dark:text-blue-300 underline text-sm font-medium hover:text-blue-800 dark:hover:text-blue-200">
                                    Connectez-vous pour contacter
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

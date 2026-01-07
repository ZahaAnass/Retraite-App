import { Link, Head } from '@inertiajs/react';
import { ArrowLeft, MessageSquare, CheckCircle } from 'lucide-react';

type ServiceShowProps = {
    service: {
        id: number;
        title: string;
        description: string;
        price: number | null;
        user: {
            id: number;
            name: string;
            bio: string | null;
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
        <div className="min-h-screen bg-zinc-50 py-12 px-4 sm:px-6">
            <Head title={service.title} />

            <div className="max-w-3xl mx-auto">
                <Link href="/" className="inline-flex items-center text-sm text-zinc-500 hover:text-zinc-900 mb-6">
                    <ArrowLeft className="w-4 h-4 mr-1" /> Retour aux services
                </Link>

                <div className="bg-white border border-zinc-200 rounded-xl shadow-sm overflow-hidden">
                    <div className="p-8">
                        <div className="flex justify-between items-start mb-6">
                            <div>
                                <h1 className="text-3xl font-bold text-zinc-900 mb-2">{service.title}</h1>
                                <div className="flex items-center gap-2 text-zinc-500">
                                    <span>Proposé par <span className="font-medium text-zinc-900">{service.user.name}</span></span>
                                    {service.user.bio && <span className="w-1 h-1 bg-zinc-300 rounded-full"></span>}
                                    {service.user.bio && <span className="text-xs truncate max-w-[200px]">{service.user.bio}</span>}
                                </div>
                            </div>
                            <span className="px-4 py-2 bg-zinc-900 text-white rounded-md font-bold">
                                {service.price ? `${service.price}€` : 'Gratuit'}
                            </span>
                        </div>

                        <div className="prose prose-zinc max-w-none mb-8 text-zinc-600 leading-relaxed">
                            {service.description}
                        </div>

                        <div className="bg-blue-50 border border-blue-100 rounded-lg p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                            <div className="flex items-start gap-3">
                                <CheckCircle className="w-6 h-6 text-blue-600 flex-shrink-0" />
                                <div>
                                    <h4 className="font-semibold text-blue-900">Intéressé par ce service ?</h4>
                                    <p className="text-sm text-blue-700">Contactez {service.user.name} directement via notre messagerie sécurisée.</p>
                                </div>
                            </div>
                            {auth.user ? (
                                <Link
                                    href={`/messages/${service.user.id}`}
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-md font-medium inline-flex items-center shadow-sm transition-colors"
                                >
                                    <MessageSquare className="w-4 h-4 mr-2" /> Contacter
                                </Link>
                            ) : (
                                <Link href={'login'} className="text-blue-700 underline text-sm font-medium">Connectez-vous pour contacter</Link>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

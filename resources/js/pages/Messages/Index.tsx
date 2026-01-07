import DashboardLayout from '@/layouts/DashboardLayout';
import { Head, Link } from '@inertiajs/react';
import { MessageSquare, ArrowRight } from 'lucide-react';

export default function MessagesIndex({ contacts }: any) {
    return (
        <DashboardLayout>
            <Head title="Mes Messages" />

            <div className="mb-6">
                <h1 className="text-2xl font-bold text-zinc-900">Messagerie</h1>
                <p className="text-zinc-500">Reprenez vos conversations là où vous les avez laissées.</p>
            </div>

            <div className="bg-white border border-zinc-200 rounded-lg shadow-sm overflow-hidden">
                {contacts.length > 0 ? (
                    <div className="divide-y divide-zinc-100">
                        {contacts.map((contact: any) => (
                            <div key={contact.id} className="p-4 flex items-center justify-between hover:bg-zinc-50 transition-colors">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-lg">
                                        {contact.name[0]}
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-zinc-900">{contact.name}</h3>
                                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-zinc-100 text-zinc-600 capitalize">
                                            {contact.role}
                                        </span>
                                    </div>
                                </div>
                                <Link
                                    href={`/messages/${contact.id}`}
                                    className="flex items-center gap-2 bg-white border border-zinc-200 text-zinc-700 px-4 py-2 rounded-md hover:bg-zinc-50 hover:text-blue-600 hover:border-blue-200 transition-all text-sm font-medium"
                                >
                                    <MessageSquare className="w-4 h-4" />
                                    Ouvrir le chat
                                    <ArrowRight className="w-4 h-4" />
                                </Link>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12 px-4">
                        <div className="bg-zinc-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-zinc-400">
                            <MessageSquare className="w-8 h-8" />
                        </div>
                        <h3 className="text-lg font-medium text-zinc-900">Aucune conversation</h3>
                        <p className="text-zinc-500 max-w-sm mx-auto mt-2">
                            Vous n'avez pas encore échangé de messages. Allez sur un service pour contacter un retraité.
                        </p>
                        <Link
                            href="/"
                            className="mt-6 inline-flex items-center bg-zinc-900 text-white px-4 py-2 rounded-md hover:bg-zinc-800"
                        >
                            Explorer les services
                        </Link>
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
}

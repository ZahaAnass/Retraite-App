import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head, useForm, Link, router } from '@inertiajs/react';
import { FormEventHandler } from 'react';

export default function Create({ auth }: any) {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        description: '',
        price: ''
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(router('services.store'));
    };

    return (
        <DashboardLayout>
            <Head title="Créer un service" />

            <div className="max-w-2xl mx-auto">
                <div className="mb-6">
                    <Link href={route('services.mine')} className="text-sm text-zinc-500 hover:text-zinc-900 mb-2 inline-block">
                        &larr; Retour à mes services
                    </Link>
                    <h1 className="text-2xl font-bold text-zinc-900">Proposer un nouveau service</h1>
                    <p className="text-zinc-500">Partagez vos compétences avec la communauté.</p>
                </div>

                <div className="bg-white p-8 rounded-lg border border-zinc-200 shadow-sm">
                    <form onSubmit={submit} className="space-y-6">
                        {/* Title Input */}
                        <div>
                            <label className="block text-sm font-medium text-zinc-700 mb-1">
                                Titre du service <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                value={data.title}
                                onChange={(e) => setData('title', e.target.value)}
                                className="w-full rounded-md border-zinc-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                placeholder="Ex: Cours de soutien Maths, Jardinage..."
                            />
                            {errors.title && <div className="text-red-500 text-sm mt-1">{errors.title}</div>}
                        </div>

                        {/* Description Input */}
                        <div>
                            <label className="block text-sm font-medium text-zinc-700 mb-1">
                                Description détaillée <span className="text-red-500">*</span>
                            </label>
                            <textarea
                                value={data.description}
                                onChange={(e) => setData('description', e.target.value)}
                                rows={5}
                                className="w-full rounded-md border-zinc-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                placeholder="Décrivez votre expérience, vos disponibilités et ce que vous proposez..."
                            />
                            {errors.description && <div className="text-red-500 text-sm mt-1">{errors.description}</div>}
                        </div>

                        {/* Price Input */}
                        <div>
                            <label className="block text-sm font-medium text-zinc-700 mb-1">
                                Tarif (€)
                            </label>
                            <div className="relative">
                                <input
                                    type="number"
                                    value={data.price}
                                    onChange={(e) => setData('price', e.target.value)}
                                    className="w-full rounded-md border-zinc-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 pl-4"
                                    placeholder="0"
                                />
                                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                    <span className="text-zinc-500 sm:text-sm">EUR</span>
                                </div>
                            </div>
                            <p className="text-xs text-zinc-500 mt-1">Laissez vide ou mettez 0 pour un service gratuit.</p>
                            {errors.price && <div className="text-red-500 text-sm mt-1">{errors.price}</div>}
                        </div>

                        {/* Actions */}
                        <div className="flex items-center justify-end gap-4 pt-4 border-t border-zinc-100">
                            <Link href={route('services.mine')} className="text-sm font-medium text-zinc-600 hover:text-zinc-900 px-4 py-2">
                                Annuler
                            </Link>
                            <button
                                type="submit"
                                disabled={processing}
                                className="bg-zinc-900 text-white px-6 py-2 rounded-md font-medium hover:bg-zinc-800 disabled:opacity-50 transition-colors"
                            >
                                {processing ? 'Publication...' : 'Publier le service'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </DashboardLayout>
    );
}

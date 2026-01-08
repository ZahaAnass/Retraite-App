import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm, Link } from '@inertiajs/react';
import { FormEventHandler } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Mes Services',
        href: '/services/mine',
    },
    {
        title: 'Créer',
        href: '/services/create',
    },
];

export default function Create({ auth }: any) {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        description: '',
        price: ''
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        // Updated to use direct URL instead of route() helper
        post('/services');
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Créer un service" />

            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">

                {/* Header Section */}
                <div className="px-1">
                    <Link
                        href="/services/mine"
                        className="mb-2 inline-flex text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                        &larr; Retour à mes services
                    </Link>
                    <h1 className="text-2xl font-bold text-foreground">Proposer un nouveau service</h1>
                    <p className="text-muted-foreground">Partagez vos compétences avec la communauté.</p>
                </div>

                {/* Form Card */}
                <div className="max-w-2xl rounded-xl border border-sidebar-border bg-sidebar dark:bg-sidebar/50 shadow-sm p-6 md:p-8">
                    <form onSubmit={submit} className="space-y-6">

                        {/* Title Input */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                Titre du service <span className="text-destructive">*</span>
                            </label>
                            <input
                                type="text"
                                value={data.title}
                                onChange={(e) => setData('title', e.target.value)}
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                placeholder="Ex: Cours de soutien Maths, Jardinage..."
                            />
                            {errors.title && <p className="text-sm font-medium text-destructive">{errors.title}</p>}
                        </div>

                        {/* Description Input */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                Description détaillée <span className="text-destructive">*</span>
                            </label>
                            <textarea
                                value={data.description}
                                onChange={(e) => setData('description', e.target.value)}
                                rows={5}
                                className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                placeholder="Décrivez votre expérience, vos disponibilités et ce que vous proposez..."
                            />
                            {errors.description && <p className="text-sm font-medium text-destructive">{errors.description}</p>}
                        </div>

                        {/* Price Input */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                Tarif (€)
                            </label>
                            <div className="relative">
                                <input
                                    type="number"
                                    value={data.price}
                                    onChange={(e) => setData('price', e.target.value)}
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 pl-4"
                                    placeholder="0"
                                />
                                <div className="absolute inset-y-0 right-0 pr-10 flex items-center pointer-events-none">
                                    <span className="text-muted-foreground text-sm">EUR</span>
                                </div>
                            </div>
                            <p className="text-[0.8rem] text-muted-foreground">
                                Laissez vide ou mettez 0 pour un service gratuit.
                            </p>
                            {errors.price && <p className="text-sm font-medium text-destructive">{errors.price}</p>}
                        </div>

                        {/* Actions */}
                        <div className="flex items-center justify-end gap-4 pt-4 border-t border-sidebar-border">
                            <Link
                                href="/services/mine"
                                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                            >
                                Annuler
                            </Link>
                            <button
                                type="submit"
                                disabled={processing}
                                className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                            >
                                {processing ? 'Publication...' : 'Publier le service'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}

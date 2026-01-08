import { ThemeToggle } from '@/components/theme-toggle';
import { Link, Head, useForm } from '@inertiajs/react';
import { Search, ArrowRight, Briefcase } from 'lucide-react';
import React from 'react';

export default function Welcome({ services, auth }: any) {
    const { data, setData, get } = useForm({ term: '' });

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        get('/');
    };

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 font-sans text-zinc-900 dark:text-zinc-100 transition-colors duration-300">
            <Head title="Accueil" />

            {/* Navbar */}
            <nav className="bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 px-6 h-16 flex items-center justify-between sticky top-0 z-10 transition-colors duration-300">
                <div className="flex items-center gap-2 text-xl font-bold">
                    <div className="bg-blue-600 p-1.5 rounded-lg">
                        <Briefcase className="w-5 h-5 text-white" />
                    </div>
                    <span>Retraite<span className="text-blue-600 dark:text-blue-500">Pro</span></span>
                </div>

                <div className="flex items-center gap-4">
                    <ThemeToggle />

                    {auth.user ? (
                        <Link href="/dashboard" className="text-sm font-medium bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 px-4 py-2 rounded-md hover:opacity-90 transition-opacity">
                            Mon Tableau de bord
                        </Link>
                    ) : (
                        <>
                            <Link href={'/login'} className="hidden sm:inline-block text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 px-4 py-2">
                                Connexion
                            </Link>
                            <Link href={'/register'} className="text-sm font-medium bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
                                Inscription
                            </Link>
                        </>
                    )}
                </div>
            </nav>

            {/* Hero Section */}
            <div className="bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 py-24 px-4 text-center transition-colors duration-300">
                <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6 text-zinc-900 dark:text-white">
                    L'expérience au service de tous
                </h1>
                <p className="text-zinc-500 dark:text-zinc-400 max-w-2xl mx-auto mb-10 text-lg">
                    Trouvez un retraité passionné pour vous aider dans vos projets, ou partagez votre savoir-faire avec la communauté.
                </p>

                <form onSubmit={handleSearch} className="max-w-md mx-auto flex gap-2 relative">
                    <Search className="absolute left-3 top-3 w-5 h-5 text-zinc-400" />
                    <input
                        type="text"
                        className="w-full pl-10 pr-4 py-3 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                        placeholder="Que recherchez-vous ? (Jardinage, Maths...)"
                        value={data.term}
                        onChange={e => setData('term', e.target.value)}
                    />
                    <button type="submit" className="bg-zinc-900 dark:bg-blue-600 text-white px-6 rounded-lg font-medium hover:bg-zinc-800 dark:hover:bg-blue-700 transition-colors">
                        Rechercher
                    </button>
                </form>
            </div>

            {/* Services Grid */}
            <div className="max-w-7xl mx-auto px-6 py-16">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl font-bold">Services récents</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {services.map((service: any) => (
                        <Link
                            href={`/service/${service.id}`}
                            key={service.id}
                            className="group block bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden hover:border-blue-500 dark:hover:border-blue-500 hover:shadow-lg transition-all duration-300"
                        >
                            <div className="p-6">
                                <div className="flex justify-between items-start mb-4">
                                    <h3 className="font-bold text-lg group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                        {service.title}
                                    </h3>
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700">
                                        {service.price ? `${service.price}€` : 'Gratuit'}
                                    </span>
                                </div>
                                <p className="text-zinc-500 dark:text-zinc-400 text-sm line-clamp-3 mb-6 min-h-[60px]">
                                    {service.description}
                                </p>
                                <div className="flex items-center justify-between pt-4 border-t border-zinc-100 dark:border-zinc-800">
                                    <div className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
                                        <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold text-xs uppercase">
                                            {service.user.name[0]}
                                        </div>
                                        <span className="font-medium">{service.user.name}</span>
                                    </div>
                                    <span className="text-blue-600 dark:text-blue-400 text-sm font-medium flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                                        Détails <ArrowRight className="w-4 h-4" />
                                    </span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {services.length === 0 && (
                    <div className="text-center py-20 text-zinc-500 dark:text-zinc-400">
                        <p className="text-lg">Aucun service trouvé pour le moment.</p>
                    </div>
                )}
            </div>
        </div>
    );
}

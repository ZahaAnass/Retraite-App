import { Link, Head, useForm } from '@inertiajs/react';
import { Search, ArrowRight } from 'lucide-react';
import React from 'react';

export default function Welcome({ services, auth }: any) {
    const { data, setData, get } = useForm({ term: '' });

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        get('/');
    };

    return (
        <div className="min-h-screen bg-zinc-50 font-sans text-zinc-900">
            <Head title="Accueil" />

            {/* Navbar */}
            <nav className="bg-white border-b border-zinc-200 px-6 h-16 flex items-center justify-between">
                <div className="text-xl font-bold">Retraite<span className="text-blue-600">Pro</span></div>
                <div className="flex gap-4">
                    {auth.user ? (
                        <Link href="/dashboard" className="text-sm font-medium bg-zinc-900 text-white px-4 py-2 rounded-md hover:bg-zinc-800">
                            Mon Tableau de bord
                        </Link>
                    ) : (
                        <>
                            <Link href={'login'} className="text-sm font-medium text-zinc-600 hover:text-zinc-900 px-4 py-2">Connexion</Link>
                            <Link href={'register'} className="text-sm font-medium bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">Inscription</Link>
                        </>
                    )}
                </div>
            </nav>

            {/* Hero Section */}
            <div className="bg-white border-b border-zinc-200 py-20 px-4 text-center">
                <h1 className="text-4xl font-extrabold tracking-tight mb-4">L'expérience au service de tous</h1>
                <p className="text-zinc-500 max-w-2xl mx-auto mb-8">Trouvez un retraité passionné pour vous aider, ou partagez votre savoir-faire.</p>

                <form onSubmit={handleSearch} className="max-w-md mx-auto flex gap-2 relative">
                    <Search className="absolute left-3 top-3 w-5 h-5 text-zinc-400" />
                    <input
                        type="text"
                        className="w-full pl-10 pr-4 py-2.5 rounded-md border border-zinc-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                        placeholder="Que recherchez-vous ? (Jardinage, Maths...)"
                        value={data.term}
                        onChange={e => setData('term', e.target.value)}
                    />
                    <button type="submit" className="bg-zinc-900 text-white px-6 rounded-md font-medium hover:bg-zinc-800">
                        Rechercher
                    </button>
                </form>
            </div>

            {/* Services Grid */}
            <div className="max-w-7xl mx-auto px-6 py-12">
                <h2 className="text-2xl font-bold mb-6">Services récents</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {services.map((service: any) => (
                        <Link href={`/service/${service.id}`} key={service.id} className="group block bg-white border border-zinc-200 rounded-lg overflow-hidden hover:shadow-md transition-all">
                            <div className="p-6">
                                <div className="flex justify-between items-start mb-4">
                                    <h3 className="font-bold text-lg group-hover:text-blue-600 transition-colors">{service.title}</h3>
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-zinc-100 text-zinc-800">
                                        {service.price ? `${service.price}€` : 'Gratuit'}
                                    </span>
                                </div>
                                <p className="text-zinc-500 text-sm line-clamp-3 mb-4">{service.description}</p>
                                <div className="flex items-center justify-between pt-4 border-t border-zinc-100">
                                    <div className="flex items-center gap-2 text-sm text-zinc-600">
                                        <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-xs">
                                            {service.user.name[0]}
                                        </div>
                                        {service.user.name}
                                    </div>
                                    <span className="text-blue-600 text-sm font-medium flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                                        Voir <ArrowRight className="w-4 h-4" />
                                    </span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}

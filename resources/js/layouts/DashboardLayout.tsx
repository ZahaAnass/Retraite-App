import { useState, ReactNode } from 'react';
import { Link, usePage } from '@inertiajs/react';
import {
    LayoutDashboard, MessageSquare, Briefcase, Users,
    LogOut, Menu, X, Search
} from 'lucide-react';

type NavItem = {
    label: string;
    route: string;
    icon: React.ComponentType<{ className?: string }>;
    roles: string[];
};

export default function DashboardLayout({ children }: { children: ReactNode }) {
    const { auth } = usePage().props as unknown as {
        auth: { user: { name: string; role: string } };
    };
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const navItems: NavItem[] = [
        { label: 'Tableau de bord', route: 'dashboard', icon: LayoutDashboard, roles: ['admin', 'retraite', 'demandeur'] },
        { label: 'Mes Services', route: 'services.mine', icon: Briefcase, roles: ['retraite'] },
        { label: 'Messagerie', route: 'messages.index', icon: MessageSquare, roles: ['admin', 'retraite', 'demandeur'] },
        { label: 'Administration', route: 'admin.index', icon: Users, roles: ['admin'] },
    ];

    const mapRoute = (name: string) => {
        switch (name) {
            case 'dashboard':
                return '/dashboard';
            case 'services.mine':
                return '/services/mine';
            case 'messages.index':
                return '/messages';
            case 'admin.index':
                return '/admin';
            case 'logout':
                return '/logout';
            default:
                return `/${name.replace(/\./g, '/')}`;
        }
    };

    const isActive = (href: string) => typeof window !== 'undefined' && window.location.pathname === href;

    return (
        <div className="min-h-screen bg-zinc-50 flex">
            {/* Sidebar (Desktop) */}
            <aside className="hidden md:flex flex-col w-64 bg-white border-r border-zinc-200 fixed h-full z-10">
                <div className="h-16 flex items-center px-6 border-b border-zinc-200">
                    <span className="text-xl font-bold tracking-tight text-zinc-900">Retraite<span className="text-blue-600">Pro</span></span>
                </div>
                <nav className="flex-1 p-4 space-y-1">
                    {navItems.map((item) => (
                        item.roles.includes(auth.user.role) && (
                            <Link
                                key={item.route}
                                href={mapRoute(item.route)}
                                className={`flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
    isActive(mapRoute(item.route))
        ? 'bg-zinc-100 text-zinc-900'
        : 'text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50'
}`}
                            >
                                <item.icon className="w-4 h-4" />
                                {item.label}
                            </Link>
                        )
                    ))}
                </nav>
                <div className="p-4 border-t border-zinc-200">
                    <Link href={mapRoute('logout')} method="post" as="button" className="flex items-center gap-3 w-full px-3 py-2 text-sm font-medium text-red-600 rounded-md hover:bg-red-50">
                        <LogOut className="w-4 h-4" /> Déconnexion
                    </Link>
                </div>
            </aside>

            {/* Mobile Sidebar */}
            <div className={`fixed inset-0 z-20 md:hidden ${sidebarOpen ? '' : 'pointer-events-none'}`}>
                <div
                    className={`fixed inset-0 bg-black/20 transition-opacity ${sidebarOpen ? 'opacity-100' : 'opacity-0'}`}
                    onClick={() => setSidebarOpen(false)}
                />
                <aside className={`fixed left-0 top-0 bottom-0 w-64 bg-white border-r border-zinc-200 transform transition-transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                    <div className="h-16 flex items-center px-6 border-b border-zinc-200">
                        <span className="text-xl font-bold tracking-tight text-zinc-900">Retraite<span className="text-blue-600">Pro</span></span>
                    </div>
                    <nav className="flex-1 p-4 space-y-1">
                        {navItems.map((item) => (
                            item.roles.includes(auth.user.role) && (
                                <Link
                                    key={item.route}
                                    href={mapRoute(item.route)}
                                    className={`flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
    isActive(mapRoute(item.route))
        ? 'bg-zinc-100 text-zinc-900'
        : 'text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50'
}`}
                                    onClick={() => setSidebarOpen(false)}
                                >
                                    <item.icon className="w-4 h-4" />
                                    {item.label}
                                </Link>
                            )
                        ))}
                    </nav>
                    <div className="p-4 border-t border-zinc-200">
                        <Link href={mapRoute('logout')} method="post" as="button" className="flex items-center gap-3 w-full px-3 py-2 text-sm font-medium text-red-600 rounded-md hover:bg-red-50">
                            <LogOut className="w-4 h-4" /> Déconnexion
                        </Link>
                    </div>
                </aside>
            </div>

            {/* Main Content */}
            <main className="flex-1 md:ml-64 flex flex-col min-h-screen">
                {/* Top Header */}
                <header className="h-16 bg-white border-b border-zinc-200 flex items-center justify-between px-6 sticky top-0 z-10">
                    <div className="flex items-center gap-4">
                        <button className="md:hidden p-2 rounded-md text-zinc-600 hover:bg-zinc-100" onClick={() => setSidebarOpen((s) => !s)}>
                            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                        </button>
                        <span className="text-sm text-zinc-500">Bonjour, <span className="font-semibold text-zinc-900">{auth.user.name}</span></span>
                        <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-700 capitalize border border-blue-200">
                            {auth.user.role}
                        </span>
                    </div>
                    <div className="flex items-center gap-4">
                        <button className="hidden md:inline-flex items-center gap-2 text-zinc-500 hover:text-zinc-900">
                            <Search className="w-4 h-4" /> <span className="text-sm">Search</span>
                        </button>
                        <Link href="/" className="text-sm font-medium text-zinc-500 hover:text-blue-600">
                            Retour au site public →
                        </Link>
                    </div>
                </header>

                {/* Page Content */}
                <div className="p-8 max-w-7xl mx-auto w-full">
                    {children}
                </div>
            </main>
        </div>
    );
}

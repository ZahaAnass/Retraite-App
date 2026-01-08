import {
    Briefcase,
    LayoutGrid,
    MessageSquare,
    Users, UserRoundPen
} from 'lucide-react';
import { type NavItem } from '@/types';

export const navigation: Record<string, NavItem[]> = {
    admin: [
        { title: 'Tableau de bord', href: '/dashboard', icon: LayoutGrid },
        { title: 'Vue d\'ensemble', href: '/admin', icon: UserRoundPen },
        { title: 'Utilisateurs', href: '/admin/users', icon: Users },
        { title: 'Services', href: '/admin/services', icon: Briefcase },
        { title: 'Messagerie', href: '/messages', icon: MessageSquare },
    ],
    retraite: [
        { title: 'Tableau de bord', href: '/dashboard', icon: LayoutGrid },
        { title: 'Mes Services', href: '/my-services', icon: Briefcase },
        { title: 'Messagerie', href: '/messages', icon: MessageSquare },
    ],
    demandeur: [
        { title: 'Tableau de bord', href: '/dashboard', icon: LayoutGrid },
        { title: 'Messagerie', href: '/messages', icon: MessageSquare },
    ],
};

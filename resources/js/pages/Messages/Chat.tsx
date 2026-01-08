import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm, Link } from '@inertiajs/react';
import { Send } from 'lucide-react';
import React, { useEffect, useRef } from 'react';

export default function Chat({ messages, targetUser, contacts, auth }: any) {
    const { data, setData, post, reset, processing } = useForm({ content: '' });
    const scrollRef = useRef<HTMLDivElement>(null);

    // Dynamic Breadcrumbs
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Messagerie', href: '/messages' },
        { title: targetUser.name, href: `/messages/${targetUser.id}` },
    ];

    useEffect(() => {
        if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }, [messages]);

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(`/messages/${targetUser.id}`, {
            onSuccess: () => reset()
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Chat avec ${targetUser.name}`} />

            {/* Main Chat Container - Fits available height */}
            <div className="flex h-[calc(100vh-6rem)] flex-col gap-4 p-4 md:h-[calc(100vh-4rem)]">

                <div className="flex flex-1 overflow-hidden rounded-xl border border-sidebar-border bg-sidebar dark:bg-sidebar/50 shadow-sm">

                    {/* Sidebar Contacts (Left Side) */}
                    <div className="hidden w-1/3 flex-col border-r border-sidebar-border bg-sidebar/50 md:flex">
                        <div className="border-b border-sidebar-border p-4 font-semibold text-foreground">
                            Vos conversations
                        </div>
                        <div className="flex-1 space-y-1 overflow-y-auto p-2">
                            {contacts && contacts.map((c: any) => (
                                <Link
                                    key={c.id}
                                    href={`/messages/${c.id}`}
                                    className={`flex items-center gap-3 rounded-md p-3 transition-colors ${
                                        c.id === targetUser.id
                                            ? 'bg-sidebar-accent text-sidebar-accent-foreground shadow-sm'
                                            : 'text-muted-foreground hover:bg-sidebar-accent/50 hover:text-foreground'
                                    }`}
                                >
                                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                                        {c.name[0]}
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <div className="truncate text-sm font-medium">{c.name}</div>
                                        <div className="truncate text-xs opacity-70 capitalize">{c.role}</div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Chat Area (Right Side) */}
                    <div className="flex min-w-0 flex-1 flex-col bg-background">
                        {/* Chat Header */}
                        <div className="flex items-center gap-3 border-b border-sidebar-border p-4">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-foreground text-background font-bold">
                                {targetUser.name[0]}
                            </div>
                            <div>
                                <div className="font-bold text-foreground">{targetUser.name}</div>
                                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                    <span className="block h-2 w-2 rounded-full bg-green-500"></span> En ligne
                                </div>
                            </div>
                        </div>

                        {/* Messages List */}
                        <div className="flex-1 space-y-4 overflow-y-auto bg-muted/20 p-6" ref={scrollRef}>
                            {messages.map((msg: any) => {
                                const isMe = msg.sender_id === auth.user.id;
                                return (
                                    <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                                        <div className={`max-w-[85%] rounded-2xl px-4 py-2 text-sm shadow-sm ${
                                            isMe
                                                ? 'bg-primary text-primary-foreground rounded-tr-none'
                                                : 'bg-card border border-border text-card-foreground rounded-tl-none'
                                        }`}>
                                            <p>{msg.content}</p>
                                            <div className={`mt-1 text-right text-[10px] ${isMe ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>
                                                {new Date(msg.created_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Input Area */}
                        <div className="border-t border-sidebar-border bg-background p-4">
                            <form onSubmit={submit} className="flex gap-2">
                                <input
                                    type="text"
                                    value={data.content}
                                    onChange={(e) => setData('content', e.target.value)}
                                    className="flex-1 rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                                    placeholder="Écrivez votre message..."
                                />
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="inline-flex items-center justify-center rounded-md bg-primary p-2 text-primary-foreground hover:bg-primary/90 shadow transition-colors disabled:opacity-50"
                                >
                                    <Send className="h-5 w-5" />
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}

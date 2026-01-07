import DashboardLayout from '@/layouts/DashboardLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import { Send } from 'lucide-react';
import React, { useEffect, useRef } from 'react';

export default function Chat({ messages, targetUser, contacts, auth }: any) {
    const { data, setData, post, reset, processing } = useForm({ content: '' });
    const scrollRef = useRef<HTMLDivElement>(null);

    // Auto-scroll to bottom
    useEffect(() => {
        if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }, [messages]);

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(`/messages/${targetUser.id}`
            , {
            onSuccess: () => reset()
        });
    };

    return (
        <DashboardLayout>
            <Head title={`Conversation avec ${targetUser.name}`} />

            <div className="h-[calc(100vh-140px)] flex border border-zinc-200 rounded-lg bg-white overflow-hidden shadow-sm">
                {/* Sidebar Contacts */}
                <div className="w-1/3 border-r border-zinc-200 bg-zinc-50 flex flex-col">
                    <div className="p-4 border-b border-zinc-200 font-bold text-zinc-700">Vos conversations</div>
                    <div className="overflow-y-auto flex-1 p-2 space-y-1">
                        {contacts && contacts.map((c: any) => (
                            <Link
                                key={c.id}
                                href={`/messages/${c.id}`}
                                className={`flex items-center gap-3 p-3 rounded-md transition-colors ${
                                    c.id === targetUser.id ? 'bg-white shadow-sm border border-zinc-200' : 'hover:bg-zinc-200'
                                }`}
                            >
                                <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold">
                                    {c.name[0]}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="text-sm font-medium text-zinc-900 truncate">{c.name}</div>
                                    <div className="text-xs text-zinc-500 capitalize">{c.role}</div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Chat Area */}
                <div className="flex-1 flex flex-col">
                    {/* Chat Header */}
                    <div className="p-4 border-b border-zinc-200 flex items-center gap-3 bg-white">
                        <div className="w-10 h-10 rounded-full bg-zinc-900 text-white flex items-center justify-center font-bold">
                            {targetUser.name[0]}
                        </div>
                        <div>
                            <div className="font-bold text-zinc-900">{targetUser.name}</div>
                            <div className="text-xs text-zinc-500">En ligne</div>
                        </div>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-zinc-50/50" ref={scrollRef}>
                        {messages.map((msg: any) => {
                            const isMe = msg.sender_id === auth.user.id;
                            return (
                                <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`max-w-[70%] rounded-2xl px-4 py-2 text-sm ${
                                        isMe ? 'bg-blue-600 text-white rounded-tr-none' : 'bg-white border border-zinc-200 text-zinc-800 rounded-tl-none shadow-sm'
                                    }`}>
                                        <p>{
                                            msg.content
                                        }</p>
                                        <div className={`text-[10px] mt-1 text-right ${isMe ? 'text-blue-200' : 'text-zinc-400'}`}>
                                            {new Date(msg.created_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Input */}
                    <div className="p-4 bg-white border-t border-zinc-200 text-black">
                        <form onSubmit={submit} className="flex gap-2">
                            <input
                                type="text"
                                value={data.content}
                                onChange={(e) => setData('content', e.target.value)}
                                className="flex-1 pl-2 border-zinc-300 rounded-md focus:border-blue-500 focus:ring-blue-500 text-sm"
                                placeholder="Écrivez votre message..."
                            />
                            <button type="submit" disabled={processing} className="bg-zinc-900 text-white p-2 rounded-md hover:bg-zinc-800 transition-colors">
                                <Send className="w-5 h-5" />
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}

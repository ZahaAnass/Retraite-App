<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Message;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class MessageController extends Controller
{
    public function index() {
        return Inertia::render('Messages/Index', [
            'contacts' => $this->getContacts()
        ]);
    }

    public function chat(User $user) {
        // 1. Fetch conversation history
        $messages = Message::where(function($q) use ($user) {
            $q->where('sender_id', Auth::id())->where('receiver_id', $user->id);
        })->orWhere(function($q) use ($user) {
            $q->where('sender_id', $user->id)->where('receiver_id', Auth::id());
        })->orderBy('created_at', 'asc')->get();

        // ❌ DELETED THE ABORT(404) BLOCK HERE
        // We want to allow opening a chat even if messages are empty (new chat)

        // 2. Return the view with Contacts (for sidebar) and Messages
        return Inertia::render('Messages/Chat', [
            'targetUser' => $user,
            'messages' => $messages,
            'contacts' => $this->getContacts() // Reuse helper for sidebar
        ]);
    }

    public function store(Request $request, User $user) {
        $request->validate(['content' => 'required']);
        Message::create([
            'sender_id' => Auth::id(),
            'receiver_id' => $user->id,
            'content' => $request->input("content")
        ]);
        return redirect()->back();
    }

    // Helper to get sidebar contacts (prevents code duplication)
    private function getContacts() {
        $userId = Auth::id();
        $messages = Message::where('sender_id', $userId)
            ->orWhere('receiver_id', $userId)
            ->with(['sender', 'receiver'])
            ->latest() // Sort by newest interaction
            ->get();

        return $messages->map(function ($msg) use ($userId) {
            return $msg->sender_id === $userId ? $msg->receiver : $msg->sender;
        })->unique('id')->values();
    }
}

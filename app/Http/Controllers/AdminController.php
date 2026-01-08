<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Service;
use Inertia\Inertia;
use Illuminate\Http\RedirectResponse;

class AdminController extends Controller
{
    // Page 1: Dashboard Stats

    public function index()
    {
        return Inertia::render('Admin/Dashboard', [
            'stats' => [
                'total_users' => User::count(),
                'total_services' => Service::count()
            ],
            // Add this section 👇
            'recent' => [
                'users' => User::latest()->take(5)->get(),
                'services' => Service::with('user')->latest()->take(5)->get()
            ]
        ]);
    }

    // Page 2: User Management
    public function users()
    {
        return Inertia::render('Admin/Users', [
            'users' => User::all()
        ]);
    }

    // Page 3: Service Management
    public function services()
    {
        return Inertia::render('Admin/Services', [
            'services' => Service::with('user')->latest()->get()
        ]);
    }

    // Actions
    public function deleteUser(User $user): RedirectResponse
    {
        if ($user->id === auth()->id()) {
            return redirect()->back()->with('error', 'Impossible de se supprimer soi-même.');
        }
        $user->delete();
        return redirect()->back();
    }

    public function deleteService(Service $service): RedirectResponse
    {
        $service->delete();
        return redirect()->back();
    }
}

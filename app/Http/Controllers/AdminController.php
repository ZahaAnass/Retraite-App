<?php

namespace App\Http\Controllers;
use App\Models\User;
use App\Models\Service;
use Inertia\Inertia;

class AdminController extends Controller
{
    public function index() {
        return Inertia::render('Admin/Dashboard', [
            'users' => User::all(),
            'services' => Service::with('user')->get(),
            'stats' => [
                'total_users' => User::count(),
                'total_services' => Service::count()
            ]
        ]);
    }

    public function deleteUser(User $user) {
        // Admin power: Delete anyone
        $user->delete();
        return redirect()->back();
    }

    public function deleteService(Service $service) {
        // Admin power: Delete anything
        $service->delete();
        return redirect()->back();
    }
}

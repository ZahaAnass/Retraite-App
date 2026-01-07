<?php

namespace App\Http\Controllers;
use App\Models\Service;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class ServiceController extends Controller
{
    // Public Search
    public function index(Request $request) {
        $services = Service::with('user')
            ->when($request->term, function($q, $term) {
                $q->where('title', 'like', "%{$term}%");
            })->latest()->get();
        return Inertia::render('Welcome', ['services' => $services]);
    }

    public function show(Service $service) {
        return Inertia::render('Service/Show', ['service' => $service->load('user')]);
    }

    // Retiree Dashboard
    public function myServices() {
        return Inertia::render('Services/Index', [
            'services' => Auth::user()->services()->get()
        ]);
    }

    public function create() {
        return Inertia::render('Services/Create');
    }

    public function store(Request $request) {
        $validated = $request->validate([
            'title' => 'required',
            'description' => 'required',
            'price' => 'nullable|numeric'
        ]);
        $request->user()->services()->create($validated);
        return redirect()->route('services.mine');
    }

    // DIRECT CHECK IN CONTROLLER (No Policy)
    public function destroy(Service $service) {
        // Security Check: Only the owner can delete
        if (Auth::id() !== $service->user_id) {
            abort(403, 'This is not your service.');
        }
        $service->delete();
        return redirect()->back();
    }
}

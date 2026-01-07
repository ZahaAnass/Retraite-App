<?php

use App\Http\Controllers\ServiceController;
use App\Http\Controllers\MessageController;
use App\Http\Controllers\AdminController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// --- PUBLIC AREA ---
Route::get('/', [ServiceController::class, 'index'])->name('home');
Route::get('/service/{service}', [ServiceController::class, 'show'])->name('service.show');
Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->name('dashboard');

// --- AUTHENTICATED USERS ---
Route::middleware('auth')->group(function () {

    // MESSAGING (Common for all)
    Route::get('/messages', [MessageController::class, 'index'])->name('messages.index');
    Route::get('/messages/{user}', [MessageController::class, 'chat'])->name('messages.chat');
    Route::post('/messages/{user}', [MessageController::class, 'store'])->name('messages.store');

    // --- RETIREE AREA ---
    // Only 'retraite' role can manage services
    Route::middleware('role:retraite')->group(function () {
        Route::get('/my-services', [ServiceController::class, 'myServices'])->name('services.mine');
        Route::get('/services/create', [ServiceController::class, 'create'])->name('services.create');
        Route::post('/services', [ServiceController::class, 'store'])->name('services.store');
        Route::delete('/services/{service}', [ServiceController::class, 'destroy'])->name('services.destroy');
    });

    // --- ADMIN AREA ---
    // Only 'admin' can manage users
    Route::middleware('role:admin')->group(function () {
        Route::get('/admin', [AdminController::class, 'index'])->name('admin.index');
        Route::delete('/admin/users/{user}', [AdminController::class, 'deleteUser'])->name('admin.deleteUser');
        Route::delete('/admin/services/{service}', [AdminController::class, 'deleteService'])->name('admin.deleteService');
    });



});

require __DIR__.'/settings.php';

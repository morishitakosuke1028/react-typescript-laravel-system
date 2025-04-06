<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\MPointDepartureController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('/m_point_departures', [MPointDepartureController::class, 'index'])->name('MPointDepartures.index');
    Route::get('/m_point_departures/create', [MPointDepartureController::class, 'create'])->name('MPointDepartures.create');
    Route::post('/m_point_departures', [MPointDepartureController::class, 'store'])->name('MPointDepartures.store');
    Route::get('/m_point_departures/{m_point_departure}/edit', [MPointDepartureController::class, 'edit'])->name('MPointDepartures.edit');
    Route::put('/m_point_departures/{m_point_departure}', [MPointDepartureController::class, 'update'])->name('MPointDepartures.update');
    Route::delete('/m_point_departures/{m_point_departure}', [MPointDepartureController::class, 'destroy'])->name('MPointDepartures.destroy');
});

require __DIR__.'/auth.php';

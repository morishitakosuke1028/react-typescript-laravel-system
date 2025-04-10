<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\MPointDepartureController;
use App\Http\Controllers\MInsuranceCompanyController;
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
    Route::get('/m_insurance_companies', [MInsuranceCompanyController::class, 'index'])->name('MInsuranceCompanies.index');
    Route::get('/m_insurance_companies/create', [MInsuranceCompanyController::class, 'create'])->name('MInsuranceCompanies.create');
    Route::post('/m_insurance_companies', [MInsuranceCompanyController::class, 'store'])->name('MInsuranceCompanies.store');
    Route::get('/m_insurance_companies/{m_insurance_company}/edit', [MInsuranceCompanyController::class, 'edit'])->name('MInsuranceCompanies.edit');
    Route::put('/m_insurance_companies/{m_insurance_company}', [MInsuranceCompanyController::class, 'update'])->name('MInsuranceCompanies.update');
    Route::delete('/m_insurance_companies/{m_insurance_company}', [MInsuranceCompanyController::class, 'destroy'])->name('MInsuranceCompanies.destroy');
});

require __DIR__.'/auth.php';

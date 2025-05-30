<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\MPointDepartureController;
use App\Http\Controllers\MInsuranceCompanyController;
use App\Http\Controllers\MUnitPriceController;
use App\Http\Controllers\ClaimController;
use App\Http\Controllers\RentalCarController;
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
    Route::get('/m_unit_prices', [MUnitPriceController::class, 'index'])->name('MUnitPrices.index');
    Route::get('/m_unit_prices/create', [MUnitPriceController::class, 'create'])->name('MUnitPrices.create');
    Route::post('/m_unit_prices', [MUnitPriceController::class, 'store'])->name('MUnitPrices.store');
    Route::get('/m_unit_prices/{m_unit_price}/edit', [MUnitPriceController::class, 'edit'])->name('MUnitPrices.edit');
    Route::put('/m_unit_prices/{m_unit_price}', [MUnitPriceController::class, 'update'])->name('MUnitPrices.update');
    Route::delete('/m_unit_prices/{m_unit_price}', [MUnitPriceController::class, 'destroy'])->name('MUnitPrices.destroy');
    Route::get('/claims', [ClaimController::class, 'index'])->name('Claims.index');
    Route::get('/claims/create', [ClaimController::class, 'create'])->name('Claims.create');
    Route::post('/claims', [ClaimController::class, 'store'])->name('Claims.store');
    Route::get('/claims/{claim}/edit', [ClaimController::class, 'edit'])->name('Claims.edit');
    Route::put('/claims/{claim}', [ClaimController::class, 'update'])->name('Claims.update');
    Route::delete('/claims/{claim}', [ClaimController::class, 'destroy'])->name('Claims.destroy');
    Route::get('/claims/distance', [ClaimController::class, 'fetchDistance']);
    Route::get('/rental_cars', [RentalCarController::class, 'index'])->name('RentalCars.index');
    Route::get('/rental_cars/create', [RentalCarController::class, 'create'])->name('RentalCars.create');
    Route::post('/rental_cars/confirm', [RentalCarController::class, 'confirm'])->name('RentalCars.confirm');
    Route::post('/rental_cars', [RentalCarController::class, 'store'])->name('RentalCars.store');
    Route::get('/rental_cars/{rental_car}/edit', [RentalCarController::class, 'edit'])->name('RentalCars.edit');
    Route::put('/rental_cars/{rental_car}', [RentalCarController::class, 'update'])->name('RentalCars.update');
    Route::delete('/rental_cars/{rental_car}', [RentalCarController::class, 'destroy'])->name('RentalCars.destroy');
});

require __DIR__.'/auth.php';

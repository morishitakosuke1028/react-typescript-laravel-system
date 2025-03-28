<?php
use Illuminate\Support\Facades\Route;

Route::get('/hoge', function (Request $request) {
    return response()->json(
        [
            'hoge' => 'Hello from Laravel'
        ]
    );
});
<?php

use Illuminate\Support\Facades\Route;

// Reactから「http://localhost:9000/api/test」でアクセスできる窓口
Route::get('/test', function () {
    return response()->json([
        'message' => 'Laravelとの接続に成功しました！',
        'status' => 'OK'
    ]);
});
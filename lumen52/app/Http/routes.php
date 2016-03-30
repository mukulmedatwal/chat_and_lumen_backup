<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/

$app->get('/', function () use ($app) {
    return $app->version();
});


$app->get('/test', function () use ($app) {
    return 'this is test';
});

$app->get('/posts','PostsController@getPosts');

$app->post('/save','PostsController@save');

$app->put('/update/{id}','PostsController@update');
$app->delete('/delete/{id}','PostsController@delete');


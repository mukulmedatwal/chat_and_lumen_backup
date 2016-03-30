<?php

use Laravel\Lumen\Testing\DatabaseTransactions;

class ExampleTest extends TestCase
{
    /**
     * A basic test example.
     *
     * @return void
     */
    public function testExample()
    {
         $this->post('/posts', ['data' => '{"token":true,"cmd":"get_all_posts"}'])
             ->seeJsonEquals([
                'status' => 'ok',
             ]);
    }
}

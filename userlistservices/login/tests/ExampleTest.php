<?php

use Laravel\Lumen\Testing\DatabaseTransactions;

class getAllPostsTest extends TestCase
{
    /**
     * A basic test example.
     *
     * @return void
     */
    public function testExample()
    {
        $this->get('/posts');

        $this->assertEquals(
            $this->response->getContent(), $this->app->version()
        );
    }
}

<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUserTopic extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('user_topic', function (Blueprint $table) {
            $table->increments('user_topic_id');
            $table->integer('user_id');
            $table->integer('group_id');
            $table->string('topic_key');
            $table->timestamps();
            
//            $table->foreign('user_id')->references('id')->on('users');
//            $table->foreign('group_id')->references('group_id')->on('group');
            
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('user_topic');
    }
}

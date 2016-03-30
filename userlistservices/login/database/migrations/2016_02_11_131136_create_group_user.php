<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateGroupUser extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('group_user', function (Blueprint $table) {
            $table->increments('group_user_id');
            
            $table->integer('group_id');
            $table->integer('user_id');
            $table->string('status' , 2);
            
            $table->timestamps();
            
//            $table->foreign('user_id')
//            ->references('id')->on('users')
//            ->onDelete('cascade');
            
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
        Schema::drop('group_user');
    }
}

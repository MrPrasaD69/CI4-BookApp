<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class TestTable extends Migration
{
    public function up()
    {
        $this->forge->addField('id');
        $this->forge->addField([
            'name'=>[
                'type'=>'VARCHAR',
                'constraint'=> 100,
            ],
        ]);
        $this->forge->createTable("newusers");
    }

    public function down()
    {
        $this->forge->dropTable("newusers");
    }
}

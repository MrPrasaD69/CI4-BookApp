<?php
namespace App\Models;
use CodeIgniter\Model;

class StateModel extends Model{
    protected $table= 'states';
    protected $allowedFields = ['country_id','state_name'];
}

?>
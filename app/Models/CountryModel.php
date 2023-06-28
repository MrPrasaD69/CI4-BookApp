<?php
namespace App\Models;
use CodeIgniter\Model;

class CountryModel extends Model{
    protected $table= 'countries';
    protected $allowedFields = ['country_name'];

    
}

?>
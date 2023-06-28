<?php 
namespace App\Models;
use CodeIgniter\Model;

class CityModel extends Model{
    protected $table= 'cities';
    protected $allowedFields = ['city_name'];
    public function getStates(){
        
    }
}
?>
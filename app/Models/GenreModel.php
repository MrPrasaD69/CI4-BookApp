<?php
namespace App\Models;
use CodeIgniter\Model;

class GenreModel extends Model{

    protected $table= 'tbl_genre';
    protected $allowedFields = ['genre_id','genre','active_status','added_on','updated_on','status'];

    public function getGenre(){
        return $this->orderBy('genre_id','ASC')->findAll();
    }
}
?>
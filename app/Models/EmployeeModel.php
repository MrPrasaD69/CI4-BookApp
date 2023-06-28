<?php
namespace App\Models;
use CodeIgniter\Model;

class EmployeeModel extends Model{
    protected $table= 'employee';
    protected $allowedFields = ['Name','Email','State','City'];

    public function getRecords(){
        return $this->orderBy('EID','ASC')->findAll();
    }

    public function getRow($id){
        return $this->where("EID",$id)->first();
    }

    public function deleteRow($id){
        $sql="DELETE FROM employee WHERE EID =?";
        $this->query($sql,[$id]);
    }
}

?>
<?php 
namespace App\Controllers;
use App\Models\EmployeeModel;

class EmployeeController extends BaseController{
    public function index(){
        $session= \Config\Services::session();
        $data['session']=$session;
        
        $empm=new EmployeeModel();
        $empArray=$empm->getRecords();
        $data['empdata']=$empArray;
        echo view('EmpViews/List',$data);
    }


    public function store(){
        $name=$this->request->getPost('uname');
        $email=$this->request->getPost('uemail');
        $state=$this->request->getPost('ustate');
        $city=$this->request->getPost('ucity');
        $empmodel=new EmployeeModel();
        $data=[
            'Name'=>$name,
            'Email'=>$email,
            'State'=>$state,
            'City'=>$city,
        ];
        $empmodel->insert($data);
        return $this->response->setJSON([
            'status'=>'success',
            'message'=>'Data Inserted',
        ]);

        
    }

    public function create(){
        return  view("EmpViews/Create");
    }

    public function deleteRow($id){
        $empmodel=new EmployeeModel();
        $empmodel->deleteRow($id);
    }


    //Edit function
    public function edit($id){
       

        $empmodel=new EmployeeModel();
        $empdata=$empmodel->getRow($id);
        $data["empdata"]=$empdata;
        
        echo view("EmpViews/Edit",$data); //pass data to the view
    }

    public function update(){
        $request=service('request');
        $empmodel=new EmployeeModel();
        $empId=$request->getVar('empID');
        $name=$request->getVar('uname');
        $email=$request->getVar('uemail');
        $state=$request->getVar('ustate');
        $city=$request->getVar('ucity');
        $data=[
            'Name'=>$name,
            'Email'=>$email,
            'State'=>$state,
            'City'=>$city,
        ];
        $empmodel->update($empId,$data);
        $response=[
            'status'=>'success',
            'message'=>'updated'
        ];
        return $this->response->setJSON($response);

    }
    
}
?>
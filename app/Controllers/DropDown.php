<?php  
namespace App\Controllers;
use App\Models\CountryModel;

use App\Models\StateModel;
use App\Models\CityModel;

class DropDown extends BaseController{


    public function index(){
        $countryModel= new CountryModel();
        $data['country']=$countryModel->findAll();

        return view("books/testview",$data);
    }

    public function getStates()
    {

        $countryId = $_POST['countryId'];
        $stateModel=new StateModel();
        $states=$stateModel->where('country_id', $countryId)->findAll();
        $response=[];
        foreach($states as $state){
            $response[]=[
                'id'=>$state['id'],
                'statename'=>$state['state_name'] //use statename in FE to capture the JSON data
            ];
        }
        return $this->response->setJSON($response); 
    }

    public function getCities(){
        $stateId=$_POST['stateId'];
        $cityModel = new CityModel();
        $cities=$cityModel->where('state_id',$stateId)->findAll();
        $response=[];
        foreach($cities as $city){
            $response[]=[
                'id'=>$city['id'],
                'cityname'=>$city['city_name'],
            ];
        }
        return $this->response->setJSON($response);
    }

    /*
    public function getCities($stateId){
        $citymodel=new CityModel();
        $cities=$citymodel->where('state_id', $stateId)->findAll();
        $response=[];
        foreach($cities as $city){
            $response[]=[
                'id'=>$city['id'],
                'cityname'=>$city['city_name']
            ];
        }
        return $this->response->setJSON($response);
    } */
}


?>
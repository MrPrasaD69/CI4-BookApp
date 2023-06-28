<?php
namespace App\Controllers;
use App\Models\BookModel;
use App\Models\GenreModel;

class Book extends BaseController{
    

    public function index(){
        $session= \Config\Services::session();
        $data['session']=$session;        
        $bookmodel=new BookModel();
        $data=[
            'books'=>$bookmodel->select("books.id,books.title,books.author,books.isbno,books.genre_id,tbl_genre.genre,tbl_genre.genre_id")->join('tbl_genre','tbl_genre.genre_id=books.genre_id')->findAll(),
        ];

        return view("books/List",$data);
        
       

        /*
        //use the model's object and call it's function
        $model=new BookModel();
        $booksArray=$model->getRecords();
        $data['books']=$booksArray; //$data variable will pass our array data to the view
        
        echo view("books/List",$data); //pass the session data to view 
        */
        
    }

    


    //Create method to insert data
    public function create(){
        $data=[];
        $session= \Config\Services::session();
        helper("form");


        //Genre Dropdown from database for insert
        $genreModel = new GenreModel();
        $data=[
            'tbl_genre'=>$genreModel->select("tbl_genre.genre,tbl_genre.genre_id")->findAll(),
        ];
        //Genre dropdown ends
        

        //Validate input
        if($this->request->getMethod()=='post'){
            $input=$this->validate([
                "title"=>'required|min_length[5]',
                "author"=>'required|min_length[5]',
                "isbno"=>'required',
                "genremenu"=>'required'
            ]);

            //When input validation comes true, proceed to save
            if($input){
                $model=new BookModel;
                $model->save([
                    "title"=>$this->request->getPost('title'),
                    "author"=>$this->request->getPost('author'),
                    "isbno"=>$this->request->getPost('isbno'),
                    "genre_id"=>$this->request->getPost('genremenu'),
                ]);
                $session->setFlashdata('success','Data Added');
                return redirect()->to("/book");
            }
            else
            {
                //when input is incorrect, throw validation
                $data["validation"]=$this->validator;
            }
        }
        echo view("books/Create", $data);  //pass the variable to our view
    }


    //Edit Function
    public function edit($id){
        //echo "$id";

        $data=[];
        $session= \Config\Services::session();
        helper("form");

        //call model's function to fetch data based on id
        $model= new BookModel();
        $book = $model-> getRow($id);

        //Genre model to fetch Genre List
        $genremodel=new GenreModel();
        $genredata=$genremodel->getGenre();
        
        if(empty($book)){
            $session->setFlashdata('error','Data Not Found');
            return redirect()->to("/book");
        }
        $data['book']=$book; // pass fetched data to an array and then capture it in view
        $data['genre']=$genredata;


        //Validate input
        if($this->request->getMethod()=='post'){
            $input=$this->validate([
                "title"=>'required|min_length[5]',
                "author"=>'required|min_length[5]',
                "isbno"=>'required',
                "genremenu"=>'required'
            ]);

            //After input validation comes true
            if($input){
                $model=new BookModel;
                
                //use the update method and send data based on id
                $model->update($id,
                [
                    "title"=>$this->request->getPost('title'),
                    "author"=>$this->request->getPost('author'),
                    "isbno"=>$this->request->getPost('isbno'),
                    "genre_id"=>$this->request->getPost('genremenu'),
                ]
                );
                    $session->setFlashdata('success','Data Updated');
                    return redirect()->to("/book");
            }
            else{
                //when input is incorrect, throw validation
                $data["validation"]=$this->validator;
            }
        }
        echo view("books/Edit",$data); //pass data to the view
    }

    public function delete($id){
        $session= \Config\Services::session();
        $model=new BookModel();
        $book=$model->getRow($id);

        if(empty($book)){
            $session->setFlashdata('error','Data Not Found');
            return redirect()->to("/book");
        }
        $model->delete($id);
        $session->setFlashdata('success','Data Deleted');
            return redirect()->to("/book");
    }

}

?>
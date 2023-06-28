<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" type="text/css" href="<?php echo base_url('assets/css/bootstrap.css') ?>">
    <link rel="stylesheet" type="text/css" href="<?php echo base_url('assets/css/style.css') ?>">
    <script src="https://code.jquery.com/jquery-3.7.0.min.js" integrity="sha256-2Pmvv0kuTBOenSvLm6bvfBSSHrUJ+3A7x6P5Ebd07/g=" crossorigin="anonymous"></script>

    <title>Employee Records</title>
</head>
<body>
<div class="container-fluid bg-red shadow sm">
        <div class="container pb-2 pt-2">
            <div class="text-white h4">Employee Management App
            </div>
        </div>
    </div>
    <div class="bg-white shadow sm">
        <div class="container">
            <div class="row">
                <div class="nav nav-underline">
                    <div class="nav-link">Employees / View</div>
                </div>
            </div>
        </div>
    </div>
    <div class="container mt-4">
        <div class="row">
            <div class="col-md-12 text-end">
                <a href="<?php echo base_url('Employee/create') ?>" class="btn btn-outline-primary btn-sm" >ADD</a>
            </div>
            
        </div>
    </div>
    <div class="container mt-4">
        <div class="row">
            <div class="col-md-12">
                
            </div>
            <div class="col-md-12">
                <div class="card">
                    <div class="card-header bg-red text-white">
                        <div class="card-header-title">Employees' Record</div>
                    </div>
                        <div class="card-body">
                            <table id="mytable" class="table table-striped table-bordered table-dark">
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>State</th>
                                    <th>City</th>
                                    <th>Action</th>
                                </tr>
                                <?php 
                                if(!empty($empdata)){
                                    foreach($empdata as $data){
                                ?>
                                <tr id="TID<?php echo $data['EID'] ?>">
                                    <td><?php echo $data['EID'] ?></td>
                                    <td><?php echo $data['Name'] ?></td>
                                    <td><?php echo $data['Email'] ?>@mail.com</td>
                                    <td><?php echo $data['State'] ?></td>
                                    <td><?php echo $data['City'] ?></td>
                                    <td><a class="btn btn-danger btn-sm m-1 1" onclick="confirmDelete(<?php echo $data['EID'] ?>)">Delete</a></td>
                                    <!--<td><a href="<?php echo base_url("Employee/edit/".$data['EID']); ?>" class="btn btn-success btn-sm"  >Edit</a><a class="btn btn-danger btn-sm m-1 1" onclick="confirmDelete(<?php echo $data['EID'] ?>)">Delete</a></td> -->
                                </tr>
                                <?php }
                                }
                                else{
                                 ?>
                                 <tr>
                                    <td colspan="6">No Data Found</td>
                                 </tr>
                                <?php 
                                    } 
                                ?>
                            </table>
                        </div>
                </div>
            </div>
            
        </div>
    </div>

    <script>
        confirmDelete=(id)=>{
            // /alert(id);
            var deleteId=id;
            if(confirm("Are you sure?")){
                //console.log(deleteId);
                
                $.ajax({
                url:'<?php echo base_url('Employee/delete/') ?>'+id,
                method:"GET",
                success:function(response){
                    console.log(response);
                    $("#TID"+deleteId).hide(500);
                }
                });
            }
        }
        
    </script>
</body>
</html>
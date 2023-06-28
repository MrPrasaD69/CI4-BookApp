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
                <a href="<?php echo base_url('Employee') ?>" class="btn btn-outline-primary btn-sm" >BACK</a>
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
                        <form id="update-form" name="update-form" method="">
                                <input type="hidden" name="empID" value="<?php echo $empdata['EID'] ?>" />
                                <div class="form-group">
                                    <label for="">Name</label>
                                    <input type="text" name="uname" id="uname" class="form-control" value="<?php echo $empdata['Name'] ?>" required>
                                </div>

                                <div class="form-group">
                                    <label for="">Email</label>
                                    <input type="email" name="uemail" id="uemail" class="form-control" value="<?php echo $empdata['Email'] ?>" required>
                                  
                                </div>

                                <div class="form-group">
                                    <label for="">State</label>
                                    <input type="text" name="ustate" id="ustate" class="form-control" value="<?php echo $empdata['State'] ?>" required>
                                </div>

                                <div class="form-group">
                                    <label for="">City</label>
                                    <input type="text" name="ucity" id="ucity" class="form-control" value="<?php echo $empdata['City'] ?>" required>
                                </div>
                                <button type="submit" class="btn btn-outline-success btn-sm mt-3" >Update</button>
                            </form>
                        </div>
                </div>
            </div>
            
        </div>
    </div>

    <script>
        /*
        $(document).ready(function(){
            var updateId=$("#empid").text();
            console.log(updateId);
            //alert("works");
            $("#update-form").submit(function(e){
                e.preventDefault();
                var formData=$(this).serialize();
                $.ajax({
                    url:'<?php echo base_url('Employee/update/') ?>'+updateId,
                    method:'POST',
                    success:function(response){
                    //console.log(response);
                    if(response.status==='success'){
                        alert(response.message);
                    }
                    else{
                        alert("Error :"+response.message);
                    }
                },
                error:function(xhr, status, error){
                    console.log(xhr.responseText);
                }
                })
                
            })
        }) */

        $(document.ready).ready(function(){
            $("#update-form").submit(function(e){
                e.preventDefault();
                var form=$(this);
                var data=form.serialize();

                $.ajax({
                    url:'<?php echo base_url('Employee/update') ?>',
                    method:'POST',
                    data:data,
                    dataType:'JSON',
                    success:function(response){
                        if(response.status==='success'){
                            alert(response.message);
                        }
                        else{
                            alert("Error");
                        }

                    }
                })
            })
        })

    </script>
</body>
</html>
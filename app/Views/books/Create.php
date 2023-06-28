<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" type="text/css" href="<?php echo base_url('assets/css/bootstrap.css') ?>">
    <link rel="stylesheet" type="text/css" href="<?php echo base_url('assets/css/style.css') ?>">
    <script src="https://code.jquery.com/jquery-3.7.0.min.js" integrity="sha256-2Pmvv0kuTBOenSvLm6bvfBSSHrUJ+3A7x6P5Ebd07/g=" crossorigin="anonymous"></script>
    <title>Book App</title>
</head>
<body>
    <div class="container-fluid bg-red shadow sm">
        <div class="container pb-2 pt-2">
            <div class="text-white h4">Book Application
            </div>
        </div>
    </div>
    <div class="bg-white shadow sm">
        <div class="container">
            <div class="row">
                <div class="nav nav-underline">
                    <div class="nav-link">Books / Create</div>
                </div>
            </div>
        </div>
    </div>
    <div class="container mt-4">
        <div class="row">
            <div class="col-md-12 text-end">
                <a href="<?php echo base_url('book'); ?>" class="btn btn-outline-primary btn-sm" >BACK</a>
            </div>
            
        </div>
    </div>
    <div class="container mt-4">
        <div class="row">
            <div class="col-md-12">
                <div class="card">
                        <div class="card-header bg-red text-white">
                            <div class="card-header-title">Create Book</div>
                        </div>
                        <div class="card-body">
                            <form name="create-form" method="POST">
                                <div class="form-group">
                                    <label for="">Title</label>
                                    <input type="text" name="title" id="title" class="form-control <?php echo (isset($validation) && $validation->hasError('title')) ? 'is-invalid' :'' ?>" value="<?php echo set_value('title') ?>" >
                                    <?php //validation for Title field
                                        if(isset($validation) && $validation->hasError('title')){
                                            echo '<p class="invalid-feedback">'. $validation->getError('title').'</p>';
                                        }
                                    ?>
                                </div>

                                <div class="form-group">
                                    <label for="">Author</label>
                                    <input type="text" name="author" id="author" class="form-control <?php echo (isset($validation) && $validation->hasError('author')) ? 'is-invalid' :'' ?> " value="<?php echo set_value('author') ?>">
                                    <?php //validation for author field
                                        if(isset($validation) && $validation->hasError('author')){
                                            echo '<p class="invalid-feedback">'. $validation->getError('author').'</p>';
                                        }
                                    ?>
                                </div>

                                <div class="form-group">
                                    <label for="">Book No</label>
                                    <input type="text" name="isbno" id="isbno" class="form-control <?php echo (isset($validation) && $validation->hasError('isbno')) ? 'is-invalid' :'' ?>" value="<?php echo set_value('isbno') ?>" >
                                    <?php //validation for Book field
                                        if(isset($validation) && $validation->hasError('isbno')){
                                            echo '<p class="invalid-feedback">'. $validation->getError('isbno').'</p>';
                                        }
                                    ?>
                                </div>

                                <div class="form-group">
                                    <label for="">Genre</label><br/>
                                    <select name="genremenu" id="genremenu" required class="form-control <?php echo (isset($validation) && $validation->hasError('genremenu')) ? 'is-invalid' :'' ?>" >
                                        <option>Select a Genre</option>
                                        <?php 
                                            foreach($tbl_genre as $genre){
                                                echo "<option value='".$genre['genre_id']."' >".$genre['genre']."</option>";
                                            }
                                        ?>
                                        <p>
                                        <?php //validation for Genre field
                                        if(isset($validation) && $validation->hasError('genremenu')){
                                            echo '<p class="invalid-feedback">'. $validation->getError('genremenu').'</p>';
                                        }
                                    ?>
                                        </p>
                                    </select>
                                </div>
                                <button type="submit" id="submitbtn" class="btn btn-outline-success btn-sm mt-3" >Save</button>
                                
                            </form>
                        </div>
                </div>
            </div> 
        </div>
    </div>
</body>
</html>

<script>
    
</script>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" type="text/css" href="<?php echo base_url('assets/css/bootstrap.css') ?>">
    <link rel="stylesheet" type="text/css" href="<?php echo base_url('assets/css/style.css') ?>">
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
                    <div class="nav-link">Books / Edit</div>
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
                            <div class="card-header-title">Edit Book</div>
                        </div>
                        <div class="card-body">
                            <form name="create-form" method="POST" action="<?php echo base_url('book/edit/'.$book['id']); ?>">
                                <div class="form-group">
                                    <label for="">Title</label>
                                    <input type="text" name="title" id="title" class="form-control <?php echo (isset($validation) && $validation->hasError('title')) ? 'is-invalid' :'' ?>" value="<?php echo set_value('title', $book['title']); ?>" >
                                    <?php //validation for name field
                                        if(isset($validation) && $validation->hasError('title')){
                                            echo '<p class="invalid-feedback">'. $validation->getError('title').'</p>';
                                        }
                                    ?>
                                </div>

                                <div class="form-group">
                                    <label for="">Author</label>
                                    <input type="text" name="author" id="author" class="form-control <?php echo (isset($validation) && $validation->hasError('author')) ? 'is-invalid' :'' ?>" value="<?php echo set_value('author', $book['author']); ?>">
                                    <?php //validation for author field
                                        if(isset($validation) && $validation->hasError('author')){
                                            echo '<p class="invalid-feedback">'. $validation->getError('author').'</p>';
                                        }
                                    ?>
                                </div>

                                <div class="form-group">
                                    <label for="">Book No</label>
                                    <input type="text" name="isbno" id="isbno" class="form-control <?php echo (isset($validation) && $validation->hasError('isbno')) ? 'is-invalid' :'' ?>" value="<?php echo set_value('isbno', $book['isbno']); ?>" >
                                    <?php //validation for author field
                                        if(isset($validation) && $validation->hasError('isbno')){
                                            echo '<p class="invalid-feedback">'. $validation->getError('isbno').'</p>';
                                        }
                                    ?>
                                </div>

                                <div class="form-group">
                                    <label for="">Genre</label><br/>
                                    <select name="genremenu" id="genremenu" class="form-control">
                                        <?php
                                            foreach($genre as $val)
                                            {
                                        ?>
                                                <option value="<?php echo $val['genre_id']; ?>" <?php if(!empty($book['genre_id']) && $book['genre_id']==$val['genre_id']){ ?> selected <?php } ?>><?php echo $val['genre']; ?></option>
                                        <?php
                                            }
                                        ?>
                                    </select>
                                </div>
                                <button type="submit" class="btn btn-outline-success btn-sm mt-3" >Update</button>
                            </form>
                        </div>
                </div>
            </div>
            
        </div>
    </div>
    
</body>
</html>
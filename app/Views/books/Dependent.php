<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://code.jquery.com/jquery-3.7.0.min.js" integrity="sha256-2Pmvv0kuTBOenSvLm6bvfBSSHrUJ+3A7x6P5Ebd07/g=" crossorigin="anonymous"></script>
    <title>Document</title>
</head>
<body>
    <h3>Records</h3>
    <label>Country</label>
    <label>Country</label>
    <select name="country" id="country">
        <option>Select a Country</option>
    <?php
        //print_r($country) ;
        foreach($country as $row){
            echo "<option value='".$row['id']."' >".$row['country_name']."</option>";
        }
     ?>
     </select><br/>
     <Label>State</Label>
     <select name="state" id="state">
        <option>Select a State</option>
     </select><br/>
     <Label>City</Label>
     <select name="city" id="city">
        <option>Select a City</option>
     </select><br/>
</body>
</html>

<script>
    $(document).ready(function(){
        $("#country").change(function(){
            var country_id=$(this).val();
            //alert(country_id)
            $.ajax({
                url:'<?php echo base_url('dependent/state') ?>',
                method:'POST',
                cId:country_id,
                success:function(result){
                    console.log(result);
                }
            })
        })
    })
</script>
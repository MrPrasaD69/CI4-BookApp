<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://code.jquery.com/jquery-3.7.0.min.js" integrity="sha256-2Pmvv0kuTBOenSvLm6bvfBSSHrUJ+3A7x6P5Ebd07/g=" crossorigin="anonymous"></script>
    <title>Dropdown</title>
</head>
<style>
    .table, td{
        border:2px solid black;
    }
</style>
<body>
    <h3>Test</h3>
    <label>Name</label>
    <input type="text" name='name' id='name' value='' /><br/>
    <label>Email</label>
    <input type="email" name='email' id='email' value='' /><br/>
    
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
        $('#country').change(function(){
            var countryId=$(this).val();
            if(countryId!==''){
                $.ajax({
                    url:'<?php echo base_url(); ?>dropdown/getStates',
                    method:'POST',
                    type:'JSON',
                    data:'countryId='+countryId,
                    success:function(data){
                        console.log(data);
                        $('#state').empty();
                        $('#state').append('<option value="" >Select a State</option>');
                        $.each(data, function(key,value){
                            $('#state').append('<option value="'+value.id+'" >'+value.statename+'</option>');
                        });
                    }
                });
            }
            else{
                $('#state').empty();
                $('#state').append('<option value="" >Select a State</option>');
                $('#city').empty();
                $('#city').append('<option value="" >Select a City</option>');
            }
        }); 

        $('#state').change(function(){
            var stateId=$(this).val();
            if(stateId!==''){
                $.ajax({
                    url:'<?php echo base_url(); ?>dropdown/getCities',
                    method:'POST',
                    type:'JSON',
                    data:'stateId='+stateId,
                    success:function(data){
                        console.log(data);
                        $('#city').empty();
                        $('#city').append('<option value="" >Select a City</option>');
                        $.each(data, function(key,value){
                            $('#city').append('<option value="'+value.id+'" >'+value.cityname+'</option>');
                        });
                    }
                });
            }
            else{
                $('#city').empty();
                $('#city').append('<option value="" >Select a City</option>');
            }
        }); 

        
        /*
        $('#state').change(function(){
            var stateId=$(this).val();
            if(stateId!==''){
                $.ajax({
                    url:'/DropDown/getCities/'+stateId,
                    method:'POST',
                    dataType:'JSON',
                    success:function(response){
                        $('#city').empty();
                        $('#city').append('<option value="" >Select a City</option>');
                        $.each(response, function(key,value){
                            $('#city').append('<option value="'+value.id+'" >'+value.city_name+'</option>');
                        });
                    }
                });
            }
            else{
                $('#city').empty();
                $('#city').append('<option value="" >Select a City</option>');
            }
        });  */

    });

</script>
// Class Definition

var KTAddUser = function () {

	// Private Variables

	var _wizardEl;

	var _formEl;

	var _wizard;

	var _avatar;

	var validations_info;
	var validations_description;



	// Private Functions

	var _initWizard = function () {

		// Initialize form wizard

		_wizard = new KTWizard(_wizardEl, {

			startStep: 1, // initial active step number

			clickableSteps: true  // allow step clicking

		});



		// Validation before going to next page

		// _wizard.on('beforeNext', function (wizard) {
		// 	_wizard.goNext();
		// 	KTUtil.scrollTop();

		// 	_wizard.stop();  // Don't go to the next step

		// });



		// Change Event

		_wizard.on('change', function (wizard) {

			KTUtil.scrollTop();

		});

	}



	var _initValidations = function () {

		// Init form validation rules. For more info check the FormValidation plugin's official documentation:https://formvalidation.io/



		// Validation Rules For Step 1

		validations_info = FormValidation.formValidation(

			KTUtil.getById('kt_form'),
			{

				fields: {

					product_title: {

						validators: {

							notEmpty: {

								message: 'Name is required'

							}

						}

					},

					product_alias: {

						validators: {

							notEmpty: {

								message: 'Alias is required'

							}

						}

					},

					product_sku: {

						validators: {

							notEmpty: {

								message: 'Product Sku  is required'

							}

						}

					},

					category_id: {

						validators: {

							notEmpty: {

								message: 'Primary Category is required'

							}
						}

					},

					seconday_category_id: {

						validators: {

							notEmpty: {

								message: 'Category is required'

							}

						}

					},

					tags: {

						validators: {

							notEmpty: {

								message: 'Tags is required'

							}

						}

					},

					user_variant_id: {

						validators: {

							notEmpty: {

								message: 'User Variant is required'

							}

						}

					}
				},

				

				plugins: {

					trigger: new FormValidation.plugins.Trigger(),

					bootstrap: new FormValidation.plugins.Bootstrap()

				}

			}

		);

		validations_description = FormValidation.formValidation(

			KTUtil.getById('frm_description'),
			{

				fields: {

					short_description: {

						validators: {

							notEmpty: {

								message: 'Short description is required'

							}

						}

					},

					long_description: {

						validators: {

							notEmpty: {

								message: 'Long description is required'

							}

						}

					}
				},

				

				plugins: {

					trigger: new FormValidation.plugins.Trigger(),

					bootstrap: new FormValidation.plugins.Bootstrap()

				}

			}

		);

    }


    var faq = $('#frm_service_faq');
    var bfaq = $('#btn_service_faq');

    bfaq.click(function(e)
    {
    	faq.ajaxForm(
    	{
            beforeSend: function()
            {
                bfaq.attr('disabled', 'disabled');
            },
            success: function(e)
            {
                var resp = e.split('::');
                bfaq.removeAttr('disabled');

                if(resp[0]==200)
                {
                    Swal.fire({
		                text: resp[1],
		                icon: "success",
		                buttonsStyling: false,
		                confirmButtonText: "Ok, got it!",
						customClass: {
							confirmButton: "btn font-weight-bold btn-light"
						}
		            }).then(function() {
                                window.location = 'serviceFaq?id='+resp[2];
                    });
                }
                else
                {
                    Swal.fire({
		                text: resp[1],
		                icon: "error",
		                buttonsStyling: false,
		                confirmButtonText: "Ok, got it!",
						customClass: {
							confirmButton: "btn font-weight-bold btn-light"
						}
		            }).then(function() {
						KTUtil.scrollTop();
					});
                }
            },
            error:function()
            {
            	bfaq.removeAttr('disabled');
            }
        });
    });

    $('#category_id').on('change',function(){
    	$.ajax({
    		url:'getSubCategory',
    		type:'POST',
    		data:'category_id='+$(this).val(),
    		success:function(data)
    		{
    			$('#secondary_category_id').html(data);
    		}
    	});
    });

    // var fpr = $('#frm_purchase');
    // var bpr = $('#btn_purchase');

    // bpr.click(function(e)
    // {
    // 	fpr.ajaxForm(
    // 	{
    //         beforeSend: function()
    //         {
    //             bpr.attr('disabled', 'disabled');
    //         },
    //         success: function(e)
    //         {
    //             var resp = e.split('::');
    //             bpr.removeAttr('disabled');

    //             if(resp[0]==200)
    //             {
    //             	$('#purchase_modal').modal('hide');
    //             	$('#product_stock_panel').html(resp[2]);

    //                 Swal.fire({
		  //               text: resp[1],
		  //               icon: "success",
		  //               buttonsStyling: false,
		  //               confirmButtonText: "Ok, got it!",
				// 		customClass: {
				// 			confirmButton: "btn font-weight-bold btn-light"
				// 		}
		  //           });
    //             }
    //             else
    //             {
    //                 Swal.fire({
		  //               text: resp[1],
		  //               icon: "error",
		  //               buttonsStyling: false,
		  //               confirmButtonText: "Ok, got it!",
				// 		customClass: {
				// 			confirmButton: "btn font-weight-bold btn-light"
				// 		}
		  //           }).then(function() {
				// 		KTUtil.scrollTop();
				// 	});
    //             }
    //         },
    //         error:function()
    //         {
    //         	bpr.removeAttr('disabled');
    //         }
    //     });
    // });

	return {

		// public functions

		init: function () {

			_wizardEl = KTUtil.getById('kt_wizard');

			_formEl = KTUtil.getById('kt_form');



			_initWizard();

			_initValidations();

		}

	};

}();

var KTTypeahead = function() {



      var demo2 = function() {
        // constructs the suggestion engine
        var userSource = new Bloodhound({
            datumTokenizer: Bloodhound.tokenizers.whitespace,
            queryTokenizer: Bloodhound.tokenizers.whitespace,
            // `states` is an array of state names defined in "The Basics"
            remote: { 
                url: 'getManufacturerAutocomplete?query=%QUERY',
                wildcard: '%QUERY'
            }
        });

        userSource.initialize();

        $('#manufacturer').typeahead({
            hint: true,
            highlight: true,
            minLength: 1
        },
        {
            name: 'states',
            source: userSource
        }); 
    }

    

    return {
        // public functions
        init: function() {
            demo2();
         

        }
    };

}();

// Class definition
var KTSelect2 = function() {
    // Private functions
    var select2_demos = function() {
        $('#secondary_category_id').select2({
            placeholder: "Select a category"
        });

    }

    // Public functions
    return {
        init: function() {
            select2_demos();
        }
    };
}();

var KTSummernoteDemo = function () {
    // Private functions
    var editor_demos = function () {
        $('.summernote').summernote({
            height: 250,
            tabsize: 2,
            followingToolbar: true,
        });
    }

    return {
        // public functions
        init: function() {
            editor_demos();
        }
    };
}();


$('.add_more_desc').click(function()
{
	var counter = parseInt($('#member_count').val());

	$.ajax({
		url:'getDescription',
		type:'POST',
		data:'count='+counter,
		success:function(data)
		{
			var html = data;
			$('#member_count').val((counter+1));
			$('#description-child').append(html);
			KTSummernoteDemo.init();
		}
	});
	
	// 
});

$('.desc_tab').click(function()
{
	KTSummernoteDemo.init(); 
});

var KTSelect2 = function() {

    // Private functions

    var select2_demos = function() {

        // basic

          $('#designation_id').select2({
            placeholder: "Select a Designation",
            
        });

           $('#related_product').select2({
            placeholder: "Select a related product",
            
        });

    }

    



    // Public functions

    return {

        init: function() {

            select2_demos();

        }

    };

}();

jQuery(document).ready(function () {
	KTAddUser.init();
	KTTypeahead.init();
	KTSelect2.init();
	// KTBootstrapDatepicker.init();
	KTSummernoteDemo.init();
});

// $(document).ready(function(){
// 	var product_id = $('#product_id').val();

// 	if(product_id!='')
// 	{
// 		KTSummernoteDemo.init();
// 	}
// });

function selectAll(attribute_id)
{
	$("#"+attribute_id+"_attribute_value_id").find('option').prop("selected","selected");
    $("#"+attribute_id+"_attribute_value_id").find('option').trigger("change");
    $("#"+attribute_id+"_attribute_value_id").find('option').click();
}

function deselectAll(attribute_id)
{
	$("#"+attribute_id+"_attribute_value_id").find('option').prop("selected",false);
    $("#"+attribute_id+"_attribute_value_id").find('option').trigger("change");
    $("#"+attribute_id+"_attribute_value_id").find('option').click();
}

function deleteAttr(attribute_id)
{
	var product_id = $('#product_attribute_id').val();

	if(product_id=='')
	{
		$('#attr_'+attribute_id).remove();
		$('select#attribute option[value='+attribute_id+']').prop('disabled', false);
	}
	else
	{
		swal.fire({
            title: "Delete Attribute!",
            text: 'Are you sure to delete this attribute and reset added variation?',
            icon: "success",
            buttonsStyling: false,
            confirmButtonText: "<i class='la la-headphones'></i> Yes!",
            showCancelButton: true,
            cancelButtonText: "<i class='la la-thumbs-down'></i> No, thanks",
            customClass: {
                confirmButton: "btn btn-danger",
                cancelButton: "btn btn-default"
            }
        }).then((result) => {
          if (result.value) 
          {
            $.ajax({
				url:'deleteAttribute',
				type:'POST',
				data:'attribute_id='+attribute_id+'&product_id='+product_id,
				success:function(data)
				{
					$('#attr_'+attribute_id).remove();
					$('select#attribute option[value='+attribute_id+']').prop('disabled', false);
					$('#variation_content').html('');
				}
			});
          }
          else if (result.dismiss === 'cancel') 
          {
            
          }
        });
	}
}

function deleteVariation(product_id,key='')
{
	swal.fire({
        title: "Delete Variation!",
        text: 'Are you sure to delete this variation?',
        icon: "success",
        buttonsStyling: false,
        confirmButtonText: "<i class='la la-headphones'></i> Yes!",
        showCancelButton: true,
        cancelButtonText: "<i class='la la-thumbs-down'></i> No, thanks",
        customClass: {
            confirmButton: "btn btn-danger",
            cancelButton: "btn btn-default"
        }
    }).then((result) => {
      	if (result.value) 
      	{
			$.ajax({
				url:'deleteVariation',
				type:'POST',
				data:'key='+key+'&product_id='+product_id,
				success:function(data)
				{
					$('#'+key).remove();
				}
			});
		}
      	else if (result.dismiss === 'cancel') 
      	{
        
      	}
	});
}

function addMore()
{
	var img_ctr = parseInt($('#img_ctr').val());
	var counter = (img_ctr+1);
	$('#img_ctr').val((img_ctr+1));
	var html = '<span id="image_panel_prod_'+counter+'" style="margin-right:0px;"><div class="fileinput fileinput-new" data-provides="fileinput"><div class="remove-bu" onclick="removeImage(this);" data-image="NA" data-mode="S"><i class="flaticon-delete text-danger"></i></div><div class="fileinput-new thumbnail" style="width: 200px; height: 150px;margin-top:0px;"><img src="http://marketplace.iifjs.com/upload/placehoder.png"/></div><div class="fileinput-preview fileinput-exists thumbnail" style="max-width: 200px; max-height: initial;"></div><div class="padd-top-mines1"><span class="btn green btn-file pad-lef-0"><span class="fileinput-new btn btn-sm btn-clean btn-icon btn-icon-sm"><i class="flaticon-upload-1 text-warning"></i> </span><span class="fileinput-exists btn btn-sm btn-clean btn-icon btn-icon-sm"><i class="flaticon2-edit text-primary"></i> </span><input type="file" name="image_prod[]"/></span><a href="#" class="btn btn-sm btn-clean btn-icon btn-icon-sm blue fileinput-exists" data-dismiss="fileinput"><i class="flaticon-delete text-danger"></i> </a><label class="radio radio-outline radio-brand varation_rd"> <input type="radio" name="default_img" value="'+counter+'"/><span></span></label></div></div></span>';
	$('#image_panel_prod').append(html);
}

function removeImage(mod)
{
	var image = $(mod).attr('data-image');
	var mode = $(mod).attr('data-mode');
	var product_id = $(mod).attr('data-id');

	swal.fire({
        title: "Delete Image!",
        text: "Are you sure want to delete this image!",
        icon: "success",
        buttonsStyling: false,
        confirmButtonText: "<i class='la la-headphones'></i> Yes!",
        showCancelButton: true,
        cancelButtonText: "<i class='la la-thumbs-down'></i> No, thanks",
        customClass: {
        confirmButton: "btn btn-danger",
        cancelButton: "btn btn-default"
        }
    }).then((result) => {
        if(result.value) 
        {
            $.ajax({
                url:'deleteImage',
                type:'POST',
                data:'image='+image+'&mode='+mode+'&product_id='+product_id,
                success:function(data)
                {
                    var resp = data.split('::');

                    if(resp[0]==200)
                    {
                        var msg = 'Image Deleted Successfully';

                        swal.fire({
			                // position: "top-right",
			                icon: "success",
			                title: msg,
			                showConfirmButton: false,
			                timer: 1500
			            });

                        if(mode=='S')
                        {
                        	$(mod).parent('div').parent('span').remove();
                        }
                        else
                        {
                        	$(mod).parent('div').remove();	
                        }
			            
                    }
                }
            });
        }
    });
}

function addMoreFaq() 
{
	


	var faq_counter = parseInt($('#faq_counter').val());
	var new_counter = parseInt($('#faq_counter').val())+1;
	var answer_counter = parseInt($('#answer_counter').val())+1;


	var html = '<span id="faq_'+new_counter+'" style="margin-left:15px;">\
					<div class="form-group row">\
					<div class="col-lg-5">\
						<label>Question:</label>\
						<textarea class="form-control" name="question[]"></textarea>\
						<span class="form-text text-muted">Please enter product meta title</span>\
					</div>\
					<div class="col-lg-5">\
						<label>Answer:</label>\
						<textarea class="form-control summernote" name="answer[]">\
						</textarea>\
					</div>\
					<div class="col-lg-4">\
						<label>Is Show Table:</label><br/>\
						<input type="checkbox" data-ctr="'+new_counter+'"  name="is_show_table_'+faq_counter+'" id="is_show_table" value="Y" onclick="showTable(this)" /> Is Show Table\
					</div>\
					<div class="col-lg-8">\
					</div>\
					<div class="table-responcive mt-10 col-lg-12 tbl_'+faq_counter+'" style="display:none;">\
						<table class="table" border="" width="100%" style="border: 1px solid #ccc;">\
						<tr>\
							<th>Title</th>\
							<th>Charges</th>\
							<th>Action</th>\
						</tr>\
							<tr id="answer_'+faq_counter+'_'+answer_counter+'">\
								<td>\
									<input type="text" class="form-control" name="title_'+faq_counter+'[]" id="title_'+answer_counter+'">\
								</td>\
								<td>\
									<input type="text" class="form-control" name="charges_'+faq_counter+'[]" id="charges_'+answer_counter+'">\
								</td>\
								<td>\
						 			<a href="javascript:void(0);" onclick="addTable('+faq_counter+','+answer_counter+');" class="btn-info">\
						 			<i class="fa fa-plus"></i></a>\
								</td>\
							</tr>\
						<?php } ?>\
						</table>\
					</div>\
					<div class="col-lg-2"><br/>\
						<a href="javascript:void(0);" onclick="removeTable('+new_counter+','+answer_counter+')"  class="btn btn-sm font-weight-bolder btn-light-danger">\
							<i class="la la-trash-o"></i>Delete</a>\
					</div>\
					</div>\
				</span>';
	
	$('#faq_panel').append(html);
	$('#faq_counter').val(new_counter);
	$('#answer_counter').val(answer_counter);

	KTSummernoteDemo.init();
}

function addMoreServices() 
{
	var new_counter = parseInt($('#services_counter').val())+1;
	var html = '<span id="services_'+new_counter+'" style="margin-left:15px;"><div class="form-group row"><div class="col-lg-6"><label>Product Services:</label><input class="form-control" name="product_services[]"></div><span class="image_panel_prod" style="margin-right:0px;"><div class="fileinput fileinput-new" data-provides="fileinput"><div class="remove-bu" onclick="removeImage('+new_counter+');" data-image="NA" data-mode="S"><i class="flaticon-delete text-danger"></i></div><div class="fileinput-new thumbnail" style="width: 200px; height: 150px;margin-bottom:0px;"><img src="http://marketplace.iifjs.com/upload/placehoder.png"/></div><div class="fileinput-preview fileinput-exists thumbnail" style="max-width: 200px; max-height: initial;"><img src="<?php echo $image_val; ?>"></div><div class="padd-top-mines"><span class="btn green btn-file left-padd-mo"><span class="fileinput-new btn btn-sm btn-clean btn-icon btn-icon-sm"><i class="flaticon-upload-1 text-warning"></i></span><span class="fileinput-exists btn btn-sm btn-clean btn-icon btn-icon-sm"><i class="flaticon2-edit text-primary"></i></span><input type="file" name="image[]"/></span></div></div></span>';
	
	$('#services_panel').append(html);
	$('#services_counter').val(new_counter);
	KTSummernoteDemo.init();
}


 function addAnswer(tr_id)
   {
      var counter  = parseInt($('#answer_counter').val())+1;
      var cnt   = (parseInt(tr_id)+1);
      var div_wrap = (parseInt(tr_id)+1);    
      //var inputVal = $('#job_identification_'+cnt).val()
      //var iqi_values = $('#iqi_val').val();
   
      // alert("counter="+counter+" cnt="+cnt);
      // return false;
      
      var x = 'some string';
      // if(counter <= 32)
      // {
            // if (inputVal != "")
            //  {
               $('#answer_counter').val(counter);
   
                  var html = '<tr id="answer_'+cnt+'"><td><input type="text" class="form-control" name="title[]" id="title_'+cnt+'"></td><td><input type="text" class="form-control" name="charges[]" id="charges_'+cnt+'"></td><td><a href="javascript:void(0);" onclick="addAnswer('+cnt+');" class="btn-info"><i class="fa fa-plus"></i></a> <a href="javascript:void(0);" onclick="removeAnswer('+cnt+');"><i class="fa fa-minus"></i></a></td></tr>';
                  
                  var new_id = 0;
   
                  // alert(counter+" "+cnt);
   
                  
                  
   
                  // if ($('#retain').prop('checked'))
                  // {
                     $('#answer_'+tr_id).after(html);
                     //copyValues(tr_id,cnt);
                     
                  // }
                  // else
                  //    $('#answer_'+tr_id).after(html);
                  
                  //totalinches();
                  
               
             // }    
             // else
             // {
                  // alert("Tabel row canot be blank")
             // }
      // }
      // else
      // {
      //    alert("reached maximum row limit");
      // }
   
   }


    function removeAnswer(tr_id)
   {
      var counter = $('#answer_counter').val();
      $('#answer_'+tr_id).remove();
   
      
   
   }

function removeFaq(counter) 
{
	$('#faq_'+counter).remove();
}


function removeServices(counter) 
{
	$('#services_'+counter).remove();
}
function purchaseProduct()
{
	var product_id = $('#product_variation_id').val();

	$.ajax({
		url:'purchaseProduct',
		type:'POST',
		data:'product_id='+product_id,
		success:function(data)
		{
			$('#purchase_modal').modal('show');
			$('#product_stock_id').val(product_id);
			$('#purchase_form').html(data);
			$('#btn_purchase').show();
			KTBootstrapDatepicker.init();
		}
	});
}

function viewPurchase()
{
	var product_id = $('#product_variation_id').val();

	$.ajax({
		url:'viewPurchase',
		type:'POST',
		data:'product_id='+product_id,
		success:function(data)
		{
			var resp = data.split('::');

			if(resp[0]==200)
			{
				$('#purchase_show_modal').modal('show');
				$('#purchase_content').html(resp[1]);
			}
			else
			{
				Swal.fire({
		                text: resp[1],
		                icon: "error",
		                buttonsStyling: false,
		                confirmButtonText: "Ok, got it!",
						customClass: {
							confirmButton: "btn font-weight-bold btn-light"
						}
		            }).then(function() {
						KTUtil.scrollTop();
					});
			}

		}
	});
}

function managePurchase()
{
	alert("here");
}



	function sortOrder(mod)
	{

        var is_display_show = $('#is_display_show').val();

        if(is_display_show=='Y')
        {
            $('.sort_order').show();

        }
        else
        {
        	$('.sort_order').hide();
        }
            





    }


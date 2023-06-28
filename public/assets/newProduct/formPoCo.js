"use strict";



// Class Definition

var KTAddUser = function () {

	// Private Variables

	var _wizardEl;

	var _formEl;

	var _wizard;

	var _avatar;

	var validations_info;
	var validations_description;
	var validations_pricing;



	// Private Functions

	



	var _initValidations = function () {

		// Init form validation rules. For more info check the FormValidation plugin's official documentation:https://formvalidation.io/



		// Validation Rules For Step 1

		// validations_info = FormValidation.formValidation(

		// 	KTUtil.getById('kt_form'),
		// 	{

		// 		fields: {

		// 			product_title: {

		// 				validators: {

		// 					notEmpty: {

		// 						message: 'Name is required'

		// 					}

		// 				}

		// 			},

		// 			product_alias: {

		// 				validators: {

		// 					notEmpty: {

		// 						message: 'Alias is required'

		// 					}

		// 				}

		// 			},

		// 			product_sku: {

		// 				validators: {

		// 					notEmpty: {

		// 						message: 'Product Sku  is required'

		// 					}

		// 				}

		// 			},

		// 			category_id: {

		// 				validators: {

		// 					notEmpty: {

		// 						message: 'Primary Category is required'

		// 					}
		// 				}

		// 			},

		// 			seconday_category_id: {

		// 				validators: {

		// 					notEmpty: {

		// 						message: 'Category is required'

		// 					}

		// 				}

		// 			},

		// 			tags: {

		// 				validators: {

		// 					notEmpty: {

		// 						message: 'Tags is required'

		// 					}

		// 				}

		// 			},

		// 			user_variant_id: {

		// 				validators: {

		// 					notEmpty: {

		// 						message: 'User Variant is required'

		// 					}

		// 				}

		// 			}
		// 		},

				

		// 		plugins: {

		// 			trigger: new FormValidation.plugins.Trigger(),

		// 			bootstrap: new FormValidation.plugins.Bootstrap()

		// 		}

		// 	}

		// );

    }


	var fa = $('#kt_form');
    var ba = $('#btn_po_co_products');

    ba.click(function(e)
    {
    	// validations_info.validate().then(function(status) 
    	// {
     //    	if (status == 'Valid') 
     //    	{
                fa.ajaxForm({
                    beforeSend: function()
                    {
                        ba.attr('disabled', 'disabled');
                    },
                    success: function(e)
                    {
                        var resp = e.split('::');
                        ba.removeAttr('disabled');

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

								var order_id = $('#order_id').val();

								if(order_id=='')
								{
									order_id = resp[2];
								}
								
								// window.location = 'listPoCoProducts?order_id='+order_id;

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
                      error: function(e)
                      {
                      	Swal.fire({
			                text: "Something went wrong, please try again",
			                icon: "error",
			                buttonsStyling: false,
			                confirmButtonText: "Ok, got it!",
							customClass: {
								confirmButton: "btn font-weight-bold btn-light"
							}
			            });
                        ba.removeAttr('disabled');
                      }
                });
  //           } 
  //           else 
  //           {
  //           	e.preventDefault();
            	
		// 		Swal.fire({

	 //                text: "Sorry, looks like there are some errors detected, please try again.",

	 //                icon: "error",

	 //                buttonsStyling: false,

	 //                confirmButtonText: "Ok, got it!",

		// 			customClass: {

		// 				confirmButton: "btn font-weight-bold btn-light"

		// 			}

	 //            }).then(function() {

		// 			KTUtil.scrollTop();

		// 		});

		// 		return false;

		// 	}
		// });
    });

    var ft = $('#frm_track_detail');
    var bt = $('#btn_track_detail');

    bt.click(function(e)
    {
        ft.ajaxForm({
            beforeSend: function()
            {
                bt.attr('disabled', 'disabled');
            },
            success: function(e)
            {
                var resp = e.split('::');
                bt.removeAttr('disabled');

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
		            });
                }

              },
              error: function(e)
              {
              	Swal.fire({
	                text: "Something went wrong, please try again",
	                icon: "error",
	                buttonsStyling: false,
	                confirmButtonText: "Ok, got it!",
					customClass: {
						confirmButton: "btn font-weight-bold btn-light"
					}
	            });
                bt.removeAttr('disabled');
              }
        });
    });

	return {

		// public functions

		init: function () {

			_formEl = KTUtil.getById('kt_form');



			

			_initValidations();

			_initAvatar();

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
                url: 'getSkuAutocomplete?query=%QUERY',
                wildcard: '%QUERY'
            }
        });

        userSource.initialize();

        $('#sku').typeahead({
            hint: true,
            highlight: true,
            minLength: 1
        },
        {
            name: 'states',
            source: userSource
        }); 
    }

    var demo3 = function() {
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

        $('#qc_user').typeahead({
            hint: true,
            highlight: true,
            minLength: 1
        },
        {
            name: 'states',
            source: userSource
        }); 
    }

    var demo4 = function() {
        // constructs the suggestion engine
        var userSource = new Bloodhound({
            datumTokenizer: Bloodhound.tokenizers.whitespace,
            queryTokenizer: Bloodhound.tokenizers.whitespace,
            // `states` is an array of state names defined in "The Basics"
            remote: { 
                url: 'getAttributeAutocomplete',
                wildcard: '%QUERY',
                replace: function(url, uriEncodedQuery) 
                {
                    var id_data = '';

                    $('.typeaheadClass').each(function() 
                    {
                        if($(this).val()!='' && $(this).val()==uriEncodedQuery)
                        {
                            if(id_data=='')
                            {
                                id_data = $(this).attr('id')+'-'+$(this).val();
                            } 
                        } 
                        
                    });
                    
                    return url + '?query=' + id_data;
                }
            }
        });

        userSource.initialize();

        $('.typeaheadClass').typeahead({
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
            demo3();
            demo4();
        }
    };

}();

// Class definition
var KTSelect2 = function() {
    // Private functions
    var select2_demos = function() {
        // basic
        $('#product_tags').select2({
            placeholder: "Select a tags"
        });

        $('#secondary_category_id').select2({
            placeholder: "Select a category"
        });

        $('#user_variant_id').select2({
            placeholder: "Select a user variant"
        });

        $('#attribute_value_id').select2({
            placeholder: "Select a attribute value"
        });
    }

    // Public functions
    return {
        init: function() {
            select2_demos();
        }
    };
}();



// function imgPreview(input)
// {
// 	alert("here");
//     $('#kt_image_4')[0].src = (window.URL ? URL : webkitURL).createObjectURL(input.files[0]);
// }

var KTBootstrapDatepicker = function () {

    var arrows;
    if (KTUtil.isRTL()) {
        arrows = {
            leftArrow: '<i class="la la-angle-right"></i>',
            rightArrow: '<i class="la la-angle-left"></i>'
        }
    } else {
        arrows = {
            leftArrow: '<i class="la la-angle-left"></i>',
            rightArrow: '<i class="la la-angle-right"></i>'
        }
    }
    
    // Private functions
    var demos = function () {
        
        // orientation 
        $('.receive_date').datepicker({
            rtl: KTUtil.isRTL(),
            orientation: "top left",
            todayHighlight: true,
            format: "dd-mm-yyyy",
            templates: arrows
        });
    }

    return {
        // public functions
        init: function() {
            demos(); 
        }
    };
}();


jQuery(document).ready(function () {
	KTTypeahead.init();
	KTSelect2.init();
	KTBootstrapDatepicker.init();
});

$(document).ready(function(){
	

    $('#attribute').on('change',function(){
    	var attribute_id = $(this).val();

    	if(attribute_id!='')
    	{
    		$("#attribute option:selected"). attr('disabled','disabled');
    	
	    	$.ajax({
	    		url:'getAttributeValues',
	    		type:'POST',
	    		data:'attribute_id='+attribute_id,
	    		success:function(data)
	    		{
	    			var selected_id = $('#attribute_id').val();

	    			if(selected_id=='')
	    			{
	    				selected_id = attribute_id;
	    			}
	    			else
	    			{
	    				selected_id += ","+attribute_id;
	    			}

	    			$('#attribute_id').val(selected_id);
	    			$('#attribute_panel').append(data);
	    			$('#'+attribute_id+'_attribute_value_id').select2();
	    		}
	    	});
    	}
    	
    });

    $('#variation_type').on('change',function(){
    	var variation_type = $(this).val();
    	var product_id = $('#product_variation_id').val();
    	var counter = parseInt($('#counter').val());
    	$('#counter').val(counter+1);

    	$.ajax({
    		url:'getAllVariation',
    		type:'POST',
    		data:'variation_type='+variation_type+'&product_id='+product_id+'&counter='+counter,
    		success:function(data)
    		{
    			var resp = data.split("::");

    			if(resp[0]==302)
    			{
    				$('#variation_content').html('');

    				Swal.fire({
		                text: "Variation Deleted Successfully",
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
    			else
    			{
    				$('#variation_panel').append(resp[0]);

	    			if(resp[1]!=='' && typeof resp[1] !== 'undefined')
	    			{
	    				$('#counter').val(resp[1]);
	    			}
    			}
    		}
    	});
    });
});

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

function addMoreFaq() 
{
	var new_counter = parseInt($('#faq_counter').val())+1;
	var html = '<span id="faq_'+new_counter+'" style="margin-left:15px;"><div class="form-group row"><div class="col-lg-6"><label>Question:</label><textarea class="form-control" name="question[]"></textarea><span class="form-text text-muted">Please enter product meta title</span></div><div class="col-lg-6"><label>Answer:</label><textarea class="form-control summernote" name="answer_'+new_counter+'"></textarea><span class="form-text text-muted">Please enter product meta keywords</span></div></div></span>';
	
	$('#faq_panel').append(html);
	$('#faq_counter').val(new_counter);
	KTSummernoteDemo.init();
}

function removeFaq(counter) 
{
	var new_counter = parseInt(counter)+1;
	var html = '<span id="faq_'+new_counter+'">'+$('#faq_1').html()+'<div class="form-group row"><div class="col-lg-12"><a class="btn btn-danger" onclick="removeFaq('+new_counter+')"></div></div></span>';
	$('#faq_'+counter).remove();
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

$(document).on('typeahead:selected','#sku',function() 
{
    var product_id = $('#product_id').val();

    alert(product_id);
    
	$.ajax({
		url:'getProductVariation',
		type:'POST',
		data:'product_sku='+$(this).val()+'&product_id='+product_id,
		success:function(data)
		{
			var resp = data.split('::');
			$('.row_content').remove();
            $('#product_panel').html('');
			$('#product_panel').append(resp[1]);
            $('.tot_order').html('0');
            $('.tot_receive').html('0');
            $('.tot_bad_inv').html('0');
            $('.tot_good_inv').html('0');
            $('.tot_sale_inv').html('0');
            clear_form_elements('first_row_content');

			if(resp[2]!='')
			{
				$('.fileinput').removeClass('fileinput-new');
				$('.fileinput').addClass('fileinput-exists');
				$('#display_img').attr('src','http://niharexpress.com/manekratna/upload/product/'+resp[2]);
				$('#preload_image').val(resp[2]);
			}
		}
	});
});

function managePurchase()
{
	alert("here");
}


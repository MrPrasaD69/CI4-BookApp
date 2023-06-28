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

	var _initWizard = function () {

		// Initialize form wizard

		_wizard = new KTWizard(_wizardEl, {

			startStep: 1, // initial active step number

			clickableSteps: true  // allow step clicking

		});



		// Validation before going to next page

		_wizard.on('beforeNext', function (wizard) {
			_wizard.goNext();
			KTUtil.scrollTop();

			_wizard.stop();  // Don't go to the next step

		});



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

		validations_pricing = FormValidation.formValidation(

			KTUtil.getById('frm_pricing'),
			{

				fields: {

					price: {

						validators: {

							notEmpty: {

								message: 'MRP is required'

							}

						}

					},

					sales_price: {

						validators: {

							notEmpty: {

								message: 'Sale price is required'

							}

						}

					},

					weight: {

						validators: {

							notEmpty: {

								message: 'Weight is required'

							}

						}

					},

					product_width: {

						validators: {

							notEmpty: {

								message: 'Width is required'

							}

						}

					},

					product_height: {

						validators: {

							notEmpty: {

								message: 'Hight is required'

							}

						}

					},

					product_length: {

						validators: {

							notEmpty: {

								message: 'Length is required'

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



	var _initAvatar = function () {

		_avatar = new KTImageInput('kt_user_add_avatar');

	}


	var fa = $('#kt_form');
    var ba = $('#btn_admin');

    ba.click(function(e)
    {
    	validations_info.validate().then(function(status) 
    	{
        	if (status == 'Valid') 
        	{
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

								$('#product_info_id').val(resp[2]);
								$('#product_description_id').val(resp[2]);
								$('#product_pricing_id').val(resp[2]);
								$('#product_attribute_id').val(resp[2]);
								$('#product_variation_id').val(resp[2]);
								$('#product_faq_id').val(resp[2]);
								$('#product_meta_id').val(resp[2]);

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
            } 
            else 
            {
            	e.preventDefault();
            	
				Swal.fire({

	                text: "Sorry, looks like there are some errors detected, please try again.",

	                icon: "error",

	                buttonsStyling: false,

	                confirmButtonText: "Ok, got it!",

					customClass: {

						confirmButton: "btn font-weight-bold btn-light"

					}

	            }).then(function() {

					KTUtil.scrollTop();

				});

				return false;

			}
		});
    });

    var fd = $('#frm_description');
    var bd = $('#btn_description');

    bd.click(function(e)
    {
    	validations_description.validate().then(function(status) 
    	{
        	if (status == 'Valid') 
        	{
                fd.ajaxForm({
                    beforeSend: function()
                    {
                        bd.attr('disabled', 'disabled');
                    },
                    success: function(e)
                    {
                        var resp = e.split('::');
                        bd.removeAttr('disabled');

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
            } 
            else 
            {
            	e.preventDefault();
            	
				Swal.fire({

	                text: "Sorry, looks like there are some errors detected, please try again.",

	                icon: "error",

	                buttonsStyling: false,

	                confirmButtonText: "Ok, got it!",

					customClass: {

						confirmButton: "btn font-weight-bold btn-light"

					}

	            }).then(function() {

					KTUtil.scrollTop();

				});

				return false;

			}
		});
    });

    var fp = $('#frm_pricing');
    var bp = $('#btn_pricing');

    bp.click(function(e)
    {
    	validations_pricing.validate().then(function(status) 
    	{
        	if (status == 'Valid') 
        	{
                fp.ajaxForm({
                    beforeSend: function()
                    {
                        bp.attr('disabled', 'disabled');
                    },
                    success: function(e)
                    {
                        var resp = e.split('::');
                        bp.removeAttr('disabled');

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
                        bp.removeAttr('disabled');
                      }
                });
            } 
            else 
            {
            	e.preventDefault();
            	
				Swal.fire({

	                text: "Sorry, looks like there are some errors detected, please try again.",

	                icon: "error",

	                buttonsStyling: false,

	                confirmButtonText: "Ok, got it!",

					customClass: {

						confirmButton: "btn font-weight-bold btn-light"

					}

	            }).then(function() {

					KTUtil.scrollTop();

				});

				return false;

			}
		});
    });

    var fat = $('#frm_attribute');
    var bat = $('#btn_attribute');

    bat.click(function(e)
    {
    	fat.ajaxForm(
    	{
            beforeSend: function()
            {
                bat.attr('disabled', 'disabled');
            },
            success: function(e)
            {
                var resp = e.split('::');
                bat.removeAttr('disabled');

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
		            }).then(function() {
						KTUtil.scrollTop();
					});
                }
            },
            error:function()
            {
            	bat.removeAttr('disabled');
            }
        });
    });

    var fva = $('#frm_variant');
    var bva = $('#btn_variant');

    bva.click(function(e)
    {
    	fva.ajaxForm(
    	{
            beforeSend: function()
            {
                bva.attr('disabled', 'disabled');
            },
            success: function(e)
            {
                var resp = e.split('::');
                bva.removeAttr('disabled');

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
		            }).then(function() {
						KTUtil.scrollTop();
					});
                }
            },
            error:function()
            {
            	bva.removeAttr('disabled');
            }
        });
    });

    var fme = $('#frm_meta');
    var bme = $('#btn_meta');

    bme.click(function(e)
    {
    	fme.ajaxForm(
    	{
            beforeSend: function()
            {
                bme.attr('disabled', 'disabled');
            },
            success: function(e)
            {
                var resp = e.split('::');
                bme.removeAttr('disabled');

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
		            }).then(function() {
						KTUtil.scrollTop();
					});
                }
            },
            error:function()
            {
            	bme.removeAttr('disabled');
            }
        });
    });

    var faq = $('#frm_faq');
    var bfaq = $('#btn_faq');

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

    var fpr = $('#frm_purchase');
    var bpr = $('#btn_purchase');

    bpr.click(function(e)
    {
    	fpr.ajaxForm(
    	{
            beforeSend: function()
            {
                bpr.attr('disabled', 'disabled');
            },
            success: function(e)
            {
                var resp = e.split('::');
                bpr.removeAttr('disabled');

                if(resp[0]==200)
                {
                	$('#purchase_modal').modal('hide');
                	$('#product_stock_panel').html(resp[2]);

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
		            }).then(function() {
						KTUtil.scrollTop();
					});
                }
            },
            error:function()
            {
            	bpr.removeAttr('disabled');
            }
        });
    });

	return {

		// public functions

		init: function () {

			_wizardEl = KTUtil.getById('kt_wizard');

			_formEl = KTUtil.getById('kt_form');



			_initWizard();

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
                url: 'getShelfAutocomplete?query=%QUERY',
                wildcard: '%QUERY'
            }
        });

        userSource.initialize();

        $('#shelf_id').typeahead({
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

        $('#manufacturer_id').typeahead({
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

// var KTFormRepeater = function() {

//     // Private functions
//     var repeater_demo = function() {
//         $('#kt_repeater_1').repeater({
//             initEmpty: false,
           
//             defaultValues: {
//                 'text-input': 'foo'
//             },
             
//             show: function () {
//                 $(this).slideDown();
//             },

//             hide: function (deleteElement) {                
//                 $(this).slideUp(deleteElement);                 
//             }   
//         });
//     }

//     return {
//         // public functions
//         init: function() {
//             repeater_demo();
//         }
//     };
// }();

// function imgPreview(input)
// {
// 	alert("here");
//     $('#kt_image_4')[0].src = (window.URL ? URL : webkitURL).createObjectURL(input.files[0]);
// }

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
	var counter = parseInt($('#description_count').val());

	$.ajax({
		url:'getDescription',
		type:'POST',
		data:'count='+counter,
		success:function(data)
		{
			var html = data;
			$('#description_count').val((counter+1));
			$('#description-child').append(html);
			KTSummernoteDemo.init();
		}
	});
	
	// 
});

jQuery(document).ready(function () {
	KTAddUser.init();
	KTTypeahead.init();
	KTSelect2.init();
	// KTFormRepeater.init();
	KTSummernoteDemo.init();
});

$(document).ready(function(){
	var product_id = $('#product_id').val();

	if(product_id!='')
	{
		KTSummernoteDemo.init();
	}
	
	$(document).on('typeahead:selected','#role_id',function() 
    {
        var role_id = $(this).val().toLowerCase();
        var first_name = $('#first_name').val();
        var last_name = $('#last_name').val();
        var username = $('#username').val();

        $('#role_id').val(role_id);

        if(username=='')
        {
        	$.ajax({
	        	url:'getUserCode',
	        	type:'POST',
	        	data:'first_name='+first_name+'&last_name='+last_name,
	        	success:function(data)
	        	{
	        		var resp = data.split("::");

	        		if(resp[0]==200)
	        		{
	        			$('#username').val(resp[1]);
	        		}
	        	}
	        });
        }

        if(role_id=='stockist')
        {
        	$('#stockist_panel').show();
        	$('#sales_panel').hide();
        }
        else if(role_id=='sales staff')
        {
        	$('#stockist_panel').hide();
        	$('#sales_panel').show();
        }
        else
        {
        	$('#stockist_panel').hide();
        	$('#sales_panel').hide();
        }
    });

    $(document).on('typeahead:selected','#hierarchy_id',function() 
    {
    	var hierarchy = $(this).val().toLowerCase();

    	$('#hierarchy_id').val(hierarchy);

    	$.ajax({
        	url:'getHierarchyValueData',
        	type:'POST',
        	data:'hierarchy='+hierarchy,
        	success:function(data)
        	{
        		var resp = data.split("::");

        		if(resp[0]==200)
        		{
        			$('#hierarchy_value_id').html(resp[1]);
        		}
        	}
        });
    });

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
    				KTSummernoteDemo.init();

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

function addMore(counter)
{
	var img_ctr = parseInt($('#img_ctr_'+counter).val());
	$('#img_ctr_'+counter).val((img_ctr+1));
	var html = '<span id="image_panel_'+counter+'" style="margin-right:0px;"><div class="fileinput fileinput-new" data-provides="fileinput"><div class="fileinput-new thumbnail" style="width: 200px; height: 150px;margin-top:0px;"><img src="http://www.placehold.it/500px/EFEFEF/AAAAAA&text=no+image"/></div><div class="fileinput-preview fileinput-exists thumbnail" style="max-width: 200px; max-height: 150px;"><img src=""/></div><div class="padd-top-mines1"><span class="btn green btn-file pad-lef-0"><span class="fileinput-new btn btn-sm btn-clean btn-icon btn-icon-sm"><i class="flaticon-upload-1 text-warning"></i> </span><span class="fileinput-exists btn btn-sm btn-clean btn-icon btn-icon-sm"><i class="flaticon2-edit text-primary"></i> </span><input type="file" name="image_'+counter+'[]"/></span><a href="#" class="btn btn-sm btn-clean btn-icon btn-icon-sm blue fileinput-exists" data-dismiss="fileinput"><i class="flaticon-delete text-danger"></i> </a><label class="radio radio-outline radio-brand varation_rd"> <input type="radio" name="default_img_'+counter+'" value="'+img_ctr+'"/><span></span></label></div></div></span>';
	$('#images_append_panel_'+counter).append(html);
}

function addMoreFaq() 
{
	var new_counter = parseInt($('#faq_counter').val())+1;
	var html = '<span id="faq_'+new_counter+'" style="margin-left:15px;"><div class="form-group row"><div class="col-lg-6"><label>Question:</label><textarea class="form-control" name="question[]"></textarea><span class="form-text text-muted">Please enter product meta title</span></div><div class="col-lg-6"><label>Answer:</label><textarea class="form-control summernote" name="answer[]"></textarea><span class="form-text text-muted">Please enter product meta keywords</span></div></div><div class="form-group row"><div class="col-lg-6"></div><div class="col-lg-6"><a href="javascript:void(0);" onclick="removeFaq('+new_counter+')"  class="btn btn-sm font-weight-bolder btn-light-danger"><i class="la la-trash-o"></i>Delete</a></div></span>';
	
	$('#faq_panel').append(html);
	$('#faq_counter').val(new_counter);
	KTSummernoteDemo.init();
}

function removeFaq(counter) 
{
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

function managePurchase()
{
	alert("here");
}


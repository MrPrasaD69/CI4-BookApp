// Class Definition

var KTAddUser = function () {

	// Private Variables

	var _wizardEl;

	var _formEl;

	var _wizard;

	var _avatar;

	var validations_info;
	var validations_description;



	//main form submit call here
	var fa = $('#kt_form');
    var ba = $('#btn_admin');

    ba.click(function(e)
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
						
						window.location = 'newUpdate?id='+resp[2];
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
	});
}


$(document).ready(function(){
	// alert('works');
	$(".country").select2();
})
// $('body').on('click','#btn_admin',function(event){
// 	event.preventDefault();
// 	var countries=$('.country').val();
	
// }); 









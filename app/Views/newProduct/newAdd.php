<?php
	use App\Models\AdminDocumentModel;
	use Modules\Console\Controllers\Product;
	use App\Models\AttributeModel;
	use App\Models\AttributeValueModel;
	use App\Models\ProductBarcodeModel;
	use App\Models\BrandModel;
	use App\Models\ChargesTableModel;

	// echo "<pre>";
	// print_r($category);
	// exit;

?>
<?php echo $this->extend('Modules\Console\Views\templates\main'); ?>
<?php 
	$baseUrl = base_url()."/public/themes/consoleTheme";
	$basePath = "public/themes/consoleTheme";
	$role_id = (!empty($_SESSION['role_id']))?$_SESSION['role_id']:'';
	if(empty($services_data['image'][0]))

	{

	   $image_val = '';

	   

	   $cur_state = 'fileinput-new';

	}

	else

	{

	    $image_val = base_url()."/upload/services/".$services_data['image'][$img_key];

	   

	    $cur_state = 'fileinput-exists';

	}
?>


<?php echo $this->section('content'); ?>
<!--begin::Content-->
<div class="content d-flex flex-column flex-column-fluid" id="kt_content">
	<!--begin::Subheader-->
	<?php include($basePath."/includes/breadcrum.php"); ?>
	<!--end::Subheader-->
	<!--begin::Entry-->
	<div class="d-flex flex-column-fluid">
		<!--begin::Container-->
		<div class="container">
			<input type="hidden" id="step" value="<?php echo (!empty($_REQUEST['step']))?$_REQUEST['step']:'1'; ?>"/>
			<!--begin::Card-->
			<div class="card card-custom card-transparent"> 
				<div class="card-body p-0">
					<!--begin::Wizard-->
					<div class="car " id="">
					
						<!--begin::Card-->
						<div class="card card-custom card-shadowless rounded-top-0">
							<!--begin::Body-->
							<div class="card-body p-0">
								<div class="row justify-content-center py-8  px-lg-10">
									<div class="col-xl-12 col-xxl-10 ">
										<!--begin::Wizard Form-->
											<div class="row justify-content-center">
												<div class="col-xl-12 padding-left-right">
													<!--begin::Wizard Step 1-->
													<div class="my-5 step" data-wizard-type="step-content" data-wizard-state="current">
														<form class="form" id="kt_form" method="POST" action="<?php echo base_url(); ?>/console/newProduct/newManageData" enctype="multipart/form-data">
														
															<!--begin::Group-->
										
															<div class="form-group row">
																<div class="col-md-12 col-xs-12 col-sm-12">
																<h5 class="text-dark font-weight-bold mb-10 product_Variations">Course Information:</h5>
																<!-- <div> -->
																	<button type="submit" id="btn_admin" class="btn btn-primary font-weight-bolder px-9 py-4">Save</button>
																<!-- </div> -->
															</div>																	
															</div>
															<div class="form-group row">
																<div class="col-lg-4">
																	<label>Course Name:</label>
																	<input type="hidden" class="form-control" name="course_id" id="course_id" value="<?php echo (!empty($_REQUEST['id']))?$_REQUEST['id']:''; ?>" />
																	<input type="text" class="form-control" placeholder="Enter Course Name" name="course_title" id="course_title" value="<?php echo (!empty($allData[0]['course_name'])) ? $allData[0]['course_name'] : ""  ?>" />
																</div>
                                                            </div>

															<div class="form-group row">
																<div class="col-lg-4">
																	<label>Course Image:</label>
																	<input type="hidden" class="form-control" name="course_id" id="course_id" value="<?php echo !(empty($_REQUEST['id'])) ? $_REQUEST['id'] :"" ?>" /><br/>
																	<?php
																	if(empty($_REQUEST['id'])){ //display image when id is present
																	}
																	else{ ?>
																		<img src="<?php  echo !empty( $image_path) ? $image_path : "#" ?>" alt="course image" height="100px" />
																		<?php
																	}
																	?>
																	<input type="file" class="form-control" name="course_image" id="course_image"  />
																</div>
															</div>

															<div class="form-group row">
																<div class="col-lg-4">
																	<label>Country Name:</label>
																	<!-- <input type="hidden" class="form-control" name="course_id" id="course_id" /> -->
																	<select class="form-control country" name="country_menu" id="country_menu" multiple>
																		<?php if(!empty($_REQUEST['id']) && !empty($allData[0]['country'])) {?> <!-- for updating existing data -->
																			<option value="<?php echo $allData[0]['country'] ?>" selected ><?php echo $allData[0]['name'] ?></option>
																			<?php 
																			foreach($country as $c){ //show country names as other options
																				?> <option value="<?php echo $c['id'] ?>" ><?php echo $c['name'] ?></option> <?php
																			}
																		}
																		?>

																		<?php //for Addind new Data
																		if(empty($_REQUEST['id'])){
																			foreach($country_name as $country){
																				?>
																				<option value="<?php echo $country['id'] ?>"><?php echo $country['name'] ?></option>
																				<?php
																			} 
																		}
																	
																		?>
																	</select>
																</div>
															</div>
                                                        </form>		 
													</div>						
												</div>
											</div>
										</form>
										<!--end::Wizard Form-->
									</div>
								</div>
							</div>
							<!--end::Body-->
						</div>
						<!--end::Card-->
					</div>
					<!--end::Wizard-->
				</div>
			</div>
			<!--end::Card-->
		</div>
		<!--end::Container-->
	</div>
	<!--end::Entry-->
</div>
					<!--end::Content-->





<script type="text/javascript">


</script>

<?php echo $this->endSection(); ?>
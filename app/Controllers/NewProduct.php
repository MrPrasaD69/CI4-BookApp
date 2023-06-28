<?php 
namespace Modules\Console\Controllers;
use App\Controllers\BaseController;
use App\Models\BrandModel;
use App\Models\CountryModel;
use App\Models\CourseModel;
use App\Models\DescriptionTypeModel;
use App\Models\ProductFaqModel;
use App\Models\ProductModel;
use App\Models\AttributeModel;
use App\Models\AttributeValueModel;
use App\Models\CategoryModel;
use App\Models\ProductServicesModel;
use App\Models\ProductTypeModel;
use App\Models\Setting;
use App\Models\ShelfModel;
use App\Models\ProductBarcodeModel;
use App\Models\AdminModel;
use App\Models\LeadModel;
use App\Models\TagsModel;
use App\Models\TaxModel;
use App\Models\UserVariantModel;



class NewProduct extends BaseController
{
	public function index(){
		echo "Hello Index from new Product";
	}

    public function newList()
    {
        if(!empty($_REQUEST['pagination']['page']))
        {
            $model_product = new ProductModel;
				$model_attribute = new AttributeModel;
				$model_attribute_values = new AttributeValueModel;
				$start_limit = (($_REQUEST['pagination']['page']-1)*$_REQUEST['pagination']['perpage']);
				$end_limit = $_REQUEST['pagination']['perpage'];
				$admin_id = $this->readSession('admin_id');
				$role_id = $this->readSession('role_id');
				// $condition = 'tbl_product.status="1" and tbl_product.is_related_product != "Y"';

				if(empty($_REQUEST['query']['deleted']) && empty($_REQUEST['is_deleted']))
				{
					$condition = 'tbl_product.status="1" and tbl_product.product_id!="" and tbl_product.product_id IS NOT NULL';
				}
				else
				{
					$condition = 'tbl_product.status="0" and tbl_product.product_id!="" and tbl_product.product_id IS NOT NULL';
				}
				
				$condition_values = '';
				
				$stock_product_id = $this->readSession('stock_product_id');

				if(!empty($stock_product_id))
				{
					$condition .= ' and tbl_product.product_id="'.$stock_product_id.'"';
				}

				if($role_id==7 || $role_id==8)
				{
					$model_admin = new AdminModel;
					$login_admin_data = $model_admin->where('admin_id='.$admin_id)->first();
					$company_manufacturer = $model_admin->select('group_concat(admin_id) as admin_id')->where('company_name like "%'.$login_admin_data['company_name'].'%"')->first();
					$condition .= ' and tbl_product.manufacturer IN('.$login_admin_data['lead_id'].')';
				}

				if(!empty($_REQUEST['query']['activeStatus']))
				{
					if($_REQUEST['query']['activeStatus']=='Y')
					{
						$condition .= ' and tbl_product.published="Y"';
					}
					else
					{
						$condition .= ' and tbl_product.published!="Y"';
					}
				}

				if(!empty($_REQUEST['query']['blocked']))
				{
					$condition .= ' and tbl_product.admin_status="B"';
				}

				if(!empty($_REQUEST['query']['notApplied']))
				{
					switch($_REQUEST['query']['notApplied'])
					{
						case 'C':
								$condition .= ' and secondary_category_id=""';
								break;
						case 'T':
								$condition .= ' and (tbl_product.product_tags="" or tbl_product.product_tags IS NULL)';
								break;
						case 'S':
								$condition .= ' and (tbl_product.shelf_id="" or tbl_product.shelf_id IS NULL)';
								break;
						case 'P':
								$condition .= ' and (price="" or price IS NULL)';
								break;
						case 'A':
								$condition .= ' and tbl_product_variant.product_id IS NULL';
								break;
					}
				}

				if(!empty($_REQUEST['query']['stockAvailability']))
				{
					switch($_REQUEST['query']['stockAvailability'])
					{
						case 'S':
								$condition .= ' and (tbl_product_barcode.product_id!="" or tbl_product_barcode.product_id IS NOT NULL)';
								break;
						case 'O':
								$condition .= ' and (tbl_product_barcode.product_id="" or tbl_product_barcode.product_id IS NULL)';
								break;
					}
				}

				if(!empty($_REQUEST['query']['price']))
				{
					$price_arr = explode("-",$_REQUEST['query']['price']);

					if(!empty($price_arr[0]))
					{
						$condition .= ' and price >= '.$price_arr[0];
					}

					if(!empty($price_arr[1]))
					{
						$condition .= ' and price <= '.$price_arr[1];
					}
				}

				if(!empty($_REQUEST['query']['fromCreatedDate']))
				{
					$date_arr = explode("-",$_REQUEST['query']['fromCreatedDate']);
					$condition .= ' and tbl_product.added_on >= "'.strtotime($date_arr[2]."-".$date_arr[1] ."-".$date_arr[0].' 00:00:01').'"';
				}

				if(!empty($_REQUEST['query']['toCreatedDate']))
				{
					$date_arr = explode("-",$_REQUEST['query']['toCreatedDate']);
					$condition .= ' and tbl_product.added_on <= "'.strtotime($date_arr[2]."-".$date_arr[1]."-".$date_arr[0].' 23:59:59').'"';
				}

				if(!empty($_REQUEST['query']['fromUpdatedDate']))
				{
					$date_arr = explode("-",$_REQUEST['query']['fromUpdatedDate']);
					$condition .= ' and tbl_product.updated_on >= "'.strtotime($date_arr[2]."-".$date_arr[1]."-".$date_arr[0].' 00:00:01').'"';
				}

				if(!empty($_REQUEST['query']['toUpdatedDate']))
				{
					$date_arr = explode("-",$_REQUEST['query']['toUpdatedDate']);
					$condition .= ' and tbl_product.updated_on <= "'.strtotime($date_arr[2]."-".$date_arr[1]."-".$date_arr[0].' 23:59:59').'"';
				}
				
				if(!empty($_REQUEST['query']['skuFilter']))
				{
					$shelf_model = new ShelfModel;
					$shelf_data = $shelf_model->where('shelf="'.$_REQUEST['query']['skuFilter'].'"')->first();

					if(!empty($shelf_data['shelf_id']))
					{
						$condition .= ' and (product_sku ="'.$_REQUEST['query']['skuFilter'].'" or FIND_IN_SET('.$shelf_data['shelf_id'].',shelf_id))';
					} 
					else
					{
						$condition .= ' and product_sku ="'.$_REQUEST['query']['skuFilter'].'"';
					}
					
				}

				if(!empty($_REQUEST['query']['categoryFilter']))
				{
					$category_model = new CategoryModel;
					$category_data = $category_model->where('category="'.$_REQUEST['query']['categoryFilter'].'"')->first();

					if(!empty($category_data['category_id']))
					{
						$condition .= ' and (category_id ="'.$category_data['category_id'].'" or FIND_IN_SET('.$category_data['category_id'].',secondary_category_id))';
					} 
					else
					{
						$condition .= ' and category_id ="NA"';
					}
					
				}

				if(!empty($_REQUEST['query']['manufacturerFilter']))
				{
					$name_arr = explode(" ",$_REQUEST['query']['manufacturerFilter']);
					$admin_model = new AdminModel;
					$manufacturer_data = $admin_model->select('group_concat(admin_id) as admin_id')->where('company_name like "%'.$_REQUEST['query']['manufacturerFilter'].'%" and role_id IN("7","8")')->first();
					
					$lead_model = new LeadModel;
					$manufacturer_data = $lead_model->where('(lead_no like "'.$_REQUEST['query']['manufacturerFilter'].'%" or company_name like "'.$_REQUEST['query']['manufacturerFilter'].'%")')->first();
					// if(count($name_arr) > 1)
					// {
					// 	$manufacturer_data = $admin_model->where('first_name like"'.$name_arr[0].'" and last_name like "'.$name_arr[1].'" and is_manufacturer="Y"')->first();
					// }
					// else
					// {
					// 	$manufacturer_data = $admin_model->where('first_name like "'.$name_arr[0].'" or last_name like "'.$name_arr[0].'" and is_manufacturer="Y"')->first();
					// }

					// echo "<pre>";
					// echo 'lead_no like "'.$_REQUEST['query']['manufacturerFilter'].'"';
					// print_r($manufacturer_data);
					
					if(!empty($manufacturer_data['lead_id']))
					{
						$condition .= ' and manufacturer IN('.$manufacturer_data['lead_id'].')';
					} 
					else
					{
						$condition .= ' and manufacturer ="NA"';
					}
					
				}

				if(!empty($_REQUEST['query']['createdBy']))
				{
					$name_arr = explode(" ",$_REQUEST['query']['createdBy']);
					$admin_model = new AdminModel;
					
					if(count($name_arr) > 1)
					{
						$created_data = $admin_model->where('first_name like"'.$name_arr[0].'" or last_name like "'.$name_arr[1].'"')->first();
					}
					else
					{
						$created_data = $admin_model->where('first_name like "'.$name_arr[0].'" or last_name like "'.$name_arr[0].'"')->first();
					}
					
					if(!empty($created_data['admin_id']))
					{
						$condition .= ' and tbl_product.created_by IN('.$created_data['admin_id'].')';
					} 
					else
					{
						$condition .= ' and manufacturer ="NA"';
					}
					
				}

				if(!empty($_REQUEST['query']['tagsFilter']))
				{
					$condition .= ' and FIND_IN_SET("'.$_REQUEST['query']['tagsFilter'].'",product_tags)';
				}
				if(!empty($_REQUEST['query']['brand_name']))
				{
					$condition .= ' and tbl_brand.brand_name like"'.$_REQUEST['query']['brand_name'].'"';
				}

				if(!empty($_REQUEST['query']['typeaheadClass']))
				{
					$values = explode('::',$_REQUEST['query']['typeaheadClass']);

					$model_values = new AttributeValueModel;

					foreach($values as $values_val)
					{
						$val_arr = explode("-",$values_val);
						$value = $model_values->where('attribute_id='.$val_arr[0].' and attribute_value="'.$val_arr[1].'"')->first();

						if(!empty($value))
						{
							$condition_values .= ' and FIND_IN_SET("'.$value['attribute_value_id'].'",tbl_product_variant.product_attribute_values_id)';
						}
					}
				}

				if(!empty($_REQUEST['query']['selectClass']))
				{
					$values = explode('::',$_REQUEST['query']['selectClass']);

					foreach($values as $values_val)
					{
						$val_arr = explode("-",$values_val);
						
						if(!empty($val_arr))
						{
							$condition_values .= ' and FIND_IN_SET("'.$val_arr[1].'",tbl_product_variant.product_attribute_values_id)';
						}
					}
				}

				if(!empty($_REQUEST['query']['published']))
				{
					$condition .= ' and published="Y"';
				}

				if(!empty($_REQUEST['query']['bulk']))
				{
					$condition .= ' and bulk="Y"';
				}

				if(!empty($_REQUEST['query']['approval']))
				{
					$condition .= ' and approval="Y"';
				}

				if(!empty($_REQUEST['query']['net_priced']))
				{
					$condition .= ' and net_priced="Y"';
				}

				if(!empty($_REQUEST['query']['only_members']))
				{
					$condition .= ' and only_members="Y"';
				}

				if(!empty($_REQUEST['query']['pre_order']))
				{
					$condition .= ' and pre_order="Y"';
				}

				$field = 'id';
				$sort_order = 'desc';
				// echo $condition.$condition_values;
				// exit;
				$model_product = new ProductModel;
				$product_data = $model_product->select('tbl_product.*,tbl_product_variant.*,tbl_category.category as category, tbl_category.*,tbl_admin.*,tbl_product.product_id as id,tbl_product.added_on as added_on,tbl_product.updated_on as updated_on,tbl_product.active_status as active_status,tbl_product.admin_status as admin_status,tbl_product.admin_reason as admin_reason,tbl_product.created_by as created_by,tbl_product.updated_by as updated_by,tbl_product.status as delete_status')->join('tbl_product_variant','tbl_product_variant.product_id=tbl_product.product_id','left outer')->join('tbl_admin','tbl_admin.admin_id=tbl_product.manufacturer','left outer')->join('tbl_category','tbl_category.category_id = tbl_product.category_id','left outer')->where($condition.$condition_values)->groupBy('tbl_product.product_id')->orderBy($field,$sort_order)->findAll($end_limit,$start_limit);

				// echo "<pre>";
				// print_r($product_data);
				// exit;

				if(!empty($product_data))
				{
					$resp = array();
					$per_page = $_REQUEST['pagination']['perpage'];
					// $total_data = $model_product->select('count(tbl_product.product_id) as count')->join('tbl_product_variant','tbl_product_variant.product_id=tbl_product.product_id','left outer')->join('tbl_admin','tbl_admin.admin_id=tbl_product.created_by','left outer')->join('tbl_lead','tbl_lead.lead_id=tbl_product.manufacturer','left outer')->join('tbl_shelf','tbl_shelf.shelf_id=tbl_product.shelf_id','left outer')->where($condition.$condition_values)->groupBy('tbl_product.product_id')->orderBy($field,$sort_order)->first();
					$count_data = $model_product->select('count(tbl_product.product_id) as count, tbl_category.category as category')->join('tbl_product_variant','tbl_product_variant.product_id=tbl_product.product_id','left outer')->join('tbl_admin','tbl_admin.admin_id=tbl_product.manufacturer','left outer')->join('tbl_category','tbl_category.category_id = tbl_product.category_id','left outer')->where($condition.$condition_values)->first();
					$total_data = (!empty($count_data['count']))?$count_data['count']:'0';
					
					$total_pages = ceil($total_data/$per_page);
					// $all_data = $model_product->select('tbl_product.*,tbl_product_variant.*,tbl_admin.*,tbl_shelf.*,tbl_product.product_id as id,tbl_product.added_on as added_on,tbl_product.updated_on as updated_on')->join('tbl_product_variant','tbl_product_variant.product_id=tbl_product.product_id','left outer')->join('tbl_admin','tbl_admin.admin_id=tbl_product.manufacturer','left outer')->join('tbl_shelf','tbl_shelf.shelf_id=tbl_product.shelf_id','left outer')->join('tbl_product_barcode','tbl_product_barcode.product_id=tbl_product.product_id','left outer')->where($condition)->select('tbl_product.*,tbl_product.product_id as id')->groupBy('tbl_product.product_id')->orderBy($field,$sort_order)->findAll();
					$rowIds = array();

					

					// if(!empty($all_data))
					// {
					// 	foreach($all_data as $val)
					// 	{
					// 		$rowIds[] = $val['id'];
					// 	}
					// }

					if($total_pages == 0)
					{
						$total_pages = 1;
					}
					
					$resp['meta'] = array('page'=>$_REQUEST['pagination']['page'],'pages'=>$total_pages,'perpage'=>$per_page,'total'=>$total_data,'rowIds'=>$rowIds,'sort'=>'asc','field'=>'RecordId');
					$i=($start_limit+1);
					$model_product_barcode = new ProductBarcodeModel;
					$model_admin = new AdminModel;

					foreach($product_data as $key=>$val)
					{
						$created_str = '';
						$rowIds[] = $val['id'];
						$variant_data = (!empty($val['product_variation']))?json_decode($val['product_variation'],true):'';
						// $stock_count = $model_product_barcode->where('product_id='.$val['id'].' and is_scan="N" and is_hold="N"')->select('count(*) as count')->first();
						$info = '';

						
						
						if($val['type']=='V')
						{
							$img_arr = (!empty($variant_data[0]['image']))?explode(",",$variant_data[0]['image']):array();
						}
						else
						{
							$img_arr = (!empty($val['product_image']))?explode(",",$val['product_image']):array();
						}
						
						$resp['data'][$key]['srno'] = $i;
						$resp['data'][$key]['Id'] = $val['id'];
						$resp['data'][$key]['RecordId'] = (($key+1)+(($_REQUEST['pagination']['page']-1)*$_REQUEST['pagination']['perpage']));
						
						if(!empty($img_arr[0]) && file_exists(APPPATH."../upload/product/thumbnail/".$img_arr[0]))
						{
							$resp['data'][$key]['product_thumb_image'] = (!empty($img_arr[0]))?base_url()."/upload/product/thumbnail/".$img_arr[0]:'';
							$resp['data'][$key]['product_image'] = (!empty($img_arr[0]))?base_url()."/upload/product/thumbnail/".$img_arr[0]:'';
						}
						else
						{
							$resp['data'][$key]['product_thumb_image'] = (!empty($img_arr[0]))?base_url()."/upload/product/".$img_arr[0]:'';
							$resp['data'][$key]['product_image'] = (!empty($img_arr[0]))?base_url()."/upload/product/".$img_arr[0]:'';
						}
						
						$resp['data'][$key]['date'] = (!empty($val['added_on']))?'C : '.date('d-m-Y h:i:s a',$val['added_on']).'<br/>U : '.date('d-m-Y h:i:s a',$val['updated_on']):'';
						
						// if(!empty($contact_person_data['company_name']))
						// {
						// 	$resp['data'][$key]['manufacturer'] = $lead_data['company_name'];
						// }
						// else
						// {
							$resp['data'][$key]['lead_id'] = (!empty($lead_data['lead_id']))?$lead_data['lead_id']:'';
							$resp['data'][$key]['manufacturer'] = (!empty($lead_data['lead_no']))?$lead_data['lead_no']:$val['first_name'].' '.$val['last_name'];
						// }
						
						$resp['data'][$key]['product_sku'] = $val['product_sku'];
						$resp['data'][$key]['product_title'] = $val['product_title'];
						$resp['data'][$key]['category'] = $val['category'];
						$resp['data'][$key]['code'] = '';
						$resp['data'][$key]['shelf'] = (!empty($val['shelf']))?$val['shelf']:'';
						$resp['data'][$key]['product_price'] = (!empty($val['price']))?$val['price']:'';

						$resp['data'][$key]['stock'] = $info;
						$resp['data'][$key]['quantity'] = (!empty($total_qty))?$total_qty:'0';

						
						if($val['admin_status']=='B')
						{
							$admin_status = 'Block<br/> '.$val['admin_reason'];
						}
						else if($val['admin_status']=='A')
						{
							$admin_status = 'Active';
						}
						else if($val['admin_status']=='U')
						{
							$admin_status = 'Unblock';
						}

						if(!empty($created_by))
						{
							if($val['admin_type']=='C')
							{
								$created_str = 'C:'.$created_by['first_name'].' '.$created_by['last_name'].'-'.$created_by['username'];
							}
							else
							{
								$created_str = 'C:'.$created_by['name'];
							}
							
						}

						if(!empty($updated_by))
						{
							if($val['admin_type']=='C')
							{
								$created_str .= '<br/>U:'.$updated_by['first_name'].' '.$updated_by['last_name'].'-'.$updated_by['username'];
							}
							else
							{
								$created_str .= '<br/>U:'.$updated_by['name'];
							}
							
						}

						$resp['data'][$key]['admin_status'] = $admin_status;
						$resp['data'][$key]['ActiveStatus'] = $val['active_status'];
						
					 	$resp['data'][$key]['Action'] = null;
					 	$resp['data'][$key]['ContactPerson'] = (!empty($contact_person_data))?$contact_person_data:'';
					 	$resp['data'][$key]['updater'] = (!empty($created_str))?$created_str:'';
					 	$resp['data'][$key]['IsDeleted'] = $val['delete_status'];

					 	if(!empty($val['deleted_by']))
					 	{
					 		$resp['data'][$key]['deleted_by'] = $val['deleted_by'].'<br/>'.date('d-m-Y h:i:s a',$val['deleted_timestamp']);
					 	}
					 	else
					 	{
					 		$resp['data'][$key]['deleted_by'] = '';
					 	}

					 	if(!empty($val['restore_by']))
					 	{
					 		$resp['data'][$key]['restore_by'] = $val['restore_by'].'<br/>'.date('d-m-Y h:i:s a',$val['restore_timestamp']);
					 	}
					 	else
					 	{
					 		$resp['data'][$key]['restore_by'] = '';
					 	}
					 	
						$i++;
					}
					echo json_encode($resp);
					exit;
				}
        }
        else
        {
            return view('Modules\Console\Views\newProduct\newList');
        }
    }

	public function newAdd()
		{
			$data = array();
			$countrymodel=new CountryModel;
			$model_category = new CategoryModel;
			$model_tags = new TagsModel;
			$model_shelf = new ShelfModel;
			$model_user_variant = new UserVariantModel;
			$model_tax = new TaxModel;
			$model_product_type = new ProductTypeModel;
			$model_brand = new BrandModel;
			$data['brand_data'] = $model_brand->where('active_status="S" and status=1')->findAll();

			$model_description_type = new DescriptionTypeModel;
			$model_attribute = new AttributeModel;
			$model_faq = new ProductFaqModel;
			$model_services = new ProductServicesModel;

			$model_setting = new Setting;
			$model_admin = new AdminModel;
			$model_product = new ProductModel;
			$role_id = (!empty($_SESSION['role_id']))?$_SESSION['role_id']:'';

			if(empty($_REQUEST['id']))
			{
				$admin_id = $_SESSION['admin_id'];
				$admin_data = $model_admin->where('admin_id='.$admin_id)->first();
				$product_data = $model_product->select('product_id as count')->orderBy('product_id','desc')->first();


				$data['pro_data'] = $model_product->where('status="1"')->findAll();

				if(empty($product_data['count']))
				{
					$data['product_sku'] = 'RV-PR-1';
				}
				else
				{
					$data['product_sku'] = 'RV-PR-'.($product_data['count']+1);
				}
			}

			if(empty($data['product_data'][0]['meta_title']))
			{
				$data['meta_title'] = '';
				$data['meta_keyword'] = '';
				$data['meta_description'] = '';
				$data['canonical_url'] = '';
			}
			else
			{
				$data['meta_title'] = $data['product_data'][0]['meta_title'];
				$data['meta_keyword'] = $data['product_data'][0]['meta_keywords'];
				$data['meta_description'] = $data['product_data'][0]['meta_description'];
				$data['canonical_url'] = $data['product_data'][0]['canonical_url'];
			}
			
			$data['category'] = $model_category->where('active_status="S" and status="1" and parent_id=" "')->orderBy('category')->findAll();
			$data['secondary_category'] = $model_category->where('active_status="S" and parent_id != " " and status="1"')->orderBy('category')->findAll();
			$data['tags'] = $model_tags->where('active_status="S"')->findAll();
			$data['shelf'] = $model_shelf->where('active_status="S"')->findAll();
			$data['user_variant'] = $model_user_variant->where('active_status="S"')->findAll();
			$data['tax'] = $model_tax->where('active_status="S" and status="1"')->findAll();
			$data['description_type'] = $model_description_type->where('active_status="S"')->findAll();
			$data['attribute'] = $model_attribute->where('active_status="S"')->findAll();
			$data['setting_data'] = $model_setting->where('setting_id="1"')->first();

			$data['product_type_data'] = $model_product_type->where('status="1"')->findAll();
			$data['country_name']=$countrymodel->select('tbl_countries.*')->findAll();//countries for dropdown
			
			if(!empty($_REQUEST['id']))
			{
				$data['faq_data'] = $model_faq->where('active_status="S" and product_id='.$_REQUEST['id'])->findAll();
				$data['services_data'] = $model_services->where('active_status="S" and product_id='.$_REQUEST['id'])->findAll();
			}
			
			else
			{
				$data['faq_data'] = '';
				$data['services_data'] = '';

			}

			return view('Modules\Console\Views\newProduct\newAdd',$data);
		}

		public function newManageData()
		{
			$role_id = $_SESSION['role_id'];
			
			$image_count=0;
			if(!empty($_POST['course_title']))
			{
				$admin_id = $this->readSession('admin_id');
				$coursemodel = new CourseModel;
				$id=$_REQUEST['course_id'];
				$data=[];
				$filename=$_FILES['course_image']['name'];
				$tempname=$_FILES['course_image']['tmp_name'];
				$folder="upload/newproduct/".$filename;
				
				// $country=$_REQUEST['country_menu'];
				// print_r($country);
				// exit;
				$data['course_name']=$_POST['course_title'];
				$data['country']=$_REQUEST['country_menu'];

				if(!empty($id))
				{
					$data['updated_on']=time();
					// echo "<pre>".$id;
					// print_r($data);
					// exit;
					$success=$coursemodel->update($id,$data);
					echo ($success==true) ? "Succesfully Updated" : "Failed to Update";
				}
				else
				{
					// print_r($_REQUEST['course_id']);
					// exit;
					if(!empty($_FILES['course_image']['name'])){
						$data['course_image']=$_FILES['course_image']['name'];
						// print_r($data);
						// exit;
						if(move_uploaded_file($tempname,$folder)){
						// echo "File moved to location";
						// exit;
						$data['added_on']=time();
						$data['updated_on']=time();
						$success=$coursemodel->save($data);
						echo $success ? "Succesfully Inserted" : "Failed to Insert";
						}
						else{
							echo "Error uploading File";
						}
						}

					// $data['added_on']=time();
					// $data['updated_on']=time();
					// $success=$coursemodel->save($data);
					// echo $success ? "Succesfully Inserted" : "Failed to Insert";
				}
			}
			else{
				echo "Course Title is empty";
			}

		}

		public function courseList(){
			if(!empty($_REQUEST['pagination']['page'])){
				// echo "here";
				// exit;

				$coursemodel = new CourseModel();
				$start_limit = (($_REQUEST['pagination']['page']-1)*$_REQUEST['pagination']['perpage']);
				$end_limit = $_REQUEST['pagination']['perpage'];
				$admin_id = $this->readSession('admin_id');
				$role_id = $this->readSession('role_id');

				$field = 'course_id';
				$sort_order = 'desc';
				//select course fields from tbl_course, tbl_countries and join on countryname
				$coursedata= $coursemodel->select('tbl_course.course_id, tbl_course.course_name, tbl_course.country,tbl_course.course_image , tbl_course.added_on,tbl_course.updated_on,tbl_countries.*')->join('tbl_countries','on tbl_countries.id=tbl_course.country')->orderBy($field,$sort_order)->findAll($end_limit,$start_limit);

				
				// if(empty($coursedata)){
				// 	echo"empty";
				// }
				// print_r($coursedata);
				// exit;

				if(!empty($coursedata)){
					$resp = array();
					$per_page=$_REQUEST['pagination']['perpage'];
					$countdata=$coursemodel->select('count(tbl_course.course_id) as count')->findAll();
					$total_data=(!empty($countdata['count'])) ? $countdata['count'] : '0';
					$total_pages=ceil($total_data/$per_page);
					$rowIds=array();
					

					if($total_pages==0){
						$total_pages=1;
					}

					$resp['meta'] = array('page'=>$_REQUEST['pagination']['page'],'pages'=>$total_pages,'perpage'=>$per_page,'total'=>$total_data,'rowIds'=>$rowIds,'sort'=>'asc','field'=>'RecordId');
					$i=($start_limit+1);
					foreach($coursedata as $key=>$val){
						
						$created_str = '';
						$rowIds[] = $val['course_id'];
						$info='';
						$resp['data'][$key]['srno'] = $i;
						$resp['data'][$key]['Id'] = $val['course_id'];
						$resp['data'][$key]['RecordId'] = (($key+1)+(($_REQUEST['pagination']['page']-1)*$_REQUEST['pagination']['perpage']));
						$resp['data'][$key]['date'] = (!empty($val['added_on']))?'C : '.date('d-m-Y h:i:s a',$val['added_on']).'<br/>U : '.date('d-m-Y h:i:s a',$val['updated_on']):'';
						$resp['data'][$key]['course_Name'] = $val['course_name'];
						$resp['data'][$key]['Course_Image'] = $val['course_image'];
						$image_arr=explode(",",$val['course_image']); //extract image name in array
						$resp['data'][$key]['Course_Image_Path'] = base_url()."./upload/newproduct/".$image_arr[0]; //pass image path at 0 index
						$resp['data'][$key]['country_name']=$val['name'];
						
						$i++;
					}
					echo json_encode($resp);
					exit;
				}
				
			}
			// echo "data empty";
			// exit;
			else{
				return view('Modules\Console\Views\newProduct\courseList');
			}
			
		}

		public function newUpdate(){
			if(!empty($_REQUEST['id'])){
			$id=$_REQUEST['id']; //fetch the id of course
			// echo $id;
			$data=[];
			$resp=array();
			$coursemodel = new CourseModel;
			$countrymodel=new CountryModel;
			$data['country']=$countrymodel->select('tbl_countries.*')->findAll();//country list from other DB
			// $data['coursedata']=$coursemodel->where('course_id='.$id)->find(); // use $id to search
			$data['allData']=$coursemodel->select('tbl_course.*, tbl_countries.*')->join('tbl_countries','on tbl_countries.id=tbl_course.country')->where('course_id='.$id)->find();
			
			//Fetch Image name and pass it as path
			$imagedata=$data['allData'];
			$imagename=$imagedata[0]['course_image']; 
			// print_r($imagename);
			// exit;
			$data['image_path']=base_url()."/upload/newproduct/".$imagename;
			
			return view('Modules\Console\Views\newProduct\newAdd',$data);
			}
			else{
				echo"No Data Found";
				// return redirect()->to('Modules\Console\Views\newProduct\courseList');
			}

		}

		public function newDelete(){
			$coursemodel = new CourseModel;
			$id=$_REQUEST['id'];
			// echo $id;
			// exit;
			$coursemodel->where('tbl_course.course_id='.$id)->delete();
			echo "200::Record Deleted Successfully";
			exit;
			
		}
}


?>
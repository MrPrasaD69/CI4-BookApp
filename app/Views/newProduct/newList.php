<?php echo $this->extend('Modules\Console\Views\templates\main'); ?>
<?php 
  $baseUrl = base_url()."/public/themes/consoleTheme";
  $basePath = "public/themes/consoleTheme";
  ?>
<?php echo $this->section('content'); ?>
<?php 
  use App\Models\MenuModel;
  $module_name = explode("/",str_replace("/kagami/", "", $_SERVER['REQUEST_URI']));
  $controller = (!empty($module_name[1]))?$module_name[1]:'';
  $action = (!empty($module_name[2]))?$module_name[2]:'';
  $model_menu = new MenuModel;
  $breadcum_data = $model_menu->where(array('menu_controller'=>$controller,'menu_action'=>$action))->find();
?>

<div class="d-flex flex-column flex-column-fluid" id="kt_content">
   <!--begin::Subheader-->
  <?php include($basePath."/includes/breadcrum.php"); ?>
  <!--end::Subheader-->
   <!--begin::Entry-->
   <!-- <div class="d-flex flex-column-fluid"> -->
   <!--begin::Container-->
   <div class="container">
      <!--begin::Card-->
      <div class="card card-custom" style="margin-top:25px;">
         <div class="card-header flex-wrap border-0 pt-6 pb-0">
            <div class="card-title">
               <h5 class="text-dark font-weight-bold my-2 mr-5"><?php echo (!empty($breadcum_data[0]['menu']))?$breadcum_data[0]['menu']:''; ?></h5>
               <!--end::Page Title-->
               
            </div>
            <div class="card-toolbar ">
               <!--begin::Quick panel-->
              <!--  <div class="topbar-item right-panel-new"> -->
                <div id="new_records" class="new-record">
                  <div class="btn btn-icon btn-clean btn-lg mr-1" id="kt_quick_panel_toggle">
                     <span class="svg-icon svg-icon-xl svg-icon-primary">
                        <!--begin::Svg Icon | path:<?php echo $baseUrl; ?>/assets/media/svg/icons/General/Search.svg-->
                        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                           <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                              <rect x="0" y="0" width="24" height="24" />
                              <path d="M14.2928932,16.7071068 C13.9023689,16.3165825 13.9023689,15.6834175 14.2928932,15.2928932 C14.6834175,14.9023689 15.3165825,14.9023689 15.7071068,15.2928932 L19.7071068,19.2928932 C20.0976311,19.6834175 20.0976311,20.3165825 19.7071068,20.7071068 C19.3165825,21.0976311 18.6834175,21.0976311 18.2928932,20.7071068 L14.2928932,16.7071068 Z" fill="#000000" fill-rule="nonzero" opacity="0.3" />
                              <path d="M11,16 C13.7614237,16 16,13.7614237 16,11 C16,8.23857625 13.7614237,6 11,6 C8.23857625,6 6,8.23857625 6,11 C6,13.7614237 8.23857625,16 11,16 Z M11,18 C7.13400675,18 4,14.8659932 4,11 C4,7.13400675 7.13400675,4 11,4 C14.8659932,4 18,7.13400675 18,11 C18,14.8659932 14.8659932,18 11,18 Z" fill="#000000" fill-rule="nonzero" />
                           </g>
                        </svg>
                        <!--end::Svg Icon-->
                     </span>
                  </div>
                 
                  <a href="<?= base_url()?>/console/product/add" class="btn btn-primary font-weight-bolder">
                  <span class="svg-icon svg-icon-md">
                     <!--begin::Svg Icon | path:assets/media/svg/icons/Design/Flatten.svg-->
                     <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                        <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                           <rect x="0" y="0" width="24" height="24" />
                           <circle fill="#000000" cx="9" cy="15" r="6" />
                           <path d="M8.8012943,7.00241953 C9.83837775,5.20768121 11.7781543,4 14,4 C17.3137085,4 20,6.6862915 20,10 C20,12.2218457 18.7923188,14.1616223 16.9975805,15.1987057 C16.9991904,15.1326658 17,15.0664274 17,15 C17,10.581722 13.418278,7 9,7 C8.93357256,7 8.86733422,7.00080962 8.8012943,7.00241953 Z" fill="#000000" opacity="0.3" />
                        </g>
                     </svg>
                     <!--end::Svg Icon-->
                  </span>
                  New Record
               </a>
            </div>

       <div class="mb-5 collapse" id="kt_datatable_group_action_form1">
                
               <div class="d-flex align-items-center">
                
                  <div class="dropdown mr-2">
                      <!-- <span class="setting-icon"><i class="fas fa-hammer"></i></span> -->
                     <select class="nav nav-hover flex-column" id="bulk_action">

                        <option class="nav-item" value="">Action</option>
                        <option class="nav-item" value="D">Delete</option>
                        <option class="nav-item" value="A">Active</option>
                        <option class="nav-item" value="I">Deactive</option>
                        <option class="nav-item" value="E">Export</option>
                     </select>
                     <div class="font-weight-bold text-danger mr-3">Selected
                     <span id="kt_datatable_selected_records">0</span> records:
                  </div>
                  </div>

               </div>
               <input type="hidden" id="selected_ids">
            </div>



              <!--  </div> -->
               <!--end::Quick panel-->
               <!--begin::Button-->
               
               <!--end::Button-->
               
            </div>
         </div>
         <div class="card-body">
            <!--begin: Search Form-->
            <!--begin::Search Form-->
            <!-- <div class="mb-7">
               <div class="row align-items-center">
               </div>
            </div> -->


<!-- 
            <div class="mb-5 collapse" id="kt_datatable_group_action_form1">
               <div class="d-flex align-items-center">
                  <div class="font-weight-bold text-danger mr-3">Selected
                     <span id="kt_datatable_selected_records">0</span> records:
                  </div>
                  <div class="dropdown mr-2">
                     <select class="nav nav-hover flex-column" id="bulk_action">
                        <option class="nav-item" value="">Action</option>
                        <option class="nav-item" value="D">Delete</option>
                        <option class="nav-item" value="A">Active</option>
                        <option class="nav-item" value="I">Deactive</option>
                        <option class="nav-item" value="E">Export</option>
                     </select>
                  </div>
               </div>
               <input type="hidden" id="selected_ids">
            </div> -->



            <!--end: Selected Rows Group Action Form-->
            <!--begin: Datatable-->
            <div class="datatable datatable-bordered datatable-head-custom" id="kt_datatable_list"></div>
            <!--end: Datatable-->
         </div>
      </div>
      <!--end::Card-->
   </div>
   <!--end::Container-->
   <!-- </div> -->
   <!--end::Entry-->
</div>

<script type="text/javascript">

  function deleteData(id,row_id)
  {
    swal.fire({
            title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Yes, delete it!"
      }).then((result) => {

      if(result.value){

        $.ajax({
          url:'<?php echo base_url("console/product/delete"); ?>',
          type:'POST',
          data:'id='+id,
          success:function(data){
            var resp = data.split('::');
            
            if(resp[0]==404)
            {
              swal.fire({
                
                "title": "",
                "text": resp[1],
                "type": "warning",
                "confirmButtonClass": "btn btn-secondary"
              });
                  }else{
              row_id = (parseInt(row_id)-1);
              Swal.fire(
                        "Deleted!",
                        "Your file has been deleted.",
                        "success"
                    );
              $('tr[data-row="'+row_id+'"]').remove();
            }
          }
        })
      }

    });
  }

   function manageData(id='')
   {
      swal.fire({
         title: "Edit!",
         text: "Are you sure want to edit product!",
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
            window.open('<?php echo base_url("console/product/update?id="); ?>'+id, "_self");
         }

      });
   }
</script>

<style type="text/css">
   /* The work below, CSSBox, is released under the Creative Commons
   Attribution-ShareAlike 4.0 license and is available on
   https://github.com/TheLastProject/CSSBox. You are not required to add
   additional credit to your website, just leave the above text in this file */
   div.cssbox {
     display: inline-block;
   }

   span.cssbox_full {
     z-index: 999999;
     position: fixed;
     height: 100%;
     width: 100%;
     background-color: rgba(0,0,0,0.8);
     top: 0;
     left: 0;
     opacity: 0;
     pointer-events: none;
     cursor: default;
     transition: opacity 0.5s linear;
   }

   span.cssbox_full img {
     position: fixed;
     background-color: white;
     margin: 0;
     padding: 0;
     max-height: 90%;
     max-width: 90%;
     top: 50%;
     left: 50%;
     margin-right: -50%;
     transform: translate(-50%, -50%);
     box-shadow: 0 0 20px black;
   }

   a.cssbox_close,
   a.cssbox_prev,
   a.cssbox_next {
     z-index: 999999;
     position: fixed;
     text-decoration: none;
     visibility: hidden;
     color: white;
     font-size: 36px;
   }

   a.cssbox_close {
     top: 1%;
     right: 1%
   }

   a.cssbox_close::after {
     content: '\00d7';
   }

   a.cssbox_prev,
   a.cssbox_next {
     top: 50%;
     transform: translate(0%, -50%);
   }

   a.cssbox_prev {
     left: 5%;
   }

   a.cssbox_next {
     right: 5%;
   }

   a:target ~ a.cssbox_close,
   a:target ~ a.cssbox_prev,
   a:target ~ a.cssbox_next {
     visibility: visible;
   }

   a:target > img.cssbox_thumb + span.cssbox_full {
     visibility: visible;
     opacity: 1;
     pointer-events: initial;
   }
   /* This is the end of CSSBox */
</style>


<?php echo $this->endSection(); ?>
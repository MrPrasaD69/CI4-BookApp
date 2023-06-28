
    // "use strict";
    // Class definition

    var KTDatatableRecordSelectionDemo = function() {
        // Private functions
         var browser_width = parseInt($( document ).width());

        if(browser_width >= 1280)
        {
            var hideflag = false;
        }
        else
        {
            var hideflag = true;
        }


        var order_id = $('#po_co_order_id').val();
       
        options = {
            // datasource definition
            data: {
                type: 'remote',
                source: {
                    read: {
                        url: 'listPoCoProducts?order_id='+order_id,
                    },
                },
                pageSize: 10,
                serverPaging: true,
                serverFiltering: true,
                serverSorting: true,
                stateSave: true,
            },

            // layout definition
            layout: {
                scroll: true, // enable/disable datatable scroll both horizontal and
                // vertical when needed.
                header: true,
                // height: 350, // datatable's body's fixed height
                footer: false // display/hide footer
            },

            toolbar: {
                layout: ['pagination', 'info'],
                placement: ['bottom','top']
            },

            // column sorting
            sortable: true,

            pagination: true,

            // columns definition

            
            columns: [{
                field: 'srno',
                title: 'Sr No',
                autoHide:false,
                width:25,
            },{
                field: 'image',
                title: 'Image',                
                autoHide:false,
                template: function(row) {
                    if(row.image=='')
                    {
                        return '\
                            <img src="https://via.placeholder.com/117x117.png?text=No Image">\
                        ';
                    }
                    else
                    {
                        return '\
                            <img src="'+row.image+'" width="115px;">\
                        ';
                    }
                },
            },{
                field: 'sku',
                title: 'SKU',
                autoHide:false,
            },{
                field: 'qty_ordered',
                title: 'QTY Ordered',
                autoHide:false,
            },{
                field: 'pending_qty',
                title: 'Pending QTY',
                autoHide:false,
            },{
                field: 'qty_received',
                title: 'QTY Received',
                autoHide:false,
            },{
                field: 'bad_inventory',
                title: 'Bad Inventory',
                autoHide:false,
            },{
                field: 'good_inventory',
                title: 'Good Inventory',
                autoHide:false,
            },{
                field: 'po_co_no',
                title: 'PO/CO No.',
                autoHide:false,
            },{
                field: 'customer_name',
                title: 'Cust. Name',
                autoHide:hideflag,
            },{
                field: 'manufacturer_name',
                title: 'Supplier Name',
                autoHide:hideflag,
            },{
                field: 'delay_days',
                title: 'Del. Days',
                autoHide:hideflag,
            },{
                field: 'date',
                title: 'Order & Del. Date',
                autoHide:hideflag,
            },{
                field: 'variation',
                title: 'Variation',
                autoHide:hideflag,
            },{
                field: 'total_qty',
                title: 'Total Qty',
                autoHide:hideflag,
            },{
                field: 'rate',
                title: 'Rate',
                autoHide:hideflag,
            },{
                field: 'amount',
                title: 'Amount',
                autoHide:hideflag,
            },{
                field: 'order_status',
                title: 'Status',
                autoHide:hideflag,
            }, {
                field: 'ActiveStatus',
                title: 'Status', 
                // width: 60,
                autoHide: hideflag,
                textAlign: 'center',
                template: function(row) {
                    if(row.ActiveStatus=='S')
                    {
                        return '\
                            <span class="switch switch-outline switch-icon switch-primary" id="active_status_'+row.Id+'" >\
                                <label>\
                                    <input type="checkbox" checked="checked" name="active_status" class="active_status" data-id="'+row.Id+'" value="H">\
                                    <span></span>\
                                </label>\
                            </span>\
                        ';
                    } 
                    else
                    {
                        return '\
                            <span class="switch switch-outline switch-icon switch-success" id="active_status_'+row.Id+'" >\
                                <label>\
                                    <input type="checkbox" name="active_status" class="active_status" data-id="'+row.Id+'" value="H">\
                                    <span></span>\
                                </label>\
                            </span>\
                        ';
                    }
                },
            },{
                field: 'Actions',
                title: 'Actions',
                sortable: false,
                width: 145,
                overflow: 'visible',
                textAlign: 'left',
    	        autoHide: hideflag,
                template: function(row) {
    	            return '\
                        <a href="javascript:void(0);" onclick="manageData('+row.ProductId+')" class="btn btn-sm btn-clean btn-icon btn-icon-sm" title="Edit details">\
                            <i class="flaticon2-edit text-primary"></i>\
                        </a>\
                        <a href="javascript:void(0);"  onclick="timelineData('+row.Id+')" class="btn btn-sm btn-clean btn-icon btn-icon-sm" title="Timeline">\
                            <i class="fa fa-calendar-times text-primary" aria-hidden="true"></i>\
                        </a>\
                        <a href="javascript:void(0);"  onclick="printData('+row.Id+','+row.RecordId+')" class="btn btn-sm btn-clean btn-icon btn-icon-sm" title="Delete">\
                            <i class="fa fa-print" aria-hidden="true"></i>\
                             </a>\
                        <a href="javascript:void(0);"  onclick="deleteData('+row.ProductId+','+row.RecordId+')" class="btn btn-sm btn-clean btn-icon btn-icon-sm" title="Delete">\
                            <i class="flaticon-delete text-warning"></i>\
                        </a>\
                    ';
                },
            }],
        };

        var serverSelectorDemo = function() {

            // enable extension
            options.extensions = {
                checkbox: true,
            };
            options.search = {
                input: $('#generalSearch1'),
            };

            var datatable = $('#kt_datatable_2').KTDatatable(options);

            // $('.reset').on('click',function(){
            //     $('#userType').val('');
            //     $('#companyName').val('');
            //     $('#activeStatus').val('');
            //     $('#userNameFilter').val('');
            //     $('#isManufacturer').val('');
            //     datatable.search();
            // });
            $('#activeStatus').on('change', function() {
                datatable.search($(this).val(), 'activeStatus');
            });
            
            $('#productStatus').on('change', function() {
                datatable.search($(this).val(), 'productStatus');
            });
            
            $('#status').on('change', function() {
                datatable.search($(this).val(), 'status');
            });

            $(document).on('typeahead:selected','#manufacturerNameFilter',function() 
            {
                datatable.search($(this).val(), 'manufacturerNameFilter');
            });

            $(document).on('typeahead:selected','#skuFilter',function() 
            {
                datatable.search($(this).val(), 'skuFilter');
            });

            $('#from_date').on('change', function() {
                datatable.search($(this).val(), 'fromDate');
            });

            $('#to_date').on('change', function() {
                datatable.search($(this).val(), 'toDate');
            });

            $('.reset').on('click', function(){
                $("#manufacturerNameFilter").typeahead('val','');
                $("#skuFilter").typeahead('val','');
                $("#suplierNameFilter").typeahead('val','');
                $("#from_date").val('');
                $("#to_date").val('');
                $('#activeStatus').val('').trigger("activeStatus");
                $('#productStatus').val('').trigger("productStatus");
                $('#status').val('').trigger("change");
                datatable.search('',['manufacturerNameFilter','suplierNameFilter','skuFilter','fromDate','toDate','status','activeStatus','productStatus',]);
            });

            $('#manufacturerNameFilter, #productStatus, #suplierNameFilter, #skuFilter, #activeStatus').selectpicker();

            datatable.on(
                'datatable-on-check datatable-on-uncheck',

                function(e) {

                    var checkedNodes = datatable.rows('.datatable-row-active').nodes();
                    var ids = datatable.checkbox().getSelectedId();
                    var count = checkedNodes.length;

                    $('#kt_datatable_selected_records').html(count);

                    if (count > 0) 
                    {
                        var selected_id = '';

                        for(var i=0;i<count;i++)
                        {
                            if(selected_id=='')
                            {
                                selected_id = ids[i];
                            }
                            else
                            {
                                selected_id += ","+ids[i];
                            }
                        }

                        $('#kt_datatable_group_action_form1').collapse('show');
                        $('#selected_ids').attr('value',selected_id);

                    } else {

                        $('#kt_datatable_group_action_form1').collapse('hide');

                    }
                });

            /* active status toggle start */

            $(document).on('click','.active_status',function(){

                var id = $(this).attr('data-id');

                if($(this).is(":checked"))
                {
                    var status = 'S';
                    var msg = 'Are you sure want to Active this?';
                }
                else
                {
                    var status = 'H';
                    var msg = 'Are you sure want to In-Active this?';
                }

                swal.fire({
                    title: "Active Status!",
                    text: msg,
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
                  if (result.value) {
                    $.ajax({
                        url:'updateStatus',
                        type:'POST',
                        data:'id='+id+'&status='+status,
                        success:function(data)
                        {
                            var resp = data.split('::');

                            if(resp[0]==404)
                            {
                                swal.fire({
                                    position: "top-right",
                                    icon: "error",
                                    title: resp[1],
                                    showConfirmButton: false,
                                    timer: 1500
                                });

                                datatable.load();
                            }
                            else
                            {
                                swal.fire({
                                    position: "top-right",
                                    icon: "success",
                                    title: resp[1],
                                    showConfirmButton: false,
                                    timer: 1500
                                });

                                datatable.load();
                            }
                        }
                    })
                  }
                  else if (result.dismiss === 'cancel') 
                  {
                    datatable.load();
                  }
                });
            });

            /* active status toggle end */

            /* bulk operation start */

            $(document).on('change','#bulk_action',function(){
                var action = $(this).val();
                var selected_id = $('#selected_ids').val();
                
                switch(action)
                {
                    case 'D':
                            var msg = 'Are you sure want to delete selected records?';
                            break;
                    case 'A':
                            var msg = 'Are you sure want to active selected records?';
                            break;
                    case 'I':
                            var msg = 'Are you sure want to inactive selected records?';
                            break;
                }

                swal.fire({
                    title: "",
                    text: msg,
                    icon: "warning",
                    buttonsStyling: false,
                    confirmButtonText: "<i class='la la-headphones'></i> Yes!",
                    showCancelButton: true,
                    cancelButtonText: "<i class='la la-thumbs-down'></i> No, thanks",
                    customClass: {
                        confirmButton: "btn btn-danger",
                        cancelButton: "btn btn-default"
                    }
                }).then((result) => {
                  if (result.value) {
                        $.ajax({
                            url:'manageBulkOperation',
                            type:'POST',
                            data:'id='+selected_id+'&action='+action,
                            async: false,
                            success:function(data)
                            {
                                var resp = data.split('::');

                                if(resp[0]==404)
                                {
                                    swal.fire({
                                        position: "top-right",
                                        icon: "error",
                                        title: resp[1],
                                        showConfirmButton: false,
                                        timer: 1500
                                    });

                                    datatable.load();
                                    $('#kt_datatable_group_action_form1').removeClass('show');
                                    $('#kt_datatable_group_action_form1').addClass('hide');
                                }
                                else
                                {
                                    swal.fire({
                                        position: "top-right",
                                        icon: "success",
                                        title: resp[1],
                                        showConfirmButton: false,
                                        timer: 1500
                                    });

                                    datatable.load();
                                    $('#kt_datatable_group_action_form1').removeClass('show');
                                    $('#kt_datatable_group_action_form1').addClass('hide');
                                }
                            }
                        });
                    }
                    else if (result.dismiss === 'cancel') 
                    {
                        datatable.load();
                    }
                });
            });

            /* bulk operation end */

            /* data management start */

            $(document).on('click','#btn_role',function(){
                var job_status_id = $('#job_status_id').val();
                var job_status = $('#job_status').val();

                if(job_status=='')
                {
                    $('#role_err').show();
                    $('#role_err').html("Please enter role");
                
                }else{
                    $.ajax({
                        url:'manageData',
                        type:'POST',
                        data:'job_status_id='+job_status_id+'&job_status='+job_status,
                        success:function(data)
                        {
                            var resp = data.split("::");

                            if(resp[0]!=200)
                            {
                                swal.fire({
                                    position: "top-right",
                                    icon: "error",
                                    title: resp[1],
                                    showConfirmButton: false,
                                    timer: 1500
                                });
                            }
                            else
                            {
                                swal.fire({
                                    position: "top-right",
                                    icon: "success",
                                    title: resp[1],
                                    showConfirmButton: false,
                                    timer: 1500
                                });

                                $('#jobstatus_modal').modal('hide');
                                datatable.load();
                            }
                        }
                    });
                }
            });

            /* data management end */

            $(document).ready(function(){
                datatable.search();

                var fpoco = $('#frm_po_co');
                var bpoco = $('#btn_po_co');

                bpoco.click(function(e)
                {
                    fpoco.ajaxForm({
                        beforeSend: function()
                        {
                            bpoco.attr('disabled', 'disabled');
                        },
                        success: function(e)
                        {
                            var resp = e.split('::');
                            bpoco.removeAttr('disabled');

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
                                }).then(function() 
                                {
                                    $('#po_co_modal').modal('hide');
                                    datatable.search();
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
            });

            // $('#kt_modal_fetch_id_server').on('show.bs.modal', function(e) {
            //     var ids = datatable.checkbox().getSelectedId();
            //     var c = document.createDocumentFragment();
            //     for (var i = 0; i < ids.length; i++) {
            //         var li = document.createElement('li');
            //         li.setAttribute('data-id', ids[i]);
            //         li.innerHTML = 'Selected record ID: ' + ids[i];
            //         c.appendChild(li);
            //     }
            //     $(e.target).find('.kt-datatable_selected_ids').append(c);
            // }).on('hide.bs.modal', function(e) {
            //     $(e.target).find('.kt-datatable_selected_ids').empty();
            // });

        };

        return {
            // public functions
            init: function() {
                serverSelectorDemo();
            },
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
                    url: 'getCustomerAutocomplete?query=%QUERY',
                    wildcard: '%QUERY'
                }
            });

            userSource.initialize();

            $('#po_co_customer_id').typeahead({
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

            $('#manufacturerNameFilter').typeahead({
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
                    url: 'getSkuFilterPOCOAutocomplete?query=%QUERY',
                    wildcard: '%QUERY'
                }
            });

            userSource.initialize();

            $('#skuFilter').typeahead({
                hint: true,
                highlight: true,
                minLength: 1
            },
            {
                name: 'states',
                source: userSource
            }); 
        }

        // var demo5 = function() {
        //     // constructs the suggestion engine
        //     var userSource = new Bloodhound({
        //         datumTokenizer: Bloodhound.tokenizers.whitespace,
        //         queryTokenizer: Bloodhound.tokenizers.whitespace,
        //         // `states` is an array of state names defined in "The Basics"
        //         remote: { 
        //             url: 'getProductAutocomplete?query=%QUERY',
        //             wildcard: '%QUERY'
        //         }
        //     });

        //     userSource.initialize();

        //     $('#skuFilter').typeahead({
        //         hint: true,
        //         highlight: true,
        //         minLength: 1
        //     },
        //     {
        //         name: 'states',
        //         source: userSource
        //     }); 
        // }

        // var demo6 = function() {
        //     // constructs the suggestion engine
        //     var userSource = new Bloodhound({
        //         datumTokenizer: Bloodhound.tokenizers.whitespace,
        //         queryTokenizer: Bloodhound.tokenizers.whitespace,
        //         // `states` is an array of state names defined in "The Basics"
        //         remote: { 
        //             url: 'getBarcodeAutocomplete?query=%QUERY',
        //             wildcard: '%QUERY'
        //         }
        //     });

        //     userSource.initialize();

        //     $('#barcodeFilter').typeahead({
        //         hint: true,
        //         highlight: true,
        //         minLength: 1
        //     },
        //     {
        //         name: 'states',
        //         source: userSource
        //     }); 
        // }

        return {
            // public functions
            init: function() {
                demo2();
                demo3();
                demo4();
                // demo5();
                // demo6();
            }
        };

    }();

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
        var datepicker_demos = function () {
            // orientation 
            $('#order_date').datepicker({
                rtl: KTUtil.isRTL(),
                orientation: "top left",
                todayHighlight: true,
                format: "dd-mm-yyyy",
                templates: arrows,
                changeDate: function() 
                {
                    alert("here");
                }
            });
        }

        return {
            // public functions
            init: function() {
                datepicker_demos();  
            }
        };
    }();

    jQuery(document).ready(function() {
        KTDatatableRecordSelectionDemo.init();
        KTTypeahead.init();
        KTBootstrapDatepicker.init();
    });

    function showShipping(mod)
    {
        var address = $(mod).attr('data-content');

        if(isNaN(address))
        {
            $('#address_modal').modal('show');
            $('#address_content').html(address);
        }
        else
        {
            $.ajax({
                url:'getAddress',
                type:'POST',
                data:'address_id='+address,
                success:function(data)
                {
                    $('#address_modal').modal('show');
                    $('#address_content').html(data);
                }
            });
        }
    }

    $(document).on('typeahead:selected','#po_co_manufacturer',function() 
    { 
        var order_id = $('#order_id').val();
          
        $.ajax({
            url:'getPoNo',
            type:'POST',
            data:'manufacturer_name='+$(this).val()+'&order_id='+order_id,
            success:function(data)
            {
                $('#order_no').val(data);
            }
        });
    });

    $(document).on('typeahead:selected','#po_co_customer_id',function() 
    {
        var order_id = $('#order_id').val();

        $.ajax({
            url:'getCoNo',
            type:'POST',
            data:'customer_name='+$(this).val()+'&order_id='+order_id,
            success:function(data)
            {
                $('#order_no').val(data);
            }
        });
    });
    function getProductStatus(mod)
    {
        var order_status = $('#productStatus option:selected').attr('value');
        
        $.ajax({
            url:'getProductStatusData',
            type:'POST',
            data:'order_status='+order_status,
            
        });
    }

   $('.checkbox').click(function() {
        var del = $('#delayed checkbox:checked').attr('value');
        $.ajax({
            url:'getProductStatusData',
            type:'POST',
            data:'del='+1,
            
        });
    
      });
    


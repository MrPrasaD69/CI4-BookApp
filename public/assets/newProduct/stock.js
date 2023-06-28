
    // "use strict";
    // Class definition

    var KTDatatableRecordSelectionDemo = function() {
        // Private functions

        var product_id = $('#product_id').val();
        var attribute_id = $('#attribute_id').val();
        var attribute_values_id = $('#attribute_values_id').val();

        var browser_width = parseInt($( document ).width());

        if(browser_width >= 1280)
        {
            var hideflag = false;
        }
        else
        {
            var hideflag = true;
        }

        options = {
            // datasource definition
            data: {
                type: 'remote',
                source: {
                    read: {
                        url: 'stock?product_id='+product_id+'&attribute_id='+attribute_id+'&attribute_values_id='+attribute_values_id,
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
                field: 'Id',
                title: '#',
                sortable: false,
                width: 20,
                selector: {class: 'checkbox checkbox-outline checkbox-outline-2x checkbox-primary'},
                textAlign: 'center',
                autoHide: false,
            },{
                field: 'srno',
                title: 'Sr No',
                autoHide: false,
            },{
                field: 'product_sku',
                title: 'SKU',
                autoHide: false,
            },{
                field: 'batch_no',
                title: 'Batch No',
                autoHide:hideflag,
            },{
                field: 'attribute',
                title: 'Product Attribute',
                autoHide:hideflag,
            },{
                field: 'barcode',
                title: 'Barcode',
                autoHide:hideflag,
            },{
                field: 'created_date',
                title: 'Created Date',
                autoHide:hideflag,
            }, {
                field: 'IsScan',
                title: 'Scanned',
                autoHide:hideflag,
                template: function(row) {
                    if(row.IsScan=='Y')
                    {
                        return '\
                            <span class="switch switch-outline switch-icon switch-primary" id="is_scan_'+row.Id+'" >\
                                <label>\
                                    <input type="checkbox" checked="checked" name="is_scan" class="is_scan" data-id="'+row.Id+'" value="N">\
                                    <span></span>\
                                </label>\
                            </span>\
                        ';
                    }
                    else
                    {
                        return '\
                            <span class="switch switch-outline switch-icon switch-success" id="is_scan_'+row.Id+'" >\
                                <label>\
                                    <input type="checkbox" name="is_scan" class="is_scan" data-id="'+row.Id+'" value="N">\
                                    <span></span>\
                                </label>\
                            </span>\
                        ';
                    }
                },
            },{
                field: 'ScannedOn',
                title: 'Scanned On',
                autoHide:hideflag,
            }, {
                field: 'IsHold',
                title: 'Hold',
                autoHide:hideflag,
                template: function(row) {
                    if(row.IsHold=='Y')
                    {
                        return '\
                            <span class="switch switch-outline switch-icon switch-primary" id="is_hold_'+row.Id+'" >\
                                <label>\
                                    <input type="checkbox" checked="checked" name="is_hold" class="is_hold" data-id="'+row.Id+'" value="N">\
                                    <span></span>\
                                </label>\
                            </span>\
                        ';
                    }
                    else
                    {
                        return '\
                            <span class="switch switch-outline switch-icon switch-success" id="is_hold_'+row.Id+'" >\
                                <label>\
                                    <input type="checkbox" name="is_hold" class="is_hold" data-id="'+row.Id+'" value="N">\
                                    <span></span>\
                                </label>\
                            </span>\
                        ';
                    }
                },
            },{
                field: 'HoldOn',
                title: 'Hold On',
                autoHide:hideflag,
            }, {
                field: 'IsQueue',
                title: 'Queue',
                autoHide:hideflag,
                template: function(row) {
                    if(row.IsQueue=='Y')
                    {
                        return '\
                            <span class="switch switch-outline switch-icon switch-primary" id="is_queue_'+row.Id+'" >\
                                <label>\
                                    <input type="checkbox" checked="checked" name="is_queue" class="is_queue" data-id="'+row.Id+'" value="N">\
                                    <span></span>\
                                </label>\
                            </span>\
                        ';
                    }
                    else
                    {
                        return '\
                            <span class="switch switch-outline switch-icon switch-success" id="is_queue_'+row.Id+'" >\
                                <label>\
                                    <input type="checkbox" name="is_queue" class="is_queue" data-id="'+row.Id+'" value="N">\
                                    <span></span>\
                                </label>\
                            </span>\
                        ';
                    }
                },
            },{
                field: 'QueueOn',
                title: 'Queue On',
                autoHide:hideflag,
            }, {
                field: 'Actions',
                title: 'Actions',
                sortable: false,
                width: 110,
                overflow: 'visible',
                textAlign: 'left',
    	        autoHide: false,
                template: function(row) {
    	            return '\
                        <a href="javascript:void(0);"  onclick="deleteData('+row.Id+','+row.RecordId+')" class="btn btn-sm btn-clean btn-icon btn-icon-sm" title="Delete">\
                            <i class="flaticon-delete text-warning"></i>\
                        </a>\
                        <a href="javascript:void(0);"  class="btn btn-sm btn-clean btn-icon btn-icon-sm" title="Delete">\
                            <i class="fa fa-print" aria-hidden="true"></i>\
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

            $('.reset').on('click', function(){
                $("#skuFilter").typeahead('val','');
                $("#barcodeFilter").typeahead('val','');
                $('#activeStatus').val('').trigger("change");
                datatable.search('',['skuFilter','barcodeFilter','activeStatus']);
            });

            $(document).on('typeahead:selected','#skuFilter',function() 
            {
                datatable.search($(this).val().toLowerCase(), 'skuFilter');
            });

            $(document).on('typeahead:selected','#barcodeFilter',function() 
            {
                datatable.search($(this).val().toLowerCase(), 'barcodeFilter');
            });

            $('#activeStatus').on('change', function() {
                datatable.search($(this).val(), 'activeStatus');
            });



            // $(document).on('click','.reset',function()
            // {
            //     alert("here");
            //     datatable.search('');
            // });

            $('#activeStatus').selectpicker();

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

            $(document).on('click','.is_scan',function(){

                var id = $(this).attr('data-id');

                if($(this).is(":checked"))
                {
                    var status = 'Y';
                    var msg = 'Are you sure want to scan this?';
                }
                else
                {
                    var status = 'N';
                    var msg = 'Are you sure want to not scan this?';
                }

                swal.fire({
                    title: "Barcode Scan!",
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
                        url:'updateBarcodeStatus',
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

            $(document).on('click','.is_hold',function(){

                var id = $(this).attr('data-id');

                if($(this).is(":checked"))
                {
                    var status = 'Y';
                    var msg = 'Are you sure want to hold this?';
                }
                else
                {
                    var status = 'N';
                    var msg = 'Are you sure want to not hold this?';
                }

                swal.fire({
                    title: "Barcode Hold!",
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
                        url:'updateBarcodeStatus',
                        type:'POST',
                        data:'id='+id+'&status='+status+'&mod=H',
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

            $(document).on('click','.is_queue',function(){

                var id = $(this).attr('data-id');

                if($(this).is(":checked"))
                {
                    var status = 'Y';
                    var msg = 'Are you sure want to queue this?';
                }
                else
                {
                    var status = 'N';
                    var msg = 'Are you sure want to unqueue this?';
                }

                swal.fire({
                    title: "Barcode Queue!",
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
                        url:'updateBarcodeStatus',
                        type:'POST',
                        data:'id='+id+'&status='+status+'&mod=Q',
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
                            var msg = 'Are you sure want to delete selected barcodes?';
                            break;
                    case 'S':
                            var msg = 'Are you sure want to scanned selected barcodes?';
                            break;
                    case 'U':
                            var msg = 'Are you sure want to unscanned selected barcodes?';
                            break;
                    case 'H':
                            var msg = 'Are you sure want to hold selected barcodes?';
                            break;
                    case 'UH':
                            var msg = 'Are you sure want to unhold selected barcodes?';
                            break;
                    case 'Q':
                            var msg = 'Are you sure want to queue selected barcodes?';
                            break;
                    case 'UQ':
                            var msg = 'Are you sure want to unqueue selected barcodes?';
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
                            url:'manageStock',
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
                    url: 'getSkuFilterAutocomplete?query=%QUERY',
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

        var demo3 = function() {
            // constructs the suggestion engine
            var userSource = new Bloodhound({
                datumTokenizer: Bloodhound.tokenizers.whitespace,
                queryTokenizer: Bloodhound.tokenizers.whitespace,
                // `states` is an array of state names defined in "The Basics"
                remote: { 
                    url: 'getBarcodeFilterAutocomplete?query=%QUERY',
                    wildcard: '%QUERY'
                }
            });

            userSource.initialize();

            $('#barcodeFilter').typeahead({
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

    jQuery(document).ready(function() {
        KTDatatableRecordSelectionDemo.init();
        KTTypeahead.init();
    });

function goBack() {
  window.history.back();
}


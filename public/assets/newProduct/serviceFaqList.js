
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


        options = {
            // datasource definition
            data: {
                type: 'remote',
                source: {
                    read: {
                        url: 'serviceFaqList',
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
                autoColumns: false,
                // sortable: true,
                width: 5,
                autoHide:false,
                selector: {class: 'checkbox checkbox-outline checkbox-outline-2x checkbox-primary'},
                textAlign: 'center',
                
            },{
                field: 'srno',
                title: 'Sr No',
                autoHide:false,
                width: 25,
            },{
                field: 'category_id',
                title: 'category',
            },{
                field: 'question',
                title: 'question',
            },{
                field: 'answer',
                title: 'answer',
            },{
                field: 'ActiveStatus',
                title: 'Status',
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
            }, {  
                field: 'Actions',
                title: 'Actions',
                // sortable: false,
                width: 125,
                overflow: 'visible',
               autoHide: false,
                template: function(row) {
                    return '\
                        <a href="javascript:void(0);" onclick="faqManageData('+row.Id+')" class="btn btn-sm btn-clean btn-icon btn-icon-sm" title="Edit details">\
                            <i class="flaticon2-edit text-primary"></i>\
                        </a>\
                        <a href="javascript:void(0);"  onclick="faqDeleteData('+row.Id+','+row.RecordId+')" class="btn btn-sm btn-clean btn-icon btn-icon-sm" title="Delete">\
                            <i class="flaticon-delete text-danger"></i>\
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

            var datatable = $('#kt_datatable_list').KTDatatable(options);

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

            $(document).on('typeahead:selected','#skuFilter',function() 
            {
                datatable.search($(this).val().toLowerCase(), 'skuFilter');
            });

            $(document).on('typeahead:selected','#brand_name',function() 
            {
                datatable.search($(this).val().toLowerCase(), 'brand_name');
            });

            $(document).on('typeahead:selected','#categoryFilter',function() 
            {
                datatable.search($(this).val().toLowerCase(), 'categoryFilter');
            });

            $(document).on('typeahead:selected','#tagsFilter',function() 
            {
                datatable.search($(this).val().toLowerCase(), 'tagsFilter');
            });

            $(document).on('typeahead:selected','#manufacturerFilter',function() 
            {
                datatable.search($(this).val().toLowerCase(), 'manufacturerFilter');
            });

            $('#from_created_date').on('change', function() {
                datatable.search($(this).val(), 'fromCreatedDate');
            });

            $('#to_created_date').on('change', function() {
                datatable.search($(this).val(), 'toCreatedDate');
            });

            $('#from_updated_date').on('change', function() {
                datatable.search($(this).val(), 'fromUpdatedDate');
            });

            $('#to_updated_date').on('change', function() {
                datatable.search($(this).val(), 'toUpdatedDate');
            });

            $('#notApplied').on('change', function() {
                datatable.search($(this).val(), 'notApplied');
            });

            $('#stockAvailability').on('change', function() {
                datatable.search($(this).val(), 'stockAvailability');
            });

            $('.selectClass').on('change', function() 
            {
                var class_data = '';

                $('.selectClass').each(function() 
                {
                    if($(this).val()!='')
                    {
                        if(class_data=='')
                        {
                            class_data = $(this).attr('id')+'-'+$(this).val();
                        }
                        else
                        {
                            class_data += '::'+$(this).attr('id')+'-'+$(this).val()
                        } 
                    } 
                    
                });

                datatable.search(class_data, 'selectClass');
            });

            $(document).on('typeahead:selected','.typeaheadClass',function() 
            {
                var class_data = '';

                $('.typeaheadClass').each(function() 
                {
                    if($(this).val()!='')
                    {
                        if(class_data=='')
                        {
                            class_data = $(this).attr('id')+'-'+$(this).val();
                        }
                        else
                        {
                            class_data += '::'+$(this).attr('id')+'-'+$(this).val()
                        } 
                    } 
                    
                });
                
                datatable.search(class_data, 'typeaheadClass');
            });

            $('#price_filter').on('click', function(){
                var min_price = $('#min_price').val();
                var max_price = $('#max_price').val();

                if(min_price=='' && max_price=='')
                {
                    alert("please enter min or max price");
                }
                else
                {
                   datatable.search(min_price+'-'+max_price, 'price'); 
                }
            });

            $('input[name="published"]').click(function(){
                if($(this).is(":checked")){
                    datatable.search('Y', 'published');
                }
                else
                {
                   datatable.search('', 'published'); 
                }
            });

            $('input[name="net_priced"]').click(function(){
                if($(this).is(":checked")){
                    datatable.search('Y', 'net_priced');
                }
                else
                {
                   datatable.search('', 'net_priced'); 
                }
            });

            $('input[name="bulk"]').click(function(){
                if($(this).is(":checked")){
                    datatable.search('Y', 'bulk');
                }
                else
                {
                   datatable.search('', 'bulk'); 
                }
            });

            $('input[name="only_members"]').click(function(){
                if($(this).is(":checked")){
                    datatable.search('Y', 'only_members');
                }
                else
                {
                   datatable.search('', 'only_members'); 
                }
            });

            $('input[name="approval"]').click(function(){
                if($(this).is(":checked")){
                    datatable.search('Y', 'approval');
                }
                else
                {
                   datatable.search('', 'approval'); 
                }
            });

            $('input[name="pre_order"]').click(function(){
                if($(this).is(":checked")){
                    datatable.search('Y', 'pre_order');
                }
                else
                {
                   datatable.search('', 'pre_order'); 
                }
            });

            $('.reset').on('click', function(){
                $("#skuFilter").typeahead('val','');
                $("#categoryFilter").typeahead('val','');
                $("#tagsFilter").typeahead('val','');
                $("#manufacturerFilter").typeahead('val','');
                $("#brand_name").typeahead('val','');
                $(".typeaheadClass").typeahead('val','');
                $('#activeStatus').val('').trigger("change");
                $('#notApplied').val('').trigger("change");
                $('#stockAvailability').val('').trigger("change");
                $('#from_created_date').val('');
                $('#to_created_date').val('');
                $('#from_updated_date').val('');
                $('#to_updated_date').val('');
                $('#min_price').val('');
                $('#max_price').val('');
                $('.selectClass').val('').trigger("change");
                $("input:checkbox").prop('checked', false);
                datatable.search('',['skuFilter','categoryFilter','tagsFilter','manufacturerFilter','brand_name','activeStatus','notApplied','fromCreatedDate','toCreatedDate','fromUpdatedDate','toUpdatedDate','stockAvailability','price','selectClass','typeaheadClass','published','net_priced','only_members','price','bulk','pre_order','approval']);
            });

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
                        $('#kt_datatable_group_action_form1').addClass('new_records');

                    } else {

                        $('#kt_datatable_group_action_form1').collapse('hide');
                        $('#kt_datatable_group_action_form1').removeClass('new_records');
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
                                    // position: "top-right",
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
                                    // position: "top-right",
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
                                        // position: "top-right",
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
                                        // position: "top-right",
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

            /* copy product start */

            $(document).on('click','.copy_action',function()
            {
                var id = $(this).attr('data-id');

                swal.fire({
                    title: "Copy Data!",
                    text: "Are you sure want to copy product!",
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
                          url:'duplicateProduct',
                          type:'POST',
                          data:'product_faq_id='+id,
                          success:function(data)
                          {
                            datatable.load();
                          }
                        });
                    }
                });
            });

            /* product copy end */

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
                        url:'faqManageData',
                        type:'POST',
                        data:'job_status_id='+job_status_id+'&job_status='+job_status,
                        success:function(data)
                        {
                            var resp = data.split("::");

                            if(resp[0]!=200)
                            {
                                swal.fire({
                                    // position: "top-right",
                                    icon: "error",
                                    title: resp[1],
                                    showConfirmButton: false,
                                    timer: 1500
                                });
                            }
                            else
                            {
                                swal.fire({
                                    // position: "top-right",
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
                    url: 'getCategoryAutocomplete?query=%QUERY',
                    wildcard: '%QUERY'
                }
            });

            userSource.initialize();

            $('#categoryFilter').typeahead({
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
                    url: 'getTagsAutocomplete?query=%QUERY&attr_id='+$(this).attr('id'),
                    wildcard: '%QUERY'
                }
            });

            userSource.initialize();

            $('#tagsFilter').typeahead({
                hint: true,
                highlight: true,
                minLength: 1
            },
            {
                name: 'states',
                source: userSource
            }); 
        }

        var demo5 = function() {
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

            $('#manufacturerFilter').typeahead({
                hint: true,
                highlight: true,
                minLength: 1
            },
            {
                name: 'states',
                source: userSource
            }); 
        }

        var demo6 = function() {
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

            var demo7 = function() {
            // constructs the suggestion engine
            var userSource = new Bloodhound({
                datumTokenizer: Bloodhound.tokenizers.whitespace,
                queryTokenizer: Bloodhound.tokenizers.whitespace,
                // `states` is an array of state names defined in "The Basics"
                remote: { 
                    url: 'getBrandAutocomplete?query=%QUERY',
                    wildcard: '%QUERY'
                }
            });

            userSource.initialize();

            $('#brand_name').typeahead({
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
                demo5();
                demo6();
                demo7();

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
            $('#from_created_date').datepicker({
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

        var datepicker_demos1 = function () {
            // orientation 
            $('#to_created_date').datepicker({
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

        var datepicker_demos2 = function () {
            // orientation 
            $('#to_updated_date').datepicker({
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

        var datepicker_demos3 = function () {
            // orientation 
            $('#to_updated_date').datepicker({
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
                datepicker_demos1(); 
                datepicker_demos2(); 
                datepicker_demos3(); 
            }
        };
    }();

    jQuery(document).ready(function() {
        KTDatatableRecordSelectionDemo.init();
        KTTypeahead.init();
        KTBootstrapDatepicker.init();
    });


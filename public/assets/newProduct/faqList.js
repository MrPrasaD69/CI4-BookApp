
    // "use strict";
    // Class definition

    var KTDatatableRecordSelectionDemo = function() {
        // Private functions

        options = {
            // datasource definition
            data: {
                type: 'remote',
                source: {
                    read: {
                        url: 'list',
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
            },{
                field: 'srno',
                title: 'Sr No',
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
                title: 'Active Status',
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
                sortable: false,
                width: 110,
                overflow: 'visible',
                textAlign: 'left',
                autoHide: false,
                template: function(row) {
                    return '\
                        <a href="javascript:void(0);" onclick="manageData('+row.Id+')" class="btn btn-sm btn-clean btn-icon btn-icon-sm" title="Edit details">\
                            <i class="flaticon2-edit text-primary"></i>\
                        </a>\
                        <a href="javascript:void(0);"  onclick="deleteData('+row.Id+','+row.RecordId+')" class="btn btn-sm btn-clean btn-icon btn-icon-sm" title="Delete">\
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
                // datatable.search($(this).val(), 'activeStatus');
                 filterData();
            });
                            
            $(document).on('typeahead:selected','#stateFilter',function() 
            {
                // datatable.search('N', 'is_reset');
                // datatable.search($(this).val().toLowerCase(), 'VendorNameFilter');
                 filterData();
            });
            $(document).on('typeahead:selected','#countryFilter',function() 
            {
                // datatable.search('N', 'is_reset');
                // datatable.search($(this).val().toLowerCase(), 'SocietyNameFilter');
                 filterData();
            });
           
           
                // var oTable = $('#staffTable').DataTable();
                // $('#search').on('click',function () {
                //     alert('hi');

                //     datatable.search($(this).val(), 'authorFilter');
                //     // datatable.search($(this).val(), 'titleFilter');
                //     // datatable.search($(this).val(), 'linkFilter');
                //     // datatable.columns(4).search("authorFilter", true, false, true);
                // });

                // EDIT: Capture enter press as well
                $("#search").click(function(e) {
                    // alert('hi');
                    // You can use $(this) here, since this once again refers to your text input            
                    // if(e.which === 13) {
                        e.preventDefault(); // Prevent form submit
                        datatable.search($(this).val(), 'stateFilter');
                    // }
                });
           

           

          

            $('.reset').on('click', function(){
                $("#stateFilter").typeahead('val','');
                $("#countryFilter").typeahead('val','');
                $('#activeStatus').val('').trigger("change");
              

               datatable.setDataSourceParam('stateFilter','');
                datatable.setDataSourceParam('countryFilter','');
               
                datatable.load();
            });

              $('.search').on('click', function(){
                filterData();
            });

              function filterData()
            {
                var search_data = $('#searchForm').serialize();
                datatable.setDataSourceParam('search_data',search_data);
                datatable.load();
            }

             $(document).on('keypress',function(e) {
                if(e.which == 13) {
                    filterData();
                }
            });
            // $(document).on('click','.reset',function()
            // {
            //     alert("here");
            //     datatable.search('');
            // });

            $('#activeStatus','#stateFilter').selectpicker();

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

            

            $(document).ready(function(){
                datatable.search();
            });

            

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
                    url: 'getStateAutocomplete?query=%QUERY',
                    wildcard: '%QUERY'
                }
            });

            userSource.initialize();

            $('#stateFilter').typeahead({
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
                    url: 'getCountryAutocomplete?query=%QUERY',
                    wildcard: '%QUERY'
                }
            });

            userSource.initialize();

            $('#countryFilter').typeahead({
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
            $('#dateFilter').datepicker({
                rtl: KTUtil.isRTL(),
                orientation: "bottom center",
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


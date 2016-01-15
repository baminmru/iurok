
Ext.require([
'Ext.form.*'
]);
  iud_process_edit= null;
function iud_process_Panel_edit(objectID, RootPanel, selection){ 


    var store_iud_process_def = Ext.create('Ext.data.Store', {
        model:'model_iud_process_def',
        autoLoad: false,
        autoSync: false,
        proxy: {
            type:   'ajax',
                url:   rootURL+'index.php/c_iud_process_def/getRows',
            reader: {
                type:   'json'
                ,root:  'data'
                ,successProperty:  'success'
                ,messageProperty:  'msg'
                },
            extraParams:{
                instanceid: objectID
            }
        }
    });
          DefineForms_iud_process_def_edit();
     var   int_iud_process_def_edit     =      DefineInterface_iud_process_def_edit('int_iud_process_def',store_iud_process_def);
     iud_process_edit= Ext.create('Ext.form.Panel', {
      id: 'iud_process',
      layout:'fit',
      fieldDefaults: {
          labelAlign:             'top',
          msgTarget:              'side'
        },
        defaults: {
        anchor:'100%'
        },

        instanceid:objectID,
                onCommit: function(){
        		},
        		onButtonOk: function()
        		{
        			var me = this;
        		},
        		onButtonCancel: function()
        		{
        		},
        canClose: function(){
        	return true;
        },
        items: [{
            xtype:'tabpanel',
            itemId:'tabs_iud_process',
            activeTab: 0,
            layout: 'fit',
            tabPosition:'top',
            border:0,
            items:[   // tabs
            { // begin part tab
            xtype:'panel',
            border:0,
            title: 'Процесс',
            layout:'fit',
            itemId:'tab_iud_process_def',
            items:[ // panel on tab 
int_iud_process_def_edit
        ] // panel on tab  form or grid
      } // end tab
    ] // part tabs
    }] // tabpanel
    }); //Ext.Create
    if(RootPanel==true){
       iud_process_edit.closable= true;
       iud_process_edit.title= 'Тип производственного процесса';
       iud_process_edit.frame= true;
    }else{
       iud_process_edit.closable= false;
       iud_process_edit.title= '';
       iud_process_edit.frame= false;
    }
   int_iud_process_def_edit.instanceid=objectID;	
       store_iud_process_def.load(  {params:{ instanceid:objectID} } );
    return iud_process_edit;
}
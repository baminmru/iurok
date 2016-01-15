﻿
Ext.require([
'Ext.form.*'
]);
  iud_process_= null;
function iud_process_Panel_(objectID, RootPanel, selection){ 


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
          DefineForms_iud_process_def_();
     var   int_iud_process_def_     =      DefineInterface_iud_process_def_('int_iud_process_def',store_iud_process_def);
     iud_process_= Ext.create('Ext.form.Panel', {
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
int_iud_process_def_
        ] // panel on tab  form or grid
      } // end tab
    ] // part tabs
    }] // tabpanel
    }); //Ext.Create
    if(RootPanel==true){
       iud_process_.closable= true;
       iud_process_.title= 'Тип производственного процесса';
       iud_process_.frame= true;
    }else{
       iud_process_.closable= false;
       iud_process_.title= '';
       iud_process_.frame= false;
    }
   int_iud_process_def_.instanceid=objectID;	
       store_iud_process_def.load(  {params:{ instanceid:objectID} } );
    return iud_process_;
}
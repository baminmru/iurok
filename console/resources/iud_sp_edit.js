
Ext.require([
'Ext.form.*'
]);
  iud_sp_edit= null;
function iud_sp_Panel_edit(objectID, RootPanel, selection){ 


    var store_iud_spub = Ext.create('Ext.data.Store', {
        model:'model_iud_spub',
        autoLoad: false,
        autoSync: false,
        proxy: {
            type:   'ajax',
                url:   rootURL+'index.php/c_iud_spub/getRows',
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
          DefineForms_iud_spub_edit();
     var   int_iud_spub_edit     =      DefineInterface_iud_spub_edit('int_iud_spub',store_iud_spub);
     iud_sp_edit= Ext.create('Ext.form.Panel', {
      id: 'iud_sp',
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
            itemId:'tabs_iud_sp',
            activeTab: 0,
            layout: 'fit',
            tabPosition:'top',
            border:0,
            items:[   // tabs
            { // begin part tab
            xtype:'panel',
            border:0,
            title: 'Статус публикации',
            layout:'fit',
            itemId:'tab_iud_spub',
            items:[ // panel on tab 
int_iud_spub_edit
        ] // panel on tab  form or grid
      } // end tab
    ] // part tabs
    }] // tabpanel
    }); //Ext.Create
    if(RootPanel==true){
       iud_sp_edit.closable= true;
       iud_sp_edit.title= 'Статус публикации';
       iud_sp_edit.frame= true;
    }else{
       iud_sp_edit.closable= false;
       iud_sp_edit.title= '';
       iud_sp_edit.frame= false;
    }
   int_iud_spub_edit.instanceid=objectID;	
       store_iud_spub.load(  {params:{ instanceid:objectID} } );
    return iud_sp_edit;
}
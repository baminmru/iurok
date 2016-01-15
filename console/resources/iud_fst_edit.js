
Ext.require([
'Ext.form.*'
]);
  iud_fst_edit= null;
function iud_fst_Panel_edit(objectID, RootPanel, selection){ 


    var store_iud_filestoretype = Ext.create('Ext.data.Store', {
        model:'model_iud_filestoretype',
        autoLoad: false,
        autoSync: false,
        proxy: {
            type:   'ajax',
                url:   rootURL+'index.php/c_iud_filestoretype/getRows',
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
          DefineForms_iud_filestoretype_edit();
     var   int_iud_filestoretype_edit     =      DefineInterface_iud_filestoretype_edit('int_iud_filestoretype',store_iud_filestoretype);
     iud_fst_edit= Ext.create('Ext.form.Panel', {
      id: 'iud_fst',
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
            itemId:'tabs_iud_fst',
            activeTab: 0,
            layout: 'fit',
            tabPosition:'top',
            border:0,
            items:[   // tabs
            { // begin part tab
            xtype:'panel',
            border:0,
            title: 'Тип хранения файла',
            layout:'fit',
            itemId:'tab_iud_filestoretype',
            items:[ // panel on tab 
int_iud_filestoretype_edit
        ] // panel on tab  form or grid
      } // end tab
    ] // part tabs
    }] // tabpanel
    }); //Ext.Create
    if(RootPanel==true){
       iud_fst_edit.closable= true;
       iud_fst_edit.title= 'Тип хранения файла';
       iud_fst_edit.frame= true;
    }else{
       iud_fst_edit.closable= false;
       iud_fst_edit.title= '';
       iud_fst_edit.frame= false;
    }
   int_iud_filestoretype_edit.instanceid=objectID;	
       store_iud_filestoretype.load(  {params:{ instanceid:objectID} } );
    return iud_fst_edit;
}
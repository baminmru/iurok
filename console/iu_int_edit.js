
Ext.require([
'Ext.form.*'
]);
  iu_int_edit= null;
function iu_int_Panel_edit(objectID, RootPanel, selection){ 


    var store_iu_int_modules = Ext.create('Ext.data.Store', {
        model:'model_iu_int_modules',
        autoLoad: false,
        autoSync: false,
        proxy: {
            type:   'ajax',
                url:   rootURL+'index.php/c_iu_int_modules/getRows',
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
          DefineForms_iu_int_modules_edit();
     var   int_iu_int_modules_edit     =      DefineInterface_iu_int_modules_edit('int_iu_int_modules',store_iu_int_modules);
     iu_int_edit= Ext.create('Ext.form.Panel', {
      id: 'iu_int',
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
            itemId:'tabs_iu_int',
            activeTab: 0,
            layout: 'fit',
            tabPosition:'top',
            border:0,
            items:[   // tabs
            { // begin part tab
            xtype:'panel',
            border:0,
            title: 'Модуль',
            layout:'fit',
            itemId:'tab_iu_int_modules',
            items:[ // panel on tab 
int_iu_int_modules_edit
        ] // panel on tab  form or grid
      } // end tab
    ] // part tabs
    }] // tabpanel
    }); //Ext.Create
    if(RootPanel==true){
       iu_int_edit.closable= true;
       iu_int_edit.title= 'Интерфейс';
       iu_int_edit.frame= true;
    }else{
       iu_int_edit.closable= false;
       iu_int_edit.title= '';
       iu_int_edit.frame= false;
    }
   int_iu_int_modules_edit.instanceid=objectID;	
       store_iu_int_modules.load(  {params:{ instanceid:objectID} } );
    return iu_int_edit;
}
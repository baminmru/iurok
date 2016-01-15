
Ext.require([
'Ext.form.*'
]);
  iu_int_= null;
function iu_int_Panel_(objectID, RootPanel, selection){ 


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
          DefineForms_iu_int_modules_();
     var   int_iu_int_modules_     =      DefineInterface_iu_int_modules_('int_iu_int_modules',store_iu_int_modules);
     iu_int_= Ext.create('Ext.form.Panel', {
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
int_iu_int_modules_
        ] // panel on tab  form or grid
      } // end tab
    ] // part tabs
    }] // tabpanel
    }); //Ext.Create
    if(RootPanel==true){
       iu_int_.closable= true;
       iu_int_.title= 'Интерфейс';
       iu_int_.frame= true;
    }else{
       iu_int_.closable= false;
       iu_int_.title= '';
       iu_int_.frame= false;
    }
   int_iu_int_modules_.instanceid=objectID;	
       store_iu_int_modules.load(  {params:{ instanceid:objectID} } );
    return iu_int_;
}
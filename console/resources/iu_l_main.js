
Ext.require([
'Ext.form.*'
]);
  iu_l_main= null;
function iu_l_Panel_main(objectID, RootPanel, selection){ 


    var store_iu_l_def = Ext.create('Ext.data.Store', {
        model:'model_iu_l_def',
        autoLoad: false,
        autoSync: false,
        proxy: {
            type:   'ajax',
                url:   rootURL+'index.php/c_iu_l_def/getRows',
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
          DefineForms_iu_l_def_main();
     var   int_iu_l_def_main     =      DefineInterface_iu_l_def_main('int_iu_l_def',store_iu_l_def, selection);
     iu_l_main= Ext.create('Ext.form.Panel', {
      id: 'iu_l',
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
        	    int_iu_l_def_main.doSave( me.onCommit);
        		},
        		onButtonCancel: function()
        		{
        		},
        canClose: function(){
        	return int_iu_l_def_main.canClose();
        },
        items: [{
            xtype:'tabpanel',
            itemId:'tabs_iu_l',
            activeTab: 0,
            layout: 'fit',
            tabPosition:'top',
            border:0,
            items:[   // tabs
            { // begin part tab
            xtype:'panel',
            border:0,
            title: 'Сообщение',
            layout:'fit',
            itemId:'tab_iu_l_def',
            items:[ // panel on tab 
int_iu_l_def_main
        ] // panel on tab  form or grid
      } // end tab
    ] // part tabs
    }] // tabpanel
    }); //Ext.Create
    if(RootPanel==true){
       iu_l_main.closable= true;
       iu_l_main.title= 'Личные сообщения';
       iu_l_main.frame= true;
    }else{
       iu_l_main.closable= false;
       iu_l_main.title= '';
       iu_l_main.frame= false;
    }
   store_iu_l_def.on('load', function() {
        if(store_iu_l_def.count()==0){
            store_iu_l_def.insert(0, new model_iu_l_def());
        }
        record= store_iu_l_def.getAt(0);
        record['instanceid']=objectID;
   int_iu_l_def_main.setActiveRecord(record,objectID);	
   });
       store_iu_l_def.load( {params:{ instanceid:objectID} }  );
    return iu_l_main;
}
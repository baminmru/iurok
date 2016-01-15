
Ext.require([
'Ext.form.*'
]);
  iu_rcfg_edit= null;
function iu_rcfg_Panel_edit(objectID, RootPanel, selection){ 


    var store_iu_rcfg_def = Ext.create('Ext.data.Store', {
        model:'model_iu_rcfg_def',
        autoLoad: false,
        autoSync: false,
        proxy: {
            type:   'ajax',
                url:   rootURL+'index.php/c_iu_rcfg_def/getRows',
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

    var store_iu_rcfg_mod = Ext.create('Ext.data.Store', {
        model:'model_iu_rcfg_mod',
        autoLoad: false,
        autoSync: false,
        proxy: {
            type:   'ajax',
                url:   rootURL+'index.php/c_iu_rcfg_mod/getRows',
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

    var store_iu_rcfg_docmode = Ext.create('Ext.data.Store', {
        model:'model_iu_rcfg_docmode',
        autoLoad: false,
        autoSync: false,
        proxy: {
            type:   'ajax',
                url:   rootURL+'index.php/c_iu_rcfg_docmode/getRows',
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
          DefineForms_iu_rcfg_def_edit();
          DefineForms_iu_rcfg_mod_edit();
          DefineForms_iu_rcfg_docmode_edit();
     var   int_iu_rcfg_def_edit     =      DefineInterface_iu_rcfg_def_edit('int_iu_rcfg_def',store_iu_rcfg_def, selection);
     var   int_iu_rcfg_mod_edit     =      DefineInterface_iu_rcfg_mod_edit('int_iu_rcfg_mod',store_iu_rcfg_mod);
     var   int_iu_rcfg_docmode_edit     =      DefineInterface_iu_rcfg_docmode_edit('int_iu_rcfg_docmode',store_iu_rcfg_docmode);
     iu_rcfg_edit= Ext.create('Ext.form.Panel', {
      id: 'iu_rcfg',
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
        	    int_iu_rcfg_def_edit.doSave( me.onCommit);
        		},
        		onButtonCancel: function()
        		{
        		},
        canClose: function(){
        	return int_iu_rcfg_def_edit.canClose();
        },
        items: [{
            xtype:'tabpanel',
            itemId:'tabs_iu_rcfg',
            activeTab: 0,
            layout: 'fit',
            tabPosition:'top',
            border:0,
            items:[   // tabs
            { // begin part tab
            xtype:'panel',
            border:0,
            title: 'Роль',
            layout:'fit',
            itemId:'tab_iu_rcfg_def',
            items:[ // panel on tab 
int_iu_rcfg_def_edit
        ] // panel on tab  form or grid
      } // end tab
,
            { // begin part tab
            xtype:'panel',
            border:0,
            title: 'Модуль',
            layout:'fit',
            itemId:'tab_iu_rcfg_mod',
            items:[ // panel on tab 
int_iu_rcfg_mod_edit
        ] // panel on tab  form or grid
      } // end tab
,
            { // begin part tab
            xtype:'panel',
            border:0,
            title: 'Режим документа',
            layout:'fit',
            itemId:'tab_iu_rcfg_docmode',
            items:[ // panel on tab 
int_iu_rcfg_docmode_edit
        ] // panel on tab  form or grid
      } // end tab
    ] // part tabs
    }] // tabpanel
    }); //Ext.Create
    if(RootPanel==true){
       iu_rcfg_edit.closable= true;
       iu_rcfg_edit.title= 'Настройка роли';
       iu_rcfg_edit.frame= true;
    }else{
       iu_rcfg_edit.closable= false;
       iu_rcfg_edit.title= '';
       iu_rcfg_edit.frame= false;
    }
   store_iu_rcfg_def.on('load', function() {
        if(store_iu_rcfg_def.count()==0){
            store_iu_rcfg_def.insert(0, new model_iu_rcfg_def());
        }
        record= store_iu_rcfg_def.getAt(0);
        record['instanceid']=objectID;
   int_iu_rcfg_def_edit.setActiveRecord(record,objectID);	
   });
       store_iu_rcfg_def.load( {params:{ instanceid:objectID} }  );
   int_iu_rcfg_mod_edit.instanceid=objectID;	
       store_iu_rcfg_mod.load(  {params:{ instanceid:objectID} } );
   int_iu_rcfg_docmode_edit.instanceid=objectID;	
       store_iu_rcfg_docmode.load(  {params:{ instanceid:objectID} } );
    return iu_rcfg_edit;
}
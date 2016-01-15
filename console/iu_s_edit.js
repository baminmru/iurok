
Ext.require([
'Ext.form.*'
]);
  iu_s_edit= null;
function iu_s_Panel_edit(objectID, RootPanel, selection){ 


    var store_iu_status = Ext.create('Ext.data.Store', {
        model:'model_iu_status',
        autoLoad: false,
        autoSync: false,
        proxy: {
            type:   'ajax',
                url:   rootURL+'index.php/c_iu_status/getRows',
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

    var store_iu_statusnext = Ext.create('Ext.data.Store', {
        model:'model_iu_statusnext',
        autoLoad: false,
        autoSync: false,
        proxy: {
            type:   'ajax',
                url:   rootURL+'index.php/c_iu_statusnext/getRows',
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

    var store_iu_statuschanger = Ext.create('Ext.data.Store', {
        model:'model_iu_statuschanger',
        autoLoad: false,
        autoSync: false,
        proxy: {
            type:   'ajax',
                url:   rootURL+'index.php/c_iu_statuschanger/getRows',
            reader: {
                type:   'json'
                ,root:  'data'
                ,successProperty:  'success'
                ,messageProperty:  'msg'
            }
        }
    });

    var store_iu_stausdoc = Ext.create('Ext.data.Store', {
        model:'model_iu_stausdoc',
        autoLoad: false,
        autoSync: false,
        proxy: {
            type:   'ajax',
                url:   rootURL+'index.php/c_iu_stausdoc/getRows',
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

    var store_iu_statustask = Ext.create('Ext.data.Store', {
        model:'model_iu_statustask',
        autoLoad: false,
        autoSync: false,
        proxy: {
            type:   'ajax',
                url:   rootURL+'index.php/c_iu_statustask/getRows',
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

    var store_iu_state_tasklink = Ext.create('Ext.data.Store', {
        model:'model_iu_state_tasklink',
        autoLoad: false,
        autoSync: false,
        proxy: {
            type:   'ajax',
                url:   rootURL+'index.php/c_iu_state_tasklink/getRows',
            reader: {
                type:   'json'
                ,root:  'data'
                ,successProperty:  'success'
                ,messageProperty:  'msg'
            }
        }
    });
          DefineForms_iu_status_edit();
          DefineForms_iu_statusnext_edit();
          DefineForms_iu_stausdoc_edit();
          DefineForms_iu_statustask_edit();
     var   int_iu_status_edit     =      DefineInterface_iu_status_edit('int_iu_status',store_iu_status, selection);
     var   int_iu_statusnext_edit     =      DefineInterface_iu_statusnext_edit('int_iu_statusnext',store_iu_statusnext);
     var   int_iu_stausdoc_edit     =      DefineInterface_iu_stausdoc_edit('int_iu_stausdoc',store_iu_stausdoc);
     var   int_iu_statustask_edit     =      DefineInterface_iu_statustask_edit('int_iu_statustask',store_iu_statustask);
     iu_s_edit= Ext.create('Ext.form.Panel', {
      id: 'iu_s',
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
        	    int_iu_status_edit.doSave( me.onCommit);
        		},
        		onButtonCancel: function()
        		{
        		},
        canClose: function(){
        	return int_iu_status_edit.canClose();
        },
        items: [{
            xtype:'tabpanel',
            itemId:'tabs_iu_s',
            activeTab: 0,
            layout: 'fit',
            tabPosition:'top',
            border:0,
            items:[   // tabs
            { // begin part tab
            xtype:'panel',
            border:0,
            title: 'Подэтап',
            layout:'fit',
            itemId:'tab_iu_status',
            items:[ // panel on tab 
int_iu_status_edit
        ] // panel on tab  form or grid
      } // end tab
,
            { // begin part tab
            xtype:'panel',
            border:0,
            title: 'Возможные переходы',
            layout:'fit',
            itemId:'tab_iu_statusnext',
            items:[ // panel on tab 
int_iu_statusnext_edit
        ] // panel on tab  form or grid
      } // end tab
,
            { // begin part tab
            xtype:'panel',
            border:0,
            title: 'Пакет документов',
            layout:'fit',
            itemId:'tab_iu_stausdoc',
            items:[ // panel on tab 
int_iu_stausdoc_edit
        ] // panel on tab  form or grid
      } // end tab
,
            { // begin part tab
            xtype:'panel',
            border:0,
            title: 'Задачи',
            layout:'fit',
            itemId:'tab_iu_statustask',
            items:[ // panel on tab 
int_iu_statustask_edit
        ] // panel on tab  form or grid
      } // end tab
    ] // part tabs
    }] // tabpanel
    }); //Ext.Create
    if(RootPanel==true){
       iu_s_edit.closable= true;
       iu_s_edit.title= 'Подэтап процесса';
       iu_s_edit.frame= true;
    }else{
       iu_s_edit.closable= false;
       iu_s_edit.title= '';
       iu_s_edit.frame= false;
    }
   store_iu_status.on('load', function() {
        if(store_iu_status.count()==0){
            store_iu_status.insert(0, new model_iu_status());
        }
        record= store_iu_status.getAt(0);
        record['instanceid']=objectID;
   int_iu_status_edit.setActiveRecord(record,objectID);	
   });
       store_iu_status.load( {params:{ instanceid:objectID} }  );
   int_iu_statusnext_edit.instanceid=objectID;	
       store_iu_statusnext.load(  {params:{ instanceid:objectID} } );
   int_iu_stausdoc_edit.instanceid=objectID;	
       store_iu_stausdoc.load(  {params:{ instanceid:objectID} } );
   int_iu_statustask_edit.instanceid=objectID;	
       store_iu_statustask.load(  {params:{ instanceid:objectID} } );
    return iu_s_edit;
}
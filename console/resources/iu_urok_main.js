
Ext.require([
'Ext.form.*'
]);
  iu_urok_main= null;
function iu_urok_Panel_main(objectID, RootPanel, selection){ 


    var store_iu_urok_def = Ext.create('Ext.data.Store', {
        model:'model_iu_urok_def',
        autoLoad: false,
        autoSync: false,
        proxy: {
            type:   'ajax',
                url:   rootURL+'index.php/c_iu_urok_def/getRows',
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

    var store_iu_urok_docs = Ext.create('Ext.data.Store', {
        model:'model_iu_urok_docs',
        autoLoad: false,
        autoSync: false,
        proxy: {
            type:   'ajax',
                url:   rootURL+'index.php/c_iu_urok_docs/getRows',
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

    var store_iu_urok_video = Ext.create('Ext.data.Store', {
        model:'model_iu_urok_video',
        autoLoad: false,
        autoSync: false,
        proxy: {
            type:   'ajax',
                url:   rootURL+'index.php/c_iu_urok_video/getRows',
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

    var store_iu_urok_creators = Ext.create('Ext.data.Store', {
        model:'model_iu_urok_creators',
        autoLoad: false,
        autoSync: false,
        proxy: {
            type:   'ajax',
                url:   rootURL+'index.php/c_iu_urok_creators/getRows',
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
          DefineForms_iu_urok_def_main();
          DefineForms_iu_urok_docs_main();
          DefineForms_iu_urok_video_main();
          DefineForms_iu_urok_creators_main();
     var   int_iu_urok_def_main     =      DefineInterface_iu_urok_def_main('int_iu_urok_def',store_iu_urok_def, selection);
     var   int_iu_urok_docs_main     =      DefineInterface_iu_urok_docs_main('int_iu_urok_docs',store_iu_urok_docs);
     var   int_iu_urok_video_main     =      DefineInterface_iu_urok_video_main('int_iu_urok_video',store_iu_urok_video);
     var   int_iu_urok_creators_main     =      DefineInterface_iu_urok_creators_main('int_iu_urok_creators',store_iu_urok_creators);
     iu_urok_main= Ext.create('Ext.form.Panel', {
      id: 'iu_urok',
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
        	    int_iu_urok_def_main.doSave( me.onCommit);
        		},
        		onButtonCancel: function()
        		{
        		},
        canClose: function(){
        	return int_iu_urok_def_main.canClose();
        },
        items: [{
            xtype:'tabpanel',
            itemId:'tabs_iu_urok',
            activeTab: 0,
            layout: 'fit',
            tabPosition:'top',
            border:0,
            items:[   // tabs
            { // begin part tab
            xtype:'panel',
            border:0,
            title: 'Описание',
            layout:'fit',
            itemId:'tab_iu_urok_def',
            items:[ // panel on tab 
int_iu_urok_def_main
        ] // panel on tab  form or grid
      } // end tab
,
            { // begin part tab
            xtype:'panel',
            border:0,
            title: 'Управление процессом',
            layout:'fit',
            itemId:'tab_iu_urok_ctrl',
            items:[ // panel on tab 
UrokControlTab(objectID)
        ] // panel on tab  form or grid
      } // end tab
,
            { // begin part tab
            xtype:'panel',
            border:0,
            title: 'Материалы',
            layout:'fit',
            itemId:'tab_iu_urok_docs',
            items:[ // panel on tab 
int_iu_urok_docs_main
        ] // panel on tab  form or grid
      } // end tab
,
            { // begin part tab
            xtype:'panel',
            border:0,
            title: 'Видеоматериалы',
            layout:'fit',
            itemId:'tab_iu_urok_video',
            items:[ // panel on tab 
int_iu_urok_video_main
        ] // panel on tab  form or grid
      } // end tab
,
            { // begin part tab
            xtype:'panel',
            border:0,
            title: 'Исполнители',
            layout:'fit',
            itemId:'tab_iu_urok_creators',
            items:[ // panel on tab 
int_iu_urok_creators_main
        ] // panel on tab  form or grid
      } // end tab
    ] // part tabs
    }] // tabpanel
    }); //Ext.Create
    if(RootPanel==true){
       iu_urok_main.closable= true;
       iu_urok_main.title= 'Урок';
       iu_urok_main.frame= true;
    }else{
       iu_urok_main.closable= false;
       iu_urok_main.title= '';
       iu_urok_main.frame= false;
    }
   store_iu_urok_def.on('load', function() {
        if(store_iu_urok_def.count()==0){
            store_iu_urok_def.insert(0, new model_iu_urok_def());
        }
        record= store_iu_urok_def.getAt(0);
        record['instanceid']=objectID;
   int_iu_urok_def_main.setActiveRecord(record,objectID);	
   });
       store_iu_urok_def.load( {params:{ instanceid:objectID} }  );
   int_iu_urok_docs_main.instanceid=objectID;	
       store_iu_urok_docs.load(  {params:{ instanceid:objectID} } );
   int_iu_urok_video_main.instanceid=objectID;	
       store_iu_urok_video.load(  {params:{ instanceid:objectID} } );
   int_iu_urok_creators_main.instanceid=objectID;	
       store_iu_urok_creators.load(  {params:{ instanceid:objectID} } );
    return iu_urok_main;
}
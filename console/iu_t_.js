
Ext.require([
'Ext.form.*'
]);
  iu_t_= null;
function iu_t_Panel_(objectID, RootPanel, selection){ 


    var store_iu_task = Ext.create('Ext.data.Store', {
        model:'model_iu_task',
        autoLoad: false,
        autoSync: false,
        proxy: {
            type:   'ajax',
                url:   rootURL+'index.php/c_iu_task/getRows',
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

    var store_iu_taskrefs = Ext.create('Ext.data.Store', {
        model:'model_iu_taskrefs',
        autoLoad: false,
        autoSync: false,
        proxy: {
            type:   'ajax',
                url:   rootURL+'index.php/c_iu_taskrefs/getRows',
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

    var store_iu_taskvideo = Ext.create('Ext.data.Store', {
        model:'model_iu_taskvideo',
        autoLoad: false,
        autoSync: false,
        proxy: {
            type:   'ajax',
                url:   rootURL+'index.php/c_iu_taskvideo/getRows',
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

    var store_iu_taskattach = Ext.create('Ext.data.Store', {
        model:'model_iu_taskattach',
        autoLoad: false,
        autoSync: false,
        proxy: {
            type:   'ajax',
                url:   rootURL+'index.php/c_iu_taskattach/getRows',
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
          DefineForms_iu_task_();
          DefineForms_iu_taskrefs_();
          DefineForms_iu_taskvideo_();
          DefineForms_iu_taskattach_();
     var   int_iu_task_     =      DefineInterface_iu_task_('int_iu_task',store_iu_task, selection);
     var   int_iu_taskrefs_     =      DefineInterface_iu_taskrefs_('int_iu_taskrefs',store_iu_taskrefs);
     var   int_iu_taskvideo_     =      DefineInterface_iu_taskvideo_('int_iu_taskvideo',store_iu_taskvideo);
     var   int_iu_taskattach_     =      DefineInterface_iu_taskattach_('int_iu_taskattach',store_iu_taskattach);
     iu_t_= Ext.create('Ext.form.Panel', {
      id: 'iu_t',
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
        	    int_iu_task_.doSave( me.onCommit);
        		},
        		onButtonCancel: function()
        		{
        		},
        canClose: function(){
        	return int_iu_task_.canClose();
        },
        items: [{
            xtype:'tabpanel',
            itemId:'tabs_iu_t',
            activeTab: 0,
            layout: 'fit',
            tabPosition:'top',
            border:0,
            items:[   // tabs
            { // begin part tab
            xtype:'panel',
            border:0,
            title: 'Задача',
            layout:'fit',
            itemId:'tab_iu_task',
            items:[ // panel on tab 
int_iu_task_
        ] // panel on tab  form or grid
      } // end tab
,
            { // begin part tab
            xtype:'panel',
            border:0,
            title: 'Вложения',
            layout:'fit',
            itemId:'tab_iu_taskrefs',
            items:[ // panel on tab 
int_iu_taskrefs_
        ] // panel on tab  form or grid
      } // end tab
,
            { // begin part tab
            xtype:'panel',
            border:0,
            title: 'Новые видео',
            layout:'fit',
            itemId:'tab_iu_taskvideo',
            items:[ // panel on tab 
int_iu_taskvideo_
        ] // panel on tab  form or grid
      } // end tab
,
            { // begin part tab
            xtype:'panel',
            border:0,
            title: 'Новые материалы',
            layout:'fit',
            itemId:'tab_iu_taskattach',
            items:[ // panel on tab 
int_iu_taskattach_
        ] // panel on tab  form or grid
      } // end tab
    ] // part tabs
    }] // tabpanel
    }); //Ext.Create
    if(RootPanel==true){
       iu_t_.closable= true;
       iu_t_.title= 'Задачи';
       iu_t_.frame= true;
    }else{
       iu_t_.closable= false;
       iu_t_.title= '';
       iu_t_.frame= false;
    }
   store_iu_task.on('load', function() {
        if(store_iu_task.count()==0){
            store_iu_task.insert(0, new model_iu_task());
        }
        record= store_iu_task.getAt(0);
        record['instanceid']=objectID;
   int_iu_task_.setActiveRecord(record,objectID);	
   });
       store_iu_task.load( {params:{ instanceid:objectID} }  );
   int_iu_taskrefs_.instanceid=objectID;	
       store_iu_taskrefs.load(  {params:{ instanceid:objectID} } );
   int_iu_taskvideo_.instanceid=objectID;	
       store_iu_taskvideo.load(  {params:{ instanceid:objectID} } );
   int_iu_taskattach_.instanceid=objectID;	
       store_iu_taskattach.load(  {params:{ instanceid:objectID} } );
    return iu_t_;
}
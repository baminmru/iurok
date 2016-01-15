
Ext.require([
'Ext.form.*'
]);
  iu_st_= null;
function iu_st_Panel_(objectID, RootPanel, selection){ 


    var store_iu_stage_info = Ext.create('Ext.data.Store', {
        model:'model_iu_stage_info',
        autoLoad: false,
        autoSync: false,
        proxy: {
            type:   'ajax',
                url:   'index.php/c_iu_stage_info/getRows',
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

    var store_iu_stage_doc = Ext.create('Ext.data.Store', {
        model:'model_iu_stage_doc',
        autoLoad: false,
        autoSync: false,
        proxy: {
            type:   'ajax',
                url:   'index.php/c_iu_stage_doc/getRows',
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

    var store_iu_stage_task = Ext.create('Ext.data.Store', {
        model:'model_iu_stage_task',
        autoLoad: false,
        autoSync: false,
        proxy: {
            type:   'ajax',
                url:   'index.php/c_iu_stage_task/getRows',
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
          DefineForms_iu_stage_info_();
          DefineForms_iu_stage_doc_();
          DefineForms_iu_stage_task_();
     var   int_iu_stage_info_     =      DefineInterface_iu_stage_info_('int_iu_stage_info',store_iu_stage_info, selection);
     var   int_iu_stage_doc_     =      DefineInterface_iu_stage_doc_('int_iu_stage_doc',store_iu_stage_doc);
     var   int_iu_stage_task_     =      DefineInterface_iu_stage_task_('int_iu_stage_task',store_iu_stage_task);
     iu_st_= Ext.create('Ext.form.Panel', {
      id: 'iu_st',
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
        	return int_iu_stage_info_.canClose();
        },
        items: [{
            xtype:'tabpanel',
            itemId:'tabs_iu_st',
            activeTab: 0,
            layout: 'fit',
            tabPosition:'top',
            border:0,
            items:[   // tabs
            { // begin part tab
            xtype:'panel',
            border:0,
            title: 'Описание стадии',
            layout:'fit',
            itemId:'tab_iu_stage_info',
            items:[ // panel on tab 
int_iu_stage_info_
        ] // panel on tab  form or grid
      } // end tab
,
            { // begin part tab
            xtype:'panel',
            border:0,
            title: 'Новые документы',
            layout:'fit',
            itemId:'tab_iu_stage_doc',
            items:[ // panel on tab 
int_iu_stage_doc_
        ] // panel on tab  form or grid
      } // end tab
,
            { // begin part tab
            xtype:'panel',
            border:0,
            title: 'Задачи',
            layout:'fit',
            itemId:'tab_iu_stage_task',
            items:[ // panel on tab 
int_iu_stage_task_
        ] // panel on tab  form or grid
      } // end tab
    ] // part tabs
    }] // tabpanel
    }); //Ext.Create
    if(RootPanel==true){
       iu_st_.closable= true;
       iu_st_.title= 'Стадия производства';
       iu_st_.frame= true;
    }else{
       iu_st_.closable= false;
       iu_st_.title= '';
       iu_st_.frame= false;
    }
   store_iu_stage_info.on('load', function() {
        if(store_iu_stage_info.count()==0){
            store_iu_stage_info.insert(0, new model_iu_stage_info());
        }
        record= store_iu_stage_info.getAt(0);
        record['instanceid']=objectID;
   int_iu_stage_info_.setActiveRecord(record,objectID);	
   });
       store_iu_stage_info.load( {params:{ instanceid:objectID} }  );
   int_iu_stage_doc_.instanceid=objectID;	
       store_iu_stage_doc.load(  {params:{ instanceid:objectID} } );
   int_iu_stage_task_.instanceid=objectID;	
       store_iu_stage_task.load(  {params:{ instanceid:objectID} } );
    return iu_st_;
}
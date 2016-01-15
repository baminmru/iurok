
Ext.require([
'Ext.form.*'
]);
  iu_cm_= null;
function iu_cm_Panel_(objectID, RootPanel, selection){ 


    var store_iu_cm_def = Ext.create('Ext.data.Store', {
        model:'model_iu_cm_def',
        autoLoad: false,
        autoSync: false,
        proxy: {
            type:   'ajax',
                url:   rootURL+'index.php/c_iu_cm_def/getRows',
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

    var treestore_iu_cm_msg = Ext.create('Ext.data.TreeStore', {
        model:'model_iu_cm_msg',
        autoLoad: false,
        autoSync: false,
        //folderSort: true,
        nodeParam:  'treeid',
        defaultRootId:  '{00000000-0000-0000-0000-000000000000}',
        proxy: {
            type:   'ajax',
                url:   rootURL+'index.php/c_iu_cm_msg/getRows',
            reader: {
                type:   'json'
                },
            extraParams:{
                instanceid: objectID
            }
        }
    });

    var store_iu_cm_time = Ext.create('Ext.data.Store', {
        model:'model_iu_cm_time',
        autoLoad: false,
        autoSync: false,
        proxy: {
            type:   'ajax',
                url:   rootURL+'index.php/c_iu_cm_time/getRows',
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
          DefineForms_iu_cm_def_();
          DefineForms_iu_cm_msg_();
          DefineForms_iu_cm_time_();
     var   int_iu_cm_def_     =      DefineInterface_iu_cm_def_('int_iu_cm_def',store_iu_cm_def, selection);
  var   int_iu_cm_msg_     = DefineInterface_iu_cm_msg_('int_iu_cm_msg', treestore_iu_cm_msg);
     var   int_iu_cm_time_     =      DefineInterface_iu_cm_time_('int_iu_cm_time',store_iu_cm_time);
     iu_cm_= Ext.create('Ext.form.Panel', {
      id: 'iu_cm',
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
        	    int_iu_cm_def_.doSave( me.onCommit);
        		},
        		onButtonCancel: function()
        		{
        		},
        canClose: function(){
        	return int_iu_cm_def_.canClose();
        },
        items: [{
            xtype:'tabpanel',
            itemId:'tabs_iu_cm',
            activeTab: 0,
            layout: 'fit',
            tabPosition:'top',
            border:0,
            items:[   // tabs
            { // begin part tab
            xtype:'panel',
            border:0,
            title: 'Источник',
            layout:'fit',
            itemId:'tab_iu_cm_def',
            items:[ // panel on tab 
int_iu_cm_def_
        ] // panel on tab  form or grid
      } // end tab
,
            { // begin part tab
            xtype:'panel',
            border:0,
            title: 'Сообщения',
            layout:'fit',
            itemId:'tab_iu_cm_msg',
            items:[ // panel on tab 
int_iu_cm_msg_
        ] // panel on tab  form or grid
      } // end tab
,
            { // begin part tab
            xtype:'panel',
            border:0,
            title: 'Тайминг',
            layout:'fit',
            itemId:'tab_iu_cm_time',
            items:[ // panel on tab 
int_iu_cm_time_
        ] // panel on tab  form or grid
      } // end tab
    ] // part tabs
    }] // tabpanel
    }); //Ext.Create
    if(RootPanel==true){
       iu_cm_.closable= true;
       iu_cm_.title= 'Комментарии';
       iu_cm_.frame= true;
    }else{
       iu_cm_.closable= false;
       iu_cm_.title= '';
       iu_cm_.frame= false;
    }
   store_iu_cm_def.on('load', function() {
        if(store_iu_cm_def.count()==0){
            store_iu_cm_def.insert(0, new model_iu_cm_def());
        }
        record= store_iu_cm_def.getAt(0);
        record['instanceid']=objectID;
   int_iu_cm_def_.setActiveRecord(record,objectID);	
   });
       store_iu_cm_def.load( {params:{ instanceid:objectID} }  );
   int_iu_cm_msg_.instanceid=objectID;	
   int_iu_cm_time_.instanceid=objectID;	
       store_iu_cm_time.load(  {params:{ instanceid:objectID} } );
    return iu_cm_;
}
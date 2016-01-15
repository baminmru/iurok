
Ext.require([
'Ext.form.*'
]);
  iu_us_= null;
function iu_us_Panel_(objectID, RootPanel, selection){ 


    var store_iu_urok_prc = Ext.create('Ext.data.Store', {
        model:'model_iu_urok_prc',
        autoLoad: false,
        autoSync: false,
        proxy: {
            type:   'ajax',
                url:   rootURL+'index.php/c_iu_urok_prc/getRows',
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

    var store_iu_urok_sn = Ext.create('Ext.data.Store', {
        model:'model_iu_urok_sn',
        autoLoad: false,
        autoSync: false,
        proxy: {
            type:   'ajax',
                url:   rootURL+'index.php/c_iu_urok_sn/getRows',
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

    var store_iu_urok_graph = Ext.create('Ext.data.Store', {
        model:'model_iu_urok_graph',
        autoLoad: false,
        autoSync: false,
        proxy: {
            type:   'ajax',
                url:   rootURL+'index.php/c_iu_urok_graph/getRows',
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

    var store_iu_urok_msg = Ext.create('Ext.data.Store', {
        model:'model_iu_urok_msg',
        autoLoad: false,
        autoSync: false,
        proxy: {
            type:   'ajax',
                url:   rootURL+'index.php/c_iu_urok_msg/getRows',
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
          DefineForms_iu_urok_prc_();
          DefineForms_iu_urok_sn_();
          DefineForms_iu_urok_graph_();
          DefineForms_iu_urok_msg_();
     var   int_iu_urok_prc_     =      DefineInterface_iu_urok_prc_('int_iu_urok_prc',store_iu_urok_prc, selection);
     var   int_iu_urok_sn_     =      DefineInterface_iu_urok_sn_('int_iu_urok_sn',store_iu_urok_sn);
     var   int_iu_urok_graph_     =      DefineInterface_iu_urok_graph_('int_iu_urok_graph',store_iu_urok_graph);
     var   int_iu_urok_msg_     =      DefineInterface_iu_urok_msg_('int_iu_urok_msg',store_iu_urok_msg);
     iu_us_= Ext.create('Ext.form.Panel', {
      id: 'iu_us',
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
        	    int_iu_urok_prc_.doSave( me.onCommit);
        		},
        		onButtonCancel: function()
        		{
        		},
        canClose: function(){
        	return int_iu_urok_prc_.canClose();
        },
        items: [{
            xtype:'tabpanel',
            itemId:'tabs_iu_us',
            activeTab: 0,
            layout: 'fit',
            tabPosition:'top',
            border:0,
            items:[   // tabs
            { // begin part tab
            xtype:'panel',
            border:0,
            title: 'Текущий этап',
            layout:'fit',
            itemId:'tab_iu_urok_prc',
            items:[ // panel on tab 
int_iu_urok_prc_
        ] // panel on tab  form or grid
      } // end tab
,
            { // begin part tab
            xtype:'panel',
            border:0,
            title: 'Статусы',
            layout:'fit',
            itemId:'tab_iu_urok_sn',
            items:[ // panel on tab 
int_iu_urok_sn_
        ] // panel on tab  form or grid
      } // end tab
,
            { // begin part tab
            xtype:'panel',
            border:0,
            title: 'График производства',
            layout:'fit',
            itemId:'tab_iu_urok_graph',
            items:[ // panel on tab 
int_iu_urok_graph_
        ] // panel on tab  form or grid
      } // end tab
,
            { // begin part tab
            xtype:'panel',
            border:0,
            title: 'Сообщения',
            layout:'fit',
            itemId:'tab_iu_urok_msg',
            items:[ // panel on tab 
int_iu_urok_msg_
        ] // panel on tab  form or grid
      } // end tab
    ] // part tabs
    }] // tabpanel
    }); //Ext.Create
    if(RootPanel==true){
       iu_us_.closable= true;
       iu_us_.title= 'Состояние урока';
       iu_us_.frame= true;
    }else{
       iu_us_.closable= false;
       iu_us_.title= '';
       iu_us_.frame= false;
    }
   store_iu_urok_prc.on('load', function() {
        if(store_iu_urok_prc.count()==0){
            store_iu_urok_prc.insert(0, new model_iu_urok_prc());
        }
        record= store_iu_urok_prc.getAt(0);
        record['instanceid']=objectID;
   int_iu_urok_prc_.setActiveRecord(record,objectID);	
   });
       store_iu_urok_prc.load( {params:{ instanceid:objectID} }  );
   int_iu_urok_sn_.instanceid=objectID;	
       store_iu_urok_sn.load(  {params:{ instanceid:objectID} } );
   int_iu_urok_graph_.instanceid=objectID;	
       store_iu_urok_graph.load(  {params:{ instanceid:objectID} } );
   int_iu_urok_msg_.instanceid=objectID;	
       store_iu_urok_msg.load(  {params:{ instanceid:objectID} } );
    return iu_us_;
}
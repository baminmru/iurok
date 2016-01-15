
Ext.require([
'Ext.form.*'
]);
  iu_tm_read= null;
function iu_tm_Panel_read(objectID, RootPanel, selection){ 


    var store_iu_tmdef = Ext.create('Ext.data.Store', {
        model:'model_iu_tmdef',
        autoLoad: false,
        autoSync: false,
        proxy: {
            type:   'ajax',
                url:   rootURL+'index.php/c_iu_tmdef/getRows',
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

    var store_iu_tmcadr = Ext.create('Ext.data.Store', {
        model:'model_iu_tmcadr',
        autoLoad: false,
        autoSync: false,
        proxy: {
            type:   'ajax',
                url:   rootURL+'index.php/c_iu_tmcadr/getRows',
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
          DefineForms_iu_tmdef_read();
          DefineForms_iu_tmcadr_read();
     var   int_iu_tmdef_read     =      DefineInterface_iu_tmdef_read('int_iu_tmdef',store_iu_tmdef, selection);
     var   int_iu_tmcadr_read     =      DefineInterface_iu_tmcadr_read('int_iu_tmcadr',store_iu_tmcadr);
     iu_tm_read= Ext.create('Ext.form.Panel', {
      id: 'iu_tm',
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
        	    int_iu_tmdef_read.doSave( me.onCommit);
        		},
        		onButtonCancel: function()
        		{
        		},
        canClose: function(){
        	return int_iu_tmdef_read.canClose();
        },
        items: [{
            xtype:'tabpanel',
            itemId:'tabs_iu_tm',
            activeTab: 0,
            layout: 'fit',
            tabPosition:'top',
            border:0,
            items:[   // tabs
            { // begin part tab
            xtype:'panel',
            border:0,
            title: 'Информация',
            layout:'fit',
            itemId:'tab_iu_tmdef',
            items:[ // panel on tab 
int_iu_tmdef_read
        ] // panel on tab  form or grid
      } // end tab
,
            { // begin part tab
            xtype:'panel',
            border:0,
            title: 'Мастер-кадры и костюмы',
            layout:'fit',
            itemId:'tab_iu_tmcadr',
            items:[ // panel on tab 
int_iu_tmcadr_read
        ] // panel on tab  form or grid
      } // end tab
    ] // part tabs
    }] // tabpanel
    }); //Ext.Create
    if(RootPanel==true){
       iu_tm_read.closable= true;
       iu_tm_read.title= 'Учителя и Методисты';
       iu_tm_read.frame= true;
    }else{
       iu_tm_read.closable= false;
       iu_tm_read.title= '';
       iu_tm_read.frame= false;
    }
   store_iu_tmdef.on('load', function() {
        if(store_iu_tmdef.count()==0){
            store_iu_tmdef.insert(0, new model_iu_tmdef());
        }
        record= store_iu_tmdef.getAt(0);
        record['instanceid']=objectID;
   int_iu_tmdef_read.setActiveRecord(record,objectID);	
   });
       store_iu_tmdef.load( {params:{ instanceid:objectID} }  );
   int_iu_tmcadr_read.instanceid=objectID;	
       store_iu_tmcadr.load(  {params:{ instanceid:objectID} } );
    return iu_tm_read;
}
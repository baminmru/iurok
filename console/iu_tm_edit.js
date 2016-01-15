
Ext.require([
'Ext.form.*'
]);
  iu_tm_edit= null;
function iu_tm_Panel_edit(objectID, RootPanel, selection){ 


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

    var store_iu_tm_records = Ext.create('Ext.data.Store', {
        model:'model_iu_tm_records',
        autoLoad: false,
        autoSync: false,
        proxy: {
            type:   'ajax',
                url:   rootURL+'index.php/c_iu_tm_records/getRows',
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

    var store_iu_tm_dog = Ext.create('Ext.data.Store', {
        model:'model_iu_tm_dog',
        autoLoad: false,
        autoSync: false,
        proxy: {
            type:   'ajax',
                url:   rootURL+'index.php/c_iu_tm_dog/getRows',
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

    var store_iu_tm_act = Ext.create('Ext.data.Store', {
        model:'model_iu_tm_act',
        autoLoad: false,
        autoSync: false,
        proxy: {
            type:   'ajax',
                url:   rootURL+'index.php/c_iu_tm_act/getRows',
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

    var store_iu_tm_actfile = Ext.create('Ext.data.Store', {
        model:'model_iu_tm_actfile',
        autoLoad: false,
        autoSync: false,
        proxy: {
            type:   'ajax',
                url:   rootURL+'index.php/c_iu_tm_actfile/getRows',
            reader: {
                type:   'json'
                ,root:  'data'
                ,successProperty:  'success'
                ,messageProperty:  'msg'
            }
        }
    });
          DefineForms_iu_tmdef_edit();
          DefineForms_iu_tmcadr_edit();
          DefineForms_iu_tm_records_edit();
          DefineForms_iu_tm_dog_edit();
          DefineForms_iu_tm_act_edit();
     var   int_iu_tmdef_edit     =      DefineInterface_iu_tmdef_edit('int_iu_tmdef',store_iu_tmdef, selection);
     var   int_iu_tmcadr_edit     =      DefineInterface_iu_tmcadr_edit('int_iu_tmcadr',store_iu_tmcadr);
     var   int_iu_tm_records_edit     =      DefineInterface_iu_tm_records_edit('int_iu_tm_records',store_iu_tm_records);
     var   int_iu_tm_dog_edit     =      DefineInterface_iu_tm_dog_edit('int_iu_tm_dog',store_iu_tm_dog);
     var   int_iu_tm_act_edit     =      DefineInterface_iu_tm_act_edit('int_iu_tm_act',store_iu_tm_act);
     iu_tm_edit= Ext.create('Ext.form.Panel', {
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
        	    int_iu_tmdef_edit.doSave( me.onCommit);
        		},
        		onButtonCancel: function()
        		{
        		},
        canClose: function(){
        	return int_iu_tmdef_edit.canClose();
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
int_iu_tmdef_edit
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
int_iu_tmcadr_edit
        ] // panel on tab  form or grid
      } // end tab
,
            { // begin part tab
            xtype:'panel',
            border:0,
            title: 'Досье',
            layout:'fit',
            itemId:'tab_iu_tm_records',
            items:[ // panel on tab 
int_iu_tm_records_edit
        ] // panel on tab  form or grid
      } // end tab
,
            { // begin part tab
            xtype:'panel',
            border:0,
            title: 'Договора',
            layout:'fit',
            itemId:'tab_iu_tm_dog',
            items:[ // panel on tab 
int_iu_tm_dog_edit
        ] // panel on tab  form or grid
      } // end tab
,
            { // begin part tab
            xtype:'panel',
            border:0,
            title: 'Акты',
            layout:'fit',
            itemId:'tab_iu_tm_act',
            items:[ // panel on tab 
int_iu_tm_act_edit
        ] // panel on tab  form or grid
      } // end tab
    ] // part tabs
    }] // tabpanel
    }); //Ext.Create
    if(RootPanel==true){
       iu_tm_edit.closable= true;
       iu_tm_edit.title= 'Учителя и Методисты';
       iu_tm_edit.frame= true;
    }else{
       iu_tm_edit.closable= false;
       iu_tm_edit.title= '';
       iu_tm_edit.frame= false;
    }
   store_iu_tmdef.on('load', function() {
        if(store_iu_tmdef.count()==0){
            store_iu_tmdef.insert(0, new model_iu_tmdef());
        }
        record= store_iu_tmdef.getAt(0);
        record['instanceid']=objectID;
   int_iu_tmdef_edit.setActiveRecord(record,objectID);	
   });
       store_iu_tmdef.load( {params:{ instanceid:objectID} }  );
   int_iu_tmcadr_edit.instanceid=objectID;	
       store_iu_tmcadr.load(  {params:{ instanceid:objectID} } );
   store_iu_tm_records.on('load', function() {
        if(store_iu_tm_records.count()==0){
            store_iu_tm_records.insert(0, new model_iu_tm_records());
        }
        record= store_iu_tm_records.getAt(0);
        record['instanceid']=objectID;
   int_iu_tm_records_edit.setActiveRecord(record,objectID);	
   });
       store_iu_tm_records.load( {params:{ instanceid:objectID} }  );
   int_iu_tm_dog_edit.instanceid=objectID;	
       store_iu_tm_dog.load(  {params:{ instanceid:objectID} } );
   int_iu_tm_act_edit.instanceid=objectID;	
       store_iu_tm_act.load(  {params:{ instanceid:objectID} } );
    return iu_tm_edit;
}
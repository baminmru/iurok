
Ext.require([
'Ext.form.*'
]);
  iu_urok_new_= null;
function iu_urok_Panel_new_(objectID, RootPanel, selection){ 


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
          DefineForms_iu_urok_def_new_();
     var   int_iu_urok_def_new_     =      DefineInterface_iu_urok_def_new_('int_iu_urok_def',store_iu_urok_def, selection);
     iu_urok_new_= Ext.create('Ext.form.Panel', {
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
        	    int_iu_urok_def_new_.doSave( me.onCommit);
        		},
        		onButtonCancel: function()
        		{
        		},
        canClose: function(){
        	return int_iu_urok_def_new_.canClose();
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
int_iu_urok_def_new_
        ] // panel on tab  form or grid
      } // end tab
    ] // part tabs
    }] // tabpanel
    }); //Ext.Create
    if(RootPanel==true){
       iu_urok_new_.closable= true;
       iu_urok_new_.title= 'Урок';
       iu_urok_new_.frame= true;
    }else{
       iu_urok_new_.closable= false;
       iu_urok_new_.title= '';
       iu_urok_new_.frame= false;
    }
   store_iu_urok_def.on('load', function() {
        if(store_iu_urok_def.count()==0){
            store_iu_urok_def.insert(0, new model_iu_urok_def());
        }
        record= store_iu_urok_def.getAt(0);
        record['instanceid']=objectID;
   int_iu_urok_def_new_.setActiveRecord(record,objectID);	
   });
       store_iu_urok_def.load( {params:{ instanceid:objectID} }  );
    return iu_urok_new_;
}
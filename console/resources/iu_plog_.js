
Ext.require([
'Ext.form.*'
]);
  iu_plog_= null;
function iu_plog_Panel_(objectID, RootPanel, selection){ 


    var store_iu_plevent = Ext.create('Ext.data.Store', {
        model:'model_iu_plevent',
        autoLoad: false,
        autoSync: false,
        proxy: {
            type:   'ajax',
                url:   rootURL+'index.php/c_iu_plevent/getRows',
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
          DefineForms_iu_plevent_();
     var   int_iu_plevent_     =      DefineInterface_iu_plevent_('int_iu_plevent',store_iu_plevent);
     iu_plog_= Ext.create('Ext.form.Panel', {
      id: 'iu_plog',
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
        	return true;
        },
        items: [{
            xtype:'tabpanel',
            itemId:'tabs_iu_plog',
            activeTab: 0,
            layout: 'fit',
            tabPosition:'top',
            border:0,
            items:[   // tabs
            { // begin part tab
            xtype:'panel',
            border:0,
            title: 'Событие',
            layout:'fit',
            itemId:'tab_iu_plevent',
            items:[ // panel on tab 
int_iu_plevent_
        ] // panel on tab  form or grid
      } // end tab
    ] // part tabs
    }] // tabpanel
    }); //Ext.Create
    if(RootPanel==true){
       iu_plog_.closable= true;
       iu_plog_.title= 'Логирование событий';
       iu_plog_.frame= true;
    }else{
       iu_plog_.closable= false;
       iu_plog_.title= '';
       iu_plog_.frame= false;
    }
   int_iu_plevent_.instanceid=objectID;	
       store_iu_plevent.load(  {params:{ instanceid:objectID} } );
    return iu_plog_;
}

Ext.require([
'Ext.form.*'
]);
  iu_d_urole_= null;
function iu_d_urole_Panel_(objectID, RootPanel, selection){ 


    var store_iu_crole = Ext.create('Ext.data.Store', {
        model:'model_iu_crole',
        autoLoad: false,
        autoSync: false,
        proxy: {
            type:   'ajax',
                url:   rootURL+'index.php/c_iu_crole/getRows',
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
          DefineForms_iu_crole_();
     var   int_iu_crole_     =      DefineInterface_iu_crole_('int_iu_crole',store_iu_crole);
     iu_d_urole_= Ext.create('Ext.form.Panel', {
      id: 'iu_d_urole',
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
            itemId:'tabs_iu_d_urole',
            activeTab: 0,
            layout: 'fit',
            tabPosition:'top',
            border:0,
            items:[   // tabs
            { // begin part tab
            xtype:'panel',
            border:0,
            title: 'Роль',
            layout:'fit',
            itemId:'tab_iu_crole',
            items:[ // panel on tab 
int_iu_crole_
        ] // panel on tab  form or grid
      } // end tab
    ] // part tabs
    }] // tabpanel
    }); //Ext.Create
    if(RootPanel==true){
       iu_d_urole_.closable= true;
       iu_d_urole_.title= 'Роль сотрудника';
       iu_d_urole_.frame= true;
    }else{
       iu_d_urole_.closable= false;
       iu_d_urole_.title= '';
       iu_d_urole_.frame= false;
    }
   int_iu_crole_.instanceid=objectID;	
       store_iu_crole.load(  {params:{ instanceid:objectID} } );
    return iu_d_urole_;
}
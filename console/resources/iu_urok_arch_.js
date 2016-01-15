
Ext.require([
'Ext.form.*'
]);
  iu_urok_arch_= null;
function iu_urok_arch_Panel_(objectID, RootPanel, selection){ 

     iu_urok_arch_= Ext.create('Ext.form.Panel', {
      id: 'iu_urok_arch',
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
            itemId:'tabs_iu_urok_arch',
            activeTab: 0,
            layout: 'fit',
            tabPosition:'top',
            border:0,
            items:[   // tabs
    ] // part tabs
    }] // tabpanel
    }); //Ext.Create
    if(RootPanel==true){
       iu_urok_arch_.closable= true;
       iu_urok_arch_.title= 'Урок.Архив';
       iu_urok_arch_.frame= true;
    }else{
       iu_urok_arch_.closable= false;
       iu_urok_arch_.title= '';
       iu_urok_arch_.frame= false;
    }
    return iu_urok_arch_;
}
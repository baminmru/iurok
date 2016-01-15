
Ext.require([
'Ext.form.*'
]);
  iud_sp_= null;
function iud_sp_Panel_(objectID, RootPanel, selection){ 


    var store_iud_spub = Ext.create('Ext.data.Store', {
        model:'model_iud_spub',
        autoLoad: false,
        autoSync: false,
        proxy: {
            type:   'ajax',
                url:   rootURL+'index.php/c_iud_spub/getRows',
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
          DefineForms_iud_spub_();
     var   int_iud_spub_     =      DefineInterface_iud_spub_('int_iud_spub',store_iud_spub);
     iud_sp_= Ext.create('Ext.form.Panel', {
      id: 'iud_sp',
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
            itemId:'tabs_iud_sp',
            activeTab: 0,
            layout: 'fit',
            tabPosition:'top',
            border:0,
            items:[   // tabs
            { // begin part tab
            xtype:'panel',
            border:0,
            title: 'Статус публикации',
            layout:'fit',
            itemId:'tab_iud_spub',
            items:[ // panel on tab 
int_iud_spub_
        ] // panel on tab  form or grid
      } // end tab
    ] // part tabs
    }] // tabpanel
    }); //Ext.Create
    if(RootPanel==true){
       iud_sp_.closable= true;
       iud_sp_.title= 'Статус публикации';
       iud_sp_.frame= true;
    }else{
       iud_sp_.closable= false;
       iud_sp_.title= '';
       iud_sp_.frame= false;
    }
   int_iud_spub_.instanceid=objectID;	
       store_iud_spub.load(  {params:{ instanceid:objectID} } );
    return iud_sp_;
}
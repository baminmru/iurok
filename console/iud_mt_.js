
Ext.require([
'Ext.form.*'
]);
  iud_mt_= null;
function iud_mt_Panel_(objectID, RootPanel, selection){ 


    var store_iud_mt_def = Ext.create('Ext.data.Store', {
        model:'model_iud_mt_def',
        autoLoad: false,
        autoSync: false,
        proxy: {
            type:   'ajax',
                url:   rootURL+'index.php/c_iud_mt_def/getRows',
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
          DefineForms_iud_mt_def_();
     var   int_iud_mt_def_     =      DefineInterface_iud_mt_def_('int_iud_mt_def',store_iud_mt_def);
     iud_mt_= Ext.create('Ext.form.Panel', {
      id: 'iud_mt',
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
            itemId:'tabs_iud_mt',
            activeTab: 0,
            layout: 'fit',
            tabPosition:'top',
            border:0,
            items:[   // tabs
            { // begin part tab
            xtype:'panel',
            border:0,
            title: 'Тип сообщения',
            layout:'fit',
            itemId:'tab_iud_mt_def',
            items:[ // panel on tab 
int_iud_mt_def_
        ] // panel on tab  form or grid
      } // end tab
    ] // part tabs
    }] // tabpanel
    }); //Ext.Create
    if(RootPanel==true){
       iud_mt_.closable= true;
       iud_mt_.title= 'Тип сообщения';
       iud_mt_.frame= true;
    }else{
       iud_mt_.closable= false;
       iud_mt_.title= '';
       iud_mt_.frame= false;
    }
   int_iud_mt_def_.instanceid=objectID;	
       store_iud_mt_def.load(  {params:{ instanceid:objectID} } );
    return iud_mt_;
}
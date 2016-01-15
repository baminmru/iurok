
Ext.require([
'Ext.form.*'
]);
  iud_sn_= null;
function iud_sn_Panel_(objectID, RootPanel, selection){ 


    var store_iud_sn_def = Ext.create('Ext.data.Store', {
        model:'model_iud_sn_def',
        autoLoad: false,
        autoSync: false,
        proxy: {
            type:   'ajax',
                url:   rootURL+'index.php/c_iud_sn_def/getRows',
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
          DefineForms_iud_sn_def_();
     var   int_iud_sn_def_     =      DefineInterface_iud_sn_def_('int_iud_sn_def',store_iud_sn_def);
     iud_sn_= Ext.create('Ext.form.Panel', {
      id: 'iud_sn',
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
            itemId:'tabs_iud_sn',
            activeTab: 0,
            layout: 'fit',
            tabPosition:'top',
            border:0,
            items:[   // tabs
            { // begin part tab
            xtype:'panel',
            border:0,
            title: 'Названия статусов',
            layout:'fit',
            itemId:'tab_iud_sn_def',
            items:[ // panel on tab 
int_iud_sn_def_
        ] // panel on tab  form or grid
      } // end tab
    ] // part tabs
    }] // tabpanel
    }); //Ext.Create
    if(RootPanel==true){
       iud_sn_.closable= true;
       iud_sn_.title= 'Названия статусов';
       iud_sn_.frame= true;
    }else{
       iud_sn_.closable= false;
       iud_sn_.title= '';
       iud_sn_.frame= false;
    }
   int_iud_sn_def_.instanceid=objectID;	
       store_iud_sn_def.load(  {params:{ instanceid:objectID} } );
    return iud_sn_;
}
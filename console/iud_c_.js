
Ext.require([
'Ext.form.*'
]);
  iud_c_= null;
function iud_c_Panel_(objectID, RootPanel, selection){ 


    var store_iud_ctype = Ext.create('Ext.data.Store', {
        model:'model_iud_ctype',
        autoLoad: false,
        autoSync: false,
        proxy: {
            type:   'ajax',
                url:   rootURL+'index.php/c_iud_ctype/getRows',
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
          DefineForms_iud_ctype_();
     var   int_iud_ctype_     =      DefineInterface_iud_ctype_('int_iud_ctype',store_iud_ctype);
     iud_c_= Ext.create('Ext.form.Panel', {
      id: 'iud_c',
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
            itemId:'tabs_iud_c',
            activeTab: 0,
            layout: 'fit',
            tabPosition:'top',
            border:0,
            items:[   // tabs
            { // begin part tab
            xtype:'panel',
            border:0,
            title: 'Тип курса',
            layout:'fit',
            itemId:'tab_iud_ctype',
            items:[ // panel on tab 
int_iud_ctype_
        ] // panel on tab  form or grid
      } // end tab
    ] // part tabs
    }] // tabpanel
    }); //Ext.Create
    if(RootPanel==true){
       iud_c_.closable= true;
       iud_c_.title= 'Тип курса';
       iud_c_.frame= true;
    }else{
       iud_c_.closable= false;
       iud_c_.title= '';
       iud_c_.frame= false;
    }
   int_iud_ctype_.instanceid=objectID;	
       store_iud_ctype.load(  {params:{ instanceid:objectID} } );
    return iud_c_;
}
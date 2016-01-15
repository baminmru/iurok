
Ext.require([
'Ext.form.*'
]);
  iud_mt_read= null;
function iud_mt_Panel_read(objectID, RootPanel, selection){ 


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
          DefineForms_iud_mt_def_read();
     var   int_iud_mt_def_read     =      DefineInterface_iud_mt_def_read('int_iud_mt_def',store_iud_mt_def);
     iud_mt_read= Ext.create('Ext.form.Panel', {
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
int_iud_mt_def_read
        ] // panel on tab  form or grid
      } // end tab
    ] // part tabs
    }] // tabpanel
    }); //Ext.Create
    if(RootPanel==true){
       iud_mt_read.closable= true;
       iud_mt_read.title= 'Тип сообщения';
       iud_mt_read.frame= true;
    }else{
       iud_mt_read.closable= false;
       iud_mt_read.title= '';
       iud_mt_read.frame= false;
    }
   int_iud_mt_def_read.instanceid=objectID;	
       store_iud_mt_def.load(  {params:{ instanceid:objectID} } );
    return iud_mt_read;
}
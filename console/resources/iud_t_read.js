
Ext.require([
'Ext.form.*'
]);
  iud_t_read= null;
function iud_t_Panel_read(objectID, RootPanel, selection){ 


    var store_iud_town = Ext.create('Ext.data.Store', {
        model:'model_iud_town',
        autoLoad: false,
        autoSync: false,
        proxy: {
            type:   'ajax',
                url:   rootURL+'index.php/c_iud_town/getRows',
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
          DefineForms_iud_town_read();
     var   int_iud_town_read     =      DefineInterface_iud_town_read('int_iud_town',store_iud_town);
     iud_t_read= Ext.create('Ext.form.Panel', {
      id: 'iud_t',
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
            itemId:'tabs_iud_t',
            activeTab: 0,
            layout: 'fit',
            tabPosition:'top',
            border:0,
            items:[   // tabs
            { // begin part tab
            xtype:'panel',
            border:0,
            title: 'Город',
            layout:'fit',
            itemId:'tab_iud_town',
            items:[ // panel on tab 
int_iud_town_read
        ] // panel on tab  form or grid
      } // end tab
    ] // part tabs
    }] // tabpanel
    }); //Ext.Create
    if(RootPanel==true){
       iud_t_read.closable= true;
       iud_t_read.title= 'Города';
       iud_t_read.frame= true;
    }else{
       iud_t_read.closable= false;
       iud_t_read.title= '';
       iud_t_read.frame= false;
    }
   int_iud_town_read.instanceid=objectID;	
       store_iud_town.load(  {params:{ instanceid:objectID} } );
    return iud_t_read;
}
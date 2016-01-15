
Ext.require([
'Ext.form.*'
]);
  iud_p_read= null;
function iud_p_Panel_read(objectID, RootPanel, selection){ 


    var store_iud_predmet = Ext.create('Ext.data.Store', {
        model:'model_iud_predmet',
        autoLoad: false,
        autoSync: false,
        proxy: {
            type:   'ajax',
                url:   rootURL+'index.php/c_iud_predmet/getRows',
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
          DefineForms_iud_predmet_read();
     var   int_iud_predmet_read     =      DefineInterface_iud_predmet_read('int_iud_predmet',store_iud_predmet);
     iud_p_read= Ext.create('Ext.form.Panel', {
      id: 'iud_p',
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
            itemId:'tabs_iud_p',
            activeTab: 0,
            layout: 'fit',
            tabPosition:'top',
            border:0,
            items:[   // tabs
            { // begin part tab
            xtype:'panel',
            border:0,
            title: 'Предмет',
            layout:'fit',
            itemId:'tab_iud_predmet',
            items:[ // panel on tab 
int_iud_predmet_read
        ] // panel on tab  form or grid
      } // end tab
    ] // part tabs
    }] // tabpanel
    }); //Ext.Create
    if(RootPanel==true){
       iud_p_read.closable= true;
       iud_p_read.title= 'Предметы';
       iud_p_read.frame= true;
    }else{
       iud_p_read.closable= false;
       iud_p_read.title= '';
       iud_p_read.frame= false;
    }
   int_iud_predmet_read.instanceid=objectID;	
       store_iud_predmet.load(  {params:{ instanceid:objectID} } );
    return iud_p_read;
}
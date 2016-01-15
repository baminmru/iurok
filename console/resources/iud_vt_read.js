
Ext.require([
'Ext.form.*'
]);
  iud_vt_read= null;
function iud_vt_Panel_read(objectID, RootPanel, selection){ 


    var store_iud_videotype = Ext.create('Ext.data.Store', {
        model:'model_iud_videotype',
        autoLoad: false,
        autoSync: false,
        proxy: {
            type:   'ajax',
                url:   rootURL+'index.php/c_iud_videotype/getRows',
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
          DefineForms_iud_videotype_read();
     var   int_iud_videotype_read     =      DefineInterface_iud_videotype_read('int_iud_videotype',store_iud_videotype);
     iud_vt_read= Ext.create('Ext.form.Panel', {
      id: 'iud_vt',
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
            itemId:'tabs_iud_vt',
            activeTab: 0,
            layout: 'fit',
            tabPosition:'top',
            border:0,
            items:[   // tabs
            { // begin part tab
            xtype:'panel',
            border:0,
            title: 'Тип видео',
            layout:'fit',
            itemId:'tab_iud_videotype',
            items:[ // panel on tab 
int_iud_videotype_read
        ] // panel on tab  form or grid
      } // end tab
    ] // part tabs
    }] // tabpanel
    }); //Ext.Create
    if(RootPanel==true){
       iud_vt_read.closable= true;
       iud_vt_read.title= 'Тип видео';
       iud_vt_read.frame= true;
    }else{
       iud_vt_read.closable= false;
       iud_vt_read.title= '';
       iud_vt_read.frame= false;
    }
   int_iud_videotype_read.instanceid=objectID;	
       store_iud_videotype.load(  {params:{ instanceid:objectID} } );
    return iud_vt_read;
}
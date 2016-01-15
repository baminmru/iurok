
Ext.require([
'Ext.form.*'
]);
  iud_adtype_read= null;
function iud_adtype_Panel_read(objectID, RootPanel, selection){ 


    var store_iud_adt_doc = Ext.create('Ext.data.Store', {
        model:'model_iud_adt_doc',
        autoLoad: false,
        autoSync: false,
        proxy: {
            type:   'ajax',
                url:   rootURL+'index.php/c_iud_adt_doc/getRows',
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
          DefineForms_iud_adt_doc_read();
     var   int_iud_adt_doc_read     =      DefineInterface_iud_adt_doc_read('int_iud_adt_doc',store_iud_adt_doc);
     iud_adtype_read= Ext.create('Ext.form.Panel', {
      id: 'iud_adtype',
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
            itemId:'tabs_iud_adtype',
            activeTab: 0,
            layout: 'fit',
            tabPosition:'top',
            border:0,
            items:[   // tabs
            { // begin part tab
            xtype:'panel',
            border:0,
            title: 'Тип документа к акту',
            layout:'fit',
            itemId:'tab_iud_adt_doc',
            items:[ // panel on tab 
int_iud_adt_doc_read
        ] // panel on tab  form or grid
      } // end tab
    ] // part tabs
    }] // tabpanel
    }); //Ext.Create
    if(RootPanel==true){
       iud_adtype_read.closable= true;
       iud_adtype_read.title= 'Тип документа к акту';
       iud_adtype_read.frame= true;
    }else{
       iud_adtype_read.closable= false;
       iud_adtype_read.title= '';
       iud_adtype_read.frame= false;
    }
   int_iud_adt_doc_read.instanceid=objectID;	
       store_iud_adt_doc.load(  {params:{ instanceid:objectID} } );
    return iud_adtype_read;
}

Ext.require([
'Ext.form.*'
]);
  iud_adtype_= null;
function iud_adtype_Panel_(objectID, RootPanel, selection){ 


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
          DefineForms_iud_adt_doc_();
     var   int_iud_adt_doc_     =      DefineInterface_iud_adt_doc_('int_iud_adt_doc',store_iud_adt_doc);
     iud_adtype_= Ext.create('Ext.form.Panel', {
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
int_iud_adt_doc_
        ] // panel on tab  form or grid
      } // end tab
    ] // part tabs
    }] // tabpanel
    }); //Ext.Create
    if(RootPanel==true){
       iud_adtype_.closable= true;
       iud_adtype_.title= 'Тип документа к акту';
       iud_adtype_.frame= true;
    }else{
       iud_adtype_.closable= false;
       iud_adtype_.title= '';
       iud_adtype_.frame= false;
    }
   int_iud_adt_doc_.instanceid=objectID;	
       store_iud_adt_doc.load(  {params:{ instanceid:objectID} } );
    return iud_adtype_;
}
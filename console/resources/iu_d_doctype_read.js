
Ext.require([
'Ext.form.*'
]);
  iu_d_doctype_read= null;
function iu_d_doctype_Panel_read(objectID, RootPanel, selection){ 


    var store_iud_doctype = Ext.create('Ext.data.Store', {
        model:'model_iud_doctype',
        autoLoad: false,
        autoSync: false,
        proxy: {
            type:   'ajax',
                url:   rootURL+'index.php/c_iud_doctype/getRows',
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
          DefineForms_iud_doctype_read();
     var   int_iud_doctype_read     =      DefineInterface_iud_doctype_read('int_iud_doctype',store_iud_doctype);
     iu_d_doctype_read= Ext.create('Ext.form.Panel', {
      id: 'iu_d_doctype',
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
            itemId:'tabs_iu_d_doctype',
            activeTab: 0,
            layout: 'fit',
            tabPosition:'top',
            border:0,
            items:[   // tabs
            { // begin part tab
            xtype:'panel',
            border:0,
            title: 'Тип документа',
            layout:'fit',
            itemId:'tab_iud_doctype',
            items:[ // panel on tab 
int_iud_doctype_read
        ] // panel on tab  form or grid
      } // end tab
    ] // part tabs
    }] // tabpanel
    }); //Ext.Create
    if(RootPanel==true){
       iu_d_doctype_read.closable= true;
       iu_d_doctype_read.title= 'Тип документа';
       iu_d_doctype_read.frame= true;
    }else{
       iu_d_doctype_read.closable= false;
       iu_d_doctype_read.title= '';
       iu_d_doctype_read.frame= false;
    }
   int_iud_doctype_read.instanceid=objectID;	
       store_iud_doctype.load(  {params:{ instanceid:objectID} } );
    return iu_d_doctype_read;
}
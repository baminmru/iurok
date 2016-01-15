
Ext.require([
'Ext.form.*'
]);
  iu_cls_edit= null;
function iu_cls_Panel_edit(objectID, RootPanel, selection){ 


    var store_iu_clsinfo = Ext.create('Ext.data.Store', {
        model:'model_iu_clsinfo',
        autoLoad: false,
        autoSync: false,
        proxy: {
            type:   'ajax',
                url:   rootURL+'index.php/c_iu_clsinfo/getRows',
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
          DefineForms_iu_clsinfo_edit();
     var   int_iu_clsinfo_edit     =      DefineInterface_iu_clsinfo_edit('int_iu_clsinfo',store_iu_clsinfo);
     iu_cls_edit= Ext.create('Ext.form.Panel', {
      id: 'iu_cls',
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
            itemId:'tabs_iu_cls',
            activeTab: 0,
            layout: 'fit',
            tabPosition:'top',
            border:0,
            items:[   // tabs
            { // begin part tab
            xtype:'panel',
            border:0,
            title: 'Класс',
            layout:'fit',
            itemId:'tab_iu_clsinfo',
            items:[ // panel on tab 
int_iu_clsinfo_edit
        ] // panel on tab  form or grid
      } // end tab
    ] // part tabs
    }] // tabpanel
    }); //Ext.Create
    if(RootPanel==true){
       iu_cls_edit.closable= true;
       iu_cls_edit.title= 'Классы';
       iu_cls_edit.frame= true;
    }else{
       iu_cls_edit.closable= false;
       iu_cls_edit.title= '';
       iu_cls_edit.frame= false;
    }
   int_iu_clsinfo_edit.instanceid=objectID;	
       store_iu_clsinfo.load(  {params:{ instanceid:objectID} } );
    return iu_cls_edit;
}
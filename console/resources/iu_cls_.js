
Ext.require([
'Ext.form.*'
]);
  iu_cls_= null;
function iu_cls_Panel_(objectID, RootPanel, selection){ 


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
          DefineForms_iu_clsinfo_();
     var   int_iu_clsinfo_     =      DefineInterface_iu_clsinfo_('int_iu_clsinfo',store_iu_clsinfo);
     iu_cls_= Ext.create('Ext.form.Panel', {
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
int_iu_clsinfo_
        ] // panel on tab  form or grid
      } // end tab
    ] // part tabs
    }] // tabpanel
    }); //Ext.Create
    if(RootPanel==true){
       iu_cls_.closable= true;
       iu_cls_.title= 'Классы';
       iu_cls_.frame= true;
    }else{
       iu_cls_.closable= false;
       iu_cls_.title= '';
       iu_cls_.frame= false;
    }
   int_iu_clsinfo_.instanceid=objectID;	
       store_iu_clsinfo.load(  {params:{ instanceid:objectID} } );
    return iu_cls_;
}
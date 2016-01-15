
Ext.require([
'Ext.form.*'
]);
  iu_reg_edit= null;
function iu_reg_Panel_edit(objectID, RootPanel, selection){ 


    var treestore_iu_regtree = Ext.create('Ext.data.TreeStore', {
        model:'model_iu_regtree',
        autoLoad: false,
        autoSync: false,
        //folderSort: true,
        nodeParam:  'treeid',
        defaultRootId:  '{00000000-0000-0000-0000-000000000000}',
        proxy: {
            type:   'ajax',
                url:   rootURL+'index.php/c_iu_regtree/getRows',
            reader: {
                type:   'json'
                },
            extraParams:{
                instanceid: objectID
            }
        }
    });

    var store_iu_regdocs = Ext.create('Ext.data.Store', {
        model:'model_iu_regdocs',
        autoLoad: false,
        autoSync: false,
        proxy: {
            type:   'ajax',
                url:   rootURL+'index.php/c_iu_regdocs/getRows',
            reader: {
                type:   'json'
                ,root:  'data'
                ,successProperty:  'success'
                ,messageProperty:  'msg'
            }
        }
    });
          DefineForms_iu_regtree_edit();
  var   int_iu_regtree_edit     = DefineInterface_iu_regtree_edit('int_iu_regtree', treestore_iu_regtree);
     iu_reg_edit= Ext.create('Ext.form.Panel', {
      id: 'iu_reg',
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
            itemId:'tabs_iu_reg',
            activeTab: 0,
            layout: 'fit',
            tabPosition:'top',
            border:0,
            items:[   // tabs
            { // begin part tab
            xtype:'panel',
            border:0,
            title: 'Структура документации',
            layout:'fit',
            itemId:'tab_iu_regtree',
            items:[ // panel on tab 
int_iu_regtree_edit
        ] // panel on tab  form or grid
      } // end tab
    ] // part tabs
    }] // tabpanel
    }); //Ext.Create
    if(RootPanel==true){
       iu_reg_edit.closable= true;
       iu_reg_edit.title= 'Регламентирующая документация';
       iu_reg_edit.frame= true;
    }else{
       iu_reg_edit.closable= false;
       iu_reg_edit.title= '';
       iu_reg_edit.frame= false;
    }
   int_iu_regtree_edit.instanceid=objectID;	
    return iu_reg_edit;
}
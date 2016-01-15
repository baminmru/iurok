
Ext.require([
'Ext.form.*'
]);
  iu_org_read= null;
function iu_org_Panel_read(objectID, RootPanel, selection){ 


    var treestore_iu_orgtree = Ext.create('Ext.data.TreeStore', {
        model:'model_iu_orgtree',
        autoLoad: false,
        autoSync: false,
        //folderSort: true,
        nodeParam:  'treeid',
        defaultRootId:  '{00000000-0000-0000-0000-000000000000}',
        proxy: {
            type:   'ajax',
                url:   rootURL+'index.php/c_iu_orgtree/getRows',
            reader: {
                type:   'json'
                },
            extraParams:{
                instanceid: objectID
            }
        }
    });

    var store_iu_orgusr = Ext.create('Ext.data.Store', {
        model:'model_iu_orgusr',
        autoLoad: false,
        autoSync: false,
        proxy: {
            type:   'ajax',
                url:   rootURL+'index.php/c_iu_orgusr/getRows',
            reader: {
                type:   'json'
                ,root:  'data'
                ,successProperty:  'success'
                ,messageProperty:  'msg'
            }
        }
    });
          DefineForms_iu_orgtree_read();
  var   int_iu_orgtree_read     = DefineInterface_iu_orgtree_read('int_iu_orgtree', treestore_iu_orgtree);
     iu_org_read= Ext.create('Ext.form.Panel', {
      id: 'iu_org',
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
            itemId:'tabs_iu_org',
            activeTab: 0,
            layout: 'fit',
            tabPosition:'top',
            border:0,
            items:[   // tabs
            { // begin part tab
            xtype:'panel',
            border:0,
            title: 'Орг структура',
            layout:'fit',
            itemId:'tab_iu_orgtree',
            items:[ // panel on tab 
int_iu_orgtree_read
        ] // panel on tab  form or grid
      } // end tab
    ] // part tabs
    }] // tabpanel
    }); //Ext.Create
    if(RootPanel==true){
       iu_org_read.closable= true;
       iu_org_read.title= 'Орг.структура';
       iu_org_read.frame= true;
    }else{
       iu_org_read.closable= false;
       iu_org_read.title= '';
       iu_org_read.frame= false;
    }
   int_iu_orgtree_read.instanceid=objectID;	
    return iu_org_read;
}
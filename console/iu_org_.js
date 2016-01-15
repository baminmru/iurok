
Ext.require([
'Ext.form.*'
]);
  iu_org_= null;
function iu_org_Panel_(objectID, RootPanel, selection){ 


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
          DefineForms_iu_orgtree_();
  var   int_iu_orgtree_     = DefineInterface_iu_orgtree_('int_iu_orgtree', treestore_iu_orgtree);
     iu_org_= Ext.create('Ext.form.Panel', {
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
int_iu_orgtree_
        ] // panel on tab  form or grid
      } // end tab
    ] // part tabs
    }] // tabpanel
    }); //Ext.Create
    if(RootPanel==true){
       iu_org_.closable= true;
       iu_org_.title= 'Орг.структура';
       iu_org_.frame= true;
    }else{
       iu_org_.closable= false;
       iu_org_.title= '';
       iu_org_.frame= false;
    }
   int_iu_orgtree_.instanceid=objectID;	
    return iu_org_;
}

Ext.require([
'Ext.form.*'
]);
  iu_subs_main= null;
function iu_subs_Panel_main(objectID, RootPanel, selection){ 

        // Prepare document for edit
        Ext.Ajax.request(
        	{
        		url:rootURL+'index.php/app/PrepareDocument',
        		method:'POST',
        		params:{
        			typename:'iu_subs',
        			documentid:objectID
        		}
        	}
        );

    var store_iu_subsribe = Ext.create('Ext.data.Store', {
        model:'model_iu_subsribe',
        autoLoad: false,
        autoSync: false,
        proxy: {
            type:   'ajax',
                url:   rootURL+'index.php/c_iu_subsribe/getRowsTemp',
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
          DefineForms_iu_subsribe_main();
     var   int_iu_subsribe_main     =      DefineInterface_iu_subsribe_main('int_iu_subsribe',store_iu_subsribe, selection);
     iu_subs_main= Ext.create('Ext.form.Panel', {
      id: 'iu_subs',
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
        		// Commit document changes
        			Ext.Ajax.request(
        				{
        					url:rootURL+'index.php/app/CommitDocument',
                            method:  'POST',
        					params:{
                                typename:  'iu_subs',
                                documentid: objectID
        					}
        					,
        					success: function(response){
        						var text = response.responseText;
        						//alert(text);
        						var res =Ext.decode(text);
        						if(res.success==false){
        							Ext.MessageBox.show({
        								title:  'Ошибка',
                                        msg:        res.msg,
                                        buttons : Ext.MessageBox.OK,
                                        Icon : Ext.MessageBox.ERROR()
        								});
        								p1_saved=false;
        						}else{
        							if(typeof(iu_subs_main.onButtonCancel) == 'function') iu_subs_main.onButtonCancel();
        						}
        					}
        				}
        			);
        		},
        		onButtonOk: function()
        		{
        			var me = this;
        	    int_iu_subsribe_main.doSave( me.onCommit);
        		},
        		onButtonCancel: function()
        		{
        			Ext.Ajax.request(
        				{
        					url:rootURL+'index.php/app/DropTempDocument',
                            method:         'POST',
        					params:{
                            typename:       'iu_subs',
                            documentid:     objectID
        					},
        					success: function(response){
        						var text = response.responseText;
        						//alert(text);
        						var res =Ext.decode(text);
        						if(res.success==false){
        							// ...
        						}
        					}
        				}
        			);
        		},
        canClose: function(){
        	return int_iu_subsribe_main.canClose();
        },
        items: [{
            xtype:'tabpanel',
            itemId:'tabs_iu_subs',
            activeTab: 0,
            layout: 'fit',
            tabPosition:'top',
            border:0,
            items:[   // tabs
            { // begin part tab
            xtype:'panel',
            border:0,
            title: 'Подписка на событие',
            layout:'fit',
            itemId:'tab_iu_subsribe',
            items:[ // panel on tab 
int_iu_subsribe_main
        ] // panel on tab  form or grid
      } // end tab
    ] // part tabs
    }] // tabpanel
    }); //Ext.Create
    if(RootPanel==true){
       iu_subs_main.closable= true;
       iu_subs_main.title= 'Подписка на события';
       iu_subs_main.frame= true;
    }else{
       iu_subs_main.closable= false;
       iu_subs_main.title= '';
       iu_subs_main.frame= false;
    }
   store_iu_subsribe.on('load', function() {
        if(store_iu_subsribe.count()==0){
            store_iu_subsribe.insert(0, new model_iu_subsribe());
        }
        record= store_iu_subsribe.getAt(0);
        record['instanceid']=objectID;
   int_iu_subsribe_main.setActiveRecord(record,objectID);	
   });
       store_iu_subsribe.load( {params:{ instanceid:objectID} }  );
    return iu_subs_main;
}
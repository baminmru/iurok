
Ext.require([
'Ext.form.*'
]);
  iu_subs_= null;
function iu_subs_Panel_(objectID, RootPanel, selection){ 

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
          DefineForms_iu_subsribe_();
     var   int_iu_subsribe_     =      DefineInterface_iu_subsribe_('int_iu_subsribe',store_iu_subsribe, selection);
     iu_subs_= Ext.create('Ext.form.Panel', {
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
        							if(typeof(iu_subs_.onButtonCancel) == 'function') iu_subs_.onButtonCancel();
        						}
        					}
        				}
        			);
        		},
        		onButtonOk: function()
        		{
        			var me = this;
        	    int_iu_subsribe_.doSave( me.onCommit);
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
        	return int_iu_subsribe_.canClose();
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
int_iu_subsribe_
        ] // panel on tab  form or grid
      } // end tab
    ] // part tabs
    }] // tabpanel
    }); //Ext.Create
    if(RootPanel==true){
       iu_subs_.closable= true;
       iu_subs_.title= 'Подписка на события';
       iu_subs_.frame= true;
    }else{
       iu_subs_.closable= false;
       iu_subs_.title= '';
       iu_subs_.frame= false;
    }
   store_iu_subsribe.on('load', function() {
        if(store_iu_subsribe.count()==0){
            store_iu_subsribe.insert(0, new model_iu_subsribe());
        }
        record= store_iu_subsribe.getAt(0);
        record['instanceid']=objectID;
   int_iu_subsribe_.setActiveRecord(record,objectID);	
   });
       store_iu_subsribe.load( {params:{ instanceid:objectID} }  );
    return iu_subs_;
}
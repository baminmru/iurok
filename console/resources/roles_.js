
Ext.require([
'Ext.form.*'
]);
  roles_= null;
function ROLES_Panel_(objectID, RootPanel, selection){ 

        // Prepare document for edit
        Ext.Ajax.request(
        	{
        		url:'index.php/app/PrepareDocument',
        		method:'POST',
        		params:{
        			typename:'roles',
        			documentid:objectID
        		}
        	}
        );

    var store_roles_def = Ext.create('Ext.data.Store', {
        model:'model_roles_def',
        autoLoad: false,
        autoSync: false,
        proxy: {
            type:   'ajax',
                url:   'index.php/c_roles_def/getRowsTemp',
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

    var store_roles2_module = Ext.create('Ext.data.Store', {
        model:'model_roles2_module',
        autoLoad: false,
        autoSync: false,
        proxy: {
            type:   'ajax',
                url:   'index.php/c_roles2_module/getRowsTemp',
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

    var store_roles2_modreport = Ext.create('Ext.data.Store', {
        model:'model_roles2_modreport',
        autoLoad: false,
        autoSync: false,
        proxy: {
            type:   'ajax',
                url:   'index.php/c_roles2_modreport/getRowsTemp',
            reader: {
                type:   'json'
                ,root:  'data'
                ,successProperty:  'success'
                ,messageProperty:  'msg'
            }
        }
    });
          DefineForms_roles_def_();
          DefineForms_roles2_module_();
     var   int_roles_def_     =      DefineInterface_roles_def_('int_roles_def',store_roles_def, selection);
     var   int_roles2_module_     =      DefineInterface_roles2_module_('int_roles2_module',store_roles2_module);
     roles_= Ext.create('Ext.form.Panel', {
      id: 'roles',
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
        					url:'index.php/app/CommitDocument',
                            method:  'POST',
        					params:{
                                typename:  'roles',
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
        							Ext.Ajax.request(
        								{
        									url:'index.php/app/DropTempDocument',
                                             method:     'POST',
        									params:{
                                            typename:   'roles',
                                            documentid: objectID
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
        						}
        					}
        				}
        			);
        		},
        		onButtonOk: function()
        		{
        			var me = this;
        	    int_roles_def_.doSave( me.onCommit);
        		},
        		onButtonCancel: function()
        		{
        			Ext.Ajax.request(
        				{
        					url:'index.php/app/DropTempDocument',
                            method:         'POST',
        					params:{
                            typename:       'roles',
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
        	return int_roles_def_.canClose();
        },
        items: [{
            xtype:'tabpanel',
            itemId:'tabs_roles',
            activeTab: 0,
            layout: 'fit',
            tabPosition:'top',
            border:0,
            items:[   // tabs
            { // begin part tab
            xtype:'panel',
            border:0,
            title: 'Определение роли',
            layout:'fit',
            itemId:'tab_roles_def',
            items:[ // panel on tab 
int_roles_def_
        ] // panel on tab  form or grid
      } // end tab
,
            { // begin part tab
            xtype:'panel',
            border:0,
            title: 'Модули',
            layout:'fit',
            itemId:'tab_roles2_module',
            items:[ // panel on tab 
int_roles2_module_
        ] // panel on tab  form or grid
      } // end tab
    ] // part tabs
    }] // tabpanel
    }); //Ext.Create
    if(RootPanel==true){
       roles_.closable= true;
       roles_.title= 'Роли';
       roles_.frame= true;
    }else{
       roles_.closable= false;
       roles_.title= '';
       roles_.frame= false;
    }
   store_roles_def.on('load', function() {
        if(store_roles_def.count()==0){
            store_roles_def.insert(0, new model_roles_def());
        }
        record= store_roles_def.getAt(0);
        record['instanceid']=objectID;
   int_roles_def_.setActiveRecord(record,objectID);	
   });
       store_roles_def.load( {params:{ instanceid:objectID} }  );
   int_roles2_module_.instanceid=objectID;	
       store_roles2_module.load(  {params:{ instanceid:objectID} } );
    return roles_;
}
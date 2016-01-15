
Ext.require([
'Ext.form.*'
]);
  iu_u_read= null;
function iu_u_Panel_read(objectID, RootPanel, selection){ 

        // Prepare document for edit
        Ext.Ajax.request(
        	{
        		url:rootURL+'index.php/app/PrepareDocument',
        		method:'POST',
        		params:{
        			typename:'iu_u',
        			documentid:objectID
        		}
        	}
        );

    var store_iu_u_def = Ext.create('Ext.data.Store', {
        model:'model_iu_u_def',
        autoLoad: false,
        autoSync: false,
        proxy: {
            type:   'ajax',
                url:   rootURL+'index.php/c_iu_u_def/getRowsTemp',
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
          DefineForms_iu_u_def_read();
     var   int_iu_u_def_read     =      DefineInterface_iu_u_def_read('int_iu_u_def',store_iu_u_def, selection);
     iu_u_read= Ext.create('Ext.form.Panel', {
      id: 'iu_u',
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
                                typename:  'iu_u',
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
        							if(typeof(iu_u_read.onButtonCancel) == 'function') iu_u_read.onButtonCancel();
        						}
        					}
        				}
        			);
        		},
        		onButtonOk: function()
        		{
        			var me = this;
        	    int_iu_u_def_read.doSave( me.onCommit);
        		},
        		onButtonCancel: function()
        		{
        			Ext.Ajax.request(
        				{
        					url:rootURL+'index.php/app/DropTempDocument',
                            method:         'POST',
        					params:{
                            typename:       'iu_u',
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
        	return int_iu_u_def_read.canClose();
        },
        items: [{
            xtype:'tabpanel',
            itemId:'tabs_iu_u',
            activeTab: 0,
            layout: 'fit',
            tabPosition:'top',
            border:0,
            items:[   // tabs
            { // begin part tab
            xtype:'panel',
            border:0,
            title: 'Данные сотрудника',
            layout:'fit',
            itemId:'tab_iu_u_def',
            items:[ // panel on tab 
int_iu_u_def_read
        ] // panel on tab  form or grid
      } // end tab
    ] // part tabs
    }] // tabpanel
    }); //Ext.Create
    if(RootPanel==true){
       iu_u_read.closable= true;
       iu_u_read.title= 'Сотрудник';
       iu_u_read.frame= true;
    }else{
       iu_u_read.closable= false;
       iu_u_read.title= '';
       iu_u_read.frame= false;
    }
   store_iu_u_def.on('load', function() {
        if(store_iu_u_def.count()==0){
            store_iu_u_def.insert(0, new model_iu_u_def());
        }
        record= store_iu_u_def.getAt(0);
        record['instanceid']=objectID;
   int_iu_u_def_read.setActiveRecord(record,objectID);	
   });
       store_iu_u_def.load( {params:{ instanceid:objectID} }  );
    return iu_u_read;
}
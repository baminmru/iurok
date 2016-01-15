var groupingFeature_autoiu_rcfg_def = Ext.create('Ext.grid.feature.Grouping',{
groupByText:  'Группировать по этому полю',
showGroupsText:  'Показать группировку'
});
var interval_autoiu_rcfg_def;

function PrepareRoles(){
			Ext.Ajax.request({
                url: rootURL+'index.php/app/getRoleModel',
                method:  'POST',
                params: { 
                },
                success: function(response){
					var text = response.responseText;
					var res =Ext.decode(text);
					
					// define dynamic model
					Ext.define('model_v_autoiu_rcfg_def',{
							extend:'Ext.data.Model',
						fields: res.data
					});
					
					store_v_autoiu_rcfg_def = Ext.create('Ext.data.Store', {
					model:'model_v_autoiu_rcfg_def',
					autoLoad: false,
					autoSync: false,
					remoteSort: false,
					remoteFilter:false,
					//pageSize : 30,
					proxy: {
						type:   'ajax',
							url:   rootURL+'index.php/app/getRoleData',
						reader: {
							type:   'json'
							,root:  'data'
							//,totalProperty: 'total'
							//,successProperty:  'success'
							//,messageProperty:  'msg'
						},
						listeners: {
							exception: function(proxy, response, operation){
								Ext.MessageBox.show({
									title: 'REMOTE EXCEPTION',
									msg:    operation.getError(),
									icon : Ext.MessageBox.ERROR,
									buttons : Ext.Msg.OK
								});
							}
						}
					}
					});
					
					 Ext.Ajax.request({
						url: rootURL+'index.php/app/getRoleColumns',
						method:  'POST',
						params: { 
						},
						 success: function(response){
							var text = response.responseText;
							var res =Ext.decode(text);
							DefineRolesJournal(res.data);
						}
						}
					);
				
                }
            });
}

function OnSaveRoles(){
		 if(CheckOperation('iu_rcfg.edit')!=0 ){
				store_v_autoiu_rcfg_def.each(
						function(record,idx){
							 if(record.dirty == true){
								onSaveOneRole(record);
						}
					}
				);
				store_v_autoiu_rcfg_def.load();
			
		}else{
				Ext.MessageBox.show({
				title:  'Контроль прав.',
				msg:    'Изменение ролей не разрешено!',
				buttons: Ext.MessageBox.OK,
			   icon:   Ext.MessageBox.WARNING
				});
		}
	
	
}	
	
function onSaveOneRole( active){
     
        if (!active) {
            return;
        }
		var i;
		for(i=0;i<active.fields.length;i++){	
			var fname=active.fields.getAt(i).name;
			if(fname!='rolename' && fname!='instanceid'){
				 Ext.Ajax.request({
						url: 'index.php/app/ProcessRole',
						method:  'POST',
						params: { 
							instanceid: active.get('instanceid'),
							// rolename:active.get('rolename'),
							name:fname,
							value:active.get(fname)
						}
						, success: function(response){
						var text = response.responseText;
						var res =Ext.decode(text);
						}
					}
				);
			}
		}
};


function DefineRolesJournal(RoleColumns){






	 var cellEditing = Ext.create('Ext.grid.plugin.CellEditing', {
        clicksToEdit: 1
    });

	Ext.define('grid_autoiu_rcfg_def', {
    extend:  'Ext.grid.Panel',
    alias: 'widget.g_v_autoiu_rcfg_def',
    requires: [
        'Ext.grid.*',
        'Ext.form.field.Text',
        'Ext.toolbar.TextItem'
    ],
    initComponent: function(){
        Ext.apply(this, {
        frame: false,
        store: store_v_autoiu_rcfg_def,
        //features: [groupingFeature_autoiu_rcfg_def],
		plugins: [cellEditing],
		//enableLocking:true,
		selType: 'cellmodel',
        //defaultDockWeights : { top: 7, bottom: 5, left: 1, right: 3 },
       // viewConfig: {  enableTextSelection: true  },
        dockedItems: [{
                xtype:  'toolbar',
                     items: [{
                    iconCls:  'icon-application_form_add',
                    text:   'Создать',
                    scope:  this,
                    handler : this.onAddClick
                    }, {
                    iconCls:  'icon-application_form_edit',
                    text:   'Изменить',
                    itemId:  'edit',
                    disabled: true,
                    scope:  this,
                    handler : this.onEditClick
                    }, {
                    iconCls:  'icon-application_form_delete',
                    text:   'Удалить',
                    disabled: true,
                    itemId:  'delete',
                    scope:  this,
                    handler : this.onDeleteClick
                    }, {
                    iconCls:  'icon-table_refresh',
                    text:   'Обновить',
                    itemId:  'bRefresh',
                    scope:  this,
                    handler : this.onRefreshClick
                   } ,/* {
                    iconCls:  'icon-page_excel',
                    text:   'Экспорт',
                    itemId:  'bExport',
                    scope:  this,
                    handler: this.onExportClick
				},*/
					{
						itemId:  'bSaveAll',
						text: 'Сохранить изменения',
						iconCls:'icon-database_save',
						handler : OnSaveRoles
					}
				
				]
            }],
        columns: RoleColumns
        }
        );
        this.callParent();
        this.getSelectionModel().on('selectionchange', this.onSelectChange, this);
        this.store.load()
       },
        onSelectChange: function(selModel, selections){
        this.down('#delete').setDisabled(selections.length === 0);
        this.down('#edit').setDisabled(selections.length === 0);
    },
    listeners: {
        itemdblclick: function() { 
    	    this.onEditClick();
        }
        ,
        	added:function(){
        			//interval_autoiu_rcfg_def= setInterval(function() {  
        			//	store_v_autoiu_rcfg_def.load();
        			//}, 60000);
        		}
        	,
        	destroy:function(){
        		//clearInterval(interval_autoiu_rcfg_def);
        }
    },
    onDeleteConfirm:function(selection){
      if (selection) {
        Ext.Ajax.request({
            url:    rootURL+'index.php/c_v_autoiu_rcfg_def/deleteRow',
            method:  'POST',
    		params: { 
    				instanceid: selection.get('instanceid')
    				}
    	});
    	this.store.remove(selection);
      }
    },
    onDeleteClick: function(){
      var selection = this.getView().getSelectionModel().getSelection()[0];
      if (selection) {
   	    if(CheckOperation('iu_rcfg.edit')!=0 && OTAllowDelete('iu_rcfg')){
        Ext.Msg.show({
            title:  'Удалить?',
            msg:    'Удалить строку из базы данных?',
        	buttons: Ext.Msg.YESNO,
        	icon:   Ext.MessageBox.QUESTION,
        	fn: function(btn,text,opt){
        		if(btn=='yes'){
        			opt.caller.onDeleteConfirm(opt.selectedRow);
        	    }
        	},
            caller: this,
            selectedRow: selection
        });
        }else{
        		Ext.MessageBox.show({
                title:  'Контроль прав.',
                msg:    'Удаление объектов не разрешено!',
                buttons: Ext.MessageBox.OK,
               icon:   Ext.MessageBox.WARNING
        		});
        }
      }
    },
    onAddClick: function(){
   	    if(CheckOperation('iu_rcfg.edit')!=0 && OTAllowAdd('iu_rcfg')){
            Ext.Ajax.request({
                url: rootURL+'index.php/c_v_autoiu_rcfg_def/newRow',
                method:  'POST',
                params: { 
                },
                success: function(response){
                var text = response.responseText;
                var res =Ext.decode(text);
                var edit = Ext.create('iu.windowObjects');
                edit.prefix='c_v_autoiu_rcfg_def';
                edit.setTitle('Создание документа:Настройка роли') ;
                var p=eval('iu_rcfg_Panel_'+OTAddMode('iu_rcfg')+'( res.data, false,null )') ;
                edit.add(p);
                edit.show();
                }
            });
            this.store.load();
        }else{
        		Ext.MessageBox.show({
                title:  'Контроль прав.',
                msg:    'Создание объектов не разрешено!',
                buttons: Ext.MessageBox.OK,
               icon:   Ext.MessageBox.WARNING
        		});
        }
    },
    onEditClick: function(){
        var selection = this.getView().getSelectionModel().getSelection()[0];
        if (selection) {
   	    if(CheckOperation('iu_rcfg.edit')!=0 ){
                var edit = Ext.create('iu.windowObjects');
                edit.prefix='c_v_autoiu_rcfg_def';
                edit.setTitle('Редактирование документа: Настройка роли') ;
            var p=eval('iu_rcfg_Panel_'+OTEditMode('iu_rcfg')+'( selection.get(\'instanceid\'), false, selection )') ;
            edit.add(p);
            edit.show();
        }else{
        		Ext.MessageBox.show({
                title:  'Контроль прав.',
                msg:    'Изменение объектов не разрешено!',
                buttons: Ext.MessageBox.OK,
               icon:   Ext.MessageBox.WARNING
        		});
        }
        }
    },
    onRefreshClick: function(){
             this.store.load();
    }
    ,
     onExportClick: function(){ 
         	var config= {title:this.title, columns:this.columns };
    	var workbook = new Workbook(config);
    workbook.addWorksheet(this.store, config );
    var x= workbook.render();
    window.open( 'data:application/vnd.ms-excel;base64,' + Base64.encode(x),'_blank');
     }
    }
    );
}
Ext.require([
'Ext.form.*'
]);
function iu_rcfg_Jrnl(){ 

  var iu_rcfg= Ext.create('Ext.form.Panel', {
       closable: true,
       id:     'iu_rcfg_jrnl',
       title: 'Настройка роли',
      layout: 'fit',
      flex: 1,
      fieldDefaults: {
         labelAlign:             'top',
          msgTarget:             'side'
        },
        defaults: {
        anchor:'100%'
        },

        items: [{
            itemId:'gr_autoiu_rcfg_def',
            xtype:'g_v_autoiu_rcfg_def',
           // stateful: stateFulSystem,
           // stateId:'j_v_autoiu_rcfg_def2',
            layout: 'fit',
            flex: 1,
            store: store_v_autoiu_rcfg_def
    }] // tabpanel
    }); //Ext.Create
    return iu_rcfg;
}
Ext.define('ObjectWindow_iu_rcfg', {
    extend:  'Ext.window.Window',
    maxHeight: 620,
    minHeight: 620,
    minWidth: 800,
    maxWidth: 1024,
    constrainHeader :true,
    layout:  'fit',
    autoShow: true,
    closeAction: 'destroy',
    modal: true,
    iconCls:  'icon-folder_user',
    title:  'Настройка роли',
    items:[ ]
	});

Ext.require([
'Ext.form.*'
]);

function DefineInterface_rptstruct_(id,treestore_rptstruct){

var groupingFeature_rptfields = Ext.create('Ext.grid.feature.Grouping',{
groupByText:  'Группировать по этому полю',
showGroupsText:  'Показать группировку'
});
var grid_rptfields;
    function ChildOnDeleteConfirm(selection){
      if (selection) {
        Ext.Ajax.request({
            url:    'index.php/c_rptfields/deleteRow',
            method:  'POST',
    		params: { 
    				rptfieldsid: selection.get('rptfieldsid')
    				}
    	});
    	grid_rptfields.store.remove(selection);
      }
    };
     function ChildOnDeleteClick(){
      var selection = grid_rptfields.getView().getSelectionModel().getSelection()[0];
      if (selection) {
   	  if(CheckOperation('MTZRprt.edit')!=0){
        Ext.Msg.show({
            title:  'Удалить?',
            msg:    'Удалить строку из базы данных?',
        	buttons: Ext.Msg.YESNO,
            icon:   Ext.window.MessageBox.QUESTION,
        	fn: function(btn,text,opt){
        		if(btn=='yes'){
        			ChildOnDeleteConfirm(opt.selectedRow);
        	    }
        	},
            caller: grid_rptfields,
            selectedRow: selection
        });
        }else{
        		Ext.MessageBox.show({
                title:  'Контроль прав.',
                msg:    'Удаление строк не разрешено!',
                buttons: Ext.MessageBox.OK,
               icon:   Ext.MessageBox.WARNING
        		});
        }
      }
    };
    function ChildOnAddClick(){
   	if(CheckOperation('MTZRprt.edit')!=0){
                var edit = Ext.create('EditWindow_rptfields');
                grid_rptfields.store.insert(0, new model_rptfields());
                record= grid_rptfields.store.getAt(0);
                record.set('parentid',grid_rptfields.parentid);
                edit.getComponent(0).setActiveRecord(record,grid_rptfields.instanceid,grid_rptfields.parentid);
                edit.show();
        }else{
        		Ext.MessageBox.show({
                title:  'Контроль прав.',
                msg:    'Создание строк не разрешено!',
                buttons: Ext.MessageBox.OK,
               icon:   Ext.MessageBox.WARNING
        		});
        }
    };
     function ChildOnRefreshClick(){
            grid_rptfields.store.load({params:{parentid: grid_rptfields.parentid}});
    };
    function ChildOnEditClick(){
        var selection = grid_rptfields.getView().getSelectionModel().getSelection()[0];
        if (selection) {
   	     if(CheckOperation('MTZRprt.edit')!=0){
            var edit = Ext.create('EditWindow_rptfields');
            edit.getComponent(0).setActiveRecord(selection,grid_rptfields.instanceid,grid_rptfields.parentid);
            edit.show();
        }else{
        		Ext.MessageBox.show({
                title:  'Контроль прав.',
                msg:    'Изменение строк не разрешено!',
                buttons: Ext.MessageBox.OK,
               icon:   Ext.MessageBox.WARNING
        		});
        }
        }
    };
   grid_rptfields=
    new Ext.grid.Panel({
        itemId:  'grd_rptfields',
        maxHeight: 350,
        minHeight: 250,
        iconCls:  'icon-grid',
        frame: true,
        parentid: '',
        title: 'Поля секции',
        scroll:'both',
        store: {
        model:'model_rptfields',
        autoLoad: false,
        autoSync: false,
        proxy: {
            type:   'ajax',
                url:   'index.php/c_rptfields/getRows',
            reader: {
                type:   'json'
                ,root:  'data'
                ,successProperty:  'success'
                ,messageProperty:  'msg'
            },
            listeners: {
                exception: function(proxy, response, operation){
                }
            }
        }
    },
        features: [groupingFeature_rptfields],
          dockedItems: [{
                xtype:  'toolbar',
                items: [
                {
                    iconCls:  'icon-application_form_add',
                    text:   'Создать',
                    scope:  this,
                    handler : ChildOnAddClick
                    }, {
                    iconCls:  'icon-application_form_edit',
                    text:   'Изменить',
                    scope:  this,
                    disabled: true,
                    itemId:  'edit',
                    handler : ChildOnEditClick
                    }, {
                    iconCls:  'icon-application_form_delete',
                    text:   'Удалить',
                    disabled: true,
                    itemId:  'delete',
                    scope:  this,
                    handler : ChildOnDeleteClick
                    }, {
                    iconCls:  'icon-table_refresh',
                    text:   'Обновить',
                    itemId:  'bRefresh',
                    scope:  this,
                    handler : ChildOnRefreshClick
                }]
            }],
        columns: [
{text: "Название", width: 120, dataIndex: 'name', sortable: true}
            ,
{text: "Тип поля", width: 200, dataIndex: 'fieldtype_grid', sortable: true}
            ,
{text: "Размер", width:60, dataIndex: 'fieldsize', sortable: true}
            ,
{text: "Заголовок", width: 120, dataIndex: 'caption', sortable: true}
        ],
    listeners: {
        itemdblclick: function() { 
    	    ChildOnEditClick();
        },
          itemclick: function(view , record){
         grid_rptfields.down('#delete').setDisabled(false);
          grid_rptfields.down('#edit').setDisabled(false);
    },
    select: function( selmodel, record,  index,  eOpts ){
        grid_rptfields.down('#delete').setDisabled(false);
        grid_rptfields.down('#edit').setDisabled(false);
    }, 
    selectionchange: function(selModel, selections){
    	 grid_rptfields.down('#delete').setDisabled(selections.length === 0);
    	 grid_rptfields.down('#edit').setDisabled(selections.length === 0);
    }
    }
    }
    );
var p1;
    function onDeleteConfirm (selection){
      if (selection) {
        Ext.Ajax.request({
            url:    'index.php/c_rptstruct/deleteRow',
            method:  'POST',
    		params: { 
    				rptstructid: selection.get('rptstructid')
    				}
    	});
    	onRefreshClick();
      }
    };
    function onDeleteClick(){
      var selection = p1.getView().getSelectionModel().getSelection()[0];
      if (selection) {
   	    if(CheckOperation('MTZRprt.edit')!=0){
        Ext.Msg.show({
            title:  'Удалить?',
            msg:    'Удалить строку из базы данных?',
        	buttons: Ext.Msg.YESNO,
            icon:   Ext.window.MessageBox.QUESTION,
        	fn: function(btn,text,opt){
        		if(btn=='yes'){
        			onDeleteConfirm(opt.selectedRow);
        	    }
        	},
            caller: this,
            selectedRow: selection
        });
        }else{
        		Ext.MessageBox.show({
                title:  'Контроль прав.',
                msg:    'Удаление строк не разрешено!',
                buttons: Ext.MessageBox.OK,
               icon:   Ext.MessageBox.WARNING
        		});
        }
      }
    };
     function onAddRootClick(){
   	if(CheckOperation('MTZRprt.edit')!=0){
                var edit = Ext.create('EditWindow_rptstruct');
                p1.lasttreeid='{00000000-0000-0000-0000-000000000000}';
                record=new model_rptstruct();
                record.set('instanceid',p1.instanceid);
                record.set('parentrowid',p1.lasttreeid);
                p1.store.getRootNode().insertChild(0, record);
                edit.getComponent(0).setActiveRecord(p1,record,p1.instanceid);
                edit.show();
        }else{
        		Ext.MessageBox.show({
                title:  'Контроль прав.',
                msg:    'Создание строк не разрешено!',
                buttons: Ext.MessageBox.OK,
               icon:   Ext.MessageBox.WARNING
        		});
        }
    };
    function onAddClick(){
   	if(CheckOperation('MTZRprt.edit')!=0){
               var selection = p1.getView().getSelectionModel().getSelection()[0];
               if (selection) {
                    p1.lasttreeid=selection.get('rptstructid');
                    record=new model_rptstruct();
                    record.set('instanceid',p1.instanceid);
                    record.set('parentrowid',p1.lasttreeid);
                    p1.store.getNodeById(p1.lasttreeid).insertChild(0, record);
               }else{
                    p1.lasttreeid='{00000000-0000-0000-0000-000000000000}';
                    record=new model_rptstruct();
                    record.set('instanceid',p1.instanceid);
                    record.set('parentrowid',p1.lasttreeid);
                    p1.store.getRootNode().insertChild(0, record);
               }
                var edit = Ext.create('EditWindow_rptstruct');
                record.set('instanceid',p1.instanceid);
                record.set('parentrowid',p1.lasttreeid);
                edit.getComponent(0).setActiveRecord(p1,record,p1.instanceid);
                edit.show();
        }else{
        		Ext.MessageBox.show({
                title:  'Контроль прав.',
                msg:    'Создание строк не разрешено!',
                buttons: Ext.MessageBox.OK,
               icon:   Ext.MessageBox.WARNING
        		});
        }
    };
    function onRefreshClick(){
            p1.store.load({params:{instanceid: p1.instanceid}});
    };
    function onEditClick(){
        var selection = p1.getView().getSelectionModel().getSelection()[0];
        if (selection) {
   	if(CheckOperation('MTZRprt.edit')!=0){
            var edit = Ext.create('EditWindow_rptstruct');
            edit.getComponent(0).setActiveRecord(p1,selection,selection.get('instanceid'));
            edit.show();
        }else{
        		Ext.MessageBox.show({
                title:  'Контроль прав.',
                msg:    'Изменение строк не разрешено!',
                buttons: Ext.MessageBox.OK,
               icon:   Ext.MessageBox.WARNING
        		});
        }
        }
    };
p1=    new Ext.tree.Panel({
        itemId:id,
        flex: 1,
        layout:'fit',
        iconCls:  'icon-grid',
        frame: true,
        instanceid: '{00000000-0000-0000-0000-000000000000}',
        lasttreeid: '{00000000-0000-0000-0000-000000000000}',
        rootVisible:false,
        store: treestore_rptstruct,
          dockedItems: [{
                xtype:  'toolbar',
                items: [
                {
                    iconCls:  'icon-application_form_add',
                    text:   'Создать в корне',
                    scope:  this,
                    handler : onAddRootClick
                    }, 
                {
                    iconCls:  'icon-application_form_add',
                    text:   'Создать',
                    scope:  this,
                    handler : onAddClick
                    }, {
                    iconCls:  'icon-application_form_edit',
                    text:   'Изменить',
                    scope:  this,
                    disabled: true,
                    itemId:  'edit',
                    handler : onEditClick
                    }, {
                    iconCls:  'icon-application_form_delete',
                    text:   'Удалить',
                    disabled: true,
                    itemId:  'delete',
                    scope:  this,
                    handler : onDeleteClick
                    }, {
                    iconCls:  'icon-table_refresh',
                    text:   'Обновить',
                    itemId:  'bRefresh',
                    scope:  this,
                    handler : onRefreshClick
                }]
            }],
        columns: [
{xtype: 'treecolumn',text: "Название", width: 120, dataIndex: 'name', sortable: true}
            ,
{text: "Заголовок", width: 120, dataIndex: 'caption', sortable: true}
        ]
,
	bbar:grid_rptfields 
       ,
        listeners: {
        itemdblclick: function() { 
    	    onEditClick();
        }
        ,itemclick: function(view,record) { 
           p1.down('#delete').setDisabled(false);
           p1.down('#edit').setDisabled(false);
           grid_rptfields.instanceid=p1.instanceid;
           grid_rptfields.parentid=record.get('id');
           grid_rptfields.store.load({params:{ parentid:record.get('id')} })
        },
        select: function(view,record) { 
           p1.down('#delete').setDisabled(false);
           p1.down('#edit').setDisabled(false);
           grid_rptfields.instanceid=p1.instanceid;
           grid_rptfields.parentid=record.get('id');
           grid_rptfields.store.load({params:{ parentid:record.get('id')} })
        },
        selectionchange: function(selModel, selections){
        p1.down('#delete').setDisabled(selections.length === 0);
        p1.down('#edit').setDisabled(selections.length === 0);
        var selection = selections[0];
        if (selection) {
           grid_rptfields.instanceid=p1.instanceid;
           grid_rptfields.parentid=selection.get('id');
           grid_rptfields.store.load({params:{ parentid:selection.get('id')} })
        }
       }
      }
    }
    );
return p1;
};
function DefineForms_rptstruct_(){


Ext.define('Form_rptstruct', {
extend:  'Ext.form.Panel',
alias: 'widget.f_rptstruct',
initComponent: function(){
    this.addEvents('create');
    Ext.apply(this,{
        activeRecord: null,
        defaultType:  'textfield',
        x: 0, 
        fieldDefaults: {
         labelAlign:  'top' //,
        },
        items: [
        { 
        xtype:'fieldset', 
        id:'rptstruct-0',
        layout:'absolute', 
        border:false, 
        items: [
{
        minWidth: 470,
        width: 470,
        maxWidth: 470,
        x: 5, 
        y: 0, 

xtype:  'textfield',
value:  '',
name:   'name',
itemId:   'name',
fieldLabel:  'Название',
labelClsExtra:'x-item-mandatory',
allowBlank:false
       ,labelWidth: 120
}
,
{
        minWidth: 470,
        width: 470,
        maxWidth: 470,
        x: 5, 
        y: 46, 

xtype:  'textfield',
value:  '',
name:   'caption',
itemId:   'caption',
fieldLabel:  'Заголовок',
allowBlank:true
       ,labelWidth: 120
}
       ], width: 510,
       height: 132 
        }
          ],//items = part panel
        instanceid:'',
        dockedItems: [{
            xtype:  'toolbar',
            dock:   'bottom',
            ui:     'footer',
                items: ['->', {
                    iconCls:  'icon-accept',
                    itemId:  'save',
                    text:   'Сохранить',
                    disabled: true,
                    scope:  this,
                    handler : this.onSave
                }
               , {
                    iconCls:  'icon-cancel',
                    text:   'Закрыть',
                    scope:  this,
                    handler : this.onReset
                }
              ]
            }] // dockedItems
        }); //Ext.apply
        this.callParent();
    }, //initComponent 
    setActiveRecord: function(tree,record,instid){
    this.tree=tree;
        this.activeRecord = record;
        this.instanceid = instid;
        if (record) {
            this.down('#save').enable();
            this.getForm().loadRecord(record);
        } else {
            this.down('#save').disable();
            this.getForm().reset();
        }
    },
    onSave: function(){
        var active = this.activeRecord,
            form = this.getForm();
        if (!active) {
            return;
        }
        if (form.isValid()) {
            form.updateRecord(active);
            // combobox patch
            var form_values = form.getValues(); var field_name = '';  for(field_name in form_values){active.set(field_name, form_values[field_name]);}
            Ext.Ajax.request({
                url: 'index.php/c_rptstruct/setRow',
                method:  'POST',
                params: { 
                    instanceid: this.instanceid
                    ,rptstructid: active.get('rptstructid')
                    ,treeid: active.get('parentrowid')
                    ,name: active.get('name') 
                    ,caption: active.get('caption') 
                }
                , success: function(response){
                var text = response.responseText;
                var res =Ext.decode(text);
	            if(res.success==false){
	       	        Ext.MessageBox.show({
	       		        title:  'Ошибка',
	       		        msg:    res.msg,
	       		        buttons: Ext.MessageBox.OK,
	       		        icon:   Ext.MessageBox.ERROR
	       	            });
	            }else{
                    if(active.get('rptstructid')==''){
               			active.set('id',res.data['rptstructid']);
               			active.set('rptstructid',res.data['rptstructid']);
                    }
        		    Ext.MessageBox.show({
                        title:  'Подтверждение',
                        msg:    'Изменения сохранены',
                        buttons: Ext.MessageBox.OK,
                        icon:   Ext.MessageBox.INFO
        		    });
                form.owner.ownerCt.close();
                }
              }
            });
        }else{
        		Ext.MessageBox.show({
                title:  'Ошибка',
                msg:    'Не все обязательные поля заполнены!',
                buttons: Ext.MessageBox.OK,
                icon:   Ext.MessageBox.ERROR
        		});
        }
    },
    onReset: function(){
        if(this.activeRecord.get('rptstructid')==''){
        	ts =this.activeRecord.store.treeStore;
        	ts.getRootNode().removeAll();
        	ts.load();
        }
        this.setActiveRecord(null,null,null);
        this.ownerCt.close();
    }
}); // 'Ext.Define

Ext.define('EditWindow_rptstruct', {
    extend:  'Ext.window.Window',
    maxHeight: 237,
    maxWidth: 540,
    minHeight:192,
    minWidth: 540,
    width: 540,
    constrainHeader :true,
    layout:  'absolute',
    autoShow: true,
    modal: true,
    closable: false,
    closeAction: 'destroy',
    iconCls:  'icon-application_form',
    title:  'Секции',
    items:[{
        xtype:  'f_rptstruct'
	}]
	});

Ext.define('Form_rptfields', {
extend:  'Ext.form.Panel',
alias: 'widget.f_rptfields',
initComponent: function(){
    this.addEvents('create');
    Ext.apply(this,{
        activeRecord: null,
        defaultType:  'textfield',
        x: 0, 
        fieldDefaults: {
         labelAlign:  'top' //,
        },
        items: [
        { 
        xtype:'fieldset', 
        id:'rptfields-0',
        layout:'absolute', 
        border:false, 
        items: [
{
        minWidth: 470,
        width: 470,
        maxWidth: 470,
        x: 5, 
        y: 0, 

xtype:  'textfield',
value:  '',
name:   'name',
itemId:   'name',
fieldLabel:  'Название',
labelClsExtra:'x-item-mandatory',
allowBlank:false
       ,labelWidth: 120
}
,
{
        minWidth: 470,
        width: 470,
        maxWidth: 470,
        x: 5, 
        y: 46, 

editable: false,
listeners:{  select: function ( combo, records, eOpts ) {combo.up('form' ).activeRecord.set('fieldtype', records[0].get('id'));}  },
xtype:  'combobox',
store: cmbstore_fieldtype,
valueField:     'brief',
displayField:   'brief',
typeAhead: true,
emptyText:      '',
name:   'fieldtype_grid',
itemId:   'fieldtype_grid',
fieldLabel:  'Тип поля',
labelClsExtra:'x-item-mandatory',
allowBlank:false
       ,labelWidth: 120
}
,
{
        minWidth: 470,
        width: 470,
        maxWidth: 470,
        x: 5, 
        y: 92, 

xtype:  'numberfield',
value:  '0',
name:   'fieldsize',
itemId:   'fieldsize',
fieldLabel:  'Размер',
allowBlank:true
       ,labelWidth: 120
}
,
{
        minWidth: 470,
        width: 470,
        maxWidth: 470,
        x: 5, 
        y: 138, 

xtype:  'textfield',
value:  '',
name:   'caption',
itemId:   'caption',
fieldLabel:  'Заголовок',
allowBlank:true
       ,labelWidth: 120
}
       ], width: 510,
       height: 224 
        }
          ],//items = part panel
        instanceid:'',
        dockedItems: [{
            xtype:  'toolbar',
            dock:   'bottom',
            ui:     'footer',
                items: ['->', {
                    iconCls:  'icon-accept',
                    itemId:  'save',
                    text:   'Сохранить',
                    disabled: true,
                    scope:  this,
                    handler : this.onSave
                }
               , {
                    iconCls:  'icon-cancel',
                    text:   'Закрыть',
                    scope:  this,
                    handler : this.onReset
                }
              ]
            }] // dockedItems
        }); //Ext.apply
        this.callParent();
    }, //initComponent 
    setActiveRecord: function(record,instid,parentid){
        this.activeRecord = record;
        this.instanceid = instid;
        this.parentid = parentid;
        if (record) {
            this.down('#save').enable();
            this.getForm().loadRecord(record);
        } else {
            this.down('#save').disable();
            this.getForm().reset();
        }
    },
    onSave: function(){
        var active = this.activeRecord,
            form = this.getForm();
        if (!active) {
            return;
        }
        if (form.isValid()) {
            form.updateRecord(active);
            // combobox patch
            var form_values = form.getValues(); var field_name = '';  for(field_name in form_values){active.set(field_name, form_values[field_name]);}
            Ext.Ajax.request({
                url: 'index.php/c_rptfields/setRow',
                method:  'POST',
                params: { 
                    instanceid: this.instanceid,
                    parentid: this.parentid
                    ,rptfieldsid: active.get('rptfieldsid')
                    ,name: active.get('name') 
                    ,fieldtype: active.get('fieldtype') 
                    ,fieldsize: active.get('fieldsize') 
                    ,caption: active.get('caption') 
                }
                , success: function(response){
                var text = response.responseText;
                var res =Ext.decode(text);
	            if(res.success==false){
	       	        Ext.MessageBox.show({
	       		        title:  'Ошибка',
	       		        msg:    res.msg,
	       		        buttons: Ext.MessageBox.OK,
	       		        icon:   Ext.MessageBox.ERROR
	       	            });
	            }else{
                    if(active.get('rptfieldsid')==''){
               			active.set('rptfieldsid',res.data['rptfieldsid']);
                    }
        		    Ext.MessageBox.show({
                        title:  'Подтверждение',
                        msg:    'Изменения сохранены',
                        buttons: Ext.MessageBox.OK,
                        icon:   Ext.MessageBox.INFO
        		    });
                form.owner.ownerCt.close();
                }
              }
            });
        }else{
        		Ext.MessageBox.show({
                title:  'Ошибка',
                msg:    'Не все обязательные поля заполнены!',
                buttons: Ext.MessageBox.OK,
                icon:   Ext.MessageBox.ERROR
        		});
        }
    },
    onReset: function(){
        if(this.activeRecord.get('rptfieldsid')==''){
                this.activeRecord.store.reload();
        }
        this.setActiveRecord(null,null);
        this.ownerCt.close();
    }
}); // 'Ext.Define

Ext.define('EditWindow_rptfields', {
    extend:  'Ext.window.Window',
    maxHeight: 329,
    maxWidth: 540,
    minHeight:284,
    minWidth: 540,
    width: 540,
    constrainHeader :true,
    layout:  'absolute',
    autoShow: true,
    modal: true,
    closable: false,
    closeAction: 'destroy',
    iconCls:  'icon-application_form',
    title:  'Поля секции',
    items:[{
        xtype:  'f_rptfields'
	}]
	});
}
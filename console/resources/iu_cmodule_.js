
Ext.require([
'Ext.form.*'
]);

function DefineInterface_iu_cmodule_(id,mystore){

var groupingFeature_iu_cmodule = Ext.create('Ext.grid.feature.Grouping',{
groupByText:  'Группировать по этому полю',
showGroupsText:  'Показать группировку'
});
var filterFeature_iu_cmodule = {
menuFilterText:  'Фильтр',
ftype: 'filters',
local: true 
};
 var p1;
    function onDeleteConfirm(selection){
      if (selection) {
        Ext.Ajax.request({
            url:    'index.php/c_iu_cmodule/deleteRow',
            method:  'POST',
    		params: { 
    				iu_cmoduleid: selection.get('iu_cmoduleid')
    				}
    	});
    	p1.store.remove(selection);
      }
    };
    function onDeleteClick(){
      var selection = p1.getView().getSelectionModel().getSelection()[0];
      if (selection) {
   	  if(CheckOperation('iu_d_urole.edit')!=0){
        Ext.Msg.show({
            title:  'Удалить?',
            msg:    'Удалить строку из базы данных?',
        	buttons: Ext.Msg.YESNO,
        	icon:   Ext.MessageBox.QUESTION,
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
    function onAddClick(){
   	if(CheckOperation('iu_d_urole.edit')!=0){
                var edit = Ext.create('EditWindow_iu_cmodule');
                p1.store.insert(0, new model_iu_cmodule());
                record= p1.store.getAt(0);
                record.set('instanceid',p1.instanceid);
                edit.getComponent(0).setActiveRecord(record,p1.instanceid);
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
   	    if(CheckOperation('iu_d_urole.edit')!=0){
            var edit = Ext.create('EditWindow_iu_cmodule');
            edit.getComponent(0).setActiveRecord(selection,selection.get('instanceid'));
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
 p1=   new Ext.grid.Panel(
         {
        itemId:  id,
        store:  mystore,
        header:false,
        layout:'fit',
        scroll:'both',
        iconCls:  'icon-grid',
        frame: true,
        instanceid: '',
        features: [groupingFeature_iu_cmodule,filterFeature_iu_cmodule],
          dockedItems: [{
                xtype:  'toolbar',
                items: [
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
{text: "Имя группы", width: 200, dataIndex: 'groupname', sortable: true}
            ,
{text: "Надпись", width: 200, dataIndex: 'caption', sortable: true}
            ,
{text: "№ п/п", width:60, dataIndex: 'sequence', sortable: true}
            ,
{text: "Разрешен", width:80, dataIndex: 'moduleaccessible_grid', sortable: true}
            ,
{text: "Код модуля", width: 200, dataIndex: 'name', sortable: true}
            ,
{text: "Вся фирма", width:80, dataIndex: 'allobjects_grid', sortable: true}
            ,
{text: "Объекты коллег", width:80, dataIndex: 'colegsobject_grid', sortable: true}
            ,
{text: "Подчиненные подразделения", width:80, dataIndex: 'substructobjects_grid', sortable: true}
            ,
{text: "Мои документы", width: 200, dataIndex: 'mydocmode', sortable: true}
            ,
{text: "Документы на контроле", width: 200, dataIndex: 'controldocmode', sortable: true}
            ,
{text: "Чужие документы", width: 200, dataIndex: 'otherdocmode', sortable: true}
        ]
       ,
    listeners: {
     render : function(grid){
                grid.store.on('load', function(store, records, options){
                        if(store.count() > 0) grid.getSelectionModel().select(0);      
                }); 
         },
        itemdblclick: function() { 
    	    onEditClick();
        },
          itemclick: function(view , record){
         p1.down('#delete').setDisabled(false);
         p1.down('#edit').setDisabled(false);
    },
    select: function( selmodel, record,  index,  eOpts ){
        p1.down('#delete').setDisabled(false);
        p1.down('#edit').setDisabled(false);
    }, 
    selectionchange: function(selModel, selections){
    	 p1.down('#delete').setDisabled(selections.length === 0);
    	 p1.down('#edit').setDisabled(selections.length === 0);
    }
    }
    }
    );
return p1;
};
function DefineForms_iu_cmodule_(){


Ext.define('Form_iu_cmodule', {
extend:  'Ext.form.Panel',
alias: 'widget.f_iu_cmodule',
initComponent: function(){
    this.addEvents('create');
    Ext.apply(this,{
        activeRecord: null,
        defaultType:  'textfield',
        id:'iu_cmodule',
        x: 0, 
        fieldDefaults: {
         labelAlign:  'top' //,
        },
        items: [
        { 
        xtype:'fieldset', 
        id:'iu_cmodule-0',
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
name:   'groupname',
itemId:   'groupname',
fieldLabel:  'Имя группы',
editable: false,
readOnly: true,
cls:'x-item-readonly',
allowBlank:true
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
fieldLabel:  'Надпись',
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
name:   'sequence',
itemId:   'sequence',
fieldLabel:  '№ п/п',
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
        y: 138, 

xtype:          'checkboxfield',
uncheckedValue: 0,
inputValue:    -1,
name:   'moduleaccessible',
itemId:   'moduleaccessible',
fieldLabel:  'Разрешен',
labelSeparator:'',
labelClsExtra:'x-item-mandatory',
allowBlank:false
       ,labelWidth: 120
}
,
{
xtype:  'hidden',
name:   'theicon',
fieldLabel:  'Иконка'
}
,
{
        minWidth: 470,
        width: 470,
        maxWidth: 470,
        x: 5, 
        y: 184, 

xtype:  'textfield',
value:  '',
name:   'name',
itemId:   'name',
fieldLabel:  'Код модуля',
editable: false,
readOnly: true,
cls:'x-item-readonly',
allowBlank:false
       ,labelWidth: 120
}
       ], width: 510,
       height: 270 
        }
,
        { 
        xtype:'panel', 
        id:'iu_cmodule-1',
        title:      'Видимость объектов',
        defaultType:  'textfield',
        closable:false,
        collapsible:true,
        titleCollapse : true,
        layout:'absolute', 
        x: 0, 
            items: [
{
        minWidth: 470,
        width: 470,
        maxWidth: 470,
        x: 5, 
        y: 0, 

xtype:          'checkboxfield',
uncheckedValue: 0,
inputValue:    -1,
name:   'allobjects',
itemId:   'allobjects',
fieldLabel:  'Вся фирма',
labelSeparator:'',
allowBlank:true
       ,labelWidth: 120
}
,
{
        minWidth: 470,
        width: 470,
        maxWidth: 470,
        x: 5, 
        y: 46, 

xtype:          'checkboxfield',
uncheckedValue: 0,
inputValue:    -1,
name:   'colegsobject',
itemId:   'colegsobject',
fieldLabel:  'Объекты коллег',
labelSeparator:'',
allowBlank:true
       ,labelWidth: 120
}
,
{
        minWidth: 470,
        width: 470,
        maxWidth: 470,
        x: 5, 
        y: 92, 

xtype:          'checkboxfield',
uncheckedValue: 0,
inputValue:    -1,
name:   'substructobjects',
itemId:   'substructobjects',
fieldLabel:  'Подчиненные подразделения',
labelSeparator:'',
allowBlank:true
       ,labelWidth: 120
}
       ], width: 510,
       height: 178 
        } //group
,
        { 
        xtype:'panel', 
        id:'iu_cmodule-2',
        title:      'Режим документа',
        defaultType:  'textfield',
        closable:false,
        collapsible:true,
        titleCollapse : true,
        layout:'absolute', 
        x: 0, 
            items: [
{
        minWidth: 470,
        width: 470,
        maxWidth: 470,
        x: 5, 
        y: 0, 

xtype:  'textfield',
value:  '',
name:   'mydocmode',
itemId:   'mydocmode',
fieldLabel:  'Мои документы',
allowBlank:true
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
name:   'controldocmode',
itemId:   'controldocmode',
fieldLabel:  'Документы на контроле',
allowBlank:true
       ,labelWidth: 120
}
,
{
        minWidth: 470,
        width: 470,
        maxWidth: 470,
        x: 5, 
        y: 92, 

xtype:  'textfield',
value:  '',
name:   'otherdocmode',
itemId:   'otherdocmode',
fieldLabel:  'Чужие документы',
allowBlank:true
       ,labelWidth: 120
}
       ], width: 510,
       height: 178 
        } //group
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
    setActiveRecord: function(record,instid){
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
        	StatusDB('Сохранение данных');
            form.submit({
                url: 'index.php/c_iu_cmodule/setRow',
                method:  'POST',
                params: { 
                    instanceid: this.instanceid
                    ,iu_cmoduleid: active.get('iu_cmoduleid')
                }
                , success: function(){
        		    StatusReady('Изменения сохранены');
                active.store.load();
                form.owner.ownerCt.close();
                 }
                , failure: function(response){
        		    StatusReady('Ошибка сохранения данных');
                 }
            });   // end submit 
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
        if(this.activeRecord.get('iu_cmoduleid')==''){
                this.activeRecord.store.reload();
        }
        this.setActiveRecord(null,null);
        this.ownerCt.close();
    }
}); // 'Ext.Define

Ext.define('EditWindow_iu_cmodule', {
    extend:  'Ext.window.Window',
    maxHeight: 741,
    maxWidth: 540,
    minHeight:696,
    minWidth: 540,
    width: 540,
    constrainHeader :true,
    layout:  'absolute',
    autoShow: true,
    modal: true,
    closable: false,
    closeAction: 'destroy',
    iconCls:  'icon-application_form',
    title:  'Модуль',
    items:[{
        xtype:  'f_iu_cmodule'
	}]
	});
}
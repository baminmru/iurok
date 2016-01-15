
Ext.require([
'Ext.form.*'
]);

function DefineInterface_iu_rcfg_mod_(id,mystore){

var groupingFeature_iu_rcfg_mod = Ext.create('Ext.grid.feature.Grouping',{
groupByText:  'Группировать по этому полю',
showGroupsText:  'Показать группировку'
});
var filterFeature_iu_rcfg_mod = {
menuFilterText:  'Фильтр',
ftype: 'filters',
local: true 
};
 var p1;
    function onDeleteConfirm(selection){
      if (selection) {
        Ext.Ajax.request({
            url:    rootURL+'index.php/c_iu_rcfg_mod/deleteRow',
            method:  'POST',
    		params: { 
    				iu_rcfg_modid: selection.get('iu_rcfg_modid')
    				}
    	});
    	p1.store.remove(selection);
      }
    };
    function onDeleteClick(){
      var selection = p1.getView().getSelectionModel().getSelection()[0];
      if (selection) {
   	  if(CheckOperation('iu_rcfg.edit')!=0){
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
   	if(CheckOperation('iu_rcfg.edit')!=0){
                var edit = Ext.create('EditWindow_iu_rcfg_mod');
                p1.store.insert(0, new model_iu_rcfg_mod());
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
   	    if(CheckOperation('iu_rcfg.edit')!=0){
            var edit = Ext.create('EditWindow_iu_rcfg_mod');
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
        width:600,
        header:false,
        layout:'fit',
        scroll:'both',
      stateful:stateFulSystem,
       stateId:  'iu_rcfg_mod',
        iconCls:  'icon-grid',
        frame: true,
        instanceid: '',
        features: [groupingFeature_iu_rcfg_mod,filterFeature_iu_rcfg_mod],
          dockedItems: [{
                xtype:  'toolbar',
                items: [
                {
                    iconCls:  'icon-application_form_add',
                    text:   'Создать',
                    scope:  this,
                hidden : true,
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
                   hidden : true,
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
{text: "Надпись", width: 200, dataIndex: 'caption', sortable: true}
            ,
{text: "Меню верхнего уровня", width: 200, dataIndex: 'groupname', sortable: true}
            ,
{text: "Разрешен", width:80, dataIndex: 'moduleaccessible_grid', sortable: true}
            ,
{text: "Управление видимостью", width:80, dataIndex: 'visiblecontrol_grid', sortable: true}
            ,
{text: "Вся фирма", width:80, dataIndex: 'allobjects_grid', sortable: true}
            ,
{text: "Объекты коллег", width:80, dataIndex: 'colegsobject_grid', sortable: true}
            ,
{text: "Подчиненные подразделения", width:80, dataIndex: 'substructobjects_grid', sortable: true}
            ,
{text: "Учителя и методисты", width:80, dataIndex: 'tmobjects_grid', sortable: true}
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
function DefineForms_iu_rcfg_mod_(){


Ext.define('Form_iu_rcfg_mod', {
extend:  'Ext.form.Panel',
alias: 'widget.f_iu_rcfg_mod',
initComponent: function(){
    this.addEvents('create');
    Ext.apply(this,{
        activeRecord: null,
        defaultType:  'textfield',
        id:'iu_rcfg_mod',
        x: 0, 
        fieldDefaults: {
         labelAlign:  'top' //,
        },
        items: [
        { 
        xtype:'panel', 
        closable:false,
        title:'',
        preventHeader:true,
        id:'iu_rcfg_mod-0',
        layout:'absolute', 
        border:false, 
        items: [
{
xtype:  'hidden',
name:   'sequence',
fieldLabel:  '№ п/п'
}
,
{
        minWidth: 740,
        width: 740,
        maxWidth: 740,
        x: 5, 
        y: 0, 

xtype:  'textfield',
value:  '',
name:   'caption',
itemId:   'caption',
fieldLabel:  'Надпись',
editable: false,
readOnly: true,
allowBlank:true
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
xtype:  'hidden',
name:   'name',
fieldLabel:  'Название меню'
}
,
{
        minWidth: 740,
        width: 740,
        maxWidth: 740,
        x: 5, 
        y: 46, 

xtype:  'textfield',
value:  '',
name:   'groupname',
itemId:   'groupname',
fieldLabel:  'Меню верхнего уровня',
editable: false,
readOnly: true,
allowBlank:true
       ,labelWidth: 120
}
,
{
        minWidth: 740,
        width: 740,
        maxWidth: 740,
        x: 5, 
        y: 92, 

xtype:          'combobox',
editable: false,
readOnly: true,
hideTrigger: true,
store: enum_Boolean,
valueField:     'name',
displayField:   'name',
typeAhead: true,
queryMode:      'local',
emptyText:      '',
name:   'moduleaccessible_grid',
itemId:   'moduleaccessible_grid',
listeners:{  select: function ( combo, records, eOpts ) {combo.up('form' ).activeRecord.set('moduleaccessible', records[0].get('value'));}  },
fieldLabel:  'Разрешен',
allowBlank:true
       ,labelWidth: 120
}
       ], width: 770,
       height: 168 
        }
,
        { 
        xtype:'panel', 
        id:'iu_rcfg_mod-1',
        title:      'Видимость объектов',
        defaultType:  'textfield',
        closable:false,
        collapsible:true,
        titleCollapse : true,
        layout:'absolute', 
        x: 0, 
            items: [
{
        minWidth: 740,
        width: 740,
        maxWidth: 740,
        x: 5, 
        y: 0, 

xtype:          'combobox',
editable: false,
readOnly: true,
hideTrigger: true,
store: enum_Boolean,
valueField:     'name',
displayField:   'name',
typeAhead: true,
queryMode:      'local',
emptyText:      '',
name:   'visiblecontrol_grid',
itemId:   'visiblecontrol_grid',
listeners:{  select: function ( combo, records, eOpts ) {combo.up('form' ).activeRecord.set('visiblecontrol', records[0].get('value'));}  },
fieldLabel:  'Управление видимостью',
allowBlank:true
       ,labelWidth: 120
}
,
{
        minWidth: 740,
        width: 740,
        maxWidth: 740,
        x: 5, 
        y: 46, 

xtype:          'combobox',
editable: false,
readOnly: true,
hideTrigger: true,
store: enum_Boolean,
valueField:     'name',
displayField:   'name',
typeAhead: true,
queryMode:      'local',
emptyText:      '',
name:   'allobjects_grid',
itemId:   'allobjects_grid',
listeners:{  select: function ( combo, records, eOpts ) {combo.up('form' ).activeRecord.set('allobjects', records[0].get('value'));}  },
fieldLabel:  'Вся фирма',
allowBlank:true
       ,labelWidth: 120
}
,
{
        minWidth: 740,
        width: 740,
        maxWidth: 740,
        x: 5, 
        y: 92, 

xtype:          'combobox',
editable: false,
readOnly: true,
hideTrigger: true,
store: enum_Boolean,
valueField:     'name',
displayField:   'name',
typeAhead: true,
queryMode:      'local',
emptyText:      '',
name:   'colegsobject_grid',
itemId:   'colegsobject_grid',
listeners:{  select: function ( combo, records, eOpts ) {combo.up('form' ).activeRecord.set('colegsobject', records[0].get('value'));}  },
fieldLabel:  'Объекты коллег',
allowBlank:true
       ,labelWidth: 120
}
,
{
        minWidth: 740,
        width: 740,
        maxWidth: 740,
        x: 5, 
        y: 138, 

xtype:          'combobox',
editable: false,
readOnly: true,
hideTrigger: true,
store: enum_Boolean,
valueField:     'name',
displayField:   'name',
typeAhead: true,
queryMode:      'local',
emptyText:      '',
name:   'substructobjects_grid',
itemId:   'substructobjects_grid',
listeners:{  select: function ( combo, records, eOpts ) {combo.up('form' ).activeRecord.set('substructobjects', records[0].get('value'));}  },
fieldLabel:  'Подчиненные подразделения',
allowBlank:true
       ,labelWidth: 120
}
,
{
        minWidth: 740,
        width: 740,
        maxWidth: 740,
        x: 5, 
        y: 184, 

xtype:          'combobox',
editable: false,
trigger1Cls:        'x-form-clear-trigger', 
trigger2Cls:        'x-form-select-trigger', 
hideTrigger1:false, 
hideTrigger2:false, 
onTrigger1Click : function(){
		this.collapse();
		this.clearValue();
},
onTrigger2Click : function(){ 
		if(this.isExpanded) {
			this.collapse(); 
		}else{ 
			this.expand();
		}
},
store: enum_Boolean,
valueField:     'name',
displayField:   'name',
typeAhead: true,
queryMode:      'local',
emptyText:      '',
name:   'tmobjects_grid',
itemId:   'tmobjects_grid',
listeners:{  select: function ( combo, records, eOpts ) {combo.up('form' ).activeRecord.set('tmobjects', records[0].get('value'));}  },
fieldLabel:  'Учителя и методисты',
allowBlank:true
       ,labelWidth: 120
}
       ], width: 760,
       height: 270 
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
            // var form_values = form.getValues(); var field_name = '';  for(field_name in form_values){active.set(field_name, form_values[field_name]);}
        	StatusDB('Сохранение данных');
            Ext.Ajax.request({
                url: rootURL+'index.php/c_iu_rcfg_mod/setRow',
                method:  'POST',
                params: { 
                    instanceid: this.instanceid
                    ,iu_rcfg_modid: active.get('iu_rcfg_modid')
                    ,sequence: active.get('sequence') 
                    ,caption: active.get('caption') 
                    ,theicon: active.get('theicon') 
                    ,name: active.get('name') 
                    ,groupname: active.get('groupname') 
                    ,moduleaccessible: active.get('moduleaccessible') 
                    ,visiblecontrol: active.get('visiblecontrol') 
                    ,allobjects: active.get('allobjects') 
                    ,colegsobject: active.get('colegsobject') 
                    ,substructobjects: active.get('substructobjects') 
                    ,tmobjects: active.get('tmobjects') 
                    ,mydocmode: active.get('mydocmode') 
                    ,otherdocmode: active.get('otherdocmode') 
                    ,controldocmode: active.get('controldocmode') 
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
        		    StatusErr( 'Ошибка. '+res.msg);
	            }else{
                    if(active.get('iu_rcfg_modid')==''){
               			active.set('iu_rcfg_modid',res.data['iu_rcfg_modid']);
                    }
        		    StatusReady('Изменения сохранены');
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
        if(this.activeRecord.get('iu_rcfg_modid')==''){
                this.activeRecord.store.reload();
        }
        this.setActiveRecord(null,null);
        this.ownerCt.close();
    }
}); // 'Ext.Define

Ext.define('EditWindow_iu_rcfg_mod', {
    extend:  'Ext.window.Window',
    maxHeight: 548,
    maxWidth: 900,
    autoScroll:true,
    minWidth: 750,
    width: 800,
    minHeight:518,
    height:518,
    constrainHeader :true,
    layout:  'absolute',
    autoShow: true,
    modal: true,
    closable: false,
    closeAction: 'destroy',
    iconCls:  'icon-application_form',
    title:  'Модуль',
    items:[{
        xtype:  'f_iu_rcfg_mod'
	}]
	});
}
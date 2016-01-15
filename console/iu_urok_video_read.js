
Ext.require([
'Ext.form.*'
]);

function DefineInterface_iu_urok_video_read(id,mystore){

var groupingFeature_iu_urok_video = Ext.create('Ext.grid.feature.Grouping',{
groupByText:  'Группировать по этому полю',
showGroupsText:  'Показать группировку'
});
var filterFeature_iu_urok_video = {
menuFilterText:  'Фильтр',
ftype: 'filters',
local: true 
};
 var p1;
    function onDeleteConfirm(selection){
      if (selection) {
        Ext.Ajax.request({
            url:    rootURL+'index.php/c_iu_urok_video/deleteRow',
            method:  'POST',
    		params: { 
    				iu_urok_videoid: selection.get('iu_urok_videoid')
    				}
    	});
    	p1.store.remove(selection);
      }
    };
    function onDeleteClick(){
      var selection = p1.getView().getSelectionModel().getSelection()[0];
      if (selection) {
   	  if(CheckOperation('iu_urok.edit')!=0){
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
   	if(CheckOperation('iu_urok.edit')!=0){
                var edit = Ext.create('EditWindow_iu_urok_videoread');
                p1.store.insert(0, new model_iu_urok_video());
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
   	    if(CheckOperation('iu_urok.edit')!=0){
            var edit = Ext.create('EditWindow_iu_urok_videoread');
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
       stateId:  'iu_urok_videoread',
        iconCls:  'icon-grid',
        frame: true,
        instanceid: '',
        features: [groupingFeature_iu_urok_video,filterFeature_iu_urok_video],
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
{text: "Тип видео", width:200, dataIndex: 'doctype_grid', sortable: true}
            ,
{text: "Активная версия", width:80, dataIndex: 'activeversion_grid', sortable: true}
            ,
{text: "№ версии", width:60, dataIndex: 'version', sortable: true}
            ,
{ text     : 'URL файла', xtype: 'templatecolumn',  align:'right',width    : 90,	sortable : false,
tpl:'<a href=\'{fileurl}\' target=\'_blank\'>URL файла</a>'}
            ,
{ text     : 'Файл', xtype: 'templatecolumn',  align:'right',width    : 90,	sortable : false,
tpl:'<a href=\'/output_file.php?ID={fileref}&ext={fileref_ext}\' target=\'_blank\'>Файл</a>'}
            ,
{text: "Комментарий", width: 200, dataIndex: 'info', sortable: true}
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
function DefineForms_iu_urok_video_read(){


Ext.define('Form_iu_urok_videoread', {
extend:  'Ext.form.Panel',
alias: 'widget.f_iu_urok_videoread',
initComponent: function(){
    this.addEvents('create');
    Ext.apply(this,{
        activeRecord: null,
        defaultType:  'textfield',
        id:'iu_urok_video',
        x: 0, 
        fieldDefaults: {
         labelAlign:  'top' //,
        },
        items: [
        { 
        xtype:'panel', 
        id:'iu_urok_video-0',
        title:      'Версия',
        defaultType:  'textfield',
        closable:false,
        collapsible:true,
        titleCollapse : true,
        layout:'absolute', 
        x: 0, 
            items: [
{
          xtype:  'hidden',
          name:   'adddate',
          fieldLabel:  'Когда добавлен'
}
,
{
        /* flex_field */ 
        minWidth: 745,
        width: 745,
        maxWidth: 745,
        x: 5, 
        y: 0, 

xtype:  'combobox',
hideTrigger: true,
editable: false,
readOnly: true,
store: cmbstore_iud_videotype,
valueField:     'brief',
displayField:   'brief',
typeAhead: true,
emptyText:      '',
name:   'doctype_grid',
itemId:   'doctype_grid',
fieldLabel:  'Тип видео',
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
name:   'activeversion_grid',
itemId:   'activeversion_grid',
listeners:{  select: function ( combo, records, eOpts ) {combo.up('form' ).activeRecord.set('activeversion', records[0].get('value'));}  },
fieldLabel:  'Активная версия',
allowBlank:true
       ,labelWidth: 120
}
,
,
{
          xtype:  'hidden',
          name:   'addby',
          fieldLabel:  'Кем добавлен'
}
,
{
        minWidth: 740,
        width: 740,
        maxWidth: 740,
        x: 5, 
        y: 92, 

xtype:  'numberfield',
editable: false,
spinDownEnabled: false,
spinUpEnabled: false,
readOnly: true,
value:  '0',
name:   'version',
itemId:   'version',
fieldLabel:  '№ версии',
allowBlank:true
       ,labelWidth: 120
}
       ], width: 760,
       height: 178 
        } //group
,
        { 
        xtype:'panel', 
        id:'iu_urok_video-1',
        title:      'Файл',
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

xtype:  'textfield',
value:  '',
name:   'fileurl',
itemId:   'fileurl',
fieldLabel:  'URL файла',
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
        y: 46, 

xtype:  'filefield',
hideTrigger: true,
editable: false,
name:   'fileref_fu',
itemId:   'fileref_fu',
buttonText:'Выбрать',
buttonConfig: {
    iconCls:'icon-iu_upload'
		},
fieldLabel:  'Файл',
allowBlank:true
       ,labelWidth: 120
}
,{
xtype:  'hidden',
name:   'fileref',
itemId:   'fileref',
},{
xtype:  'hidden',
name:   'fileref_ext',
itemId:   'fileref_ext',
}
,
{
        minWidth: 740,
        maxWidth: 740,
        width: 740,
        xtype: 'textarea', 
        x: 5, 
        y: 92, 
        height: 80, 

value:  '',
name:   'info',
itemId:   'info',
fieldLabel:  'Комментарий',
editable: false,
readOnly: true,
allowBlank:true
       ,labelWidth: 120
}
,
,
{
          xtype:  'hidden',
          name:   'nocomments',
          fieldLabel:  'Скрыть'
}
,
,
{
          xtype:  'hidden',
          name:   'origname',
          fieldLabel:  'Оригинальное название'
}
       ], width: 760,
       height: 222 
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
                url: rootURL+'index.php/c_iu_urok_video/setRow',
                method:  'POST',
                params: { 
                    instanceid: this.instanceid
                    ,iu_urok_videoid: active.get('iu_urok_videoid')
                    ,adddate:function() { if(active.get('adddate')) return active.get('adddate').toLocaleFormat('%Y-%m-%d %H:%M:%S'); else return null;}()
                    ,doctype: active.get('doctype') 
                    ,activeversion: active.get('activeversion') 
                    ,addby: active.get('addby') 
                    ,version: active.get('version') 
                    ,fileurl: active.get('fileurl') 
                    ,fileref: active.get('fileref') 
                    ,info: active.get('info') 
                    ,nocomments: active.get('nocomments') 
                    ,origname: active.get('origname') 
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
                    if(active.get('iu_urok_videoid')==''){
               			active.set('iu_urok_videoid',res.data['iu_urok_videoid']);
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
        if(this.activeRecord.get('iu_urok_videoid')==''){
                this.activeRecord.store.reload();
        }
        this.setActiveRecord(null,null);
        this.ownerCt.close();
    }
}); // 'Ext.Define

Ext.define('EditWindow_iu_urok_videoread', {
    extend:  'Ext.window.Window',
    maxHeight: 510,
    maxWidth: 900,
    autoScroll:true,
    minWidth: 750,
    width: 800,
    minHeight:480,
    height:480,
    constrainHeader :true,
    layout:  'absolute',
    autoShow: true,
    modal: true,
    closable: false,
    closeAction: 'destroy',
    iconCls:  'icon-application_form',
    title:  'Видеоматериалы',
    items:[{
        xtype:  'f_iu_urok_videoread'
	}]
	});
}
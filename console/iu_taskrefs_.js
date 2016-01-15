
Ext.require([
'Ext.form.*'
]);

function DefineInterface_iu_taskrefs_(id,mystore){

var groupingFeature_iu_taskrefs = Ext.create('Ext.grid.feature.Grouping',{
groupByText:  'Группировать по этому полю',
showGroupsText:  'Показать группировку'
});
var filterFeature_iu_taskrefs = {
menuFilterText:  'Фильтр',
ftype: 'filters',
local: true 
};
 var p1;
    function onDeleteConfirm(selection){
      if (selection) {
        Ext.Ajax.request({
            url:    rootURL+'index.php/c_iu_taskrefs/deleteRow',
            method:  'POST',
    		params: { 
    				iu_taskrefsid: selection.get('iu_taskrefsid')
    				}
    	});
    	p1.store.remove(selection);
      }
    };
    function onDeleteClick(){
      var selection = p1.getView().getSelectionModel().getSelection()[0];
      if (selection) {
   	  if(CheckOperation('iu_t.edit')!=0){
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
   	if(CheckOperation('iu_t.edit')!=0){
                var edit = Ext.create('EditWindow_iu_taskrefs');
                p1.store.insert(0, new model_iu_taskrefs());
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
   	    if(CheckOperation('iu_t.edit')!=0){
            var edit = Ext.create('EditWindow_iu_taskrefs');
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
	
function refRenderer(value, metaData, record, row, col, store, gridView) 
{
    if (record.get('fileurl')!=''){
		return ('<a href="' +record.get('fileurl') +'" target="_blank"><img src ="../resources/icons/book_link.png" /></a> '+record.get('dtypename')+' (URL)');
	}else{
		if (record.get('theref')!=''){
			return ('<a href="/output_file.php?ID=' +record.get('theref') +'&ext=' +record.get('theref_ext') +'" target="_blank"><img src ="../resources/icons/book.png" /></a> '+record.get('dtypename')+' (Файл в СУП)');
		}else{
	  	    var S = MyhtmlEncode(record.get('filetext')); 
			return ('<a href="javascript:ShowText(\''+record.get('dtypename')+'\',\''+S+'\');"><img src ="../resources/icons/script.png" /></a> '+record.get('dtypename')+' (текст)');
		}
	}
}
 p1=   new Ext.grid.Panel(
         {
        itemId:  id,
        store:  mystore,
		stateful: stateFulSystem,
		stateId: 'iu_taskrefs',
        width:600,
        header:false,
        layout:'fit',
        scroll:'both',
        iconCls:  'icon-grid',
        frame: true,
        instanceid: '',
        features: [groupingFeature_iu_taskrefs,filterFeature_iu_taskrefs],
          dockedItems: [{
                xtype:  'toolbar',
                items: [
                {
                    iconCls:  'icon-application_form_add',
                    text:   'Создать',
                    scope:  this,
					hidden : true,
                    handler : onAddClick
                    },  {
                    iconCls:  'icon-application_form_edit',
                    text:   'Открыть',
                    scope:  this,
                    disabled: true,
                    itemId:  'edit',
					hidden : true,
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
{text: "Документ", width:200, dataIndex: 'dtypename', sortable: true,renderer:refRenderer}
           ,
{text: "Комментарий", width: 200, dataIndex: 'info', sortable: true}
            ,
{text: "№ версии", width:60, dataIndex: 'version', sortable: true}
            ,
{text: "Кем добавлен", width:200, dataIndex: 'addby_grid', sortable: true}
            ,
{text: "Когда добавлен", width:120, dataIndex: 'adddate', sortable: true, xtype: 'datecolumn',   renderer:myDateRenderer}
        ]
       ,
    listeners: {
     render : function(grid){
                grid.store.on('load', function(store, records, options){
                        if(store.count() > 0) grid.getSelectionModel().select(0);      
                }); 
         },
        itemdblclick: function() { 
    	  // onEditClick();
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
function DefineForms_iu_taskrefs_(){


Ext.define('Form_iu_taskrefs', {
extend:  'Ext.form.Panel',
alias: 'widget.f_iu_taskrefs',
initComponent: function(){
    this.addEvents('create');
    Ext.apply(this,{
        activeRecord: null,
        defaultType:  'textfield',
        id:'iu_taskrefs',
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
        id:'iu_taskrefs-0',
        layout:'absolute', 
        border:false, 
        items: [
{
        minWidth: 740,
        width: 740,
        maxWidth: 740,
        x: 5, 
        y: 0, 

xtype:  'textfield',
value:  '',
name:   'dtypename',
itemId:   'dtypename',
fieldLabel:  'Тип документа',
editable: false,
readOnly: true,
allowBlank:true
       ,labelWidth: 120
}
       ], width: 770,
       height: 76 
        }
,
        { 
        xtype:'panel', 
        id:'iu_taskrefs-1',
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

xtype:  'combobox',
hideTrigger: true,
editable: false,
readOnly: true,
store: cmbstore_iud_rt_def,
valueField:     'brief',
displayField:   'brief',
typeAhead: true,
emptyText:      '',
name:   'filereftype_grid',
itemId:   'filereftype_grid',
fieldLabel:  'Тип ссылки на файл',
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
       cls:'x-item-readonly',
hideTrigger: true,
editable: false,
name:   'theref_fu',
itemId:   'theref_fu',
fieldLabel:  'Файл',
buttonText:"Выбрать",
buttonConfig: {
			iconCls:'icon-iu_upload'
		},
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
        maxWidth: 740,
        width: 740,
        xtype: 'textarea', 
        x: 5, 
        y: 138, 
        height: 260, 

xtype:  'htmleditor',
name:   'filetext',
itemId:   'filetext',
fieldLabel:  'Текст документа',
allowBlank:true
       ,labelWidth: 120
}
,
{
        minWidth: 740,
        width: 740,
        maxWidth: 740,
        x: 5, 
        y: 408, 

xtype:  'textfield',
value:  '',
name:   'info',
itemId:   'info',
fieldLabel:  'Комментарий',
editable: false,
readOnly: true,
allowBlank:true
       ,labelWidth: 120
}
       ], width: 760,
       height: 494 
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
                url: rootURL+'index.php/c_iu_taskrefs/setRow',
                method:  'POST',
                params: { 
                    instanceid: this.instanceid
                    ,iu_taskrefsid: active.get('iu_taskrefsid')
                    ,dtypename: active.get('dtypename') 
                    ,filereftype: active.get('filereftype') 
                    ,theref: active.get('theref') 
                    ,fileurl: active.get('fileurl') 
                    ,filetext: active.get('filetext') 
                    ,info: active.get('info') 
                    ,version: active.get('version') 
                    ,addby: active.get('addby') 
                    ,adddate:function() { if(active.get('adddate')) return active.get('adddate').toLocaleFormat('%Y-%m-%d %H:%M:%S'); else return null;}()
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
                    if(active.get('iu_taskrefsid')==''){
               			active.set('iu_taskrefsid',res.data['iu_taskrefsid']);
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
        if(this.activeRecord.get('iu_taskrefsid')==''){
                this.activeRecord.store.reload();
        }
        this.setActiveRecord(null,null);
        this.ownerCt.close();
    }
}); // 'Ext.Define

Ext.define('EditWindow_iu_taskrefs', {
    extend:  'Ext.window.Window',
    maxHeight: 680,
    maxWidth: 900,
    autoScroll:true,
    minWidth: 750,
    width: 800,
    minHeight:650,
    height:650,
    constrainHeader :true,
    layout:  'absolute',
    autoShow: true,
    modal: true,
    closable: false,
    closeAction: 'destroy',
    iconCls:  'icon-application_form',
    title:  'Вложения',
    items:[{
        xtype:  'f_iu_taskrefs'
	}]
	});
}

Ext.require([
'Ext.form.*'
]);

function DefineInterface_iu_cm_msg_(id,treestore_iu_cm_msg){

var p1;
    function onDeleteConfirm(selection){
      if (selection) {
        Ext.Ajax.request({
            url:    rootURL+'index.php/c_iu_cm_msg/deleteRow',
            method:  'POST',
    		params: { 
    				iu_cm_msgid: selection.get('iu_cm_msgid')
    				}
    	});
    	onRefreshClick();
      }
    };
    function onDeleteClick (){
      var selection = p1.getView().getSelectionModel().getSelection()[0];
      if (selection) {
   	if(CheckOperation('iu_cm.edit')!=0){
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
   	if(CheckOperation('iu_cm.edit')!=0){
                var edit = Ext.create('EditWindow_iu_cm_msg');
                p1.lasttreeid='{00000000-0000-0000-0000-000000000000}';
                record=new model_iu_cm_msg();
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
   	if(CheckOperation('iu_cm.edit')!=0){
               var selection = p1.getView().getSelectionModel().getSelection()[0];
               if (selection) {
                    p1.lasttreeid=selection.get('iu_cm_msgid');
                    record=new model_iu_cm_msg();
                    record.set('instanceid',p1.instanceid);
                    record.set('parentrowid',p1.lasttreeid);
                    p1.store.getNodeById(p1.lasttreeid).insertChild(0, record);
               }else{
                    p1.lasttreeid='{00000000-0000-0000-0000-000000000000}';
                    record=new model_iu_cm_msg();
                    record.set('instanceid',p1.instanceid);
                    record.set('parentrowid',p1.lasttreeid);
                    p1.store.getRootNode().insertChild(0, record);
               }
                var edit = Ext.create('EditWindow_iu_cm_msg');
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
    function onEditClick(){
        var selection = p1.getView().getSelectionModel().getSelection()[0];
        if (selection) {
   	    if(CheckOperation('iu_cm.edit')!=0){
            var edit = Ext.create('EditWindow_iu_cm_msg');
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
    function onRefreshClick(){
            p1.store.load({params:{instanceid: p1.instanceid}});
    };
 p1=   new Ext.tree.Panel({
        itemId: id,
            flex: 1,
        layout:'fit',
      stateful:stateFulSystem,
       stateId:  'iu_cm_msg',
        iconCls:  'icon-grid',
        frame: true,
        instanceid: '{00000000-0000-0000-0000-000000000000}',
        lasttreeid: '{00000000-0000-0000-0000-000000000000}',
        rootVisible:false,
        store: treestore_iu_cm_msg,
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
                    }, 
                              {
                    iconCls:  'icon-table_refresh',
                    text:   'Обновить',
                    itemId:  'bRefresh',
                    scope:  this,
                    handler : onRefreshClick
                }]
            }],
        columns: [
{xtype: 'treecolumn',text: "Сообщение", width: 200, dataIndex: 'info', sortable: true,
 renderer: function(value){var S =new String(value);  S=S.replace(new RegExp('/>','g'),'');  S=S.replace(new RegExp('<','g'),''); S=S.replace(new RegExp('>','g'),''); if(S.length >255) S=S.substr(0,255); return S;}}
            ,
{text: "Тип сообщения", width: 200, dataIndex: 'messagetype_grid', sortable: true}
            ,
{text: "Добавил", width: 200, dataIndex: 'theauthor_grid', sortable: true}
            ,
{text: "Дата", width: 80, dataIndex: 'thedate', sortable: true,renderer:myDateRenderer}
            ,
{ text     : 'Файл', xtype: 'templatecolumn',  align:'right',width    : 90,	sortable : false,
tpl:'<a href=\'/output_file.php?ID={thefile}&ext={thefile_ext}\' target=\'_blank\'>Файл</a>'}
            ,
{ text     : 'Ссылка', xtype: 'templatecolumn',  align:'right',width    : 90,	sortable : false,
tpl:'<a href=\'{theref}\' target=\'_blank\'>Ссылка</a>'}
        ],
        onSelectChange: function(selModel, selections){
        p1.down('#delete').setDisabled(selections.length === 0);
        p1.down('#edit').setDisabled(selections.length === 0);
    },
    listeners: {
        itemdblclick: function() { 
    	    onEditClick();
        }
        ,itemclick: function() { 
        p1.down('#delete').setDisabled(false);
        p1.down('#edit').setDisabled(false);
        }
    },
    }
    );
return p1;
};
function DefineForms_iu_cm_msg_(){


Ext.define('Form_iu_cm_msg', {
extend:  'Ext.form.Panel',
alias: 'widget.f_iu_cm_msg',
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
        xtype:'panel', 
        closable:false,
        title:'',
        preventHeader:true,
        id:'iu_cm_msg-0',
        layout:'absolute', 
        border:false, 
        items: [
{
        minWidth: 740,
        width: 740,
        xtype: 'textarea', 
        x: 5, 
        y: 0, 
        height: 260, 

xtype:  'htmleditor',
name:   'info',
itemId:   'info',
fieldLabel:  'Сообщение',
labelClsExtra:'x-item-mandatory',
allowBlank:false
       ,labelWidth: 120
}
,
{
        minWidth: 740,
        width: 740,
        maxWidth: 740,
        x: 5, 
        y: 270, 

xtype:  'combobox',
trigger1Cls:        'x-form-clear-trigger', 
trigger2Cls:        'x-form-select-trigger', 
hideTrigger1:false, 
hideTrigger2:false, 
onTrigger1Click : function(){
		this.collapse();
		this.clearValue();
		this.up('form' ).activeRecord.set('messagetype',null );
},
onTrigger2Click : function(){ 
		if(this.isExpanded) {
			this.collapse(); 
		}else{ 
			if(this.store.count(false)==0) this.store.load();
			this.expand();
		}
},
editable: false,
listeners:{  select: function ( combo, records, eOpts ) {combo.up('form' ).activeRecord.set('messagetype', records[0].get('id'));}  },
store: cmbstore_iud_mt_def,
valueField:     'brief',
displayField:   'brief',
typeAhead: true,
emptyText:      '',
name:   'messagetype_grid',
itemId:   'messagetype_grid',
fieldLabel:  'Тип сообщения',
allowBlank:true
       ,labelWidth: 120
}
,
{
        minWidth: 740,
        width: 740,
        maxWidth: 740,
        x: 5, 
        y: 316, 

xtype:  'combobox',
trigger1Cls:        'x-form-clear-trigger', 
trigger2Cls:        'x-form-select-trigger', 
hideTrigger1:false, 
hideTrigger2:false, 
onTrigger1Click : function(){
		this.collapse();
		this.clearValue();
		this.up('form' ).activeRecord.set('theauthor',null );
},
onTrigger2Click : function(){ 
		if(this.isExpanded) {
			this.collapse(); 
		}else{ 
			if(this.store.count(false)==0) this.store.load();
			this.expand();
		}
},
editable: false,
listeners:{  select: function ( combo, records, eOpts ) {combo.up('form' ).activeRecord.set('theauthor', records[0].get('id'));}  },
store: cmbstore_iu_u_def,
valueField:     'brief',
displayField:   'brief',
typeAhead: true,
emptyText:      '',
name:   'theauthor_grid',
itemId:   'theauthor_grid',
fieldLabel:  'Добавил',
allowBlank:true
       ,labelWidth: 120
}
,
{
        minWidth: 740,
        width: 740,
        maxWidth: 740,
        x: 5, 
        y: 362, 

xtype:  'datefield',
format:'d/m/Y H:i:s',
submitFormat:'Y-m-d H:i:s',
value:  '',
name:   'thedate',
itemId:   'thedate',
fieldLabel:  'Дата',
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

xtype:  'filefield',
name:   'thefile_fu',
itemId:   'thefile_fu',
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
name:   'thefile',
itemId:   'thefile',
},{
xtype:  'hidden',
name:   'thefile_ext',
itemId:   'thefile_ext',
}
,
{
        minWidth: 740,
        width: 740,
        maxWidth: 740,
        x: 5, 
        y: 454, 

xtype:  'textfield',
value:  '',
name:   'theref',
itemId:   'theref',
fieldLabel:  'Ссылка',
allowBlank:true
       ,labelWidth: 120
}
       ], width: 770,
       height: 530 
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
            // var form_values = form.getValues(); var field_name = '';  for(field_name in form_values){active.set(field_name, form_values[field_name]);}
        	StatusDB('Сохранение данных');
            Ext.Ajax.request({
                url: rootURL+'index.php/c_iu_cm_msg/setRow',
                method:  'POST',
                params: { 
                    instanceid: this.instanceid
                    ,iu_cm_msgid: active.get('iu_cm_msgid')
                    ,treeid: active.get('parentrowid')
                    ,info: active.get('info') 
                    ,messagetype: active.get('messagetype') 
                    ,theauthor: active.get('theauthor') 
                    ,thedate:function() { if(active.get('thedate')) return active.get('thedate').toLocaleFormat('%Y-%m-%d %H:%M:%S'); else return null;}()
                    ,thefile: active.get('thefile') 
                    ,theref: active.get('theref') 
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
                    if(active.get('iu_cm_msgid')==''){
               			active.set('id',res.data['iu_cm_msgid']);
               			active.set('iu_cm_msgid',res.data['iu_cm_msgid']);
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
        if(this.activeRecord.get('iu_cm_msgid')==''){
        	ts =this.tree.store;
        	ts.getRootNode().removeAll();
        	ts.load();
        }
        this.setActiveRecord(null,null,null);
        this.ownerCt.close();
    }
}); // 'Ext.Define

Ext.define('EditWindow_iu_cm_msg', {
    extend:  'Ext.window.Window',
    maxHeight: 635,
    maxWidth: 900,
    autoScroll:true,
    minWidth: 750,
    width: 800,
    minHeight:605,
    height:605,
    constrainHeader :true,
    layout:  'absolute',
    autoShow: true,
    modal: true,
    closable: false,
    closeAction: 'destroy',
    iconCls:  'icon-application_form',
    title:  'Сообщения',
    items:[{
        xtype:  'f_iu_cm_msg'
	}]
	});
}
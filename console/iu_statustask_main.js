
Ext.require([
'Ext.form.*'
]);

function DefineInterface_iu_statustask_main(id,mystore){

var groupingFeature_iu_state_tasklink = Ext.create('Ext.grid.feature.Grouping',{
groupByText:  'Группировать по этому полю',
showGroupsText:  'Показать группировку'
});
var grid_iu_state_tasklink;
    function ChildOnDeleteConfirm(selection){
      if (selection) {
        Ext.Ajax.request({
            url:    rootURL+'index.php/c_iu_state_tasklink/deleteRow',
            method:  'POST',
    		params: { 
    				iu_state_tasklinkid: selection.get('iu_state_tasklinkid')
    				}
    	});
    	grid_iu_state_tasklink.store.remove(selection);
      }
    };
     function ChildOnDeleteClick(){
      var selection = grid_iu_state_tasklink.getView().getSelectionModel().getSelection()[0];
      if (selection) {
   	  if(CheckOperation('iu_s.edit')!=0){
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
            caller: grid_iu_state_tasklink,
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
   	if(CheckOperation('iu_s.edit')!=0){
                var edit = Ext.create('EditWindow_iu_state_tasklinkmain');
                grid_iu_state_tasklink.store.insert(0, new model_iu_state_tasklink());
                record= grid_iu_state_tasklink.store.getAt(0);
                record.set('parentid',grid_iu_state_tasklink.parentid);
                edit.getComponent(0).setActiveRecord(record,grid_iu_state_tasklink.instanceid,grid_iu_state_tasklink.parentid);
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
            grid_iu_state_tasklink.store.load({params:{parentid: grid_iu_state_tasklink.parentid}});
    };
    function ChildOnEditClick(){
        var selection = grid_iu_state_tasklink.getView().getSelectionModel().getSelection()[0];
        if (selection) {
   	     if(CheckOperation('iu_s.edit')!=0){
            var edit = Ext.create('EditWindow_iu_state_tasklinkmain');
            edit.getComponent(0).setActiveRecord(selection,grid_iu_state_tasklink.instanceid,grid_iu_state_tasklink.parentid);
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
   grid_iu_state_tasklink=
    new Ext.grid.Panel({
        itemId:  'grd_iu_state_tasklink',
        maxHeight: 350,
        minHeight: 250,
        iconCls:  'icon-grid',
        frame: true,
        parentid: '',
        title: 'Ссылки к задаче',
        scroll:'both',
        store: {
        model:'model_iu_state_tasklink',
        autoLoad: false,
        autoSync: false,
        proxy: {
            type:   'ajax',
                url:   rootURL+'index.php/c_iu_state_tasklink/getRows',
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
        features: [groupingFeature_iu_state_tasklink],
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
{text: "Тип документа", width: 200, dataIndex: 'doctype_grid', sortable: true}
            ,
{text: "Все версии", width:80, dataIndex: 'allversions_grid', sortable: true}
        ],
    listeners: {
        itemdblclick: function() { 
    	    ChildOnEditClick();
        },
          itemclick: function(view , record){
         grid_iu_state_tasklink.down('#delete').setDisabled(false);
          grid_iu_state_tasklink.down('#edit').setDisabled(false);
    },
    select: function( selmodel, record,  index,  eOpts ){
        grid_iu_state_tasklink.down('#delete').setDisabled(false);
        grid_iu_state_tasklink.down('#edit').setDisabled(false);
    }, 
    selectionchange: function(selModel, selections){
    	 grid_iu_state_tasklink.down('#delete').setDisabled(selections.length === 0);
    	 grid_iu_state_tasklink.down('#edit').setDisabled(selections.length === 0);
    }
    }
    }
    );
var groupingFeature_iu_statustask = Ext.create('Ext.grid.feature.Grouping',{
groupByText:  'Группировать по этому полю',
showGroupsText:  'Показать группировку'
});
var p1;
    function onDeleteConfirm(selection){
      if (selection) {
        Ext.Ajax.request({
            url:    rootURL+'index.php/c_iu_statustask/deleteRow',
            method:  'POST',
    		params: { 
    				iu_statustaskid: selection.get('iu_statustaskid')
    				}
    	});
    	p1.store.remove(selection);
      }
    };
    function onDeleteClick(){
      var selection = p1.getView().getSelectionModel().getSelection()[0];
      if (selection) {
   	  if(CheckOperation('iu_s.edit')!=0){
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
    function onAddClick(){
   	if(CheckOperation('iu_s.edit')!=0){
                var edit = Ext.create('EditWindow_iu_statustaskmain');
                p1.store.insert(0, new model_iu_statustask());
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
   	    if(CheckOperation('iu_s.edit')!=0){
            var edit = Ext.create('EditWindow_iu_statustaskmain');
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
 p1=   new Ext.grid.Panel({
        itemId: id,
        store:  mystore,
        frame: true,
        instanceid: '',
        scroll:'both',
        autoScroll:true,
        width:600,
        features: [groupingFeature_iu_statustask],
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
{text: "Название задачи", width: 200, dataIndex: 'name', sortable: true }
            ,
{text: "Тип исполнителя", width:200, dataIndex: 'doertype_grid', sortable: true}
            ,
{text: "Плановая длительность", width:60, dataIndex: 'duration_plan', sortable: true}
            ,
{text: "Описание", width: 200, dataIndex: 'info', sortable: true }
            ,
{text: "Кто контролирует", width:200, dataIndex: 'contoller_grid', sortable: true}
            ,
{text: "Статус по завершению", width:200, dataIndex: 'statusonclose_grid', sortable: true}
            ,
{text: "Альтернативные статусы", width:200, dataIndex: 'possiblestatuses_grid', sortable: true}
            ,
{text: "Завершение обязательно", width:60, dataIndex: 'finishallowed_grid', sortable: true}
            ,
{text: "Последовательность исполнения", width:60, dataIndex: 'tasksequence', sortable: true}
            ,
{text: "После всех предыдущих", width:60, dataIndex: 'afterall_grid', sortable: true}
        ]
,
	bbar:grid_iu_state_tasklink, 
    listeners: {
        render : function(grid){
                grid.store.on('load', function(store, records, options){
                        if(store.count() > 0) grid.getSelectionModel().select(0);      
                }); 
         },
        itemdblclick: function() { 
    	    onEditClick();
        }
        ,itemclick: function(view,record) { 
           p1.down('#delete').setDisabled(false);
           p1.down('#edit').setDisabled(false);
           grid_iu_state_tasklink.instanceid=p1.instanceid;
           grid_iu_state_tasklink.parentid=record.get('iu_statustaskid');
           grid_iu_state_tasklink.store.load({params:{ parentid:record.get('iu_statustaskid')} })
        },
        selectionchange: function(selModel, selections){
        p1.down('#delete').setDisabled(selections.length === 0);
        p1.down('#edit').setDisabled(selections.length === 0);
        var selection = selections[0];
        if (selection) {
           p1.down('#grd_iu_state_tasklink').instanceid=p1.instanceid;
           p1.down('#grd_iu_state_tasklink').parentid=selection.get('iu_statustaskid');
           p1.down('#grd_iu_state_tasklink').store.load({params:{ parentid:selection.get('iu_statustaskid')} })
        }
       }
    }
    }
    );
return p1;
};
function DefineForms_iu_statustask_main(){


Ext.define('Form_iu_statustaskmain', {
extend:  'Ext.form.Panel',
alias: 'widget.f_iu_statustaskmain',
initComponent: function(){
    this.addEvents('create');
    Ext.apply(this,{
        activeRecord: null,
        defaultType:  'textfield',
        id:'iu_statustask',
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
        id:'iu_statustask-0',
        layout:'absolute', 
        border:false, 
        items: [
{
        minWidth: 740,
        x: 5, 
        y: 0, 

xtype:  'textfield',
value:  '',
name:   'name',
itemId:   'name',
fieldLabel:  'Название задачи',
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
        y: 46, 

xtype:  'combobox',
trigger1Cls:        'x-form-select-trigger', 
hideTrigger1:false, 
onTrigger1Click : function(){ 
		if(this.isExpanded) {
			this.collapse(); 
		}else{ 
			if(this.store.count(false)==0) this.store.load();
			this.expand();
		}
},
editable: false,
listeners:{  select: function ( combo, records, eOpts ) {combo.up('form' ).activeRecord.set('doertype', records[0].get('id'));}  },
store: cmbstore_iu_crole,
valueField:     'brief',
displayField:   'brief',
typeAhead: true,
emptyText:      '',
name:   'doertype_grid',
itemId:   'doertype_grid',
fieldLabel:  'Тип исполнителя',
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
        y: 92, 

xtype:  'numberfield',
value:  '0',
name:   'duration_plan',
itemId:   'duration_plan',
fieldLabel:  'Плановая длительность',
labelClsExtra:'x-item-mandatory',
allowBlank:false
       ,labelWidth: 120
}
,
{
        minWidth: 740,
        width: 740,
        xtype: 'textarea', 
        x: 5, 
        y: 138, 
        height: 80, 

value:  '',
name:   'info',
itemId:   'info',
fieldLabel:  'Описание',
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
        y: 228, 

xtype:  'combobox',
trigger1Cls:        'x-form-clear-trigger', 
trigger2Cls:        'x-form-select-trigger', 
hideTrigger1:false, 
hideTrigger2:false, 
onTrigger1Click : function(){
		this.collapse();
		this.clearValue();
		this.up('form' ).activeRecord.set('contoller',null );
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
listeners:{  select: function ( combo, records, eOpts ) {combo.up('form' ).activeRecord.set('contoller', records[0].get('id'));}  },
store: cmbstore_iu_crole,
valueField:     'brief',
displayField:   'brief',
typeAhead: true,
emptyText:      '',
name:   'contoller_grid',
itemId:   'contoller_grid',
fieldLabel:  'Кто контролирует',
allowBlank:true
       ,labelWidth: 120
}
,
{
        minWidth: 740,
        width: 740,
        maxWidth: 740,
        x: 5, 
        y: 274, 

xtype:  'combobox',
trigger1Cls:        'x-form-clear-trigger', 
trigger2Cls:        'x-form-select-trigger', 
hideTrigger1:false, 
hideTrigger2:false, 
onTrigger1Click : function(){
		this.collapse();
		this.clearValue();
		this.up('form' ).activeRecord.set('statusonclose',null );
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
listeners:{  select: function ( combo, records, eOpts ) {combo.up('form' ).activeRecord.set('statusonclose', records[0].get('id'));}  },
store: cmbstore_iud_sn_def,
valueField:     'brief',
displayField:   'brief',
typeAhead: true,
emptyText:      '',
name:   'statusonclose_grid',
itemId:   'statusonclose_grid',
fieldLabel:  'Статус по завершению',
allowBlank:true
       ,labelWidth: 120
}
,
{
        minWidth: 740,
        width: 740,
        maxWidth: 740,
        x: 5, 
        y: 320, 

xtype:  'PVE.form.ComboGrid',
multiSelect : true,
delimiter:' ', 
         listConfig: {
            columns: [
                {
                    header:'Названия статусов',
                    dataIndex:'brief',
		            width: 200
		        }
	        ]
	    },
trigger1Cls:        'x-form-clear-trigger', 
trigger2Cls:        'x-form-select-trigger', 
hideTrigger1:false, 
hideTrigger2:false, 
onTrigger1Click : function(){
		this.collapse();
		this.clearValue();
		this.up('form' ).activeRecord.set('possiblestatuses',null );
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
listeners:{  select: function ( combo, records, eOpts ) {combo.up('form' ).activeRecord.set('possiblestatuses', combo.getValue());}  },
store: cmbstore_iud_sn_def,
valueField:     'id',
displayField:   'brief',
typeAhead: true,
emptyText:      '',
name:   'possiblestatuses_grid',
itemId:   'possiblestatuses_grid',
fieldLabel:  'Альтернативные статусы',
allowBlank:true
       ,labelWidth: 120
}
       ], width: 770,
       height: 396 
        }
,
        { 
        xtype:'panel', 
        id:'iu_statustask-1',
        title:      'Порядок исполнения',
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
store: enum_Boolean,
valueField:     'name',
displayField:   'name',
typeAhead: true,
queryMode:      'local',
emptyText:      '',
name:   'finishallowed_grid',
itemId:   'finishallowed_grid',
listeners:{  select: function ( combo, records, eOpts ) {combo.up('form' ).activeRecord.set('finishallowed', records[0].get('value'));}  },
fieldLabel:  'Завершение обязательно',
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
        y: 46, 

xtype:  'numberfield',
value:  '0',
name:   'tasksequence',
itemId:   'tasksequence',
fieldLabel:  'Последовательность исполнения',
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
        y: 92, 

xtype:          'combobox',
editable: false,
store: enum_Boolean,
valueField:     'name',
displayField:   'name',
typeAhead: true,
queryMode:      'local',
emptyText:      '',
name:   'afterall_grid',
itemId:   'afterall_grid',
listeners:{  select: function ( combo, records, eOpts ) {combo.up('form' ).activeRecord.set('afterall', records[0].get('value'));}  },
fieldLabel:  'После всех предыдущих',
labelClsExtra:'x-item-mandatory',
allowBlank:false
       ,labelWidth: 120
}
       ], width: 760,
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
            // var form_values = form.getValues(); var field_name = '';  for(field_name in form_values){active.set(field_name, form_values[field_name]);}
        	StatusDB('Сохранение данных');
            Ext.Ajax.request({
                url: rootURL+'index.php/c_iu_statustask/setRow',
                method:  'POST',
                params: { 
                    instanceid: this.instanceid
                    ,iu_statustaskid: active.get('iu_statustaskid')
                    ,name: active.get('name') 
                    ,doertype: active.get('doertype') 
                    ,duration_plan: active.get('duration_plan') 
                    ,info: active.get('info') 
                    ,contoller: active.get('contoller') 
                    ,statusonclose: active.get('statusonclose') 
                    ,possiblestatuses: active.get('possiblestatuses') 
                    ,finishallowed: active.get('finishallowed') 
                    ,tasksequence: active.get('tasksequence') 
                    ,afterall: active.get('afterall') 
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
                    if(active.get('iu_statustaskid')==''){
               			active.set('iu_statustaskid',res.data['iu_statustaskid']);
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
        if(this.activeRecord.get('iu_statustaskid')==''){
                this.activeRecord.store.reload();
        }
        this.setActiveRecord(null,null);
        this.ownerCt.close();
    }
}); // 'Ext.Define

Ext.define('EditWindow_iu_statustaskmain', {
    extend:  'Ext.window.Window',
    maxHeight: 684,
    maxWidth: 900,
    autoScroll:true,
    minWidth: 750,
    width: 800,
    minHeight:654,
    height:654,
    constrainHeader :true,
    layout:  'absolute',
    autoShow: true,
    modal: true,
    closable: false,
    closeAction: 'destroy',
    iconCls:  'icon-application_form',
    title:  'Задачи',
    items:[{
        xtype:  'f_iu_statustaskmain'
	}]
	});

Ext.define('Form_iu_state_tasklinkmain', {
extend:  'Ext.form.Panel',
alias: 'widget.f_iu_state_tasklinkmain',
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
        id:'iu_state_tasklink-0',
        layout:'absolute', 
        border:false, 
        items: [
{
        minWidth: 740,
        width: 740,
        maxWidth: 740,
        x: 5, 
        y: 0, 

xtype:  'combobox',
trigger1Cls:        'x-form-select-trigger', 
hideTrigger1:false, 
onTrigger1Click : function(){ 
		if(this.isExpanded) {
			this.collapse(); 
		}else{ 
			if(this.store.count(false)==0) this.store.load();
			this.expand();
		}
},
editable: false,
listeners:{  select: function ( combo, records, eOpts ) {combo.up('form' ).activeRecord.set('doctype', records[0].get('id'));}  },
store: cmbstore_iud_doctype,
valueField:     'brief',
displayField:   'brief',
typeAhead: true,
emptyText:      '',
name:   'doctype_grid',
itemId:   'doctype_grid',
fieldLabel:  'Тип документа',
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
        y: 46, 

xtype:          'combobox',
editable: false,
store: enum_Boolean,
valueField:     'name',
displayField:   'name',
typeAhead: true,
queryMode:      'local',
emptyText:      '',
name:   'allversions_grid',
itemId:   'allversions_grid',
listeners:{  select: function ( combo, records, eOpts ) {combo.up('form' ).activeRecord.set('allversions', records[0].get('value'));}  },
fieldLabel:  'Все версии',
labelClsExtra:'x-item-mandatory',
allowBlank:false
       ,labelWidth: 120
}
       ], width: 770,
       height: 122 
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
            // var form_values = form.getValues(); var field_name = '';  for(field_name in form_values){active.set(field_name, form_values[field_name]);}
        	StatusDB('Сохранение данных');
            Ext.Ajax.request({
                url: rootURL+'index.php/c_iu_state_tasklink/setRow',
                method:  'POST',
                params: { 
                    instanceid: this.instanceid,
                    parentid: this.parentid
                    ,iu_state_tasklinkid: active.get('iu_state_tasklinkid')
                    ,doctype: active.get('doctype') 
                    ,allversions: active.get('allversions') 
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
                    if(active.get('iu_state_tasklinkid')==''){
               			active.set('iu_state_tasklinkid',res.data['iu_state_tasklinkid']);
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
        if(this.activeRecord.get('iu_state_tasklinkid')==''){
                this.activeRecord.store.reload();
        }
        this.setActiveRecord(null,null);
        this.ownerCt.close();
    }
}); // 'Ext.Define

Ext.define('EditWindow_iu_state_tasklinkmain', {
    extend:  'Ext.window.Window',
    maxHeight: 227,
    maxWidth: 900,
    autoScroll:true,
    minWidth: 750,
    width: 800,
    minHeight:197,
    height:197,
    constrainHeader :true,
    layout:  'absolute',
    autoShow: true,
    modal: true,
    closable: false,
    closeAction: 'destroy',
    iconCls:  'icon-application_form',
    title:  'Ссылки к задаче',
    items:[{
        xtype:  'f_iu_state_tasklinkmain'
	}]
	});
}
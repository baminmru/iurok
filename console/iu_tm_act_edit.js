
Ext.require([
'Ext.form.*'
]);

function DefineInterface_iu_tm_act_edit(id,mystore){

var groupingFeature_iu_tm_actfile = Ext.create('Ext.grid.feature.Grouping',{
groupByText:  'Группировать по этому полю',
showGroupsText:  'Показать группировку'
});
var grid_iu_tm_actfile;
    function ChildOnDeleteConfirm(selection){
      if (selection) {
        Ext.Ajax.request({
            url:    rootURL+'index.php/c_iu_tm_actfile/deleteRow',
            method:  'POST',
    		params: { 
    				iu_tm_actfileid: selection.get('iu_tm_actfileid')
    				}
    	});
    	grid_iu_tm_actfile.store.remove(selection);
      }
    };
     function ChildOnDeleteClick(){
    if( grid_iu_tm_actfile.parentid=='{00000000-0000-0000-0000-000000000000}') {return;}
      var selection = grid_iu_tm_actfile.getView().getSelectionModel().getSelection()[0];
      if (selection) {
   	  if(CheckOperation('iu_tm.edit')!=0){
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
            caller: grid_iu_tm_actfile,
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
    if( grid_iu_tm_actfile.parentid=='{00000000-0000-0000-0000-000000000000}') {return;}
   	if(CheckOperation('iu_tm.edit')!=0){
                var edit = Ext.create('EditWindow_iu_tm_actfileedit');
                grid_iu_tm_actfile.store.insert(0, new model_iu_tm_actfile());
                record= grid_iu_tm_actfile.store.getAt(0);
                record.set('parentid',grid_iu_tm_actfile.parentid);
                edit.getComponent(0).setActiveRecord(record,grid_iu_tm_actfile.instanceid,grid_iu_tm_actfile.parentid);
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
        if( grid_iu_tm_actfile.parentid=='{00000000-0000-0000-0000-000000000000}') {return;}
            grid_iu_tm_actfile.store.load({params:{parentid: grid_iu_tm_actfile.parentid}});
    };
    function ChildOnEditClick(){
    if( grid_iu_tm_actfile.parentid=='{00000000-0000-0000-0000-000000000000}') {return;}
        var selection = grid_iu_tm_actfile.getView().getSelectionModel().getSelection()[0];
        if (selection) {
   	     if(CheckOperation('iu_tm.edit')!=0){
            var edit = Ext.create('EditWindow_iu_tm_actfileedit');
            edit.getComponent(0).setActiveRecord(selection,grid_iu_tm_actfile.instanceid,grid_iu_tm_actfile.parentid);
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
   grid_iu_tm_actfile=
    new Ext.grid.Panel({
        itemId:  'grd_iu_tm_actfile',
        minHeight: 200,
        maxHeight: 1200,
        iconCls:  'icon-grid',
        frame: true,
        parentid: '{00000000-0000-0000-0000-000000000000}',
        title: 'Файлы к акту',
        scroll:'both',
        stateful:stateFulSystem,
        stateId:  'iu_tm_actfileedit',
        store: {
        model:'model_iu_tm_actfile',
        autoLoad: false,
        autoSync: false,
        proxy: {
            type:   'ajax',
                url:   rootURL+'index.php/c_iu_tm_actfile/getRows',
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
        features: [groupingFeature_iu_tm_actfile],
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
{text: "Тип документа", width: 200, dataIndex: 'dtype_grid', sortable: true}
            ,
{ text     : 'Файл', xtype: 'templatecolumn',  align:'right',width    : 90,	sortable : false,
tpl:'<a href=\'/output_file.php?ID={theref}&ext={theref_ext}\' target=\'_blank\'>Файл</a>'}
            ,
{text: "Комментарий", width: 200, dataIndex: 'info', sortable: true}
        ],
    listeners: {
        itemdblclick: function() { 
    	    ChildOnEditClick();
        },
          itemclick: function(view , record){
         grid_iu_tm_actfile.down('#delete').setDisabled(false);
          grid_iu_tm_actfile.down('#edit').setDisabled(false);
    },
    select: function( selmodel, record,  index,  eOpts ){
        grid_iu_tm_actfile.down('#delete').setDisabled(false);
        grid_iu_tm_actfile.down('#edit').setDisabled(false);
    }, 
    selectionchange: function(selModel, selections){
    	 grid_iu_tm_actfile.down('#delete').setDisabled(selections.length === 0);
    	 grid_iu_tm_actfile.down('#edit').setDisabled(selections.length === 0);
    }
    }
    }
    );
var groupingFeature_iu_tm_act = Ext.create('Ext.grid.feature.Grouping',{
groupByText:  'Группировать по этому полю',
showGroupsText:  'Показать группировку'
});
var p1;
    function onDeleteConfirm(selection){
      if (selection) {
        Ext.Ajax.request({
            url:    rootURL+'index.php/c_iu_tm_act/deleteRow',
            method:  'POST',
    		params: { 
    				iu_tm_actid: selection.get('iu_tm_actid')
    				}
    	});
    	p1.store.remove(selection);
      }
    };
    function onDeleteClick(){
      var selection = p1.getView().getSelectionModel().getSelection()[0];
      if (selection) {
   	  if(CheckOperation('iu_tm.edit')!=0){
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
   	if(CheckOperation('iu_tm.edit')!=0){
                var edit = Ext.create('EditWindow_iu_tm_actedit');
                p1.store.insert(0, new model_iu_tm_act());
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
   	    if(CheckOperation('iu_tm.edit')!=0){
            var edit = Ext.create('EditWindow_iu_tm_actedit');
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
        features: [groupingFeature_iu_tm_act],
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
{text: "Номер акта", width: 200, dataIndex: 'aktnum', sortable: true }
            ,
{ text     : 'Файл акта', xtype: 'templatecolumn',  align:'right',width    : 90,	sortable : false,
tpl:'<a href=\'/output_file.php?ID={aktfile}&ext={aktfile_ext}\' target=\'_blank\'>Файл</a>'}
            ,
{text: "Дата оплаты", width:80, dataIndex: 'paymentdate', sortable: true}
            ,
{text: "Сумма оплаты", width:60, dataIndex: 'payment', sortable: true}
            ,
{text: "Количество уроков", width:60, dataIndex: 'quantity', sortable: true}
            ,
{text: " ", width: 200, dataIndex: 'thecomment', sortable: true }
        ]
,
	bbar:grid_iu_tm_actfile, 
    listeners: {
        resize: function ( tree, width, height, oldWidth, oldHeight, eOpts ){
        		grid_iu_tm_actfile.setHeight( height * 0.5 );
        },
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
           grid_iu_tm_actfile.instanceid=p1.instanceid;
           grid_iu_tm_actfile.parentid=record.get('iu_tm_actid');
           grid_iu_tm_actfile.store.load({params:{ parentid:record.get('iu_tm_actid')} })
        },
        selectionchange: function(selModel, selections){
        p1.down('#delete').setDisabled(selections.length === 0);
        p1.down('#edit').setDisabled(selections.length === 0);
        var selection = selections[0];
        if (selection) {
           p1.down('#grd_iu_tm_actfile').instanceid=p1.instanceid;
           p1.down('#grd_iu_tm_actfile').parentid=selection.get('iu_tm_actid');
           p1.down('#grd_iu_tm_actfile').store.load({params:{ parentid:selection.get('iu_tm_actid')} })
        }
       }
    }
    }
    );
return p1;
};
function DefineForms_iu_tm_act_edit(){


Ext.define('Form_iu_tm_actedit', {
extend:  'Ext.form.Panel',
alias: 'widget.f_iu_tm_actedit',
initComponent: function(){
    this.addEvents('create');
    Ext.apply(this,{
        activeRecord: null,
        defaultType:  'textfield',
        id:'iu_tm_act',
        x: 0, 
        fieldDefaults: {
         labelAlign:  'top' //,
        },
        items: [
        { 
        xtype:'panel', 
        id:'iu_tm_act-0',
        title:      'Акт',
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
name:   'aktnum',
itemId:   'aktnum',
fieldLabel:  'Номер акта',
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
name:   'aktfile_fu',
itemId:   'aktfile_fu',
buttonText:'Выбрать',
buttonConfig: {
    iconCls:'icon-iu_upload'
		},
fieldLabel:  'Файл акта',
allowBlank:true
       ,labelWidth: 120
}
,{
xtype:  'hidden',
name:   'aktfile',
itemId:   'aktfile',
},{
xtype:  'hidden',
name:   'aktfile_ext',
itemId:   'aktfile_ext',
}
       ], width: 760,
       height: 132 
        } //group
,
        { 
        xtype:'panel', 
        id:'iu_tm_act-1',
        title:      'Оплата',
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

xtype:  'datefield',
format:'d/m/Y',
submitFormat:'Y-m-d H:i:s',
value:  '',
name:   'paymentdate',
itemId:   'paymentdate',
fieldLabel:  'Дата оплаты',
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
name:   'payment',
itemId:   'payment',
fieldLabel:  'Сумма оплаты',
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
name:   'quantity',
itemId:   'quantity',
fieldLabel:  'Количество уроков',
labelClsExtra:'x-item-mandatory',
allowBlank:false
       ,labelWidth: 120
}
       ], width: 760,
       height: 178 
        } //group
,
        { 
        xtype:'panel', 
        id:'iu_tm_act-2',
        title:      'Примечание',
        defaultType:  'textfield',
        closable:false,
        collapsible:true,
        collapsed:true,
        titleCollapse : true,
        layout:'absolute', 
        x: 0, 
            items: [
{
        minWidth: 740,
        maxWidth: 740,
        width: 740,
        xtype: 'textarea', 
        x: 5, 
        y: 0, 
        height: 80, 

value:  '',
name:   'thecomment',
itemId:   'thecomment',
hideLabel: true,
allowBlank:true
       ,labelWidth: 120
}
       ], width: 760,
       height: 130 
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
                url: rootURL+'index.php/c_iu_tm_act/setRow',
                method:  'POST',
                params: { 
                    instanceid: this.instanceid
                    ,iu_tm_actid: active.get('iu_tm_actid')
                    ,aktnum: active.get('aktnum') 
                    ,aktfile: active.get('aktfile') 
                    ,paymentdate:function() { if(active.get('paymentdate')) return active.get('paymentdate').toLocaleFormat('%Y-%m-%d %H:%M:%S'); else return null;}()
                    ,payment: active.get('payment') 
                    ,quantity: active.get('quantity') 
                    ,thecomment: active.get('thecomment') 
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
                    if(active.get('iu_tm_actid')==''){
               			active.set('iu_tm_actid',res.data['iu_tm_actid']);
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
        if(this.activeRecord.get('iu_tm_actid')==''){
                this.activeRecord.store.reload();
        }
        this.setActiveRecord(null,null);
        this.ownerCt.close();
    }
}); // 'Ext.Define

Ext.define('EditWindow_iu_tm_actedit', {
    extend:  'Ext.window.Window',
    maxHeight: 555,
    maxWidth: 900,
    autoScroll:true,
    minWidth: 750,
    width: 800,
    minHeight:525,
    height:525,
    constrainHeader :true,
    layout:  'absolute',
    autoShow: true,
    modal: true,
    closable: false,
    closeAction: 'destroy',
    iconCls:  'icon-application_form',
    title:  'Акты',
    items:[{
        xtype:  'f_iu_tm_actedit'
	}]
	});

Ext.define('Form_iu_tm_actfileedit', {
extend:  'Ext.form.Panel',
alias: 'widget.f_iu_tm_actfileedit',
initComponent: function(){
    this.addEvents('create');
    Ext.apply(this,{
        activeRecord: null,
        defaultType:  'textfield',
        id:'iu_tm_actfile',
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
        id:'iu_tm_actfile-0',
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
listeners:{  select: function ( combo, records, eOpts ) {combo.up('form' ).activeRecord.set('dtype', records[0].get('id'));}  },
store: cmbstore_iud_adt_doc,
valueField:     'brief',
displayField:   'brief',
typeAhead: true,
emptyText:      '',
name:   'dtype_grid',
itemId:   'dtype_grid',
fieldLabel:  'Тип документа',
labelClsExtra:'x-item-mandatory',
allowBlank:false
       ,labelWidth: 120
}
       ], width: 770,
       height: 76 
        }
,
        { 
        xtype:'panel', 
        id:'iu_tm_actfile-1',
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

xtype:  'filefield',
name:   'theref_fu',
itemId:   'theref_fu',
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
name:   'theref',
itemId:   'theref',
},{
xtype:  'hidden',
name:   'theref_ext',
itemId:   'theref_ext',
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
name:   'info',
itemId:   'info',
fieldLabel:  'Комментарий',
allowBlank:true
       ,labelWidth: 120
}
       ], width: 760,
       height: 132 
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
                url: rootURL+'index.php/c_iu_tm_actfile/setRow',
                method:  'POST',
                params: { 
                    instanceid: this.instanceid,
                    parentid: this.parentid
                    ,iu_tm_actfileid: active.get('iu_tm_actfileid')
                    ,dtype: active.get('dtype') 
                    ,theref: active.get('theref') 
                    ,info: active.get('info') 
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
                    if(active.get('iu_tm_actfileid')==''){
               			active.set('iu_tm_actfileid',res.data['iu_tm_actfileid']);
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
        if(this.activeRecord.get('iu_tm_actfileid')==''){
                this.activeRecord.store.reload();
        }
        this.setActiveRecord(null,null);
        this.ownerCt.close();
    }
}); // 'Ext.Define

Ext.define('EditWindow_iu_tm_actfileedit', {
    extend:  'Ext.window.Window',
    maxHeight: 318,
    maxWidth: 900,
    autoScroll:true,
    minWidth: 750,
    width: 800,
    minHeight:288,
    height:288,
    constrainHeader :true,
    layout:  'absolute',
    autoShow: true,
    modal: true,
    closable: false,
    closeAction: 'destroy',
    iconCls:  'icon-application_form',
    title:  'Файлы к акту',
    items:[{
        xtype:  'f_iu_tm_actfileedit'
	}]
	});
}
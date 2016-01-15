
Ext.require([
'Ext.form.*'
]);

function DefineInterface_iu_tm_dog_read(id,mystore){

var groupingFeature_iu_tm_acts = Ext.create('Ext.grid.feature.Grouping',{
groupByText:  'Группировать по этому полю',
showGroupsText:  'Показать группировку'
});
var grid_iu_tm_acts;
    function ChildOnDeleteConfirm(selection){
      if (selection) {
        Ext.Ajax.request({
            url:    rootURL+'index.php/c_iu_tm_acts/deleteRow',
            method:  'POST',
    		params: { 
    				iu_tm_actsid: selection.get('iu_tm_actsid')
    				}
    	});
    	grid_iu_tm_acts.store.remove(selection);
      }
    };
     function ChildOnDeleteClick(){
      var selection = grid_iu_tm_acts.getView().getSelectionModel().getSelection()[0];
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
            caller: grid_iu_tm_acts,
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
   	if(CheckOperation('iu_tm.edit')!=0){
                var edit = Ext.create('EditWindow_iu_tm_actsread');
                grid_iu_tm_acts.store.insert(0, new model_iu_tm_acts());
                record= grid_iu_tm_acts.store.getAt(0);
                record.set('parentid',grid_iu_tm_acts.parentid);
                edit.getComponent(0).setActiveRecord(record,grid_iu_tm_acts.instanceid,grid_iu_tm_acts.parentid);
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
            grid_iu_tm_acts.store.load({params:{parentid: grid_iu_tm_acts.parentid}});
    };
    function ChildOnEditClick(){
        var selection = grid_iu_tm_acts.getView().getSelectionModel().getSelection()[0];
        if (selection) {
   	     if(CheckOperation('iu_tm.edit')!=0){
            var edit = Ext.create('EditWindow_iu_tm_actsread');
            edit.getComponent(0).setActiveRecord(selection,grid_iu_tm_acts.instanceid,grid_iu_tm_acts.parentid);
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
   grid_iu_tm_acts=
    new Ext.grid.Panel({
        itemId:  'grd_iu_tm_acts',
        maxHeight: 350,
        minHeight: 250,
        iconCls:  'icon-grid',
        frame: true,
        parentid: '',
        title: 'Акты',
        scroll:'both',
        store: {
        model:'model_iu_tm_acts',
        autoLoad: false,
        autoSync: false,
        proxy: {
            type:   'ajax',
                url:   rootURL+'index.php/c_iu_tm_acts/getRows',
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
        features: [groupingFeature_iu_tm_acts],
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
{text: "Номер акта", width: 200, dataIndex: 'aktnum', sortable: true}
            ,
{ text     : 'Акт', xtype: 'templatecolumn',  align:'right',width    : 90,	sortable : false,
tpl:'<a href=\'/output_file.php?ID={aktfile}&ext={aktfile_ext}\' target=\'_blank\'>Файл</a>'}
            ,
{text: "Количество уроков", width:60, dataIndex: 'quantity', sortable: true}
            ,
{text: "Сумма оплаты", width:60, dataIndex: 'payment', sortable: true}
            ,
{text: "Дата оплаты", width:90, dataIndex: 'paymentdate', sortable: true, xtype: 'datecolumn',   format:'Y-m-d'}
            ,
{ text     : 'Служебная записка', xtype: 'templatecolumn',  align:'right',width    : 90,	sortable : false,
tpl:'<a href=\'/output_file.php?ID={msgfile}&ext={msgfile_ext}\' target=\'_blank\'>Файл</a>'}
            ,
{ text     : 'Документ об оплате', xtype: 'templatecolumn',  align:'right',width    : 90,	sortable : false,
tpl:'<a href=\'/output_file.php?ID={paymentfile}&ext={paymentfile_ext}\' target=\'_blank\'>Файл</a>'}
            ,
{ text     : 'Авансовый отчет', xtype: 'templatecolumn',  align:'right',width    : 90,	sortable : false,
tpl:'<a href=\'/output_file.php?ID={avancefile}&ext={avancefile_ext}\' target=\'_blank\'>Файл</a>'}
            ,
{text: " ", width: 200, dataIndex: 'thecomment', sortable: true}
        ],
    listeners: {
        itemdblclick: function() { 
    	    ChildOnEditClick();
        },
          itemclick: function(view , record){
         grid_iu_tm_acts.down('#delete').setDisabled(false);
          grid_iu_tm_acts.down('#edit').setDisabled(false);
    },
    select: function( selmodel, record,  index,  eOpts ){
        grid_iu_tm_acts.down('#delete').setDisabled(false);
        grid_iu_tm_acts.down('#edit').setDisabled(false);
    }, 
    selectionchange: function(selModel, selections){
    	 grid_iu_tm_acts.down('#delete').setDisabled(selections.length === 0);
    	 grid_iu_tm_acts.down('#edit').setDisabled(selections.length === 0);
    }
    }
    }
    );
var groupingFeature_iu_tm_dog = Ext.create('Ext.grid.feature.Grouping',{
groupByText:  'Группировать по этому полю',
showGroupsText:  'Показать группировку'
});
var p1;
    function onDeleteConfirm(selection){
      if (selection) {
        Ext.Ajax.request({
            url:    rootURL+'index.php/c_iu_tm_dog/deleteRow',
            method:  'POST',
    		params: { 
    				iu_tm_dogid: selection.get('iu_tm_dogid')
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
                var edit = Ext.create('EditWindow_iu_tm_dogread');
                p1.store.insert(0, new model_iu_tm_dog());
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
            var edit = Ext.create('EditWindow_iu_tm_dogread');
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
        features: [groupingFeature_iu_tm_dog],
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
{text: "Дата договора", width:80, dataIndex: 'thedate', sortable: true}
            ,
{text: "Номер договора", width: 200, dataIndex: 'thenumber', sortable: true }
            ,
{ text     : 'Файл договора', xtype: 'templatecolumn',  align:'right',width    : 90,	sortable : false,
tpl:'<a href=\'/output_file.php?ID={dogfile}&ext={dogfile_ext}\' target=\'_blank\'>Файл</a>'}
            ,
{text: "Примечание", width: 200, dataIndex: 'info', sortable: true }
        ]
,
	bbar:grid_iu_tm_acts, 
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
           grid_iu_tm_acts.instanceid=p1.instanceid;
           grid_iu_tm_acts.parentid=record.get('iu_tm_dogid');
           grid_iu_tm_acts.store.load({params:{ parentid:record.get('iu_tm_dogid')} })
        },
        selectionchange: function(selModel, selections){
        p1.down('#delete').setDisabled(selections.length === 0);
        p1.down('#edit').setDisabled(selections.length === 0);
        var selection = selections[0];
        if (selection) {
           p1.down('#grd_iu_tm_acts').instanceid=p1.instanceid;
           p1.down('#grd_iu_tm_acts').parentid=selection.get('iu_tm_dogid');
           p1.down('#grd_iu_tm_acts').store.load({params:{ parentid:selection.get('iu_tm_dogid')} })
        }
       }
    }
    }
    );
return p1;
};
function DefineForms_iu_tm_dog_read(){


Ext.define('Form_iu_tm_dogread', {
extend:  'Ext.form.Panel',
alias: 'widget.f_iu_tm_dogread',
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
        id:'iu_tm_dog-0',
        layout:'absolute', 
        border:false, 
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
name:   'thedate',
itemId:   'thedate',
fieldLabel:  'Дата договора',
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

xtype:  'textfield',
value:  '',
name:   'thenumber',
itemId:   'thenumber',
fieldLabel:  'Номер договора',
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

xtype:  'filefield',
name:   'dogfile_fu',
itemId:   'dogfile_fu',
fieldLabel:  'Файл договора',
allowBlank:true
       ,labelWidth: 120
}
,{
xtype:  'hidden',
name:   'dogfile',
itemId:   'dogfile',
},{
xtype:  'hidden',
name:   'dogfile_ext',
itemId:   'dogfile_ext',
}
,
{
        minWidth: 740,
        x: 5, 
        y: 138, 

xtype:  'textfield',
value:  '',
name:   'info',
itemId:   'info',
fieldLabel:  'Примечание',
allowBlank:true
       ,labelWidth: 120
}
       ], width: 770,
       height: 214 
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
                url: rootURL+'index.php/c_iu_tm_dog/setRow',
                method:  'POST',
                params: { 
                    instanceid: this.instanceid
                    ,iu_tm_dogid: active.get('iu_tm_dogid')
                    ,thedate:function() { if(active.get('thedate')) return active.get('thedate').toLocaleFormat('%Y-%m-%d %H:%M:%S'); else return null;}()
                    ,thenumber: active.get('thenumber') 
                    ,dogfile: active.get('dogfile') 
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
                    if(active.get('iu_tm_dogid')==''){
               			active.set('iu_tm_dogid',res.data['iu_tm_dogid']);
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
        if(this.activeRecord.get('iu_tm_dogid')==''){
                this.activeRecord.store.reload();
        }
        this.setActiveRecord(null,null);
        this.ownerCt.close();
    }
}); // 'Ext.Define

Ext.define('EditWindow_iu_tm_dogread', {
    extend:  'Ext.window.Window',
    maxHeight: 319,
    maxWidth: 900,
    autoScroll:true,
    minWidth: 750,
    width: 800,
    minHeight:289,
    height:289,
    constrainHeader :true,
    layout:  'absolute',
    autoShow: true,
    modal: true,
    closable: false,
    closeAction: 'destroy',
    iconCls:  'icon-application_form',
    title:  'Оплата',
    items:[{
        xtype:  'f_iu_tm_dogread'
	}]
	});

Ext.define('Form_iu_tm_actsread', {
extend:  'Ext.form.Panel',
alias: 'widget.f_iu_tm_actsread',
initComponent: function(){
    this.addEvents('create');
    Ext.apply(this,{
        activeRecord: null,
        defaultType:  'textfield',
        id:'iu_tm_acts',
        x: 0, 
        fieldDefaults: {
         labelAlign:  'top' //,
        },
        items: [
        { 
        xtype:'panel', 
        id:'iu_tm_acts-0',
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
fieldLabel:  'Акт',
allowBlank:true
       ,labelWidth: 120
}
       ], width: 760,
       height: 132 
        } //group
,
        { 
        xtype:'panel', 
        id:'iu_tm_acts-1',
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

xtype:  'numberfield',
value:  '0',
name:   'quantity',
itemId:   'quantity',
fieldLabel:  'Количество уроков',
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
       ], width: 760,
       height: 178 
        } //group
,
        { 
        xtype:'panel', 
        id:'iu_tm_acts-2',
        title:      'Файлы',
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
        width: 740,
        maxWidth: 740,
        x: 5, 
        y: 0, 

xtype:  'filefield',
name:   'msgfile_fu',
itemId:   'msgfile_fu',
fieldLabel:  'Служебная записка',
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
name:   'paymentfile_fu',
itemId:   'paymentfile_fu',
fieldLabel:  'Документ об оплате',
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

xtype:  'filefield',
name:   'avancefile_fu',
itemId:   'avancefile_fu',
fieldLabel:  'Авансовый отчет',
allowBlank:true
       ,labelWidth: 120
}
       ], width: 760,
       height: 178 
        } //group
,
        { 
        xtype:'panel', 
        id:'iu_tm_acts-3',
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
                url: rootURL+'index.php/c_iu_tm_acts/setRow',
                method:  'POST',
                params: { 
                    instanceid: this.instanceid,
                    parentid: this.parentid
                    ,iu_tm_actsid: active.get('iu_tm_actsid')
                    ,aktnum: active.get('aktnum') 
                    ,aktfile: active.get('aktfile') 
                    ,quantity: active.get('quantity') 
                    ,payment: active.get('payment') 
                    ,paymentdate:function() { if(active.get('paymentdate')) return active.get('paymentdate').toLocaleFormat('%Y-%m-%d %H:%M:%S'); else return null;}()
                    ,msgfile: active.get('msgfile') 
                    ,paymentfile: active.get('paymentfile') 
                    ,avancefile: active.get('avancefile') 
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
                    if(active.get('iu_tm_actsid')==''){
               			active.set('iu_tm_actsid',res.data['iu_tm_actsid']);
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
        if(this.activeRecord.get('iu_tm_actsid')==''){
                this.activeRecord.store.reload();
        }
        this.setActiveRecord(null,null);
        this.ownerCt.close();
    }
}); // 'Ext.Define

Ext.define('EditWindow_iu_tm_actsread', {
    extend:  'Ext.window.Window',
    maxHeight: 738,
    maxWidth: 900,
    autoScroll:true,
    minWidth: 750,
    width: 800,
    minHeight:670,
    height:670,
    constrainHeader :true,
    layout:  'absolute',
    autoShow: true,
    modal: true,
    closable: false,
    closeAction: 'destroy',
    iconCls:  'icon-application_form',
    title:  'Акты',
    items:[{
        xtype:  'f_iu_tm_actsread'
	}]
	});
}
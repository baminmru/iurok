
Ext.require([
'Ext.form.*'
]);

function DefineInterface_iu_urok_graph_main(id,mystore){

var groupingFeature_iu_urok_graph = Ext.create('Ext.grid.feature.Grouping',{
groupByText:  'Группировать по этому полю',
showGroupsText:  'Показать группировку'
});
var filterFeature_iu_urok_graph = {
menuFilterText:  'Фильтр',
ftype: 'filters',
local: true 
};
 var p1;
    function onDeleteConfirm(selection){
      if (selection) {
        Ext.Ajax.request({
            url:    rootURL+'index.php/c_iu_urok_graph/deleteRow',
            method:  'POST',
    		params: { 
    				iu_urok_graphid: selection.get('iu_urok_graphid')
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
                var edit = Ext.create('EditWindow_iu_urok_graphmain');
                p1.store.insert(0, new model_iu_urok_graph());
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
            var edit = Ext.create('EditWindow_iu_urok_graphmain');
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
        iconCls:  'icon-grid',
        frame: true,
        instanceid: '',
        features: [groupingFeature_iu_urok_graph,filterFeature_iu_urok_graph],
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
{text: "Состояние", width:200, dataIndex: 'thestatus_grid', sortable: true}
            ,
{text: "Номер прохода", width:60, dataIndex: 'passnumber', sortable: true}
            ,
{text: "Дата начала стадии", width:90, dataIndex: 'stagestartdate', sortable: true, xtype: 'datecolumn',   format:'Y-m-d'}
            ,
{text: "Дата завершения стадии", width:90, dataIndex: 'stageenddate', sortable: true, xtype: 'datecolumn',   format:'Y-m-d'}
            ,
{text: "Процент готовности", width:60, dataIndex: 'stagepercent', sortable: true}
            ,
{text: "Плановая дата начала", width:90, dataIndex: 'planstartdate', sortable: true, xtype: 'datecolumn',   format:'Y-m-d'}
            ,
{text: "Плановая длительность", width:60, dataIndex: 'planduration', sortable: true}
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
function DefineForms_iu_urok_graph_main(){


Ext.define('Form_iu_urok_graphmain', {
extend:  'Ext.form.Panel',
alias: 'widget.f_iu_urok_graphmain',
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
        id:'iu_urok_graph-0',
        layout:'absolute', 
        border:false, 
        items: [
{
        minWidth: 740,
        width: 740,
        maxWidth: 740,
        x: 5, 
        y: 0, 

hideTrigger: true,
editable: false,
readOnly: true,
store: cmbstore_iu_status,
valueField:     'brief',
displayField:   'brief',
typeAhead: true,
emptyText:      '',
name:   'thestatus_grid',
itemId:   'thestatus_grid',
fieldLabel:  'Состояние',
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

xtype:  'numberfield',
editable: false,
spinDownEnabled: false,
spinUpEnabled: false,
readOnly: true,
value:  '0',
name:   'passnumber',
itemId:   'passnumber',
fieldLabel:  'Номер прохода',
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

xtype:  'datefield',
format:'d/m/Y H:i:s',
submitFormat:'Y-m-d H:i:s',
hideTrigger: true,
editable: false,
readOnly: true,
value:  '',
name:   'stagestartdate',
itemId:   'stagestartdate',
fieldLabel:  'Дата начала стадии',
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

xtype:  'datefield',
format:'d/m/Y H:i:s',
submitFormat:'Y-m-d H:i:s',
hideTrigger: true,
editable: false,
readOnly: true,
value:  '',
name:   'stageenddate',
itemId:   'stageenddate',
fieldLabel:  'Дата завершения стадии',
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

xtype:  'numberfield',
editable: false,
spinDownEnabled: false,
spinUpEnabled: false,
readOnly: true,
value:  '0',
name:   'stagepercent',
itemId:   'stagepercent',
fieldLabel:  'Процент готовности',
allowBlank:true
       ,labelWidth: 120
}
,
{
        minWidth: 740,
        width: 740,
        maxWidth: 740,
        x: 5, 
        y: 230, 

xtype:  'datefield',
format:'d/m/Y',
submitFormat:'Y-m-d H:i:s',
hideTrigger: true,
editable: false,
readOnly: true,
value:  '',
name:   'planstartdate',
itemId:   'planstartdate',
fieldLabel:  'Плановая дата начала',
allowBlank:true
       ,labelWidth: 120
}
,
{
        minWidth: 740,
        width: 740,
        maxWidth: 740,
        x: 5, 
        y: 276, 

xtype:  'numberfield',
editable: false,
spinDownEnabled: false,
spinUpEnabled: false,
readOnly: true,
value:  '0',
name:   'planduration',
itemId:   'planduration',
fieldLabel:  'Плановая длительность',
allowBlank:true
       ,labelWidth: 120
}
       ], width: 770,
       height: 352 
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
            var form_values = form.getValues(); var field_name = '';  for(field_name in form_values){active.set(field_name, form_values[field_name]);}
        	StatusDB('Сохранение данных');
            Ext.Ajax.request({
                url: rootURL+'index.php/c_iu_urok_graph/setRow',
                method:  'POST',
                params: { 
                    instanceid: this.instanceid
                    ,iu_urok_graphid: active.get('iu_urok_graphid')
                    ,thestatus: active.get('thestatus') 
                    ,passnumber: active.get('passnumber') 
                    ,stagestartdate:function() { if(active.get('stagestartdate')) return active.get('stagestartdate').toLocaleFormat('%Y-%m-%d %H:%M:%S'); else return null;}()
                    ,stageenddate:function() { if(active.get('stageenddate')) return active.get('stageenddate').toLocaleFormat('%Y-%m-%d %H:%M:%S'); else return null;}()
                    ,stagepercent: active.get('stagepercent') 
                    ,planstartdate:function() { if(active.get('planstartdate')) return active.get('planstartdate').toLocaleFormat('%Y-%m-%d %H:%M:%S'); else return null;}()
                    ,planduration: active.get('planduration') 
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
                    if(active.get('iu_urok_graphid')==''){
               			active.set('iu_urok_graphid',res.data['iu_urok_graphid']);
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
        if(this.activeRecord.get('iu_urok_graphid')==''){
                this.activeRecord.store.reload();
        }
        this.setActiveRecord(null,null);
        this.ownerCt.close();
    }
}); // 'Ext.Define

Ext.define('EditWindow_iu_urok_graphmain', {
    extend:  'Ext.window.Window',
    maxHeight: 457,
    maxWidth: 900,
    autoScroll:true,
    minWidth: 750,
    width: 800,
    minHeight:427,
    height:427,
    constrainHeader :true,
    layout:  'absolute',
    autoShow: true,
    modal: true,
    closable: false,
    closeAction: 'destroy',
    iconCls:  'icon-application_form',
    title:  'График производства',
    items:[{
        xtype:  'f_iu_urok_graphmain'
	}]
	});
}
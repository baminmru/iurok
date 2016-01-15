
Ext.require([
'Ext.form.*'
]);

function DefineInterface_mtz2job_def_(id,mystore){

var groupingFeature_mtz2job_def = Ext.create('Ext.grid.feature.Grouping',{
groupByText:  'Группировать по этому полю',
showGroupsText:  'Показать группировку'
});
var filterFeature_mtz2job_def = {
menuFilterText:  'Фильтр',
ftype: 'filters',
local: true 
};
 var p1;
    function onDeleteConfirm(selection){
      if (selection) {
        Ext.Ajax.request({
            url:    rootURL+'index.php/c_mtz2job_def/deleteRow',
            method:  'POST',
    		params: { 
    				mtz2job_defid: selection.get('mtz2job_defid')
    				}
    	});
    	p1.store.remove(selection);
      }
    };
    function onDeleteClick(){
      var selection = p1.getView().getSelectionModel().getSelection()[0];
      if (selection) {
   	  if(CheckOperation('MTZ2JOB.edit')!=0){
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
   	if(CheckOperation('MTZ2JOB.edit')!=0){
                var edit = Ext.create('EditWindow_mtz2job_def');
                p1.store.insert(0, new model_mtz2job_def());
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
   	    if(CheckOperation('MTZ2JOB.edit')!=0){
            var edit = Ext.create('EditWindow_mtz2job_def');
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
        features: [groupingFeature_mtz2job_def,filterFeature_mtz2job_def],
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
{text: "Отложено до", width:110, dataIndex: 'eventdate', sortable: true, xtype: 'datecolumn',   format:'Y-m-d H:i:s'}
            ,
{text: "Тип события", width: 200, dataIndex: 'eventype', sortable: true}
            ,
{text: "Объект - причина события", width:200, dataIndex: 'thruobject_grid', sortable: true}
            ,
{text: "Состояние - причина", width: 200, dataIndex: 'thrustate', sortable: true}
            ,
{text: "Состояние после обработки", width: 200, dataIndex: 'nextstate', sortable: true}
            ,
{text: "Момент обработки", width:110, dataIndex: 'processdate', sortable: true, xtype: 'datecolumn',   format:'Y-m-d H:i:s'}
            ,
{text: "Обработан", width:80, dataIndex: 'processed_grid', sortable: true}
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
function DefineForms_mtz2job_def_(){


Ext.define('Form_mtz2job_def', {
extend:  'Ext.form.Panel',
alias: 'widget.f_mtz2job_def',
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
        id:'mtz2job_def-0',
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
format:'d/m/Y H:i:s',
submitFormat:'Y-m-d H:i:s',
value:  '',
name:   'eventdate',
itemId:   'eventdate',
fieldLabel:  'Отложено до',
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

xtype:  'textfield',
value:  '',
name:   'eventype',
itemId:   'eventype',
fieldLabel:  'Тип события',
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

xtype:  'trigger',
editable: false,
 onTriggerClick: function() {
 alert('ref : object');
},
name:   'thruobject_grid',
itemId:   'thruobject_grid',
fieldLabel:  'Объект - причина события',
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
        y: 138, 

xtype:  'textfield',
value:  '',
name:   'thrustate',
itemId:   'thrustate',
fieldLabel:  'Состояние - причина',
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

xtype:  'textfield',
value:  '',
name:   'nextstate',
itemId:   'nextstate',
fieldLabel:  'Состояние после обработки',
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
format:'d/m/Y H:i:s',
submitFormat:'Y-m-d H:i:s',
value:  '',
name:   'processdate',
itemId:   'processdate',
fieldLabel:  'Момент обработки',
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

xtype:          'checkboxfield',
listeners:{
    change:function( cb, newValue, oldValue, eOpts ){
		if(newValue){
		    cb.up('form' ).activeRecord.set('processed',-1 );
		    cb.up('form' ).activeRecord.set('processed_grid','да' );
		}else{
		    cb.up('form' ).activeRecord.set('processed',0 );
		    cb.up('form' ).activeRecord.set('processed_grid','нет' );
		}
    }
},
uncheckedValue: 0,
inputValue:    -1,
name:   'processed',
itemId:   'processed',
fieldLabel:  'Обработан',
labelSeparator:'',
labelClsExtra:'x-item-mandatory',
allowBlank:false
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
            // var form_values = form.getValues(); var field_name = '';  for(field_name in form_values){active.set(field_name, form_values[field_name]);}
        	StatusDB('Сохранение данных');
            Ext.Ajax.request({
                url: rootURL+'index.php/c_mtz2job_def/setRow',
                method:  'POST',
                params: { 
                    instanceid: this.instanceid
                    ,mtz2job_defid: active.get('mtz2job_defid')
                    ,eventdate:function() { if(active.get('eventdate')) return active.get('eventdate').toLocaleFormat('%Y-%m-%d %H:%M:%S'); else return null;}()
                    ,eventype: active.get('eventype') 
                    ,thruobject: active.get('thruobject') 
                    ,thrustate: active.get('thrustate') 
                    ,nextstate: active.get('nextstate') 
                    ,processdate:function() { if(active.get('processdate')) return active.get('processdate').toLocaleFormat('%Y-%m-%d %H:%M:%S'); else return null;}()
                    ,processed: active.get('processed') 
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
                    if(active.get('mtz2job_defid')==''){
               			active.set('mtz2job_defid',res.data['mtz2job_defid']);
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
        if(this.activeRecord.get('mtz2job_defid')==''){
                this.activeRecord.store.reload();
        }
        this.setActiveRecord(null,null);
        this.ownerCt.close();
    }
}); // 'Ext.Define

Ext.define('EditWindow_mtz2job_def', {
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
    title:  'Отложенное событие',
    items:[{
        xtype:  'f_mtz2job_def'
	}]
	});
}
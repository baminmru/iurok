
Ext.require([
'Ext.form.*'
]);

function DefineInterface_iu_rcfg_docmode_edit(id,mystore){

var groupingFeature_iu_rcfg_docmode = Ext.create('Ext.grid.feature.Grouping',{
groupByText:  'Группировать по этому полю',
showGroupsText:  'Показать группировку'
});
var filterFeature_iu_rcfg_docmode = {
menuFilterText:  'Фильтр',
ftype: 'filters',
local: true 
};
 var p1;
    function onDeleteConfirm(selection){
      if (selection) {
        Ext.Ajax.request({
            url:    rootURL+'index.php/c_iu_rcfg_docmode/deleteRow',
            method:  'POST',
    		params: { 
    				iu_rcfg_docmodeid: selection.get('iu_rcfg_docmodeid')
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
                var edit = Ext.create('EditWindow_iu_rcfg_docmodeedit');
                p1.store.insert(0, new model_iu_rcfg_docmode());
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
            var edit = Ext.create('EditWindow_iu_rcfg_docmodeedit');
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
       stateId:  'iu_rcfg_docmodeedit',
        iconCls:  'icon-grid',
        frame: true,
        instanceid: '',
        features: [groupingFeature_iu_rcfg_docmode,filterFeature_iu_rcfg_docmode],
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
{text: "Тип документа", width:200, dataIndex: 'the_document_grid', sortable: true}
            ,
{text: "Режим для  создания", width: 200, dataIndex: 'addmode', sortable: true}
            ,
{text: "Режим для редактирования", width: 200, dataIndex: 'editmode', sortable: true}
            ,
{text: "Можно создавать", width:80, dataIndex: 'allowadd_grid', sortable: true}
            ,
{text: "Можно удалять", width:80, dataIndex: 'allowdelete_grid', sortable: true}
            ,
{text: "Можно  делегировать", width:80, dataIndex: 'allowdelegate_grid', sortable: true}
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

	Ext.define('model_docmodelist',{
            extend:'Ext.data.Model',
        fields: [
			 {name: 'name',type: 'string'}
         	,{name: 'thecomment', type: 'string'}
			
        ],
		idProperty:'name'
    });

	

function DefineForms_iu_rcfg_docmode_edit(){

var objtype;

var store_docmodes = Ext.create('Ext.data.Store', {
        model:'model_docmodelist',
        autoLoad: false,
        autoSync: false,
        proxy: {
            type:   'ajax',
                url:   rootURL+'index.php/app/getDocMode',
            reader: {
                type:   'json'
                ,root:  'data'
                ,successProperty:  'success'
                ,messageProperty:  'msg'
                }
        }
    });

Ext.define('Form_iu_rcfg_docmodeedit', {
extend:  'Ext.form.Panel',
alias: 'widget.f_iu_rcfg_docmodeedit',
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
        id:'iu_rcfg_docmode-0',
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
hideTrigger: true,
editable: false,
readOnly: true,
store: cmbstore_objecttype,
valueField:     'brief',
displayField:   'brief',
typeAhead: true,
emptyText:      '',
name:   'the_document_grid',
itemId:   'the_document_grid',
fieldLabel:  'Тип документа',
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
editable:false,
xtype:  'combobox',
store: store_docmodes,
valueField:     'name',
displayField:   'thecomment',
name:   'addmode',
itemId:   'addmode',
fieldLabel:  'Режим для  создания',
allowBlank:true
,queryMode:'local'
       ,labelWidth: 120
	   ,listeners:{
				    expand: function()   
					{ 
						//store_docmodes.load({params:{id:objtype}}); 
					}
	   }
	   	
}
,
{
        minWidth: 740,
        width: 740,
        maxWidth: 740,
        x: 5, 
        y: 92, 
editable:false,
xtype:  'combobox',
store: store_docmodes,
valueField:     'name',
displayField:   'thecomment',
name:   'editmode',
itemId:   'editmode',
fieldLabel:  'Режим для редактирования',
allowBlank:true
,queryMode:'local'
       ,labelWidth: 120
	   	   ,listeners:{
				    expand: function()   
					{ 
						//store_docmodes.load({params:{id:objtype}}); 
					}
	   }
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
store: enum_Boolean,
valueField:     'name',
displayField:   'name',
typeAhead: true,
queryMode:      'local',
emptyText:      '',
name:   'allowadd_grid',
itemId:   'allowadd_grid',
listeners:{  select: function ( combo, records, eOpts ) {combo.up('form' ).activeRecord.set('allowadd', records[0].get('value'));}  },
fieldLabel:  'Можно создавать',
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
        y: 184, 

xtype:          'combobox',
editable: false,
store: enum_Boolean,
valueField:     'name',
displayField:   'name',
typeAhead: true,
queryMode:      'local',
emptyText:      '',
name:   'allowdelete_grid',
itemId:   'allowdelete_grid',
listeners:{  select: function ( combo, records, eOpts ) {combo.up('form' ).activeRecord.set('allowdelete', records[0].get('value'));}  },
fieldLabel:  'Можно удалять',
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
        y: 230, 

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
name:   'allowdelegate_grid',
itemId:   'allowdelegate_grid',
listeners:{  select: function ( combo, records, eOpts ) {combo.up('form' ).activeRecord.set('allowdelegate', records[0].get('value'));}  },
fieldLabel:  'Можно  делегировать',
allowBlank:true
       ,labelWidth: 120
}
       ], width: 770,
       height: 306 
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
			objtype=record.get('the_document')
            this.getForm().loadRecord(record);
			store_docmodes.load({params:{id:objtype}}); 
			
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
                url: rootURL+'index.php/c_iu_rcfg_docmode/setRow',
                method:  'POST',
                params: { 
                    instanceid: this.instanceid
                    ,iu_rcfg_docmodeid: active.get('iu_rcfg_docmodeid')
                    ,the_document: active.get('the_document') 
                    ,addmode: active.get('addmode') 
                    ,editmode: active.get('editmode') 
                    ,allowadd: active.get('allowadd') 
                    ,allowdelete: active.get('allowdelete') 
                    ,allowdelegate: active.get('allowdelegate') 
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
                    if(active.get('iu_rcfg_docmodeid')==''){
               			active.set('iu_rcfg_docmodeid',res.data['iu_rcfg_docmodeid']);
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
        if(this.activeRecord.get('iu_rcfg_docmodeid')==''){
                this.activeRecord.store.reload();
        }
        this.setActiveRecord(null,null);
        this.ownerCt.close();
    }
}); // 'Ext.Define

Ext.define('EditWindow_iu_rcfg_docmodeedit', {
    extend:  'Ext.window.Window',
    maxHeight: 411,
    maxWidth: 900,
    autoScroll:true,
    minWidth: 750,
    width: 800,
    minHeight:381,
    height:381,
    constrainHeader :true,
    layout:  'absolute',
    autoShow: true,
    modal: true,
    closable: false,
    closeAction: 'destroy',
    iconCls:  'icon-application_form',
    title:  'Режим документа',
    items:[{
        xtype:  'f_iu_rcfg_docmodeedit'
	}]
	});
}
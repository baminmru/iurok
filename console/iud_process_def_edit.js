﻿
Ext.require([
'Ext.form.*'
]);


/////////////////////////////  forms //////////////////////////
Ext.define('Form_process_copy', 
	{
		extend:  'Ext.form.Panel',
		alias: 'widget.f_process_copy',
		defaultType:'textfield',
		layout:'absolute',
		initComponent:function () 
			{
				this.addEvents('create');
				Ext.apply(this, 
					{
						items:[
							
						
							{
								/* flex_field */ 
								minWidth: 720,
								width: 720,
								maxWidth: 720,
								x: 5, 
								y: 5, 
								labelWidth:140,

								xtype:  'combobox',
								trigger1Cls:        'x-form-clear-trigger', 
								trigger2Cls:        'x-form-select-trigger', 
								hideTrigger1:true, 
								hideTrigger2:false, 
								onTrigger1Click : function(){
										this.collapse();
										this.clearValue();
										this.up('form' ).activeRecord.set('doer_states',null );
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
								store: cmbstore_iud_process_def,
								valueField:     'id',
								displayField:   'brief',
								typeAhead: true,
								emptyText:      '',
								name:   'fromprocess',
								itemId:   'fromprocess',
								fieldLabel:  'Копировать из',
								allowBlank:false
							}
							,
							{
								/* flex_field */ 
								minWidth: 720,
								width: 720,
								maxWidth: 720,
								x: 5, 
								y:40, 
								labelWidth:140,

								xtype:  'combobox',
								trigger1Cls:        'x-form-clear-trigger', 
								trigger2Cls:        'x-form-select-trigger', 
								hideTrigger1:true, 
								hideTrigger2:false, 
								onTrigger1Click : function(){
										this.collapse();
										this.clearValue();
										this.up('form' ).activeRecord.set('doer_states',null );
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
								store: cmbstore_iud_process_def,
								valueField:     'id',
								displayField:   'brief',
								typeAhead: true,
								emptyText:      '',
								name:   'toprocess',
								itemId:   'toprocess',
								fieldLabel:  'Копировать в',
								allowBlank:false
							}
					],
		   
						dockedItems: 
						[
							{
							xtype:  'toolbar',
							dock:   'bottom',
							ui:     'footer',
							items: ['->', 
								{
									iconCls:  'icon-accept',
									itemId:  'save',
									text:   'Скопировать',
									disabled: false,
									scope:  this,
									handler:function()
									{
										var form = this.getForm();
										if(form.isValid()){
											
											form.submit(
												{
													url: 'index.php/wf/CopyProcess',
													waitMsg: 'Сохранение...',
													success: function(f,response){
														var text = response.result.msg;
														//var res =Ext.decode(text);
														if(text=="ok"){
															Ext.MessageBox.show({
															title:  'Подтверждение',
															msg:    'Задача завершена',
															buttons: Ext.MessageBox.OK,
															icon:   Ext.MessageBox.INFO
															});
															var wn = this.form.owner.ownerCt;
															wn.close();
														
														}else{
															Ext.MessageBox.show({
																title:  'Ошибка',
																msg:    text,
																buttons: Ext.MessageBox.OK,
																icon:   Ext.MessageBox.ERROR
															});
														}
													}
													,
													failure: function(f,response) {
														var text = response.result.msg;
														Ext.MessageBox.show({
														title:  'Ошибка',
														msg:    text,
														buttons: Ext.MessageBox.OK,
														icon:   Ext.MessageBox.ERROR
														});
													}

												}
											);
										}
									}
								}, 
								{
									iconCls:  'icon-cancel',
									text:   'Закрыть',
									scope:  this,
									handler : this.onReset
								}
							]
							}
						] // dockedItems
					}
				); //Ext.apply
				this.callParent();
			}, //initComponent 
	   
		onReset: function()
			{
				 this.ownerCt.close();
			}
	}
); // 'Ext.Define

Ext.define('EditWindow_process_copy',{
    extend:  'Ext.window.Window',
    height: 170,
    width: 780,
    layout:  'fit',
    autoShow: true,
    modal: true,
    closeAction: 'destroy',
    iconCls:  'icon-database_copy',
    title:  'Копирование подэтапов',
    items:[
		{
			xtype:'f_process_copy'
		}
	]
	}
);



//////////////////////////// end forms ///////////////////////



function DefineInterface_iud_process_def_edit(id,mystore){

var groupingFeature_iud_process_def = Ext.create('Ext.grid.feature.Grouping',{
groupByText:  'Группировать по этому полю',
showGroupsText:  'Показать группировку'
});
var filterFeature_iud_process_def = {
menuFilterText:  'Фильтр',
ftype: 'filters',
local: true 
};
 var p1;
    function onDeleteConfirm(selection){
      if (selection) {
        Ext.Ajax.request({
            url:    rootURL+'index.php/c_iud_process_def/deleteRow',
            method:  'POST',
    		params: { 
    				iud_process_defid: selection.get('iud_process_defid')
    				}
    	});
    	p1.store.remove(selection);
      }
    };
    function onDeleteClick(){
      var selection = p1.getView().getSelectionModel().getSelection()[0];
      if (selection) {
   	  if(CheckOperation('iud_process.edit')!=0){
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
	
	
	  function onCleanConfirm(selection){
      if (selection) {
        Ext.Ajax.request({
            url:    rootURL+'index.php/wf/CleanProcess',
            method:  'POST',
    		params: { 
    				processid: selection.get('iud_process_defid')
    				}
    	});
      }
    };
	
	 function onCleanClick(){
      var selection = p1.getView().getSelectionModel().getSelection()[0];
      if (selection) {
   	  if(CheckOperation('iu_status.edit')!=0){
        Ext.Msg.show({
            title:  'Удаление подэтапов процесса',
            msg:    'Удалить описания всех подэтапов для текущего процесса?',
        	buttons: Ext.Msg.YESNO,
        	icon:   Ext.MessageBox.QUESTION,
        	fn: function(btn,text,opt){
        		if(btn=='yes'){
        			onCleanConfirm(opt.selectedRow);
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
   	if(CheckOperation('iud_process.edit')!=0){
                var edit = Ext.create('EditWindow_iud_process_defedit');
                p1.store.insert(0, new model_iud_process_def());
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
	
	function onCopyClick(){
           var edit = Ext.create('EditWindow_process_copy');
						edit.show();
    };
    function onEditClick(){
        var selection = p1.getView().getSelectionModel().getSelection()[0];
        if (selection) {
   	    if(CheckOperation('iud_process.edit')!=0){
            var edit = Ext.create('EditWindow_iud_process_defedit');
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
		stateful: stateFulSystem,
		stateId: 'iud_process_def',
        width:600,
        header:false,
        layout:'fit',
        scroll:'both',
        iconCls:  'icon-grid',
        frame: true,
        instanceid: '',
        features: [groupingFeature_iud_process_def,filterFeature_iud_process_def],
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
                }, {
                    iconCls:  'icon-database_copy',
                    text:   'Копировать подэтапы',
                    itemId:  'copy',
                    scope:  this,
                    handler : onCopyClick
                }, {
                    iconCls:  'icon-database_delete',
                    text:   'Удалить подэтапы',
                    itemId:  'clean',
					disabled: true,
                    scope:  this,
                    handler : onCleanClick
                }]
            }],
        columns: [
{text: "Название", width: 200, dataIndex: 'name', sortable: true}
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
    p1.down('#clean').setDisabled(false);
		
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
function DefineForms_iud_process_def_edit(){


Ext.define('Form_iud_process_defedit', {
extend:  'Ext.form.Panel',
alias: 'widget.f_iud_process_defedit',
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
        id:'iud_process_def-0',
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
name:   'name',
itemId:   'name',
fieldLabel:  'Название',
labelClsExtra:'x-item-mandatory',
allowBlank:false
       ,labelWidth: 120
}
       ], width: 770,
       height: 76 
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
                url: rootURL+'index.php/c_iud_process_def/setRow',
                method:  'POST',
                params: { 
                    instanceid: this.instanceid
                    ,iud_process_defid: active.get('iud_process_defid')
                    ,name: active.get('name') 
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
                    if(active.get('iud_process_defid')==''){
               			active.set('iud_process_defid',res.data['iud_process_defid']);
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
        if(this.activeRecord.get('iud_process_defid')==''){
                this.activeRecord.store.reload();
        }
        this.setActiveRecord(null,null);
        this.ownerCt.close();
    }
}); // 'Ext.Define

Ext.define('EditWindow_iud_process_defedit', {
    extend:  'Ext.window.Window',
    maxHeight: 181,
    maxWidth: 900,
    autoScroll:true,
    minWidth: 750,
    width: 800,
    minHeight:151,
    height:151,
    constrainHeader :true,
    layout:  'absolute',
    autoShow: true,
    modal: true,
    closable: false,
    closeAction: 'destroy',
    iconCls:  'icon-application_form',
    title:  'Процесс',
    items:[{
        xtype:  'f_iud_process_defedit'
	}]
	});
}

Ext.require([
'Ext.form.*'
]);

function DefineInterface_iu_tmcadr_(id,mystore){

var groupingFeature_iu_tmcadr = Ext.create('Ext.grid.feature.Grouping',{
groupByText:  'Группировать по этому полю',
showGroupsText:  'Показать группировку'
});
var filterFeature_iu_tmcadr = {
menuFilterText:  'Фильтр',
ftype: 'filters',
local: true 
};
 var p1;
    function onDeleteConfirm(selection){
      if (selection) {
        Ext.Ajax.request({
            url:    rootURL+'index.php/c_iu_tmcadr/deleteRow',
            method:  'POST',
    		params: { 
    				iu_tmcadrid: selection.get('iu_tmcadrid')
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
   	if(CheckOperation('iu_tm.edit')!=0){
                var edit = Ext.create('EditWindow_iu_tmcadr');
                p1.store.insert(0, new model_iu_tmcadr());
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
            var edit = Ext.create('EditWindow_iu_tmcadr');
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
		stateId: 'iu_tmcadr',
        width:600,
        header:false,
        layout:'fit',
        scroll:'both',
        iconCls:  'icon-grid',
        frame: true,
        instanceid: '',
        features: [groupingFeature_iu_tmcadr,filterFeature_iu_tmcadr],
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
{ text     : 'Фото', xtype: 'templatecolumn',  align:'right',width    : 205,	sortable : false,
tpl:'<div style="width: 200px; height: 200px; overflow: hidden"><a href=\'/output_file.php?ID={photo}&ext={photo_ext}\' target=\'_blank\'><img src=\'/files/iu_files/{photo}\' style="visibility: hidden" onload="resizeImg(this,\'200px\');"></a></div>'

}
            ,
{text: "Примечание", width: 200, dataIndex: 'info', sortable: true}
            ,
{text: "Мастер-Кадр", width:80, dataIndex: 'mastercadr_grid', sortable: true}
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
function DefineForms_iu_tmcadr_(){


Ext.define('Form_iu_tmcadr', {
extend:  'Ext.form.Panel',
alias: 'widget.f_iu_tmcadr',
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
        xtype:'fieldset', 
        id:'iu_tmcadr-0',
        layout:'absolute', 
        border:false, 
        items: [
		
		
				{
					xtype:'fieldset',
					title:'Фото',
					width:470,
					height:220,
					x:0,
					y:0,
					border:true,
					layout:'absolute',
					items:[
				
						{
							
							width: 150,
							height:150,
							x: 0, 
							y: 0, 
							xtype:  'image',
							itemId:   'photo_img',
							src:'',
							listeners:{ 
								beforerender:function( fld, eOpts )
								{ 
								//var s="/files/iu_files/"+fld.up('form' ).down('#photo').getValue();
								//fld.setSrc(s);
								}  
							 }
						},		
						{
								
								width: 90,
								x: 0, 
								y: 155, 
								height:22,
								xtype:  'button',
								itemId:   'photo_btn',
								text:"Просмотр",
								iconCls:'icon-iu_preview',
								allowBlank:true,
								 handler: function() {
								    if(this.up('form' ).activeRecord.get('photo')+''==''){
										return;
									  };
								var s="/files/iu_files/"+this.up('form' ).activeRecord.get('photo');
								var params = "menubar=no,location=yes,resizable=yes,scrollbars=yes,status=yes"
								window.open(s,'_blank',params);
							}
							
					},
					{
							
							width: 90,
							
							x: 100, 
							y: 150, 
							height:35,
							xtype:  'filefield',
							buttonConfig: {
								iconCls:'icon-iu_upload'
							},
							name:   'photo_fu',
							itemId:   'photo_fu',
							buttonOnly:true,
							buttonText:"Выбрать",
							allowBlank:true
					}
					,{
						xtype:  'hidden',
						name:   'photo',
						itemId:   'photo',
						},{
						xtype:  'hidden',
						name:   'photo_ext',
						itemId:   'photo_ext',
						}
				]
			},

				,{
					minWidth: 480,
					xtype: 'textarea', 
					x: 5, 
					y: 260, 
					height: 80, 

					value:  '',
					name:   'info',
					itemId:   'info',
					fieldLabel:  'Примечание',
					allowBlank:true
						   ,labelWidth: 120
				}
				,
				{
						minWidth: 470,
						width: 470,
						maxWidth: 470,
						x: 5, 
						y: 360, 

xtype:          'combobox',
editable: false,
store: enum_Boolean,
valueField:     'name',
displayField:   'name',
typeAhead: true,
queryMode:      'local',
emptyText:      '',
name:   'mastercadr_grid',
itemId:   'mastercadr_grid',
listeners:{  select: function ( combo, records, eOpts ) {combo.up('form' ).activeRecord.set('mastercadr', records[0].get('value'));}  },
						fieldLabel:  'Мастер-Кадр',
						labelClsExtra:'x-item-mandatory',
						allowBlank:false
					   ,labelWidth: 120
				}
			], 
			width: 510,
			height: 450 
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
			var s="/files/iu_files/"+record.get('photo');
			this.down('#photo_img').setSrc(s);
		
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
            //var form_values = form.getValues(); var field_name = '';  for(field_name in form_values){active.set(field_name, form_values[field_name]);}
        	StatusDB('Сохранение данных');
            form.submit({
                url: rootURL+'index.php/c_iu_tmcadr/setRow',
                method:  'POST',
                params: { 
                    instanceid: this.instanceid
                    ,iu_tmcadrid: active.get('iu_tmcadrid')
					,mastercadr:active.get('mastercadr')
                }
                , success: function(){
        		    StatusReady('Изменения сохранены');
                active.store.load();
                form.owner.ownerCt.close();
                 }
                , failure: function(response){
        		    StatusReady('Ошибка сохранения данных');
                 }
            });   // end submit 
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
        if(this.activeRecord.get('iu_tmcadrid')==''){
                this.activeRecord.store.reload();
        }
        this.setActiveRecord(null,null);
        this.ownerCt.close();
    }
}); // 'Ext.Define

Ext.define('EditWindow_iu_tmcadr', {
    extend:  'Ext.window.Window',
    maxHeight: 550,
    maxWidth: 540,
    minHeight:500,
    minWidth: 540,
    width: 540,
    constrainHeader :true,
    layout:  'absolute',
    autoShow: true,
    modal: true,
    closable: false,
    closeAction: 'destroy',
    iconCls:  'icon-application_form',
    title:  'Мастер-кадры и костюмы',
    items:[{
        xtype:  'f_iu_tmcadr'
	}]
	});
}
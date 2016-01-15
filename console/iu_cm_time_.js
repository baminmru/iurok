
Ext.require([
'Ext.form.*'
]);





function DefineInterface_iu_cm_time_(id,mystore,myPlayer,fname){
 var LastFileName=fname;

var groupingFeature_iu_cm_time = Ext.create('Ext.grid.feature.Grouping',{
groupByText:  'Группировать по этому полю',
showGroupsText:  'Показать группировку'
});
var filterFeature_iu_cm_time = {
menuFilterText:  'Фильтр',
ftype: 'filters',
local: true ,
   filters: [
	{
        type: 'string',
        dataIndex: 'theauthor_grid'
    }, 
	{
        type: 'string',
        dataIndex: 'info'
    },{
        type: 'date',
        dataIndex: 'thedate'
    }
	]
};
 var p1;
    function onDeleteConfirm(selection){
      if (selection) {
        Ext.Ajax.request({
            url:    rootURL+'index.php/c_iu_cm_time/deleteRow',
            method:  'POST',
    		params: { 
    				iu_cm_timeid: selection.get('iu_cm_timeid')
    				}
    	});
    	p1.store.remove(selection);
      }
    };
    function onDeleteClick(){
      var selection = p1.getView().getSelectionModel().getSelection()[0];
      if (selection) {
   	  if(CheckOperation('iu_cm.edit')!=0){
	  
		if(selection.get('theauthor')==CurrentUserID()){
				
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
                title:  'Удаление',
                msg:    'Удаление чужих записей не разрешено!',
                buttons: Ext.MessageBox.OK,
               icon:   Ext.MessageBox.WARNING
        	});
		}
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
	
	
	 function onHideConfirm(selection){
      if (selection) {
        Ext.Ajax.request({
            url:    rootURL+'index.php/c_iu_cm_time/hideRow',
            method:  'POST',
    		params: { 
    				iu_cm_timeid: selection.get('iu_cm_timeid')
    				}
    	});
    	p1.store.load({params:{instanceid: p1.instanceid,curator:(CurrentUserID()==CuratorID)}});
      }
    };
    function onHideClick(){
      var selection = p1.getView().getSelectionModel().getSelection()[0];
      if (selection) {
   	  if(CheckOperation('iu_cm.edit')!=0){
	  
		if(selection.get('theauthor')==CurrentUserID() || CurrentUserID()==CuratorID ){
				
			Ext.Msg.show({
				title:  'Скрыть',
				msg:    'Скрыть комментарий ?',
				buttons: Ext.Msg.YESNO,
				icon:   Ext.MessageBox.QUESTION,
				fn: function(btn,text,opt){
					if(btn=='yes'){
						onHideConfirm(opt.selectedRow);
					}
				},
				caller: this,
				selectedRow: selection
			});
		}else{
			  Ext.MessageBox.show({
                title:  'Скрыть...',
                msg:    'Скрытие чужих записей не разрешено!',
                buttons: Ext.MessageBox.OK,
               icon:   Ext.MessageBox.WARNING
        	});
		}
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
	
	
	
    function onAddClick(){
		if(CheckOperation('iu_cm.edit')!=0){
                var edit = Ext.create('EditWindow_iu_cm_time');
                p1.store.insert(0, new model_iu_cm_time());
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
            p1.store.load({params:{instanceid: p1.instanceid,curator:(CurrentUserID()==CuratorID)}});
    };
    function onEditClick(){
        var selection = p1.getView().getSelectionModel().getSelection()[0];
        if (selection) {
   	    if(CheckOperation('iu_cm.edit')!=0){
            var edit = Ext.create('EditWindow_iu_cm_time');
            edit.getComponent(0).setActiveRecord(selection,selection.get('instanceid'));
			//if(selection.get('theauthor')!=CurrentUserID())
			//	edit.items.getAt(0).items.getAt(0).setDisabled(true);
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
	
	function onExportClick(){ 
         	var config= {title:LastFileName+' Комментарии', columns:p1.columns };
			var workbook = new Workbook(config);
			workbook.addWorksheet(p1.store, config );
			var x= workbook.render();
			window.open( 'data:application/vnd.ms-excel;base64,' + Base64.encode(x),'_blank');
     };
	 
	 
 p1=   new Ext.grid.Panel(
         {
        itemId:  id,
        store:  mystore,
        width:600,
        header:false,
        layout:'fit',
        scroll:'both',
		stateful: stateFulSystem,
		stateId: 'iu_cm_time',
        iconCls:  'icon-grid',
        frame: true,
        instanceid: '',
        features: [groupingFeature_iu_cm_time,filterFeature_iu_cm_time],
          dockedItems: [{
                xtype:  'toolbar',
                items: [
             /*   {
                    iconCls:  'icon-application_form_add',
                    text:   'Создать',
                    scope:  this,
                    handler : onAddClick
                    }, */
					{
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
                    iconCls:  'icon-status_invisible',
                    text:   'Скрыть',
                    disabled: true,
                    itemId:  'bhide',
                    scope:  this,
                    handler : onHideClick
                    },{
                    iconCls:  'icon-table_refresh',
                    text:   'Обновить',
                    itemId:  'bRefresh',
                    scope:  this,
                    handler : onRefreshClick
                }, {
                    iconCls:  'icon-page_excel',
                    text:   'Экспорт',
                    itemId:  'bExport',
                    scope:  this,
                    handler: onExportClick
                }]
            }],
			viewConfig: {
                itemId: id+'_view',
                plugins: [{
                    pluginId: id+'preview',
                    ptype: 'preview',
                    bodyField: 'info',
                    expanded: true
                }]
                
            },


	   columns: [
		{text: "Начало", width: 100, dataIndex: 'starttime', sortable: true,
				renderer:headerRenderer}
            ,
		{text: "Сообщение", width: 250, dataIndex: 'info', sortable: true, hidden:true} ,
 //renderer: function(value){var S =new String(value);  S=S.replace(new RegExp('/>','g'),'');  S=S.replace(new RegExp('<','g'),''); S=S.replace(new RegExp('>','g'),''); if(S.length >255) S=S.substr(0,255); return S;}}
 //           ,
{text: "Добавил", flex:1, dataIndex: 'theauthor_grid', sortable: true,
				renderer:headerRenderer}
          /*  ,

{text: "Тип сообщения", width:200, dataIndex: 'messagetype_grid', sortable: true}
            ,
{text: "Дата", width:90, dataIndex: 'thedate', sortable: true, xtype: 'datecolumn',   renderer:myDateRenderer}
            ,
{text: "Тайминг.Конец", width: 200, dataIndex: 'endtime', sortable: true} 
		
            , 

{text: "Проверен", width:80, dataIndex: 'ischecked_grid', sortable: true}*/
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
		  try{
			var ct=T2S(record.get('starttime'));
			myPlayer.currentTime(ct);
		 }catch(ex){
		 }
    },
    select: function( selmodel, record,  index,  eOpts ){
        p1.down('#delete').setDisabled(false);
		p1.down('#bhide').setDisabled(false);
        p1.down('#edit').setDisabled(false);
    }, 
    selectionchange: function(selModel, selections){
    	 p1.down('#delete').setDisabled(selections.length === 0);
		 p1.down('#bhide').setDisabled(selections.length === 0);
    	 p1.down('#edit').setDisabled(selections.length === 0);
		 if(selections.length === 0) return;
		 
		 var selection = selections[0];
		
		/* Ext.QuickTips.register(
			{ 
				target: p1.getEl(), text:  selection.get('info')
			}
		 );
		 */
	
    }
    }
    }
    );
	
	
	

return p1;
};
function DefineForms_iu_cm_time_(){


Ext.define('Form_iu_cm_time', {
extend:  'Ext.form.Panel',
alias: 'widget.f_iu_cm_time',
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
        id:'iu_cm_time-0',
        layout:'absolute', 
        border:false, 
        items: [
{
xtype:  'hidden',
name:   'messagetype',
fieldLabel:  'Тип сообщения'
}
,
{
        minWidth: 740,
        width: 740,
        maxWidth: 740,
        x: 5, 
        y: 0, 

xtype:  'datefield',
format:'d/m/Y H:i:s',
submitFormat:'Y-m-d H:i:s',
hideTrigger: true,
editable: false,
readOnly: true,
cls:'x-item-readonly',
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
        y: 46, 

xtype:  'combobox',
hideTrigger: true,
editable: false,
readOnly: true,
       cls:'x-item-readonly',
store: cmbstore_iu_u_def,
valueField:     'brief',
displayField:   'brief',
//typeAhead: true,
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
        y: 92, 

xtype:  'textfield',
value:  '',
name:   'starttime',
itemId:   'starttime',
fieldLabel:  'Тайминг.Начало',
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

xtype:  'textfield',
value:  '',

name:   'endtime',
itemId:   'endtime',
fieldLabel:  'Тайминг.Конец',
allowBlank:true
       ,labelWidth: 120
},
{
        minWidth: 740,
        width: 740,
        xtype: 'textarea', 
        x: 5, 
        y: 183, 
        height: 260, 
		enableSourceEdit :false,
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
xtype:  'hidden',
name:   'ischecked',
fieldLabel:  'Проверен'
}
       ], width: 770,
       height: 484 
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
		if(active.get('theauthor')!=CurrentUserID()){
					Ext.MessageBox.show({
	       		        title:  'Редактирование',
	       		        msg:    'Можно редактировать только свои комментарии',
	       		        buttons: Ext.MessageBox.OK,
	       		        icon:   Ext.MessageBox.INFO
	       	            });
						return;
		}
        if (form.isValid()) {
            form.updateRecord(active);
            // combobox patch
            var form_values = form.getValues(); var field_name = '';  for(field_name in form_values){active.set(field_name, form_values[field_name]);}
        	StatusDB('Сохранение данных');
            Ext.Ajax.request({
                url: rootURL+'index.php/c_iu_cm_time/setRow',
                method:  'POST',
                params: { 
                    instanceid: this.instanceid
                    ,iu_cm_timeid: active.get('iu_cm_timeid')
                    ,messagetype: active.get('messagetype') 
                    ,thedate:function() { if(active.get('thedate')) return active.get('thedate').toLocaleFormat('%Y-%m-%d %H:%M:%S'); else return null;}()
                    ,theauthor: active.get('theauthor') 
                    ,endtime: active.get('endtime') 
                    ,info: strip_tags(active.get('info'),allowed_tags) 
                    ,starttime: active.get('starttime') 
                    ,ischecked: active.get('ischecked') 
					,curatoronly:0
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
                    if(active.get('iu_cm_timeid')==''){
               			active.set('iu_cm_timeid',res.data['iu_cm_timeid']);
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
        if(this.activeRecord.get('iu_cm_timeid')==''){
                this.activeRecord.store.reload();
        }
        this.setActiveRecord(null,null);
        this.ownerCt.close();
    }
}); // 'Ext.Define

Ext.define('EditWindow_iu_cm_time', {
    extend:  'Ext.window.Window',
    maxHeight: 589,
    maxWidth: 900,
    autoScroll:true,
    minWidth: 750,
    width: 800,
    minHeight:559,
    height:559,
    constrainHeader :true,
    layout:  'absolute',
    autoShow: true,
    modal: true,
    closable: false,
    closeAction: 'destroy',
    iconCls:  'icon-application_form',
    title:  'Тайминг',
    items:[{
        xtype:  'f_iu_cm_time'
	}]
	});
}
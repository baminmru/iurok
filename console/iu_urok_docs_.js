
Ext.require([
'Ext.form.*'
]);

function DefineInterface_iu_urok_docs_(id,mystore){

var groupingFeature_iu_urok_docs = Ext.create('Ext.grid.feature.Grouping',{
groupByText:  'Группировать по этому полю',
showGroupsText:  'Показать группировку'
});
var filterFeature_iu_urok_docs = {
menuFilterText:  'Фильтр',
ftype: 'filters',
local: true 
};
 var p1;
    function onDeleteConfirm(selection){
      if (selection) {
        Ext.Ajax.request({
            url:    rootURL+'index.php/c_iu_urok_docs/deleteRow',
            method:  'POST',
    		params: { 
    				iu_urok_docsid: selection.get('iu_urok_docsid')
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
                var edit = Ext.create('EditWindow_iu_urok_docs');
                p1.store.insert(0, new model_iu_urok_docs());
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
            var edit = Ext.create('EditWindow_iu_urok_docs');
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
	
function refRenderer(value, metaData, record, row, col, store, gridView) 
{
    if (record.get('fileurl')!=''){
		return ('<a href="' +record.get('fileurl') +'" target="_blank"><img src ="../resources/icons/book_link.png" /></a> '+record.get('doctype_grid')+' (URL)');
	}else{
		if (record.get('fileref')!=''){
			return ('<a href="/output_file.php?ID=' +record.get('fileref') +'&ext=' +record.get('fileref_ext') +'&origname=' +record.get('origname') +'" target="_blank"><img src ="../resources/icons/book.png" /></a> '+record.get('doctype_grid')+' (Файл в СУП)');
		}else{
	  	    var S = MyhtmlEncode(record.get('filetext')); 
			return ('<a href="javascript:ShowText(\''+record.get('doctype_grid')+'\',\''+S+'\');"><img src ="../resources/icons/script.png" /></a> '+record.get('doctype_grid')+' (текст)');
		}
	}
}

 p1=   new Ext.grid.Panel(
         {
        itemId:  id,
        store:  mystore,
		stateful: stateFulSystem,
		stateId: 'iu_urok_docs',
        width:600,
        header:false,
        layout:'fit',
        scroll:'both',
        iconCls:  'icon-grid',
        frame: true,
        instanceid: '',
        features: [groupingFeature_iu_urok_docs,filterFeature_iu_urok_docs],
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
/*{text: "Тип документа", width:200, dataIndex: 'doctype_grid', sortable: true}
  ,
{ text     : 'Файл', xtype: 'templatecolumn',  align:'right',width    : 90,	sortable : false,
tpl:'<a href=\'/output_file.php?ID={fileref}&ext={fileref_ext}\' target=\'_blank\'>Файл</a>'}
            ,
{ text     : 'URL файла', xtype: 'templatecolumn',  align:'right',width    : 90,	sortable : false,
tpl:'<a href=\'{fileurl}\' target=\'_blank\'>URL файла</a>'}
          , */
{text: "Документ", width: 200, dataIndex: 'filetext', sortable: true,
 renderer:refRenderer
/* function(value){
 var S =new String(value);  S=S.replace(new RegExp('/>','g'),'');  S=S.replace(new RegExp('<','g'),''); S=S.replace(new RegExp('>','g'),''); if(S.length >255) S=S.substr(0,255); return S;
 
 }*/ }
            ,
{text: "Комментарий", width: 200, dataIndex: 'info', sortable: true}           
,
{text: "Кем добавлен", width:200, dataIndex: 'addby_grid', sortable: true}
            ,
{text: "Когда добавлен", width:120, dataIndex: 'adddate', sortable: true, xtype: 'datecolumn',   renderer:myDateRenderer}
            ,
{text: "№ версии", width:60, dataIndex: 'version', sortable: true}
 /*           ,
{text: "Активная версия", width:80, dataIndex: 'activeversion_grid', sortable: true}
            ,
{text: "Тип ссылки на файл", width:200, dataIndex: 'filereftype_grid', sortable: true} */
           
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
function DefineForms_iu_urok_docs_(){


Ext.define('Form_iu_urok_docs', {
extend:  'Ext.form.Panel',
alias: 'widget.f_iu_urok_docs',
initComponent: function(){
    this.addEvents('create');
    Ext.apply(this,{
        activeRecord: null,
        defaultType:  'textfield',
        id:'iu_urok_docs',
        x: 0, 
        fieldDefaults: {
         labelAlign:  'top' //,
        },
        items: [
        { 
        xtype:'panel', 
        id:'iu_urok_docs-0',
        title:      'Версия',
        defaultType:  'textfield',
        closable:false,
        collapsible:true,
        titleCollapse : true,
        layout:'absolute', 
        x: 0, 
            items: [
{
       
        minWidth: 370,
        width: 370,
        maxWidth: 370,
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
       ,labelWidth: 140
}
,
{
xtype:  'hidden',
name:   'addby_grid',
itemId:   'addby_grid',
fieldLabel:  'Кем добавлен'
}
,
{
xtype:  'hidden',
value:  '',
name:   'adddate',
itemId:   'adddate',
fieldLabel:  'Когда добавлен'
}
,
{
        minWidth: 370,
        width: 370,
        maxWidth: 370,
        x: 380, 
        y: 0, 

		xtype:  'numberfield',
		value:  '0',
		name:   'version',
		itemId:   'version',
		fieldLabel:  '№ версии',
		allowBlank:true,
       labelWidth: 140
}
,
{
       xtype:  'hidden',
name:   'activeversion',
itemId:   'activeversion'

}
       ], width: 760,
       height: 75 
        } //group
,
        { 
        xtype:'panel', 
        id:'iu_urok_docs-1',
        title:      'Файл',
        defaultType:  'textfield',
        closable:false,
        collapsible:true,
        titleCollapse : true,
        layout:'absolute', 
        x: 0, 
            items: [
{
      
xtype:  'hidden',
name:   'filereftype_grid',
itemId:   'filereftype_grid'
}
,
{
        minWidth: 370,
        width: 370,
        maxWidth: 370,
        x: 5, 
        y: 0, 

xtype:  'filefield',
name:   'fileref_fu',
itemId:   'fileref_fu',
fieldLabel:  'Файл',
buttonText:"Выбрать",
buttonConfig: {
			iconCls:'icon-iu_upload'
		},
allowBlank:true
       ,labelWidth: 140
}
,
{
        minWidth: 370,
        width: 370,
        maxWidth: 370,
        x: 380, 
        y: 0, 

xtype:  'textfield',
value:  '',
name:   'fileurl',
itemId:   'fileurl',
fieldLabel:  'URL файла',
allowBlank:true
       ,labelWidth: 140
}
,
{
        minWidth: 740,
        maxWidth: 740,
        width: 740,
        xtype: 'textarea', 
        x: 5, 
        y: 46, 
        height: 260, 

xtype:  'htmleditor',
name:   'filetext',
itemId:   'filetext',
fieldLabel:  'Текст документа',
allowBlank:true
       ,labelWidth: 140
}
,
{
        minWidth: 740,
        maxWidth: 740,
        width: 740,
        xtype: 'textarea', 
        x: 5, 
        y: 321, 
        height: 80, 

value:  '',
name:   'info',
itemId:   'info',
fieldLabel:  'Комментарий',
allowBlank:true
       ,labelWidth: 140
}
       ], width: 760,
       height: 446 
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
			var instanceid=this.instanceid;
        if (!active) {
            return;
        }
        if (form.isValid()) {
            form.updateRecord(active);
            // combobox patch
            var form_values = form.getValues(); var field_name = '';  for(field_name in form_values){active.set(field_name, form_values[field_name]);}
        	var newid=Math.uuid();
			var fu=new FileUploader( {
				message_error: 'Ошибка при загрузке файла', 
				uploadid: newid,
				uploadscript: '/uploader/upload.php',
				onSuccess: function(u){  
						StatusDB('Сохранение данных');
						Ext.Ajax.request({
						url: rootURL+'index.php/c_iu_urok_docs/setRow',
						method:  'POST',
						params: { 
							instanceid: instanceid
							,iu_urok_docsid: active.get('iu_urok_docsid')
							,doctype: active.get('doctype') 
							,addby: function(){ if (active.get('addby')) return active.get('addby'); else return CurrentUserID(); }()
							,adddate: function() { if(active.get('adddate')) return active.get('adddate').toLocaleFormat('%Y-%m-%d %H:%M:%S'); else return new Date().toLocaleFormat('%Y-%m-%d %H:%M:%S');}()
							,version: active.get('version') 
							,activeversion: active.get('activeversion') 
							,filereftype: active.get('filereftype') 
							,fileref: active.get('fileref')
							,fileref_ext:  active.get('fileref_ext')
							,fileurl: active.get('fileurl') 
							,filetext: active.get('filetext') 
							,info: active.get('info') 
  ,origname: active.get('origname') 
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
							if(active.get('iu_urok_docsid')==''){
								active.set('iu_urok_docsid',res.data['iu_urok_docsid']);
							}
							StatusReady('Изменения сохранены');
							form.owner.ownerCt.close();
						}
					  }
					});
				},
				
				onProgress:  function(t,p){
					 StatusReady('Загрузка файла: ' + t.file.name +' ('+p+'%)');
				},
				portion: 1024*1024*2
				});
				var files=this.down('#fileref_fu').extractFileInput( ).files;
				var fn="";
				if(files.length>0){
					fn=files[0].name;
                                        active.set('origname',fn);
					fn=fn.substr((~-fn.lastIndexOf(".") >>> 0) + 2);
					active.set('fileref',newid+'.'+ fn);
					active.set('fileref_ext',fn);
					fu.Upload(files[0],files[0].size); 
					
				}else{
					fu.options['onSuccess']();
				}
          
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
        if(this.activeRecord.get('iu_urok_docsid')==''){
                this.activeRecord.store.reload();
        }
        this.setActiveRecord(null,null);
        this.ownerCt.close();
    }
}); // 'Ext.Define

Ext.define('EditWindow_iu_urok_docs', {
    extend:  'Ext.window.Window',
    maxHeight: 780,
    maxWidth: 900,
    autoScroll:true,
    minWidth: 750,
    width: 800,
    minHeight:600,
    height:600,
    constrainHeader :true,
    layout:  'absolute',
    autoShow: true,
    modal: true,
    closable: false,
    closeAction: 'destroy',
    iconCls:  'icon-application_form',
    title:  'Материалы',
    items:[{
        xtype:  'f_iu_urok_docs'
	}]
	});
}
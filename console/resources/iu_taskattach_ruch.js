
Ext.require([
'Ext.form.*'
]);

function DefineInterface_iu_taskattach_ruch(id,mystore){

var groupingFeature_iu_taskattach = Ext.create('Ext.grid.feature.Grouping',{
groupByText:  'Группировать по этому полю',
showGroupsText:  'Показать группировку'
});
var filterFeature_iu_taskattach = {
menuFilterText:  'Фильтр',
ftype: 'filters',
local: true 
};
 var p1;
    function onDeleteConfirm(selection){
      if (selection) {
        Ext.Ajax.request({
            url:    rootURL+'index.php/c_iu_taskattach/deleteRow',
            method:  'POST',
    		params: { 
    				iu_taskattachid: selection.get('iu_taskattachid')
    				}
    	});
    	p1.store.remove(selection);
      }
    };
    function onDeleteClick(){
      var selection = p1.getView().getSelectionModel().getSelection()[0];
      if (selection) {
   	  if(CheckOperation('iu_t.edit')!=0){
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
   	if(CheckOperation('iu_t.edit')!=0){
                var edit = Ext.create('EditWindow_iu_taskattach_ruch');
                p1.store.insert(0, new model_iu_taskattach());
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
   	    if(CheckOperation('iu_t.edit')!=0){
            var edit = Ext.create('EditWindow_iu_taskattach_ruch');
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
		return ('<a href="' +record.get('fileurl') +'" target="_blank"><img src ="../resources/icons/book_link.png" /></a> '+record.get('dtype_grid')+' (URL)');
	}else{
		if (record.get('theref')!=''){
			return ('<a href="/output_file.php?ID=' +record.get('theref') +'&ext=' +record.get('theref_ext')+'&origname=' +record.get('origname') +'" target="_blank"><img src ="../resources/icons/book.png" /></a> '+record.get('dtype_grid')+' (Файл в СУП)');
		}else{
	  	    var S = MyhtmlEncode(record.get('filetext')); 
			return ('<a href="javascript:ShowText(\''+record.get('dtype_grid')+'\',\''+S+'\');"><img src ="../resources/icons/script.png" /></a> '+record.get('dtype_grid')+' (текст)');
		}
	}
}
 p1=   new Ext.grid.Panel(
         {
        itemId:  id,
        store:  mystore,
		stateful: stateFulSystem,
		stateId: 'iu_taskattach_ruch',
        width:600,
        header:false,
        layout:'fit',
        scroll:'both',
        iconCls:  'icon-grid',
        frame: true,
        instanceid: '',
        features: [groupingFeature_iu_taskattach,filterFeature_iu_taskattach],
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
{text: "Документ", width:200, dataIndex: 'dtype_grid', sortable: true,renderer:refRenderer}
           /* ,
{ text     : 'Файл', xtype: 'templatecolumn',  align:'right',width    : 90,	sortable : false,
tpl:'<a href=\'/output_file.php?ID={theref}&ext={theref_ext}\' target=\'_blank\'>Файл</a>'}
            ,
{ text     : 'URL файла', xtype: 'templatecolumn',  align:'right',width    : 90,	sortable : false,
tpl:'<a href=\'{fileurl}\' target=\'_blank\'>URL файла</a>'}
            ,
{text: "Текст документа", width: 200, dataIndex: 'filetext', sortable: true,
 renderer: function(value){var S =new String(value);  S=S.replace(new RegExp('/>','g'),'');  S=S.replace(new RegExp('<','g'),''); S=S.replace(new RegExp('>','g'),''); if(S.length >255) S=S.substr(0,255); return S;}}
           */ ,
{text: "Комментарий", width: 200, dataIndex: 'info', sortable: true}
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
function DefineForms_iu_taskattach_ruch(){


Ext.define('Form_iu_taskattach_ruch', {
extend:  'Ext.form.Panel',
alias: 'widget.f_iu_taskattach_ruch',
initComponent: function(){
    this.addEvents('create');
    Ext.apply(this,{
        activeRecord: null,
        defaultType:  'textfield',
        id:'iu_taskattach',
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
        id:'iu_taskattach-0',
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
store: cmbstore_iud_doctype,
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
        id:'iu_taskattach-1',
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
          name:   'filereftype',
          fieldLabel:  'Тип ссылки на файл'
}
,
{
        minWidth: 740,
        width: 740,
        maxWidth: 740,
        x: 5, 
        y: 0, 

xtype:  'filefield',
name:   'theref_fu',
itemId:   'theref_fu',
fieldLabel:  'Файл',
buttonText:"Выбрать",
buttonConfig: {
			iconCls:'icon-iu_upload'
		},
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
name:   'fileurl',
itemId:   'fileurl',
fieldLabel:  'URL файла',
allowBlank:true
       ,labelWidth: 120
}
,
{
        minWidth: 740,
        maxWidth: 740,
        width: 740,
        xtype: 'textarea', 
        x: 5, 
        y: 92, 
        height: 260, 

xtype:  'htmleditor',
name:   'filetext',
itemId:   'filetext',
fieldLabel:  'Текст документа',
allowBlank:true
       ,labelWidth: 120
}
,
{
        minWidth: 740,
        width: 740,
        maxWidth: 740,
        x: 5, 
        y: 362, 

xtype:  'textfield',
value:  '',
name:   'info',
itemId:   'info',
fieldLabel:  'Комментарий',
allowBlank:true
       ,labelWidth: 120
}
       ], width: 760,
       height: 448 
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
	    var instanceid=this.instanceid;
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
							url: rootURL+'index.php/c_iu_taskattach/setRow',
							method:  'POST',
							params: { 
								instanceid: instanceid
								,iu_taskattachid: active.get('iu_taskattachid')
								,dtype: active.get('dtype') 
								,filereftype: active.get('filereftype') 
								,theref: active.get('theref') 
			    ,theref_ext: active.get('theref_ext') 
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
								if(active.get('iu_taskattachid')==''){
									active.set('iu_taskattachid',res.data['iu_taskattachid']);
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
				var files=this.down('#theref_fu').extractFileInput( ).files;
				var fn="";
				if(files.length>0){
					fn=files[0].name;
active.set('origname',fn);
					fn=fn.substr((~-fn.lastIndexOf(".") >>> 0) + 2);
					active.set('theref',newid+'.'+ fn);
					active.set('theref_ext',fn);
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
        if(this.activeRecord.get('iu_taskattachid')==''){
                this.activeRecord.store.reload();
        }
        this.setActiveRecord(null,null);
        this.ownerCt.close();
    }
}); // 'Ext.Define

Ext.define('EditWindow_iu_taskattach_ruch', {
    extend:  'Ext.window.Window',
    maxHeight: 634,
    maxWidth: 900,
    autoScroll:true,
    minWidth: 750,
    width: 800,
    minHeight:604,
    height:604,
    constrainHeader :true,
    layout:  'absolute',
    autoShow: true,
    modal: true,
    closable: false,
    closeAction: 'destroy',
    iconCls:  'icon-application_form',
    title:  'Новые материалы',
    items:[{
        xtype:  'f_iu_taskattach_ruch'
	}]
	});
}
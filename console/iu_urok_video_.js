
Ext.require([
'Ext.form.*'
]);

function DefineInterface_iu_urok_video_(id,mystore){

var groupingFeature_iu_urok_video = Ext.create('Ext.grid.feature.Grouping',{
groupByText:  'Группировать по этому полю',
showGroupsText:  'Показать группировку'
});
var filterFeature_iu_urok_video = {
menuFilterText:  'Фильтр',
ftype: 'filters',
local: true 
};
 var p1;
    function onDeleteConfirm(selection){
      if (selection) {
        Ext.Ajax.request({
            url:    rootURL+'index.php/c_iu_urok_video/deleteRow',
            method:  'POST',
    		params: { 
    				iu_urok_videoid: selection.get('iu_urok_videoid')
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
                var edit = Ext.create('EditWindow_iu_urok_video');
                p1.store.insert(0, new model_iu_urok_video());
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
            var edit = Ext.create('EditWindow_iu_urok_video');
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
			return ('<a href="' +record.get('fileurl') +'" target="_blank"><img src ="../resources/icons/film_link.png" /></a> '+record.get('doctype_grid')+' (URL)');
		}else{
			if (record.get('fileref')!=''){
				return ('<a href="/output_file.php?ID=' +record.get('fileref') +'&ext=' +record.get('fileref_ext')+'&origname=' +record.get('origname') +'" target="_blank"><img src ="../resources/icons/film.png" /></a> '+record.get('doctype_grid')+' (Файл в СУП)');
			}else{
			   return record.get('doctype_grid');
			}
		}
	};
 p1=   new Ext.grid.Panel(
         {
        itemId:  id,
        store:  mystore,
		stateful: stateFulSystem,
		stateId: 'iu_urok_video',
        width:600,
        header:false,
        layout:'fit',
        scroll:'both',
        iconCls:  'icon-grid',
        frame: true,
        instanceid: '',
        features: [groupingFeature_iu_urok_video,filterFeature_iu_urok_video],
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

{text: "Тип видео", width:200, dataIndex: 'doctype_grid', sortable: true, renderer:refRenderer}
          /*  ,
{ text     : 'Файл', xtype: 'templatecolumn',  align:'right',width    : 90,	sortable : false,
tpl:'<a href=\'/output_file.php?ID={fileref}&ext={fileref_ext}\' target=\'_blank\'>Файл</a>'}
            ,
{ text     : 'URL файла', xtype: 'templatecolumn',  align:'right',width    : 90,	sortable : false,
tpl:'<a href=\'{fileurl}\' target=\'_blank\'>URL файла</a>'}
           */ ,
{text: "Комментарий", width: 200, dataIndex: 'info', sortable: true}
            ,
{text: "№ версии", width:60, dataIndex: 'version', sortable: true}
,
{text: "Кем добавлен", width:200, dataIndex: 'addby_grid', sortable: true}
            ,
{text: "Когда добавлен", width:120, dataIndex: 'adddate', sortable: true, xtype: 'datecolumn',   renderer:myDateRenderer}
 
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
function DefineForms_iu_urok_video_(){

var BreakUpload=false;
Ext.define('Form_iu_urok_video', {
extend:  'Ext.form.Panel',
alias: 'widget.f_iu_urok_video',
initComponent: function(){
    this.addEvents('create');
    Ext.apply(this,{
        activeRecord: null,
        defaultType:  'textfield',
        id:'iu_urok_video',
        x: 0, 
        fieldDefaults: {
         labelAlign:  'top' //,
        },
        items: [
        { 
        xtype:'panel', 
        id:'iu_urok_video-0',
        title:      'Версия',
        defaultType:  'textfield',
        closable:false,
        collapsible:true,
        titleCollapse : true,
        layout:'absolute', 
        x: 0,
            items: [
{

xtype:  'hidden',

name:   'adddate',
itemId:   'adddate'

}
,
{
        // flex_field
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
store: cmbstore_iud_videotype,
valueField:     'brief',
displayField:   'brief',
typeAhead: true,
emptyText:      '',
name:   'doctype_grid',
itemId:   'doctype_grid',
fieldLabel:  'Тип видео',
labelClsExtra:'x-item-mandatory',
allowBlank:false
       ,labelWidth: 120
}
,
{
    xtype:  'hidden',
	name:   'activeversion',
	itemId:   'activeversion'
}
,
{
        xtype:  'hidden',
		name:   'addby_grid',
		itemId:   'addby_grid'
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
allowBlank:true
       ,labelWidth: 120
}
       ], width: 760,
       height: 75 
        } //group
,
        { 
        xtype:'panel', 
        id:'iu_urok_video-1',
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
        width: 740,
        maxWidth: 740,
        x: 5, 
        y: 46, 

xtype:  'filefield',
name:   'fileref_fu',
itemId:   'fileref_fu',
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
        maxWidth: 740,
        width: 740,
        xtype: 'textarea', 
        x: 5, 
        y: 92, 
        height: 150, 

value:  '',
name:   'info',
itemId:   'info',
fieldLabel:  'Комментарий',
allowBlank:true
       ,labelWidth: 120
}
,
,
{
          xtype:  'hidden',
          name:   'nocomments',
          fieldLabel:  'Скрыть'
}
,
,
{
          xtype:  'hidden',
          name:   'origname',
          fieldLabel:  'Оригинальное название'
}
       ], width: 760,
       height: 288 
        }, //group

         


          ],//items = part panel
        instanceid:'',
        dockedItems: [{
            xtype:  'toolbar',
            dock:   'bottom',
            ui:     'footer',
                items: [ {

                        xtype:  'progressbar',
                        width: 350,
                        id:'pBar_video'
                    },{
                    iconCls:  'icon-stop_blue',
                    itemId:  'break_upload',
                    text:   'Прервать загрузку',
                    disabled: true,
                    scope:  this,
                    handler : this.onBreak
                }
                ,'->',
                    {
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

            this.down('#break_upload').enable();
        } else {
            this.down('#save').disable();
            this.getForm().reset();

            this.down('#break_upload').disable();
        }
    },
    onSave: function(){
		BreakUpload=false;
        var active = this.activeRecord,
            form = this.getForm();
        if (!active) {
            return;
        }
		var instanceid=this.instanceid;
        if (form.isValid()) {
            form.updateRecord(active);
            // combobox patch
            //var form_values = form.getValues(); var field_name = '';  for(field_name in form_values){active.set(field_name, form_values[field_name]);}
			var newid=Math.uuid();
			var fu=new FileUploader( {
				message_error: 'Ошибка при загрузке файла',
				uploadid: newid,
				uploadscript: '/uploader/upload.php',
				onBreak: function(u){
							Ext.MessageBox.show({
                                title:  'Загрузка прервана',
                                msg:    'Загрузка прервана пользователем',
                                buttons: Ext.MessageBox.OK,
                                icon:   Ext.MessageBox.INFO
                            });
                            StatusErr( 'Загрузка прервана пользователем');
				},
				onSuccess: function(u){  
				//StatusDB('Сохранение данных');
				Ext.Ajax.request(
					{
						url: rootURL+'index.php/c_iu_urok_video/setRow',
						method:  'POST',
						params: { 
							instanceid: instanceid
							,iu_urok_videoid: active.get('iu_urok_videoid')
							,adddate: function() { if(active.get('adddate')) return active.get('adddate').toLocaleFormat('%Y-%m-%d %H:%M:%S'); else { var cd=new Date(); return cd.toLocaleFormat('%Y-%m-%d %H:%M:%S');
							}}()
							,doctype: active.get('doctype') 
							,activeversion: active.get('activeversion') 
							,addby: function(){if(active.get('addby') ) return active.get('addby'); else return CurrentUserID(); }()
							,version: active.get('version') 
							,fileurl: active.get('fileurl') 
							,fileref: active.get('fileref') 
							,fileref_ext: active.get('fileref_ext') 
							,info: active.get('info') 
                         ,origname: active.get('origname') 
						 ,nocomments: active.get('nocomments') 
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
                            if(active.get('iu_urok_videoid')==''){
                                active.set('iu_urok_videoid',res.data['iu_urok_videoid']);
                            }
                            StatusReady('Изменения сохранены');
                            form.owner.ownerCt.close();
                        }
                    }
                    }
                );
                },
				onProgress:  function(t,p){
					StatusReady('Загрузка файла: ' + t.file.name +' ('+p+'%)');
                    var pBar_video =  Ext.getCmp('pBar_video'); 
                    pBar_video.updateProgress(p/100, Math.round(p)+'% загружено');
					if(BreakUpload) 
						return 'break';
					else
						return 'ok';
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
        if(this.activeRecord.get('iu_urok_videoid')==''){
                this.activeRecord.store.reload();
        }
        this.setActiveRecord(null,null);
        this.ownerCt.close();
    },
    onBreak: function(){
			BreakUpload=true;
            StatusReady('Отмена загрузки');

    }
}); // 'Ext.Define




Ext.define('EditWindow_iu_urok_video', {
    extend:  'Ext.window.Window',
    maxHeight: 602,
    maxWidth: 900,
    autoScroll:true,
    minWidth: 750,
    width: 800,
    minHeight:526,
    height:526,
    constrainHeader :true,
    layout:  'absolute',
    autoShow: true,
    modal: true,
    closable: false,
    closeAction: 'destroy',
    iconCls:  'icon-application_form',
    title:  'Видеоматериалы',
    items:[{
        xtype:  'f_iu_urok_video'
	}]
	});
}
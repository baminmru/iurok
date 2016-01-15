
Ext.require([
'Ext.form.*'
]);

function DefineInterface_iu_regtree_read(id,treestore_iu_regtree){

var groupingFeature_iu_regdocs = Ext.create('Ext.grid.feature.Grouping',{
groupByText:  'Группировать по этому полю',
showGroupsText:  'Показать группировку'
});
var grid_iu_regdocs;
    function ChildOnDeleteConfirm(selection){
      if (selection) {
        Ext.Ajax.request({
            url:    rootURL+'index.php/c_iu_regdocs/deleteRow',
            method:  'POST',
    		params: { 
    				iu_regdocsid: selection.get('iu_regdocsid')
    				}
    	});
    	grid_iu_regdocs.store.remove(selection);
      }
    };
     function ChildOnDeleteClick(){
    if( grid_iu_regdocs.parentid=='{00000000-0000-0000-0000-000000000000}') {return;}
      var selection = grid_iu_regdocs.getView().getSelectionModel().getSelection()[0];
      if (selection) {
   	  if(CheckOperation('iu_reg.edit')!=0){
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
            caller: grid_iu_regdocs,
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
    if( grid_iu_regdocs.parentid=='{00000000-0000-0000-0000-000000000000}') {return;}
   	if(CheckOperation('iu_reg.edit')!=0){
                var edit = Ext.create('EditWindow_iu_regdocsread');
                grid_iu_regdocs.store.insert(0, new model_iu_regdocs());
                record= grid_iu_regdocs.store.getAt(0);
                record.set('parentid',grid_iu_regdocs.parentid);
                edit.getComponent(0).setActiveRecord(record,grid_iu_regdocs.instanceid,grid_iu_regdocs.parentid);
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
        if( grid_iu_regdocs.parentid=='{00000000-0000-0000-0000-000000000000}') {return;}
            grid_iu_regdocs.store.load({params:{parentid: grid_iu_regdocs.parentid}});
    };
    function ChildOnEditClick(){
    if( grid_iu_regdocs.parentid=='{00000000-0000-0000-0000-000000000000}') {return;}
        var selection = grid_iu_regdocs.getView().getSelectionModel().getSelection()[0];
        if (selection) {
   	     if(CheckOperation('iu_reg.edit')!=0){
            var edit = Ext.create('EditWindow_iu_regdocsread');
            edit.getComponent(0).setActiveRecord(selection,grid_iu_regdocs.instanceid,grid_iu_regdocs.parentid);
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
   grid_iu_regdocs=
    new Ext.grid.Panel({
        itemId:  'grd_iu_regdocs',
        minWidth: 200,
        maxWidth: 1700,
        iconCls:  'icon-grid',
        frame: true,
        parentid: '{00000000-0000-0000-0000-000000000000}',
        title: 'Документы',
        scroll:'both',
        stateful:stateFulSystem,
        stateId:  'iu_regdocsread',
        store: {
        model:'model_iu_regdocs',
        autoLoad: false,
        autoSync: false,
        proxy: {
            type:   'ajax',
                url:   rootURL+'index.php/c_iu_regdocs/getRows',
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
        features: [groupingFeature_iu_regdocs],
          dockedItems: [{
                xtype:  'toolbar',
                items: [
                {
                    iconCls:  'icon-application_form_add',
                    text:   'Создать',
                    scope:  this,
                hidden : true,
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
                hidden : true,
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
{text: "Название документа", width: 200, dataIndex: 'docname', sortable: true}
            ,
{ text     : 'Файл', xtype: 'templatecolumn',  align:'right',width    : 90,	sortable : false,
tpl:'<a href=\'/output_file.php?ID={thedoc}&ext={thedoc_ext}\' target=\'_blank\'>Файл</a>'}
            ,
{text: "Комментарий", width: 200, dataIndex: 'thecomment', sortable: true}
        ],
    listeners: {
        itemdblclick: function() { 
    	    ChildOnEditClick();
        },
          itemclick: function(view , record){
         grid_iu_regdocs.down('#delete').setDisabled(false);
          grid_iu_regdocs.down('#edit').setDisabled(false);
    },
    select: function( selmodel, record,  index,  eOpts ){
        grid_iu_regdocs.down('#delete').setDisabled(false);
        grid_iu_regdocs.down('#edit').setDisabled(false);
    }, 
    selectionchange: function(selModel, selections){
    	 grid_iu_regdocs.down('#delete').setDisabled(selections.length === 0);
    	 grid_iu_regdocs.down('#edit').setDisabled(selections.length === 0);
    }
    }
    }
    );
var p1;
    function onDeleteConfirm (selection){
      if (selection) {
        Ext.Ajax.request({
            url:    rootURL+'index.php/c_iu_regtree/deleteRow',
            method:  'POST',
    		params: { 
    				iu_regtreeid: selection.get('iu_regtreeid')
    				}
    	});
    	onRefreshClick();
      }
    };
    function onDeleteClick(){
      var selection = p1.getView().getSelectionModel().getSelection()[0];
      if (selection) {
   	    if(CheckOperation('iu_reg.edit')!=0){
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
     function onAddRootClick(){
   	if(CheckOperation('iu_reg.edit')!=0){
                var edit = Ext.create('EditWindow_iu_regtreeread');
                p1.lasttreeid='{00000000-0000-0000-0000-000000000000}';
                record=new model_iu_regtree();
                record.set('instanceid',p1.instanceid);
                record.set('parentrowid',p1.lasttreeid);
                p1.store.getRootNode().insertChild(0, record);
                edit.getComponent(0).setActiveRecord(p1,record,p1.instanceid);
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
    function onAddClick(){
   	if(CheckOperation('iu_reg.edit')!=0){
               var selection = p1.getView().getSelectionModel().getSelection()[0];
               if (selection) {
                    p1.lasttreeid=selection.get('iu_regtreeid');
                    record=new model_iu_regtree();
                    record.set('instanceid',p1.instanceid);
                    record.set('parentrowid',p1.lasttreeid);
                    p1.store.getNodeById(p1.lasttreeid).insertChild(0, record);
               }else{
                    p1.lasttreeid='{00000000-0000-0000-0000-000000000000}';
                    record=new model_iu_regtree();
                    record.set('instanceid',p1.instanceid);
                    record.set('parentrowid',p1.lasttreeid);
                    p1.store.getRootNode().insertChild(0, record);
               }
                var edit = Ext.create('EditWindow_iu_regtreeread');
                record.set('instanceid',p1.instanceid);
                record.set('parentrowid',p1.lasttreeid);
                edit.getComponent(0).setActiveRecord(p1,record,p1.instanceid);
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
   	if(CheckOperation('iu_reg.edit')!=0){
            var edit = Ext.create('EditWindow_iu_regtreeread');
            edit.getComponent(0).setActiveRecord(p1,selection,selection.get('instanceid'));
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
p1=    new Ext.tree.Panel({
        itemId:id,
        autoScroll:true,
        width:600,
        frame: true,
        instanceid: '{00000000-0000-0000-0000-000000000000}',
        lasttreeid: '{00000000-0000-0000-0000-000000000000}',
        rootVisible:false,
        store: treestore_iu_regtree,
          dockedItems: [{
                xtype:  'toolbar',
                items: [
                {
                    iconCls:  'icon-application_form_add',
                    text:   'Создать в корне',
                    scope:  this,
                hidden : true,
                    handler : onAddRootClick
                    }, 
                {
                    iconCls:  'icon-application_form_add',
                    text:   'Создать',
                    scope:  this,
                hidden : true,
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
                hidden : true,
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
{xtype: 'treecolumn',text: "Название",width: 450, dataIndex: 'name', sortable: true}
        ]
,
	rbar:grid_iu_regdocs 
       ,
        listeners: {
        resize: function ( tree, width, height, oldWidth, oldHeight, eOpts ){
        		grid_iu_regdocs.setWidth( width * 0.6 );
        },
        itemdblclick: function() { 
    	    onEditClick();
        }
        ,itemclick: function(view,record) { 
           p1.down('#delete').setDisabled(false);
           p1.down('#edit').setDisabled(false);
           grid_iu_regdocs.instanceid=p1.instanceid;
           grid_iu_regdocs.parentid=record.get('id');
           grid_iu_regdocs.store.load({params:{ parentid:record.get('id')} })
        },
        select: function(view,record) { 
           p1.down('#delete').setDisabled(false);
           p1.down('#edit').setDisabled(false);
           grid_iu_regdocs.instanceid=p1.instanceid;
           grid_iu_regdocs.parentid=record.get('id');
           grid_iu_regdocs.store.load({params:{ parentid:record.get('id')} })
        },
        selectionchange: function(selModel, selections){
        p1.down('#delete').setDisabled(selections.length === 0);
        p1.down('#edit').setDisabled(selections.length === 0);
        var selection = selections[0];
        if (selection) {
           grid_iu_regdocs.instanceid=p1.instanceid;
           grid_iu_regdocs.parentid=selection.get('id');
           grid_iu_regdocs.store.load({params:{ parentid:selection.get('id')} })
        }
       }
      }
    }
    );
return p1;
};
function DefineForms_iu_regtree_read(){


Ext.define('Form_iu_regtreeread', {
extend:  'Ext.form.Panel',
alias: 'widget.f_iu_regtreeread',
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
        id:'iu_regtree-0',
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
editable: false,
readOnly: true,
allowBlank:true
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
    setActiveRecord: function(tree,record,instid){
    this.tree=tree;
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
                url: rootURL+'index.php/c_iu_regtree/setRow',
                method:  'POST',
                params: { 
                    instanceid: this.instanceid
                    ,iu_regtreeid: active.get('iu_regtreeid')
                    ,treeid: active.get('parentrowid')
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
                    if(active.get('iu_regtreeid')==''){
               			active.set('id',res.data['iu_regtreeid']);
               			active.set('iu_regtreeid',res.data['iu_regtreeid']);
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
        if(this.activeRecord.get('iu_regtreeid')==''){
        	ts =this.tree.store;
        	ts.getRootNode().removeAll();
        	ts.load();
        }
        this.setActiveRecord(null,null,null);
        this.ownerCt.close();
    }
}); // 'Ext.Define

Ext.define('EditWindow_iu_regtreeread', {
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
    title:  'Структура документации',
    items:[{
        xtype:  'f_iu_regtreeread'
	}]
	});

Ext.define('Form_iu_regdocsread', {
extend:  'Ext.form.Panel',
alias: 'widget.f_iu_regdocsread',
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
        id:'iu_regdocs-0',
        layout:'absolute', 
        border:false, 
        items: [
{
        minWidth: 735,
        width: 735,
        maxWidth: 735,
        x: 5, 
        y: 0, 

xtype:  'textfield',
value:  '',
name:   'docname',
itemId:   'docname',
fieldLabel:  'Название документа',
editable: false,
readOnly: true,
allowBlank:true
       ,labelWidth: 120
}
,
{
        minWidth: 735,
        width: 735,
        maxWidth: 735,
        x: 5, 
        y: 46, 

xtype:  'filefield',
hideTrigger: true,
editable: false,
name:   'thedoc_fu',
itemId:   'thedoc_fu',
buttonText:'Выбрать',
buttonConfig: {
    iconCls:'icon-iu_upload'
		},
fieldLabel:  'Файл',
allowBlank:true
       ,labelWidth: 120
}
,{
xtype:  'hidden',
name:   'thedoc',
itemId:   'thedoc',
},{
xtype:  'hidden',
name:   'thedoc_ext',
itemId:   'thedoc_ext',
}
,
{
        minWidth: 740,
        width: 740,
        xtype: 'textarea', 
        x: 5, 
        y: 92, 
        height: 260, 

value:  '',
name:   'thecomment',
itemId:   'thecomment',
fieldLabel:  'Комментарий',
editable: false,
readOnly: true,
allowBlank:true
       ,labelWidth: 120
}
,
{
xtype:  'hidden',
name:   'origname',
fieldLabel:  'Оригинальное название'
}
       ], width: 770,
       height: 392 
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
                url: rootURL+'index.php/c_iu_regdocs/setRow',
                method:  'POST',
                params: { 
                    instanceid: this.instanceid,
                    parentid: this.parentid
                    ,iu_regdocsid: active.get('iu_regdocsid')
                    ,docname: active.get('docname') 
                    ,thedoc: active.get('thedoc') 
                    ,thecomment: active.get('thecomment') 
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
                    if(active.get('iu_regdocsid')==''){
               			active.set('iu_regdocsid',res.data['iu_regdocsid']);
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
        if(this.activeRecord.get('iu_regdocsid')==''){
                this.activeRecord.store.reload();
        }
        this.setActiveRecord(null,null);
        this.ownerCt.close();
    }
}); // 'Ext.Define

Ext.define('EditWindow_iu_regdocsread', {
    extend:  'Ext.window.Window',
    maxHeight: 497,
    maxWidth: 900,
    autoScroll:true,
    minWidth: 750,
    width: 800,
    minHeight:467,
    height:467,
    constrainHeader :true,
    layout:  'absolute',
    autoShow: true,
    modal: true,
    closable: false,
    closeAction: 'destroy',
    iconCls:  'icon-application_form',
    title:  'Документы',
    items:[{
        xtype:  'f_iu_regdocsread'
	}]
	});
}
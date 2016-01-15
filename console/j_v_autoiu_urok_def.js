
var groupingFeature_autoiu_urok_def = Ext.create('Ext.grid.feature.Grouping',{
groupByText:  'Группировать по этому полю',
showGroupsText:  'Показать группировку'
});
var interval_autoiu_urok_def;
Ext.define('grid_autoiu_urok_def', {
    extend:  'Ext.grid.Panel',
    alias: 'widget.g_v_autoiu_urok_def',
    requires: [
        'Ext.grid.*',
        'Ext.form.field.Text',
        'Ext.toolbar.TextItem'
    ],
    initComponent: function(){
        Ext.apply(this, {
        frame: false,
        store: store_v_autoiu_urok_def,
        features: [groupingFeature_autoiu_urok_def],
        defaultDockWeights : { top: 7, bottom: 5, left: 1, right: 3 },
        viewConfig: {               enableTextSelection: true        },
        dockedItems: [{
                xtype:  'toolbar',
                     items: [{
                    iconCls:  'icon-application_form_add',
                    text:   'Создать',
                    scope:  this,
                    handler : this.onAddClick
                    }, {
                    iconCls:  'icon-application_form_edit',
                    text:   'Изменить',
                    itemId:  'edit',
                    disabled: true,
                    scope:  this,
                    handler : this.onEditClick
                    }, {
                    iconCls:  'icon-application_form_delete',
                    text:   'Удалить',
                    disabled: true,
                    itemId:  'delete',
                    scope:  this,
                    handler : this.onDeleteClick
                    }, {
                    iconCls:  'icon-table_refresh',
                    text:   'Обновить',
                    itemId:  'bRefresh',
                    scope:  this,
                    handler : this.onRefreshClick
                   } , {
                    iconCls:  'icon-page_excel',
                    text:   'Экспорт',
                    itemId:  'bExport',
                    scope:  this,
                    handler: this.onExportClick
                }]
            }],
        columns: [
            {text: "Код урока", width:120, dataIndex: 'iu_urok_def_ucode', sortable: true}
            ,
            {text: "Дата создания", width:120, dataIndex: 'iu_urok_def_datecreated', sortable: true,renderer:myDateRenderer}
            ,
            {text: "Предмет", width:120, dataIndex: 'iu_urok_def_subject', sortable: true}
            ,
            {text: "Класс", width:120, dataIndex: 'iu_urok_def_theclassnum', sortable: true}
            ,
            {text: "Номер по плану", width:120, dataIndex: 'iu_urok_def_plannum', sortable: true}
            ,
            {text: "Город съемки", width:120, dataIndex: 'iu_urok_def_maketown', sortable: true}
            ,
            {text: "Дата съемки", width:120, dataIndex: 'iu_urok_def_actiondate', sortable: true,renderer:myDateRenderer}
            ,
            {text: "Дата досъема", width:120, dataIndex: 'iu_urok_def_actiondate2', sortable: true,renderer:myDateRenderer}
            ,
            {text: "Тип курса", width:120, dataIndex: 'iu_urok_def_coursetype', sortable: true}
            ,
            {text: "Тема раздела", width:120, dataIndex: 'iu_urok_def_rtheme', sortable: true}
            ,
            {text: "Тема урока", width:120, dataIndex: 'iu_urok_def_classtheme', sortable: true}
            ,
            {text: "Четверть", width:120, dataIndex: 'iu_urok_def_thequarter', sortable: true}
            ,
            {text: "Дата в школе", width:120, dataIndex: 'iu_urok_def_schooldate', sortable: true,renderer:myDateRenderer}
            ,
            {text: "Куратор", width:120, dataIndex: 'iu_urok_def_curator', sortable: true}
            ,
            {text: "Учитель", width:120, dataIndex: 'iu_urok_def_theteacher', sortable: true}
            ,
            {text: "Методист", width:120, dataIndex: 'iu_urok_def_methodist', sortable: true}
            ,
            {text: "Методист 2", width:120, dataIndex: 'iu_urok_def_methodist2', sortable: true}
            ,
            {text: "Тип процесса", width:120, dataIndex: 'iu_urok_def_processtype', sortable: true}
            ,
            {text: "Статус по СКК", width:120, dataIndex: 'iu_urok_def_ckksn', sortable: true}
            ,
{ text     : 'Тестовая', xtype: 'templatecolumn',  align:'right',width    : 90,	sortable : false,
tpl:'<a href=\'{iu_urok_def_testpageref}\' target=\'_blank\'>Тестовая</a>'}
            ,
            {text: "Статус публикации", width:120, dataIndex: 'iu_urok_def_pubstate', sortable: true}
            ,
{ text     : 'Публикация', xtype: 'templatecolumn',  align:'right',width    : 90,	sortable : false,
tpl:'<a href=\'{iu_urok_def_mainref}\' target=\'_blank\'>Публикация</a>'}
            ,
            {text: "Связанный урок", width:120, dataIndex: 'iu_urok_def_thefilm', sortable: true}
            ,
{ text     : 'Связ. урок ссылка', xtype: 'templatecolumn',  align:'right',width    : 90,	sortable : false,
tpl:'<a href=\'{iu_urok_def_thefilmurl}\' target=\'_blank\'>Связ. урок ссылка</a>'}
            ,
{text: "Примечание", width: 200, dataIndex: 'iu_urok_def_info', sortable: true,
 renderer: function(value){var S =new String(value);  S=S.replace(new RegExp('/>','g'),'');  S=S.replace(new RegExp('<','g'),''); S=S.replace(new RegExp('>','g'),''); if(S.length >255) S=S.substr(0,255); return S;}}
        ]
        ,
        bbar: Ext.create('Ext.PagingToolbar', {
        store: store_v_autoiu_urok_def,
        displayInfo: true,
        displayMsg:  'Показаны строки с {0} по {1} из {2}',
        emptyMsg: 'нет данных'
        
        })

, rbar:
                [
                {
                    xtype:  'form',
                    title:  'Фильтры',
                    iconCls:  'icon-find',
                    flex:1,
					collapsible:true,
                    collapseDirection:  'right',
					animCollapse: false, 
					titleCollapse:true,
					bodyPadding:5,
					width:200,
					minWidth:200,
					autoScroll:true,
                    buttonAlign:  'center',
					layout: {
                    type:   'vbox',
                    align:  'stretch'
				},
                defaultType:  'textfield',
				items: [
{

value:  '',
name:   'iu_urok_def_ucode',
itemId:   'iu_urok_def_ucode',
fieldLabel:  '',
emptyText:      'Код урока',
hideLabel:  true,
listeners: {render: function(e) {Ext.QuickTips.register({  target: e.getEl(), text: 'Код урока'});}}
}
,
{

xtype:  'datefield',
format:'d/m/Y H:i:s',
submitFormat:'Y-m-d H:i:s',
value:  '',
name:  'iu_urok_def_datecreated_ge',
itemId: 'iu_urok_def_datecreated_ge',
fieldLabel: 'Дата создания C',
emptyText:'не задано',
submitEmptyText: false,
listeners: {render: function(e) {Ext.QuickTips.register({  target: e.getEl(), text: 'Дата создания C'});}}
}
,
{

xtype:  'datefield',
format:'d/m/Y H:i:s',
submitFormat:'Y-m-d H:i:s',
value:  '',
name:  'iu_urok_def_datecreated_le',
itemId: 'iu_urok_def_datecreated_le',
fieldLabel: 'Дата создания по',
emptyText:'не задано',
submitEmptyText: false,
listeners: {render: function(e) {Ext.QuickTips.register({  target: e.getEl(), text: 'Дата создания по'});}}
}
,
{

}
,
{

}
,
{

value:  '',
name:   'iu_urok_def_plannum',
itemId:   'iu_urok_def_plannum',
fieldLabel:  '',
emptyText:      'Номер по плану',
hideLabel:  true,
listeners: {render: function(e) {Ext.QuickTips.register({  target: e.getEl(), text: 'Номер по плану'});}}
}
,
{

}
,
{

xtype:  'datefield',
format:'d/m/Y',
submitFormat:'Y-m-d H:i:s',
value:  '',
name:  'iu_urok_def_actiondate_ge',
itemId: 'iu_urok_def_actiondate_ge',
fieldLabel: 'Дата съемки C',
emptyText:'не задано',
submitEmptyText: false,
listeners: {render: function(e) {Ext.QuickTips.register({  target: e.getEl(), text: 'Дата съемки C'});}}
}
,
{

xtype:  'datefield',
format:'d/m/Y',
submitFormat:'Y-m-d H:i:s',
value:  '',
name:  'iu_urok_def_actiondate_le',
itemId: 'iu_urok_def_actiondate_le',
fieldLabel: 'Дата съемки по',
emptyText:'не задано',
submitEmptyText: false,
listeners: {render: function(e) {Ext.QuickTips.register({  target: e.getEl(), text: 'Дата съемки по'});}}
}
,
{

xtype:  'datefield',
format:'d/m/Y',
submitFormat:'Y-m-d H:i:s',
value:  '',
name:  'iu_urok_def_actiondate2_ge',
itemId: 'iu_urok_def_actiondate2_ge',
fieldLabel: 'Дата досъема C',
emptyText:'не задано',
submitEmptyText: false,
listeners: {render: function(e) {Ext.QuickTips.register({  target: e.getEl(), text: 'Дата досъема C'});}}
}
,
{

xtype:  'datefield',
format:'d/m/Y',
submitFormat:'Y-m-d H:i:s',
value:  '',
name:  'iu_urok_def_actiondate2_le',
itemId: 'iu_urok_def_actiondate2_le',
fieldLabel: 'Дата досъема по',
emptyText:'не задано',
submitEmptyText: false,
listeners: {render: function(e) {Ext.QuickTips.register({  target: e.getEl(), text: 'Дата досъема по'});}}
}
,
{

}
,
{

value:  '',
name:   'iu_urok_def_rtheme',
itemId:   'iu_urok_def_rtheme',
fieldLabel:  '',
emptyText:      'Тема раздела',
hideLabel:  true,
listeners: {render: function(e) {Ext.QuickTips.register({  target: e.getEl(), text: 'Тема раздела'});}}
}
,
{

value:  '',
name:   'iu_urok_def_classtheme',
itemId:   'iu_urok_def_classtheme',
fieldLabel:  '',
emptyText:      'Тема урока',
hideLabel:  true,
listeners: {render: function(e) {Ext.QuickTips.register({  target: e.getEl(), text: 'Тема урока'});}}
}
,
{

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
store: enum_Quarter,
valueField:     'value',
displayField:   'name',
typeAhead: true,
queryMode:      'local',
emptyText:      '',
name:   'iu_urok_def_thequarter_val',
itemId:   'iu_urok_def_thequarter_val',
fieldLabel:  '',
emptyText:      'Четверть',
hideLabel:  true,
listeners: {render: function(e) {Ext.QuickTips.register({  target: e.getEl(), text: 'Четверть'});}}
}
,
{

xtype:  'datefield',
format:'F',
submitFormat:'F',
value:  '',
name:  'iu_urok_def_schooldate',
itemId: 'iu_urok_def_schooldate',
fieldLabel: 'Дата в школе',
emptyText:'не задано',
submitEmptyText: false,
listeners: {render: function(e) {Ext.QuickTips.register({  target: e.getEl(), text: 'Дата в школе'});}}
}
,
{

}
,
{

}
,
{

}
,
{

}
,
{

}
,
{

}
,
{

value:  '',
name:   'iu_urok_def_testpageref',
itemId:   'iu_urok_def_testpageref',
fieldLabel:  '',
emptyText:      'Тестовая',
hideLabel:  true,
listeners: {render: function(e) {Ext.QuickTips.register({  target: e.getEl(), text: 'Тестовая'});}}
}
,
{

}
,
{

value:  '',
name:   'iu_urok_def_mainref',
itemId:   'iu_urok_def_mainref',
fieldLabel:  '',
emptyText:      'Публикация',
hideLabel:  true,
listeners: {render: function(e) {Ext.QuickTips.register({  target: e.getEl(), text: 'Публикация'});}}
}
,
{

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
			if(this.store.count(false)==0) this.store.load();
			this.expand();
		}
},
editable: true,
enableRegEx: true,
queryMode:'local',
listeners:{  focus: function()   { if(this.store.count(false)==0) this.store.load();  } ,render: function(e) {Ext.QuickTips.register({  target: e.getEl(), text: 'Связанный урок'});} },
xtype:  'combobox',
store: cmbstore_iu_urok_def,
valueField:     'id',
displayField:   'brief',
typeAhead: true,
name:   'iu_urok_def_thefilm_id',
itemId:   'iu_urok_def_thefilm_id',
fieldLabel:  '',
emptyText:      'Связанный урок',
hideLabel:  true
}
,
{

value:  '',
name:   'iu_urok_def_thefilmurl',
itemId:   'iu_urok_def_thefilmurl',
fieldLabel:  '',
emptyText:      'Связ. урок ссылка',
hideLabel:  true,
listeners: {render: function(e) {Ext.QuickTips.register({  target: e.getEl(), text: 'Связ. урок ссылка'});}}
}
,
{

value:  '',
name:   'iu_urok_def_info',
itemId:   'iu_urok_def_info',
fieldLabel:  '',
emptyText:      'Примечание',
hideLabel:  true,
listeners: {render: function(e) {Ext.QuickTips.register({  target: e.getEl(), text: 'Примечание'});}}
}
					],
                    buttons: 
                    [
                        {
                            text: 'Найти',
							iconCls:'icon-find',
                            formBind: true, 
                            disabled: false,
                            grid: this,
                            handler: function() {
                                var user_input =this.up('form').getForm().getValues(false,true);
                                var filters = new Array();
								if(this.grid.default_filter != null){
									for (var i=0; i< this.grid.default_filter.length;i++) {
										var kv=this.grid.default_filter[i];
										filters.push({property: kv.key, value: kv.value});
									}
								}
                                for (var key in user_input) {
                                    filters.push({property: key, value: user_input[key]});
                                }
                                if (this.grid.store.filters.length>0) 
                                    this.grid.store.filters.clear();
                                if (filters.length>0) 
                                    this.grid.store.filter(filters); 
                                else 
								   this.grid.store.load();
                            }
                        }, {
							text: 'Сбросить',
							iconCls:'icon-cancel',
                            grid: this,
                            handler: function() {
                                this.up('form').getForm().reset();
								var filters = new Array();
                                if(this.grid.default_filter!=null){
									for (var i=0; i< this.grid.default_filter.length;i++) {
										var kv=this.grid.default_filter[i];
										filters.push({property: kv.key, value: kv.value});
									}
								}
                                if (this.grid.store.filters.length>0) 
                                    this.grid.store.filters.clear();
                                if (filters.length>0) 
                                    this.grid.store.filter(filters); 
                                else 
								   this.grid.store.load();
                            }
                        }
                    ]
                }
            ]//rbar
        }
        );
        this.callParent();
        this.getSelectionModel().on('selectionchange', this.onSelectChange, this);
        this.store.load()
       },
        onSelectChange: function(selModel, selections){
        this.down('#delete').setDisabled(selections.length === 0);
        this.down('#edit').setDisabled(selections.length === 0);
    },
    listeners: {
        itemdblclick: function() { 
    	    this.onEditClick();
        }
        ,
        	added:function(){
        			//interval_autoiu_urok_def= setInterval(function() {  
        			//	store_v_autoiu_urok_def.load();
        			//}, 60000);
        		}
        	,
        	destroy:function(){
        		//clearInterval(interval_autoiu_urok_def);
        }
    },
    onDeleteConfirm:function(selection){
      if (selection) {
        Ext.Ajax.request({
            url:    rootURL+'index.php/c_v_autoiu_urok_def/deleteRow',
            method:  'POST',
    		params: { 
    				instanceid: selection.get('instanceid')
    				}
    	});
    	this.store.remove(selection);
      }
    },
    onDeleteClick: function(){
      var selection = this.getView().getSelectionModel().getSelection()[0];
      if (selection) {
   	    if(CheckOperation('iu_urok.edit')!=0 && OTAllowDelete('iu_urok')){
        Ext.Msg.show({
            title:  'Удалить?',
            msg:    'Удалить строку из базы данных?',
        	buttons: Ext.Msg.YESNO,
        	icon:   Ext.MessageBox.QUESTION,
        	fn: function(btn,text,opt){
        		if(btn=='yes'){
        			opt.caller.onDeleteConfirm(opt.selectedRow);
        	    }
        	},
            caller: this,
            selectedRow: selection
        });
        }else{
        		Ext.MessageBox.show({
                title:  'Контроль прав.',
                msg:    'Удаление объектов не разрешено!',
                buttons: Ext.MessageBox.OK,
               icon:   Ext.MessageBox.WARNING
        		});
        }
      }
    },
    onAddClick: function(){
   	    if(CheckOperation('iu_urok.edit')!=0 && OTAllowAdd('iu_urok')){
            Ext.Ajax.request({
                url: rootURL+'index.php/c_v_autoiu_urok_def/newRow',
                method:  'POST',
                params: { 
                },
                success: function(response){
                var text = response.responseText;
                var res =Ext.decode(text);
                var edit = Ext.create('iu.windowObjects');
                edit.prefix='c_v_autoiu_urok_def';
                edit.setTitle('Создание документа:Урок') ;
                var p=eval('iu_urok_Panel_'+OTAddMode('iu_urok')+'( res.data, false,null )') ;
                edit.add(p);
                edit.show();
                }
            });
            this.store.load();
        }else{
        		Ext.MessageBox.show({
                title:  'Контроль прав.',
                msg:    'Создание объектов не разрешено!',
                buttons: Ext.MessageBox.OK,
               icon:   Ext.MessageBox.WARNING
        		});
        }
    },
    onEditClick: function(){
        var selection = this.getView().getSelectionModel().getSelection()[0];
        if (selection) {
   	    if(CheckOperation('iu_urok.edit')!=0 ){
                var edit = Ext.create('iu.windowObjects');
                edit.prefix='c_v_autoiu_urok_def';
                edit.setTitle('Редактирование документа: Урок') ;
            var p=eval('iu_urok_Panel_'+OTEditMode('iu_urok')+'( selection.get(\'instanceid\'), false, selection )') ;
            edit.add(p);
            edit.show();
        }else{
        		Ext.MessageBox.show({
                title:  'Контроль прав.',
                msg:    'Изменение объектов не разрешено!',
                buttons: Ext.MessageBox.OK,
               icon:   Ext.MessageBox.WARNING
        		});
        }
        }
    },
    onRefreshClick: function(){
             this.store.load();
    }
    ,
     onExportClick: function(){ 
         	var config= {title:this.title, columns:this.columns };
    	var workbook = new Workbook(config);
    workbook.addWorksheet(this.store, config );
    var x= workbook.render();
    window.open( 'data:application/vnd.ms-excel;base64,' + Base64.encode(x),'_blank');
     }
    }
    );
Ext.require([
'Ext.form.*'
]);
function iu_urok_Jrnl(){ 

  var iu_urok= Ext.create('Ext.form.Panel', {
       closable: true,
       id:     'iu_urok_jrnl',
       title: 'Урок',
      layout: 'fit',
      flex: 1,
      fieldDefaults: {
         labelAlign:             'top',
          msgTarget:             'side'
        },
        defaults: {
        anchor:'100%'
        },

        items: [{
            itemId:'gr_autoiu_urok_def',
            xtype:'g_v_autoiu_urok_def',
            stateful: stateFulSystem,
            stateId:'j_v_autoiu_urok_def',
            layout: 'fit',
            flex: 1,
            store: store_v_autoiu_urok_def
    }] // tabpanel
    }); //Ext.Create
    return iu_urok;
}
Ext.define('ObjectWindow_iu_urok', {
    extend:  'Ext.window.Window',
    maxHeight: 620,
    minHeight: 620,
    minWidth: 800,
    maxWidth: 1024,
    constrainHeader :true,
    layout:  'fit',
    autoShow: true,
    closeAction: 'destroy',
    modal: true,
    iconCls:  'icon-film',
    title:  'Урок',
    items:[ ]
	});
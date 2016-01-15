var urok_instanceid='';


 var store_v_autoiu_urok_def_arch = Ext.create('Ext.data.Store', {
        model:'model_v_autoiu_urok_def_cur',
        autoLoad: false,
        autoSync: false,
        remoteSort: true,
        remoteFilter:true,
        pageSize : 30,
        proxy: {
				type:   'ajax',
                url:   rootURL+'index.php/c_v_autoiu_urok_def/getRowsArch',
				extraParams:{ archived:0 },
				reader: {
					type:   'json'
					,root:  'rows'
					,totalProperty: 'total'
					,successProperty:  'success'
					,messageProperty:  'msg'
				},
				listeners: {
					exception: function(proxy, response, operation){
						Ext.MessageBox.show({
							title: 'REMOTE EXCEPTION',
							msg:    operation.getError(),
							icon : Ext.MessageBox.ERROR,
							buttons : Ext.Msg.OK
						});
					}
				}
        }
    });
	
Ext.define('Form_urok_restart', 
	{
		extend:  'Ext.form.Panel',
		alias: 'widget.f_urok_restart',
		defaultType:'textfield',
		layout:'absolute',
		initComponent:function () 
			{
				this.addEvents('create');
				Ext.apply(this, 
					{
						items:[
							{
								name:'instanceid',
								itemId:'instanceid',
								inputType:'hidden'
							},
				
							{
									/* flex_field */ 
									minWidth: 720,
									width: 720,
									maxWidth: 720,
									x: 5, 
									y: 5, 
									labelWidth:140,

									xtype:  'combobox',
									trigger1Cls:         'x-form-select-trigger', 
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
									store: cmbstore_iud_process_def,
									valueField:     'id',
									displayField:   'brief',
									typeAhead: true,
									emptyText:      '',
									name:   'process',
									itemId:   'process',
									fieldLabel:  'Новый процесс',
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
									text:   'Запуск процесса',
									disabled: false,
									scope:  this,
									handler:function()
									{
										var form = this.getForm();
										if(form.isValid()){
											form._fields.items[0].setValue(urok_instanceid);
											form.submit(
												{
													url: rootURL+'index.php/wf/ProcessRestart',
													waitMsg: 'Сохранение...',
													success: function(f,response){
														var text = response.result.msg;
														//var res =Ext.decode(text);
														if(text=="ok"){
														
															var wn = this.form.owner.ownerCt;
															wn.close();
															store_v_autoiu_task.load();
														
														}else{
															Ext.MessageBox.show({
																title:  'Ошибка',
																msg:    text,
																buttons: Ext.MessageBox.OK,
																icon:   Ext.MessageBox.ERROR
															});
															store_v_autoiu_task.load();
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
														store_v_autoiu_urok_def_arch.load();
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
	
	Ext.define('EditWindow_urok_restart',{
    extend:  'Ext.window.Window',
    height: 130,
    width: 780,
    layout:  'fit',
    autoShow: true,
    modal: true,
    closeAction: 'destroy',
    iconCls:  'icon-cog_go',
    title:  'Запуск процесса',
    items:[
		{
			xtype:'f_urok_restart'
		}
	]
	}
);
	
function ArchRefRenderer(value, metaData, record, row, col, store, gridView) 
{
    if (value!=''){
		return ('<a href="' +value +'" target="_blank"><img src ="../resources/icons/link.png" /></a>');
	}else{
		return '-';
	}
}
	
var groupingFeature_autoiu_urok_def_arch = Ext.create('Ext.grid.feature.Grouping',{
groupByText:  'Группировать по этому полю',
showGroupsText:  'Показать группировку'
});
var interval_autoiu_urok_def_arch;
Ext.define('grid_autoiu_urok_def_arch', {
    extend:  'Ext.grid.Panel',
    alias: 'widget.g_v_autoiu_urok_def_arch',
    requires: [
        'Ext.grid.*',
        'Ext.form.field.Text',
        'Ext.toolbar.TextItem'
    ],
    initComponent: function(){
        Ext.apply(this, {
        frame: false,
        store: store_v_autoiu_urok_def_arch,
        features: [groupingFeature_autoiu_urok_def_arch],
        defaultDockWeights : { top: 7, bottom: 5, left: 1, right: 3 },
        
        viewConfig: {
               enableTextSelection: true
        },
		default_filter:[{key:'iu_urok_def_isdone_val',value:'1'}],
        dockedItems: [{
                xtype:  'toolbar',
                     items: [ {
                    iconCls:  'icon-application_form_edit',
                    text:   'Открыть',
                    itemId:  'edit',
                    disabled: true,
                    scope:  this,
                    handler : this.onEditClick
                    }, {
                    iconCls:  'icon-cog_go',
                    text:   'Запуск нового процесса',
                    itemId:  'restart',
                    disabled: true,
                    scope:  this,
                    handler : this.onRestartClick
                    },  {
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
            {text: "Дата<br/>создания", width:120, dataIndex: 'iu_urok_def_datecreated', sortable: true,renderer:myDateRenderer}
            ,
            {text: "Предмет", width:120, dataIndex: 'iu_urok_def_subject', sortable: true}
            ,
            {text: "Класс", width:120, dataIndex: 'iu_urok_def_theclassnum', sortable: true}
            ,
            {text: "Номер<br/>по плану", width:120, dataIndex: 'iu_urok_def_plannum', sortable: true}
            ,
            {text: "Город<br/>съемки", width:120, dataIndex: 'iu_urok_def_maketown', sortable: true}
            ,
            {text: "Дата<br/>съемки", width:120, dataIndex: 'iu_urok_def_actiondate', sortable: true,renderer:myDateRenderer}
            ,
            {text: "Дата<br/>досъема", width:120, dataIndex: 'iu_urok_def_actiondate2', sortable: true,renderer:myDateRenderer}
            ,
            {text: "Тип<br/>курса", width:120, dataIndex: 'iu_urok_def_coursetype', sortable: true}
            ,
            {text: "Тема<br/>раздела", width:120, dataIndex: 'iu_urok_def_rtheme', sortable: true}
            ,
            {text: "Тема<br/>урока", width:120, dataIndex: 'iu_urok_def_classtheme', sortable: true}
            ,
            {text: "Четверть", width:120, dataIndex: 'iu_urok_def_thequarter', sortable: true}
            ,
            {text: "Дата в<br/>школе", width:120, dataIndex: 'iu_urok_def_schooldate', sortable: true}
            ,
            {text: "Куратор", width:120, dataIndex: 'iu_urok_def_curator', sortable: true}
            ,
            {text: "Учитель", width:120, dataIndex: 'iu_urok_def_theteacher', sortable: true}
            ,
            {text: "Методист", width:120, dataIndex: 'iu_urok_def_methodist', sortable: true}
            ,
            {text: "Методист 2", width:120, dataIndex: 'iu_urok_def_methodist2', sortable: true}
            ,
            {text: "Тип<br/>процесса", width:120, dataIndex: 'iu_urok_def_processtype', sortable: true}
           
           //,{text: "Статус", width:120, dataIndex: 'iu_urok_def_laststate', sortable: true}
			 ,{text: "Финальный<br/>статус", width:120, dataIndex: 'iu_urok_def_ckksn', sortable: true}
			
            ,
			{ text     : 'Тестовая', dataIndex:'iu_urok_def_testpageref',  align:'right',width    : 90,	sortable : false,
			 renderer: ArchRefRenderer}
			 ,{ text     : 'Статус<br/>публикации', dataIndex: 'iu_urok_def_pubstate',width    : 120,	sortable : true}
			
						,
			{ text     : 'Публикация', dataIndex: 'iu_urok_def_mainref',  align:'right',width    : 90,	sortable : false,
			 renderer: ArchRefRenderer}
			,
			{text: "Связанный<br/>урок", width:120, dataIndex: 'iu_urok_def_thefilm', sortable: true}
			,
			{ text     : 'Связ. урок<br/>ссылка', dataIndex: 'iu_urok_def_thefilmurl',  align:'right',width    : 90,	sortable : false,
			renderer: ArchRefRenderer}
					
        ]
        ,
        bbar: Ext.create('Ext.PagingToolbar', {
        store: store_v_autoiu_urok_def_arch,
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
							listeners:{  focus: function()   { if(this.store.count(false)==0) this.store.load();  } ,render: function(e) {Ext.QuickTips.register({  target: e.getEl(), text: 'Предмет'});} },
							xtype:  'combobox',
							store: cmbstore_iud_predmet,
							valueField:     'id',
							displayField:   'brief',
							typeAhead: true,
							name:   'iu_urok_def_subject_id',
							itemId:   'iu_urok_def_subject_id',
							fieldLabel:  '',
							emptyText:      'Предмет',
							hideLabel:  true
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
							listeners:{  focus: function()   { if(this.store.count(false)==0) this.store.load();  } ,render: function(e) {Ext.QuickTips.register({  target: e.getEl(), text: 'Класс'});} },
							xtype:  'combobox',
							store: cmbstore_iu_clsinfo,
							valueField:     'id',
							displayField:   'brief',
							typeAhead: true,
							name:   'iu_urok_def_theclassnum_id',
							itemId:   'iu_urok_def_theclassnum_id',
							fieldLabel:  '',
							emptyText:      'Класс',
							hideLabel:  true
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
							listeners:{  focus: function()   { if(this.store.count(false)==0) this.store.load();  } ,render: function(e) {Ext.QuickTips.register({  target: e.getEl(), text: 'Город съемки'});} },
							xtype:  'combobox',
							store: cmbstore_iud_town,
							valueField:     'id',
							displayField:   'brief',
							typeAhead: true,
							name:   'iu_urok_def_maketown_id',
							itemId:   'iu_urok_def_maketown_id',
							fieldLabel:  '',
							emptyText:      'Город съемки',
							hideLabel:  true
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
							listeners:{  focus: function()   { if(this.store.count(false)==0) this.store.load();  } ,render: function(e) {Ext.QuickTips.register({  target: e.getEl(), text: 'Тип курса'});} },
							xtype:  'combobox',
							store: cmbstore_iud_ctype,
							valueField:     'id',
							displayField:   'brief',
							typeAhead: true,
							name:   'iu_urok_def_coursetype_id',
							itemId:   'iu_urok_def_coursetype_id',
							fieldLabel:  '',
							emptyText:      'Тип курса',
							hideLabel:  true
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
							listeners:{  focus: function()   { if(this.store.count(false)==0) this.store.load();  } ,render: function(e) {Ext.QuickTips.register({  target: e.getEl(), text: 'Куратор'});} },
							xtype:  'combobox',
							store: cmbstore_iu_u_def,
							valueField:     'id',
							displayField:   'brief',
							typeAhead: true,
							name:   'iu_urok_def_curator_id',
							itemId:   'iu_urok_def_curator_id',
							fieldLabel:  '',
							emptyText:      'Куратор',
							hideLabel:  true
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
							listeners:{  focus: function()   { if(this.store.count(false)==0) this.store.load();  } ,render: function(e) {Ext.QuickTips.register({  target: e.getEl(), text: 'Учитель'});} },
							xtype:  'combobox',
							store: cmbstore_iu_tmdef,
							valueField:     'id',
							displayField:   'brief',
							typeAhead: true,
							name:   'iu_urok_def_theteacher_id',
							itemId:   'iu_urok_def_theteacher_id',
							fieldLabel:  '',
							emptyText:      'Учитель',
							hideLabel:  true
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
							listeners:{  focus: function()   { if(this.store.count(false)==0) this.store.load();  } ,render: function(e) {Ext.QuickTips.register({  target: e.getEl(), text: 'Методист'});} },
							xtype:  'combobox',
							store: cmbstore_iu_tmdef,
							valueField:     'id',
							displayField:   'brief',
							typeAhead: true,
							name:   'iu_urok_def_methodist_id',
							itemId:   'iu_urok_def_methodist_id',
							fieldLabel:  '',
							emptyText:      'Методист',
							hideLabel:  true
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
							listeners:{  focus: function()   { if(this.store.count(false)==0) this.store.load();  } ,render: function(e) {Ext.QuickTips.register({  target: e.getEl(), text: 'Методист 2'});} },
							xtype:  'combobox',
							store: cmbstore_iu_tmdef,
							valueField:     'id',
							displayField:   'brief',
							typeAhead: true,
							name:   'iu_urok_def_methodist2_id',
							itemId:   'iu_urok_def_methodist2_id',
							fieldLabel:  '',
							emptyText:      'Методист 2',
							hideLabel:  true
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
							listeners:{  focus: function()   { if(this.store.count(false)==0) this.store.load();  } ,render: function(e) {Ext.QuickTips.register({  target: e.getEl(), text: 'Тип процесса'});} },
							xtype:  'combobox',
							store: cmbstore_iud_process_def,
							valueField:     'id',
							displayField:   'brief',
							typeAhead: true,
							name:   'iu_urok_def_processtype_id',
							itemId:   'iu_urok_def_processtype_id',
							fieldLabel:  '',
							emptyText:      'Тип процесса',
							hideLabel:  true
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
							listeners:{  focus: function()   { if(this.store.count(false)==0) this.store.load();  } ,render: function(e) {Ext.QuickTips.register({  target: e.getEl(), text: 'Финальный статус'});} },
							xtype:  'combobox',
							store: cmbstore_iud_sn_def_final,
							valueField:     'id',
							displayField:   'brief',
							typeAhead: true,
							name:   'iu_urok_def_ckksn_id',
							itemId:   'iu_urok_def_ckksn_id',
							fieldLabel:  '',
							emptyText:      'Финальный статус',
							hideLabel:  true
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
							emptyText:      'Св. Урок ссылка',
							hideLabel:  true,
							listeners: {render: function(e) {Ext.QuickTips.register({  target: e.getEl(), text: 'Св. Урок ссылка'});}}
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
                                //console.log(this.up('form'));
                                this.up('form').getForm().reset();
                                if(this.grid.default_filter!=null){
									var filters = new Array();
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
        //this.store.load()
       },
        onSelectChange: function(selModel, selections){
       // this.down('#delete').setDisabled(selections.length === 0);
        this.down('#edit').setDisabled(selections.length === 0);
		this.down('#restart').setDisabled(selections.length === 0);
    },
    listeners: {
        itemdblclick: function() { 
    	    this.onEditClick();
        }
        ,
        	added:function(){
        			//interval_autoiu_urok_def_arch= setInterval(function() {  
        			//	store_v_autoiu_urok_def_arch.load();
        			//}, 60000);
        		}
        	,
        	destroy:function(){
        		//clearInterval(interval_autoiu_urok_def_arch);
        }
    },
   
      onRestartClick: function(){
        var selection = this.getView().getSelectionModel().getSelection()[0];
        if (selection) {
   	    if(CheckOperation('iu_urok.edit')!=0  && OTAllowDelete('iu_urok') ){
                urok_instanceid = selection.get('instanceid');
					
							var edit = Ext.create('EditWindow_urok_restart');
							
						
							edit.show();

        }else{
        		Ext.MessageBox.show({
                title:  'Контроль прав.',
                msg:    'Запуск процесса не разрешен!',
                buttons: Ext.MessageBox.OK,
               icon:   Ext.MessageBox.WARNING
        		});
        }
        }
    },
   
    onEditClick: function(){
        var selection = this.getView().getSelectionModel().getSelection()[0];
        if (selection) {
   	    if(CheckOperation('iu_urok.edit')!=0 ){
                var edit = Ext.create('iu.windowObjects');
                edit.prefix='c_v_autoiu_urok_def';
                edit.setTitle('Просмотр документа: Урок') ;
            var p=eval('iu_urok_Panel_'+OTEditMode('iu_urok_arch')+'( selection.get(\'instanceid\'), false, selection )') ;
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
    },
  
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
function iu_urok_Jrnl_arch(){ 

  var iu_urok= Ext.create('Ext.form.Panel', {
       closable: true,
       id:     'iu_urok_jrnl_arch',
       title: 'Урок. Архив',
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
            itemId:'gr_autoiu_urok_def_arch',
            xtype:'g_v_autoiu_urok_def_arch',
			stateful: stateFulSystem,
			stateId: 'j_v_autoiu_u_def_arch',
            layout: 'fit',
            flex: 1,
            store: store_v_autoiu_urok_def_arch
    }] // tabpanel
    }); //Ext.Create
	
	var filters = new Array();
	for (var i=0; i< iu_urok.items.getAt(0).default_filter.length;i++) {
		var kv=iu_urok.items.getAt(0).default_filter[i];
		filters.push({property: kv.key, value: kv.value});
	}
	if (store_v_autoiu_urok_def_arch.filters.length>0)
		store_v_autoiu_urok_def_arch.filters.clear();
	store_v_autoiu_urok_def_arch.filter(filters);
    return iu_urok;
}
Ext.define('ObjectWindow_iu_urok_arch', {
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
    title:  'Урок. Архив',
    items:[ ]
	});
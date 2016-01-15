  var store_v_autoiu_task_trash = Ext.create('Ext.data.Store', {
        model:'model_v_autoiu_task',
        autoLoad: false,
        autoSync: false,
        remoteSort: true,
        remoteFilter:true,
        pageSize : 30,
        proxy: {
            type:   'ajax',
            url:   rootURL+'index.php/c_v_autoiu_task/getRows',
			extraParams:{archived:1},
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


	



var groupingFeature_autoiu_task_trash = Ext.create('Ext.grid.feature.Grouping',{
groupByText:  'Группировать по этому полю',
showGroupsText:  'Показать группировку'
});

var filterTask="active";
var FastFilterTask = function(){	
};
var interval_autoiu_task;
Ext.define('grid_autoiu_task_trash', {
    extend:  'Ext.grid.Panel',
    alias: 'widget.g_v_autoiu_task_trash',
    requires: [
        'Ext.grid.*',
        'Ext.form.field.Text',
        'Ext.toolbar.TextItem'
    ],
    initComponent: function(){
        Ext.apply(this, {
        frame: false,
        store: store_v_autoiu_task_trash,
        features: [groupingFeature_autoiu_task_trash],
        defaultDockWeights : { top: 7, bottom: 5, left: 1, right: 3 },
        
        viewConfig: {
            enableTextSelection: true
        },
		dockedItems: [
				
				{
                xtype:  'toolbar',
                     items: [{
                    iconCls:  'icon-application_form_edit',
                    text:   'Открыть',
                    itemId:  'edit',
                    disabled: true,
                    scope:  this,
                    handler : this.onEditClick
                    }, 
					{
                    iconCls:  'icon-arrow_undo',
                    text:   'Восстановить',
                    itemId:  'rearchive',
                    disabled: true,
                    scope:  this,
                    handler : this.onReArchive
                    },{
                    iconCls:  'icon-table_refresh',
                    text:   'Обновить',
                    itemId:  'bRefresh',
                    scope:  this,
                    handler : this.onRefreshClick
                   }
				   
				   , {
                    iconCls:  'icon-page_excel',
                    text:   'Экспорт',
                    itemId:  'bExport',
                    scope:  this,
                    handler: this.onExportClick
                }]
            }],
        columns: [
			{xtype: 'templatecolumn',text: "Страница урока", width:80, tpl:'<a href=\''+rootURL+'?id={ucode}\' target=\'_blank\'><img src=\''+rootURL+'/resources/icons/comment_dull.png\'></a>', sortable: true}
            ,	 
			{xtype: 'templatecolumn',text: "Карточка урока", width:80, tpl:'<a href=\''+rootURL+'?uid={urokid}\' target=\'_blank\'><img src=\''+rootURL+'/resources/icons/film_edit.png\'></a>', sortable: true}
			,
            {text: "Исполнитель", width:120, dataIndex: 'iu_task_doer', sortable: true}
            ,
            {text: "Задача", width:160, dataIndex: 'iu_task_subj', sortable: true}
          
			,
			{text: "Урок", width:220, dataIndex: 'iu_task_theprocess', sortable: true}
           ,
            {text: "Задача выдана", width:120, dataIndex: 'iu_task_createdate', sortable: true}
			 ,
            {text: "Срок исполнения", width:120, dataIndex: 'iu_task_planenddate', sortable: true,renderer: myDateRenderer}
			   ,
            {text: "Контролирует", width:120, dataIndex: 'iu_task_contoller', sortable: true, renderer: taskRenderer}
            			,
            {text: "Дата завершения", width:120, dataIndex: 'iu_task_finishdate', sortable: true, renderer: taskDateRenderer}
            ,
            {text: "Состояние", width:120, dataIndex: 'iu_task_taskfinished', sortable: true,renderer: function(value, metaData, record){
				if (record.get('iu_task_ischecked')=='да') { 
					if (record.get('iu_task_taskcancelled')=='да') return '<img src="/resources/icons/user_cross.png">';
					if (record.get('iu_task_taskfinished')=='да') return '<img src="/resources/icons/accept.png"> <img src="/resources/icons/eye.png">';
				}else{
					if (record.get('iu_task_taskcancelled')=='да') return '<img src="/resources/icons/cancel.png">';
					if (record.get('iu_task_taskfinished')=='да') return '<img src="/resources/icons/accept.png">';
				}
				return '';
			}}
			 ,
			
            {text: "Решение", width:160, dataIndex: 'iu_task_doer_states', sortable: true, renderer: taskRenderer}
			 ,
			
            {text: "Комментарий исполнителя", width:160, dataIndex: 'iu_task_doer_comment', sortable: true, renderer: taskRenderer}
			
			
           
			/* ,
            {text: "Задача отменена", width:120, dataIndex: 'iu_task_taskcancelled', sortable: true}
            ,
            {text: "Проверена", width:120, dataIndex: 'iu_task_ischecked', sortable: true} */
            , 
			{text: "Комментарий проверяющего", width:160, dataIndex: 'iu_task_controller_comment', sortable: true, renderer: taskRenderer}
			
            ,{text: "Четверть", width:60, dataIndex: 'iu_urok_def_thequarter', sortable: true, renderer: taskRenderer}
			,{text: "Предмет", width:120, dataIndex:'iu_urok_def_subject', sortable: true, renderer: taskRenderer}
			
           	,{text: "Куратор", width:100, dataIndex:'iu_urok_def_curator',  sortable: true, renderer: taskRenderer}
			,{text: "Учитель", width:100, dataIndex:'iu_urok_def_theteacher', sortable: true, renderer: taskRenderer}
			,{text: "Статус<br/>урока", width:130, dataIndex:'iu_urok_def_laststate', sortable: true, renderer: taskRenderer}
            
          /*  ,
            {text: "Отослано исполнителю", width:120, dataIndex: 'iu_task_senttodoer', sortable: true} 

            ,
            {text: "Урок", width:120, dataIndex: 'iu_task_theprocess', sortable: true}
            ,
            {text: "Подэтап", width:120, dataIndex: 'iu_task_processstatus', sortable: true}
           ,
            {text: "Задача", width:120, dataIndex: 'iu_task_statetask', sortable: true} */
        ]
        ,
		
		
	
	    bbar: {
				layout: {
                        type:'vbox',
                        align: 'stretch'
                    },
				items: [

				Ext.create('Ext.PagingToolbar', {
				store: store_v_autoiu_task_trash,
				displayInfo: true,
				displayMsg:  'Показаны строки с {0} по {1} из {2}',
				emptyMsg: 'нет данных'
				
				})
				]
			}
			, rbar:
                [
                {
                    xtype:  'form',
                    title:  'Фильтры',
                    iconCls:  'icon-find',
					grid: this,
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
					
					
					DoFind: function(){
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
							
							filters.push({property: 'filtermode', value: filterTask});
							if (this.grid.store.filters.length>0)
								this.grid.store.filters.clear();
							if (filters.length>0)
								this.grid.store.filter(filters);
							else
								this.grid.store.load();
					}
					,
					
					items: [
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
						listeners:{  focus: function()   { if(this.store.count(false)==0) this.store.load();  } ,render: function(e) {Ext.QuickTips.register({  target: e.getEl(), text: 'Исполнитель'});} },
						xtype:  'combobox',
						store: cmbstore_iu_u_def,
						valueField:     'id',
						displayField:   'brief',
						typeAhead: true,
						name:   'iu_task_doer_id',
						itemId:   'iu_task_doer_id',
						fieldLabel:  '',
						emptyText:      'Исполнитель',
						hideLabel:  true
						}
						,
						{

						value:  '',
						name:   'iu_task_subj',
						itemId:   'iu_task_subj',
						fieldLabel:  '',
						emptyText:      'Задача',
						hideLabel:  true,
						listeners: {render: function(e) {Ext.QuickTips.register({  target: e.getEl(), text: 'Задача'});}}
						}
						,
						{

						value:  '',
						name:   'iu_task_theprocess',
						itemId:   'iu_task_theprocess',
						fieldLabel:  '',
						emptyText:      'Урок',
						hideLabel:  true,
						listeners: {render: function(e) {Ext.QuickTips.register({  target: e.getEl(), text: 'Название'});}}
						}
/*,
{

xtype:  'datefield',
format:'d/m/Y H:i:s',
submitFormat:'Y-m-d H:i:s',
value:  '',
name:  'iu_task_createdate_ge',
itemId: 'iu_task_createdate_ge',
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
name:  'iu_task_createdate_le',
itemId: 'iu_task_createdate_le',
fieldLabel: 'Дата создания по',
emptyText:'не задано',
submitEmptyText: false,
listeners: {render: function(e) {Ext.QuickTips.register({  target: e.getEl(), text: 'Дата создания по'});}}
}
,
{

value:  '',
name:   'iu_task_info',
itemId:   'iu_task_info',
fieldLabel:  '',
emptyText:      'Описание',
hideLabel:  true,
listeners: {render: function(e) {Ext.QuickTips.register({  target: e.getEl(), text: 'Описание'});}}
}
,
{

xtype:  'datefield',
format:'d/m/Y H:i:s',
submitFormat:'Y-m-d H:i:s',
value:  '',
name:  'iu_task_planenddate_ge',
itemId: 'iu_task_planenddate_ge',
fieldLabel: 'Плановый срок исполнения C',
emptyText:'не задано',
submitEmptyText: false,
listeners: {render: function(e) {Ext.QuickTips.register({  target: e.getEl(), text: 'Плановый срок исполнения C'});}}
}
,
{

xtype:  'datefield',
format:'d/m/Y H:i:s',
submitFormat:'Y-m-d H:i:s',
value:  '',
name:  'iu_task_planenddate_le',
itemId: 'iu_task_planenddate_le',
fieldLabel: 'Плановый срок исполнения по',
emptyText:'не задано',
submitEmptyText: false,
listeners: {render: function(e) {Ext.QuickTips.register({  target: e.getEl(), text: 'Плановый срок исполнения по'});}}
} */
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
				listeners:{  focus: function()   { if(this.store.count(false)==0) this.store.load();  } ,render: function(e) {Ext.QuickTips.register({  target: e.getEl(), text: 'Кто контролирует'});} },
				xtype:  'combobox',
				store: cmbstore_iu_u_def,
				valueField:     'id',
				displayField:   'brief',
				typeAhead: true,
				name:   'iu_task_controller_id',
				itemId:   'iu_task_controller_id',
				fieldLabel:  '',
				emptyText:      'Кто контролирует',
				hideLabel:  true
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
                            handler: function(){
								this.up('form').DoFind();
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
									filters.push({property: 'filtermode', value: filterTask});
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
   
		
	
		 var selection = selections[0];
        if (selection) {
			
				//this.down('#taskstop').setDisabled(false);
		
		}
		
    },
    listeners: {
	   select: function( obj, record, index, eOpts )
        {
           // console.log(record.getData() );
        //    this.down('#b2s_info_preview_form').getForm().loadRecord(record);

            
			this.down('#edit').setDisabled(false);
			this.down('#rearchive').setDisabled(false);
			
		},
        itemdblclick: function() { 
    	    this.onEditClick();
        }
        ,
        	added:function(){
        			//interval_autoiu_task= setInterval(function() {  
        			//	store_v_autoiu_task_trash.load();
        			//}, 60000);
        		}
        	,
        	destroy:function(){
        		//clearInterval(interval_autoiu_task);
        }
    },
   
    onEditClick: function(){
        var selection = this.getView().getSelectionModel().getSelection()[0];
        if (selection) {
   	    if(CheckOperation('iu_t.edit')!=0 ){
			var edit = Ext.create('iu.windowObjects');
                edit.prefix='c_v_autoiu_task';
                edit.setTitle('Просмотр документа: Задача') ;
			var p=eval('iu_t_Panel_read( selection.get(\'instanceid\'), false, selection )') ;
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
	
 onReArchive: function(){
      var selection = this.getView().getSelectionModel().getSelection()[0];
      if (selection) {
   	    if(CheckOperation('iu_urok.edit')!=0 && OTAllowDelete('iu_urok')){
        Ext.Msg.show({
            title:  'Восстановить?',
            msg:    'Восстановить документ из корзины?',
        	buttons: Ext.Msg.YESNO,
        	icon:   Ext.MessageBox.QUESTION,
        	fn: function(btn,text,opt){
        		if(btn=='yes'){
        			opt.caller.onReArchiveConfirmed(opt.selectedRow);
        	    }
        	},
            caller: this,
            selectedRow: selection
        });
        }else{
        		Ext.MessageBox.show({
                title:  'Контроль прав.',
                msg:    'Удаление объектов не разрешено!',
                buttons: Ext.MessageBox.OK,icon:   Ext.MessageBox.WARNING
        		});
        }
      }
    },
	
	onReArchiveConfirmed: function(selection){
        if (selection) {
  
			  Ext.Ajax.request({
				url:    rootURL+'index.php/app/ReArchiveDocument',
					method:  'POST',
					params: { 
							documentid: selection.get('instanceid'),
							typename:'iu_t'
							},
					success: function(){
							 store_v_autoiu_task_trash.load({params:{archived:1}});
					}
				});
        }
    },
    onRefreshClick: function(){
             this.store.load({params:{archived:1}});
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
function iu_t_Jrnl_trash(){ 

  var iu_t= Ext.create('Ext.form.Panel', {
       closable: true,
       id:     'iu_t_jrnl_trash',
       title: 'Задачи. Корзина',
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
            itemId:'gr_autoiu_task_trash',
            xtype:'g_v_autoiu_task_trash',
			stateful: stateFulSystem,
			stateId: 'j_v_autoiu_task_trash',
			//default_filter:[{key:'iu_task_urokdone',value:'0'}],
            layout: 'fit',
            flex: 1,
            store: store_v_autoiu_task_trash
    }] // tabpanel
    }); //Ext.Create
	
	

	store_v_autoiu_task_trash.load({params:{archived:1}});
	
    return iu_t;
}
Ext.define('ObjectWindow_iu_t_trash_trash', {
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
    iconCls:  'icon-lightning',
    title:  'Задача. Корзина',
    items:[ ]
	});
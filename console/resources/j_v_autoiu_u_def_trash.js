
  var store_v_autoiu_u_def_trash = Ext.create('Ext.data.Store', {
        model:'model_v_autoiu_u_def',
        autoLoad: false,
        autoSync: false,
        remoteSort: true,
        remoteFilter:true,
        pageSize : 30,
        proxy: {
            type:   'ajax',
                url:   rootURL+'index.php/c_v_autoiu_u_def/getRows',
            extraParams: {archived:1}, 
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

var groupingFeature_autoiu_u_def_trash = Ext.create('Ext.grid.feature.Grouping',{
groupByText:  'Группировать по этому полю',
showGroupsText:  'Показать группировку'
});
var interval_autoiu_u_def_trash;
Ext.define('grid_autoiu_u_def_trash', {
    extend:  'Ext.grid.Panel',
    alias: 'widget.g_v_autoiu_u_def_trash',
    requires: [
        'Ext.grid.*',
        'Ext.form.field.Text',
        'Ext.toolbar.TextItem'
    ],
    initComponent: function(){
        Ext.apply(this, {
        frame: false,
        store: store_v_autoiu_u_def_trash,
        features: [groupingFeature_autoiu_u_def_trash],
        defaultDockWeights : { top: 7, bottom: 5, left: 1, right: 3 },
        
        viewConfig: {
               enableTextSelection: true
        },
        dockedItems: [{
                xtype:  'toolbar',
                     items: [{
                    iconCls:  'icon-application_form_edit',
                    text:   'Открыть',
                    itemId:  'edit',
                    disabled: true,
                    scope:  this,
                    handler : this.onEditClick
                    },{
                    iconCls:  'icon-arrow_undo',
                    text:   'Восстановить',
                    itemId:  'rearchive',
                    disabled: true,
                    scope:  this,
                    handler : this.onReArchive
                    },
					 {
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
                }
				]
            }],
        columns: [
			{
				xtype: 'rownumberer',
				width: 50,
				sortable: false
			},
            {text: "Фамилия", width:120, dataIndex: 'iu_u_def_lastname', sortable: true}
            ,
            {text: "Имя", width:120, dataIndex: 'iu_u_def_name', sortable: true}
            ,
            {text: "Отчество", width:120, dataIndex: 'iu_u_def_surname', sortable: true}
            ,
            {text: "Роль в производстве", width:120, dataIndex: 'iu_u_def_currole', sortable: true}
            ,
            {text: "Город", width:120, dataIndex: 'iu_u_def_thetown', sortable: true}
            ,
            {text: "Оповещать по почте", width:120, dataIndex: 'iu_u_def_sendtomail', sortable: true}
            ,
      {text: "Удаленная работа", width:120, dataIndex: 'iu_u_def_freelancer', sortable: true}
            ,
            {xtype: 'templatecolumn', text: "e-mail", width:120,  sortable: true ,tpl: '<a href="mailto:{iu_u_def_email}">{iu_u_def_email}</a>'}
            ,
            {text: "Телефон", width:120, dataIndex: 'iu_u_def_thephone', sortable: true}

        ]
        ,
        bbar: Ext.create('Ext.PagingToolbar', {
        store: store_v_autoiu_u_def_trash,
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
name:   'iu_u_def_lastname',
itemId:   'iu_u_def_lastname',
fieldLabel:  '',
emptyText:      'Фамилия',
hideLabel:  true,
listeners: {render: function(e) {Ext.QuickTips.register({  target: e.getEl(), text: 'Фамилия'});}}
}
,
{

value:  '',
name:   'iu_u_def_name',
itemId:   'iu_u_def_name',
fieldLabel:  '',
emptyText:      'Имя',
hideLabel:  true,
listeners: {render: function(e) {Ext.QuickTips.register({  target: e.getEl(), text: 'Имя'});}}
}
,
{

value:  '',
name:   'iu_u_def_surname',
itemId:   'iu_u_def_surname',
fieldLabel:  '',
emptyText:      'Отчество',
hideLabel:  true,
listeners: {render: function(e) {Ext.QuickTips.register({  target: e.getEl(), text: 'Отчество'});}}
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
listeners:{  focus: function()   { if(this.store.count(false)==0) this.store.load();  } ,render: function(e) {Ext.QuickTips.register({  target: e.getEl(), text: 'Роль в производстве'});} },
xtype:  'combobox',
store: cmbstore_iu_crole,
valueField:     'id',
displayField:   'brief',
typeAhead: true,
name:   'iu_u_def_currole_id',
itemId:   'iu_u_def_currole_id',
fieldLabel:  '',
emptyText:      'Роль в производстве',
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
listeners:{  focus: function()   { if(this.store.count(false)==0) this.store.load();  } ,render: function(e) {Ext.QuickTips.register({  target: e.getEl(), text: 'Город'});} },
xtype:  'combobox',
store: cmbstore_iud_town,
valueField:     'id',
displayField:   'brief',
typeAhead: true,
name:   'iu_u_def_thetown_id',
itemId:   'iu_u_def_thetown_id',
fieldLabel:  '',
emptyText:      'Город',
hideLabel:  true
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
store: enum_Boolean,
valueField:     'value',
displayField:   'name',
typeAhead: true,
queryMode:      'local',
emptyText:      '',
name:   'iu_u_def_sendtomail_val',
itemId:   'iu_u_def_sendtomail_val',
fieldLabel:  '',
emptyText:      'Оповещать по почте',
hideLabel:  true,
listeners: {render: function(e) {Ext.QuickTips.register({  target: e.getEl(), text: 'Оповещать по почте'});}}
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
store: enum_Boolean,
valueField:     'value',
displayField:   'name',
typeAhead: true,
queryMode:      'local',
emptyText:      '',
name:   'iu_u_def_freelancer_val',
itemId:   'iu_u_def_freelancer_val',
fieldLabel:  '',
emptyText:      'Удаленная работа',
hideLabel:  true,
listeners: {render: function(e) {Ext.QuickTips.register({  target: e.getEl(), text: 'Удаленная работа'});}}
}
,
{

value:  '',
name:   'iu_u_def_email',
itemId:   'iu_u_def_email',
fieldLabel:  '',
emptyText:      'e-mail',
hideLabel:  true,
listeners: {render: function(e) {Ext.QuickTips.register({  target: e.getEl(), text: 'e-mail'});}}
}
,
{

value:  '',
name:   'iu_u_def_thephone',
itemId:   'iu_u_def_thephone',
fieldLabel:  '',
emptyText:      'Телефон',
hideLabel:  true,
listeners: {render: function(e) {Ext.QuickTips.register({  target: e.getEl(), text: 'Телефон'});}}
}
,
{

value:  '',
name:   'iu_u_def_login',
itemId:   'iu_u_def_login',
fieldLabel:  '',
emptyText:      'Имя для входа',
hideLabel:  true,
listeners: {render: function(e) {Ext.QuickTips.register({  target: e.getEl(), text: 'Имя для входа'});}}
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
      
	
        this.down('#edit').setDisabled(selections.length === 0);
		this.down('#rearchive').setDisabled((selections.length === 0));
	
    },
    listeners: {
        itemdblclick: function() { 
    	    this.onEditClick();
        }
        ,
        	added:function(){
        			//interval_autoiu_u_def_trash= setInterval(function() {  
        			//	store_v_autoiu_u_def_trash.load();
        			//}, 60000);
        		}
        	,
        	destroy:function(){
        		//clearInterval(interval_autoiu_u_def_trash);
        }
    }
	,
    
    onEditClick: function(){
        var selection = this.getView().getSelectionModel().getSelection()[0];
        if (selection) {
   	    if(CheckOperation('iu_u.edit')!=0 ){
                var edit = Ext.create('iu.windowObjects');
                edit.prefix='c_v_autoiu_u_def_trash';
                edit.setTitle('Просмотр документа: Сотрудник') ;
            var p=eval('iu_u_Panel_read( selection.get(\'instanceid\'), false, selection )') ;
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
    },  onReArchive: function(){
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
							typename:'iu_u'
							},
					success: function(){
							 store_v_autoiu_u_def_trash.load({params:{archived:1}});
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
function iu_u_Jrnl_trash(){ 

  var iu_u= Ext.create('Ext.form.Panel', {
       closable: true,
       id:     'iu_u_jrnl_trash',
       title: 'Сотрудники. Корзина',
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
            itemId:'gr_autoiu_u_def_trash',
            xtype:'g_v_autoiu_u_def_trash',
			stateful: stateFulSystem,
			stateId: 'j_v_autoiu_u_def_trash',
            layout: 'fit',
            flex: 1,
            store: store_v_autoiu_u_def_trash
    }] // tabpanel
    }); //Ext.Create
	
	
    return iu_u;
}
Ext.define('ObjectWindow_iu_u_trash', {
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
    iconCls:  'icon-user',
    title:  'Сотрудник. Корзина',
    items:[ ]
	});
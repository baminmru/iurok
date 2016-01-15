
 var store_v_autoiu_tmdef_trash = Ext.create('Ext.data.Store', {
        model:'model_v_autoiu_tmdef',
        autoLoad: false,
        autoSync: false,
        remoteSort: true,
        remoteFilter:true,
        pageSize : 30,
        proxy: {
            type:   'ajax',
                url:   rootURL+'index.php/c_v_autoiu_tmdef/getRows',
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

var groupingFeature_autoiu_tmdef_trash = Ext.create('Ext.grid.feature.Grouping',{
groupByText:  'Группировать по этому полю',
showGroupsText:  'Показать группировку'
});
var interval_autoiu_tmdef_trash;
Ext.define('grid_autoiu_tmdef_trash', {
    extend:  'Ext.grid.Panel',
    alias: 'widget.g_v_autoiu_tmdef_trash',
    requires: [
        'Ext.grid.*',
        'Ext.form.field.Text',
        'Ext.toolbar.TextItem'
    ],
    initComponent: function(){
        Ext.apply(this, {
        frame: false,
        store: store_v_autoiu_tmdef_trash,
        features: [groupingFeature_autoiu_tmdef_trash],
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
                    } ,{
                    iconCls:  'icon-arrow_undo',
                    text:   'Восстановить',
                    itemId:  'rearchive',
                    disabled: true,
                    scope:  this,
                    handler : this.onReArchive
                    }, {
                    iconCls:  'icon-page_excel',
                    text:   'Экспорт',
                    itemId:  'bExport',
                    scope:  this,
                    handler: this.onExportClick
                }]
            }],
        columns: [
			{
				xtype: 'rownumberer',
				width: 50,
				sortable: false
			},
            {text: "Фамилия", width:120, dataIndex: 'iu_tmdef_lastname', sortable: true}
            ,
            {text: "Имя", width:120, dataIndex: 'iu_tmdef_name', sortable: true}
            ,
            {text: "Отчество", width:120, dataIndex: 'iu_tmdef_surname', sortable: true}
            ,
            {text: "Предметы", width:120, dataIndex: 'iu_tmdef_subjects', sortable: true}
            ,
            {text: "Классы", width:120, dataIndex: 'iu_tmdef_classes', sortable: true}
            ,
            {text: "Телефон", width:120, dataIndex: 'iu_tmdef_thephone', sortable: true}
            ,
            {text: "e-mail", width:120, dataIndex: 'iu_tmdef_email', sortable: true}
            ,
            {text: "Оповещать по почте", width:120, dataIndex: 'iu_tmdef_sendtomail', sortable: true}
            ,
            {text: "Регалии", width:120, dataIndex: 'iu_tmdef_regal', sortable: true}
            ,
            {text: "Методист", width:120, dataIndex: 'iu_tmdef_ismethodist', sortable: true}
            ,
            {text: "Город", width:120, dataIndex: 'iu_tmdef_thetown', sortable: true}
            ,
            {text: "Место работы", width:120, dataIndex: 'iu_tmdef_workat', sortable: true}
        ]
        ,
        bbar: Ext.create('Ext.PagingToolbar', {
        store: store_v_autoiu_tmdef_trash,
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
name:   'iu_tmdef_lastname',
itemId:   'iu_tmdef_lastname',
fieldLabel:  '',
emptyText:      'Фамилия',
hideLabel:  true,
listeners: {render: function(e) {Ext.QuickTips.register({  target: e.getEl(), text: 'Фамилия'});}}
}
,
{

value:  '',
name:   'iu_tmdef_name',
itemId:   'iu_tmdef_name',
fieldLabel:  '',
emptyText:      'Имя',
hideLabel:  true,
listeners: {render: function(e) {Ext.QuickTips.register({  target: e.getEl(), text: 'Имя'});}}
}
,
{

value:  '',
name:   'iu_tmdef_surname',
itemId:   'iu_tmdef_surname',
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
listeners:{  focus: function()   { if(this.store.count(false)==0) this.store.load();  } ,render: function(e) {Ext.QuickTips.register({  target: e.getEl(), text: 'Предметы'});} },
xtype:  'combobox',
store: cmbstore_iud_predmet,
valueField:     'brief',
displayField:   'brief',
typeAhead: true,
name:   'iu_tmdef_subjects',
itemId:   'iu_tmdef_subjects',
fieldLabel:  '',
emptyText:      'Предметы',
hideLabel:  true
}
,
{

value:  '',
name:   'iu_tmdef_classes',
itemId:   'iu_tmdef_classes',
fieldLabel:  '',
emptyText:      'Классы',
hideLabel:  true,
listeners: {render: function(e) {Ext.QuickTips.register({  target: e.getEl(), text: 'Классы'});}}
}
,
{

value:  '',
name:   'iu_tmdef_thephone',
itemId:   'iu_tmdef_thephone',
fieldLabel:  '',
emptyText:      'Телефон',
hideLabel:  true,
listeners: {render: function(e) {Ext.QuickTips.register({  target: e.getEl(), text: 'Телефон'});}}
}
,
{

value:  '',
name:   'iu_tmdef_email',
itemId:   'iu_tmdef_email',
fieldLabel:  '',
emptyText:      'e-mail',
hideLabel:  true,
listeners: {render: function(e) {Ext.QuickTips.register({  target: e.getEl(), text: 'e-mail'});}}
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
name:   'iu_tmdef_sendtomail_val',
itemId:   'iu_tmdef_sendtomail_val',
fieldLabel:  '',
emptyText:      'Оповещать по почте',
hideLabel:  true,
listeners: {render: function(e) {Ext.QuickTips.register({  target: e.getEl(), text: 'Оповещать по почте'});}}
}
,
{

value:  '',
name:   'iu_tmdef_regal',
itemId:   'iu_tmdef_regal',
fieldLabel:  '',
emptyText:      'Регалии',
hideLabel:  true,
listeners: {render: function(e) {Ext.QuickTips.register({  target: e.getEl(), text: 'Регалии'});}}
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
name:   'iu_tmdef_ismethodist_val',
itemId:   'iu_tmdef_ismethodist_val',
fieldLabel:  '',
emptyText:      'Методист',
hideLabel:  true,
listeners: {render: function(e) {Ext.QuickTips.register({  target: e.getEl(), text: 'Методист'});}}
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
name:   'iu_tmdef_thetown_id',
itemId:   'iu_tmdef_thetown_id',
fieldLabel:  '',
emptyText:      'Город',
hideLabel:  true
}
,
{

value:  '',
name:   'iu_tmdef_workat',
itemId:   'iu_tmdef_workat',
fieldLabel:  '',
emptyText:      'Место работы',
hideLabel:  true,
listeners: {render: function(e) {Ext.QuickTips.register({  target: e.getEl(), text: 'Место работы'});}}
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
                                var filters = new Array();
                                this.up('form').getForm().reset();
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
                            }//
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
    
        this.down('#edit').setDisabled(selections.length === 0);
		this.down('#rearchive').setDisabled((selections.length === 0));
    },
    listeners: {
        itemdblclick: function() { 
    	    this.onEditClick();
        }
        ,
        	added:function(){
        			//interval_autoiu_tmdef_trash= setInterval(function() {  
        			//	store_v_autoiu_tmdef_trash.load();
        			//}, 60000);
        		}
        	,
        	destroy:function(){
        		//clearInterval(interval_autoiu_tmdef_trash);
        }
    },
   

    onEditClick: function(){
        var selection = this.getView().getSelectionModel().getSelection()[0];
        if (selection) {
   	    if(CheckOperation('iu_tm.edit')!=0 ){
                var edit = Ext.create('iu.windowObjects');
                edit.prefix='c_v_autoiu_tmdef_trash';
                edit.setTitle('Просмотр  документа: Учителя и Методисты') ;
            var p=eval('iu_tm_Panel_read( selection.get(\'instanceid\'), false, selection )') ;
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
							typename:'iu_tm'
							},
					success: function(){
							 store_v_autoiu_tmdef_trash.load({params:{archived:1}});
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
function iu_tm_Jrnl_trash(){ 

  var iu_tm= Ext.create('Ext.form.Panel', {
       closable: true,
       id:     'iu_tm_jrnl_trash',
       title: 'Учителя и Методисты. Корзина',
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
            itemId:'gr_autoiu_tmdef_trash',
            xtype:'g_v_autoiu_tmdef_trash',
			stateful: stateFulSystem,
			stateId: 'j_v_autoiu_tmdef_trash',
            layout: 'fit',
            flex: 1,
            store: store_v_autoiu_tmdef_trash
    }] // tabpanel
    }); //Ext.Create
	
	store_v_autoiu_tmdef_trash.load({params:{archived:1}});
    return iu_tm;
}
Ext.define('ObjectWindow_iu_tm_trash', {
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
    iconCls:  'icon-group',
    title:  'Учителя и Методисты. Корзина',
    items:[ ]
	});
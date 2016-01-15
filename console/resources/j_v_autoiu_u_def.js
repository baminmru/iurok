
//////////////// change password //////////////////////
var usr_instanceid='';
Ext.define('Form_uw_password', 
	{
		extend:  'Ext.form.Panel',
		alias: 'widget.f_uw_password',
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
								fieldLabel:'Новый пароль',
								name:'newpassword',
								itemId:'newpassword',
								inputType:'password',
								allowBlank:false,
								value:'',
								x:5,
								y:5,
								labelWidth :170,
								minWidth: 270,
								width: 270,
								maxWidth: 270
							},
							{
								fieldLabel:'Подтверждение пароля',
								name:'comppassword',
								itemId:'comppassword',
								inputType:'password',
								allowBlank:false,
								value:'',
								x:5,
								y:35,
								labelWidth :170,
								minWidth: 270,
								width: 270,
								maxWidth: 270
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
									text:   'Сохранить',
									disabled: false,
									scope:  this,
									handler:function()
									{
										var form = this.getForm();
										if(form.isValid()){
										    if(form._fields.items[1].getValue()==form._fields.items[2].getValue()){
													form._fields.items[0].setValue(usr_instanceid);
													form.submit(
													{
														url: 'index.php/app2/setpassword',
														waitMsg: 'Сохранение...',
														success: function(f,response){
															var text = response.result.msg;
															//var res =Ext.decode(text);
															if(text=="OK"){
																Ext.MessageBox.show({
																title:  'Подтверждение',
																msg:    'Изменения сохранены',
																buttons: Ext.MessageBox.OK,
																icon:   Ext.MessageBox.INFO
																});
																var wn = this.form.owner.ownerCt;
																wn.close();
															
															}else{
																Ext.MessageBox.show({
																	title:  'Ошибка',
																	msg:    text,
																	buttons: Ext.MessageBox.OK,
																	icon:   Ext.MessageBox.ERROR
																});
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
														}

													}
												);
											}	
										}else{
											uw_newpassword='';
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

Ext.define('EditWindow_uw_password',{
    extend:  'Ext.window.Window',
    height: 140,
    width: 300,
    layout:  'fit',
    autoShow: true,
    modal: true,
    closeAction: 'destroy',
    iconCls:  'icon-user_key',
    title:  'Изменить пароль',
    items:[
		{
			xtype:'f_uw_password'
		}
	]
	}
);
//////////////////////////////////////////////////////



var groupingFeature_autoiu_u_def = Ext.create('Ext.grid.feature.Grouping',{
groupByText:  'Группировать по этому полю',
showGroupsText:  'Показать группировку'
});
var interval_autoiu_u_def;
Ext.define('grid_autoiu_u_def', {
    extend:  'Ext.grid.Panel',
    alias: 'widget.g_v_autoiu_u_def',
    requires: [
        'Ext.grid.*',
        'Ext.form.field.Text',
        'Ext.toolbar.TextItem'
    ],
    initComponent: function(){
        Ext.apply(this, {
        frame: false,
        store: store_v_autoiu_u_def,
        features: [groupingFeature_autoiu_u_def],
        defaultDockWeights : { top: 7, bottom: 5, left: 1, right: 3 },
        
        viewConfig: {
               enableTextSelection: true
        },
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
                    },
					{
                    iconCls:  'icon-user_key',
                    text:   'Изменить пароль',
                    disabled: true,
                    itemId:  'password',
                    scope:  this,
                    handler : this.onPassword
                    },					{
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
                }, {
						   xtype: 'button',
							iconCls:  'icon-email_add',
							text:   'Подписаться',
							itemId:  'subscribe',
							scope:  this,
							handler: this.onSubscribeClick
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
            ,
            {text: "Имя для входа", width:120, dataIndex: 'iu_u_def_login', sortable: true, hidden:true}
        ]
     /*   ,
        bbar: 
		[ {xtype:'component'}
		]
		Ext.create('Ext.PagingToolbar', {
        store: store_v_autoiu_u_def,
        displayInfo: true,
        displayMsg:  'Показаны строки с {0} по {1} из {2}',
        emptyMsg: 'нет данных'
        
        })*/

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
        this.down('#delete').setDisabled(selections.length === 0);
		this.down('#password').setDisabled(selections.length === 0);
        this.down('#edit').setDisabled(selections.length === 0);
		this.down('#subscribe').setDisabled(selections.length === 0);
    },
    listeners: {
        itemdblclick: function() { 
    	    this.onEditClick();
        }
        ,
        	added:function(){
        			//interval_autoiu_u_def= setInterval(function() {  
        			//	store_v_autoiu_u_def.load();
        			//}, 60000);
        		}
        	,
        	destroy:function(){
        		//clearInterval(interval_autoiu_u_def);
        }
    },
	onPassword:function(){
		  var selection = this.getView().getSelectionModel().getSelection()[0];
		  if (selection) {
			if(CheckOperation('iu_u.edit')!=0 && OTAllowDelete('iu_u' )){
				usr_instanceid = selection.get('instanceid');
				var edit = Ext.create('EditWindow_uw_password');
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
	
				
	}
	,
    onDeleteConfirm:function(selection){
      if (selection) {
        Ext.Ajax.request({
            url:    rootURL+'index.php/c_v_autoiu_u_def/deleteRow',
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
   	    if(CheckOperation('iu_u.edit')!=0 && OTAllowDelete('iu_u')){
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
   	    if(CheckOperation('iu_u.edit')!=0 && OTAllowAdd('iu_u')){
            Ext.Ajax.request({
                url: rootURL+'index.php/c_v_autoiu_u_def/newRow',
                method:  'POST',
                params: { 
                },
                success: function(response){
                var text = response.responseText;
                var res =Ext.decode(text);
                var edit = Ext.create('iu.windowObjects');
                edit.prefix='c_v_autoiu_u_def';
                edit.setTitle('Создание документа:Сотрудник') ;
                var p=eval('iu_u_Panel_'+OTAddMode('iu_u')+'( res.data, false,null )') ;
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
   	    if(CheckOperation('iu_u.edit')!=0 ){
                var edit = Ext.create('iu.windowObjects');
                edit.prefix='c_v_autoiu_u_def';
                edit.setTitle('Редактирование документа: Сотрудник') ;
            var p=eval('iu_u_Panel_'+OTEditMode('iu_u')+'( selection.get(\'instanceid\'), false, selection )') ;
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
	
	 onSubscribeClick: function(){
		var selection = this.getView().getSelectionModel().getSelection()[0];
        if (selection) {
             Ext.Ajax.request({
                url: rootURL+'index.php/wf/Subscribe',
                method:  'POST',
                params: { 
					eventtype:'%',
					theprocess:null,
					processstatus:null,
					statetask:null,
					doer:selection.get('id'),
					thedoc:null,
					thevideo:null,
					thediscussion:null
                },
                success: function(response){
					var text = response.responseText;
					var res =Ext.decode(text);
				Ext.MessageBox.show({
                title:  'Подписка',
                msg:    'Подписка зарегистрирована',
                buttons: Ext.MessageBox.OK,
				icon:   Ext.MessageBox.INFO
        		});
                }
            });
		}
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
function iu_u_Jrnl(){ 

  var iu_u= Ext.create('Ext.form.Panel', {
       closable: true,
       id:     'iu_u_jrnl',
       title: 'Сотрудники',
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
            itemId:'gr_autoiu_u_def',
            xtype:'g_v_autoiu_u_def',
			stateful: stateFulSystem,
			stateId: 'j_v_autoiu_u_def',
            layout: 'fit',
            flex: 1,
            store: store_v_autoiu_u_def
    }] // tabpanel
    }); //Ext.Create
	
	if(OTAllowDelete('iu_u')){
		iu_u.items.getAt(0).columns[iu_u.items.getAt(0).columns.length-1].show();
	}
    return iu_u;
}
Ext.define('ObjectWindow_iu_u', {
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
    title:  'Сотрудник',
    items:[ ]
	});
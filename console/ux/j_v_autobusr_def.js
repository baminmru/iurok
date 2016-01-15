
//////////////// change status //////////////////////
var usr_instanceid='';
var usr_fio='';
Ext.define('Form_uw_status', 
	{
		extend:  'Ext.form.Panel',
		alias: 'widget.f_uw_status',
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
								name:'fio',
								itemId:'fio',
								fieldLabel:  'Сотрудник',
								xtype:'textfield',
								readOnly:true,
								minWidth: 400,
								width: 400,
								maxWidth: 400,
								x: 5, 
								y: 10
							},
							{
								minWidth: 400,
								width: 400,
								maxWidth: 400,
								x: 5, 
								y: 40, 

								xtype: 'combobox',
								store: enum_Status,
								valueField:     'name', 
								displayField:   'name',
								typeAhead: true,
								queryMode:      'local',
								emptyText:      '',
								name:   'cmbstatus',
								itemId: 'cmbstatus',
								fieldLabel:  'Статус',
								labelClsExtra:'x-item-mandatory',
								allowBlank:false, listeners:{
									select:function (combo, selection) {
									var post = selection[0];
										if (post) {
											var stid =post.get('value');
											var nn =combo.ownerCt.getComponent('notes');
											
											if (stid==0){
												nn.disable();
												nn.setValue('');
											}else{
												nn.enable();
											}

										}
									}
								}
							},
							{
								minWidth: 400,
								minHeight:70,
								x: 5, 
								y: 75, 
								labelAlign:  'top',
								xtype:  'textfield',
								value:  '',
								name:   'notes',
								itemId:   'notes',
								fieldLabel:  'Комментарий к статусу',
								allowBlank:true,
								disabled:true
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
									text:   'Изменить',
									disabled: false,
									scope:  this,
									handler:function()
									{
										var form = this.getForm();
										if(form.isValid()){
												form._fields.items[0].setValue(usr_instanceid);
												form.submit(
												{
													url: 'index.php/c_v_autobusr_def/setStatus',
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
												
										}else{
											uw_newstatus='';
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

Ext.define('EditWindow_uw_status',{
    extend:  'Ext.window.Window',
    height: 230,
    width: 450,
    layout:  'fit',
    autoShow: true,
    modal: true,
    closeAction: 'destroy',
    iconCls:  'icon-application_form',
    title:  'Изменить статус',
    items:[
		{
			xtype:'f_uw_status'
		}
	]
	}
);
//////////////////////////////////////////////////////




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
								name:'fio',
								itemId:'fio',
								fieldLabel:  'Сотрудник',
								xtype:'textfield',
								readOnly:true,
								minWidth: 400,
								width: 400,
								maxWidth: 400,
								x: 5, 
								y: 10
							},
							{
								fieldLabel:'Новый пароль',
								name:'newpassword',
								itemId:'newpassword',
								//inputType:'password',
								allowBlank:false,
								value:'',
								x:5,
								y:40,
								labelWidth :170,
								minWidth: 400,
								width: 400,
								maxWidth: 400,
								minLength:8,
								minLengthText : 'Длинна пароля не менее 8 символов'
							},
							{
								fieldLabel:'Подтверждение пароля',
								name:'comppassword',
								itemId:'comppassword',
								inputType:'password',
								allowBlank:false,
								value:'',
								x:5,
								y:70,
								labelWidth :170,
								minWidth: 400,
								width: 400,
								maxWidth: 400,
								minLength:8,
								minLengthText : 'Длинна пароля не менее 8 символов'
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
										    if(form._fields.items[2].getValue()==form._fields.items[3].getValue()){
													form._fields.items[0].setValue(usr_instanceid);
													form._fields.items[1].setValue(usr_fio);
													form.submit(
													{
														url: 'index.php/c_v_autobusr_def/setpassword',
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
											}else{
												Ext.MessageBox.show({
															title:  'Ошибка',
															msg:    'Новый пароль не совпадает с подтверждением пароля',
															buttons: Ext.MessageBox.OK,
															icon:   Ext.MessageBox.ERROR
															});
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
    height: 190,
    width: 440,
    layout:  'fit',
    autoShow: true,
    modal: true,
    closeAction: 'destroy',
    iconCls:  'icon-application_form',
    title:  'Изменить пароль',
    items:[
		{
			xtype:'f_uw_password'
		}
	]
	}
);
//////////////////////////////////////////////////////



var groupingFeature_autobusr_def = Ext.create('Ext.grid.feature.Grouping',{
});
var interval_autobusr_def;
Ext.define('grid_autobusr_def', {
    extend:  'Ext.grid.Panel',
    alias: 'widget.g_v_autobusr_def',
    requires: [
        'Ext.grid.*',
        'Ext.form.field.Text',
        'Ext.toolbar.TextItem'
    ],
    initComponent: function(){
        Ext.apply(this, {
        iconCls:  'icon-grid',
        frame: true,
        title: "Cотрудник",
        store: store_v_autobusr_def,
		stateful: false,
		stateId: 'store_v_autobusr_def',
		features: [{
				id: 'group',
				ftype: 'groupingsummary',
				hideGroupedHeader: true,
				enableGroupingMenu: false
			}],
          dockedItems: [{
                xtype:  'toolbar',
                items: [ {
                    iconCls:  'icon-user_add',
                    text:   'Мастер создания пользователя',
                    scope:  this,
                    handler : this.onWizard
                    }
					
					/* ,{
                    iconCls:  'icon-application_form_add',
                    text:   'Создать',
                    scope:  this,
                    handler : this.onAddClick
                    } */
					, {
                    iconCls:  'icon-user_edit',
                    text:   'Изменить',
                    itemId:  'edit',
                    disabled: true,
                    scope:  this,
                    handler : this.onEditClick
                    }, 
					
					/*
					{
                    iconCls:  'icon-application_form_delete',
                    text:   'Удалить',
                    disabled: true,
                    itemId:  'delete',
                    scope:  this,
                    handler : this.onDeleteClick
                    }, 
					*/
						{
                    iconCls:  'icon-user_alert',
                    text:   'Изменить статус',
                    disabled: true,
                    itemId:  'hire',
                    scope:  this,
                    handler : this.onHireClick
                    },
					
					{
                    iconCls:  'icon-user_key',
                    text:   'Изменить пароль',
                    disabled: true,
                    itemId:  'password',
                    scope:  this,
                    handler : this.onPassword
                    },
					
					{
                    iconCls:  'icon-table_refresh',
                    text:   'Обновить',
                    itemId:  'bRefresh',
                    scope:  this,
                    handler : this.onRefreshClick
                   } 
				
				]
            }],
        columns: [
			{text: "Менеджер", width:120, dataIndex: 'busr_def_themanager', sortable: true}
            ,
            {text: "Фамилия", flex: 1, dataIndex: 'busr_def_lastname', sortable: true}
            ,
            {text: "Имя", flex: 1, dataIndex: 'busr_def_firstname', sortable: true}
            ,
            {text: "Отчество", flex: 1, dataIndex: 'busr_def_patronymic', sortable: true}
          //  ,
          // {text: "Адрес прописки", width:70, dataIndex: 'busr_def_adrreg', sortable: true ,hidden: true,  hideable: true}
           // ,
           // {text: "Данные паспорта", width:70, dataIndex: 'busr_def_passport', sortable: true,hidden: true,  hideable: true}
           // , 
           // {text: "Домашний адрес", width:70, dataIndex: 'busr_def_adrhome', sortable: true,hidden: true,  hideable: true}
           // ,
			// {text: "Домащний телефон", width:70, dataIndex: 'busr_def_phone', sortable: true,hidden: true,  hideable: true}
            ,
            {text: "Рекламный телефон", flex: 1, dataIndex: 'busr_def_mobile1', sortable: true}
            ,
           {text: "Личный телефон", flex: 1, dataIndex: 'busr_def_mobile2', sortable: true,hidden: true,  hideable: true}
           /*  ,
            {text: "Файл фотографии", width:70, dataIndex: 'busr_def_photofilename', sortable: true} */
            ,
            {text: "ИНН", width:70, dataIndex: 'busr_def_inn', sortable: true,hidden: true,  hideable: true}
           // ,
          //  {text: "Пенсионное страховое свидетельство", width:70, dataIndex: 'busr_def_thenumberpens', sortable: true,hidden: true,  hideable: true}
            ,
            {text: "Дата рождения", width:70, dataIndex: 'busr_def_datebirth', sortable: true,hidden: true,  hideable: true}
           // , 
           // {text: "Табельный номер", width:70, dataIndex: 'busr_def_thenumberacc', sortable: true,hidden: true,  hideable: true}
            ,
            {text: "Пол", width:70, dataIndex: 'busr_def_thesex', sortable: true,hidden: true,  hideable: true}
            ,
            {text: "Примечание", width:70, dataIndex: 'busr_def_thecomment', sortable: true,hidden: true,  hideable: true}
            ,
            {text: "Имя для входа", width:70, dataIndex: 'busr_def_loginname', sortable: true,hidden: true,  hideable: true}
            ,
            {text: "e-mail", width:100, dataIndex: 'busr_def_email', sortable: true}
			,
			{text: "Роль", width:130, dataIndex: 'busr_def_therole', sortable: true}
            ,
			{text: "Подразделение", width:130, dataIndex: 'busr_def_thedept', sortable: true}
            ,
            {text: "Должность", width:130, dataIndex: 'busr_def_refpost', sortable: true}
            ,
            {text: "статус", width:90, dataIndex: 'statusname', sortable: true}
        ]
        ,
        bbar: Ext.create('Ext.PagingToolbar', {
        store: store_v_autobusr_def,
        displayInfo: true,
        displayMsg:  'Показаны строки с {0} по {1} из {2}',
        emptyMsg: 'нет данных'
        
        })
		
		,
        rbar:[
			{
				xtype: 'panel',
				title:'Фильтр / Поиск',
				iconCls:'icon-page_white_find',
				flex:1,
				collapsible:true,
				collapseDirection : 'right',
				animCollapse: false, 
				titleCollapse:true,
				bodyPadding:5,
				width:195,
				minWidth:195,
				
				autoScroll:true,
		  		layout: 
		  		{
		  			type: 'vbox',
		  			align: 'stretch'
		  		},
				defaultType:'textfield',
				items:[
					{
						xtype:'fieldset',
						title: 'По пользователю',
						defaultType: 'textfield',
						defaults: {anchor: '100%'},
						items :[
						   {
							xtype:'textfield',
							width:160,
							maxWidth:160,
							emptyText:'',
							name:'busr_def_lastname',
							fieldLabel:'Агент'
							},
							 {
							xtype:'textfield',
							width:160,
							maxWidth:160,
							emptyText:'',
							name:'busr_def_themanager',
							fieldLabel:'Менеджер'
							},
						]
					},
					{
						xtype: 'fieldset',
						title: 'Статус',
						layout:'vbox',
						items: [
							{
								xtype: 'radiogroup',
								name:'status',
								layout:'vbox',
								items: [
									{ boxLabel: 'Активен', name: 'status', inputValue: '0'},
									{ boxLabel: 'Не активен',  name: 'status', inputValue: '1'},
									{ boxLabel: 'Все',  name: 'status', inputValue: '2',checked: true}
								]
							}
						]
					},
					
					
					{   
						xtype: 'textfield',
						name: 'busr_def_thedept_id',
						dataIndex: 'busr_def_thedept_id',
						hidden: true,
						listeners: {
							change: function( field, newValue, oldValue, eOpts )
							{
								if(newValue = '' || !newValue)
								{
									this.up('form').down('treepanel').getSelectionModel().deselectAll(true);
								}
								//field.up('panel').checkCls();
							}
						}
					},
					{
						xtype: 'treepanel',
						itemId: 'dept_tree',
						flex: 1,
						margin: '0',
						border: 1,
						title: 'Подразделение',
						loadMask: true,
						rootVisible: true,
						selModel: Ext.create('Ext.selection.CheckboxModel', {mode: 'MULTI'}),
						store: {
							model:'model_bfrm_struct',
							autoLoad: true,
							clearOnLoad: true,
							nodeParam:  'treeid',
							defaultRootId:  '{00000000-0000-0000-0000-000000000000}',
							root: {
								otdel: 'Организация',
								id: '{00000000-0000-0000-0000-000000000000}',
								expanded: true
							},
							proxy: {
								type:   'ajax',
								url:   'index.php/c_bfrm_struct2/getRowsAllTree',
								
								reader: {
									type:   'json'
								}
							}
						},
						columns: [
							{
								xtype: 'treecolumn',
								text: 'Название', 
								flex:1, 
								dataIndex: 'otdel', 
								sortable: true
							}
						],
						listeners: {
							selectionchange: function()
							{
								var data = this.getSelectionModel().getSelection();
								if (data.length>0){
									var tmp = new Array();
									for(key in data)
									{
										var row = data[key];
										tmp.push(row.get('id'));
									}
									txt = Ext.encode(tmp);
									this.up('form').getForm().setValues({busr_def_thedept_id: txt});
								}else{
									this.up('form').getForm().setValues({busr_def_thedept_id: ''});
								}
							
							}
						}
					}
					
				],
				buttons: [{
					text: 'Сбросить',
					iconCls:'icon-cancel',
					scope:  this,
					handler: function() {
						this.up('form').getForm().reset();
						if(this.default_filter==null){
							this.store.clearFilter();
						}else{
							var filters = new Array();
							for (var i=0; i< this.default_filter.length;i++) {
								var kv=this.default_filter[i];
								filters.push({property: kv.key, value: kv.value});
							}
							this.store.filters.clear();
							this.store.filter(filters);
						}
						this.store.load();
					}
				}, {
					text: 'Найти',
					iconCls:'icon-find',
					formBind: true, //only enabled once the form is valid
					disabled: false,
					scope:  this,
					handler: function() {
						var user_input = this.up('form').getForm().getValues(false,true);
						var filters = new Array();
						if(this.default_filter!=null){
							for (var i=0; i< this.default_filter.length;i++) {
								var kv=this.default_filter[i];
								filters.push({property: kv.key, value: kv.value});
							}
						}
						for (var key in user_input) {
							filters.push({property: key, value: user_input[key]});
						}
						this.store.filters.clear();
						this.store.filter(filters);
						this.store.load();
						
					}
				}]
			}] //rbar

        }
        );
        this.callParent();
        this.getSelectionModel().on('selectionchange', this.onSelectChange, this);
        this.store.load()
       },
        onSelectChange: function(selModel, selections){
        this.down('#hire').setDisabled(selections.length === 0);
		this.down('#password').setDisabled(selections.length === 0);
        this.down('#edit').setDisabled(selections.length === 0);
    },
    listeners: {
        itemdblclick: function() { 
    	    this.onEditClick();
        }
        ,
        	added:function(){
        			/* 
					interval_autobusr_def= setInterval(function() {  
        				store_v_autobusr_def.load();
        			}, 60000);
					*/
        		}
        	,
        	destroy:function(){
        		//clearInterval(interval_autobusr_def);
        }
    },
    onDeleteConfirm:function(selection){
      if (selection) {
        Ext.Ajax.request({
            url:    'index.php/c_v_autobusr_def/deleteRow',
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
   	  if(CheckOperation('BUSR.edit')!=0){
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
	
	
	onPassword:function(){
		  var selection = this.getView().getSelectionModel().getSelection()[0];
		  if (selection) {
			if(CheckOperation('BUSR.Password')!=0){
				usr_instanceid = selection.get('instanceid');
				usr_fio =selection.get('busr_def_lastname') + ' ' +selection.get('busr_def_firstname')+ ' ' + selection.get('busr_def_patronymic');
     
				var edit = Ext.create('EditWindow_uw_password');
				edit.down('#fio').setValue(usr_fio);
				edit.show();
			
			}else{
					Ext.MessageBox.show({
					title:  'Контроль прав.',
					msg:    'Изменение пароля не разрешено!',
					buttons: Ext.MessageBox.OK,
				   icon:   Ext.MessageBox.WARNING
					});
			}
		  }
	
				
	}
	,
	
    onHireClick: function(){
   
	
		
		var selection = this.getView().getSelectionModel().getSelection()[0];
		  if (selection) {
			if(CheckOperation('BUSR.edit')!=0){
				usr_instanceid = selection.get('instanceid');
				usr_fio =selection.get('busr_def_lastname') + ' ' +selection.get('busr_def_firstname')+ ' ' + selection.get('busr_def_patronymic');
				var edit = Ext.create('EditWindow_uw_status');
				edit.down('#fio').setValue(usr_fio);
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
	 onWizard: function(){
   	    if(CheckOperation('BUSR.edit')!=0){
          showUserWizard();
        }else{
        		Ext.MessageBox.show({
                title:  'Контроль прав.',
                msg:    'Создание объектов не разрешено!',
                buttons: Ext.MessageBox.OK,
               icon:   Ext.MessageBox.WARNING
        		});
        }
    },
	
    onAddClick: function(){
   	if(CheckOperation('BUSR.edit')!=0){
            Ext.Ajax.request({
                url: 'index.php/c_v_autobusr_def/newRow',
                method:  'POST',
                params: { 
                },
                success: function(response){
                var text = response.responseText;
                var res =Ext.decode(text);
                var edit = Ext.create('ObjectWindow_busr');
                var p=BUSR_Panel_( res.data, false ) ;
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
   	    if(CheckOperation('BUSR.edit')!=0){
            //alert("Edit Cотрудник");
            var edit = Ext.create('ObjectWindow_busr');
            var p=BUSR_Panel_( selection.get('instanceid'), false ) ;
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
    
    }
    );
Ext.require([
'Ext.form.*'
]);
function BUSR_Jrnl(){ 
	store_v_autobusr_def.clearFilter();
	store_v_autobusr_def.load();
  var BUSR= Ext.create('Ext.form.Panel', {
       closable: true,
       id:     'busr_jrnl',
       title: 'Cотрудник',
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
            itemId:'gr_autobusr_def',
            xtype:'g_v_autobusr_def',
            layout: 'fit',
            flex: 1,
            store: store_v_autobusr_def
    }] // tabpanel
    }); //Ext.Create

    return BUSR;
}
Ext.define('ObjectWindow_busr', {
    extend:  'Ext.window.Window',
    maxHeight: 620,
    minHeight: 620,
    minWidth: 800,
    maxWidth: 1024,
    layout:  'fit',
    autoShow: true,
    closeAction: 'destroy',
    modal: true,
    iconCls:  'icon-application_form',
    title:  'Cотрудник',
		/* listeners:{
			beforeclose:function( thisform, eOpts ){
				
				if(!this.items.items[0].canClose()){
				var instanceid=this.items.items[0].instanceid;
				var result=true;
					  Ext.Msg.show({
						title:  'Информация',
						msg:    'Форма не заполнена и будет удалена',
						buttons: Ext.Msg.OK,
						icon:   Ext.MessageBox.INFO,
						fn: function(btn,text,opt){
							//if(btn=='yes'){
								 Ext.Ajax.request({
										url:    'index.php/c_v_autobusr_def/deleteRow',
										method:  'POST',
										params: { 
												instanceid: instanceid
												}
									});
							//		result=true;
							//}else{
							//result=false;
							//}
						}
						
					});
					return result;
				}else{
					return true;
				}
			}
		},
		*/
    items:[ ]
	});
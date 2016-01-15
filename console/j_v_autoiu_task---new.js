//////////////// forms //////////////////////
var task_instanceid='';



Ext.define('cmbmodel_tasksn',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'iud_sn_defid',type: 'string'}
            ,{name: 'brief',type: 'string'}
        ]
    });

    var cmbstore_tasksn = Ext.create('Ext.data.Store', {
        model:'cmbmodel_tasksn',
        autoLoad: false,
        autoSync: false,
        proxy: {
            type:   'ajax',
                url:   rootURL+'index.php/wf/getTaskSN',
            reader: {
                type:   'json'
                ,root:  'data'
                ,successProperty:  'success'
                ,messageProperty:  'msg'
            }
        },
       listeners: {
       
       }
    });


Ext.define('Form_task_done', 
	{
		extend:  'Ext.form.Panel',
		alias: 'widget.f_task_done',
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
								xtype:'fieldset', 
								anchor: '100%',
								x: 0, 
								layout:'absolute', 
								id:'iu_task_1',
								//title:      'Результат',
								defaultType:  'textfield',
									items: [
											{
													minWidth: 720,
													xtype: 'textarea', 
													x: 5, 
													y: 5, 
													height: 80, 
													labelWidth:140,

													value:  '',
													name:   'doer_comment',
													itemId:   'doer_comment',
													fieldLabel:  'Комментарий к задаче',
													allowBlank:true
											}
											,
											{
													/* flex_field */ 
													minWidth: 720,
													width: 720,
													maxWidth: 720,
													x: 5, 
													y: 95, 
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
													store: cmbstore_tasksn,
													valueField:     'id',
													displayField:   'brief',
													typeAhead: true,
													emptyText:      '',
													name:   'doer_states',
													itemId:   'doer_states',
													fieldLabel:  'Статус',
													allowBlank:true
											}
								
							   ], 
							   height: 180
								} // group
							
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
									text:   'Завершить',
									disabled: false,
									scope:  this,
									handler:function()
									{
										var form = this.getForm();
										if(form.isValid()){
											form._fields.items[0].setValue(task_instanceid);
											form.submit(
												{
													url: rootURL+'index.php/wf/TaskDone',
													waitMsg: 'Сохранение...',
													success: function(f,response){
														var text = response.result.msg;
														//var res =Ext.decode(text);
														if(text=="ok"){
															/*Ext.MessageBox.show({
															title:  'Подтверждение',
															msg:    'Задача завершена',
															buttons: Ext.MessageBox.OK,
															icon:   Ext.MessageBox.INFO
															});*/
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
														store_v_autoiu_task.load();
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

Ext.define('EditWindow_task_done',{
    extend:  'Ext.window.Window',
    height: 240,
    width: 780,
    layout:  'fit',
    autoShow: true,
    modal: true,
    closeAction: 'destroy',
    iconCls:  'icon-flag_green',
    title:  'Завершение задачи',
    items:[
		{
			xtype:'f_task_done'
		}
	]
	}
);



Ext.define('Form_task_cancel', 
	{
		extend:  'Ext.form.Panel',
		alias: 'widget.f_task_cancel',
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
								xtype:'fieldset', 
								anchor: '100%',
								x: 0, 
								layout:'absolute', 
								id:'iu_task_1',
								//title:      'Причина отмены',
								defaultType:  'textfield',
									items: [
											{
													minWidth: 720,
													xtype: 'textarea', 
													x: 5, 
													y: 5, 
													height: 80, 
													labelWidth:140,

													value:  '',
													name:   'doer_comment',
													itemId:   'doer_comment',
													fieldLabel:  'Причина отмены'
											}
										
								
							   ], 
							   height: 150
								} // group
							
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
									text:   'Завершить',
									disabled: false,
									scope:  this,
									handler:function()
									{
										var form = this.getForm();
										if(form.isValid()){
										   
												form._fields.items[0].setValue(task_instanceid);
												form.submit(
												{
													url: rootURL+'index.php/wf/TaskCancel',
													waitMsg: 'Сохранение...',
													success: function(f,response){
														var text = response.result.msg;
														//var res =Ext.decode(text);
														if(text=="ok"){
															/*Ext.MessageBox.show({
															title:  'Подтверждение',
															msg:    'Задача отменена',
															buttons: Ext.MessageBox.OK,
															icon:   Ext.MessageBox.INFO
															});*/
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
														store_v_autoiu_task.load();
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

Ext.define('EditWindow_task_cancel',{
    extend:  'Ext.window.Window',
    height: 220,
    width: 780,
    layout:  'fit',
    autoShow: true,
    modal: true,
    closeAction: 'destroy',
    iconCls:  'icon-flag_red',
    title:  'Отмена задачи',
    items:[
		{
			xtype:'f_task_cancel'
		}
	]
	}
);

Ext.define('Form_task_check', 
	{
		extend:  'Ext.form.Panel',
		alias: 'widget.f_task_check',
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
								xtype:'fieldset', 
								anchor: '100%',
								x: 0, 
								layout:'absolute', 
								id:'iu_task_1',
								//title:      'Результат',
								defaultType:  'textfield',
									items: [
											{
													minWidth: 720,
													xtype: 'textarea', 
													x: 5, 
													y: 5, 
													height: 80, 
													labelWidth:140,

													value:  '',
													name:   'controller_comment',
													itemId:   'controller_comment',
													fieldLabel:  'Комментарий к задаче'
											}
										
								
							   ], 
							   height: 150 
								} // group
							
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
									text:   'Завершить',
									disabled: false,
									scope:  this,
									handler:function()
									{
										var form = this.getForm();
										if(form.isValid()){
											form._fields.items[0].setValue(task_instanceid);
											form.submit(
												{
													url: rootURL+'index.php/wf/TaskCheck',
													waitMsg: 'Сохранение...',
													success: function(f,response){
														var text = response.result.msg;
														//var res =Ext.decode(text);
														if(text=="ok"){
															/*Ext.MessageBox.show({
															title:  'Подтверждение',
															msg:    'Задача проверена',
															buttons: Ext.MessageBox.OK,
															icon:   Ext.MessageBox.INFO
															});*/
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
														store_v_autoiu_task.load();
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

Ext.define('EditWindow_task_check',{
    extend:  'Ext.window.Window',
    height: 220,
    width: 780,
    layout:  'fit',
    autoShow: true,
    modal: true,
    closeAction: 'destroy',
    iconCls:  'icon-emoticon_smile',
    title:  'Отметка о проверке задачи',
    items:[
		{
			xtype:'f_task_check'
		}
	]
	}
);



Ext.define('Form_task_checkbad', 
	{
		extend:  'Ext.form.Panel',
		alias: 'widget.f_task_checkbad',
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
								xtype:'fieldset', 
								anchor: '100%',
								x: 0, 
								layout:'absolute', 
								id:'iu_task_1',
								//title:      'Результат',
								defaultType:  'textfield',
									items: [
											{
													minWidth: 720,
													xtype: 'textarea', 
													x: 5, 
													y: 5, 
													height: 80, 
													labelWidth:140,

													value:  '',
													name:   'controller_comment',
													itemId:   'controller_comment',
													fieldLabel:  'Комментарий к задаче'
											}
										
								
							   ], 
							   height: 150 
								} // group
							
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
									text:   'На доработку',
									disabled: false,
									scope:  this,
									handler:function()
									{
										var form = this.getForm();
										if(form.isValid()){
											form._fields.items[0].setValue(task_instanceid);
											form.submit(
												{
													url: rootURL+'index.php/wf/TaskCheckBad',
													waitMsg: 'Сохранение...',
													success: function(f,response){
														var text = response.result.msg;
														//var res =Ext.decode(text);
														if(text=="ok"){
														/*	Ext.MessageBox.show({
															title:  'Подтверждение',
															msg:    'Возвращено исполнителю',
															buttons: Ext.MessageBox.OK,
															icon:   Ext.MessageBox.INFO
															}); */
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
														store_v_autoiu_task.load();
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

Ext.define('EditWindow_task_checkbad',{
    extend:  'Ext.window.Window',
    height: 220,
    width: 780,
    layout:  'fit',
    autoShow: true,
    modal: true,
    closeAction: 'destroy',
    iconCls:  'icon-emoticon_unhappy',
    title:  'Вернуть на доработку',
    items:[
		{
			xtype:'f_task_checkbad'
		}
	]
	}
);
/*
Ext.define('cmbmodel_delegate',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'id',type: 'string'}
            ,{name: 'brief',type: 'string'}
        ]
    });

    var cmbstore_delegate = Ext.create('Ext.data.Store', {
        model:'cmbmodel_delegate',
        autoLoad: false,
        autoSync: false,
        proxy: {
            type:   'ajax',
                url:   rootURL+'index.php/wf/getDelegates',
            reader: {
                type:   'json'
                ,root:  'data'
                ,successProperty:  'success'
                ,messageProperty:  'msg'
            }
        },
       listeners: {
       
       }
    });

*/

Ext.define('Form_task_deleagte', 
	{
		extend:  'Ext.form.Panel',
		alias: 'widget.f_taskdelegate',
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
								xtype:'fieldset', 
								anchor: '100%',
								x: 0, 
								layout:'absolute', 
								id:'iu_task_1',
								//title:      'Делегирование',
								defaultType:  'textfield',
									items: [
											
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
													editable: true,
													enableRegEx: true,
													queryMode:'local',
													store: cmbstore_iu_u_def, // cmbstore_delegate,
													valueField:     'id',
													displayField:   'brief',
													typeAhead: true,
													emptyText:      '',
													name:   'doer',
													itemId:   'doer',
													fieldLabel:  'Новый исполнитель',
													allowBlank:false,
													listeners:{  focus: function()   { if(this.store.count(false)==0) this.store.load();  }  }
											}
								
							   ], 
							   height: 90
								} // group
							
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
									text:   'Передать',
									disabled: false,
									scope:  this,
									handler:function()
									{
										var form = this.getForm();
										if(form.isValid()){
											form._fields.items[0].setValue(task_instanceid);
											form.submit(
												{
													url: rootURL+'index.php/wf/TaskDelegate',
													waitMsg: 'Сохранение...',
													success: function(f,response){
														var text = response.result.msg;
														
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
														store_v_autoiu_task.load();
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


Ext.define('EditWindow_task_delegate',{
    extend:  'Ext.window.Window',
    height: 140,
    width: 780,
    layout:  'fit',
    autoShow: true,
    modal: true,
    closeAction: 'destroy',
    iconCls:  'icon-user_go',
    title:  'Передать задачу',
    items:[
		{
			xtype:'f_taskdelegate'
		}
	]
	}
);




Ext.define('Form_task_stopdelegate', 
	{
		extend:  'Ext.form.Panel',
		alias: 'widget.f_taskstopdelegate',
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
								xtype:'fieldset', 
								anchor: '100%',
								x: 0, 
								layout:'absolute', 
								id:'iu_task_1',
								//title:      'Отмена делегирования',
								defaultType:  'textfield',
									items: [
											
											
											{
													minWidth: 720,
													xtype: 'textarea', 
													x: 5, 
													y: 5, 
													height: 80, 
													labelWidth:140,

													value:  '',
													name:   'controller_comment',
													itemId:   'controller_comment',
													fieldLabel:  'Причина отмены',
													allowBlank:false
											}
								
							   ], 
							   height: 150
								} // group
							
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
									text:   'Отменить',
									disabled: false,
									scope:  this,
									handler:function()
									{
										var form = this.getForm();
										if(form.isValid()){
											form._fields.items[0].setValue(task_instanceid);
											form.submit(
												{
													url: rootURL+'index.php/wf/TaskStopDelegate',
													waitMsg: 'Сохранение...',
													success: function(f,response){
														var text = response.result.msg;
														
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
														store_v_autoiu_task.load();
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


Ext.define('EditWindow_task_stopdelegate',{
    extend:  'Ext.window.Window',
    height: 220,
    width: 780,
    layout:  'fit',
    autoShow: true,
    modal: true,
    closeAction: 'destroy',
    iconCls:  'icon-user_cross',
    title:  'Отменить делегированную задачу',
    items:[
		{
			xtype:'f_taskstopdelegate'
		}
	]
	}
);

//////////////////////////////////////////////////////



	
function taskRenderer(value, metaData, record, row, col, store, gridView) 
{ 

	  if(metaData==null) return value;
      var dat = Date.now();
	  var parts = record.get('iu_task_planenddate').split(' ');
	  var dparts  =parts[0].split('-');
	  var hparts =parts[1].split(':');
 
	  var d2= new Date(dparts[0], dparts[1]-1, dparts[2],hparts[0],hparts[1],hparts[2]);
	  var hours = (d2 - dat) / 3600000;
	 
	if(( hours < 24 && hours > 0 )   && record.get('iu_task_taskcancelled')=='нет' && record.get('iu_task_taskfinished')=='нет' ) 
		metaData.style = metaData.style + 'background-color:#DBB84D; ';
		
    if(d2 < dat   &&  record.get('iu_task_taskcancelled')=='нет' &&  record.get('iu_task_taskfinished')=='нет' ) 
		metaData.style = metaData.style + 'background-color:red; ';
		
    if(  record.get('iu_task_taskfinished')=='да'  &&  record.get('iu_task_contoller')!=''  && record.get('iu_task_ischecked')!='да' ) 
 		metaData.style = metaData.style + 'color:blue; ';
		
	if( record.get('iu_task_taskcancelled')=='да' || 
	   (record.get('iu_task_taskfinished')=='да'  && (record.get('iu_task_contoller')=='' ) ||  ( record.get('iu_task_contoller')!='' && record.get('iu_task_ischecked')=='да')) ) 
			metaData.style = metaData.style + 'color:#909090; ';
		//return '<del>' + value +'</del>';
    return value;
}

function taskDateRenderer(value, metaData, record, row, col, store, gridView) 
{ 
     
	
		
	var svalue='';
	if (value !=''){
		  var parts2 = value.split(' ');
		  var dparts2  =parts2[0].split('-');
		  var hparts2 =parts2[1].split(':');
		  svalue=dparts2[2]+'/'+ dparts2[1] +'/'+ dparts2[0]+ ' '+hparts2[0] +':'+hparts2[1] +':'+ hparts2[2];
	}
		
	if(metaData==null) return svalue; 
	 var dat = Date.now();
	  var parts = record.get('iu_task_planenddate').split(' ');
	  var dparts  =parts[0].split('-');
	  var hparts =parts[1].split(':');
 
	  var d2= new Date(dparts[0], dparts[1]-1, dparts[2],hparts[0],hparts[1],hparts[2]);
	  var hours = (d2 - dat) / 3600000;
	if(( hours < 24 && hours > 0 )   && record.get('iu_task_taskcancelled')=='нет'&& record.get('iu_task_taskfinished')=='нет' ) 
		metaData.style = metaData.style + 'background-color:#DBB84D; ';
		
    if(d2 < dat   &&  record.get('iu_task_taskcancelled')=='нет' &&  record.get('iu_task_taskfinished')=='нет' ) 
		metaData.style = metaData.style + 'background-color:red; ';
		
    if(  record.get('iu_task_taskfinished')=='да'  &&  record.get('iu_task_contoller')!=''  && record.get('iu_task_ischecked')!='да' ) 
 		metaData.style = metaData.style + 'color:blue; ';
		
	if( record.get('iu_task_taskcancelled')=='да' || 
	   (record.get('iu_task_taskfinished')=='да'  && (record.get('iu_task_contoller')=='' ) ||  ( record.get('iu_task_contoller')!='' && record.get('iu_task_ischecked')=='да')) ) 
			metaData.style = metaData.style + 'color:#909090; ';
		//return '<del>' + value +'</del>';
    return svalue;
}


var groupingFeature_autoiu_task = Ext.create('Ext.grid.feature.Grouping',{
groupByText:  'Группировать по этому полю',
showGroupsText:  'Показать группировку'
});

var filterTask="active";
var FastFilterTask = function(){	
};
var interval_autoiu_task;
Ext.define('grid_autoiu_task', {
    extend:  'Ext.grid.Panel',
    alias: 'widget.g_v_autoiu_task',
    requires: [
        'Ext.grid.*',
        'Ext.form.field.Text',
        'Ext.toolbar.TextItem'
    ],
    initComponent: function(){
        Ext.apply(this, {
        frame: false,
        store: store_v_autoiu_task,
        features: [groupingFeature_autoiu_task],
        defaultDockWeights : { top: 7, bottom: 5, left: 1, right: 3 },
        
        viewConfig: {
            enableTextSelection: true
        },
	
		dockedItems: [
				{
					xtype:  'toolbar',
					items: [ 
							{
								xtype: 'button',
								iconCls: 'icon-iu_task_all_1',
								scale: 'large',
								//text: 'Все',
								iconAlign: 'top', 
								width:50,
								listeners:{
									toggle:function( btn, pressed, eOpts ){
										if(pressed) btn.setIconCls('icon-iu_task_all'); else  btn.setIconCls('icon-iu_task_all_1'); 
									},
									render: function(e) {Ext.QuickTips.register({  target: e.getEl(), text: 'Все задачи по открытым урокам'});}
								},
								
								handler : function() {
									filterTask="all";
									FastFilterTask();
								},
								toggleGroup : 'iu_tasks',
								pressed:false
							},
							{
								xtype: 'button',
								iconCls: 'icon-iu_task_todo',
								//pressedCls:'icon-iu_plan',
								scale: 'large',
								//text: 'Активные',
								iconAlign: 'top', 
								width:50,
								listeners:{
									toggle:function( btn, pressed, eOpts ){
										if(pressed) btn.setIconCls('icon-iu_task_todo'); else  btn.setIconCls('icon-iu_task_todo_1'); 
									}
									,
									render: function(e) {Ext.QuickTips.register({  target: e.getEl(), text: 'Открытые задачи'});}
								},
								handler : function() {
									filterTask="active";
									FastFilterTask();
								},
								toggleGroup : 'iu_tasks',
								pressed:true
							}, 
							 {
								xtype: 'button',
								iconCls: 'icon-iu_task_done_1',
						
								scale: 'large',
								//text: 'Завершенные',
								iconAlign: 'top',
								width:50,
								listeners:{
									toggle:function( btn, pressed, eOpts ){
										if(pressed) btn.setIconCls('icon-iu_task_done'); else  btn.setIconCls('icon-iu_task_done_1'); 
									}
									,
									render: function(e) {Ext.QuickTips.register({  target: e.getEl(), text: 'Завершенные задачи по открытым урокам'});}
								},
								handler : function() {
									filterTask="done";
									FastFilterTask();
								},
								toggleGroup : 'iu_tasks'
								
							}
							, 
							 {
								xtype: 'button',
								iconCls: 'icon-iu_task_plus_1',
						
								scale: 'large',
								//text: 'Завершенные',
								iconAlign: 'top',
								width:50,
								listeners:{
									toggle:function( btn, pressed, eOpts ){
										if(pressed) btn.setIconCls('icon-iu_task_plus'); else  btn.setIconCls('icon-iu_task_plus_1'); 
									}
									,
									render: function(e) {Ext.QuickTips.register({  target: e.getEl(), text: 'Завершенные задачи за 2 месяца'});}
								},
								handler : function() {
									filterTask="plus";
									FastFilterTask();
								},
								toggleGroup : 'iu_tasks'
								
							}
						]
				},
				{
                xtype:  'toolbar',
                     items: [{
                    iconCls:  'icon-application_form_add',
                    text:   'Создать',
                    itemId:  'add',
                    disabled: false,
                    scope:  this,
                    handler : this.onAddClick
                    },{
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
                    } ,
				   {
                    iconCls:  'icon-flag_green',
                    text:   'Завершить',
                    disabled: true,
                    itemId:  'taskdone',
                    scope:  this,
                    handler : this.onTaskDone
                    }
				   ,
				   {
                    iconCls:  'icon-flag_red',
                    text:   'Отказаться',
                    disabled: true,
                    itemId:  'taskcancel',
                    scope:  this,
                    handler : this.onTaskCancel
                    }
					,   
					{
                    iconCls:  'icon-user_go',
                    text:   'Перенаправить',
                    disabled: true,
                    itemId:  'taskdelegate',
                    scope:  this,
                    handler : this.onTaskDelegate
                    }
					,   
					{
                    iconCls:  'icon-user_cross',
                    text:   'Отменить перенаправление',
                    disabled: true,
                    itemId:  'taskstop',
                    scope:  this,
                    handler : this.onTaskStopDelegate
                    }
					
					
					,
				   {
                    iconCls:  'icon-emoticon_smile',
                    text:   'Проверено',
                    disabled: true,
                    itemId:  'taskcheck',
                    scope:  this,
                    handler : this.onTaskCheck
                    }
				   ,
				   {
                    iconCls:  'icon-emoticon_unhappy',
                    text:   'Вернуть исполнителю',
                    disabled: true,
                    itemId:  'taskcheckbad',
                    scope:  this,
                    handler : this.onTaskCheckBad
                    }
					, {
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
			{
				xtype: 'rownumberer',
				width: 50,
				sortable: false
			},
			{xtype: 'templatecolumn',text: "Страница<br/>урока", width:80, tpl:'<a href=\''+rootURL+'?id={ucode}\' target=\'_blank\'><img src=\''+rootURL+'/resources/icons/comment_dull.png\'></a>', sortable: true}
            ,	 
			{xtype: 'templatecolumn',text: "Карточка<br/>урока", width:80, tpl:'<a href=\''+rootURL+'?uid={urokid}\' target=\'_blank\'><img src=\''+rootURL+'/resources/icons/film_edit.png\'></a>', sortable: true}
			,
            {text: "Исполнитель", width:120, dataIndex: 'iu_task_doer', sortable: true, renderer: taskRenderer}
            ,
            {text: "Задача", width:160, dataIndex: 'iu_task_subj', sortable: true, renderer: taskRenderer}
          //  ,
		//	 {text: "Описание", width:160, dataIndex: 'iu_task_info', sortable: true, renderer: taskRenderer}
          
			,
			{text: "Урок", width:220, dataIndex: 'iu_task_theprocess', sortable: true, renderer: taskRenderer}
           ,
            {text: "Задача<br/>выдана", width:120, dataIndex: 'iu_task_createdate', sortable: true, renderer: taskDateRenderer}
			 ,
            {text: "Срок<br/>исполнения", width:120, dataIndex: 'iu_task_planenddate', sortable: true,renderer: taskDateRenderer}
			   ,
            {text: "Контролирует", width:120, dataIndex: 'iu_task_contoller', sortable: true, renderer: taskRenderer}
            			,
            {text: "Дата<br/>завершения", width:120, dataIndex: 'iu_task_finishdate', sortable: true, renderer: taskDateRenderer}
            ,
            {text: "Состояние", width:120, dataIndex: 'iu_task_taskfinished', sortable: true,renderer: function(value, metaData, record){
				if (record.get('iu_task_ischecked')=='да') { 
					if (record.get('iu_task_taskcancelled')=='да') return '<img src="/resources/icons/user_cross.png">';
					if (record.get('iu_task_taskfinished')=='да') return '<img src="/resources/icons/accept.png"> <img src="/resources/icons/eye.png">';
				}else{
					if (record.get('iu_task_taskcancelled')=='да') return '<img src="/resources/icons/cancel.png">';
					if (record.get('iu_task_taskfinished')=='да') return '<img src="/resources/icons/accept.png">';
					if (record.get('iu_task_isdelegated')=='да') return '<img src="/resources/icons/user.png">';
				}
				return '';
			}}
			 ,
			
            {text: "Решение", width:160, dataIndex: 'iu_task_doer_states', sortable: true, renderer: taskRenderer}
			 ,
			
            {text: "Комментарий<br/>исполнителя", width:160, dataIndex: 'iu_task_doer_comment', sortable: true, renderer: taskRenderer}
			  , 
			{text: "Комментарий<br/>проверяющего", width:160, dataIndex: 'iu_task_controller_comment', sortable: true, renderer: taskRenderer}
            
			 ,
			
            {text: "Тип<br/>процесса", width:160, dataIndex: 'iu_urok_def_processtype', sortable: true, renderer: taskRenderer}
			
            ,{text: "Четверть", width:60, dataIndex: 'iu_urok_def_thequarter', sortable: true, renderer: taskRenderer}
			 ,
			{text: "Предмет", width:120, dataIndex:'iu_urok_def_subject', sortable: true, renderer: taskRenderer}
           	,{text: "Куратор", width:100, dataIndex:'iu_urok_def_curator',  sortable: true, renderer: taskRenderer}
			,{text: "Учитель", width:100, dataIndex:'iu_urok_def_theteacher', sortable: true, renderer: taskRenderer}
			,{text: "Статус<br/>урока", width:130, dataIndex:'iu_urok_def_laststate', sortable: true, renderer: taskRenderer}
			
			 ,
            {text: "Выдана<br/> в ручную", width:120, dataIndex: 'iu_task_manualtask', sortable: true, renderer: taskRenderer} 
			/* ,
            {text: "Задача отменена", width:120, dataIndex: 'iu_task_taskcancelled', sortable: true}
            ,
            {text: "Проверена", width:120, dataIndex: 'iu_task_ischecked', sortable: true} */
          
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
					
				

				/*	Ext.create('Ext.PagingToolbar', {
					store: store_v_autoiu_task,
					displayInfo: true,
					displayMsg:  'Показаны строки с {0} по {1} из {2}',
					emptyMsg: 'нет данных'
					
					}), */
					{
						//title: Информация по задаче',
						xtype: 'fieldset',             
						
						itemId: 'task_preview_form',
						bodyPadding: 5,
						
						collapsible: false,
						titleCollapse: true,
						flex: 1,
						layout: {
							type: 'fit',
							align: 'stretch'
						},
						height: 150,
						defaultType: 'textarea',
						defaults:{
							labelAlign: 'top',
							marging:10
						},
						items:[
						/*	{
							 name: 'iu_task_subj',
							 dataIndex: 'iu_task_subj',
							 fieldLabel: 'Задача'
							},
							{
							 name: 'iu_task_planenddate',
							 dataIndex: 'iu_task_planenddate',
							 fieldLabel: 'Срок исполнения'
							},*/
							{
							 name: 'iu_task_info',
							 submitValue : false,
							 fieldLabel: 'Описание',
							 readOnly:true
							}
						]
					}
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
							if(filters.length>0)
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
						},
						
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
						},
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
				
/*				,
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
				name:   'iu_task_taskfinished_val',
				itemId:   'iu_task_taskfinished_val',
				fieldLabel:  '',
				emptyText:      'Задача завершена',
				hideLabel:  true,
				listeners: {render: function(e) {Ext.QuickTips.register({  target: e.getEl(), text: 'Задача завершена'});}}
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
				name:   'iu_task_ischecked_val',
				itemId:   'iu_task_ischecked_val',
				fieldLabel:  '',
				emptyText:      'Проверена',
				hideLabel:  true,
				listeners: {render: function(e) {Ext.QuickTips.register({  target: e.getEl(), text: 'Проверена'});}}
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
				name:   'iu_task_taskcancelled_val',
				itemId:   'iu_task_taskcancelled_val',
				fieldLabel:  '',
				emptyText:      'Отменена',
				hideLabel:  true,
				listeners: {render: function(e) {Ext.QuickTips.register({  target: e.getEl(), text: 'Проверена'});}}
				}



,
{

xtype:  'datefield',
format:'d/m/Y H:i:s',
submitFormat:'Y-m-d H:i:s',
value:  '',
name:  'iu_task_finishdate_ge',
itemId: 'iu_task_finishdate_ge',
fieldLabel: 'Дата завершения задачи C',
emptyText:'не задано',
submitEmptyText: false,
listeners: {render: function(e) {Ext.QuickTips.register({  target: e.getEl(), text: 'Дата завершения задачи C'});}}
}
,
{

xtype:  'datefield',
format:'d/m/Y H:i:s',
submitFormat:'Y-m-d H:i:s',
value:  '',
name:  'iu_task_finishdate_le',
itemId: 'iu_task_finishdate_le',
fieldLabel: 'Дата завершения задачи по',
emptyText:'не задано',
submitEmptyText: false,
listeners: {render: function(e) {Ext.QuickTips.register({  target: e.getEl(), text: 'Дата завершения задачи по'});}}
}
,
{

xtype:  'datefield',
format:'d/m/Y H:i:s',
submitFormat:'Y-m-d H:i:s',
value:  '',
name:  'iu_task_senttodoer_ge',
itemId: 'iu_task_senttodoer_ge',
fieldLabel: 'Отослано исполнителю C',
emptyText:'не задано',
submitEmptyText: false,
listeners: {render: function(e) {Ext.QuickTips.register({  target: e.getEl(), text: 'Отослано исполнителю C'});}}
}
,
{

xtype:  'datefield',
format:'d/m/Y H:i:s',
submitFormat:'Y-m-d H:i:s',
value:  '',
name:  'iu_task_senttodoer_le',
itemId: 'iu_task_senttodoer_le',
fieldLabel: 'Отослано исполнителю по',
emptyText:'не задано',
submitEmptyText: false,
listeners: {render: function(e) {Ext.QuickTips.register({  target: e.getEl(), text: 'Отослано исполнителю по'});}}
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
listeners:{  focus: function()   { if(this.store.count(false)==0) this.store.load();  } ,render: function(e) {Ext.QuickTips.register({  target: e.getEl(), text: 'Урок'});} },
xtype:  'combobox',
store: cmbstore_iu_urok_def,
valueField:     'id',
displayField:   'brief',
typeAhead: true,
name:   'iu_task_theprocess_id',
itemId:   'iu_task_theprocess_id',
fieldLabel:  '',
emptyText:      'Урок',
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
listeners:{  focus: function()   { if(this.store.count(false)==0) this.store.load();  } ,render: function(e) {Ext.QuickTips.register({  target: e.getEl(), text: 'Подэтап'});} },
xtype:  'combobox',
store: cmbstore_iu_status,
valueField:     'id',
displayField:   'brief',
typeAhead: true,
name:   'iu_task_processstatus_id',
itemId:   'iu_task_processstatus_id',
fieldLabel:  '',
emptyText:      'Подэтап',
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
listeners:{  focus: function()   { if(this.store.count(false)==0) this.store.load();  } ,render: function(e) {Ext.QuickTips.register({  target: e.getEl(), text: 'Задача'});} },
xtype:  'combobox',
store: cmbstore_iu_statustask,
valueField:     'id',
displayField:   'brief',
typeAhead: true,
name:   'iu_task_statetask_id',
itemId:   'iu_task_statetask_id',
fieldLabel:  '',
emptyText:      'Задача',
hideLabel:  true
} */
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
                                var filters = new Array();
								
                                this.up('form').getForm().reset();
                                if(this.grid.default_filter!=null){
									for (var i=0; i< this.grid.default_filter.length;i++) {
										var kv=this.grid.default_filter[i];
										filters.push({property: kv.key, value: kv.value});
									}
								}
								filters.push({property: 'filtermode', value: filterTask});
								if (this.grid.store.filters.length>0)
									this.grid.store.filters.clear();
									
								if(filters.length>0)
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
		if (filterTask!="done"){
			this.down('#taskdelegate').setDisabled(selections.length === 0);
			this.down('#edit').setDisabled(selections.length === 0);
			this.down('#delete').setDisabled(selections.length === 0);
			this.down('#taskdone').setDisabled(selections.length === 0);
			this.down('#taskcancel').setDisabled(selections.length === 0);
			
			 var selection = selections[0];
			if (selection) {
				if(selection.get('iu_task_contoller')!=''){
					this.down('#taskcheck').setDisabled(false);
					this.down('#taskcheckbad').setDisabled(false);
					this.down('#taskstop').setDisabled(false);
				}else{
					this.down('#taskcheck').setDisabled(true);
					this.down('#taskcheckbad').setDisabled(true);
					this.down('#taskstop').setDisabled(true);
				}
			}
		}else{
		  this.down('#taskdelegate').setDisabled(true);
			this.down('#edit').setDisabled(true);
			this.down('#delete').setDisabled(true);
			this.down('#taskdone').setDisabled(true);
			this.down('#taskcancel').setDisabled(true);
			this.down('#taskcheck').setDisabled(true);
			this.down('#taskcheckbad').setDisabled(true);
			this.down('#taskstop').setDisabled(true);
			
		}
		
	
		
		
    },
    listeners: {
	   select: function( obj, record, index, eOpts )
        {
         	if (filterTask!="done"){
            this.down('#task_preview_form').items.getAt(0).setValue(record.get('iu_task_info'));
			this.down('#edit').setDisabled(false);
			this.down('#taskdone').setDisabled(false);
			this.down('#taskcancel').setDisabled(false);
			this.down('#taskcheck').setDisabled(false);
			this.down('#taskcheckbad').setDisabled(false);
			 this.down('#taskdelegate').setDisabled(false);
		}else{
			this.down('#taskdelegate').setDisabled(true);
			this.down('#edit').setDisabled(true);
			this.down('#delete').setDisabled(true);
			this.down('#taskdone').setDisabled(true);
			this.down('#taskcancel').setDisabled(true);
			this.down('#taskcheck').setDisabled(true);
			this.down('#taskcheckbad').setDisabled(true);
			this.down('#taskstop').setDisabled(true);
			
		}
        },
        itemdblclick: function() { 
    	    this.onEditClick();
        }
        ,
        	added:function(){
        			interval_autoiu_task= setInterval(function() {  
        				FastFilterTask();
        			}, 600000);
        		}
        	,
        	destroy:function(){
        		clearInterval(interval_autoiu_task);
        }
    },
    onDeleteConfirm:function(selection){
      if (selection) {
        Ext.Ajax.request({
            url:    rootURL+'index.php/c_v_autoiu_task/deleteRow',
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
   	    if(CheckOperation('iu_t.edit')!=0 && OTAllowDelete('iu_t')){
				
						
						Ext.Msg.show({
							title:  'В архив?',
							msg:    'Отправить задачу в архив ?',
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
   	    if(CheckOperation('iu_t.edit')!=0 && OTAllowAdd('iu_t')){
            Ext.Ajax.request({
                url: rootURL+'index.php/c_v_autoiu_task/newRow',
                method:  'POST',
                params: { 
                },
                success: function(response){
                var text = response.responseText;
                var res =Ext.decode(text);
				var edit = Ext.create('iu.windowObjects');
                edit.prefix='c_v_autoiu_task';
                edit.setTitle('Создание документа:Задача') ;
				//var p=eval('iu_t_Panel_'+OTAddMode('iu_t')+'( res.data, false,null )') ;
                var p=eval('iu_t_Panel_ruch( res.data, false,null )') ;
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
   	    if(CheckOperation('iu_t.edit')!=0 && OTAllowAdd('iu_t')){
			var edit = Ext.create('iu.windowObjects');
                edit.prefix='c_v_autoiu_task';
                //edit.setTitle('Редактирование документа: Задачи') ;
				var ttl=selection.get('iu_task_subj')+ '. Исп.: '+selection.get('iu_task_doer') 
				if(selection.get('iu_task_contoller')+''!='')
					ttl=ttl+', Контр.: '+selection.get('iu_task_contoller')  ;
				edit.setTitle(ttl);
				if(CurrentUserID()==selection.get('iu_task_controller_id') || CurrentUserID()==selection.get('iu_task_curator_id')){
					var p=eval('iu_t_Panel_edit( selection.get(\'instanceid\'), false, selection )') ;
				}else{							
					var p=eval('iu_t_Panel_'+OTEditMode('iu_t')+'( selection.get(\'instanceid\'), false, selection )') ;
				}
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
	onTaskStopDelegate:function(){ 
         
		var selection = this.getView().getSelectionModel().getSelection()[0];
        if (selection) {
   	    if(CheckOperation('iu_task.edit')!=0){
			if(CurrentUserID()==selection.get('iu_task_controller_id')){
						task_instanceid = selection.get('instanceid');
						var edit = Ext.create('EditWindow_task_stopdelegate');
						edit.show();
			}else{
				    Ext.MessageBox.show({
					title:  'Действие не разрешено',
					msg:    'Вы не являетесь контролером по этой задаче!',
					buttons: Ext.MessageBox.OK,
				   icon:   Ext.MessageBox.WARNING
					});
			}
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
	onTaskDelegate:function(){ 
         
		var selection = this.getView().getSelectionModel().getSelection()[0];
        if (selection) {
   	    if(CheckOperation('iu_task.edit')!=0){
			if(CurrentUserID()==selection.get('iu_task_doer_id')){
						task_instanceid = selection.get('instanceid');
						//cmbstore_delegate.load();
						var edit = Ext.create('EditWindow_task_delegate');
						edit.show();
			}else{
				    Ext.MessageBox.show({
					title:  'Действие не разрешено',
					msg:    'Вы не являетесь исполнителем по этой задаче!',
					buttons: Ext.MessageBox.OK,
				   icon:   Ext.MessageBox.WARNING
					});
			}
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
    onTaskDone: function(){ 
         
		var selection = this.getView().getSelectionModel().getSelection()[0];
        if (selection) {
   	    if(CheckOperation('iu_task.edit')!=0){
			//if(CurrentUserID()==selection.get('iu_task_doer_id')){
						task_instanceid = selection.get('instanceid');
						cmbstore_tasksn.removeAll();
						cmbstore_tasksn.load({params:{taskid:task_instanceid}, callback: function(){
							var edit = Ext.create('EditWindow_task_done');
							
							if(cmbstore_tasksn.count()==0){
								edit.down('#doer_states').hide();
							}else{
								edit.down('#doer_states').allowBlank=false;
							}
							edit.show();
						
						}});
						
			/*}else{
				Ext.MessageBox.show({
					title:  'Действие не разрешено',
					msg:    'Вы не являетесь исполнителем по этой задаче!',
					buttons: Ext.MessageBox.OK,
				   icon:   Ext.MessageBox.WARNING
					});
			}*/
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
    onTaskCancel: function(){ 
         
		var selection = this.getView().getSelectionModel().getSelection()[0];
        if (selection) {
   	    if(CheckOperation('iu_task.edit')!=0){
			 var selection = this.getView().getSelectionModel().getSelection()[0];
			  if (selection) {
				if(CheckOperation('iu_u.edit')!=0){
					//if(CurrentUserID()==selection.get('iu_task_doer_id')){
						task_instanceid = selection.get('instanceid');
						var edit = Ext.create('EditWindow_task_cancel');
						edit.show();
					/*}else{
						Ext.MessageBox.show({
							title:  'Действие не разрешено',
							msg:    'Вы не являетесь исполнителем по этой задаче!',
							buttons: Ext.MessageBox.OK,
						   icon:   Ext.MessageBox.WARNING
							});
					}*/
				
				}else{
						Ext.MessageBox.show({
						title:  'Контроль прав.',
						msg:    'Изменение объектов не разрешено!',
						buttons: Ext.MessageBox.OK,
					   icon:   Ext.MessageBox.WARNING
						});
				}
			  }
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
    onTaskCheck: function(){ 
         
		var selection = this.getView().getSelectionModel().getSelection()[0];
        if (selection) {
			if(CheckOperation('iu_task.edit')!=0){
					//if(CurrentUserID()==selection.get('iu_task_controller_id')){
						task_instanceid = selection.get('instanceid');
						var edit = Ext.create('EditWindow_task_check');
						edit.show();
				/*	}else{
						Ext.MessageBox.show({
							title:  'Действие не разрешено',
							msg:    'Вы не являетесь контролером по  этой задаче!',
							buttons: Ext.MessageBox.OK,
						   icon:   Ext.MessageBox.WARNING
							});
					}
					*/
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
    onTaskCheckBad: function(){ 
         
		var selection = this.getView().getSelectionModel().getSelection()[0];
        if (selection) {
			if(CheckOperation('iu_task.edit')!=0){
					if(CurrentUserID()==selection.get('iu_task_controller_id')){
						task_instanceid = selection.get('instanceid');
						var edit = Ext.create('EditWindow_task_checkbad');
						edit.show();
					}else{
						Ext.MessageBox.show({
							title:  'Действие не разрешено',
							msg:    'Вы не являетесь контролером по  этой задаче!',
							buttons: Ext.MessageBox.OK,
						   icon:   Ext.MessageBox.WARNING
							});
					}
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
function iu_t_Jrnl(){ 

  var iu_t= Ext.create('Ext.form.Panel', {
       closable: true,
       id:     'iu_t_jrnl',
       title: 'Задачи',
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
            itemId:'gr_autoiu_task',
            xtype:'g_v_autoiu_task',
			//default_filter:[{key:'urokdone',value:'2'}],
            layout: 'fit',
            flex: 1,
            store: store_v_autoiu_task
    }] // tabpanel
    }); //Ext.Create
	
	FastFilterTask= function(){
		iu_t.items.getAt(0).down('form').DoFind();
	};
	

	FastFilterTask();
	
    return iu_t;
}
Ext.define('ObjectWindow_iu_t', {
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
    title:  'Задача',
    items:[ ]
	});
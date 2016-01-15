Ext.require([
    'Ext.form.*'
]);

 Ext.define('StartPageObjects', {
    extend: 'Ext.data.Model',
    fields: [
       {name: 'name'},
       {name: 'objok',      type: 'float'},
       {name: 'objarchive',     type: 'float'},
	   {name: 'imgage_url',      type: 'string'},
	   {name: 'market',      type: 'string'},
	   {name: 'xtype',      type: 'string'}
    ]
	//,    idProperty: 'name'
});




  var spObj ;
  var spData ;
  var S_Page;

////////////////// change photo ////////////////////////



Ext.define('Form_sp_photo', 
	{
		extend:  'Ext.form.Panel',
		alias: 'widget.f_sp_photo',
		initComponent:function () 
			{
				this.addEvents('create');
				Ext.apply(this, 
					{
			  
						url:'index.php/app/setSPPhoto',
						layout:'absolute',
						items:[
							{
								xtype:'filefield',
								name:'photo',
								fieldLabel:'Фото',
								allowBlank:false,
								buttonText:'Выберите фото...',
								width:550,
								x:10,
								y:10
							}
						], //items = accordion panel
		   
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
											form.submit(
											{
												url: 'index.php/app/setSPPhoto',
												waitMsg: 'Загрузка фото...',
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
														spData.load();
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

Ext.define('EditWindow_sp_photo', {
    extend:  'Ext.window.Window',
constrainHeader:true,
    height: '120px',
    width: 600,
    layout:  'fit',
    autoShow: true,
    modal: true,
    closeAction: 'destroy',
    iconCls:  'icon-application_form',
    title:  'Фотографии',
    items:[
		{
			xtype:'f_sp_photo'
		}
	]
	}
);

///////////////////////////////////////////////////////


///////////////// change e-mail //////////////////////

Ext.define('Form_sp_email', 
	{
		extend:  'Ext.form.Panel',
		alias: 'widget.f_sp_email',
		initComponent:function () 
			{
				this.addEvents('create');
				Ext.apply(this, 
					{
			  
						url:'index.php/app/setSPEmail',
						layout:'absolute',
						items:[
							{
								xtype:'textfield',
								name:'email',
								fieldLabel:'E-Mail',
								allowBlank:false,
								width:550,
								x:10,
								y:10
							}
						], //items = accordion panel
		   
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
											form.submit(
											{
												url: 'index.php/app/setSPEmail',
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
														spData.load();
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

Ext.define('EditWindow_sp_email',{
    extend:  'Ext.window.Window',
constrainHeader:true,
    height: '120px',
    width: 600,
    layout:  'fit',
    autoShow: true,
    modal: true,
    closeAction: 'destroy',
    iconCls:  'icon-application_form',
    title:  'Изменить адрес электронной почты',
    items:[
		{
			xtype:'f_sp_email'
		}
	]
	}
);
//////////////////////////////////////////////////////

///////////////// change comment      ////////////////

Ext.define('Form_sp_comment', 
	{
		extend:  'Ext.form.Panel',
		alias: 'widget.f_sp_comment',
		initComponent:function () 
			{
				this.addEvents('create');
				Ext.apply(this, 
					{
			  
						url:'index.php/app/setSPComment',
						layout:'absolute',
						items:[
							{
								
								xtype:'textarea',
								name:'comment',
								itemId:'comment',
								fieldLabel:'Информация',
								allowBlank:false,
								height:350,
								width:550,
								x:10,
								y:10
							}
						], //items = accordion panel
		   
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
											form.submit(
											{
												url: 'index.php/app/setSPComment',
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
														spData.load();
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

Ext.define('EditWindow_sp_comment',{
    extend:  'Ext.window.Window',
constrainHeader:true,
    height: '450px',
    width: 600,
    layout:  'fit',
    autoShow: true,
    modal: true,
    closeAction: 'destroy',
    iconCls:  'icon-application_form',
    title:  'Изменить описание',
    items:[
		{
			xtype:'f_sp_comment'
		}
	]
	}
);
//////////////////////////////////////////////////////



///////////////// change password //////////////////////

Ext.define('Form_sp_password', 
	{
		extend:  'Ext.form.Panel',
		alias: 'widget.f_sp_password',
		defaultType:'textfield',
		layout:'absolute',
		initComponent:function () 
			{
				this.addEvents('create');
				Ext.apply(this, 
					{
			  
						url:'index.php/app/setSPPassword',
						layout:'absolute',
						items:[
							{
								fieldLabel:'Старый пароль',
								name:'oldPassword',
								itemId:'oldPassword',
								//inputType:'password',
								allowBlank:false,
								value:'',
								x:5,
								y:5,
								labelWidth :170,
								minWidth: 270,
								width: 270,
								maxWidth: 270,
								minLength:8,
								minLengthText : 'Длинна пароля не менее 8 символов'
							}
							,
							{
								fieldLabel:'Новый пароль',
								name:'newPassword',
								itemId:'newPassword',
								//inputType:'password',
								allowBlank:false,
								value:'',
								x:5,
								y:45,
								labelWidth :170,
								minWidth: 270,
								width: 270,
								maxWidth: 270,
								minLength:8,
								minLengthText : 'Длинна пароля не менее 8 символов'
							},
							{
								fieldLabel:'Подтверждение пароля',
								name:'compPassword',
								itemId:'compPassword',
								inputType:'password',
								allowBlank:false,
								value:'',
								x:5,
								y:85,
								labelWidth :170,
								minWidth: 270,
								width: 270,
								maxWidth: 270,
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
										    if(form._fields.items[2].getValue()==form._fields.items[1].getValue()){
												form.submit(
													{
														url: 'index.php/app/setSPPassword',
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
																spData.load();
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

Ext.define('EditWindow_sp_password',{
    extend:  'Ext.window.Window',
constrainHeader:true,
    height: 180,
    width: 300,
    layout:  'fit',
    autoShow: true,
    modal: true,
    closeAction: 'destroy',
    iconCls:  'icon-application_form',
    title:  'Изменить пароль',
    items:[
		{
			xtype:'f_sp_password'
		}
	]
	}
);
//////////////////////////////////////////////////////


////////////////////// start page ///////////////////////

 Ext.define('StartPageObjectsDB', {
    extend: 'Ext.data.Model',
    fields: [
       {name: 'objtype'},
       {name: 'objcount',  type: 'float', convert: null,     defaultValue: 0},
       {name: 'isrent',     type: 'float', convert: null,     defaultValue: 0},
	   {name: 'objstatus',      type: 'string'}
    ],
    idProperty: 'name'
});

 Ext.define('StartPageObjectsData', {
    extend: 'Ext.data.Model',
    fields: [
		{name: 'name'},
		{name: 'otdel'},
		{name: 'firstname'},
		{name: 'lastname'},
		{name: 'patronymic'}, 
		{name: 'loginname'},
		{name: 'thecomment'},
		{name: 'photofilename'},
		{name: 'phone'},
		{name: 'email'},
		{name: 'private_email'},
		{name: 'mymoney'},
		{name: 'logo_file'}
		
    ],
    idProperty: 'name'
});










var myData = [
	['Планирование', 	2,  0,'/resources/icons/chart_bar.gif','b2s','1'],
	['Съемка', 			3,  2,'/resources/icons/camera.png','b2s','2'],
	['Монтаж',  		1,  0,'/resources/icons/cut.png','b2z','1'],
	['Постпродакшен',   4,  0,'/resources/icons/camera_edit.png','b2z','2'],
	['Проверка',  		2,  0,'/resources/icons/check_error.png','b2c',''],
	['Публикация', 		1,  0,'/resources/icons/page_white_world.png','b2p',''],
	['Завершено',		14,  3,'/resources/icons/accept.png','b2fr','']
	];
	
var myData2 = [
    ['Планирование', 	0,  0,'/resources/icons/chart_bar.gif','b2s','1'],
	['Съемка', 			0,  0,'/resources/icons/camera.png','b2s','2'],
	['Монтаж',  		0,  0,'/resources/icons/cut.png','b2z','1'],
	['Постпродакшен',   0,  0,'/resources/icons/camera_edit.png','b2z','2'],
	['Проверка',  		0,  0,'/resources/icons/check_error.png','b2c',''],
	['Публикация', 		0,  0,'/resources/icons/page_white_world.png','b2p',''],
	['Завершено',		0,  0,'/resources/icons/accept.png','b2fr','']
];
	

	
	var storeMyPageSale ;
	
	var storeMyPageRent ;
	
	
function UpdateSPObj(){
	
	
	storeMyPageSale.load();
	
};


function UpdateSPData(){
	
	//alert('Update data');
	spData.each(function(record,idx){
	
		S_Page.ownerCt.down('#agency').setValue(record.get('name')+' ('+record.get('otdel') +')');
		S_Page.ownerCt.down('#phone').setValue(record.get('phone'));
		S_Page.ownerCt.down('#email').setValue(record.get('email'));
		S_Page.ownerCt.down('#comment').setValue(record.get('thecomment'));
		S_Page.ownerCt.down('#amount').setValue(record.get('mymoney'));
			
		S_Page.ownerCt.down('#sp_picarea').setSrc(agencyimagepath +'/busr_preview/' +record.get('photofilename'));
		S_Page.ownerCt.down('#sp_logo').setSrc(agencyimagepath +'/' + (record.get('logo_file')+'').replace('images/','') );
		
		
		S_Page.ownerCt.down('#welcome_string').body.update('<b>'+record.get('lastname') +' '+ record.get('firstname')+'</b>, добро пожаловать в <b>программу <font color = Red >"Интернет Урок"</font></b>!');
	
	});
};

	
	
function StartPage() {
   
	spObj = Ext.create('Ext.data.Store', 
		{
			model:'StartPageObjectsDB',
			autoLoad: false,
			autoSync: false,
			proxy: 
			{
				type:   'ajax',
					url:   'index.php/app/getStartPageObjects',
				reader: 
				{
					type:   'json'
					,root:  'data'
					,successProperty:  'success'
					,messageProperty:  'msg'
				}
			},
		   listeners: 
		   {
			   'load': function()
			   {
				UpdateSPObj();
			   }
		   }
		}
	);
	
	spData = Ext.create('Ext.data.Store', 
		{
			model:'StartPageObjectsData',
			autoLoad: false,
			autoSync: false,
			proxy: 
			{
				type:   'ajax',
				url:   'index.php/app/getStartPageData',
				reader: 
				{
					type:   'json'
					,root:  'data'
					,successProperty:  'success'
					,messageProperty:  'msg'
				}
			},
		   listeners: 
		   {
			   'load': function()
			   {
				UpdateSPData();
			   }
		   }
		}
	);
    
	try{
	   storeMyPageSale = Ext.create('Ext.data.ArrayStore', {
        // model: 'StartPageObjects',
		 fields: [
		   {name: 'name'},
		   {name: 'objok',      type: 'float'},
		   {name: 'objarchive',     type: 'float'},
		   {name: 'imgage_url',      type: 'string'},
		   {name: 'market',      type: 'string'},
		   {name: 'xtype',      type: 'string'}
		],
        data: myData
    });
	}catch(ex){
	}
 
	
	try{
		storeMyPageRent = Ext.create('Ext.data.ArrayStore', {
        //model: 'StartPageObjects',
		 fields: [
		   {name: 'name'},
		   {name: 'objok',      type: 'float'},
		   {name: 'objarchive',     type: 'float'},
		   {name: 'imgage_url',      type: 'string'},
		   {name: 'market',      type: 'string'},
		   {name: 'xtype',      type: 'string'}
		],
        data: myData2
    });
	}catch(ex){
	}
	
	
	
	 var grid_sale = Ext.create('Ext.grid.Panel', {
        store: storeMyPageSale,
		titleAlign :'center',
		margin:5,
		columnLines:false,
		rowLines:false,
        collapsible: false,
        multiSelect: false,
		border:true,
		iconCls:'icon-book_addresses',
        columns: [
            {
				xtype: 'templatecolumn',
				align:'left',
                text     : 'Статус',
                width    : 250,
                sortable : false,
                tpl: '<img src="{imgage_url}" alt="{name}" width="16px" height="16px" />&nbsp;{name}'
            },
            {
                text     : 'Количество',
				align:'right',
				iconCls : 'icon-clock',
                width    : 120,
                sortable : false,
                dataIndex: 'objok'
            },
			{
				xtype: 'actioncolumn',
				width    : 50,
				items: [
					{
						icon: '/resources/icons/application_go.png',
						tooltip: 'Открыть список уроков.',
						
						handler: function(grid, rowIndex, colIndex) {
							var rec = grid.getStore().getAt(rowIndex);
							//alert('Продажа. Активные '+ rec.get('name'));
							if(CheckOperation('action'+rec.get('market'))!=0){
								var j=Ext.getCmp(rec.get('market') +'_jrnl_sa'+rec.get('xtype') );
						
								if(j==null){
									j=eval(rec.get('market').toUpperCase()+"_Jrnl_sa(" + rec.get('xtype') + ");");
									contentPanel.add(j);
									contentPanel.setActiveTab(j);
								}
								else{
									contentPanel.setActiveTab(j);
								}
						    }else{
									Ext.MessageBox.show({
									title:  'Контроль прав.',
									msg:    'Доступ к журналу объектов не разрешен!',
									buttons: Ext.MessageBox.OK,
								   icon:   Ext.MessageBox.WARNING
									});
							}
						}
					}
				]
			},
            {
                text     : 'На контроле',
				align:'right',
				iconCls : 'icon-clock_red',
                width    : 120,
                sortable : false,
                dataIndex: 'objarchive'
            },
			{
				xtype: 'actioncolumn',
				 width    : 50,
				items: [
					{
						icon: '/resources/icons/script_go.png',
						tooltip: 'Открыть список уроков на контроле.',
						
						handler: function(grid, rowIndex, colIndex) {
							var rec = grid.getStore().getAt(rowIndex);
							if(CheckOperation('action'+rec.get('market'))!=0){
								var j=Ext.getCmp(rec.get('market') +'_jrnl_sp'+rec.get('xtype'));
						
								if(j==null){
									j=eval(rec.get('market').toUpperCase()+"_Jrnl_sp(" + rec.get('xtype') + ");");
									contentPanel.add(j);
									contentPanel.setActiveTab(j);
								}
								else{
									contentPanel.setActiveTab(j);
								}
						    }else{
									Ext.MessageBox.show({
									title:  'Контроль прав.',
									msg:    'Доступ к журналу объектов не разрешен!',
									buttons: Ext.MessageBox.OK,
								   icon:   Ext.MessageBox.WARNING
									});
							}
						}
					}
				]
			}
        ],
        height: 220,
        width: 600,
        title: 'Уроки на различных стадиях',
        viewConfig: {
            stripeRows: true,
            enableTextSelection: true
        }
    });
	
  
	
	
	

    S_Page = Ext.create('Ext.form.Panel', 
	{
        closable:false,
        id:'myStartPage',
        title:'Стартовая страница',
		border:false,
		flex:1,
        items:
		[
         
			{
				//title:"Начало работы",
				border:false,
				xtype:"panel",
				layout:"absolute",
				closable:false,
				//collapsible:true,
				titleCollapse : true,
				maxHeight: 220,
				height:220,
				items:
				[
					{
						xtype:"panel",
						autoHeight:true,
						margin:5,
						border:false,
						layout:'absolute',
						x: 30, 
						y: 0,
						itemId:'welcome_string',
						html:'<b>Иванов Иван Иванович</b>, добро пожаловать в <b>программу <font color = Red >"Интернет урок"</font></b>!'
					},
					{
						xtype:"panel",
						autoHeight:true,
						margin:5,
						border:false,
						layout:'absolute',
						x: 0, 
						y: 30,
						items:[
							{
								xtype:'image',
								id:'sp_picarea',
								itemId:'sp_picarea',
								src: '/resources/images/defaultuser.png',
								minWidth: 120,
								width: 120,
								maxWidth: 120,
								minHeight: 120,
								height: 120,
								maxHeight: 120,
								x: 0, 
								y: 0,
								//agencyimagepath +'/busr_preview/' +record.get('photofilename')
							},
							{
								xtype:'button',
								iconCls:'icon-photo_edit',
								handler: function() {
									var edit = Ext.create('EditWindow_sp_photo');
										edit.show();
									},
								name:'chanegephoto',
								text:'Изменить фото',
								width: 120,
								x: 0, 
								y: 105
							},
							{
								xtype:"button",
								name:"changepassword",
								iconCls:'icon-building_key',
								handler: function() {
									var edit = Ext.create('EditWindow_sp_password');
									edit.show();
									
								},
								text:'Изменить пароль'	,
								minWidth: 120,
								width: 120,
								maxWidth: 120,
								x: 0, 
								y: 130
							},
							
						]
					},
					{
						xtype:"panel",
						autoHeight:true,
						border:false,
						layout:"absolute",
						x: 130, 
						y: 30,
						items:[
							{
								xtype:"textfield",
								fieldLabel:"Телефон",
								itemId:'phone',
								value:'12345678',
								readOnly: true, 
								//cls:'x-item-readonly',
								name:"textvalue",
								labelWidth :100,
								minWidth: 400,
								width: 400,
								maxWidth: 400,
								x: 5, 
								y: 50,
								//value: rmbdUser.mediaContact
							},{
								xtype:"textfield",
								fieldLabel:"E-mail",
								itemId:'email',
								value:'test@test.ru',
								readOnly: true, 
								//cls:'x-item-readonly',
								name:"textvalue",
								labelWidth :100,
								minWidth: 400,
								width: 400,
								maxWidth: 400,
								x: 5, 
								y: 90
							},{
								xtype:"button",
								name:"changeemail",
								iconCls:'icon-email_attach',
								handler: function() {
									var edit = Ext.create('EditWindow_sp_email');
									var em = edit.items.getAt(0).items.getAt(0);
									em.setValue(S_Page.ownerCt.down('#email').getValue());
									edit.show();
									
								},
								text:'Изменить'	,
								minWidth: 160,
								width: 160,
								maxWidth: 160,
								x: 410, 
								y: 90
							}
						  ]
					},
				
				]
			}
			,
			{
				xtype:"panel",
				closable:false,
				collapsible:true,
				titleCollapse : true,
				border:false,
				height: 105,
				title:"О себе",
				iconCls:'icon-information',
				autoHeight:true,
				layout:'absolute',
				items:[
					{
						xtype:"textarea",
						fieldLabel:"Информация",
						itemId:'comment',
						value:'Иванов Иван Иванович, отличается умом и сообразительностью. Обладает огромным количеством необходимых навыков, просто необходимых для занимаемой должности.',
						readOnly: true, 
						name:"textvalue",
						height: 70,
						minWidth: 910,
						width: 910,
						maxWidth: 910,
						x: 5, 
						y: 5
					},
					{
						xtype:"button",
						name:"changeinfo",
						iconCls:'icon-vcard_edit',
						handler: function() {
							var edit = Ext.create('EditWindow_sp_comment');
							var cm = edit.items.getAt(0).items.getAt(0);
							cm.setValue(S_Page.ownerCt.down('#comment').getValue());
							edit.show();
						},
						text:'Изменить'	,
						minWidth:   80,
						width: 		80,
						maxWidth:   80,
						x: 5, 
						y: 50
					}
				]
			},
		
			{
				xtype:"panel",
				closable:false,
				collapsible:true,
				titleCollapse : true,
				autoScroll:true,
				border:false,
				title:"Мои уроки",
				iconCls:'icon-box',
				layout:'absolute',
				height:330,
				items:
				[
					{
						xtype:"panel",
						closable:false,
						collapsible:false,
						border:false,
						layout:'column',
						minHeight:   35,
						height: 	 35,
						maxheight:   35,
						x:0,
						y:0,
						items:
						[
							{
								xtype:"button",
								name:"refreshdata",
								iconCls:'icon-arrow_refresh',
								handler: function() {
									spData.load();
									spObj.load();
								},
								text:'Обновить'	,
								minWidth:   80,
								width: 		80,
								maxWidth:   80,
								minHeight:   25,
								height: 	 25,
								maxheight:   25,
								y: 5,
								x: 5
							}
						]
					},
					{
						xtype:"panel",
						closable:false,
						collapsible:false,
						border:false,
						//autoScroll:true,
						layout:'column',
						height:245,
						width:950,
						x:0,
						y:30,
						items:
						[
							grid_sale
						
						]
					}
				]
		    }
			
			
		]
           
    }
	); //Ext.Create
	
	//setTimeout('spData.load();', 200)
	//setTimeout('spObj.load();', 300)
	//spData.load();
	//spObj.load();

	 
	 
	
    return S_Page;
}


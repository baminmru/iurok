var ArchfilterState='%';
var ArchfilterSubj='%';
var ArchfilterClass='%';
var ArchfilterTeacher='%';
var	ArchFastFilter;
var ArchfHead="Все предметы";




Ext.define('ArchSubjectClassDB', {
    extend: 'Ext.data.Model',
    fields: [
       {name: 'predmet', type: 'string'},
       {name: 'icon',   type: 'string'},
	   {name: 'prefix',   type: 'string'},
	   {name: 'theclass',      type: 'string',     defaultValue: 'Все предметы'},
       {name: 'cnt',     type: 'float', convert: null,     defaultValue: 0}
    ]
});

Ext.define('ArchTeachersDB', {
    extend: 'Ext.data.Model',
    fields: [
       {name: 'teacher', type: 'string'},
	   {name: 'brief', type: 'string'},
       {name: 'cnt',     type: 'float', convert: null,     defaultValue: 0}
    ]
});


var ArchsubjStore =null;
var ArchteachersStore=null;

function ArchSubjrefRenderer(value, metaData, record, row, col, store, gridView) 
{
    if(record.get('iu_urok_def_theclass') != 'Все предметы') 
		return '<a href="javascript:{ ArchfHead=\'' + record.get('groupname')+', ' + record.get('iu_urok_def_theclass')+'\'; ArchfilterTeacher=\'%\'; ArchfilterSubj=\'' + record.get('iu_urok_def_subject_id')+'\'; ArchfilterClass=\'' + record.get('iu_urok_def_theclass')+'\'; ArchFastFilter();}">' + record.get('iu_urok_def_theclass')+' класс</a>';
    else
	return '<a href="javascript:{ ArchfHead=\'Все предметы\'  ; ArchfilterTeacher=\'%\'; ArchfilterSubj=\'' + record.get('iu_urok_def_subject_id')+'\'; ArchfilterClass=\'%\'; ArchFastFilter();}">' + record.get('iu_urok_def_theclass')+'</a>';
}

function ArchRefRenderer(value, metaData, record, row, col, store, gridView) 
{
    if (value!=''){
		return ('<a href="' +value +'" target="_blank"><img src ="' + rootURL +'/resources/icons/link.png" /></a> ');
	}else{
		return '-';
	}
}

function ArchGetSubjGrid(){
	var ArchstoreSubjClass=null;
	var ArchmySubjClass = [
	[' Все',      ' <img src=\'/resources/icons/star.png\'  width=\'16px\' height=\'16px\' />&nbsp; Все', '%',	'Все предметы', 0] 
	];

	
	function ArchUpdateSubj(){

			var cntall=0;
			ArchmySubjClass.length = 1;
			ArchsubjStore.each(function(record,idx){
					var sitem=Array();
					sitem.push( record.get('predmet'));
					sitem.push( '<img src=\'/resources/icons/'+record.get('icon')+'\' width=\'16px\' height=\'16px\' />&nbsp;' +record.get('predmet') );
					sitem.push( record.get('predmet')); //record.get('prefix') + record.get('theclass'));
					sitem.push( record.get('theclass'));
					sitem.push( record.get('cnt'));
					
					cntall=cntall+parseInt(record.get('cnt'));
					//mySubjClass=Ext.Array.push(mySubjClass,sitem);
					ArchmySubjClass.push(sitem);

			});
			ArchmySubjClass[0][4]=cntall;
			ArchstoreSubjClass.load();
	}	;
	
	try{
		ArchstoreSubjClass = Ext.create('Ext.data.ArrayStore', {
			// model: 'SubjectClassDB',
			 fields: [
			   {name: 'groupname'},
			   {name: 'iu_urok_def_subject'},
			   {name: 'iu_urok_def_subject_id'},
			   {name: 'iu_urok_def_theclass'},
			   {name: 'ucount',     type: 'float'}
			],
			groupField:'groupname',
			data: ArchmySubjClass
		});
	}catch(ex){
	}
	
	ArchsubjStore = Ext.create('Ext.data.Store', 
		{
			model:'ArchSubjectClassDB',
			autoLoad: false,
			autoSync: false,
			proxy: 
			{
				type:   'ajax',
					url:   rootURL+'index.php/app/getSubjectsArch',
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
				ArchUpdateSubj();
			   }
		   }
		}
	);
	

	var Archgrid_subjclass = Ext.create('Ext.grid.Panel', {
        store: ArchstoreSubjClass,
		titleAlign :'center',
		margin:0,
		columnLines:false,
		rowLines:false,
        collapsible: false,
        multiSelect: false,
		border:false,
		hideHeaders: true,
		features: [{
        ftype: 'grouping', 
        groupHeaderTpl: [
		'{[this.CalcSum(values)]}'
		,{
			CalcSum:function(v){
				var c=0; var i=0; 
				for(i=0;i<v.rows.length;i++){ 
					c= c + parseInt(v.children[i].raw[4]);
				};
				return v.children[0].raw[1]+' ('+c+')';
			}
		}
		],
		
        hideGroupedHeader: true,
		showSummaryRow:true,
        startCollapsed: false
		}],
	    columns: [
				
					{
						text     : 'Предмет',
						align:'right',
					
						width    : 180,
						sortable : false,
						dataIndex: 'groupname'
					},
					{
					 text     : 'Класс',
					 align:'right',
					 renderer:ArchSubjrefRenderer,
						width    : 90,
						sortable : false
						},
		
					{
					 text     : 'Количество',
					 xtype: 'templatecolumn', 
					 align:'right',
					
						width    : 80,
						sortable : false,
					 tpl: '<a href="javascript:{ ArchfHead=\'{iu_urok_def_subject}, {iu_urok_def_theclass}\'; ArchfilterTeacher=\'%\'; ArchfilterSubj=\'{iu_urok_def_subject_id}\'; ArchfilterClass=\'{iu_urok_def_theclass}\'; ArchFastFilter();}">{ucount}</a>'
					}
			
        ],
        
        viewConfig: {
            enableTextSelection: true
        }
    }
 );
 ArchsubjStore.load();
 return Archgrid_subjclass;
}

function ArchGetTeacherGrid(){	
	 
	 
	 	ArchteachersStore = Ext.create('Ext.data.Store', 
		{
			model:'ArchTeachersDB',
			autoLoad: false,
			autoSync: false,
			proxy: 
			{
				type:   'ajax',
					url:   rootURL+'index.php/app/getTeachersArch',
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
				
			   }
		   }
		}
	);
	 var Archgrid_teachers=Ext.create('Ext.grid.Panel', {
				titleAlign :'center',
				margin:0,
				columnLines:false,
				rowLines:false,
				collapsible: false,
				multiSelect: false,
				hideHeaders: true,
				border:false,
				columns: [
					{
						xtype: 'templatecolumn', 
						text : 'Учитель',
						align:'left',
						width    : 160,
						sortable : true,
						tpl: '<a href="javascript:{ ArchfHead=\'{brief}\'; ArchfilterTeacher=\'{brief}\'; ArchfilterClass=\'%\'; filterSubj=\'%\'; ArchFastFilter();}">{teacher}</a>({cnt})'
					}
				],
        
				viewConfig: {
					stripeRows: true,
					enableTextSelection: true
				},
				store: ArchteachersStore
			}
		);
		ArchteachersStore.load();
	return Archgrid_teachers;
	}
	
	
	
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
	

	
var groupingFeature_autoiu_urok_def_arch = Ext.create('Ext.grid.feature.Grouping',{
groupByText:  'Группировать по этому полю',
showGroupsText:  'Показать группировку'
});


function ArchmanualRenderer(value, metaData, record, row, col, store, gridView) 
{
	if(metaData!=null)
		if(record.get('iu_urok_def_manualcontrol') != 'нет')  metaData.style = metaData.style + 'background-color:yellow; ';
    return value;
}

function ArchmanualDateRenderer(value, metaData, record, row, col, store, gridView) 
{
	if(metaData!=null)
		if(record.get('iu_urok_def_manualcontrol') != 'нет')  metaData.style = metaData.style + 'background-color:yellow; ';
	var svalue='';
	if (value !=''){
		  var parts2 = value.split(' ');
		  var dparts2  =parts2[0].split('-');
		  var hparts2 =parts2[1].split(':');
		  svalue=dparts2[2]+'/'+ dparts2[1] +'/'+ dparts2[0]+ ' '+hparts2[0] +':'+hparts2[1] +':'+ hparts2[2];
	}
		
    return svalue;
}




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
		default_filter:[{key:'iu_urok_def_isdone_val',value:'1'}],
		titleAlign :'center',
		title:'Все предметы. Все',
        dockedItems: [
			{
					xtype:  'toolbar',
					items:[
					 {
							xtype: 'button',
							iconCls: 'icon-iu_arch_all_1',
							//pressedCls:'icon-iu_card',
							scale: 'large',
							text: 'Все',
							iconAlign: 'top', 
							width:85,
							listeners:{
								toggle:function( btn, pressed, eOpts ){
									if(pressed) btn.setIconCls('icon-iu_arch_all_1'); else  btn.setIconCls('icon-iu_arch_all'); 
								}
							},
							handler : function() {
							    ArchfilterState='%';
								ArchFastFilter();
							},
							toggleGroup : 'iu_stage',
							pressed:true
						},
					 {
							xtype: 'button',
							iconCls: 'icon-iu_brak',
							//pressedCls:'icon-iu_plan',
							scale: 'large',
							text: 'Брак',
							iconAlign: 'top', 
							width:85,
							listeners:{
								toggle:function( btn, pressed, eOpts ){
									if(pressed) btn.setIconCls('icon-iu_brak_1'); else  btn.setIconCls('icon-iu_brak'); 
								}
							},
							handler : function() {
							    ArchfilterState='Брак';
								ArchFastFilter();
							},
							toggleGroup : 'iu_stage'
						}, 
						 {
							xtype: 'button',
							iconCls: 'icon-iu_brak_skk',
							//pressedCls:'icon-iu_podgotovka',
							scale: 'large',
							text: 'Брак по СКК',
							iconAlign: 'top',
							width:85,
							listeners:{
								toggle:function( btn, pressed, eOpts ){
									if(pressed) btn.setIconCls('icon-iu_brak_skk_1'); else  btn.setIconCls('icon-iu_brak_skk'); 
								}
							},
							handler : function() {
							    ArchfilterState='урок забракован СКК';
								ArchFastFilter();
							},
							toggleGroup : 'iu_stage'
							
						},
						 {
							xtype: 'button',
							iconCls: 'icon-iu_ok_graph',
							//pressedCls:'icon-iu_syemka',
							scale: 'large',
							text: 'Графика',
							iconAlign: 'top',
							width:85,
							listeners:{
								toggle:function( btn, pressed, eOpts ){
									if(pressed) btn.setIconCls('icon-iu_ok_graph_1'); else  btn.setIconCls('icon-iu_ok_graph'); 
								}
							},
							handler : function() {
							    ArchfilterState='Урок утв. по тех. критериям СКК. Рекомендована графика';
								ArchFastFilter();
							},
							toggleGroup : 'iu_stage'
						}
						,
						 {
							xtype: 'button',
							iconCls: 'icon-iu_ok_refilm',
							scale: 'large',
							text: 'Пересъем',
							iconAlign: 'top',
							width:85,
							listeners:{
								toggle:function( btn, pressed, eOpts ){
									if(pressed) btn.setIconCls('icon-iu_ok_refilm_1'); else  btn.setIconCls('icon-iu_ok_refilm'); 
								}
							},
							handler : function() {
							    ArchfilterState='Урок утв. по тех. критериям СКК. Рекомендован пересъем';
								ArchFastFilter();
							},
							toggleGroup : 'iu_stage'
						}
						,
						{
							xtype: 'button',
							iconCls: 'icon-iu_ok_skk',
						
							scale: 'large',
							text: 'Утвержден',
							iconAlign: 'top',
							width:85,
							listeners:{
								toggle:function( btn, pressed, eOpts ){
									if(pressed) btn.setIconCls('icon-iu_ok_skk_1'); else  btn.setIconCls('icon-iu_ok_skk'); 
								}
							},
							handler : function() {
							    ArchfilterState='урок утвержден по тех. критериям СКК';
								ArchFastFilter();
							},
							toggleGroup : 'iu_stage'
						}
						,
						 {
							xtype: 'button',
							iconCls: 'icon-iu_empty',
							//pressedCls:'icon-iu_proverka',
							scale: 'large',
							text: 'Пусто',
							iconAlign: 'top',
							width:85,
							listeners:{
								toggle:function( btn, pressed, eOpts ){
									if(pressed) btn.setIconCls('icon-iu_empty_1'); else  btn.setIconCls('icon-iu_empty'); 
								}
							},
							handler : function() {
							    ArchfilterState='';
								ArchFastFilter();
							},
							toggleGroup : 'iu_stage'
						}
						
						
					]
					},
		
					{
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
                  
            {xtype: 'templatecolumn',text: "Страница<br/>урока", width:80, tpl:'<a href=\''+rootURL+'?id={iu_urok_def_ucode}\' target=\'_blank\'><img src=\''+rootURL+'/resources/icons/comment_dull.png\'></a>', sortable: true}
            ,
            {text: "Предмет", width:120, dataIndex: 'iu_urok_def_subject', sortable: true, renderer: ArchmanualRenderer}
            ,
            {text: "Класс", width:120, dataIndex: 'iu_urok_def_theclassnum', sortable: true, renderer: ArchmanualRenderer}
            ,
            {text: "Тема<br/>раздела", width:120, dataIndex: 'iu_urok_def_rtheme', sortable: true, renderer: ArchmanualRenderer}
            ,
            {text: "Тема<br/>урока", width:120, dataIndex: 'iu_urok_def_classtheme', sortable: true, renderer: ArchmanualRenderer}
            ,
            {text: "Четверть", width:120, dataIndex: 'iu_urok_def_thequarter', sortable: true, renderer: ArchmanualRenderer}
             ,
            {text: "Дата<br/>в школе", width:120, dataIndex: 'iu_urok_def_schooldate', sortable: true, renderer: ArchmanualRenderer}
            ,
            {text: "Тип<br/>курса", width:120, dataIndex: 'iu_urok_def_coursetype', sortable: true, renderer: ArchmanualRenderer}
            ,
            {text: "Куратор", width:120, dataIndex: 'iu_urok_def_curator', sortable: true, renderer: ArchmanualRenderer}
            ,
            {text: "Учитель", width:120, dataIndex: 'iu_urok_def_theteacher', sortable: true, renderer: ArchmanualRenderer}
            ,
            {text: "Методист", width:120, dataIndex: 'iu_urok_def_methodist', sortable: true, renderer: ArchmanualRenderer}
            ,
            {text: "Методист 2", width:120, dataIndex: 'iu_urok_def_methodist2', sortable: true, renderer: ArchmanualRenderer}
            ,
            {text: "Тип<br/>процесса", width:120, dataIndex: 'iu_urok_def_processtype', sortable: true, renderer: ArchmanualRenderer}
			 ,
            {text: "Этап", width:120, dataIndex: 'iu_urok_def_topstage', sortable: true, renderer: ArchmanualRenderer}
            ,
            {text: "Подэтап", width:120, dataIndex: 'iu_urok_def_iu_urok_stage', sortable: true, renderer: ArchmanualRenderer}
			,
			{text: "Статус", width:120, dataIndex: 'iu_urok_def_laststate', sortable: true, renderer: ArchmanualRenderer}
			,
			{text: "Финальный<br/>статус", width:120, dataIndex: 'iu_urok_def_ckksn', sortable: true, renderer: ArchmanualRenderer}
			,
			{text: "Создан", width:120, dataIndex: 'iu_urok_def_datecreated', sortable: true, renderer: manualDateRenderer}
            ,
			{text: "Сообщение", width:120, dataIndex: 'iu_urok_def_lastmessage', sortable: true, renderer: ArchmanualRenderer}
			,
          
            {dataIndex: 'iu_urok_def_testpageref',text: "Тестовая", width:70, renderer:CurRefRenderer , sortable: true}
			,{ text     : 'Статус<br/>публикации', dataIndex: 'iu_urok_def_pubstate',width    : 120,	sortable : true}
            ,
            {dataIndex: 'iu_urok_def_mainref',text: "Публикация", width:70, renderer:CurRefRenderer , sortable: true}
        ]
        ,
        bbar: Ext.create('Ext.PagingToolbar', {
        store: store_v_autoiu_urok_def_arch,
        displayInfo: true,
        displayMsg:  'Показаны строки с {0} по {1} из {2}',
        emptyMsg: 'нет данных'
        
        })

        }
        );
        this.callParent();
        this.getSelectionModel().on('selectionchange', this.onSelectChange, this);
        //this.store.load()
       },
        onSelectChange: function(selModel, selections){
        this.down('#restart').setDisabled(selections.length === 0);
        this.down('#edit').setDisabled(selections.length === 0);
		//this.down('#subscribe').setDisabled(selections.length === 0);
		//this.down('#bNextStage').setDisabled(selections.length === 0);
		//this.down('#nextstage').setDisabled(selections.length === 0);
		
		
    },
    listeners: {
        itemdblclick: function() { 
    	    this.onEditClick();
        }
        ,
        	added:function(){
        			interval_autoiu_urok_def= setInterval(function() {  
        				store_v_autoiu_urok_def_arch.load();
        			}, 300000);
        		}
        	,
        	destroy:function(){
        		clearInterval(interval_autoiu_urok_def_arch);
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
				//alert( 'Mode='+OTEditMode('iu_urok_arch'));
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
  var jgrid = Ext.create('grid_autoiu_urok_def_arch',{	
				region:'center',
				itemId:'gr_autoiu_urok_def_arch',
				xtype:'g_v_autoiu_urok_def_arch',
				layout: 'fit',
				flex:1,
				store: store_v_autoiu_urok_def_arch	,	
				stateful: stateFulSystem,
				stateId: 'j_v_autoiu_urok_def_arch'
			}
		);
  var iu_urok= Ext.create('Ext.form.Panel', {
      closable: true,
      id:     'iu_urok_jrnl_arch',
      title: 'Урок. Архив',
      layout: 'border',
      flex: 1,
      fieldDefaults: {
         labelAlign:             'top',
          msgTarget:             'side'
        },
        defaults: {
        anchor:'100%'
        },

        items: [
			jgrid
			,
			{ 	region:'west',
			    itemId:'west_autoiu_urok_def_arch',
				split: true,     
				xtype:'panel',
				collapsible:true,
				collapseDirection:  'left',
				animCollapse: false, 
				titleCollapse:true,
				title:  'Уроки в архиве',
				iconCls:  'icon-film_star',
				width:210,
				minWidth:210,
				maxWidth:350,
				layout: {
					// layout-specific configs go here
					type: 'accordion',
					titleCollapse: false,
					animate: true,
					activeOnTop: true
				},
				items:[
					{
						xtype:  'panel',
						title:  'По предмету',
						iconCls:  'icon-book_tabs',
						height:650,  
						bodyPadding:0,
						autoScroll:true,
						buttonAlign:  'center',
						items: [
							ArchGetSubjGrid()
						]
					},
					{
						xtype:  'panel',
						title:  'По учителю',
						iconCls:  'icon-group',
						height:650,    
						bodyPadding:0,
						autoScroll:true,
						buttonAlign:  'center',
						items: [
							ArchGetTeacherGrid()
						]
					}
				]
			}
		    , 
			{     region:'east',
					split: true,     
                    xtype:  'form',
                    title:  'Фильтры',
					itemId: 'j_v_autoiu_urok_def_findform_arch',
                    iconCls:  'icon-find',
                  	collapsible:true,
                    collapseDirection:  'right',
					animCollapse: false, 
					titleCollapse:true,
					bodyPadding:5,
					width:210,
					minWidth:120,
					maxWidth:500,
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
						name:   'iu_urok_def_archator_id',
						itemId:   'iu_urok_def_archator_id',
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
							emptyText:      'Тестовая страница',
							hideLabel:  true,
							listeners: {render: function(e) {Ext.QuickTips.register({  target: e.getEl(), text: 'Тестовая страница'});}}
							}

					],
					grid: jgrid,
					resetFavorites: function()
                    {
                        Ext.Ajax.request({
                            url:    rootURL+'index.php/app2/resetFavorite',
                            method:  'POST',
                            params: { 
                                type: 'iu_urok_arch'
                            }
                        });
                    },
					DoFind: function() 
					{
                                this.resetFavorites();
                                var user_input =this.up('form').getForm().getValues(false,true);
                                var filters = new Array();
								if(jgrid.default_filter != null){
									for (var i=0; i< jgrid.default_filter.length;i++) {
										var kv=jgrid.default_filter[i];
										filters.push({property: kv.key, value: kv.value});
									}
								}
                                for (var key in user_input) {
                                    filters.push({property: key, value: user_input[key]});
                                }
								if(ArchfilterTeacher!=''  ){
										filters.push({property: 'iu_urok_def_theteacher', value: ArchfilterTeacher});
								}
								
								if(ArchfilterClass!=''  ){
									if(filterClass=="Все предметы") ArchfilterClass="%";
									filters.push({property: 'iu_urok_def_theclassnum', value: ArchfilterClass});
								}
								if(ArchfilterSubj!=''){
									filters.push({property: 'iu_urok_def_subject', value: ArchfilterSubj});
								}
								if(ArchfilterState!=''){
									if(ArchfilterState!=''){
										filters.push({property: 'iu_urok_def_ckksn', value: ArchfilterState});
									}
								}else{
									filters.push({property: 'iu_urok_def_ckksn_null', value: '1'});
								}
								if (jgrid.store.filters.length>0)
									jgrid.store.filters.clear();
								if(filters.length>0)
									jgrid.store.filter(filters);
								else	
								    jgrid.store.load();
                    },
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
                                //console.log(this.up('form'));
                                this.up('form').resetFavorites();
                                this.up('form').getForm().reset();
                                 var filters = new Array();
								if(jgrid.default_filter != null){
									for (var i=0; i< jgrid.default_filter.length;i++) {
										var kv=jgrid.default_filter[i];
										filters.push({property: kv.key, value: kv.value});
									}
								}
                               
								if(filterTeacher!=''  ){
										filters.push({property: 'iu_urok_def_theteacher', value: ArchfilterTeacher});
								}
								
								if(filterClass!=''  ){
									if(filterClass=="Все предметы") filterClass="%";
									filters.push({property: 'iu_urok_def_theclassnum', value: ArchfilterClass});
								}
								if(filterSubj!=''){
									filters.push({property: 'iu_urok_def_subject', value: ArchfilterSubj});
								}
								if(filterState!=''){
									filters.push({property: 'iu_urok_def_topstage', value: ArchfilterState});
								}
								if (jgrid.store.filters.length>0)
									jgrid.store.filters.clear();
									
                               if(filters.length>0)
									jgrid.store.filter(filters);
								else	
								    jgrid.store.load();
                            }
                        }
                    ]
                }
		
		] // tabpanel
    }); //Ext.Create
	
	ArchFastFilter= function(){
		if(ArchfilterState!='%'){
			jgrid.setTitle(ArchfHead+". " + ArchfilterState);
		}else{
			jgrid.setTitle(ArchfHead+". " + "Все.");
		}
		iu_urok.items.getByKey('j_v_autoiu_urok_def_findform_arch').DoFind();
	};
	
	ArchFastFilter();
	var view = jgrid.getView();
	view.enableTextSelection=true;
	
    return iu_urok;
}

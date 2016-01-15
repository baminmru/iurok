Ext.Loader.setConfig({
  enabled: true
 });
 Ext.Loader.setPath('Ext.ux', rootURL+'ux');


Ext.require([
    'Ext.grid.*',
	'Ext.data.*',
	'Ext.util.*',
	'Ext.tab.*',
	'Ext.button.*',
	'Ext.form.*',
	'Ext.state.*',
	'Ext.layout.*',
	'Ext.Action',
	'Ext.resizer.Splitter',
	'Ext.fx.target.Element',
	'Ext.fx.target.Component',
	'Ext.window.Window',
	'Ext.selection.CellModel',
	'Ext.toolbar.Paging',
	'Ext.ModelManager',
	'Ext.tip.QuickTipManager',
	'Ext.ux.statusbar.StatusBar',
	'Ext.ux.CheckColumn', 
	'Ext.ux.grid.FiltersFeature',
	'Ext.ux.PreviewPlugin'
]);


var Urok_Name="";
var CuratorID="";


function S2T( val) {
		var sec_num = parseInt(val, 10); // don't forget the second param
		var hours   = Math.floor(sec_num / 3600);
		var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
		var seconds = sec_num - (hours * 3600) - (minutes * 60);

		if (hours   < 10) {hours   = "0"+hours;}
		if (minutes < 10) {minutes = "0"+minutes;}
		if (seconds < 10) {seconds = "0"+seconds;}
		var time    = hours+':'+minutes+':'+seconds;
		return time;
	}
	
function T2S( strval) {
		var s = new String(strval);
		var sarr=s.split(":");
			var hours  = 0;
		var minutes  = 0;
		var seconds  = 0;
		if (sarr.length>0)
			hours  = parseInt(sarr[0],10);
		if (sarr.length>1)	
			minutes  = parseInt(sarr[1],10);
		if (sarr.length>2)
		  seconds  = parseInt(sarr[2],10);
		var time    = hours*3600+minutes*60+seconds;
		return time;
	}
////////////////////// video urok ///////////////////////
var commenturokid;

// вся страница целиком
function VideoCommentPage(){

    var instanceid='';
	
		var store_iu_urok_docs = Ext.create('Ext.data.Store', {
        model:'model_iu_urok_docs',
        autoLoad: false,
        autoSync: false,
        proxy: {
            type:   'ajax',
                url:   rootURL+'index.php/comment/getDocs',
            reader: {
                type:   'json'
                ,root:  'data'
                ,successProperty:  'success'
                ,messageProperty:  'msg'
                }
        }
    });
	
	var store_iu_urok_video = Ext.create('Ext.data.Store', {
        model:'model_iu_urok_video',
        autoLoad: false,
        autoSync: false,
        proxy: {
            type:   'ajax',
                url:   rootURL+'index.php/comment/getVideo',
            reader: {
                type:   'json'
                ,root:  'data'
                ,successProperty:  'success'
                ,messageProperty:  'msg'
                }
        }
    });

    var store_iu_urok_def = Ext.create('Ext.data.Store', {
        model:'model_iu_urok_def',
        autoLoad: false,
        autoSync: false,
        proxy: {
            type:   'ajax',
                url:   rootURL+'index.php/comment/getDef',
            reader: {
                type:   'json'
                ,root:  'data'
                ,successProperty:  'success'
                ,messageProperty:  'msg'
                },
            extraParams:{
                id: urokcode
            }
        }
    });

   


	var VUPanel = new Ext.form.Panel({
	layout:'vbox',
	border:false,
	title:'Урок',
	//autoScroll:true,
	region:'center',
	
	items:[
	{ 
		xtype:'panel',
		id:'myVideoUrok',
        title:'Информация по уроку',
		border:false,
		autoScroll:true,
		autoHeight:true,
		collapsible:true,
		titleCollapse : true,
		layout:'absolute',
		height:255,
		minWidth:1800,
		width:1900,
		
		items:[

			{ 
				xtype:'fieldset', 
		
				x: 0, 
				layout:'absolute', 
				id:'iu_urok_def_0',
				title:      'Информация',
				defaultType:  'textfield',
				
				items: 
					[
						
							{
									minWidth: 490,
									width: 490,
									maxWidth: 490,
									x: 5, 
									y: 0, 
									labelWidth:90,
									readOnly: true,
									xtype:  'textarea',
									name:   'subject_grid',
									itemId:   'subject_grid',
									cls:'x-item-readonly',
									labelCls:'x-item-readonly',
									fieldLabel:  'Предмет'
							}
							,
							{
									minWidth: 365,
									width: 365,
									maxWidth: 365,
									x: 500, 
									y: 0, 
									labelWidth:90,
									readOnly: true,
									xtype:  'textarea',
									cls:'x-item-readonly',
									labelCls:'x-item-readonly',
									name:   'theclassnum_grid',
									itemId:   'theclassnum_grid',
									fieldLabel:  'Класс'
							}
							,
							{
									minWidth: 490,
									width: 490,
									maxWidth: 490,
									x: 5, 
									y: 30, 
									labelWidth:90,
									xtype:  'textarea',
									readOnly: true,
									cls:'x-item-readonly',
									labelCls:'x-item-readonly',
									value:  '',
									name:   'classtheme',
									itemId:   'classtheme',
								
									fieldLabel:  'Тема урока'
							}
							,
							{
									minWidth: 365,
									width: 365,
									maxWidth: 365,
									x: 500, 
									y: 30, 
									labelWidth:90,
									
									xtype:  'textarea',
									readOnly: true,
									name:   'rtheme',
									itemId:   'rtheme',
									cls:'x-item-readonly',
									labelCls:'x-item-readonly',
									fieldLabel:  'Тема раздела'
							}
							
						
							
						

					 ], 
				height: 105,
				width:860
			} // group
				,
			{ 
			xtype:'fieldset', 
				anchor: '98%',
				x: 870, 
				y:0,
				layout:'absolute', 
				id:'iu_urok_def_ref',
				title:      'Полезные ссылки',
				defaultType:  'displayfield',
				
				
					items:[
						{
									minWidth: 365,
									x: 5, 
									y: 0, 
									labelWidth:140,

									xtype:  'displayfield',
									value: '',
									name:   'cardref',
									itemId:   'cardref',
									fieldLabel:  ''
							},
							{
									minWidth: 200,
									x: 5, 
									y: 30, 
									labelWidth:140,

									xtype:  'displayfield',
									value: '',
									name:   'scenary',
									itemId:   'scenary',
									fieldLabel:  ''
							}
							,
							{
									minWidth: 200,
									x: 205, 
									y: 30, 
									labelWidth:140,

									xtype:  'displayfield',
									value: '',
									name:   'timing',
									itemId:   'timing',
									fieldLabel:  ''
							}
							
							
							
					],
					height: 105,
					width:370
			}
				,
			{ 
				xtype:'fieldset', 
				//anchor: '100%',
				x: 0, 
				y:115,
				layout:'absolute', 
				id:'iu_urok_def_1',
				title:      'Персонал',
				defaultType:  'displayfield',
				
				items: 
					[
						{
							minWidth: 490,
							width: 490,
							maxWidth: 490,
							x: 5, 
							y: 0, 
							labelWidth:90,
							xtype:  'textarea',
							readOnly: true,
							cls:'x-item-readonly',
							labelCls:'x-item-readonly',
							name:   'curator_grid',
							itemId:   'curator_grid',
							fieldLabel:  'Куратор'
						}
						,
						{
								minWidth: 365,
								width: 365,
								maxWidth: 365,
								x: 500, 
								y: 0, 
								labelWidth:90,
								xtype:  'textarea',
								readOnly: true,
								cls:'x-item-readonly',
								labelCls:'x-item-readonly',

								name:   'theteacher_grid',
								itemId:   'theteacher_grid',
								fieldLabel:  'Учитель'
						}
						,
						{
								minWidth: 490,
								width: 490,
								maxWidth: 490,
								x: 5, 
								y: 30, 
								labelWidth:90,
								xtype:  'textarea',
								readOnly: true,
								cls:'x-item-readonly',
								labelCls:'x-item-readonly',
								name:   'methodist_grid',
								itemId:   'methodist_grid',
								fieldLabel:  'Методист'
						}
						,
						{
								minWidth: 365,
								width: 365,
								maxWidth: 365,
								x: 500, 
								y: 30, 
								labelWidth:90,

								xtype:  'textarea',
								readOnly: true,
								cls:'x-item-readonly',
								labelCls:'x-item-readonly',

								name:   'methodist2_grid',
								itemId:   'methodist2_grid',
								fieldLabel:  'Методист 2'
						}
					], 
					height: 100 ,
					width:860
				} // group

						,
			{  xtype:'fieldset', 
				anchor: '98%',
				x: 870, 
				y:115,
				layout:'absolute', 
				id:'iu_urok_def_subs',
				title:      'Подписка ',
				defaultType:  'displayfield',
				
				
					items:[
						{
									minWidth: 230,
									x: 5, 
									y: 5, 
									xtype:  'button',
									iconCls:'icon-email_add',
									text:   'Подписаться на урок',
									name:   'subscribeUrok',
									itemId:   'subscribeUrok',
									handler:   function(){
											
												 Ext.Ajax.request({
													url: rootURL+'index.php/wf/Subscribe',
													method:  'POST',
													params: { 
														eventtype:'Урок',
														theprocess:store_iu_urok_def.getAt(0).get('id'),
														processstatus:null,
														statetask:null,
														doer:null,
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
							
					],
					height: 100,
					width:370
			}
			]
	}

	]
	}
	);
	
	 store_iu_urok_docs.on('load', function(){
	 //  вставляем ссылки на файлы сценария и тайминга	
		store_iu_urok_docs.each(function(record,idx){
			if(record.get('doctype')=='{034C89DD-C5D9-4E48-9932-F9A6BD14A326}'  && record.get('activeversion')==-1){
				var scn=VUPanel.down('#scenary');
				if (record.get('fileurl')!=''){
					scn.setValue('<a href="' +record.get('fileurl') +'" target="_blank"><img src ="../resources/icons/book.png" /> Сценарий</a>');
				}else{
					if (record.get('fileref')!=''){
						scn.setValue('<a href="/output_file.php?ID=' +record.get('fileref') +'&ext=' +record.get('fileref_ext') +'" target="_blank"><img src ="../resources/icons/book.png" /> Сценарий</a>');
					}else{
						scen_text=MyhtmlEncode(record.get('filetext'));
						scn.setValue('<a href="javascript:ShowText(\'Сценарий\',scen_text);"><img src ="../resources/icons/book.png" /> Сценарий</a>');
					}
				}
			}
			
			if(record.get('doctype')=='{BDFC8DA9-F226-11E3-8FBF-00155D0ED711}'  && record.get('activeversion')==-1 ){
				var scn=VUPanel.down('#timing');
				if (record.get('fileurl')!=''){
					scn.setValue('<a href="' +record.get('fileurl') +'" target="_blank"><img src ="../resources/icons/book.png" /> Тайминг</a>');
				}else{
					if (record.get('fileref')!=''){
						scn.setValue('<a href="/output_file.php?ID=' +record.get('fileref') +'&ext=' +record.get('fileref_ext') +'" target="_blank"><img src ="../resources/icons/book.png" /> Тайминг</a>');
					}else{
						
						timing_text=MyhtmlEncode(record.get('filetext'));
						scn.setValue('<a href="javascript:ShowText(\'Тайминг\',timing_text);"><img src ="../resources/icons/book.png" /> Тайминг</a>');
					}
				}
			}
			
		});
		VUPanel.doLayout();
	 });
	
	 store_iu_urok_video.on('load', function(){
	 
		// вставляем панель для работы с видео для каждого видео, которое комментируется
		store_iu_urok_video.each(function(record,idx){
			if(record.get('nocomments')==0)
				VUPanel.items.add(VideoFilePanel(idx,record));
		});
		CuratorID=store_iu_urok_def.getAt(0).get('curator') ;
		//alert(CuratorID);
		commenturokid=store_iu_urok_def.getAt(0).get('id') ;
		VUPanel.items.add(
			//  добавляем панель с общими обсуждением к уроку
			UrokCommentsTree( 
				store_iu_urok_def.getAt(0).get('id')   
			)  
		);
		VUPanel.doLayout();
	 });
	 var sname='';
	 store_iu_urok_def.on('load', function() {
       
		record= store_iu_urok_def.getAt(0);
		VUPanel.loadRecord(record);	
		
		instanceid=record.get('instanceid');
		
		var sname=record.get('subject_grid')+", "+record.get('theclassnum_grid')+". "+record.get('classtheme');
		window.document.title='Страница урока. ' +sname;
		VUPanel.setTitle('Урок: '+sname);
		
		Urok_Name='Урок: '+sname;
		
		var cref=VUPanel.down('#cardref');
		cref.setValue('<a href="/?uid='+instanceid+'" target="_blank"><img src ="../resources/icons/film_edit.png" /> Карточка урока</a>');
		store_iu_urok_docs.load({params:{instanceid: record.get('instanceid')}});
		store_iu_urok_video.load({params:{instanceid: record.get('instanceid')}});
			
     });
	store_iu_urok_def.load();
	
	
  

	return VUPanel;
}

Ext.define('model_uc',{
            extend:'Ext.data.Model',
        fields: [
			 {name: 'instanceid',type: 'string'}
            ,{name: 'id',type: 'string'}
            ,{name: 'parentid',type: 'string'}
          //  ,{name:'messagetype', type: 'string'}
         //   ,{name:'messagetype_grid', type: 'string'}
            ,{name:'thedate', type: 'date', dateFormat:'Y-m-d H:i:s' }
            ,{name:'theauthor', type: 'string'}
			,{name:'aid', type: 'string'}
            ,{name:'info', type: 'string'}
			,{name:'thefile', type: 'string'}
			,{name:'thefile_ext', type: 'string'}
			,{name:'theref', type: 'string'}
        ]
    });

//  дерево обсуждения  в нижней части  страницы - общие обсуждения по уроку	
function UrokCommentsTree(instanceid){


 var tpanel;

	var treestore = Ext.create('Ext.data.TreeStore',{
		model: 'model_uc',
		proxy: {
			type: 'ajax',
			url: '/index.php/comment/getCommonComments',
			extraParams:{
				instanceid: instanceid,
				curator: (CurrentUserID()==CuratorID)
			}
		},

		folderSort: true,
		autoLoad:true
	}
	);
	var tree;

	function onRefreshClick(){
            treestore.load({params:{instanceid: instanceid}});
    };
	var addpanel;
	var edpanel;
    var mode;
	
	 function onHideConfirm(selection){
      if (selection) {
	  
	  if (selection.get('parentid')=='THEME'){
		Ext.Ajax.request({
            url:    rootURL+'index.php/c_iu_cm_def/hideRow',
            method:  'POST',
    		params: { 
    				iu_cm_defid: selection.get('id')
    				}
			,success: function(){
				treestore.load();
			}
    	});
	  }else{
	    Ext.Ajax.request({
            url:    rootURL+'index.php/c_iu_cm_msg/hideRow',
            method:  'POST',
    		params: { 
    				iu_cm_msgid: selection.get('id')
    				},success: function(){
				treestore.load();
			}
    	});
	  }
      
    
      }
    };
    function onHideClick(){
      	var selection = tree.getView().getSelectionModel().getSelection()[0];
		if(selection.get('aid')==CurrentUserID() || CurrentUserID()==CuratorID){	
			Ext.Msg.show({
				title:  'Скрыть',
				msg:    'Скрыть обсуждение ?',
				buttons: Ext.Msg.YESNO,
				icon:   Ext.MessageBox.QUESTION,
				fn: function(btn,text,opt){
					if(btn=='yes'){
						onHideConfirm(opt.selectedRow);
					}
				},
				caller: this,
				selectedRow: selection
			});
		}else{
			  Ext.MessageBox.show({
                title:  'Скрыть...',
                msg:    'Скрытие чужих записей не разрешено!',
                buttons: Ext.MessageBox.OK,
               icon:   Ext.MessageBox.WARNING
        	});
		}
      
      
    };
	
	 function onAddRootClick(){
	    mode ='theme';
		addpanel.setTitle('Новая тема');
		addpanel.show();
	   	 
    };
    function onAddClick(){
		var selection = tree.getView().getSelectionModel().getSelection()[0];
		if(selection){
			mode ='replay';
			addpanel.setTitle('Ответ');
		}else{
			 mode ='theme';
			 addpanel.setTitle('Новая тема');
			 }
		addpanel.show();
   	   
    };
	
	var addpanel=Ext.create(Ext.window.Window,{
		border:true,
		x:50,
		y:60,
		height:330,
		width:700,
		hidden:true,
		layout:'absolute',
		closeAction :'hide',
		modal : true,
		//constrainHeader:true,
		tbar: [
				{
				    xtype:'button'	,
				    iconCls:  'icon-accept',
                    itemId:  'save',
                    text:   'Сохранить',
                    disabled: false,
                    scope:  this,
                    handler : function(){
							if (mode=='theme'){
								Ext.Ajax.request(
								{
									url: rootURL+'index.php/c_v_autoiu_cm_def/newRow',
									method:  'POST',
									params: { 
									},
									success: function(response){
										var text = response.responseText;
										var res =Ext.decode(text);
										var oid= res.data;
										var rid=res.rowid;
										StatusDB('Сохранение данных');
										Ext.Ajax.request({
											url: rootURL+'index.php/c_iu_cm_def/setRow',
											method:  'POST',
											params: { 
												instanceid: oid
												,iu_cm_defid: rid
												,theprocess: instanceid 
												,isdiscussion: -1
												,thetheme: strip_tags(addpanel.down('#info').getValue(),allowed_tags)
												,theauthor: CurrentUserID()
												,thedate:new Date().toLocaleFormat('%Y-%m-%d %H:%M:%S')
												,curatoronly:0
											}
											, success: function(response){
												StatusReady('Изменения сохранены');
												addpanel.down('#info').setValue('');
												treestore.load();
											}
										  }
										);
									}
								}
								);
							}else{
								
							
								var selection = tree.getView().getSelectionModel().getSelection()[0];
								if (selection.get('parentid')=='THEME'){
									StatusDB('Сохранение данных');
									Ext.Ajax.request(
										{
											url: rootURL+'index.php/c_iu_cm_msg/setRow',
											method:  'POST',
											params: { 
												instanceid: selection.get('instanceid')
												,iu_cm_msgid: Math.uuid()
												,treeid: '{00000000-0000-0000-0000-000000000000}'
												,info: strip_tags(addpanel.down('#info').getValue(),allowed_tags )
												,messagetype: null
												,theauthor: CurrentUserID()
												,thedate:new Date().toLocaleFormat('%Y-%m-%d %H:%M:%S')
												,curatoronly:0
											}
											, success: function(response){
												
													StatusReady('Изменения сохранены');
														addpanel.down('#info').setValue('');
														treestore.load();
										
										  }
										}
									);
								}else{
									StatusDB('Сохранение данных');
									Ext.Ajax.request(
										{
											url: rootURL+'index.php/c_iu_cm_msg/setRow',
											method:  'POST',
											params: { 
												instanceid: selection.get('instanceid')
												,iu_cm_msgid: Math.uuid()
												,treeid: selection.get('id')
												,info: strip_tags(addpanel.down('#info').getValue(),allowed_tags ) 
												,messagetype: null
												,theauthor: CurrentUserID()
												,thedate: new Date().toLocaleFormat('%Y-%m-%d %H:%M:%S')
												,curatoronly:0
											}
											, success: function(response){
													StatusReady('Изменения сохранены');
													addpanel.down('#info').setValue('');
													treestore.load();
											}
										  
										}
									);
								}
							}
					
						addpanel.hide();
					}
				},
				{
					
				    xtype:'button'	,
				    iconCls:  'icon-cancel',
                    itemId:  'cancel',
                    text:   'Закрыть',
                    disabled: false,
                    scope:  this,
                    handler : function(){
						addpanel.hide();
					}
				}
		],
		
		items:
			[
				{
					minWidth: 740,
					width: 740,
					xtype: 'textarea', 
					x: 5, 
					y: 5, 
					height: 260, 
					enableSourceEdit :false,
					xtype:  'htmleditor',
					name:   'info',
					itemId:   'info',
					fieldLabel:  'Сообщение',
					labelAlign:'top',
					allowBlank:false
					,labelWidth: 120
				}
				
		
			]
		}
	);
	
	function onEditClick(){
		var selection = tree.getView().getSelectionModel().getSelection()[0];
		if(selection){
			//if(selection.get('aid')==CurrentUserID()){
				edpanel.setTitle('Редактируем сообщение');
				edpanel.down('#info').setValue(selection.get('info'));
				edpanel.show();
			
		}
		
   	   
    };
	var edpanel=Ext.create(Ext.window.Window,{
		border:true,
		x:50,
		y:60,
		height:330,
		width:700,
		hidden:true,
		layout:'absolute',
		closeAction :'hide',
		modal : true,
		//constrainHeader:true,
		tbar: [
				{
				    xtype:'button'	,
				    iconCls:  'icon-accept',
                    itemId:  'save',
                    text:   'Сохранить',
                    disabled: false,
                    scope:  this,
                    handler : function(){
							
						var selection = tree.getView().getSelectionModel().getSelection()[0];
						
						if(selection.get('aid')==CurrentUserID() || CurrentUserID()==CuratorID ){	
							if (selection.get('parentid')=='THEME'){
								StatusDB('Сохранение данных');
								Ext.Ajax.request({
									url: rootURL+'index.php/c_iu_cm_def/setRow',
									method:  'POST',
									params: { 
										instanceid: selection.get('instanceid')
										,iu_cm_defid: selection.get('id')
										,theprocess: instanceid 
										,isdiscussion: -1
										,thetheme: strip_tags(edpanel.down('#info').getValue(),allowed_tags )
										,theauthor:  CurrentUserID()
										,thedate:new Date().toLocaleFormat('%Y-%m-%d %H:%M:%S')
										,curatoronly:0
									}
									, success: function(response){
										StatusReady('Изменения сохранены');
										edpanel.down('#info').setValue('');
										treestore.load();
									}
								  }
								);
							
							}else{
												
								if (selection.get('parentid')=='00000000-0000-0000-0000-000000000000}'){
									StatusDB('Сохранение данных');
									Ext.Ajax.request(
										{
											url: rootURL+'index.php/c_iu_cm_msg/setRow',
											method:  'POST',
											params: { 
												instanceid: selection.get('instanceid')
												,iu_cm_msgid: selection.get('id')
												,treeid: '{00000000-0000-0000-0000-000000000000}'
												,info: strip_tags(edpanel.down('#info').getValue(),allowed_tags ) 
												,messagetype: null
												,theauthor:   CurrentUserID()
												,thedate:new Date().toLocaleFormat('%Y-%m-%d %H:%M:%S')
												,curatoronly:0
											}
											, success: function(response){
												
													StatusReady('Изменения сохранены');
														edpanel.down('#info').setValue('');
														treestore.load();
										
										  }
										}
									);
								}else{
									StatusDB('Сохранение данных');
									Ext.Ajax.request(
										{
											url: rootURL+'index.php/c_iu_cm_msg/setRow',
											method:  'POST',
											params: { 
												instanceid: selection.get('instanceid')
												,iu_cm_msgid: selection.get('id')
												,treeid: selection.get('parentid')
												,info: strip_tags(edpanel.down('#info').getValue(),allowed_tags )
												,messagetype: null
												,theauthor: CurrentUserID()
												,thedate: new Date().toLocaleFormat('%Y-%m-%d %H:%M:%S')
												,curatoronly:0
											}
											, success: function(response){
													StatusReady('Изменения сохранены');
													edpanel.down('#info').setValue('');
													treestore.load();
											}
										  
										}
									);
								}
							}
						}else{
						  Ext.MessageBox.show({
							title:  'Изменение',
							msg:    'Изменение чужих записей не разрешено!',
							buttons: Ext.MessageBox.OK,
						   icon:   Ext.MessageBox.WARNING
							});
						}
					
						edpanel.hide();
					}
				},
				{
					
				    xtype:'button'	,
				    iconCls:  'icon-cancel',
                    itemId:  'cancel',
                    text:   'Закрыть',
                    disabled: false,
                    scope:  this,
                    handler : function(){
						edpanel.hide();
					}
				}
		],
		
		items:
			[
				{
					minWidth: 740,
					width: 740,
					xtype: 'textarea', 
					x: 5, 
					y: 5, 
					height: 260, 
					enableSourceEdit :false,
					xtype:  'htmleditor',
					name:   'info',
					itemId:   'info',
					fieldLabel:  'Сообщение',
					labelAlign:'top',
					allowBlank:false
					,labelWidth: 120
				}
				
		
			]
		}
	);
	
	function onExportClick(){ 
         	var config= {title:Urok_Name+". Обсуждение" , columns:tree.columns };
			var workbook = new Workbook(config);
			workbook.addWorksheet(tree.store, config );
			var x= workbook.render();
			window.open( 'data:application/vnd.ms-excel;base64,' + Base64.encode(x),'_blank');
     };
	
	tree=Ext.create(Ext.tree.Panel, {
		x:5,y:5,
		height: 600,
		width:1890,
		useArrows: true,
		rootVisible: false,
		multiSelect: false,
		singleExpand: true,
		store: treestore,
		
		//collapsible:true,
		nodeParam :'id',
		    dockedItems: [{
                xtype:  'toolbar',
                items: [
                {
                    iconCls:  'icon-application_form_add',
                    text:   'Новая тема',
                    scope:  this,
                    handler : onAddRootClick
                    }, 
                {
                    iconCls:  'icon-application_form_add',
                    text:   'Ответить',
                    scope:  this,
                    handler : onAddClick
                    } , 
					{
                    iconCls:  'icon-application_form_edit',
                    text:   'Изменить',
                    scope:  this,
                    disabled: true,
                    itemId:  'edit',
                    handler : onEditClick
                    },
					 {
                    iconCls:  'icon-status_invisible',
                    text:   'Скрыть',
                    disabled: true,
                    itemId:  'bhide',
                    scope:  this,
                    handler : onHideClick
                    }
					
					/*, {
                    iconCls:  'icon-application_form_delete',
                    text:   'Удалить',
                    disabled: true,
                    itemId:  'delete',
                    scope:  this,
                    handler : onDeleteClick
                    }*/, 
                    {
                    iconCls:  'icon-table_refresh',
                    text:   'Обновить',
                    itemId:  'bRefresh',
                    scope:  this,
                    handler : onRefreshClick
                },
				{
                    iconCls:  'icon-page_excel',
                    text:   'Экспорт',
                    itemId:  'bExport',
                    scope:  this,
                    handler: onExportClick
                }]
            }],
		columns: [
			/*{
				xtype: 'treecolumn', 
				text: 'Тема',
				flex: 2,
				sortable: true,
				dataIndex: 'info'
			}, */
			
			{
				xtype: 'treecolumn', 
				text: 'Автор',
				flex: 1,
				dataIndex: 'theauthor',
				sortable: true,
				renderer:headerRenderer
			}, {
			   
				header: 'Дата',
				dataIndex: 'thedate',
				format:'Y-m-d H:i:s',
				renderer: function(v){ if(v!=null) return v.toLocaleFormat('%Y-%m-%d %H:%M:%S'); else return '';},
				width:130
			},
			{text: "Сообщение", width: 250, dataIndex: 'info', sortable: true, hidden:true} 
		],
		viewConfig: {
                itemId: 'all_view',
                plugins: [{
                    pluginId: 'all_preview',
                    ptype: 'preview',
                    bodyField: 'info',
                    expanded: true
                }]
        },
		listeners:{
			selectionchange: function(t,selections){
			 
		         this.down('#edit').setDisabled(selections.length === 0);
				 this.down('#bhide').setDisabled(selections.length === 0);
				 if(selections.length === 0) return;
				 var selection = selections[0];
				/* Ext.QuickTips.register(
					{ 
						target: tree.getEl(), text:  selection.get('info')
					}
				 );*/
			},
			itemdblclick: function() { 
				onEditClick();
			}
		}
	
		
	});
	tpanel = Ext.create(Ext.form.Panel, {
	    title: 'Обсуждения урока в целом',
		border:false,
		layout:'absolute',	
		height: 600,
		width:1900,
		collapsible:true,
		titleCollapse : true,
		
		items:[ tree ]
		
	});
	return tpanel;
}

// дерево обсуждений по видеофайлу
function VideoCommentTree(vid,instanceid,videoid,fname){
	var LastFileName=fname;

   var tpanel;
 
	var treestore = Ext.create('Ext.data.TreeStore',{
		model: 'model_uc',
		proxy: {
			type: 'ajax',
			url: '/index.php/comment/getVideoComments',
			extraParams:{
				instanceid: instanceid,
				videoid:videoid,
				curator: (CurrentUserID()==CuratorID)
			}
		},

		folderSort: true,
		autoLoad:true
	}
	);
	var tree;

	
	 
	function onRefreshClick(){
            treestore.load({params:{instanceid: instanceid,videoid:videoid}});
    };
	var edpanel;
	var addpanel;
	
	
    var mode;
	
	 function onAddRootClick(){
	    mode ='theme';
		addpanel.setTitle('Новая тема');
		addpanel.show();
	   	 
    };
    function onAddClick(){
		var selection = tree.getView().getSelectionModel().getSelection()[0];
		if(selection){
			mode ='replay';
			addpanel.setTitle('Ответ');
		}else{
			 mode ='theme';
			 addpanel.setTitle('Новая тема');
		}
		addpanel.show();
    };
	
	var addpanel=Ext.create(Ext.window.Window,{
		border:true,
		x:50,
		y:60,
		height:330,
		width:700,
		hidden:true,
		layout:'absolute',
		closeAction :'hide',
		modal:true,
		//constrainHeader:true,
		tbar:[{
				    xtype:'button'	,
				    iconCls:  'icon-accept',
                    itemId:  'save'+vid,
                    text:   'Сохранить',
                    disabled: false,
                    scope:  this,
                    handler : function(){
								
								if (mode=='theme'){
									StatusDB('Сохранение данных');
									Ext.Ajax.request(
										{
											url: rootURL+'index.php/c_iu_cm_msg/setRow',
											method:  'POST',
											params: { 
												instanceid: instanceid
												,iu_cm_msgid: Math.uuid()
												,treeid: '{00000000-0000-0000-0000-000000000000}'
												,info: strip_tags(addpanel.down('#info'+vid).getValue() ,allowed_tags)
												,messagetype: null
												,theauthor: CurrentUserID()
												,thedate:new Date().toLocaleFormat('%Y-%m-%d %H:%M:%S')
											}
											, success: function(response){
												
													StatusReady('Изменения сохранены');
														addpanel.down('#info'+vid).setValue('');
														treestore.load();
										
										  }
										}
									);
								}else{
								var selection = tree.getView().getSelectionModel().getSelection()[0];
									StatusDB('Сохранение данных');
									Ext.Ajax.request(
										{
											url: rootURL+'index.php/c_iu_cm_msg/setRow',
											method:  'POST',
											params: { 
												instanceid: instanceid
												,iu_cm_msgid: Math.uuid()
												,treeid: selection.get('id')
												,info: strip_tags(addpanel.down('#info'+vid).getValue() ,allowed_tags)
												,messagetype: null
												,theauthor: CurrentUserID()
												,thedate: new Date().toLocaleFormat('%Y-%m-%d %H:%M:%S')
											}
											, success: function(response){
													StatusReady('Изменения сохранены');
													addpanel.down('#info'+vid).setValue('');
													treestore.load();
											}
										  
										}
									);
								}
							
					
						addpanel.hide();
					}
				},
				{
					
				    xtype:'button'	,
				    iconCls:  'icon-cancel',
                    itemId:  'cancel'+vid,
                    text:   'Закрыть',
                    disabled: false,
                    scope:  this,
                    handler : function(){
						addpanel.hide();
					}
				}],
		
		items:
			[
				{
					minWidth: 675,
					width: 675,
					xtype: 'textarea', 
					x: 5, 
					y: 5, 
					height: 260, 
					enableSourceEdit :false,
					xtype:  'htmleditor',
					name:   'info'+vid,
					itemId:   'info'+vid,
					fieldLabel:  'Сообщение',
					labelAlign:'top',
					allowBlank:false
					,labelWidth: 120
				}
				
		
			]
		}
	);
	
	
	function onEditClick(){
		var selection = tree.getView().getSelectionModel().getSelection()[0];
		if(selection){
			edpanel.setTitle('Редактируем сообщение');
			edpanel.down('#info').setValue(selection.get('info'));
			edpanel.show();
		}
    };
	var edpanel=Ext.create(Ext.window.Window,{
		border:true,
		x:50,
		y:60,
		height:330,
		width:700,
		hidden:true,
		layout:'absolute',
		closeAction :'hide',
		modal : true,
		//constrainHeader:true,
		tbar: [
				{
				    xtype:'button'	,
				    iconCls:  'icon-accept',
                    itemId:  'save',
                    text:   'Сохранить',
                    disabled: false,
                    scope:  this,
                    handler : function(){
							
						var selection = tree.getView().getSelectionModel().getSelection()[0];
						if(selection.get('aid')==CurrentUserID() || CurrentUserID()==CuratorID ){					
							if (selection.get('parentid')=='00000000-0000-0000-0000-000000000000}'){
								StatusDB('Сохранение данных');
								Ext.Ajax.request(
									{
										url: rootURL+'index.php/c_iu_cm_msg/setRow',
										method:  'POST',
										params: { 
											instanceid: selection.get('instanceid')
											,iu_cm_msgid: selection.get('id')
											,treeid: '{00000000-0000-0000-0000-000000000000}'
											,info: strip_tags(edpanel.down('#info').getValue()  ,allowed_tags)
											,messagetype: null
											,theauthor:   CurrentUserID()
											,thedate:new Date().toLocaleFormat('%Y-%m-%d %H:%M:%S')
										}
										, success: function(response){
											
												StatusReady('Изменения сохранены');
													edpanel.down('#info').setValue('');
													treestore.load();
									
									  }
									}
								);
							}else{
								StatusDB('Сохранение данных');
								Ext.Ajax.request(
									{
										url: rootURL+'index.php/c_iu_cm_msg/setRow',
										method:  'POST',
										params: { 
											instanceid: selection.get('instanceid')
											,iu_cm_msgid: selection.get('id')
											,treeid: selection.get('parentid')
											,info:  strip_tags(edpanel.down('#info').getValue()  ,allowed_tags)
											,messagetype: null
											,theauthor: CurrentUserID()
											,thedate: new Date().toLocaleFormat('%Y-%m-%d %H:%M:%S')
										}
										, success: function(response){
												StatusReady('Изменения сохранены');
												edpanel.down('#info').setValue('');
												treestore.load();
										}
									  
									}
								);
							}
							
						}else{
						  Ext.MessageBox.show({
							title:  'Изменение',
							msg:    'Изменение чужих записей не разрешено!',
							buttons: Ext.MessageBox.OK,
						   icon:   Ext.MessageBox.WARNING
							});
						}
						edpanel.hide();
					}
				},
				{
					
				    xtype:'button'	,
				    iconCls:  'icon-cancel',
                    itemId:  'cancel',
                    text:   'Закрыть',
                    disabled: false,
                    scope:  this,
                    handler : function(){
						edpanel.hide();
					}
				}
		],
		
		items:
			[
				{
					minWidth: 740,
					width: 740,
					xtype: 'textarea', 
					x: 5, 
					y: 5, 
					height: 260, 
					enableSourceEdit :false,
					xtype:  'htmleditor',
					name:   'info',
					itemId:   'info',
					fieldLabel:  'Сообщение',
					labelAlign:'top',
					allowBlank:false
					,labelWidth: 120
				}
				
		
			]
		}
	);
	
	function onExportClick(){ 
         	var config= {title: LastFileName+' - Обсуждение', columns:tree.columns };
			var workbook = new Workbook(config);
			workbook.addWorksheet(tree.store, config );
			var x= workbook.render();
			window.open( 'data:application/vnd.ms-excel;base64,' + Base64.encode(x),'_blank');
     };



	 function onHideConfirm(selection){
      if (selection) {
	    Ext.Ajax.request({
            url:    rootURL+'index.php/c_iu_cm_msg/hideRow',
            method:  'POST',
    		params: { 
    				iu_cm_msgid: selection.get('id')
    				}
			,success: function(){
			treestore.load();
			}
					
    	});
      }
    };
    function onHideClick(){
      	var selection = tree.getView().getSelectionModel().getSelection()[0];
		if( selection.get('aid')==CurrentUserID() || CurrentUserID()==CuratorID ){	

			Ext.Msg.show({
				title:  'Скрыть',
				msg:    'Скрыть обсуждение ?',
				buttons: Ext.Msg.YESNO,
				icon:   Ext.MessageBox.QUESTION,
				fn: function(btn,text,opt){
					if(btn=='yes'){
						onHideConfirm(opt.selectedRow);
					}
				},
				caller: this,
				selectedRow: selection
			});
		}else{
			  Ext.MessageBox.show({
                title:  'Скрыть...',
                msg:    'Скрытие чужих записей не разрешено!',
                buttons: Ext.MessageBox.OK,
               icon:   Ext.MessageBox.WARNING
        	});
		}
      
      
    };
	

	 
	tree=Ext.create(Ext.tree.Panel, {
		x:5,y:5,
		height: 640,
		width:575,
		useArrows: true,
		rootVisible: false,
		multiSelect: false,
		singleExpand: true,
		store: treestore,
		border:false,
		nodeParam :'id',
		    dockedItems: [{
                xtype:  'toolbar',
                items: [
                {
                    iconCls:  'icon-application_form_add',
                    text:   'Новая тема',
                    scope:  this,
                    handler : onAddRootClick
                    }, 
                {
                    iconCls:  'icon-application_form_add',
                    text:   'Ответить',
                    scope:  this,
                    handler : onAddClick
                    } , 
					{
                    iconCls:  'icon-application_form_edit',
                    text:   'Изменить',
                    scope:  this,
                    disabled: true,
                    itemId:  'edit',
                    handler : onEditClick
                    },
					 {
                    iconCls:  'icon-status_invisible',
                    text:   'Скрыть',
                    disabled: true,
                    itemId:  'bhide',
                    scope:  this,
                    handler : onHideClick
                    },/* {
                    iconCls:  'icon-application_form_delete',
                    text:   'Удалить',
                    disabled: true,
                    itemId:  'delete',
                    scope:  this,
                    handler : onDeleteClick
                    }, */
                              {
                    iconCls:  'icon-table_refresh',
                    text:   'Обновить',
                    itemId:  'bRefresh',
                    scope:  this,
                    handler : onRefreshClick
                },
				{
                    iconCls:  'icon-page_excel',
                    text:   'Экспорт',
                    itemId:  'bExport',
                    scope:  this,
                    handler: onExportClick
                }]
            }],
		columns: [
			
			{
				xtype: 'treecolumn', 
				text: 'Автор',
				flex: 1,
				dataIndex: 'theauthor',
				sortable: true,
				renderer:headerRenderer
			}, {
			   
				header: 'Дата',
				dataIndex: 'thedate',
				format:'Y-m-d H:i:s',
				renderer: function(v){ return v.toLocaleFormat('%Y-%m-%d %H:%M:%S');},
				width: 130
			},
			{
				text: 'Тема',
				hidden: true,
				sortable: true,
				dataIndex: 'info'
			}
		],
		viewConfig: {
                itemId: vid+'_view',
                plugins: [{
                    pluginId: vid+'preview',
                    ptype: 'preview',
                    bodyField: 'info',
                    expanded: true
                }]
        },
            
		listeners:{
			selectionchange: function(t,selections){
			this.down('#edit').setDisabled(selections.length === 0);
			this.down('#bhide').setDisabled(selections.length === 0);
			 if(selections.length === 0) return;
		 
				 var selection = selections[0];
				/* Ext.QuickTips.register(
					{ 
						target: tree.getEl(), text:  selection.get('info')
					}
				 );
				 */
			},
			itemdblclick: function() { 
				onEditClick();
			}
		}
		
	});
	tpanel = Ext.create(Ext.form.Panel, {
	    title: 'Обсуждение видео',
		border:true,
		layout:'absolute',	
		height: 435+250,
		width:590,
		x:5,
		y:1300,
		collapsible:false,
		items:[ tree ]
	});
	return tpanel;
}


//  панель для работы с файлом
function VideoFilePanel( vid, filerecord ) {
    var LastFileName="";
	var storeComments ;
	var myPlayer;
	var VU_Page;
	var prevVolume=0.5;
	var timeSlider=null;
	var timeShow =null;
	var videoDuration=0;
	var prevTime=0;
	var fileref='';
	var fname='';
	if(filerecord.get('fileurl')==''){
	    fname=filerecord.get('origname');
		fileref='/files/iu_files/'+filerecord.get('fileref');
	}else{
	    fname=filerecord.get('fileurl')
		fileref=filerecord.get('fileurl');
	}
	if(typeof(fname) != "undefined")
		LastFileName=fname;
	else
		LastFileName=fileref;
	
		
	function OnTime(){
		var ct =myPlayer.currentTime();
		if(Math.abs(prevTime-ct)>1){
			prevTime=ct;
			var msg='';
			
			storeComments.each(
				function(record,idx){
					if(ct>=T2S(record.get('starttime')) && ct<=T2S(record.get('endtime'))){
						if (msg!=''){
							msg=msg + ' \n';
						}
						msg=msg + record.get('starttime') + "-" +record.get('endtime') +" "+ strip_tags(record.get('info'))+' ('+record.get('theauthor_grid') +')';
					}
				}
			);
			VU_Page.down('#commentinfo'+vid).setValue(msg);
			
			if(videoDuration==0) videoDuration =myPlayer.duration();
			if(timeShow==null) timeShow=VU_Page.down('#dispTime'+vid);
			timeShow.setValue( S2T(ct) + '/' + S2T(videoDuration));
		}
	};
	
	
	function UpdatePlayBtn(){
		if (myPlayer.paused()){
			VU_Page.down('#playBtn'+vid).setIconCls('icon-play_blue');
			var ct = myPlayer.currentTime();
			VU_Page.down('#startTime'+vid).setValue( S2T(ct));
						
		}else{
			VU_Page.down('#playBtn'+vid).setIconCls('icon-pause_blue');
		}
	}
	
	function SetCurrentTime( ct){
		//var cct;
		myPlayer.currentTime(ct);
		//cct=myPlayer.currentTime();
		//console.debug(ct +'  -->  ' +cct);
		
	}
	
	function FindPrevComment(){
		var ct =myPlayer.currentTime();
		
		var pos=0;
		var minct=ct;
		// ищем нет ли текущих комментариев, чтобы снова не попасть на начало того же
		storeComments.each(function(record,idx){
			if( ct > T2S(record.get('starttime')) && ct < T2S(record.get('endtime')) ){
				if(minct>T2S(record.get('starttime'))) minct=T2S(record.get('starttime'));
			}
		});
		ct =minct-1;
		storeComments.each(function(record,idx){
			if( ct > T2S(record.get('starttime')) && pos < T2S(record.get('starttime')) ){
				pos=T2S(record.get('starttime'));
			}
		}
		
		);
		return pos;
	}
	
	function FindNextComment(){
		var ct =myPlayer.currentTime();
		ct=ct+1;
		var pos=videoDuration;
		storeComments.each(function(record,idx){
			if( ct < T2S(record.get('starttime')) && pos > T2S(record.get('starttime')) ){
				pos=T2S(record.get('starttime'));
			}
		}
		
		);
		return pos;
	}
	
	function PlayVideo(){
		if( myPlayer.bufferedPercent() >0.3)
			myPlayer.play();
	}
	
  var   int_iu_cm_time_;
  var gridComments= Ext.create('Ext.form.Panel', 
					{
						x:650, y:255,
						width:650,
						height:435,
						xtype:'panel',
						layout:'fit',
						border:false
					}
					);
	var commentInstanceid;
	var stiming;
    VU_Page = Ext.create('Ext.form.Panel', 
	{
        id:'myVideoUrokPage'+vid,
        title: filerecord.get('doctype_grid') +'. ' +filerecord.get('info')  + ' [ V' + filerecord.get('version')  +'. Добавил: '+ filerecord.get('addby_grid') + '. Дата: '+ filerecord.get('adddate').toLocaleFormat('%d/%m/%Y %H:%M:%S')+']',
		border:false,
		autoScroll:true,
		autoHeight:true,
		collapsible:true,
		titleCollapse : true,
		layout:'absolute',
		width:1900,
		height:735,
		
        items:
		[
			{
				border:false,
				xtype:"panel",
				layout:"absolute",
				closable:false,
				//collapsible:true,
				titleCollapse : true,
				maxHeight: 700,
				height:700,
				items:
				[
					{
						xtype:"panel",
						autoHeight:true,
						margin:5,
						border:false,
						layout:'absolute',
						x: 0, 
						y: 2,
						height:370,
						itemId:'mediaplayer'+vid,
						html:'<video id="video_'+vid+'" class="video-js vjs-default-skin" controls preload="none" width="640" height="360" data-setup="{}" >'+ 
						'<source src="'+fileref+'" type="video/mp4" /></video>',
						
					listeners:{
							render:function(){
								myPlayer=videojs('video_'+vid);
								myPlayer.on("timeupdate",OnTime);
								myPlayer.on("pause",UpdatePlayBtn);
								myPlayer.on("play",UpdatePlayBtn);
								myPlayer.ready(
									function(){
									 // PlayVideo();
									  myPlayer.volume(0.5);
									}
								);
								
								/*
								var map = new Ext.util.KeyMap({
									target: "video_stop",
									key: 13, // or Ext.EventObject.ENTER
									fn: function(){ alert ('key');}
									
								});
								*/
							}
						}
					},
					{	
						y:370, x:5,
						width:640,
						xtype:'textfield',
						readOnly:true,
						cls:'x-item-readonly',
						labelCls:'x-item-readonly',
						value:fname,
						listeners:{
							render: function(e) {Ext.QuickTips.register({  target: e.getEl(), text: 'Название видеофайла'});}
						}
					},
					{
						x:650, y:5,
						width:650,
						height:250,
						xtype:'textarea',
						id: 'commentinfo'+vid,
						name:'commentinfo'+vid,
						text:''	
					},
			
					gridComments,
					
					/*********************  кнопочки ****************/
					{
						x:5, y:400,
						xtype:'button',
						iconCls:'icon-play_blue',
						itemId:'playBtn'+vid,
						handler: function() {
							 if(myPlayer.paused()){
								PlayVideo();
							}else{
								myPlayer.pause();
							}
						},
						//text:''	
						listeners:{
							render: function(e) {Ext.QuickTips.register({  target: e.getEl(), text: 'Пуск/Пауза'});}
						},
						text:''
					},
					
					{
						x:30, y:400,
						xtype:'button',
						iconCls:'icon-rewind_green',
						handler: function() {
							var ct = myPlayer.currentTime()-10;
							if (ct >0)
							 SetCurrentTime(ct);
							else
							  myPlayer.currentTime(0);
							  if(myPlayer.paused())
								PlayVideo();
						},
						//text:'-10 сек'
						listeners:{
						render: function(e) {Ext.QuickTips.register({  target: e.getEl(), text: '-10 сек'});}
						},
						text:''
					},		
					{
						x:55, y:400,
						xtype:'button',
						iconCls:'icon-rewind_blue',
						handler: function() {
							var ct = myPlayer.currentTime()-1;
							if (ct >0)
							 SetCurrentTime(ct);
							else
							  myPlayer.currentTime(0);
							  if(myPlayer.paused())
								PlayVideo();
						},
						//text:'-1 сек'
						listeners:{
						render: function(e) {Ext.QuickTips.register({  target: e.getEl(), text: '-1 сек'});}
						},
						text:''
					},
					{
						x:80, y:400,
						xtype:'button',
						iconCls:'icon-forward_blue',
						handler: function() {
							var ct = myPlayer.currentTime()+1;
							if (ct <videoDuration)
							 SetCurrentTime(ct);
							if(myPlayer.paused())
								PlayVideo();
						},
						//text:'+1 сек'
						listeners:{
						render: function(e) {Ext.QuickTips.register({  target: e.getEl(), text: '+1 сек'});}
						},
						text:''
					}
					,
					{
						x:105, y:400,
						xtype:'button',
						iconCls:'icon-forward_green',
						handler: function() {
							var ct = myPlayer.currentTime()+10;
							if (ct <videoDuration)
							 SetCurrentTime(ct);
							if(myPlayer.paused())
								PlayVideo();
						},
						listeners:{
						render: function(e) {Ext.QuickTips.register({  target: e.getEl(), text: '+10 сек'});}
						},
						text:''
					}
					,
					{
						x:130, y:400,
						xtype:'button',
						iconCls:'icon-book_previous',
						handler: function() {
							var ct = FindPrevComment();
							if (ct > 0)
							 SetCurrentTime(ct);
							else
							  myPlayer.currentTime(0);
							if(myPlayer.paused())
								PlayVideo();
						},
						listeners:{
						render: function(e) {Ext.QuickTips.register({  target: e.getEl(), text: 'Предыдущий комментарий'});}
						},
						text:''
						
					},
					{
						x:155, y:400,
						xtype:'button',
						iconCls:'icon-book_next',
						handler: function() {
							var ct = FindNextComment();
							if (ct <videoDuration)
							 SetCurrentTime(ct);
							else
								alert('больше нет ...');
							if(myPlayer.paused())
								PlayVideo();
						},
						//text:'Следующий комментарий'	
						listeners:{
						render: function(e) {Ext.QuickTips.register({  target: e.getEl(), text: 'Следующий комментарий'});}
						},
						text:''
					}
				   ,
				
					{
						x:245, y:400,
						xtype:'button',
						iconCls:'icon-monitor',
						itemId:  'fullscreenBtn'+vid,
						handler: function() {
							myPlayer.requestFullScreen();
						}
						 ,
						 listeners:{
							render: function(e) {Ext.QuickTips.register({  target: e.getEl(), text: 'На полный экран'});}
						},
						text:''
					}
				
					,
					{
						x:325, y:400,
						xtype:'button',
						iconCls:'icon-sound',
						itemId:  'muteBtn'+vid,
						handler: function() {
							 if(myPlayer.volume()==0){
								if (prevVolume<0.25)
									this.setIconCls( 'icon-sound_none' );
								else if (prevVolume<0.5)
									this.setIconCls( 'icon-sound_low' );
								else if (prevVolume<0.75)
									this.setIconCls( 'icon-sound' );
								else
									this.setIconCls( 'icon-sound_high' );
								myPlayer.volume(prevVolume);
								
							 }else{
								prevVolume=myPlayer.volume();
								myPlayer.volume(0);
								this.setIconCls( 'icon-sound_mute' );
							 }
						}
						 ,
						 listeners:{
							render: function(e) {Ext.QuickTips.register({  target: e.getEl(), text: 'Звук'});}
						},
						text:''
					}
					,
					{
						
						xtype:'slider',
						x:360, y:403,
						width: 160,
						value: 50,
						increment: 1,
						itemId:  'soundSlider'+vid,
						minValue: 0,
						maxValue: 100,
						listeners:{
						 change: function( slider, newValue, thumb, eOpts ){
							var ct= newValue   /100;
							myPlayer.volume(ct);
							if(ct==0) 
								this.up('form').down('#muteBtn').setIconCls( 'icon-sound_mute' );
							else if (ct<0.25)
								this.up('form').down('#muteBtn').setIconCls( 'icon-sound_none' );
							else if (ct<0.5)
								this.up('form').down('#muteBtn').setIconCls( 'icon-sound_low' );
							else if (ct<0.75)
								this.up('form').down('#muteBtn').setIconCls( 'icon-sound' );
							else
								this.up('form').down('#muteBtn').setIconCls( 'icon-sound_high' );
							prevVolume=ct;
						 }
						 //,render: function(e) {Ext.QuickTips.register({  target: e.getEl(), text: 'Громкость'});}
						}
					}
					,
					{
						//iconCls:'icon-clock',
						x:530, y:400,
						xtype:'displayfield',
						itemId:  'dispTime'+vid,
						fieldLabel:'',
						value:'00:00:00/00:00:00'
					}
					
					, 	
				
					
				
					
					{
						x:5, y:440,
						width:640,
						height:250,
						xtype:'fieldset',
			  		    title:'Новый комментарий'	,
						layout:"absolute",
						
						items:[
							{
								x:5, y:0,
								width:350,
								xtype:'textfield',
								id: 'startTime'+vid,
								name:'startTime'+vid,
								text:'00:00:00'	,
								plugins: [new Ext.ux.InputTextMask('99:99:99')],
								fieldLabel:'Таймкод ',
								labelAlign :'left',
								labelWidth:160
							},
							{
								x:5, y:30,
								width:610,
								height:175,
								enableSourceEdit :false,								
								xtype:'htmleditor',
								id: 'newcomment'+vid,
								name:'newcomment'+vid,
								text:''	,
								fieldLabel:'Текст ',
								labelAlign :'top'
							},
							{
								x:470, y:0,
								xtype:'button',
								id: 'addComment'+vid,
								name:'addComment'+vid,
								iconCls:'icon-script_save',
								text:'Записать комментарий'	,
								handler: function() {
									var ct = T2S(this.up('form').down('#startTime'+vid).getValue());
									var v=strip_tags(this.up('form').down('#newcomment'+vid).getValue() ,allowed_tags);
									if (v!='' ){
												StatusDB('Сохранение данных');
												Ext.Ajax.request({
													url: rootURL+'index.php/c_iu_cm_time/setRow',
													method:  'POST',
													params: { 
														instanceid: commentInstanceid
														,iu_cm_timeid: Math.uuid()
														,messagetype: null //active.get('messagetype') 
														,thedate:  new Date().toLocaleFormat('%Y-%m-%d %H:%M:%S')   
														,theauthor: CurrentUserID() 
														,endtime: S2T(ct+20) 
														,info: v
														,starttime: S2T(ct) 
														,ischecked: 0 // active.get('ischecked') 
													}
													, success: function(response){
														storeComments.load();
														var text = response.responseText;
														var res =Ext.decode(text);
														if(res.success==false){
															Ext.MessageBox.show({
																title:  'Ошибка',
																msg:    res.msg,
																buttons: Ext.MessageBox.OK,
																icon:   Ext.MessageBox.ERROR
																});
															StatusErr( 'Ошибка. '+res.msg);
														}else{
															StatusReady('Изменения сохранены');
														}
												  }
												});									



										
										this.up('form').down('#newcomment'+vid).setValue('');
									}
									
									
									
									
									if(myPlayer.paused())
										PlayVideo();
								}
								 ,
								 listeners:{
									render: function(e) {Ext.QuickTips.register({  target: e.getEl(), text: 'Записать комментарий'});}
								}
							}
						]
					}
				]
			}
		
		
		],
		listeners:{
		
			close:function( panel, eOpts ){
				myPlayer.off('play');
				myPlayer.off('pause');
				myPlayer.off('timeupdate');
				myPlayer.dispose();
			}
		}
           
    }
	); 
	 
	 var store_iu_cm_def = Ext.create('Ext.data.Store', {
        model:'model_iu_cm_def',
        autoLoad: false,
        autoSync: false,
        proxy: {
            type:   'ajax',
                url:   rootURL+'index.php/comment/getVideoCommentsHeader',
            reader: {
                type:   'json'
                ,root:  'data'
                ,successProperty:  'success'
                ,messageProperty:  'msg'
                },
            extraParams:{
                videoid: filerecord.get('id')
            }
        }
    });
	 
	
   
   DefineForms_iu_cm_time_();
	
	
	store_iu_cm_def.on('load', function(){
		store_iu_cm_def.each(	
			function(record,idx){
				commentInstanceid=record.get('instanceid');
				//stiming=record.get('thetheme');
				
	            storeComments = Ext.create('Ext.data.Store', 	
				{
					model:'model_iu_cm_time',
					autoLoad: false,
					autoSync: false,
					proxy: {
						type:   'ajax',
							url:   rootURL+'index.php/c_iu_cm_time/getRows',
						reader: {
							type:   'json'
							,root:  'data'
							,successProperty:  'success'
							,messageProperty:  'msg'
							},
						extraParams:{
							instanceid: record.get('instanceid')
							,curator:(CurrentUserID()==CuratorID)
						}
					}
				}
				);
				int_iu_cm_time_     =      DefineInterface_iu_cm_time_('int_iu_cm_time'+vid,storeComments,myPlayer, LastFileName);
				int_iu_cm_time_.border=false;
				gridComments.items.add(int_iu_cm_time_);
				storeComments.load(  {params:{ instanceid:commentInstanceid,curator:(CurrentUserID()==CuratorID)} } );
				int_iu_cm_time_.instanceid=commentInstanceid;	
				
				var vfc =VideoCommentTree(vid,commentInstanceid,filerecord.get('id'),LastFileName);
				vfc.x=1305;
				vfc.y=5;
				//VU_Page.down('#timing'+vid).setValue(stiming);
				VU_Page.items.add(vfc);
				VU_Page.doLayout();
			}
		);
	 });
	store_iu_cm_def.load();
    return VU_Page;
}


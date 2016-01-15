Ext.require([
    'Ext.form.*'
]);

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
	
	items:[
	{ 
		xtype:'panel',
		id:'myVideoUrok',
        title:'Информация по уроку',
		border:false,
		autoScroll:true,
		autoHeight:true,
		collapsible:true,
		layout:'absolute',
		height:240,
		minWidth:600,
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
									minWidth: 365,
									width: 365,
									maxWidth: 365,
									x: 5, 
									y: 5, 
									labelWidth:90,
									
									xtype:  'displayfield',
									name:   'subject_grid',
									itemId:   'subject_grid',
									fieldLabel:  'Предмет'
							}
							,
							{
									minWidth: 365,
									width: 365,
									maxWidth: 365,
									x: 500, 
									y: 5, 
									labelWidth:90,
									
									xtype:  'displayfield',

									name:   'theclassnum_grid',
									itemId:   'theclassnum_grid',
									fieldLabel:  'Класс'
							}
							,
							{
									minWidth: 720,
									x: 5, 
									y: 35, 
									labelWidth:90,
									
									xtype:  'displayfield',
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
									y: 35, 
									labelWidth:90,
									
									xtype:  'displayfield',
									name:   'rtheme',
									itemId:   'rtheme',
									fieldLabel:  'Тема раздела'
							}
							
						
							
						

					 ], 
				height: 105,
				width:860
			} // group
				,
			{ 
			xtype:'fieldset', 
				anchor: '100%',
				x: 870, 
				y:0,
				layout:'absolute', 
				id:'iu_urok_def_ref',
				title:      'Плезные ссылки',
				defaultType:  'displayfield',
				
				
					items:[
						{
									minWidth: 365,
									x: 5, 
									y: 5, 
									labelWidth:140,

									xtype:  'displayfield',
									value: '',
									name:   'cardref',
									itemId:   'cardref',
									fieldLabel:  ''
							},
							{
									minWidth: 365,
									x: 5, 
									y: 35, 
									labelWidth:140,

									xtype:  'displayfield',
									value: '',
									name:   'scenary',
									itemId:   'scenary',
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
							minWidth: 365,
							width: 365,
							maxWidth: 365,
							x: 5, 
							y: 5, 
							labelWidth:90,
							xtype:  'displayfield',
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
								y: 5, 
								labelWidth:90,
								xtype:  'displayfield',

								name:   'theteacher_grid',
								itemId:   'theteacher_grid',
								fieldLabel:  'Учитель'
						}
						,
						{
								minWidth: 365,
								width: 365,
								maxWidth: 365,
								x: 5, 
								y: 35, 
								labelWidth:90,
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
								y: 35, 
								labelWidth:90,

								xtype:  'displayfield',

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
				anchor: '100%',
				x: 870, 
				y:115,
				layout:'absolute', 
				id:'iu_urok_def_subs',
				title:      'Подписка на события',
				defaultType:  'displayfield',
				
				
					items:[
						{
									minWidth: 230,
									x: 5, 
									y: 5, 
									xtype:  'button',
									iconCls:'icon-email_edit',
									text:   'Статус подписки',
									name:   'subscribeUrok',
									itemId:   'subscribeUrok',
									handler:  function(){
										alert('форма статуса подписки  на события id='+instanceid+' user=' + CurrentUserID() );
									}
							}
							,
							{
									minWidth: 230,
									x: 5, 
									y: 35, 
									xtype:  'button',
									iconCls:'icon-email_stop',
									text:   'Отменить все',
									name:   'unsubscribeUrok',
									itemId:   'unsubscribeUrok',
									handler:  function(){
										alert('Отмена подписки  на события id='+instanceid+' user=' + CurrentUserID() );
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
		store_iu_urok_docs.each(function(record,idx){
			if(record.get('doctype')=='{034C89DD-C5D9-4E48-9932-F9A6BD14A326}'){
				var scn=VUPanel.down('#scenary');
				if (record.get('fileurl')!=''){
					scn.setValue('<a href="' +record.get('fileurl') +'" target="_blank"><img src ="../resources/icons/book.png" /> Сценарий</a>');
				}else{
					scn.setValue('<a href="/output_file.php?ID=' +record.get('fileref') +'&ext=' +record.get('fileref_ext') +'" target="_blank"><img src ="../resources/icons/book.png" /> Сценарий</a>');
				}
			}
		});
		VUPanel.doLayout();
	 });
	
	 store_iu_urok_video.on('load', function(){
		store_iu_urok_video.each(function(record,idx){
			VUPanel.items.add(VideoUrokComments(idx,record));
		});
		VUPanel.items.add(
			UrokComments( 
				store_iu_urok_def.getAt(0).get('id')   
			)  
		);
		VUPanel.doLayout();
	 });
	 
	 store_iu_urok_def.on('load', function() {
       
		record= store_iu_urok_def.getAt(0);
		VUPanel.loadRecord(record);	
		
		instanceid=record.get('instanceid');
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
            ,{name:'info', type: 'string'}
        ]
    });

function UrokComments(instanceid){


 var tpanel;

	var treestore = Ext.create('Ext.data.TreeStore',{
		model: 'model_uc',
		proxy: {
			type: 'ajax',
			url: '/index.php/comment/getCommonComments',
			extraParams:{
				instanceid: instanceid
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
	var edpanel;
	
	
    var mode;
	
	 function onAddRootClick(){
	    mode ='theme';
		edpanel.show();
	   	 
    };
    function onAddClick(){
		var selection = tree.getView().getSelectionModel().getSelection()[0];
		if(selection)
			mode ='replay';
		else
			 mode ='theme';
		edpanel.show();
   	   
    };
	
	var edpanel=Ext.create(Ext.form.Panel,{
		border:true,
		x:60,
		y:60,
		height:275,
		width:750,
		hidden:true,
		layout:'absolute',
		
		items:
			[
				{
					minWidth: 740,
					width: 740,
					xtype: 'textarea', 
					x: 5, 
					y: 5, 
					height: 260, 

					xtype:  'htmleditor',
					name:   'info',
					itemId:   'info',
					fieldLabel:  'Сообщение',
					labelAlign:'top',
					allowBlank:false
					,labelWidth: 120
				},
				{
					x: 550, 
					y: 5, 
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
												,thetheme: edpanel.down('#info').getValue()
												,theauthor: CurrentUserID()
												,thedate:new Date().toLocaleFormat('%Y-%m-%d %H:%M:%S')
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
												,info: edpanel.down('#info').getValue() 
												,messagetype: null
												,theauthor: CurrentUserID()
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
												,iu_cm_msgid: Math.uuid()
												,treeid: selection.get('id')
												,info: edpanel.down('#info').getValue() 
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
							}
					
						edpanel.hide();
					}
				},
				{
					x: 650, 
					y: 5, 
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
		
			]
		}
	);
	
	tree=Ext.create(Ext.tree.Panel, {
		x:5,y:5,
		height: 600,
		width:1145,
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
					/*{
                    iconCls:  'icon-application_form_edit',
                    text:   'Изменить',
                    scope:  this,
                    disabled: true,
                    itemId:  'edit',
                    handler : onEditClick
                    }, {
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
                }]
            }],
		columns: [
			{
				xtype: 'treecolumn', 
				text: 'Тема',
				flex: 2,
				sortable: true,
				dataIndex: 'info'
			},{
				text: 'Автор',
				flex: 1,
				dataIndex: 'theauthor',
				sortable: true
			}, {
			   
				header: 'Дата',
				dataIndex: 'thedate',
				format:'Y-m-d H:i:s',
				renderer: function(v){ return v.toLocaleFormat('%Y-%m-%d %H:%M:%S');},
				width:130
			}
		]
	
		
	});
	tpanel = Ext.create(Ext.form.Panel, {
	    title: 'Обсуждения урока в целом',
		border:false,
		layout:'absolute',	
		height: 600,
		width:1900,
		collapsible:true,
		
		items:[ tree,edpanel ]
		
	});
	return tpanel;
}


function VideoFreeComments(vid,instanceid,videoid){


   var tpanel;
 
	var treestore = Ext.create('Ext.data.TreeStore',{
		model: 'model_uc',
		proxy: {
			type: 'ajax',
			url: '/index.php/comment/getVideoComments',
			extraParams:{
				instanceid: instanceid,
				videoid:videoid
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
	
	
    var mode;
	
	 function onAddRootClick(){
	    mode ='theme';
		edpanel.show();
	   	 
    };
    function onAddClick(){
		var selection = tree.getView().getSelectionModel().getSelection()[0];
		if(selection)
			mode ='replay';
		else
			 mode ='theme';
		edpanel.show();
    };
	
	var edpanel=Ext.create(Ext.form.Panel,{
		border:true,
		x:60,
		y:60,
		height:275,
		width:750,
		hidden:true,
		layout:'absolute',
		
		items:
			[
				{
					minWidth: 740,
					width: 740,
					xtype: 'textarea', 
					x: 5, 
					y: 5, 
					height: 260, 

					xtype:  'htmleditor',
					name:   'info'+vid,
					itemId:   'info'+vid,
					fieldLabel:  'Сообщение',
					labelAlign:'top',
					allowBlank:false
					,labelWidth: 120
				},
				{
					x: 550, 
					y: 5, 
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
												,info: edpanel.down('#info'+vid).getValue() 
												,messagetype: null
												,theauthor: CurrentUserID()
												,thedate:new Date().toLocaleFormat('%Y-%m-%d %H:%M:%S')
											}
											, success: function(response){
												
													StatusReady('Изменения сохранены');
														edpanel.down('#info'+vid).setValue('');
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
												,info: edpanel.down('#info'+vid).getValue() 
												,messagetype: null
												,theauthor: CurrentUserID()
												,thedate: new Date().toLocaleFormat('%Y-%m-%d %H:%M:%S')
											}
											, success: function(response){
													StatusReady('Изменения сохранены');
													edpanel.down('#info'+vid).setValue('');
													treestore.load();
											}
										  
										}
									);
								}
							
					
						edpanel.hide();
					}
				},
				{
					x: 650, 
					y: 5, 
				    xtype:'button'	,
				    iconCls:  'icon-cancel',
                    itemId:  'cancel'+vid,
                    text:   'Закрыть',
                    disabled: false,
                    scope:  this,
                    handler : function(){
						edpanel.hide();
					}
				}
		
			]
		}
	);
	
	tree=Ext.create(Ext.tree.Panel, {
		x:0,y:5,
		height: 400,
		width:1140,
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
					/*{
                    iconCls:  'icon-application_form_edit',
                    text:   'Изменить',
                    scope:  this,
                    disabled: true,
                    itemId:  'edit',
                    handler : onEditClick
                    }, {
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
                }]
            }],
		columns: [
			{
				xtype: 'treecolumn', 
				text: 'Тема',
				flex: 2,
				sortable: true,
				dataIndex: 'info'
			},{
				text: 'Автор',
				flex: 1,
				dataIndex: 'theauthor',
				sortable: true
			}, {
			   
				header: 'Дата',
				dataIndex: 'thedate',
				format:'Y-m-d H:i:s',
				renderer: function(v){ return v.toLocaleFormat('%Y-%m-%d %H:%M:%S');},
				width: 130
			}
		]
	
		
	});
	tpanel = Ext.create(Ext.form.Panel, {
	    title: 'Обсуждение видео',
		border:false,
		layout:'absolute',	
		height: 450,
		width:1140,
		collapsible:false,
		items:[ tree,edpanel ]
	});
	return tpanel;
}



function VideoUrokComments( vid, filerecord ) {
   
	var storeComments ;
	var myPlayer;
	var VU_Page;
	var prevVolume=0.5;
	var timeSlider=null;
	var timeShow =null;
	var videoDuration=0;
	var prevTime=0;
	var fileref='';
	if(filerecord.get('fileurl')==''){
		fileref='/files/iu_files/'+filerecord.get('fileref');
	}else{
		fileref=filerecord.get('fileurl');
	}
	
	
		
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
						msg=msg + record.get('starttime') + "-" +record.get('endtime') +" "+ record.get('info')+' ('+record.get('theauthor_grid') +')';
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
		ct =minct-15;
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
		ct=ct+15;
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
						width:500,
						height:435,
						xtype:'panel',
						layout:'fit',
						border:false
					}
					);
	var commentInstanceid;
    VU_Page = Ext.create('Ext.form.Panel', 
	{
        id:'myVideoUrokPage'+vid,
        title:'Комментарии к видео: ' + filerecord.get('info')  +'('+ filerecord.get('doctype_grid') +')' ,
		border:false,
		autoScroll:true,
		autoHeight:true,
		collapsible:true,
		layout:'absolute',
		width:1900,
		
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
						y: 0,
						height:400,
						itemId:'mediaplayer'+vid,
						html:'<video id="video_'+vid+'" class="video-js vjs-default-skin" controls preload="auto" width="640" height="400" data-setup="{}" >'+ 
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
						x:650, y:5,
						width:500,
						height:250,
						xtype:'textarea',
						id: 'commentinfo'+vid,
						name:'commentinfo'+vid,
						text:''	
					},
					gridComments,
					
					/*********************  кнопочки ****************/
					{
						x:5, y:410,
						xtype:'button',
						iconCls:'icon-play_blue',
						itemId:'playBtn'+vid,
						handler: function() {
							 if(myPlayer.paused()){
								PlayVideo();
								//this.setIconCls('icon-pause_blue');
							}else{
								myPlayer.pause();
								//this.setIconCls('icon-play_blue');
							}
						},
						//text:''	
						listeners:{
							render: function(e) {Ext.QuickTips.register({  target: e.getEl(), text: 'Пуск/Пауза'});}
						},
						text:''
					},
					
					{
						x:30, y:410,
						xtype:'button',
						iconCls:'icon-rewind_green',
						handler: function() {
							var ct = myPlayer.currentTime()-60;
							if (ct >0)
							 SetCurrentTime(ct);
							else
							  myPlayer.currentTime(0);
							  if(myPlayer.paused())
								PlayVideo();
						},
						//text:'-60 сек'
						listeners:{
						render: function(e) {Ext.QuickTips.register({  target: e.getEl(), text: '-60 сек'});}
						},
						text:''
					},		
					{
						x:55, y:410,
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
						x:80, y:410,
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
						x:105, y:410,
						xtype:'button',
						iconCls:'icon-forward_green',
						handler: function() {
							var ct = myPlayer.currentTime()+60;
							if (ct <videoDuration)
							 SetCurrentTime(ct);
							if(myPlayer.paused())
								PlayVideo();
						},
						listeners:{
						render: function(e) {Ext.QuickTips.register({  target: e.getEl(), text: '+60 сек'});}
						},
						text:''
					}
					,
					{
						x:130, y:410,
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
						x:155, y:410,
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
						x:180, y:410,
						xtype:'button',
						iconCls:'icon-script_add',
						handler: function() {
							var ct = myPlayer.currentTime();
							myPlayer.pause();
							this.up('form').down('#startTime'+vid).setValue( S2T(ct));
							var nc=this.up('form').down('#newcomment'+vid);
							nc.setValue('');
							nc.focus();
						},
						//text:'добавить комментарий'
						listeners:{
						render: function(e) {Ext.QuickTips.register({  target: e.getEl(), text: 'Начать комментарий'});}
						},
						text:''
					}
					, 
					{
						x:205, y:410,
						xtype:'button',
						iconCls:  'icon-page_excel',
						//text:   'Экспорт',
						itemId:  'bExportComment'+vid,
				
						handler: function(){ 
								var config= {title:'Комментарии', columns:int_iu_cm_time_.columns };
								var workbook = new Workbook(config);
								workbook.addWorksheet(int_iu_cm_time_.store, config );
								var x= workbook.render();
								window.open( 'data:application/vnd.ms-excel;base64,' + Base64.encode(x),'_blank');
						 }
						 ,
						 listeners:{
							render: function(e) {Ext.QuickTips.register({  target: e.getEl(), text: 'Экспорт'});}
						},
						text:''
					}
					
					,
					{
						x:245, y:410,
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
						x:285, y:410,
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
						x:315, y:413,
						width: 200,
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
						x:530, y:410,
						xtype:'displayfield',
						itemId:  'dispTime'+vid,
						fieldLabel:'',
						value:'00:00:00/00:00:00'
					}
					
					, 	
					/*{
						
						xtype:'slider',
						x:115, y:413,
						width: 525,
						value: 0,
						increment: 1,
						itemId:  'dispSlider'+vid,
						minValue: 0,
						maxValue: 100,
						listeners:{
						 change: function( slider, newValue, thumb, eOpts ){
							var ct= newValue  * videoDuration /100;
							SetCurrentTime(ct);
						 }
						// , render: function(e) {Ext.QuickTips.register({  target: e.getEl(), text: 'Время'});}
						}
					},
					*/
					
				
					
					{
						x:5, y:450,
						width:640,
						height:240,
						xtype:'fieldset',
			  		    title:'Новый комментарий'	,
						layout:"absolute",
						
						items:[
							{
								x:5, y:5,
								width:350,
								xtype:'textfield',
								id: 'startTime'+vid,
								name:'startTime'+vid,
								text:'00:00:00'	,
								plugins: [new Ext.ux.InputTextMask('99:99:99')],
								fieldLabel:'таймкод комментария',
								labelAlign :'left',
								labelWidth:160
							},
							{
								x:5, y:45,
								width:600,
								height:150,
								xtype:'textareafield',
								id: 'newcomment'+vid,
								name:'newcomment'+vid,
								text:''	,
								fieldLabel:'Текст комментария',
								labelAlign :'top'
							},
							{
								x:450, y:5,
								xtype:'button',
								id: 'addComment'+vid,
								name:'addComment'+vid,
								iconCls:'icon-script_save',
								text:'Записать комментарий'	,
								handler: function() {
									var ct = T2S(this.up('form').down('#startTime'+vid).getValue());
									var v=this.up('form').down('#newcomment'+vid).getValue();
									if (v!=''){
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
														,info: this.up('form').down('#newcomment'+vid).getValue() //active.get('info') 
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


/*									var sitem=Array();
										sitem.push(ct );
										sitem.push( ct + 60 );
										sitem.push( 'Человег');
										sitem.push( this.up('form').down('#newcomment'+vid).getValue()); 
										sitem.push( 'info');
										myData.push(sitem); */
										
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
						}
					}
				}
				);
				int_iu_cm_time_     =      DefineInterface_iu_cm_time_('int_iu_cm_time'+vid,storeComments);
				gridComments.items.add(int_iu_cm_time_);
				storeComments.load(  {params:{ instanceid:commentInstanceid} } );
				int_iu_cm_time_.instanceid=commentInstanceid;	
				var vfc =VideoFreeComments(vid,commentInstanceid);
				vfc.x=5;
				vfc.y=700;
				VU_Page.items.add(vfc);
				VU_Page.doLayout();
			}
		);
	 });
	store_iu_cm_def.load();
    return VU_Page;
}


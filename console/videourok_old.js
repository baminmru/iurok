Ext.require([
    'Ext.form.*'
]);




////////////////////// video urok ///////////////////////

function VideoUrokPage() {
   
	var storeComments ;
	var myPlayer;
	var VU_Page;
	var prevVolume=0.5;
	var timeSlider=null;
	var timeShow =null;
	var videoDuration=0;
	var prevTime=0;
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
		
	function OnTime(){
	  if (window.console && console.debug) {
		var ct =myPlayer.currentTime();
		if(Math.abs(prevTime-ct)>1){
			prevTime=ct;
			var msg='';
			/*
			storeComments.each(
				function(record,idx){
					if(ct>=record.get('start') && ct<=record.get('stop')){
						if (msg!=''){
							msg=msg + ' \n';
						}
						msg=msg + S2T(record.get('start')) + "-" +S2T(record.get('stop')) +" "+ record.get('info')+' ('+record.get('name') +')';
					}
				}
			);
			VU_Page.ownerCt.down('#commentinfo').setValue(msg);
			*/
			if(videoDuration==0) videoDuration =myPlayer.duration();
			if(timeSlider==null) timeSlider=VU_Page.ownerCt.down('#dispSlider');
			if(timeShow==null) timeShow=VU_Page.ownerCt.down('#dispTime');
			
			
			timeShow.setValue( S2T(ct) + '/' + S2T(videoDuration));
			timeSlider.setValue((ct * 100 / videoDuration));
		}
		
	  }
	  //alert(myPlayer.currentTime);
	};
	
	
	function UpdatePlayBtn(){
		if (myPlayer.paused()){
			VU_Page.ownerCt.down('#playBtn').setIconCls('icon-play_blue');
		}else{
			VU_Page.ownerCt.down('#playBtn').setIconCls('icon-pause_blue');
		}
	}
	
	function FindPrevComment(){
		var ct =myPlayer.currentTime();
		var pos=0;
		var minct=ct;
		storeComments.each(function(record,idx){
			if( ct > record.get('start') && ct < record.get('stop') ){
				minct=record.get('start');
			}
		});
		ct =minct;
		storeComments.each(function(record,idx){
			if( ct > record.get('start') && pos < record.get('start') ){
				pos=record.get('start');
			}
		}
		
		);
		return pos;
	}
	
	function FindNextComment(){
		var ct =myPlayer.currentTime();
		var pos=videoDuration;
		storeComments.each(function(record,idx){
			if( ct < record.get('start') && pos > record.get('start') ){
				pos=record.get('start');
			}
		}
		
		);
		return pos;
	}
	
	function PlayVideo(){
		if( myPlayer.bufferedPercent() >0.3)
			myPlayer.play();
	}
	
	var myData = [
	[5, 	30,  'Иванов','Замечание 1','info'],
	[15, 	40,  'Петров','Замечание П1','info'],
	[50, 	120,  'Иванов','Замечание 2','info'],
	[150, 	240,  'Иванов','Замечание 3','info'],
	[250, 	320,  'Иванов','Замечание 4','info'],
	[355, 	420,  'Иванов','Замечание 5','info'],
	[450, 	520,  'Иванов','Замечание 6','info'],
	[500, 	610,  'Зайцев','Замечание Зы1','info'],
	[555, 	620,  'Иванов','Замечание 7','info'],
	[655, 	720,  'Иванов','Замечание 8','info']
	
	];
	
	
	
	
	try{
	   storeComments = Ext.create('Ext.data.ArrayStore', {
       fields: [
		   {name: 'start',      type: 'float'},
		   {name: 'stop',     type: 'float'},
		   {name: 'name',      type: 'string'},
		   {name: 'info',      type: 'string'},
		   {name: 'xtype',      type: 'string'}
		],
		sorters: [{
         property: 'start',
         direction: 'ASC'
		}
		],
        data: myData
    });
	}catch(ex){
	}
 
 
    var gridComments= Ext.create('Ext.grid.Panel', 
					{
						x:650, y:255,
						width:500,
						height:435,
						xtype:'grid',
						store:storeComments,
						id: 'allcommentinfo',
						name:'allcommentinfo',
						listeners:{
						/*select:function( obj, record, index, eOpts ){
							var ct=record.get('start');
							myPlayer.currentTime(ct);
							if(myPlayer.paused())
								myPlayer.play();
						},*/
						itemdblclick: function( obj, record, item, index, e, eOpts ){
							var ct=record.get('start');
							myPlayer.currentTime(ct);
							if(myPlayer.paused())
								PlayVideo();
						}
						},
						columns: [
							{
								text     : 'С',
								align:'left',
								iconCls : 'icon-clock',
								width    : 60,
								sortable : false,
								dataIndex: 'start',
								renderer:function(value){return S2T(value);}
							},
							{
								text     : 'По',
								align:'left',
								iconCls : 'icon-clock',
								width    : 60,
								sortable : false,
								dataIndex: 'stop',
								renderer:function(value){return S2T(value);}
							},
							{
								text     : 'Текст',
								align:'left',
								//iconCls : 'icon-clock',
								width    : 260,
								sortable : false,
								dataIndex: 'info'
							},		
							{
								text     : 'Автор',
								align:'right',
								//iconCls : 'icon-clock',
								width    : 100,
								sortable : false,
								dataIndex: 'name'
							}
						]
					}
				);

    VU_Page = Ext.create('Ext.form.Panel', 
	{
        closable:true,
        id:'myVideoUrokPage',
        title:'Комментирование урока',
		border:false,
		flex:1,
        items:
		[
			{
				border:true,
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
						itemId:'mediaplayer',
						html:'<video id="video_1" class="video-js vjs-default-skin" preload="auto" width="640" height="400" data-setup="{}" > <source src="/video/urok.480.mp4" type="video/mp4" /></video>',
						
					listeners:{
							render:function(){
								myPlayer=videojs('video_1');
								myPlayer.on("timeupdate",OnTime);
								myPlayer.on("pause",UpdatePlayBtn);
								myPlayer.on("play",UpdatePlayBtn);
								myPlayer.ready(
									function(){
									  PlayVideo();
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
						id: 'commentinfo',
						name:'commentinfo',
						text:''	
					},
					gridComments,
					
					/*********************  кнопочки ****************/
					{
						x:5, y:440,
						xtype:'button',
						iconCls:'icon-play_blue',
						itemId:'playBtn',
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
						x:30, y:440,
						xtype:'button',
						iconCls:'icon-rewind_green',
						handler: function() {
							var ct = myPlayer.currentTime()-60;
							if (ct >0)
							 myPlayer.currentTime(ct);
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
						x:55, y:440,
						xtype:'button',
						iconCls:'icon-rewind_blue',
						handler: function() {
							var ct = myPlayer.currentTime()-1;
							if (ct >0)
							 myPlayer.currentTime(ct);
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
						x:80, y:440,
						xtype:'button',
						iconCls:'icon-forward_blue',
						handler: function() {
							var ct = myPlayer.currentTime()+1;
							if (ct <videoDuration)
							 myPlayer.currentTime(ct);
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
						x:105, y:440,
						xtype:'button',
						iconCls:'icon-forward_green',
						handler: function() {
							var ct = myPlayer.currentTime()+60;
							if (ct <videoDuration)
							 myPlayer.currentTime(ct);
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
						x:130, y:440,
						xtype:'button',
						iconCls:'icon-book_previous',
						handler: function() {
							var ct = FindPrevComment();
							if (ct > 0)
							 myPlayer.currentTime(ct);
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
						x:155, y:440,
						xtype:'button',
						iconCls:'icon-book_next',
						handler: function() {
							var ct = FindNextComment();
							if (ct <videoDuration)
							 myPlayer.currentTime(ct);
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
						x:180, y:440,
						xtype:'button',
						iconCls:'icon-script_add',
						handler: function() {
							var ct = myPlayer.currentTime();
							myPlayer.pause();
							this.up('form').down('#startTime').setValue( S2T(ct));
							var nc=this.up('form').down('#newcomment');
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
						x:205, y:440,
						xtype:'button',
						iconCls:  'icon-page_excel',
						//text:   'Экспорт',
						itemId:  'bExportComment',
				
						handler: function(){ 
								var config= {title:'Коментарии', columns:gridComments.columns };
								var workbook = new Workbook(config);
								workbook.addWorksheet(gridComments.store, config );
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
						x:245, y:440,
						xtype:'button',
						iconCls:'icon-monitor',
						itemId:  'fullscreenBtn',
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
						x:285, y:440,
						xtype:'button',
						iconCls:'icon-sound',
						itemId:  'muteBtn',
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
						x:315, y:443,
						width: 325,
						value: 50,
						increment: 1,
						itemId:  'soundSlider',
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
						x:5, y:410,
						xtype:'displayfield',
						itemId:  'dispTime',
						fieldLabel:'',
						value:'00:00:00/00:00:00'
					}
					
					, 	
					{
						
						xtype:'slider',
						x:115, y:413,
						width: 525,
						value: 0,
						increment: 1,
						itemId:  'dispSlider',
						minValue: 0,
						maxValue: 100,
						listeners:{
						 change: function( slider, newValue, thumb, eOpts ){
							var ct= newValue  * videoDuration /100;
							myPlayer.currentTime(ct);
						 }
						// , render: function(e) {Ext.QuickTips.register({  target: e.getEl(), text: 'Время'});}
						}
					},
					
				
					
					{
						x:5, y:470,
						width:640,
						height:220,
						xtype:'fieldset',
			  		    title:'Новый комментарий'	,
						layout:"absolute",
						
						items:[
							{
								x:5, y:5,
								width:350,
								xtype:'textfield',
								id: 'startTime',
								name:'startTime',
								text:'00:00:00'	,
								plugins: [new Ext.ux.InputTextMask('99:99:99')],
								fieldLabel:'таймкод комментария',
								labelAlign :'left',
								labelWidth:160
							},
							{
								x:5, y:45,
								width:600,
								height:130,
								xtype:'textareafield',
								id: 'newcomment',
								name:'newcomment',
								text:''	,
								fieldLabel:'Текст коментария',
								labelAlign :'top'
							},
							{
								x:450, y:5,
								xtype:'button',
								id: 'addComment',
								name:'addComment',
								iconCls:'icon-script_save',
								text:'Записать коментарий'	,
								handler: function() {
									var ct = T2S(this.up('form').down('#startTime').getValue());
									var v=this.up('form').down('#newcomment').getValue();
									if (v!=''){
										var sitem=Array();
										sitem.push(ct );
										sitem.push( ct + 60 );
										sitem.push( 'Человег');
										sitem.push( this.up('form').down('#newcomment').getValue()); 
										sitem.push( 'info');
										myData.push(sitem);
										gridComments.store.load();
										this.up('form').down('#newcomment').setValue('');
									}
									if(myPlayer.paused())
										PlayVideo();
								}
								 ,
								 listeners:{
									render: function(e) {Ext.QuickTips.register({  target: e.getEl(), text: 'Записать коментарий'});}
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
	 
	 
	
    return VU_Page;
}


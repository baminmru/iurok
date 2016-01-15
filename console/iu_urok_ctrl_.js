Ext.require([
    'Ext.form.*',
    'Ext.data.*',
    'Ext.chart.*',
    'Ext.grid.Panel',
    'Ext.layout.container.Column'
]);


/*
 var cmbstore_iud_stagedef_ctl = Ext.create('Ext.data.Store', {
        model:'cmbmodel_iud_stagedef',
        autoLoad: false,
        autoSync: false,
        proxy: {
				type:   'ajax',
                url:   rootURL+'index.php/c_iud_stagedef/getRows',
				reader: {
					type:   'json'
					,root:  'data'
					,successProperty:  'success'
					,messageProperty:  'msg'
				}
        }
    });
	*/

Ext.define('model_process',{
            extend:'Ext.data.Model',
        fields: [
			 {name: 'name',type: 'string'}
            ,{name: 'id',type: 'string'}
			,{name: 'taskfinished',type: 'string'}
			,{name: 'taskcancelled',type: 'string'}
            ,{name:'ischecked', type: 'string'}
            ,{name:'createdate', type: 'date', dateFormat:'Y-m-d H:i:s' }
			,{name:'finishdate', type: 'date', dateFormat:'Y-m-d H:i:s' }
			,{name:'lastname', type: 'string'}
            ,{name:'username', type: 'string'}
            ,{name:'surname', type: 'string'}
			,{name:'rolename', type: 'string'}
			,{name:'taskinstanceid', type: 'string'}
        ]
    });
	
	Ext.define('model_curstate',{
            extend:'Ext.data.Model',
        fields: [
			 {name: 'topstage_grid',type: 'string'}
         	,{name: 'iu_urok_stage_grid', type: 'string'}
			,{name: 'laststate', type: 'string'}
			,{name: 'lastmessage', type: 'string'}
			,{name: 'instanceid',type: 'string'}
        ]
    });

function UrokControlTab(instanceid){



 var tpanel;
 var spanel;
 var tree;
 var int_iu_urok_sn_;
 
  var store_iu_urok_sn = Ext.create('Ext.data.Store', {
        model:'model_iu_urok_sn',
        autoLoad: false,
        autoSync: false,
        proxy: {
            type:   'ajax',
                url:   rootURL+'index.php/c_iu_urok_sn/getRows',
            reader: {
                type:   'json'
                ,root:  'data'
                ,successProperty:  'success'
                ,messageProperty:  'msg'
                }
        }
    });
	
 var store_curstate = Ext.create('Ext.data.Store', {
        model:'model_curstate',
        autoLoad: false,
        autoSync: false,
        proxy: {
            type:   'ajax',
                url:   '/index.php/wf/getUrokStatus',
            reader: {
                type:   'json'
                ,root:  'data'
                ,successProperty:  'success'
                ,messageProperty:  'msg'
                },
            extraParams:{
                urokid: instanceid
            }
        }
    });
	
	

	var treestore = Ext.create('Ext.data.TreeStore',{
		model: 'model_process',
		proxy: {
			type: 'ajax',
			url: '/index.php/wf/GetUrokProcess',
			extraParams:{
				instanceid: instanceid
			}
		},

		folderSort: true,
		autoLoad:true
	}
	);
	
	
	

	function onRefreshClick(){
            treestore.load({params:{instanceid: instanceid}});
    };
	
	function onTaskDone( ){ 
         
		var selection = tree.getView().getSelectionModel().getSelection()[0];
        if (selection) {
   	    if(CheckOperation('iu_task.edit')!=0){
			if(selection.get('taskinstanceid')+'' !=''){
						task_instanceid = selection.get('taskinstanceid');
						var edit = Ext.create('EditWindow_task_done');
						if(cmbstore_tasksn.count()==0){
							edit.down('#doer_states').hide();
						}else{
							edit.down('#doer_states').allowBlank=false;
						}
						edit.show();
			}
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
     };
	 
    function onTaskCancel(){ 
         
		var selection = tree.getView().getSelectionModel().getSelection()[0];
        if (selection) {
   	    if(CheckOperation('iu_task.edit')!=0){
			
			  if (selection) {
				if(CheckOperation('iu_u.edit')!=0){
					if(selection.get('taskinstanceid')+'' !=''){
						task_instanceid = selection.get('taskinstanceid');
						var edit = Ext.create('EditWindow_task_cancel');
						edit.show();
					}
				
				/*}else{
						Ext.MessageBox.show({
						title:  'Контроль прав.',
						msg:    'Изменение объектов не разрешено!',
						buttons: Ext.MessageBox.OK,
					   icon:   Ext.MessageBox.WARNING
						});
						*/
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
     };
	 
  function onTaskCheck(){ 
         
		var selection = tree.getView().getSelectionModel().getSelection()[0];
        if (selection) {
			if(CheckOperation('iu_task.edit')!=0){
					if(selection.get('taskinstanceid')+'' !=''){
						task_instanceid = selection.get('taskinstanceid');
						var edit = Ext.create('EditWindow_task_check');
						edit.show();
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
     };
	 
     function onTaskCheckBad(){ 
         
		var selection = tree.getView().getSelectionModel().getSelection()[0];
        if (selection) {
			if(CheckOperation('iu_task.edit')!=0){
					if(selection.get('taskinstanceid')+'' !=''){
						task_instanceid = selection.get('taskinstanceid');
						var edit = Ext.create('EditWindow_task_checkbad');
						edit.show();
					}
        		Ext.MessageBox.show({
                title:  'Контроль прав.',
                msg:    'Изменение объектов не разрешено!',
                buttons: Ext.MessageBox.OK,
               icon:   Ext.MessageBox.WARNING
        		});
			}
        }
     }
	
    var mode;
	
	
	
	tree=Ext.create(Ext.tree.Panel, {
		x:5,y:5,
		height: 300,
		width:760,
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
                    iconCls:  'icon-flag_green',
                    text:   'Завершить',
                    //disabled: true,
                    itemId:  'taskdone',
                    scope:  this,
                    handler : onTaskDone
                    }
				   ,
				   {
                    iconCls:  'icon-flag_red',
                    text:   'Отменить',
                   // disabled: true,
                    itemId:  'taskcancel',
                    scope:  this,
                    handler : onTaskCancel
                    }
					,
				   {
                    iconCls:  'icon-emoticon_smile',
                    text:   'Проверено',
                    //disabled: true,
                    itemId:  'taskcheck',
                    scope:  this,
                    handler : onTaskCheck
                    }
				   ,
				   {
                    iconCls:  'icon-emoticon_unhappy',
                    text:   'Вернуть исполнителю',
                    //disabled: true,
                    itemId:  'taskcheckbad',
                    scope:  this,
                    handler : onTaskCheckBad
                    },
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
				text: 'Этапы и задачи',
				flex: 2,
				sortable: true,
				dataIndex: 'name',
				renderer: function(value, metaData, record, row, col, store, gridView){
					if(record.get('taskinstanceid')+'' !=''){
						return "<a href='/index.php?tid="+record.get('taskinstanceid') +"' target='_blank'>'"+value +"</a>";
					}else{
						return value;
					}
				}
			},{
				text: 'Исполнитель',
				flex: 1,
				dataIndex: 'lastname',
				sortable: true
			}, {
			   
				header: 'Дата начала',
				dataIndex: 'createdate',
				format:'Y-m-d H:i:s',
				renderer: function(v){ if(v) return v.toLocaleFormat('%d/%m/%Y %H:%M'); else return '';},
				width:130
			}
			, {
			   
				header: 'Дата завершения',
				dataIndex: 'finishdate',
				format:'Y-m-d H:i:s',
				renderer: function(v){  if(v) return v.toLocaleFormat('%d/%m/%Y %H:%M'); else return '';},
				width:130
			}
			,
			
			
			{header: "Соcтояние",  dataIndex: 'taskfinished', sortable: true,renderer: function(value, metaData, record){
				
				
				if (record.get('ischecked')==-1) { 
					if (record.get('taskcancelled')==-1) return '<img src="/resources/icons/user_cross.png">';
					if (record.get('taskfinished')==-1) return '<img src="/resources/icons/accept.png"> <img src="/resources/icons/eye.png">';
				}else{
					if (record.get('taskcancelled')==-1) return '<img src="/resources/icons/cancel.png">';
					if (record.get('taskfinished')==-1) return '<img src="/resources/icons/accept.png">';
					if (record.get('iu_task_isdelegated')=='да') return '<img src="/resources/icons/user.png">';
				}
				return '';
			}}
			
			/*, {
			   
				header: 'Завершена',
				dataIndex: 'taskfinished',
				renderer: function(v){  
							if(v) {
								if(v==-1){
									return '<img src="/resources/icons/accept.png">';
								}
							}
							else return '';
							},
				width:60
			}
			, {
			   
				header: 'Отменена',
				dataIndex: 'taskcancelled',
				renderer: function(v){  
							if(v) {
								if(v==-1){
									return '<img src="/resources/icons/cancel.png">';
								}
							}
							else return '';
							},
				width:60
			}
			, {
			   
				header: 'Проверена',
				dataIndex: 'ischecked',
				renderer: function(v){  
							if(v) {
								if(v==-1){
									return '<img src="/resources/icons/eye.png">';
								}
							}
							else return '';
							},
				width:60
			} */
		]
	
		
	});
	
	   DefineForms_iu_urok_sn_();
       int_iu_urok_sn_     =      DefineInterface_iu_urok_sn_('int_iu_urok_sn',store_iu_urok_sn);
	   int_iu_urok_sn_.width=760;
	   int_iu_urok_sn_.height=375;
		int_iu_urok_sn_.x=5;
	spanel = Ext.create(Ext.form.Panel, 
		{
			title: 'Статусы',
			border:false,
			layout:'absolute',	
			height: 400,
			width:765,
			collapsible:true,
			items:[ 
				int_iu_urok_sn_
			]
		}
	);
		
	
	tpanel = Ext.create(Ext.form.Panel, 
	{
	    title: 'Ход процесса',
		border:false,
		layout:'absolute',	
		x:0,
		y:0,
		height: 440,
		width:765,
		collapsible:true,
		
		    
		onNextState: function(){ 
			if(CheckOperation('iu_urok.edit')!=0){
			  ns = this.down('#nextstage');
              Ext.Ajax.request(
				{
				url:    rootURL+'index.php/wf/NextState',
				method:  'POST',
				params: { 
						instanceid: instanceid
						//,id: selection.get('id')
						,nextstage: ns.getValue()
						},
						success: function(response){
							var resp = Ext.decode(response.responseText);
							var text = resp.msg;
							if(text=="ok"){
								Ext.MessageBox.show({
								title:  'Подтверждение',
								msg:    'Подэтап изменен',
								buttons: Ext.MessageBox.OK,
								icon:   Ext.MessageBox.INFO
								});
								treestore.load({params:{instanceid: instanceid}});
								store_curstate.load({params:{urokid: instanceid}});
								
							}else{
								Ext.MessageBox.show({
									title:  'Ошибка',
									msg:    text,
									buttons: Ext.MessageBox.OK,
									icon:   Ext.MessageBox.ERROR
								});
								treestore.load({params:{instanceid: instanceid}});
								store_curstate.load({params:{urokid: instanceid}});
							}
						}
				 }
			  );
			}else{
        		Ext.MessageBox.show({
                title:  'Контроль прав.',
                msg:    'Изменение объектов не разрешено!',
                buttons: Ext.MessageBox.OK,
               icon:   Ext.MessageBox.WARNING
        		});
			}
        
		},
		
		items:[ 
			tree,
			{
				xtype:'textfield',
				width: 250,
				x: 5, 
				y: 310,
				labelWidth:140,
				readOnly: true,
				cls:'x-item-readonly',
				emptyText:      '',
				name:   'topstage_grid',
				itemId:   'topstage_grid',
				fieldLabel:  'Текущий этап',
				allowBlank:true
				}
			,
			{
				xtype:'textfield',
				width: 250,
				x: 260, 
				y: 310, 
				labelWidth:140,
				readOnly: true,
				cls:'x-item-readonly',
				name:   'iu_urok_stage_grid',
				itemId:   'iu_urok_stage_grid',
				fieldLabel:  'Текущий подэтап',
				allowBlank:true
				},
				{
				xtype:'textfield',
				width: 245,
				x: 515, 
				y: 310, 
				labelWidth:140,
				readOnly: true,
				cls:'x-item-readonly',
				name:   'laststate',
				itemId:   'laststate',
				fieldLabel:  'Посл. статус',
				allowBlank:true
				},
			{
				columnWidth:1,
				xtype:'combobox',
				store:cmbstore_iud_stagedef,
				valueField:'id',
				displayField:'brief',
				typeAhead:true,
				queryMode:'local',
				emptyText:'',
				name:'topstage',
				itemId:'topstage',
				fieldLabel:  '',
				emptyText:      'Новый этап',
				listeners:{
				    focus: function()   
					{ 
						cmbstore_iud_stagedef.load();  
					},
					render: function(e) {
						Ext.QuickTips.register({  target: e.getEl(), text: 'Этап процесса'});
					}, 
				
					select:function (combo, selection) {
						var post = selection[0];
						if (post) {
						  
							topstage=post.get('id');
							
							var nst = combo.ownerCt.getComponent('nextstage');
							if (nst){
								nst.clearValue();
								nst.enable();
							}
							cmbstore_iu_status.load({params:{thestage:post.get('id'),urokid:instanceid}});



						}
					}
				},
				width:250,
				x:5,
				y:360
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
				listeners:{  focus: function()   { if(this.store.count(false)==0) this.store.load();  } ,render: function(e) {Ext.QuickTips.register({  target: e.getEl(), text: 'Следующий подэтап'});} },
				xtype:  'combobox',
				store: cmbstore_iu_status,
				valueField:     'id',
				displayField:   'brief',
				typeAhead: true,
				name:   'nextstage',
				itemId:   'nextstage',
				fieldLabel:  '',
				emptyText:      'Новый подэтап',
				hideLabel:  true,
				disabled: true,
				width:250,
				x:260,
				y:360
					
				
			},
			{
				xtype: 'button',
				iconCls:  'icon-lightning_go',
				text:   'Задать новый подэтап',
				itemId:  'bNextStage',
				handler: function(){tpanel.onNextState();},
				disabled: false,
				width:245,
				x:515,
				y:360
			}
,
			{
				xtype: 'displayfield',
				itemId:  'lastmessage',
				width:740,
				x:5,
				y:385
			}				
		]
		
	});
	
	
	 store_curstate.on('load', function(){
		var prcid;
		store_curstate.each(
			function(record,idx){
		
				prcid=record.get('instanceid');
				var scn=tpanel.down('#topstage_grid');
				if (scn){
					scn.setValue(record.get('topstage_grid'));
				}
				var scn=tpanel.down('#iu_urok_stage_grid');
				if (scn){
					scn.setValue(record.get('iu_urok_stage_grid'));
				}
				var scn=tpanel.down('#laststate');
				if (scn){
					scn.setValue(record.get('laststate'));
				}
				
				var scn=tpanel.down('#lastmessage');
				if (scn){
					scn.setValue(record.get('lastmessage'));
				}
			}
		);
		
		int_iu_urok_sn_.instanceid=prcid;
		store_iu_urok_sn.load({params:{instanceid:prcid}});
	    	
		tpanel.doLayout();
		
	 });
	
	store_curstate.load({params:{urokid: instanceid}});
	
	var ctlpanel = Ext.create(Ext.form.Panel, 
	{
	    border:false,
		layout:'vbox',	
		//height: 830,
		autoScroll:true,
		width:765,
		collapsible:false,
		items:[ 
		tpanel,
		spanel
		]
	});
	return ctlpanel;

}
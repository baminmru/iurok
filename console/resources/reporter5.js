

Ext.require([ 
'Ext.form.*'
]);

 var enum_Reportmy = Ext.create('Ext.data.ArrayStore', {
  fields: [ {name: 'name'}, {name: 'value', type: 'string'} ], data: [ 
	 ['Задачи. Сводка','TaskAllCount.mrt']
//	,['Задачи. Получено по городам','TaskAllCountTown.mrt']
//	,['Задачи. Активные','TaskActiveCount.mrt']
//	,['Задачи. Завершено','TaskFinishedCount.mrt']
//	,['Задачи. Отменено','TaskCancelledCount.mrt']
	,['Задачи. Подэтапы  - Полученные','TaskStageUser.mrt']
	,['Задачи. Подэтапы - Завершенные','TaskStageUserFinished.mrt']
	// ,['Задачи по этапам','TaskGrouped.mrt']





 ]});
 
 function ReportMY( ){ 

  var rpanel= Ext.create('Ext.form.Panel', {
       closable: true,
       id:     'iu_reportmy',
       title: 'Личные Отчеты',
      layout: 'fit',
      flex: 1,
      fieldDefaults: {
         labelAlign:             'top',
          msgTarget:             'side'
        },
        defaults: {
        anchor:'100%'
        },

        items: [
		{
		  xtype:'panel',	
          frame: false,
		  closable:true,
		  layout: 'fit',
		  flex: 1,
		 title: 'Личные Отчеты',
		 reportfile:'',
		 html:'<iframe id="repmy_frame_id" width="100%"  height="100%" src=""></iframe>',
		 rbar:
                [
                {
                    xtype:  'form',
                    title:  'Параметры отчета',
titleAlign :'center',
                    iconCls:  'icon-script_gear',
                    flex:1,
					collapsible:true,
                    collapseDirection:  'right',
					animCollapse: false, 
					titleCollapse:true,
					bodyPadding:5,
					width:250,
					minWidth:250,
					autoScroll:true,
                    buttonAlign:  'center',
					layout: {
                    type:   'vbox',
                    align:  'stretch'
				},
                defaultType:  'textfield',
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
									this.expand();
								}
						},
						editable: true,
						enableRegEx: true,
						queryMode:'local',
						listeners:{  focus: function()   { if(this.store.count(false)==0) this.store.load();  } ,render: function(e) {Ext.QuickTips.register({  target: e.getEl(), text: 'Отчет'});} },
						xtype:  'combobox',
						store: enum_Reportmy,
						valueField:     'value',
						displayField:   'name',
						typeAhead: true,
						name:   'reportname',
						itemId:   'reportname',
						fieldLabel:  'Вариант отчета',
						emptyText:      'Выбрать отчет',
						hideLabel:  false
						}	,
				
						{

						xtype:  'datefield',
						format:'d/m/Y',
						submitFormat:'Y-m-d H:i:s',
						value:  '',
						name:  'dfrom',
						itemId: 'dfrom',
						fieldLabel: 'Дата C (00:00:00)',
						emptyText:'не задано',
						submitEmptyText: false,
						listeners: {render: function(e) {Ext.QuickTips.register({  target: e.getEl(), text: 'Дата C'});}}
						}
						,
						{

						xtype:  'datefield',
						format:'d/m/Y',
						submitFormat:'Y-m-d',
						value:  '',
						name:  'dto',
						itemId: 'dto',
						fieldLabel: 'Дата по (23:59:59)',
						emptyText:'не задано',
						submitEmptyText: false,
						listeners: {render: function(e) {Ext.QuickTips.register({  target: e.getEl(), text: 'Дата по'});}}
						}
					],
				buttons: 
                    [
                        {
                            text: 'Пуск',
							iconCls:'icon-script_start',
                            formBind: true, 
                            disabled: false,
                            grid: this,
                            handler: function() {
                                var user_input =this.up('form').getForm().getValues(false,true);
								
								
								var src=rootURL+'/reports/stimulsoft/index.php?stimulsoft_client_key=ViewerFx&stimulsoft_report_key=';
								if(user_input['reportname']){
									src=src+user_input['reportname'];
									
								
									
								    src=src+'&usr='+CurrentUserID().replace('{','').replace('}','');
									src=src+'&uid='+CurrentUserID().replace('{','').replace('}','');
									if(user_input['dfrom']==null && user_input['dto']==null){
										
										src=src+'&dfrom='+'2000-01-01 00:00:00';
										var cd=new Date();  
										src=src+'&dto='+cd.toLocaleFormat('%Y-%m-%d')+' 23:59:59';
										src=src+'&p1=' + 'За весь период';
									}
								
									if(user_input['dfrom']==null && user_input['dto']!=null ){
										src=src+'&dfrom='+'2000-01-01 00:00:00';
										src=src+'&dto='+user_input['dto']+' 23:59:59';	
										src=src+'&p1=' + ' По ' +myDateOnlyRenderer(user_input['dto']+' 23:59:59');
									}
									
									if(user_input['dfrom']!=null && user_input['dto']==null ){
										
										src=src+'&dfrom='+user_input['dfrom'];
										var cd=new Date();  
										src=src+'&dto='+cd.toLocaleFormat('%Y-%m-%d')+' 23:59:59';
										src=src+'&p1=' + ' C ' +myDateOnlyRenderer(user_input['dfrom']);
									}
									if(user_input['dfrom']!=null && user_input['dto']!=null ){
										src=src+'&dfrom='+user_input['dfrom'];
										src=src+'&dto='+user_input['dto']+' 23:59:59';	
										src=src+'&p1=' +' C ' +myDateOnlyRenderer(user_input['dfrom'])+ ' По ' +myDateOnlyRenderer(user_input['dto']+' 23:59:59');
									}
									
									//alert(src);
									Ext.getElementById('repmy_frame_id').src =encodeURI(src);
								}
                             
                            }
                        }  
						, 
						{
							text: 'Сбросить',
							iconCls:'icon-cancel',
                            grid: this,
                            handler: function() {
                                //console.log(this.up('form'));
                                this.up('form').getForm().reset();
                                
                            }
						
                        }
                    ]
                }
            ]//rbar
    }] // tabpanel
    }); //Ext.Create
    return rpanel;
}

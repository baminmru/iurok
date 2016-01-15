

function acCommentRenderer(value, metaData, record, row, col, store, gridView) 
	{
	  if(metaData==null) return rootURL+'?id='+ record.get('ucode');
	  return ('<a href="'+rootURL+'?id='+ record.get('ucode')+'" target="_blank"><img src="'+rootURL+'/resources/icons/comment_dull.png"></a>');

		
	};
	
	function acCardRenderer(value, metaData, record, row, col, store, gridView) 
	{
	  if(metaData==null) return rootURL+'?uid='+ record.get('uid');
	
	  return ('<a href="'+rootURL+'?uid='+ record.get('uid')+'" target="_blank"><img src="'+rootURL+'/resources/icons/film_edit.png"></a>');

		
	};

	



var groupingFeature_allcomments = Ext.create('Ext.grid.feature.Grouping',{
groupByText:  'Группировать по этому полю',
showGroupsText:  'Показать группировку'
});


var interval_allcomments;
Ext.define('grid_allcomments', {
    extend:  'Ext.grid.Panel',
    alias: 'widget.g_v_allcomments',
    requires: [
        'Ext.grid.*',
        'Ext.form.field.Text',
        'Ext.toolbar.TextItem'
    ],

    initComponent: function(){
        Ext.apply(this, {
        frame: false,
	    store: store_v_allcomments,
		stateful: stateFulSystem,
		stateId: 'j_v_allcomments',
        features: [groupingFeature_allcomments],
        defaultDockWeights : { top: 7, bottom: 5, left: 1, right: 3 },
        
        viewConfig: {
            enableTextSelection: true
        },
		
		dockedItems: [
				
				{
                xtype:  'toolbar',
                     items: [ {
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
			{text: "Дата", width:120, dataIndex: 'thedate', sortable: true, renderer: myDateRenderer}
			,
			{text: "Страница<br/>урока", width:70, renderer:acCommentRenderer, sortable: false}
            ,	 
			{text: "Карточка<br/>урока", width:70, renderer:acCardRenderer, sortable: false}
			,
            {text: "Автор", width:120, dataIndex: 'name', sortable: true}
			,
			{text: "Комментарий", minWidth:350, flex:1, dataIndex: 'info', sortable: false}
			,
			{text: "Урок", width:220, dataIndex: 'classtheme', sortable: true}
            ,
            {text: "Предмет", width:120, dataIndex: 'subject', sortable: true}
			,
			{text: "Учитель", width:120, dataIndex: 'teacher', sortable: true}
			,
			{text: "Тайминг", width:80, dataIndex: 'starttime', sortable: true}
        ]
        ,
	    bbar: {
				layout: {
                        type:'vbox',
                        align: 'stretch'
                    },
				items: [

				Ext.create('Ext.PagingToolbar', {
				store: store_v_allcomments,
				displayInfo: true,
				displayMsg:  'Показаны строки с {0} по {1} из {2}',
				emptyMsg: 'нет данных'
				
				})
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
						name:   'theauthor',
						itemId:   'theauthor',
						fieldLabel:  '',
						emptyText:      'Автор',
						hideLabel:  true
						}
						,
						{

						value:  '',
						name:   'info',
						itemId:   'info',
						fieldLabel:  '',
						emptyText:      'Текст',
						hideLabel:  true,
						listeners: {render: function(e) {Ext.QuickTips.register({  target: e.getEl(), text: 'Текст'});}}
						}
						,
						{

						value:  '',
						name:   'classtheme',
						itemId:   'classtheme',
						fieldLabel:  '',
						emptyText:      'Тема урока',
						hideLabel:  true,
						listeners: {render: function(e) {Ext.QuickTips.register({  target: e.getEl(), text: 'Тема урока'});}}
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
							listeners:{  focus: function()   { if(this.store.count(false)==0) this.store.load();  } ,render: function(e) {Ext.QuickTips.register({  target: e.getEl(), text: 'Предмет'});} },
							xtype:  'combobox',
							store: cmbstore_iud_predmet,
							valueField:     'id',
							displayField:   'brief',
							typeAhead: true,
							name:   'subject_id',
							itemId:   'subject_id',
							fieldLabel:  '',
							emptyText:      'Предмет',
							hideLabel:  true
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
        this.store.load()
       },
        onSelectChange: function(selModel, selections){
		
    },
    listeners: {
	   select: function( obj, record, index, eOpts )
        {
       
        },
        itemdblclick: function() { 
    	    this.onEditClick();
        }
        ,
        	added:function(){
        			interval_allcomments= setInterval(function() {  
        			this.store.load()
        			}, 600000);
        		}
        	,
        	destroy:function(){
        		clearInterval(interval_allcomments);
        }
    },
 
    onDeleteClick: function(){
     
    },
    onAddClick: function(){
   	    
    },
    onEditClick: function(){
        
    },
    onRefreshClick: function(){
             this.store.load();
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
function iu_allcomments_Jrnl(){ 

  var iu_cm= Ext.create('Ext.form.Panel', {
       closable: true,
       id:     'iu_allcomments_jrnl',
       title: 'Все комментарии',
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
            itemId:'gr_allcomments',
            xtype:'g_v_allcomments',
			//default_filter:[{key:'urokdone',value:'2'}],
            layout: 'fit',
            flex: 1,
            store: store_v_allcomments,
			stateful: stateFulSystem,
			stateId: 'j_v_allcomments',
    }] // tabpanel
    }); //Ext.Create
	
	FastFilterTask= function(){
		iu_cm.items.getAt(0).down('form').DoFind();
	};
	

	FastFilterTask();
	
    return iu_cm;
}
Ext.define('ObjectWindow_iu_ac', {
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
    title:  'Комментарий',
    items:[ ]
	});
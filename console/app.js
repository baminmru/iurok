
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
 
 Ext.Loader.setConfig({enabled: true});





var menuPanel;
var leftPanel;
var contentPanel;
var stateFulSystem=false;


Ext.onReady(function () {
    Ext.tip.QuickTipManager.init();
    
    // setup the state provider, all state information will be saved to a cookie

	try{
		Ext.state.Manager.setProvider(Ext.create('Ext.state.LocalStorageProvider'));
		stateFulSystem=true;
	}catch( ex ){
		//alert(ex);
		stateFulSystem=false;

	}

	
    UserLogin();
});


function EnableActions(){

	app_actions.each(function(record,idx){
	
	 var name=record.get('menucode'); 
	 var enableMenu = record.get('accesible'); 
	 var comp=null;
	 //console.log('code->'+name);
	 if(enableMenu==-1){
		comp=null;
		//startMenu.items[0].menu.down("#"+name)
		comp=menuPanel.down("#"+name);
		//console.log('comp->'+comp);
		if (comp!=null){
			comp.hidden=false;
			comp.disabled=false;
		    /* var comp1=null
			 comp1=comp.up();
			if(comp1!=null)
				if(comp1.hidden)
					comp1.show(); */
		}
	 }else{
		comp=null;
		comp=menuPanel.down("#"+name);
		//console.log('comp->'+comp);
		if (comp!=null){
			comp.disabled=true;
			comp.hidden=true;
			
		}
		
	 }
	 
	}
	
	
	);
	menuPanel.doLayout();
	
	{
		var j;
		j=iu_t_Jrnl();
		j.iconCls='icon-lightning';
		contentPanel.add(j);
		contentPanel.setActiveTab(j);
	}
	
	PrepareRoles();
	
	
};


function MakeExit(btn){
	if(btn=="yes"){
		Ext.Ajax.request(
				{
					url: rootURL+'index.php/app/logout',
					method:  'POST',
					success: function(response){
						document.location=document.location;
						
					}
				}
			);
		//document.location=document.location;
	}
};
var actionEXIT = Ext.create('Ext.Action', {
	itemId:'actionEXIT',
	text: 'Выход',
	iconCls: 'icon-door',
	disabled:false,
	handler: function(){
		Ext.Msg.confirm('Выход из приложения?',
			'Завершить работу с приложением?',
			 MakeExit);
		
	}
});

var actionChangePassword = Ext.create('Ext.Action', {
	itemId:'actionChangePassword',
	text: 'Сменить пароль',
	iconCls: 'icon-building_key',
	disabled:false,
	handler: function() {
			var edit = Ext.create('EditWindow_sp_password');
			edit.show();
		}
});



var actioniu_urok_cur = Ext.create('Ext.Action', {
	itemId:             'actioniu_urok_cur',
	text:               'Урок. Интерфейс куратора',
	iconCls:            'icon-film_key',
	 disabled:false,
	 handler: function(){
	var j=Ext.getCmp('iu_urok_jrnl_cur');
	if(j==null){
		j=iu_urok_Jrnl_cur();
		j.iconCls='icon-film_key';
		contentPanel.add(j);
		contentPanel.setActiveTab(j);
	}
	else{
		contentPanel.setActiveTab(j);
	}
	 }
});

var actioniu_allcomments = Ext.create('Ext.Action', {
	itemId:             'actioniu_allcomments',
	text:               'Все комментарии',
	iconCls:            'icon-comment_dull',
	 disabled:false,
	 handler: function(){
	var j=Ext.getCmp('iu_allcomments_jrnl');
	if(j==null){
		j=iu_allcomments_Jrnl();
		j.iconCls='icon-comment_dull';
		contentPanel.add(j);
		contentPanel.setActiveTab(j);
	}
	else{
		contentPanel.setActiveTab(j);
	}
	 }
});


var actionReportTask= Ext.create('Ext.Action', {
	itemId:             'actionReportTask',
	text:               'Задачи',
	iconCls:            'icon-script_lightning',
	disabled:false,
	handler: function(){
		var j=Ext.getCmp('iu_reporttask');
		if(j==null){
			j=ReportTask();
			j.iconCls='icon-script_lightning';
			contentPanel.add(j);
			contentPanel.setActiveTab(j);
		}
		else{
			contentPanel.setActiveTab(j);
		}
	}
});



var actionReportCM= Ext.create('Ext.Action', {
	itemId:             'actionReportCM',
	text:               'Отчеты по заливке',
	iconCls:            'icon-script_go',
	disabled:false,
	handler: function(){
		var j=Ext.getCmp('iu_reportCM');
		if(j==null){
			j=ReportCM();
			j.iconCls='icon-script_go';
			contentPanel.add(j);
			contentPanel.setActiveTab(j);
		}
		else{
			contentPanel.setActiveTab(j);
		}
	}
});

var actionReportCKK= Ext.create('Ext.Action', {
	itemId:             'actionReportCKK',
	text:               'Отчеты СКК',
	iconCls:            'icon-script_code_red',
	disabled:false,
	handler: function(){
		var j=Ext.getCmp('iu_reportCKK');
		if(j==null){
			j=ReportCKK();
			j.iconCls='icon-script_code_red';
			contentPanel.add(j);
			contentPanel.setActiveTab(j);
		}
		else{
			contentPanel.setActiveTab(j);
		}
	}
});

var actionReportUrok= Ext.create('Ext.Action', {
	itemId:             'actionReportUrok',
	text:               'Уроки',
	iconCls:            'icon-script_save',
	disabled:false,
	handler: function(){
		var j=Ext.getCmp('iu_reporturok')
		if(j==null){
			j=ReportUrok();
			j.iconCls='icon-script_save';
			contentPanel.add(j);
			contentPanel.setActiveTab(j);
		}
		else{
			contentPanel.setActiveTab(j);
		}
	}
});

var actionReportMan= Ext.create('Ext.Action', {
	itemId:             'actionReportMan',
	text:               'Статистика',
	iconCls:            'icon-script_palette',
	disabled:false,
	handler: function(){
		var j=Ext.getCmp('iu_reportman')
		if(j==null){
			j=ReportMan();
			j.iconCls='icon-script_palette';
			contentPanel.add(j);
			contentPanel.setActiveTab(j);
		}
		else{
			contentPanel.setActiveTab(j);
		}
	}
});

var actionReportODIM= Ext.create('Ext.Action', {
	itemId:             'actionReportODIM',
	text:               'Отчеты ОДИМ',
	iconCls:            'icon-script_gear',
	disabled:false,
	handler: function(){
		var j=Ext.getCmp('iu_reportodim')
		if(j==null){
			j=ReportODIM();
			j.iconCls='icon-script_gear';
			contentPanel.add(j);
			contentPanel.setActiveTab(j);
		}
		else{
			contentPanel.setActiveTab(j);
		}
	}
});

var actionReportMy= Ext.create('Ext.Action', {
	itemId:             'actionReportMy',
	text:               'Личные отчеты',
	iconCls:            'icon-script_key',
	disabled:false,
	handler: function(){
		var j=Ext.getCmp('iu_reportmy')
		if(j==null){
			j=ReportMY();
			j.iconCls='icon-script_key';
			contentPanel.add(j);
			contentPanel.setActiveTab(j);
		}
		else{
			contentPanel.setActiveTab(j);
		}
	}
});


function MyInit(){
    combo_pbar = Ext.create('Ext.ProgressBar', {
        id:'combo_pbar',
        width:300,
        renderTo:'loading'
    });

    var app_info_loaded=false;
	app_info = Ext.create('Ext.data.Store', {
        model:'application_info',
        autoLoad: false,
        autoSync: false,
        proxy: {
            type:   'ajax',
                url:   rootURL+'index.php/app/getSessionInfo',
            reader: {
                type:   'json'
                ,root:  'data'
                ,successProperty:  'success'
                ,messageProperty:  'msg'
            }
        },
       listeners: {
       'load': function(){
		app_info_loaded =true;
		combo_StoreLoaded=true; 
		var comp=menuPanel.down("#sessionInfo"); 
	    comp.setValue('Пользователь: '+app_info.getAt(0).get("info") + '. (' + app_info.getAt(0).get("rolename") +') Л.С.:' + app_info.getAt(0).get("mailcount") );
	   }
       }
    });
	combo_Stores.push(app_info);

	app_modes = Ext.create('Ext.data.Store', {
        model:'application_modes',
        autoLoad: false,
        autoSync: false,
        proxy: {
            type:   'ajax',
                url:   rootURL+'index.php/app/getModes',
            reader: {
                type:   'json'
                ,root:  'data'
                ,successProperty:  'success'
                ,messageProperty:  'msg'
            }
        },
       listeners: {
       'load': function(){ combo_StoreLoaded=true; }
       }
    });
	combo_Stores.push(app_modes);

	app_actions = Ext.create('Ext.data.Store', {
        model:'application_actions',
        autoLoad: false,
        autoSync: false,
        proxy: {
            type:   'ajax',
                url:   'index.php/app/getActions',
            reader: {
                type:   'json'
                ,root:  'data'
                ,successProperty:  'success'
                ,messageProperty:  'msg'
            }
        },
       listeners: {
       'load': function(){app_actions_loaded =true;combo_StoreLoaded=true; EnableActions();}
       }
    });
	combo_Stores.push(app_actions);
	
	
	
	

    menuPanel = new Ext.panel.Panel({
        xtype:'panel',
        region:'north',
        dockedItems:{
            itemId:'toolbar',
            xtype:'toolbar',
            items:[ 
                {
					itemId:'actionFile',
				    text:'Файл',
                    iconCls:'icon-folder',
                    menu:[ actionChangePassword,actionEXIT] 
				
				}
				,
				{
					itemId:'actionDict',
				    text:'Справочники',
                    iconCls:'icon-book_open',
                    menu:[actioniu_reg,actioniu_cls,actioniud_p ,actioniud_c,actioniud_process,actioniud_stage,actioniu_s,actioniud_sn,actioniu_d_urole,actioniu_int,actioniu_rcfg,actioniud_t,actioniu_d_doctype,/* actioniud_fst, actioniud_ft,*/actioniud_mt,actioniud_rt,actioniud_vt,actioniud_adtype,actioniud_sp] 
				
				}
				,
				{
					itemId:'actionOrg',
				    text:'Организация',
                    iconCls:'icon-sitemap',
                    menu:[actioniu_org,actioniu_u,actioniu_tm] 
				
				}
				,
				{
					itemId:'actionProcess',
				    text:'Производство',
                    iconCls:'icon-chart_bar',
                    menu:[actioniu_urok_cur,actioniu_urok_arch,actioniu_t,actioniu_subs,actioniu_l,actioniu_plog,actioniu_allcomments] 
				
				},
				{
					itemId:'actionReports',
				    text:'Отчеты',
                    iconCls:'icon-script',
                    menu:[actionReportTask,actionReportUrok,actionReportMan,actionReportMy,actionReportODIM,actionReportCKK,actionReportCM] 
				
				},
				{
					itemId:'actionTrash',
				    text:'Корзина',
                    iconCls:'icon-bin',
                    menu:[actioniu_urok_trash,actioniu_t_trash,actioniu_u_trash,actioniu_tm_trash] 
				
				}
				
				,'->',
				{
					itemId:'sessionInfo',
					xtype:'displayfield',
					iconCls:'icon-information'//,
					//menu:[ actionInfo]
				}
			
				
            ]
        }
    });
	
	
    contentPanel = new Ext.tab.Panel({
        region:'center',
        xtype:'tabpanel', // TabPanel itself has no title
		splitter:true,
        activeTab:0      // First tab active by default
    });

	/*statusPanel = new Ext.Panel( {
	 region:'south',
     hideHeaders:true,
	 title:'',
	 //layout:'hbox',
	 border:false,
	 bbar:
		 Ext.create('Ext.ux.StatusBar', {
			id: 'my-status',
			region:'south',
			// defaults to use when the status is cleared:
			defaultText: 'все хорошо',
			//defaultIconCls: 'icon-bullet_green',

			// values to set initially:
			text: 'Готово',
			//iconCls: 'icon-bullet_green',
			width:600

		})
	
	});
	*/
	
	statusPanel =	 Ext.create('Ext.ux.StatusBar', {
			id: 'my-status',
			region:'south',
			// defaults to use when the status is cleared:
			defaultText: 'все хорошо',
			//defaultIconCls: 'icon-bullet_green',
			layout:'fit',
			// values to set initially:
			text: 'Готово',
			height:33

		});
	

    var vPort = new Ext.container.Viewport({
            layout:'border',
            renderTo:Ext.getBody(),
            items:[ /*leftPanel,*/ menuPanel, 
                contentPanel,statusPanel]
        }
    );

	combo_LoadNext();
	
	setInterval(function() { app_info.load() }, 60000);
	
}




var defaultMenuDisabled=false;
var defaultMenuHidden=false;
//////////////////////////////////////////////////////
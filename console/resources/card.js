

Ext.Loader.setConfig({
  enabled: true
 });
 Ext.Loader.setPath('Ext.ux', '../ux');
 
 Ext.require([
  'Ext.layout.container.*',
  'Ext.resizer.Splitter',
  'Ext.fx.target.Element',
  'Ext.fx.target.Component',
  'Ext.window.Window',
  'Ext.selection.CellModel',
  'Ext.grid.*',
  'Ext.data.*',
  'Ext.util.*',
  'Ext.state.*',
  'Ext.form.*',
  'Ext.ux.CheckColumn', 
  'Ext.ux.grid.FiltersFeature',
  'Ext.toolbar.Paging',
  'Ext.ux.statusbar.StatusBar',
  'Ext.ModelManager',
   'Ext.tip.QuickTipManager'
 ]);
 
 Ext.Loader.setConfig({enabled: true});
var stateFulSystem=false;






Ext.onReady(function () {
    Ext.tip.QuickTipManager.init();
	try{
		Ext.state.Manager.setProvider(Ext.create('Ext.state.LocalStorageProvider'));
		stateFulSystem=true;
	}catch( ex ){
		//alert(ex);
		stateFulSystem=false;

	}

    UserLogin();
});



var menuPanel;
var leftPanel;
var contentPanel;


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
		//var comp=menuPanel.down("#sessionInfo"); 
	    //comp.setValue('Пользователь: '+app_info.getAt(0).get("info") + '. (' + app_info.getAt(0).get("rolename") +')' );
		//window.document.title='Карточка урока.';
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
		   load: function(){ 
				combo_StoreLoaded=true;  
				var filters = new Array();
				filters.push({property: 'instanceid', value: urokid});
				store_v_autoiu_urok_def.filter(filters);
			}
       }
    });
	combo_Stores.push(app_modes);
	
	function FindModes( objtype ){
	var recordIndex = app_modes.find('name', objtype,0,false,false,true);
	if(recordIndex == -1){
		return null;
	}else{
		return app_modes.getAt(recordIndex);
	}
}

	function MakeExit(btn){
		if(btn=="yes"){
			Ext.Ajax.request(
					{
						url: rootURL+'index.php/app/logout',
						method:  'POST',
						success: function(response){
							alert('logget out');
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
                    menu:[ /*actionStartPage,*/actionEXIT] 
				
				}
				
			
				
            ]
        }
    });
	
	
	
    contentPanel = new Ext.form.Panel({
        region:'center',
		title:'',
		closable:false,
		header:false,
		autoScroll:true
    });

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
            items:[ /*leftPanel, menuPanel, */
                contentPanel,statusPanel]
        }
    );
	

	
	
	// открытие окна по умолчанию
	
	store_v_autoiu_urok_def.on('load',function()
	{
		var sname ='Редактирование карточки урока';
		store_v_autoiu_urok_def.each(function(record,idx){
			sname =  record.get('iu_urok_def_subject')+ ", " + record.get('iu_urok_def_theclassnum') +". " + record.get('iu_urok_def_classtheme');
		});
		var edit = Ext.create('iu.windowObjects');
		edit.iconCls='icon-film_edit';
		edit.prefix="";
		edit.setTitle('Урок: '+sname) ; 
		var p=eval('iu_urok_Panel_'+OTEditMode('iu_urok')+'(  urokid, false ,null)' ) ;
		p.onButtonCancel=function(){
		}
		edit.add(p);
		
		/*
		var p=eval('iu_urok_Panel_'+OTEditMode('iu_urok')+'(  urokid, false ,null)' ) ;
		p.onButtonCancel=function(){
		}
		var edit= Ext.create('Ext.form.Panel', {
			id: 'iu_urok_win',
			layout:'fit',
			constrainHeader :true,
			closable:false,
			items:[	p ],
			bbar:[
				{
					xtype:'button',
					text:'Сохранить',
					iconCls: 'icon-accept',
					handler:function(){
					if(typeof(p.onButtonOk)=='function') p.onButtonOk();
					}
				}
			]
		}
		);*/
	    
		contentPanel.add(edit);
		sname=""+sname;
		window.document.title=sname;
	});
	
	combo_LoadNext();
}





var defaultMenuDisabled=true;
var defaultMenuHidden=true;
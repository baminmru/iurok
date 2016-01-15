

Ext.Loader.setConfig({
  enabled: true
 });
 Ext.Loader.setPath('Ext.ux', '../ux/');
 
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
  'Ext.ux.PreviewPlugin',
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
		window.document.title='Задача.';
	   }
       }
    });
	combo_Stores.push(app_info);
	
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
	
	
	
	combo_LoadNext();
	
	
	// открытие окна по умолчанию

	{

		var edit = Ext.create('iu.windowObjects');
		edit.prefix="c_v_autoiu_task";
		edit.setTitle('Задача' ) ;
		var p=iu_t_Panel_(  taskid, false ,null) ;
		p.onButtonCancel=function(){

		}
		edit.add(p);
		contentPanel.add(edit);
		
	}
	
}



var defaultMenuDisabled=true;
var defaultMenuHidden=true;
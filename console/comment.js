

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
		combo_StoreLoaded=true; 
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
                url:   rootURL+'index.php/app/getActions',
            reader: {
                type:   'json'
                ,root:  'data'
                ,successProperty:  'success'
                ,messageProperty:  'msg'
            }
        },
       listeners: {
       'load': function(){combo_StoreLoaded=true; EnableActions();}
       }
    });
	combo_Stores.push(app_actions);
	combo_LoadNext();
	
	
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
		layout:'vbox',
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
	function EnableActions()
	{
		var act;
		act = FindAction('actioniu_cm');
		if (act!=null){
			if(act.get('accesible')==-1){
				var j;
				j=VideoCommentPage();
				j.iconCls='icon-comment_dull';
				contentPanel.add(j);
			}else{
				
				Ext.MessageBox.show({
					title:  'Контроль прав.',
					msg:    'Не разрешен доступ к странице урока!',
					buttons: Ext.MessageBox.OK,
				   icon:   Ext.MessageBox.WARNING
				});
				
			}
		}else{
					Ext.MessageBox.show({
					title:  'Контроль прав.',
					msg:    'Не разрешен доступ к странице урока!',
					buttons: Ext.MessageBox.OK,
				   icon:   Ext.MessageBox.WARNING
				});
		}
		
	}
	
}




var defaultMenuDisabled=true;
var defaultMenuHidden=true;
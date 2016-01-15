
//actioniu_urok_trash,actioniu_t_trash,actioniu_u_trash,actioniu_tm_trash

var actioniu_u_trash = Ext.create('Ext.Action', {
    itemId:             'actioniu_u_trash',
    text:               'Сотрудники',
    iconCls:            'icon-user',
			 disabled:defaultMenuDisabled,
			 hidden:defaultMenuHidden,
             handler: function(){
			var j=Ext.getCmp('iu_u_jrnl_trash');
			if(j==null){
				j=iu_u_Jrnl_trash();
				j.iconCls='icon-user';
				contentPanel.add(j);
				contentPanel.setActiveTab(j);
			}
			else{
				contentPanel.setActiveTab(j);
			}
             }
});

var actioniu_urok_trash = Ext.create('Ext.Action', {
    itemId:             'actioniu_urok_trash',
    text:               'Урок',
    iconCls:            'icon-film',
			 disabled:defaultMenuDisabled,
			 hidden:defaultMenuHidden,
             handler: function(){
			var j=Ext.getCmp('iu_urok_jrnl_trash');
			if(j==null){
				j=iu_urok_Jrnl_trash();
				j.iconCls='icon-film';
				contentPanel.add(j);
				contentPanel.setActiveTab(j);
			}
			else{
				contentPanel.setActiveTab(j);
			}
             }
});

var actioniu_t_trash = Ext.create('Ext.Action', {
    itemId:             'actioniu_t_trash',
    text:               'Задачи',
    iconCls:            'icon-lightning',
			 disabled:defaultMenuDisabled,
			 hidden:defaultMenuHidden,
             handler: function(){
			var j=Ext.getCmp('iu_t_jrnl_trash');
			if(j==null){
				j=iu_t_Jrnl_trash();
				j.iconCls='icon-lightning';
				contentPanel.add(j);
				contentPanel.setActiveTab(j);
			}
			else{
				contentPanel.setActiveTab(j);
			}
             }
});

var actioniu_tm_trash = Ext.create('Ext.Action', {
    itemId:             'actioniu_tm_trash',
    text:               'Учителя и Методисты',
    iconCls:            'icon-group',
			 disabled:defaultMenuDisabled,
			 hidden:defaultMenuHidden,
             handler: function(){
			var j=Ext.getCmp('iu_tm_jrnl_trash');
			if(j==null){
				j=iu_tm_Jrnl_trash();
				j.iconCls='icon-group';
				contentPanel.add(j);
				contentPanel.setActiveTab(j);
			}
			else{
				contentPanel.setActiveTab(j);
			}
             }
});



var actioniu_urok_arch = Ext.create('Ext.Action', {
    itemId:             'actioniu_urok_arch',
    text:               'Урок. Архив',
    iconCls:            'icon-film',
			 disabled:defaultMenuDisabled,
			 hidden:defaultMenuHidden,
             handler: function(){
			var j=Ext.getCmp('iu_urok_jrnl_arch');
			if(j==null){
				j=iu_urok_Jrnl_arch();
				j.iconCls='icon-film';
				contentPanel.add(j);
				contentPanel.setActiveTab(j);
			}
			else{
				contentPanel.setActiveTab(j);
			}
             }
});


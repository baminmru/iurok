
var actioniud_adtype = Ext.create('Ext.Action', {
    itemId:             'actioniud_adtype',
    text:               'Тип документа к акту',
    iconCls:            'icon-page_white_picture',
			 disabled:defaultMenuDisabled,
			 hidden:defaultMenuHidden,
             handler: function(){
			var j=Ext.getCmp('iud_adtype_jrnl');
			if(j==null){
				j=iud_adtype_Jrnl();
				j.iconCls='icon-page_white_picture';
				contentPanel.add(j);
				contentPanel.setActiveTab(j);
			}
			else{
				contentPanel.setActiveTab(j);
			}
             }
});
var actioniud_c = Ext.create('Ext.Action', {
    itemId:             'actioniud_c',
    text:               'Тип курса',
    iconCls:            'icon-time',
			 disabled:defaultMenuDisabled,
			 hidden:defaultMenuHidden,
             handler: function(){
			var j=Ext.getCmp('iud_c_jrnl');
			if(j==null){
				j=iud_c_Jrnl();
				j.iconCls='icon-time';
				contentPanel.add(j);
				contentPanel.setActiveTab(j);
			}
			else{
				contentPanel.setActiveTab(j);
			}
             }
});
var actioniud_fst = Ext.create('Ext.Action', {
    itemId:             'actioniud_fst',
    text:               'Тип хранения файла',
    iconCls:            'icon-bullet_database',
			 disabled:defaultMenuDisabled,
			 hidden:defaultMenuHidden,
             handler: function(){
			var j=Ext.getCmp('iud_fst_jrnl');
			if(j==null){
				j=iud_fst_Jrnl();
				j.iconCls='icon-bullet_database';
				contentPanel.add(j);
				contentPanel.setActiveTab(j);
			}
			else{
				contentPanel.setActiveTab(j);
			}
             }
});
var actioniud_ft = Ext.create('Ext.Action', {
    itemId:             'actioniud_ft',
    text:               'Тип файла',
    iconCls:            'icon-script',
			 disabled:defaultMenuDisabled,
			 hidden:defaultMenuHidden,
             handler: function(){
			var j=Ext.getCmp('iud_ft_jrnl');
			if(j==null){
				j=iud_ft_Jrnl();
				j.iconCls='icon-script';
				contentPanel.add(j);
				contentPanel.setActiveTab(j);
			}
			else{
				contentPanel.setActiveTab(j);
			}
             }
});
var actioniud_mt = Ext.create('Ext.Action', {
    itemId:             'actioniud_mt',
    text:               'Тип сообщения',
    iconCls:            'icon-note_edit',
			 disabled:defaultMenuDisabled,
			 hidden:defaultMenuHidden,
             handler: function(){
			var j=Ext.getCmp('iud_mt_jrnl');
			if(j==null){
				j=iud_mt_Jrnl();
				j.iconCls='icon-note_edit';
				contentPanel.add(j);
				contentPanel.setActiveTab(j);
			}
			else{
				contentPanel.setActiveTab(j);
			}
             }
});
var actioniud_p = Ext.create('Ext.Action', {
    itemId:             'actioniud_p',
    text:               'Предметы',
    iconCls:            'icon-book_tabs',
			 disabled:defaultMenuDisabled,
			 hidden:defaultMenuHidden,
             handler: function(){
			var j=Ext.getCmp('iud_p_jrnl');
			if(j==null){
				j=iud_p_Jrnl();
				j.iconCls='icon-book_tabs';
				contentPanel.add(j);
				contentPanel.setActiveTab(j);
			}
			else{
				contentPanel.setActiveTab(j);
			}
             }
});
var actioniud_process = Ext.create('Ext.Action', {
    itemId:             'actioniud_process',
    text:               'Тип производственного процесса',
    iconCls:            'icon-chart_bar',
			 disabled:defaultMenuDisabled,
			 hidden:defaultMenuHidden,
             handler: function(){
			var j=Ext.getCmp('iud_process_jrnl');
			if(j==null){
				j=iud_process_Jrnl();
				j.iconCls='icon-chart_bar';
				contentPanel.add(j);
				contentPanel.setActiveTab(j);
			}
			else{
				contentPanel.setActiveTab(j);
			}
             }
});
var actioniud_rt = Ext.create('Ext.Action', {
    itemId:             'actioniud_rt',
    text:               'Тип ссылки',
    iconCls:            'icon-folder_image',
			 disabled:defaultMenuDisabled,
			 hidden:defaultMenuHidden,
             handler: function(){
			var j=Ext.getCmp('iud_rt_jrnl');
			if(j==null){
				j=iud_rt_Jrnl();
				j.iconCls='icon-folder_image';
				contentPanel.add(j);
				contentPanel.setActiveTab(j);
			}
			else{
				contentPanel.setActiveTab(j);
			}
             }
});
var actioniud_sn = Ext.create('Ext.Action', {
    itemId:             'actioniud_sn',
    text:               'Названия статусов',
    iconCls:            'icon-compass',
			 disabled:defaultMenuDisabled,
			 hidden:defaultMenuHidden,
             handler: function(){
			var j=Ext.getCmp('iud_sn_jrnl');
			if(j==null){
				j=iud_sn_Jrnl();
				j.iconCls='icon-compass';
				contentPanel.add(j);
				contentPanel.setActiveTab(j);
			}
			else{
				contentPanel.setActiveTab(j);
			}
             }
});
var actioniud_sp = Ext.create('Ext.Action', {
    itemId:             'actioniud_sp',
    text:               'Статус публикации',
    iconCls:            'icon-image_link',
			 disabled:defaultMenuDisabled,
			 hidden:defaultMenuHidden,
             handler: function(){
			var j=Ext.getCmp('iud_sp_jrnl');
			if(j==null){
				j=iud_sp_Jrnl();
				j.iconCls='icon-image_link';
				contentPanel.add(j);
				contentPanel.setActiveTab(j);
			}
			else{
				contentPanel.setActiveTab(j);
			}
             }
});
var actioniud_stage = Ext.create('Ext.Action', {
    itemId:             'actioniud_stage',
    text:               'Этап производства',
    iconCls:            'icon-chart_pie',
			 disabled:defaultMenuDisabled,
			 hidden:defaultMenuHidden,
             handler: function(){
			var j=Ext.getCmp('iud_stage_jrnl');
			if(j==null){
				j=iud_stage_Jrnl();
				j.iconCls='icon-chart_pie';
				contentPanel.add(j);
				contentPanel.setActiveTab(j);
			}
			else{
				contentPanel.setActiveTab(j);
			}
             }
});
var actioniud_t = Ext.create('Ext.Action', {
    itemId:             'actioniud_t',
    text:               'Города',
    iconCls:            'icon-building',
			 disabled:defaultMenuDisabled,
			 hidden:defaultMenuHidden,
             handler: function(){
			var j=Ext.getCmp('iud_t_jrnl');
			if(j==null){
				j=iud_t_Jrnl();
				j.iconCls='icon-building';
				contentPanel.add(j);
				contentPanel.setActiveTab(j);
			}
			else{
				contentPanel.setActiveTab(j);
			}
             }
});
var actioniud_vt = Ext.create('Ext.Action', {
    itemId:             'actioniud_vt',
    text:               'Тип видео',
    iconCls:            'icon-folder_film',
			 disabled:defaultMenuDisabled,
			 hidden:defaultMenuHidden,
             handler: function(){
			var j=Ext.getCmp('iud_vt_jrnl');
			if(j==null){
				j=iud_vt_Jrnl();
				j.iconCls='icon-folder_film';
				contentPanel.add(j);
				contentPanel.setActiveTab(j);
			}
			else{
				contentPanel.setActiveTab(j);
			}
             }
});
var actioniu_cls = Ext.create('Ext.Action', {
    itemId:             'actioniu_cls',
    text:               'Классы',
    iconCls:            'icon-bell',
			 disabled:defaultMenuDisabled,
			 hidden:defaultMenuHidden,
             handler: function(){
			var j=Ext.getCmp('iu_cls_jrnl');
			if(j==null){
				j=iu_cls_Jrnl();
				j.iconCls='icon-bell';
				contentPanel.add(j);
				contentPanel.setActiveTab(j);
			}
			else{
				contentPanel.setActiveTab(j);
			}
             }
});
var actioniu_cm = Ext.create('Ext.Action', {
    itemId:             'actioniu_cm',
    text:               'Комментарии',
    iconCls:            'icon-comments',
			 disabled:defaultMenuDisabled,
			 hidden:defaultMenuHidden,
             handler: function(){
			var j=Ext.getCmp('iu_cm_jrnl');
			if(j==null){
				j=iu_cm_Jrnl();
				j.iconCls='icon-comments';
				contentPanel.add(j);
				contentPanel.setActiveTab(j);
			}
			else{
				contentPanel.setActiveTab(j);
			}
             }
});
var actioniu_d_doctype = Ext.create('Ext.Action', {
    itemId:             'actioniu_d_doctype',
    text:               'Тип документа',
    iconCls:            'icon-folder_brick',
			 disabled:defaultMenuDisabled,
			 hidden:defaultMenuHidden,
             handler: function(){
			var j=Ext.getCmp('iu_d_doctype_jrnl');
			if(j==null){
				j=iu_d_doctype_Jrnl();
				j.iconCls='icon-folder_brick';
				contentPanel.add(j);
				contentPanel.setActiveTab(j);
			}
			else{
				contentPanel.setActiveTab(j);
			}
             }
});
var actioniu_d_urole = Ext.create('Ext.Action', {
    itemId:             'actioniu_d_urole',
    text:               'Роль сотрудника',
    iconCls:            'icon-chart_org_inverted',
			 disabled:defaultMenuDisabled,
			 hidden:defaultMenuHidden,
             handler: function(){
			var j=Ext.getCmp('iu_d_urole_jrnl');
			if(j==null){
				j=iu_d_urole_Jrnl();
				j.iconCls='icon-chart_org_inverted';
				contentPanel.add(j);
				contentPanel.setActiveTab(j);
			}
			else{
				contentPanel.setActiveTab(j);
			}
             }
});
var actioniu_int = Ext.create('Ext.Action', {
    itemId:             'actioniu_int',
    text:               'Интерфейс',
    iconCls:            'icon-application_side_tree',
			 disabled:defaultMenuDisabled,
			 hidden:defaultMenuHidden,
             handler: function(){
			var j=Ext.getCmp('iu_int_jrnl');
			if(j==null){
				j=iu_int_Jrnl();
				j.iconCls='icon-application_side_tree';
				contentPanel.add(j);
				contentPanel.setActiveTab(j);
			}
			else{
				contentPanel.setActiveTab(j);
			}
             }
});
var actioniu_l = Ext.create('Ext.Action', {
    itemId:             'actioniu_l',
    text:               'Личные сообщения',
    iconCls:            'icon-user_comment',
			 disabled:defaultMenuDisabled,
			 hidden:defaultMenuHidden,
             handler: function(){
			var j=Ext.getCmp('iu_l_jrnl');
			if(j==null){
				j=iu_l_Jrnl();
				j.iconCls='icon-user_comment';
				contentPanel.add(j);
				contentPanel.setActiveTab(j);
			}
			else{
				contentPanel.setActiveTab(j);
			}
             }
});
var actioniu_org = Ext.create('Ext.Action', {
    itemId:             'actioniu_org',
    text:               'Орг.структура',
    iconCls:            'icon-chart_organisation',
			 disabled:defaultMenuDisabled,
			 hidden:defaultMenuHidden,
             handler: function(){
			var j=Ext.getCmp('iu_org_jrnl');
			if(j==null){
				j=iu_org_Jrnl();
				j.iconCls='icon-chart_organisation';
				contentPanel.add(j);
				contentPanel.setActiveTab(j);
			}
			else{
				contentPanel.setActiveTab(j);
			}
             }
});
var actioniu_plog = Ext.create('Ext.Action', {
    itemId:             'actioniu_plog',
    text:               'Логирование событий',
    iconCls:            'icon-report_disk',
			 disabled:defaultMenuDisabled,
			 hidden:defaultMenuHidden,
             handler: function(){
			var j=Ext.getCmp('iu_plog_jrnl');
			if(j==null){
				j=iu_plog_Jrnl();
				j.iconCls='icon-report_disk';
				contentPanel.add(j);
				contentPanel.setActiveTab(j);
			}
			else{
				contentPanel.setActiveTab(j);
			}
             }
});
var actioniu_rcfg = Ext.create('Ext.Action', {
    itemId:             'actioniu_rcfg',
    text:               'Настройка роли',
    iconCls:            'icon-folder_user',
			 disabled:defaultMenuDisabled,
			 hidden:defaultMenuHidden,
             handler: function(){
			var j=Ext.getCmp('iu_rcfg_jrnl');
			if(j==null){
				j=iu_rcfg_Jrnl();
				j.iconCls='icon-folder_user';
				contentPanel.add(j);
				contentPanel.setActiveTab(j);
			}
			else{
				contentPanel.setActiveTab(j);
			}
             }
});
var actioniu_reg = Ext.create('Ext.Action', {
    itemId:             'actioniu_reg',
    text:               'Регламентирующая документация',
    iconCls:            'icon-folder_lightbulb',
			 disabled:defaultMenuDisabled,
			 hidden:defaultMenuHidden,
             handler: function(){
			var j=Ext.getCmp('iu_reg_jrnl');
			if(j==null){
				j=iu_reg_Jrnl();
				j.iconCls='icon-folder_lightbulb';
				contentPanel.add(j);
				contentPanel.setActiveTab(j);
			}
			else{
				contentPanel.setActiveTab(j);
			}
             }
});
var actioniu_s = Ext.create('Ext.Action', {
    itemId:             'actioniu_s',
    text:               'Подэтап процесса',
    iconCls:            'icon-chart_curve',
			 disabled:defaultMenuDisabled,
			 hidden:defaultMenuHidden,
             handler: function(){
			var j=Ext.getCmp('iu_s_jrnl');
			if(j==null){
				j=iu_s_Jrnl();
				j.iconCls='icon-chart_curve';
				contentPanel.add(j);
				contentPanel.setActiveTab(j);
			}
			else{
				contentPanel.setActiveTab(j);
			}
             }
});
var actioniu_subs = Ext.create('Ext.Action', {
    itemId:             'actioniu_subs',
    text:               'Подписка на события',
    iconCls:            'icon-mail',
			 disabled:defaultMenuDisabled,
			 hidden:defaultMenuHidden,
             handler: function(){
			var j=Ext.getCmp('iu_subs_jrnl');
			if(j==null){
				j=iu_subs_Jrnl();
				j.iconCls='icon-mail';
				contentPanel.add(j);
				contentPanel.setActiveTab(j);
			}
			else{
				contentPanel.setActiveTab(j);
			}
             }
});
var actioniu_t = Ext.create('Ext.Action', {
    itemId:             'actioniu_t',
    text:               'Задачи',
    iconCls:            'icon-lightning',
			 disabled:defaultMenuDisabled,
			 hidden:defaultMenuHidden,
             handler: function(){
			var j=Ext.getCmp('iu_t_jrnl');
			if(j==null){
				j=iu_t_Jrnl();
				j.iconCls='icon-lightning';
				contentPanel.add(j);
				contentPanel.setActiveTab(j);
			}
			else{
				contentPanel.setActiveTab(j);
			}
             }
});
var actioniu_tm = Ext.create('Ext.Action', {
    itemId:             'actioniu_tm',
    text:               'Учителя и Методисты',
    iconCls:            'icon-group',
			 disabled:defaultMenuDisabled,
			 hidden:defaultMenuHidden,
             handler: function(){
			var j=Ext.getCmp('iu_tm_jrnl');
			if(j==null){
				j=iu_tm_Jrnl();
				j.iconCls='icon-group';
				contentPanel.add(j);
				contentPanel.setActiveTab(j);
			}
			else{
				contentPanel.setActiveTab(j);
			}
             }
});
var actioniu_u = Ext.create('Ext.Action', {
    itemId:             'actioniu_u',
    text:               'Сотрудники',
    iconCls:            'icon-user',
			 disabled:defaultMenuDisabled,
			 hidden:defaultMenuHidden,
             handler: function(){
			var j=Ext.getCmp('iu_u_jrnl');
			if(j==null){
				j=iu_u_Jrnl();
				j.iconCls='icon-user';
				contentPanel.add(j);
				contentPanel.setActiveTab(j);
			}
			else{
				contentPanel.setActiveTab(j);
			}
             }
});
var actioniu_urok = Ext.create('Ext.Action', {
    itemId:             'actioniu_urok',
    text:               'Урок',
    iconCls:            'icon-film',
			 disabled:defaultMenuDisabled,
			 hidden:defaultMenuHidden,
             handler: function(){
			var j=Ext.getCmp('iu_urok_jrnl');
			if(j==null){
				j=iu_urok_Jrnl();
				j.iconCls='icon-film';
				contentPanel.add(j);
				contentPanel.setActiveTab(j);
			}
			else{
				contentPanel.setActiveTab(j);
			}
             }
});
var actioniu_us = Ext.create('Ext.Action', {
    itemId:             'actioniu_us',
    text:               'Состояние урока',
    iconCls:            'icon-brick',
			 disabled:defaultMenuDisabled,
			 hidden:defaultMenuHidden,
             handler: function(){
			var j=Ext.getCmp('iu_us_jrnl');
			if(j==null){
				j=iu_us_Jrnl();
				j.iconCls='icon-brick';
				contentPanel.add(j);
				contentPanel.setActiveTab(j);
			}
			else{
				contentPanel.setActiveTab(j);
			}
             }
});
var actioniu_cls = Ext.create('Ext.Action', {
        itemId:  'actioniu_cls',
        text:   'Классы',
        iconCls:  'icon-bell',
			 disabled:defaultMenuDisabled,
			 hidden:defaultMenuHidden,
			handler: function(){
			var j=Ext.getCmp('iu_cls');
			if(j==null){
				j=eval('iu_cls_Panel_'+OTEditMode('iu_cls')+'(\'{BB4D2AFB-2BBE-4C33-BBAC-B3DEDAE64F39}\', true)');
        j.iconCls= 'icon-bell';
				contentPanel.add(j);
				contentPanel.setActiveTab(j);
			}
			else{
				contentPanel.setActiveTab(j);
			}
        }
    });
var actioniu_d_doctype = Ext.create('Ext.Action', {
        itemId:  'actioniu_d_doctype',
        text:   'Тип документа',
        iconCls:  'icon-folder_brick',
			 disabled:defaultMenuDisabled,
			 hidden:defaultMenuHidden,
			handler: function(){
			var j=Ext.getCmp('iu_d_doctype');
			if(j==null){
				j=eval('iu_d_doctype_Panel_'+OTEditMode('iu_d_doctype')+'(\'{C4C26A16-BC57-40D4-AAC4-CFA3BC35FBBD}\', true)');
        j.iconCls= 'icon-folder_brick';
				contentPanel.add(j);
				contentPanel.setActiveTab(j);
			}
			else{
				contentPanel.setActiveTab(j);
			}
        }
    });
var actioniu_d_urole = Ext.create('Ext.Action', {
        itemId:  'actioniu_d_urole',
        text:   'Роль сотрудника',
        iconCls:  'icon-chart_org_inverted',
			 disabled:defaultMenuDisabled,
			 hidden:defaultMenuHidden,
			handler: function(){
			var j=Ext.getCmp('iu_d_urole');
			if(j==null){
				j=eval('iu_d_urole_Panel_'+OTEditMode('iu_d_urole')+'(\'{B15AEDD4-A38B-11E3-A536-E8039A0069B7}\', true)');
        j.iconCls= 'icon-chart_org_inverted';
				contentPanel.add(j);
				contentPanel.setActiveTab(j);
			}
			else{
				contentPanel.setActiveTab(j);
			}
        }
    });
var actioniu_int = Ext.create('Ext.Action', {
        itemId:  'actioniu_int',
        text:   'Интерфейс',
        iconCls:  'icon-application_side_tree',
			 disabled:defaultMenuDisabled,
			 hidden:defaultMenuHidden,
			handler: function(){
			var j=Ext.getCmp('iu_int');
			if(j==null){
				j=eval('iu_int_Panel_'+OTEditMode('iu_int')+'(\'{2BADF02C-C1D7-481C-BC1B-5CA312777EDF}\', true)');
        j.iconCls= 'icon-application_side_tree';
				contentPanel.add(j);
				contentPanel.setActiveTab(j);
			}
			else{
				contentPanel.setActiveTab(j);
			}
        }
    });
var actioniu_org = Ext.create('Ext.Action', {
        itemId:  'actioniu_org',
        text:   'Орг.структура',
        iconCls:  'icon-chart_organisation',
			 disabled:defaultMenuDisabled,
			 hidden:defaultMenuHidden,
			handler: function(){
			var j=Ext.getCmp('iu_org');
			if(j==null){
				j=eval('iu_org_Panel_'+OTEditMode('iu_org')+'(\'{D028CBAD-9677-11E3-BE7E-E8039A0069B7}\', true)');
        j.iconCls= 'icon-chart_organisation';
				contentPanel.add(j);
				contentPanel.setActiveTab(j);
			}
			else{
				contentPanel.setActiveTab(j);
			}
        }
    });
var actioniu_plog = Ext.create('Ext.Action', {
        itemId:  'actioniu_plog',
        text:   'Логирование событий',
        iconCls:  'icon-report_disk',
			 disabled:defaultMenuDisabled,
			 hidden:defaultMenuHidden,
			handler: function(){
			var j=Ext.getCmp('iu_plog');
			if(j==null){
				j=eval('iu_plog_Panel_'+OTEditMode('iu_plog')+'(\'{A868F572-F4D7-4D70-B1E3-CF3792468349}\', true)');
        j.iconCls= 'icon-report_disk';
				contentPanel.add(j);
				contentPanel.setActiveTab(j);
			}
			else{
				contentPanel.setActiveTab(j);
			}
        }
    });
var actioniu_reg = Ext.create('Ext.Action', {
        itemId:  'actioniu_reg',
        text:   'Регламентирующая документация',
        iconCls:  'icon-folder_lightbulb',
			 disabled:defaultMenuDisabled,
			 hidden:defaultMenuHidden,
			handler: function(){
			var j=Ext.getCmp('iu_reg');
			if(j==null){
				j=eval('iu_reg_Panel_'+OTEditMode('iu_reg')+'(\'{57D415B4-B40F-4DDB-9620-2423839BDD7E}\', true)');
        j.iconCls= 'icon-folder_lightbulb';
				contentPanel.add(j);
				contentPanel.setActiveTab(j);
			}
			else{
				contentPanel.setActiveTab(j);
			}
        }
    });
var actioniud_adtype = Ext.create('Ext.Action', {
        itemId:  'actioniud_adtype',
        text:   'Тип документа к акту',
        iconCls:  'icon-page_white_picture',
			 disabled:defaultMenuDisabled,
			 hidden:defaultMenuHidden,
			handler: function(){
			var j=Ext.getCmp('iud_adtype');
			if(j==null){
				j=eval('iud_adtype_Panel_'+OTEditMode('iud_adtype')+'(\'{B596B8F2-92C6-4D84-8D45-A9830071B858}\', true)');
        j.iconCls= 'icon-page_white_picture';
				contentPanel.add(j);
				contentPanel.setActiveTab(j);
			}
			else{
				contentPanel.setActiveTab(j);
			}
        }
    });
var actioniud_c = Ext.create('Ext.Action', {
        itemId:  'actioniud_c',
        text:   'Тип курса',
        iconCls:  'icon-time',
			 disabled:defaultMenuDisabled,
			 hidden:defaultMenuHidden,
			handler: function(){
			var j=Ext.getCmp('iud_c');
			if(j==null){
				j=eval('iud_c_Panel_'+OTEditMode('iud_c')+'(\'{78A029FC-7192-4518-AEA7-AF3EEEE3B3A9}\', true)');
        j.iconCls= 'icon-time';
				contentPanel.add(j);
				contentPanel.setActiveTab(j);
			}
			else{
				contentPanel.setActiveTab(j);
			}
        }
    });
var actioniud_fst = Ext.create('Ext.Action', {
        itemId:  'actioniud_fst',
        text:   'Тип хранения файла',
        iconCls:  'icon-bullet_database',
			 disabled:defaultMenuDisabled,
			 hidden:defaultMenuHidden,
			handler: function(){
			var j=Ext.getCmp('iud_fst');
			if(j==null){
				j=eval('iud_fst_Panel_'+OTEditMode('iud_fst')+'(\'{E1A23848-9598-43C4-B64F-497C04CC3A2B}\', true)');
        j.iconCls= 'icon-bullet_database';
				contentPanel.add(j);
				contentPanel.setActiveTab(j);
			}
			else{
				contentPanel.setActiveTab(j);
			}
        }
    });
var actioniud_ft = Ext.create('Ext.Action', {
        itemId:  'actioniud_ft',
        text:   'Тип файла',
        iconCls:  'icon-script',
			 disabled:defaultMenuDisabled,
			 hidden:defaultMenuHidden,
			handler: function(){
			var j=Ext.getCmp('iud_ft');
			if(j==null){
				j=eval('iud_ft_Panel_'+OTEditMode('iud_ft')+'(\'{2B84E95F-8199-4443-9E17-A1678B337D48}\', true)');
        j.iconCls= 'icon-script';
				contentPanel.add(j);
				contentPanel.setActiveTab(j);
			}
			else{
				contentPanel.setActiveTab(j);
			}
        }
    });
var actioniud_mt = Ext.create('Ext.Action', {
        itemId:  'actioniud_mt',
        text:   'Тип сообщения',
        iconCls:  'icon-note_edit',
			 disabled:defaultMenuDisabled,
			 hidden:defaultMenuHidden,
			handler: function(){
			var j=Ext.getCmp('iud_mt');
			if(j==null){
				j=eval('iud_mt_Panel_'+OTEditMode('iud_mt')+'(\'{D048BE74-A9D2-48A1-AB11-5514E245C3E5}\', true)');
        j.iconCls= 'icon-note_edit';
				contentPanel.add(j);
				contentPanel.setActiveTab(j);
			}
			else{
				contentPanel.setActiveTab(j);
			}
        }
    });
var actioniud_p = Ext.create('Ext.Action', {
        itemId:  'actioniud_p',
        text:   'Предметы',
        iconCls:  'icon-book_tabs',
			 disabled:defaultMenuDisabled,
			 hidden:defaultMenuHidden,
			handler: function(){
			var j=Ext.getCmp('iud_p');
			if(j==null){
				j=eval('iud_p_Panel_'+OTEditMode('iud_p')+'(\'{8CE681EB-2F27-469E-A4EE-598AE72B358D}\', true)');
        j.iconCls= 'icon-book_tabs';
				contentPanel.add(j);
				contentPanel.setActiveTab(j);
			}
			else{
				contentPanel.setActiveTab(j);
			}
        }
    });
var actioniud_process = Ext.create('Ext.Action', {
        itemId:  'actioniud_process',
        text:   'Тип производственного процесса',
        iconCls:  'icon-chart_bar',
			 disabled:defaultMenuDisabled,
			 hidden:defaultMenuHidden,
			handler: function(){
			var j=Ext.getCmp('iud_process');
			if(j==null){
				j=eval('iud_process_Panel_'+OTEditMode('iud_process')+'(\'{257CBF13-DA4A-42EE-AC1F-B1961F7220A3}\', true)');
        j.iconCls= 'icon-chart_bar';
				contentPanel.add(j);
				contentPanel.setActiveTab(j);
			}
			else{
				contentPanel.setActiveTab(j);
			}
        }
    });
var actioniud_rt = Ext.create('Ext.Action', {
        itemId:  'actioniud_rt',
        text:   'Тип ссылки',
        iconCls:  'icon-folder_image',
			 disabled:defaultMenuDisabled,
			 hidden:defaultMenuHidden,
			handler: function(){
			var j=Ext.getCmp('iud_rt');
			if(j==null){
				j=eval('iud_rt_Panel_'+OTEditMode('iud_rt')+'(\'{70876BC0-CDDC-4093-826E-79CFA790C680}\', true)');
        j.iconCls= 'icon-folder_image';
				contentPanel.add(j);
				contentPanel.setActiveTab(j);
			}
			else{
				contentPanel.setActiveTab(j);
			}
        }
    });
var actioniud_sn = Ext.create('Ext.Action', {
        itemId:  'actioniud_sn',
        text:   'Названия статусов',
        iconCls:  'icon-compass',
			 disabled:defaultMenuDisabled,
			 hidden:defaultMenuHidden,
			handler: function(){
			var j=Ext.getCmp('iud_sn');
			if(j==null){
				j=eval('iud_sn_Panel_'+OTEditMode('iud_sn')+'(\'{8AD3B0DD-DABB-11E3-87C6-E8039A0069B7}\', true)');
        j.iconCls= 'icon-compass';
				contentPanel.add(j);
				contentPanel.setActiveTab(j);
			}
			else{
				contentPanel.setActiveTab(j);
			}
        }
    });
var actioniud_sp = Ext.create('Ext.Action', {
        itemId:  'actioniud_sp',
        text:   'Статус публикации',
        iconCls:  'icon-image_link',
			 disabled:defaultMenuDisabled,
			 hidden:defaultMenuHidden,
			handler: function(){
			var j=Ext.getCmp('iud_sp');
			if(j==null){
				j=eval('iud_sp_Panel_'+OTEditMode('iud_sp')+'(\'{5B6C4132-7BB4-4B82-908B-DA0D71A79BD5}\', true)');
        j.iconCls= 'icon-image_link';
				contentPanel.add(j);
				contentPanel.setActiveTab(j);
			}
			else{
				contentPanel.setActiveTab(j);
			}
        }
    });
var actioniud_stage = Ext.create('Ext.Action', {
        itemId:  'actioniud_stage',
        text:   'Этап производства',
        iconCls:  'icon-chart_pie',
			 disabled:defaultMenuDisabled,
			 hidden:defaultMenuHidden,
			handler: function(){
			var j=Ext.getCmp('iud_stage');
			if(j==null){
				j=eval('iud_stage_Panel_'+OTEditMode('iud_stage')+'(\'{7148F1B4-A388-11E3-A536-E8039A0069B7}\', true)');
        j.iconCls= 'icon-chart_pie';
				contentPanel.add(j);
				contentPanel.setActiveTab(j);
			}
			else{
				contentPanel.setActiveTab(j);
			}
        }
    });
var actioniud_t = Ext.create('Ext.Action', {
        itemId:  'actioniud_t',
        text:   'Города',
        iconCls:  'icon-building',
			 disabled:defaultMenuDisabled,
			 hidden:defaultMenuHidden,
			handler: function(){
			var j=Ext.getCmp('iud_t');
			if(j==null){
				j=eval('iud_t_Panel_'+OTEditMode('iud_t')+'(\'{8A39C255-966A-11E3-BE7E-E8039A0069B7}\', true)');
        j.iconCls= 'icon-building';
				contentPanel.add(j);
				contentPanel.setActiveTab(j);
			}
			else{
				contentPanel.setActiveTab(j);
			}
        }
    });
var actioniud_vt = Ext.create('Ext.Action', {
        itemId:  'actioniud_vt',
        text:   'Тип видео',
        iconCls:  'icon-folder_film',
			 disabled:defaultMenuDisabled,
			 hidden:defaultMenuHidden,
			handler: function(){
			var j=Ext.getCmp('iud_vt');
			if(j==null){
				j=eval('iud_vt_Panel_'+OTEditMode('iud_vt')+'(\'{BE18F8B1-B96F-409D-B3EF-5F9CB8EB005B}\', true)');
        j.iconCls= 'icon-folder_film';
				contentPanel.add(j);
				contentPanel.setActiveTab(j);
			}
			else{
				contentPanel.setActiveTab(j);
			}
        }
    });
var actionMTZ2JOB = Ext.create('Ext.Action', {
        itemId:  'actionMTZ2JOB',
        text:   'Отложенные обработки',
        iconCls:  'icon-brick',
			 disabled:defaultMenuDisabled,
			 hidden:defaultMenuHidden,
			handler: function(){
			var j=Ext.getCmp('mtz2job');
			if(j==null){
				j=eval('MTZ2JOB_Panel_'+OTEditMode('MTZ2JOB')+'(\'{8359F867-90E9-4C4F-83BD-0DFC8671B86E}\', true)');
        j.iconCls=  'icon-brick';
				contentPanel.add(j);
				contentPanel.setActiveTab(j);
			}
			else{
				contentPanel.setActiveTab(j);
			}
        }
    });
var actionMTZMetaModel = Ext.create('Ext.Action', {
        itemId:  'actionMTZMetaModel',
        text:   'Спец.: Метамодель системы',
        iconCls:  'icon-brick',
			 disabled:defaultMenuDisabled,
			 hidden:defaultMenuHidden,
			handler: function(){
			var j=Ext.getCmp('mtzmetamodel');
			if(j==null){
				j=eval('MTZMetaModel_Panel_'+OTEditMode('MTZMetaModel')+'(\'{88DEEBA4-69B1-454A-992A-FAE3CEBFBCA1}\', true)');
        j.iconCls=  'icon-brick';
				contentPanel.add(j);
				contentPanel.setActiveTab(j);
			}
			else{
				contentPanel.setActiveTab(j);
			}
        }
    });
var actionMTZSystem = Ext.create('Ext.Action', {
        itemId:  'actionMTZSystem',
        text:   'Спец.: Системные данные',
        iconCls:  'icon-brick',
			 disabled:defaultMenuDisabled,
			 hidden:defaultMenuHidden,
			handler: function(){
			var j=Ext.getCmp('mtzsystem');
			if(j==null){
				j=eval('MTZSystem_Panel_'+OTEditMode('MTZSystem')+'(\'{C5A874A1-1D01-43F5-AA2B-5431031FD45C}\', true)');
        j.iconCls=  'icon-brick';
				contentPanel.add(j);
				contentPanel.setActiveTab(j);
			}
			else{
				contentPanel.setActiveTab(j);
			}
        }
    });
var actionMTZUsers = Ext.create('Ext.Action', {
        itemId:  'actionMTZUsers',
        text:   'Справочник: пользователи',
        iconCls:  'icon-brick',
			 disabled:defaultMenuDisabled,
			 hidden:defaultMenuHidden,
			handler: function(){
			var j=Ext.getCmp('mtzusers');
			if(j==null){
				j=eval('MTZUsers_Panel_'+OTEditMode('MTZUsers')+'(\'{E0FB5E85-050E-4322-8505-9E0CA132E901}\', true)');
        j.iconCls=  'icon-brick';
				contentPanel.add(j);
				contentPanel.setActiveTab(j);
			}
			else{
				contentPanel.setActiveTab(j);
			}
        }
    });
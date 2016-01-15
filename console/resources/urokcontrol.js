function UrokControlTab(objectID){
var cpanel = new Ext.form.Panel({
	layout:'vbox',
	border:false,
	title:'Управление процессом',
	
	items:[
	{ 
		xtype:'panel',
		id:'myUrokControl',
        title:'Информация по уроку',
		border:false,
		autoScroll:true,
		autoHeight:true,
		collapsible:true,
		layout:'absolute',
		height:255,
		minWidth:1800,
		width:1900,
		
		items:[

			{ 
				xtype:'fieldset', 
		
				x: 0, 
				layout:'absolute', 
				id:'iu_urok_def_0',
				title:      'Информация',
				defaultType:  'textfield',
				
				items: 
					[
						
							{
									minWidth: 365,
									width: 365,
									maxWidth: 365,
									x: 5, 
									y: 5, 
									labelWidth:90,
									
									xtype:  'displayfield',
									name:   'subject_grid',
									itemId:   'subject_grid',
									fieldLabel:  'Предмет'
							}
							,
							{
									minWidth: 365,
									width: 365,
									maxWidth: 365,
									x: 500, 
									y: 5, 
									labelWidth:90,
									
									xtype:  'displayfield',

									name:   'theclassnum_grid',
									itemId:   'theclassnum_grid',
									fieldLabel:  'Класс'
							}
							,
							{
									minWidth: 720,
									x: 5, 
									y: 35, 
									labelWidth:90,
									
									xtype:  'displayfield',
									value:  '',
									name:   'classtheme',
									itemId:   'classtheme',
									fieldLabel:  'Тема урока'
							}
							,
							{
									minWidth: 365,
									width: 365,
									maxWidth: 365,
									x: 500, 
									y: 35, 
									labelWidth:90,
									
									xtype:  'displayfield',
									name:   'rtheme',
									itemId:   'rtheme',
									fieldLabel:  'Тема раздела'
							}
							
						
							
						

					 ], 
				height: 105,
				width:860
			} // group
			]
			}
			);
			return cpanel;
}
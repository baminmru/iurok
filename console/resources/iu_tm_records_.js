Ext.require([
'Ext.form.*'
]);

function DefineInterface_iu_tm_records_(id,mystore){

var p1 ; 
var p1_saved=false;
var p1_valid=false;
     function onSave(close_after_save,callaftersave){
        var active = p1.activeRecord,
        form = p1.getForm();
        if (!active) {
            return;
        }
        if (form.isValid()) {
            form.updateRecord(active);
            // combobox patch
            var form_values = form.getValues(); var field_name = '';  for(field_name in form_values){active.set(field_name, form_values[field_name]);}
        	StatusDB('Сохранение данных');
			form.submit({
				url: rootURL+'index.php/c_iu_tm_records/setRow',
                method:  'POST',
				 params: { 
                    instanceid: p1.instanceid
                    ,iu_tm_recordsid: active.get('iu_tm_recordsid')
                },
				 success: function(response){
               /* var text = response.responseText;
                var res =Ext.decode(text);
	            if(res.success==false){
	       	        Ext.MessageBox.show({
	       		        title:  'Ошибка',
	       		        msg:    res.msg,
	       		        buttons: Ext.MessageBox.OK,
	       		        icon:   Ext.MessageBox.ERROR
	       	            });
        		        StatusErr('Ошибка. '+res.msg);
                        p1_saved=false;
	            }else{
                    if(active.get('iu_tm_recordsid')==''){
               			active.set('iu_tm_recordsid',res.data['iu_tm_recordsid']);
                    }
        		    Ext.MessageBox.show({
                        title:  'Подтверждение',
                        msg:    'Изменения сохранены',
                        buttons: Ext.MessageBox.OK,
                        icon:   Ext.MessageBox.INFO
        		    }); */
        		    StatusReady('Изменения сохранены');
                    p1_saved=true;
                  /* if(selection){
                     Ext.Ajax.request({
                        url:        rootURL+'index.php/c_v_autoiu_tm_records/getRows?&filter=[{"property":"iu_tm_recordsid","value":"'+ active.get('iu_tm_recordsid') + '"}]',
                        method:     'GET',
                        success: function(response){
                            var data = Ext.decode(response.responseText);
                            selection.set(data.rows[0]);
                            selection.commit();
                        }
                     });
                   } 
				   */
                   // if (close_after_save) { if (typeof(callaftersave) == 'function') callaftersave();  p1.up('window').close(); }
                }
			}
			
			);
            /*Ext.Ajax.request({
                url: rootURL+'index.php/c_iu_tm_records/setRow',
                method:  'POST',
                params: { 
                    instanceid: p1.instanceid
                    ,iu_tm_recordsid: active.get('iu_tm_recordsid')
                    ,passport: active.get('passport') 
                    ,inn: active.get('inn') 
                    ,snils: active.get('snils') 
                    ,bankinfo: active.get('bankinfo') 
                    ,scanpassport: active.get('scanpassport') 
                    ,scaninn: active.get('scaninn') 
                    ,scansnils: active.get('scansnils') 
                    ,info: active.get('info') 
                    ,tmfile: active.get('tmfile') 
                    ,thecomment: active.get('thecomment') 
                }
                , success: function(response){
                var text = response.responseText;
                var res =Ext.decode(text);
	            if(res.success==false){
	       	        Ext.MessageBox.show({
	       		        title:  'Ошибка',
	       		        msg:    res.msg,
	       		        buttons: Ext.MessageBox.OK,
	       		        icon:   Ext.MessageBox.ERROR
	       	            });
        		        StatusErr('Ошибка. '+res.msg);
                        p1_saved=false;
	            }else{
                    if(active.get('iu_tm_recordsid')==''){
               			active.set('iu_tm_recordsid',res.data['iu_tm_recordsid']);
                    }
        		   Ext.MessageBox.show({
                        title:  'Подтверждение',
                        msg:    'Изменения сохранены',
                        buttons: Ext.MessageBox.OK,
                        icon:   Ext.MessageBox.INFO
        		    }); 
        		    StatusReady('Изменения сохранены');
                    p1_saved=true;
                   if(selection){
                     Ext.Ajax.request({
                        url:        rootURL+'index.php/c_v_autoiu_tm_records/getRows?&filter=[{"property":"iu_tm_recordsid","value":"'+ active.get('iu_tm_recordsid') + '"}]',
                        method:     'GET',
                        success: function(response){
                            var data = Ext.decode(response.responseText);
                            selection.set(data.rows[0]);
                            selection.commit();
                        }
                     });
                   }
                    if (close_after_save) { if (typeof(callaftersave) == 'function') callaftersave();  p1.up('window').close(); }
                }
              }
            });
			*/
        }else{
        		Ext.MessageBox.show({
                title:  'Ошибка',
                msg:    'Не все обязательные поля заполнены!',
                buttons: Ext.MessageBox.OK,
                icon:   Ext.MessageBox.ERROR
        		});
        }
    };
     function onSave1(aftersave){onSave(false,aftersave);}
     function onSave2(aftersave){onSave(true,aftersave);}
    function onReset(){
        p1.setActiveRecord(null,null);
    }
p1=new Ext.form.Panel(
{
            itemId: id+'',
            autoScroll:true,
            border:0, bodyPadding: 5,
            activeRecord: null,
            selection: null,
            defaultType:  'textfield',
            doSave: onSave2,
			stateful: stateFulSystem,
			stateId: 'iu_tm_records',
            canClose: function(){
            	if( p1_valid){
            		if(! p1.getForm().isValid()  ) return true;
            		return true ;
            	}else{
            		if(! p1.getForm().isValid()  ) return false;
            		if(p1_saved) return  true;
            		return false;
            	}
            },
        id:'iu_tm_records',
        fieldDefaults: {
         labelAlign:  'right',
         labelWidth: 110
        },
        items: [
        { 
        xtype:'fieldset', 
        anchor: '100%',
        x: 0, 
        layout:'absolute', 
        id:'iu_tm_records_0',
        title:      'Реквизиты',
        defaultType:  'textfield',
            items: [
				{
				minWidth: 365,
				width: 365,
				maxWidth: 365,
				x: 5, 
				y: 5, 
				labelWidth:140,

				xtype:  'textfield',
				value:  '',
				name:   'passport',
				itemId:   'passport',
				fieldLabel:  'Паспортные данные',
				allowBlank:true
				}
				,
				{
					minWidth: 355,
					width: 355,
					maxWidth: 355,
					x: 375, 
					y: 5, 
					labelWidth:140,

					xtype:  'textfield',
					value:  '',
					name:   'inn',
					itemId:   'inn',
					fieldLabel:  'ИНН',
					allowBlank:true
				}
				,
				{
						minWidth: 365,
						width: 365,
						maxWidth: 365,
						x: 5, 
						y: 35, 
						labelWidth:140,

						xtype:  'textfield',
						value:  '',
						name:   'snils',
						itemId:   'snils',
						fieldLabel:  'СНИЛС',
						allowBlank:true
				}
,
{
        minWidth: 355,
        width: 355,
        maxWidth: 355,
        x: 375, 
        y: 35, 
labelWidth:140,

xtype:  'textfield',
value:  '',
name:   'bankinfo',
itemId:   'bankinfo',
fieldLabel:  'Банковские реквизиты',
allowBlank:true
}
			], 
			height: 100
        } // group
,
        { 
			xtype:'fieldset', 
			anchor: '100%',
			x: 0, 
			layout:'absolute', 
			id:'iu_tm_records_1',
			title:      'Сканы документов',
			defaultType:  'textfield',
            items: [
				{
					xtype:'fieldset',
					title:'Паспорт',
					width:210,
					height:220,
					x:20,
					y:0,
					border:true,
					layout:'absolute',
					items:[
				
						{
							
							width: 150,
							height:150,
							x: 0, 
							y: 0, 
							xtype:  'image',
							itemId:   'scanpassport_img',
							src:'',
							listeners:{ beforerender:function( fld, eOpts )
								{ 
								var s='';
								 if(this.up('form' ).activeRecord.get('scanpassport')+''==''){
									s='/resources/icons/nophoto.jpg';
								}else{
									s="/files/iu_files/"+fld.up('form' ).activeRecord.get('scanpassport');
								};
								
								fld.setSrc(s);
								}  
							 }
						},		
						{
								//minWidth: 115,
								//width: 115,
								//maxWidth: 115,
								x: 0, 
								y: 155, 
								xtype:  'button',
								itemId:   'scanpassport_btn',
								iconCls:'icon-iu_preview',
								text:'Просмотр',//"Открыть",
								allowBlank:true,
								 handler: function() {
								 if(this.up('form' ).activeRecord.get('scanpassport')+''==''){
									return;
								 };
								var s="/files/iu_files/"+this.up('form' ).activeRecord.get('scanpassport');
								var params = "menubar=no,location=yes,resizable=yes,scrollbars=yes,status=yes"
								window.open(s,'_blank',params);
							}
							
					},
					{
							
							width: 100,
							x: 105, 
							y: 155, 
							xtype:  'filefield',
							name:   'scanpassport_fu',
							itemId:   'scanpassport_fu',
							buttonConfig: {
								iconCls:'icon-iu_upload'
							},
							buttonOnly:true,
							buttonText:'Выбрать', //"Загрузить",
							allowBlank:true
					}
					,{
					xtype:  'hidden',
					name:   'scanpassport',
					itemId:   'scanpassport',
					},{
					xtype:  'hidden',
					name:   'scanpassport_ext',
					itemId:   'scanpassport_ext',
					}
				]
			},
				{
					xtype:'fieldset',
					title:'ИНН',
					width:210,
					height:220,
					x:295,
					y:0,
					border:true,
					layout:'absolute',
					items:[
						{
							
							width: 150,
							height:150,
							x: 0, 
							y: 0, 
							xtype:  'image',
							itemId:   'scaninn_img',
							htmlEncode:true,
							src:'',
							listeners:{ beforerender:function( fld, eOpts )
								{ 
								var s='';
								 if(this.up('form' ).activeRecord.get('scaninn')+''==''){
									s='/resources/icons/nophoto.jpg';
								}else{
								 s="/files/iu_files/"+fld.up('form' ).activeRecord.get('scaninn');
								 }
								fld.setSrc(s);
								}  
							 }
						},	
						{
								//minWidth: 115,
								//width: 115,
								//maxWidth: 115,
								x: 0, 
								y: 155, 
								xtype:  'button',
								itemId:   'scaninn_btm',
								iconCls:'icon-iu_preview',
								text:'Просмотр',//"Открыть",
								allowBlank:true,
								 handler: function() {
									  if(this.up('form' ).activeRecord.get('scaninn')+''==''){
										return;
									  };
									var s="/files/iu_files/"+this.up('form' ).activeRecord.get('scaninn');
									var params = "menubar=no,location=yes,resizable=yes,scrollbars=yes,status=yes"
									window.open(s,'_blank',params);
								}
								
						},			
						{
								//fieldLabel:  'ИНН',
								//labelWidth:110,
								//minWidth: 115,
								//width: 115,
								//maxWidth: 115,
								width: 100,
								x: 105, 
								y: 155, 
								xtype:  'filefield',
								name:   'scaninn_fu',
								itemId:   'scaninn_fu',
								buttonConfig: {
									iconCls:'icon-iu_upload'
								},
								buttonOnly:true,
								buttonText:'Выбрать', //"Загрузить",
								allowBlank:true
						},{
						xtype:  'hidden',
						name:   'scaninn',
						itemId:   'scaninn',
						},{
						xtype:  'hidden',
						name:   'scaninn_ext',
						itemId:   'scaninn_ext',
						}
					]
				},
				{
					xtype:'fieldset',
					title:'СНИЛС',
					width:210,
					height:220,
					x:540,
					y:0,
					border:true,
					layout:'absolute',
					items:[
						{
					
							width: 150,
							height:150,
							x: 0, 
							y: 0, 
							xtype:  'image',
							itemId:   'scansnils_img',
							htmlEncode:true,
								src:'',
							listeners:{ beforerender:function( fld, eOpts )
								{ 
								var s='';
								 if(this.up('form' ).activeRecord.get('scansnils')+''==''){
									s='/resources/icons/nophoto.jpg';
								}else{
									s="/files/iu_files/"+fld.up('form' ).activeRecord.get('scansnils');
								}
								fld.setSrc(s);
								}  
							 }
						},		
						{
							//minWidth: 115,
							//width: 115,
							//maxWidth: 115,
							x: 0, 
							y: 155, 
							xtype:  'button',
							itemId:   'scansnils_btm',
							text:'Просмотр',// "Открыть",
							iconCls:'icon-iu_preview',
							allowBlank:true,
							 handler: function() {
							   if(this.up('form' ).activeRecord.get('scansnils')+''==''){
										return;
									  };
								var s="/files/iu_files/"+this.up('form' ).activeRecord.get('scansnils');
								var params = "menubar=no,location=yes,resizable=yes,scrollbars=yes,status=yes"
								window.open(s,'_blank',params);
							}
								
						},			
						{
							
							//width: 115,
							//maxWidth: 115,
							width: 100,
							x: 105, 
							y: 155, 
							xtype:  'filefield',
							name:   'scansnils_fu',
							itemId:   'scansnils_fu',
							buttonConfig: {
								iconCls:'icon-iu_upload'
							},
							buttonOnly:true,
							buttonText:"Выбрать",
							allowBlank:true
						},{
						xtype:  'hidden',
						name:   'scansnils',
						itemId:   'scansnils',
						},{
						xtype:  'hidden',
						name:   'scansnils_ext',
						itemId:   'scansnils_ext',
						}
					]
				}
			], 
			height: 270
        } // group
,
        { 
        xtype:'fieldset', 
        anchor: '100%',
        x: 0, 
        layout:'absolute', 
        id:'iu_tm_records_2',
        title:      'Досье',
        defaultType:  'textfield',
            items: [
		{
		xtype:  'hidden',
		name:   'info',
		itemId:   'info'
		},
		{
			x: 5, 
			y: 5, 
			width:540,
			fieldLabel:  'Загружен файл',
			xtype:  'textfield',
			readOnly:true,
			name:   'tmfile',
			itemId:   'tmfile'
			},{
			xtype:  'hidden',
			name:   'tmfile_ext',
			itemId:   'tmfile_ext'
		},
		{
			//minWidth: 115,
			//width: 115,
			//maxWidth: 115,
			x: 560, 
			y: 5, 
			width:90,
			xtype:  'button',
			itemId:   'tmfile_btn',
			text:"Просмотр",
			iconCls:'icon-iu_preview',
			allowBlank:true,
			
			handler: function() {
				  if(this.up('form' ).activeRecord.get('tmfile')+''==''){
					return;
				  };
				var s="/output_file.php?ID="+this.up('form' ).activeRecord.get('tmfile')+ "&ext="+this.up('form' ).activeRecord.get('tmfile_ext');
				var params = "menubar=no,location=yes,resizable=yes,scrollbars=yes,status=yes"
				window.open(s,'_blank',params);
			}
		
		},
		
		{
				//minWidth: 120,
				//width: 120,
				//maxWidth: 120,
				x: 660, 
				y: 5, 
				width:90,

				xtype:  'filefield',
				name:   'tmfile_fu',
				itemId:   'tmfile_fu',
				fieldLabel:  '',
				buttonOnly:true,
				buttonConfig: {
					iconCls:'icon-iu_upload'
				},
				buttonText:"Выбрать",
				allowBlank:true
		}


       ], 
       height: 80 
        } // group
,
        { 
        xtype:'fieldset', 
        anchor: '100%',
        x: 0, 
        layout:'absolute', 
        id:'iu_tm_records_3',
        title:      'Примечание',
        defaultType:  'textfield',
            items: [
{
        minWidth: 730,
        xtype: 'textarea', 
        x: 5, 
        y: 5, 
        height: 80, 
labelWidth:110,

value:  '',
name:   'thecomment',
itemId:   'thecomment',
hideLabel: true,
allowBlank:true
}
       ], 
       height: 130 
        } // group
          ],//items = part panel
        instanceid:''
    ,setActiveRecord: function(record,instid){
        p1.activeRecord = record;
        p1.instanceid = instid;
		
        if (record) {
            p1.getForm().loadRecord(record);
            p1_valid =p1.getForm().isValid();
        } else {
            p1.getForm().reset();
        }
    }
}); // 'Ext.Define

return p1;
};
function DefineForms_iu_tm_records_(){


Ext.define('Form_iu_tm_records', {
extend:  'Ext.form.Panel',
alias: 'widget.f_iu_tm_records',
initComponent: function(){
    this.addEvents('create');
    Ext.apply(this,{
        activeRecord: null,
        defaultType:  'textfield',
        id:'iu_tm_records',
        x: 0, 
        fieldDefaults: {
         labelAlign:  'top' //,
        },
        items: [
        { 
        xtype:'panel', 
        id:'iu_tm_records-0',
        title:      'Реквизиты',
        defaultType:  'textfield',
        closable:false,
        collapsible:true,
        titleCollapse : true,
        layout:'absolute', 
        x: 0, 
            items: [
{
        minWidth: 220,
        width: 220,
        maxWidth: 220,
        x: 5, 
        y: 0, 

xtype:  'textfield',
value:  '',
name:   'passport',
itemId:   'passport',
fieldLabel:  'Паспортные данные',
allowBlank:true
       ,labelWidth: 120
}
,
{
        minWidth: 220,
        width: 220,
        maxWidth: 220,
        x: 255, 
        y: 0, 

xtype:  'textfield',
value:  '',
name:   'inn',
itemId:   'inn',
fieldLabel:  'ИНН',
allowBlank:true
       ,labelWidth: 120
}
,
{
        minWidth: 220,
        width: 220,
        maxWidth: 220,
        x: 505, 
        y: 0, 

xtype:  'textfield',
value:  '',
name:   'snils',
itemId:   'snils',
fieldLabel:  'СНИЛС',
allowBlank:true
       ,labelWidth: 120
}
,
{
        minWidth: 220,
        width: 220,
        maxWidth: 220,
        x: 5, 
        y: 46, 

xtype:  'textfield',
value:  '',
name:   'bankinfo',
itemId:   'bankinfo',
fieldLabel:  'Банковские реквизиты',
allowBlank:true
       ,labelWidth: 120
}
       ], width: 760,
       height: 132 
        } //group
,
        {  
        xtype:'panel', 
        id:'iu_tm_records-1',
        title:      'Сканы документов',
        defaultType:  'textfield',
        closable:false,
        collapsible:true,
        titleCollapse : true,
        layout:'absolute', 
        x: 0, 
            items: [
			
{
        minWidth: 150,
        width: 150,
        maxWidth: 150,
		height:150,
        x: 10, 
        y: 0, 

		xtype:  'display',
		name:   'scanpassport_img',
		itemId:   'scanpassport_img',
		htmlEncode:true,
		html:'<img src="\resources\images\defaultuser.png" >'
       
},
{
        minWidth: 245,
        width: 245,
        maxWidth: 245,
        x: 10, 
        y: 170, 

xtype:  'filefield',
name:   'scanpassport_fu',
itemId:   'scanpassport_fu',
fieldLabel:  'Паспорт',
allowBlank:true
       ,labelWidth: 110
},
{
        minWidth: 150,
        width: 150,
        maxWidth: 150,
		height:150,
        x: 0, 
        y:0, 

		xtype:  'display',
		name:   'scaninn_img',
		itemId:   'scaninn_img',
		htmlEncode:true,
		html:'<img src="\resources\images\defaultuser.png" >'
       
},
,
{
        minWidth: 245,
        width: 245,
        maxWidth: 245,
        x: 255, 
        y: 170, 

xtype:  'filefield',
name:   'scaninn_fu',
itemId:   'scaninn_fu',
fieldLabel:  'ИНН',
allowBlank:true
       ,labelWidth: 110
}
,
{
        minWidth: 245,
        width: 245,
        maxWidth: 245,
        x: 505, 
        y: 170, 

xtype:  'filefield',
name:   'scansnils_fu',
itemId:   'scansnils_fu',
fieldLabel:  'СНИЛС',
allowBlank:true
       ,labelWidth: 110
}
       ], width: 760,
       height: 250 
        } //group
,
        { 
        xtype:'panel', 
        id:'iu_tm_records-2',
        title:      'Досье',
        defaultType:  'textfield',
        closable:false,
        collapsible:true,
        collapsed:true,
        titleCollapse : true,
        layout:'absolute', 
        x: 0, 
            items: [
{
        minWidth: 245,
        width: 245,
        maxWidth: 245,
        x: 5, 
        y: 0, 

xtype:  'textfield',
value:  '',
name:   'info',
itemId:   'info',
fieldLabel:  'Информация',
allowBlank:true
       ,labelWidth: 110
}
,
{
        minWidth: 245,
        width: 245,
        maxWidth: 245,
        x: 255, 
        y: 0, 

xtype:  'filefield',
name:   'tmfile_fu',
itemId:   'tmfile_fu',
fieldLabel:  'Файл',
allowBlank:true
       ,labelWidth: 110
}
       ], width: 760,
       height: 86 
        } //group
,
        { 
        xtype:'panel', 
        id:'iu_tm_records-3',
        title:      'Примечание',
        defaultType:  'textfield',
        closable:false,
        collapsible:true,
        collapsed:true,
        titleCollapse : true,
        layout:'absolute', 
        x: 0, 
            items: [
{
        minWidth: 730,
        maxWidth: 730,
        width: 730,
        xtype: 'textarea', 
        x: 5, 
        y: 0, 
        height: 80, 

value:  '',
name:   'thecomment',
itemId:   'thecomment',
hideLabel: true,
allowBlank:true
       ,labelWidth: 110
}
       ], width: 760,
       height: 130 
        } //group
          ],//items = part panel
        instanceid:'',
        dockedItems: [{
            xtype:  'toolbar',
            dock:   'bottom',
            ui:     'footer',
                items: ['->', {
                    iconCls:  'icon-accept',
                    itemId:  'save',
                    text:   'Сохранить',
                    disabled: true,
                    scope:  this,
                    handler : this.onSave
                }
              ]
            }] // dockedItems
        }); //Ext.apply
        this.callParent();
    }, //initComponent 
    setActiveRecord: function(record,instid){
        this.activeRecord = record;
        this.instanceid = instid;
        if (record) {
            this.down('#save').enable();
            this.getForm().loadRecord(record);
        } else {
            this.down('#save').disable();
            this.getForm().reset();
        }
    },
    onSave: function(){
        var active = this.activeRecord,
            form = this.getForm();
        if (!active) {
            return;
        }
        if (form.isValid()) {
            form.updateRecord(active);
            // combobox patch
            var form_values = form.getValues(); var field_name = '';  for(field_name in form_values){active.set(field_name, form_values[field_name]);}
        	StatusDB('Сохранение данных');
            form.submit({
                url: rootURL+'index.php/c_iu_tm_records/setRow',
                method:  'POST',
                params: { 
                    instanceid: this.instanceid
                    ,iu_tm_recordsid: active.get('iu_tm_recordsid')
                }
                , success: function(){
        		    StatusReady('Изменения сохранены');
                 }
                , failure: function(response){
        		    StatusReady('Ошибка сохранения данных');
                 }
            });   // end submit 
        }else{
        		Ext.MessageBox.show({
                title:  'Ошибка',
                msg:    'Не все обязательные поля заполнены!',
                buttons: Ext.MessageBox.OK,
                icon:   Ext.MessageBox.ERROR
        		});
        }
    },
    onReset: function(){
        if(this.activeRecord.get('iu_tm_recordsid')==''){
                this.activeRecord.store.reload();
        }
        this.setActiveRecord(null,null);
        this.ownerCt.close();
    }
}); // 'Ext.Define

Ext.define('EditWindow_iu_tm_records', {
    extend:  'Ext.window.Window',
    maxHeight: 598,
    maxWidth: 790,
    minHeight:553,
    minWidth: 790,
    width: 790,
    constrainHeader :true,
    layout:  'absolute',
    autoShow: true,
    modal: true,
    closable: false,
    closeAction: 'destroy',
    iconCls:  'icon-application_form',
    title:  'Досье',
    items:[{
        xtype:  'f_iu_tm_records'
	}]
	});
}
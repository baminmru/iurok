
Ext.require([
'Ext.form.*'
]);

function DefineInterface_iu_u_def_read(id,mystore,selection){

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
            // var form_values = form.getValues(); var field_name = '';  for(field_name in form_values){active.set(field_name, form_values[field_name]);}
        	StatusDB('Сохранение данных');
            Ext.Ajax.request({
                url: rootURL+'index.php/c_iu_u_def/setRow',
                method:  'POST',
                params: { 
                    instanceid: p1.instanceid
                    ,iu_u_defid: active.get('iu_u_defid')
                    ,lastname: active.get('lastname') 
                    ,name: active.get('name') 
                    ,surname: active.get('surname') 
                    ,currole: active.get('currole') 
                    ,thetown: active.get('thetown') 
                    ,sendtomail: active.get('sendtomail') 
                    ,freelancer: active.get('freelancer') 
                    ,email: active.get('email') 
                    ,thephone: active.get('thephone') 
                    ,login: active.get('login') 
                    ,lastsend: active.get('lastsend') 
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
                    if(active.get('iu_u_defid')==''){
               			active.set('iu_u_defid',res.data['iu_u_defid']);
                    }
        		   /* Ext.MessageBox.show({
                        title:  'Подтверждение',
                        msg:    'Изменения сохранены',
                        buttons: Ext.MessageBox.OK,
                        icon:   Ext.MessageBox.INFO
        		    }); */
        		    StatusReady('Изменения сохранены');
                    p1_saved=true;
                   if(selection){
                     Ext.Ajax.request({
                        url: rootURL+'index.php/c_v_autoiu_u_def/getRows?&filter=[{"property":"iu_u_defid","value":"'+ active.get('iu_u_defid') + '"}]',
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
            selection: selection,
            defaultType:  'textfield',
            doSave: onSave2,
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
        fieldDefaults: {
         labelAlign:  'right',
         labelWidth: 110
        },
        items: [
        { 
        xtype:'fieldset', 
        anchor:     '100%',
        id:'iu_u_def-0',
        x: 0, 
        border:1, 
        layout:'absolute', 
        items: [
{
        /* flex_field */ 
        minWidth: 735,
        width: 735,
        maxWidth: 735,
        x: 5, 
        y: 5, 
labelWidth:140,

xtype:  'textfield',
value:  '',
name:   'lastname',
itemId:   'lastname',
fieldLabel:  'Фамилия',
editable: false,
readOnly: true,
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
name:   'name',
itemId:   'name',
fieldLabel:  'Имя',
editable: false,
readOnly: true,
allowBlank:true
}
,
{
        minWidth: 365,
        width: 365,
        maxWidth: 365,
        x: 375, 
        y: 35, 
labelWidth:140,

xtype:  'textfield',
value:  '',
name:   'surname',
itemId:   'surname',
fieldLabel:  'Отчество',
editable: false,
readOnly: true,
allowBlank:true
}
,
{
        minWidth: 365,
        width: 365,
        maxWidth: 365,
        x: 5, 
        y: 65, 
labelWidth:140,

xtype:  'combobox',
hideTrigger: true,
editable: false,
readOnly: true,
store: cmbstore_iu_crole,
valueField:     'brief',
displayField:   'brief',
typeAhead: true,
emptyText:      '',
name:   'currole_grid',
itemId:   'currole_grid',
fieldLabel:  'Роль в производстве',
allowBlank:true
}
,
{
        minWidth: 365,
        width: 365,
        maxWidth: 365,
        x: 375, 
        y: 65, 
labelWidth:140,

xtype:  'combobox',
hideTrigger: true,
editable: false,
readOnly: true,
store: cmbstore_iud_town,
valueField:     'brief',
displayField:   'brief',
typeAhead: true,
emptyText:      '',
name:   'thetown_grid',
itemId:   'thetown_grid',
fieldLabel:  'Город',
allowBlank:true
}
,
{
        minWidth: 365,
        width: 365,
        maxWidth: 365,
        x: 5, 
        y: 95, 
labelWidth:140,

xtype:          'combobox',
editable: false,
readOnly: true,
hideTrigger: true,
store: enum_Boolean,
valueField:     'name',
displayField:   'name',
typeAhead: true,
queryMode:      'local',
emptyText:      '',
name:   'sendtomail_grid',
itemId:   'sendtomail_grid',
listeners:{  select: function ( combo, records, eOpts ) {combo.up('form' ).activeRecord.set('sendtomail', records[0].get('value'));}  },
fieldLabel:  'Оповещать по почте',
allowBlank:true
}
,
{
        minWidth: 365,
        width: 365,
        maxWidth: 365,
        x: 375, 
        y: 95, 
labelWidth:140,

xtype:          'combobox',
editable: false,
readOnly: true,
hideTrigger: true,
store: enum_Boolean,
valueField:     'name',
displayField:   'name',
typeAhead: true,
queryMode:      'local',
emptyText:      '',
name:   'freelancer_grid',
itemId:   'freelancer_grid',
listeners:{  select: function ( combo, records, eOpts ) {combo.up('form' ).activeRecord.set('freelancer', records[0].get('value'));}  },
fieldLabel:  'Удаленная работа',
allowBlank:true
}
,
{
        minWidth: 365,
        width: 365,
        maxWidth: 365,
        x: 5, 
        y: 125, 
labelWidth:140,

xtype:  'textfield',
value:  '',
name:   'email',
itemId:   'email',
fieldLabel:  'e-mail',
editable: false,
readOnly: true,
allowBlank:true
}
,
{
        minWidth: 365,
        width: 365,
        maxWidth: 365,
        x: 375, 
        y: 125, 
labelWidth:140,

xtype:  'textfield',
value:  '',
name:   'thephone',
itemId:   'thephone',
fieldLabel:  'Телефон',
editable: false,
readOnly: true,
allowBlank:true
}
,
{
xtype:  'hidden',
name:   'login',
fieldLabel:  'Имя для входа'
}
,
{
xtype:  'hidden',
name:   'lastsend',
fieldLabel:  'Последнее сканирование задач'
}
       ],
       height: 175 
        }
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
function DefineForms_iu_u_def_read(){


Ext.define('Form_iu_u_defread', {
extend:  'Ext.form.Panel',
alias: 'widget.f_iu_u_defread',
initComponent: function(){
    this.addEvents('create');
    Ext.apply(this,{
        activeRecord: null,
        defaultType:  'textfield',
        x: 0, 
        fieldDefaults: {
         labelAlign:  'top' //,
        },
        items: [
        { 
        xtype:'panel', 
        closable:false,
        title:'',
        preventHeader:true,
        id:'iu_u_def-0',
        layout:'absolute', 
        border:false, 
        items: [
{
        minWidth: 735,
        width: 735,
        maxWidth: 735,
        x: 5, 
        y: 0, 

xtype:  'textfield',
value:  '',
name:   'lastname',
itemId:   'lastname',
fieldLabel:  'Фамилия',
editable: false,
readOnly: true,
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
name:   'name',
itemId:   'name',
fieldLabel:  'Имя',
editable: false,
readOnly: true,
allowBlank:true
       ,labelWidth: 120
}
,
{
        minWidth: 220,
        width: 220,
        maxWidth: 220,
        x: 255, 
        y: 46, 

xtype:  'textfield',
value:  '',
name:   'surname',
itemId:   'surname',
fieldLabel:  'Отчество',
editable: false,
readOnly: true,
allowBlank:true
       ,labelWidth: 120
}
,
{
        minWidth: 220,
        width: 220,
        maxWidth: 220,
        x: 505, 
        y: 46, 

xtype:  'combobox',
hideTrigger: true,
editable: false,
readOnly: true,
store: cmbstore_iu_crole,
valueField:     'brief',
displayField:   'brief',
typeAhead: true,
emptyText:      '',
name:   'currole_grid',
itemId:   'currole_grid',
fieldLabel:  'Роль в производстве',
allowBlank:true
       ,labelWidth: 120
}
,
{
        minWidth: 220,
        width: 220,
        maxWidth: 220,
        x: 5, 
        y: 92, 

xtype:  'combobox',
hideTrigger: true,
editable: false,
readOnly: true,
store: cmbstore_iud_town,
valueField:     'brief',
displayField:   'brief',
typeAhead: true,
emptyText:      '',
name:   'thetown_grid',
itemId:   'thetown_grid',
fieldLabel:  'Город',
allowBlank:true
       ,labelWidth: 120
}
,
{
        minWidth: 220,
        width: 220,
        maxWidth: 220,
        x: 255, 
        y: 92, 

xtype:          'combobox',
editable: false,
readOnly: true,
hideTrigger: true,
store: enum_Boolean,
valueField:     'name',
displayField:   'name',
typeAhead: true,
queryMode:      'local',
emptyText:      '',
name:   'sendtomail_grid',
itemId:   'sendtomail_grid',
listeners:{  select: function ( combo, records, eOpts ) {combo.up('form' ).activeRecord.set('sendtomail', records[0].get('value'));}  },
fieldLabel:  'Оповещать по почте',
allowBlank:true
       ,labelWidth: 120
}
,
{
        minWidth: 220,
        width: 220,
        maxWidth: 220,
        x: 505, 
        y: 92, 

xtype:          'combobox',
editable: false,
readOnly: true,
hideTrigger: true,
store: enum_Boolean,
valueField:     'name',
displayField:   'name',
typeAhead: true,
queryMode:      'local',
emptyText:      '',
name:   'freelancer_grid',
itemId:   'freelancer_grid',
listeners:{  select: function ( combo, records, eOpts ) {combo.up('form' ).activeRecord.set('freelancer', records[0].get('value'));}  },
fieldLabel:  'Удаленная работа',
allowBlank:true
       ,labelWidth: 120
}
,
{
        minWidth: 220,
        width: 220,
        maxWidth: 220,
        x: 5, 
        y: 138, 

xtype:  'textfield',
value:  '',
name:   'email',
itemId:   'email',
fieldLabel:  'e-mail',
editable: false,
readOnly: true,
allowBlank:true
       ,labelWidth: 120
}
,
{
        minWidth: 220,
        width: 220,
        maxWidth: 220,
        x: 255, 
        y: 138, 

xtype:  'textfield',
value:  '',
name:   'thephone',
itemId:   'thephone',
fieldLabel:  'Телефон',
editable: false,
readOnly: true,
allowBlank:true
       ,labelWidth: 120
}
,
{
xtype:  'hidden',
name:   'login',
fieldLabel:  'Имя для входа'
}
,
{
xtype:  'hidden',
name:   'lastsend',
fieldLabel:  'Последнее сканирование задач'
}
       ], width: 770,
       height: 214 
        }
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
            // var form_values = form.getValues(); var field_name = '';  for(field_name in form_values){active.set(field_name, form_values[field_name]);}
        	StatusDB('Сохранение данных');
            Ext.Ajax.request({
                url: rootURL+'index.php/c_iu_u_def/setRow',
                method:  'POST',
                params: { 
                    instanceid: this.instanceid
                    ,iu_u_defid: active.get('iu_u_defid')
                    ,lastname: active.get('lastname') 
                    ,name: active.get('name') 
                    ,surname: active.get('surname') 
                    ,currole: active.get('currole') 
                    ,thetown: active.get('thetown') 
                    ,sendtomail: active.get('sendtomail') 
                    ,freelancer: active.get('freelancer') 
                    ,email: active.get('email') 
                    ,thephone: active.get('thephone') 
                    ,login: active.get('login') 
                    ,lastsend:function() { if(active.get('lastsend')) return active.get('lastsend').toLocaleFormat('%Y-%m-%d %H:%M:%S'); else return null;}()
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
        		    StatusErr( 'Ошибка. '+res.msg);
	            }else{
                    if(active.get('iu_u_defid')==''){
               			active.set('iu_u_defid',res.data['iu_u_defid']);
                    }
        		    StatusReady('Изменения сохранены');
                }
              }
            });
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
        if(this.activeRecord.get('iu_u_defid')==''){
                this.activeRecord.store.reload();
        }
        this.setActiveRecord(null,null);
        this.ownerCt.close();
    }
}); // 'Ext.Define

Ext.define('EditWindow_iu_u_defread', {
    extend:  'Ext.window.Window',
    maxHeight: 319,
    maxWidth: 900,
    autoScroll:true,
    minWidth: 750,
    width: 800,
    minHeight:289,
    height:289,
    constrainHeader :true,
    layout:  'absolute',
    autoShow: true,
    modal: true,
    closable: false,
    closeAction: 'destroy',
    iconCls:  'icon-application_form',
    title:  'Данные сотрудника',
    items:[{
        xtype:  'f_iu_u_defread'
	}]
	});
}
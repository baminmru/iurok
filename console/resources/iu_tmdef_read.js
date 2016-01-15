
Ext.require([
'Ext.form.*'
]);

function DefineInterface_iu_tmdef_read(id,mystore,selection){

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
                url: rootURL+'index.php/c_iu_tmdef/setRow',
                method:  'POST',
                params: { 
                    instanceid: p1.instanceid
                    ,iu_tmdefid: active.get('iu_tmdefid')
                    ,lastname: active.get('lastname') 
                    ,name: active.get('name') 
                    ,surname: active.get('surname') 
                    ,subjects: active.get('subjects') 
                    ,classes: active.get('classes') 
                    ,thephone: active.get('thephone') 
                    ,email: active.get('email') 
                    ,sendtomail: active.get('sendtomail') 
                    ,regal: active.get('regal') 
                    ,ismethodist: active.get('ismethodist') 
                    ,thetown: active.get('thetown') 
                    ,workat: active.get('workat') 
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
                    if(active.get('iu_tmdefid')==''){
               			active.set('iu_tmdefid',res.data['iu_tmdefid']);
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
                        url: rootURL+'index.php/c_v_autoiu_tmdef/getRows?&filter=[{"property":"iu_tmdefid","value":"'+ active.get('iu_tmdefid') + '"}]',
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
        id:'iu_tmdef',
        fieldDefaults: {
         labelAlign:  'right',
         labelWidth: 110
        },
        items: [
        { 
        xtype:'fieldset', 
        anchor:     '100%',
        id:'iu_tmdef-0',
        x: 0, 
        border:1, 
        layout:'absolute', 
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
        x: 375, 
        y: 5, 
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
        x: 5, 
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
readOnly: true,
editable: false,
multiSelect : true,
delimiter:',', 
store: cmbstore_iud_predmet,
valueField:     'brief',
displayField:   'brief',
typeAhead: true,
emptyText:      '',
name:   'subjects_grid',
itemId:   'subjects_grid',
fieldLabel:  'Предметы',
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

xtype:  'textfield',
value:  '',
name:   'classes',
itemId:   'classes',
fieldLabel:  'Классы',
editable: false,
readOnly: true,
allowBlank:true
}
       ],
       height: 115 
        }
,
        { 
        xtype:'fieldset', 
        anchor: '100%',
        x: 0, 
        layout:'absolute', 
        id:'iu_tmdef_1',
        title:      'Контакты',
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
name:   'thephone',
itemId:   'thephone',
fieldLabel:  'Телефон',
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
        y: 5, 
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
        x: 5, 
        y: 35, 
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
       ], 
       height: 100 
        } // group
,
        { 
        xtype:'fieldset', 
        anchor: '100%',
        x: 0, 
        layout:'absolute', 
        id:'iu_tmdef_2',
        title:      'Работа',
        defaultType:  'textfield',
            items: [
{
        minWidth: 720,
        xtype: 'textarea', 
        x: 5, 
        y: 5, 
        height: 80, 
labelWidth:140,

value:  '',
name:   'regal',
itemId:   'regal',
fieldLabel:  'Регалии',
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
name:   'ismethodist_grid',
itemId:   'ismethodist_grid',
listeners:{  select: function ( combo, records, eOpts ) {combo.up('form' ).activeRecord.set('ismethodist', records[0].get('value'));}  },
fieldLabel:  'Методист',
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
        y: 125, 
labelWidth:140,

xtype:  'textfield',
value:  '',
name:   'workat',
itemId:   'workat',
fieldLabel:  'Место работы',
editable: false,
readOnly: true,
allowBlank:true
}
       ], 
       height: 190 
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
function DefineForms_iu_tmdef_read(){


Ext.define('Form_iu_tmdefread', {
extend:  'Ext.form.Panel',
alias: 'widget.f_iu_tmdefread',
initComponent: function(){
    this.addEvents('create');
    Ext.apply(this,{
        activeRecord: null,
        defaultType:  'textfield',
        id:'iu_tmdef',
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
        id:'iu_tmdef-0',
        layout:'absolute', 
        border:false, 
        items: [
{
        minWidth: 220,
        width: 220,
        maxWidth: 220,
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
        x: 255, 
        y: 0, 

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
        x: 505, 
        y: 0, 

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
        x: 5, 
        y: 46, 

xtype:  'combobox',
hideTrigger: true,
readOnly: true,
editable: false,
multiSelect : true,
delimiter:',', 
store: cmbstore_iud_predmet,
valueField:     'brief',
displayField:   'brief',
typeAhead: true,
emptyText:      '',
name:   'subjects_grid',
itemId:   'subjects_grid',
fieldLabel:  'Предметы',
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
name:   'classes',
itemId:   'classes',
fieldLabel:  'Классы',
editable: false,
readOnly: true,
allowBlank:true
       ,labelWidth: 120
}
       ], width: 770,
       height: 122 
        }
,
        { 
        xtype:'panel', 
        id:'iu_tmdef-1',
        title:      'Контакты',
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
        minWidth: 220,
        width: 220,
        maxWidth: 220,
        x: 255, 
        y: 0, 

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
        x: 505, 
        y: 0, 

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
       ], width: 760,
       height: 86 
        } //group
,
        { 
        xtype:'panel', 
        id:'iu_tmdef-2',
        title:      'Работа',
        defaultType:  'textfield',
        closable:false,
        collapsible:true,
        titleCollapse : true,
        layout:'absolute', 
        x: 0, 
            items: [
{
        minWidth: 740,
        maxWidth: 740,
        width: 740,
        xtype: 'textarea', 
        x: 5, 
        y: 0, 
        height: 80, 

value:  '',
name:   'regal',
itemId:   'regal',
fieldLabel:  'Регалии',
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
        y: 90, 

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
name:   'ismethodist_grid',
itemId:   'ismethodist_grid',
listeners:{  select: function ( combo, records, eOpts ) {combo.up('form' ).activeRecord.set('ismethodist', records[0].get('value'));}  },
fieldLabel:  'Методист',
allowBlank:true
       ,labelWidth: 120
}
,
{
        minWidth: 220,
        width: 220,
        maxWidth: 220,
        x: 255, 
        y: 90, 

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
        x: 505, 
        y: 90, 

xtype:  'textfield',
value:  '',
name:   'workat',
itemId:   'workat',
fieldLabel:  'Место работы',
editable: false,
readOnly: true,
allowBlank:true
       ,labelWidth: 120
}
       ], width: 760,
       height: 176 
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
            // var form_values = form.getValues(); var field_name = '';  for(field_name in form_values){active.set(field_name, form_values[field_name]);}
        	StatusDB('Сохранение данных');
            Ext.Ajax.request({
                url: rootURL+'index.php/c_iu_tmdef/setRow',
                method:  'POST',
                params: { 
                    instanceid: this.instanceid
                    ,iu_tmdefid: active.get('iu_tmdefid')
                    ,lastname: active.get('lastname') 
                    ,name: active.get('name') 
                    ,surname: active.get('surname') 
                    ,subjects: active.get('subjects') 
                    ,classes: active.get('classes') 
                    ,thephone: active.get('thephone') 
                    ,email: active.get('email') 
                    ,sendtomail: active.get('sendtomail') 
                    ,regal: active.get('regal') 
                    ,ismethodist: active.get('ismethodist') 
                    ,thetown: active.get('thetown') 
                    ,workat: active.get('workat') 
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
                    if(active.get('iu_tmdefid')==''){
               			active.set('iu_tmdefid',res.data['iu_tmdefid']);
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
        if(this.activeRecord.get('iu_tmdefid')==''){
                this.activeRecord.store.reload();
        }
        this.setActiveRecord(null,null);
        this.ownerCt.close();
    }
}); // 'Ext.Define

Ext.define('EditWindow_iu_tmdefread', {
    extend:  'Ext.window.Window',
    maxHeight: 499,
    maxWidth: 900,
    autoScroll:true,
    minWidth: 750,
    width: 800,
    minHeight:469,
    height:469,
    constrainHeader :true,
    layout:  'absolute',
    autoShow: true,
    modal: true,
    closable: false,
    closeAction: 'destroy',
    iconCls:  'icon-application_form',
    title:  'Информация',
    items:[{
        xtype:  'f_iu_tmdefread'
	}]
	});
}
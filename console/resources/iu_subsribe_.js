
Ext.require([
'Ext.form.*'
]);

function DefineInterface_iu_subsribe_(id,mystore,selection){

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
                url: rootURL+'index.php/c_iu_subsribe/setRow',
                method:  'POST',
                params: { 
                    instanceid: p1.instanceid
                    ,iu_subsribeid: active.get('iu_subsribeid')
                    ,subscriber: active.get('subscriber') 
                    ,isactive: active.get('isactive') 
                    ,scandate: active.get('scandate') 
                    ,eventtype: active.get('eventtype') 
                    ,theprocess: active.get('theprocess') 
                    ,processstatus: active.get('processstatus') 
                    ,statetask: active.get('statetask') 
                    ,doer: active.get('doer') 
                    ,thedoc: active.get('thedoc') 
                    ,thevideo: active.get('thevideo') 
                    ,thediscussion: active.get('thediscussion') 
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
                    if(active.get('iu_subsribeid')==''){
               			active.set('iu_subsribeid',res.data['iu_subsribeid']);
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
                        url: rootURL+'index.php/c_v_autoiu_subsribe/getRows?&filter=[{"property":"iu_subsribeid","value":"'+ active.get('iu_subsribeid') + '"}]',
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
        id:'iu_subsribe',
        fieldDefaults: {
         labelAlign:  'right',
         labelWidth: 110
        },
        items: [
        { 
        xtype:'fieldset', 
        anchor:     '100%',
        id:'iu_subsribe-0',
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

xtype:  'combobox',
hideTrigger: true,
editable: false,
readOnly: true,
       cls:'x-item-readonly',
store: cmbstore_iu_u_def,
valueField:     'brief',
displayField:   'brief',
typeAhead: true,
emptyText:      '',
name:   'subscriber_grid',
itemId:   'subscriber_grid',
fieldLabel:  'Подписчик',
allowBlank:false
}
,
{
        minWidth: 365,
        width: 365,
        maxWidth: 365,
        x: 375, 
        y: 5, 
labelWidth:140,

xtype:          'combobox',
editable: false,
store: enum_Boolean,
valueField:     'name',
displayField:   'name',
typeAhead: true,
queryMode:      'local',
emptyText:      '',
name:   'isactive_grid',
itemId:   'isactive_grid',
listeners:{  select: function ( combo, records, eOpts ) {combo.up('form' ).activeRecord.set('isactive', records[0].get('value'));}  },
fieldLabel:  'Подписка активна',
labelClsExtra:'x-item-mandatory',
allowBlank:false
}
,
{
xtype:  'hidden',
name:   'scandate',
fieldLabel:  'Время последней обработки'
}
       ],
       height: 55 
        }
,
        { 
        xtype:'fieldset', 
        anchor: '100%',
        x: 0, 
        layout:'absolute', 
        id:'iu_subsribe_1',
        title:      'Шаблон',
        defaultType:  'textfield',
            items: [
{
        minWidth: 720,
        x: 5, 
        y: 5, 
labelWidth:140,

xtype:  'textfield',
value:  '',
name:   'eventtype',
itemId:   'eventtype',
fieldLabel:  'Тип события',
editable: false,
readOnly: true,
cls:'x-item-readonly',
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

xtype:  'combobox',
hideTrigger: true,
editable: false,
readOnly: true,
       cls:'x-item-readonly',
store: cmbstore_iu_urok_def,
valueField:     'brief',
displayField:   'brief',
typeAhead: true,
emptyText:      '',
name:   'theprocess_grid',
itemId:   'theprocess_grid',
fieldLabel:  'Урок',
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

xtype:  'combobox',
hideTrigger: true,
editable: false,
readOnly: true,
       cls:'x-item-readonly',
store: cmbstore_iu_status,
valueField:     'brief',
displayField:   'brief',
typeAhead: true,
emptyText:      '',
name:   'processstatus_grid',
itemId:   'processstatus_grid',
fieldLabel:  'Подэтап',
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
       cls:'x-item-readonly',
store: cmbstore_iu_task,
valueField:     'brief',
displayField:   'brief',
typeAhead: true,
emptyText:      '',
name:   'statetask_grid',
itemId:   'statetask_grid',
fieldLabel:  'Задача',
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
       cls:'x-item-readonly',
store: cmbstore_iu_u_def,
valueField:     'brief',
displayField:   'brief',
typeAhead: true,
emptyText:      '',
name:   'doer_grid',
itemId:   'doer_grid',
fieldLabel:  'Сотрудник',
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

xtype:  'combobox',
hideTrigger: true,
editable: false,
readOnly: true,
       cls:'x-item-readonly',
store: cmbstore_iu_urok_docs,
valueField:     'brief',
displayField:   'brief',
typeAhead: true,
emptyText:      '',
name:   'thedoc_grid',
itemId:   'thedoc_grid',
fieldLabel:  'Документ',
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
       cls:'x-item-readonly',
store: cmbstore_iu_urok_video,
valueField:     'brief',
displayField:   'brief',
typeAhead: true,
emptyText:      '',
name:   'thevideo_grid',
itemId:   'thevideo_grid',
fieldLabel:  'Видео',
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

xtype:  'combobox',
hideTrigger: true,
editable: false,
readOnly: true,
       cls:'x-item-readonly',
store: cmbstore_iu_cm_def,
valueField:     'brief',
displayField:   'brief',
typeAhead: true,
emptyText:      '',
name:   'thediscussion_grid',
itemId:   'thediscussion_grid',
fieldLabel:  'Обсуждение',
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
function DefineForms_iu_subsribe_(){


Ext.define('Form_iu_subsribe', {
extend:  'Ext.form.Panel',
alias: 'widget.f_iu_subsribe',
initComponent: function(){
    this.addEvents('create');
    Ext.apply(this,{
        activeRecord: null,
        defaultType:  'textfield',
        id:'iu_subsribe',
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
        id:'iu_subsribe-0',
        layout:'absolute', 
        border:false, 
        items: [
{
        minWidth: 220,
        width: 220,
        maxWidth: 220,
        x: 5, 
        y: 0, 

xtype:  'combobox',
hideTrigger: true,
editable: false,
readOnly: true,
       cls:'x-item-readonly',
store: cmbstore_iu_u_def,
valueField:     'brief',
displayField:   'brief',
typeAhead: true,
emptyText:      '',
name:   'subscriber_grid',
itemId:   'subscriber_grid',
fieldLabel:  'Подписчик',
allowBlank:false
       ,labelWidth: 120
}
,
{
        minWidth: 220,
        width: 220,
        maxWidth: 220,
        x: 255, 
        y: 0, 

xtype:          'combobox',
editable: false,
store: enum_Boolean,
valueField:     'name',
displayField:   'name',
typeAhead: true,
queryMode:      'local',
emptyText:      '',
name:   'isactive_grid',
itemId:   'isactive_grid',
listeners:{  select: function ( combo, records, eOpts ) {combo.up('form' ).activeRecord.set('isactive', records[0].get('value'));}  },
fieldLabel:  'Подписка активна',
labelClsExtra:'x-item-mandatory',
allowBlank:false
       ,labelWidth: 120
}
,
{
xtype:  'hidden',
name:   'scandate',
fieldLabel:  'Время последней обработки'
}
       ], width: 770,
       height: 76 
        }
,
        { 
        xtype:'panel', 
        id:'iu_subsribe-1',
        title:      'Шаблон',
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
        x: 5, 
        y: 0, 

xtype:  'textfield',
value:  '',
name:   'eventtype',
itemId:   'eventtype',
fieldLabel:  'Тип события',
editable: false,
readOnly: true,
cls:'x-item-readonly',
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
editable: false,
readOnly: true,
       cls:'x-item-readonly',
store: cmbstore_iu_urok_def,
valueField:     'brief',
displayField:   'brief',
typeAhead: true,
emptyText:      '',
name:   'theprocess_grid',
itemId:   'theprocess_grid',
fieldLabel:  'Урок',
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

xtype:  'combobox',
hideTrigger: true,
editable: false,
readOnly: true,
       cls:'x-item-readonly',
store: cmbstore_iu_status,
valueField:     'brief',
displayField:   'brief',
typeAhead: true,
emptyText:      '',
name:   'processstatus_grid',
itemId:   'processstatus_grid',
fieldLabel:  'Подэтап',
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
       cls:'x-item-readonly',
store: cmbstore_iu_task,
valueField:     'brief',
displayField:   'brief',
typeAhead: true,
emptyText:      '',
name:   'statetask_grid',
itemId:   'statetask_grid',
fieldLabel:  'Задача',
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
       cls:'x-item-readonly',
store: cmbstore_iu_u_def,
valueField:     'brief',
displayField:   'brief',
typeAhead: true,
emptyText:      '',
name:   'doer_grid',
itemId:   'doer_grid',
fieldLabel:  'Сотрудник',
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

xtype:  'combobox',
hideTrigger: true,
editable: false,
readOnly: true,
       cls:'x-item-readonly',
store: cmbstore_iu_urok_docs,
valueField:     'brief',
displayField:   'brief',
typeAhead: true,
emptyText:      '',
name:   'thedoc_grid',
itemId:   'thedoc_grid',
fieldLabel:  'Документ',
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

xtype:  'combobox',
hideTrigger: true,
editable: false,
readOnly: true,
       cls:'x-item-readonly',
store: cmbstore_iu_urok_video,
valueField:     'brief',
displayField:   'brief',
typeAhead: true,
emptyText:      '',
name:   'thevideo_grid',
itemId:   'thevideo_grid',
fieldLabel:  'Видео',
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

xtype:  'combobox',
hideTrigger: true,
editable: false,
readOnly: true,
       cls:'x-item-readonly',
store: cmbstore_iu_cm_def,
valueField:     'brief',
displayField:   'brief',
typeAhead: true,
emptyText:      '',
name:   'thediscussion_grid',
itemId:   'thediscussion_grid',
fieldLabel:  'Обсуждение',
allowBlank:true
       ,labelWidth: 120
}
       ], width: 760,
       height: 224 
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
                url: rootURL+'index.php/c_iu_subsribe/setRow',
                method:  'POST',
                params: { 
                    instanceid: this.instanceid
                    ,iu_subsribeid: active.get('iu_subsribeid')
                    ,subscriber: active.get('subscriber') 
                    ,isactive: active.get('isactive') 
                    ,scandate:function() { if(active.get('scandate')) return active.get('scandate').toLocaleFormat('%Y-%m-%d %H:%M:%S'); else return null;}()
                    ,eventtype: active.get('eventtype') 
                    ,theprocess: active.get('theprocess') 
                    ,processstatus: active.get('processstatus') 
                    ,statetask: active.get('statetask') 
                    ,doer: active.get('doer') 
                    ,thedoc: active.get('thedoc') 
                    ,thevideo: active.get('thevideo') 
                    ,thediscussion: active.get('thediscussion') 
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
                    if(active.get('iu_subsribeid')==''){
               			active.set('iu_subsribeid',res.data['iu_subsribeid']);
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
        if(this.activeRecord.get('iu_subsribeid')==''){
                this.activeRecord.store.reload();
        }
        this.setActiveRecord(null,null);
        this.ownerCt.close();
    }
}); // 'Ext.Define

Ext.define('EditWindow_iu_subsribe', {
    extend:  'Ext.window.Window',
    maxHeight: 410,
    maxWidth: 900,
    autoScroll:true,
    minWidth: 750,
    width: 800,
    minHeight:380,
    height:380,
    constrainHeader :true,
    layout:  'absolute',
    autoShow: true,
    modal: true,
    closable: false,
    closeAction: 'destroy',
    iconCls:  'icon-application_form',
    title:  'Подписка на событие',
    items:[{
        xtype:  'f_iu_subsribe'
	}]
	});
}
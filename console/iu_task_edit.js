
Ext.require([
'Ext.form.*'
]);

function DefineInterface_iu_task_edit(id,mystore,selection){

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
                url: rootURL+'index.php/c_iu_task/setRow',
                method:  'POST',
                params: { 
                    instanceid: p1.instanceid
                    ,iu_taskid: active.get('iu_taskid')
                    ,doer: active.get('doer') 
                    ,contoller: active.get('contoller') 
                    ,subj: active.get('subj') 
                    ,createdate: active.get('createdate') 
                    ,planenddate: active.get('planenddate') 
                    ,info: active.get('info') 
                    ,manualtask: active.get('manualtask') 
                    ,theprocess: active.get('theprocess') 
                    ,doer_comment: active.get('doer_comment') 
                    ,doer_states: active.get('doer_states') 
                    ,controller_comment: active.get('controller_comment') 
                    ,taskfinished: active.get('taskfinished') 
                    ,ischecked: active.get('ischecked') 
                    ,finishdate: active.get('finishdate') 
                    ,taskcancelled: active.get('taskcancelled') 
                    ,senttodoer: active.get('senttodoer') 
                    ,isdelegated: active.get('isdelegated') 
                    ,processstatus: active.get('processstatus') 
                    ,statetask: active.get('statetask') 
                    ,delegatefrom: active.get('delegatefrom') 
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
                    if(active.get('iu_taskid')==''){
               			active.set('iu_taskid',res.data['iu_taskid']);
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
                        url: rootURL+'index.php/c_v_autoiu_task/getRows?&filter=[{"property":"iu_taskid","value":"'+ active.get('iu_taskid') + '"}]',
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
        id:'iu_task',
        fieldDefaults: {
         labelAlign:  'right',
         labelWidth: 110
        },
        items: [
        { 
        xtype:'fieldset', 
        anchor:     '100%',
        id:'iu_task-0',
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
store: cmbstore_iu_u_def,
valueField:     'brief',
displayField:   'brief',
typeAhead: true,
emptyText:      '',
name:   'doer_grid',
itemId:   'doer_grid',
fieldLabel:  'Исполнитель',
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

xtype:  'combobox',
hideTrigger: true,
editable: false,
readOnly: true,
store: cmbstore_iu_u_def,
valueField:     'brief',
displayField:   'brief',
typeAhead: true,
emptyText:      '',
name:   'contoller_grid',
itemId:   'contoller_grid',
fieldLabel:  'Кто контролирует',
allowBlank:true
}
,
{
        minWidth: 720,
        x: 5, 
        y: 35, 
labelWidth:140,

xtype:  'textfield',
value:  '',
name:   'subj',
itemId:   'subj',
fieldLabel:  'Название',
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

xtype:  'datefield',
format:'d/m/Y H:i:s',
submitFormat:'Y-m-d H:i:s',
hideTrigger: true,
editable: false,
readOnly: true,
cls:'x-item-readonly',
value:  '',
name:   'createdate',
itemId:   'createdate',
fieldLabel:  'Дата создания',
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

xtype:  'datefield',
format:'d/m/Y H:i:s',
submitFormat:'Y-m-d H:i:s',
value:  '',
name:   'planenddate',
itemId:   'planenddate',
fieldLabel:  'Плановый срок',
allowBlank:true
}
,
{
        minWidth: 720,
        xtype: 'textarea', 
        x: 5, 
        y: 95, 
        height: 80, 
labelWidth:140,

value:  '',
name:   'info',
itemId:   'info',
fieldLabel:  'Описание',
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
        y: 185, 
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
name:   'manualtask_grid',
itemId:   'manualtask_grid',
listeners:{  select: function ( combo, records, eOpts ) {combo.up('form' ).activeRecord.set('manualtask', records[0].get('value'));}  },
fieldLabel:  'Выдана вручную',
allowBlank:true
}
,
{
        /* flex_field */ 
        minWidth: 365,
        width: 365,
        maxWidth: 365,
        x: 375, 
        y: 185, 
labelWidth:140,

xtype:  'combobox',
hideTrigger: true,
editable: false,
readOnly: true,
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
       ],
       height: 235 
        }
,
        { 
        xtype:'fieldset', 
        anchor: '100%',
        x: 0, 
        layout:'absolute', 
        id:'iu_task_1',
        title:      'Результат',
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
name:   'doer_comment',
itemId:   'doer_comment',
fieldLabel:  'Комментарий к задаче',
editable: false,
readOnly: true,
cls:'x-item-readonly',
allowBlank:true
}
,
{
        /* flex_field */ 
        minWidth: 735,
        width: 735,
        maxWidth: 735,
        x: 5, 
        y: 95, 
labelWidth:140,

xtype:  'combobox',
hideTrigger: true,
editable: false,
readOnly: true,
       cls:'x-item-readonly',
store: cmbstore_iud_sn_def,
valueField:     'brief',
displayField:   'brief',
typeAhead: true,
emptyText:      '',
name:   'doer_states_grid',
itemId:   'doer_states_grid',
fieldLabel:  'Статус',
allowBlank:true
}
,
{
        minWidth: 720,
        xtype: 'textarea', 
        x: 5, 
        y: 125, 
        height: 80, 
labelWidth:140,

value:  '',
name:   'controller_comment',
itemId:   'controller_comment',
fieldLabel:  'Комментарий контролера',
editable: false,
readOnly: true,
cls:'x-item-readonly',
allowBlank:true
}
       ], 
       height: 250 
        } // group
,
        { 
        xtype:'fieldset', 
        anchor: '100%',
        x: 0, 
        layout:'absolute', 
        id:'iu_task_2',
        title:      'Состояние',
        defaultType:  'textfield',
            items: [
{
        minWidth: 365,
        width: 365,
        maxWidth: 365,
        x: 5, 
        y: 5, 
labelWidth:140,

xtype:          'combobox',
editable: false,
       cls:'x-item-readonly',
readOnly: true,
hideTrigger: true,
store: enum_Boolean,
valueField:     'name',
displayField:   'name',
typeAhead: true,
queryMode:      'local',
emptyText:      '',
name:   'taskfinished_grid',
itemId:   'taskfinished_grid',
listeners:{  select: function ( combo, records, eOpts ) {combo.up('form' ).activeRecord.set('taskfinished', records[0].get('value'));}  },
fieldLabel:  'Завершена',
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

xtype:          'combobox',
editable: false,
       cls:'x-item-readonly',
readOnly: true,
hideTrigger: true,
store: enum_Boolean,
valueField:     'name',
displayField:   'name',
typeAhead: true,
queryMode:      'local',
emptyText:      '',
name:   'ischecked_grid',
itemId:   'ischecked_grid',
listeners:{  select: function ( combo, records, eOpts ) {combo.up('form' ).activeRecord.set('ischecked', records[0].get('value'));}  },
fieldLabel:  'Проверена',
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

xtype:  'datefield',
format:'d/m/Y H:i:s',
submitFormat:'Y-m-d H:i:s',
hideTrigger: true,
editable: false,
readOnly: true,
cls:'x-item-readonly',
value:  '',
name:   'finishdate',
itemId:   'finishdate',
fieldLabel:  'Дата завершения',
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

xtype:          'combobox',
editable: false,
       cls:'x-item-readonly',
readOnly: true,
hideTrigger: true,
store: enum_Boolean,
valueField:     'name',
displayField:   'name',
typeAhead: true,
queryMode:      'local',
emptyText:      '',
name:   'taskcancelled_grid',
itemId:   'taskcancelled_grid',
listeners:{  select: function ( combo, records, eOpts ) {combo.up('form' ).activeRecord.set('taskcancelled', records[0].get('value'));}  },
fieldLabel:  'Отменена',
allowBlank:true
}
,
{
xtype:  'hidden',
name:   'senttodoer',
fieldLabel:  'Отослано исполнителю'
}
,
{
xtype:  'hidden',
name:   'isdelegated',
fieldLabel:  'Делегирована'
}
       ], 
       height: 100 
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
function DefineForms_iu_task_edit(){


Ext.define('Form_iu_taskedit', {
extend:  'Ext.form.Panel',
alias: 'widget.f_iu_taskedit',
initComponent: function(){
    this.addEvents('create');
    Ext.apply(this,{
        activeRecord: null,
        defaultType:  'textfield',
        id:'iu_task',
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
        id:'iu_task-0',
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
store: cmbstore_iu_u_def,
valueField:     'brief',
displayField:   'brief',
typeAhead: true,
emptyText:      '',
name:   'doer_grid',
itemId:   'doer_grid',
fieldLabel:  'Исполнитель',
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

xtype:  'combobox',
hideTrigger: true,
editable: false,
readOnly: true,
store: cmbstore_iu_u_def,
valueField:     'brief',
displayField:   'brief',
typeAhead: true,
emptyText:      '',
name:   'contoller_grid',
itemId:   'contoller_grid',
fieldLabel:  'Кто контролирует',
allowBlank:true
       ,labelWidth: 120
}
,
{
        minWidth: 740,
        x: 5, 
        y: 46, 

xtype:  'textfield',
value:  '',
name:   'subj',
itemId:   'subj',
fieldLabel:  'Название',
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
        y: 92, 

xtype:  'datefield',
format:'d/m/Y H:i:s',
submitFormat:'Y-m-d H:i:s',
hideTrigger: true,
editable: false,
readOnly: true,
cls:'x-item-readonly',
value:  '',
name:   'createdate',
itemId:   'createdate',
fieldLabel:  'Дата создания',
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

xtype:  'datefield',
format:'d/m/Y H:i:s',
submitFormat:'Y-m-d H:i:s',
value:  '',
name:   'planenddate',
itemId:   'planenddate',
fieldLabel:  'Плановый срок',
allowBlank:true
       ,labelWidth: 120
}
,
{
        minWidth: 740,
        width: 740,
        xtype: 'textarea', 
        x: 5, 
        y: 138, 
        height: 80, 

value:  '',
name:   'info',
itemId:   'info',
fieldLabel:  'Описание',
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
        y: 228, 

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
name:   'manualtask_grid',
itemId:   'manualtask_grid',
listeners:{  select: function ( combo, records, eOpts ) {combo.up('form' ).activeRecord.set('manualtask', records[0].get('value'));}  },
fieldLabel:  'Выдана вручную',
allowBlank:true
       ,labelWidth: 120
}
,
{
        minWidth: 485,
        width: 485,
        maxWidth: 485,
        x: 255, 
        y: 228, 

xtype:  'combobox',
hideTrigger: true,
editable: false,
readOnly: true,
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
       ], width: 770,
       height: 304 
        }
,
        { 
        xtype:'panel', 
        id:'iu_task-1',
        title:      'Результат',
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
name:   'doer_comment',
itemId:   'doer_comment',
fieldLabel:  'Комментарий к задаче',
editable: false,
readOnly: true,
cls:'x-item-readonly',
allowBlank:true
       ,labelWidth: 120
}
,
{
        /* flex_field */ 
        minWidth: 745,
        width: 745,
        maxWidth: 745,
        x: 5, 
        y: 90, 

xtype:  'combobox',
hideTrigger: true,
editable: false,
readOnly: true,
       cls:'x-item-readonly',
store: cmbstore_iud_sn_def,
valueField:     'brief',
displayField:   'brief',
typeAhead: true,
emptyText:      '',
name:   'doer_states_grid',
itemId:   'doer_states_grid',
fieldLabel:  'Статус',
allowBlank:true
       ,labelWidth: 120
}
,
{
        minWidth: 740,
        maxWidth: 740,
        width: 740,
        xtype: 'textarea', 
        x: 5, 
        y: 136, 
        height: 80, 

value:  '',
name:   'controller_comment',
itemId:   'controller_comment',
fieldLabel:  'Комментарий контролера',
editable: false,
readOnly: true,
cls:'x-item-readonly',
allowBlank:true
       ,labelWidth: 120
}
       ], width: 760,
       height: 266 
        } //group
,
        { 
        xtype:'panel', 
        id:'iu_task-2',
        title:      'Состояние',
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

xtype:          'combobox',
editable: false,
       cls:'x-item-readonly',
readOnly: true,
hideTrigger: true,
store: enum_Boolean,
valueField:     'name',
displayField:   'name',
typeAhead: true,
queryMode:      'local',
emptyText:      '',
name:   'taskfinished_grid',
itemId:   'taskfinished_grid',
listeners:{  select: function ( combo, records, eOpts ) {combo.up('form' ).activeRecord.set('taskfinished', records[0].get('value'));}  },
fieldLabel:  'Завершена',
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

xtype:          'combobox',
editable: false,
       cls:'x-item-readonly',
readOnly: true,
hideTrigger: true,
store: enum_Boolean,
valueField:     'name',
displayField:   'name',
typeAhead: true,
queryMode:      'local',
emptyText:      '',
name:   'ischecked_grid',
itemId:   'ischecked_grid',
listeners:{  select: function ( combo, records, eOpts ) {combo.up('form' ).activeRecord.set('ischecked', records[0].get('value'));}  },
fieldLabel:  'Проверена',
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

xtype:  'datefield',
format:'d/m/Y H:i:s',
submitFormat:'Y-m-d H:i:s',
hideTrigger: true,
editable: false,
readOnly: true,
cls:'x-item-readonly',
value:  '',
name:   'finishdate',
itemId:   'finishdate',
fieldLabel:  'Дата завершения',
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

xtype:          'combobox',
editable: false,
       cls:'x-item-readonly',
readOnly: true,
hideTrigger: true,
store: enum_Boolean,
valueField:     'name',
displayField:   'name',
typeAhead: true,
queryMode:      'local',
emptyText:      '',
name:   'taskcancelled_grid',
itemId:   'taskcancelled_grid',
listeners:{  select: function ( combo, records, eOpts ) {combo.up('form' ).activeRecord.set('taskcancelled', records[0].get('value'));}  },
fieldLabel:  'Отменена',
allowBlank:true
       ,labelWidth: 120
}
,
,
{
          xtype:  'hidden',
          name:   'senttodoer',
          fieldLabel:  'Отослано исполнителю'
}
,
,
{
          xtype:  'hidden',
          name:   'isdelegated',
          fieldLabel:  'Делегирована'
}
       ], width: 760,
       height: 132 
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
                url: rootURL+'index.php/c_iu_task/setRow',
                method:  'POST',
                params: { 
                    instanceid: this.instanceid
                    ,iu_taskid: active.get('iu_taskid')
                    ,doer: active.get('doer') 
                    ,contoller: active.get('contoller') 
                    ,subj: active.get('subj') 
                    ,createdate:function() { if(active.get('createdate')) return active.get('createdate').toLocaleFormat('%Y-%m-%d %H:%M:%S'); else return null;}()
                    ,planenddate:function() { if(active.get('planenddate')) return active.get('planenddate').toLocaleFormat('%Y-%m-%d %H:%M:%S'); else return null;}()
                    ,info: active.get('info') 
                    ,manualtask: active.get('manualtask') 
                    ,theprocess: active.get('theprocess') 
                    ,doer_comment: active.get('doer_comment') 
                    ,doer_states: active.get('doer_states') 
                    ,controller_comment: active.get('controller_comment') 
                    ,taskfinished: active.get('taskfinished') 
                    ,ischecked: active.get('ischecked') 
                    ,finishdate:function() { if(active.get('finishdate')) return active.get('finishdate').toLocaleFormat('%Y-%m-%d %H:%M:%S'); else return null;}()
                    ,taskcancelled: active.get('taskcancelled') 
                    ,senttodoer:function() { if(active.get('senttodoer')) return active.get('senttodoer').toLocaleFormat('%Y-%m-%d %H:%M:%S'); else return null;}()
                    ,isdelegated: active.get('isdelegated') 
                    ,processstatus: active.get('processstatus') 
                    ,statetask: active.get('statetask') 
                    ,delegatefrom: active.get('delegatefrom') 
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
                    if(active.get('iu_taskid')==''){
               			active.set('iu_taskid',res.data['iu_taskid']);
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
        if(this.activeRecord.get('iu_taskid')==''){
                this.activeRecord.store.reload();
        }
        this.setActiveRecord(null,null);
        this.ownerCt.close();
    }
}); // 'Ext.Define

Ext.define('EditWindow_iu_taskedit', {
    extend:  'Ext.window.Window',
    maxHeight: 817,
    maxWidth: 900,
    autoScroll:true,
    minWidth: 750,
    width: 800,
    minHeight:670,
    height:670,
    constrainHeader :true,
    layout:  'absolute',
    autoShow: true,
    modal: true,
    closable: false,
    closeAction: 'destroy',
    iconCls:  'icon-application_form',
    title:  'Задача',
    items:[{
        xtype:  'f_iu_taskedit'
	}]
	});
}
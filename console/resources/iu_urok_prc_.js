
Ext.require([
'Ext.form.*'
]);

function DefineInterface_iu_urok_prc_(id,mystore,selection){

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
                url: rootURL+'index.php/c_iu_urok_prc/setRow',
                method:  'POST',
                params: { 
                    instanceid: p1.instanceid
                    ,iu_urok_prcid: active.get('iu_urok_prcid')
                    ,theprocess: active.get('theprocess') 
                    ,topstage: active.get('topstage') 
                    ,iu_urok_stage: active.get('iu_urok_stage') 
                    ,isdone: active.get('isdone') 
                    ,laststate: active.get('laststate') 
                    ,lastmessage: active.get('lastmessage') 
                    ,manualcontrol: active.get('manualcontrol') 
                    ,taskdelayed: active.get('taskdelayed') 
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
                    if(active.get('iu_urok_prcid')==''){
               			active.set('iu_urok_prcid',res.data['iu_urok_prcid']);
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
                        url: rootURL+'index.php/c_v_autoiu_urok_prc/getRows?&filter=[{"property":"iu_urok_prcid","value":"'+ active.get('iu_urok_prcid') + '"}]',
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
        id:'iu_urok_prc',
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
        id:'iu_urok_prc_0',
        title:      'Ссылки',
        defaultType:  'textfield',
            items: [
{
        minWidth: 365,
        width: 365,
        maxWidth: 365,
        x: 5, 
        y: 5, 
labelWidth:140,

xtype:  'combobox',
trigger1Cls:        'x-form-clear-trigger', 
trigger2Cls:        'x-form-select-trigger', 
hideTrigger1:false, 
hideTrigger2:false, 
onTrigger1Click : function(){
		this.collapse();
		this.clearValue();
		this.up('form' ).activeRecord.set('theprocess',null );
},
onTrigger2Click : function(){ 
		if(this.isExpanded) {
			this.collapse(); 
		}else{ 
			if(this.store.count(false)==0) this.store.load();
			this.expand();
		}
},
editable: false,
listeners:{  select: function ( combo, records, eOpts ) {combo.up('form' ).activeRecord.set('theprocess', records[0].get('id'));}  },
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
       height: 70 
        } // group
,
        { 
        xtype:'fieldset', 
        anchor: '100%',
        x: 0, 
        layout:'absolute', 
        id:'iu_urok_prc_1',
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

xtype:  'combobox',
hideTrigger: true,
editable: false,
readOnly: true,
       cls:'x-item-readonly',
store: cmbstore_iud_stagedef,
valueField:     'brief',
displayField:   'brief',
typeAhead: true,
emptyText:      '',
name:   'topstage_grid',
itemId:   'topstage_grid',
fieldLabel:  'Этап',
allowBlank:true
}
,
{
        /* flex_field */ 
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
       cls:'x-item-readonly',
store: cmbstore_iu_status,
valueField:     'brief',
displayField:   'brief',
typeAhead: true,
emptyText:      '',
name:   'iu_urok_stage_grid',
itemId:   'iu_urok_stage_grid',
fieldLabel:  'Подэтап',
allowBlank:true
}
,
{
xtype:  'hidden',
name:   'isdone',
fieldLabel:  'Завершен'
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
trigger1Cls:        'x-form-clear-trigger', 
trigger2Cls:        'x-form-select-trigger', 
hideTrigger1:false, 
hideTrigger2:false, 
onTrigger1Click : function(){
		this.collapse();
		this.clearValue();
		this.up('form' ).activeRecord.set('laststate',null );
},
onTrigger2Click : function(){ 
		if(this.isExpanded) {
			this.collapse(); 
		}else{ 
			if(this.store.count(false)==0) this.store.load();
			this.expand();
		}
},
editable: false,
listeners:{  select: function ( combo, records, eOpts ) {combo.up('form' ).activeRecord.set('laststate', records[0].get('id'));}  },
store: cmbstore_iud_sn_def,
valueField:     'brief',
displayField:   'brief',
typeAhead: true,
emptyText:      '',
name:   'laststate_grid',
itemId:   'laststate_grid',
fieldLabel:  'Последний статус',
allowBlank:true
}
,
{
        minWidth: 720,
        xtype: 'textarea', 
        x: 5, 
        y: 65, 
        height: 80, 
labelWidth:140,

value:  '',
name:   'lastmessage',
itemId:   'lastmessage',
fieldLabel:  'Последнее сообщение',
editable: false,
readOnly: true,
cls:'x-item-readonly',
allowBlank:true
}
       ], 
       height: 190 
        } // group
,
        { 
        xtype:'fieldset', 
        anchor: '100%',
        x: 0, 
        layout:'absolute', 
        id:'iu_urok_prc_2',
        title:      'Управление',
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
store: enum_Boolean,
valueField:     'name',
displayField:   'name',
typeAhead: true,
queryMode:      'local',
emptyText:      '',
name:   'manualcontrol_grid',
itemId:   'manualcontrol_grid',
listeners:{  select: function ( combo, records, eOpts ) {combo.up('form' ).activeRecord.set('manualcontrol', records[0].get('value'));}  },
fieldLabel:  'Требуется управление',
labelClsExtra:'x-item-mandatory',
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

xtype:  'numberfield',
value:  '0',
name:   'taskdelayed',
itemId:   'taskdelayed',
fieldLabel:  'Опаздание',
allowBlank:true
}
       ], 
       height: 70 
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
function DefineForms_iu_urok_prc_(){


Ext.define('Form_iu_urok_prc', {
extend:  'Ext.form.Panel',
alias: 'widget.f_iu_urok_prc',
initComponent: function(){
    this.addEvents('create');
    Ext.apply(this,{
        activeRecord: null,
        defaultType:  'textfield',
        id:'iu_urok_prc',
        x: 0, 
        fieldDefaults: {
         labelAlign:  'top' //,
        },
        items: [
        { 
        xtype:'panel', 
        id:'iu_urok_prc-0',
        title:      'Ссылки',
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

xtype:  'combobox',
trigger1Cls:        'x-form-clear-trigger', 
trigger2Cls:        'x-form-select-trigger', 
hideTrigger1:false, 
hideTrigger2:false, 
onTrigger1Click : function(){
		this.collapse();
		this.clearValue();
		this.up('form' ).activeRecord.set('theprocess',null );
},
onTrigger2Click : function(){ 
		if(this.isExpanded) {
			this.collapse(); 
		}else{ 
			if(this.store.count(false)==0) this.store.load();
			this.expand();
		}
},
editable: false,
listeners:{  select: function ( combo, records, eOpts ) {combo.up('form' ).activeRecord.set('theprocess', records[0].get('id'));}  },
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
       ], width: 760,
       height: 86 
        } //group
,
        { 
        xtype:'panel', 
        id:'iu_urok_prc-1',
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

xtype:  'combobox',
hideTrigger: true,
editable: false,
readOnly: true,
       cls:'x-item-readonly',
store: cmbstore_iud_stagedef,
valueField:     'brief',
displayField:   'brief',
typeAhead: true,
emptyText:      '',
name:   'topstage_grid',
itemId:   'topstage_grid',
fieldLabel:  'Этап',
allowBlank:true
       ,labelWidth: 120
}
,
{
        /* flex_field */ 
        minWidth: 495,
        width: 495,
        maxWidth: 495,
        x: 255, 
        y: 0, 

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
name:   'iu_urok_stage_grid',
itemId:   'iu_urok_stage_grid',
fieldLabel:  'Подэтап',
allowBlank:true
       ,labelWidth: 120
}
,
,
{
          xtype:  'hidden',
          name:   'isdone',
          fieldLabel:  'Завершен'
}
,
{
        minWidth: 220,
        width: 220,
        maxWidth: 220,
        x: 5, 
        y: 46, 

xtype:  'combobox',
trigger1Cls:        'x-form-clear-trigger', 
trigger2Cls:        'x-form-select-trigger', 
hideTrigger1:false, 
hideTrigger2:false, 
onTrigger1Click : function(){
		this.collapse();
		this.clearValue();
		this.up('form' ).activeRecord.set('laststate',null );
},
onTrigger2Click : function(){ 
		if(this.isExpanded) {
			this.collapse(); 
		}else{ 
			if(this.store.count(false)==0) this.store.load();
			this.expand();
		}
},
editable: false,
listeners:{  select: function ( combo, records, eOpts ) {combo.up('form' ).activeRecord.set('laststate', records[0].get('id'));}  },
store: cmbstore_iud_sn_def,
valueField:     'brief',
displayField:   'brief',
typeAhead: true,
emptyText:      '',
name:   'laststate_grid',
itemId:   'laststate_grid',
fieldLabel:  'Последний статус',
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
        y: 92, 
        height: 80, 

value:  '',
name:   'lastmessage',
itemId:   'lastmessage',
fieldLabel:  'Последнее сообщение',
editable: false,
readOnly: true,
cls:'x-item-readonly',
allowBlank:true
       ,labelWidth: 120
}
       ], width: 760,
       height: 222 
        } //group
,
        { 
        xtype:'panel', 
        id:'iu_urok_prc-2',
        title:      'Управление',
        defaultType:  'textfield',
        closable:false,
        collapsible:true,
        collapsed:true,
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
store: enum_Boolean,
valueField:     'name',
displayField:   'name',
typeAhead: true,
queryMode:      'local',
emptyText:      '',
name:   'manualcontrol_grid',
itemId:   'manualcontrol_grid',
listeners:{  select: function ( combo, records, eOpts ) {combo.up('form' ).activeRecord.set('manualcontrol', records[0].get('value'));}  },
fieldLabel:  'Требуется управление',
labelClsExtra:'x-item-mandatory',
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

xtype:  'numberfield',
value:  '0',
name:   'taskdelayed',
itemId:   'taskdelayed',
fieldLabel:  'Опаздание',
allowBlank:true
       ,labelWidth: 120
}
       ], width: 760,
       height: 86 
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
                url: rootURL+'index.php/c_iu_urok_prc/setRow',
                method:  'POST',
                params: { 
                    instanceid: this.instanceid
                    ,iu_urok_prcid: active.get('iu_urok_prcid')
                    ,theprocess: active.get('theprocess') 
                    ,topstage: active.get('topstage') 
                    ,iu_urok_stage: active.get('iu_urok_stage') 
                    ,isdone: active.get('isdone') 
                    ,laststate: active.get('laststate') 
                    ,lastmessage: active.get('lastmessage') 
                    ,manualcontrol: active.get('manualcontrol') 
                    ,taskdelayed: active.get('taskdelayed') 
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
                    if(active.get('iu_urok_prcid')==''){
               			active.set('iu_urok_prcid',res.data['iu_urok_prcid']);
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
        if(this.activeRecord.get('iu_urok_prcid')==''){
                this.activeRecord.store.reload();
        }
        this.setActiveRecord(null,null);
        this.ownerCt.close();
    }
}); // 'Ext.Define

Ext.define('EditWindow_iu_urok_prc', {
    extend:  'Ext.window.Window',
    maxHeight: 509,
    maxWidth: 900,
    autoScroll:true,
    minWidth: 750,
    width: 800,
    minHeight:479,
    height:479,
    constrainHeader :true,
    layout:  'absolute',
    autoShow: true,
    modal: true,
    closable: false,
    closeAction: 'destroy',
    iconCls:  'icon-application_form',
    title:  'Текущий этап',
    items:[{
        xtype:  'f_iu_urok_prc'
	}]
	});
}
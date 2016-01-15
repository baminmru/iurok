
Ext.require([
'Ext.form.*'
]);

function DefineInterface_iu_stage_info_(id,mystore,selection){

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
            Ext.Ajax.request({
                url: 'index.php/c_iu_stage_info/setRow',
                method:  'POST',
                params: { 
                    instanceid: p1.instanceid
                    ,iu_stage_infoid: active.get('iu_stage_infoid')
                    ,thestatus: active.get('thestatus') 
                    ,doerallowed: active.get('doerallowed') 
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
                        p1_saved=false;
	            }else{
                    if(active.get('iu_stage_infoid')==''){
               			active.set('iu_stage_infoid',res.data['iu_stage_infoid']);
                    }
        		    Ext.MessageBox.show({
                        title:  'Подтверждение',
                        msg:    'Изменения сохранены',
                        buttons: Ext.MessageBox.OK,
                        icon:   Ext.MessageBox.INFO
        		    });
                    p1_saved=true;
                   if(selection){
                     Ext.Ajax.request({
                        url:        'index.php/c_v_autoiu_stage_info/getRows?&filter=[{"property":"iu_stage_infoid","value":"'+ active.get('iu_stage_infoid') + '"}]',
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
        id:'iu_stage_info-0',
        x: 0, 
        border:1, 
        layout:'absolute', 
        items: [
{
        minWidth: 370,
        width: 370,
        maxWidth: 370,
        x: 5, 
        y: 5, 
labelWidth:140,

editable: false,
listeners:{  select: function ( combo, records, eOpts ) {combo.up('form' ).activeRecord.set('thestatus', records[0].get('id'));}  },
xtype:  'combobox',
store: cmbstore_iu_status,
valueField:     'brief',
displayField:   'brief',
typeAhead: true,
emptyText:      '',
name:   'thestatus_grid',
itemId:   'thestatus_grid',
fieldLabel:  'Статус',
labelClsExtra:'x-item-mandatory',
allowBlank:false
}
,
{
        minWidth: 370,
        width: 370,
        maxWidth: 370,
        x: 380, 
        y: 5, 
labelWidth:140,

xtype:  'textfield',
value:  '',
name:   'doerallowed',
itemId:   'doerallowed',
fieldLabel:  'Описание',
labelClsExtra:'x-item-mandatory',
allowBlank:false
}
       ],
       height: 50 
        }
          ],//items = part panel
        instanceid:''
        ,dockedItems: [{
            xtype:  'toolbar',
            dock:   'bottom',
            ui:     'footer',
                items: ['->', {
                    iconCls:  'icon-accept',
                    itemId:  'save',
                    text:   'Сохранить',
                    disabled:true,
                    scope:  this,
                    handler : onSave1
                }
               , {
                    iconCls:  'icon-application_put',
                    text:   'Сохранить и Закрыть',
                    scope:  this,
                    handler : onSave2
                }
              ]
            }] // dockedItems
    ,setActiveRecord: function(record,instid){
        p1.activeRecord = record;
        p1.instanceid = instid;
        if (record) {
            p1.down('#save').enable();
            p1.getForm().loadRecord(record);
            p1_valid =p1.getForm().isValid();
        } else {
            p1.down('#save').disable();
            p1.getForm().reset();
        }
    }
}); // 'Ext.Define

return p1;
};
function DefineForms_iu_stage_info_(){


Ext.define('Form_iu_stage_info', {
extend:  'Ext.form.Panel',
alias: 'widget.f_iu_stage_info',
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
        xtype:'fieldset', 
        id:'iu_stage_info-0',
        layout:'absolute', 
        border:false, 
        items: [
{
        minWidth: 220,
        width: 220,
        maxWidth: 220,
        x: 5, 
        y: 0, 

editable: false,
listeners:{  select: function ( combo, records, eOpts ) {combo.up('form' ).activeRecord.set('thestatus', records[0].get('id'));}  },
xtype:  'combobox',
store: cmbstore_iu_status,
valueField:     'brief',
displayField:   'brief',
typeAhead: true,
emptyText:      '',
name:   'thestatus_grid',
itemId:   'thestatus_grid',
fieldLabel:  'Статус',
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

xtype:  'textfield',
value:  '',
name:   'doerallowed',
itemId:   'doerallowed',
fieldLabel:  'Описание',
labelClsExtra:'x-item-mandatory',
allowBlank:false
       ,labelWidth: 120
}
       ], width: 760,
       height: 86 
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
            var form_values = form.getValues(); var field_name = '';  for(field_name in form_values){active.set(field_name, form_values[field_name]);}
            Ext.Ajax.request({
                url: 'index.php/c_iu_stage_info/setRow',
                method:  'POST',
                params: { 
                    instanceid: this.instanceid
                    ,iu_stage_infoid: active.get('iu_stage_infoid')
                    ,thestatus: active.get('thestatus') 
                    ,doerallowed: active.get('doerallowed') 
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
	            }else{
                    if(active.get('iu_stage_infoid')==''){
               			active.set('iu_stage_infoid',res.data['iu_stage_infoid']);
                    }
        		    Ext.MessageBox.show({
                        title:  'Подтверждение',
                        msg:    'Изменения сохранены',
                        buttons: Ext.MessageBox.OK,
                        icon:   Ext.MessageBox.INFO
        		    });
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
        if(this.activeRecord.get('iu_stage_infoid')==''){
                this.activeRecord.store.reload();
        }
        this.setActiveRecord(null,null);
        this.ownerCt.close();
    }
}); // 'Ext.Define

Ext.define('EditWindow_iu_stage_info', {
    extend:  'Ext.window.Window',
    maxHeight: 191,
    maxWidth: 790,
    minHeight:146,
    minWidth: 790,
    width: 790,
    constrainHeader :true,
    layout:  'absolute',
    autoShow: true,
    modal: true,
    closable: false,
    closeAction: 'destroy',
    iconCls:  'icon-application_form',
    title:  'Описание стадии',
    items:[{
        xtype:  'f_iu_stage_info'
	}]
	});
}
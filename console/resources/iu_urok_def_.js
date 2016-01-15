
Ext.require([
'Ext.form.*'
]);

function DefineInterface_iu_urok_def_(id,mystore,selection){

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
                url: rootURL+'index.php/c_iu_urok_def/setRow',
                method:  'POST',
                params: { 
                    instanceid: p1.instanceid
                    ,iu_urok_defid: active.get('iu_urok_defid')
                    ,ucode: active.get('ucode') 
                    ,datecreated: function() { if(active.get('datecreated')) return active.get('datecreated').toLocaleFormat('%Y-%m-%d %H:%M:%S'); else { var cd=new Date(); return cd.toLocaleFormat('%Y-%m-%d %H:%M:%S');}}()
                    ,subject: active.get('subject') 
                    ,theclassnum: active.get('theclassnum') 
                    ,plannum: active.get('plannum') 
                    ,maketown: active.get('maketown') 
		,actiondate: function() { if(active.get('actiondate')) return active.get('actiondate').toLocaleFormat('%Y-%m-%d %H:%M:%S'); else return null;}()
		,actiondate2: function() { if(active.get('actiondate2')) return active.get('actiondate2').toLocaleFormat('%Y-%m-%d %H:%M:%S'); else return null;}() 
                    ,coursetype: active.get('coursetype') 
                    ,rtheme: active.get('rtheme') 
                    ,classtheme: active.get('classtheme') 
                    ,thequarter: active.get('thequarter') 
                    ,schooldate: form.getValues()['schooldate'] 
                    ,curator: active.get('curator') 
                    ,theteacher: active.get('theteacher') 
                    ,methodist: active.get('methodist') 
                    ,methodist2: active.get('methodist2') 
                    ,processtype: active.get('processtype') 
                    ,ckksn: active.get('ckksn') 
                    ,testpageref: active.get('testpageref') 
                    ,pubstate: active.get('pubstate') 
                    ,mainref: active.get('mainref') 
                    ,thefilm: active.get('thefilm') 
                    ,thefilmurl: active.get('thefilmurl') 
                    ,info: active.get('info') 
                    ,notes: active.get('notes') 
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
                    if(active.get('iu_urok_defid')==''){
               			active.set('iu_urok_defid',res.data['iu_urok_defid']);
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
                        url:        rootURL+'index.php/c_v_autoiu_urok_def/getRows?&filter=[{"property":"iu_urok_defid","value":"'+ active.get('iu_urok_defid') + '"}]',
                        method:     'GET',
                        success: function(response){
                            var data = Ext.decode(response.responseText);
                            selection.set(data.rows[0]);
                            selection.commit();
                        }
                     });
                   }
                    if (close_after_save) { if (typeof(callaftersave) == 'function') callaftersave(); if(p1.up('window')) p1.up('window').close(); }
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
        id:'iu_urok_def',
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
        id:'iu_urok_def_0',
        title:      'Информация',
        defaultType:  'textfield',
            items: [
{
        minWidth: 300,
        width: 300,
        maxWidth: 300,
        x: 5, 
        y: 5, 
labelWidth:140,

xtype:  'textfield',
value:  '',
name:   'ucode',
itemId:   'ucode',
fieldLabel:  'Код урока',
editable: false,
readOnly: true,
allowBlank:true
}

,{
				   
		x: 310, 
		y: 5, 
		height:25,
		xtype:  'button',
		iconCls:'icon-comment_dull',
		text:'К странице',
		handler: function(){
			var url=this.up('form' ).activeRecord.get('ucode');

			if(url!=''){
			
					window.open(rootURL+'?id='+url,'_blank','Страница урока');
			}
				
		}

},
{
        minWidth: 365,
        width: 365,
        maxWidth: 365,
        x: 375, 
        y: 5, 
labelWidth:140,

xtype:  'datefield',
format:'d/m/Y H:i:s',
submitFormat:'Y-m-d H:i:s',
hideTrigger: true,
editable: false,
readOnly: true,
value:  '',
name:   'datecreated',
itemId:   'datecreated',
fieldLabel:  'Дата создания',
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
trigger1Cls:        'x-form-select-trigger', 
hideTrigger1:false, 
onTrigger1Click : function(){ 
		if(this.isExpanded) {
			this.collapse(); 
		}else{ 
			if(this.store.count(false)==0) this.store.load();
			this.expand();
		}
},
editable: true,
enableRegEx: true,
queryMode:'local',
listeners:{  
select: function ( combo, records, eOpts ) {
	combo.up('form' ).activeRecord.set('subject', records[0].get('id'));
	combo.up('form' ).activeRecord.set('subject_grid', combo.getValue());
	
} ,
focus: function()   {  this.store.load();  }
 },
store: cmbstore_iud_predmet,
valueField:     'brief',
displayField:   'brief',
typeAhead: true,
emptyText:      '',
name:   'subject_grid',
itemId:   'subject_grid',
fieldLabel:  'Предмет',
labelClsExtra:'x-item-mandatory',
allowBlank:false
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
trigger1Cls:        'x-form-select-trigger', 
hideTrigger1:false, 
onTrigger1Click : function(){ 
		if(this.isExpanded) {
			this.collapse(); 
		}else{ 
			if(this.store.count(false)==0) this.store.load();
			this.expand();
		}
},
editable: true,
enableRegEx: true,
queryMode:'local',
listeners:{  select: function ( combo, records, eOpts ) {combo.up('form' ).activeRecord.set('theclassnum', records[0].get('id'));} ,focus: function()   {  this.store.load();  } },
store: cmbstore_iu_clsinfo,
valueField:     'brief',
displayField:   'brief',
typeAhead: true,
emptyText:      '',
name:   'theclassnum_grid',
itemId:   'theclassnum_grid',
fieldLabel:  'Класс',
labelClsExtra:'x-item-mandatory',
allowBlank:false
}
,
{
        minWidth: 365,
        width: 365,
        maxWidth: 365,
        x: 5, 
        y: 65, 
labelWidth:140,

xtype:  'textfield',
value:  '',
name:   'plannum',
itemId:   'plannum',
fieldLabel:  'Номер по плану',
labelClsExtra:'x-item-mandatory',
allowBlank:false
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
trigger1Cls:        'x-form-clear-trigger', 
trigger2Cls:        'x-form-select-trigger', 
hideTrigger1:false, 
hideTrigger2:false, 
onTrigger1Click : function(){
		this.collapse();
		this.clearValue();
		this.up('form' ).activeRecord.set('maketown',null );
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
listeners:{  select: function ( combo, records, eOpts ) {combo.up('form' ).activeRecord.set('maketown', records[0].get('id'));}  },
store: cmbstore_iud_town,
valueField:     'brief',
displayField:   'brief',
typeAhead: true,
emptyText:      '',
name:   'maketown_grid',
itemId:   'maketown_grid',
fieldLabel:  'Город съемки',
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

xtype:  'datefield',
format:'d/m/Y',
submitFormat:'Y-m-d H:i:s',
value:  '',
name:   'actiondate',
itemId:   'actiondate',
fieldLabel:  'Дата съемки',
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

xtype:  'datefield',
format:'d/m/Y',
submitFormat:'Y-m-d H:i:s',
value:  '',
name:   'actiondate2',
itemId:   'actiondate2',
fieldLabel:  'Дата досъема',
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
trigger1Cls:        'x-form-clear-trigger', 
trigger2Cls:        'x-form-select-trigger', 
hideTrigger1:false, 
hideTrigger2:false, 
onTrigger1Click : function(){
		this.collapse();
		this.clearValue();
		this.up('form' ).activeRecord.set('coursetype',null );
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
listeners:{  select: function ( combo, records, eOpts ) {combo.up('form' ).activeRecord.set('coursetype', records[0].get('id'));}  },
store: cmbstore_iud_ctype,
valueField:     'brief',
displayField:   'brief',
typeAhead: true,
emptyText:      '',
name:   'coursetype_grid',
itemId:   'coursetype_grid',
fieldLabel:  'Тип курса',
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
name:   'rtheme',
itemId:   'rtheme',
fieldLabel:  'Тема раздела',
allowBlank:true
}
,
{
        minWidth: 735,
        x: 5, 
        y: 155, 
labelWidth:140,

xtype:  'textfield',
value:  '',
name:   'classtheme',
itemId:   'classtheme',
fieldLabel:  'Тема урока',
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
trigger1Cls:        'x-form-clear-trigger', 
trigger2Cls:        'x-form-select-trigger', 
hideTrigger1:false, 
hideTrigger2:false, 
onTrigger1Click : function(){
		this.collapse();
		this.clearValue();
},
onTrigger2Click : function(){ 
		if(this.isExpanded) {
			this.collapse(); 
		}else{ 
			this.expand();
		}
},
store: enum_Quarter,
valueField:     'name',
displayField:   'name',
typeAhead: true,
queryMode:      'local',
emptyText:      '',
name:   'thequarter_grid',
itemId:   'thequarter_grid',
listeners:{  select: function ( combo, records, eOpts ) {combo.up('form' ).activeRecord.set('thequarter', records[0].get('value'));}  },
fieldLabel:  'Четверть',
allowBlank:true
}
,
{
        minWidth: 365,
        width: 365,
        maxWidth: 365,
        x: 375, 
        y: 185, 
labelWidth:140,

xtype:  'datefield',
format:'F, d',
submitFormat:'F, d',
value:  '',
name:   'schooldate',
itemId:   'schooldate',
fieldLabel:  'Дата в школе',
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
        id:'iu_urok_def_1',
        title:      'Персонал',
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
trigger1Cls:        'x-form-select-trigger', 
hideTrigger1:false, 
onTrigger1Click : function(){ 
		if(this.isExpanded) {
			this.collapse(); 
		}else{ 
			if(this.store.count(false)==0) this.store.load();
			this.expand();
		}
},
editable: true,
enableRegEx: true,
queryMode:'local',
listeners:{  select: function ( combo, records, eOpts ) {combo.up('form' ).activeRecord.set('curator', records[0].get('id'));} ,focus: function()   {  this.store.load();  } },
store: cmbstore_iu_u_def,
valueField:     'brief',
displayField:   'brief',
typeAhead: true,
emptyText:      '',
name:   'curator_grid',
itemId:   'curator_grid',
fieldLabel:  'Куратор',
allowBlank: false
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
trigger1Cls:        'x-form-clear-trigger', 
trigger2Cls:        'x-form-select-trigger', 
hideTrigger1:false, 
hideTrigger2:false, 
onTrigger1Click : function(){
		this.collapse();
		this.clearValue();
		this.up('form' ).activeRecord.set('theteacher',null );
},
onTrigger2Click : function(){ 
		if(this.isExpanded) {
			this.collapse(); 
		}else{ 
			if(this.store.count(false)==0) this.store.load();
			this.expand();
		}
},
trigger3Cls:        'x-form-add-trigger', 
hideTrigger3:false, 
onTrigger3Click : function(){ 
onAddTeacher(this); 
},
editable: true,
enableRegEx: true,
queryMode:'local',
listeners:{  
select: function ( combo, records, eOpts ) {combo.up('form' ).activeRecord.set('theteacher', records[0].get('id'));} ,
focus: function(combo,record)   { 
  this.store.load({params:{subject:combo.up('form' ).activeRecord.get('subject_grid')}});
 } 
},
store: cmbstore_teacher_subj,
valueField:     'brief',
displayField:   'brief',
typeAhead: true,
emptyText:      '',
name:   'theteacher_grid',
itemId:   'theteacher_grid',
fieldLabel:  'Учитель',
allowBlank:false
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
		this.up('form' ).activeRecord.set('methodist',null );
},
onTrigger2Click : function(){ 
		if(this.isExpanded) {
			this.collapse(); 
		}else{ 
			if(this.store.count(false)==0) this.store.load();
			this.expand();
		}
},
trigger3Cls:        'x-form-add-trigger', 
hideTrigger3:false, 
onTrigger3Click : function(){ 
onAddMethodist(this); 
},
editable: true,
enableRegEx: true,
queryMode:'local',
listeners:{  
select: function ( combo, records, eOpts ) {combo.up('form' ).activeRecord.set('methodist', records[0].get('id'));} ,
focus: function(combo,record)   { 
  this.store.load({params:{subject:combo.up('form' ).activeRecord.get('subject_grid'),metodist:-1}});
 } 
},
store: cmbstore_metodist_subj,
valueField:     'brief',
displayField:   'brief',
typeAhead: true,
emptyText:      '',
name:   'methodist_grid',
itemId:   'methodist_grid',
fieldLabel:  'Методист',
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
trigger1Cls:        'x-form-clear-trigger', 
trigger2Cls:        'x-form-select-trigger', 
hideTrigger1:false, 
hideTrigger2:false, 
onTrigger1Click : function(){
		this.collapse();
		this.clearValue();
		this.up('form' ).activeRecord.set('methodist2',null );
},
onTrigger2Click : function(){ 
		if(this.isExpanded) {
			this.collapse(); 
		}else{ 
			if(this.store.count(false)==0) this.store.load();
			this.expand();
		}
},
trigger3Cls:        'x-form-add-trigger', 
hideTrigger3:false, 
onTrigger3Click : function(){ 
onAddMethodist2(this); 
},
editable: true,
enableRegEx: true,
queryMode:'local',
listeners:{  
select: function ( combo, records, eOpts ) {combo.up('form' ).activeRecord.set('methodist2', records[0].get('id'));} ,
focus: function(combo,record)   { 
  this.store.load({params:{subject:combo.up('form' ).activeRecord.get('subject_grid'),metodist:-1}});
 } 
},
store: cmbstore_metodist_subj,
valueField:     'brief',
displayField:   'brief',
typeAhead: true,
emptyText:      '',
name:   'methodist2_grid',
itemId:   'methodist2_grid',
fieldLabel:  'Методист 2',
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
        id:'iu_urok_def_2',
        title:      'Состояние',
        defaultType:  'textfield',
            items: [
{
        /* flex_field */ 
        minWidth: 365,
        width: 365,
        maxWidth: 365,
        x: 5, 
        y: 0, 

xtype:  'combobox',
hideTrigger: true,
editable: false,
readOnly: true,
store: cmbstore_iud_process_def,
valueField:     'brief',
displayField:   'brief',
typeAhead: true,
emptyText:      '',
name:   'processtype_grid',
itemId:   'processtype_grid',
fieldLabel:  'Тип процесса',
labelClsExtra:'x-item-mandatory',
allowBlank:false
       ,labelWidth: 140
}
,
{
        minWidth: 365,
        width: 365,
        maxWidth:365,
        x: 375, 
        y: 0, 

xtype:  'textfield',
value:  '',
name:   'laststate_grid',
itemId:   'laststate_grid',
fieldLabel:  'Текущий статус',
editable: false,
readOnly: true,
allowBlank:true
       ,labelWidth: 140
},
{
        /* flex_field */ 
        minWidth: 735,
        width: 735,
        maxWidth: 735,
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
		this.up('form' ).activeRecord.set('ckksn',null );
},
onTrigger2Click : function(){ 
		if(this.isExpanded) {
			this.collapse(); 
		}else{ 
			if(this.store.count(false)==0) this.store.load();
			this.expand();
		}
},
editable: true,
enableRegEx: true,
queryMode:'local',
listeners:{  select: function ( combo, records, eOpts ) {combo.up('form' ).activeRecord.set('ckksn', records[0].get('id'));} ,focus: function()   {  this.store.load();  } },
store: cmbstore_iud_sn_def_final,
valueField:     'brief',
displayField:   'brief',
typeAhead: true,
emptyText:      '',
name:   'ckksn_grid',
itemId:   'ckksn_grid',
fieldLabel:  'Финальный статус',
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
        id:'iu_urok_def_3',
        title:      'Ссылки',
        defaultType:  'textfield',
            items: [
			{
        /* flex_field */ 
        minWidth: 670,
        width: 670,
        maxWidth: 670,
					x: 5, 
					y: 5, 
			labelWidth:140,

			xtype:  'textfield',
			value:  '',
			name:   'testpageref',
			itemId:   'testpageref',
			fieldLabel:  'Тестовая',
			allowBlank:true
			},
{
				   
					x: 680, 
					y: 5, 
					height:25,
					xtype:  'button',
					iconCls:'icon-film_link',
					text:'Открыть',
					handler: function(){
						var params = "menubar=yes,location=yes,resizable=yes,scrollbars=yes,status=yes";
						var url=this.up('form' ).down('#testpageref').getValue();
						if(url!='')
							window.open(url,'_blank',params);
					}

			},
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
		this.up('form' ).activeRecord.set('pubstate',null );
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
listeners:{  select: function ( combo, records, eOpts ) {combo.up('form' ).activeRecord.set('pubstate', records[0].get('id'));}  },
store: cmbstore_iud_spub,
valueField:     'brief',
displayField:   'brief',
typeAhead: true,
emptyText:      '',
name:   'pubstate_grid',
itemId:   'pubstate_grid',
fieldLabel:  'Статус публикации',
allowBlank:true
},
			
	,
	{
			minWidth: 300,
			width: 300,
			maxWidth: 300,
			x: 375, 
			y: 35, 
			labelWidth:140,

			xtype:  'textfield',
			value:  '',
			name:   'mainref',
			itemId:   'mainref',
			fieldLabel:  'Публикация',
			editable: false,
			readOnly: false,
			allowBlank:true
			},
			{
				   
					x:680, 
					y: 35, 
					height:25,
					xtype:  'button',
					iconCls:'icon-film_link',
					text:'Открыть',
					handler: function(){
						var params = "menubar=yes,location=yes,resizable=yes,scrollbars=yes,status=yes";
						var url=this.up('form' ).down('#mainref').getValue();
						if(url!='')
							window.open(url,'_blank',params);
					}

			}

,
{
        minWidth: 300,
        width: 300,
        maxWidth: 300,
        x: 5, 
        y: 65, 
labelWidth:140,

xtype:  'combobox',
trigger1Cls:        'x-form-clear-trigger', 
trigger2Cls:        'x-form-select-trigger', 
hideTrigger1:false, 
hideTrigger2:false, 
onTrigger1Click : function(){
		this.collapse();
		this.clearValue();
		this.up('form' ).activeRecord.set('thefilm',null );
},
onTrigger2Click : function(){ 
		if(this.isExpanded) {
			this.collapse(); 
		}else{ 
			if(this.store.count(false)==0) this.store.load();
			this.expand();
		}
},
editable: true,
enableRegEx: true,
queryMode:'local',
listeners:{  select: function ( combo, records, eOpts ) {combo.up('form' ).activeRecord.set('thefilm', records[0].get('id'));} ,focus: function()   {  this.store.load();  } },
store: cmbstore_iu_urok_def,
valueField:     'brief',
displayField:   'brief',
typeAhead: true,
emptyText:      '',
name:   'thefilm_grid',
itemId:   'thefilm_grid',
fieldLabel:  'Связанный урок',
allowBlank:true
}
,
{
        
        x: 310, 
		y: 65, 
		height:25,
		xtype:  'button',
		iconCls:'icon-page_link',
		text:'Открыть',
		handler: function(){
			var url=this.up('form' ).activeRecord.get('thefilm');
			var uinstanceid='';
			
			if(url!=''){
				if(cmbstore_iu_urok_def.count(false)==0) cmbstore_iu_urok_def.load();
				cmbstore_iu_urok_def.each(function(record){
					if(record.get('id')==url){
						uinstanceid=record.raw.instanceid;
					}
				})
				var params = "menubar=yes,location=yes,resizable=yes,scrollbars=yes,status=yes";
				if(uinstanceid!='')
					window.open(rootURL+'?uid='+uinstanceid,'_blank',params);
			}
				
		}

			}
,
	
{
        minWidth: 300,
        width: 300,
        maxWidth: 300,
        x: 375, 
        y: 65, 
		labelWidth:140,

		xtype:  'textfield',
		value:  '',
		name:   'thefilmurl',
		itemId:   'thefilmurl',
		fieldLabel:  'Связ. урок ссылка',
		allowBlank:true
},
{
				   
		x: 680, 
		y: 65, 
		height:25,
		xtype:  'button',
		iconCls:'icon-page_link',
		text:'Открыть',
		handler: function(){
						var url=this.up('form' ).down('#thefilmurl').getValue();
						var params = "menubar=yes,location=yes,resizable=yes,scrollbars=yes,status=yes";
						if(url!='')
							window.open(url,'_blank',params);
				}

}
       ],  
       height: 130 
        } // group
,
        { 
        xtype:'fieldset', 
        anchor: '100%',
        x: 0, 
        layout:'absolute', 
        id:'iu_urok_def_4',
        title:      'Примечания',
        defaultType:  'textfield',
            items: [
{
        minWidth: 735,
        width: 735,
        maxWidth: 735,
        xtype: 'textarea', 
        x: 5, 
        y: 5, 
        height: 170, 
labelWidth:140,

xtype:  'htmleditor',
name:   'info',
itemId:   'info',
fieldLabel:  'Примечание',
allowBlank:true
}
,
{
xtype:  'hidden',
name:   'notes',
fieldLabel:  'Заметки'
}
       ], 
       height: 220 
        } // group
          ],//items = part panel
        instanceid:''
    ,setActiveRecord: function(record,instid){
        p1.activeRecord = record;
        p1.instanceid = instid;
        if (record) {
            p1.getForm().loadRecord(record);
            p1_valid =p1.getForm().isValid();
			cmbstore_teacher_subj.load({params:{subject:record.get('subject_grid')}});
			cmbstore_metodist_subj.load({params:{subject:record.get('subject_grid'),metodist:-1}});

        } else {
            p1.getForm().reset();
        }
    }
}); // 'Ext.Define

return p1;
};
function DefineForms_iu_urok_def_(){


Ext.define('Form_iu_urok_def', {
extend:  'Ext.form.Panel',
alias: 'widget.f_iu_urok_def',
initComponent: function(){
    this.addEvents('create');
    Ext.apply(this,{
        activeRecord: null,
        defaultType:  'textfield',
        id:'iu_urok_def',
        x: 0, 
        fieldDefaults: {
         labelAlign:  'top' //,
        },
        items: [
        { 
        xtype:'panel', 
        id:'iu_urok_def-0',
        title:      'Информация',
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
          name:   'ucode',
itemId:   'ucode',
fieldLabel:  'Код урока',
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

xtype:  'datefield',
format:'d/m/Y H:i:s',
submitFormat:'Y-m-d H:i:s',
hideTrigger: true,
editable: false,
readOnly: true,
value:  '',
          name:   'datecreated',
itemId:   'datecreated',
fieldLabel:  'Дата создания',
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

xtype:  'combobox',
trigger1Cls:        'x-form-select-trigger', 
hideTrigger1:false, 
onTrigger1Click : function(){ 
		if(this.isExpanded) {
			this.collapse(); 
		}else{ 
			if(this.store.count(false)==0) this.store.load();
			this.expand();
		}
},
editable: true,
enableRegEx: true,
queryMode:'local',
listeners:{  select: function ( combo, records, eOpts ) {
  combo.up('form' ).activeRecord.set('subject', records[0].get('id')); 
  combo.up('form' ).activeRecord.set('subject_grid', combo.getValue());
 } ,focus: function()   {  this.store.load();  } },
store: cmbstore_iud_predmet,
valueField:     'brief',
displayField:   'brief',
typeAhead: true,
emptyText:      '',
name:   'subject_grid',
itemId:   'subject_grid',
fieldLabel:  'Предмет',
labelClsExtra:'x-item-mandatory',
allowBlank:false
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
trigger1Cls:        'x-form-select-trigger', 
hideTrigger1:false, 
onTrigger1Click : function(){ 
		if(this.isExpanded) {
			this.collapse(); 
		}else{ 
			if(this.store.count(false)==0) this.store.load();
			this.expand();
		}
},
editable: true,
enableRegEx: true,
queryMode:'local',
listeners:{  select: function ( combo, records, eOpts ) {combo.up('form' ).activeRecord.set('theclassnum', records[0].get('id'));} ,focus: function()   {  this.store.load();  } },
store: cmbstore_iu_clsinfo,
valueField:     'brief',
displayField:   'brief',
typeAhead: true,
emptyText:      '',
name:   'theclassnum_grid',
itemId:   'theclassnum_grid',
fieldLabel:  'Класс',
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
        y: 46, 

xtype:  'textfield',
value:  '',
name:   'plannum',
itemId:   'plannum',
fieldLabel:  'Номер по плану',
labelClsExtra:'x-item-mandatory',
allowBlank:false
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
trigger1Cls:        'x-form-clear-trigger', 
trigger2Cls:        'x-form-select-trigger', 
hideTrigger1:false, 
hideTrigger2:false, 
onTrigger1Click : function(){
		this.collapse();
		this.clearValue();
		this.up('form' ).activeRecord.set('maketown',null );
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
listeners:{  select: function ( combo, records, eOpts ) {combo.up('form' ).activeRecord.set('maketown', records[0].get('id'));}  },
store: cmbstore_iud_town,
valueField:     'brief',
displayField:   'brief',
typeAhead: true,
emptyText:      '',
name:   'maketown_grid',
itemId:   'maketown_grid',
fieldLabel:  'Город съемки',
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
format:'d/m/Y',
submitFormat:'Y-m-d H:i:s',
value:  '',
name:   'actiondate',
itemId:   'actiondate',
fieldLabel:  'Дата съемки',
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
format:'d/m/Y',
submitFormat:'Y-m-d H:i:s',
value:  '',
name:   'actiondate2',
itemId:   'actiondate2',
fieldLabel:  'Дата досъема',
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
trigger1Cls:        'x-form-clear-trigger', 
trigger2Cls:        'x-form-select-trigger', 
hideTrigger1:false, 
hideTrigger2:false, 
onTrigger1Click : function(){
		this.collapse();
		this.clearValue();
		this.up('form' ).activeRecord.set('coursetype',null );
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
listeners:{  select: function ( combo, records, eOpts ) {combo.up('form' ).activeRecord.set('coursetype', records[0].get('id'));}  },
store: cmbstore_iud_ctype,
valueField:     'brief',
displayField:   'brief',
typeAhead: true,
emptyText:      '',
name:   'coursetype_grid',
itemId:   'coursetype_grid',
fieldLabel:  'Тип курса',
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
name:   'rtheme',
itemId:   'rtheme',
fieldLabel:  'Тема раздела',
allowBlank:true
       ,labelWidth: 120
}
,
{
        minWidth: 740,
        maxWidth: 740,
        width: 740,
        x: 5, 
        y: 184, 

xtype:  'textfield',
value:  '',
name:   'classtheme',
itemId:   'classtheme',
fieldLabel:  'Тема урока',
allowBlank:true
       ,labelWidth: 120
}
,
{
        minWidth: 220,
        width: 220,
        maxWidth: 220,
        x: 5, 
        y: 230, 

xtype:          'combobox',
editable: false,
trigger1Cls:        'x-form-clear-trigger', 
trigger2Cls:        'x-form-select-trigger', 
hideTrigger1:false, 
hideTrigger2:false, 
onTrigger1Click : function(){
		this.collapse();
		this.clearValue();
},
onTrigger2Click : function(){ 
		if(this.isExpanded) {
			this.collapse(); 
		}else{ 
			this.expand();
		}
},
store: enum_Quarter,
valueField:     'name',
displayField:   'name',
typeAhead: true,
queryMode:      'local',
emptyText:      '',
name:   'thequarter_grid',
itemId:   'thequarter_grid',
listeners:{  select: function ( combo, records, eOpts ) {combo.up('form' ).activeRecord.set('thequarter', records[0].get('value'));}  },
fieldLabel:  'Четверть',
allowBlank:true
       ,labelWidth: 120
}
,
{
        minWidth: 220,
        width: 220,
        maxWidth: 220,
        x: 255, 
        y: 230, 

xtype:  'datefield',
format:'F, d',
submitFormat:'F, d',
value:  '',
name:   'schooldate',
itemId:   'schooldate',
fieldLabel:  'Дата в школе',
allowBlank:true
       ,labelWidth: 120
}
       ], width: 760,
       height: 316 
        } //group
,
        { 
        xtype:'panel', 
        id:'iu_urok_def-1',
        title:      'Персонал',
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
trigger1Cls:        'x-form-select-trigger', 
hideTrigger1:false, 
onTrigger1Click : function(){ 
		if(this.isExpanded) {
			this.collapse(); 
		}else{ 
			if(this.store.count(false)==0) this.store.load();
			this.expand();
		}
},
editable: true,
enableRegEx: true,
queryMode:'local',
listeners:{  select: function ( combo, records, eOpts ) {combo.up('form' ).activeRecord.set('curator', records[0].get('id'));} ,focus: function()   {  this.store.load();  } },
store: cmbstore_iu_u_def,
valueField:     'brief',
displayField:   'brief',
typeAhead: true,
emptyText:      '',
name:   'curator_grid',
itemId:   'curator_grid',
fieldLabel:  'Куратор',
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

xtype:  'combobox',
trigger1Cls:        'x-form-clear-trigger', 
trigger2Cls:        'x-form-select-trigger', 
hideTrigger1:false, 
hideTrigger2:false, 
onTrigger1Click : function(){
		this.collapse();
		this.clearValue();
		this.up('form' ).activeRecord.set('theteacher',null );
},
onTrigger2Click : function(){ 
		if(this.isExpanded) {
			this.collapse(); 
		}else{ 
			this.store.load({params:{subject:this.up('form' ).activeRecord.get('subject_grid')}});;
			this.expand();
		}
},
trigger3Cls:        'x-form-add-trigger', 
hideTrigger3:false, 
onTrigger3Click : function(){ 
onAddTeacher(this); 
},
editable: true,
enableRegEx: true,
queryMode:'local',
listeners:{  
select: function ( combo, records, eOpts ) {combo.up('form' ).activeRecord.set('theteacher', records[0].get('id'));} ,
focus: function(combo,record)   { 
  //alert('focus!');
 this.store.load({params:{subject:combo.up('form' ).activeRecord.get('subject_grid')}});
 } 
},
store: cmbstore_teacher_subj,
valueField:     'brief',
displayField:   'brief',
typeAhead: true,
emptyText:      '',
name:   'theteacher_grid',
itemId:   'theteacher_grid',
fieldLabel:  'Учитель',
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

xtype:  'combobox',
trigger1Cls:        'x-form-clear-trigger', 
trigger2Cls:        'x-form-select-trigger', 
hideTrigger1:false, 
hideTrigger2:false, 
onTrigger1Click : function(){
		this.collapse();
		this.clearValue();
		this.up('form' ).activeRecord.set('methodist',null );
},
onTrigger2Click : function(){ 
		if(this.isExpanded) {
			this.collapse(); 
		}else{ 
			if(this.store.count(false)==0) this.store.load();
			this.expand();
		}
},
trigger3Cls:        'x-form-add-trigger', 
hideTrigger3:false, 
onTrigger3Click : function(){ 
onAddMethodist(this); 
},
editable: true,
enableRegEx: true,
queryMode:'local',
listeners:{  select: function ( combo, records, eOpts ) { combo.up('form' ).activeRecord.set('methodist', records[0].get('id')) ;} 
,focus: function(combo,record)   { 
		this.store.load({params:{subject:combo.up('form' ).activeRecord.get('subject_grid'),metodist:-1}});
	} },
store: cmbstore_metodist_subj,
valueField:     'brief',
displayField:   'brief',
typeAhead: true,
emptyText:      '',
name:   'methodist_grid',
itemId:   'methodist_grid',
fieldLabel:  'Методист',
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
trigger1Cls:        'x-form-clear-trigger', 
trigger2Cls:        'x-form-select-trigger', 
hideTrigger1:false, 
hideTrigger2:false, 
onTrigger1Click : function(){
		this.collapse();
		this.clearValue();
		this.up('form' ).activeRecord.set('methodist2',null );
},
onTrigger2Click : function(){ 
		if(this.isExpanded) {
			this.collapse(); 
		}else{ 
			if(this.store.count(false)==0) this.store.load();
			this.expand();
		}
},
trigger3Cls:        'x-form-add-trigger', 
hideTrigger3:false, 
onTrigger3Click : function(){ 
onAddMethodist2(this); 
},
editable: true,
enableRegEx: true,
queryMode:'local',
listeners:{  
	select: function ( combo, records, eOpts ) {combo.up('form' ).activeRecord.set('methodist2', records[0].get('id'));} 
	,focus: function(combo,record)   { 
		this.store.load({params:{subject:combo.up('form' ).activeRecord.get('subject_grid'),metodist:-1}});
	}  
 },
store: cmbstore_metodist_subj,
valueField:     'brief',
displayField:   'brief',
typeAhead: true,
emptyText:      '',
name:   'methodist2_grid',
itemId:   'methodist2_grid',
fieldLabel:  'Методист 2',
allowBlank:true
       ,labelWidth: 120
}
       ], width: 760,
       height: 132 
        } //group
,
        { 
        xtype:'panel', 
        id:'iu_urok_def-2',
        title:      'Состояние',
        defaultType:  'textfield',
        closable:false,
        collapsible:true,
        collapsed:true,
        titleCollapse : true,
        layout:'absolute', 
        x: 0, 
            items: [
{
        /* flex_field */ 
        minWidth: 350,
        width: 350,
        maxWidth: 350,
        x: 5, 
        y: 0, 

xtype:  'combobox',
hideTrigger: true,
editable: false,
readOnly: true,
store: cmbstore_iud_process_def,
valueField:     'brief',
displayField:   'brief',
typeAhead: true,
emptyText:      '',
name:   'processtype_grid',
itemId:   'processtype_grid',
fieldLabel:  'Тип процесса',
labelClsExtra:'x-item-mandatory',
allowBlank:false
       ,labelWidth: 120
}
,
{
        minWidth: 350,
        width: 350,
        maxWidth:350,
        x: 360, 
        y: 0, 

xtype:  'textfield',
value:  '',
name:   'laststate_grid',
itemId:   'laststate_grid',
fieldLabel:  'Текущий статус',
editable: false,
readOnly: true,
allowBlank:true
       ,labelWidth: 120
},
{
        /* flex_field */ 
        minWidth: 745,
        width: 745,
        maxWidth: 745,
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
		this.up('form' ).activeRecord.set('ckksn',null );
},
onTrigger2Click : function(){ 
		if(this.isExpanded) {
			this.collapse(); 
		}else{ 
			if(this.store.count(false)==0) this.store.load();
			this.expand();
		}
},
editable: true,
enableRegEx: true,
queryMode:'local',
listeners:{  select: function ( combo, records, eOpts ) {combo.up('form' ).activeRecord.set('ckksn', records[0].get('id'));} ,focus: function()   {  this.store.load();  } },
store: cmbstore_iud_sn_def,
valueField:     'brief',
displayField:   'brief',
typeAhead: true,
emptyText:      '',
name:   'ckksn_grid',
itemId:   'ckksn_grid',
fieldLabel:  'Финальный статус',
allowBlank:true
       ,labelWidth: 120
}
       ], width: 760,
       height: 132 
        } //group
,
        { 
        xtype:'panel', 
        id:'iu_urok_def-3',
        title:      'Ссылки',
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

xtype:  'textfield',
value:  '',
name:   'testpageref',
itemId:   'testpageref',
fieldLabel:  'Тестовая',
allowBlank:true
       ,labelWidth: 120
}
,{
       
        x: 5, 
        y: 750, 
		xtype:  'button',
		text:'тест',
		iconCls:'icon-film_link',
		handler: function(){
			var url=combo.up('form' ).down('#testpageref').getValue();
			if(url!='')
				window.open(url,'_blank','Тестовая');
		}

},
{
        minWidth: 220,
        width: 220,
        maxWidth: 220,
        x: 255, 
        y: 0, 

xtype:  'textfield',
value:  '',
name:   'mainref',
itemId:   'mainref',
fieldLabel:  'Публикация',
editable: false,
readOnly: true,
allowBlank:true
       ,labelWidth: 120
}
,
{
       
        x: 5, 
        y: 750, 
		xtype:  'button',
		text:'тест',
		iconCls:'icon-film_link',
		handler: function(){
			var url=combo.up('form' ).down('#mainref').getValue();
			if(url!='')
				window.open(url,'_blank','Публикация');
		}

},
{
        minWidth: 220,
        width: 220,
        maxWidth: 220,
        x: 505, 
        y: 0, 

xtype:  'combobox',
trigger1Cls:        'x-form-clear-trigger', 
trigger2Cls:        'x-form-select-trigger', 
hideTrigger1:false, 
hideTrigger2:false, 
onTrigger1Click : function(){
		this.collapse();
		this.clearValue();
		this.up('form' ).activeRecord.set('thefilm',null );
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
listeners:{  select: function ( combo, records, eOpts ) {combo.up('form' ).activeRecord.set('thefilm', records[0].get('id'));}  },
store: cmbstore_iu_urok_def,
valueField:     'brief',
displayField:   'brief',
typeAhead: true,
emptyText:      '',
name:   'thefilm_grid',
itemId:   'thefilm_grid',
fieldLabel:  'Связанный урок',
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
name:   'thefilmurl',
itemId:   'thefilmurl',
fieldLabel:  'Связ. урок ссылка',
allowBlank:true
       ,labelWidth: 120
}
       ], width: 760,
       height: 132 
        } //group
,
        { 
        xtype:'panel', 
        id:'iu_urok_def-4',
        title:      'Примечания',
        defaultType:  'textfield',
        closable:false,
        collapsible:true,
        collapsed:true,
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
        height: 260, 

xtype:  'htmleditor',
name:   'info',
itemId:   'info',
fieldLabel:  'Примечание',
allowBlank:true
       ,labelWidth: 120
}
,
,
{
          xtype:  'hidden',
name:   'notes',
          fieldLabel:  'Заметки'
}
       ], width: 760,
       height: 310 
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
			cmbstore_teacher_subj.load({params:{subject:record.get('subject_grid')}});
			cmbstore_metodist_subj.load({params:{subject:record.get('subject_grid'),metodist:-1}});
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
            //var form_values = form.getValues(); var field_name = '';  for(field_name in form_values){active.set(field_name, form_values[field_name]);}
        	StatusDB('Сохранение данных');
            Ext.Ajax.request({
                url: rootURL+'index.php/c_iu_urok_def/setRow',
                method:  'POST',
                params: { 
                    instanceid: this.instanceid
                    ,iu_urok_defid: active.get('iu_urok_defid')
                    ,ucode: active.get('ucode') 
                    ,datecreated:function() { if(active.get('datecreated')) return active.get('datecreated').toLocaleFormat('%Y-%m-%d %H:%M:%S'); else return null;}()
                    ,subject: active.get('subject') 
                    ,theclassnum: active.get('theclassnum') 
                    ,plannum: active.get('plannum') 
                    ,maketown: active.get('maketown') 
                    ,actiondate:function() { if(active.get('actiondate')) return active.get('actiondate').toLocaleFormat('%Y-%m-%d %H:%M:%S'); else return null;}()
                    ,actiondate2:function() { if(active.get('actiondate2')) return active.get('actiondate2').toLocaleFormat('%Y-%m-%d %H:%M:%S'); else return null;}()
                    ,coursetype: active.get('coursetype') 
                    ,rtheme: active.get('rtheme') 
                    ,classtheme: active.get('classtheme') 
                    ,thequarter: active.get('thequarter') 
                    ,schooldate:function() { if(active.get('schooldate')) return active.get('schooldate').toLocaleFormat('%Y-%m-%d %H:%M:%S'); else return null;}()
                    ,curator: active.get('curator') 
                    ,theteacher: active.get('theteacher') 
                    ,methodist: active.get('methodist') 
                    ,methodist2: active.get('methodist2') 
                    ,processtype: active.get('processtype') 
                    ,ckksn: active.get('ckksn') 
                    ,testpageref: active.get('testpageref') 
                    ,pubstate: active.get('pubstate') 
                    ,mainref: active.get('mainref') 
                    ,thefilm: active.get('thefilm') 
                    ,thefilmurl: active.get('thefilmurl') 
                    ,info: active.get('info') 
                    ,notes: active.get('notes') 
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
                    if(active.get('iu_urok_defid')==''){
               			active.set('iu_urok_defid',res.data['iu_urok_defid']);
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
        if(this.activeRecord.get('iu_urok_defid')==''){
                this.activeRecord.store.reload();
        }
        this.setActiveRecord(null,null);
        this.ownerCt.close();
    }
}); // 'Ext.Define

Ext.define('EditWindow_iu_urok_def', {
    extend:  'Ext.window.Window',
    maxHeight: 1193,
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
    title:  'Описание',
    items:[{
        xtype:  'f_iu_urok_def'
	}]
	});
}
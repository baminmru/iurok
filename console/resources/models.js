

 Ext.define('model_iu_clsinfo',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'iu_clsinfoid',type: 'string'}
            ,{name: 'id',type: 'string'}
            ,{name: 'instanceid',type: 'string'}
            ,{name: 'brief',type: 'string'}
            ,{name:'name', type: 'string'}
            ,{name:'sequence', type: 'number'}
        ]
    });

 Ext.define('cmbmodel_iu_clsinfo',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'iu_clsinfoid',type: 'string'}
            ,{name: 'brief',type: 'string'}
        ]
    });
    var cmbstore_iu_clsinfo_loaded=false;
    var cmbstore_iu_clsinfo = Ext.create('Ext.data.Store', {
        model:'cmbmodel_iu_clsinfo',
        autoLoad: false,
        autoSync: false,
        proxy: {
            type:   'ajax',
                url:   rootURL+'index.php/c_iu_clsinfo/getRows',
            reader: {
                type:   'json'
                ,root:  'data'
                ,successProperty:  'success'
                ,messageProperty:  'msg'
            }
        },
       listeners: {
       'load': function(){combo_iu_clsinfo_loaded =true;}
       }
    });

 Ext.define('model_iu_cm_def',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'iu_cm_defid',type: 'string'}
            ,{name: 'id',type: 'string'}
            ,{name: 'instanceid',type: 'string'}
            ,{name: 'brief',type: 'string'}
            ,{name:'thedate', type: 'date',dateFormat:'Y-m-d H:i:s'}
            ,{name:'theprocess', type: 'string'}
            ,{name:'theprocess_grid', type: 'string'}
            ,{name:'isdiscussion', type: 'int'}
            ,{name:'isdiscussion_grid', type: 'string'}
            ,{name:'thedoc', type: 'string'}
            ,{name:'thedoc_grid', type: 'string'}
            ,{name:'thevideo', type: 'string'}
            ,{name:'thevideo_grid', type: 'string'}
            ,{name:'thetheme', type: 'string'}
            ,{name:'theauthor', type: 'string'}
            ,{name:'theauthor_grid', type: 'string'}
        ]
    });

 Ext.define('cmbmodel_iu_cm_def',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'iu_cm_defid',type: 'string'}
            ,{name: 'brief',type: 'string'}
        ]
    });
    var cmbstore_iu_cm_def_loaded=false;
    var cmbstore_iu_cm_def = Ext.create('Ext.data.Store', {
        model:'cmbmodel_iu_cm_def',
        autoLoad: false,
        autoSync: false,
        proxy: {
            type:   'ajax',
                url:   rootURL+'index.php/c_iu_cm_def/getRows',
            reader: {
                type:   'json'
                ,root:  'data'
                ,successProperty:  'success'
                ,messageProperty:  'msg'
            }
        },
       listeners: {
       'load': function(){combo_iu_cm_def_loaded =true;}
       }
    });

 Ext.define('model_iu_cm_time',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'iu_cm_timeid',type: 'string'}
            ,{name: 'id',type: 'string'}
            ,{name: 'instanceid',type: 'string'}
            ,{name: 'brief',type: 'string'}
            ,{name:'starttime', type: 'string'}
            ,{name:'thefile', type: 'string'}
            ,{name:'thefile_ext', type: 'string'}
            ,{name:'thedate', type: 'date',dateFormat:'Y-m-d H:i:s'}
            ,{name:'ischecked', type: 'int'}
            ,{name:'ischecked_grid', type: 'string'}
            ,{name:'curatoronly', type: 'int'}
            ,{name:'curatoronly_grid', type: 'string'}
            ,{name:'info', type: 'string'}
            ,{name:'theauthor', type: 'string'}
            ,{name:'theauthor_grid', type: 'string'}
            ,{name:'endtime', type: 'string'}
            ,{name:'messagetype', type: 'string'}
            ,{name:'messagetype_grid', type: 'string'}
            ,{name:'theref', type: 'string'}
        ]
    });


 Ext.define('model_iu_cm_msg',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'iu_cm_msgid',type: 'string'}
            ,{name: 'id',type: 'string'}
            ,{name: 'instanceid',type: 'string'}
            ,{name: 'brief',type: 'string'}
            ,{name: 'parentrowid',type: 'string'}
            ,{name:'messagetype', type: 'string'}
            ,{name:'messagetype_grid', type: 'string'}
            ,{name:'thedate', type: 'date',dateFormat:'Y-m-d H:i:s'}
            ,{name:'theauthor', type: 'string'}
            ,{name:'theauthor_grid', type: 'string'}
            ,{name:'info', type: 'string'}
            ,{name:'theref', type: 'string'}
            ,{name:'thefile', type: 'string'}
            ,{name:'thefile_ext', type: 'string'}
        ]
    });


 Ext.define('model_iud_doctype',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'iud_doctypeid',type: 'string'}
            ,{name: 'id',type: 'string'}
            ,{name: 'instanceid',type: 'string'}
            ,{name: 'brief',type: 'string'}
            ,{name:'sequence', type: 'number'}
            ,{name:'versionpolicy', type: 'string'}
            ,{name:'versionpolicy_grid', type: 'string'}
            ,{name:'filetype', type: 'string'}
            ,{name:'filetype_grid', type: 'string'}
            ,{name:'name', type: 'string'}
        ]
    });

 Ext.define('cmbmodel_iud_doctype',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'iud_doctypeid',type: 'string'}
            ,{name: 'brief',type: 'string'}
        ]
    });
    var cmbstore_iud_doctype_loaded=false;
    var cmbstore_iud_doctype = Ext.create('Ext.data.Store', {
        model:'cmbmodel_iud_doctype',
        autoLoad: false,
        autoSync: false,
        proxy: {
            type:   'ajax',
                url:   rootURL+'index.php/c_iud_doctype/getRows',
            reader: {
                type:   'json'
                ,root:  'data'
                ,successProperty:  'success'
                ,messageProperty:  'msg'
            }
        },
       listeners: {
       'load': function(){combo_iud_doctype_loaded =true;}
       }
    });

 Ext.define('model_iu_crole',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'iu_croleid',type: 'string'}
            ,{name: 'id',type: 'string'}
            ,{name: 'instanceid',type: 'string'}
            ,{name: 'brief',type: 'string'}
            ,{name:'allowsetuser', type: 'int'}
            ,{name:'allowsetuser_grid', type: 'string'}
            ,{name:'name', type: 'string'}
        ]
    });

 Ext.define('cmbmodel_iu_crole',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'iu_croleid',type: 'string'}
            ,{name: 'brief',type: 'string'}
        ]
    });
    var cmbstore_iu_crole_loaded=false;
    var cmbstore_iu_crole = Ext.create('Ext.data.Store', {
        model:'cmbmodel_iu_crole',
        autoLoad: false,
        autoSync: false,
        proxy: {
            type:   'ajax',
                url:   rootURL+'index.php/c_iu_crole/getRows',
            reader: {
                type:   'json'
                ,root:  'data'
                ,successProperty:  'success'
                ,messageProperty:  'msg'
            }
        },
       listeners: {
       'load': function(){combo_iu_crole_loaded =true;}
       }
    });

 Ext.define('model_iu_int_modules',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'iu_int_modulesid',type: 'string'}
            ,{name: 'id',type: 'string'}
            ,{name: 'instanceid',type: 'string'}
            ,{name: 'brief',type: 'string'}
            ,{name:'substructobjects', type: 'int'}
            ,{name:'substructobjects_grid', type: 'string'}
            ,{name:'sequence', type: 'number'}
            ,{name:'visiblecontrol', type: 'int'}
            ,{name:'visiblecontrol_grid', type: 'string'}
            ,{name:'otherdocmode', type: 'string'}
            ,{name:'name', type: 'string'}
            ,{name:'allobjects', type: 'int'}
            ,{name:'allobjects_grid', type: 'string'}
            ,{name:'caption', type: 'string'}
            ,{name:'colegsobject', type: 'int'}
            ,{name:'colegsobject_grid', type: 'string'}
            ,{name:'mydocmode', type: 'string'}
            ,{name:'theicon', type: 'string'}
            ,{name:'controldocmode', type: 'string'}
            ,{name:'groupname', type: 'string'}
        ]
    });


 Ext.define('model_iu_l_def',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'iu_l_defid',type: 'string'}
            ,{name: 'id',type: 'string'}
            ,{name: 'instanceid',type: 'string'}
            ,{name: 'brief',type: 'string'}
            ,{name:'sender', type: 'string'}
            ,{name:'sender_grid', type: 'string'}
            ,{name:'info', type: 'string'}
            ,{name:'readdate', type: 'date',dateFormat:'Y-m-d H:i:s'}
            ,{name:'createdate', type: 'date',dateFormat:'Y-m-d H:i:s'}
            ,{name:'doer', type: 'string'}
            ,{name:'doer_grid', type: 'string'}
        ]
    });


 Ext.define('model_iu_orgtree',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'iu_orgtreeid',type: 'string'}
            ,{name: 'id',type: 'string'}
            ,{name: 'instanceid',type: 'string'}
            ,{name: 'brief',type: 'string'}
            ,{name: 'parentrowid',type: 'string'}
            ,{name:'name', type: 'string'}
        ]
    });


 Ext.define('model_iu_orgusr',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'iu_orgusrid',type: 'string'}
            ,{name: 'id',type: 'string'}
            ,{name: 'parentid',type: 'string'}
            ,{name: 'brief',type: 'string'}
            ,{name:'ismanager', type: 'int'}
            ,{name:'ismanager_grid', type: 'string'}
            ,{name:'orguser', type: 'string'}
            ,{name:'orguser_grid', type: 'string'}
        ]
    });


 Ext.define('model_iu_plevent',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'iu_pleventid',type: 'string'}
            ,{name: 'id',type: 'string'}
            ,{name: 'instanceid',type: 'string'}
            ,{name: 'brief',type: 'string'}
            ,{name:'thediscussion', type: 'string'}
            ,{name:'thediscussion_grid', type: 'string'}
            ,{name:'doer', type: 'string'}
            ,{name:'doer_grid', type: 'string'}
            ,{name:'createdate', type: 'date',dateFormat:'Y-m-d H:i:s'}
            ,{name:'statetask', type: 'string'}
            ,{name:'statetask_grid', type: 'string'}
            ,{name:'eventtype', type: 'string'}
            ,{name:'thevideo', type: 'string'}
            ,{name:'thevideo_grid', type: 'string'}
            ,{name:'info', type: 'string'}
            ,{name:'theprocess', type: 'string'}
            ,{name:'theprocess_grid', type: 'string'}
            ,{name:'thedoc', type: 'string'}
            ,{name:'thedoc_grid', type: 'string'}
            ,{name:'processstatus', type: 'string'}
            ,{name:'processstatus_grid', type: 'string'}
        ]
    });


 Ext.define('model_iu_rcfg_mod',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'iu_rcfg_modid',type: 'string'}
            ,{name: 'id',type: 'string'}
            ,{name: 'instanceid',type: 'string'}
            ,{name: 'brief',type: 'string'}
            ,{name:'controldocmode', type: 'string'}
            ,{name:'visiblecontrol', type: 'int'}
            ,{name:'visiblecontrol_grid', type: 'string'}
            ,{name:'allobjects', type: 'int'}
            ,{name:'allobjects_grid', type: 'string'}
            ,{name:'theicon', type: 'string'}
            ,{name:'sequence', type: 'number'}
            ,{name:'moduleaccessible', type: 'int'}
            ,{name:'moduleaccessible_grid', type: 'string'}
            ,{name:'colegsobject', type: 'int'}
            ,{name:'colegsobject_grid', type: 'string'}
            ,{name:'otherdocmode', type: 'string'}
            ,{name:'tmobjects', type: 'int'}
            ,{name:'tmobjects_grid', type: 'string'}
            ,{name:'name', type: 'string'}
            ,{name:'mydocmode', type: 'string'}
            ,{name:'groupname', type: 'string'}
            ,{name:'caption', type: 'string'}
            ,{name:'substructobjects', type: 'int'}
            ,{name:'substructobjects_grid', type: 'string'}
        ]
    });


 Ext.define('model_iu_rcfg_docmode',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'iu_rcfg_docmodeid',type: 'string'}
            ,{name: 'id',type: 'string'}
            ,{name: 'instanceid',type: 'string'}
            ,{name: 'brief',type: 'string'}
            ,{name:'allowdelegate', type: 'int'}
            ,{name:'allowdelegate_grid', type: 'string'}
            ,{name:'allowadd', type: 'int'}
            ,{name:'allowadd_grid', type: 'string'}
            ,{name:'editmode', type: 'string'}
            ,{name:'addmode', type: 'string'}
            ,{name:'the_document', type: 'string'}
            ,{name:'the_document_grid', type: 'string'}
            ,{name:'allowdelete', type: 'int'}
            ,{name:'allowdelete_grid', type: 'string'}
        ]
    });


 Ext.define('model_iu_rcfg_def',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'iu_rcfg_defid',type: 'string'}
            ,{name: 'id',type: 'string'}
            ,{name: 'instanceid',type: 'string'}
            ,{name: 'brief',type: 'string'}
            ,{name:'therole', type: 'string'}
            ,{name:'therole_grid', type: 'string'}
        ]
    });


 Ext.define('model_iu_regtree',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'iu_regtreeid',type: 'string'}
            ,{name: 'id',type: 'string'}
            ,{name: 'instanceid',type: 'string'}
            ,{name: 'brief',type: 'string'}
            ,{name: 'parentrowid',type: 'string'}
            ,{name:'name', type: 'string'}
        ]
    });


 Ext.define('model_iu_regdocs',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'iu_regdocsid',type: 'string'}
            ,{name: 'id',type: 'string'}
            ,{name: 'parentid',type: 'string'}
            ,{name: 'brief',type: 'string'}
            ,{name:'origname', type: 'string'}
            ,{name:'thecomment', type: 'string'}
            ,{name:'docname', type: 'string'}
            ,{name:'thedoc', type: 'string'}
            ,{name:'thedoc_ext', type: 'string'}
        ]
    });


 Ext.define('model_iu_status',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'iu_statusid',type: 'string'}
            ,{name: 'id',type: 'string'}
            ,{name: 'instanceid',type: 'string'}
            ,{name: 'brief',type: 'string'}
            ,{name:'thestage', type: 'string'}
            ,{name:'thestage_grid', type: 'string'}
            ,{name:'theprocess', type: 'string'}
            ,{name:'theprocess_grid', type: 'string'}
            ,{name:'sequence', type: 'number'}
            ,{name:'isfinishstate', type: 'int'}
            ,{name:'isfinishstate_grid', type: 'string'}
            ,{name:'name', type: 'string'}
            ,{name:'isstartupstate', type: 'int'}
            ,{name:'isstartupstate_grid', type: 'string'}
        ]
    });

 Ext.define('cmbmodel_iu_status',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'iu_statusid',type: 'string'}
            ,{name: 'brief',type: 'string'}
        ]
    });
    var cmbstore_iu_status_loaded=false;
    var cmbstore_iu_status = Ext.create('Ext.data.Store', {
        model:'cmbmodel_iu_status',
        autoLoad: false,
        autoSync: false,
        proxy: {
            type:   'ajax',
                url:   rootURL+'index.php/c_iu_status/getRows',
            reader: {
                type:   'json'
                ,root:  'data'
                ,successProperty:  'success'
                ,messageProperty:  'msg'
            }
        },
       listeners: {
       'load': function(){combo_iu_status_loaded =true;}
       }
    });

 Ext.define('model_iu_status_doer',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'iu_status_doerid',type: 'string'}
            ,{name: 'id',type: 'string'}
            ,{name: 'instanceid',type: 'string'}
            ,{name: 'brief',type: 'string'}
            ,{name:'doertype', type: 'string'}
            ,{name:'doertype_grid', type: 'string'}
            ,{name:'doerallowed', type: 'int'}
            ,{name:'doerallowed_grid', type: 'string'}
        ]
    });


 Ext.define('model_iu_statustask',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'iu_statustaskid',type: 'string'}
            ,{name: 'id',type: 'string'}
            ,{name: 'instanceid',type: 'string'}
            ,{name: 'brief',type: 'string'}
            ,{name:'contoller', type: 'string'}
            ,{name:'contoller_grid', type: 'string'}
            ,{name:'afterall', type: 'int'}
            ,{name:'afterall_grid', type: 'string'}
            ,{name:'finishallowed', type: 'int'}
            ,{name:'finishallowed_grid', type: 'string'}
            ,{name:'tasksequence', type: 'number'}
            ,{name:'statusonclose', type: 'string'}
            ,{name:'statusonclose_grid', type: 'string'}
            ,{name:'doertype', type: 'string'}
            ,{name:'doertype_grid', type: 'string'}
            ,{name:'name', type: 'string'}
            ,{name:'info', type: 'string'}
            ,{name:'duration_plan', type: 'number'}
            ,{name:'possiblestatuses', type: 'string'}
            ,{name:'possiblestatuses_grid', type: 'string'}
        ]
    });

 Ext.define('cmbmodel_iu_statustask',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'iu_statustaskid',type: 'string'}
            ,{name: 'brief',type: 'string'}
        ]
    });
    var cmbstore_iu_statustask_loaded=false;
    var cmbstore_iu_statustask = Ext.create('Ext.data.Store', {
        model:'cmbmodel_iu_statustask',
        autoLoad: false,
        autoSync: false,
        proxy: {
            type:   'ajax',
                url:   rootURL+'index.php/c_iu_statustask/getRows',
            reader: {
                type:   'json'
                ,root:  'data'
                ,successProperty:  'success'
                ,messageProperty:  'msg'
            }
        },
       listeners: {
       'load': function(){combo_iu_statustask_loaded =true;}
       }
    });

 Ext.define('model_iu_state_tasklink',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'iu_state_tasklinkid',type: 'string'}
            ,{name: 'id',type: 'string'}
            ,{name: 'parentid',type: 'string'}
            ,{name: 'brief',type: 'string'}
            ,{name:'allversions', type: 'int'}
            ,{name:'allversions_grid', type: 'string'}
            ,{name:'doctype', type: 'string'}
            ,{name:'doctype_grid', type: 'string'}
        ]
    });


 Ext.define('model_iu_stausdoc',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'iu_stausdocid',type: 'string'}
            ,{name: 'id',type: 'string'}
            ,{name: 'instanceid',type: 'string'}
            ,{name: 'brief',type: 'string'}
            ,{name:'allowdoc', type: 'int'}
            ,{name:'allowdoc_grid', type: 'string'}
            ,{name:'name', type: 'string'}
            ,{name:'info', type: 'string'}
            ,{name:'doctype', type: 'string'}
            ,{name:'doctype_grid', type: 'string'}
        ]
    });


 Ext.define('model_iu_statusnext',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'iu_statusnextid',type: 'string'}
            ,{name: 'id',type: 'string'}
            ,{name: 'instanceid',type: 'string'}
            ,{name: 'brief',type: 'string'}
            ,{name:'nextstatus', type: 'string'}
            ,{name:'nextstatus_grid', type: 'string'}
            ,{name:'statusafter', type: 'string'}
            ,{name:'statusafter_grid', type: 'string'}
        ]
    });


 Ext.define('model_iu_statuschanger',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'iu_statuschangerid',type: 'string'}
            ,{name: 'id',type: 'string'}
            ,{name: 'parentid',type: 'string'}
            ,{name: 'brief',type: 'string'}
            ,{name:'whocan', type: 'string'}
            ,{name:'whocan_grid', type: 'string'}
            ,{name:'checkdocuments', type: 'int'}
            ,{name:'checkdocuments_grid', type: 'string'}
        ]
    });


 Ext.define('model_iu_subsribe',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'iu_subsribeid',type: 'string'}
            ,{name: 'id',type: 'string'}
            ,{name: 'instanceid',type: 'string'}
            ,{name: 'brief',type: 'string'}
            ,{name:'thevideo', type: 'string'}
            ,{name:'thevideo_grid', type: 'string'}
            ,{name:'statetask', type: 'string'}
            ,{name:'statetask_grid', type: 'string'}
            ,{name:'theprocess', type: 'string'}
            ,{name:'theprocess_grid', type: 'string'}
            ,{name:'thedoc', type: 'string'}
            ,{name:'thedoc_grid', type: 'string'}
            ,{name:'processstatus', type: 'string'}
            ,{name:'processstatus_grid', type: 'string'}
            ,{name:'isactive', type: 'int'}
            ,{name:'isactive_grid', type: 'string'}
            ,{name:'eventtype', type: 'string'}
            ,{name:'subscriber', type: 'string'}
            ,{name:'subscriber_grid', type: 'string'}
            ,{name:'thediscussion', type: 'string'}
            ,{name:'thediscussion_grid', type: 'string'}
            ,{name:'doer', type: 'string'}
            ,{name:'doer_grid', type: 'string'}
            ,{name:'scandate', type: 'date',dateFormat:'Y-m-d H:i:s'}
        ]
    });


 Ext.define('model_iu_task',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'iu_taskid',type: 'string'}
            ,{name: 'id',type: 'string'}
            ,{name: 'instanceid',type: 'string'}
            ,{name: 'brief',type: 'string'}
            ,{name:'doer_states', type: 'string'}
            ,{name:'doer_states_grid', type: 'string'}
            ,{name:'info', type: 'string'}
            ,{name:'delegatefrom', type: 'string'}
            ,{name:'delegatefrom_grid', type: 'string'}
            ,{name:'statetask', type: 'string'}
            ,{name:'statetask_grid', type: 'string'}
            ,{name:'finishdate', type: 'date',dateFormat:'Y-m-d H:i:s'}
            ,{name:'doer', type: 'string'}
            ,{name:'doer_grid', type: 'string'}
            ,{name:'isdelegated', type: 'int'}
            ,{name:'isdelegated_grid', type: 'string'}
            ,{name:'doer_comment', type: 'string'}
            ,{name:'taskfinished', type: 'int'}
            ,{name:'taskfinished_grid', type: 'string'}
            ,{name:'senttodoer', type: 'date',dateFormat:'Y-m-d H:i:s'}
            ,{name:'subj', type: 'string'}
            ,{name:'taskcancelled', type: 'int'}
            ,{name:'taskcancelled_grid', type: 'string'}
            ,{name:'manualtask', type: 'int'}
            ,{name:'manualtask_grid', type: 'string'}
            ,{name:'ischecked', type: 'int'}
            ,{name:'ischecked_grid', type: 'string'}
            ,{name:'planenddate', type: 'date',dateFormat:'Y-m-d H:i:s'}
            ,{name:'contoller', type: 'string'}
            ,{name:'contoller_grid', type: 'string'}
            ,{name:'createdate', type: 'date',dateFormat:'Y-m-d H:i:s'}
            ,{name:'theprocess', type: 'string'}
            ,{name:'theprocess_grid', type: 'string'}
            ,{name:'processstatus', type: 'string'}
            ,{name:'processstatus_grid', type: 'string'}
            ,{name:'controller_comment', type: 'string'}
        ]
    });

 Ext.define('cmbmodel_iu_task',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'iu_taskid',type: 'string'}
            ,{name: 'brief',type: 'string'}
        ]
    });
    var cmbstore_iu_task_loaded=false;
    var cmbstore_iu_task = Ext.create('Ext.data.Store', {
        model:'cmbmodel_iu_task',
        autoLoad: false,
        autoSync: false,
        proxy: {
            type:   'ajax',
                url:   rootURL+'index.php/c_iu_task/getRows',
            reader: {
                type:   'json'
                ,root:  'data'
                ,successProperty:  'success'
                ,messageProperty:  'msg'
            }
        },
       listeners: {
       'load': function(){combo_iu_task_loaded =true;}
       }
    });

 Ext.define('model_iu_taskattach',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'iu_taskattachid',type: 'string'}
            ,{name: 'id',type: 'string'}
            ,{name: 'instanceid',type: 'string'}
            ,{name: 'brief',type: 'string'}
            ,{name:'origname', type: 'string'}
            ,{name:'dtype', type: 'string'}
            ,{name:'dtype_grid', type: 'string'}
            ,{name:'filereftype', type: 'string'}
            ,{name:'filereftype_grid', type: 'string'}
            ,{name:'info', type: 'string'}
            ,{name:'theref', type: 'string'}
            ,{name:'theref_ext', type: 'string'}
            ,{name:'filetext', type: 'string'}
            ,{name:'fileurl', type: 'string'}
        ]
    });


 Ext.define('model_iu_taskvideo',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'iu_taskvideoid',type: 'string'}
            ,{name: 'id',type: 'string'}
            ,{name: 'instanceid',type: 'string'}
            ,{name: 'brief',type: 'string'}
            ,{name:'origname', type: 'string'}
            ,{name:'fileref', type: 'string'}
            ,{name:'fileref_ext', type: 'string'}
            ,{name:'activeversion', type: 'int'}
            ,{name:'activeversion_grid', type: 'string'}
            ,{name:'version', type: 'number'}
            ,{name:'adddate', type: 'date',dateFormat:'Y-m-d H:i:s'}
            ,{name:'addby', type: 'string'}
            ,{name:'addby_grid', type: 'string'}
            ,{name:'doctype', type: 'string'}
            ,{name:'doctype_grid', type: 'string'}
            ,{name:'fileurl', type: 'string'}
            ,{name:'nocomments', type: 'int'}
            ,{name:'nocomments_grid', type: 'string'}
            ,{name:'info', type: 'string'}
        ]
    });


 Ext.define('model_iu_taskrefs',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'iu_taskrefsid',type: 'string'}
            ,{name: 'id',type: 'string'}
            ,{name: 'instanceid',type: 'string'}
            ,{name: 'brief',type: 'string'}
            ,{name:'info', type: 'string'}
            ,{name:'addby', type: 'string'}
            ,{name:'addby_grid', type: 'string'}
            ,{name:'adddate', type: 'date',dateFormat:'Y-m-d H:i:s'}
            ,{name:'filetext', type: 'string'}
            ,{name:'version', type: 'number'}
            ,{name:'dtypename', type: 'string'}
            ,{name:'fileurl', type: 'string'}
            ,{name:'filereftype', type: 'string'}
            ,{name:'filereftype_grid', type: 'string'}
            ,{name:'origname', type: 'string'}
            ,{name:'theref', type: 'string'}
            ,{name:'theref_ext', type: 'string'}
        ]
    });


 Ext.define('model_iu_tm_records',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'iu_tm_recordsid',type: 'string'}
            ,{name: 'id',type: 'string'}
            ,{name: 'instanceid',type: 'string'}
            ,{name: 'brief',type: 'string'}
            ,{name:'info', type: 'string'}
            ,{name:'passport', type: 'string'}
            ,{name:'tmfile', type: 'string'}
            ,{name:'tmfile_ext', type: 'string'}
            ,{name:'inn', type: 'string'}
            ,{name:'scaninn', type: 'string'}
            ,{name:'scaninn_ext', type: 'string'}
            ,{name:'thecomment', type: 'string'}
            ,{name:'snils', type: 'string'}
            ,{name:'scansnils', type: 'string'}
            ,{name:'scansnils_ext', type: 'string'}
            ,{name:'scanpassport', type: 'string'}
            ,{name:'scanpassport_ext', type: 'string'}
            ,{name:'bankinfo', type: 'string'}
        ]
    });


 Ext.define('model_iu_tmdef',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'iu_tmdefid',type: 'string'}
            ,{name: 'id',type: 'string'}
            ,{name: 'instanceid',type: 'string'}
            ,{name: 'brief',type: 'string'}
            ,{name:'surname', type: 'string'}
            ,{name:'ismethodist', type: 'int'}
            ,{name:'ismethodist_grid', type: 'string'}
            ,{name:'classes', type: 'string'}
            ,{name:'sendtomail', type: 'int'}
            ,{name:'sendtomail_grid', type: 'string'}
            ,{name:'name', type: 'string'}
            ,{name:'regal', type: 'string'}
            ,{name:'lastname', type: 'string'}
            ,{name:'workat', type: 'string'}
            ,{name:'email', type: 'string'}
            ,{name:'thetown', type: 'string'}
            ,{name:'thetown_grid', type: 'string'}
            ,{name:'thephone', type: 'string'}
            ,{name:'subjects', type: 'string'}
            ,{name:'subjects_grid', type: 'string'}
        ]
    });

 Ext.define('cmbmodel_iu_tmdef',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'iu_tmdefid',type: 'string'}
            ,{name: 'brief',type: 'string'}
        ]
    });
    var cmbstore_iu_tmdef_loaded=false;
    var cmbstore_iu_tmdef = Ext.create('Ext.data.Store', {
        model:'cmbmodel_iu_tmdef',
        autoLoad: false,
        autoSync: false,
        proxy: {
            type:   'ajax',
                url:   rootURL+'index.php/c_iu_tmdef/getRows',
            reader: {
                type:   'json'
                ,root:  'data'
                ,successProperty:  'success'
                ,messageProperty:  'msg'
            }
        },
       listeners: {
       'load': function(){combo_iu_tmdef_loaded =true;}
       }
    });

 Ext.define('model_iu_tmcadr',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'iu_tmcadrid',type: 'string'}
            ,{name: 'id',type: 'string'}
            ,{name: 'instanceid',type: 'string'}
            ,{name: 'brief',type: 'string'}
            ,{name:'photo', type: 'string'}
            ,{name:'photo_ext', type: 'string'}
            ,{name:'info', type: 'string'}
            ,{name:'mastercadr', type: 'int'}
            ,{name:'mastercadr_grid', type: 'string'}
        ]
    });


 Ext.define('model_iu_tm_act',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'iu_tm_actid',type: 'string'}
            ,{name: 'id',type: 'string'}
            ,{name: 'instanceid',type: 'string'}
            ,{name: 'brief',type: 'string'}
            ,{name:'aktnum', type: 'string'}
            ,{name:'thecomment', type: 'string'}
            ,{name:'payment', type: 'number'}
            ,{name:'aktfile', type: 'string'}
            ,{name:'aktfile_ext', type: 'string'}
            ,{name:'quantity', type: 'number'}
            ,{name:'paymentdate', type: 'date',dateFormat:'Y-m-d'}
        ]
    });


 Ext.define('model_iu_tm_actfile',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'iu_tm_actfileid',type: 'string'}
            ,{name: 'id',type: 'string'}
            ,{name: 'parentid',type: 'string'}
            ,{name: 'brief',type: 'string'}
            ,{name:'theref', type: 'string'}
            ,{name:'theref_ext', type: 'string'}
            ,{name:'info', type: 'string'}
            ,{name:'dtype', type: 'string'}
            ,{name:'dtype_grid', type: 'string'}
        ]
    });


 Ext.define('model_iu_tm_dog',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'iu_tm_dogid',type: 'string'}
            ,{name: 'id',type: 'string'}
            ,{name: 'instanceid',type: 'string'}
            ,{name: 'brief',type: 'string'}
            ,{name:'dogfile', type: 'string'}
            ,{name:'dogfile_ext', type: 'string'}
            ,{name:'info', type: 'string'}
            ,{name:'thenumber', type: 'string'}
            ,{name:'thedate', type: 'date',dateFormat:'Y-m-d'}
        ]
    });


 Ext.define('model_iu_u_def',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'iu_u_defid',type: 'string'}
            ,{name: 'id',type: 'string'}
            ,{name: 'instanceid',type: 'string'}
            ,{name: 'brief',type: 'string'}
            ,{name:'thephone', type: 'string'}
            ,{name:'surname', type: 'string'}
            ,{name:'email', type: 'string'}
            ,{name:'sendtomail', type: 'int'}
            ,{name:'sendtomail_grid', type: 'string'}
            ,{name:'lastsend', type: 'date',dateFormat:'Y-m-d H:i:s'}
            ,{name:'thetown', type: 'string'}
            ,{name:'thetown_grid', type: 'string'}
            ,{name:'login', type: 'string'}
            ,{name:'name', type: 'string'}
            ,{name:'lastname', type: 'string'}
            ,{name:'currole', type: 'string'}
            ,{name:'currole_grid', type: 'string'}
            ,{name:'freelancer', type: 'int'}
            ,{name:'freelancer_grid', type: 'string'}
        ]
    });

 Ext.define('cmbmodel_iu_u_def',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'iu_u_defid',type: 'string'}
            ,{name: 'brief',type: 'string'}
        ]
    });
    var cmbstore_iu_u_def_loaded=false;
    var cmbstore_iu_u_def = Ext.create('Ext.data.Store', {
        model:'cmbmodel_iu_u_def',
        autoLoad: false,
        autoSync: false,
        proxy: {
            type:   'ajax',
                url:   rootURL+'index.php/c_iu_u_def/getRows',
            reader: {
                type:   'json'
                ,root:  'data'
                ,successProperty:  'success'
                ,messageProperty:  'msg'
            }
        },
       listeners: {
       'load': function(){combo_iu_u_def_loaded =true;}
       }
    });



 Ext.define('model_iu_urok_docs',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'iu_urok_docsid',type: 'string'}
            ,{name: 'id',type: 'string'}
            ,{name: 'instanceid',type: 'string'}
            ,{name: 'brief',type: 'string'}
            ,{name:'adddate', type: 'date',dateFormat:'Y-m-d H:i:s'}
            ,{name:'doctype', type: 'string'}
            ,{name:'doctype_grid', type: 'string'}
            ,{name:'info', type: 'string'}
            ,{name:'activeversion', type: 'int'}
            ,{name:'activeversion_grid', type: 'string'}
            ,{name:'addby', type: 'string'}
            ,{name:'addby_grid', type: 'string'}
            ,{name:'filereftype', type: 'string'}
            ,{name:'filereftype_grid', type: 'string'}
            ,{name:'fileurl', type: 'string'}
            ,{name:'origname', type: 'string'}
            ,{name:'filetext', type: 'string'}
            ,{name:'version', type: 'number'}
            ,{name:'fileref', type: 'string'}
            ,{name:'fileref_ext', type: 'string'}
        ]
    });

 Ext.define('cmbmodel_iu_urok_docs',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'iu_urok_docsid',type: 'string'}
            ,{name: 'brief',type: 'string'}
        ]
    });
    var cmbstore_iu_urok_docs_loaded=false;
    var cmbstore_iu_urok_docs = Ext.create('Ext.data.Store', {
        model:'cmbmodel_iu_urok_docs',
        autoLoad: false,
        autoSync: false,
        proxy: {
            type:   'ajax',
                url:   rootURL+'index.php/c_iu_urok_docs/getRows',
            reader: {
                type:   'json'
                ,root:  'data'
                ,successProperty:  'success'
                ,messageProperty:  'msg'
            }
        },
       listeners: {
       'load': function(){combo_iu_urok_docs_loaded =true;}
       }
    });

 Ext.define('model_iu_urok_creators',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'iu_urok_creatorsid',type: 'string'}
            ,{name: 'id',type: 'string'}
            ,{name: 'instanceid',type: 'string'}
            ,{name: 'brief',type: 'string'}
            ,{name:'processrole', type: 'string'}
            ,{name:'processrole_grid', type: 'string'}
            ,{name:'selectday', type: 'date',dateFormat:'Y-m-d H:i:s'}
            ,{name:'doers', type: 'string'}
            ,{name:'doers_grid', type: 'string'}
            ,{name:'selectby', type: 'string'}
            ,{name:'selectby_grid', type: 'string'}
            ,{name:'doer', type: 'string'}
            ,{name:'doer_grid', type: 'string'}
        ]
    });


 Ext.define('model_iu_urok_def',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'iu_urok_defid',type: 'string'}
            ,{name: 'id',type: 'string'}
            ,{name: 'instanceid',type: 'string'}
            ,{name: 'brief',type: 'string'}
            ,{name:'actiondate', type: 'date',dateFormat:'Y-m-d'}
            ,{name:'info', type: 'string'}
            ,{name:'maketown', type: 'string'}
            ,{name:'maketown_grid', type: 'string'}
            ,{name:'methodist', type: 'string'}
            ,{name:'methodist_grid', type: 'string'}
            ,{name:'mainref', type: 'string'}
            ,{name:'thequarter', type: 'int'}
            ,{name:'thequarter_grid', type: 'string'}
            ,{name:'pubstate', type: 'string'}
            ,{name:'pubstate_grid', type: 'string'}
            ,{name:'ucode', type: 'string'}
            ,{name:'thefilm', type: 'string'}
            ,{name:'thefilm_grid', type: 'string'}
            ,{name:'coursetype', type: 'string'}
            ,{name:'coursetype_grid', type: 'string'}
            ,{name:'classtheme', type: 'string'}
            ,{name:'processtype', type: 'string'}
            ,{name:'processtype_grid', type: 'string'}
            ,{name:'curator', type: 'string'}
            ,{name:'curator_grid', type: 'string'}
            ,{name:'notes', type: 'string'}
            ,{name:'actiondate2', type: 'date',dateFormat:'Y-m-d'}
            ,{name:'thefilmurl', type: 'string'}
            ,{name:'subject', type: 'string'}
            ,{name:'subject_grid', type: 'string'}
            ,{name:'theteacher', type: 'string'}
            ,{name:'theteacher_grid', type: 'string'}
            ,{name:'rtheme', type: 'string'}
            ,{name:'methodist2', type: 'string'}
            ,{name:'methodist2_grid', type: 'string'}
            ,{name:'plannum', type: 'string'}
            ,{name:'schooldate', type: 'string'}
            ,{name:'ckksn', type: 'string'}
            ,{name:'ckksn_grid', type: 'string'}
            ,{name:'testpageref', type: 'string'}
            ,{name:'theclassnum', type: 'string'}
            ,{name:'theclassnum_grid', type: 'string'}
            ,{name:'datecreated', type: 'date',dateFormat:'Y-m-d H:i:s'}
		    ,{name:'laststate_grid', type: 'string'}
        ]
    });

 Ext.define('cmbmodel_iu_urok_def',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'iu_urok_defid',type: 'string'}
            ,{name: 'brief',type: 'string'}
        ]
    });
    var cmbstore_iu_urok_def_loaded=false;
    var cmbstore_iu_urok_def = Ext.create('Ext.data.Store', {
        model:'cmbmodel_iu_urok_def',
        autoLoad: false,
        autoSync: false,
        proxy: {
            type:   'ajax',
                url:   rootURL+'index.php/c_iu_urok_def/getRows',
            reader: {
                type:   'json'
                ,root:  'data'
                ,successProperty:  'success'
                ,messageProperty:  'msg'
            }
        },
       listeners: {
       'load': function(){combo_iu_urok_def_loaded =true;}
       }
    });

 Ext.define('model_iu_urok_video',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'iu_urok_videoid',type: 'string'}
            ,{name: 'id',type: 'string'}
            ,{name: 'instanceid',type: 'string'}
            ,{name: 'brief',type: 'string'}
            ,{name:'doctype', type: 'string'}
            ,{name:'doctype_grid', type: 'string'}
            ,{name:'origname', type: 'string'}
            ,{name:'adddate', type: 'date',dateFormat:'Y-m-d H:i:s'}
            ,{name:'activeversion', type: 'int'}
            ,{name:'activeversion_grid', type: 'string'}
            ,{name:'fileref', type: 'string'}
            ,{name:'fileref_ext', type: 'string'}
            ,{name:'addby', type: 'string'}
            ,{name:'addby_grid', type: 'string'}
            ,{name:'info', type: 'string'}
            ,{name:'fileurl', type: 'string'}
            ,{name:'nocomments', type: 'int'}
            ,{name:'nocomments_grid', type: 'string'}
            ,{name:'version', type: 'number'}
        ]
    });

 Ext.define('cmbmodel_iu_urok_video',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'iu_urok_videoid',type: 'string'}
            ,{name: 'brief',type: 'string'}
        ]
    });
    var cmbstore_iu_urok_video_loaded=false;
    var cmbstore_iu_urok_video = Ext.create('Ext.data.Store', {
        model:'cmbmodel_iu_urok_video',
        autoLoad: false,
        autoSync: false,
        proxy: {
            type:   'ajax',
                url:   rootURL+'index.php/c_iu_urok_video/getRows',
            reader: {
                type:   'json'
                ,root:  'data'
                ,successProperty:  'success'
                ,messageProperty:  'msg'
            }
        },
       listeners: {
       'load': function(){combo_iu_urok_video_loaded =true;}
       }
    });

 Ext.define('model_iu_urok_sn',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'iu_urok_snid',type: 'string'}
            ,{name: 'id',type: 'string'}
            ,{name: 'instanceid',type: 'string'}
            ,{name: 'brief',type: 'string'}
            ,{name:'urokstatus', type: 'string'}
            ,{name:'urokstatus_grid', type: 'string'}
            ,{name:'statusdate', type: 'date',dateFormat:'Y-m-d H:i:s'}
        ]
    });


 Ext.define('model_iu_urok_msg',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'iu_urok_msgid',type: 'string'}
            ,{name: 'id',type: 'string'}
            ,{name: 'instanceid',type: 'string'}
            ,{name: 'brief',type: 'string'}
            ,{name:'thedate', type: 'date',dateFormat:'Y-m-d H:i:s'}
            ,{name:'info', type: 'string'}
        ]
    });


 Ext.define('model_iu_urok_graph',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'iu_urok_graphid',type: 'string'}
            ,{name: 'id',type: 'string'}
            ,{name: 'instanceid',type: 'string'}
            ,{name: 'brief',type: 'string'}
            ,{name:'stageenddate', type: 'date',dateFormat:'Y-m-d H:i:s'}
            ,{name:'planstartdate', type: 'date',dateFormat:'Y-m-d'}
            ,{name:'passnumber', type: 'number'}
            ,{name:'stagepercent', type: 'int'}
            ,{name:'thestatus', type: 'string'}
            ,{name:'thestatus_grid', type: 'string'}
            ,{name:'stagestartdate', type: 'date',dateFormat:'Y-m-d H:i:s'}
            ,{name:'planduration', type: 'number'}
        ]
    });


 Ext.define('model_iu_urok_prc',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'iu_urok_prcid',type: 'string'}
            ,{name: 'id',type: 'string'}
            ,{name: 'instanceid',type: 'string'}
            ,{name: 'brief',type: 'string'}
            ,{name:'topstage', type: 'string'}
            ,{name:'topstage_grid', type: 'string'}
            ,{name:'isdone', type: 'int'}
            ,{name:'isdone_grid', type: 'string'}
            ,{name:'manualcontrol', type: 'int'}
            ,{name:'manualcontrol_grid', type: 'string'}
            ,{name:'taskdelayed', type: 'number'}
            ,{name:'laststate', type: 'string'}
            ,{name:'laststate_grid', type: 'string'}
            ,{name:'lastmessage', type: 'string'}
            ,{name:'theprocess', type: 'string'}
            ,{name:'theprocess_grid', type: 'string'}
            ,{name:'iu_urok_stage', type: 'string'}
            ,{name:'iu_urok_stage_grid', type: 'string'}
        ]
    });


 Ext.define('model_iud_adt_doc',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'iud_adt_docid',type: 'string'}
            ,{name: 'id',type: 'string'}
            ,{name: 'instanceid',type: 'string'}
            ,{name: 'brief',type: 'string'}
            ,{name:'name', type: 'string'}
        ]
    });

 Ext.define('cmbmodel_iud_adt_doc',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'iud_adt_docid',type: 'string'}
            ,{name: 'brief',type: 'string'}
        ]
    });
    var cmbstore_iud_adt_doc_loaded=false;
    var cmbstore_iud_adt_doc = Ext.create('Ext.data.Store', {
        model:'cmbmodel_iud_adt_doc',
        autoLoad: false,
        autoSync: false,
        proxy: {
            type:   'ajax',
                url:   rootURL+'index.php/c_iud_adt_doc/getRows',
            reader: {
                type:   'json'
                ,root:  'data'
                ,successProperty:  'success'
                ,messageProperty:  'msg'
            }
        },
       listeners: {
       'load': function(){combo_iud_adt_doc_loaded =true;}
       }
    });

 Ext.define('model_iud_ctype',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'iud_ctypeid',type: 'string'}
            ,{name: 'id',type: 'string'}
            ,{name: 'instanceid',type: 'string'}
            ,{name: 'brief',type: 'string'}
            ,{name:'name', type: 'string'}
        ]
    });

 Ext.define('cmbmodel_iud_ctype',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'iud_ctypeid',type: 'string'}
            ,{name: 'brief',type: 'string'}
        ]
    });
    var cmbstore_iud_ctype_loaded=false;
    var cmbstore_iud_ctype = Ext.create('Ext.data.Store', {
        model:'cmbmodel_iud_ctype',
        autoLoad: false,
        autoSync: false,
        proxy: {
            type:   'ajax',
                url:   rootURL+'index.php/c_iud_ctype/getRows',
            reader: {
                type:   'json'
                ,root:  'data'
                ,successProperty:  'success'
                ,messageProperty:  'msg'
            }
        },
       listeners: {
       'load': function(){combo_iud_ctype_loaded =true;}
       }
    });

 Ext.define('model_iud_filestoretype',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'iud_filestoretypeid',type: 'string'}
            ,{name: 'id',type: 'string'}
            ,{name: 'instanceid',type: 'string'}
            ,{name: 'brief',type: 'string'}
            ,{name:'name', type: 'string'}
        ]
    });

 Ext.define('cmbmodel_iud_filestoretype',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'iud_filestoretypeid',type: 'string'}
            ,{name: 'brief',type: 'string'}
        ]
    });
    var cmbstore_iud_filestoretype_loaded=false;
    var cmbstore_iud_filestoretype = Ext.create('Ext.data.Store', {
        model:'cmbmodel_iud_filestoretype',
        autoLoad: false,
        autoSync: false,
        proxy: {
            type:   'ajax',
                url:   rootURL+'index.php/c_iud_filestoretype/getRows',
            reader: {
                type:   'json'
                ,root:  'data'
                ,successProperty:  'success'
                ,messageProperty:  'msg'
            }
        },
       listeners: {
       'load': function(){combo_iud_filestoretype_loaded =true;}
       }
    });

 Ext.define('model_iud_filetype',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'iud_filetypeid',type: 'string'}
            ,{name: 'id',type: 'string'}
            ,{name: 'instanceid',type: 'string'}
            ,{name: 'brief',type: 'string'}
            ,{name:'name', type: 'string'}
            ,{name:'allowtiming', type: 'int'}
            ,{name:'allowtiming_grid', type: 'string'}
        ]
    });

 Ext.define('cmbmodel_iud_filetype',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'iud_filetypeid',type: 'string'}
            ,{name: 'brief',type: 'string'}
        ]
    });
    var cmbstore_iud_filetype_loaded=false;
    var cmbstore_iud_filetype = Ext.create('Ext.data.Store', {
        model:'cmbmodel_iud_filetype',
        autoLoad: false,
        autoSync: false,
        proxy: {
            type:   'ajax',
                url:   rootURL+'index.php/c_iud_filetype/getRows',
            reader: {
                type:   'json'
                ,root:  'data'
                ,successProperty:  'success'
                ,messageProperty:  'msg'
            }
        },
       listeners: {
       'load': function(){combo_iud_filetype_loaded =true;}
       }
    });

 Ext.define('model_iud_mt_def',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'iud_mt_defid',type: 'string'}
            ,{name: 'id',type: 'string'}
            ,{name: 'instanceid',type: 'string'}
            ,{name: 'brief',type: 'string'}
            ,{name:'name', type: 'string'}
            ,{name:'mticon', type: 'string'}
        ]
    });

 Ext.define('cmbmodel_iud_mt_def',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'iud_mt_defid',type: 'string'}
            ,{name: 'brief',type: 'string'}
        ]
    });
    var cmbstore_iud_mt_def_loaded=false;
    var cmbstore_iud_mt_def = Ext.create('Ext.data.Store', {
        model:'cmbmodel_iud_mt_def',
        autoLoad: false,
        autoSync: false,
        proxy: {
            type:   'ajax',
                url:   rootURL+'index.php/c_iud_mt_def/getRows',
            reader: {
                type:   'json'
                ,root:  'data'
                ,successProperty:  'success'
                ,messageProperty:  'msg'
            }
        },
       listeners: {
       'load': function(){combo_iud_mt_def_loaded =true;}
       }
    });

 Ext.define('model_iud_predmet',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'iud_predmetid',type: 'string'}
            ,{name: 'id',type: 'string'}
            ,{name: 'instanceid',type: 'string'}
            ,{name: 'brief',type: 'string'}
            ,{name:'name', type: 'string'}
            ,{name:'predmeticon', type: 'string'}
            ,{name:'prefix', type: 'string'}
        ]
    });

 Ext.define('cmbmodel_iud_predmet',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'iud_predmetid',type: 'string'}
            ,{name: 'brief',type: 'string'}
        ]
    });
    var cmbstore_iud_predmet_loaded=false;
    var cmbstore_iud_predmet = Ext.create('Ext.data.Store', {
        model:'cmbmodel_iud_predmet',
        autoLoad: false,
        autoSync: false,
        proxy: {
            type:   'ajax',
                url:   rootURL+'index.php/c_iud_predmet/getRows',
            reader: {
                type:   'json'
                ,root:  'data'
                ,successProperty:  'success'
                ,messageProperty:  'msg'
            }
        },
       listeners: {
       'load': function(){combo_iud_predmet_loaded =true;}
       }
    });

 Ext.define('model_iud_process_def',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'iud_process_defid',type: 'string'}
            ,{name: 'id',type: 'string'}
            ,{name: 'instanceid',type: 'string'}
            ,{name: 'brief',type: 'string'}
            ,{name:'name', type: 'string'}
        ]
    });

 Ext.define('cmbmodel_iud_process_def',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'iud_process_defid',type: 'string'}
            ,{name: 'brief',type: 'string'}
        ]
    });
    var cmbstore_iud_process_def_loaded=false;
    var cmbstore_iud_process_def = Ext.create('Ext.data.Store', {
        model:'cmbmodel_iud_process_def',
        autoLoad: false,
        autoSync: false,
        proxy: {
            type:   'ajax',
                url:   rootURL+'index.php/c_iud_process_def/getRows',
            reader: {
                type:   'json'
                ,root:  'data'
                ,successProperty:  'success'
                ,messageProperty:  'msg'
            }
        },
       listeners: {
       'load': function(){combo_iud_process_def_loaded =true;}
       }
    });

 Ext.define('model_iud_rt_def',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'iud_rt_defid',type: 'string'}
            ,{name: 'id',type: 'string'}
            ,{name: 'instanceid',type: 'string'}
            ,{name: 'brief',type: 'string'}
            ,{name:'name', type: 'string'}
        ]
    });

 Ext.define('cmbmodel_iud_rt_def',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'iud_rt_defid',type: 'string'}
            ,{name: 'brief',type: 'string'}
        ]
    });
    var cmbstore_iud_rt_def_loaded=false;
    var cmbstore_iud_rt_def = Ext.create('Ext.data.Store', {
        model:'cmbmodel_iud_rt_def',
        autoLoad: false,
        autoSync: false,
        proxy: {
            type:   'ajax',
                url:   rootURL+'index.php/c_iud_rt_def/getRows',
            reader: {
                type:   'json'
                ,root:  'data'
                ,successProperty:  'success'
                ,messageProperty:  'msg'
            }
        },
       listeners: {
       'load': function(){combo_iud_rt_def_loaded =true;}
       }
    });

 Ext.define('model_iud_sn_def',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'iud_sn_defid',type: 'string'}
            ,{name: 'id',type: 'string'}
            ,{name: 'instanceid',type: 'string'}
            ,{name: 'brief',type: 'string'}
            ,{name:'isfinal', type: 'int'}
            ,{name:'isfinal_grid', type: 'string'}
            ,{name:'name', type: 'string'}
            ,{name:'sequence', type: 'number'}
        ]
    });

 Ext.define('cmbmodel_iud_sn_def',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'iud_sn_defid',type: 'string'}
            ,{name: 'brief',type: 'string'}
        ]
    });
    var cmbstore_iud_sn_def_loaded=false;
    var cmbstore_iud_sn_def = Ext.create('Ext.data.Store', {
        model:'cmbmodel_iud_sn_def',
        autoLoad: false,
        autoSync: false,
        proxy: {
            type:   'ajax',
                url:   rootURL+'index.php/c_iud_sn_def/getRows',
            reader: {
                type:   'json'
                ,root:  'data'
                ,successProperty:  'success'
                ,messageProperty:  'msg'
            }
        },
       listeners: {
       'load': function(){combo_iud_sn_def_loaded =true;}
       }
    });

 Ext.define('model_iud_spub',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'iud_spubid',type: 'string'}
            ,{name: 'id',type: 'string'}
            ,{name: 'instanceid',type: 'string'}
            ,{name: 'brief',type: 'string'}
            ,{name:'name', type: 'string'}
        ]
    });

 Ext.define('cmbmodel_iud_spub',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'iud_spubid',type: 'string'}
            ,{name: 'brief',type: 'string'}
        ]
    });
    var cmbstore_iud_spub_loaded=false;
    var cmbstore_iud_spub = Ext.create('Ext.data.Store', {
        model:'cmbmodel_iud_spub',
        autoLoad: false,
        autoSync: false,
        proxy: {
            type:   'ajax',
                url:   rootURL+'index.php/c_iud_spub/getRows',
            reader: {
                type:   'json'
                ,root:  'data'
                ,successProperty:  'success'
                ,messageProperty:  'msg'
            }
        },
       listeners: {
       'load': function(){combo_iud_spub_loaded =true;}
       }
    });

 Ext.define('model_iud_stagedef',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'iud_stagedefid',type: 'string'}
            ,{name: 'id',type: 'string'}
            ,{name: 'instanceid',type: 'string'}
            ,{name: 'brief',type: 'string'}
            ,{name:'stageicon', type: 'string'}
            ,{name:'name', type: 'string'}
            ,{name:'sequence', type: 'number'}
        ]
    });

 Ext.define('cmbmodel_iud_stagedef',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'iud_stagedefid',type: 'string'}
            ,{name: 'brief',type: 'string'}
        ]
    });
    var cmbstore_iud_stagedef_loaded=false;
    var cmbstore_iud_stagedef = Ext.create('Ext.data.Store', {
        model:'cmbmodel_iud_stagedef',
        autoLoad: false,
        autoSync: false,
        proxy: {
            type:   'ajax',
                url:   rootURL+'index.php/c_iud_stagedef/getRows',
            reader: {
                type:   'json'
                ,root:  'data'
                ,successProperty:  'success'
                ,messageProperty:  'msg'
            }
        },
       listeners: {
       'load': function(){combo_iud_stagedef_loaded =true;}
       }
    });

 Ext.define('model_iud_town',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'iud_townid',type: 'string'}
            ,{name: 'id',type: 'string'}
            ,{name: 'instanceid',type: 'string'}
            ,{name: 'brief',type: 'string'}
            ,{name:'name', type: 'string'}
        ]
    });

 Ext.define('cmbmodel_iud_town',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'iud_townid',type: 'string'}
            ,{name: 'brief',type: 'string'}
        ]
    });
    var cmbstore_iud_town_loaded=false;
    var cmbstore_iud_town = Ext.create('Ext.data.Store', {
        model:'cmbmodel_iud_town',
        autoLoad: false,
        autoSync: false,
        proxy: {
            type:   'ajax',
                url:   rootURL+'index.php/c_iud_town/getRows',
            reader: {
                type:   'json'
                ,root:  'data'
                ,successProperty:  'success'
                ,messageProperty:  'msg'
            }
        },
       listeners: {
       'load': function(){combo_iud_town_loaded =true;}
       }
    });

 Ext.define('model_iud_videotype',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'iud_videotypeid',type: 'string'}
            ,{name: 'id',type: 'string'}
            ,{name: 'instanceid',type: 'string'}
            ,{name: 'brief',type: 'string'}
            ,{name:'filetype', type: 'string'}
            ,{name:'filetype_grid', type: 'string'}
            ,{name:'name', type: 'string'}
            ,{name:'nocomments', type: 'int'}
            ,{name:'nocomments_grid', type: 'string'}
            ,{name:'versionpolicy', type: 'string'}
            ,{name:'versionpolicy_grid', type: 'string'}
            ,{name:'sequence', type: 'number'}
        ]
    });

 Ext.define('cmbmodel_iud_videotype',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'iud_videotypeid',type: 'string'}
            ,{name: 'brief',type: 'string'}
        ]
    });
    var cmbstore_iud_videotype_loaded=false;
    var cmbstore_iud_videotype = Ext.create('Ext.data.Store', {
        model:'cmbmodel_iud_videotype',
        autoLoad: false,
        autoSync: false,
        proxy: {
            type:   'ajax',
                url:   rootURL+'index.php/c_iud_videotype/getRows',
            reader: {
                type:   'json'
                ,root:  'data'
                ,successProperty:  'success'
                ,messageProperty:  'msg'
            }
        },
       listeners: {
       'load': function(){combo_iud_videotype_loaded =true;}
       }
    });

 Ext.define('model_mtz2job_def',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'mtz2job_defid',type: 'string'}
            ,{name: 'id',type: 'string'}
            ,{name: 'instanceid',type: 'string'}
            ,{name: 'brief',type: 'string'}
            ,{name:'nextstate', type: 'string'}
            ,{name:'thrustate', type: 'string'}
            ,{name:'thruobject', type: 'string'}
            ,{name:'thruobject_grid', type: 'string'}
            ,{name:'eventype', type: 'string'}
            ,{name:'eventdate', type: 'date',dateFormat:'Y-m-d H:i:s'}
            ,{name:'processdate', type: 'date',dateFormat:'Y-m-d H:i:s'}
            ,{name:'processed', type: 'int'}
            ,{name:'processed_grid', type: 'string'}
        ]
    });


 Ext.define('model_mtzext_def',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'mtzext_defid',type: 'string'}
            ,{name: 'id',type: 'string'}
            ,{name: 'instanceid',type: 'string'}
            ,{name: 'brief',type: 'string'}
            ,{name:'name', type: 'string'}
            ,{name:'exttype', type: 'int'}
            ,{name:'exttype_grid', type: 'string'}
            ,{name:'thedescription', type: 'string'}
        ]
    });


 Ext.define('model_mtzextrel',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'mtzextrelid',type: 'string'}
            ,{name: 'id',type: 'string'}
            ,{name: 'instanceid',type: 'string'}
            ,{name: 'brief',type: 'string'}
            ,{name:'theclassname', type: 'string'}
            ,{name:'theplatform', type: 'int'}
            ,{name:'theplatform_grid', type: 'string'}
            ,{name:'thelibraryname', type: 'string'}
        ]
    });


 Ext.define('model_filterfieldgroup',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'filterfieldgroupid',type: 'string'}
            ,{name: 'id',type: 'string'}
            ,{name: 'instanceid',type: 'string'}
            ,{name: 'brief',type: 'string'}
            ,{name:'caption', type: 'string'}
            ,{name:'sequence', type: 'number'}
            ,{name:'name', type: 'string'}
            ,{name:'allowignore', type: 'int'}
            ,{name:'allowignore_grid', type: 'string'}
        ]
    });


 Ext.define('model_fileterfield',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'fileterfieldid',type: 'string'}
            ,{name: 'id',type: 'string'}
            ,{name: 'parentid',type: 'string'}
            ,{name: 'brief',type: 'string'}
            ,{name:'fieldsize', type: 'number'}
            ,{name:'reftotype', type: 'string'}
            ,{name:'reftotype_grid', type: 'string'}
            ,{name:'reftype', type: 'int'}
            ,{name:'reftype_grid', type: 'string'}
            ,{name:'caption', type: 'string'}
            ,{name:'name', type: 'string'}
            ,{name:'fieldtype', type: 'string'}
            ,{name:'fieldtype_grid', type: 'string'}
            ,{name:'valuearray', type: 'int'}
            ,{name:'valuearray_grid', type: 'string'}
            ,{name:'sequence', type: 'number'}
            ,{name:'reftopart', type: 'string'}
            ,{name:'reftopart_grid', type: 'string'}
        ]
    });


 Ext.define('model_filters',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'filtersid',type: 'string'}
            ,{name: 'id',type: 'string'}
            ,{name: 'instanceid',type: 'string'}
            ,{name: 'brief',type: 'string'}
            ,{name:'thecaption', type: 'string'}
            ,{name:'thecomment', type: 'string'}
            ,{name:'name', type: 'string'}
        ]
    });


 Ext.define('model_journalcolumn',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'journalcolumnid',type: 'string'}
            ,{name: 'id',type: 'string'}
            ,{name: 'instanceid',type: 'string'}
            ,{name: 'brief',type: 'string'}
            ,{name:'columnalignment', type: 'int'}
            ,{name:'columnalignment_grid', type: 'string'}
            ,{name:'groupaggregation', type: 'int'}
            ,{name:'groupaggregation_grid', type: 'string'}
            ,{name:'name', type: 'string'}
            ,{name:'colsort', type: 'int'}
            ,{name:'colsort_grid', type: 'string'}
            ,{name:'sequence', type: 'number'}
        ]
    });


 Ext.define('model_jcolumnsource',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'jcolumnsourceid',type: 'string'}
            ,{name: 'id',type: 'string'}
            ,{name: 'parentid',type: 'string'}
            ,{name: 'brief',type: 'string'}
            ,{name:'viewfield', type: 'string'}
            ,{name:'srcpartview', type: 'string'}
            ,{name:'srcpartview_grid', type: 'string'}
        ]
    });


 Ext.define('model_journalsrc',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'journalsrcid',type: 'string'}
            ,{name: 'id',type: 'string'}
            ,{name: 'instanceid',type: 'string'}
            ,{name: 'brief',type: 'string'}
            ,{name:'viewalias', type: 'string'}
            ,{name:'onrun', type: 'int'}
            ,{name:'onrun_grid', type: 'string'}
            ,{name:'openmode', type: 'string'}
            ,{name:'partview', type: 'string'}
        ]
    });

 Ext.define('cmbmodel_journalsrc',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'journalsrcid',type: 'string'}
            ,{name: 'brief',type: 'string'}
        ]
    });
    var cmbstore_journalsrc_loaded=false;
    var cmbstore_journalsrc = Ext.create('Ext.data.Store', {
        model:'cmbmodel_journalsrc',
        autoLoad: false,
        autoSync: false,
        proxy: {
            type:   'ajax',
                url:   rootURL+'index.php/c_journalsrc/getRows',
            reader: {
                type:   'json'
                ,root:  'data'
                ,successProperty:  'success'
                ,messageProperty:  'msg'
            }
        },
       listeners: {
       'load': function(){combo_journalsrc_loaded =true;}
       }
    });

 Ext.define('model_journal',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'journalid',type: 'string'}
            ,{name: 'id',type: 'string'}
            ,{name: 'instanceid',type: 'string'}
            ,{name: 'brief',type: 'string'}
            ,{name:'name', type: 'string'}
            ,{name:'thecomment', type: 'string'}
            ,{name:'jrnliconcls', type: 'string'}
            ,{name:'the_alias', type: 'string'}
            ,{name:'usefavorites', type: 'int'}
            ,{name:'usefavorites_grid', type: 'string'}
        ]
    });


 Ext.define('model_genpackage',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'genpackageid',type: 'string'}
            ,{name: 'id',type: 'string'}
            ,{name: 'instanceid',type: 'string'}
            ,{name: 'brief',type: 'string'}
            ,{name:'name', type: 'string'}
        ]
    });


 Ext.define('model_generator_target',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'generator_targetid',type: 'string'}
            ,{name: 'id',type: 'string'}
            ,{name: 'parentid',type: 'string'}
            ,{name: 'brief',type: 'string'}
            ,{name:'name', type: 'string'}
            ,{name:'generatorstyle', type: 'int'}
            ,{name:'generatorstyle_grid', type: 'string'}
            ,{name:'queuename', type: 'string'}
            ,{name:'thedevelopmentenv', type: 'int'}
            ,{name:'thedevelopmentenv_grid', type: 'string'}
            ,{name:'generatorprogid', type: 'string'}
            ,{name:'targettype', type: 'int'}
            ,{name:'targettype_grid', type: 'string'}
        ]
    });

 Ext.define('cmbmodel_generator_target',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'generator_targetid',type: 'string'}
            ,{name: 'brief',type: 'string'}
        ]
    });
    var cmbstore_generator_target_loaded=false;
    var cmbstore_generator_target = Ext.create('Ext.data.Store', {
        model:'cmbmodel_generator_target',
        autoLoad: false,
        autoSync: false,
        proxy: {
            type:   'ajax',
                url:   rootURL+'index.php/c_generator_target/getRows',
            reader: {
                type:   'json'
                ,root:  'data'
                ,successProperty:  'success'
                ,messageProperty:  'msg'
            }
        },
       listeners: {
       'load': function(){combo_generator_target_loaded =true;}
       }
    });

 Ext.define('model_genreference',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'genreferenceid',type: 'string'}
            ,{name: 'id',type: 'string'}
            ,{name: 'parentid',type: 'string'}
            ,{name: 'brief',type: 'string'}
            ,{name:'refclassid', type: 'string'}
            ,{name:'versionmajor', type: 'number'}
            ,{name:'name', type: 'string'}
            ,{name:'versionminor', type: 'number'}
        ]
    });


 Ext.define('model_genmanualcode',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'genmanualcodeid',type: 'string'}
            ,{name: 'id',type: 'string'}
            ,{name: 'parentid',type: 'string'}
            ,{name: 'brief',type: 'string'}
            ,{name:'code', type: 'string'}
            ,{name:'the_alias', type: 'string'}
            ,{name:'name', type: 'string'}
        ]
    });


 Ext.define('model_gencontrols',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'gencontrolsid',type: 'string'}
            ,{name: 'id',type: 'string'}
            ,{name: 'parentid',type: 'string'}
            ,{name: 'brief',type: 'string'}
            ,{name:'versionminor', type: 'number'}
            ,{name:'versionmajor', type: 'number'}
            ,{name:'controlprogid', type: 'string'}
            ,{name:'controlclassid', type: 'string'}
        ]
    });


 Ext.define('model_localizeinfo',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'localizeinfoid',type: 'string'}
            ,{name: 'id',type: 'string'}
            ,{name: 'instanceid',type: 'string'}
            ,{name: 'brief',type: 'string'}
            ,{name:'langfull', type: 'string'}
            ,{name:'langshort', type: 'string'}
        ]
    });


 Ext.define('model_fieldtype',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'fieldtypeid',type: 'string'}
            ,{name: 'id',type: 'string'}
            ,{name: 'instanceid',type: 'string'}
            ,{name: 'brief',type: 'string'}
            ,{name:'delayedsave', type: 'int'}
            ,{name:'delayedsave_grid', type: 'string'}
            ,{name:'typestyle', type: 'int'}
            ,{name:'typestyle_grid', type: 'string'}
            ,{name:'name', type: 'string'}
            ,{name:'gridsorttype', type: 'int'}
            ,{name:'gridsorttype_grid', type: 'string'}
            ,{name:'the_comment', type: 'string'}
            ,{name:'allowsize', type: 'int'}
            ,{name:'allowsize_grid', type: 'string'}
            ,{name:'allowlikesearch', type: 'int'}
            ,{name:'allowlikesearch_grid', type: 'string'}
            ,{name:'maximum', type: 'string'}
            ,{name:'minimum', type: 'string'}
        ]
    });

 Ext.define('cmbmodel_fieldtype',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'fieldtypeid',type: 'string'}
            ,{name: 'brief',type: 'string'}
        ]
    });
    var cmbstore_fieldtype_loaded=false;
    var cmbstore_fieldtype = Ext.create('Ext.data.Store', {
        model:'cmbmodel_fieldtype',
        autoLoad: false,
        autoSync: false,
        proxy: {
            type:   'ajax',
                url:   rootURL+'index.php/c_fieldtype/getRows',
            reader: {
                type:   'json'
                ,root:  'data'
                ,successProperty:  'success'
                ,messageProperty:  'msg'
            }
        },
       listeners: {
       'load': function(){combo_fieldtype_loaded =true;}
       }
    });

 Ext.define('model_enumitem',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'enumitemid',type: 'string'}
            ,{name: 'id',type: 'string'}
            ,{name: 'parentid',type: 'string'}
            ,{name: 'brief',type: 'string'}
            ,{name:'name', type: 'string'}
            ,{name:'nameincode', type: 'string'}
            ,{name:'namevalue', type: 'number'}
        ]
    });


 Ext.define('model_fieldtypemap',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'fieldtypemapid',type: 'string'}
            ,{name: 'id',type: 'string'}
            ,{name: 'parentid',type: 'string'}
            ,{name: 'brief',type: 'string'}
            ,{name:'fixedsize', type: 'number'}
            ,{name:'stoagetype', type: 'string'}
            ,{name:'target', type: 'string'}
            ,{name:'target_grid', type: 'string'}
        ]
    });


 Ext.define('model_sharedmethod',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'sharedmethodid',type: 'string'}
            ,{name: 'id',type: 'string'}
            ,{name: 'instanceid',type: 'string'}
            ,{name: 'brief',type: 'string'}
            ,{name:'name', type: 'string'}
            ,{name:'the_comment', type: 'string'}
            ,{name:'returntype', type: 'string'}
            ,{name:'returntype_grid', type: 'string'}
        ]
    });

 Ext.define('cmbmodel_sharedmethod',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'sharedmethodid',type: 'string'}
            ,{name: 'brief',type: 'string'}
        ]
    });
    var cmbstore_sharedmethod_loaded=false;
    var cmbstore_sharedmethod = Ext.create('Ext.data.Store', {
        model:'cmbmodel_sharedmethod',
        autoLoad: false,
        autoSync: false,
        proxy: {
            type:   'ajax',
                url:   rootURL+'index.php/c_sharedmethod/getRows',
            reader: {
                type:   'json'
                ,root:  'data'
                ,successProperty:  'success'
                ,messageProperty:  'msg'
            }
        },
       listeners: {
       'load': function(){combo_sharedmethod_loaded =true;}
       }
    });

 Ext.define('model_script',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'scriptid',type: 'string'}
            ,{name: 'id',type: 'string'}
            ,{name: 'parentid',type: 'string'}
            ,{name: 'brief',type: 'string'}
            ,{name:'code', type: 'string'}
            ,{name:'target', type: 'string'}
            ,{name:'target_grid', type: 'string'}
        ]
    });


 Ext.define('model_parameters',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'parametersid',type: 'string'}
            ,{name: 'id',type: 'string'}
            ,{name: 'parentid',type: 'string'}
            ,{name: 'brief',type: 'string'}
            ,{name:'caption', type: 'string'}
            ,{name:'reftopart', type: 'string'}
            ,{name:'reftopart_grid', type: 'string'}
            ,{name:'outparam', type: 'int'}
            ,{name:'outparam_grid', type: 'string'}
            ,{name:'datasize', type: 'number'}
            ,{name:'name', type: 'string'}
            ,{name:'typeofparm', type: 'string'}
            ,{name:'typeofparm_grid', type: 'string'}
            ,{name:'sequence', type: 'number'}
            ,{name:'referencetype', type: 'int'}
            ,{name:'referencetype_grid', type: 'string'}
            ,{name:'allownull', type: 'int'}
            ,{name:'allownull_grid', type: 'string'}
            ,{name:'reftotype', type: 'string'}
            ,{name:'reftotype_grid', type: 'string'}
        ]
    });


 Ext.define('model_objecttype',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'objecttypeid',type: 'string'}
            ,{name: 'id',type: 'string'}
            ,{name: 'instanceid',type: 'string'}
            ,{name: 'brief',type: 'string'}
            ,{name:'objiconcls', type: 'string'}
            ,{name:'name', type: 'string'}
            ,{name:'thecomment', type: 'string'}
            ,{name:'useownership', type: 'int'}
            ,{name:'useownership_grid', type: 'string'}
            ,{name:'ondelete', type: 'string'}
            ,{name:'ondelete_grid', type: 'string'}
            ,{name:'usearchiving', type: 'int'}
            ,{name:'usearchiving_grid', type: 'string'}
            ,{name:'replicatype', type: 'int'}
            ,{name:'replicatype_grid', type: 'string'}
            ,{name:'oncreate', type: 'string'}
            ,{name:'oncreate_grid', type: 'string'}
            ,{name:'commitfullobject', type: 'int'}
            ,{name:'commitfullobject_grid', type: 'string'}
            ,{name:'allowreftoobject', type: 'int'}
            ,{name:'allowreftoobject_grid', type: 'string'}
            ,{name:'package', type: 'string'}
            ,{name:'package_grid', type: 'string'}
            ,{name:'onrun', type: 'string'}
            ,{name:'onrun_grid', type: 'string'}
            ,{name:'the_comment', type: 'string'}
            ,{name:'chooseview', type: 'string'}
            ,{name:'chooseview_grid', type: 'string'}
            ,{name:'issingleinstance', type: 'int'}
            ,{name:'issingleinstance_grid', type: 'string'}
            ,{name:'allowsearch', type: 'int'}
            ,{name:'allowsearch_grid', type: 'string'}
        ]
    });

 Ext.define('cmbmodel_objecttype',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'objecttypeid',type: 'string'}
            ,{name: 'brief',type: 'string'}
        ]
    });
    var cmbstore_objecttype_loaded=false;
    var cmbstore_objecttype = Ext.create('Ext.data.Store', {
        model:'cmbmodel_objecttype',
        autoLoad: false,
        autoSync: false,
        proxy: {
            type:   'ajax',
                url:   rootURL+'index.php/c_objecttype/getRows',
            reader: {
                type:   'json'
                ,root:  'data'
                ,successProperty:  'success'
                ,messageProperty:  'msg'
            }
        },
       listeners: {
       'load': function(){combo_objecttype_loaded =true;}
       }
    });

 Ext.define('model_objstatus',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'objstatusid',type: 'string'}
            ,{name: 'id',type: 'string'}
            ,{name: 'parentid',type: 'string'}
            ,{name: 'brief',type: 'string'}
            ,{name:'isarchive', type: 'int'}
            ,{name:'isarchive_grid', type: 'string'}
            ,{name:'name', type: 'string'}
            ,{name:'the_comment', type: 'string'}
            ,{name:'isstartup', type: 'int'}
            ,{name:'isstartup_grid', type: 'string'}
        ]
    });

 Ext.define('cmbmodel_objstatus',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'objstatusid',type: 'string'}
            ,{name: 'brief',type: 'string'}
        ]
    });
    var cmbstore_objstatus_loaded=false;
    var cmbstore_objstatus = Ext.create('Ext.data.Store', {
        model:'cmbmodel_objstatus',
        autoLoad: false,
        autoSync: false,
        proxy: {
            type:   'ajax',
                url:   rootURL+'index.php/c_objstatus/getRows',
            reader: {
                type:   'json'
                ,root:  'data'
                ,successProperty:  'success'
                ,messageProperty:  'msg'
            }
        },
       listeners: {
       'load': function(){combo_objstatus_loaded =true;}
       }
    });

 Ext.define('model_nextstate',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'nextstateid',type: 'string'}
            ,{name: 'id',type: 'string'}
            ,{name: 'parentid',type: 'string'}
            ,{name: 'brief',type: 'string'}
            ,{name:'thestate', type: 'string'}
            ,{name:'thestate_grid', type: 'string'}
        ]
    });


 Ext.define('model_objectmode',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'objectmodeid',type: 'string'}
            ,{name: 'id',type: 'string'}
            ,{name: 'parentid',type: 'string'}
            ,{name: 'brief',type: 'string'}
            ,{name:'thecomment', type: 'string'}
            ,{name:'name', type: 'string'}
            ,{name:'defaultmode', type: 'int'}
            ,{name:'defaultmode_grid', type: 'string'}
        ]
    });

 Ext.define('cmbmodel_objectmode',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'objectmodeid',type: 'string'}
            ,{name: 'brief',type: 'string'}
        ]
    });
    var cmbstore_objectmode_loaded=false;
    var cmbstore_objectmode = Ext.create('Ext.data.Store', {
        model:'cmbmodel_objectmode',
        autoLoad: false,
        autoSync: false,
        proxy: {
            type:   'ajax',
                url:   rootURL+'index.php/c_objectmode/getRows',
            reader: {
                type:   'json'
                ,root:  'data'
                ,successProperty:  'success'
                ,messageProperty:  'msg'
            }
        },
       listeners: {
       'load': function(){combo_objectmode_loaded =true;}
       }
    });

 Ext.define('model_structrestriction',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'structrestrictionid',type: 'string'}
            ,{name: 'id',type: 'string'}
            ,{name: 'parentid',type: 'string'}
            ,{name: 'brief',type: 'string'}
            ,{name:'allowadd', type: 'int'}
            ,{name:'allowadd_grid', type: 'string'}
            ,{name:'allowdelete', type: 'int'}
            ,{name:'allowdelete_grid', type: 'string'}
            ,{name:'allowread', type: 'int'}
            ,{name:'allowread_grid', type: 'string'}
            ,{name:'struct', type: 'string'}
            ,{name:'struct_grid', type: 'string'}
            ,{name:'allowedit', type: 'int'}
            ,{name:'allowedit_grid', type: 'string'}
        ]
    });


 Ext.define('model_methodrestriction',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'methodrestrictionid',type: 'string'}
            ,{name: 'id',type: 'string'}
            ,{name: 'parentid',type: 'string'}
            ,{name: 'brief',type: 'string'}
            ,{name:'isrestricted', type: 'int'}
            ,{name:'isrestricted_grid', type: 'string'}
            ,{name:'part', type: 'string'}
            ,{name:'part_grid', type: 'string'}
            ,{name:'method', type: 'string'}
            ,{name:'method_grid', type: 'string'}
        ]
    });


 Ext.define('model_fieldrestriction',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'fieldrestrictionid',type: 'string'}
            ,{name: 'id',type: 'string'}
            ,{name: 'parentid',type: 'string'}
            ,{name: 'brief',type: 'string'}
            ,{name:'mandatoryfield', type: 'int'}
            ,{name:'mandatoryfield_grid', type: 'string'}
            ,{name:'thefield', type: 'string'}
            ,{name:'thefield_grid', type: 'string'}
            ,{name:'thepart', type: 'string'}
            ,{name:'thepart_grid', type: 'string'}
            ,{name:'allowmodify', type: 'int'}
            ,{name:'allowmodify_grid', type: 'string'}
            ,{name:'allowread', type: 'int'}
            ,{name:'allowread_grid', type: 'string'}
        ]
    });


 Ext.define('model_typemenu',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'typemenuid',type: 'string'}
            ,{name: 'id',type: 'string'}
            ,{name: 'parentid',type: 'string'}
            ,{name: 'brief',type: 'string'}
            ,{name:'caption', type: 'string'}
            ,{name:'tooltip', type: 'string'}
            ,{name:'ismenuitem', type: 'int'}
            ,{name:'ismenuitem_grid', type: 'string'}
            ,{name:'hotkey', type: 'string'}
            ,{name:'name', type: 'string'}
            ,{name:'istoolbarbutton', type: 'int'}
            ,{name:'istoolbarbutton_grid', type: 'string'}
            ,{name:'the_action', type: 'string'}
            ,{name:'the_action_grid', type: 'string'}
        ]
    });

 Ext.define('cmbmodel_typemenu',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'typemenuid',type: 'string'}
            ,{name: 'brief',type: 'string'}
        ]
    });
    var cmbstore_typemenu_loaded=false;
    var cmbstore_typemenu = Ext.create('Ext.data.Store', {
        model:'cmbmodel_typemenu',
        autoLoad: false,
        autoSync: false,
        proxy: {
            type:   'ajax',
                url:   rootURL+'index.php/c_typemenu/getRows',
            reader: {
                type:   'json'
                ,root:  'data'
                ,successProperty:  'success'
                ,messageProperty:  'msg'
            }
        },
       listeners: {
       'load': function(){combo_typemenu_loaded =true;}
       }
    });

 Ext.define('model_instancevalidator',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'instancevalidatorid',type: 'string'}
            ,{name: 'id',type: 'string'}
            ,{name: 'parentid',type: 'string'}
            ,{name: 'brief',type: 'string'}
            ,{name:'target', type: 'string'}
            ,{name:'target_grid', type: 'string'}
            ,{name:'code', type: 'string'}
        ]
    });


 Ext.define('model_part',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'partid',type: 'string'}
            ,{name: 'id',type: 'string'}
            ,{name: 'parentid',type: 'string'}
            ,{name: 'brief',type: 'string'}
            ,{name: 'parentrowid',type: 'string'}
            ,{name:'particoncls', type: 'string'}
            ,{name:'rulebrief', type: 'string'}
            ,{name:'integerpkey', type: 'int'}
            ,{name:'integerpkey_grid', type: 'string'}
            ,{name:'manualregister', type: 'int'}
            ,{name:'manualregister_grid', type: 'string'}
            ,{name:'ondelete', type: 'string'}
            ,{name:'ondelete_grid', type: 'string'}
            ,{name:'addbehaivor', type: 'int'}
            ,{name:'addbehaivor_grid', type: 'string'}
            ,{name:'name', type: 'string'}
            ,{name:'onsave', type: 'string'}
            ,{name:'onsave_grid', type: 'string'}
            ,{name:'oncreate', type: 'string'}
            ,{name:'oncreate_grid', type: 'string'}
            ,{name:'the_comment', type: 'string'}
            ,{name:'usearchiving', type: 'int'}
            ,{name:'usearchiving_grid', type: 'string'}
            ,{name:'onrun', type: 'string'}
            ,{name:'onrun_grid', type: 'string'}
            ,{name:'extenderobject', type: 'string'}
            ,{name:'extenderobject_grid', type: 'string'}
            ,{name:'nolog', type: 'int'}
            ,{name:'nolog_grid', type: 'string'}
            ,{name:'shablonbrief', type: 'string'}
            ,{name:'parttype', type: 'int'}
            ,{name:'parttype_grid', type: 'string'}
            ,{name:'sequence', type: 'number'}
            ,{name:'isjormalchange', type: 'int'}
            ,{name:'isjormalchange_grid', type: 'string'}
            ,{name:'caption', type: 'string'}
        ]
    });

 Ext.define('cmbmodel_part',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'partid',type: 'string'}
            ,{name: 'brief',type: 'string'}
        ]
    });
    var cmbstore_part_loaded=false;
    var cmbstore_part = Ext.create('Ext.data.Store', {
        model:'cmbmodel_part',
        autoLoad: false,
        autoSync: false,
        proxy: {
            type:   'ajax',
                url:   rootURL+'index.php/c_part/getRows',
            reader: {
                type:   'json'
                ,root:  'data'
                ,successProperty:  'success'
                ,messageProperty:  'msg'
            }
        },
       listeners: {
       'load': function(){combo_part_loaded =true;}
       }
    });

 Ext.define('model_partmenu',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'partmenuid',type: 'string'}
            ,{name: 'id',type: 'string'}
            ,{name: 'parentid',type: 'string'}
            ,{name: 'brief',type: 'string'}
            ,{name:'the_action', type: 'string'}
            ,{name:'the_action_grid', type: 'string'}
            ,{name:'name', type: 'string'}
            ,{name:'caption', type: 'string'}
            ,{name:'ismenuitem', type: 'int'}
            ,{name:'ismenuitem_grid', type: 'string'}
            ,{name:'istoolbarbutton', type: 'int'}
            ,{name:'istoolbarbutton_grid', type: 'string'}
            ,{name:'hotkey', type: 'string'}
            ,{name:'tooltip', type: 'string'}
        ]
    });

 Ext.define('cmbmodel_partmenu',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'partmenuid',type: 'string'}
            ,{name: 'brief',type: 'string'}
        ]
    });
    var cmbstore_partmenu_loaded=false;
    var cmbstore_partmenu = Ext.create('Ext.data.Store', {
        model:'cmbmodel_partmenu',
        autoLoad: false,
        autoSync: false,
        proxy: {
            type:   'ajax',
                url:   rootURL+'index.php/c_partmenu/getRows',
            reader: {
                type:   'json'
                ,root:  'data'
                ,successProperty:  'success'
                ,messageProperty:  'msg'
            }
        },
       listeners: {
       'load': function(){combo_partmenu_loaded =true;}
       }
    });

 Ext.define('model_partparammap',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'partparammapid',type: 'string'}
            ,{name: 'id',type: 'string'}
            ,{name: 'parentid',type: 'string'}
            ,{name: 'brief',type: 'string'}
            ,{name:'paramname', type: 'string'}
            ,{name:'fieldname', type: 'string'}
            ,{name:'noedit', type: 'int'}
            ,{name:'noedit_grid', type: 'string'}
        ]
    });


 Ext.define('model_partview',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'partviewid',type: 'string'}
            ,{name: 'id',type: 'string'}
            ,{name: 'parentid',type: 'string'}
            ,{name: 'brief',type: 'string'}
            ,{name:'filterfield2', type: 'string'}
            ,{name:'filterfield0', type: 'string'}
            ,{name:'the_alias', type: 'string'}
            ,{name:'forchoose', type: 'int'}
            ,{name:'forchoose_grid', type: 'string'}
            ,{name:'filterfield1', type: 'string'}
            ,{name:'filterfield3', type: 'string'}
            ,{name:'name', type: 'string'}
        ]
    });

 Ext.define('cmbmodel_partview',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'partviewid',type: 'string'}
            ,{name: 'brief',type: 'string'}
        ]
    });
    var cmbstore_partview_loaded=false;
    var cmbstore_partview = Ext.create('Ext.data.Store', {
        model:'cmbmodel_partview',
        autoLoad: false,
        autoSync: false,
        proxy: {
            type:   'ajax',
                url:   rootURL+'index.php/c_partview/getRows',
            reader: {
                type:   'json'
                ,root:  'data'
                ,successProperty:  'success'
                ,messageProperty:  'msg'
            }
        },
       listeners: {
       'load': function(){combo_partview_loaded =true;}
       }
    });

 Ext.define('model_viewcolumn',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'viewcolumnid',type: 'string'}
            ,{name: 'id',type: 'string'}
            ,{name: 'parentid',type: 'string'}
            ,{name: 'brief',type: 'string'}
            ,{name:'forcombo', type: 'int'}
            ,{name:'forcombo_grid', type: 'string'}
            ,{name:'frompart', type: 'string'}
            ,{name:'frompart_grid', type: 'string'}
            ,{name:'aggregation', type: 'int'}
            ,{name:'aggregation_grid', type: 'string'}
            ,{name:'sequence', type: 'number'}
            ,{name:'the_alias', type: 'string'}
            ,{name:'name', type: 'string'}
            ,{name:'field', type: 'string'}
            ,{name:'field_grid', type: 'string'}
            ,{name:'expression', type: 'string'}
        ]
    });

 Ext.define('cmbmodel_viewcolumn',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'viewcolumnid',type: 'string'}
            ,{name: 'brief',type: 'string'}
        ]
    });
    var cmbstore_viewcolumn_loaded=false;
    var cmbstore_viewcolumn = Ext.create('Ext.data.Store', {
        model:'cmbmodel_viewcolumn',
        autoLoad: false,
        autoSync: false,
        proxy: {
            type:   'ajax',
                url:   rootURL+'index.php/c_viewcolumn/getRows',
            reader: {
                type:   'json'
                ,root:  'data'
                ,successProperty:  'success'
                ,messageProperty:  'msg'
            }
        },
       listeners: {
       'load': function(){combo_viewcolumn_loaded =true;}
       }
    });

 Ext.define('model_partview_lnk',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'partview_lnkid',type: 'string'}
            ,{name: 'id',type: 'string'}
            ,{name: 'parentid',type: 'string'}
            ,{name: 'brief',type: 'string'}
            ,{name:'thejoindestination', type: 'string'}
            ,{name:'thejoindestination_grid', type: 'string'}
            ,{name:'handjoin', type: 'string'}
            ,{name:'seq', type: 'number'}
            ,{name:'thejoinsource', type: 'string'}
            ,{name:'thejoinsource_grid', type: 'string'}
            ,{name:'theview', type: 'string'}
            ,{name:'theview_grid', type: 'string'}
            ,{name:'reftype', type: 'int'}
            ,{name:'reftype_grid', type: 'string'}
        ]
    });


 Ext.define('model_validator',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'validatorid',type: 'string'}
            ,{name: 'id',type: 'string'}
            ,{name: 'parentid',type: 'string'}
            ,{name: 'brief',type: 'string'}
            ,{name:'code', type: 'string'}
            ,{name:'target', type: 'string'}
            ,{name:'target_grid', type: 'string'}
        ]
    });


 Ext.define('model_uniqueconstraint',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'uniqueconstraintid',type: 'string'}
            ,{name: 'id',type: 'string'}
            ,{name: 'parentid',type: 'string'}
            ,{name: 'brief',type: 'string'}
            ,{name:'thecomment', type: 'string'}
            ,{name:'name', type: 'string'}
            ,{name:'perparent', type: 'int'}
            ,{name:'perparent_grid', type: 'string'}
        ]
    });


 Ext.define('model_constraintfield',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'constraintfieldid',type: 'string'}
            ,{name: 'id',type: 'string'}
            ,{name: 'parentid',type: 'string'}
            ,{name: 'brief',type: 'string'}
            ,{name:'thefield', type: 'string'}
            ,{name:'thefield_grid', type: 'string'}
        ]
    });


 Ext.define('model_extenderinterface',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'extenderinterfaceid',type: 'string'}
            ,{name: 'id',type: 'string'}
            ,{name: 'parentid',type: 'string'}
            ,{name: 'brief',type: 'string'}
            ,{name:'theconfig', type: 'string'}
            ,{name:'targetplatform', type: 'string'}
            ,{name:'targetplatform_grid', type: 'string'}
            ,{name:'theobject', type: 'string'}
            ,{name:'thename', type: 'string'}
        ]
    });


 Ext.define('model_field',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'fieldid',type: 'string'}
            ,{name: 'id',type: 'string'}
            ,{name: 'parentid',type: 'string'}
            ,{name: 'brief',type: 'string'}
            ,{name:'name', type: 'string'}
            ,{name:'allownull', type: 'int'}
            ,{name:'allownull_grid', type: 'string'}
            ,{name:'themask', type: 'string'}
            ,{name:'reftopart', type: 'string'}
            ,{name:'reftopart_grid', type: 'string'}
            ,{name:'tabname', type: 'string'}
            ,{name:'thenumerator', type: 'string'}
            ,{name:'thenumerator_grid', type: 'string'}
            ,{name:'shablonbrief', type: 'string'}
            ,{name:'datasize', type: 'number'}
            ,{name:'caption', type: 'string'}
            ,{name:'fieldgroupbox', type: 'string'}
            ,{name:'thestyle', type: 'string'}
            ,{name:'zonetemplate', type: 'string'}
            ,{name:'thecomment', type: 'string'}
            ,{name:'reftotype', type: 'string'}
            ,{name:'reftotype_grid', type: 'string'}
            ,{name:'isbrief', type: 'int'}
            ,{name:'isbrief_grid', type: 'string'}
            ,{name:'fieldtype', type: 'string'}
            ,{name:'fieldtype_grid', type: 'string'}
            ,{name:'isautonumber', type: 'int'}
            ,{name:'isautonumber_grid', type: 'string'}
            ,{name:'referencetype', type: 'int'}
            ,{name:'referencetype_grid', type: 'string'}
            ,{name:'sequence', type: 'number'}
            ,{name:'internalreference', type: 'int'}
            ,{name:'internalreference_grid', type: 'string'}
            ,{name:'createrefonly', type: 'int'}
            ,{name:'createrefonly_grid', type: 'string'}
            ,{name:'istabbrief', type: 'int'}
            ,{name:'istabbrief_grid', type: 'string'}
            ,{name:'thenameclass', type: 'string'}
            ,{name:'numberdatefield', type: 'string'}
            ,{name:'numberdatefield_grid', type: 'string'}
        ]
    });

 Ext.define('cmbmodel_field',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'fieldid',type: 'string'}
            ,{name: 'brief',type: 'string'}
        ]
    });
    var cmbstore_field_loaded=false;
    var cmbstore_field = Ext.create('Ext.data.Store', {
        model:'cmbmodel_field',
        autoLoad: false,
        autoSync: false,
        proxy: {
            type:   'ajax',
                url:   rootURL+'index.php/c_field/getRows',
            reader: {
                type:   'json'
                ,root:  'data'
                ,successProperty:  'success'
                ,messageProperty:  'msg'
            }
        },
       listeners: {
       'load': function(){combo_field_loaded =true;}
       }
    });

 Ext.define('model_fldextenders',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'fldextendersid',type: 'string'}
            ,{name: 'id',type: 'string'}
            ,{name: 'parentid',type: 'string'}
            ,{name: 'brief',type: 'string'}
            ,{name:'theobject', type: 'string'}
            ,{name:'thename', type: 'string'}
            ,{name:'targetplatform', type: 'string'}
            ,{name:'targetplatform_grid', type: 'string'}
            ,{name:'theconfig', type: 'string'}
        ]
    });


 Ext.define('model_fieldsrcdef',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'fieldsrcdefid',type: 'string'}
            ,{name: 'id',type: 'string'}
            ,{name: 'parentid',type: 'string'}
            ,{name: 'brief',type: 'string'}
            ,{name:'connectionstring', type: 'string'}
            ,{name:'descriptionstring', type: 'string'}
            ,{name:'sortfield', type: 'string'}
            ,{name:'provider', type: 'string'}
            ,{name:'filterstring', type: 'string'}
            ,{name:'datasource', type: 'string'}
            ,{name:'dontshowdialog', type: 'int'}
            ,{name:'dontshowdialog_grid', type: 'string'}
            ,{name:'briefstring', type: 'string'}
            ,{name:'idfield', type: 'string'}
        ]
    });


 Ext.define('model_dinamicfilterscript',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'dinamicfilterscriptid',type: 'string'}
            ,{name: 'id',type: 'string'}
            ,{name: 'parentid',type: 'string'}
            ,{name: 'brief',type: 'string'}
            ,{name:'target', type: 'string'}
            ,{name:'target_grid', type: 'string'}
            ,{name:'code', type: 'string'}
        ]
    });


 Ext.define('model_fieldexpression',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'fieldexpressionid',type: 'string'}
            ,{name: 'id',type: 'string'}
            ,{name: 'parentid',type: 'string'}
            ,{name: 'brief',type: 'string'}
            ,{name:'code', type: 'string'}
            ,{name:'target', type: 'string'}
            ,{name:'target_grid', type: 'string'}
        ]
    });


 Ext.define('model_fieldvalidator',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'fieldvalidatorid',type: 'string'}
            ,{name: 'id',type: 'string'}
            ,{name: 'parentid',type: 'string'}
            ,{name: 'brief',type: 'string'}
            ,{name:'code', type: 'string'}
            ,{name:'target', type: 'string'}
            ,{name:'target_grid', type: 'string'}
        ]
    });


 Ext.define('model_fieldmenu',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'fieldmenuid',type: 'string'}
            ,{name: 'id',type: 'string'}
            ,{name: 'parentid',type: 'string'}
            ,{name: 'brief',type: 'string'}
            ,{name:'caption', type: 'string'}
            ,{name:'name', type: 'string'}
            ,{name:'hotkey', type: 'string'}
            ,{name:'tooltip', type: 'string'}
            ,{name:'actionid', type: 'string'}
            ,{name:'actionid_grid', type: 'string'}
            ,{name:'ismenuitem', type: 'int'}
            ,{name:'ismenuitem_grid', type: 'string'}
            ,{name:'istoolbarbutton', type: 'int'}
            ,{name:'istoolbarbutton_grid', type: 'string'}
        ]
    });


 Ext.define('model_fieldparammap',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'fieldparammapid',type: 'string'}
            ,{name: 'id',type: 'string'}
            ,{name: 'parentid',type: 'string'}
            ,{name: 'brief',type: 'string'}
            ,{name:'noedit', type: 'int'}
            ,{name:'noedit_grid', type: 'string'}
            ,{name:'paramname', type: 'string'}
            ,{name:'fieldname', type: 'string'}
        ]
    });


 Ext.define('model_mtzapp',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'mtzappid',type: 'string'}
            ,{name: 'id',type: 'string'}
            ,{name: 'instanceid',type: 'string'}
            ,{name: 'brief',type: 'string'}
            ,{name:'name', type: 'string'}
            ,{name:'dbname', type: 'string'}
            ,{name:'thecomment', type: 'string'}
        ]
    });

 Ext.define('cmbmodel_mtzapp',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'mtzappid',type: 'string'}
            ,{name: 'brief',type: 'string'}
        ]
    });
    var cmbstore_mtzapp_loaded=false;
    var cmbstore_mtzapp = Ext.create('Ext.data.Store', {
        model:'cmbmodel_mtzapp',
        autoLoad: false,
        autoSync: false,
        proxy: {
            type:   'ajax',
                url:   rootURL+'index.php/c_mtzapp/getRows',
            reader: {
                type:   'json'
                ,root:  'data'
                ,successProperty:  'success'
                ,messageProperty:  'msg'
            }
        },
       listeners: {
       'load': function(){combo_mtzapp_loaded =true;}
       }
    });

 Ext.define('model_parentpackage',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'parentpackageid',type: 'string'}
            ,{name: 'id',type: 'string'}
            ,{name: 'parentid',type: 'string'}
            ,{name: 'brief',type: 'string'}
            ,{name:'package', type: 'string'}
            ,{name:'package_grid', type: 'string'}
        ]
    });


 Ext.define('model_rptstruct',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'rptstructid',type: 'string'}
            ,{name: 'id',type: 'string'}
            ,{name: 'instanceid',type: 'string'}
            ,{name: 'brief',type: 'string'}
            ,{name: 'parentrowid',type: 'string'}
            ,{name:'name', type: 'string'}
            ,{name:'caption', type: 'string'}
        ]
    });


 Ext.define('model_rptfields',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'rptfieldsid',type: 'string'}
            ,{name: 'id',type: 'string'}
            ,{name: 'parentid',type: 'string'}
            ,{name: 'brief',type: 'string'}
            ,{name:'fieldtype', type: 'string'}
            ,{name:'fieldtype_grid', type: 'string'}
            ,{name:'fieldsize', type: 'number'}
            ,{name:'caption', type: 'string'}
            ,{name:'name', type: 'string'}
        ]
    });


 Ext.define('model_rptformula',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'rptformulaid',type: 'string'}
            ,{name: 'id',type: 'string'}
            ,{name: 'instanceid',type: 'string'}
            ,{name: 'brief',type: 'string'}
            ,{name:'platform', type: 'string'}
            ,{name:'platform_grid', type: 'string'}
            ,{name:'code', type: 'string'}
            ,{name:'name', type: 'string'}
        ]
    });


 Ext.define('model_reports',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'reportsid',type: 'string'}
            ,{name: 'id',type: 'string'}
            ,{name: 'instanceid',type: 'string'}
            ,{name: 'brief',type: 'string'}
            ,{name:'preparemethod', type: 'string'}
            ,{name:'preparemethod_grid', type: 'string'}
            ,{name:'caption', type: 'string'}
            ,{name:'reporttype', type: 'int'}
            ,{name:'reporttype_grid', type: 'string'}
            ,{name:'thecomment', type: 'string'}
            ,{name:'reportfile', type: 'string'}
            ,{name:'reportfile_ext', type: 'string'}
            ,{name:'name', type: 'string'}
            ,{name:'reportview', type: 'string'}
            ,{name:'thereportext', type: 'string'}
            ,{name:'thereportext_grid', type: 'string'}
        ]
    });


 Ext.define('model_the_session',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'the_sessionid',type: 'string'}
            ,{name: 'id',type: 'string'}
            ,{name: 'instanceid',type: 'string'}
            ,{name: 'brief',type: 'string'}
            ,{name:'login', type: 'string'}
            ,{name:'userrole', type: 'string'}
            ,{name:'userrole_grid', type: 'string'}
            ,{name:'lastaccess', type: 'date',dateFormat:'Y-m-d H:i:s'}
            ,{name:'usersid', type: 'string'}
            ,{name:'usersid_grid', type: 'string'}
            ,{name:'closed', type: 'int'}
            ,{name:'closed_grid', type: 'string'}
            ,{name:'startat', type: 'date',dateFormat:'Y-m-d H:i:s'}
            ,{name:'closedat', type: 'date',dateFormat:'Y-m-d H:i:s'}
            ,{name:'applicationid', type: 'string'}
            ,{name:'applicationid_grid', type: 'string'}
            ,{name:'lang', type: 'string'}
        ]
    });

 Ext.define('cmbmodel_the_session',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'the_sessionid',type: 'string'}
            ,{name: 'brief',type: 'string'}
        ]
    });
    var cmbstore_the_session_loaded=false;
    var cmbstore_the_session = Ext.create('Ext.data.Store', {
        model:'cmbmodel_the_session',
        autoLoad: false,
        autoSync: false,
        proxy: {
            type:   'ajax',
                url:   rootURL+'index.php/c_the_session/getRows',
            reader: {
                type:   'json'
                ,root:  'data'
                ,successProperty:  'success'
                ,messageProperty:  'msg'
            }
        },
       listeners: {
       'load': function(){combo_the_session_loaded =true;}
       }
    });

 Ext.define('model_sysrefcache',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'sysrefcacheid',type: 'string'}
            ,{name: 'id',type: 'string'}
            ,{name: 'instanceid',type: 'string'}
            ,{name: 'brief',type: 'string'}
            ,{name:'modulename', type: 'string'}
            ,{name:'objectownerid', type: 'string'}
            ,{name:'sessionid', type: 'string'}
            ,{name:'sessionid_grid', type: 'string'}
            ,{name:'cachetype', type: 'int'}
            ,{name:'cachetype_grid', type: 'string'}
        ]
    });


 Ext.define('model_syslog',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'syslogid',type: 'string'}
            ,{name: 'id',type: 'string'}
            ,{name: 'instanceid',type: 'string'}
            ,{name: 'brief',type: 'string'}
            ,{name:'the_resource', type: 'string'}
            ,{name:'verb', type: 'string'}
            ,{name:'loginstanceid', type: 'string'}
            ,{name:'logstructid', type: 'string'}
            ,{name:'thesession', type: 'string'}
            ,{name:'thesession_grid', type: 'string'}
        ]
    });


 Ext.define('model_users',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'usersid',type: 'string'}
            ,{name: 'id',type: 'string'}
            ,{name: 'instanceid',type: 'string'}
            ,{name: 'brief',type: 'string'}
            ,{name:'family', type: 'string'}
            ,{name:'login', type: 'string'}
            ,{name:'password', type: 'string'}
            ,{name:'email', type: 'string'}
            ,{name:'phone', type: 'string'}
            ,{name:'name', type: 'string'}
            ,{name:'domainame', type: 'string'}
            ,{name:'localphone', type: 'string'}
            ,{name:'surname', type: 'string'}
        ]
    });

 Ext.define('cmbmodel_users',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'usersid',type: 'string'}
            ,{name: 'brief',type: 'string'}
        ]
    });
    var cmbstore_users_loaded=false;
    var cmbstore_users = Ext.create('Ext.data.Store', {
        model:'cmbmodel_users',
        autoLoad: false,
        autoSync: false,
        proxy: {
            type:   'ajax',
                url:   rootURL+'index.php/c_users/getRows',
            reader: {
                type:   'json'
                ,root:  'data'
                ,successProperty:  'success'
                ,messageProperty:  'msg'
            }
        },
       listeners: {
       'load': function(){combo_users_loaded =true;}
       }
    });

 Ext.define('model_groups',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'groupsid',type: 'string'}
            ,{name: 'id',type: 'string'}
            ,{name: 'instanceid',type: 'string'}
            ,{name: 'brief',type: 'string'}
            ,{name:'adgroup', type: 'string'}
            ,{name:'name', type: 'string'}
        ]
    });

 Ext.define('cmbmodel_groups',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'groupsid',type: 'string'}
            ,{name: 'brief',type: 'string'}
        ]
    });
    var cmbstore_groups_loaded=false;
    var cmbstore_groups = Ext.create('Ext.data.Store', {
        model:'cmbmodel_groups',
        autoLoad: false,
        autoSync: false,
        proxy: {
            type:   'ajax',
                url:   rootURL+'index.php/c_groups/getRows',
            reader: {
                type:   'json'
                ,root:  'data'
                ,successProperty:  'success'
                ,messageProperty:  'msg'
            }
        },
       listeners: {
       'load': function(){combo_groups_loaded =true;}
       }
    });

 Ext.define('model_groupuser',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'groupuserid',type: 'string'}
            ,{name: 'id',type: 'string'}
            ,{name: 'parentid',type: 'string'}
            ,{name: 'brief',type: 'string'}
            ,{name:'theuser', type: 'string'}
            ,{name:'theuser_grid', type: 'string'}
        ]
    });


 Ext.define('model_armjournal',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'armjournalid',type: 'string'}
            ,{name: 'id',type: 'string'}
            ,{name: 'instanceid',type: 'string'}
            ,{name: 'brief',type: 'string'}
            ,{name:'thejournal', type: 'string'}
            ,{name:'thejournal_grid', type: 'string'}
        ]
    });


 Ext.define('model_armjrnlrep',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'armjrnlrepid',type: 'string'}
            ,{name: 'id',type: 'string'}
            ,{name: 'parentid',type: 'string'}
            ,{name: 'brief',type: 'string'}
            ,{name:'repname', type: 'string'}
            ,{name:'thereport', type: 'string'}
            ,{name:'thereport_grid', type: 'string'}
        ]
    });


 Ext.define('model_armjrnlrun',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'armjrnlrunid',type: 'string'}
            ,{name: 'id',type: 'string'}
            ,{name: 'parentid',type: 'string'}
            ,{name: 'brief',type: 'string'}
            ,{name:'theextention', type: 'string'}
            ,{name:'theextention_grid', type: 'string'}
            ,{name:'name', type: 'string'}
        ]
    });


 Ext.define('model_armjrnladd',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'armjrnladdid',type: 'string'}
            ,{name: 'id',type: 'string'}
            ,{name: 'parentid',type: 'string'}
            ,{name: 'brief',type: 'string'}
            ,{name:'theextention', type: 'string'}
            ,{name:'theextention_grid', type: 'string'}
            ,{name:'name', type: 'string'}
        ]
    });


 Ext.define('model_entrypoints',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'entrypointsid',type: 'string'}
            ,{name: 'id',type: 'string'}
            ,{name: 'instanceid',type: 'string'}
            ,{name: 'brief',type: 'string'}
            ,{name: 'parentrowid',type: 'string'}
            ,{name:'thecomment', type: 'string'}
            ,{name:'allowprint', type: 'int'}
            ,{name:'allowprint_grid', type: 'string'}
            ,{name:'iconfile', type: 'string'}
            ,{name:'allowfilter', type: 'int'}
            ,{name:'allowfilter_grid', type: 'string'}
            ,{name:'thefilter', type: 'string'}
            ,{name:'thefilter_grid', type: 'string'}
            ,{name:'journalfixedquery', type: 'string'}
            ,{name:'name', type: 'string'}
            ,{name:'report', type: 'string'}
            ,{name:'report_grid', type: 'string'}
            ,{name:'document', type: 'string'}
            ,{name:'document_grid', type: 'string'}
            ,{name:'caption', type: 'string'}
            ,{name:'theextention', type: 'string'}
            ,{name:'theextention_grid', type: 'string'}
            ,{name:'arm', type: 'string'}
            ,{name:'arm_grid', type: 'string'}
            ,{name:'objecttype', type: 'string'}
            ,{name:'objecttype_grid', type: 'string'}
            ,{name:'allowadd', type: 'int'}
            ,{name:'allowadd_grid', type: 'string'}
            ,{name:'journal', type: 'string'}
            ,{name:'journal_grid', type: 'string'}
            ,{name:'method', type: 'string'}
            ,{name:'method_grid', type: 'string'}
            ,{name:'allowedit', type: 'int'}
            ,{name:'allowedit_grid', type: 'string'}
            ,{name:'allowdel', type: 'int'}
            ,{name:'allowdel_grid', type: 'string'}
            ,{name:'astoolbaritem', type: 'int'}
            ,{name:'astoolbaritem_grid', type: 'string'}
            ,{name:'actiontype', type: 'int'}
            ,{name:'actiontype_grid', type: 'string'}
            ,{name:'sequence', type: 'number'}
        ]
    });


 Ext.define('model_epfilterlink',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'epfilterlinkid',type: 'string'}
            ,{name: 'id',type: 'string'}
            ,{name: 'parentid',type: 'string'}
            ,{name: 'brief',type: 'string'}
            ,{name:'rowsource', type: 'string'}
            ,{name:'theexpression', type: 'string'}
            ,{name:'filterfield', type: 'string'}
        ]
    });


 Ext.define('model_workplace',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'workplaceid',type: 'string'}
            ,{name: 'id',type: 'string'}
            ,{name: 'instanceid',type: 'string'}
            ,{name: 'brief',type: 'string'}
            ,{name:'name', type: 'string'}
            ,{name:'thecomment', type: 'string'}
            ,{name:'theversion', type: 'string'}
            ,{name:'caption', type: 'string'}
            ,{name:'theplatform', type: 'int'}
            ,{name:'theplatform_grid', type: 'string'}
        ]
    });

 Ext.define('cmbmodel_workplace',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'workplaceid',type: 'string'}
            ,{name: 'brief',type: 'string'}
        ]
    });
    var cmbstore_workplace_loaded=false;
    var cmbstore_workplace = Ext.create('Ext.data.Store', {
        model:'cmbmodel_workplace',
        autoLoad: false,
        autoSync: false,
        proxy: {
            type:   'ajax',
                url:   rootURL+'index.php/c_workplace/getRows',
            reader: {
                type:   'json'
                ,root:  'data'
                ,successProperty:  'success'
                ,messageProperty:  'msg'
            }
        },
       listeners: {
       'load': function(){combo_workplace_loaded =true;}
       }
    });

 Ext.define('model_armtypes',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'armtypesid',type: 'string'}
            ,{name: 'id',type: 'string'}
            ,{name: 'instanceid',type: 'string'}
            ,{name: 'brief',type: 'string'}
            ,{name:'thedocumenttype', type: 'string'}
            ,{name:'thedocumenttype_grid', type: 'string'}
        ]
    });


 Ext.define('model_roles_operations',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'roles_operationsid',type: 'string'}
            ,{name: 'id',type: 'string'}
            ,{name: 'instanceid',type: 'string'}
            ,{name: 'brief',type: 'string'}
            ,{name:'name', type: 'string'}
            ,{name:'allowaction', type: 'int'}
            ,{name:'allowaction_grid', type: 'string'}
            ,{name:'info', type: 'string'}
        ]
    });


 Ext.define('model_roles_wp',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'roles_wpid',type: 'string'}
            ,{name: 'id',type: 'string'}
            ,{name: 'instanceid',type: 'string'}
            ,{name: 'brief',type: 'string'}
            ,{name:'wp', type: 'string'}
            ,{name:'wp_grid', type: 'string'}
        ]
    });


 Ext.define('model_roles_act',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'roles_actid',type: 'string'}
            ,{name: 'id',type: 'string'}
            ,{name: 'parentid',type: 'string'}
            ,{name: 'brief',type: 'string'}
            ,{name:'menuname', type: 'string'}
            ,{name:'menucode', type: 'string'}
            ,{name:'accesible', type: 'int'}
            ,{name:'accesible_grid', type: 'string'}
        ]
    });


 Ext.define('model_roles2_module',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'roles2_moduleid',type: 'string'}
            ,{name: 'id',type: 'string'}
            ,{name: 'instanceid',type: 'string'}
            ,{name: 'brief',type: 'string'}
            ,{name:'thecomment', type: 'string'}
            ,{name:'substructobjects', type: 'int'}
            ,{name:'substructobjects_grid', type: 'string'}
            ,{name:'sequence', type: 'number'}
            ,{name:'groupname', type: 'string'}
            ,{name:'caption', type: 'string'}
            ,{name:'allobjects', type: 'int'}
            ,{name:'allobjects_grid', type: 'string'}
            ,{name:'theicon', type: 'string'}
            ,{name:'name', type: 'string'}
            ,{name:'colegsobject', type: 'int'}
            ,{name:'colegsobject_grid', type: 'string'}
            ,{name:'customizevisibility', type: 'int'}
            ,{name:'customizevisibility_grid', type: 'string'}
            ,{name:'moduleaccessible', type: 'int'}
            ,{name:'moduleaccessible_grid', type: 'string'}
        ]
    });


 Ext.define('model_roles2_modreport',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'roles2_modreportid',type: 'string'}
            ,{name: 'id',type: 'string'}
            ,{name: 'parentid',type: 'string'}
            ,{name: 'brief',type: 'string'}
            ,{name:'caption', type: 'string'}
            ,{name:'sequence', type: 'number'}
            ,{name:'name', type: 'string'}
            ,{name:'theicon', type: 'string'}
            ,{name:'isreport', type: 'int'}
            ,{name:'isreport_grid', type: 'string'}
            ,{name:'allowaction', type: 'int'}
            ,{name:'allowaction_grid', type: 'string'}
            ,{name:'selecttype', type: 'number'}
        ]
    });


 Ext.define('model_roles_doc',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'roles_docid',type: 'string'}
            ,{name: 'id',type: 'string'}
            ,{name: 'instanceid',type: 'string'}
            ,{name: 'brief',type: 'string'}
            ,{name:'allowdeletedoc', type: 'int'}
            ,{name:'allowdeletedoc_grid', type: 'string'}
            ,{name:'the_denied', type: 'int'}
            ,{name:'the_denied_grid', type: 'string'}
            ,{name:'the_document', type: 'string'}
            ,{name:'the_document_grid', type: 'string'}
        ]
    });


 Ext.define('model_roles_doc_state',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'roles_doc_stateid',type: 'string'}
            ,{name: 'id',type: 'string'}
            ,{name: 'parentid',type: 'string'}
            ,{name: 'brief',type: 'string'}
            ,{name:'statechangedisabled', type: 'int'}
            ,{name:'statechangedisabled_grid', type: 'string'}
            ,{name:'the_state', type: 'string'}
            ,{name:'the_state_grid', type: 'string'}
            ,{name:'allowdelete', type: 'int'}
            ,{name:'allowdelete_grid', type: 'string'}
            ,{name:'the_mode', type: 'string'}
            ,{name:'the_mode_grid', type: 'string'}
        ]
    });


 Ext.define('model_roles_reports',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'roles_reportsid',type: 'string'}
            ,{name: 'id',type: 'string'}
            ,{name: 'instanceid',type: 'string'}
            ,{name: 'brief',type: 'string'}
            ,{name:'the_report', type: 'string'}
            ,{name:'the_report_grid', type: 'string'}
        ]
    });


 Ext.define('model_roles_user',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'roles_userid',type: 'string'}
            ,{name: 'id',type: 'string'}
            ,{name: 'instanceid',type: 'string'}
            ,{name: 'brief',type: 'string'}
            ,{name:'theuser', type: 'string'}
            ,{name:'theuser_grid', type: 'string'}
        ]
    });


 Ext.define('model_roles_map',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'roles_mapid',type: 'string'}
            ,{name: 'id',type: 'string'}
            ,{name: 'instanceid',type: 'string'}
            ,{name: 'brief',type: 'string'}
            ,{name:'thegroup', type: 'string'}
            ,{name:'thegroup_grid', type: 'string'}
        ]
    });


 Ext.define('model_roles_def',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'roles_defid',type: 'string'}
            ,{name: 'id',type: 'string'}
            ,{name: 'instanceid',type: 'string'}
            ,{name: 'brief',type: 'string'}
            ,{name:'substructobjects', type: 'int'}
            ,{name:'substructobjects_grid', type: 'string'}
            ,{name:'name', type: 'string'}
            ,{name:'colegsobject', type: 'int'}
            ,{name:'colegsobject_grid', type: 'string'}
            ,{name:'allobjects', type: 'int'}
            ,{name:'allobjects_grid', type: 'string'}
        ]
    });


 Ext.define('model_folder',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'folderid',type: 'string'}
            ,{name: 'id',type: 'string'}
            ,{name: 'instanceid',type: 'string'}
            ,{name: 'brief',type: 'string'}
            ,{name: 'parentrowid',type: 'string'}
            ,{name:'foldertype', type: 'int'}
            ,{name:'foldertype_grid', type: 'string'}
            ,{name:'name', type: 'string'}
        ]
    });


 Ext.define('model_shortcut',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'shortcutid',type: 'string'}
            ,{name: 'id',type: 'string'}
            ,{name: 'parentid',type: 'string'}
            ,{name: 'brief',type: 'string'}
            ,{name:'startmode', type: 'string'}
            ,{name:'docitem', type: 'string'}
            ,{name:'docitem_grid', type: 'string'}
        ]
    });


 Ext.define('model_infostoredef',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'infostoredefid',type: 'string'}
            ,{name: 'id',type: 'string'}
            ,{name: 'instanceid',type: 'string'}
            ,{name: 'brief',type: 'string'}
            ,{name:'infostoretype', type: 'int'}
            ,{name:'infostoretype_grid', type: 'string'}
            ,{name:'thegroup', type: 'string'}
            ,{name:'thegroup_grid', type: 'string'}
            ,{name:'name', type: 'string'}
            ,{name:'theuser', type: 'string'}
            ,{name:'theuser_grid', type: 'string'}
        ]
    });


 Ext.define('model_num_zones',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'num_zonesid',type: 'string'}
            ,{name: 'id',type: 'string'}
            ,{name: 'instanceid',type: 'string'}
            ,{name: 'brief',type: 'string'}
            ,{name:'zonemask', type: 'string'}
        ]
    });


 Ext.define('model_num_values',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'num_valuesid',type: 'string'}
            ,{name: 'id',type: 'string'}
            ,{name: 'parentid',type: 'string'}
            ,{name: 'brief',type: 'string'}
            ,{name:'the_value', type: 'number'}
            ,{name:'ownerrowid', type: 'string'}
            ,{name:'ownerpartname', type: 'string'}
        ]
    });


 Ext.define('model_num_head',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'num_headid',type: 'string'}
            ,{name: 'id',type: 'string'}
            ,{name: 'instanceid',type: 'string'}
            ,{name: 'brief',type: 'string'}
            ,{name:'name', type: 'string'}
            ,{name:'shema', type: 'int'}
            ,{name:'shema_grid', type: 'string'}
        ]
    });


 Ext.define('model_v_autoiu_urok_def',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'instanceid',type: 'string'}
            ,{name: 'id',type: 'string'}
            ,{name:'iu_urok_def_actiondate2', type: 'string'}
            ,{name:'iu_urok_def_schooldate', type: 'string'}
            ,{name:'iu_urok_def_maketown', type: 'string'}
            ,{name:'iu_urok_def_pubstate', type: 'string'}
            ,{name:'iu_urok_def_curator', type: 'string'}
            ,{name:'iu_urok_def_testpageref', type: 'string'}
            ,{name:'iu_urok_def_ckksn', type: 'string'}
            ,{name:'iu_urok_def_mainref', type: 'string'}
            ,{name:'iu_urok_def_thefilm', type: 'string'}
            ,{name:'iu_urok_def_actiondate', type: 'string'}
            ,{name:'iu_urok_def_datecreated', type: 'string'}
            ,{name:'iu_urok_def_theteacher', type: 'string'}
            ,{name:'iu_urok_def_coursetype', type: 'string'}
            ,{name:'iu_urok_def_classtheme', type: 'string'}
            ,{name:'iu_urok_def_plannum', type: 'string'}
            ,{name:'iu_urok_def_rtheme', type: 'string'}
            ,{name:'iu_urok_def_info', type: 'string'}
            ,{name:'iu_urok_def_methodist2', type: 'string'}
            ,{name:'iu_urok_def_theclassnum', type: 'string'}
            ,{name:'iu_urok_def_processtype', type: 'string'}
            ,{name:'iu_urok_def_thefilmurl', type: 'string'}
            ,{name:'iu_urok_def_thequarter', type: 'string'}
            ,{name:'iu_urok_def_methodist', type: 'string'}
            ,{name:'iu_urok_def_ucode', type: 'string'}
            ,{name:'iu_urok_def_subject', type: 'string'}
        ]
    });

    var store_v_autoiu_urok_def = Ext.create('Ext.data.Store', {
        model:'model_v_autoiu_urok_def',
        autoLoad: false,
        autoSync: false,
        remoteSort: true,
        remoteFilter:true,
        pageSize : 30,
        proxy: {
            type:   'ajax',
                url:   rootURL+'index.php/c_v_autoiu_urok_def/getRows',
            extraParams: {archived:0}, 
            reader: {
                type:   'json'
                ,root:  'rows'
                ,totalProperty: 'total'
                ,successProperty:  'success'
                ,messageProperty:  'msg'
            },
            listeners: {
                exception: function(proxy, response, operation){
                    Ext.MessageBox.show({
                        title: 'REMOTE EXCEPTION',
                        msg:    operation.getError(),
                        icon : Ext.MessageBox.ERROR,
                        buttons : Ext.Msg.OK
                    });
                }
            }
        }
    });
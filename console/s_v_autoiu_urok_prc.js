
 Ext.define('model_v_autoiu_urok_prc',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'instanceid',type: 'string'}
            ,{name: 'id',type: 'string'}
            ,{name:'iu_urok_prc_manualcontrol', type: 'string'}
            ,{name:'iu_urok_prc_laststate', type: 'string'}
            ,{name:'iu_urok_prc_taskdelayed', type: 'number'}
            ,{name:'iu_urok_prc_topstage', type: 'string'}
            ,{name:'iu_urok_prc_theprocess', type: 'string'}
            ,{name:'iu_urok_prc_iu_urok_stage', type: 'string'}
            ,{name:'iu_urok_prc_lastmessage', type: 'string'}
            ,{name:'iu_urok_prc_isdone', type: 'string'}
        ]
    });

    var store_v_autoiu_urok_prc = Ext.create('Ext.data.Store', {
        model:'model_v_autoiu_urok_prc',
        autoLoad: false,
        autoSync: false,
        remoteSort: true,
        remoteFilter:true,
        pageSize : 30,
        proxy: {
            type:   'ajax',
                url:   rootURL+'index.php/c_v_autoiu_urok_prc/getRows',
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
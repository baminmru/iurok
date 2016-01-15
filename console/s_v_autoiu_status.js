
 Ext.define('model_v_autoiu_status',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'instanceid',type: 'string'}
            ,{name: 'id',type: 'string'}
            ,{name:'iu_status_name', type: 'string'}
            ,{name:'iu_status_isfinishstate', type: 'string'}
            ,{name:'iu_status_sequence', type: 'number'}
            ,{name:'iu_status_theprocess', type: 'string'}
            ,{name:'iu_status_thestage', type: 'string'}
            ,{name:'iu_status_isstartupstate', type: 'string'}
        ]
    });

    var store_v_autoiu_status = Ext.create('Ext.data.Store', {
        model:'model_v_autoiu_status',
        autoLoad: false,
        autoSync: false,
        remoteSort: true,
        remoteFilter:true,
		groupField:'iu_status_theprocess',
        pageSize : 30,
        proxy: {
            type:   'ajax',
                url:   rootURL+'index.php/c_v_autoiu_status/getRows',
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
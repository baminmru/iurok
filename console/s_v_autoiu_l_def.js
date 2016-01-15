
 Ext.define('model_v_autoiu_l_def',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'instanceid',type: 'string'}
            ,{name: 'id',type: 'string'}
            ,{name:'iu_l_def_readdate', type: 'string'}
            ,{name:'iu_l_def_createdate', type: 'string'}
            ,{name:'iu_l_def_doer', type: 'string'}
			,{name:'iu_l_def_doer_id', type: 'string'}
            ,{name:'iu_l_def_info', type: 'string'}
            ,{name:'iu_l_def_sender', type: 'string'}
			,{name:'iu_l_def_sender_id', type: 'string'}
        ]
    });

    var store_v_autoiu_l_def = Ext.create('Ext.data.Store', {
        model:'model_v_autoiu_l_def',
        autoLoad: false,
        autoSync: false,
        remoteSort: true,
        remoteFilter:true,
        pageSize : 30,
        proxy: {
            type:   'ajax',
                url:   rootURL+'index.php/c_v_autoiu_l_def/getRows',
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
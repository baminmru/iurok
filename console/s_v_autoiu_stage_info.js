
 Ext.define('model_v_autoiu_stage_info',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'instanceid',type: 'string'}
            ,{name: 'id',type: 'string'}
            ,{name:'iu_stage_info_thestatus', type: 'string'}
            ,{name:'iu_stage_info_doerallowed', type: 'string'}
        ]
    });

    var store_v_autoiu_stage_info = Ext.create('Ext.data.Store', {
        model:'model_v_autoiu_stage_info',
        autoLoad: false,
        autoSync: false,
        remoteSort: true,
        remoteFilter:true,
        proxy: {
            type:   'ajax',
                url:   'index.php/c_v_autoiu_stage_info/getRows',
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
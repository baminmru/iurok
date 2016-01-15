
 Ext.define('model_v_autoiud_sn_def',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'instanceid',type: 'string'}
            ,{name: 'id',type: 'string'}
            ,{name:'iud_sn_def_sequence', type: 'number'}
            ,{name:'iud_sn_def_isfinal', type: 'string'}
            ,{name:'iud_sn_def_name', type: 'string'}
        ]
    });

    var store_v_autoiud_sn_def = Ext.create('Ext.data.Store', {
        model:'model_v_autoiud_sn_def',
        autoLoad: false,
        autoSync: false,
        remoteSort: true,
        remoteFilter:true,
        pageSize : 30,
        proxy: {
            type:   'ajax',
                url:   rootURL+'index.php/c_v_autoiud_sn_def/getRows',
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
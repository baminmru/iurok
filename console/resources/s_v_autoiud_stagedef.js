
 Ext.define('model_v_autoiud_stagedef',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'instanceid',type: 'string'}
            ,{name: 'id',type: 'string'}
            ,{name:'iud_stagedef_name', type: 'string'}
            ,{name:'iud_stagedef_sequence', type: 'number'}
            ,{name:'iud_stagedef_stageicon', type: 'string'}
        ]
    });

    var store_v_autoiud_stagedef = Ext.create('Ext.data.Store', {
        model:'model_v_autoiud_stagedef',
        autoLoad: false,
        autoSync: false,
        remoteSort: true,
        remoteFilter:true,
        pageSize : 30,
        proxy: {
            type:   'ajax',
                url:   rootURL+'index.php/c_v_autoiud_stagedef/getRows',
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
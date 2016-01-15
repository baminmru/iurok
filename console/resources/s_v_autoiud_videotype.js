
 Ext.define('model_v_autoiud_videotype',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'instanceid',type: 'string'}
            ,{name: 'id',type: 'string'}
            ,{name:'iud_videotype_name', type: 'string'}
            ,{name:'iud_videotype_nocomments', type: 'string'}
            ,{name:'iud_videotype_filetype', type: 'string'}
            ,{name:'iud_videotype_versionpolicy', type: 'string'}
            ,{name:'iud_videotype_sequence', type: 'number'}
        ]
    });

    var store_v_autoiud_videotype = Ext.create('Ext.data.Store', {
        model:'model_v_autoiud_videotype',
        autoLoad: false,
        autoSync: false,
        remoteSort: true,
        remoteFilter:true,
        pageSize : 30,
        proxy: {
            type:   'ajax',
                url:   rootURL+'index.php/c_v_autoiud_videotype/getRows',
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
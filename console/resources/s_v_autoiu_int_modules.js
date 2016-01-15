
 Ext.define('model_v_autoiu_int_modules',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'instanceid',type: 'string'}
            ,{name: 'id',type: 'string'}
            ,{name:'iu_int_modules_name', type: 'string'}
            ,{name:'iu_int_modules_theicon', type: 'string'}
            ,{name:'iu_int_modules_sequence', type: 'number'}
            ,{name:'iu_int_modules_groupname', type: 'string'}
            ,{name:'iu_int_modules_caption', type: 'string'}
            ,{name:'iu_int_modules_visiblecontrol', type: 'string'}
        ]
    });

    var store_v_autoiu_int_modules = Ext.create('Ext.data.Store', {
        model:'model_v_autoiu_int_modules',
        autoLoad: false,
        autoSync: false,
        remoteSort: true,
        remoteFilter:true,
        pageSize : 30,
        proxy: {
            type:   'ajax',
                url:   rootURL+'index.php/c_v_autoiu_int_modules/getRows',
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
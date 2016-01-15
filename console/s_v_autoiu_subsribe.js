
 Ext.define('model_v_autoiu_subsribe',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'instanceid',type: 'string'}
            ,{name: 'id',type: 'string'}
            ,{name:'iu_subsribe_processstatus', type: 'string'}
            ,{name:'iu_subsribe_thediscussion', type: 'string'}
            ,{name:'iu_subsribe_eventtype', type: 'string'}
            ,{name:'iu_subsribe_isactive', type: 'string'}
            ,{name:'iu_subsribe_thevideo', type: 'string'}
            ,{name:'iu_subsribe_subscriber', type: 'string'}
            ,{name:'iu_subsribe_statetask', type: 'string'}
            ,{name:'iu_subsribe_scandate', type: 'string'}
            ,{name:'iu_subsribe_thedoc', type: 'string'}
            ,{name:'iu_subsribe_theprocess', type: 'string'}
            ,{name:'iu_subsribe_doer', type: 'string'}
        ]
    });

    var store_v_autoiu_subsribe = Ext.create('Ext.data.Store', {
        model:'model_v_autoiu_subsribe',
        autoLoad: false,
        autoSync: false,
        remoteSort: true,
        remoteFilter:true,
        pageSize : 30,
        proxy: {
            type:   'ajax',
                url:   rootURL+'index.php/c_v_autoiu_subsribe/getRows',
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
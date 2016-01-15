
 Ext.define('model_v_autoiu_plevent',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'instanceid',type: 'string'}
            ,{name: 'id',type: 'string'}
            ,{name:'iu_plevent_eventtype', type: 'string'}
            ,{name:'iu_plevent_theprocess', type: 'string'}
            ,{name:'iu_plevent_statetask', type: 'string'}
            ,{name:'iu_plevent_createdate', type: 'string'}
            ,{name:'iu_plevent_processstatus', type: 'string'}
            ,{name:'iu_plevent_doer', type: 'string'}
            ,{name:'iu_plevent_thediscussion', type: 'string'}
            ,{name:'iu_plevent_thedoc', type: 'string'}
            ,{name:'iu_plevent_info', type: 'string'}
            ,{name:'iu_plevent_thevideo', type: 'string'}
        ]
    });

    var store_v_autoiu_plevent = Ext.create('Ext.data.Store', {
        model:'model_v_autoiu_plevent',
        autoLoad: false,
        autoSync: false,
        remoteSort: true,
        remoteFilter:true,
        pageSize : 30,
        proxy: {
            type:   'ajax',
                url:   rootURL+'index.php/c_v_autoiu_plevent/getRows',
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

 Ext.define('model_v_autoiu_us_def',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'instanceid',type: 'string'}
            ,{name: 'id',type: 'string'}
            ,{name:'iu_us_def_iu_urok_stage', type: 'string'}
            ,{name:'iu_us_def_isdone', type: 'string'}
            ,{name:'iu_us_def_topstage', type: 'string'}
            ,{name:'iu_us_def_theprocess', type: 'string'}
        ]
    });

    var store_v_autoiu_us_def = Ext.create('Ext.data.Store', {
        model:'model_v_autoiu_us_def',
        autoLoad: false,
        autoSync: false,
        remoteSort: true,
        remoteFilter:true,
        pageSize : 30,
        proxy: {
            type:   'ajax',
                url:   rootURL+'index.php/c_v_autoiu_us_def/getRows',
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

 Ext.define('model_v_autoiu_cm_def',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'instanceid',type: 'string'}
            ,{name: 'id',type: 'string'}
            ,{name:'iu_cm_def_thetheme', type: 'string'}
            ,{name:'iu_cm_def_theauthor', type: 'string'}
            ,{name:'iu_cm_def_thevideo', type: 'string'}
            ,{name:'iu_cm_def_isdiscussion', type: 'string'}
            ,{name:'iu_cm_def_thedate', type: 'string'}
            ,{name:'iu_cm_def_thedoc', type: 'string'}
            ,{name:'iu_cm_def_theprocess', type: 'string'}
        ]
    });

    var store_v_autoiu_cm_def = Ext.create('Ext.data.Store', {
        model:'model_v_autoiu_cm_def',
        autoLoad: false,
        autoSync: false,
        remoteSort: true,
        remoteFilter:true,
        pageSize : 30,
        proxy: {
            type:   'ajax',
                url:   rootURL+'index.php/c_v_autoiu_cm_def/getRows',
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
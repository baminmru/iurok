﻿
 Ext.define('model_v_autoiud_predmet',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'instanceid',type: 'string'}
            ,{name: 'id',type: 'string'}
            ,{name:'iud_predmet_predmeticon', type: 'string'}
            ,{name:'iud_predmet_name', type: 'string'}
            ,{name:'iud_predmet_prefix', type: 'string'}
        ]
    });

    var store_v_autoiud_predmet = Ext.create('Ext.data.Store', {
        model:'model_v_autoiud_predmet',
        autoLoad: false,
        autoSync: false,
        remoteSort: true,
        remoteFilter:true,
        pageSize : 30,
        proxy: {
            type:   'ajax',
                url:   rootURL+'index.php/c_v_autoiud_predmet/getRows',
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
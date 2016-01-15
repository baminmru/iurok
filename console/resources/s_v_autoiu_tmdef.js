
 Ext.define('model_v_autoiu_tmdef',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'instanceid',type: 'string'}
            ,{name: 'id',type: 'string'}
            ,{name:'iu_tmdef_workat', type: 'string'}
            ,{name:'iu_tmdef_lastname', type: 'string'}
            ,{name:'iu_tmdef_sendtomail', type: 'string'}
            ,{name:'iu_tmdef_classes', type: 'string'}
            ,{name:'iu_tmdef_surname', type: 'string'}
            ,{name:'iu_tmdef_email', type: 'string'}
            ,{name:'iu_tmdef_regal', type: 'string'}
            ,{name:'iu_tmdef_thephone', type: 'string'}
            ,{name:'iu_tmdef_subjects', type: 'string'}
            ,{name:'iu_tmdef_name', type: 'string'}
            ,{name:'iu_tmdef_ismethodist', type: 'string'}
            ,{name:'iu_tmdef_thetown', type: 'string'}
        ]
    });

    var store_v_autoiu_tmdef = Ext.create('Ext.data.Store', {
        model:'model_v_autoiu_tmdef',
        autoLoad: false,
        autoSync: false,
        remoteSort: true,
        remoteFilter:true,
        pageSize : 250,
		buffered:true,
        proxy: {
            type:   'ajax',
                url:   rootURL+'index.php/c_v_autoiu_tmdef/getRows',
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
		,
		 listeners: {
			totalcountchange: function(count){StatusReady("Всего учителей: "+count);}
		}
    });
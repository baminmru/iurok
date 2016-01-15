
 Ext.define('model_v_autoiu_u_def',{
            extend:'Ext.data.Model',
        fields: [
            {name: 'instanceid',type: 'string'}
            ,{name: 'id',type: 'string'}
            ,{name:'iu_u_def_freelancer', type: 'string'}
            ,{name:'iu_u_def_email', type: 'string'}
            ,{name:'iu_u_def_name', type: 'string'}
            ,{name:'iu_u_def_thephone', type: 'string'}
            ,{name:'iu_u_def_thetown', type: 'string'}
            ,{name:'iu_u_def_currole', type: 'string'}
            ,{name:'iu_u_def_lastname', type: 'string'}
            ,{name:'iu_u_def_surname', type: 'string'}
            ,{name:'iu_u_def_sendtomail', type: 'string'}
			,{name:'iu_u_def_login', type: 'string'}
        ]
    });

    var store_v_autoiu_u_def = Ext.create('Ext.data.Store', {
        model:'model_v_autoiu_u_def',
        autoLoad: false,
        autoSync: false,
        remoteSort: true,
        remoteFilter:true,
		buffered:false,
        pageSize : 1000,
        proxy: {
            type:   'ajax',
                url:   rootURL+'index.php/c_v_autoiu_u_def/getRows',
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
        },
		 listeners: {
			totalcountchange: function(count){StatusReady("Всего сотрудников: "+count);}
		}
    });

 Ext.define('model_v_allcomments',{
            extend:'Ext.data.Model',
        fields: [
           //{name: 'instanceid',type: 'string'}
           // ,{name: 'id',type: 'string'}
            {name:'thedate', type: 'string'}
            ,{name:'theauthor', type: 'string'}
            ,{name:'starttime', type: 'string'}
            ,{name:'endtime', type: 'string'}
            ,{name:'info', type: 'string'}
            ,{name:'name', type: 'string'}
			,{name:'ucode', type: 'string'}
			,{name:'uid', type: 'string'}
			,{name:'subject', type: 'string'}
			,{name:'classtheme', type: 'string'}
			,{name:'teacher', type: 'string'}
		]
    });

    var store_v_allcomments = Ext.create('Ext.data.Store', {
        model:'model_v_allcomments',
        autoLoad: false,
        autoSync: false,
        remoteSort: true,
        remoteFilter:true,
        pageSize : 30,
        proxy: {
            type:   'ajax',
            url:   rootURL+'index.php/c_v_allcomments/getRows',
			extraParams:{archived:0},
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
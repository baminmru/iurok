var cmbstore_iud_sn_def_final = Ext.create('Ext.data.Store', {
        model:'cmbmodel_iud_sn_def',
        autoLoad: false,
        autoSync: false,
        proxy: {
            type:   'ajax',
                url:   rootURL+'index.php/c_iud_sn_def/getRowsFinal',
            reader: {
                type:   'json'
                ,root:  'data'
                ,successProperty:  'success'
                ,messageProperty:  'msg'
            }
        }
    });
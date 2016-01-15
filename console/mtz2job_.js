
Ext.require([
'Ext.form.*'
]);
  mtz2job_= null;
function MTZ2JOB_Panel_(objectID, RootPanel, selection){ 


    var store_mtz2job_def = Ext.create('Ext.data.Store', {
        model:'model_mtz2job_def',
        autoLoad: false,
        autoSync: false,
        proxy: {
            type:   'ajax',
                url:   rootURL+'index.php/c_mtz2job_def/getRows',
            reader: {
                type:   'json'
                ,root:  'data'
                ,successProperty:  'success'
                ,messageProperty:  'msg'
                },
            extraParams:{
                instanceid: objectID
            }
        }
    });
          DefineForms_mtz2job_def_();
     var   int_mtz2job_def_     =      DefineInterface_mtz2job_def_('int_mtz2job_def',store_mtz2job_def);
     mtz2job_= Ext.create('Ext.form.Panel', {
      id: 'mtz2job',
      layout:'fit',
      fieldDefaults: {
          labelAlign:             'top',
          msgTarget:              'side'
        },
        defaults: {
        anchor:'100%'
        },

        instanceid:objectID,
                onCommit: function(){
        		},
        		onButtonOk: function()
        		{
        			var me = this;
        		},
        		onButtonCancel: function()
        		{
        		},
        canClose: function(){
        	return true;
        },
        items: [{
            xtype:'tabpanel',
            itemId:'tabs_mtz2job',
            activeTab: 0,
            layout: 'fit',
            tabPosition:'top',
            border:0,
            items:[   // tabs
            { // begin part tab
            xtype:'panel',
            border:0,
            title: 'Отложенное событие',
            layout:'fit',
            itemId:'tab_mtz2job_def',
            items:[ // panel on tab 
int_mtz2job_def_
        ] // panel on tab  form or grid
      } // end tab
    ] // part tabs
    }] // tabpanel
    }); //Ext.Create
    if(RootPanel==true){
       mtz2job_.closable= true;
       mtz2job_.title= 'Отложенные обработки';
       mtz2job_.frame= true;
    }else{
       mtz2job_.closable= false;
       mtz2job_.title= '';
       mtz2job_.frame= false;
    }
   int_mtz2job_def_.instanceid=objectID;	
       store_mtz2job_def.load(  {params:{ instanceid:objectID} } );
    return mtz2job_;
}
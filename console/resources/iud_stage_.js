
Ext.require([
'Ext.form.*'
]);
  iud_stage_= null;
function iud_stage_Panel_(objectID, RootPanel, selection){ 


    var store_iud_stagedef = Ext.create('Ext.data.Store', {
        model:'model_iud_stagedef',
        autoLoad: false,
        autoSync: false,
        proxy: {
            type:   'ajax',
                url:   rootURL+'index.php/c_iud_stagedef/getRows',
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
          DefineForms_iud_stagedef_();
     var   int_iud_stagedef_     =      DefineInterface_iud_stagedef_('int_iud_stagedef',store_iud_stagedef);
     iud_stage_= Ext.create('Ext.form.Panel', {
      id: 'iud_stage',
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
            itemId:'tabs_iud_stage',
            activeTab: 0,
            layout: 'fit',
            tabPosition:'top',
            border:0,
            items:[   // tabs
            { // begin part tab
            xtype:'panel',
            border:0,
            title: 'Этапы',
            layout:'fit',
            itemId:'tab_iud_stagedef',
            items:[ // panel on tab 
int_iud_stagedef_
        ] // panel on tab  form or grid
      } // end tab
    ] // part tabs
    }] // tabpanel
    }); //Ext.Create
    if(RootPanel==true){
       iud_stage_.closable= true;
       iud_stage_.title= 'Этап производства';
       iud_stage_.frame= true;
    }else{
       iud_stage_.closable= false;
       iud_stage_.title= '';
       iud_stage_.frame= false;
    }
   int_iud_stagedef_.instanceid=objectID;	
       store_iud_stagedef.load(  {params:{ instanceid:objectID} } );
    return iud_stage_;
}
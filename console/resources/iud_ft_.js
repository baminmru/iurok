
Ext.require([
'Ext.form.*'
]);
  iud_ft_= null;
function iud_ft_Panel_(objectID, RootPanel, selection){ 


    var store_iud_filetype = Ext.create('Ext.data.Store', {
        model:'model_iud_filetype',
        autoLoad: false,
        autoSync: false,
        proxy: {
            type:   'ajax',
                url:   rootURL+'index.php/c_iud_filetype/getRows',
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
          DefineForms_iud_filetype_();
     var   int_iud_filetype_     =      DefineInterface_iud_filetype_('int_iud_filetype',store_iud_filetype);
     iud_ft_= Ext.create('Ext.form.Panel', {
      id: 'iud_ft',
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
            itemId:'tabs_iud_ft',
            activeTab: 0,
            layout: 'fit',
            tabPosition:'top',
            border:0,
            items:[   // tabs
            { // begin part tab
            xtype:'panel',
            border:0,
            title: 'Тип файла',
            layout:'fit',
            itemId:'tab_iud_filetype',
            items:[ // panel on tab 
int_iud_filetype_
        ] // panel on tab  form or grid
      } // end tab
    ] // part tabs
    }] // tabpanel
    }); //Ext.Create
    if(RootPanel==true){
       iud_ft_.closable= true;
       iud_ft_.title= 'Тип файла';
       iud_ft_.frame= true;
    }else{
       iud_ft_.closable= false;
       iud_ft_.title= '';
       iud_ft_.frame= false;
    }
   int_iud_filetype_.instanceid=objectID;	
       store_iud_filetype.load(  {params:{ instanceid:objectID} } );
    return iud_ft_;
}
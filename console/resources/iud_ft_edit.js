
Ext.require([
'Ext.form.*'
]);
  iud_ft_edit= null;
function iud_ft_Panel_edit(objectID, RootPanel, selection){ 


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
          DefineForms_iud_filetype_edit();
     var   int_iud_filetype_edit     =      DefineInterface_iud_filetype_edit('int_iud_filetype',store_iud_filetype);
     iud_ft_edit= Ext.create('Ext.form.Panel', {
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
int_iud_filetype_edit
        ] // panel on tab  form or grid
      } // end tab
    ] // part tabs
    }] // tabpanel
    }); //Ext.Create
    if(RootPanel==true){
       iud_ft_edit.closable= true;
       iud_ft_edit.title= 'Тип файла';
       iud_ft_edit.frame= true;
    }else{
       iud_ft_edit.closable= false;
       iud_ft_edit.title= '';
       iud_ft_edit.frame= false;
    }
   int_iud_filetype_edit.instanceid=objectID;	
       store_iud_filetype.load(  {params:{ instanceid:objectID} } );
    return iud_ft_edit;
}
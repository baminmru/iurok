
Ext.require([
'Ext.form.*'
]);
  mtzmetamodel_= null;
function MTZMetaModel_Panel_(objectID, RootPanel, selection){ 


    var store_mtzapp = Ext.create('Ext.data.Store', {
        model:'model_mtzapp',
        autoLoad: false,
        autoSync: false,
        proxy: {
            type:   'ajax',
                url:   rootURL+'index.php/c_mtzapp/getRows',
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

    var store_parentpackage = Ext.create('Ext.data.Store', {
        model:'model_parentpackage',
        autoLoad: false,
        autoSync: false,
        proxy: {
            type:   'ajax',
                url:   rootURL+'index.php/c_parentpackage/getRows',
            reader: {
                type:   'json'
                ,root:  'data'
                ,successProperty:  'success'
                ,messageProperty:  'msg'
            }
        }
    });

    var store_objecttype = Ext.create('Ext.data.Store', {
        model:'model_objecttype',
        autoLoad: false,
        autoSync: false,
        proxy: {
            type:   'ajax',
                url:   rootURL+'index.php/c_objecttype/getRows',
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

    var store_objstatus = Ext.create('Ext.data.Store', {
        model:'model_objstatus',
        autoLoad: false,
        autoSync: false,
        proxy: {
            type:   'ajax',
                url:   rootURL+'index.php/c_objstatus/getRows',
            reader: {
                type:   'json'
                ,root:  'data'
                ,successProperty:  'success'
                ,messageProperty:  'msg'
            }
        }
    });

    var store_nextstate = Ext.create('Ext.data.Store', {
        model:'model_nextstate',
        autoLoad: false,
        autoSync: false,
        proxy: {
            type:   'ajax',
                url:   rootURL+'index.php/c_nextstate/getRows',
            reader: {
                type:   'json'
                ,root:  'data'
                ,successProperty:  'success'
                ,messageProperty:  'msg'
            }
        }
    });

    var store_objectmode = Ext.create('Ext.data.Store', {
        model:'model_objectmode',
        autoLoad: false,
        autoSync: false,
        proxy: {
            type:   'ajax',
                url:   rootURL+'index.php/c_objectmode/getRows',
            reader: {
                type:   'json'
                ,root:  'data'
                ,successProperty:  'success'
                ,messageProperty:  'msg'
            }
        }
    });

    var store_structrestriction = Ext.create('Ext.data.Store', {
        model:'model_structrestriction',
        autoLoad: false,
        autoSync: false,
        proxy: {
            type:   'ajax',
                url:   rootURL+'index.php/c_structrestriction/getRows',
            reader: {
                type:   'json'
                ,root:  'data'
                ,successProperty:  'success'
                ,messageProperty:  'msg'
            }
        }
    });

    var store_methodrestriction = Ext.create('Ext.data.Store', {
        model:'model_methodrestriction',
        autoLoad: false,
        autoSync: false,
        proxy: {
            type:   'ajax',
                url:   rootURL+'index.php/c_methodrestriction/getRows',
            reader: {
                type:   'json'
                ,root:  'data'
                ,successProperty:  'success'
                ,messageProperty:  'msg'
            }
        }
    });

    var store_fieldrestriction = Ext.create('Ext.data.Store', {
        model:'model_fieldrestriction',
        autoLoad: false,
        autoSync: false,
        proxy: {
            type:   'ajax',
                url:   rootURL+'index.php/c_fieldrestriction/getRows',
            reader: {
                type:   'json'
                ,root:  'data'
                ,successProperty:  'success'
                ,messageProperty:  'msg'
            }
        }
    });

    var store_typemenu = Ext.create('Ext.data.Store', {
        model:'model_typemenu',
        autoLoad: false,
        autoSync: false,
        proxy: {
            type:   'ajax',
                url:   rootURL+'index.php/c_typemenu/getRows',
            reader: {
                type:   'json'
                ,root:  'data'
                ,successProperty:  'success'
                ,messageProperty:  'msg'
            }
        }
    });

    var store_instancevalidator = Ext.create('Ext.data.Store', {
        model:'model_instancevalidator',
        autoLoad: false,
        autoSync: false,
        proxy: {
            type:   'ajax',
                url:   rootURL+'index.php/c_instancevalidator/getRows',
            reader: {
                type:   'json'
                ,root:  'data'
                ,successProperty:  'success'
                ,messageProperty:  'msg'
            }
        }
    });

    var treestore_part = Ext.create('Ext.data.TreeStore', {
        model:'model_part',
        autoLoad: false,
        autoSync: false,
        //folderSort: true,
        nodeParam:  'treeid',
        defaultRootId:  '{00000000-0000-0000-0000-000000000000}',
        proxy: {
            type:   'ajax',
                url:   rootURL+'index.php/c_part/getRows',
            reader: {
                type:   'json'
                },
            extraParams:{
                instanceid: objectID
            }
        }
    });

    var store_partmenu = Ext.create('Ext.data.Store', {
        model:'model_partmenu',
        autoLoad: false,
        autoSync: false,
        proxy: {
            type:   'ajax',
                url:   rootURL+'index.php/c_partmenu/getRows',
            reader: {
                type:   'json'
                ,root:  'data'
                ,successProperty:  'success'
                ,messageProperty:  'msg'
            }
        }
    });

    var store_partparammap = Ext.create('Ext.data.Store', {
        model:'model_partparammap',
        autoLoad: false,
        autoSync: false,
        proxy: {
            type:   'ajax',
                url:   rootURL+'index.php/c_partparammap/getRows',
            reader: {
                type:   'json'
                ,root:  'data'
                ,successProperty:  'success'
                ,messageProperty:  'msg'
            }
        }
    });

    var store_partview = Ext.create('Ext.data.Store', {
        model:'model_partview',
        autoLoad: false,
        autoSync: false,
        proxy: {
            type:   'ajax',
                url:   rootURL+'index.php/c_partview/getRows',
            reader: {
                type:   'json'
                ,root:  'data'
                ,successProperty:  'success'
                ,messageProperty:  'msg'
            }
        }
    });

    var store_viewcolumn = Ext.create('Ext.data.Store', {
        model:'model_viewcolumn',
        autoLoad: false,
        autoSync: false,
        proxy: {
            type:   'ajax',
                url:   rootURL+'index.php/c_viewcolumn/getRows',
            reader: {
                type:   'json'
                ,root:  'data'
                ,successProperty:  'success'
                ,messageProperty:  'msg'
            }
        }
    });

    var store_partview_lnk = Ext.create('Ext.data.Store', {
        model:'model_partview_lnk',
        autoLoad: false,
        autoSync: false,
        proxy: {
            type:   'ajax',
                url:   rootURL+'index.php/c_partview_lnk/getRows',
            reader: {
                type:   'json'
                ,root:  'data'
                ,successProperty:  'success'
                ,messageProperty:  'msg'
            }
        }
    });

    var store_validator = Ext.create('Ext.data.Store', {
        model:'model_validator',
        autoLoad: false,
        autoSync: false,
        proxy: {
            type:   'ajax',
                url:   rootURL+'index.php/c_validator/getRows',
            reader: {
                type:   'json'
                ,root:  'data'
                ,successProperty:  'success'
                ,messageProperty:  'msg'
            }
        }
    });

    var store_uniqueconstraint = Ext.create('Ext.data.Store', {
        model:'model_uniqueconstraint',
        autoLoad: false,
        autoSync: false,
        proxy: {
            type:   'ajax',
                url:   rootURL+'index.php/c_uniqueconstraint/getRows',
            reader: {
                type:   'json'
                ,root:  'data'
                ,successProperty:  'success'
                ,messageProperty:  'msg'
            }
        }
    });

    var store_constraintfield = Ext.create('Ext.data.Store', {
        model:'model_constraintfield',
        autoLoad: false,
        autoSync: false,
        proxy: {
            type:   'ajax',
                url:   rootURL+'index.php/c_constraintfield/getRows',
            reader: {
                type:   'json'
                ,root:  'data'
                ,successProperty:  'success'
                ,messageProperty:  'msg'
            }
        }
    });

    var store_extenderinterface = Ext.create('Ext.data.Store', {
        model:'model_extenderinterface',
        autoLoad: false,
        autoSync: false,
        proxy: {
            type:   'ajax',
                url:   rootURL+'index.php/c_extenderinterface/getRows',
            reader: {
                type:   'json'
                ,root:  'data'
                ,successProperty:  'success'
                ,messageProperty:  'msg'
            }
        }
    });

    var store_field = Ext.create('Ext.data.Store', {
        model:'model_field',
        autoLoad: false,
        autoSync: false,
        proxy: {
            type:   'ajax',
                url:   rootURL+'index.php/c_field/getRows',
            reader: {
                type:   'json'
                ,root:  'data'
                ,successProperty:  'success'
                ,messageProperty:  'msg'
            }
        }
    });

    var store_fldextenders = Ext.create('Ext.data.Store', {
        model:'model_fldextenders',
        autoLoad: false,
        autoSync: false,
        proxy: {
            type:   'ajax',
                url:   rootURL+'index.php/c_fldextenders/getRows',
            reader: {
                type:   'json'
                ,root:  'data'
                ,successProperty:  'success'
                ,messageProperty:  'msg'
            }
        }
    });

    var store_fieldsrcdef = Ext.create('Ext.data.Store', {
        model:'model_fieldsrcdef',
        autoLoad: false,
        autoSync: false,
        proxy: {
            type:   'ajax',
                url:   rootURL+'index.php/c_fieldsrcdef/getRows',
            reader: {
                type:   'json'
                ,root:  'data'
                ,successProperty:  'success'
                ,messageProperty:  'msg'
            }
        }
    });

    var store_dinamicfilterscript = Ext.create('Ext.data.Store', {
        model:'model_dinamicfilterscript',
        autoLoad: false,
        autoSync: false,
        proxy: {
            type:   'ajax',
                url:   rootURL+'index.php/c_dinamicfilterscript/getRows',
            reader: {
                type:   'json'
                ,root:  'data'
                ,successProperty:  'success'
                ,messageProperty:  'msg'
            }
        }
    });

    var store_fieldexpression = Ext.create('Ext.data.Store', {
        model:'model_fieldexpression',
        autoLoad: false,
        autoSync: false,
        proxy: {
            type:   'ajax',
                url:   rootURL+'index.php/c_fieldexpression/getRows',
            reader: {
                type:   'json'
                ,root:  'data'
                ,successProperty:  'success'
                ,messageProperty:  'msg'
            }
        }
    });

    var store_fieldvalidator = Ext.create('Ext.data.Store', {
        model:'model_fieldvalidator',
        autoLoad: false,
        autoSync: false,
        proxy: {
            type:   'ajax',
                url:   rootURL+'index.php/c_fieldvalidator/getRows',
            reader: {
                type:   'json'
                ,root:  'data'
                ,successProperty:  'success'
                ,messageProperty:  'msg'
            }
        }
    });

    var store_fieldmenu = Ext.create('Ext.data.Store', {
        model:'model_fieldmenu',
        autoLoad: false,
        autoSync: false,
        proxy: {
            type:   'ajax',
                url:   rootURL+'index.php/c_fieldmenu/getRows',
            reader: {
                type:   'json'
                ,root:  'data'
                ,successProperty:  'success'
                ,messageProperty:  'msg'
            }
        }
    });

    var store_fieldparammap = Ext.create('Ext.data.Store', {
        model:'model_fieldparammap',
        autoLoad: false,
        autoSync: false,
        proxy: {
            type:   'ajax',
                url:   rootURL+'index.php/c_fieldparammap/getRows',
            reader: {
                type:   'json'
                ,root:  'data'
                ,successProperty:  'success'
                ,messageProperty:  'msg'
            }
        }
    });

    var store_fieldtype = Ext.create('Ext.data.Store', {
        model:'model_fieldtype',
        autoLoad: false,
        autoSync: false,
        proxy: {
            type:   'ajax',
                url:   rootURL+'index.php/c_fieldtype/getRows',
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

    var store_enumitem = Ext.create('Ext.data.Store', {
        model:'model_enumitem',
        autoLoad: false,
        autoSync: false,
        proxy: {
            type:   'ajax',
                url:   rootURL+'index.php/c_enumitem/getRows',
            reader: {
                type:   'json'
                ,root:  'data'
                ,successProperty:  'success'
                ,messageProperty:  'msg'
            }
        }
    });

    var store_fieldtypemap = Ext.create('Ext.data.Store', {
        model:'model_fieldtypemap',
        autoLoad: false,
        autoSync: false,
        proxy: {
            type:   'ajax',
                url:   rootURL+'index.php/c_fieldtypemap/getRows',
            reader: {
                type:   'json'
                ,root:  'data'
                ,successProperty:  'success'
                ,messageProperty:  'msg'
            }
        }
    });

    var store_sharedmethod = Ext.create('Ext.data.Store', {
        model:'model_sharedmethod',
        autoLoad: false,
        autoSync: false,
        proxy: {
            type:   'ajax',
                url:   rootURL+'index.php/c_sharedmethod/getRows',
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

    var store_script = Ext.create('Ext.data.Store', {
        model:'model_script',
        autoLoad: false,
        autoSync: false,
        proxy: {
            type:   'ajax',
                url:   rootURL+'index.php/c_script/getRows',
            reader: {
                type:   'json'
                ,root:  'data'
                ,successProperty:  'success'
                ,messageProperty:  'msg'
            }
        }
    });

    var store_parameters = Ext.create('Ext.data.Store', {
        model:'model_parameters',
        autoLoad: false,
        autoSync: false,
        proxy: {
            type:   'ajax',
                url:   rootURL+'index.php/c_parameters/getRows',
            reader: {
                type:   'json'
                ,root:  'data'
                ,successProperty:  'success'
                ,messageProperty:  'msg'
            }
        }
    });

    var store_genpackage = Ext.create('Ext.data.Store', {
        model:'model_genpackage',
        autoLoad: false,
        autoSync: false,
        proxy: {
            type:   'ajax',
                url:   rootURL+'index.php/c_genpackage/getRows',
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

    var store_generator_target = Ext.create('Ext.data.Store', {
        model:'model_generator_target',
        autoLoad: false,
        autoSync: false,
        proxy: {
            type:   'ajax',
                url:   rootURL+'index.php/c_generator_target/getRows',
            reader: {
                type:   'json'
                ,root:  'data'
                ,successProperty:  'success'
                ,messageProperty:  'msg'
            }
        }
    });

    var store_genreference = Ext.create('Ext.data.Store', {
        model:'model_genreference',
        autoLoad: false,
        autoSync: false,
        proxy: {
            type:   'ajax',
                url:   rootURL+'index.php/c_genreference/getRows',
            reader: {
                type:   'json'
                ,root:  'data'
                ,successProperty:  'success'
                ,messageProperty:  'msg'
            }
        }
    });

    var store_genmanualcode = Ext.create('Ext.data.Store', {
        model:'model_genmanualcode',
        autoLoad: false,
        autoSync: false,
        proxy: {
            type:   'ajax',
                url:   rootURL+'index.php/c_genmanualcode/getRows',
            reader: {
                type:   'json'
                ,root:  'data'
                ,successProperty:  'success'
                ,messageProperty:  'msg'
            }
        }
    });

    var store_gencontrols = Ext.create('Ext.data.Store', {
        model:'model_gencontrols',
        autoLoad: false,
        autoSync: false,
        proxy: {
            type:   'ajax',
                url:   rootURL+'index.php/c_gencontrols/getRows',
            reader: {
                type:   'json'
                ,root:  'data'
                ,successProperty:  'success'
                ,messageProperty:  'msg'
            }
        }
    });

    var store_localizeinfo = Ext.create('Ext.data.Store', {
        model:'model_localizeinfo',
        autoLoad: false,
        autoSync: false,
        proxy: {
            type:   'ajax',
                url:   rootURL+'index.php/c_localizeinfo/getRows',
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
          DefineForms_mtzapp_();
          DefineForms_objecttype_();
          DefineForms_fieldtype_();
          DefineForms_sharedmethod_();
          DefineForms_genpackage_();
          DefineForms_localizeinfo_();
     var   int_mtzapp_     =      DefineInterface_mtzapp_('int_mtzapp',store_mtzapp);
     var   int_objecttype_     =      DefineInterface_objecttype_('int_objecttype',store_objecttype);
     var   int_fieldtype_     =      DefineInterface_fieldtype_('int_fieldtype',store_fieldtype);
     var   int_sharedmethod_     =      DefineInterface_sharedmethod_('int_sharedmethod',store_sharedmethod);
     var   int_genpackage_     =      DefineInterface_genpackage_('int_genpackage',store_genpackage);
     var   int_localizeinfo_     =      DefineInterface_localizeinfo_('int_localizeinfo',store_localizeinfo);
     mtzmetamodel_= Ext.create('Ext.form.Panel', {
      id: 'mtzmetamodel',
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
            itemId:'tabs_mtzmetamodel',
            activeTab: 0,
            layout: 'fit',
            tabPosition:'top',
            border:0,
            items:[   // tabs
            { // begin part tab
            xtype:'panel',
            border:0,
            title: 'Приложение',
            layout:'fit',
            itemId:'tab_mtzapp',
            items:[ // panel on tab 
int_mtzapp_
        ] // panel on tab  form or grid
      } // end tab
,
            { // begin part tab
            xtype:'panel',
            border:0,
            title: 'Тип объекта',
            layout:'fit',
            itemId:'tab_objecttype',
            items:[ // panel on tab 
int_objecttype_
        ] // panel on tab  form or grid
      } // end tab
,
            { // begin part tab
            xtype:'panel',
            border:0,
            title: 'Тип поля',
            layout:'fit',
            itemId:'tab_fieldtype',
            items:[ // panel on tab 
int_fieldtype_
        ] // panel on tab  form or grid
      } // end tab
,
            { // begin part tab
            xtype:'panel',
            border:0,
            title: 'Методы и процедуры',
            layout:'fit',
            itemId:'tab_sharedmethod',
            items:[ // panel on tab 
int_sharedmethod_
        ] // panel on tab  form or grid
      } // end tab
,
            { // begin part tab
            xtype:'panel',
            border:0,
            title: 'Пакет генерации',
            layout:'fit',
            itemId:'tab_genpackage',
            items:[ // panel on tab 
int_genpackage_
        ] // panel on tab  form or grid
      } // end tab
,
            { // begin part tab
            xtype:'panel',
            border:0,
            title: 'Локализация',
            layout:'fit',
            itemId:'tab_localizeinfo',
            items:[ // panel on tab 
int_localizeinfo_
        ] // panel on tab  form or grid
      } // end tab
    ] // part tabs
    }] // tabpanel
    }); //Ext.Create
    if(RootPanel==true){
       mtzmetamodel_.closable= true;
       mtzmetamodel_.title= 'Спец.: Метамодель системы';
       mtzmetamodel_.frame= true;
    }else{
       mtzmetamodel_.closable= false;
       mtzmetamodel_.title= '';
       mtzmetamodel_.frame= false;
    }
   int_mtzapp_.instanceid=objectID;	
       store_mtzapp.load(  {params:{ instanceid:objectID} } );
   int_objecttype_.instanceid=objectID;	
       store_objecttype.load(  {params:{ instanceid:objectID} } );
   int_fieldtype_.instanceid=objectID;	
       store_fieldtype.load(  {params:{ instanceid:objectID} } );
   int_sharedmethod_.instanceid=objectID;	
       store_sharedmethod.load(  {params:{ instanceid:objectID} } );
   int_genpackage_.instanceid=objectID;	
       store_genpackage.load(  {params:{ instanceid:objectID} } );
   int_localizeinfo_.instanceid=objectID;	
       store_localizeinfo.load(  {params:{ instanceid:objectID} } );
    return mtzmetamodel_;
}
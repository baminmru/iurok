
Ext.require([
'Ext.form.*'
]);
  iu_urok_= null;
  var gantinited=false;
function iu_urok_Panel_(objectID, RootPanel, selection){ 
	gantinited=false;

    var store_iu_urok_def = Ext.create('Ext.data.Store', {
        model:'model_iu_urok_def',
        autoLoad: false,
        autoSync: false,
        proxy: {
            type:   'ajax',
                url:   rootURL+'index.php/c_iu_urok_def/getRows',
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

    var store_iu_urok_docs = Ext.create('Ext.data.Store', {
        model:'model_iu_urok_docs',
        autoLoad: false,
        autoSync: false,
        proxy: {
            type:   'ajax',
                url:   rootURL+'index.php/c_iu_urok_docs/getRows',
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

    var store_iu_urok_video = Ext.create('Ext.data.Store', {
        model:'model_iu_urok_video',
        autoLoad: false,
        autoSync: false,
        proxy: {
            type:   'ajax',
                url:   rootURL+'index.php/c_iu_urok_video/getRows',
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

    var store_iu_urok_creators = Ext.create('Ext.data.Store', {
        model:'model_iu_urok_creators',
        autoLoad: false,
        autoSync: false,
        proxy: {
            type:   'ajax',
                url:   rootURL+'index.php/c_iu_urok_creators/getRows',
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
          DefineForms_iu_urok_def_();
          DefineForms_iu_urok_docs_();
          DefineForms_iu_urok_video_();
          DefineForms_iu_urok_creators_();
     var   int_iu_urok_def_     =      DefineInterface_iu_urok_def_('int_iu_urok_def',store_iu_urok_def, selection);
     var   int_iu_urok_docs_     =      DefineInterface_iu_urok_docs_('int_iu_urok_docs',store_iu_urok_docs);
     var   int_iu_urok_video_     =      DefineInterface_iu_urok_video_('int_iu_urok_video',store_iu_urok_video);
     var   int_iu_urok_creators_     =      DefineInterface_iu_urok_creators_('int_iu_urok_creators',store_iu_urok_creators);
     iu_urok_= Ext.create('Ext.form.Panel', {
      id: 'iu_urok',
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
              int_iu_urok_def_.doSave( me.onCommit);
        		},
        		onButtonCancel: function()
        		{
        		},
        canClose: function(){
        	return int_iu_urok_def_.canClose();
        },
        items: [{
            xtype:'tabpanel',
            itemId:'tabs_iu_urok',
            activeTab: 0,
            layout: 'fit',
            tabPosition:'top',
            border:0,
            items:[   // tabs
            { // begin part tab
            xtype:'panel',
            border:0,
            title: 'Описание',
            layout:'fit',
            itemId:'tab_iu_urok_def',
            items:[ // panel on tab 
int_iu_urok_def_
        ] // panel on tab  form or grid
      } // end tab
,
            { // begin part tab
            xtype:'panel',
            border:0,
            title: 'Управление процессом',
            layout:'fit',
            itemId:'tab_iu_urok_ctrl',
            items:[ // panel on tab 
				UrokControlTab(objectID) 
        ] // panel on tab  form or grid
		
      } // end tab
,
     { // begin part tab
            xtype:'panel',
            border:0,
            title: 'Диаграмма',
            layout:'fit',
            itemId:'tab_iu_urok_gantt',
			html:'&nbsp;&nbsp;&nbsp;<input type="radio" id="scale1" name="scale" value="1" checked /><label for="scale1">День</label> <input type="radio" id="scale2" name="scale" value="2" /><label for="scale2">Неделя</label> <input type="radio" id="scale3" name="scale" value="3" /><label for="scale3">Месяц</label> <input type="radio" id="scale4" name="scale" value="4" /><label for="scale4">Год</label><br><div id="gantt_here" style="width:100%; height:100%;border:5;"></div>',
            listeners:{
				render:function(){
					
					if(gantinited) return;
					gantinited=true;
					//gantt.config.add_column = false;
					/*gantt.templates.grid_row_class = function(item) {
						if (item.cancelled ) return "red";
						//if (item.progress >= 1) 
						return "green";
					};
					 gantt.templates.task_row_class = function(start_date, end_date, item) {
						if (item.progress  == 0) return "yellow";
						if (item.progress >= 1) return "green";
					};
					*/
					gantt.config.readonly = true;
					gantt.config.columns = [
						{name:"start_date", label:"Начало", tree:true, width:'*', width:100 },
						{name:"end_date", label:"План зав.", align: "center", width:100},
						//{name:"duration", label:"План", width:50, align: "center"},
						//{name:"fakt", label:"Факт", width:50, align: "center"},
						{name:"progress", label:"Сост.", width:100, align: "center", template: function(item) {
							 if(item.cancelled=='да')
								return "Отменена";
								if (item.fineshed =='да')
									return "Завершена";
								return Math.round(item.progress*100)+'%';
								
							}
						} //,
					
					/*	{name:"progress", label:"Сост.", width:80, align: "center",
							template: function(item) {
							 if(item.cancelled=='да')
								return "Отменена";
								if (item.finished =='да')
									return "Завершена";
								return "В работе";
								
							}
						}, */
					
						//{name:"fin_date", label:"Факт", align: "center", width:80}
					];
					
					function setScaleConfig(value){
						switch (value) {
							case "1":
								gantt.config.scale_unit = "year";
								gantt.config.step = 1;
								gantt.config.date_scale = "%Y";
								gantt.config.min_column_width = 50;
								gantt.config.subscales = [
									{unit:"month", step:1, date:"%M" },
									{unit:"day", step:1, date:"%d" }
								];
								gantt.config.scale_height = 90;
								break;
							case "2":
								var weekScaleTemplate = function(date){
									var dateToStr = gantt.date.date_to_str("%d %M");
									var dateToStr2 = gantt.date.date_to_str("%d %M,%Y");
									var endDate = gantt.date.add(gantt.date.add(date, 1, "week"), -1, "day");
									return dateToStr(date) + " - " + dateToStr2(endDate);
								};

								gantt.config.scale_unit = "week";
								gantt.config.step = 1;
								gantt.templates.date_scale = weekScaleTemplate;
								gantt.config.subscales = [
									//{unit:"day", step:1, date:"%D" }
								];
								gantt.config.scale_height = 50;
								break;
							case "3":
								gantt.config.scale_unit = "month";
								gantt.config.date_scale = "%F, %Y";
								gantt.config.subscales = [
									//{unit:"day", step:1, date:"%j, %D" }
								];
								gantt.config.scale_height = 50;
								gantt.templates.date_scale = null;
								break;
							case "4":
								gantt.config.scale_unit = "year";
								gantt.config.step = 1;
								gantt.config.date_scale = "%Y";
								gantt.config.min_column_width = 50;
								gantt.config.scale_height = 90;
								gantt.templates.date_scale = null;

								gantt.config.subscales = [
									{unit:"month", step:1, date:"%M" }
								];
								break;
						}
					}

					setScaleConfig('1');
					
					
					 Ext.Ajax.request({
						url: rootURL+'index.php/app/getGANTT',
						method:  'POST',
						params: { 
							id: objectID
						}
						, success: function(response){
						var text = response.responseText;
						var res =Ext.decode(text);
					
						var selected_column = null;

						gantt.attachEvent("onScaleClick", function (e, date) {
							selected_column = date;
							var pos = gantt.getScrollState();
							gantt.render();
							gantt.scrollTo(pos.x, pos.y);
						});
						
						/*gantt.config.scale_height = 90;
						gantt.config.scale_unit = "year";
						gantt.config.step = 1;
						gantt.config.date_scale = "%Y";
						gantt.config.min_column_width = 50;
						gantt.config.subscales = [
							{unit:"month", step:1, date:"%M" },
							{unit:"day", step:1, date:"%d" }
						];
						*/
						
						
						
						
						gantt.templates.rightside_text = function(start, end, task){
							return task.text;
						};
						
						gantt.templates.task_text=function(start,end,task){
							return task.users +"(" +task.fakt + " из " +task.duration    +")";
						};
						/* gantt.templates.task_row_class = function(start_date, end_date, item) {
								if(task.cancelled=='да')
									return "gant_myrow_cancelled";
								if (task.fineshed =='да')
									return "gant_myrow_finished";
								return "gant_myrow_progress";
						};*/
						gantt.templates.task_class = function(start, end, task){
								if(task.cancelled=='да')
									return "gant_myrow_cancelled";
								if (task.fineshed =='да')
									if(task.progress>1)
										return "gant_myrow_finished_bad";
									else
										return "gant_myrow_finished";
								return "gant_myrow_progress";
						};
						
						gantt.templates.tooltip_text = function(start,end,task){
							return task.text+"<br/>"+task.users +"(" +task.fakt + " из " +task.duration  +")"; 
							//+"<br/>"<b>С:</b> " + gantt.templates.tooltip_date_format(start)+ "<br/><b>По:</b> "+gantt.templates.tooltip_date_format(end);
						};
						
						gantt.init("gantt_here");
						gantt.clearAll();
						gantt.parse(res);
						
						var func = function(e) {
							e = e || window.event;
							var el = e.target || e.srcElement;
							var value = el.value;
							setScaleConfig(value);
							gantt.render();
						};

						var els = document.getElementsByName("scale");
						for (var i = 0; i < els.length; i++) {
							els[i].onclick = func;
						}
						
						
					  }
					});

				
					
				}
			}
		
      } // end tab
,
            { // begin part tab
            xtype:'panel',
            border:0,
            title: 'Материалы',
            layout:'fit',
            itemId:'tab_iu_urok_docs',
            items:[ // panel on tab 
int_iu_urok_docs_
        ] // panel on tab  form or grid
      } // end tab
,
            { // begin part tab
            xtype:'panel',
            border:0,
            title: 'Видеоматериалы',
            layout:'fit',
            itemId:'tab_iu_urok_video',
            items:[ // panel on tab 
int_iu_urok_video_
        ] // panel on tab  form or grid
      } // end tab
,
            { // begin part tab
            xtype:'panel',
            border:0,
            title: 'Исполнители',
            layout:'fit',
            itemId:'tab_iu_urok_creators',
            items:[ // panel on tab 
int_iu_urok_creators_
        ] // panel on tab  form or grid
      } // end tab
    ] // part tabs
    }] // tabpanel
    }); //Ext.Create
    if(RootPanel==true){
       iu_urok_.closable= true;
       iu_urok_.title= 'Урок';
       iu_urok_.frame= true;
    }else{
       iu_urok_.closable= false;
       iu_urok_.title= '';
       iu_urok_.frame= false;
    }
   store_iu_urok_def.on('load', function() {
        if(store_iu_urok_def.count()==0){
            store_iu_urok_def.insert(0, new model_iu_urok_def());
        }
        record= store_iu_urok_def.getAt(0);
        record['instanceid']=objectID;
   int_iu_urok_def_.setActiveRecord(record,objectID);	
   });
       store_iu_urok_def.load( {params:{ instanceid:objectID} }  );
   int_iu_urok_docs_.instanceid=objectID;	
       store_iu_urok_docs.load(  {params:{ instanceid:objectID} } );
   int_iu_urok_video_.instanceid=objectID;	
       store_iu_urok_video.load(  {params:{ instanceid:objectID} } );
   int_iu_urok_creators_.instanceid=objectID;	
       store_iu_urok_creators.load(  {params:{ instanceid:objectID} } );
    return iu_urok_;
}
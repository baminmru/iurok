

insert into iu_rcfg_docmode(instanceid,iu_rcfg_docmodeid,changestamp,the_document,addmode,editmode,allowadd,allowdelete)
(select instance.instanceid,g2b(uuid()),now(),objecttypeid,'read','read',0,0 from  objecttype,instance
where objecttype.name='iud_sp' and instance.objtype='iu_rcfg');



	INSERT INTO iu_rcfg_mod
		(`instanceid`,
		`iu_rcfg_modid`,
		`changestamp`,
		`sequence`,
		`theicon`,
		`groupname`,
		`name`,
		`caption`,
		`controldocmode`,
		`otherdocmode`,
		`mydocmode`,
		`allobjects`,
		`colegsobject`,
		`substructobjects`,`moduleaccessible`,`visiblecontrol`)

        select  instance.instanceid,
		g2b(uuid()),
		now(),
		`sequence`,
		`theicon`,
		`groupname`,
		iu_int_modules.`name`,
		`caption`,
		`controldocmode`,
		`otherdocmode`,
		`mydocmode`,
		0,
		0,
		0,0,`visiblecontrol` from iu_int_modules,instance
   where iu_int_modules.name='actioniud_sp' and instance.objtype='iu_rcfg';
   
   INSERT INTO iu_rcfg_mod
		(`instanceid`,
		`iu_rcfg_modid`,
		`changestamp`,
		`sequence`,
		`theicon`,
		`groupname`,
		`name`,
		`caption`,
		`controldocmode`,
		`otherdocmode`,
		`mydocmode`,
		`allobjects`,
		`colegsobject`,
		`substructobjects`,`moduleaccessible`,`visiblecontrol`)

        select  instance.instanceid,
		g2b(uuid()),
		now(),
		`sequence`,
		`theicon`,
		`groupname`,
		iu_int_modules.`name`,
		`caption`,
		`controldocmode`,
		`otherdocmode`,
		`mydocmode`,
		0,
		0,
		0,-1,`visiblecontrol` from iu_int_modules,instance
   where iu_int_modules.name='actionReportCKK' and instance.objtype='iu_rcfg';
   
   
   
   
   
   insert into iu_int_modules
   (`instanceid`,
		`iu_int_modulesid`,
		`changestamp`,
		`sequence`,
		`theicon`,
		`groupname`,
		`name`,
		`caption`,
		`controldocmode`,
		`otherdocmode`,
		`mydocmode`,
		`allobjects`,
		`colegsobject`,
		`substructobjects`,`visiblecontrol`)
   select instanceid,
		g2b(uuid()),
		now(),
		`sequence`,
		`theicon`,
		`groupname`,
		'actionReportCKK',
		'отчеты СКК',
		`controldocmode`,
		`otherdocmode`,
		`mydocmode`,
		0,
		0,
		0,`visiblecontrol` from iu_int_modules where name='actionReportODIM';
        
        
         insert into iu_int_modules
   (`instanceid`,
		`iu_int_modulesid`,
		`changestamp`,
		`sequence`,
		`theicon`,
		`groupname`,
		`name`,
		`caption`,
		`controldocmode`,
		`otherdocmode`,
		`mydocmode`,
		`allobjects`,
		`colegsobject`,
		`substructobjects`,`visiblecontrol`)
        
   select instanceid,
		g2b(uuid()),
		now(),
		`sequence`,
		`theicon`,
		`groupname`,
		'actionReportСМ',
		'отчеты контент менеджера',
		`controldocmode`,
		`otherdocmode`,
		`mydocmode`,
		0,
		0,
		0,`visiblecontrol` from iu_int_modules where name='actionReportODIM';
        
        
        
        INSERT INTO iu_rcfg_mod
		(`instanceid`,
		`iu_rcfg_modid`,
		`changestamp`,
		`sequence`,
		`theicon`,
		`groupname`,
		`name`,
		`caption`,
		`controldocmode`,
		`otherdocmode`,
		`mydocmode`,
		`allobjects`,
		`colegsobject`,
		`substructobjects`,`moduleaccessible`,`visiblecontrol`)

        select  instance.instanceid,
		g2b(uuid()),
		now(),
		`sequence`,
		`theicon`,
		`groupname`,
		iu_int_modules.`name`,
		`caption`,
		`controldocmode`,
		`otherdocmode`,
		`mydocmode`,
		0,
		0,
		0,-1,`visiblecontrol` from iu_int_modules,instance
   where iu_int_modules.name='actionReportCKK' and instance.objtype='iu_rcfg';
   
   
    INSERT INTO iu_rcfg_mod
		(`instanceid`,
		`iu_rcfg_modid`,
		`changestamp`,
		`sequence`,
		`theicon`,
		`groupname`,
		`name`,
		`caption`,
		`controldocmode`,
		`otherdocmode`,
		`mydocmode`,
		`allobjects`,
		`colegsobject`,
		`substructobjects`,`moduleaccessible`,`visiblecontrol`)

        select  instance.instanceid,
		g2b(uuid()),
		now(),
		`sequence`,
		`theicon`,
		`groupname`,
		iu_int_modules.`name`,
		`caption`,
		`controldocmode`,
		`otherdocmode`,
		`mydocmode`,
		0,
		0,
		0,-1,`visiblecontrol` from iu_int_modules,instance
   where iu_int_modules.name='actionReportСМ' and instance.objtype='iu_rcfg';
   
   update iu_rcfg_mod set name = 'actionReportCM' where name='actionReportСМ';
   

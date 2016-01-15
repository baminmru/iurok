-- select * from objecttype where name like 'iu%' and issingleinstance=-1

insert into iu_rcfg_docmode(instanceid,iu_rcfg_docmodeid,changestamp,the_document,addmode,editmode,allowadd,allowdelete)
select instance.instanceid ,g2b(uuid()), now(), objecttypeid,'','',-1,0 from instance, objecttype where instance.objtype='iu_rcfg' and objecttype.name like '%iu%'  and objecttype.issingleinstance=-1
-- select * from iu_rcfg_docmode

insert into iu_rcfg_docmode(instanceid,iu_rcfg_docmodeid,changestamp,the_document,addmode,editmode,allowadd,allowdelete)
select instance.instanceid ,g2b(uuid()), now(), objecttypeid,'','',-1,-1 from instance, objecttype where instance.objtype='iu_rcfg' and objecttype.name like '%iu%'  and objecttype.issingleinstance=0



update  iu_rcfg_docmode set addmode ='new' where iu_rcfg_docmode.the_document in (select objecttypeid from objecttype where name in ( 'iu_rcfg','iu_l'))

update  iu_rcfg_docmode set addmode ='new_' where iu_rcfg_docmode.the_document in (select objecttypeid from objecttype where name in ( 'iu_urok'))
update  iu_rcfg_docmode set editmode ='usr_' where editmode='' and  iu_rcfg_docmode.the_document in (select objecttypeid from objecttype where name in ( 'iu_urok'))


update  iu_rcfg_docmode set editmode ='edit' where iu_rcfg_docmode.the_document in (select objecttypeid from objecttype where name in ( 'iu_rcfg')) and 
iu_rcfg_docmode.instanceid in (
select instanceid from iu_rcfg_def where therole in ( select iu_croleid from iu_crole where name in('сервер СУП','супервайзер СУП')))

update  iu_rcfg_docmode set editmode ='edit' ,addmode='edit' where iu_rcfg_docmode.the_document in (select objecttypeid from objecttype where name in ( 'iu_reg')) and 
iu_rcfg_docmode.instanceid in (
select instanceid from iu_rcfg_def where therole in ( select iu_croleid from iu_crole where name in('сервер СУП','супервайзер СУП')))

insert into iu_rcfg_docmode(instanceid,iu_rcfg_docmodeid,changestamp,the_document,addmode,editmode,allowadd,allowdelete)
select instance.instanceid ,g2b(uuid()), now(), objecttypeid,'','',-1,0 from instance, objecttype where instance.objtype='iu_rcfg' 
and objecttype.name like 'iu_reg%'  and objecttype.issingleinstance=-1
-- select * from iu_rcfg_docmode


update iu_rcfg_docmode set addmode='edit', editmode='edit'   where
 iu_rcfg_docmode.the_document in (select objecttypeid from objecttype where  objecttype.issingleinstance=-1 or name in ( 'iu_rcfg','iu_s','iu_u','iu_tm')) and 
iu_rcfg_docmode.instanceid in (
select instanceid from iu_rcfg_def where therole in ( select iu_croleid from iu_crole where name in('сервер СУП','супервайзер СУП','руководитель производства','куратор')));


update iu_rcfg_docmode set addmode='', editmode=''   where
 iu_rcfg_docmode.the_document in (select objecttypeid from objecttype where  objecttype.issingleinstance=-1 or name in ( 'iu_rcfg','iu_s','iu_u','iu_tm')) and 
iu_rcfg_docmode.instanceid in (
select instanceid from iu_rcfg_def where therole in ( select iu_croleid from iu_crole where name not in('сервер СУП','супервайзер СУП','руководитель производства','куратор')));

update iu_u_def set freelancer=0;

update iu_int_modules set visiblecontrol =0;
update iu_int_modules set visiblecontrol =-1  where name in ('actioniu_t','actioniu_urok','actioniu_urok_cur');
update iu_rcfg_mod set visiblecontrol =0;
update iu_rcfg_mod set visiblecontrol =-1  where name in ('actioniu_t','actioniu_urok','actioniu_urok_cur');



update iu_rcfg_docmode set addmode='', editmode=''   where
 iu_rcfg_docmode.the_document in (select objecttypeid from objecttype where  name in ('iu_tm')) and 
iu_rcfg_docmode.instanceid in (
select instanceid from iu_rcfg_def where therole in ( select iu_croleid from iu_crole where name in('сервер СУП','супервайзер СУП','руководитель производства','куратор')));

update iu_rcfg_docmode set addmode='read', editmode='read'   where
 iu_rcfg_docmode.the_document in (select objecttypeid from objecttype where  name in ('iu_tm')) and 
iu_rcfg_docmode.instanceid in (
select instanceid from iu_rcfg_def where therole in ( select iu_croleid from iu_crole where not  name in('сервер СУП','супервайзер СУП','руководитель производства','куратор')));





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
		iu_int_modules.`caption`,
		`controldocmode`,
		`otherdocmode`,
		`mydocmode`,
		0,
		0,
		0,-1,`visiblecontrol` from iu_int_modules join instance  where iu_int_modules.name like 'actionReport%' and instance.objtype='iu_rcfg';


update iu_rcfg_mod set visiblecontrol =-1 where  name in ('actioniu_urok_cur','actioniu_urok_arch')

update iu_rcfg_docmode set addmode='', editmode=''   where
 iu_rcfg_docmode.the_document in (select objecttypeid from objecttype where  name in ( 'iu_urok_arch')) and 
iu_rcfg_docmode.instanceid in (
select instanceid from iu_rcfg_def where therole in ( select iu_croleid from iu_crole where name in('сервер СУП','супервайзер СУП')));


update iu_rcfg_docmode set addmode='read', editmode='read'   where
 iu_rcfg_docmode.the_document in (select objecttypeid from objecttype where   name in ( 'iu_urok_arch')) and 
iu_rcfg_docmode.instanceid in (
select instanceid from iu_rcfg_def where therole in ( select iu_croleid from iu_crole where name not in('сервер СУП','супервайзер СУП')));



insert into iu_rcfg_docmode(instanceid,iu_rcfg_docmodeid,changestamp,the_document,addmode,editmode,allowadd,allowdelete)
select instance.instanceid ,g2b(uuid()), now(), objecttypeid,'','',-1,-1 from instance, objecttype where instance.objtype='iu_rcfg' and objecttype.name like '%iu%'  and objecttype.issingleinstance=0
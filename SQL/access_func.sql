DELIMITER $$


drop function iu_subs_access_f
$$
CREATE  FUNCTION `iu_subs_access_f`(
 acursession varchar(38)
, ainstanceid varchar(38)
) RETURNS tinyint(1)
    READS SQL DATA
begin  
  declare existscnt int;  
  declare ausersid binary(16);
  declare aroleid binary(16);
  declare aneeduser int;


  select count(*) into existscnt from the_session 
  where the_sessionid =g2b(acursession)  and closed=0;
  if existscnt = 0 then
     return 0;
  end if;

  select iu_u_def.iu_u_defid  into  ausersid from iu_u_def 
   join  users on iu_u_def.login=users.login
  join the_session on users.usersid=the_session.usersid
  where the_session.the_sessionid=g2b(acursession);

   select count(*) into existscnt from iu_subsribe where instanceid= g2b(ainstanceid) and (subscriber = ausersid  );

  if existscnt > 0 then
     return 1;
  else
     return 0;
  end if;


end$$



drop function iu_l_access_f
$$
CREATE  FUNCTION `iu_l_access_f`(
 acursession varchar(38)
, ainstanceid varchar(38)
) RETURNS tinyint(1)
    READS SQL DATA
begin  
  declare existscnt int;  
  declare ausersid binary(16);
  declare aroleid binary(16);
  declare aneeduser int;


  select count(*) into existscnt from the_session 
  where the_sessionid =g2b(acursession)  and closed=0;
  if existscnt = 0 then
     return 0;
  end if;

  select iu_u_def.iu_u_defid  into  ausersid from iu_u_def 
   join  users on iu_u_def.login=users.login
  join the_session on users.usersid=the_session.usersid
  where the_session.the_sessionid=g2b(acursession);



   select count(*) into existscnt from iu_l_def where instanceid= g2b(ainstanceid) and (doer = ausersid  or sender=ausersid );

  if existscnt > 0 then
     return 1;
  else
     return 0;
  end if;


end$$


drop function iu_t_access_f
$$
CREATE  FUNCTION `iu_t_access_f`(
 acursession varchar(38)
, ainstanceid varchar(38)
) RETURNS tinyint(1)
    READS SQL DATA
begin  
  declare existscnt int;  
  declare ausersid binary(16);
  declare aroleid binary(16);
  declare arolename varchar(255);
  declare aneeduser int;


  select count(*) into existscnt from the_session 
  where the_sessionid =g2b(acursession)  and closed=0;
  if existscnt = 0 then
     return 0;
  end if;
  
 
  select iu_u_def.iu_u_defid, iu_crole.iu_croleid, iu_crole.allowsetuser,iu_crole.name  into  ausersid,aroleid,aneeduser,arolename from iu_u_def 
  join  iu_crole  on iu_u_def.currole=iu_crole.iu_croleid
  join  users on iu_u_def.login=users.login
  join the_session on users.usersid=the_session.usersid
  where the_session.the_sessionid=g2b(acursession);

 set existscnt=0;

 select 1 into existscnt from iu_task  join iu_urok_def on iu_task.theprocess=iu_urok_def.iu_urok_defid where iu_task.instanceid= g2b(ainstanceid) and iu_urok_def.curator=ausersid limit 0,1; 
 
  if existscnt > 0 then
     return 1;
  end if;

 set existscnt=0;

 select 1 into existsCnt 
 from iu_task 
  join  SysRefCache on (SysRefCache.ObjectOwnerID=iu_task.doer or  SysRefCache.ObjectOwnerID=iu_task.contoller)
 where SysRefCache.modulename='actioniu_t' and  SysRefCache.sessionid =g2b(aCURSESSION) and iu_task.INSTANCEID=g2b(aINSTANCEID) limit 0,1;

 if existscnt > 0 then
     return 1;
  else
     return 0;
  end if;


end$$


DELIMITER $$
drop FUNCTION `iu_urok_arch_access_f`
$$
CREATE  FUNCTION `iu_urok_arch_access_f`(
 acursession varchar(38)
, ainstanceid varchar(38)
) RETURNS tinyint(1)
    READS SQL DATA
begin  
  declare existscnt int;  
  declare ausersid binary(16);
  declare aroleid binary(16);
  declare aneeduser int;
  declare binstanceid binary(16);
  declare bsession binary(16);
 declare arolename varchar(255);


 /* 
select count(*) into existscnt from the_session 
  where the_sessionid =g2b(acursession)  and closed=0;
  if existscnt = 0 then
     return 0;
  end if;
*/

select g2b(aINSTANCEID) ,g2b(aCURSESSION),0 into binstanceid,bsession,existscnt;

 select 1 into existsCnt 
 from iu_urok_def 
  join  SysRefCache on 
  SysRefCache.ObjectOwnerID in (iu_urok_def.curator ,iu_urok_def.theTeacher ,iu_urok_def.methodist ,iu_urok_def.methodist2 )
 where SysRefCache.modulename='actioniu_urok_arch' and  SysRefCache.sessionid =bsession and iu_urok_def.INSTANCEID=binstanceid limit 0,1;

if existscnt > 0 then
     return 1;
  end if;


 select 1 into existsCnt 
 from iu_urok_creators 
  join  SysRefCache on SysRefCache.ObjectOwnerID=iu_urok_creators.doer
 where SysRefCache.modulename='actioniu_urok_arch' and  SysRefCache.sessionid =bsession and iu_urok_creators.INSTANCEID=binstanceid limit 0,1;

  if existscnt > 0 then
     return 1;
   end if;


 return 0;
end$$
DELIMITER ;



DELIMITER $$
drop FUNCTION `iu_urok_arch_access_f2`
$$
CREATE  FUNCTION `iu_urok_arch_access_f2`(
 acursession varchar(38)
, binstanceid binary(16)
) RETURNS tinyint(1)
    READS SQL DATA
begin  
  declare existscnt int;  
  declare ausersid binary(16);
  declare aroleid binary(16);
  declare aneeduser int;
   declare bsession binary(16);
 declare arolename varchar(255);


 /* 
select count(*) into existscnt from the_session 
  where the_sessionid =g2b(acursession)  and closed=0;
  if existscnt = 0 then
     return 0;
  end if;
*/

select g2b(aCURSESSION),0 into bsession,existscnt;

 select 1 into existsCnt 
 from iu_urok_def 
  join  SysRefCache on 
  SysRefCache.ObjectOwnerID in (iu_urok_def.curator ,iu_urok_def.theTeacher ,iu_urok_def.methodist ,iu_urok_def.methodist2 )
 where SysRefCache.modulename='actioniu_urok_arch' and  SysRefCache.sessionid =bsession and iu_urok_def.INSTANCEID=binstanceid limit 0,1;

if existscnt > 0 then
     return 1;
  end if;


 select 1 into existsCnt 
 from iu_urok_creators 
  join  SysRefCache on SysRefCache.ObjectOwnerID=iu_urok_creators.doer
 where SysRefCache.modulename='actioniu_urok_arch' and  SysRefCache.sessionid =bsession and iu_urok_creators.INSTANCEID=binstanceid limit 0,1;

  if existscnt > 0 then
     return 1;
   end if;


 return 0;
end$$
DELIMITER ;

DELIMITER $$
drop FUNCTION `iu_urok_access_f`
$$
CREATE  FUNCTION `iu_urok_access_f`(
 acursession varchar(38)
, ainstanceid varchar(38)
) RETURNS tinyint(1)
    READS SQL DATA
begin  
  declare existscnt int;  
  declare ausersid binary(16);
  declare aroleid binary(16);
  declare aneeduser int;
declare arolename varchar(255);
/*
  select count(*) into existscnt from the_session 
  where the_sessionid =g2b(acursession)  and closed=0;
  if existscnt = 0 then
     return 0;
  end if;

*/
 set existscnt=0;

 select 1 into existsCnt 
 from iu_urok_def 
  join  SysRefCache on (
SysRefCache.ObjectOwnerID=iu_urok_def.curator or 
SysRefCache.ObjectOwnerID=iu_urok_def.theTeacher or 
SysRefCache.ObjectOwnerID=iu_urok_def.methodist or 
SysRefCache.ObjectOwnerID=iu_urok_def.methodist2 )
 where SysRefCache.modulename='actioniu_urok_cur' and  SysRefCache.sessionid =g2b(aCURSESSION) and iu_urok_def.INSTANCEID=g2b(aINSTANCEID) limit 0,1;

if existscnt > 0 then
     return 1;
  end if;


  set existscnt=0;

select 1 into existsCnt 
 from iu_urok_creators 
  join  SysRefCache on SysRefCache.ObjectOwnerID=iu_urok_creators.doer
 where SysRefCache.modulename='actioniu_urok_cur' and  SysRefCache.sessionid =g2b(aCURSESSION) and iu_urok_creators.INSTANCEID=g2b(aINSTANCEID) limit 0,1;

  if existscnt > 0 then
     return 1;
   end if;

 return 0;
end$$
DELIMITER ;


DELIMITER $$
drop function iu_status_brief_f
$$
CREATE  FUNCTION `iu_status_brief_f`(
 aiu_statusid binary(16)
 ,alang varchar(25)
) RETURNS varchar(255) CHARSET utf8
    READS SQL DATA
begin  
 declare abrief varchar(255);
 declare atmpstr varchar(255);
 declare atmpbrief varchar(255);
 declare atmpid binary(16);
 declare atmpmr varchar(255); 
 declare amlftemp varchar(255);
 declare amlfbrief varchar(255);
 declare aec int;
if aiu_statusid is null then  set abrief=''; return abrief; end if;
select count(*) into aec from iu_status where iu_statusid=aiu_statusid;
if aec<>0 then
  set abrief='';
  select concat(abrief 
  , '' , ifnull(name,'') ,' (', `iud_process_def_brief_f`(`iu_status`.`theprocess`,NULL),')'  )
  into abrief   from iu_status  where  iu_statusid = aiu_statusid; 
else
  set abrief= '';
end if;
return abrief;
end$$
DELIMITER ;


delete from sysrefcache where modulename='actioniu_urok'
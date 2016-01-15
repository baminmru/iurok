
DELIMITER $$
drop procedure  SaveLog
$$
CREATE  PROCEDURE `SaveLog`(
 acursession varchar(38)
,aeventtype varchar (255)/* тип события *//* тип события */
,ainfo varchar (255)/* описание *//* описание */
,atheprocess varchar(38)/* урок *//* урок */
,aprocessstatus varchar(38)/* подэтап *//* подэтап */
,astatetask varchar(38)/* задача *//* задача */
,athedoc varchar(38)/* документ *//* документ */
,athevideo varchar(38)/* видео *//* видео */
,athediscussion varchar(38)/* обсуждение *//* обсуждение */
)
body: begin  
 declare asyslogid binary(16);
 declare auserid binary(16);
 declare aec int;

 select instanceid into asyslogid from instance where objtype='iu_plog';
select iu_u_defid into auserid from iu_u_def join users on iu_u_def.login=users.login join the_session on the_session.usersid=users.usersid
where the_sessionid=g2b(acursession);

 start transaction;  
 insert into   iu_plevent
 (  iu_pleventid 
,instanceid
,eventtype
,info
,doer
,createdate
,theprocess
,processstatus
,statetask
,thedoc
,thevideo
,thediscussion
 ) values ( g2b(uuid()) 
,asyslogid
,aeventtype
,ainfo
,auserid
,now()
,g2b(atheprocess)
,g2b(aprocessstatus)
,g2b(astatetask)
,g2b(athedoc)
,g2b(athevideo)
,g2b(athediscussion)
 ) ;
 commit; 
select 'ok' result;
 end$$


drop PROCEDURE `Subscribe`
 $$
CREATE  PROCEDURE `Subscribe`(
 acursession varchar(38)
,aeventtype  varchar (255)/* тип события *//* тип события */
,atheprocess varchar(38)/* урок *//* урок */
,aprocessstatus varchar(38)/* подэтап *//* подэтап */
,astatetask varchar(38)/* задача *//* задача */
,adoer varchar(38)/* сотрудник *//* сотрудник */
,athedoc varchar(38)/* документ *//* документ */
,athevideo varchar(38)/* видео *//* видео */
,athediscussion varchar(38)/* обсуждение *//* обсуждение */
)
body: begin  

 declare atmpid binary(16);
 declare aaccess int;
 declare asysinstid binary(16);
 declare auserid binary(16);
 declare amlf_partid binary(16);

 

 declare aec int;
select iu_u_defid into auserid from iu_u_def join users on iu_u_def.login=users.login join the_session on the_session.usersid=users.usersid
where the_sessionid=g2b(acursession);

 select count(*) into aec from the_session where the_sessionid=g2b(acursession) and closed=0 ;
if aec=0  then
  select 'сессия уже завершена.' result;
    leave body;
  end if;

 select checkoperation( acursession ,'iu_subs.edit') into aaccess;
 if aaccess=0  then
    select 'добавление строк не разрешено. раздел=iu_subsribe' result;
    leave body;
  end if;


select count(*) into aec from iu_subsribe where 
subscriber=auserid and 
eventtype=aeventtype 
and (theprocess=g2b(atheprocess) or atheprocess is null)
and (doer=g2b(adoer) or adoer is null)
and (thedoc=g2b(athedoc) or athedoc is null)
and (thevideo=g2b(athevideo) or athevideo is null)
and(thediscussion=g2b(athediscussion) or athediscussion is null);

if aec=0 then
 start transaction;  
set atmpid =g2b(uuid());
 insert into instance(instanceid,objtype,changestamp,name) values( atmpid,'iu_subs',now(),aeventtype);

 insert into   iu_subsribe
 ( iu_subsribeid 
,instanceid
,subscriber
,isactive
,scandate
,eventtype
,theprocess
,processstatus
,statetask
,doer
,thedoc
,thevideo
,thediscussion

 ) values ( g2b(uuid()) 
,atmpid
,auserid
,-1
,now()
,aeventtype
,g2b(atheprocess)
,g2b(aprocessstatus)
,g2b(astatetask)
,g2b(adoer)
,g2b(athedoc)
,g2b(athevideo)
,g2b(athediscussion)
 ) ;
 commit; 
else

update iu_subsribe set  isactive=-1, scandate=now() where 
subscriber=auserid and 
eventtype=aeventtype 
and (theprocess=g2b(atheprocess) or atheprocess is null)
and (doer=g2b(adoer) or adoer is null)
and (thedoc=g2b(athedoc) or athedoc is null)
and (thevideo=g2b(athevideo) or athevideo is null)
and(thediscussion=g2b(athediscussion) or athediscussion is null);

end if;
select 'ok' result;
 end$$





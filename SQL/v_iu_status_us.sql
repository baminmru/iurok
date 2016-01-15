
drop view v_iu_status_us;
CREATE  VIEW `v_iu_status_us` AS select `B2G`(`iu_status`.`iu_statusid`) AS `iu_statusid`
,`B2G`(`iu_status`.`iu_statusid`) AS `id`
,`B2G`(`iu_urok_def`.`instanceid`) AS `instanceid`
,`iu_status_BRIEF_F`(`iu_status`.`iu_statusid`,NULL) AS `brief`
,`B2G`(`iu_status`.`thestage`) AS `thestage`
,`iud_stagedef_BRIEF_F`(`iu_status`.`thestage`,NULL) AS `thestage_grid`
,`B2G`(`iu_status`.`theprocess`) AS `theprocess`
,`iud_process_def_BRIEF_F`(`iu_status`.`theprocess`,NULL) AS `theprocess_grid`
,`iu_status`.`sequence` AS `sequence`
,`iu_status`.`isfinishstate` AS `isfinishstate`
,(case `iu_status`.`isfinishstate` when -(1) then 'Да' when 0 then 'Нет' end) AS `isfinishstate_grid`
,`iu_status`.`name` AS `name`
,`iu_status`.`isstartupstate` AS `isstartupstate`
,(case `iu_status`.`isstartupstate` when -(1) then 'Да' when 0 then 'Нет' end) AS `isstartupstate_grid`
,`b2g`(`iu_urok_def`.`instanceid`) AS `urokid` 
from `iu_status` 
join `iu_urok_def` on `iu_urok_def`.`processtype` = `iu_status`.`theprocess`;


drop view v_iu_status_sib;
CREATE  VIEW `v_iu_status_sib` AS select `B2G`(`iu_status`.`iu_statusid`) AS `iu_statusid`
,`B2G`(`iu_status`.`iu_statusid`) AS `id`
,`iu_status_BRIEF_F`(`iu_status`.`iu_statusid`,NULL) AS `brief`
,`B2G`(`iu_status`.`thestage`) AS `thestage`
,`iud_stagedef_BRIEF_F`(`iu_status`.`thestage`,NULL) AS `thestage_grid`

,`B2G`(`iu_status`.`theprocess`) AS `theprocess`
,`iud_process_def_BRIEF_F`(`iu_status`.`theprocess`,NULL) AS `theprocess_grid`

,`iu_status`.`sequence` AS `sequence`
,`iu_status`.`isfinishstate` AS `isfinishstate`
,(case `iu_status`.`isfinishstate` when -(1) then 'Да' when 0 then 'Нет' end) AS `isfinishstate_grid`
,`iu_status`.`name` AS `name`
,`iu_status`.`isstartupstate` AS `isstartupstate`
,(case `iu_status`.`isstartupstate` when -(1) then 'Да' when 0 then 'Нет' end) AS `isstartupstate_grid`
,`b2g`(`sib`.`instanceid`) AS `siblingid` 
from `iu_status` 
join `iu_status` sib on `sib`.`theprocess` = `iu_status`.`theprocess`;


drop view v_iu_urokstatus;
CREATE  VIEW `v_iu_urokstatus` AS 
select `B2G`(`iu_urok_prc`.`iu_urok_prcid`) AS `iu_urok_prcid`
,`B2G`(`iu_urok_prc`.`iu_urok_prcid`) AS `id`
,`B2G`(`iu_urok_prc`.`instanceid`) AS `instanceid`
,`iu_urok_prc_BRIEF_F`(`iu_urok_prc`.`iu_urok_prcid`
,NULL) AS `brief`
,`B2G`(`iu_urok_prc`.`topstage`) AS `topstage`
,`iud_stagedef_BRIEF_F`(`iu_urok_prc`.`topstage`
,NULL) AS `topstage_grid`
,`iu_urok_prc`.`isdone` AS `isdone`
,(case `iu_urok_prc`.`isdone` when -(1) then 'Да' when 0 then 'Нет' end) AS `isdone_grid`
,`B2G`(`iu_urok_prc`.`theprocess`) AS `theprocess`
,`iu_urok_def_BRIEF_F`(`iu_urok_prc`.`theprocess`
,NULL) AS `theprocess_grid`
,`B2G`(`iu_urok_prc`.`iu_urok_stage`) AS `iu_urok_stage`
,`iu_status_BRIEF_F`(`iu_urok_prc`.`iu_urok_stage`
,NULL) AS `iu_urok_stage_grid`
,`b2g`(`iu_urok_def`.`instanceid`) AS `urokid`
,`iud_sn_def_BRIEF_F`(`iu_urok_prc`.`laststate`
,NULL) AS `laststate` 
,`iu_urok_prc`.`lastmessage`
AS `lastmessage` 
from `iu_urok_prc` 
join `iu_urok_def` on`iu_urok_prc`.`theprocess` = `iu_urok_def`.`iu_urok_defid`;



delimiter $$
drop procedure setpassword_wiz
$$
create procedure setpassword_wiz(
    acursessionid varchar(38)
, 
	ainstanceid varchar(38)
,
    anewpassword varchar(80)
, 
	acomppassword varchar(80)
    )
body: begin  
     declare ausersid  binary(16);  
	 declare apass  varchar(80);  
     declare IsOK int;
     select 0 into IsOK;
     
      select 1 into IsOK from    the_Session 
        where  (   closed=1) and the_Session.the_Sessionid=g2b(acursessionid) ;
		 if IsOK<>0 then
		   select 'Session closed'  result;
		   leave body;
		 end if;

	 if anewpassword<>acomppassword then
		select 'Новый пароль не совпадает с проверочным значением'  result;
        leave body;
	 end if;
	
    select users.usersid into ausersid from  iu_u_def
    join users on   iu_u_def.login=users.login
    where iu_u_def.instanceid=g2b(ainstanceid);
    
	
	 update users set password=md5(anewpassword) where usersid=ausersid; 
    select 'OK'  result;
    end
$$

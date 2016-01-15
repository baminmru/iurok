drop view  v_rpttasks
;
create view v_rpttasks
as
select b2g(iu_u_def.iu_u_defid) usrid, iu_u_def.lastname,iu_u_def.name,iu_u_def.surname,iu_crole.name role ,iu_task.createdate, iu_task.planenddate, 
iu_task.finishdate,iu_task.taskfinished,iu_task.taskcancelled,iu_task.isdelegated ,
iud_process_def.name process,
iud_stagedef.name stage,
iu_status.name substage,
iu_status.sequence ,
iu_statustask.name task,
ifnull(iud_town.name,'не задан') town,
`iud_sn_def_brief_f`(`iu_task`.`doer_states`,NULL) AS `doer_state`,
TIMESTAMPDIFF(HOUR,iu_task.createdate,ifnull(iu_task.finishdate,now()))/24.0 duration
from iu_task
left join iu_urok_def on iu_task.theprocess=iu_urok_def.iu_urok_defid
join  iu_u_def on iu_task.doer =iu_u_def.iu_u_defid
left join iu_statustask on iu_task.statetask=iu_statustaskid
left join iu_crole on iu_statustask.doertype=iu_crole.iu_croleid
left join iu_status on iu_statustask.instanceid=iu_status.instanceid
left join iud_process_def on iu_status.theprocess=iud_process_def.iud_process_defid
left join iud_stagedef on iu_status.thestage=iud_stagedef.iud_stagedefid
left join iud_town on iu_urok_def.maketown=iud_town.iud_townid
where  iu_task.isdelegated is null or iu_task.isdelegated=0
-- order by process, iu_status.sequence , task
;





drop view  v_rpttasks_m
;
create view v_rpttasks_m
as
select  b2g(iu_u_def.iu_u_defid) usrid, iu_u_def.lastname,iu_u_def.name,iu_u_def.surname,iu_crole.name role ,year(iu_task.createdate) cyear, month(iu_task.createdate) c_month, iu_task.planenddate, 
year(iu_task.finishdate) f_year,month(iu_task.finishdate) f_month ,iu_task.taskfinished,iu_task.taskcancelled,iu_task.isdelegated ,
iud_process_def.name process,
iud_stagedef.name stage,
iu_status.name substage,
iu_status.sequence ,
iu_statustask.name task,
iu_task.finishdate,
iu_task.createdate,
ifnull(iud_town.name,'не задан') town,
`iud_sn_def_brief_f`(`iu_task`.`doer_states`,NULL) AS `doer_state`,
TIMESTAMPDIFF(HOUR,iu_task.createdate,ifnull(iu_task.finishdate,now()))/24.0 duration
from iu_task
left join iu_urok_def on iu_task.theprocess=iu_urok_def.iu_urok_defid
join  iu_u_def on iu_task.doer =iu_u_def.iu_u_defid
left join iu_statustask on iu_task.statetask=iu_statustaskid
left join iu_crole on iu_statustask.doertype=iu_crole.iu_croleid
left join iu_status on iu_statustask.instanceid=iu_status.instanceid
left join iud_process_def on iu_status.theprocess=iud_process_def.iud_process_defid
left join iud_stagedef on iu_status.thestage=iud_stagedef.iud_stagedefid
left join iud_town on iu_urok_def.maketown=iud_town.iud_townid
where  iu_task.isdelegated is null or iu_task.isdelegated=0

;

-- odim

drop view  v_rpttasks_odim
;
create view v_rpttasks_odim
as
select b2g(iu_u_def.iu_u_defid) usrid,  iu_u_def.lastname,iu_u_def.name,iu_u_def.surname,iu_crole.name role ,iu_task.createdate, iu_task.planenddate, 
iu_task.finishdate,iu_task.taskfinished,iu_task.taskcancelled,iu_task.isdelegated ,
iud_process_def.name process,
iud_stagedef.name stage,
iu_status.name substage,
iu_status.sequence ,
iu_statustask.name task,
ifnull(iud_town.name,'не задан') town,
`iud_sn_def_brief_f`(`iu_task`.`doer_states`,NULL) AS `doer_state`,
TIMESTAMPDIFF(HOUR,iu_task.createdate,ifnull(iu_task.finishdate,now()))/24.0 duration
from iu_task
left join iu_urok_def on iu_task.theprocess=iu_urok_def.iu_urok_defid
join  iu_u_def on iu_task.doer =iu_u_def.iu_u_defid
left join iu_statustask on iu_task.statetask=iu_statustaskid
left join iu_crole on iu_statustask.doertype=iu_crole.iu_croleid
left  join iu_status on iu_statustask.instanceid=iu_status.instanceid
left join iud_process_def on iu_status.theprocess=iud_process_def.iud_process_defid
left join iud_stagedef on iu_status.thestage=iud_stagedef.iud_stagedefid
left join iud_town on iu_urok_def.maketown=iud_town.iud_townid
where  (iu_task.isdelegated is null or iu_task.isdelegated=0 ) and iu_crole.name in( 'менеджер монтажа ОДиМ','монтажер','менеджер графики ОДиМ','дизайнер')
-- order by process, iu_status.sequence , task
;


-- ckk

drop view  v_rpttasks_ckk
;
create view v_rpttasks_ckk
as
select b2g(iu_u_def.iu_u_defid) usrid,  iu_u_def.lastname,iu_u_def.name,iu_u_def.surname,iu_crole.name role ,iu_task.createdate, iu_task.planenddate, 
iu_task.finishdate,iu_task.taskfinished,iu_task.taskcancelled,iu_task.isdelegated ,
iud_process_def.name process,
iud_stagedef.name stage,
iu_status.name substage,
iud_predmet.name subject,
b2g(iu_urok_def.subject) subjectid,
b2g(iu_urok_def.theclassnum) classid,
ifnull(iu_clsinfo.name,'-') classname,
iu_status.sequence ,
iu_statustask.name task,
ifnull(iud_town.name,'не задан') town,
`iud_sn_def_brief_f`(`iu_task`.`doer_states`,NULL) AS `doer_state`,
TIMESTAMPDIFF(HOUR,iu_task.createdate,ifnull(iu_task.finishdate,now()))/24.0 duration
from iu_task
join iu_urok_def on iu_task.theprocess=iu_urok_def.iu_urok_defid
join  iu_u_def on iu_task.doer =iu_u_def.iu_u_defid
join iu_statustask on iu_task.statetask=iu_statustaskid
join iu_crole on iu_statustask.doertype=iu_crole.iu_croleid
 join iu_status on iu_statustask.instanceid=iu_status.instanceid
join iud_process_def on iu_status.theprocess=iud_process_def.iud_process_defid
join iud_stagedef on iu_status.thestage=iud_stagedef.iud_stagedefid
left join iud_town on iu_urok_def.maketown=iud_town.iud_townid
left join iu_clsinfo on iu_urok_def.theclassnum= iu_clsinfo.iu_clsinfoid
left join iud_predmet on iu_urok_def.subject=iud_predmet.iud_predmetid
where  (iu_task.isdelegated is null or iu_task.isdelegated=0 ) and iu_crole.name in( 'менеджер СКК') 
;

drop view  v_rpttasks_cm
;




create view v_rpttasks_cm
as
select b2g(iu_u_def.iu_u_defid) usrid,  iu_u_def.lastname,iu_u_def.name,iu_u_def.surname,iu_crole.name role ,iu_task.createdate, iu_task.planenddate, 
iu_task.finishdate,iu_task.taskfinished,iu_task.taskcancelled,iu_task.isdelegated ,
     b2g(`iu_urok_def`.`curator`) AS `curator`,
        iu_urok_def_brief_f(`iu_urok_def`.`curator`, NULL) AS `curator_name`,
        b2g(`iu_urok_def`.`theteacher`) AS `theteacher`,
        iu_tmdef_brief_f(`iu_urok_def`.`theteacher`, NULL) AS `theteacher_name`,
iud_process_def.name process,
iud_predmet.name subject,
b2g(iu_urok_def.subject) subjectid,
iud_stagedef.name stage,
ifnull(iud_spub.name,'-')  pubname,
b2g(iu_urok_def.theclassnum) classid,
ifnull(iu_clsinfo.name,'-') classname,
iu_status.name substage,
iu_status.sequence ,
iu_statustask.name task,
ifnull(iud_town.name,'не задан') town,
`iud_sn_def_brief_f`(`iu_task`.`doer_states`,NULL) AS `doer_state`,
TIMESTAMPDIFF(HOUR,iu_task.createdate,ifnull(iu_task.finishdate,now()))/24.0 duration
from iu_task
join iu_urok_def on iu_task.theprocess=iu_urok_def.iu_urok_defid
join  iu_u_def on iu_task.doer =iu_u_def.iu_u_defid
join iu_statustask on iu_task.statetask=iu_statustaskid
join iu_crole on iu_statustask.doertype=iu_crole.iu_croleid
 join iu_status on iu_statustask.instanceid=iu_status.instanceid
join iud_process_def on iu_status.theprocess=iud_process_def.iud_process_defid
join iud_stagedef on iu_status.thestage=iud_stagedef.iud_stagedefid
left join iud_town on iu_urok_def.maketown=iud_town.iud_townid
left join iud_spub on iu_urok_def.pubstate=iud_spub.iud_spubid
left join iu_clsinfo on iu_urok_def.theclassnum= iu_clsinfo.iu_clsinfoid
left join iud_predmet on iu_urok_def.subject=iud_predmet.iud_predmetid
where  (iu_task.isdelegated is null or iu_task.isdelegated=0 ) and iu_crole.name in( 'контент-менеджер') 
;



 -- select * from v_rpttasks_odim


drop view  v_rpttasks_m_odim
;
create view v_rpttasks_m_odim
as
select b2g(iu_u_def.iu_u_defid) usrid, iu_u_def.lastname,iu_u_def.name,iu_u_def.surname,iu_crole.name role ,year(iu_task.createdate) cyear, month(iu_task.createdate) c_month, iu_task.planenddate, 
year(iu_task.finishdate) f_year,month(iu_task.finishdate) f_month ,iu_task.taskfinished,iu_task.taskcancelled,iu_task.isdelegated ,
iud_process_def.name process,
iud_stagedef.name stage,
iu_status.name substage,
iu_status.sequence ,
iu_statustask.name task,
iu_task.finishdate,
iu_task.createdate,
ifnull(iud_town.name,'не задан') town,
`iud_sn_def_brief_f`(`iu_task`.`doer_states`,NULL) AS `doer_state`,
TIMESTAMPDIFF(HOUR,iu_task.createdate,ifnull(iu_task.finishdate,now()))/24.0 duration
from iu_task
join iu_urok_def on iu_task.theprocess=iu_urok_def.iu_urok_defid
join  iu_u_def on iu_task.doer =iu_u_def.iu_u_defid
join iu_statustask on iu_task.statetask=iu_statustaskid
join iu_crole on iu_statustask.doertype=iu_crole.iu_croleid
 join iu_status on iu_statustask.instanceid=iu_status.instanceid
join iud_process_def on iu_status.theprocess=iud_process_def.iud_process_defid
join iud_stagedef on iu_status.thestage=iud_stagedef.iud_stagedefid
left join iud_town on iu_urok_def.maketown=iud_town.iud_townid
where ( iu_task.isdelegated is null or iu_task.isdelegated=0 ) and iu_crole.name in( 'менеджер монтажа ОДиМ','монтажер','менеджер графики ОДиМ','дизайнер')

;


drop view  v_rptsubjcur
;
create view v_rptsubjcur
as
select concat( ifnull(iu_tmdef.lastname,''),' ',ifnull(iu_tmdef.name,''),' ',ifnull(iu_tmdef.surname ,'')) teacher,iu_urok_def.datecreated, 
iud_predmet.name subject,
b2g(iu_urok_def.subject) iu_urok_def_subject_id,
iu_clsinfo.name classnum,
ifnull(iud_town.name,'не задан') town
,`iud_process_def_brief_f`(`iu_urok_def`.`processtype`,NULL) AS `iu_urok_def_processtype`
,`iud_stagedef_brief_f`(`iu_urok_prc`.`topstage`,NULL) AS `iu_urok_def_topstage`
,`iu_status_brief_f`(`iu_urok_prc`.`iu_urok_stage`,NULL) AS `iu_urok_def_iu_urok_stage`
,`iud_sn_def_brief_f`(`iu_urok_def`.`ckksn`,NULL) AS `iu_urok_def_ckksn`
,`iud_sn_def_brief_f`(`iu_urok_prc`.`laststate`,NULL) AS `iu_urok_def_laststate`
,b2g(iu_urok_def.curator) curator
,iu_urok_prc.isdone
,iu_urok_def.iu_urok_defid
from iu_urok_def
left join  iu_tmdef on iu_urok_def.theteacher =iu_tmdef.iu_tmdefid
join iud_predmet on iu_urok_def.subject=iud_predmet.iud_predmetid
join iu_clsinfo on iu_urok_def.theclassnum=iu_clsinfo.iu_clsinfoid
left join  iu_urok_prc on iu_urok_prc.theprocess=iu_urok_def.iu_urok_defid
left join iud_town on iu_urok_def.maketown=iud_town.iud_townid

;

-- select  * from iu_urok_prc
-- select * from v_rptsubjcur where curator='{86C1127B-DA7E-11E3-8FBF-00155D0ED711}'

drop view  v_rptsubj
;
create view v_rptsubj
as
select b2g(iu_u_def.iu_u_defid) usrid, iu_u_def.lastname,iu_u_def.name,iu_u_def.surname,iu_task.createdate, iu_task.planenddate, 
iu_task.finishdate,iu_task.taskfinished,iu_task.taskcancelled,iu_task.isdelegated ,
iud_predmet.name subject,
b2g(iu_urok_def.subject) iu_urok_def_subject_id,
iu_clsinfo.name classnum,
ifnull(iud_town.name,'не задан') town
,`iud_sn_def_brief_f`(`iu_urok_def`.`ckksn`,NULL) AS `iu_urok_def_ckksn`
,`iud_sn_def_brief_f`(`iu_urok_prc`.`laststate`,NULL) AS `iu_urok_def_laststate`
from iu_task
join  iu_u_def on iu_task.doer =iu_u_def.iu_u_defid
join iu_urok_def on iu_task.theprocess=iu_urok_def.iu_urok_defid
left join  iu_urok_prc on iu_urok_prc.theprocess=iu_urok_def.iu_urok_defid
join iud_predmet on iu_urok_def.subject=iud_predmet.iud_predmetid
join iu_clsinfo on iu_urok_def.theclassnum=iu_clsinfo.iu_clsinfoid
left join iud_town on iu_urok_def.maketown=iud_town.iud_townid
where  iu_task.isdelegated is null or iu_task.isdelegated=0
;


drop view  v_rptsubjt
;
create view v_rptsubjt
as
select  b2g(iu_u_def.iu_u_defid) usrid, iu_u_def.lastname,iu_u_def.name,iu_u_def.surname,iu_tmdef.lastname t_lastname ,iu_tmdef.name t_name 
,iu_tmdef.surname t_surname,    iu_task.createdate, iu_task.planenddate, 
iu_task.finishdate,iu_task.taskfinished,iu_task.taskcancelled,iu_task.isdelegated ,
iud_predmet.name subject,
b2g(iu_urok_def.subject) iu_urok_def_subject_id,
iu_clsinfo.name classnum,
ifnull(iud_town.name,'не задан') town
,`iud_sn_def_brief_f`(`iu_urok_def`.`ckksn`,NULL) AS `iu_urok_def_ckksn`
,`iud_sn_def_brief_f`(`iu_urok_prc`.`laststate`,NULL) AS `iu_urok_def_laststate`
from iu_task
join  iu_u_def on iu_task.doer =iu_u_def.iu_u_defid
left join iu_urok_def on iu_task.theprocess=iu_urok_def.iu_urok_defid
left join  iu_urok_prc on iu_urok_prc.theprocess=iu_urok_def.iu_urok_defid
left join iud_predmet on iu_urok_def.subject=iud_predmet.iud_predmetid
left join  iu_tmdef on  iu_urok_def.theteacher =iu_tmdef.iu_tmdefid
left join iu_clsinfo on iu_urok_def.theclassnum=iu_clsinfo.iu_clsinfoid
left join iud_town on iu_urok_def.maketown=iud_town.iud_townid
where  iu_task.isdelegated is null or iu_task.isdelegated=0
;



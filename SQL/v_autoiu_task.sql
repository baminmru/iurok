drop view v_autoiu_task
;


CREATE  VIEW `v_autoiu_task` AS
 select `b2g`(`iu_task`.`iu_taskid`) AS `iu_taskid`
,`iu_task`.`changestamp` AS `changestamp`
,`b2g`(`iu_task`.`doer`) AS `iu_task_doer_id`
,`iu_u_def_brief_f`(`iu_task`.`doer`,NULL) AS `iu_task_doer`
,`iu_task`.`subj` AS `iu_task_subj`
,`iu_task`.`createdate` AS `iu_task_createdate`
,`iu_task`.`info` AS `iu_task_info`
,`iu_task`.`doer_comment` AS `iu_task_doer_comment`
,`iu_task`.`controller_comment` AS `iu_task_controller_comment`
,b2g(`iu_task`.`doer_states`) AS `iu_task_doer_states_id`
,`iud_sn_def_brief_f`(`iu_task`.`doer_states`,NULL) AS `iu_task_doer_states`
,`iu_task`.`planenddate` AS `iu_task_planenddate`
,`b2g`(`iu_task`.`contoller`) AS `iu_task_controller_id`
,`iu_u_def_brief_f`(`iu_task`.`contoller`,NULL) AS `iu_task_contoller`
,`iu_task`.`taskfinished` AS `iu_task_taskfinished_val`
,(case `iu_task`.`taskfinished` when -(1) then 'да' when 0 then 'нет' end) AS `iu_task_taskfinished`
,`iu_task`.`ischecked` AS `iu_task_ischecked_val`
,(case `iu_task`.`ischecked` when -(1) then 'да' when 0 then 'нет' end) AS `iu_task_ischecked`
,`iu_task`.`taskcancelled` AS `iu_task_taskcancelled_val`
,(case `iu_task`.`taskcancelled` when -(1) then 'да' when 0 then 'нет' end) AS `iu_task_taskcancelled`
,`iu_task`.`isdelegated` AS `iu_task_isdelegated_val`
,(case `iu_task`.`isdelegated` when -(1) then 'да' when 0 then 'нет' end) AS `iu_task_isdelegated`
,(case `iu_task`.`manualtask` when -(1) then 'да' when 0 then 'нет' end) AS `iu_task_manualtask`
,`iu_task`.`finishdate` AS `iu_task_finishdate`
,`iu_task`.`senttodoer` AS `iu_task_senttodoer`
,`b2g`(`iu_task`.`theprocess`) AS `iu_task_theprocess_id`
,`iu_urok_def_brief_f`(`iu_task`.`theprocess`,NULL) AS `iu_task_theprocess`
,iu_urok_def.ucode
,b2g(iu_urok_def.instanceid  )  urokid
,`b2g`(`iu_task`.`processstatus`) AS `iu_task_processstatus_id`
,`iu_status_brief_f`(`iu_task`.`processstatus`,NULL) AS `iu_task_processstatus`
,`b2g`(`iu_task`.`statetask`) AS `iu_task_statetask_id`
,`iu_statustask_brief_f`(`iu_task`.`statetask`,NULL) AS `iu_task_statetask`
,`b2g`(`iu_task`.`delegatefrom`) AS `iu_task_delegatefrom_id`
,`iu_task_brief_f`(`iu_task`.`delegatefrom`,NULL) AS `iu_task_delegatefrom`
, ifnull(iu_urok_prc.isdone,0) as iu_task_urokdone
,`b2g`(`iu_task`.`instanceid`) AS `instanceid`
,`iu_task`.`instanceid` AS `instanceid_val`
,`instance`.`archived` AS `instance_archived`
,`b2g`(`iu_task`.`iu_taskid`) AS `id`

,`iu_urok_def`.`thequarter` AS `iu_urok_def_thequarter_val`

 ,`b2g`(`iu_urok_def`.`curator`) AS `iu_urok_def_curator_id`
,`iu_u_def_brief_f`(`iu_urok_def`.`curator`,NULL) AS `iu_urok_def_curator`
-- ,`b2g`(`iu_urok_def`.`theteacher`) AS `iu_urok_def_theteacher_id`
,`iu_tmdef_brief_f`(`iu_urok_def`.`theteacher`,NULL) AS `iu_urok_def_theteacher`
-- ,`b2g`(`iu_urok_prc`.`laststate`) AS `iu_urok_def_laststate_id`
,`iud_sn_def_brief_f`(`iu_urok_prc`.`laststate`,NULL) AS `iu_urok_def_laststate`
 ,`b2g`(`iu_urok_def`.`subject`) AS `iu_urok_def_subject_id`
,`iud_predmet_brief_f`(`iu_urok_def`.`subject`,NULL) AS `iu_urok_def_subject`

,`b2g`(`iu_urok_def`.`processtype`) AS `iu_urok_def_processtype_id`

,`iud_process_def_brief_f`(`iu_urok_def`.`processtype`,NULL) AS `iu_urok_def_processtype`

,(case `iu_urok_def`.`thequarter` when 1 then 'I' when 4 then 'IV' when 0 then '?' when 2 then 'II' when 3 then 'III' end) AS `iu_urok_def_thequarter`

,'iu_task' AS `viewbase`
,`xxxmystatusxxx`.`name` AS `statusname`
,`b2g`(`xxxmystatusxxx`.`objstatusid`) AS `intsancestatusid` 
from `iu_task` 
left join iu_urok_def on iu_task.theprocess = iu_urok_def.iu_urok_defid
left join iu_urok_prc on iu_urok_prc.theprocess = iu_urok_def.iu_urok_defid
join `instance` on`iu_task`.`instanceid` = `instance`.`instanceid` 
left join `objstatus` `xxxmystatusxxx` on`instance`.`status` = `xxxmystatusxxx`.`objstatusid`;


-- select * from iu_urok_prc

-- select * from v_autoiu_task
drop view `v_autoiu_urok_def`;



create view `v_autoiu_urok_def` AS 
select `b2g`(`iu_urok_def`.`iu_urok_defid`) AS `iu_urok_defid`
,`iu_urok_def`.`changestamp` AS `changestamp`
,`iu_urok_def`.`ucode` AS `iu_urok_def_ucode`
,`iu_urok_def`.`datecreated` AS `iu_urok_def_datecreated`
,`iu_urok_def`.`actiondate` AS `iu_urok_def_actiondate`
,`iu_urok_def`.`actiondate2` AS `iu_urok_def_actiondate2`
,`b2g`(`iu_urok_def`.`subject`) AS `iu_urok_def_subject_id`
,`iud_predmet_brief_f`(`iu_urok_def`.`subject`
,NULL) AS `iu_urok_def_subject`
,`b2g`(`iu_urok_def`.`theclassnum`) AS `iu_urok_def_theclassnum_id`
,`iu_clsinfo_brief_f`(`iu_urok_def`.`theclassnum`
,NULL) AS `iu_urok_def_theclassnum`
,`iu_urok_def`.`plannum` AS `iu_urok_def_plannum`
,`b2g`(`iu_urok_def`.`maketown`) AS `iu_urok_def_maketown_id`
,`iud_town_brief_f`(`iu_urok_def`.`maketown`
,NULL) AS `iu_urok_def_maketown`

,`b2g`(`iu_urok_def`.`coursetype`) AS `iu_urok_def_coursetype_id`
,`iud_ctype_brief_f`(`iu_urok_def`.`coursetype`
,NULL) AS `iu_urok_def_coursetype`

,`iu_urok_def`.`rtheme` AS `iu_urok_def_rtheme`
,`iu_urok_def`.`classtheme` AS `iu_urok_def_classtheme`
,`iu_urok_def`.`thequarter` AS `iu_urok_def_thequarter_val`
,(case `iu_urok_def`.`thequarter` when 1 then 'I' when 4 then 'IV' when 0 then '?' when 2 then 'II' when 3 then 'III' end) AS `iu_urok_def_thequarter`
,`iu_urok_def`.`schooldate` AS `iu_urok_def_schooldate`
,`b2g`(`iu_urok_def`.`curator`) AS `iu_urok_def_curator_id`
,`iu_u_def_brief_f`(`iu_urok_def`.`curator`
,NULL) AS `iu_urok_def_curator`
,`b2g`(`iu_urok_def`.`theteacher`) AS `iu_urok_def_theteacher_id`
,`iu_tmdef_brief_f`(`iu_urok_def`.`theteacher`
,NULL) AS `iu_urok_def_theteacher`
,`b2g`(`iu_urok_def`.`methodist`) AS `iu_urok_def_methodist_id`
,`iu_tmdef_brief_f`(`iu_urok_def`.`methodist`
,NULL) AS `iu_urok_def_methodist`
,`b2g`(`iu_urok_def`.`methodist2`) AS `iu_urok_def_methodist2_id`
,`iu_tmdef_brief_f`(`iu_urok_def`.`methodist2`
,NULL) AS `iu_urok_def_methodist2`
,`b2g`(`iu_urok_def`.`processtype`) AS `iu_urok_def_processtype_id`
,`iud_process_def_brief_f`(`iu_urok_def`.`processtype`
,NULL) AS `iu_urok_def_processtype`
,`b2g`(`iu_urok_prc`.`topstage`) AS `iu_urok_def_topstage_id`
,`iud_stagedef_brief_f`(`iu_urok_prc`.`topstage`
,NULL) AS `iu_urok_def_topstage`
,`b2g`(`iu_urok_prc`.`iu_urok_stage`) AS `iu_urok_def_iu_urok_stage_id`
,`iu_status_brief_f`(`iu_urok_prc`.`iu_urok_stage`
,NULL) AS `iu_urok_def_iu_urok_stage`

,`b2g`(`iu_urok_def`.`ckksn`) AS `iu_urok_def_ckksn_id`
,`iud_sn_def_brief_f`(`iu_urok_def`.`ckksn`,NULL) AS `iu_urok_def_ckksn`

,`b2g`(`iu_urok_prc`.`laststate`) AS `iu_urok_def_laststate_id`
,`iud_sn_def_brief_f`(`iu_urok_prc`.`laststate`,NULL) AS `iu_urok_def_laststate`
,`iu_urok_prc`.`lastmessage` AS `iu_urok_def_lastmessage`

,`iu_urok_prc`.`isdone` AS `iu_urok_def_isdone_val`
,(case `iu_urok_prc`.`isdone` when -(1) then 'да' when 0 then 'нет' end) AS `iu_urok_def_isdone`

,`iu_urok_prc`.`manualcontrol` AS `iu_urok_def_manualcontrol_val`
,(case `iu_urok_prc`.`manualcontrol` when -(1) then 'да' when 0 then 'нет' end) AS `iu_urok_def_manualcontrol`
,`iu_urok_prc`.`taskdelayed` AS `iu_urok_def_taskdelayed`

,`iu_urok_def`.`testpageref` AS `iu_urok_def_testpageref`

,`b2g`(`iu_urok_def`.`pubstate`) AS `iu_urok_def_pubstate_id`
,`iud_spub_brief_f`(`iu_urok_def`.`pubstate`,NULL) AS `iu_urok_def_pubstate`

,`b2g`(`iu_urok_def`.`thefilm`) AS `iu_urok_def_thefilm_id`
,`iu_urok_def_brief_f`(`iu_urok_def`.`thefilm`,NULL) AS `iu_urok_def_thefilm`
,`iu_urok_def`.`thefilmurl` AS `iu_urok_def_thefilmurl`
,`iu_urok_def`.`mainref` AS `iu_urok_def_mainref`
,`b2g`(`iu_urok_def`.`instanceid`) AS `instanceid`
,`iu_urok_def`.`instanceid` AS `instanceid_val`
,`instance`.`archived` AS `instance_archived`
,`b2g`(`iu_urok_def`.`iu_urok_defid`) AS `id`
,'iu_urok_def' AS `viewbase`
,`xxxmystatusxxx`.`name` AS `statusname`
,`b2g`(`xxxmystatusxxx`.`objstatusid`) AS `intsancestatusid` 


,`b2g`(`iu_urok_prc`.`lastdoer`) AS `iu_urok_def_lastdoer_id`
,`iu_u_def_brief_f`(`iu_urok_prc`.`lastdoer`
,NULL) AS `iu_urok_def_lastdoer`
,`iu_urok_prc`.`lastplanned` AS `iu_urok_def_lastplanned`

from `iu_urok_def` 
left join  iu_urok_prc on iu_urok_prc.theprocess=iu_urok_def.iu_urok_defid
--  join iu_task on  iu_taskid=getactivetask(iu_urok_defid)

join `instance` on`iu_urok_def`.`instanceid` = `instance`.`instanceid`
left join `objstatus` `xxxmystatusxxx` on`instance`.`status` = `xxxmystatusxxx`.`objstatusid`;


drop view v_autoiu_urok_def_arch;

create view`v_autoiu_urok_def_arch` AS 
select `b2g`(`iu_urok_def`.`iu_urok_defid`) AS `iu_urok_defid`
,`iu_urok_def`.`changestamp` AS `changestamp`
,`iu_urok_def`.`ucode` AS `iu_urok_def_ucode`
,`iu_urok_def`.`datecreated` AS `iu_urok_def_datecreated`
,`iu_urok_def`.`actiondate` AS `iu_urok_def_actiondate`
,`iu_urok_def`.`actiondate2` AS `iu_urok_def_actiondate2`
,`b2g`(`iu_urok_def`.`subject`) AS `iu_urok_def_subject_id`
,`iud_predmet_brief_f`(`iu_urok_def`.`subject`
,NULL) AS `iu_urok_def_subject`
,`b2g`(`iu_urok_def`.`theclassnum`) AS `iu_urok_def_theclassnum_id`
,`iu_clsinfo_brief_f`(`iu_urok_def`.`theclassnum`
,NULL) AS `iu_urok_def_theclassnum`
,`iu_urok_def`.`plannum` AS `iu_urok_def_plannum`
,`b2g`(`iu_urok_def`.`maketown`) AS `iu_urok_def_maketown_id`
,`iud_town_brief_f`(`iu_urok_def`.`maketown`
,NULL) AS `iu_urok_def_maketown`

,`b2g`(`iu_urok_def`.`coursetype`) AS `iu_urok_def_coursetype_id`
,`iud_ctype_brief_f`(`iu_urok_def`.`coursetype`
,NULL) AS `iu_urok_def_coursetype`

,`iu_urok_def`.`rtheme` AS `iu_urok_def_rtheme`
,`iu_urok_def`.`classtheme` AS `iu_urok_def_classtheme`
,`iu_urok_def`.`thequarter` AS `iu_urok_def_thequarter_val`
,(case `iu_urok_def`.`thequarter` when 1 then 'I' when 4 then 'IV' when 0 then '?' when 2 then 'II' when 3 then 'III' end) AS `iu_urok_def_thequarter`
,`iu_urok_def`.`schooldate` AS `iu_urok_def_schooldate`
,`b2g`(`iu_urok_def`.`curator`) AS `iu_urok_def_curator_id`
,`iu_u_def_brief_f`(`iu_urok_def`.`curator`
,NULL) AS `iu_urok_def_curator`
,`b2g`(`iu_urok_def`.`theteacher`) AS `iu_urok_def_theteacher_id`
,`iu_tmdef_brief_f`(`iu_urok_def`.`theteacher`
,NULL) AS `iu_urok_def_theteacher`
,`b2g`(`iu_urok_def`.`methodist`) AS `iu_urok_def_methodist_id`
,`iu_tmdef_brief_f`(`iu_urok_def`.`methodist`
,NULL) AS `iu_urok_def_methodist`
,`b2g`(`iu_urok_def`.`methodist2`) AS `iu_urok_def_methodist2_id`
,`iu_tmdef_brief_f`(`iu_urok_def`.`methodist2`
,NULL) AS `iu_urok_def_methodist2`
,`b2g`(`iu_urok_def`.`processtype`) AS `iu_urok_def_processtype_id`
,`iud_process_def_brief_f`(`iu_urok_def`.`processtype`
,NULL) AS `iu_urok_def_processtype`
,`b2g`(`iu_urok_prc`.`topstage`) AS `iu_urok_def_topstage_id`
,`iud_stagedef_brief_f`(`iu_urok_prc`.`topstage`
,NULL) AS `iu_urok_def_topstage`
,`b2g`(`iu_urok_prc`.`iu_urok_stage`) AS `iu_urok_def_iu_urok_stage_id`
,`iu_status_brief_f`(`iu_urok_prc`.`iu_urok_stage`
,NULL) AS `iu_urok_def_iu_urok_stage`

,`b2g`(`iu_urok_def`.`ckksn`) AS `iu_urok_def_ckksn_id`
,`iud_sn_def_brief_f`(`iu_urok_def`.`ckksn`,NULL) AS `iu_urok_def_ckksn`
,`b2g`(`iu_urok_def`.`pubstate`) AS `iu_urok_def_pubstate_id`
,`iud_spub_brief_f`(`iu_urok_def`.`pubstate`,NULL) AS `iu_urok_def_pubstate`

,`b2g`(`iu_urok_prc`.`laststate`) AS `iu_urok_def_laststate_id`
,`iud_sn_def_brief_f`(`iu_urok_prc`.`laststate`,NULL) AS `iu_urok_def_laststate`
,`iu_urok_prc`.`lastmessage` AS `iu_urok_def_lastmessage`

,`iu_urok_prc`.`isdone` AS `iu_urok_def_isdone_val`
,(case `iu_urok_prc`.`isdone` when -(1) then 'да' when 0 then 'нет' end) AS `iu_urok_def_isdone`

,`iu_urok_prc`.`manualcontrol` AS `iu_urok_def_manualcontrol_val`
,(case `iu_urok_prc`.`manualcontrol` when -(1) then 'да' when 0 then 'нет' end) AS `iu_urok_def_manualcontrol`
,`iu_urok_prc`.`taskdelayed` AS `iu_urok_def_taskdelayed`

,`iu_urok_def`.`testpageref` AS `iu_urok_def_testpageref`
,`b2g`(`iu_urok_def`.`thefilm`) AS `iu_urok_def_thefilm_id`
,`iu_urok_def_brief_f`(`iu_urok_def`.`thefilm`,NULL) AS `iu_urok_def_thefilm`
,`iu_urok_def`.`thefilmurl` AS `iu_urok_def_thefilmurl`
,`iu_urok_def`.`mainref` AS `iu_urok_def_mainref`
,`b2g`(`iu_urok_def`.`instanceid`) AS `instanceid`
,`iu_urok_def`.`instanceid` AS `instanceid_val`
,`instance`.`archived` AS `instance_archived`
,`b2g`(`iu_urok_def`.`iu_urok_defid`) AS `id`
,'iu_urok_def' AS `viewbase`
,`xxxmystatusxxx`.`name` AS `statusname`
,`b2g`(`xxxmystatusxxx`.`objstatusid`) AS `intsancestatusid` 
from `iu_urok_def` 
left join  iu_urok_prc on iu_urok_prc.theprocess=iu_urok_def.iu_urok_defid
join `instance` on`iu_urok_def`.`instanceid` = `instance`.`instanceid`
left join `objstatus` `xxxmystatusxxx` on`instance`.`status` = `xxxmystatusxxx`.`objstatusid`;

drop view v_autoiu_urok_def_trash;

CREATE view `v_autoiu_urok_def_trash` AS 
select `b2g`(`iu_urok_def`.`iu_urok_defid`) AS `iu_urok_defid`
,`iu_urok_def`.`changestamp` AS `changestamp`
,`iu_urok_def`.`ucode` AS `iu_urok_def_ucode`
,`iu_urok_def`.`datecreated` AS `iu_urok_def_datecreated`
,`iu_urok_def`.`actiondate` AS `iu_urok_def_actiondate`
,`iu_urok_def`.`actiondate2` AS `iu_urok_def_actiondate2`
,`b2g`(`iu_urok_def`.`subject`) AS `iu_urok_def_subject_id`
,`iud_predmet_brief_f`(`iu_urok_def`.`subject`
,NULL) AS `iu_urok_def_subject`
,`b2g`(`iu_urok_def`.`theclassnum`) AS `iu_urok_def_theclassnum_id`
,`iu_clsinfo_brief_f`(`iu_urok_def`.`theclassnum`
,NULL) AS `iu_urok_def_theclassnum`
,`iu_urok_def`.`plannum` AS `iu_urok_def_plannum`
,`b2g`(`iu_urok_def`.`maketown`) AS `iu_urok_def_maketown_id`
,`iud_town_brief_f`(`iu_urok_def`.`maketown`
,NULL) AS `iu_urok_def_maketown`

,`b2g`(`iu_urok_def`.`coursetype`) AS `iu_urok_def_coursetype_id`
,`iud_ctype_brief_f`(`iu_urok_def`.`coursetype`
,NULL) AS `iu_urok_def_coursetype`

,`iu_urok_def`.`rtheme` AS `iu_urok_def_rtheme`
,`iu_urok_def`.`classtheme` AS `iu_urok_def_classtheme`
,`iu_urok_def`.`thequarter` AS `iu_urok_def_thequarter_val`
,(case `iu_urok_def`.`thequarter` when 1 then 'I' when 4 then 'IV' when 0 then '?' when 2 then 'II' when 3 then 'III' end) AS `iu_urok_def_thequarter`
,`iu_urok_def`.`schooldate` AS `iu_urok_def_schooldate`
,`b2g`(`iu_urok_def`.`curator`) AS `iu_urok_def_curator_id`
,`iu_u_def_brief_f`(`iu_urok_def`.`curator`
,NULL) AS `iu_urok_def_curator`
,`b2g`(`iu_urok_def`.`theteacher`) AS `iu_urok_def_theteacher_id`
,`iu_tmdef_brief_f`(`iu_urok_def`.`theteacher`
,NULL) AS `iu_urok_def_theteacher`
,`b2g`(`iu_urok_def`.`methodist`) AS `iu_urok_def_methodist_id`
,`iu_tmdef_brief_f`(`iu_urok_def`.`methodist`
,NULL) AS `iu_urok_def_methodist`
,`b2g`(`iu_urok_def`.`methodist2`) AS `iu_urok_def_methodist2_id`
,`iu_tmdef_brief_f`(`iu_urok_def`.`methodist2`
,NULL) AS `iu_urok_def_methodist2`
,`b2g`(`iu_urok_def`.`processtype`) AS `iu_urok_def_processtype_id`
,`iud_process_def_brief_f`(`iu_urok_def`.`processtype`
,NULL) AS `iu_urok_def_processtype`
,`b2g`(`iu_urok_prc`.`topstage`) AS `iu_urok_def_topstage_id`
,`iud_stagedef_brief_f`(`iu_urok_prc`.`topstage`
,NULL) AS `iu_urok_def_topstage`
,`b2g`(`iu_urok_prc`.`iu_urok_stage`) AS `iu_urok_def_iu_urok_stage_id`
,`iu_status_brief_f`(`iu_urok_prc`.`iu_urok_stage`
,NULL) AS `iu_urok_def_iu_urok_stage`

,`b2g`(`iu_urok_def`.`ckksn`) AS `iu_urok_def_ckksn_id`
,`iud_sn_def_brief_f`(`iu_urok_def`.`ckksn`,NULL) AS `iu_urok_def_ckksn`

,`b2g`(`iu_urok_prc`.`laststate`) AS `iu_urok_def_laststate_id`
,`iud_sn_def_brief_f`(`iu_urok_prc`.`laststate`,NULL) AS `iu_urok_def_laststate`
,`iu_urok_prc`.`lastmessage` AS `iu_urok_def_lastmessage`

,`iu_urok_prc`.`isdone` AS `iu_urok_def_isdone_val`
,(case `iu_urok_prc`.`isdone` when -(1) then 'да' when 0 then 'нет' end) AS `iu_urok_def_isdone`

,`iu_urok_prc`.`manualcontrol` AS `iu_urok_def_manualcontrol_val`
,(case `iu_urok_prc`.`manualcontrol` when -(1) then 'да' when 0 then 'нет' end) AS `iu_urok_def_manualcontrol`
,`iu_urok_prc`.`taskdelayed` AS `iu_urok_def_taskdelayed`

,`iu_urok_def`.`testpageref` AS `iu_urok_def_testpageref`
,`b2g`(`iu_urok_def`.`thefilm`) AS `iu_urok_def_thefilm_id`
,`iu_urok_def_brief_f`(`iu_urok_def`.`thefilm`,NULL) AS `iu_urok_def_thefilm`
,`iu_urok_def`.`thefilmurl` AS `iu_urok_def_thefilmurl`
,`iu_urok_def`.`mainref` AS `iu_urok_def_mainref`
,`b2g`(`iu_urok_def`.`instanceid`) AS `instanceid`
,`iu_urok_def`.`instanceid` AS `instanceid_val`
,`instance`.`archived` AS `instance_archived`
,`b2g`(`iu_urok_def`.`iu_urok_defid`) AS `id`
,'iu_urok_def' AS `viewbase`
,`xxxmystatusxxx`.`name` AS `statusname`
,`b2g`(`xxxmystatusxxx`.`objstatusid`) AS `intsancestatusid` 
from `iu_urok_def` 
left join  iu_urok_prc on iu_urok_prc.theprocess=iu_urok_def.iu_urok_defid
join `instance` on`iu_urok_def`.`instanceid` = `instance`.`instanceid`
left join `objstatus` `xxxmystatusxxx` on`instance`.`status` = `xxxmystatusxxx`.`objstatusid` where instance.archived=1;

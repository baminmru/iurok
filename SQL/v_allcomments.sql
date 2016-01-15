drop view v_allcomments
;

create view v_allcomments as 
select  
iu_cm_time.thedate,
b2g(iu_cm_time.theauthor) theauthor,
iu_cm_time.starttime, 
iu_cm_time.endtime,
iu_cm_time.info,
-- iu_cm_def.theprocess
-- iu_cm_def.thevideo,
concat(iu_u_def.lastname,' ' ,iu_u_def.name) name
,concat(iu_tmdef.lastname,' ' ,iu_tmdef.name) teacher
,`b2g`(`iu_urok_def`.`subject`) AS `subject_id`
,`iud_predmet_brief_f`(`iu_urok_def`.`subject`,NULL) AS `subject`
,iu_urok_def.ucode,
b2g(iu_urok_def.instanceid) uid,
rtheme,
classtheme
from iu_cm_time
join iu_cm_def on iu_cm_def.instanceid=iu_cm_time.instanceid
join iu_urok_def on theprocess=iu_urok_defid
join iu_u_def on iu_cm_time.theauthor=iu_u_defid
left join iu_tmdef on iu_urok_def.theteacher =iu_tmdef.iu_tmdefid
;
select count(*) from v_allcomments
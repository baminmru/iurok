drop view v_tasksn;

create view v_tasksn as

select  iud_sn_def.name brief, b2g(iud_sn_def.iud_sn_defid) iud_sn_defid , b2g(iud_sn_def.iud_sn_defid) id ,b2g(iu_task.instanceid) taskid
from  iu_task 
join iu_statustask on iu_task.statetask=iu_statustask.iu_statustaskid
 join iud_sn_def on iu_statustask.possiblestatuses like concat('%',b2g(iud_sn_defid),'%');


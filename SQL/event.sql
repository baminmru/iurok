SET GLOBAL event_scheduler=ON;

drop event iu_event;


CREATE EVENT `iu_event`
  ON SCHEDULE EVERY 1 DAY STARTS CURRENT_TIMESTAMP
  ON COMPLETION NOT PRESERVE
  ENABLE
  COMMENT ''  DO
delete from instance where objtype='iu_t'   and instanceid in (
select instanceid from iu_task where (taskfinished=-1 or taskcancelled=-1 )  and createdate <=date_Add(now(),interval -365 day));

show events;
ALTER TABLE `iu_cm_time` 
CHANGE COLUMN `curatoronly` `curatoronly` INT(11) NULL DEFAULT 0 ;
update iu_cm_time set curatoronly=0 where curatoronly is null;
alter table iu_cm_def add curatoronly integer null default 0;
alter table iu_cm_msg add curatoronly integer null default 0;
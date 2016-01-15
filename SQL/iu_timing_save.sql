
delimiter $$
drop procedure iu_timing_save
$$
create procedure iu_timing_save(
cursession varchar(38),
ainstanceid varchar(38),
ainfo varchar(255)
)
body:begin

update iu_cm_def set thetheme=ainfo where instanceid=g2b(ainstanceid);
select 'ok' result;
end
$$

--  select * from  {6044516D-01E7-11E4-98AE-E8039A0069B7}
-- call iu_timing_save(	'{6044516D-01E7-11E4-98AE-E8039A0069B7}','{6044516D-01E7-11E4-98AE-E8039A0069B7}','111111111111111111')
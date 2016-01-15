DELIMITER $$

drop FUNCTION getactivetask
$$
CREATE  FUNCTION `getactivetask`(
    aurokid binary(16)
  
) RETURNS binary(16)
    READS SQL DATA
begin
  declare taskid binary(16);
  
  -- set taskid=null;
  select iu_taskid into taskid  from iu_task 
  where taskfinished=0 and taskcancelled=0 and (isdelegated<>-1 or isdelegated is null) and iu_task.theprocess=aurokid
  order by iu_task.createdate
  limit 0,1;
 
 
  return taskid;
  
end$$
DELIMITER ;


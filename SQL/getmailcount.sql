DELIMITER $$

drop function getmailcount_f
$$
CREATE  FUNCTION `getmailcount_f`(
 ausersid binary(16)
) RETURNS int(10)
READS SQL DATA
begin  
  declare existscnt int(10);  
  select count(*) into existscnt from  iu_l_def where doer=ausersid and readdate is null;
   return existscnt;
 


end$$



		
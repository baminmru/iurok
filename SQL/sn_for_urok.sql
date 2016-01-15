DELIMITER $$
drop function iud_sn_def_for_urok
$$
CREATE  FUNCTION `iud_sn_def_for_urok`(
 aurokid binary(16)
) RETURNS varchar(255) CHARSET utf8
    READS SQL DATA
begin  
 declare abrief varchar(255);
 declare atmpstr varchar(255);
 declare atmpbrief varchar(255);
 declare atmpid binary(16);
 declare atmpmr varchar(255); 
 declare amlftemp varchar(255);
 declare amlfbrief varchar(255);
 declare aec int;
if aurokid is null then  set abrief=''; return abrief; end if;
select count(*) into aec from iud_sn_def join iu_urok_prc on iud_sn_def.iud_sn_defid=iu_urok_prc.laststate where iu_urok_prc.theprocess=aurokid;
if aec<>0 then
  set abrief='';
  select concat(abrief 
  , '' , ifnull(iud_sn_def.name,'') ,' '  )
  into abrief   from iud_sn_def join iu_urok_prc on iud_sn_def.iud_sn_defid=iu_urok_prc.laststate where iu_urok_prc.theprocess=aurokid; 
else
  set abrief= '';
end if;
return abrief;
end$$
DELIMITER ;

delimiter $$
drop table CopyMapData
$$
create table CopyMapData(
actionid binary(16) not null,
inpid binary(16) not null,
outid binary(16) null
);
$$

drop function CopyMap
$$


create function CopyMap(aaction varchar(38), aId varchar(38))
RETURNS binary(16)
    READS SQL DATA
begin  
 declare IsOK int;
 declare aoutId binary(16);
 select null into IsOK;
 
  select 1,outid into IsOK,aoutId from    CopyMapData 
    where  CopyMapData.inpid=g2b(aId) and CopyMapData.actionid=g2b(aaction) ;
  if IsOK<>0 then
    return aoutId;
  end if;
 
  select g2b(UUID()) into aoutId;
  insert into CopyMapData(actionid,inpid,outid) values(g2b(aaction),g2b(aId),aoutId);
 
  return aoutId;
 
end
$$

-- select * from copymapdata


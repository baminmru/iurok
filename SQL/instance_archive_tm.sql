delimiter $$

drop procedure instance_archive
$$

CREATE  PROCEDURE `instance_archive`(
acursession varchar(38),
ainstanceid varchar(38)
)
body:begin
   declare aec  int;
   DECLARE tmid binary(16);
   DECLARE uid binary(16);
   DECLARE aobjtype varchar(255);
select count(*) into aec from the_session where the_sessionid=g2b(acursession) and closed=0 ;
if aec=0  then
    leave body;
end if;
   select count(*) into aec from instance where instanceid=g2b(ainstanceid);
    if aec>0 then
          select objtype into aobjtype from instance where instanceid=g2b(ainstanceid);
          update instance set archived=1 where instanceid=g2b(ainstanceid);

		   if aobjtype='iu_tm' then
			select iu_tmdefid into tmid  from iu_tmdef where instanceid=g2b(ainstanceid);
			select instanceid into uid from iu_u_def where iu_u_defid=tmid;
			update instance set archived=1 where instanceid=uid;
		   
		   end if;
    end if;
end
$$

drop PROCEDURE `instance_rearchive`
$$

CREATE  PROCEDURE `instance_rearchive`(
acursession varchar(38),
ainstanceid varchar(38)
)
body:begin
   declare aec  int;
   DECLARE tmid binary(16);
   DECLARE uid binary(16);
   DECLARE aobjtype varchar(255);
   select count(*) into aec from the_session where the_sessionid=g2b(acursession) and closed=0 ;
   if aec=0  then
		leave body;
   end if;
   select count(*) into aec from instance where instanceid=g2b(ainstanceid);
    if aec>0 then
           update instance set archived=0 where instanceid=g2b(ainstanceid);
		   select objtype into aobjtype from instance where instanceid=g2b(ainstanceid);
		   if aobjtype='iu_tm' then
				select iu_tmdefid into tmid  from iu_tmdef where instanceid=g2b(ainstanceid);
				select instanceid into uid from iu_u_def where iu_u_defid=tmid;
				update instance set archived=0 where instanceid=uid;
		   end if;
    end if;
end$$
DELIMITER ;

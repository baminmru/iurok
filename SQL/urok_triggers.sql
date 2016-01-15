delimiter $$


drop trigger iu_urok_def_inserted
$$
CREATE TRIGGER iu_urok_def_inserted AFTER INSERT ON iu_urok_def FOR EACH ROW
begin
   declare iu_us_instanceid binary(16);
   declare aiu_urok_prcfid binary(16);
   declare ecnt integer;
   declare aiu_statusid  binary(16);
   declare athestage  binary(16);

   select count(*) into ecnt from iu_urok_prc where TheProcess = new.iu_urok_defid;
   if ecnt =0 then
		set iu_us_instanceid=g2b(uuid());
		set aiu_urok_prcfid=g2b(uuid());
		-- select iu_statusid,thestage into aiu_statusid,athestage from iu_status where theprocess=new.processtype and isstartupstate=-1 limit 0,1;
        insert into instance(instanceid,name,objtype,changestamp) values(iu_us_instanceid,'','iu_us',now());
		insert into iu_urok_prc(instanceid,iu_urok_prcid,theprocess,topstage,iu_urok_stage,isdone,changestamp,manualcontrol) 
        values(iu_us_instanceid,aiu_urok_prcfid, new.iu_urok_defid,g2b('{00000000-0000-0000-0000-000000000000}'),g2b('{00000000-0000-0000-0000-000000000000}'),0,now(),0);
	end if;

    

end

$$


drop trigger iu_urok_def_updated
$$
CREATE TRIGGER iu_urok_def_updated AFTER update ON iu_urok_def FOR EACH ROW
begin
   declare iu_us_instanceid binary(16);
   declare aiu_urok_prcfid binary(16);
   declare ecnt integer;
   declare aiu_statusid  binary(16);
   declare athestage  binary(16);

   select count(*) into ecnt from iu_urok_prc where TheProcess = new.iu_urok_defid;
   if ecnt =0 then
		set iu_us_instanceid=g2b(uuid());
		set aiu_urok_prcfid=g2b(uuid());
		-- select iu_statusid,thestage into aiu_statusid,athestage from iu_status where theprocess=new.processtype and isstartupstate=-1 limit 0,1;
        insert into instance(instanceid,name,objtype,changestamp) values(iu_us_instanceid,'','iu_us',now());
		insert into iu_urok_prc(instanceid,iu_urok_prcid,theprocess,topstage,iu_urok_stage,isdone,changestamp,manualcontrol) 
		values(iu_us_instanceid,aiu_urok_prcfid, new.iu_urok_defid,g2b('{00000000-0000-0000-0000-000000000000}'),g2b('{00000000-0000-0000-0000-000000000000}'),0,now(),0);
	end if;

    

end

$$

-- update iu_urok_def set changestamp=now();
-- update iu_urok_prc set manualcontrol =0;
$$

-- select * from iu_urok_prc

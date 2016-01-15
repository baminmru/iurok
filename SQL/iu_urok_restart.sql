

DELIMITER $$

drop PROCEDURE `iu_urok_restart`
$$
CREATE  PROCEDURE `iu_urok_restart`(
 acursession varchar(38),
 ainstanceid varchar(38) ,
aprocess varchar(38)
)
body:begin
	   declare aiu_statusid  binary(16);
		declare aiu_urok_defid binary(16);

      update iu_urok_def set processtype=g2b(aprocess) where instanceid=g2b(ainstanceid);

     select iu_urok_defid into aiu_urok_defid  from iu_urok_def where instanceid=g2b(ainstanceid);

	 select iu_statusid into aiu_statusid from iu_status where theprocess=g2b(aprocess) and isstartupstate=-1 limit 0,1;

	update iu_urok_prc  set topstage=g2b('{00000000-0000-0000-0000-000000000000}'),
	iu_urok_stage=g2b('{00000000-0000-0000-0000-000000000000}'),
	laststate=null,
	lastmessage=null,
	manualcontrol=0,isdone=0 
	 where theprocess=aiu_urok_defid;


	begin
				declare fetch_done bool;
			    declare adtid binary(16);
	   	        declare  role_cursor cursor for 
				select distinct doertype from iu_statustask
				join iu_status on iu_statustask.instanceid=iu_status.instanceid 
				join iu_crole on doertype=iu_croleid
				where doertype is not null and iu_crole.name not in('куратор','учитель','методист', 'методист 2')  and iu_crole.allowsetuser=-1 and
				iu_status.theprocess=g2b(aprocess)  and doertype not in (select processrole from iu_urok_creators where instanceid=g2b(ainstanceid)) ;


				declare  role_cursor2 cursor for 
				select distinct contoller from iu_statustask
				join iu_status on iu_statustask.instanceid=iu_status.instanceid 
				join iu_crole on contoller=iu_croleid
				where contoller is not null and iu_crole.name not in('куратор','учитель','методист', 'методист 2')  and iu_crole.allowsetuser=-1 and
				iu_status.theprocess=g2b(aprocess)  and contoller not in (select processrole from iu_urok_creators where instanceid=g2b(ainstanceid))  ;
				
				declare continue handler for not found set fetch_done = true;

				delete from iu_urok_creators where instanceid=g2b(ainstanceid) and ( doer is null or doer=g2b('{00000000-0000-0000-0000-000000000000}'));
				open role_cursor;
				set  fetch_done=false;

				fetch role_cursor into adtid;
				while not fetch_done do 

					insert into iu_urok_creators(instanceid,iu_urok_creatorsid,changestamp,processrole,doer)
					values( g2b(ainstanceid) , g2b(uuid()), now(), adtid, null );
					set  fetch_done=false;

					fetch role_cursor into adtid;
				end while;
				close role_cursor;


				open role_cursor2;
				set  fetch_done=false;

				fetch role_cursor2 into adtid;
				while not fetch_done do 

					insert into iu_urok_creators(instanceid,iu_urok_creatorsid,changestamp,processrole,doer)
					values( g2b(ainstanceid) , g2b(uuid()), now(), adtid, null );
					set  fetch_done=false;

					fetch role_cursor2 into adtid;
				end while;
				close role_cursor2;

			end;


			call iu_urok_def_newstate(
						 acursession ,
						 ainstanceid,
						  b2g(aiu_statusid)
						);
					
			-- update iu_urok_prc set laststate=aiu_statusid where theprocess=aiu_urok_defid;

end
$$
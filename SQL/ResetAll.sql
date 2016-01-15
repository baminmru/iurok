-- select * from iu_urok_prc
/*update iu_urok_prc  set topstage=g2b('{00000000-0000-0000-0000-000000000000}'),
iu_urok_stage=g2b('{00000000-0000-0000-0000-000000000000}'),
laststate=null,
lastmessage=null,
manualcontrol=0,isdone=0;
delete from iu_urok_creators;
delete  from iu_urok_msg;
delete from iu_urok_sn;
delete from iu_urok_graph;
delete  from instance where objtype='iu_t';
delete from iu_plevent;

*/
delimiter $$
drop procedure ResetAll
$$
create procedure ResetAll()

body: 
begin
	   declare  aurok_instanceid binary(16);
       declare  aurok_processtype binary(16);
	   declare ecnt integer;
	   declare aiu_statusid  binary(16);
	   declare acursession binary(16);
       declare aiu_urok_defid binary(16);
		declare fetch_done bool;
	

	   declare  uroklist_cursor cursor for select  iu_urok_defid  from iu_urok_def  ;

      
	declare continue handler for not found set fetch_done = true;

		select the_sessionid into acursession from the_session where closed=0 limit 0,1;

		open uroklist_cursor;
		set  fetch_done=false;

		fetch uroklist_cursor into aiu_urok_defid;
		while not fetch_done do 
			select processtype,instanceid into aurok_processtype,aurok_instanceid from iu_urok_def where  iu_urok_defid=aiu_urok_defid;
			select iu_statusid into aiu_statusid from iu_status where theprocess=aurok_processtype and isstartupstate=-1 limit 0,1;


		/*		select count(*) into ecnt from iu_urok_prc where TheProcess =aiu_urok_defid and topstage<>g2b('{00000000-0000-0000-0000-000000000000}');
				if ecnt =0 then
						select processtype,instanceid into aurok_processtype,aurok_instanceid from iu_urok_def where  iu_urok_defid=aiu_urok_defid;
						-- select instanceid ,iu_urok_prcid into iu_us_instanceid,aiu_urok_prcfid from iu_urok_prc where theprocess=g2b(aiu_urok_defid) ;

						select iu_statusid into aiu_statusid from iu_status where theprocess=aurok_processtype and isstartupstate=-1 limit 0,1;
*/
		
			begin
				declare fetch_done bool;
			    declare adtid binary(16);
	   	        declare  role_cursor cursor for 
				select distinct doertype from iu_statustask
				join iu_status on iu_statustask.instanceid=iu_status.instanceid 
				join iu_crole on doertype=iu_croleid
				where doertype is not null and iu_crole.name not in('куратор','учитель','методист', 'методист 2')  and iu_crole.allowsetuser=-1 and
				iu_status.theprocess=aurok_processtype  and doertype not in (select processrole from iu_urok_creators where instanceid=aurok_instanceid) ;


				declare  role_cursor2 cursor for 
				select distinct contoller from iu_statustask
				join iu_status on iu_statustask.instanceid=iu_status.instanceid 
				join iu_crole on contoller=iu_croleid
				where contoller is not null and iu_crole.name not in('куратор','учитель','методист', 'методист 2')  and iu_crole.allowsetuser=-1 and
				iu_status.theprocess=aurok_processtype and contoller not in (select processrole from iu_urok_creators where instanceid=aurok_instanceid)  ;
				
				declare continue handler for not found set fetch_done = true;

				delete from iu_urok_creators where instanceid=aurok_instanceid and ( doer is null or doer=g2b('{00000000-0000-0000-0000-000000000000}'));
				open role_cursor;
				set  fetch_done=false;

				fetch role_cursor into adtid;
				while not fetch_done do 

					insert into iu_urok_creators(instanceid,iu_urok_creatorsid,changestamp,processrole,doer)
					values( aurok_instanceid , g2b(uuid()), now(), adtid, null );
					set  fetch_done=false;

					fetch role_cursor into adtid;
				end while;
				close role_cursor;


				open role_cursor2;
				set  fetch_done=false;

				fetch role_cursor2 into adtid;
				while not fetch_done do 

					insert into iu_urok_creators(instanceid,iu_urok_creatorsid,changestamp,processrole,doer)
					values( aurok_instanceid , g2b(uuid()), now(), adtid, null );
					set  fetch_done=false;

					fetch role_cursor2 into adtid;
				end while;
				close role_cursor2;

			end;


					call iu_urok_def_newstate(
								 b2g(acursession) ,
								 b2g(aurok_instanceid),
								  b2g(aiu_statusid)
								);
					
					select iud_sn_defid into aiu_statusid from iud_sn_def where name='Запланирован';
					update iu_urok_prc set laststate=aiu_statusid where theprocess=aiu_urok_defid;


				set  fetch_done=false;

				fetch uroklist_cursor into aiu_urok_defid;
			end while;
			close uroklist_cursor;
end
	

$$
delimiter ;
call ResetAll();


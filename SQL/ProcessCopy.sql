


DELIMITER $$
DROP  PROCEDURE `ProcessCopy`
$$
CREATE  PROCEDURE `ProcessCopy`(
 acursession varchar(38),
 aoldprocessid varchar(38), 
 anewprocessid varchar(38) 
)
body: begin  
declare aaction varchar(38);
declare ainstanceid binary(16);
declare aid binary(16);
declare anewinstanceid binary(16);
declare fetch_done bool;
declare aec int;
declare  slist_cursor cursor for select instanceid from iu_status where theprocess= g2b(aoldprocessid) order by sequence;
declare continue handler for not found set fetch_done = true;

 select count(*) into aec from the_session where the_sessionid=g2b(acursession) and closed=0 ;
if aec=0  then
    select 'сессия уже завершена.' result;
    leave body;
 end if;
select uuid() into aaction;
insert into copymapdata(actionid,inpid,outid) values(g2b(aaction),g2b(aoldprocessid),g2b(anewprocessid));

open slist_cursor;
set  fetch_done=false;

fetch slist_cursor into ainstanceid;

while not fetch_done do 
	set anewinstanceid =g2b(uuid());
    insert into copymapdata(actionid,inpid,outid) values(g2b(aaction),ainstanceid,anewinstanceid);
    insert into instance(instanceid,name,objtype,status,archived)  select anewinstanceid,name,objtype,status,archived from instance where instanceid=ainstanceid; 
	insert into iu_status 
	 ( iu_statusid 
	,instanceid
	,sequence
	,theprocess
	,thestage
	,name
	,isstartupstate
	,isfinishstate
	 ) select 
	copymap(aaction,b2g(iu_statusid)) 
	,copymap(aaction,b2g(instanceid))
	,sequence
	,copymap(aaction,b2g(theprocess))
	,thestage
	,name
	,isstartupstate
	,isfinishstate
	 from iu_status
	 where instanceid =ainstanceid; 

	call iu_status_doer_copy(acursession,aaction,b2g(ainstanceid));
	call iu_statustask_copy(acursession,aaction,b2g(ainstanceid));
	call iu_stausdoc_copy(acursession,aaction,b2g(ainstanceid));
	begin  

		declare copy_cursor_iu_statusnext cursor for
				select iu_statusnextid from iu_statusnext where instanceid =ainstanceid;
		 insert into iu_statusnext 
			 ( iu_statusnextid 			,instanceid			,nextstatus			,statusafter			 ) 
		select 
			copymap(aaction,b2g(iu_statusnextid)) 		,copymap(aaction,b2g(ainstanceid))
			,copymap(aaction,b2g(nextstatus))		,statusafter		
		from iu_statusnext
		 where instanceid = ainstanceid;

		open copy_cursor_iu_statusnext;
		set  fetch_done=false;
		fetch copy_cursor_iu_statusnext into aid;
		while not fetch_done do 
			call iu_statuschanger_copy(acursession,aaction,b2g(ainstanceid),aid);
		  set  fetch_done=false;
			fetch copy_cursor_iu_statusnext into aid;
		end while;

		close copy_cursor_iu_statusnext;
	end;
	set  fetch_done=false;
	fetch slist_cursor into ainstanceid;
end while;
close slist_cursor;
delete from copymapdata where actionid=g2b(aaction);
select 'ok' result;
 end$$



DROP  PROCEDURE `ProcessClear`
$$
CREATE  PROCEDURE `ProcessClear`(
 acursession varchar(38),
 aprocessid varchar(38)
)
body: begin  
declare aec int;


 select count(*) into aec from the_session where the_sessionid=g2b(acursession) and closed=0 ;
if aec=0  then
    select 'сессия уже завершена.' result;
    leave body;
 end if;
delete from instance where instanceid in(select instanceid from iu_status where theprocess= g2b(aprocessid));

end
$$


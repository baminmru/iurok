-- --------------------------------------------------------------------------------
-- Routine DDL
-- Note: comments before and after the routine body will not be stored by the server
-- --------------------------------------------------------------------------------
DELIMITER $$


drop procedure iu_rcfg_def_client_trigger
$$
CREATE PROCEDURE `iu_rcfg_def_client_trigger`(
 acursession varchar(38),
 aiu_rcfg_defid varchar(38)
)begin  
   declare arcfgid binary(16);
   declare acommentid binary(16);
   declare ecnt integer;

   select instanceid into arcfgid
   from  iu_rcfg_def  where iu_rcfg_defid=g2b(aiu_rcfg_defid) ;

 

   select count(*) into ecnt from iu_rcfg_mod where instanceid=arcfgid;
   if ecnt=0 then
		INSERT INTO iu_rcfg_mod
		(`instanceid`,
		`iu_rcfg_modid`,
		`changestamp`,
		`sequence`,
		`theicon`,
		`groupname`,
		`name`,
		`caption`,
		`controldocmode`,
		`otherdocmode`,
		`mydocmode`,
		`allobjects`,
		`colegsobject`,
		`substructobjects`,`moduleaccessible`,`visiblecontrol`)

        select  arcfgid,
		g2b(uuid()),
		now(),
		`sequence`,
		`theicon`,
		`groupname`,
		`name`,
		`caption`,
		`controldocmode`,
		`otherdocmode`,
		`mydocmode`,
		0,
		0,
		0,-1,`visiblecontrol` from iu_int_modules;
		
     --  update modes
		insert into iu_rcfg_docmode(instanceid,iu_rcfg_docmodeid,changestamp,the_document,addmode,editmode,allowadd,allowdelete)
		select arcfgid ,g2b(uuid()), now(), objecttypeid,'','',-1,0 from objecttype where objecttype.name like '%iu%'  and objecttype.issingleinstance=-1;
		insert into iu_rcfg_docmode(instanceid,iu_rcfg_docmodeid,changestamp,the_document,addmode,editmode,allowadd,allowdelete)
		select arcfgid ,g2b(uuid()), now(), objecttypeid,'','',-1,-1 from  objecttype where  objecttype.name like '%iu%'  and objecttype.issingleinstance=0;
		update  iu_rcfg_docmode set addmode ='new' where instanceid=arcfgid and iu_rcfg_docmode.the_document in (select objecttypeid from objecttype where name in ( 'iu_rcfg','iu_l'));
		update  iu_rcfg_docmode set addmode ='new_' , editmode ='usr_' where instanceid=arcfgid and iu_rcfg_docmode.the_document in (select objecttypeid from objecttype where name in ( 'iu_urok'));
	
  end if;
	

end
$$

drop procedure iu_urok_def_client_trigger
$$
CREATE PROCEDURE `iu_urok_def_client_trigger`(
 acursession varchar(38),
 aiu_urok_defid varchar(38)
)
begin  
   declare acode varchar(20);
   declare aprefix varchar(10);
   declare aplan varchar(10);
   declare alastprefix integer;
   declare aclass varchar(20);
   declare acheck varchar(20);


    -- set start up stage
	begin
	   -- declare iu_us_instanceid binary(16);
	   -- declare aiu_urok_prcfid binary(16);
	   declare  aurok_instanceid binary(16);
       declare  aurok_processtype binary(16);
	   declare ecnt integer;
	   declare aiu_statusid  binary(16);
	   -- declare athestage  binary(16);

	   select count(*) into ecnt from iu_urok_prc where TheProcess =g2b(aiu_urok_defid) and topstage<>g2b('{00000000-0000-0000-0000-000000000000}');
	   if ecnt =0 then
			-- set iu_us_instanceid=g2b(uuid());
			-- set aiu_urok_prcfid=g2b(uuid());

			select processtype,instanceid into aurok_processtype,aurok_instanceid from iu_urok_def where  iu_urok_defid=g2b(aiu_urok_defid);
			-- select instanceid ,iu_urok_prcid into iu_us_instanceid,aiu_urok_prcfid from iu_urok_prc where theprocess=g2b(aiu_urok_defid) ;

			select iu_statusid into aiu_statusid from iu_status where theprocess=aurok_processtype and isstartupstate=-1 limit 0,1;



			call SaveLog(
				 acursession 
				,'Урок'			-- тип события 
				,'создан'						    -- описание 
				,aiu_urok_defid		-- урок 
				,null	-- подэтап
				,null			-- задача 
				,null					-- документ
				,null				-- видео 
				,null		-- обсуждение 
			);

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


				delete from iu_urok_creators where instanceid=aurok_instanceid and (doer is null or doer=g2b('{00000000-0000-0000-0000-000000000000}'));
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
						 acursession ,
						 b2g(aurok_instanceid),
						  b2g(aiu_statusid)
						);
		end if;
	end;


   select ifnull(iu_urok_def.ucode,'')  ,ifnull(iud_predmet.prefix,'') ,ifnull(iu_clsinfo.name,0),ifnull(iu_urok_def.plannum,'') into acode,aprefix,aclass,aplan
    from  iu_urok_def
	left join iud_predmet on iu_urok_def.subject=iud_predmetid
	left join iu_clsinfo on iu_urok_def.theclassnum=iu_clsinfoid
   where iu_urok_defid=g2b(aiu_urok_defid);

	-- select acode,aclass,aplan,aprefix;




	if acode='' then 
		if  aprefix<>'' and aclass<>0 /* and aplan <>'' */  then
			start transaction;  
			select lastprefix into alastprefix from iu_maxprefix;
			update iu_maxprefix  set lastprefix=lastprefix+1;
			set alastprefix=alastprefix+1;
			set aclass = substring_index(aclass, '-', 1);
			-- set aclass = replace(aclass, '-', '');
			-- set aplan=lpad(aplan,6,'0');
			
	
			-- update iu_urok_def set ucode=concat(aprefix,aclass,aplan,lpad(alastprefix,5,'0') )   where iu_urok_defid =g2b(aiu_urok_defid) ;
			update iu_urok_def set ucode=concat(aprefix,aclass,lpad(alastprefix,5,'0') )   where iu_urok_defid =g2b(aiu_urok_defid) ;
			commit; 
		end if;
	else
		if aprefix<>'' and aclass<>0 /* and aplan<>'' */ then
				-- set aclass = REPLACE(aclass, '-', '');
				set aclass = substring_index(aclass, '-', 1);
				-- set aplan=lpad(aplan,6,'0');
				set acheck=concat(aprefix,aclass); -- ,aplan );
				

				if instr(acode,acheck)<>1 then
				   start transaction;  
					select lastprefix into alastprefix from iu_maxprefix ;
					update iu_maxprefix  set lastprefix=lastprefix+1;
					set alastprefix=alastprefix+1;
					-- update iu_urok_def set ucode=concat(aprefix,aclass,aplan,lpad(alastprefix,5,'0') )   where iu_urok_defid =g2b(aiu_urok_defid);
					update iu_urok_def set ucode=concat(aprefix,aclass,lpad(alastprefix,5,'0') )   where iu_urok_defid =g2b(aiu_urok_defid) ;
					commit; 
			  end if;
		end if;
	end if;

end


$$
drop procedure iu_urok_docs_client_trigger
$$
CREATE PROCEDURE `iu_urok_docs_client_trigger`(
 acursession varchar(38),
 aiu_urok_docsid varchar(38)
)
begin  
   declare aurok_instanceid binary(16);
   declare adoctype binary(16);
   declare aactive int;
   declare aversion int;
	declare amaxversion int;

   declare ecnt integer;

   select instanceid,doctype,version,activeversion into aurok_instanceid,adoctype,aversion,aactive
   from  iu_urok_docs  where iu_urok_docsid=g2b(aiu_urok_docsid) ;
	
	set amaxversion=0;

   select max(ifnull(version,0)) into amaxversion from 	iu_urok_docs where instanceid=aurok_instanceid and  doctype=adoctype and iu_urok_docsid <>g2b(aiu_urok_docsid);

  -- select amaxversion,aversion;
  if amaxversion is null then set amaxversion=0; end if;

   if aversion > amaxversion then
		update iu_urok_docs  set activeversion=0 where instanceid=aurok_instanceid and  doctype=adoctype and iu_urok_docsid <>g2b(aiu_urok_docsid);
		update iu_urok_docs  set activeversion=-1 where  iu_urok_docsid =g2b(aiu_urok_docsid);
   end if;

	if aversion = amaxversion then
		update iu_urok_docs  set activeversion=0 where instanceid=aurok_instanceid and  doctype=adoctype and iu_urok_docsid <>g2b(aiu_urok_docsid);
		update iu_urok_docs  set activeversion=-1, version=aversion+1 where  iu_urok_docsid =g2b(aiu_urok_docsid);
   end if;

  if aversion < amaxversion then
			update iu_urok_docs  set activeversion=0 where  iu_urok_docsid =g2b(aiu_urok_docsid);
   end if;
	

end
$$


$$
drop procedure iu_urok_video_client_trigger
$$
CREATE PROCEDURE `iu_urok_video_client_trigger`(
 acursession varchar(38),
 aiu_urok_videoid varchar(38)
)
begin  
   declare aurokid binary(16);
   declare acommentid binary(16);
   declare adoctype binary(16);
   declare ecnt integer;
   declare anocomments int;
   
 
   select instanceid, doctype into aurokid, adoctype
   from  iu_urok_video  where iu_urok_videoid=g2b(aiu_urok_videoid) ;
   select iu_urok_defid into aurokid
   from  iu_urok_def  where instanceid=aurokid ;

   select nocomments into anocomments from  iud_videotype where  iud_videotypeid=adoctype;
  update  iu_urok_video set nocomments =anocomments where iu_urok_videoid=g2b(aiu_urok_videoid) ;

   select count(*) into ecnt from iu_cm_def where thevideo=g2b(aiu_urok_videoid) and TheProcess=aurokid;
   if ecnt=0 then
			select g2b(uuid()) into acommentid;
			insert into instance(instanceid,name,objtype,changestamp) values(acommentid,'','iu_cm',now());
			insert into iu_cm_def(instanceid, iu_cm_defid, TheProcess, thevideo, changestamp) values(acommentid, g2b(uuid()), aurokid, g2b(aiu_urok_videoid),now());
  end if;
	

end
$$

--  task video ---
$$
drop procedure iu_taskvideo_client_trigger
$$
CREATE PROCEDURE `iu_taskvideo_client_trigger`(
 acursession varchar(38),
 aiu_taskvideoid varchar(38)
)
begin  
  
   declare adoctype binary(16);
   declare anocomments int;
   
 
   select  doctype into  adoctype
   from  iu_taskvideo  where iu_taskvideoid=g2b(aiu_taskvideoid) ;


   select nocomments into anocomments from  iud_videotype where  iud_videotypeid=adoctype;
  update  iu_taskvideo set nocomments =anocomments where iu_taskvideoid=g2b(aiu_taskvideoid) ;

  

end
$$



drop PROCEDURE `iu_cm_def_client_trigger`
$$
CREATE  PROCEDURE `iu_cm_def_client_trigger`(
 acursession varchar(38),
 aiu_cm_defid varchar(38)
)
begin  
   declare isd integer;
   declare vid binary(16);
   declare prid  binary(16);
   declare theme varchar(255);

	select theprocess,isdiscussion,thetheme into  prid,isd,theme from iu_cm_def where iu_cm_defid=g2b(aiu_cm_defid);
	if isd=-1 and theme <>'' then
		call SaveLog(
				 acursession 
				,'Тема'			-- тип события 
				,theme			 -- описание 
				,b2g(prid)		-- урок 
				,null	-- подэтап
				,null			-- задача 
				,null					-- документ
				,null				-- видео 
				,aiu_cm_defid	-- обсуждение 
			);
	end if;
end
$$

drop PROCEDURE iu_cm_time_client_trigger
 $$
CREATE PROCEDURE `iu_cm_time_client_trigger`(
 acursession varchar(38),
 aiu_cm_timeid varchar(38)
)
begin  
  declare isd integer;
   declare vid binary(16);
   declare prid  binary(16);
   declare did  binary(16);
   declare theme varchar(255);

	select theprocess,thevideo, starttime,iu_cm_defid into  prid,vid,theme,did from iu_cm_def
    join  iu_cm_time on iu_cm_time.instanceid= iu_cm_def.instanceid   where iu_cm_time.iu_cm_timeid=g2b(aiu_cm_timeid);

	
		call SaveLog(
				 acursession 
				,'Тайминг'			-- тип события 
				,theme			 -- описание 
				,b2g(prid)		-- урок 
				,null	           -- подэтап
				,null			  -- задача 
				,null					-- документ
				,b2g(vid)			-- видео 
				,b2g(did)	-- обсуждение 
			);
	
end$$


drop  PROCEDURE `iu_cm_msg_client_trigger`
$$
CREATE  PROCEDURE `iu_cm_msg_client_trigger`(
 acursession varchar(38),
 aiu_cm_msgid varchar(38)
)
begin  
  declare isd integer;
   declare vid binary(16);
   declare prid  binary(16);
   declare did  binary(16);
   declare theme varchar(255);

	select theprocess,thevideo, info,iu_cm_defid into  prid,vid,theme,did from iu_cm_def
    join  iu_cm_msg on iu_cm_msg.instanceid= iu_cm_def.instanceid   where iu_cm_msg.iu_cm_msgid=g2b(aiu_cm_msgid);

	
		call SaveLog(
				 acursession 
				,'Сообщение'			-- тип события 
				,theme			 -- описание 
				,b2g(prid)		-- урок 
				,null	           -- подэтап
				,null			  -- задача 
				,null					-- документ
				,b2g(vid)			-- видео 
				,b2g(did)	-- обсуждение 
			);
end$$
DELIMITER ;

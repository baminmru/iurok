DELIMITER $$

DROP FUNCTION IF EXISTS AddWorkDays
$$
CREATE FUNCTION AddWorkDays
(
    WorkingDays INT,
    StartDate DATETIME
)
RETURNS DATETIME
DETERMINISTIC
BEGIN
    DECLARE Count INT;
    DECLARE i INT;
    DECLARE NewDate DATETIME;
    SET Count = 0;
    SET i = 0;


    WHILE (i < WorkingDays) DO
        BEGIN
            SET Count = Count + 1;
            SET i = i + 1;
			
            WHILE DAYOFWEEK(DATE_ADD(StartDate, INTERVAL Count DAY)) IN (1,7) DO
                BEGIN
                    SET Count = Count + 1;
                END;
            END WHILE;
        END;
    END WHILE;

    SET NewDate = DATE_ADD(StartDate, INTERVAL Count DAY);
    RETURN NewDate;

END;
$$


drop PROCEDURE `iu_task_done`
$$
create PROCEDURE `iu_task_done`(
 acursession varchar(38),
 ainstanceid varchar(38) ,
 acomment varchar(255),
 aexitstate varchar(38)	
 )
body: begin 

 declare asyslogid binary(16);
 declare atmpid binary(16);
 declare aaccess int;
 declare asysinstid binary(16);
 declare asessuserid binary(16);
 declare amlf_partid binary(16);
 declare asessuserlogin varchar(40);
 declare acontrollerid binary(16);
 declare aec int;
 declare ataskcnt int;
 declare fetch_done bool;

 declare ataskid binary(16);
 declare aurokid binary(16);
 declare astatusid binary(16);
 declare astatetaskid binary(16);
 declare aurok_instanceid binary(16);
 declare aprc_instanceid binary(16);
 declare asn_onclose binary(16);
 declare asn_oncloseusr binary(16);
 declare anextstatus binary(16);
 declare sp_result varchar(255);
 declare aisfinish integer;
 declare aiu_u_defid binary(16);
 declare amaxversion integer;

 declare continue handler for not found set fetch_done = true;
 select usersid into asessuserid from the_session where the_sessionid=g2b(acursession);
 select login into asessuserlogin from users where usersid=g2b(asessuserid);
 select instanceid into asysinstid from instance where objtype='mtzsystem';
 select iu_u_defid into aiu_u_defid from  iu_u_def where login = asessuserlogin;

  begin   -- проверки входных данных
		select count(*) into aec from the_session where the_sessionid=g2b(acursession) and closed=0 ;
		if aec=0  then
		  select 'сессия уже завершена.' result;
			leave body;
		  end if;

		select  count(*) into aec from iu_task where instanceid=g2b(ainstanceid);
		if aec >0 then
		 --  verify access  --
			select checkoperation( acursession ,'iu_t.edit') into aaccess;
			 if aaccess=0  then
				select 'изменение строк не разрешено. раздел=iu_task' result;
				leave body;
			  end if;
		else
			select 'Не создан документ - задача' result;
			leave body;
		end if;

	  select  count(*) into aec from iu_task where taskfinished=-1 and  instanceid=g2b(ainstanceid);
		if aec >0 then
	
			select 'Задача уже завершена. Действие невозможно.' result;
			leave body;
		end if;

		select  count(*) into aec from iu_task where  taskcancelled=-1 and  instanceid=g2b(ainstanceid);
		if aec >0 then
	
			select 'Задача уже отменена. Действие невозможно.' result;
			leave body;
		end if;

		select  count(*) into aec from iu_task where isdelegated=-1 and  instanceid=g2b(ainstanceid);
		if aec >0 then
			select 'Задача делегирована. Действие невозможно.' result;
			leave body;
		end if;

	end ;

	

	--  если пользователь захотел  задать выходной статус и коммент, записываем их	
     update iu_task set doer_comment=acomment, doer_states=g2b(aexitstate) where instanceid=g2b(ainstanceid);
     
   

	-- получаем информацию  по   состоянию , процессу и плановой задаче
    select  theprocess,processstatus,statetask,contoller ,doer_states,iu_taskid,doer into aurokid,astatusid,astatetaskid,acontrollerid,asn_oncloseusr,ataskid ,aiu_u_defid
    from iu_task where instanceid=g2b(ainstanceid);

	select instanceid into aurok_instanceid from iu_urok_def where iu_urok_defid =aurokid;
    select instanceid into aprc_instanceid from iu_urok_prc where theprocess =aurokid;

	if acomment <>'' then
		update iu_urok_def set notes=concat('Исполнитель: ',acomment) where instanceid=aurok_instanceid;
	end if;

  -- проверяем не финальный ли статус ...     если так, то   фиксируем это в статусе урока
     select  count(*) into aec from iud_sn_def where isfinal=-1 and  iud_sn_defid =g2b(aexitstate);
    if aec >0 then
		update iu_urok_def set ckksn=g2b(aexitstate) where instanceid=aurok_instanceid;
    end if;
    
    if acontrollerid is null then
			begin  -- передать версии файлов из блока вложений в архив урока
				declare afileref varchar(255);
				declare afileext varchar(10);
				declare adoctype binary(16);
				declare adoc_name varchar(255);
				declare anewid binary(16);
				declare afiletext varchar(10240);
				declare aorigname varchar(255);

				declare check_doc_cursor cursor for
				select  dtype, theref,theref_ext ,info,filetext,origname from iu_taskattach 
				where iu_taskattach.instanceid=g2b(ainstanceid);

				
				open check_doc_cursor;
				set  fetch_done=false;
				fetch check_doc_cursor into adoctype, afileref,afileext,adoc_name,afiletext,aorigname;
				while not fetch_done do 
				    set anewid=g2b(uuid());
				    set amaxversion=0;
					select max(ifnull(version,1)) into amaxversion from 	iu_urok_docs where instanceid=aurok_instanceid and  doctype=adoctype;
					if amaxversion is null then set amaxversion=0; end if;
					update 	iu_urok_docs set ActiveVersion=0 where instanceid=aurok_instanceid and  doctype=adoctype;
					

					-- пока просто тупо  вставляем  файлы в архив
					insert into iu_urok_docs(instanceid,iu_urok_docsid, changestamp, AddDate,FileRef,fileRef_ext,Info,doctype,addby,activeversion,version,filetext,origname) values (
						aurok_instanceid,anewid,now(),now(),afileref,afileext,adoc_name,adoctype,aiu_u_defid,-1,amaxversion+1,afiletext,aorigname);


					call SaveLog(
							 acursession 
							,'Документ'			-- тип события 
							,adoc_name					    -- описание 
							,b2g(aurokid)		-- урок 
							,b2g(astatusid)		-- подэтап
							,b2g(ataskid)			-- задача 
							,b2g(anewid	)				-- документ
							,null				-- видео 
							,null		-- обсуждение 
						);
				
				    set  fetch_done=false;
					fetch check_doc_cursor into adoctype, afileref,afileext,adoc_name,afiletext,aorigname;
				end while;
				close check_doc_cursor;

			
			end;

			begin  -- передать версии видео в архив урока
				declare afileref varchar(255);
	            declare aorigname varchar(255);
				declare afileext varchar(10);
				declare adoctype binary(16);
				declare adoc_name varchar(255);
				declare afileurl varchar(255);
		        declare anewid binary(16);
				declare anc int;

				declare check_doc_cursor cursor for
				select  doctype, fileref,fileref_ext ,info,fileurl,nocomments,origname from iu_taskvideo
				where iu_taskvideo.instanceid=g2b(ainstanceid);

				
				open check_doc_cursor;
				set  fetch_done=false;
				fetch check_doc_cursor into adoctype, afileref,afileext,adoc_name,afileurl,anc,aorigname;
				while not fetch_done do 
				    
					set anewid=g2b(uuid());

					-- пока просто тупо  вставляем  файлы в видеоматериалы
					insert into iu_urok_video(instanceid,iu_urok_videoid, changestamp, AddDate,FileRef,fileRef_ext,Info,doctype,fileurl,addby,activeversion,version,nocomments,origname) values (
						aurok_instanceid,anewid,now(),now(),afileref,afileext,adoc_name,adoctype,afileurl,aiu_u_defid,-1,0,anc,aorigname);

					call iu_urok_video_client_trigger(acursession,b2g(anewid));

					call SaveLog(
							 acursession 
							,'Видео'			-- тип события 
							,adoc_name						    -- описание 
							,b2g(aurokid)		-- урок 
							,b2g(astatusid)		-- подэтап
							,b2g(ataskid)			-- задача 
							,null					-- документ
							,b2g(anewid)			-- видео 
							,null		-- обсуждение 
						);
				
				    set  fetch_done=false;
					fetch check_doc_cursor into adoctype, afileref,afileext,adoc_name,afileurl,anc,aorigname;
				end while;
				close check_doc_cursor;

			
			end;



		

			call SaveLog(
					 acursession 
					,'Задача'			-- тип события 
					,'задача завершена исполнителем'						    -- описание 
					,b2g(aurokid)		-- урок 
					,b2g(astatusid)		-- подэтап
					,b2g(ataskid)			-- задача 
					,null					-- документ
					,null				-- видео 
					,null		-- обсуждение 
				);

		     begin -- запустить следующие задачи

				declare minseq int;
				declare myseq int;
				
				-- вычисляем  номер  своей задачи и стандартный статус
				select tasksequence,StatusOnClose into myseq, asn_onclose  from iu_statustask  where iu_statustaskid=astatetaskid;
				if asn_oncloseusr is not  null and asn_oncloseusr <>g2b('{00000000-0000-0000-0000-000000000000}') then
					set asn_onclose = asn_oncloseusr;
				end if;	
					
				-- вычисляем минимальный номер в последовательности задач 
			   -- это надо делать только один раз, когда завершаются все задачи предыдущего приоритета ...
				select min( tasksequence)  into minseq  from iu_statustask
				join iu_status on iu_status.instanceid=iu_statustask.instanceid
				where iu_status.iu_statusid=astatusid and tasksequence>myseq;


				--  считаем количество незакрытых задач по этому приоритету и  этому процессу !!!
				select  count(*) into aec from iu_task 
				join iu_statustask on iu_task.statetask=iu_statustask.iu_statustaskid
				join iu_status on iu_status.instanceid=iu_statustask.instanceid
				where NotArchived(iu_task.instanceid) and iu_status.iu_statusid=astatusid and tasksequence=myseq  and iu_task.taskcancelled=0 
				and ( 
						(iu_task.taskfinished=0  and iu_statustask.contoller is null ) 
						or (
								(iu_task.taskfinished=0 or iu_task.ischecked=0) 
								and iu_statustask.contoller is not null
							) 
						)  and iu_task.theprocess=aurokid; 

			

				-- new version
				begin -- выдаем задания

					declare ataskid binary(16);
					declare ataskname varchar(255);
					declare adoerid binary(16);
					declare adoer2id binary(16);
					declare atask_instanceid binary(16);
					declare atask_user binary(16);
					declare atask_controller binary(16);
					declare atask_duration int;
					declare atask_info  varbinary(4000);
					declare atask_doc binary(16);
					declare arolename varchar(255);
					declare acurator varbinary(16);
					declare agroup varchar(400);
					declare atask_afterall int;


					declare start_task_cursor cursor for
					select  iu_statustaskid, iu_statustask.name,iu_statustask.doertype,iu_statustask.duration_plan,iu_statustask.info,iu_statustask.contoller,afterall from iu_statustask  
					join iu_status on iu_status.instanceid=iu_statustask.instanceid
					where iu_status.iu_statusid=astatusid and tasksequence=minseq;
					
					 -- select 'starting tasks';	

					-- исполнитель по умолчанию....
					select curator into acurator  from iu_urok_def where iu_urok_defid=aurokid ;					

					open start_task_cursor;
					set  fetch_done=false;
					fetch start_task_cursor into ataskid,ataskname,adoerid,atask_duration,atask_info,adoer2id,atask_afterall;
					while not fetch_done do 
						if (atask_afterall=-1 and aec=1)  or atask_afterall=0 then  
							set arolename='';
							
							--  исполнитель
							select name into arolename from iu_crole where iu_croleid=adoerid;

							select count(*)  into aec  from iu_urok_creators
							where instanceid=aurok_instanceid  and processrole=adoerid limit 0,1;
						
							if aec>0 then
								select doers into agroup  from iu_urok_creators
								where instanceid=aurok_instanceid  and processrole=adoerid limit 0,1;
							else
								set agroup=null;
							end if;

							if agroup is null then
									-- select 'regular role task',b2g(adoerid),arolename;
									call iu_urok_def_starttask( acursession , b2g(aurok_instanceid),  b2g(astatusid) ,adoerid,aurokid ,aprc_instanceid ,acurator,ataskname,atask_info,atask_duration,adoer2id,ataskid);
							else
								-- select 'group role task',b2g(adoerid),arolename,agroup;
								begin
								
									-- запустить здачу для каждой роли входящей в группу
									declare group_cursor cursor for
									select iu_croleid from iu_crole where agroup like concat('%',b2g(iu_croleid),'%');
									
									
									
									open group_cursor;
									set  fetch_done=false;
									fetch group_cursor into adoerid;
									while not fetch_done do
										call iu_urok_def_starttask( acursession , b2g(aurok_instanceid),  b2g(astatusid) ,adoerid,aurokid ,aprc_instanceid ,acurator,ataskname,atask_info,atask_duration,adoer2id,ataskid);
										set  fetch_done=false;
										fetch group_cursor into adoerid;
									end while;
									close group_cursor;
								end;
								
							end if;
						end if;
						set  fetch_done=false;
						fetch start_task_cursor into ataskid,ataskname,adoerid,atask_duration,atask_info,adoer2id,atask_afterall;
					end while;
					close start_task_cursor;
				end; 
				--   end group processing
			
			

			end;
			

			-- проставить у задачи признак завершения
			update  iu_task set taskfinished=-1, finishdate=now(), changestamp=now() where instanceid=g2b(ainstanceid);

			-- прописать в урок статус по завершению задачи, если он задан 
			if (asn_onclose is not null) then
				insert into iu_urok_sn(instanceid,iu_urok_snid, changestamp, statusDate,urokstatus) values (
								aprc_instanceid,g2b(uuid()),now(),now(),asn_onclose);
				update iu_urok_prc set laststate=asn_onclose where  instanceid=aprc_instanceid;
			end if;

			-- проверить нет ли для урока возможности перейти на новый статус по завершению  всех задач
			select count(*) into aec  from iu_statusnext
			join iu_status on iu_status.instanceid=iu_statusnext.instanceid
			where iu_status.iu_statusid=astatusid ;

			if aec >1 then
				select count(*) into aec  from iu_statusnext
				join iu_status on iu_status.instanceid=iu_statusnext.instanceid
				where iu_status.iu_statusid=astatusid  and iu_statusnext.StatusAfter =g2b(aexitstate) and (iu_statusnext.StatusAfter is not null)  and (aexitstate<>'');

				/*select count(*),aexitstate,b2g(astatusid)  from iu_statusnext
				join iu_status on iu_status.instanceid=iu_statusnext.instanceid
				where iu_status.iu_statusid=astatusid  and iu_statusnext.StatusAfter =g2b(aexitstate) and (iu_statusnext.StatusAfter is not null)  and (aexitstate<>'');*/

			end if;

			--  у нас ровно один переход ! 
			if aec=1 then

				 --  проверяем все ли задачи по этому подэтапу завершены
				select count(*) into aec from iu_task where (taskfinished=0  and  taskcancelled=0) and theprocess=aurokid and processstatus =astatusid;


				-- у нас завершены все задачи по этому подэтапу ?
				if aec=0 then  


					begin  -- проверка наличия  документов, которые надо было создать  на данном этапе
						declare adoctype binary(16);
						declare adoc_name varchar(255);
						declare resmsg varchar(255);
						declare check_doc_cursor cursor for
						select  doctype, ifnull(iu_stausdoc.name,iud_doctype.name)  from iu_stausdoc  
						join iud_doctype on iu_stausdoc.doctype=iud_doctype.iud_doctypeid
						join iu_status on iu_status.instanceid=iu_stausdoc.instanceid
						where iu_status.iu_statusid=astatusid and iu_stausdoc.allowdoc=-1  ;

						set resmsg='';
						open check_doc_cursor;
						set  fetch_done=false;
						fetch check_doc_cursor into adoctype, adoc_name;
						while not fetch_done do 
						
						  select  count(*) into aec from iu_urok_docs where iu_urok_docs.instanceid=aurok_instanceid and  iu_urok_docs.doctype=adoctype;
						  if aec =0 then
							 if resmsg<>'' then
									set resmsg=concat(resmsg,', ');
								end if;
								set resmsg=concat(resmsg, adoc_name);

						  end if;
						  set  fetch_done=false;
							fetch check_doc_cursor into adoctype, adoc_name;
						end while;
						close check_doc_cursor;

						 if resmsg<>'' then

							-- сразу вертаем  взад на доделку
							update  iu_task set taskfinished=0, finishdate=null, changestamp=now() where instanceid=g2b(ainstanceid);

							select concat('Не созданы необходимые документы:',resmsg) result;
							 leave body;
						 end if;
					end;

					set asn_onclose =null;
				
					-- будем менять  подэтап  нашего процесса


					select count(*) into aec  from iu_statusnext
					join iu_status on iu_status.instanceid=iu_statusnext.instanceid
					where iu_status.iu_statusid=astatusid ;
					if aec=1 then
							select nextstatus,StatusAfter into anextstatus,asn_onclose  from iu_statusnext
							join iu_status on iu_status.instanceid=iu_statusnext.instanceid
							where iu_status.iu_statusid=astatusid ;
					else
							select nextstatus,StatusAfter into anextstatus,asn_onclose  from iu_statusnext
							join iu_status on iu_status.instanceid=iu_statusnext.instanceid
							where iu_status.iu_statusid=astatusid and iu_statusnext.StatusAfter =g2b(aexitstate) and (iu_statusnext.StatusAfter is not null)  and (aexitstate<>'');
					end if;

					-- если у единственного статуса есть именованное сотояние, то задаем его
					if (asn_onclose is not null) then
						insert into iu_urok_sn(instanceid,iu_urok_snid, changestamp, statusDate,urokstatus) values (
										aprc_instanceid,g2b(uuid()),now(),now(),asn_onclose);
						update iu_urok_prc set laststate=asn_onclose where  instanceid=aprc_instanceid;
					end if;

					call iu_urok_def_newstate(
								 acursession ,
								 b2g(aurok_instanceid),
								  b2g(anextstatus)
								);
				 /*	if sp_result='ok' then
						update iu_urok_prc set manualcontrol=0 where instanceid=aprc_instanceid;
						select 'ok';
					else
						update iu_urok_prc set manualcontrol=-1 where instanceid=aprc_instanceid;
					end if;
					*/
				else
					select 'ok' result;  -- переход будет по зваершению последней задачи, не сейчас
				end if;
		   else
				if aec >1 then
					update iu_urok_prc set manualcontrol=-1,lastmessage='Требуется уточнить направление процесса' where instanceid=aprc_instanceid;
				else
					select isfinishstate into aec  from  iu_status 	where iu_status.iu_statusid=astatusid ;
					if aec<>-1 then
						update iu_urok_prc set manualcontrol=-1,lastmessage='Нет следующих подэтапов' where instanceid=aprc_instanceid;
					else
						update iu_urok_prc set isdone=-1 ,manualcontrol=0,lastmessage='Процесс завершен' where instanceid=aprc_instanceid;
					end if;
				end if;
				select 'ok' result;   -- переход будет делать куратор
			end if;

   else

   -- вычисляем   стандартный статус
		    select StatusOnClose into  asn_onclose  from iu_statustask  where iu_statustaskid=astatetaskid;
             if asn_oncloseusr is not  null and asn_oncloseusr <>g2b('{00000000-0000-0000-0000-000000000000}') then
				set asn_onclose = asn_oncloseusr;
			end if;	
		    update  iu_task set taskfinished=-1, finishdate=now(),changestamp=now() where instanceid=g2b(ainstanceid);

		-- прописать в урок статус по завершению задачи, если он задан 
			if (asn_onclose is not null) then
				insert into iu_urok_sn(instanceid,iu_urok_snid, changestamp, statusDate,urokstatus) values (
								aprc_instanceid,g2b(uuid()),now(),now(),asn_onclose);
				update iu_urok_prc set laststate=asn_onclose where  instanceid=aprc_instanceid;
			end if;
		select 'ok' result;  
	end if;   --  no controller defined
	
end
$$

drop PROCEDURE `iu_task_cancel`
$$
create PROCEDURE `iu_task_cancel`(
 acursession varchar(38),
 ainstanceid varchar(38) ,
 acomment varchar(255)
 )
body: begin 

 declare asyslogid binary(16);
 declare atmpid binary(16);
 declare aaccess int;
 declare asysinstid binary(16);
 declare asessuserid binary(16);
 declare amlf_partid binary(16);
 declare asessuserlogin varchar(40);
 declare aec int;
 declare fetch_done bool;

 declare ataskid binary(16);
 declare aurokid binary(16);
 declare astatusid binary(16);
 declare astatetaskid binary(16);
 declare aurok_instanceid binary(16);
 declare aprc_instanceid binary(16);
 declare asn_onclose binary(16);
 declare anextstatus binary(16);
 declare sp_result varchar(255);
 declare aiu_u_defid binary(16);
 declare amaxversion integer;

 declare continue handler for not found set fetch_done = true;
 select usersid into asessuserid from the_session where the_sessionid=g2b(acursession);
 select login into asessuserlogin from users where usersid=g2b(asessuserid);
 select instanceid into asysinstid from instance where objtype='mtzsystem';
 select iu_u_defid into aiu_u_defid from  iu_u_def where login =asessuserlogin;

  begin   -- проверки входных данных
		select count(*) into aec from the_session where the_sessionid=g2b(acursession) and closed=0 ;
		if aec=0  then
		  select 'сессия уже завершена.' result;
			leave body;
		  end if;

		select  count(*) into aec from iu_task where instanceid=g2b(ainstanceid);
		if aec >0 then
		 --  verify access  --
			select checkoperation( acursession ,'iu_t.edit') into aaccess;
			 if aaccess=0  then
				select 'изменение строк не разрешено. раздел=iu_task' result;
				leave body;
			  end if;
		else
			select 'Не создан документ - задача' result;
			leave body;
		end if;

	  select  count(*) into aec from iu_task where taskfinished=-1 and  instanceid=g2b(ainstanceid);
		if aec >0 then
			select 'Задача уже завершена. Действие невозможно.' result;
			leave body;
		end if;

		select  count(*) into aec from iu_task where isdelegated=-1 and  instanceid=g2b(ainstanceid);
		if aec >0 then
			select 'Задача делегирована. Действие невозможно.' result;
			leave body;
		end if;

	end ;

	--  если пользователь захотел  коммент, записываем их	
     update iu_task set doer_comment=acomment, doer_states=null where instanceid=g2b(ainstanceid);

	-- получаем информацию  по   состоянию , процессу и плановой задаче
    select  theprocess,processstatus,statetask,iu_taskid,doer into aurokid,astatusid,astatetaskid,ataskid,aiu_u_defid from iu_task where instanceid=g2b(ainstanceid);



	select instanceid into aurok_instanceid from iu_urok_def where iu_urok_defid =aurokid;
    select instanceid into aprc_instanceid from iu_urok_prc where theprocess =aurokid;

    call SaveLog(
		 acursession 
		,'Задача'			-- тип события 
		,'исполнитель  отказался от исполнения задачи'						    -- описание 
		,b2g(aurokid)		-- урок 
		,b2g(astatusid)		-- подэтап
		,b2g(ataskid)			-- задача 
		,null					-- документ
		,null				-- видео 
		,null		-- обсуждение 
	);
   
			begin  -- передать версии файлов из блока вложений в архив урока
				declare afileref varchar(255);
				declare afileext varchar(10);
				declare adoctype binary(16);
				declare adoc_name varchar(255);
				declare anewid binary(16);
				declare afiletext varchar(10240);
				declare aorigname varchar(255);

				declare check_doc_cursor cursor for
				select  dtype, theref,theref_ext ,info,filetext,origname from iu_taskattach 
				where iu_taskattach.instanceid=g2b(ainstanceid);

				
				open check_doc_cursor;
				set  fetch_done=false;
				fetch check_doc_cursor into adoctype, afileref,afileext,adoc_name,afiletext,aorigname;
				while not fetch_done do 
				    set anewid=g2b(uuid());
					set amaxversion=0;
					select max(ifnull(version,1)) into amaxversion from 	iu_urok_docs where instanceid=aurok_instanceid and  doctype=adoctype;

					  if amaxversion is null then set amaxversion=0; end if;

					update 	iu_urok_docs set ActiveVersion=0 where instanceid=aurok_instanceid and  doctype=adoctype;

					insert into iu_urok_docs(instanceid,iu_urok_docsid, changestamp, AddDate,FileRef,fileRef_ext,Info,doctype,addby,activeversion,version,filetext,origname) values (
						aurok_instanceid,anewid,now(),now(),afileref,afileext,adoc_name,adoctype,aiu_u_defid,-1,amaxversion+1,afiletext, aorigname);


					  call SaveLog(
							 acursession 
							,'Документ'			-- тип события 
							,adoc_name				    -- описание 
							,b2g(aurokid)		-- урок 
							,b2g(astatusid)		-- подэтап
							,b2g(ataskid)			-- задача 
							,b2g(anewid)					-- документ
							,null				-- видео 
							,null		-- обсуждение 
						);


				    set  fetch_done=false;
					fetch check_doc_cursor into adoctype, afileref,afileext,adoc_name,afiletext,aorigname;
				end while;
				close check_doc_cursor;

			end;

			begin  -- передать версии видео в архив урока
				declare afileref varchar(255);
				declare afileext varchar(10);
				declare adoctype binary(16);
				declare adoc_name varchar(255);
				declare afileurl varchar(255);
			    declare anewid binary(16);
				declare anc int;
				declare aorigname varchar(255);

				declare check_doc_cursor cursor for
				select  doctype, fileref,fileref_ext ,info,fileurl,nocomments,origname from iu_taskvideo
				where iu_taskvideo.instanceid=g2b(ainstanceid);

				
				open check_doc_cursor;
				set  fetch_done=false;
				fetch check_doc_cursor into adoctype, afileref,afileext,adoc_name,afileurl,anc,aorigname;
				while not fetch_done do 
				      set anewid=g2b(uuid());
					-- пока просто тупо  вставляем  файлы в видеоматериалы
					insert into iu_urok_video(instanceid,iu_urok_videoid, changestamp, AddDate,FileRef,fileRef_ext,Info,doctype,fileurl,addby,activeversion,version,nocomments,origname) values (
						aurok_instanceid,anewid,now(),now(),afileref,afileext,adoc_name,adoctype,afileurl,aiu_u_defid,-1,0,anc,aorigname);

					call iu_urok_video_client_trigger(acursession,b2g(anewid));

					 call SaveLog(
							 acursession 
							,'Видео'			-- тип события 
							,adoc_name					    -- описание 
							,b2g(aurokid)		-- урок 
							,b2g(astatusid)		-- подэтап
							,b2g(ataskid)			-- задача 
							,null					-- документ
							,b2g(anewid)			-- видео 
							,null		-- обсуждение 
						);
				
				    set  fetch_done=false;
					fetch check_doc_cursor into adoctype, afileref,afileext,adoc_name,afileurl,anc,aorigname;
				end while;
				close check_doc_cursor;

			
			end;


	-- проставить у задачи признак завершения
    update  iu_task set taskCancelled=-1, finishdate=now(),changestamp=now() where instanceid=g2b(ainstanceid);
	update iu_urok_prc set manualcontrol=-1,lastmessage='Задача завершена с отрицательным результатом' where instanceid=aprc_instanceid;
	insert into iu_urok_msg(instanceid,iu_urok_msgid,info,thedate,changestamp) 
	values(aprc_instanceid,g2b(uuid()), 'Задача завершена с отрицательным результатом' ,now(),now());
	
	select 'ok' result;  -- переход будет по зваершению последней задачи, не сейчас


	
end
$$



drop PROCEDURE `iu_task_check`
$$
create PROCEDURE `iu_task_check`(
 acursession varchar(38),
 ainstanceid varchar(38) ,
 acomment varchar(255)
 )
body: begin 

 declare asyslogid binary(16);
 declare atmpid binary(16);
 declare aaccess int;
 declare asysinstid binary(16);
 declare asessuserid binary(16);
 declare amlf_partid binary(16);
 declare asessuserlogin varchar(40);
 declare acontrollerid binary(16);
declare adelegatefrom binary(16);
declare acomment2 varchar(4000);

 declare aec int;
 declare fetch_done bool;

 declare ataskid binary(16);
 declare aurokid binary(16);
 declare astatusid binary(16);
 declare astatetaskid binary(16);
 declare aurok_instanceid binary(16);
 declare aprc_instanceid binary(16);
 declare asn_onclose binary(16);
 declare asn_oncloseusr binary(16);
 declare anextstatus binary(16);
 declare sp_result varchar(255);
 declare aiu_u_defid binary(16);
 declare amaxversion integer;
 declare aexitstate varchar(38);

 declare continue handler for not found set fetch_done = true;
 select usersid into asessuserid from the_session where the_sessionid=g2b(acursession);
 select login into asessuserlogin from users where usersid=g2b(asessuserid);
 select instanceid into asysinstid from instance where objtype='mtzsystem';
 select iu_u_defid into aiu_u_defid from  iu_u_def where login =asessuserlogin;

  begin   -- проверки входных данных
		select count(*) into aec from the_session where the_sessionid=g2b(acursession) and closed=0 ;
		if aec=0  then
		  select 'сессия уже завершена.' result;
			leave body;
		  end if;

		select  count(*) into aec from iu_task where instanceid=g2b(ainstanceid);
		if aec >0 then
		 --  verify access  --
			select checkoperation( acursession ,'iu_t.edit') into aaccess;
			 if aaccess=0  then
				select 'изменение строк не разрешено. раздел=iu_task' result;
				leave body;
			  end if;
		else
			select 'Не создан документ - задача' result;
			leave body;
		end if;

	  select  count(*) into aec from iu_task where isChecked=-1 and  instanceid=g2b(ainstanceid);
		if aec >0 then
	
			select 'Задача уже проверена. Действие невозможно.' result;
			leave body;
		end if;
	

        select  count(*) into aec from iu_task where taskcancelled=-1 and  instanceid=g2b(ainstanceid);
		if aec >0 then
			select 'Задача отменена. Действие невозможно.' result;
			leave body;
		end if;
	end ;

	 
     update iu_task set controller_comment=acomment where instanceid=g2b(ainstanceid);
     select b2g(doer_states) into  aexitstate from iu_task where instanceid=g2b(ainstanceid);


	-- получаем информацию  по   состоянию , процессу и плановой задаче
    select  theprocess,processstatus,statetask,doer_states,iu_taskid,doer,delegatefrom into aurokid,astatusid,astatetaskid,asn_oncloseusr,ataskid,aiu_u_defid,adelegatefrom from iu_task where instanceid=g2b(ainstanceid);
	select instanceid into aurok_instanceid from iu_urok_def where iu_urok_defid =aurokid;
    select instanceid into aprc_instanceid from iu_urok_prc where theprocess =aurokid;

   if acomment <>'' then
		update iu_urok_def set notes=concat(notes,'
       Контролер: ',acomment ) where instanceid=aurok_instanceid;
	end if;

	-- select notes into acomment2 from iu_urok_def where instanceid=aurok_instanceid;

    call SaveLog(
		 acursession 
		,'Задача'			-- тип события 
		,'задача проверена контролером'						    -- описание 
		,b2g(aurokid)		-- урок 
		,b2g(astatusid)		-- подэтап
		,b2g(ataskid)			-- задача 
		,null					-- документ
		,null				-- видео 
		,null		-- обсуждение 
	);
   
    
	if not adelegatefrom is null then
		update iu_task set  taskfinished=-1, finishdate=now() where iu_taskid=adelegatefrom;
	end if;


     begin  -- передать версии файлов из блока вложений в архив урока
			declare afileref varchar(255);
			declare afileext varchar(10);
			declare adoctype binary(16);
			declare adoc_name varchar(255);
		    declare anewid binary(16);
            declare afiletext varchar(10240);
			declare aorigname varchar(255);

			declare check_doc_cursor cursor for
			select  dtype, theref,theref_ext ,info,filetext,origname from iu_taskattach 
			where iu_taskattach.instanceid=g2b(ainstanceid);

			
			open check_doc_cursor;
			set  fetch_done=false;
			fetch check_doc_cursor into adoctype, afileref,afileext,adoc_name,afiletext,aorigname;
			while not fetch_done do 
				
				set anewid=g2b(uuid());
				set amaxversion=0;
				select max(ifnull(version,1)) into amaxversion from 	iu_urok_docs where instanceid=aurok_instanceid and  doctype=adoctype;
				if amaxversion is null then set amaxversion=0; end if;
				update 	iu_urok_docs set ActiveVersion=0 where instanceid=aurok_instanceid and  doctype=adoctype;
				insert into iu_urok_docs(instanceid,iu_urok_docsid, changestamp, AddDate,FileRef,fileRef_ext,Info,doctype,addby,activeversion,version,filetext,origname) values (
					aurok_instanceid,anewid,now(),now(),afileref,afileext,adoc_name,adoctype,aiu_u_defid,-1,amaxversion+1,afiletext,aorigname);


				call SaveLog(
							 acursession 
							,'Документ'			-- тип события 
							,adoc_name						    -- описание 
							,b2g(aurokid)		-- урок 
							,b2g(astatusid)		-- подэтап
							,b2g(ataskid)			-- задача 
							,b2g(anewid)				-- документ
							,null		-- видео 
							,null		-- обсуждение 
						);
				
			
				set  fetch_done=false;
				fetch check_doc_cursor into adoctype, afileref, afileext, adoc_name, afiletext, aorigname;
			end while;
			close check_doc_cursor;

			
		end;

	  begin  -- передать версии видео в архив урока
			declare afileref varchar(255);
			declare afileext varchar(10);
		
			declare adoctype binary(16);
			declare adoc_name varchar(255);
			declare afileurl varchar(255);
			declare anewid binary(16);
			declare anc int;
	        declare aorigname varchar(255);
	

			declare check_doc_cursor cursor for
			select  doctype, fileref,fileref_ext ,info,fileurl,nocomments,origname from iu_taskvideo
			where iu_taskvideo.instanceid=g2b(ainstanceid);

			
			open check_doc_cursor;
			set  fetch_done=false;
			fetch check_doc_cursor into adoctype, afileref,afileext,adoc_name,afileurl,anc,aorigname;
			while not fetch_done do 
				
					set anewid=g2b(uuid());
					-- пока просто тупо  вставляем  файлы в видеоматериалы
					insert into iu_urok_video(instanceid,iu_urok_videoid, changestamp, AddDate,FileRef,fileRef_ext,Info,doctype,fileurl,addby,activeversion,version,nocomments,origname) values (
						aurok_instanceid,anewid,now(),now(),afileref,afileext,adoc_name,adoctype,afileurl,aiu_u_defid,-1,0,anc,aorigname);

					call iu_urok_video_client_trigger(acursession,b2g(anewid));

					 call SaveLog(
							 acursession 
							,'Видео'			-- тип события 
							,adoc_name					    -- описание 
							,b2g(aurokid)		-- урок 
							,b2g(astatusid)		-- подэтап
							,b2g(ataskid)			-- задача 
							,null					-- документ
							,b2g(anewid)			-- видео 
							,null		-- обсуждение 
						);


				set  fetch_done=false;
				fetch check_doc_cursor into adoctype, afileref,afileext,adoc_name,afileurl,anc;
			end while;
			close check_doc_cursor;

			
		end;    


	    begin -- запустить следующие задачи

			declare minseq int;
			declare myseq int;
			declare ataskcnt int;
			
            -- вычисляем  номер  своей задачи и стандартный статус
		    select tasksequence,StatusOnClose into myseq, asn_onclose  from iu_statustask  where iu_statustaskid=astatetaskid;
         	if asn_oncloseusr is not null then
					set asn_onclose =asn_oncloseusr;
			end if;
				
            -- вычисляем минимальный номер в последовательности задач 
           -- +++ !!! подумать !!!  это надо делать только один раз, когда завершаются все задачи предыдущего приоритета ...
		    select min( tasksequence)  into minseq  from iu_statustask
			join iu_status on iu_status.instanceid=iu_statustask.instanceid
			where iu_status.iu_statusid=astatusid and tasksequence>myseq;

			--  считаем количество не закрытых задач по этому приоритету и  этому процессу !!!
			select  count(*) into aec from iu_task 
            join iu_statustask on iu_task.statetask=iu_statustask.iu_statustaskid
			join iu_status on iu_status.instanceid=iu_statustask.instanceid
			where NotArchived(iu_task.instanceid) and iu_status.iu_statusid=astatusid and tasksequence=myseq and iu_task.taskcancelled=0 
			and ( 
					(iu_task.taskfinished=0  and iu_statustask.contoller is null ) 
					or (
							(iu_task.taskfinished=0 or iu_task.ischecked=0) 
							and iu_statustask.contoller is not null
						) 
					) and iu_task.theprocess=aurokid; 

		
				-- new version
				begin -- выдаем задания

					declare ataskid binary(16);
					declare ataskname varchar(255);
					declare adoerid binary(16);
					declare adoer2id binary(16);
					declare atask_instanceid binary(16);
					declare atask_user binary(16);
					declare atask_controller binary(16);
					declare atask_duration int;
					declare atask_info  varbinary(4000);
					declare atask_doc binary(16);
					declare arolename varchar(255);
					declare acurator varbinary(16);
					declare agroup varchar(400);
					declare atask_afterall int;


					declare start_task_cursor cursor for
					select  iu_statustaskid, iu_statustask.name,iu_statustask.doertype,iu_statustask.duration_plan,iu_statustask.info,iu_statustask.contoller,afterall from iu_statustask  
					join iu_status on iu_status.instanceid=iu_statustask.instanceid
					where iu_status.iu_statusid=astatusid and tasksequence=minseq;
					
					 -- select 'starting tasks';	

					-- исполнитель по умолчанию....
					select curator into acurator  from iu_urok_def where iu_urok_defid=aurokid ;					

					open start_task_cursor;
					set  fetch_done=false;
					fetch start_task_cursor into ataskid,ataskname,adoerid,atask_duration,atask_info,adoer2id, atask_afterall;
					while not fetch_done do 
					
						if (atask_afterall=-1 and aec=1)  or atask_afterall=0 then
							set arolename='';
							
							--  исполнитель
							select name into arolename from iu_crole where iu_croleid=adoerid;

							select count(*)  into aec  from iu_urok_creators
							where instanceid=aurok_instanceid  and processrole=adoerid limit 0,1;
						
							if aec>0 then
								select doers into agroup  from iu_urok_creators
								where instanceid=aurok_instanceid  and processrole=adoerid limit 0,1;
							else
								set agroup=null;
							end if;

							if agroup is null then
									-- select 'regular role task',b2g(adoerid),arolename;
									call iu_urok_def_starttask( acursession , b2g(aurok_instanceid),  b2g(astatusid) ,adoerid,aurokid ,aprc_instanceid ,acurator,ataskname,atask_info,atask_duration,adoer2id,ataskid);
							else
								-- select 'group role task',b2g(adoerid),arolename,agroup;
								begin
								
									-- запустить здачу для каждой роли входящей в группу
									declare group_cursor cursor for
									select iu_croleid from iu_crole where agroup like concat('%',b2g(iu_croleid),'%');
									
									
									
									open group_cursor;
									set  fetch_done=false;
									fetch group_cursor into adoerid;
									while not fetch_done do
										call iu_urok_def_starttask( acursession , b2g(aurok_instanceid),  b2g(astatusid) ,adoerid,aurokid ,aprc_instanceid ,acurator,ataskname,atask_info,atask_duration,adoer2id,ataskid);
										set  fetch_done=false;
										fetch group_cursor into adoerid;
									end while;
									close group_cursor;
								end;
								
							end if;
						end if;

						set  fetch_done=false;
						fetch start_task_cursor into ataskid,ataskname,adoerid,atask_duration,atask_info,adoer2id, atask_afterall;
					end while;
					close start_task_cursor;
				end; 
				--   end group processing

			end;
			

			-- проставить у задачи признак завершения
			update  iu_task set ischecked=-1,changestamp=now() where instanceid=g2b(ainstanceid);

		
			-- проверить нет ли для урока возможности перейти на новый статус по завершению  всех задач
			select count(*) into aec  from iu_statusnext
			join iu_status on iu_status.instanceid=iu_statusnext.instanceid
			where iu_status.iu_statusid=astatusid ;

			if aec >1 then
				select count(*) into aec  from iu_statusnext
				join iu_status on iu_status.instanceid=iu_statusnext.instanceid
				where iu_status.iu_statusid=astatusid  and iu_statusnext.StatusAfter =g2b(aexitstate) and (iu_statusnext.StatusAfter is not null)  and (aexitstate<>'');
			end if;


			--  у нас ровно один переход ! 
			if aec=1 then
				 --  проверяем все ли задачи по этому подэтапу завершены
				select count(*) into aec from iu_task where ( taskfinished=0  and taskcancelled=0) and theprocess=aurokid and processstatus =astatusid;


				-- у нас завершены все задачи по этому подэтапу ?
				if aec=0 then  

					begin  -- проверка наличия  документов, которые надо было создать  на данном этапе
						declare adoctype binary(16);
						declare adoc_name varchar(255);
						declare resmsg varchar(255);
						declare check_doc_cursor cursor for
						select  doctype, ifnull(iu_stausdoc.name,iud_doctype.name)  from iu_stausdoc  
						join iud_doctype on iu_stausdoc.doctype=iud_doctype.iud_doctypeid
						join iu_status on iu_status.instanceid=iu_stausdoc.instanceid
						where iu_status.iu_statusid=astatusid and iu_stausdoc.allowdoc=-1  ;

						set resmsg='';
						open check_doc_cursor;
						set  fetch_done=false;
						fetch check_doc_cursor into adoctype, adoc_name;
						while not fetch_done do 
						
						  select  count(*) into aec from iu_urok_docs where iu_urok_docs.instanceid=aurok_instanceid and  iu_urok_docs.doctype=adoctype;
						  if aec =0 then
							 if resmsg<>'' then
									set resmsg=concat(resmsg,', ');
								end if;
								set resmsg=concat(resmsg, adoc_name);

						  end if;
						  set  fetch_done=false;
							fetch check_doc_cursor into adoctype, adoc_name;
						end while;
						close check_doc_cursor;

						 if resmsg<>'' then
							-- сразу вертаем  взад на доделку
							update  iu_task set taskfinished=0, ischecked=0, finishdate=null, changestamp=now() where instanceid=g2b(ainstanceid);

							select concat('Не созданы необходимые документы:',resmsg) result;
							 leave body;
						 end if;
					end;




					set asn_onclose =null;

					-- будем менять  подэтап  нашего процесса

				select count(*) into aec  from iu_statusnext
				join iu_status on iu_status.instanceid=iu_statusnext.instanceid
				where iu_status.iu_statusid=astatusid ;

				if aec =1 then
					select nextstatus,StatusAfter into anextstatus,asn_onclose  from iu_statusnext
					join iu_status on iu_status.instanceid=iu_statusnext.instanceid
					where iu_status.iu_statusid=astatusid ;
				else
					select nextstatus,StatusAfter into anextstatus,asn_onclose  from iu_statusnext
						join iu_status on iu_status.instanceid=iu_statusnext.instanceid
						where iu_status.iu_statusid=astatusid  and iu_statusnext.StatusAfter =g2b(aexitstate) and (iu_statusnext.StatusAfter is not null)  and (aexitstate<>'');
				end if;



					-- если у единственного статуса есть именованное сотояние, то задаем его
					if (asn_onclose is not null) then
						insert into iu_urok_sn(instanceid,iu_urok_snid, changestamp, statusDate,urokstatus) values (
										aprc_instanceid,g2b(uuid()),now(),now(),asn_onclose);
						update iu_urok_prc set laststate=asn_onclose where  instanceid=aprc_instanceid;
					end if;

					call iu_urok_def_newstate(
								 acursession ,
								 b2g(aurok_instanceid),
								  b2g(anextstatus)
								);
				 /*	if sp_result='ok' then
						update iu_urok_prc set manualcontrol=0 where instanceid=aprc_instanceid;
						select 'ok';
					else
						update iu_urok_prc set manualcontrol=-1 where instanceid=aprc_instanceid;
					end if;
					*/
				else
					select 'ok' result;  -- переход будет по зваершению последней задачи, не сейчас
				end if;
		   else
				update iu_urok_prc set manualcontrol=-1,lastmessage='Требуется уточнить направление процесса' where instanceid=aprc_instanceid;
				select 'ok' result;   -- переход будет делать куратор
			end if;

   
	
end
$$



drop PROCEDURE `iu_task_checkbad`
$$
create PROCEDURE `iu_task_checkbad`(
 acursession varchar(38),
 ainstanceid varchar(38) ,
 acomment varchar(255)
 )
body: begin 

 declare asyslogid binary(16);
 declare atmpid binary(16);
 declare aaccess int;
 declare asysinstid binary(16);
 declare asessuserid binary(16);
 declare amlf_partid binary(16);
 declare asessuserlogin varchar(40);
 declare acontrollerid binary(16);
 declare aec int;
 declare fetch_done bool;

 declare ataskid binary(16);
 declare aurokid binary(16);
 declare astatusid binary(16);
 declare astatetaskid binary(16);
 declare aurok_instanceid binary(16);
 declare aprc_instanceid binary(16);
 declare asn_onclose binary(16);
 declare asn_oncloseusr binary(16);
 declare anextstatus binary(16);
 declare sp_result varchar(255);
 declare aiu_u_defid binary(16);
 declare amaxversion integer;




 declare continue handler for not found set fetch_done = true;
 select usersid into asessuserid from the_session where the_sessionid=g2b(acursession);
 select login into asessuserlogin from users where usersid=g2b(asessuserid);
 select instanceid into asysinstid from instance where objtype='mtzsystem';
 select iu_u_defid into aiu_u_defid from  iu_u_def where login =asessuserlogin;

  begin   -- проверки входных данных
		select count(*) into aec from the_session where the_sessionid=g2b(acursession) and closed=0 ;
		if aec=0  then
		  select 'сессия уже завершена.' result;
			leave body;
		  end if;

		select  count(*) into aec from iu_task where instanceid=g2b(ainstanceid);
		if aec >0 then
		 --  verify access  --
			select checkoperation( acursession ,'iu_t.edit') into aaccess;
			 if aaccess=0  then
				select 'изменение строк не разрешено. раздел=iu_task' result;
				leave body;
			  end if;
		else
			select 'Не создан документ - задача' result;
			leave body;
		end if;

	  select  count(*) into aec from iu_task where isChecked=-1 and  instanceid=g2b(ainstanceid);
		if aec >0 then
	
			select 'Задача уже проверена. Действие невозможно.' result;
			leave body;
		end if;
	

      select  count(*) into aec from iu_task where taskcancelled=0 and  taskfinished=0 and  instanceid=g2b(ainstanceid);
		if aec >0 then
	
			select 'Задача еще не завершена. Действие невозможно.' result;
			leave body;
		end if;
	end ;

-- получаем информацию  по   состоянию , процессу и плановой задаче
    select  theprocess,processstatus,statetask,doer_states,iu_taskid,doer into aurokid,astatusid,astatetaskid,asn_oncloseusr,ataskid,aiu_u_defid from iu_task where instanceid=g2b(ainstanceid);
	select instanceid into aurok_instanceid from iu_urok_def where iu_urok_defid =aurokid;
    select instanceid into aprc_instanceid from iu_urok_prc where theprocess =aurokid;

	 call SaveLog(
		 acursession 
		,'Задача'			-- тип события 
		,'задача возвращена исполнителю'						    -- описание 
		,b2g(aurokid)		-- урок 
		,b2g(astatusid)		-- подэтап
		,b2g(ataskid)			-- задача 
		,null					-- документ
		,null				-- видео 
		,null		-- обсуждение 
	);


	update iu_task set controller_comment=acomment, taskcancelled=0,taskfinished=0,finishdate=null where instanceid=g2b(ainstanceid);
	select 'ok' result;   
		

   
	
end
$$



drop PROCEDURE `iu_task_delegate`
$$
create PROCEDURE `iu_task_delegate`(
 acursession varchar(38),
 ainstanceid varchar(38) ,
 adoer  varchar(38)
 )
body: begin 

 declare asyslogid binary(16);
 declare atmpid binary(16);
 declare aaccess int;
 declare asysinstid binary(16);
 declare asessuserid binary(16);
 declare amlf_partid binary(16);
 declare asessuserlogin varchar(40);
 declare aec int;
 declare fetch_done bool;

declare anewinstanceid binary(16);

 declare ataskid binary(16);
 declare aurokid binary(16);
 declare astatusid binary(16);
 declare astatetaskid binary(16);
 declare aurok_instanceid binary(16);
 declare aprc_instanceid binary(16);
 declare asn_onclose binary(16);
 declare anextstatus binary(16);
 declare sp_result varchar(255);
 declare aiu_u_defid binary(16);
 declare amaxversion integer;

 declare continue handler for not found set fetch_done = true;
 select usersid into asessuserid from the_session where the_sessionid=g2b(acursession);
 select login into asessuserlogin from users where usersid=g2b(asessuserid);
 select instanceid into asysinstid from instance where objtype='mtzsystem';
 select iu_u_defid into aiu_u_defid from  iu_u_def where login =asessuserlogin;

  begin   -- проверки входных данных
		select count(*) into aec from the_session where the_sessionid=g2b(acursession) and closed=0 ;
		if aec=0  then
		  select 'сессия уже завершена.' result;
			leave body;
		  end if;

		select  count(*) into aec from iu_task where instanceid=g2b(ainstanceid);
		if aec >0 then
		 --  verify access  --
			select checkoperation( acursession ,'iu_t.edit') into aaccess;
			 if aaccess=0  then
				select 'изменение строк не разрешено. раздел=iu_task' result;
				leave body;
			  end if;
		else
			select 'Не создан документ - задача' result;
			leave body;
		end if;

	  select  count(*) into aec from iu_task where taskfinished=-1 and  instanceid=g2b(ainstanceid);
		if aec >0 then
			select 'Задача уже завершена. Действие невозможно.' result;
			leave body;
		end if;


      select  count(*) into aec from iu_task where isdelegated=-1 and  instanceid=g2b(ainstanceid);
		if aec >0 then
			select 'Задача уже делегирована. Действие невозможно.' result;
			leave body;
		end if;
	end ;

	
    set anewinstanceid = g2b(uuid());
	insert into instance(instanceid,objtype,name,changestamp) values (anewinstanceid,'iu_t','',now() );


	-- получаем информацию  по   состоянию , процессу и плановой задаче
    select  theprocess,processstatus,statetask,iu_taskid,doer into aurokid,astatusid,astatetaskid,ataskid,aiu_u_defid from iu_task where instanceid=g2b(ainstanceid);


	select instanceid into aurok_instanceid from iu_urok_def where iu_urok_defid =aurokid;
    select instanceid into aprc_instanceid from iu_urok_prc where theprocess =aurokid;

    call SaveLog(
		 acursession 
		,'Задача'			-- тип события 
		,'делегирование' -- 
		,b2g(aurokid)		-- урок 
		,b2g(astatusid)		-- подэтап
		,b2g(ataskid)			-- задача 
		,null					-- документ
		,null				-- видео 
		,null		-- обсуждение 
	);
   
			begin  -- передать  все в новую задачу

				-- отмечаем   что задача делегирована
				 update iu_task set isdelegated =-1 where  instanceid =g2b(ainstanceid);

				INSERT INTO iu_task
				(`instanceid`,`iu_taskid`,`changestamp`,
				`doer`,
				`subj`,
				`createdate`,
				`info`,
				`planenddate`,
				`contoller`,
				`doer_comment`,
				`controller_comment`,
				`taskfinished`,
				`ischecked`,
				`finishdate`,
				`taskcancelled`,
				`senttodoer`,
				`theprocess`,
				`processstatus`,
				`statetask`,
				`delegatefrom`
				)
				select anewinstanceid,g2b(uuid()),now(),
				g2b(adoer),
				concat('FW: ',`subj`),
				now(),
				`info`,
				`planenddate`,
				`doer`,
				`doer_comment`,
				`controller_comment`,
				`taskfinished`,
				`ischecked`,
				`finishdate`,
				`taskcancelled`,
				`senttodoer`,
				`theprocess`,
				`processstatus`,
				`statetask`,
				  iu_taskid from  iu_task where instanceid =g2b(ainstanceid);


					INSERT INTO `iu_taskattach`
					(`instanceid`,
					`iu_taskattachid`,
					`changestamp`,
					`dtype`,
					`filereftype`,
					`theref_ext`,
					`theref`,
					`fileurl`,
					`filetext`,
					`info`,origname)
					select anewinstanceid,g2b(uuid()),now(),`dtype`,
					`filereftype`,
					`theref_ext`,
					`theref`,
					`fileurl`,
					`filetext`,
					`info`,origname
					from iu_taskattach  where instanceid =g2b(ainstanceid);

					INSERT INTO `iu_taskrefs`
					(`instanceid`,
					`iu_taskrefsid`,
					`changestamp`,
					`dtypename`,
					`filereftype`,
					`theref_ext`,
					`theref`,
					`fileurl`,
					`filetext`,
					`info`,origname)
				select anewinstanceid,g2b(uuid()),now(),	
					`dtypename`,
					`filereftype`,
					`theref_ext`,
					`theref`,
					`fileurl`,
					`filetext`,
					`info`,origname
					from iu_taskrefs  where instanceid =g2b(ainstanceid);

							

					INSERT INTO `iu_taskvideo`
					(`instanceid`,
					`iu_taskvideoid`,
					`changestamp`,
					`doctype`,
					`adddate`,
					`activeversion`,
					`fileref_ext`,
					`fileref`,
					`addby`,
					`info`,
					`fileurl`,
					`version`,
					`nocomments`,origname)
				select anewinstanceid,g2b(uuid()),now(),	
					`doctype`,
					`adddate`,
					`activeversion`,
					`fileref_ext`,
					`fileref`,
					`addby`,
					`info`,
					`fileurl`,
					`version`,
					`nocomments`,origname
					from iu_taskvideo  where instanceid =g2b(ainstanceid);

			end;

			select 'ok' result; 


	
end
$$


drop PROCEDURE `iu_task_stopdelegate`
$$
create PROCEDURE `iu_task_stopdelegate`(
 acursession varchar(38),
 ainstanceid varchar(38) ,
 acomment varchar(255)
 )
body: begin 

 declare asyslogid binary(16);
 declare atmpid binary(16);
 declare aaccess int;
 declare asysinstid binary(16);
 declare asessuserid binary(16);
 declare amlf_partid binary(16);
 declare asessuserlogin varchar(40);
 declare aec int;
 declare fetch_done bool;

 declare ataskid binary(16);
 declare aurokid binary(16);
 declare astatusid binary(16);
 declare astatetaskid binary(16);
 declare aurok_instanceid binary(16);
 declare aprc_instanceid binary(16);
 declare asn_onclose binary(16);
 declare anextstatus binary(16);
 declare sp_result varchar(255);
 declare aiu_u_defid binary(16);
 declare amaxversion integer;

 declare continue handler for not found set fetch_done = true;
 select usersid into asessuserid from the_session where the_sessionid=g2b(acursession);
 select login into asessuserlogin from users where usersid=g2b(asessuserid);
 select instanceid into asysinstid from instance where objtype='mtzsystem';
 select iu_u_defid into aiu_u_defid from  iu_u_def where login =asessuserlogin;

  begin   -- проверки входных данных
		select count(*) into aec from the_session where the_sessionid=g2b(acursession) and closed=0 ;
		if aec=0  then
		  select 'сессия уже завершена.' result;
			leave body;
		  end if;

		select  count(*) into aec from iu_task where instanceid=g2b(ainstanceid);
		if aec >0 then
		 --  verify access  --
			select checkoperation( acursession ,'iu_t.edit') into aaccess;
			 if aaccess=0  then
				select 'изменение строк не разрешено. раздел=iu_task' result;
				leave body;
			  end if;
		else
			select 'Не создан документ - задача' result;
			leave body;
		end if;

	  select  count(*) into aec from iu_task where delegatefrom is  null  and  instanceid=g2b(ainstanceid);
		if aec >0 then
			select 'Задача не была делегирована. Действие невозможно.' result;
			leave body;
		end if;


	  select  count(*) into aec from iu_task where taskfinished=-1 and  instanceid=g2b(ainstanceid);
		if aec >0 then
			select 'Задача уже завершена. Действие невозможно.' result;
			leave body;
		end if;


     /*   select  count(*) into aec from iu_task where taskcancelled=-1 and  instanceid=g2b(ainstanceid);
		if aec >0 then
			select 'Задача отменена. Действие невозможно.' result;
			leave body;
		end if;
    */

	end ;



	--  если пользователь захотел  коммент, записываем их	
     update iu_task set controller_comment=acomment, doer_states=null where instanceid=g2b(ainstanceid);

	-- получаем информацию  по   состоянию , процессу и плановой задаче
    select  theprocess,processstatus,statetask,iu_taskid,doer into aurokid,astatusid,astatetaskid,ataskid,aiu_u_defid from iu_task where instanceid=g2b(ainstanceid);



	select instanceid into aurok_instanceid from iu_urok_def where iu_urok_defid =aurokid;
    select instanceid into aprc_instanceid from iu_urok_prc where theprocess =aurokid;

    call SaveLog(
		 acursession 
		,'Задача'			-- тип события 
		,'Контролер отменил делегированную задачу'						    -- описание 
		,b2g(aurokid)		-- урок 
		,b2g(astatusid)		-- подэтап
		,b2g(ataskid)			-- задача 
		,null					-- документ
		,null				-- видео 
		,null		-- обсуждение 
	);


			 -- офиксируем отмену   делегирования в исходной задаче
			 update iu_task set isdelegated =0 where iu_taskid in ( select delegatefrom from iu_task where instanceid =g2b(ainstanceid));
   
			begin  -- передать версии файлов из блока вложений в архив урока
				declare afileref varchar(255);
				declare afileext varchar(10);
				declare adoctype binary(16);
				declare adoc_name varchar(255);
				declare anewid binary(16);
				declare afiletext varchar(10240);

				declare check_doc_cursor cursor for
				select  dtype, theref,theref_ext ,info,filetext from iu_taskattach 
				where iu_taskattach.instanceid=g2b(ainstanceid);

				
				open check_doc_cursor;
				set  fetch_done=false;
				fetch check_doc_cursor into adoctype, afileref,afileext,adoc_name,afiletext;
				while not fetch_done do 
				    set anewid=g2b(uuid());
					set amaxversion=0;
					select max(ifnull(version,1)) into amaxversion from 	iu_urok_docs where instanceid=aurok_instanceid and  doctype=adoctype;

					  if amaxversion is null then set amaxversion=0; end if;

					update 	iu_urok_docs set ActiveVersion=0 where instanceid=aurok_instanceid and  doctype=adoctype;

					insert into iu_urok_docs(instanceid,iu_urok_docsid, changestamp, AddDate,FileRef,fileRef_ext,Info,doctype,addby,activeversion,version,filetext) values (
						aurok_instanceid,anewid,now(),now(),afileref,afileext,adoc_name,adoctype,aiu_u_defid,-1,amaxversion+1,afiletext);


					  call SaveLog(
							 acursession 
							,'Документ'			-- тип события 
							,adoc_name				    -- описание 
							,b2g(aurokid)		-- урок 
							,b2g(astatusid)		-- подэтап
							,b2g(ataskid)			-- задача 
							,b2g(anewid)					-- документ
							,null				-- видео 
							,null		-- обсуждение 
						);


				    set  fetch_done=false;
					fetch check_doc_cursor into adoctype, afileref,afileext,adoc_name,afiletext;
				end while;
				close check_doc_cursor;

			end;

			begin  -- передать версии видео в архив урока
				declare afileref varchar(255);
				declare afileext varchar(10);
				declare adoctype binary(16);
				declare adoc_name varchar(255);
				declare afileurl varchar(255);
			    declare anewid binary(16);
				declare anc int;

				declare check_doc_cursor cursor for
				select  doctype, fileref,fileref_ext ,info,fileurl,nocomments from iu_taskvideo
				where iu_taskvideo.instanceid=g2b(ainstanceid);

				
				open check_doc_cursor;
				set  fetch_done=false;
				fetch check_doc_cursor into adoctype, afileref,afileext,adoc_name,afileurl,anc;
				while not fetch_done do 
				      set anewid=g2b(uuid());
					-- пока просто тупо  вставляем  файлы в видеоматериалы
					insert into iu_urok_video(instanceid,iu_urok_videoid, changestamp, AddDate,FileRef,fileRef_ext,Info,doctype,fileurl,addby,activeversion,version,nocomments) values (
						aurok_instanceid,anewid,now(),now(),afileref,afileext,adoc_name,adoctype,afileurl,aiu_u_defid,-1,0,anc);

					call iu_urok_video_client_trigger(acursession,b2g(anewid));

					 call SaveLog(
							 acursession 
							,'Видео'			-- тип события 
							,adoc_name					    -- описание 
							,b2g(aurokid)		-- урок 
							,b2g(astatusid)		-- подэтап
							,b2g(ataskid)			-- задача 
							,null					-- документ
							,b2g(anewid)			-- видео 
							,null		-- обсуждение 
						);
				
				    set  fetch_done=false;
					fetch check_doc_cursor into adoctype, afileref,afileext,adoc_name,afileurl,anc;
				end while;
				close check_doc_cursor;

			
			end;


	-- проставить у задачи признак завершения
    update  iu_task set isChecked=-1, taskCancelled=-1, finishdate=now(),changestamp=now() where instanceid=g2b(ainstanceid);

	-- update iu_urok_prc set manualcontrol=-1,lastmessage='Задача завершена с отрицательным результатом' where instanceid=aprc_instanceid;
	insert into iu_urok_msg(instanceid,iu_urok_msgid,info,thedate,changestamp) 
	values(aprc_instanceid,g2b(uuid()), 'Делегирование отменено' ,now(),now());
	
	select 'ok' result;  -- переход будет по зваершению последней задачи, не сейчас


	
end
$$


DELIMITER ;


DELIMITER $$

drop PROCEDURE `iu_urok_def_starttask`
$$
CREATE  PROCEDURE `iu_urok_def_starttask`(
 acursession varchar(38),
 ainstanceid varchar(38) ,
 aiu_urok_stage varchar(38)
,adoerid binary(16)
,aiu_urok_defid binary(16)
,aprc_instanceid binary(16)
,acurator binary(16)
,ataskname varchar(255)
,atask_info  varbinary(4000)
,atask_duration int
,adoer2id binary(16)
,ataskid binary(16)
)
body:begin
	declare aec int;
	declare atask_instanceid binary(16);
	declare atask_user binary(16);
	declare atask_controller binary(16);
	declare atask_doc binary(16);
	declare arolename varchar(255);
	declare fetch_done bool;

	declare adoctype binary(16);
	declare adoc_name varchar(255);
	declare resmsg varchar(4000);
	declare finmsg varchar(4000);
	declare minseq int;
	declare acreator binary(16);


	declare continue handler for not found set fetch_done = true;

	set arolename='';
	--  исполнитель
	select name into arolename from iu_crole where iu_croleid=adoerid;
	-- select 'start task for', arolename;
	
	-- получить пользователя для указанной роли
	set atask_user=null;

	if arolename='куратор'  then
		select curator into atask_user  from iu_urok_def where iu_urok_defid=aiu_urok_defid  ;
	end if;

	if arolename='Учитель'  then
		select theTeacher into atask_user  from iu_urok_def where iu_urok_defid=aiu_urok_defid  ;
	end if;

	if arolename='Методист'  then
		select methodist into atask_user  from iu_urok_def where iu_urok_defid=aiu_urok_defid  ;
	end if;

	if arolename='Методист 2'  then
		select methodist2 into atask_user  from iu_urok_def where iu_urok_defid=aiu_urok_defid  ;
	end if;

	--  ищем среди назначенных исполнителей
	if atask_user is null then
		
		select doer into atask_user  from iu_urok_creators
		where instanceid=g2b(ainstanceid)  and processrole=adoerid limit 0,1;
	end if;

	-- ищем среди  предопределденных ролей
	if atask_user is null then
			select iu_u_defid into atask_user  from iu_u_def 
			join iu_crole on iu_u_def.currole=iu_crole.iu_croleid and  iu_crole.allowsetuser=0
			where  iu_u_def.currole=adoerid  limit 0,1;
	end if;

	if atask_user is null then
			set atask_user =acurator;
	end if;
	


	set arolename='';
	-- контролер
	select name into arolename from iu_crole where iu_croleid=adoer2id;

	-- получить пользователя для указанной роли
	set atask_controller=null;

	if arolename='куратор'  then
		select curator into atask_controller  from iu_urok_def where iu_urok_defid=aiu_urok_defid  ;
	end if;

	if arolename='Учитель'  then
		select theTeacher into atask_controller  from iu_urok_def where iu_urok_defid=aiu_urok_defid ;
	end if;

	if arolename='Методист'  then
		select methodist into atask_controller  from iu_urok_def where iu_urok_defid=aiu_urok_defid  ;
	end if;

	if arolename='Методист 2'  then
		select methodist2 into atask_controller  from iu_urok_def where iu_urok_defid=aiu_urok_defid ;
	end if;

	--  ищем среди назначенных исполнителей
	if atask_controller is null then
		select doer into atask_controller  from iu_urok_creators
		where instanceid=g2b(ainstanceid)  and processrole=adoer2id limit 0,1;
	end if;

	-- ищем среди  предопределденных ролей
	if atask_controller is null then
			select iu_u_defid into atask_controller  from iu_u_def 
			join iu_crole on iu_u_def.currole=iu_crole.iu_croleid and  iu_crole.allowsetuser=0
			where  iu_u_def.currole=adoer2id  limit 0,1;
	end if;

	if atask_user is not null then

		-- создать объект - задачу
		select  g2b(uuid()) into atask_instanceid;
		insert into instance(instanceid,name,objtype) values(atask_instanceid,ataskname,'iu_t');
		
		-- создать заголовок задачи
		insert into iu_task(instanceid,iu_taskid,changestamp,doer,subj,createdate,taskfinished,taskcancelled,info,planenddate,senttodoer,
		theprocess,processstatus,statetask,contoller,doer_comment)
		values(atask_instanceid,g2b(uuid()),now(),atask_user,ataskname,now(),0,0,atask_info,AddWorkDays(atask_duration,now()),0,
		aiu_urok_defid,g2b(aiu_urok_stage),ataskid,atask_controller,'');  -- acomment2

		-- select 'task instanceid:', b2g(atask_instanceid)		;
		update iu_urok_prc set lastdoer=atask_user,lastplanned=AddWorkDays(atask_duration,now()) where instanceid=aprc_instanceid;

		begin  -- создать  раздел ссылок для задачи
				declare aallversions int;
				declare adocref varchar(255);
				declare adocinto varchar(255);
				declare adocversion int;
				declare adocname varchar(255);
				declare setdoc_cursor cursor for
				select  iud_doctype.name,allversions,iud_doctype.iud_doctypeid from iu_state_tasklink join iud_doctype 
				on iu_state_tasklink.doctype =iud_doctype.iud_doctypeid
				where iu_state_tasklink.parentstructrowid=ataskid ;

				
				open setdoc_cursor;
				set  fetch_done=false;
				fetch setdoc_cursor into adocname,aallversions,adoctype;
				while not fetch_done do 
					
					-- получить  ссылку и описание для  этого типа
					if aallversions=0 then
						--  вставить   активную запись в раздел ссылок
						insert into iu_taskrefs(instanceid,iu_taskrefsid,changestamp,dtypename,info,theref,theref_ext,fileurl,filetext,filereftype,version,addby,adddate,origname)
						select atask_instanceid,g2b(uuid()),now(),adocname,info,fileref,FileRef_ext,fileurl,filetext,filereftype,version,addby,adddate,origname  from  iu_urok_docs where
						instanceid=g2b(ainstanceid)  and doctype=adoctype and  ActiveVersion=-1;
					else
						--  вставить   все записи в раздел ссылок
						insert into iu_taskrefs(instanceid,iu_taskrefsid,changestamp,dtypename,info,theref,theref_ext,fileurl,filetext,filereftype,version,addby,adddate,origname)
						select atask_instanceid,g2b(uuid()),now(),adocname,info,fileref,FileRef_ext,fileurl,filetext,filereftype ,version,addby,adddate,origname from  iu_urok_docs where
						instanceid=g2b(ainstanceid)  and doctype=adoctype;

						
					end if;
				 
				  set  fetch_done=false;
					fetch setdoc_cursor into adocname,aallversions,adoctype;
				end while;
				close setdoc_cursor;

				
		end;

	else
			update iu_urok_prc set manualcontrol=-1,lastmessage=concat('Не удалось определить исполнителя задачи: ',ataskname,'. Переход к: ',anewstagename) where instanceid=aprc_instanceid;
			insert into iu_urok_msg(instanceid,iu_urok_msgid,info,thedate,changestamp) 
			values(aprc_instanceid,g2b(uuid()),concat('Не удалось определить исполнителя задачи: ',ataskname,'. Переход к: ',anewstagename) ,now(),now());
			select 	 concat('Не удалось определить исполнителя задачи: ',ataskname ) result;
			leave body;
	end if; 
end
$$




drop PROCEDURE `iu_urok_def_newstate`
$$
CREATE  PROCEDURE `iu_urok_def_newstate`(
 acursession varchar(38),
 ainstanceid varchar(38) ,
 aiu_urok_stage varchar(38)/* статус */
)
body: begin  
 declare asyslogid binary(16);
 declare atmpid binary(16);
 declare aaccess int;
 declare asysinstid binary(16);
 declare asessuserid binary(16);
 declare amlf_partid binary(16);
 declare asessuserlogin varchar(40);
 declare aiu_urok_defid varchar(38);
 declare aprc_instanceid binary(16);
 declare aprc_rowid binary(16);
 declare astage binary(16);
declare anewstagename varchar(400);
-- declare acomment2 varchar(4000);

 declare aec int;
 

declare aprocesstypeid binary(16);
declare astartup int;
declare astatus_instanceid binary(16);
declare aprevstate_ok int;
declare astatus_prev binary(16);
declare fetch_done bool;

declare adoctype binary(16);
declare adoc_name varchar(255);
declare resmsg varchar(4000);
declare finmsg varchar(4000);
declare minseq int;
declare acreator binary(16);

declare continue handler for not found set fetch_done = true;

 select usersid into asessuserid from the_session where the_sessionid=g2b(acursession);
 select login into asessuserlogin from users where usersid=g2b(asessuserid);
 select instanceid into asysinstid from instance where objtype='mtzsystem';

	begin   -- проверки входных данных
		select count(*) into aec from the_session where the_sessionid=g2b(acursession) and closed=0 ;
		if aec=0  then
		    select 'сессия уже завершена.' result;
			leave body;
		end if;

		select  count(*) into aec from iu_urok_def where instanceid=g2b(ainstanceid);
		if aec >0 then

		  select  b2g(iu_urok_defid) into aiu_urok_defid from iu_urok_def where instanceid=g2b(ainstanceid);

         select instanceid,iu_urok_prcid into aprc_instanceid, aprc_rowid from iu_urok_prc where theprocess=g2b(aiu_urok_defid);

		  -- получаем информацию  по  предыдущем состоянию и типу процесса
		  -- select  b2g(processtype), b2g(iu_urok_stage) from iu_urok_def where iu_urok_defid=g2b(aiu_urok_defid);

		  select  processtype into aprocesstypeid from iu_urok_def where iu_urok_defid=g2b(aiu_urok_defid);
		  select   iu_urok_stage into  astatus_prev from iu_urok_prc where instanceid=aprc_instanceid;

		 --  verify access  --
			select checkoperation( acursession ,'iu_urok.edit') into aaccess;
			 if aaccess=0  then
				select 'изменение строк не разрешено. раздел=iu_urok_def' result;
				leave body;
			  end if;
		else
			select 'Не создан документ - урок' result;
			leave body;
		end if;

		

	   -- если статус не менялся, то просто ничего не делаем
		/*  if astatus_prev=g2b(aiu_urok_stage) then
				select 'ok' result;
				leave body;
		  end if;*/

		-- select count(*) into aec  from iu_status where  /*isStartupState=-1  and */ theprocess=aprocesstypeid and iu_statusid=g2b(aiu_urok_stage);
		-- if aec=0 then
			-- select 'Статус не соответствует производственому процессу урока.' result;
			-- leave body;
		 -- end if;
	end ;

	select instanceid, isStartupState  into astatus_instanceid , astartup from iu_status where iu_statusid=g2b(aiu_urok_stage);

  
     if astartup=0 then   -- проверка  возможности установки статуса
		--  нет предыдущего статуса и  этот не начальный !
		if astatus_prev is null then
			select 'Начальный статус процесса не был ранее установлен.' result;
			leave body;
		end if;
	end if;

	-- select b2g(astatus_prev) as  prev_stage2;

	 if not (astatus_prev is null  or astatus_prev=g2b('{00000000-0000-0000-0000-000000000000}') ) then  -- был предыдущий статус ( проверки на выходе из статуса)
			 begin  -- проверка существования разрешенного перехода ( +++проверять надо для конкретного пользователя  ???) 
					select count(*) into aec from iu_statusnext join iu_status on iu_status.instanceid=iu_statusnext.instanceid 
					where  iu_statusid=astatus_prev and iu_statusnext.nextstatus=g2b(aiu_urok_stage);
					 if aec=0 then
					
						insert into iu_urok_msg(instanceid,iu_urok_msgid,info,thedate,changestamp) 
						values(aprc_instanceid,g2b(uuid()), 'Переход в новый статус не был разрешен ' ,now(),now());
						update iu_urok_prc set lastmessage='Переход в новый статус не был разрешен' where instanceid=aprc_instanceid;
						-- select 'Переход в новый статус не разрешен ' result;
						-- leave body;
					 end if;
			 end;


			 begin --  проверка завершения всех  выданных  в состоянии задач
		

				declare check_task_cursor cursor for
				select  iu_statustaskid,iu_statustask .name from iu_statustask 
				join iu_status on iu_status.instanceid=iu_statustask .instanceid
				where iu_status.iu_statusid=astatus_prev and iu_statustask.finishallowed=-1  ;

				set resmsg='';
				set finmsg='';
				open check_task_cursor;
				set  fetch_done=false;
				fetch check_task_cursor into adoctype,adoc_name;
				while not fetch_done do 
					select  count(*) into aec from iu_task where  iu_task.statetask=adoctype and  iu_task.processstatus=astatus_prev and iu_task.theprocess=g2b(aiu_urok_defid);
					if aec =0 then
						if resmsg<>'' then
							set resmsg=concat(resmsg,', ');
						end if;
						set resmsg=concat(resmsg,adoc_name);
					else
						select  count(*) into aec from iu_task where NotArchived(iu_task.instanceid) and iu_task.statetask=adoctype and  iu_task.processstatus=astatus_prev and iu_task.theprocess=g2b(aiu_urok_defid) and taskfinished=-1;
						if aec =0 then
						    if finmsg<>'' then
								set finmsg=concat(finmsg,', ');
							end if;
							set finmsg=concat(finmsg,adoc_name);
						end if;
					end if;
				    set  fetch_done=false;
					fetch check_task_cursor into adoctype,adoc_name;
				end while;
				close check_task_cursor;

				 if resmsg<>'' then
					
					update iu_urok_prc set manualcontrol=-1,lastmessage=concat('Не созданы обязательные задачи: ',resmsg) where instanceid=aprc_instanceid;

					insert into iu_urok_msg(instanceid,iu_urok_msgid,info,thedate,changestamp) 
					values(aprc_instanceid,g2b(uuid()),concat('Не созданы обязательные задачи: ',resmsg),now(),now());
					select concat('Не созданы обязательные задачи: ',resmsg) result;
					leave body;
				 end if;

				if finmsg<>'' then
				
					update iu_urok_prc set manualcontrol=-1,lastmessage=concat('Не завершены обязательные задачи: ',resmsg)  where instanceid=aprc_instanceid;
					insert into iu_urok_msg(instanceid,iu_urok_msgid,info,thedate,changestamp) 
					values(aprc_instanceid,g2b(uuid()),concat('Не завершены обязательные задачи: ',finmsg) ,now(),now());
					select concat('Не завершены обязательные задачи: ',finmsg) result;
					leave body;
				 end if;

			 end;
     end if;

	--  если по этому уроку есть незаконченные задания, то просто их отменяем !!!
	update iu_task set  taskcancelled =-1,doer_comment='Задача отменена при смене подэтапа урока' where taskfinished=0 and taskcancelled=0 and theprocess=g2b(aiu_urok_defid);

	select  concat(iud_stagedef.name,' ',iu_status.name) into anewstagename from iu_status join iud_stagedef on iu_status.thestage=iud_stagedef.iud_stagedefid where iu_status.iu_statusid=g2b(aiu_urok_stage);

	-- select notes into acomment2 from iu_urok_def where instanceid=g2b(ainstanceid);

     begin -- проверяем условия для входа в новое состояние (назначены ли исполнители)

	         declare check_doer_cursor cursor for
				select  distinct doertype, iu_crole.name from iu_statustask 
				join iu_crole on iu_statustask.doertype=iu_crole.iu_croleid
				join iu_status on iu_status.instanceid=iu_statustask.instanceid
				where iu_status.iu_statusid=g2b(aiu_urok_stage)  and iu_crole.allowsetuser=-1 ;
		
				set resmsg='';
				open check_doer_cursor;
				set  fetch_done=false;
				fetch check_doer_cursor into adoctype,adoc_name;
				while not fetch_done do 
				  set acreator=null;
				  select  count(*) into aec from iu_urok_creators where iu_urok_creators.instanceid=g2b(ainstanceid) and  iu_urok_creators.processrole=adoctype and (doer is not null or doers is not null) ;
				  if aec =0 then
						if adoc_name='Куратор' then
							select curator into acreator	from iu_urok_def where instanceid=g2b(ainstanceid);
							if acreator is null or acreator=g2b('{00000000-0000-0000-0000-000000000000}')  then
								if resmsg<>'' then
									set resmsg=concat(resmsg,', ');
								end if;
								set resmsg=concat(resmsg,adoc_name);
							end if;
						elseif adoc_name='Учитель' then
							select theteacher into acreator	from iu_urok_def where instanceid=g2b(ainstanceid);
							if acreator is null or acreator=g2b('{00000000-0000-0000-0000-000000000000}')  then
								if resmsg<>'' then
									set resmsg=concat(resmsg,', ');
								end if;
								set resmsg=concat(resmsg,adoc_name);
							end if;
						elseif adoc_name='Методист' then
							select methodist into acreator	from iu_urok_def where instanceid=g2b(ainstanceid);
							if acreator is null or acreator=g2b('{00000000-0000-0000-0000-000000000000}')  then
								if resmsg<>'' then
									set resmsg=concat(resmsg,', ');
								end if;
								set resmsg=concat(resmsg,adoc_name);
							end if;
						
						elseif adoc_name='Методист 2' then
							select methodist2 into acreator	from iu_urok_def where instanceid=g2b(ainstanceid);
							if acreator is null or acreator=g2b('{00000000-0000-0000-0000-000000000000}')  then
								if resmsg<>'' then
									set resmsg=concat(resmsg,', ');
								end if;
								set resmsg=concat(resmsg,adoc_name);
							end if;
						
						else
							if resmsg<>'' then
								set resmsg=concat(resmsg,', ');
							end if;
							set resmsg=concat(resmsg,adoc_name);
						end if;
				  	
				  end if;

   			        set  fetch_done=false;
					fetch check_doer_cursor into adoctype,adoc_name;
				end while;
				close check_doer_cursor;

				 if resmsg<>'' then
					
					update iu_urok_prc set manualcontrol=-1,lastmessage=concat('Не заданы исполнители для ролей: ',resmsg,'. Переход к :',anewstagename)  where instanceid=aprc_instanceid;
					insert into iu_urok_msg(instanceid,iu_urok_msgid,info,thedate,changestamp) 
					values(aprc_instanceid,g2b(uuid()),concat('Не заданы исполнители для ролей: ',resmsg,'. Переход к :',anewstagename) ,now(),now());
					-- select concat('Не заданы исполнители для ролей: ',resmsg) result;
					-- leave body;
				 end if;

end;

	begin   -- модификация  базы данных

			 start transaction ; 
			-- фиксируем новое состояние

			call SaveLog(
				 acursession 
				,'Урок'			-- тип события 
				,'новый подэтап'						    -- описание 
				,aiu_urok_defid		-- урок 
				,aiu_urok_stage		-- подэтап
				,null			-- задача 
				,null					-- документ
				,null				-- видео 
				,null		-- обсуждение 
			);

			 call iu_urok_prc_logger(acursession,aprc_rowid) ; 

			-- получаем  этап
			 select thestage into astage from iu_status where 	iu_statusid=g2b(aiu_urok_stage);

			 update  iu_urok_prc set changestamp=now()
			 , iu_urok_stage=g2b(aiu_urok_stage)
			 , topstage =astage
			  where  iu_urok_prcid = aprc_rowid ;


			call iu_urok_prc_client_trigger(acursession,aprc_rowid);


			-- если было предыдущее, то фиксируем информацию в графике работ
			 if not astatus_prev is null then
				update iu_urok_graph set StageEndDate=now(),StagePercent=100 where thestatus=astatus_prev and StageEndDate is null and instanceid=aprc_instanceid;
			 end if;

			--  вписываем новое состояние в график работ
			insert into iu_urok_graph(instanceid,iu_urok_graphid,thestatus,stagestartdate,stageenddate,StagePercent,changestamp) 
            values(aprc_instanceid,g2b(uuid()),g2b(aiu_urok_stage),now(),null,0,now());


			-- проверяем есть ли у статуса задачи для выполнения
			 select count(*) into aec  from iu_statustask  
				join iu_status on iu_status.instanceid=iu_statustask.instanceid
				where iu_status.iu_statusid=g2b(aiu_urok_stage);

			if aec >0 then

					-- вычисляем минимальный номер в последовательности задач
					select min( tasksequence) into minseq  from iu_statustask  
						join iu_status on iu_status.instanceid=iu_statustask.instanceid
						where iu_status.iu_statusid=g2b(aiu_urok_stage);

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


						declare start_task_cursor cursor for
						select  iu_statustaskid, iu_statustask.name,iu_statustask.doertype,iu_statustask.duration_plan,iu_statustask.info,iu_statustask.contoller from iu_statustask  
						join iu_status on iu_status.instanceid=iu_statustask.instanceid
						where iu_status.iu_statusid=g2b(aiu_urok_stage) and tasksequence=minseq;
						
						 -- select 'starting tasks';	

						-- исполнитель по умолчанию....
						select curator into acurator  from iu_urok_def where iu_urok_defid=g2b(aiu_urok_defid ) ;					

						open start_task_cursor;
						set  fetch_done=false;
						fetch start_task_cursor into ataskid,ataskname,adoerid,atask_duration,atask_info,adoer2id;
						while not fetch_done do 
						
							set arolename='';
							
							--  исполнитель
							select name into arolename from iu_crole where iu_croleid=adoerid;

							select count(*)  into aec  from iu_urok_creators
							where instanceid=g2b(ainstanceid)  and processrole=adoerid limit 0,1;
						
							if aec>0 then
								select doers into agroup  from iu_urok_creators
								where instanceid=g2b(ainstanceid)  and processrole=adoerid limit 0,1;
							else
								set agroup=null;
							end if;

							if agroup is null then
									-- select 'regular role task',b2g(adoerid),arolename;
									call iu_urok_def_starttask( acursession , ainstanceid,  aiu_urok_stage ,adoerid,g2b(aiu_urok_defid) ,aprc_instanceid ,acurator,ataskname,atask_info,atask_duration,adoer2id,ataskid);
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
										call iu_urok_def_starttask( acursession , ainstanceid,  aiu_urok_stage ,adoerid,g2b(aiu_urok_defid) ,aprc_instanceid ,acurator,ataskname,atask_info,atask_duration,adoer2id,ataskid);
										set  fetch_done=false;
										fetch group_cursor into adoerid;
									end while;
									close group_cursor;
								end;
								
							end if;

						    set  fetch_done=false;
							fetch start_task_cursor into ataskid,ataskname,adoerid,atask_duration,atask_info,adoer2id;
						end while;
						close start_task_cursor;
					end;
			end if;
			 commit; 
		end;
		update iu_urok_prc set manualcontrol=0,lastmessage=null where instanceid=aprc_instanceid;
	    select 'ok' result;
 end$$
DELIMITER ;

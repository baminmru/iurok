-- select * from SysRefCache;

DELIMITER $$

drop procedure BUILD_DEPTCACHE
$$

create procedure BUILD_DEPTCACHE(
 aCURSESSION varchar(38),
 aDEPTID varchar(38),
 aModuleName varchar(255)
)
    READS SQL DATA
begin  

  declare deptID varchar(38);
  declare deptName varchar(255);
  declare fetch_done int default false;

    
   -- define cursor and scan 
   declare dept_cursor cursor for
   select b2g(iu_orgtreeid),name  from
   iu_orgtree  where iu_orgtree.parentrowid=g2b(aDEPTID);
       
   declare continue handler for not found set fetch_done = true;
       
  --  select 'debug -BUILD_DEPTCACHE',adeptid  ;
   
      -- load users from department
    insert into SysRefCache(SysRefCacheid,sessionid,ObjectOwnerID,changestamp,modulename) 
    select distinct g2b(UUID()),g2b(aCURSESSION), iu_orgusr.orguser,now(),aModuleName from
    iu_u_def  join iu_orgusr on iu_orgusr.orguser=iu_u_def.iu_u_defid join iu_orgtree on iu_orgtree.iu_orgtreeid=iu_orgusr.parentstructrowid
    where iu_orgtree.iu_orgtreeid=g2b(aDEPTID) ;
       

    open dept_cursor;
		set fetch_done=false;
        fetch dept_cursor into deptID,deptName;
        while not fetch_done do 
          -- select deptName;
          call BUILD_DEPTCACHE(aCURSESSION,deptID,aModuleName);   
		  set fetch_done=false;
          fetch dept_cursor into deptID,deptName;
        end while;
    close dept_cursor;
end;
$$


drop procedure BUILD_USERCACHE
$$
CREATE procedure BUILD_USERCACHE(
 aCURSESSION varchar(38) 
) 
    READS SQL DATA
begin  
 
 declare otdelID varchar(38);
 declare userID varchar(38);
 declare colegs int;
 declare substruct int;
 declare allObj int;
 declare TMObj int;
 declare deptID varchar(38);
 declare deptName varchar(255);
 declare actionName varchar(255);
 
 declare fetch_done int default false;
 
declare usercache_cursor cursor for
select distinct b2g(iu_orgtreeID) otdelid,b2g(iu_u_defid) userid, 
iu_rcfg_mod.colegsobject,iu_rcfg_mod.substructobjects,iu_rcfg_mod.allobjects,iu_rcfg_mod.tmobjects,iu_rcfg_mod.name  
from iu_rcfg_mod
join iu_rcfg_def on iu_rcfg_mod.instanceid=iu_rcfg_def.instanceid
join iu_u_def on  iu_u_def.currole=iu_rcfg_def.therole
join users on users.login =iu_u_def.login
left join iu_orgusr on iu_u_def.iu_u_defid=iu_orgusr.orguser
left join iu_orgtree on iu_orgtree.iu_orgtreeid = iu_orgusr.parentstructrowid 
join the_session on the_session.usersid=users.usersid
join instance on instance.instanceid=iu_u_def.instanceid and instance.archived=0 
where iu_rcfg_mod.visibleControl=-1
and the_sessionid= g2b(aCURSESSION);

declare continue handler for not found set fetch_done = true;
  
SET @@GLOBAL.max_sp_recursion_depth = 255;
SET @@session.max_sp_recursion_depth = 255; 
 
-- clean session cahce
delete from SysRefCache where sessionid= g2b(aCURSESSION);

open usercache_cursor;

fetch usercache_cursor into otdelID,userID,colegs,substruct,allObj,TMObj,actionName;
while not fetch_done do 
   
    -- insert self user into cache
    insert into SysRefCache(SysRefCacheid,sessionid,ObjectOwnerID,changestamp,modulename) values(g2b(UUID()),g2b(aCURSESSION),g2b(userId),now(),actionName);

    -- insert all users in organization into cache
    if allObj<>0 then

        insert into SysRefCache(SysRefCacheid,sessionid,ObjectOwnerID,changestamp,modulename)  
        select distinct  g2b(UUID()),g2b(aCURSESSION),iu_u_defid,now(),actionName  from
        iu_u_def  ; --  join iu_orgusr on iu_orgusr.orguser=iu_u_def.iu_u_defid join iu_orgtree on iu_orgtree.iu_orgtreeid=iu_orgusr.parentstructrowid;
    else

	   -- insert all coleegs  into cache
		if colegs<>0 then
			insert into SysRefCache(SysRefCacheid,sessionid,ObjectOwnerID,changestamp,modulename) 
			select distinct g2b(UUID()),g2b(aCURSESSION),iu_u_defid,now(),actionName from
			iu_u_def  join iu_orgusr on iu_orgusr.orguser=iu_u_def.iu_u_defid join iu_orgtree on iu_orgtree.iu_orgtreeid=iu_orgusr.parentstructrowid
			where iu_orgtree.iu_orgtreeid=g2b(otdelID) ; 
		end if;
   
      -- insert all objects for dependent departments
		if substruct<>0 then
			begin
				declare dept_cursor cursor for
				select b2g(iu_orgtreeid) id ,name  from
				iu_orgtree  where  iu_orgtree.parentrowid=g2b(otdelID);
				open dept_cursor;
				set fetch_done=false;
				fetch dept_cursor into deptID,deptName;
				while not fetch_done do  
				-- select deptName;
				  call BUILD_DEPTCACHE(aCURSESSION,deptID,actionName);   
				  set fetch_done=false;
				  fetch dept_cursor into deptID,deptName;
				end while;
				close dept_cursor;
				set fetch_done=false;
			end;

			

		end if;

		if TMObj<>0 then
			insert into SysRefCache(SysRefCacheid,sessionid,ObjectOwnerID,changestamp,modulename)  
				select distinct  g2b(UUID()),g2b(aCURSESSION),iu_u_defid,now(),actionName  from
				iu_u_def   join iu_crole on iu_u_def.currole=iu_crole.iu_croleid and iu_crole.name in ('учитель','методист');
		end if;

    end if;
    
   
    set fetch_done=false;
    fetch usercache_cursor into otdelID,userID,colegs,substruct,allObj,TMObj,actionName;
   
end while;

close usercache_cursor;

end;
$$



-- select b2g(the_Sessionid) sid, closed,users.login from the_session join users on the_session.usersid=users.usersid

-- call BUILD_USERCACHE('{9AD6D700-FA99-11E3-8FBF-00155D0ED711}');
$$

 -- select * from SysRefCache where sessionid=g2b('{9AD6D700-FA99-11E3-8FBF-00155D0ED711}');
select count(*) from SysRefCache --  where sessionid=g2b('{9AD6D700-FA99-11E3-8FBF-00155D0ED711}');
$$

-- delete from SysRefCache  where sessionid=g2b('{9AD6D700-FA99-11E3-8FBF-00155D0ED711}');

-- delete from the_session


delimiter $$

/* create view v_subects as 
select count(*) cnt, iud_predmet.name, iud_predmet.predmeticon,iud_predmet.prefix,iu_clsinfo.name theclass ,iu_clsinfo.sequence from  iu_urok_def 
join iud_predmet on iu_urok_def.subject=iud_predmetid
join iu_clsinfo on iu_urok_def.theclassnum=iu_clsinfoid
group by iud_predmet.name, iud_predmet.predmeticon,iud_predmet.prefix,iu_clsinfo.name ,iu_clsinfo.sequence
order by iud_predmet.name, iu_clsinfo.sequence
$$
*/

drop procedure sp_getsubjects
$$
create procedure sp_getsubjects(acurseesion binary(16)) 
begin
	select count(*) cnt, iud_predmet.name predmet, iud_predmet.predmeticon icon,iud_predmet.prefix ,iu_clsinfo.name theclass 
    from  iu_urok_def 
	join iud_predmet on iu_urok_def.subject=iud_predmetid
	join iu_clsinfo on iu_urok_def.theclassnum=iu_clsinfoid
    join instance on iu_urok_def.instanceid=instance.instanceid and instance.archived=0
   join iu_urok_prc on iu_urok_prc.theprocess =iu_urok_def.iu_urok_defid
    where iu_urok_access_f(b2g(acurseesion) ,b2g(iu_urok_def.instanceid))=1  and iu_urok_prc.isdone=0
		group by iud_predmet.name ,iu_clsinfo.sequence, iu_clsinfo.name,iud_predmet.predmeticon,iud_predmet.prefix
	order by iud_predmet.name, iu_clsinfo.sequence;
end
$$
drop procedure sp_getteachers
$$
create procedure sp_getteachers(acurseesion binary(16)) 
begin
		select count(*) cnt, concat( ifnull(iu_tmdef.lastname,'?') ,' ', left(  ifnull(iu_tmdef.name,'?') ,1)  , '. ' , left( ifnull(iu_tmdef.surname,'?'),1)    ,'.'  ) teacher,
    iu_tmdef_brief_f(iu_tmdef.iu_tmdefid,null) brief
    from  iu_urok_def 
	join iu_tmdef on iu_urok_def.theteacher=iu_tmdefid
    join iu_urok_prc on iu_urok_prc.theprocess =iu_urok_def.iu_urok_defid
	join instance on iu_urok_def.instanceid=instance.instanceid and instance.archived=0
    where iu_urok_access_f(b2g(acurseesion) ,b2g(iu_urok_def.instanceid))=1 and iu_urok_prc.isdone=0
		group by teacher
	order by teacher;
end




$$

drop procedure sp_getsubjectsarch
$$
create procedure sp_getsubjectsarch(acurseesion binary(16)) 
begin
	select count(*) cnt, iud_predmet.name predmet, iud_predmet.predmeticon icon,iud_predmet.prefix ,iu_clsinfo.name theclass 
    from  iu_urok_def 
	join iud_predmet on iu_urok_def.subject=iud_predmetid
	join iu_clsinfo on iu_urok_def.theclassnum=iu_clsinfoid
    join instance on iu_urok_def.instanceid=instance.instanceid and instance.archived=0
   join iu_urok_prc on iu_urok_prc.theprocess =iu_urok_def.iu_urok_defid
    where /*iu_urok_access_f(b2g(acurseesion) ,b2g(iu_urok_def.instanceid))=1  and  */ iu_urok_prc.isdone in (1,-1)
		group by iud_predmet.name ,iu_clsinfo.sequence, iu_clsinfo.name,iud_predmet.predmeticon,iud_predmet.prefix
	order by iud_predmet.name, iu_clsinfo.sequence;
end
$$
drop procedure sp_getteachersarch
$$
create procedure sp_getteachersarch(acurseesion binary(16)) 
begin
	select count(*) cnt, concat( ifnull(iu_tmdef.lastname,'?') ,' ', left(  ifnull(iu_tmdef.name,'?') ,1)  , '. ' , left( ifnull(iu_tmdef.surname,'?'),1)    ,'.'  ) teacher,
    iu_tmdef_brief_f(iu_tmdef.iu_tmdefid,null) brief
    from  iu_urok_def 
	join iu_tmdef on iu_urok_def.theteacher=iu_tmdefid
    join iu_urok_prc on iu_urok_prc.theprocess =iu_urok_def.iu_urok_defid
	join instance on iu_urok_def.instanceid=instance.instanceid and instance.archived=0
    where /*iu_urok_access_f(b2g(acurseesion) ,b2g(iu_urok_def.instanceid))=1 and */ iu_urok_prc.isdone in (1,-1)
	group by teacher
	order by teacher;
end




$$




create table iu_maxprefix
(
lastprefix integer not null
);
$$
-- insert into iu_maxprefix(lastprefix) values(0);
$$
-- update iu_maxprefix set lastprefix=45;
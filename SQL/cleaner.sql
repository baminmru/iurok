select count(*),objtype from instance group by objtype;

delete from iu_cm_def where theprocess not in (select iu_urok_defid from iu_urok_def);
delete from instance where objtype='iu_cm' and instanceid not in (select instanceid from iu_cm_def);


delete from iu_urok_prc where theprocess not in (select iu_urok_defid from iu_urok_def);
delete from instance where objtype='iu_us' and instanceid not in (select instanceid from iu_urok_prc);


delete from sysrefcache;
delete from syslog;
delete from iu_plevent;
delete from instance where objtype in('iu_urok', 'iu_us','iu_cm')
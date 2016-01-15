select * from sysoptions where value like 'autoiu_urok_def%'
insert into sysoptions(sysoptionsid,name, value,optiontype) values( g2b(uuid()), 'iu_urok_def_arch','autoiu_urok_def_arch','defview' );
insert into sysoptions(sysoptionsid,name, value,optiontype) values( g2b(uuid()), 'iu_urok_def_arch','iu_urok_arch','structtype' );

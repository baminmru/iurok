DELIMITER $$
drop PROCEDURE `iu_urok_initownership`
$$
CREATE  PROCEDURE `iu_urok_initownership`(
 acursession varchar(38),
 ainstanceid varchar(38)
)
body: begin  
 declare aec int;
 select count(*) into aec  from the_session where the_sessionid=g2b(acursession) and closed=0 ;
 if aec=0 then
     leave body;
  end if;

end$$
DELIMITER ;

DELIMITER $$
drop PROCEDURE `iu_t_initownership`
$$
CREATE  PROCEDURE `iu_t_initownership`(
 acursession varchar(38),
 ainstanceid varchar(38)
)
body: begin  
 declare aec int;
 select count(*) into aec  from the_session where the_sessionid=g2b(acursession) and closed=0 ;
 if aec=0 then
     leave body;
  end if;

end$$
DELIMITER ;
DELIMITER $$
drop PROCEDURE `iu_l_initownership`
$$
CREATE  PROCEDURE `iu_l_initownership`(
 acursession varchar(38),
 ainstanceid varchar(38)
)
body: begin  
 declare aec int;
 select count(*) into aec  from the_session where the_sessionid=g2b(acursession) and closed=0 ;
 if aec=0 then
     leave body;
  end if;

end$$
DELIMITER ;
DELIMITER $$
drop PROCEDURE `iu_subs_initownership`
$$
CREATE  PROCEDURE `iu_subs_initownership`(
 acursession varchar(38),
 ainstanceid varchar(38)
)
body: begin  
 declare aec int;
 select count(*) into aec  from the_session where the_sessionid=g2b(acursession) and closed=0 ;
 if aec=0 then
     leave body;
  end if;

end$$
DELIMITER ;



delete from instance where instanceid in (select instanceid from iu_status
 where theprocess not in (select iud_process_defid from iud_process_def) or  theprocess is null);

/*


select * from iu_task where instanceid=	g2b('{7EA593EF-327D-11E4-9402-E8039A0069B7}')

update iu_task set taskfinished=0 , finishdate=null  where instanceid=	g2b('{7EA593EF-327D-11E4-9402-E8039A0069B7}')

*/

<?php
class  M_iu_task extends CI_Model {
    function getRow($empId) {
    $result = array('success' => false, 'msg' => 'No Row ID for retrive data');
	if (!empty($empId)){
	    $res = $this->jservice->get(array('Action' => 'GetRowData','FieldList'=>'B2G(iu_taskid) as iu_taskid, B2G(iu_taskid) as id,B2G(instanceid) as instanceid, iu_task_BRIEF_F(iu_taskid , NULL) as  brief,B2G(doer) doer, iu_u_def_BRIEF_F(doer, NULL) as doer_grid,B2G(contoller) contoller, iu_u_def_BRIEF_F(contoller, NULL) as contoller_grid,subj,  DATE_FORMAT(createdate,\'%Y-%m-%d %H:%i:%s\') as  createdate,  DATE_FORMAT(planenddate,\'%Y-%m-%d %H:%i:%s\') as  planenddate,info,manualtask, case manualtask  when -1 then \'Да\' when 0 then \'Нет\'End  as manualtask_grid,B2G(TheProcess) theprocess, iu_urok_def_BRIEF_F(theprocess, NULL) as theprocess_grid,doer_comment,B2G(doer_states) doer_states, iud_sn_def_BRIEF_F(doer_states, NULL) as doer_states_grid,controller_comment,taskfinished, case taskfinished  when -1 then \'Да\' when 0 then \'Нет\'End  as taskfinished_grid,ischecked, case ischecked  when -1 then \'Да\' when 0 then \'Нет\'End  as ischecked_grid,  DATE_FORMAT(finishdate,\'%Y-%m-%d %H:%i:%s\') as  finishdate,taskcancelled, case taskcancelled  when -1 then \'Да\' when 0 then \'Нет\'End  as taskcancelled_grid,  DATE_FORMAT(senttodoer,\'%Y-%m-%d %H:%i:%s\') as  senttodoer,isdelegated, case isdelegated  when -1 then \'Да\' when 0 then \'Нет\'End  as isdelegated_grid,B2G(ProcessStatus) processstatus, iu_status_BRIEF_F(processstatus, NULL) as processstatus_grid,B2G(StateTask) statetask, iu_statustask_BRIEF_F(statetask, NULL) as statetask_grid,B2G(delegatefrom) delegatefrom, iu_task_BRIEF_F(delegatefrom, NULL) as delegatefrom_grid', 'PartName' => 'iu_task', 'ID' =>  $empId 	));
	    if (!empty($res)) {
	        $result = $res[0];
	    }
	}
	return $result;
    }
    function setRow($data)  {
	    $data = (array)$data;
	if (!empty($data)) {
	    if (empty($data['iu_taskid'])) {
	        $data['iu_taskid'] = $this->jservice->get(array('Action' => 'NewGuid'));
	        $res=$this->jservice->get(array('Action' => 'NewRow', 'PartName' => 'iu_task', 'RowID' => $data['iu_taskid'], 'DocumentID' => $data['instanceid'], 'Values'=>$data));
	       if(isset($res[0])){
	       	if($res[0]->result!='ok'){
	       		return array('success' => FALSE, 'msg' => $res[0]->result);
	       	} 
	       }else{
	       	return array('success' => FALSE, 'msg' => 'Unknown error' );
	       }
	    }else{
	    $res = $this->jservice->get(array('Action' => 'UpdateRow', 'PartName' => 'iu_task', 'RowID' => $data['iu_taskid'], 'DocumentID' => $data['instanceid'], 'Values'=>$data));
	       if(isset($res[0])){
	       	if($res[0]->result!='ok'){
	       		return array('success' => FALSE, 'msg' => $res[0]->result);
	       	} 
	       }else{
	       	return array('success' => FALSE, 'msg' => 'Unknown error' );
	       }
	    }
	    return array('success' => TRUE, 'data' => $this->getRow($data['iu_taskid'] ));
	} else {
	    return array('success' => FALSE, 'msg' => 'No data to store on server');
	}
    }
    function newRow($instanceid,$data)  {
	  $id = $this->jservice->get(array('Action' => 'NewGuid'));
	if ($this->jservice->get(array('Action' => 'NewRow', 'PartName' => 'iu_task', 'RowID' => $id, 'DocumentID' => $instanceid, 'Values'=>$data)) == 'OK') {
	    return array('success' => TRUE, 'data' => $id);
	} else {
	    return array('success' => FALSE, 'msg' => 'Error while create new id');
	}
    }
    function getRows($sort=array())
		{
	    $res = $this->jservice->get(array('Action' => 'GetViewData','Sort'=>$sort,'FieldList'=>'B2G(iu_taskid) as iu_taskid, B2G(iu_taskid) as id,B2G(instanceid) as instanceid, iu_task_BRIEF_F(iu_taskid , NULL) as  brief,B2G(doer) doer, iu_u_def_BRIEF_F(doer, NULL) as doer_grid,B2G(contoller) contoller, iu_u_def_BRIEF_F(contoller, NULL) as contoller_grid,subj,  DATE_FORMAT(createdate,\'%Y-%m-%d %H:%i:%s\') as  createdate,  DATE_FORMAT(planenddate,\'%Y-%m-%d %H:%i:%s\') as  planenddate,info,manualtask, case manualtask  when -1 then \'Да\' when 0 then \'Нет\'End  as manualtask_grid,B2G(TheProcess) theprocess, iu_urok_def_BRIEF_F(theprocess, NULL) as theprocess_grid,doer_comment,B2G(doer_states) doer_states, iud_sn_def_BRIEF_F(doer_states, NULL) as doer_states_grid,controller_comment,taskfinished, case taskfinished  when -1 then \'Да\' when 0 then \'Нет\'End  as taskfinished_grid,ischecked, case ischecked  when -1 then \'Да\' when 0 then \'Нет\'End  as ischecked_grid,  DATE_FORMAT(finishdate,\'%Y-%m-%d %H:%i:%s\') as  finishdate,taskcancelled, case taskcancelled  when -1 then \'Да\' when 0 then \'Нет\'End  as taskcancelled_grid,  DATE_FORMAT(senttodoer,\'%Y-%m-%d %H:%i:%s\') as  senttodoer,isdelegated, case isdelegated  when -1 then \'Да\' when 0 then \'Нет\'End  as isdelegated_grid,B2G(ProcessStatus) processstatus, iu_status_BRIEF_F(processstatus, NULL) as processstatus_grid,B2G(StateTask) statetask, iu_statustask_BRIEF_F(statetask, NULL) as statetask_grid,B2G(delegatefrom) delegatefrom, iu_task_BRIEF_F(delegatefrom, NULL) as delegatefrom_grid', 'ViewName' => 'iu_task'));
	    if (count($res)) {
	        return $res;
	    } else {
	        return null;
	    }
		}
    function getRowsByInstance($id,$sort=array())
		{
	$res = $this->jservice->get(array('Action' => 'GetViewData','Sort'=>$sort,'FieldList'=>'B2G(iu_taskid) as iu_taskid, B2G(iu_taskid) as id,B2G(instanceid) as instanceid, iu_task_BRIEF_F(iu_taskid , NULL) as  brief,B2G(doer) doer, iu_u_def_BRIEF_F(doer, NULL) as doer_grid,B2G(contoller) contoller, iu_u_def_BRIEF_F(contoller, NULL) as contoller_grid,subj,  DATE_FORMAT(createdate,\'%Y-%m-%d %H:%i:%s\') as  createdate,  DATE_FORMAT(planenddate,\'%Y-%m-%d %H:%i:%s\') as  planenddate,info,manualtask, case manualtask  when -1 then \'Да\' when 0 then \'Нет\'End  as manualtask_grid,B2G(TheProcess) theprocess, iu_urok_def_BRIEF_F(theprocess, NULL) as theprocess_grid,doer_comment,B2G(doer_states) doer_states, iud_sn_def_BRIEF_F(doer_states, NULL) as doer_states_grid,controller_comment,taskfinished, case taskfinished  when -1 then \'Да\' when 0 then \'Нет\'End  as taskfinished_grid,ischecked, case ischecked  when -1 then \'Да\' when 0 then \'Нет\'End  as ischecked_grid,  DATE_FORMAT(finishdate,\'%Y-%m-%d %H:%i:%s\') as  finishdate,taskcancelled, case taskcancelled  when -1 then \'Да\' when 0 then \'Нет\'End  as taskcancelled_grid,  DATE_FORMAT(senttodoer,\'%Y-%m-%d %H:%i:%s\') as  senttodoer,isdelegated, case isdelegated  when -1 then \'Да\' when 0 then \'Нет\'End  as isdelegated_grid,B2G(ProcessStatus) processstatus, iu_status_BRIEF_F(processstatus, NULL) as processstatus_grid,B2G(StateTask) statetask, iu_statustask_BRIEF_F(statetask, NULL) as statetask_grid,B2G(delegatefrom) delegatefrom, iu_task_BRIEF_F(delegatefrom, NULL) as delegatefrom_grid', 'ViewName' => 'iu_task', 'WhereClause' => 'instanceid=G2B(\''. $id . '\')'));
	if (count($res) == 0) {
	    return null;
	} else {
	    return $res;
	}
		}
    function getRowsByParent($id,$sort=array())
	{
	$res = $this->jservice->get(array('Action' => 'GetViewData','Sort'=>$sort,'FieldList'=>'B2G(iu_taskid) as iu_taskid, B2G(iu_taskid) as id,B2G(instanceid) as instanceid, iu_task_BRIEF_F(iu_taskid , NULL) as  brief,B2G(doer) doer, iu_u_def_BRIEF_F(doer, NULL) as doer_grid,B2G(contoller) contoller, iu_u_def_BRIEF_F(contoller, NULL) as contoller_grid,subj,  DATE_FORMAT(createdate,\'%Y-%m-%d %H:%i:%s\') as  createdate,  DATE_FORMAT(planenddate,\'%Y-%m-%d %H:%i:%s\') as  planenddate,info,manualtask, case manualtask  when -1 then \'Да\' when 0 then \'Нет\'End  as manualtask_grid,B2G(TheProcess) theprocess, iu_urok_def_BRIEF_F(theprocess, NULL) as theprocess_grid,doer_comment,B2G(doer_states) doer_states, iud_sn_def_BRIEF_F(doer_states, NULL) as doer_states_grid,controller_comment,taskfinished, case taskfinished  when -1 then \'Да\' when 0 then \'Нет\'End  as taskfinished_grid,ischecked, case ischecked  when -1 then \'Да\' when 0 then \'Нет\'End  as ischecked_grid,  DATE_FORMAT(finishdate,\'%Y-%m-%d %H:%i:%s\') as  finishdate,taskcancelled, case taskcancelled  when -1 then \'Да\' when 0 then \'Нет\'End  as taskcancelled_grid,  DATE_FORMAT(senttodoer,\'%Y-%m-%d %H:%i:%s\') as  senttodoer,isdelegated, case isdelegated  when -1 then \'Да\' when 0 then \'Нет\'End  as isdelegated_grid,B2G(ProcessStatus) processstatus, iu_status_BRIEF_F(processstatus, NULL) as processstatus_grid,B2G(StateTask) statetask, iu_statustask_BRIEF_F(statetask, NULL) as statetask_grid,B2G(delegatefrom) delegatefrom, iu_task_BRIEF_F(delegatefrom, NULL) as delegatefrom_grid', 'ViewName' => 'iu_task', 'WhereClause' => ' parentstructrowid=G2B(\''. $id . '\')'));
	if (count($res) == 0) {
	    return null;
	} else {
	    return $res;
	}
  }
    function deleteRow($id = null) {
	  if (!empty($id) && $this->jservice->get(array('Action' => 'DeleteRow', 'PartName' => 'iu_task', 'RowID' => $id)) == 'OK')
	    $result = array('success' => TRUE);
	else
	    $result = array('success' => FALSE, 'msg' => 'Error while deleting record!');
	return $result;
    }
}
?>
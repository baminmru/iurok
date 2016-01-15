
<?php
class  M_iu_subsribe extends CI_Model {
    function getRowTemp($empId) {
    $result = array('success' => false, 'msg' => 'No Row ID for retrive data');
	if (!empty($empId)){
	    $res = $this->jservice->get(array('Action' => 'GetRowDataTemp','FieldList'=>'B2G(iu_subsribeid) as iu_subsribeid, B2G(iu_subsribeid) as id,B2G(instanceid) as instanceid, iu_subsribe_BRIEF_F(iu_subsribeid , NULL) as  brief,B2G(theVideo) thevideo, iu_urok_video_BRIEF_F(thevideo, NULL) as thevideo_grid,B2G(StateTask) statetask, iu_task_BRIEF_F(statetask, NULL) as statetask_grid,B2G(TheProcess) theprocess, iu_urok_def_BRIEF_F(theprocess, NULL) as theprocess_grid,B2G(theDoc) thedoc, iu_urok_docs_BRIEF_F(thedoc, NULL) as thedoc_grid,B2G(ProcessStatus) processstatus, iu_status_BRIEF_F(processstatus, NULL) as processstatus_grid,isactive, case isactive  when -1 then \'Да\' when 0 then \'Нет\'End  as isactive_grid,eventtype,B2G(subscriber) subscriber, iu_u_def_BRIEF_F(subscriber, NULL) as subscriber_grid,B2G(theDiscussion) thediscussion, iu_cm_def_BRIEF_F(thediscussion, NULL) as thediscussion_grid,B2G(doer) doer, iu_u_def_BRIEF_F(doer, NULL) as doer_grid,  DATE_FORMAT(scandate,\'%Y-%m-%d %H:%i:%s\') as  scandate', 'PartName' => 'iu_subsribe', 'ID' =>  $empId 	));
	    if (!empty($res)) {
	        $result = $res[0];
	    }
	}
	return $result;
    }
    function getRow($empId) {
    $result = array('success' => false, 'msg' => 'No Row ID for retrive data');
	if (!empty($empId)){
	    $res = $this->jservice->get(array('Action' => 'GetRowData','FieldList'=>'B2G(iu_subsribeid) as iu_subsribeid, B2G(iu_subsribeid) as id,B2G(instanceid) as instanceid, iu_subsribe_BRIEF_F(iu_subsribeid , NULL) as  brief,B2G(theVideo) thevideo, iu_urok_video_BRIEF_F(thevideo, NULL) as thevideo_grid,B2G(StateTask) statetask, iu_task_BRIEF_F(statetask, NULL) as statetask_grid,B2G(TheProcess) theprocess, iu_urok_def_BRIEF_F(theprocess, NULL) as theprocess_grid,B2G(theDoc) thedoc, iu_urok_docs_BRIEF_F(thedoc, NULL) as thedoc_grid,B2G(ProcessStatus) processstatus, iu_status_BRIEF_F(processstatus, NULL) as processstatus_grid,isactive, case isactive  when -1 then \'Да\' when 0 then \'Нет\'End  as isactive_grid,eventtype,B2G(subscriber) subscriber, iu_u_def_BRIEF_F(subscriber, NULL) as subscriber_grid,B2G(theDiscussion) thediscussion, iu_cm_def_BRIEF_F(thediscussion, NULL) as thediscussion_grid,B2G(doer) doer, iu_u_def_BRIEF_F(doer, NULL) as doer_grid,  DATE_FORMAT(scandate,\'%Y-%m-%d %H:%i:%s\') as  scandate', 'PartName' => 'iu_subsribe', 'ID' =>  $empId 	));
	    if (!empty($res)) {
	        $result = $res[0];
	    }
	}
	return $result;
    }
    function setRow($data)  {
	    $data = (array)$data;
	if (!empty($data)) {
	    if (empty($data['iu_subsribeid'])) {
	        $data['iu_subsribeid'] = $this->jservice->get(array('Action' => 'NewGuid'));
	        $res=$this->jservice->get(array('Action' => 'NewRow', 'PartName' => 'iu_subsribe', 'RowID' => $data['iu_subsribeid'], 'DocumentID' => $data['instanceid'], 'Values'=>$data));
	       if(isset($res[0])){
	       	if($res[0]->result!='ok'){
	       		return array('success' => FALSE, 'msg' => $res[0]->result);
	       	} 
	       }else{
	       	return array('success' => FALSE, 'msg' => 'Unknown error' );
	       }
	    }else{
	    $res = $this->jservice->get(array('Action' => 'UpdateRow', 'PartName' => 'iu_subsribe', 'RowID' => $data['iu_subsribeid'], 'DocumentID' => $data['instanceid'], 'Values'=>$data));
	       if(isset($res[0])){
	       	if($res[0]->result!='ok'){
	       		return array('success' => FALSE, 'msg' => $res[0]->result);
	       	} 
	       }else{
	       	return array('success' => FALSE, 'msg' => 'Unknown error' );
	       }
	    }
	    return array('success' => TRUE, 'data' => $this->getRowTemp($data['iu_subsribeid'] ));
	} else {
	    return array('success' => FALSE, 'msg' => 'No data to store on server');
	}
    }
    function newRow($instanceid,$data)  {
	  $id = $this->jservice->get(array('Action' => 'NewGuid'));
	if ($this->jservice->get(array('Action' => 'NewRow', 'PartName' => 'iu_subsribe', 'RowID' => $id, 'DocumentID' => $instanceid, 'Values'=>$data)) == 'OK') {
	    return array('success' => TRUE, 'data' => $id);
	} else {
	    return array('success' => FALSE, 'msg' => 'Error while create new id');
	}
    }
    function getRowsTemp($sort=array())
		{
	    $res = $this->jservice->get(array('Action' => 'GetViewDataTemp','Sort'=>$sort,'FieldList'=>'B2G(iu_subsribeid) as iu_subsribeid, B2G(iu_subsribeid) as id,B2G(instanceid) as instanceid, iu_subsribe_BRIEF_F(iu_subsribeid , NULL) as  brief,B2G(theVideo) thevideo, iu_urok_video_BRIEF_F(thevideo, NULL) as thevideo_grid,B2G(StateTask) statetask, iu_task_BRIEF_F(statetask, NULL) as statetask_grid,B2G(TheProcess) theprocess, iu_urok_def_BRIEF_F(theprocess, NULL) as theprocess_grid,B2G(theDoc) thedoc, iu_urok_docs_BRIEF_F(thedoc, NULL) as thedoc_grid,B2G(ProcessStatus) processstatus, iu_status_BRIEF_F(processstatus, NULL) as processstatus_grid,isactive, case isactive  when -1 then \'Да\' when 0 then \'Нет\'End  as isactive_grid,eventtype,B2G(subscriber) subscriber, iu_u_def_BRIEF_F(subscriber, NULL) as subscriber_grid,B2G(theDiscussion) thediscussion, iu_cm_def_BRIEF_F(thediscussion, NULL) as thediscussion_grid,B2G(doer) doer, iu_u_def_BRIEF_F(doer, NULL) as doer_grid,  DATE_FORMAT(scandate,\'%Y-%m-%d %H:%i:%s\') as  scandate', 'ViewName' => 'iu_subsribe'));
	    if (count($res)) {
	        return $res;
	    } else {
	        return null;
	    }
		}
    function getRowsByInstanceTemp($id,$sort=array())
		{
	$res = $this->jservice->get(array('Action' => 'GetViewDataTemp','Sort'=>$sort,'FieldList'=>'B2G(iu_subsribeid) as iu_subsribeid, B2G(iu_subsribeid) as id,B2G(instanceid) as instanceid, iu_subsribe_BRIEF_F(iu_subsribeid , NULL) as  brief,B2G(theVideo) thevideo, iu_urok_video_BRIEF_F(thevideo, NULL) as thevideo_grid,B2G(StateTask) statetask, iu_task_BRIEF_F(statetask, NULL) as statetask_grid,B2G(TheProcess) theprocess, iu_urok_def_BRIEF_F(theprocess, NULL) as theprocess_grid,B2G(theDoc) thedoc, iu_urok_docs_BRIEF_F(thedoc, NULL) as thedoc_grid,B2G(ProcessStatus) processstatus, iu_status_BRIEF_F(processstatus, NULL) as processstatus_grid,isactive, case isactive  when -1 then \'Да\' when 0 then \'Нет\'End  as isactive_grid,eventtype,B2G(subscriber) subscriber, iu_u_def_BRIEF_F(subscriber, NULL) as subscriber_grid,B2G(theDiscussion) thediscussion, iu_cm_def_BRIEF_F(thediscussion, NULL) as thediscussion_grid,B2G(doer) doer, iu_u_def_BRIEF_F(doer, NULL) as doer_grid,  DATE_FORMAT(scandate,\'%Y-%m-%d %H:%i:%s\') as  scandate', 'ViewName' => 'iu_subsribe', 'WhereClause' => 'instanceid=G2B(\''. $id . '\')'));
	if (count($res) == 0) {
	    return null;
	} else {
	    return $res;
	}
		}
    function getRowsByParentTemp($id,$sort=array())
	{
	$res = $this->jservice->get(array('Action' => 'GetViewDataTemp','Sort'=>$sort,'FieldList'=>'B2G(iu_subsribeid) as iu_subsribeid, B2G(iu_subsribeid) as id,B2G(instanceid) as instanceid, iu_subsribe_BRIEF_F(iu_subsribeid , NULL) as  brief,B2G(theVideo) thevideo, iu_urok_video_BRIEF_F(thevideo, NULL) as thevideo_grid,B2G(StateTask) statetask, iu_task_BRIEF_F(statetask, NULL) as statetask_grid,B2G(TheProcess) theprocess, iu_urok_def_BRIEF_F(theprocess, NULL) as theprocess_grid,B2G(theDoc) thedoc, iu_urok_docs_BRIEF_F(thedoc, NULL) as thedoc_grid,B2G(ProcessStatus) processstatus, iu_status_BRIEF_F(processstatus, NULL) as processstatus_grid,isactive, case isactive  when -1 then \'Да\' when 0 then \'Нет\'End  as isactive_grid,eventtype,B2G(subscriber) subscriber, iu_u_def_BRIEF_F(subscriber, NULL) as subscriber_grid,B2G(theDiscussion) thediscussion, iu_cm_def_BRIEF_F(thediscussion, NULL) as thediscussion_grid,B2G(doer) doer, iu_u_def_BRIEF_F(doer, NULL) as doer_grid,  DATE_FORMAT(scandate,\'%Y-%m-%d %H:%i:%s\') as  scandate', 'ViewName' => 'iu_subsribe', 'WhereClause' => ' parentstructrowid=G2B(\''. $id . '\')'));
	if (count($res) == 0) {
	    return null;
	} else {
	    return $res;
	}
  }
    function getRows($sort=array())
		{
	    $res = $this->jservice->get(array('Action' => 'GetViewData','Sort'=>$sort,'FieldList'=>'B2G(iu_subsribeid) as iu_subsribeid, B2G(iu_subsribeid) as id,B2G(instanceid) as instanceid, iu_subsribe_BRIEF_F(iu_subsribeid , NULL) as  brief,B2G(theVideo) thevideo, iu_urok_video_BRIEF_F(thevideo, NULL) as thevideo_grid,B2G(StateTask) statetask, iu_task_BRIEF_F(statetask, NULL) as statetask_grid,B2G(TheProcess) theprocess, iu_urok_def_BRIEF_F(theprocess, NULL) as theprocess_grid,B2G(theDoc) thedoc, iu_urok_docs_BRIEF_F(thedoc, NULL) as thedoc_grid,B2G(ProcessStatus) processstatus, iu_status_BRIEF_F(processstatus, NULL) as processstatus_grid,isactive, case isactive  when -1 then \'Да\' when 0 then \'Нет\'End  as isactive_grid,eventtype,B2G(subscriber) subscriber, iu_u_def_BRIEF_F(subscriber, NULL) as subscriber_grid,B2G(theDiscussion) thediscussion, iu_cm_def_BRIEF_F(thediscussion, NULL) as thediscussion_grid,B2G(doer) doer, iu_u_def_BRIEF_F(doer, NULL) as doer_grid,  DATE_FORMAT(scandate,\'%Y-%m-%d %H:%i:%s\') as  scandate', 'ViewName' => 'iu_subsribe'));
	    if (count($res)) {
	        return $res;
	    } else {
	        return null;
	    }
		}
    function getRowsByInstance($id,$sort=array())
		{
	$res = $this->jservice->get(array('Action' => 'GetViewData','Sort'=>$sort,'FieldList'=>'B2G(iu_subsribeid) as iu_subsribeid, B2G(iu_subsribeid) as id,B2G(instanceid) as instanceid, iu_subsribe_BRIEF_F(iu_subsribeid , NULL) as  brief,B2G(theVideo) thevideo, iu_urok_video_BRIEF_F(thevideo, NULL) as thevideo_grid,B2G(StateTask) statetask, iu_task_BRIEF_F(statetask, NULL) as statetask_grid,B2G(TheProcess) theprocess, iu_urok_def_BRIEF_F(theprocess, NULL) as theprocess_grid,B2G(theDoc) thedoc, iu_urok_docs_BRIEF_F(thedoc, NULL) as thedoc_grid,B2G(ProcessStatus) processstatus, iu_status_BRIEF_F(processstatus, NULL) as processstatus_grid,isactive, case isactive  when -1 then \'Да\' when 0 then \'Нет\'End  as isactive_grid,eventtype,B2G(subscriber) subscriber, iu_u_def_BRIEF_F(subscriber, NULL) as subscriber_grid,B2G(theDiscussion) thediscussion, iu_cm_def_BRIEF_F(thediscussion, NULL) as thediscussion_grid,B2G(doer) doer, iu_u_def_BRIEF_F(doer, NULL) as doer_grid,  DATE_FORMAT(scandate,\'%Y-%m-%d %H:%i:%s\') as  scandate', 'ViewName' => 'iu_subsribe', 'WhereClause' => 'instanceid=G2B(\''. $id . '\')'));
	if (count($res) == 0) {
	    return null;
	} else {
	    return $res;
	}
		}
    function getRowsByParent($id,$sort=array())
	{
	$res = $this->jservice->get(array('Action' => 'GetViewData','Sort'=>$sort,'FieldList'=>'B2G(iu_subsribeid) as iu_subsribeid, B2G(iu_subsribeid) as id,B2G(instanceid) as instanceid, iu_subsribe_BRIEF_F(iu_subsribeid , NULL) as  brief,B2G(theVideo) thevideo, iu_urok_video_BRIEF_F(thevideo, NULL) as thevideo_grid,B2G(StateTask) statetask, iu_task_BRIEF_F(statetask, NULL) as statetask_grid,B2G(TheProcess) theprocess, iu_urok_def_BRIEF_F(theprocess, NULL) as theprocess_grid,B2G(theDoc) thedoc, iu_urok_docs_BRIEF_F(thedoc, NULL) as thedoc_grid,B2G(ProcessStatus) processstatus, iu_status_BRIEF_F(processstatus, NULL) as processstatus_grid,isactive, case isactive  when -1 then \'Да\' when 0 then \'Нет\'End  as isactive_grid,eventtype,B2G(subscriber) subscriber, iu_u_def_BRIEF_F(subscriber, NULL) as subscriber_grid,B2G(theDiscussion) thediscussion, iu_cm_def_BRIEF_F(thediscussion, NULL) as thediscussion_grid,B2G(doer) doer, iu_u_def_BRIEF_F(doer, NULL) as doer_grid,  DATE_FORMAT(scandate,\'%Y-%m-%d %H:%i:%s\') as  scandate', 'ViewName' => 'iu_subsribe', 'WhereClause' => ' parentstructrowid=G2B(\''. $id . '\')'));
	if (count($res) == 0) {
	    return null;
	} else {
	    return $res;
	}
  }
    function deleteRow($id = null) {
	  if (!empty($id) && $this->jservice->get(array('Action' => 'DeleteRow', 'PartName' => 'iu_subsribe', 'RowID' => $id)) == 'OK')
	    $result = array('success' => TRUE);
	else
	    $result = array('success' => FALSE, 'msg' => 'Error while deleting record!');
	return $result;
    }
}
?>
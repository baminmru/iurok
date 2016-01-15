
<?php
class  M_mtz2job_def extends CI_Model {
    function getRow($empId) {
    $result = array('success' => false, 'msg' => 'No Row ID for retrive data');
	if (!empty($empId)){
	    $res = $this->jservice->get(array('Action' => 'GetRowData','FieldList'=>'B2G(mtz2job_defid) as mtz2job_defid, B2G(mtz2job_defid) as id,B2G(instanceid) as instanceid, MTZ2JOB_DEF_BRIEF_F(mtz2job_defid , NULL) as  brief,nextstate,thrustate,B2G(ThruObject) thruobject,INSTANCE_BRIEF_F(thruobject, NULL) as  thruobject_grid,eventype,  DATE_FORMAT(eventdate,\'%Y-%m-%d %H:%i:%s\') as  eventdate,  DATE_FORMAT(processdate,\'%Y-%m-%d %H:%i:%s\') as  processdate,processed, case processed  when -1 then \'Да\' when 0 then \'Нет\'End  as processed_grid', 'PartName' => 'mtz2job_def', 'ID' =>  $empId 	));
	    if (!empty($res)) {
	        $result = $res[0];
	    }
	}
	return $result;
    }
    function setRow($data)  {
	    $data = (array)$data;
	if (!empty($data)) {
	    if (empty($data['mtz2job_defid'])) {
	        $data['mtz2job_defid'] = $this->jservice->get(array('Action' => 'NewGuid'));
	        $res=$this->jservice->get(array('Action' => 'NewRow', 'PartName' => 'mtz2job_def', 'RowID' => $data['mtz2job_defid'], 'DocumentID' => $data['instanceid'], 'Values'=>$data));
	       if(isset($res[0])){
	       	if($res[0]->result!='ok'){
	       		return array('success' => FALSE, 'msg' => $res[0]->result);
	       	} 
	       }else{
	       	return array('success' => FALSE, 'msg' => 'Unknown error' );
	       }
	    }else{
	    $res = $this->jservice->get(array('Action' => 'UpdateRow', 'PartName' => 'mtz2job_def', 'RowID' => $data['mtz2job_defid'], 'DocumentID' => $data['instanceid'], 'Values'=>$data));
	       if(isset($res[0])){
	       	if($res[0]->result!='ok'){
	       		return array('success' => FALSE, 'msg' => $res[0]->result);
	       	} 
	       }else{
	       	return array('success' => FALSE, 'msg' => 'Unknown error' );
	       }
	    }
	    return array('success' => TRUE, 'data' => $this->getRow($data['mtz2job_defid'] ));
	} else {
	    return array('success' => FALSE, 'msg' => 'No data to store on server');
	}
    }
    function newRow($instanceid,$data)  {
	  $id = $this->jservice->get(array('Action' => 'NewGuid'));
	if ($this->jservice->get(array('Action' => 'NewRow', 'PartName' => 'mtz2job_def', 'RowID' => $id, 'DocumentID' => $instanceid, 'Values'=>$data)) == 'OK') {
	    return array('success' => TRUE, 'data' => $id);
	} else {
	    return array('success' => FALSE, 'msg' => 'Error while create new id');
	}
    }
    function getRows($sort=array())
		{
	    $res = $this->jservice->get(array('Action' => 'GetViewData','Sort'=>$sort,'FieldList'=>'B2G(mtz2job_defid) as mtz2job_defid, B2G(mtz2job_defid) as id,B2G(instanceid) as instanceid, MTZ2JOB_DEF_BRIEF_F(mtz2job_defid , NULL) as  brief,nextstate,thrustate,B2G(ThruObject) thruobject,INSTANCE_BRIEF_F(thruobject, NULL) as  thruobject_grid,eventype,  DATE_FORMAT(eventdate,\'%Y-%m-%d %H:%i:%s\') as  eventdate,  DATE_FORMAT(processdate,\'%Y-%m-%d %H:%i:%s\') as  processdate,processed, case processed  when -1 then \'Да\' when 0 then \'Нет\'End  as processed_grid', 'ViewName' => 'mtz2job_def'));
	    if (count($res)) {
	        return $res;
	    } else {
	        return null;
	    }
		}
    function getRowsByInstance($id,$sort=array())
		{
	$res = $this->jservice->get(array('Action' => 'GetViewData','Sort'=>$sort,'FieldList'=>'B2G(mtz2job_defid) as mtz2job_defid, B2G(mtz2job_defid) as id,B2G(instanceid) as instanceid, MTZ2JOB_DEF_BRIEF_F(mtz2job_defid , NULL) as  brief,nextstate,thrustate,B2G(ThruObject) thruobject,INSTANCE_BRIEF_F(thruobject, NULL) as  thruobject_grid,eventype,  DATE_FORMAT(eventdate,\'%Y-%m-%d %H:%i:%s\') as  eventdate,  DATE_FORMAT(processdate,\'%Y-%m-%d %H:%i:%s\') as  processdate,processed, case processed  when -1 then \'Да\' when 0 then \'Нет\'End  as processed_grid', 'ViewName' => 'mtz2job_def', 'WhereClause' => 'instanceid=G2B(\''. $id . '\')'));
	if (count($res) == 0) {
	    return null;
	} else {
	    return $res;
	}
		}
    function getRowsByParent($id,$sort=array())
	{
	$res = $this->jservice->get(array('Action' => 'GetViewData','Sort'=>$sort,'FieldList'=>'B2G(mtz2job_defid) as mtz2job_defid, B2G(mtz2job_defid) as id,B2G(instanceid) as instanceid, MTZ2JOB_DEF_BRIEF_F(mtz2job_defid , NULL) as  brief,nextstate,thrustate,B2G(ThruObject) thruobject,INSTANCE_BRIEF_F(thruobject, NULL) as  thruobject_grid,eventype,  DATE_FORMAT(eventdate,\'%Y-%m-%d %H:%i:%s\') as  eventdate,  DATE_FORMAT(processdate,\'%Y-%m-%d %H:%i:%s\') as  processdate,processed, case processed  when -1 then \'Да\' when 0 then \'Нет\'End  as processed_grid', 'ViewName' => 'mtz2job_def', 'WhereClause' => ' parentstructrowid=G2B(\''. $id . '\')'));
	if (count($res) == 0) {
	    return null;
	} else {
	    return $res;
	}
  }
    function deleteRow($id = null) {
	  if (!empty($id) && $this->jservice->get(array('Action' => 'DeleteRow', 'PartName' => 'mtz2job_def', 'RowID' => $id)) == 'OK')
	    $result = array('success' => TRUE);
	else
	    $result = array('success' => FALSE, 'msg' => 'Error while deleting record!');
	return $result;
    }
}
?>

<?php
class  M_iu_statustask extends CI_Model {
    function getRow($empId) {
    $result = array('success' => false, 'msg' => 'No Row ID for retrive data');
	if (!empty($empId)){
	    $res = $this->jservice->get(array('Action' => 'GetRowData','FieldList'=>'B2G(iu_statustaskid) as iu_statustaskid, B2G(iu_statustaskid) as id,B2G(instanceid) as instanceid, iu_statustask_BRIEF_F(iu_statustaskid , NULL) as  brief,name,B2G(doertype) doertype, iu_crole_BRIEF_F(doertype, NULL) as doertype_grid,duration_plan,info,B2G(contoller) contoller, iu_crole_BRIEF_F(contoller, NULL) as contoller_grid,B2G(StatusOnClose) statusonclose, iud_sn_def_BRIEF_F(statusonclose, NULL) as statusonclose_grid,possiblestatuses, iud_sn_def_MREF_F(possiblestatuses, NULL) as  possiblestatuses_grid,finishallowed, case finishallowed  when -1 then \'Да\' when 0 then \'Нет\'End  as finishallowed_grid,tasksequence,afterall, case afterall  when -1 then \'Да\' when 0 then \'Нет\'End  as afterall_grid', 'PartName' => 'iu_statustask', 'ID' =>  $empId 	));
	    if (!empty($res)) {
	        $result = $res[0];
	    }
	}
	return $result;
    }
    function setRow($data)  {
	    $data = (array)$data;
	if (!empty($data)) {
	    if (empty($data['iu_statustaskid'])) {
	        $data['iu_statustaskid'] = $this->jservice->get(array('Action' => 'NewGuid'));
	        $res=$this->jservice->get(array('Action' => 'NewRow', 'PartName' => 'iu_statustask', 'RowID' => $data['iu_statustaskid'], 'DocumentID' => $data['instanceid'], 'Values'=>$data));
	       if(isset($res[0])){
	       	if($res[0]->result!='ok'){
	       		return array('success' => FALSE, 'msg' => $res[0]->result);
	       	} 
	       }else{
	       	return array('success' => FALSE, 'msg' => 'Unknown error' );
	       }
	    }else{
	    $res = $this->jservice->get(array('Action' => 'UpdateRow', 'PartName' => 'iu_statustask', 'RowID' => $data['iu_statustaskid'], 'DocumentID' => $data['instanceid'], 'Values'=>$data));
	       if(isset($res[0])){
	       	if($res[0]->result!='ok'){
	       		return array('success' => FALSE, 'msg' => $res[0]->result);
	       	} 
	       }else{
	       	return array('success' => FALSE, 'msg' => 'Unknown error' );
	       }
	    }
	    return array('success' => TRUE, 'data' => $this->getRow($data['iu_statustaskid'] ));
	} else {
	    return array('success' => FALSE, 'msg' => 'No data to store on server');
	}
    }
    function newRow($instanceid,$data)  {
	  $id = $this->jservice->get(array('Action' => 'NewGuid'));
	if ($this->jservice->get(array('Action' => 'NewRow', 'PartName' => 'iu_statustask', 'RowID' => $id, 'DocumentID' => $instanceid, 'Values'=>$data)) == 'OK') {
	    return array('success' => TRUE, 'data' => $id);
	} else {
	    return array('success' => FALSE, 'msg' => 'Error while create new id');
	}
    }
    function getRows($sort=array())
		{
	    $res = $this->jservice->get(array('Action' => 'GetViewData','Sort'=>$sort,'FieldList'=>'B2G(iu_statustaskid) as iu_statustaskid, B2G(iu_statustaskid) as id,B2G(instanceid) as instanceid, iu_statustask_BRIEF_F(iu_statustaskid , NULL) as  brief,name,B2G(doertype) doertype, iu_crole_BRIEF_F(doertype, NULL) as doertype_grid,duration_plan,info,B2G(contoller) contoller, iu_crole_BRIEF_F(contoller, NULL) as contoller_grid,B2G(StatusOnClose) statusonclose, iud_sn_def_BRIEF_F(statusonclose, NULL) as statusonclose_grid,possiblestatuses, iud_sn_def_MREF_F(possiblestatuses, NULL) as  possiblestatuses_grid,finishallowed, case finishallowed  when -1 then \'Да\' when 0 then \'Нет\'End  as finishallowed_grid,tasksequence,afterall, case afterall  when -1 then \'Да\' when 0 then \'Нет\'End  as afterall_grid', 'ViewName' => 'iu_statustask'));
	    if (count($res)) {
	        return $res;
	    } else {
	        return null;
	    }
		}
    function getRowsByInstance($id,$sort=array())
		{
	$res = $this->jservice->get(array('Action' => 'GetViewData','Sort'=>$sort,'FieldList'=>'B2G(iu_statustaskid) as iu_statustaskid, B2G(iu_statustaskid) as id,B2G(instanceid) as instanceid, iu_statustask_BRIEF_F(iu_statustaskid , NULL) as  brief,name,B2G(doertype) doertype, iu_crole_BRIEF_F(doertype, NULL) as doertype_grid,duration_plan,info,B2G(contoller) contoller, iu_crole_BRIEF_F(contoller, NULL) as contoller_grid,B2G(StatusOnClose) statusonclose, iud_sn_def_BRIEF_F(statusonclose, NULL) as statusonclose_grid,possiblestatuses, iud_sn_def_MREF_F(possiblestatuses, NULL) as  possiblestatuses_grid,finishallowed, case finishallowed  when -1 then \'Да\' when 0 then \'Нет\'End  as finishallowed_grid,tasksequence,afterall, case afterall  when -1 then \'Да\' when 0 then \'Нет\'End  as afterall_grid', 'ViewName' => 'iu_statustask', 'WhereClause' => 'instanceid=G2B(\''. $id . '\')'));
	if (count($res) == 0) {
	    return null;
	} else {
	    return $res;
	}
		}
    function getRowsByParent($id,$sort=array())
	{
	$res = $this->jservice->get(array('Action' => 'GetViewData','Sort'=>$sort,'FieldList'=>'B2G(iu_statustaskid) as iu_statustaskid, B2G(iu_statustaskid) as id,B2G(instanceid) as instanceid, iu_statustask_BRIEF_F(iu_statustaskid , NULL) as  brief,name,B2G(doertype) doertype, iu_crole_BRIEF_F(doertype, NULL) as doertype_grid,duration_plan,info,B2G(contoller) contoller, iu_crole_BRIEF_F(contoller, NULL) as contoller_grid,B2G(StatusOnClose) statusonclose, iud_sn_def_BRIEF_F(statusonclose, NULL) as statusonclose_grid,possiblestatuses, iud_sn_def_MREF_F(possiblestatuses, NULL) as  possiblestatuses_grid,finishallowed, case finishallowed  when -1 then \'Да\' when 0 then \'Нет\'End  as finishallowed_grid,tasksequence,afterall, case afterall  when -1 then \'Да\' when 0 then \'Нет\'End  as afterall_grid', 'ViewName' => 'iu_statustask', 'WhereClause' => ' parentstructrowid=G2B(\''. $id . '\')'));
	if (count($res) == 0) {
	    return null;
	} else {
	    return $res;
	}
  }
    function deleteRow($id = null) {
	  if (!empty($id) && $this->jservice->get(array('Action' => 'DeleteRow', 'PartName' => 'iu_statustask', 'RowID' => $id)) == 'OK')
	    $result = array('success' => TRUE);
	else
	    $result = array('success' => FALSE, 'msg' => 'Error while deleting record!');
	return $result;
    }
}
?>
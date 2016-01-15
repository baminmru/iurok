
<?php
class  M_iu_statusnext extends CI_Model {
    function getRow($empId) {
    $result = array('success' => false, 'msg' => 'No Row ID for retrive data');
	if (!empty($empId)){
	    $res = $this->jservice->get(array('Action' => 'GetRowData','FieldList'=>'B2G(iu_statusnextid) as iu_statusnextid, B2G(iu_statusnextid) as id,B2G(instanceid) as instanceid, iu_statusnext_BRIEF_F(iu_statusnextid , NULL) as  brief,B2G(nextstatus) nextstatus, iu_status_BRIEF_F(nextstatus, NULL) as nextstatus_grid,B2G(StatusAfter) statusafter, iud_sn_def_BRIEF_F(statusafter, NULL) as statusafter_grid', 'PartName' => 'iu_statusnext', 'ID' =>  $empId 	));
	    if (!empty($res)) {
	        $result = $res[0];
	    }
	}
	return $result;
    }
    function setRow($data)  {
	    $data = (array)$data;
	if (!empty($data)) {
	    if (empty($data['iu_statusnextid'])) {
	        $data['iu_statusnextid'] = $this->jservice->get(array('Action' => 'NewGuid'));
	        $res=$this->jservice->get(array('Action' => 'NewRow', 'PartName' => 'iu_statusnext', 'RowID' => $data['iu_statusnextid'], 'DocumentID' => $data['instanceid'], 'Values'=>$data));
	       if(isset($res[0])){
	       	if($res[0]->result!='ok'){
	       		return array('success' => FALSE, 'msg' => $res[0]->result);
	       	} 
	       }else{
	       	return array('success' => FALSE, 'msg' => 'Unknown error' );
	       }
	    }else{
	    $res = $this->jservice->get(array('Action' => 'UpdateRow', 'PartName' => 'iu_statusnext', 'RowID' => $data['iu_statusnextid'], 'DocumentID' => $data['instanceid'], 'Values'=>$data));
	       if(isset($res[0])){
	       	if($res[0]->result!='ok'){
	       		return array('success' => FALSE, 'msg' => $res[0]->result);
	       	} 
	       }else{
	       	return array('success' => FALSE, 'msg' => 'Unknown error' );
	       }
	    }
	    return array('success' => TRUE, 'data' => $this->getRow($data['iu_statusnextid'] ));
	} else {
	    return array('success' => FALSE, 'msg' => 'No data to store on server');
	}
    }
    function newRow($instanceid,$data)  {
	  $id = $this->jservice->get(array('Action' => 'NewGuid'));
	if ($this->jservice->get(array('Action' => 'NewRow', 'PartName' => 'iu_statusnext', 'RowID' => $id, 'DocumentID' => $instanceid, 'Values'=>$data)) == 'OK') {
	    return array('success' => TRUE, 'data' => $id);
	} else {
	    return array('success' => FALSE, 'msg' => 'Error while create new id');
	}
    }
    function getRows($sort=array())
		{
	    $res = $this->jservice->get(array('Action' => 'GetViewData','Sort'=>$sort,'FieldList'=>'B2G(iu_statusnextid) as iu_statusnextid, B2G(iu_statusnextid) as id,B2G(instanceid) as instanceid, iu_statusnext_BRIEF_F(iu_statusnextid , NULL) as  brief,B2G(nextstatus) nextstatus, iu_status_BRIEF_F(nextstatus, NULL) as nextstatus_grid,B2G(StatusAfter) statusafter, iud_sn_def_BRIEF_F(statusafter, NULL) as statusafter_grid', 'ViewName' => 'iu_statusnext'));
	    if (count($res)) {
	        return $res;
	    } else {
	        return null;
	    }
		}
    function getRowsByInstance($id,$sort=array())
		{
	$res = $this->jservice->get(array('Action' => 'GetViewData','Sort'=>$sort,'FieldList'=>'B2G(iu_statusnextid) as iu_statusnextid, B2G(iu_statusnextid) as id,B2G(instanceid) as instanceid, iu_statusnext_BRIEF_F(iu_statusnextid , NULL) as  brief,B2G(nextstatus) nextstatus, iu_status_BRIEF_F(nextstatus, NULL) as nextstatus_grid,B2G(StatusAfter) statusafter, iud_sn_def_BRIEF_F(statusafter, NULL) as statusafter_grid', 'ViewName' => 'iu_statusnext', 'WhereClause' => 'instanceid=G2B(\''. $id . '\')'));
	if (count($res) == 0) {
	    return null;
	} else {
	    return $res;
	}
		}
    function getRowsByParent($id,$sort=array())
	{
	$res = $this->jservice->get(array('Action' => 'GetViewData','Sort'=>$sort,'FieldList'=>'B2G(iu_statusnextid) as iu_statusnextid, B2G(iu_statusnextid) as id,B2G(instanceid) as instanceid, iu_statusnext_BRIEF_F(iu_statusnextid , NULL) as  brief,B2G(nextstatus) nextstatus, iu_status_BRIEF_F(nextstatus, NULL) as nextstatus_grid,B2G(StatusAfter) statusafter, iud_sn_def_BRIEF_F(statusafter, NULL) as statusafter_grid', 'ViewName' => 'iu_statusnext', 'WhereClause' => ' parentstructrowid=G2B(\''. $id . '\')'));
	if (count($res) == 0) {
	    return null;
	} else {
	    return $res;
	}
  }
    function deleteRow($id = null) {
	  if (!empty($id) && $this->jservice->get(array('Action' => 'DeleteRow', 'PartName' => 'iu_statusnext', 'RowID' => $id)) == 'OK')
	    $result = array('success' => TRUE);
	else
	    $result = array('success' => FALSE, 'msg' => 'Error while deleting record!');
	return $result;
    }
}
?>
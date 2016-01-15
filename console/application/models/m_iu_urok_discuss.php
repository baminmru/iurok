
<?php
class  M_iu_urok_discuss extends CI_Model {
    function getRow($empId) {
    $result = array('success' => false, 'msg' => 'No Row ID for retrive data');
	if (!empty($empId)){
	    $res = $this->jservice->get(array('Action' => 'GetRowData','FieldList'=>'B2G(iu_urok_discussid) as iu_urok_discussid, B2G(iu_urok_discussid) as id,B2G(instanceid) as instanceid, iu_urok_discuss_BRIEF_F(iu_urok_discussid , NULL) as  brief,  DATE_FORMAT(thedate,\'%Y-%m-%d %H:%i:%s\') as  thedate,B2G(TheAuthor) theauthor, iu_u_def_BRIEF_F(theauthor, NULL) as theauthor_grid,thetheme', 'PartName' => 'iu_urok_discuss', 'ID' =>  $empId 	));
	    if (!empty($res)) {
	        $result = $res[0];
	    }
	}
	return $result;
    }
    function setRow($data)  {
	    $data = (array)$data;
	if (!empty($data)) {
	    if (empty($data['iu_urok_discussid'])) {
	        $data['iu_urok_discussid'] = $this->jservice->get(array('Action' => 'NewGuid'));
	        $res=$this->jservice->get(array('Action' => 'NewRow', 'PartName' => 'iu_urok_discuss', 'RowID' => $data['iu_urok_discussid'], 'DocumentID' => $data['instanceid'], 'Values'=>$data));
	       if(isset($res[0])){
	       	if($res[0]->result!='ok'){
	       		return array('success' => FALSE, 'msg' => $res[0]->result);
	       	} 
	       }else{
	       	return array('success' => FALSE, 'msg' => 'Unknown error' );
	       }
	    }else{
	    $res = $this->jservice->get(array('Action' => 'UpdateRow', 'PartName' => 'iu_urok_discuss', 'RowID' => $data['iu_urok_discussid'], 'DocumentID' => $data['instanceid'], 'Values'=>$data));
	       if(isset($res[0])){
	       	if($res[0]->result!='ok'){
	       		return array('success' => FALSE, 'msg' => $res[0]->result);
	       	} 
	       }else{
	       	return array('success' => FALSE, 'msg' => 'Unknown error' );
	       }
	    }
	    return array('success' => TRUE, 'data' => $this->getRow($data['iu_urok_discussid'] ));
	} else {
	    return array('success' => FALSE, 'msg' => 'No data to store on server');
	}
    }
    function newRow($instanceid,$data)  {
	  $id = $this->jservice->get(array('Action' => 'NewGuid'));
	if ($this->jservice->get(array('Action' => 'NewRow', 'PartName' => 'iu_urok_discuss', 'RowID' => $id, 'DocumentID' => $instanceid, 'Values'=>$data)) == 'OK') {
	    return array('success' => TRUE, 'data' => $id);
	} else {
	    return array('success' => FALSE, 'msg' => 'Error while create new id');
	}
    }
    function getRows($sort=array())
		{
	    $res = $this->jservice->get(array('Action' => 'GetViewData','Sort'=>$sort,'FieldList'=>'B2G(iu_urok_discussid) as iu_urok_discussid, B2G(iu_urok_discussid) as id,B2G(instanceid) as instanceid, iu_urok_discuss_BRIEF_F(iu_urok_discussid , NULL) as  brief,  DATE_FORMAT(thedate,\'%Y-%m-%d %H:%i:%s\') as  thedate,B2G(TheAuthor) theauthor, iu_u_def_BRIEF_F(theauthor, NULL) as theauthor_grid,thetheme', 'ViewName' => 'iu_urok_discuss'));
	    if (count($res)) {
	        return $res;
	    } else {
	        return null;
	    }
		}
    function getRowsByInstance($id,$sort=array())
		{
	$res = $this->jservice->get(array('Action' => 'GetViewData','Sort'=>$sort,'FieldList'=>'B2G(iu_urok_discussid) as iu_urok_discussid, B2G(iu_urok_discussid) as id,B2G(instanceid) as instanceid, iu_urok_discuss_BRIEF_F(iu_urok_discussid , NULL) as  brief,  DATE_FORMAT(thedate,\'%Y-%m-%d %H:%i:%s\') as  thedate,B2G(TheAuthor) theauthor, iu_u_def_BRIEF_F(theauthor, NULL) as theauthor_grid,thetheme', 'ViewName' => 'iu_urok_discuss', 'WhereClause' => 'instanceid=G2B(\''. $id . '\')'));
	if (count($res) == 0) {
	    return null;
	} else {
	    return $res;
	}
		}
    function getRowsByParent($id,$sort=array())
	{
	$res = $this->jservice->get(array('Action' => 'GetViewData','Sort'=>$sort,'FieldList'=>'B2G(iu_urok_discussid) as iu_urok_discussid, B2G(iu_urok_discussid) as id,B2G(instanceid) as instanceid, iu_urok_discuss_BRIEF_F(iu_urok_discussid , NULL) as  brief,  DATE_FORMAT(thedate,\'%Y-%m-%d %H:%i:%s\') as  thedate,B2G(TheAuthor) theauthor, iu_u_def_BRIEF_F(theauthor, NULL) as theauthor_grid,thetheme', 'ViewName' => 'iu_urok_discuss', 'WhereClause' => ' parentstructrowid=G2B(\''. $id . '\')'));
	if (count($res) == 0) {
	    return null;
	} else {
	    return $res;
	}
  }
    function deleteRow($id = null) {
	  if (!empty($id) && $this->jservice->get(array('Action' => 'DeleteRow', 'PartName' => 'iu_urok_discuss', 'RowID' => $id)) == 'OK')
	    $result = array('success' => TRUE);
	else
	    $result = array('success' => FALSE, 'msg' => 'Error while deleting record!');
	return $result;
    }
}
?>
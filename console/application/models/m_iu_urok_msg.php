
<?php
class  M_iu_urok_msg extends CI_Model {
    function getRow($empId) {
    $result = array('success' => false, 'msg' => 'No Row ID for retrive data');
	if (!empty($empId)){
	    $res = $this->jservice->get(array('Action' => 'GetRowData','FieldList'=>'B2G(iu_urok_msgid) as iu_urok_msgid, B2G(iu_urok_msgid) as id,B2G(instanceid) as instanceid, iu_urok_msg_BRIEF_F(iu_urok_msgid , NULL) as  brief,  DATE_FORMAT(thedate,\'%Y-%m-%d %H:%i:%s\') as  thedate,info', 'PartName' => 'iu_urok_msg', 'ID' =>  $empId 	));
	    if (!empty($res)) {
	        $result = $res[0];
	    }
	}
	return $result;
    }
    function setRow($data)  {
	    $data = (array)$data;
	if (!empty($data)) {
	    if (empty($data['iu_urok_msgid'])) {
	        $data['iu_urok_msgid'] = $this->jservice->get(array('Action' => 'NewGuid'));
	        $res=$this->jservice->get(array('Action' => 'NewRow', 'PartName' => 'iu_urok_msg', 'RowID' => $data['iu_urok_msgid'], 'DocumentID' => $data['instanceid'], 'Values'=>$data));
	       if(isset($res[0])){
	       	if($res[0]->result!='ok'){
	       		return array('success' => FALSE, 'msg' => $res[0]->result);
	       	} 
	       }else{
	       	return array('success' => FALSE, 'msg' => 'Unknown error' );
	       }
	    }else{
	    $res = $this->jservice->get(array('Action' => 'UpdateRow', 'PartName' => 'iu_urok_msg', 'RowID' => $data['iu_urok_msgid'], 'DocumentID' => $data['instanceid'], 'Values'=>$data));
	       if(isset($res[0])){
	       	if($res[0]->result!='ok'){
	       		return array('success' => FALSE, 'msg' => $res[0]->result);
	       	} 
	       }else{
	       	return array('success' => FALSE, 'msg' => 'Unknown error' );
	       }
	    }
	    return array('success' => TRUE, 'data' => $this->getRow($data['iu_urok_msgid'] ));
	} else {
	    return array('success' => FALSE, 'msg' => 'No data to store on server');
	}
    }
    function newRow($instanceid,$data)  {
	  $id = $this->jservice->get(array('Action' => 'NewGuid'));
	if ($this->jservice->get(array('Action' => 'NewRow', 'PartName' => 'iu_urok_msg', 'RowID' => $id, 'DocumentID' => $instanceid, 'Values'=>$data)) == 'OK') {
	    return array('success' => TRUE, 'data' => $id);
	} else {
	    return array('success' => FALSE, 'msg' => 'Error while create new id');
	}
    }
    function getRows($sort=array())
		{
	    $res = $this->jservice->get(array('Action' => 'GetViewData','Sort'=>$sort,'FieldList'=>'B2G(iu_urok_msgid) as iu_urok_msgid, B2G(iu_urok_msgid) as id,B2G(instanceid) as instanceid, iu_urok_msg_BRIEF_F(iu_urok_msgid , NULL) as  brief,  DATE_FORMAT(thedate,\'%Y-%m-%d %H:%i:%s\') as  thedate,info', 'ViewName' => 'iu_urok_msg'));
	    if (count($res)) {
	        return $res;
	    } else {
	        return null;
	    }
		}
    function getRowsByInstance($id,$sort=array())
		{
	$res = $this->jservice->get(array('Action' => 'GetViewData','Sort'=>$sort,'FieldList'=>'B2G(iu_urok_msgid) as iu_urok_msgid, B2G(iu_urok_msgid) as id,B2G(instanceid) as instanceid, iu_urok_msg_BRIEF_F(iu_urok_msgid , NULL) as  brief,  DATE_FORMAT(thedate,\'%Y-%m-%d %H:%i:%s\') as  thedate,info', 'ViewName' => 'iu_urok_msg', 'WhereClause' => 'instanceid=G2B(\''. $id . '\')'));
	if (count($res) == 0) {
	    return null;
	} else {
	    return $res;
	}
		}
    function getRowsByParent($id,$sort=array())
	{
	$res = $this->jservice->get(array('Action' => 'GetViewData','Sort'=>$sort,'FieldList'=>'B2G(iu_urok_msgid) as iu_urok_msgid, B2G(iu_urok_msgid) as id,B2G(instanceid) as instanceid, iu_urok_msg_BRIEF_F(iu_urok_msgid , NULL) as  brief,  DATE_FORMAT(thedate,\'%Y-%m-%d %H:%i:%s\') as  thedate,info', 'ViewName' => 'iu_urok_msg', 'WhereClause' => ' parentstructrowid=G2B(\''. $id . '\')'));
	if (count($res) == 0) {
	    return null;
	} else {
	    return $res;
	}
  }
    function deleteRow($id = null) {
	  if (!empty($id) && $this->jservice->get(array('Action' => 'DeleteRow', 'PartName' => 'iu_urok_msg', 'RowID' => $id)) == 'OK')
	    $result = array('success' => TRUE);
	else
	    $result = array('success' => FALSE, 'msg' => 'Error while deleting record!');
	return $result;
    }
}
?>
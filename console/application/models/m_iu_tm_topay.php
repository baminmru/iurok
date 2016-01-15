﻿
<?php
class  M_iu_tm_topay extends CI_Model {
    function getRow($empId) {
    $result = array('success' => false, 'msg' => 'No Row ID for retrive data');
	if (!empty($empId)){
	    $res = $this->jservice->get(array('Action' => 'GetRowData','FieldList'=>'B2G(iu_tm_topayid) as iu_tm_topayid, B2G(iu_tm_topayid) as id,B2G(instanceid) as instanceid, iu_tm_topay_BRIEF_F(iu_tm_topayid , NULL) as  brief,thenumber,  DATE_FORMAT(thedate,\'%Y-%m-%d\') as  thedate,topay', 'PartName' => 'iu_tm_topay', 'ID' =>  $empId 	));
	    if (!empty($res)) {
	        $result = $res[0];
	    }
	}
	return $result;
    }
    function setRow($data)  {
	    $data = (array)$data;
	if (!empty($data)) {
	    if (empty($data['iu_tm_topayid'])) {
	        $data['iu_tm_topayid'] = $this->jservice->get(array('Action' => 'NewGuid'));
	        $res=$this->jservice->get(array('Action' => 'NewRow', 'PartName' => 'iu_tm_topay', 'RowID' => $data['iu_tm_topayid'], 'DocumentID' => $data['instanceid'], 'Values'=>$data));
	       if(isset($res[0])){
	       	if($res[0]->result!='ok'){
	       		return array('success' => FALSE, 'msg' => $res[0]->result);
	       	} 
	       }else{
	       	return array('success' => FALSE, 'msg' => 'Unknown error' );
	       }
	    }else{
	    $res = $this->jservice->get(array('Action' => 'UpdateRow', 'PartName' => 'iu_tm_topay', 'RowID' => $data['iu_tm_topayid'], 'DocumentID' => $data['instanceid'], 'Values'=>$data));
	       if(isset($res[0])){
	       	if($res[0]->result!='ok'){
	       		return array('success' => FALSE, 'msg' => $res[0]->result);
	       	} 
	       }else{
	       	return array('success' => FALSE, 'msg' => 'Unknown error' );
	       }
	    }
	    return array('success' => TRUE, 'data' => $this->getRow($data['iu_tm_topayid'] ));
	} else {
	    return array('success' => FALSE, 'msg' => 'No data to store on server');
	}
    }
    function newRow($instanceid,$data)  {
	  $id = $this->jservice->get(array('Action' => 'NewGuid'));
	if ($this->jservice->get(array('Action' => 'NewRow', 'PartName' => 'iu_tm_topay', 'RowID' => $id, 'DocumentID' => $instanceid, 'Values'=>$data)) == 'OK') {
	    return array('success' => TRUE, 'data' => $id);
	} else {
	    return array('success' => FALSE, 'msg' => 'Error while create new id');
	}
    }
    function getRows($sort=array())
		{
	    $res = $this->jservice->get(array('Action' => 'GetViewData','Sort'=>$sort,'FieldList'=>'B2G(iu_tm_topayid) as iu_tm_topayid, B2G(iu_tm_topayid) as id,B2G(instanceid) as instanceid, iu_tm_topay_BRIEF_F(iu_tm_topayid , NULL) as  brief,thenumber,  DATE_FORMAT(thedate,\'%Y-%m-%d\') as  thedate,topay', 'ViewName' => 'iu_tm_topay'));
	    if (count($res)) {
	        return $res;
	    } else {
	        return null;
	    }
		}
    function getRowsByInstance($id,$sort=array())
		{
	$res = $this->jservice->get(array('Action' => 'GetViewData','Sort'=>$sort,'FieldList'=>'B2G(iu_tm_topayid) as iu_tm_topayid, B2G(iu_tm_topayid) as id,B2G(instanceid) as instanceid, iu_tm_topay_BRIEF_F(iu_tm_topayid , NULL) as  brief,thenumber,  DATE_FORMAT(thedate,\'%Y-%m-%d\') as  thedate,topay', 'ViewName' => 'iu_tm_topay', 'WhereClause' => 'instanceid=G2B(\''. $id . '\')'));
	if (count($res) == 0) {
	    return null;
	} else {
	    return $res;
	}
		}
    function getRowsByParent($id,$sort=array())
	{
	$res = $this->jservice->get(array('Action' => 'GetViewData','Sort'=>$sort,'FieldList'=>'B2G(iu_tm_topayid) as iu_tm_topayid, B2G(iu_tm_topayid) as id,B2G(instanceid) as instanceid, iu_tm_topay_BRIEF_F(iu_tm_topayid , NULL) as  brief,thenumber,  DATE_FORMAT(thedate,\'%Y-%m-%d\') as  thedate,topay', 'ViewName' => 'iu_tm_topay', 'WhereClause' => ' parentstructrowid=G2B(\''. $id . '\')'));
	if (count($res) == 0) {
	    return null;
	} else {
	    return $res;
	}
  }
    function deleteRow($id = null) {
	  if (!empty($id) && $this->jservice->get(array('Action' => 'DeleteRow', 'PartName' => 'iu_tm_topay', 'RowID' => $id)) == 'OK')
	    $result = array('success' => TRUE);
	else
	    $result = array('success' => FALSE, 'msg' => 'Error while deleting record!');
	return $result;
    }
}
?>
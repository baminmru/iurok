﻿
<?php
class  M_sharedmethod extends CI_Model {
    function getRow($empId) {
    $result = array('success' => false, 'msg' => 'No Row ID for retrive data');
	if (!empty($empId)){
	    $res = $this->jservice->get(array('Action' => 'GetRowData','FieldList'=>'B2G(sharedmethodid) as sharedmethodid, B2G(sharedmethodid) as id,B2G(instanceid) as instanceid, SHAREDMETHOD_BRIEF_F(sharedmethodid , NULL) as  brief,name,the_comment,B2G(ReturnType) returntype, FIELDTYPE_BRIEF_F(returntype, NULL) as returntype_grid', 'PartName' => 'sharedmethod', 'ID' =>  $empId 	));
	    if (!empty($res)) {
	        $result = $res[0];
	    }
	}
	return $result;
    }
    function setRow($data)  {
	    $data = (array)$data;
	if (!empty($data)) {
	    if (empty($data['sharedmethodid'])) {
	        $data['sharedmethodid'] = $this->jservice->get(array('Action' => 'NewGuid'));
	        $res=$this->jservice->get(array('Action' => 'NewRow', 'PartName' => 'sharedmethod', 'RowID' => $data['sharedmethodid'], 'DocumentID' => $data['instanceid'], 'Values'=>$data));
	       if(isset($res[0])){
	       	if($res[0]->result!='ok'){
	       		return array('success' => FALSE, 'msg' => $res[0]->result);
	       	} 
	       }else{
	       	return array('success' => FALSE, 'msg' => 'Unknown error' );
	       }
	    }else{
	    $res = $this->jservice->get(array('Action' => 'UpdateRow', 'PartName' => 'sharedmethod', 'RowID' => $data['sharedmethodid'], 'DocumentID' => $data['instanceid'], 'Values'=>$data));
	       if(isset($res[0])){
	       	if($res[0]->result!='ok'){
	       		return array('success' => FALSE, 'msg' => $res[0]->result);
	       	} 
	       }else{
	       	return array('success' => FALSE, 'msg' => 'Unknown error' );
	       }
	    }
	    return array('success' => TRUE, 'data' => $this->getRow($data['sharedmethodid'] ));
	} else {
	    return array('success' => FALSE, 'msg' => 'No data to store on server');
	}
    }
    function newRow($instanceid,$data)  {
	  $id = $this->jservice->get(array('Action' => 'NewGuid'));
	if ($this->jservice->get(array('Action' => 'NewRow', 'PartName' => 'sharedmethod', 'RowID' => $id, 'DocumentID' => $instanceid, 'Values'=>$data)) == 'OK') {
	    return array('success' => TRUE, 'data' => $id);
	} else {
	    return array('success' => FALSE, 'msg' => 'Error while create new id');
	}
    }
    function getRows($sort=array())
		{
	    $res = $this->jservice->get(array('Action' => 'GetViewData','Sort'=>$sort,'FieldList'=>'B2G(sharedmethodid) as sharedmethodid, B2G(sharedmethodid) as id,B2G(instanceid) as instanceid, SHAREDMETHOD_BRIEF_F(sharedmethodid , NULL) as  brief,name,the_comment,B2G(ReturnType) returntype, FIELDTYPE_BRIEF_F(returntype, NULL) as returntype_grid', 'ViewName' => 'sharedmethod'));
	    if (count($res)) {
	        return $res;
	    } else {
	        return null;
	    }
		}
    function getRowsByInstance($id,$sort=array())
		{
	$res = $this->jservice->get(array('Action' => 'GetViewData','Sort'=>$sort,'FieldList'=>'B2G(sharedmethodid) as sharedmethodid, B2G(sharedmethodid) as id,B2G(instanceid) as instanceid, SHAREDMETHOD_BRIEF_F(sharedmethodid , NULL) as  brief,name,the_comment,B2G(ReturnType) returntype, FIELDTYPE_BRIEF_F(returntype, NULL) as returntype_grid', 'ViewName' => 'sharedmethod', 'WhereClause' => 'instanceid=G2B(\''. $id . '\')'));
	if (count($res) == 0) {
	    return null;
	} else {
	    return $res;
	}
		}
    function getRowsByParent($id,$sort=array())
	{
	$res = $this->jservice->get(array('Action' => 'GetViewData','Sort'=>$sort,'FieldList'=>'B2G(sharedmethodid) as sharedmethodid, B2G(sharedmethodid) as id,B2G(instanceid) as instanceid, SHAREDMETHOD_BRIEF_F(sharedmethodid , NULL) as  brief,name,the_comment,B2G(ReturnType) returntype, FIELDTYPE_BRIEF_F(returntype, NULL) as returntype_grid', 'ViewName' => 'sharedmethod', 'WhereClause' => ' parentstructrowid=G2B(\''. $id . '\')'));
	if (count($res) == 0) {
	    return null;
	} else {
	    return $res;
	}
  }
    function deleteRow($id = null) {
	  if (!empty($id) && $this->jservice->get(array('Action' => 'DeleteRow', 'PartName' => 'sharedmethod', 'RowID' => $id)) == 'OK')
	    $result = array('success' => TRUE);
	else
	    $result = array('success' => FALSE, 'msg' => 'Error while deleting record!');
	return $result;
    }
}
?>
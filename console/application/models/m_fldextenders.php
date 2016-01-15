
<?php
class  M_fldextenders extends CI_Model {
    function getRow($empId) {
    $result = array('success' => false, 'msg' => 'No Row ID for retrive data');
	if (!empty($empId)){
	    $res = $this->jservice->get(array('Action' => 'GetRowData','FieldList'=>'B2G(fldextendersid) as fldextendersid, B2G(fldextendersid) as id,B2G(parentstructrowid) as parentid, FldExtenders_BRIEF_F(fldextendersid , NULL) as  brief,theobject,thename,B2G(TargetPlatform) targetplatform, GENERATOR_TARGET_BRIEF_F(targetplatform, NULL) as targetplatform_grid,theconfig', 'PartName' => 'fldextenders', 'ID' =>  $empId 	));
	    if (!empty($res)) {
	        $result = $res[0];
	    }
	}
	return $result;
    }
    function setRow($data)  {
	    $data = (array)$data;
	if (!empty($data)) {
	    if (empty($data['fldextendersid'])) {
	        $data['fldextendersid'] = $this->jservice->get(array('Action' => 'NewGuid'));
	        $res=$this->jservice->get(array('Action' => 'NewRow', 'PartName' => 'fldextenders', 'RowID' => $data['fldextendersid'], 'DocumentID' => $data['instanceid'],'ParentID' => $data['parentid'], 'Values'=>$data));
	       if(isset($res[0])){
	       	if($res[0]->result!='ok'){
	       		return array('success' => FALSE, 'msg' => $res[0]->result);
	       	} 
	       }else{
	       	return array('success' => FALSE, 'msg' => 'Unknown error' );
	       }
	    }else{
	    $res = $this->jservice->get(array('Action' => 'UpdateRow', 'PartName' => 'fldextenders', 'RowID' => $data['fldextendersid'], 'DocumentID' => $data['instanceid'],'ParentID' => $data['parentid'], 'Values'=>$data));
	       if(isset($res[0])){
	       	if($res[0]->result!='ok'){
	       		return array('success' => FALSE, 'msg' => $res[0]->result);
	       	} 
	       }else{
	       	return array('success' => FALSE, 'msg' => 'Unknown error' );
	       }
	    }
	    return array('success' => TRUE, 'data' => $this->getRow($data['fldextendersid'] ));
	} else {
	    return array('success' => FALSE, 'msg' => 'No data to store on server');
	}
    }
    function newRow($instanceid,$parentid,$data)  {
	  $id = $this->jservice->get(array('Action' => 'NewGuid'));
	if ($this->jservice->get(array('Action' => 'NewRow', 'PartName' => 'fldextenders', 'RowID' => $id, 'DocumentID' => $instanceid,'ParentID'=>$parentid, 'Values'=>$data)) == 'OK') {
	    return array('success' => TRUE, 'data' => $id);
	} else {
	    return array('success' => FALSE, 'msg' => 'Error while create new id');
	}
    }
    function getRows($sort=array())
		{
	    $res = $this->jservice->get(array('Action' => 'GetViewData','Sort'=>$sort,'FieldList'=>'B2G(fldextendersid) as fldextendersid, B2G(fldextendersid) as id,B2G(parentstructrowid) as parentid, FldExtenders_BRIEF_F(fldextendersid , NULL) as  brief,theobject,thename,B2G(TargetPlatform) targetplatform, GENERATOR_TARGET_BRIEF_F(targetplatform, NULL) as targetplatform_grid,theconfig', 'ViewName' => 'fldextenders'));
	    if (count($res)) {
	        return $res;
	    } else {
	        return null;
	    }
		}
    function getRowsByInstance($id,$sort=array())
		{
	$res = $this->jservice->get(array('Action' => 'GetViewData','Sort'=>$sort,'FieldList'=>'B2G(fldextendersid) as fldextendersid, B2G(fldextendersid) as id,B2G(parentstructrowid) as parentid, FldExtenders_BRIEF_F(fldextendersid , NULL) as  brief,theobject,thename,B2G(TargetPlatform) targetplatform, GENERATOR_TARGET_BRIEF_F(targetplatform, NULL) as targetplatform_grid,theconfig', 'ViewName' => 'fldextenders', 'WhereClause' => 'instanceid=G2B(\''. $id . '\')'));
	if (count($res) == 0) {
	    return null;
	} else {
	    return $res;
	}
		}
    function getRowsByParent($id,$sort=array())
	{
	$res = $this->jservice->get(array('Action' => 'GetViewData','Sort'=>$sort,'FieldList'=>'B2G(fldextendersid) as fldextendersid, B2G(fldextendersid) as id,B2G(parentstructrowid) as parentid, FldExtenders_BRIEF_F(fldextendersid , NULL) as  brief,theobject,thename,B2G(TargetPlatform) targetplatform, GENERATOR_TARGET_BRIEF_F(targetplatform, NULL) as targetplatform_grid,theconfig', 'ViewName' => 'fldextenders', 'WhereClause' => ' parentstructrowid=G2B(\''. $id . '\')'));
	if (count($res) == 0) {
	    return null;
	} else {
	    return $res;
	}
  }
    function deleteRow($id = null) {
	  if (!empty($id) && $this->jservice->get(array('Action' => 'DeleteRow', 'PartName' => 'fldextenders', 'RowID' => $id)) == 'OK')
	    $result = array('success' => TRUE);
	else
	    $result = array('success' => FALSE, 'msg' => 'Error while deleting record!');
	return $result;
    }
}
?>
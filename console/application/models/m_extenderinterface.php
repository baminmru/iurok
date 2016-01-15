
<?php
class  M_extenderinterface extends CI_Model {
    function getRow($empId) {
    $result = array('success' => false, 'msg' => 'No Row ID for retrive data');
	if (!empty($empId)){
	    $res = $this->jservice->get(array('Action' => 'GetRowData','FieldList'=>'B2G(extenderinterfaceid) as extenderinterfaceid, B2G(extenderinterfaceid) as id,B2G(parentstructrowid) as parentid, ExtenderInterface_BRIEF_F(extenderinterfaceid , NULL) as  brief,theconfig,B2G(TargetPlatform) targetplatform, GENERATOR_TARGET_BRIEF_F(targetplatform, NULL) as targetplatform_grid,theobject,thename', 'PartName' => 'extenderinterface', 'ID' =>  $empId 	));
	    if (!empty($res)) {
	        $result = $res[0];
	    }
	}
	return $result;
    }
    function setRow($data)  {
	    $data = (array)$data;
	if (!empty($data)) {
	    if (empty($data['extenderinterfaceid'])) {
	        $data['extenderinterfaceid'] = $this->jservice->get(array('Action' => 'NewGuid'));
	        $res=$this->jservice->get(array('Action' => 'NewRow', 'PartName' => 'extenderinterface', 'RowID' => $data['extenderinterfaceid'], 'DocumentID' => $data['instanceid'],'ParentID' => $data['parentid'], 'Values'=>$data));
	       if(isset($res[0])){
	       	if($res[0]->result!='ok'){
	       		return array('success' => FALSE, 'msg' => $res[0]->result);
	       	} 
	       }else{
	       	return array('success' => FALSE, 'msg' => 'Unknown error' );
	       }
	    }else{
	    $res = $this->jservice->get(array('Action' => 'UpdateRow', 'PartName' => 'extenderinterface', 'RowID' => $data['extenderinterfaceid'], 'DocumentID' => $data['instanceid'],'ParentID' => $data['parentid'], 'Values'=>$data));
	       if(isset($res[0])){
	       	if($res[0]->result!='ok'){
	       		return array('success' => FALSE, 'msg' => $res[0]->result);
	       	} 
	       }else{
	       	return array('success' => FALSE, 'msg' => 'Unknown error' );
	       }
	    }
	    return array('success' => TRUE, 'data' => $this->getRow($data['extenderinterfaceid'] ));
	} else {
	    return array('success' => FALSE, 'msg' => 'No data to store on server');
	}
    }
    function newRow($instanceid,$parentid,$data)  {
	  $id = $this->jservice->get(array('Action' => 'NewGuid'));
	if ($this->jservice->get(array('Action' => 'NewRow', 'PartName' => 'extenderinterface', 'RowID' => $id, 'DocumentID' => $instanceid,'ParentID'=>$parentid, 'Values'=>$data)) == 'OK') {
	    return array('success' => TRUE, 'data' => $id);
	} else {
	    return array('success' => FALSE, 'msg' => 'Error while create new id');
	}
    }
    function getRows($sort=array())
		{
	    $res = $this->jservice->get(array('Action' => 'GetViewData','Sort'=>$sort,'FieldList'=>'B2G(extenderinterfaceid) as extenderinterfaceid, B2G(extenderinterfaceid) as id,B2G(parentstructrowid) as parentid, ExtenderInterface_BRIEF_F(extenderinterfaceid , NULL) as  brief,theconfig,B2G(TargetPlatform) targetplatform, GENERATOR_TARGET_BRIEF_F(targetplatform, NULL) as targetplatform_grid,theobject,thename', 'ViewName' => 'extenderinterface'));
	    if (count($res)) {
	        return $res;
	    } else {
	        return null;
	    }
		}
    function getRowsByInstance($id,$sort=array())
		{
	$res = $this->jservice->get(array('Action' => 'GetViewData','Sort'=>$sort,'FieldList'=>'B2G(extenderinterfaceid) as extenderinterfaceid, B2G(extenderinterfaceid) as id,B2G(parentstructrowid) as parentid, ExtenderInterface_BRIEF_F(extenderinterfaceid , NULL) as  brief,theconfig,B2G(TargetPlatform) targetplatform, GENERATOR_TARGET_BRIEF_F(targetplatform, NULL) as targetplatform_grid,theobject,thename', 'ViewName' => 'extenderinterface', 'WhereClause' => 'instanceid=G2B(\''. $id . '\')'));
	if (count($res) == 0) {
	    return null;
	} else {
	    return $res;
	}
		}
    function getRowsByParent($id,$sort=array())
	{
	$res = $this->jservice->get(array('Action' => 'GetViewData','Sort'=>$sort,'FieldList'=>'B2G(extenderinterfaceid) as extenderinterfaceid, B2G(extenderinterfaceid) as id,B2G(parentstructrowid) as parentid, ExtenderInterface_BRIEF_F(extenderinterfaceid , NULL) as  brief,theconfig,B2G(TargetPlatform) targetplatform, GENERATOR_TARGET_BRIEF_F(targetplatform, NULL) as targetplatform_grid,theobject,thename', 'ViewName' => 'extenderinterface', 'WhereClause' => ' parentstructrowid=G2B(\''. $id . '\')'));
	if (count($res) == 0) {
	    return null;
	} else {
	    return $res;
	}
  }
    function deleteRow($id = null) {
	  if (!empty($id) && $this->jservice->get(array('Action' => 'DeleteRow', 'PartName' => 'extenderinterface', 'RowID' => $id)) == 'OK')
	    $result = array('success' => TRUE);
	else
	    $result = array('success' => FALSE, 'msg' => 'Error while deleting record!');
	return $result;
    }
}
?>
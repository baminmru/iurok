
<?php
class  M_methodrestriction extends CI_Model {
    function getRow($empId) {
    $result = array('success' => false, 'msg' => 'No Row ID for retrive data');
	if (!empty($empId)){
	    $res = $this->jservice->get(array('Action' => 'GetRowData','FieldList'=>'B2G(methodrestrictionid) as methodrestrictionid, B2G(methodrestrictionid) as id,B2G(parentstructrowid) as parentid, METHODRESTRICTION_BRIEF_F(methodrestrictionid , NULL) as  brief,isrestricted, case isrestricted  when -1 then \'Да\' when 0 then \'Нет\'End  as isrestricted_grid,B2G(Part) part, PART_BRIEF_F(part, NULL) as part_grid,B2G(Method) method, SHAREDMETHOD_BRIEF_F(method, NULL) as method_grid', 'PartName' => 'methodrestriction', 'ID' =>  $empId 	));
	    if (!empty($res)) {
	        $result = $res[0];
	    }
	}
	return $result;
    }
    function setRow($data)  {
	    $data = (array)$data;
	if (!empty($data)) {
	    if (empty($data['methodrestrictionid'])) {
	        $data['methodrestrictionid'] = $this->jservice->get(array('Action' => 'NewGuid'));
	        $res=$this->jservice->get(array('Action' => 'NewRow', 'PartName' => 'methodrestriction', 'RowID' => $data['methodrestrictionid'], 'DocumentID' => $data['instanceid'],'ParentID' => $data['parentid'], 'Values'=>$data));
	       if(isset($res[0])){
	       	if($res[0]->result!='ok'){
	       		return array('success' => FALSE, 'msg' => $res[0]->result);
	       	} 
	       }else{
	       	return array('success' => FALSE, 'msg' => 'Unknown error' );
	       }
	    }else{
	    $res = $this->jservice->get(array('Action' => 'UpdateRow', 'PartName' => 'methodrestriction', 'RowID' => $data['methodrestrictionid'], 'DocumentID' => $data['instanceid'],'ParentID' => $data['parentid'], 'Values'=>$data));
	       if(isset($res[0])){
	       	if($res[0]->result!='ok'){
	       		return array('success' => FALSE, 'msg' => $res[0]->result);
	       	} 
	       }else{
	       	return array('success' => FALSE, 'msg' => 'Unknown error' );
	       }
	    }
	    return array('success' => TRUE, 'data' => $this->getRow($data['methodrestrictionid'] ));
	} else {
	    return array('success' => FALSE, 'msg' => 'No data to store on server');
	}
    }
    function newRow($instanceid,$parentid,$data)  {
	  $id = $this->jservice->get(array('Action' => 'NewGuid'));
	if ($this->jservice->get(array('Action' => 'NewRow', 'PartName' => 'methodrestriction', 'RowID' => $id, 'DocumentID' => $instanceid,'ParentID'=>$parentid, 'Values'=>$data)) == 'OK') {
	    return array('success' => TRUE, 'data' => $id);
	} else {
	    return array('success' => FALSE, 'msg' => 'Error while create new id');
	}
    }
    function getRows($sort=array())
		{
	    $res = $this->jservice->get(array('Action' => 'GetViewData','Sort'=>$sort,'FieldList'=>'B2G(methodrestrictionid) as methodrestrictionid, B2G(methodrestrictionid) as id,B2G(parentstructrowid) as parentid, METHODRESTRICTION_BRIEF_F(methodrestrictionid , NULL) as  brief,isrestricted, case isrestricted  when -1 then \'Да\' when 0 then \'Нет\'End  as isrestricted_grid,B2G(Part) part, PART_BRIEF_F(part, NULL) as part_grid,B2G(Method) method, SHAREDMETHOD_BRIEF_F(method, NULL) as method_grid', 'ViewName' => 'methodrestriction'));
	    if (count($res)) {
	        return $res;
	    } else {
	        return null;
	    }
		}
    function getRowsByInstance($id,$sort=array())
		{
	$res = $this->jservice->get(array('Action' => 'GetViewData','Sort'=>$sort,'FieldList'=>'B2G(methodrestrictionid) as methodrestrictionid, B2G(methodrestrictionid) as id,B2G(parentstructrowid) as parentid, METHODRESTRICTION_BRIEF_F(methodrestrictionid , NULL) as  brief,isrestricted, case isrestricted  when -1 then \'Да\' when 0 then \'Нет\'End  as isrestricted_grid,B2G(Part) part, PART_BRIEF_F(part, NULL) as part_grid,B2G(Method) method, SHAREDMETHOD_BRIEF_F(method, NULL) as method_grid', 'ViewName' => 'methodrestriction', 'WhereClause' => 'instanceid=G2B(\''. $id . '\')'));
	if (count($res) == 0) {
	    return null;
	} else {
	    return $res;
	}
		}
    function getRowsByParent($id,$sort=array())
	{
	$res = $this->jservice->get(array('Action' => 'GetViewData','Sort'=>$sort,'FieldList'=>'B2G(methodrestrictionid) as methodrestrictionid, B2G(methodrestrictionid) as id,B2G(parentstructrowid) as parentid, METHODRESTRICTION_BRIEF_F(methodrestrictionid , NULL) as  brief,isrestricted, case isrestricted  when -1 then \'Да\' when 0 then \'Нет\'End  as isrestricted_grid,B2G(Part) part, PART_BRIEF_F(part, NULL) as part_grid,B2G(Method) method, SHAREDMETHOD_BRIEF_F(method, NULL) as method_grid', 'ViewName' => 'methodrestriction', 'WhereClause' => ' parentstructrowid=G2B(\''. $id . '\')'));
	if (count($res) == 0) {
	    return null;
	} else {
	    return $res;
	}
  }
    function deleteRow($id = null) {
	  if (!empty($id) && $this->jservice->get(array('Action' => 'DeleteRow', 'PartName' => 'methodrestriction', 'RowID' => $id)) == 'OK')
	    $result = array('success' => TRUE);
	else
	    $result = array('success' => FALSE, 'msg' => 'Error while deleting record!');
	return $result;
    }
}
?>
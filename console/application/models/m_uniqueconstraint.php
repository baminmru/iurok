
<?php
class  M_uniqueconstraint extends CI_Model {
    function getRow($empId) {
    $result = array('success' => false, 'msg' => 'No Row ID for retrive data');
	if (!empty($empId)){
	    $res = $this->jservice->get(array('Action' => 'GetRowData','FieldList'=>'B2G(uniqueconstraintid) as uniqueconstraintid, B2G(uniqueconstraintid) as id,B2G(parentstructrowid) as parentid, UNIQUECONSTRAINT_BRIEF_F(uniqueconstraintid , NULL) as  brief,thecomment,name,perparent, case perparent  when -1 then \'Да\' when 0 then \'Нет\'End  as perparent_grid', 'PartName' => 'uniqueconstraint', 'ID' =>  $empId 	));
	    if (!empty($res)) {
	        $result = $res[0];
	    }
	}
	return $result;
    }
    function setRow($data)  {
	    $data = (array)$data;
	if (!empty($data)) {
	    if (empty($data['uniqueconstraintid'])) {
	        $data['uniqueconstraintid'] = $this->jservice->get(array('Action' => 'NewGuid'));
	        $res=$this->jservice->get(array('Action' => 'NewRow', 'PartName' => 'uniqueconstraint', 'RowID' => $data['uniqueconstraintid'], 'DocumentID' => $data['instanceid'],'ParentID' => $data['parentid'], 'Values'=>$data));
	       if(isset($res[0])){
	       	if($res[0]->result!='ok'){
	       		return array('success' => FALSE, 'msg' => $res[0]->result);
	       	} 
	       }else{
	       	return array('success' => FALSE, 'msg' => 'Unknown error' );
	       }
	    }else{
	    $res = $this->jservice->get(array('Action' => 'UpdateRow', 'PartName' => 'uniqueconstraint', 'RowID' => $data['uniqueconstraintid'], 'DocumentID' => $data['instanceid'],'ParentID' => $data['parentid'], 'Values'=>$data));
	       if(isset($res[0])){
	       	if($res[0]->result!='ok'){
	       		return array('success' => FALSE, 'msg' => $res[0]->result);
	       	} 
	       }else{
	       	return array('success' => FALSE, 'msg' => 'Unknown error' );
	       }
	    }
	    return array('success' => TRUE, 'data' => $this->getRow($data['uniqueconstraintid'] ));
	} else {
	    return array('success' => FALSE, 'msg' => 'No data to store on server');
	}
    }
    function newRow($instanceid,$parentid,$data)  {
	  $id = $this->jservice->get(array('Action' => 'NewGuid'));
	if ($this->jservice->get(array('Action' => 'NewRow', 'PartName' => 'uniqueconstraint', 'RowID' => $id, 'DocumentID' => $instanceid,'ParentID'=>$parentid, 'Values'=>$data)) == 'OK') {
	    return array('success' => TRUE, 'data' => $id);
	} else {
	    return array('success' => FALSE, 'msg' => 'Error while create new id');
	}
    }
    function getRows($sort=array())
		{
	    $res = $this->jservice->get(array('Action' => 'GetViewData','Sort'=>$sort,'FieldList'=>'B2G(uniqueconstraintid) as uniqueconstraintid, B2G(uniqueconstraintid) as id,B2G(parentstructrowid) as parentid, UNIQUECONSTRAINT_BRIEF_F(uniqueconstraintid , NULL) as  brief,thecomment,name,perparent, case perparent  when -1 then \'Да\' when 0 then \'Нет\'End  as perparent_grid', 'ViewName' => 'uniqueconstraint'));
	    if (count($res)) {
	        return $res;
	    } else {
	        return null;
	    }
		}
    function getRowsByInstance($id,$sort=array())
		{
	$res = $this->jservice->get(array('Action' => 'GetViewData','Sort'=>$sort,'FieldList'=>'B2G(uniqueconstraintid) as uniqueconstraintid, B2G(uniqueconstraintid) as id,B2G(parentstructrowid) as parentid, UNIQUECONSTRAINT_BRIEF_F(uniqueconstraintid , NULL) as  brief,thecomment,name,perparent, case perparent  when -1 then \'Да\' when 0 then \'Нет\'End  as perparent_grid', 'ViewName' => 'uniqueconstraint', 'WhereClause' => 'instanceid=G2B(\''. $id . '\')'));
	if (count($res) == 0) {
	    return null;
	} else {
	    return $res;
	}
		}
    function getRowsByParent($id,$sort=array())
	{
	$res = $this->jservice->get(array('Action' => 'GetViewData','Sort'=>$sort,'FieldList'=>'B2G(uniqueconstraintid) as uniqueconstraintid, B2G(uniqueconstraintid) as id,B2G(parentstructrowid) as parentid, UNIQUECONSTRAINT_BRIEF_F(uniqueconstraintid , NULL) as  brief,thecomment,name,perparent, case perparent  when -1 then \'Да\' when 0 then \'Нет\'End  as perparent_grid', 'ViewName' => 'uniqueconstraint', 'WhereClause' => ' parentstructrowid=G2B(\''. $id . '\')'));
	if (count($res) == 0) {
	    return null;
	} else {
	    return $res;
	}
  }
    function deleteRow($id = null) {
	  if (!empty($id) && $this->jservice->get(array('Action' => 'DeleteRow', 'PartName' => 'uniqueconstraint', 'RowID' => $id)) == 'OK')
	    $result = array('success' => TRUE);
	else
	    $result = array('success' => FALSE, 'msg' => 'Error while deleting record!');
	return $result;
    }
}
?>
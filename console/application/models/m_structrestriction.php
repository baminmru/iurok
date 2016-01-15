
<?php
class  M_structrestriction extends CI_Model {
    function getRow($empId) {
    $result = array('success' => false, 'msg' => 'No Row ID for retrive data');
	if (!empty($empId)){
	    $res = $this->jservice->get(array('Action' => 'GetRowData','FieldList'=>'B2G(structrestrictionid) as structrestrictionid, B2G(structrestrictionid) as id,B2G(parentstructrowid) as parentid, STRUCTRESTRICTION_BRIEF_F(structrestrictionid , NULL) as  brief,allowadd, case allowadd  when -1 then \'Да\' when 0 then \'Нет\'End  as allowadd_grid,allowdelete, case allowdelete  when -1 then \'Да\' when 0 then \'Нет\'End  as allowdelete_grid,allowread, case allowread  when -1 then \'Да\' when 0 then \'Нет\'End  as allowread_grid,B2G(Struct) struct, PART_BRIEF_F(struct, NULL) as struct_grid,allowedit, case allowedit  when -1 then \'Да\' when 0 then \'Нет\'End  as allowedit_grid', 'PartName' => 'structrestriction', 'ID' =>  $empId 	));
	    if (!empty($res)) {
	        $result = $res[0];
	    }
	}
	return $result;
    }
    function setRow($data)  {
	    $data = (array)$data;
	if (!empty($data)) {
	    if (empty($data['structrestrictionid'])) {
	        $data['structrestrictionid'] = $this->jservice->get(array('Action' => 'NewGuid'));
	        $res=$this->jservice->get(array('Action' => 'NewRow', 'PartName' => 'structrestriction', 'RowID' => $data['structrestrictionid'], 'DocumentID' => $data['instanceid'],'ParentID' => $data['parentid'], 'Values'=>$data));
	       if(isset($res[0])){
	       	if($res[0]->result!='ok'){
	       		return array('success' => FALSE, 'msg' => $res[0]->result);
	       	} 
	       }else{
	       	return array('success' => FALSE, 'msg' => 'Unknown error' );
	       }
	    }else{
	    $res = $this->jservice->get(array('Action' => 'UpdateRow', 'PartName' => 'structrestriction', 'RowID' => $data['structrestrictionid'], 'DocumentID' => $data['instanceid'],'ParentID' => $data['parentid'], 'Values'=>$data));
	       if(isset($res[0])){
	       	if($res[0]->result!='ok'){
	       		return array('success' => FALSE, 'msg' => $res[0]->result);
	       	} 
	       }else{
	       	return array('success' => FALSE, 'msg' => 'Unknown error' );
	       }
	    }
	    return array('success' => TRUE, 'data' => $this->getRow($data['structrestrictionid'] ));
	} else {
	    return array('success' => FALSE, 'msg' => 'No data to store on server');
	}
    }
    function newRow($instanceid,$parentid,$data)  {
	  $id = $this->jservice->get(array('Action' => 'NewGuid'));
	if ($this->jservice->get(array('Action' => 'NewRow', 'PartName' => 'structrestriction', 'RowID' => $id, 'DocumentID' => $instanceid,'ParentID'=>$parentid, 'Values'=>$data)) == 'OK') {
	    return array('success' => TRUE, 'data' => $id);
	} else {
	    return array('success' => FALSE, 'msg' => 'Error while create new id');
	}
    }
    function getRows($sort=array())
		{
	    $res = $this->jservice->get(array('Action' => 'GetViewData','Sort'=>$sort,'FieldList'=>'B2G(structrestrictionid) as structrestrictionid, B2G(structrestrictionid) as id,B2G(parentstructrowid) as parentid, STRUCTRESTRICTION_BRIEF_F(structrestrictionid , NULL) as  brief,allowadd, case allowadd  when -1 then \'Да\' when 0 then \'Нет\'End  as allowadd_grid,allowdelete, case allowdelete  when -1 then \'Да\' when 0 then \'Нет\'End  as allowdelete_grid,allowread, case allowread  when -1 then \'Да\' when 0 then \'Нет\'End  as allowread_grid,B2G(Struct) struct, PART_BRIEF_F(struct, NULL) as struct_grid,allowedit, case allowedit  when -1 then \'Да\' when 0 then \'Нет\'End  as allowedit_grid', 'ViewName' => 'structrestriction'));
	    if (count($res)) {
	        return $res;
	    } else {
	        return null;
	    }
		}
    function getRowsByInstance($id,$sort=array())
		{
	$res = $this->jservice->get(array('Action' => 'GetViewData','Sort'=>$sort,'FieldList'=>'B2G(structrestrictionid) as structrestrictionid, B2G(structrestrictionid) as id,B2G(parentstructrowid) as parentid, STRUCTRESTRICTION_BRIEF_F(structrestrictionid , NULL) as  brief,allowadd, case allowadd  when -1 then \'Да\' when 0 then \'Нет\'End  as allowadd_grid,allowdelete, case allowdelete  when -1 then \'Да\' when 0 then \'Нет\'End  as allowdelete_grid,allowread, case allowread  when -1 then \'Да\' when 0 then \'Нет\'End  as allowread_grid,B2G(Struct) struct, PART_BRIEF_F(struct, NULL) as struct_grid,allowedit, case allowedit  when -1 then \'Да\' when 0 then \'Нет\'End  as allowedit_grid', 'ViewName' => 'structrestriction', 'WhereClause' => 'instanceid=G2B(\''. $id . '\')'));
	if (count($res) == 0) {
	    return null;
	} else {
	    return $res;
	}
		}
    function getRowsByParent($id,$sort=array())
	{
	$res = $this->jservice->get(array('Action' => 'GetViewData','Sort'=>$sort,'FieldList'=>'B2G(structrestrictionid) as structrestrictionid, B2G(structrestrictionid) as id,B2G(parentstructrowid) as parentid, STRUCTRESTRICTION_BRIEF_F(structrestrictionid , NULL) as  brief,allowadd, case allowadd  when -1 then \'Да\' when 0 then \'Нет\'End  as allowadd_grid,allowdelete, case allowdelete  when -1 then \'Да\' when 0 then \'Нет\'End  as allowdelete_grid,allowread, case allowread  when -1 then \'Да\' when 0 then \'Нет\'End  as allowread_grid,B2G(Struct) struct, PART_BRIEF_F(struct, NULL) as struct_grid,allowedit, case allowedit  when -1 then \'Да\' when 0 then \'Нет\'End  as allowedit_grid', 'ViewName' => 'structrestriction', 'WhereClause' => ' parentstructrowid=G2B(\''. $id . '\')'));
	if (count($res) == 0) {
	    return null;
	} else {
	    return $res;
	}
  }
    function deleteRow($id = null) {
	  if (!empty($id) && $this->jservice->get(array('Action' => 'DeleteRow', 'PartName' => 'structrestriction', 'RowID' => $id)) == 'OK')
	    $result = array('success' => TRUE);
	else
	    $result = array('success' => FALSE, 'msg' => 'Error while deleting record!');
	return $result;
    }
}
?>
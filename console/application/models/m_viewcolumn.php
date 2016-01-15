
<?php
class  M_viewcolumn extends CI_Model {
    function getRow($empId) {
    $result = array('success' => false, 'msg' => 'No Row ID for retrive data');
	if (!empty($empId)){
	    $res = $this->jservice->get(array('Action' => 'GetRowData','FieldList'=>'B2G(viewcolumnid) as viewcolumnid, B2G(viewcolumnid) as id,B2G(parentstructrowid) as parentid, ViewColumn_BRIEF_F(viewcolumnid , NULL) as  brief,forcombo, case forcombo  when -1 then \'Да\' when 0 then \'Нет\'End  as forcombo_grid,B2G(FromPart) frompart, PART_BRIEF_F(frompart, NULL) as frompart_grid,aggregation, case aggregation  when 0 then \'none\' when 1 then \'AVG\' when 2 then \'COUNT\' when 3 then \'SUM\' when 4 then \'MIN\' when 5 then \'MAX\' when 6 then \'CUSTOM\'End  as aggregation_grid,sequence,the_alias,name,B2G(Field) field, FIELD_BRIEF_F(field, NULL) as field_grid,expression', 'PartName' => 'viewcolumn', 'ID' =>  $empId 	));
	    if (!empty($res)) {
	        $result = $res[0];
	    }
	}
	return $result;
    }
    function setRow($data)  {
	    $data = (array)$data;
	if (!empty($data)) {
	    if (empty($data['viewcolumnid'])) {
	        $data['viewcolumnid'] = $this->jservice->get(array('Action' => 'NewGuid'));
	        $res=$this->jservice->get(array('Action' => 'NewRow', 'PartName' => 'viewcolumn', 'RowID' => $data['viewcolumnid'], 'DocumentID' => $data['instanceid'],'ParentID' => $data['parentid'], 'Values'=>$data));
	       if(isset($res[0])){
	       	if($res[0]->result!='ok'){
	       		return array('success' => FALSE, 'msg' => $res[0]->result);
	       	} 
	       }else{
	       	return array('success' => FALSE, 'msg' => 'Unknown error' );
	       }
	    }else{
	    $res = $this->jservice->get(array('Action' => 'UpdateRow', 'PartName' => 'viewcolumn', 'RowID' => $data['viewcolumnid'], 'DocumentID' => $data['instanceid'],'ParentID' => $data['parentid'], 'Values'=>$data));
	       if(isset($res[0])){
	       	if($res[0]->result!='ok'){
	       		return array('success' => FALSE, 'msg' => $res[0]->result);
	       	} 
	       }else{
	       	return array('success' => FALSE, 'msg' => 'Unknown error' );
	       }
	    }
	    return array('success' => TRUE, 'data' => $this->getRow($data['viewcolumnid'] ));
	} else {
	    return array('success' => FALSE, 'msg' => 'No data to store on server');
	}
    }
    function newRow($instanceid,$parentid,$data)  {
	  $id = $this->jservice->get(array('Action' => 'NewGuid'));
	if ($this->jservice->get(array('Action' => 'NewRow', 'PartName' => 'viewcolumn', 'RowID' => $id, 'DocumentID' => $instanceid,'ParentID'=>$parentid, 'Values'=>$data)) == 'OK') {
	    return array('success' => TRUE, 'data' => $id);
	} else {
	    return array('success' => FALSE, 'msg' => 'Error while create new id');
	}
    }
    function getRows($sort=array())
		{
	    $res = $this->jservice->get(array('Action' => 'GetViewData','Sort'=>$sort,'FieldList'=>'B2G(viewcolumnid) as viewcolumnid, B2G(viewcolumnid) as id,B2G(parentstructrowid) as parentid, ViewColumn_BRIEF_F(viewcolumnid , NULL) as  brief,forcombo, case forcombo  when -1 then \'Да\' when 0 then \'Нет\'End  as forcombo_grid,B2G(FromPart) frompart, PART_BRIEF_F(frompart, NULL) as frompart_grid,aggregation, case aggregation  when 0 then \'none\' when 1 then \'AVG\' when 2 then \'COUNT\' when 3 then \'SUM\' when 4 then \'MIN\' when 5 then \'MAX\' when 6 then \'CUSTOM\'End  as aggregation_grid,sequence,the_alias,name,B2G(Field) field, FIELD_BRIEF_F(field, NULL) as field_grid,expression', 'ViewName' => 'viewcolumn'));
	    if (count($res)) {
	        return $res;
	    } else {
	        return null;
	    }
		}
    function getRowsByInstance($id,$sort=array())
		{
	$res = $this->jservice->get(array('Action' => 'GetViewData','Sort'=>$sort,'FieldList'=>'B2G(viewcolumnid) as viewcolumnid, B2G(viewcolumnid) as id,B2G(parentstructrowid) as parentid, ViewColumn_BRIEF_F(viewcolumnid , NULL) as  brief,forcombo, case forcombo  when -1 then \'Да\' when 0 then \'Нет\'End  as forcombo_grid,B2G(FromPart) frompart, PART_BRIEF_F(frompart, NULL) as frompart_grid,aggregation, case aggregation  when 0 then \'none\' when 1 then \'AVG\' when 2 then \'COUNT\' when 3 then \'SUM\' when 4 then \'MIN\' when 5 then \'MAX\' when 6 then \'CUSTOM\'End  as aggregation_grid,sequence,the_alias,name,B2G(Field) field, FIELD_BRIEF_F(field, NULL) as field_grid,expression', 'ViewName' => 'viewcolumn', 'WhereClause' => 'instanceid=G2B(\''. $id . '\')'));
	if (count($res) == 0) {
	    return null;
	} else {
	    return $res;
	}
		}
    function getRowsByParent($id,$sort=array())
	{
	$res = $this->jservice->get(array('Action' => 'GetViewData','Sort'=>$sort,'FieldList'=>'B2G(viewcolumnid) as viewcolumnid, B2G(viewcolumnid) as id,B2G(parentstructrowid) as parentid, ViewColumn_BRIEF_F(viewcolumnid , NULL) as  brief,forcombo, case forcombo  when -1 then \'Да\' when 0 then \'Нет\'End  as forcombo_grid,B2G(FromPart) frompart, PART_BRIEF_F(frompart, NULL) as frompart_grid,aggregation, case aggregation  when 0 then \'none\' when 1 then \'AVG\' when 2 then \'COUNT\' when 3 then \'SUM\' when 4 then \'MIN\' when 5 then \'MAX\' when 6 then \'CUSTOM\'End  as aggregation_grid,sequence,the_alias,name,B2G(Field) field, FIELD_BRIEF_F(field, NULL) as field_grid,expression', 'ViewName' => 'viewcolumn', 'WhereClause' => ' parentstructrowid=G2B(\''. $id . '\')'));
	if (count($res) == 0) {
	    return null;
	} else {
	    return $res;
	}
  }
    function deleteRow($id = null) {
	  if (!empty($id) && $this->jservice->get(array('Action' => 'DeleteRow', 'PartName' => 'viewcolumn', 'RowID' => $id)) == 'OK')
	    $result = array('success' => TRUE);
	else
	    $result = array('success' => FALSE, 'msg' => 'Error while deleting record!');
	return $result;
    }
}
?>
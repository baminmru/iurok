
<?php
class  M_fieldrestriction extends CI_Model {
    function getRow($empId) {
    $result = array('success' => false, 'msg' => 'No Row ID for retrive data');
	if (!empty($empId)){
	    $res = $this->jservice->get(array('Action' => 'GetRowData','FieldList'=>'B2G(fieldrestrictionid) as fieldrestrictionid, B2G(fieldrestrictionid) as id,B2G(parentstructrowid) as parentid, FIELDRESTRICTION_BRIEF_F(fieldrestrictionid , NULL) as  brief,mandatoryfield, case mandatoryfield  when -1 then \'Не существенно\' when 0 then \'Нет\' when 1 then \'Да\'End  as mandatoryfield_grid,B2G(TheField) thefield, FIELD_BRIEF_F(thefield, NULL) as thefield_grid,B2G(ThePart) thepart, PART_BRIEF_F(thepart, NULL) as thepart_grid,allowmodify, case allowmodify  when -1 then \'Да\' when 0 then \'Нет\'End  as allowmodify_grid,allowread, case allowread  when -1 then \'Да\' when 0 then \'Нет\'End  as allowread_grid', 'PartName' => 'fieldrestriction', 'ID' =>  $empId 	));
	    if (!empty($res)) {
	        $result = $res[0];
	    }
	}
	return $result;
    }
    function setRow($data)  {
	    $data = (array)$data;
	if (!empty($data)) {
	    if (empty($data['fieldrestrictionid'])) {
	        $data['fieldrestrictionid'] = $this->jservice->get(array('Action' => 'NewGuid'));
	        $res=$this->jservice->get(array('Action' => 'NewRow', 'PartName' => 'fieldrestriction', 'RowID' => $data['fieldrestrictionid'], 'DocumentID' => $data['instanceid'],'ParentID' => $data['parentid'], 'Values'=>$data));
	       if(isset($res[0])){
	       	if($res[0]->result!='ok'){
	       		return array('success' => FALSE, 'msg' => $res[0]->result);
	       	} 
	       }else{
	       	return array('success' => FALSE, 'msg' => 'Unknown error' );
	       }
	    }else{
	    $res = $this->jservice->get(array('Action' => 'UpdateRow', 'PartName' => 'fieldrestriction', 'RowID' => $data['fieldrestrictionid'], 'DocumentID' => $data['instanceid'],'ParentID' => $data['parentid'], 'Values'=>$data));
	       if(isset($res[0])){
	       	if($res[0]->result!='ok'){
	       		return array('success' => FALSE, 'msg' => $res[0]->result);
	       	} 
	       }else{
	       	return array('success' => FALSE, 'msg' => 'Unknown error' );
	       }
	    }
	    return array('success' => TRUE, 'data' => $this->getRow($data['fieldrestrictionid'] ));
	} else {
	    return array('success' => FALSE, 'msg' => 'No data to store on server');
	}
    }
    function newRow($instanceid,$parentid,$data)  {
	  $id = $this->jservice->get(array('Action' => 'NewGuid'));
	if ($this->jservice->get(array('Action' => 'NewRow', 'PartName' => 'fieldrestriction', 'RowID' => $id, 'DocumentID' => $instanceid,'ParentID'=>$parentid, 'Values'=>$data)) == 'OK') {
	    return array('success' => TRUE, 'data' => $id);
	} else {
	    return array('success' => FALSE, 'msg' => 'Error while create new id');
	}
    }
    function getRows($sort=array())
		{
	    $res = $this->jservice->get(array('Action' => 'GetViewData','Sort'=>$sort,'FieldList'=>'B2G(fieldrestrictionid) as fieldrestrictionid, B2G(fieldrestrictionid) as id,B2G(parentstructrowid) as parentid, FIELDRESTRICTION_BRIEF_F(fieldrestrictionid , NULL) as  brief,mandatoryfield, case mandatoryfield  when -1 then \'Не существенно\' when 0 then \'Нет\' when 1 then \'Да\'End  as mandatoryfield_grid,B2G(TheField) thefield, FIELD_BRIEF_F(thefield, NULL) as thefield_grid,B2G(ThePart) thepart, PART_BRIEF_F(thepart, NULL) as thepart_grid,allowmodify, case allowmodify  when -1 then \'Да\' when 0 then \'Нет\'End  as allowmodify_grid,allowread, case allowread  when -1 then \'Да\' when 0 then \'Нет\'End  as allowread_grid', 'ViewName' => 'fieldrestriction'));
	    if (count($res)) {
	        return $res;
	    } else {
	        return null;
	    }
		}
    function getRowsByInstance($id,$sort=array())
		{
	$res = $this->jservice->get(array('Action' => 'GetViewData','Sort'=>$sort,'FieldList'=>'B2G(fieldrestrictionid) as fieldrestrictionid, B2G(fieldrestrictionid) as id,B2G(parentstructrowid) as parentid, FIELDRESTRICTION_BRIEF_F(fieldrestrictionid , NULL) as  brief,mandatoryfield, case mandatoryfield  when -1 then \'Не существенно\' when 0 then \'Нет\' when 1 then \'Да\'End  as mandatoryfield_grid,B2G(TheField) thefield, FIELD_BRIEF_F(thefield, NULL) as thefield_grid,B2G(ThePart) thepart, PART_BRIEF_F(thepart, NULL) as thepart_grid,allowmodify, case allowmodify  when -1 then \'Да\' when 0 then \'Нет\'End  as allowmodify_grid,allowread, case allowread  when -1 then \'Да\' when 0 then \'Нет\'End  as allowread_grid', 'ViewName' => 'fieldrestriction', 'WhereClause' => 'instanceid=G2B(\''. $id . '\')'));
	if (count($res) == 0) {
	    return null;
	} else {
	    return $res;
	}
		}
    function getRowsByParent($id,$sort=array())
	{
	$res = $this->jservice->get(array('Action' => 'GetViewData','Sort'=>$sort,'FieldList'=>'B2G(fieldrestrictionid) as fieldrestrictionid, B2G(fieldrestrictionid) as id,B2G(parentstructrowid) as parentid, FIELDRESTRICTION_BRIEF_F(fieldrestrictionid , NULL) as  brief,mandatoryfield, case mandatoryfield  when -1 then \'Не существенно\' when 0 then \'Нет\' when 1 then \'Да\'End  as mandatoryfield_grid,B2G(TheField) thefield, FIELD_BRIEF_F(thefield, NULL) as thefield_grid,B2G(ThePart) thepart, PART_BRIEF_F(thepart, NULL) as thepart_grid,allowmodify, case allowmodify  when -1 then \'Да\' when 0 then \'Нет\'End  as allowmodify_grid,allowread, case allowread  when -1 then \'Да\' when 0 then \'Нет\'End  as allowread_grid', 'ViewName' => 'fieldrestriction', 'WhereClause' => ' parentstructrowid=G2B(\''. $id . '\')'));
	if (count($res) == 0) {
	    return null;
	} else {
	    return $res;
	}
  }
    function deleteRow($id = null) {
	  if (!empty($id) && $this->jservice->get(array('Action' => 'DeleteRow', 'PartName' => 'fieldrestriction', 'RowID' => $id)) == 'OK')
	    $result = array('success' => TRUE);
	else
	    $result = array('success' => FALSE, 'msg' => 'Error while deleting record!');
	return $result;
    }
}
?>
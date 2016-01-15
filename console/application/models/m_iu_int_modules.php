
<?php
class  M_iu_int_modules extends CI_Model {
    function getRow($empId) {
    $result = array('success' => false, 'msg' => 'No Row ID for retrive data');
	if (!empty($empId)){
	    $res = $this->jservice->get(array('Action' => 'GetRowData','FieldList'=>'B2G(iu_int_modulesid) as iu_int_modulesid, B2G(iu_int_modulesid) as id,B2G(instanceid) as instanceid, iu_int_modules_BRIEF_F(iu_int_modulesid , NULL) as  brief,sequence,theicon,groupname,name,caption,visiblecontrol, case visiblecontrol  when -1 then \'Да\' when 0 then \'Нет\'End  as visiblecontrol_grid,controldocmode,otherdocmode,mydocmode,allobjects, case allobjects  when -1 then \'Да\' when 0 then \'Нет\'End  as allobjects_grid,colegsobject, case colegsobject  when -1 then \'Да\' when 0 then \'Нет\'End  as colegsobject_grid,substructobjects, case substructobjects  when -1 then \'Да\' when 0 then \'Нет\'End  as substructobjects_grid', 'PartName' => 'iu_int_modules', 'ID' =>  $empId 	));
	    if (!empty($res)) {
	        $result = $res[0];
	    }
	}
	return $result;
    }
    function setRow($data)  {
	    $data = (array)$data;
	if (!empty($data)) {
	    if (empty($data['iu_int_modulesid'])) {
	        $data['iu_int_modulesid'] = $this->jservice->get(array('Action' => 'NewGuid'));
	        $res=$this->jservice->get(array('Action' => 'NewRow', 'PartName' => 'iu_int_modules', 'RowID' => $data['iu_int_modulesid'], 'DocumentID' => $data['instanceid'], 'Values'=>$data));
	       if(isset($res[0])){
	       	if($res[0]->result!='ok'){
	       		return array('success' => FALSE, 'msg' => $res[0]->result);
	       	} 
	       }else{
	       	return array('success' => FALSE, 'msg' => 'Unknown error' );
	       }
	    }else{
	    $res = $this->jservice->get(array('Action' => 'UpdateRow', 'PartName' => 'iu_int_modules', 'RowID' => $data['iu_int_modulesid'], 'DocumentID' => $data['instanceid'], 'Values'=>$data));
	       if(isset($res[0])){
	       	if($res[0]->result!='ok'){
	       		return array('success' => FALSE, 'msg' => $res[0]->result);
	       	} 
	       }else{
	       	return array('success' => FALSE, 'msg' => 'Unknown error' );
	       }
	    }
	    return array('success' => TRUE, 'data' => $this->getRow($data['iu_int_modulesid'] ));
	} else {
	    return array('success' => FALSE, 'msg' => 'No data to store on server');
	}
    }
    function newRow($instanceid,$data)  {
	  $id = $this->jservice->get(array('Action' => 'NewGuid'));
	if ($this->jservice->get(array('Action' => 'NewRow', 'PartName' => 'iu_int_modules', 'RowID' => $id, 'DocumentID' => $instanceid, 'Values'=>$data)) == 'OK') {
	    return array('success' => TRUE, 'data' => $id);
	} else {
	    return array('success' => FALSE, 'msg' => 'Error while create new id');
	}
    }
    function getRows($sort=array())
		{
	    $res = $this->jservice->get(array('Action' => 'GetViewData','Sort'=>$sort,'FieldList'=>'B2G(iu_int_modulesid) as iu_int_modulesid, B2G(iu_int_modulesid) as id,B2G(instanceid) as instanceid, iu_int_modules_BRIEF_F(iu_int_modulesid , NULL) as  brief,sequence,theicon,groupname,name,caption,visiblecontrol, case visiblecontrol  when -1 then \'Да\' when 0 then \'Нет\'End  as visiblecontrol_grid,controldocmode,otherdocmode,mydocmode,allobjects, case allobjects  when -1 then \'Да\' when 0 then \'Нет\'End  as allobjects_grid,colegsobject, case colegsobject  when -1 then \'Да\' when 0 then \'Нет\'End  as colegsobject_grid,substructobjects, case substructobjects  when -1 then \'Да\' when 0 then \'Нет\'End  as substructobjects_grid', 'ViewName' => 'iu_int_modules'));
	    if (count($res)) {
	        return $res;
	    } else {
	        return null;
	    }
		}
    function getRowsByInstance($id,$sort=array())
		{
	$res = $this->jservice->get(array('Action' => 'GetViewData','Sort'=>$sort,'FieldList'=>'B2G(iu_int_modulesid) as iu_int_modulesid, B2G(iu_int_modulesid) as id,B2G(instanceid) as instanceid, iu_int_modules_BRIEF_F(iu_int_modulesid , NULL) as  brief,sequence,theicon,groupname,name,caption,visiblecontrol, case visiblecontrol  when -1 then \'Да\' when 0 then \'Нет\'End  as visiblecontrol_grid,controldocmode,otherdocmode,mydocmode,allobjects, case allobjects  when -1 then \'Да\' when 0 then \'Нет\'End  as allobjects_grid,colegsobject, case colegsobject  when -1 then \'Да\' when 0 then \'Нет\'End  as colegsobject_grid,substructobjects, case substructobjects  when -1 then \'Да\' when 0 then \'Нет\'End  as substructobjects_grid', 'ViewName' => 'iu_int_modules', 'WhereClause' => 'instanceid=G2B(\''. $id . '\')'));
	if (count($res) == 0) {
	    return null;
	} else {
	    return $res;
	}
		}
    function getRowsByParent($id,$sort=array())
	{
	$res = $this->jservice->get(array('Action' => 'GetViewData','Sort'=>$sort,'FieldList'=>'B2G(iu_int_modulesid) as iu_int_modulesid, B2G(iu_int_modulesid) as id,B2G(instanceid) as instanceid, iu_int_modules_BRIEF_F(iu_int_modulesid , NULL) as  brief,sequence,theicon,groupname,name,caption,visiblecontrol, case visiblecontrol  when -1 then \'Да\' when 0 then \'Нет\'End  as visiblecontrol_grid,controldocmode,otherdocmode,mydocmode,allobjects, case allobjects  when -1 then \'Да\' when 0 then \'Нет\'End  as allobjects_grid,colegsobject, case colegsobject  when -1 then \'Да\' when 0 then \'Нет\'End  as colegsobject_grid,substructobjects, case substructobjects  when -1 then \'Да\' when 0 then \'Нет\'End  as substructobjects_grid', 'ViewName' => 'iu_int_modules', 'WhereClause' => ' parentstructrowid=G2B(\''. $id . '\')'));
	if (count($res) == 0) {
	    return null;
	} else {
	    return $res;
	}
  }
    function deleteRow($id = null) {
	  if (!empty($id) && $this->jservice->get(array('Action' => 'DeleteRow', 'PartName' => 'iu_int_modules', 'RowID' => $id)) == 'OK')
	    $result = array('success' => TRUE);
	else
	    $result = array('success' => FALSE, 'msg' => 'Error while deleting record!');
	return $result;
    }
}
?>
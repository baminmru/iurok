
<?php
class  M_iu_rcfg_mod extends CI_Model {
    function getRow($empId) {
    $result = array('success' => false, 'msg' => 'No Row ID for retrive data');
	if (!empty($empId)){
	    $res = $this->jservice->get(array('Action' => 'GetRowData','FieldList'=>'B2G(iu_rcfg_modid) as iu_rcfg_modid, B2G(iu_rcfg_modid) as id,B2G(instanceid) as instanceid, iu_rcfg_mod_BRIEF_F(iu_rcfg_modid , NULL) as  brief,sequence,caption,theicon,name,groupname,moduleaccessible, case moduleaccessible  when -1 then \'Да\' when 0 then \'Нет\'End  as moduleaccessible_grid,visiblecontrol, case visiblecontrol  when -1 then \'Да\' when 0 then \'Нет\'End  as visiblecontrol_grid,allobjects, case allobjects  when -1 then \'Да\' when 0 then \'Нет\'End  as allobjects_grid,colegsobject, case colegsobject  when -1 then \'Да\' when 0 then \'Нет\'End  as colegsobject_grid,substructobjects, case substructobjects  when -1 then \'Да\' when 0 then \'Нет\'End  as substructobjects_grid,tmobjects, case tmobjects  when -1 then \'Да\' when 0 then \'Нет\'End  as tmobjects_grid,mydocmode,otherdocmode,controldocmode', 'PartName' => 'iu_rcfg_mod', 'ID' =>  $empId 	));
	    if (!empty($res)) {
	        $result = $res[0];
	    }
	}
	return $result;
    }
    function setRow($data)  {
	    $data = (array)$data;
	if (!empty($data)) {
	    if (empty($data['iu_rcfg_modid'])) {
	        $data['iu_rcfg_modid'] = $this->jservice->get(array('Action' => 'NewGuid'));
	        $res=$this->jservice->get(array('Action' => 'NewRow', 'PartName' => 'iu_rcfg_mod', 'RowID' => $data['iu_rcfg_modid'], 'DocumentID' => $data['instanceid'], 'Values'=>$data));
	       if(isset($res[0])){
	       	if($res[0]->result!='ok'){
	       		return array('success' => FALSE, 'msg' => $res[0]->result);
	       	} 
	       }else{
	       	return array('success' => FALSE, 'msg' => 'Unknown error' );
	       }
	    }else{
	    $res = $this->jservice->get(array('Action' => 'UpdateRow', 'PartName' => 'iu_rcfg_mod', 'RowID' => $data['iu_rcfg_modid'], 'DocumentID' => $data['instanceid'], 'Values'=>$data));
	       if(isset($res[0])){
	       	if($res[0]->result!='ok'){
	       		return array('success' => FALSE, 'msg' => $res[0]->result);
	       	} 
	       }else{
	       	return array('success' => FALSE, 'msg' => 'Unknown error' );
	       }
	    }
	    return array('success' => TRUE, 'data' => $this->getRow($data['iu_rcfg_modid'] ));
	} else {
	    return array('success' => FALSE, 'msg' => 'No data to store on server');
	}
    }
    function newRow($instanceid,$data)  {
	  $id = $this->jservice->get(array('Action' => 'NewGuid'));
	if ($this->jservice->get(array('Action' => 'NewRow', 'PartName' => 'iu_rcfg_mod', 'RowID' => $id, 'DocumentID' => $instanceid, 'Values'=>$data)) == 'OK') {
	    return array('success' => TRUE, 'data' => $id);
	} else {
	    return array('success' => FALSE, 'msg' => 'Error while create new id');
	}
    }
    function getRows($sort=array())
		{
	    $res = $this->jservice->get(array('Action' => 'GetViewData','Sort'=>$sort,'FieldList'=>'B2G(iu_rcfg_modid) as iu_rcfg_modid, B2G(iu_rcfg_modid) as id,B2G(instanceid) as instanceid, iu_rcfg_mod_BRIEF_F(iu_rcfg_modid , NULL) as  brief,sequence,caption,theicon,name,groupname,moduleaccessible, case moduleaccessible  when -1 then \'Да\' when 0 then \'Нет\'End  as moduleaccessible_grid,visiblecontrol, case visiblecontrol  when -1 then \'Да\' when 0 then \'Нет\'End  as visiblecontrol_grid,allobjects, case allobjects  when -1 then \'Да\' when 0 then \'Нет\'End  as allobjects_grid,colegsobject, case colegsobject  when -1 then \'Да\' when 0 then \'Нет\'End  as colegsobject_grid,substructobjects, case substructobjects  when -1 then \'Да\' when 0 then \'Нет\'End  as substructobjects_grid,tmobjects, case tmobjects  when -1 then \'Да\' when 0 then \'Нет\'End  as tmobjects_grid,mydocmode,otherdocmode,controldocmode', 'ViewName' => 'iu_rcfg_mod'));
	    if (count($res)) {
	        return $res;
	    } else {
	        return null;
	    }
		}
    function getRowsByInstance($id,$sort=array())
		{
	$res = $this->jservice->get(array('Action' => 'GetViewData','Sort'=>$sort,'FieldList'=>'B2G(iu_rcfg_modid) as iu_rcfg_modid, B2G(iu_rcfg_modid) as id,B2G(instanceid) as instanceid, iu_rcfg_mod_BRIEF_F(iu_rcfg_modid , NULL) as  brief,sequence,caption,theicon,name,groupname,moduleaccessible, case moduleaccessible  when -1 then \'Да\' when 0 then \'Нет\'End  as moduleaccessible_grid,visiblecontrol, case visiblecontrol  when -1 then \'Да\' when 0 then \'Нет\'End  as visiblecontrol_grid,allobjects, case allobjects  when -1 then \'Да\' when 0 then \'Нет\'End  as allobjects_grid,colegsobject, case colegsobject  when -1 then \'Да\' when 0 then \'Нет\'End  as colegsobject_grid,substructobjects, case substructobjects  when -1 then \'Да\' when 0 then \'Нет\'End  as substructobjects_grid,tmobjects, case tmobjects  when -1 then \'Да\' when 0 then \'Нет\'End  as tmobjects_grid,mydocmode,otherdocmode,controldocmode', 'ViewName' => 'iu_rcfg_mod', 'WhereClause' => 'instanceid=G2B(\''. $id . '\')'));
	if (count($res) == 0) {
	    return null;
	} else {
	    return $res;
	}
		}
    function getRowsByParent($id,$sort=array())
	{
	$res = $this->jservice->get(array('Action' => 'GetViewData','Sort'=>$sort,'FieldList'=>'B2G(iu_rcfg_modid) as iu_rcfg_modid, B2G(iu_rcfg_modid) as id,B2G(instanceid) as instanceid, iu_rcfg_mod_BRIEF_F(iu_rcfg_modid , NULL) as  brief,sequence,caption,theicon,name,groupname,moduleaccessible, case moduleaccessible  when -1 then \'Да\' when 0 then \'Нет\'End  as moduleaccessible_grid,visiblecontrol, case visiblecontrol  when -1 then \'Да\' when 0 then \'Нет\'End  as visiblecontrol_grid,allobjects, case allobjects  when -1 then \'Да\' when 0 then \'Нет\'End  as allobjects_grid,colegsobject, case colegsobject  when -1 then \'Да\' when 0 then \'Нет\'End  as colegsobject_grid,substructobjects, case substructobjects  when -1 then \'Да\' when 0 then \'Нет\'End  as substructobjects_grid,tmobjects, case tmobjects  when -1 then \'Да\' when 0 then \'Нет\'End  as tmobjects_grid,mydocmode,otherdocmode,controldocmode', 'ViewName' => 'iu_rcfg_mod', 'WhereClause' => ' parentstructrowid=G2B(\''. $id . '\')'));
	if (count($res) == 0) {
	    return null;
	} else {
	    return $res;
	}
  }
    function deleteRow($id = null) {
	  if (!empty($id) && $this->jservice->get(array('Action' => 'DeleteRow', 'PartName' => 'iu_rcfg_mod', 'RowID' => $id)) == 'OK')
	    $result = array('success' => TRUE);
	else
	    $result = array('success' => FALSE, 'msg' => 'Error while deleting record!');
	return $result;
    }
}
?>
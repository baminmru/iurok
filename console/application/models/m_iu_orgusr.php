
<?php
class  M_iu_orgusr extends CI_Model {
    function getRow($empId) {
    $result = array('success' => false, 'msg' => 'No Row ID for retrive data');
	if (!empty($empId)){
	    $res = $this->jservice->get(array('Action' => 'GetRowData','FieldList'=>'B2G(iu_orgusrid) as iu_orgusrid, B2G(iu_orgusrid) as id,B2G(parentstructrowid) as parentid, iu_orgusr_BRIEF_F(iu_orgusrid , NULL) as  brief,B2G(orguser) orguser, iu_u_def_BRIEF_F(orguser, NULL) as orguser_grid,ismanager, case ismanager  when -1 then \'Да\' when 0 then \'Нет\'End  as ismanager_grid', 'PartName' => 'iu_orgusr', 'ID' =>  $empId 	));
	    if (!empty($res)) {
	        $result = $res[0];
	    }
	}
	return $result;
    }
    function setRow($data)  {
	    $data = (array)$data;
	if (!empty($data)) {
	    if (empty($data['iu_orgusrid'])) {
	        $data['iu_orgusrid'] = $this->jservice->get(array('Action' => 'NewGuid'));
	        $res=$this->jservice->get(array('Action' => 'NewRow', 'PartName' => 'iu_orgusr', 'RowID' => $data['iu_orgusrid'], 'DocumentID' => $data['instanceid'],'ParentID' => $data['parentid'], 'Values'=>$data));
	       if(isset($res[0])){
	       	if($res[0]->result!='ok'){
	       		return array('success' => FALSE, 'msg' => $res[0]->result);
	       	} 
	       }else{
	       	return array('success' => FALSE, 'msg' => 'Unknown error' );
	       }
	    }else{
	    $res = $this->jservice->get(array('Action' => 'UpdateRow', 'PartName' => 'iu_orgusr', 'RowID' => $data['iu_orgusrid'], 'DocumentID' => $data['instanceid'],'ParentID' => $data['parentid'], 'Values'=>$data));
	       if(isset($res[0])){
	       	if($res[0]->result!='ok'){
	       		return array('success' => FALSE, 'msg' => $res[0]->result);
	       	} 
	       }else{
	       	return array('success' => FALSE, 'msg' => 'Unknown error' );
	       }
	    }
	    return array('success' => TRUE, 'data' => $this->getRow($data['iu_orgusrid'] ));
	} else {
	    return array('success' => FALSE, 'msg' => 'No data to store on server');
	}
    }
    function newRow($instanceid,$parentid,$data)  {
	  $id = $this->jservice->get(array('Action' => 'NewGuid'));
	if ($this->jservice->get(array('Action' => 'NewRow', 'PartName' => 'iu_orgusr', 'RowID' => $id, 'DocumentID' => $instanceid,'ParentID'=>$parentid, 'Values'=>$data)) == 'OK') {
	    return array('success' => TRUE, 'data' => $id);
	} else {
	    return array('success' => FALSE, 'msg' => 'Error while create new id');
	}
    }
    function getRows($sort=array())
		{
	    $res = $this->jservice->get(array('Action' => 'GetViewData','Sort'=>$sort,'FieldList'=>'B2G(iu_orgusrid) as iu_orgusrid, B2G(iu_orgusrid) as id,B2G(parentstructrowid) as parentid, iu_orgusr_BRIEF_F(iu_orgusrid , NULL) as  brief,B2G(orguser) orguser, iu_u_def_BRIEF_F(orguser, NULL) as orguser_grid,ismanager, case ismanager  when -1 then \'Да\' when 0 then \'Нет\'End  as ismanager_grid', 'ViewName' => 'iu_orgusr'));
	    if (count($res)) {
	        return $res;
	    } else {
	        return null;
	    }
		}
    function getRowsByInstance($id,$sort=array())
		{
	$res = $this->jservice->get(array('Action' => 'GetViewData','Sort'=>$sort,'FieldList'=>'B2G(iu_orgusrid) as iu_orgusrid, B2G(iu_orgusrid) as id,B2G(parentstructrowid) as parentid, iu_orgusr_BRIEF_F(iu_orgusrid , NULL) as  brief,B2G(orguser) orguser, iu_u_def_BRIEF_F(orguser, NULL) as orguser_grid,ismanager, case ismanager  when -1 then \'Да\' when 0 then \'Нет\'End  as ismanager_grid', 'ViewName' => 'iu_orgusr', 'WhereClause' => 'instanceid=G2B(\''. $id . '\')'));
	if (count($res) == 0) {
	    return null;
	} else {
	    return $res;
	}
		}
    function getRowsByParent($id,$sort=array())
	{
	$res = $this->jservice->get(array('Action' => 'GetViewData','Sort'=>$sort,'FieldList'=>'B2G(iu_orgusrid) as iu_orgusrid, B2G(iu_orgusrid) as id,B2G(parentstructrowid) as parentid, iu_orgusr_BRIEF_F(iu_orgusrid , NULL) as  brief,B2G(orguser) orguser, iu_u_def_BRIEF_F(orguser, NULL) as orguser_grid,ismanager, case ismanager  when -1 then \'Да\' when 0 then \'Нет\'End  as ismanager_grid', 'ViewName' => 'iu_orgusr', 'WhereClause' => ' parentstructrowid=G2B(\''. $id . '\')'));
	if (count($res) == 0) {
	    return null;
	} else {
	    return $res;
	}
  }
    function deleteRow($id = null) {
	  if (!empty($id) && $this->jservice->get(array('Action' => 'DeleteRow', 'PartName' => 'iu_orgusr', 'RowID' => $id)) == 'OK')
	    $result = array('success' => TRUE);
	else
	    $result = array('success' => FALSE, 'msg' => 'Error while deleting record!');
	return $result;
    }
}
?>
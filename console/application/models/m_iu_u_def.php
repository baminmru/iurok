
<?php
class  M_iu_u_def extends CI_Model {
    function getRowTemp($empId) {
    $result = array('success' => false, 'msg' => 'No Row ID for retrive data');
	if (!empty($empId)){
	    $res = $this->jservice->get(array('Action' => 'GetRowDataTemp','FieldList'=>'B2G(iu_u_defid) as iu_u_defid, B2G(iu_u_defid) as id,B2G(instanceid) as instanceid, iu_u_def_BRIEF_F(iu_u_defid , NULL) as  brief,lastname,name,surname,B2G(curRole) currole, iu_crole_BRIEF_F(currole, NULL) as currole_grid,B2G(theTown) thetown, iud_town_BRIEF_F(thetown, NULL) as thetown_grid,sendtomail, case sendtomail  when -1 then \'Да\' when 0 then \'Нет\'End  as sendtomail_grid,freelancer, case freelancer  when -1 then \'Да\' when 0 then \'Нет\'End  as freelancer_grid,email,thephone,login', 'PartName' => 'iu_u_def', 'ID' =>  $empId 	));
	    if (!empty($res)) {
	        $result = $res[0];
	    }
	}
	return $result;
    }
    function getRow($empId) {
    $result = array('success' => false, 'msg' => 'No Row ID for retrive data');
	if (!empty($empId)){
	    $res = $this->jservice->get(array('Action' => 'GetRowData','FieldList'=>'B2G(iu_u_defid) as iu_u_defid, B2G(iu_u_defid) as id,B2G(instanceid) as instanceid, iu_u_def_BRIEF_F(iu_u_defid , NULL) as  brief,lastname,name,surname,B2G(curRole) currole, iu_crole_BRIEF_F(currole, NULL) as currole_grid,B2G(theTown) thetown, iud_town_BRIEF_F(thetown, NULL) as thetown_grid,sendtomail, case sendtomail  when -1 then \'Да\' when 0 then \'Нет\'End  as sendtomail_grid,freelancer, case freelancer  when -1 then \'Да\' when 0 then \'Нет\'End  as freelancer_grid,email,thephone,login', 'PartName' => 'iu_u_def', 'ID' =>  $empId 	));
	    if (!empty($res)) {
	        $result = $res[0];
	    }
	}
	return $result;
    }
    function setRow($data)  {
	    $data = (array)$data;
	if (!empty($data)) {
	    if (empty($data['iu_u_defid'])) {
	        $data['iu_u_defid'] = $this->jservice->get(array('Action' => 'NewGuid'));
	        $res=$this->jservice->get(array('Action' => 'NewRow', 'PartName' => 'iu_u_def', 'RowID' => $data['iu_u_defid'], 'DocumentID' => $data['instanceid'], 'Values'=>$data));
	       if(isset($res[0])){
	       	if($res[0]->result!='ok'){
	       		return array('success' => FALSE, 'msg' => $res[0]->result);
	       	} 
	       }else{
	       	return array('success' => FALSE, 'msg' => 'Unknown error' );
	       }
	    }else{
	    $res = $this->jservice->get(array('Action' => 'UpdateRow', 'PartName' => 'iu_u_def', 'RowID' => $data['iu_u_defid'], 'DocumentID' => $data['instanceid'], 'Values'=>$data));
	       if(isset($res[0])){
	       	if($res[0]->result!='ok'){
	       		return array('success' => FALSE, 'msg' => $res[0]->result);
	       	} 
	       }else{
	       	return array('success' => FALSE, 'msg' => 'Unknown error' );
	       }
	    }
	    return array('success' => TRUE, 'data' => $this->getRowTemp($data['iu_u_defid'] ));
	} else {
	    return array('success' => FALSE, 'msg' => 'No data to store on server');
	}
    }
    function newRow($instanceid,$data)  {
	  $id = $this->jservice->get(array('Action' => 'NewGuid'));
	if ($this->jservice->get(array('Action' => 'NewRow', 'PartName' => 'iu_u_def', 'RowID' => $id, 'DocumentID' => $instanceid, 'Values'=>$data)) == 'OK') {
	    return array('success' => TRUE, 'data' => $id);
	} else {
	    return array('success' => FALSE, 'msg' => 'Error while create new id');
	}
    }
    function getRowsTemp($sort=array())
		{
	    $res = $this->jservice->get(array('Action' => 'GetViewDataTemp','Sort'=>$sort,'FieldList'=>'B2G(iu_u_defid) as iu_u_defid, B2G(iu_u_defid) as id,B2G(instanceid) as instanceid, iu_u_def_BRIEF_F(iu_u_defid , NULL) as  brief,lastname,name,surname,B2G(curRole) currole, iu_crole_BRIEF_F(currole, NULL) as currole_grid,B2G(theTown) thetown, iud_town_BRIEF_F(thetown, NULL) as thetown_grid,sendtomail, case sendtomail  when -1 then \'Да\' when 0 then \'Нет\'End  as sendtomail_grid,freelancer, case freelancer  when -1 then \'Да\' when 0 then \'Нет\'End  as freelancer_grid,email,thephone,login', 'ViewName' => 'iu_u_def'));
	    if (count($res)) {
	        return $res;
	    } else {
	        return null;
	    }
		}
    function getRowsByInstanceTemp($id,$sort=array())
		{
	$res = $this->jservice->get(array('Action' => 'GetViewDataTemp','Sort'=>$sort,'FieldList'=>'B2G(iu_u_defid) as iu_u_defid, B2G(iu_u_defid) as id,B2G(instanceid) as instanceid, iu_u_def_BRIEF_F(iu_u_defid , NULL) as  brief,lastname,name,surname,B2G(curRole) currole, iu_crole_BRIEF_F(currole, NULL) as currole_grid,B2G(theTown) thetown, iud_town_BRIEF_F(thetown, NULL) as thetown_grid,sendtomail, case sendtomail  when -1 then \'Да\' when 0 then \'Нет\'End  as sendtomail_grid,freelancer, case freelancer  when -1 then \'Да\' when 0 then \'Нет\'End  as freelancer_grid,email,thephone,login', 'ViewName' => 'iu_u_def', 'WhereClause' => 'instanceid=G2B(\''. $id . '\')'));
	if (count($res) == 0) {
	    return null;
	} else {
	    return $res;
	}
		}
    function getRowsByParentTemp($id,$sort=array())
	{
	$res = $this->jservice->get(array('Action' => 'GetViewDataTemp','Sort'=>$sort,'FieldList'=>'B2G(iu_u_defid) as iu_u_defid, B2G(iu_u_defid) as id,B2G(instanceid) as instanceid, iu_u_def_BRIEF_F(iu_u_defid , NULL) as  brief,lastname,name,surname,B2G(curRole) currole, iu_crole_BRIEF_F(currole, NULL) as currole_grid,B2G(theTown) thetown, iud_town_BRIEF_F(thetown, NULL) as thetown_grid,sendtomail, case sendtomail  when -1 then \'Да\' when 0 then \'Нет\'End  as sendtomail_grid,freelancer, case freelancer  when -1 then \'Да\' when 0 then \'Нет\'End  as freelancer_grid,email,thephone,login', 'ViewName' => 'iu_u_def', 'WhereClause' => ' parentstructrowid=G2B(\''. $id . '\')'));
	if (count($res) == 0) {
	    return null;
	} else {
	    return $res;
	}
  }
    function getRows($sort=array())
		{
	    $res = $this->jservice->get(array('Action' => 'GetViewData','Sort'=>$sort,'FieldList'=>'B2G(iu_u_defid) as iu_u_defid, B2G(iu_u_defid) as id,B2G(instanceid) as instanceid, iu_u_def_BRIEF_F(iu_u_defid , NULL) as  brief,lastname,name,surname,B2G(curRole) currole, iu_crole_BRIEF_F(currole, NULL) as currole_grid,B2G(theTown) thetown, iud_town_BRIEF_F(thetown, NULL) as thetown_grid,sendtomail, case sendtomail  when -1 then \'Да\' when 0 then \'Нет\'End  as sendtomail_grid,freelancer, case freelancer  when -1 then \'Да\' when 0 then \'Нет\'End  as freelancer_grid,email,thephone,login', 'WhereClause' =>'NotArchived(instanceid)=1', 'ViewName' => 'iu_u_def'));
	    if (count($res)) {
	        return $res;
	    } else {
	        return null;
	    }
		}
    function getRowsByInstance($id,$sort=array())
		{
	$res = $this->jservice->get(array('Action' => 'GetViewData','Sort'=>$sort,'FieldList'=>'B2G(iu_u_defid) as iu_u_defid, B2G(iu_u_defid) as id,B2G(instanceid) as instanceid, iu_u_def_BRIEF_F(iu_u_defid , NULL) as  brief,lastname,name,surname,B2G(curRole) currole, iu_crole_BRIEF_F(currole, NULL) as currole_grid,B2G(theTown) thetown, iud_town_BRIEF_F(thetown, NULL) as thetown_grid,sendtomail, case sendtomail  when -1 then \'Да\' when 0 then \'Нет\'End  as sendtomail_grid,freelancer, case freelancer  when -1 then \'Да\' when 0 then \'Нет\'End  as freelancer_grid,email,thephone,login', 'ViewName' => 'iu_u_def', 'WhereClause' => 'instanceid=G2B(\''. $id . '\')'));
	if (count($res) == 0) {
	    return null;
	} else {
	    return $res;
	}
		}
    function getRowsByParent($id,$sort=array())
	{
	$res = $this->jservice->get(array('Action' => 'GetViewData','Sort'=>$sort,'FieldList'=>'B2G(iu_u_defid) as iu_u_defid, B2G(iu_u_defid) as id,B2G(instanceid) as instanceid, iu_u_def_BRIEF_F(iu_u_defid , NULL) as  brief,lastname,name,surname,B2G(curRole) currole, iu_crole_BRIEF_F(currole, NULL) as currole_grid,B2G(theTown) thetown, iud_town_BRIEF_F(thetown, NULL) as thetown_grid,sendtomail, case sendtomail  when -1 then \'Да\' when 0 then \'Нет\'End  as sendtomail_grid,freelancer, case freelancer  when -1 then \'Да\' when 0 then \'Нет\'End  as freelancer_grid,email,thephone,login', 'ViewName' => 'iu_u_def', 'WhereClause' => ' parentstructrowid=G2B(\''. $id . '\')'));
	if (count($res) == 0) {
	    return null;
	} else {
	    return $res;
	}
  }
    function deleteRow($id = null) {
	  if (!empty($id) && $this->jservice->get(array('Action' => 'ArchiveRow', 'PartName' => 'iu_u_def', 'RowID' => $id)) == 'OK')
	    $result = array('success' => TRUE);
	else
	    $result = array('success' => FALSE, 'msg' => 'Error while deleting record!');
	return $result;
    }
}
?>
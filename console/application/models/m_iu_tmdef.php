
<?php
class  M_iu_tmdef extends CI_Model {
    function getRow($empId) {
    $result = array('success' => false, 'msg' => 'No Row ID for retrive data');
	if (!empty($empId)){
	    $res = $this->jservice->get(array('Action' => 'GetRowData','FieldList'=>'B2G(iu_tmdefid) as iu_tmdefid, B2G(iu_tmdefid) as id,B2G(instanceid) as instanceid, iu_tmdef_BRIEF_F(iu_tmdefid , NULL) as  brief,lastname,name,surname,subjects, iud_predmet_MREF_F(subjects, NULL) as  subjects_grid,classes,thephone,email,sendtomail, case sendtomail  when -1 then \'Да\' when 0 then \'Нет\'End  as sendtomail_grid,regal,ismethodist, case ismethodist  when -1 then \'Да\' when 0 then \'Нет\'End  as ismethodist_grid,B2G(theTown) thetown, iud_town_BRIEF_F(thetown, NULL) as thetown_grid,workat', 'PartName' => 'iu_tmdef', 'ID' =>  $empId 	));
	    if (!empty($res)) {
	        $result = $res[0];
	    }
	}
	return $result;
    }
    function setRow($data)  {
	    $data = (array)$data;
	if (!empty($data)) {
	    if (empty($data['iu_tmdefid'])) {
	        $data['iu_tmdefid'] = $this->jservice->get(array('Action' => 'NewGuid'));
	        $res=$this->jservice->get(array('Action' => 'NewRow', 'PartName' => 'iu_tmdef', 'RowID' => $data['iu_tmdefid'], 'DocumentID' => $data['instanceid'], 'Values'=>$data));
	       if(isset($res[0])){
	       	if($res[0]->result!='ok'){
	       		return array('success' => FALSE, 'msg' => $res[0]->result);
	       	} 
	       }else{
	       	return array('success' => FALSE, 'msg' => 'Unknown error' );
	       }
	    }else{
	    $res = $this->jservice->get(array('Action' => 'UpdateRow', 'PartName' => 'iu_tmdef', 'RowID' => $data['iu_tmdefid'], 'DocumentID' => $data['instanceid'], 'Values'=>$data));
	       if(isset($res[0])){
	       	if($res[0]->result!='ok'){
	       		return array('success' => FALSE, 'msg' => $res[0]->result);
	       	} 
	       }else{
	       	return array('success' => FALSE, 'msg' => 'Unknown error' );
	       }
	    }
	    return array('success' => TRUE, 'data' => $this->getRow($data['iu_tmdefid'] ));
	} else {
	    return array('success' => FALSE, 'msg' => 'No data to store on server');
	}
    }
    function newRow($instanceid,$data)  {
	  $id = $this->jservice->get(array('Action' => 'NewGuid'));
	if ($this->jservice->get(array('Action' => 'NewRow', 'PartName' => 'iu_tmdef', 'RowID' => $id, 'DocumentID' => $instanceid, 'Values'=>$data)) == 'OK') {
	    return array('success' => TRUE, 'data' => $id);
	} else {
	    return array('success' => FALSE, 'msg' => 'Error while create new id');
	}
    }
    function getRows($sort=array())
		{
	    $res = $this->jservice->get(array('Action' => 'GetViewData','Sort'=>$sort,'FieldList'=>'B2G(iu_tmdefid) as iu_tmdefid, B2G(iu_tmdefid) as id,B2G(instanceid) as instanceid, iu_tmdef_BRIEF_F(iu_tmdefid , NULL) as  brief,lastname,name,surname,subjects, iud_predmet_MREF_F(subjects, NULL) as  subjects_grid,classes,thephone,email,sendtomail, case sendtomail  when -1 then \'Да\' when 0 then \'Нет\'End  as sendtomail_grid,regal,ismethodist, case ismethodist  when -1 then \'Да\' when 0 then \'Нет\'End  as ismethodist_grid,B2G(theTown) thetown, iud_town_BRIEF_F(thetown, NULL) as thetown_grid,workat', 'WhereClause' =>'NotArchived(instanceid)=1','ViewName' => 'iu_tmdef'));
	    if (count($res)) {
	        return $res;
	    } else {
	        return null;
	    }
		}
    function getRowsByInstance($id,$sort=array())
		{
	$res = $this->jservice->get(array('Action' => 'GetViewData','Sort'=>$sort,'FieldList'=>'B2G(iu_tmdefid) as iu_tmdefid, B2G(iu_tmdefid) as id,B2G(instanceid) as instanceid, iu_tmdef_BRIEF_F(iu_tmdefid , NULL) as  brief,lastname,name,surname,subjects, iud_predmet_MREF_F(subjects, NULL) as  subjects_grid,classes,thephone,email,sendtomail, case sendtomail  when -1 then \'Да\' when 0 then \'Нет\'End  as sendtomail_grid,regal,ismethodist, case ismethodist  when -1 then \'Да\' when 0 then \'Нет\'End  as ismethodist_grid,B2G(theTown) thetown, iud_town_BRIEF_F(thetown, NULL) as thetown_grid,workat', 'ViewName' => 'iu_tmdef', 'WhereClause' => 'instanceid=G2B(\''. $id . '\')'));
	if (count($res) == 0) {
	    return null;
	} else {
	    return $res;
	}
		}
    function getRowsByParent($id,$sort=array())
	{
	$res = $this->jservice->get(array('Action' => 'GetViewData','Sort'=>$sort,'FieldList'=>'B2G(iu_tmdefid) as iu_tmdefid, B2G(iu_tmdefid) as id,B2G(instanceid) as instanceid, iu_tmdef_BRIEF_F(iu_tmdefid , NULL) as  brief,lastname,name,surname,subjects, iud_predmet_MREF_F(subjects, NULL) as  subjects_grid,classes,thephone,email,sendtomail, case sendtomail  when -1 then \'Да\' when 0 then \'Нет\'End  as sendtomail_grid,regal,ismethodist, case ismethodist  when -1 then \'Да\' when 0 then \'Нет\'End  as ismethodist_grid,B2G(theTown) thetown, iud_town_BRIEF_F(thetown, NULL) as thetown_grid,workat', 'ViewName' => 'iu_tmdef', 'WhereClause' => ' parentstructrowid=G2B(\''. $id . '\')'));
	if (count($res) == 0) {
	    return null;
	} else {
	    return $res;
	}
  }
    function deleteRow($id = null) {
	  if (!empty($id) && $this->jservice->get(array('Action' => 'ArchiveRow', 'PartName' => 'iu_tmdef', 'RowID' => $id)) == 'OK')
	    $result = array('success' => TRUE);
	else
	    $result = array('success' => FALSE, 'msg' => 'Error while deleting record!');
	return $result;
    }
}
?>
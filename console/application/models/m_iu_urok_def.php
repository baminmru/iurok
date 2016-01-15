
<?php
class  M_iu_urok_def extends CI_Model {
    function getRow($empId) {
    $result = array('success' => false, 'msg' => 'No Row ID for retrive data');
	if (!empty($empId)){
	    $res = $this->jservice->get(array('Action' => 'GetRowData','FieldList'=>'B2G(iu_urok_defid) as iu_urok_defid, B2G(iu_urok_defid) as id,B2G(instanceid) as instanceid, iu_urok_def_BRIEF_F(iu_urok_defid , NULL) as  brief,ucode,  DATE_FORMAT(datecreated,\'%Y-%m-%d %H:%i:%s\') as  datecreated,B2G(subject) subject, iud_predmet_BRIEF_F(subject, NULL) as subject_grid,B2G(theClassnum) theclassnum, iu_clsinfo_BRIEF_F(theclassnum, NULL) as theclassnum_grid,plannum,B2G(maketown) maketown, iud_town_BRIEF_F(maketown, NULL) as maketown_grid,  DATE_FORMAT(actiondate,\'%Y-%m-%d\') as  actiondate,  DATE_FORMAT(actiondate2,\'%Y-%m-%d\') as  actiondate2,B2G(coursetype) coursetype, iud_ctype_BRIEF_F(coursetype, NULL) as coursetype_grid,rtheme,classtheme,thequarter, case thequarter  when 0 then \'?\' when 1 then \'I\' when 2 then \'II\' when 3 then \'III\' when 4 then \'IV\'End  as thequarter_grid,  schooldate as  schooldate,B2G(curator) curator, iu_u_def_BRIEF_F(curator, NULL) as curator_grid,B2G(theTeacher) theteacher, iu_tmdef_BRIEF_F(theteacher, NULL) as theteacher_grid,B2G(methodist) methodist, iu_tmdef_BRIEF_F(methodist, NULL) as methodist_grid,B2G(methodist2) methodist2, iu_tmdef_BRIEF_F(methodist2, NULL) as methodist2_grid,B2G(processtype) processtype, iud_process_def_BRIEF_F(processtype, NULL) as processtype_grid,B2G(CKKSn) ckksn, iud_sn_def_BRIEF_F(ckksn, NULL) as ckksn_grid,testpageref,B2G(pubState) pubstate, iud_spub_BRIEF_F(pubstate, NULL) as pubstate_grid,mainref,B2G(TheFilm) thefilm, iu_urok_def_BRIEF_F(thefilm, NULL) as thefilm_grid,thefilmurl,info,notes', 'PartName' => 'iu_urok_def', 'ID' =>  $empId 	));
	    if (!empty($res)) {
	        $result = $res[0];
	    }
	}
	return $result;
    }
    function setRow($data)  {
	    $data = (array)$data;
	if (!empty($data)) {
	    if (empty($data['iu_urok_defid'])) {
	        $data['iu_urok_defid'] = $this->jservice->get(array('Action' => 'NewGuid'));
	        $res=$this->jservice->get(array('Action' => 'NewRow', 'PartName' => 'iu_urok_def', 'RowID' => $data['iu_urok_defid'], 'DocumentID' => $data['instanceid'], 'Values'=>$data));
	       if(isset($res[0])){
	       	if($res[0]->result!='ok'){
	       		return array('success' => FALSE, 'msg' => $res[0]->result);
	       	} 
	       }else{
	       	return array('success' => FALSE, 'msg' => 'Unknown error' );
	       }
	    }else{
	    $res = $this->jservice->get(array('Action' => 'UpdateRow', 'PartName' => 'iu_urok_def', 'RowID' => $data['iu_urok_defid'], 'DocumentID' => $data['instanceid'], 'Values'=>$data));
	       if(isset($res[0])){
	       	if($res[0]->result!='ok'){
	       		return array('success' => FALSE, 'msg' => $res[0]->result);
	       	} 
	       }else{
	       	return array('success' => FALSE, 'msg' => 'Unknown error' );
	       }
	    }
	    return array('success' => TRUE, 'data' => $this->getRow($data['iu_urok_defid'] ));
	} else {
	    return array('success' => FALSE, 'msg' => 'No data to store on server');
	}
    }
    function newRow($instanceid,$data)  {
	  $id = $this->jservice->get(array('Action' => 'NewGuid'));
	if ($this->jservice->get(array('Action' => 'NewRow', 'PartName' => 'iu_urok_def', 'RowID' => $id, 'DocumentID' => $instanceid, 'Values'=>$data)) == 'OK') {
	    return array('success' => TRUE, 'data' => $id);
	} else {
	    return array('success' => FALSE, 'msg' => 'Error while create new id');
	}
    }
    function getRows($sort=array())
		{
	    $res = $this->jservice->get(array('Action' => 'GetViewData','Sort'=>$sort,
		'FieldList'=>'B2G(iu_urok_defid) as iu_urok_defid, B2G(iu_urok_defid) as id,B2G(instanceid) as instanceid, iu_urok_def_BRIEF_F(iu_urok_defid , NULL) as  brief,ucode,  DATE_FORMAT(datecreated,\'%Y-%m-%d %H:%i:%s\') as  datecreated,B2G(subject) subject, iud_predmet_BRIEF_F(subject, NULL) as subject_grid,B2G(theClassnum) theclassnum, iu_clsinfo_BRIEF_F(theclassnum, NULL) as theclassnum_grid,plannum,B2G(maketown) maketown, iud_town_BRIEF_F(maketown, NULL) as maketown_grid,  DATE_FORMAT(actiondate,\'%Y-%m-%d\') as  actiondate,  DATE_FORMAT(actiondate2,\'%Y-%m-%d\') as  actiondate2,B2G(coursetype) coursetype, iud_ctype_BRIEF_F(coursetype, NULL) as coursetype_grid,rtheme,classtheme,thequarter, case thequarter  when 0 then \'?\' when 1 then \'I\' when 2 then \'II\' when 3 then \'III\' when 4 then \'IV\'End  as thequarter_grid,  schooldate as  schooldate,B2G(curator) curator, iu_u_def_BRIEF_F(curator, NULL) as curator_grid,B2G(theTeacher) theteacher, iu_tmdef_BRIEF_F(theteacher, NULL) as theteacher_grid,B2G(methodist) methodist, iu_tmdef_BRIEF_F(methodist, NULL) as methodist_grid,B2G(methodist2) methodist2, 
		iu_tmdef_BRIEF_F(methodist2, NULL) as methodist2_grid,
		B2G(processtype) processtype, 
		iud_process_def_BRIEF_F(processtype, NULL) as processtype_grid,B2G(CKKSn) ckksn,
		iud_sn_def_BRIEF_F(ckksn, NULL) as ckksn_grid,
		testpageref,B2G(pubState) pubstate, 
		iud_spub_BRIEF_F(pubstate, NULL) as pubstate_grid,
		mainref,B2G(TheFilm) thefilm, 
		iu_urok_def_BRIEF_F(thefilm, NULL) as thefilm_grid,
		thefilmurl,info,notes,
		iud_sn_def_for_urok(iu_urok_defid) as laststate_grid
		', 
		'ViewName' => 'iu_urok_def'));
	    if (count($res)) {
	        return $res;
	    } else {
	        return null;
	    }
		}
    function getRowsByInstance($id,$sort=array())
		{
	$res = $this->jservice->get(array('Action' => 'GetViewData','Sort'=>$sort,
	'FieldList'=>'B2G(iu_urok_defid) as iu_urok_defid, B2G(iu_urok_defid) as id,
	B2G(instanceid) as instanceid, iu_urok_def_BRIEF_F(iu_urok_defid , NULL) as  brief,ucode,  
	DATE_FORMAT(datecreated,\'%Y-%m-%d %H:%i:%s\') as  datecreated,B2G(subject) subject, 
	iud_predmet_BRIEF_F(subject, NULL) as subject_grid,B2G(theClassnum) theclassnum, 
	iu_clsinfo_BRIEF_F(theclassnum, NULL) as theclassnum_grid,plannum,B2G(maketown) maketown, 
	iud_town_BRIEF_F(maketown, NULL) as maketown_grid,  DATE_FORMAT(actiondate,\'%Y-%m-%d\') as  actiondate, 
	DATE_FORMAT(actiondate2,\'%Y-%m-%d\') as  actiondate2,B2G(coursetype) coursetype,
	iud_ctype_BRIEF_F(coursetype, NULL) as coursetype_grid,rtheme,classtheme,thequarter,
	case thequarter  when 0 then \'?\' when 1 then \'I\' when 2 then \'II\' when 3 then \'III\' when 4 then \'IV\'End  as thequarter_grid, 
	schooldate as  schooldate,B2G(curator) curator, iu_u_def_BRIEF_F(curator, NULL) as curator_grid,B2G(theTeacher) theteacher, 
	iu_tmdef_BRIEF_F(theteacher, NULL) as theteacher_grid,B2G(methodist) methodist, iu_tmdef_BRIEF_F(methodist, NULL) as methodist_grid,
	B2G(methodist2) methodist2, iu_tmdef_BRIEF_F(methodist2, NULL) as methodist2_grid,B2G(processtype) processtype, 
	iud_process_def_BRIEF_F(processtype, NULL) as processtype_grid,B2G(CKKSn) ckksn, iud_sn_def_BRIEF_F(ckksn, NULL) as ckksn_grid,
	testpageref,B2G(pubState) pubstate, iud_spub_BRIEF_F(pubstate, NULL) as pubstate_grid,mainref,B2G(TheFilm) thefilm, 
	iu_urok_def_BRIEF_F(thefilm, NULL) as thefilm_grid,thefilmurl,info,notes,
		iud_sn_def_for_urok(iu_urok_defid) as laststate_grid', 'ViewName' => 'iu_urok_def', 'WhereClause' => 'instanceid=G2B(\''. $id . '\')'));
	if (count($res) == 0) {
	    return null;
	} else {
	    return $res;
	}
		}
    function getRowsByParent($id,$sort=array())
	{
	$res = $this->jservice->get(array('Action' => 'GetViewData','Sort'=>$sort,
	'FieldList'=>'B2G(iu_urok_defid) as iu_urok_defid, B2G(iu_urok_defid) as id,B2G(instanceid) as instanceid, iu_urok_def_BRIEF_F(iu_urok_defid , NULL) as  brief,ucode,  DATE_FORMAT(datecreated,\'%Y-%m-%d %H:%i:%s\') as  datecreated,B2G(subject) subject, iud_predmet_BRIEF_F(subject, NULL) as subject_grid,B2G(theClassnum) theclassnum, iu_clsinfo_BRIEF_F(theclassnum, NULL) as theclassnum_grid,plannum,B2G(maketown) maketown, iud_town_BRIEF_F(maketown, NULL) as maketown_grid,  DATE_FORMAT(actiondate,\'%Y-%m-%d\') as  actiondate,  DATE_FORMAT(actiondate2,\'%Y-%m-%d\') as  actiondate2,B2G(coursetype) coursetype, iud_ctype_BRIEF_F(coursetype, NULL) as coursetype_grid,rtheme,classtheme,thequarter, case thequarter  when 0 then \'?\' when 1 then \'I\' when 2 then \'II\' when 3 then \'III\' when 4 then \'IV\'End  as thequarter_grid,  schooldate as  schooldate,B2G(curator) curator, iu_u_def_BRIEF_F(curator, NULL) as curator_grid,B2G(theTeacher) theteacher, iu_tmdef_BRIEF_F(theteacher, NULL) as theteacher_grid,B2G(methodist) methodist, iu_tmdef_BRIEF_F(methodist, NULL) as methodist_grid,B2G(methodist2) methodist2, iu_tmdef_BRIEF_F(methodist2, NULL) as methodist2_grid,B2G(processtype) processtype, iud_process_def_BRIEF_F(processtype, NULL) as processtype_grid,B2G(CKKSn) ckksn, iud_sn_def_BRIEF_F(ckksn, NULL) as ckksn_grid,testpageref,B2G(pubState) pubstate, iud_spub_BRIEF_F(pubstate, NULL) as pubstate_grid,mainref,B2G(TheFilm) thefilm, iu_urok_def_BRIEF_F(thefilm, NULL) as thefilm_grid,thefilmurl,info,notes,
		iud_sn_def_for_urok(iu_urok_defid) as laststate_grid', 'ViewName' => 'iu_urok_def', 'WhereClause' => ' parentstructrowid=G2B(\''. $id . '\')'));
	if (count($res) == 0) {
	    return null;
	} else {
	    return $res;
	}
  }
    function deleteRow($id = null) {
	  if (!empty($id) && $this->jservice->get(array('Action' => 'DeleteRow', 'PartName' => 'iu_urok_def', 'RowID' => $id)) == 'OK')
	    $result = array('success' => TRUE);
	else
	    $result = array('success' => FALSE, 'msg' => 'Error while deleting record!');
	return $result;
    }
}
?>
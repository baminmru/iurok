
<?php
class  M_iu_cm_def extends CI_Model {
    function getRow($empId) {
    $result = array('success' => false, 'msg' => 'No Row ID for retrive data');
	if (!empty($empId)){
	    $res = $this->jservice->get(array('Action' => 'GetRowData','FieldList'=>'B2G(iu_cm_defid) as iu_cm_defid, B2G(iu_cm_defid) as id,B2G(instanceid) as instanceid, iu_cm_def_BRIEF_F(iu_cm_defid , NULL) as  brief,  DATE_FORMAT(thedate,\'%Y-%m-%d %H:%i:%s\') as  thedate,B2G(TheProcess) theprocess, iu_urok_def_BRIEF_F(theprocess, NULL) as theprocess_grid,isdiscussion, case isdiscussion  when -1 then \'Да\' when 0 then \'Нет\'End  as isdiscussion_grid,B2G(theDoc) thedoc, iu_urok_docs_BRIEF_F(thedoc, NULL) as thedoc_grid,B2G(theVideo) thevideo, iu_urok_video_BRIEF_F(thevideo, NULL) as thevideo_grid,thetheme,B2G(TheAuthor) theauthor, iu_u_def_BRIEF_F(theauthor, NULL) as theauthor_grid', 'PartName' => 'iu_cm_def', 'ID' =>  $empId 	));
	    if (!empty($res)) {
	        $result = $res[0];
	    }
	}
	return $result;
    }
    function setRow($data)  {
	    $data = (array)$data;
	if (!empty($data)) {
	    if (empty($data['iu_cm_defid'])) {
	        $data['iu_cm_defid'] = $this->jservice->get(array('Action' => 'NewGuid'));
	        $res=$this->jservice->get(array('Action' => 'NewRow', 'PartName' => 'iu_cm_def', 'RowID' => $data['iu_cm_defid'], 'DocumentID' => $data['instanceid'], 'Values'=>$data));
	       if(isset($res[0])){
	       	if($res[0]->result!='ok'){
	       		return array('success' => FALSE, 'msg' => $res[0]->result);
	       	} 
	       }else{
	       	return array('success' => FALSE, 'msg' => 'Unknown error' );
	       }
	    }else{
	    $res = $this->jservice->get(array('Action' => 'UpdateRow', 'PartName' => 'iu_cm_def', 'RowID' => $data['iu_cm_defid'], 'DocumentID' => $data['instanceid'], 'Values'=>$data));
	       if(isset($res[0])){
	       	if($res[0]->result!='ok'){
	       		return array('success' => FALSE, 'msg' => $res[0]->result);
	       	} 
	       }else{
	       	return array('success' => FALSE, 'msg' => 'Unknown error' );
	       }
	    }
	    return array('success' => TRUE, 'data' => $this->getRow($data['iu_cm_defid'] ));
	} else {
	    return array('success' => FALSE, 'msg' => 'No data to store on server');
	}
    }
    function newRow($instanceid,$data)  {
	  $id = $this->jservice->get(array('Action' => 'NewGuid'));
	if ($this->jservice->get(array('Action' => 'NewRow', 'PartName' => 'iu_cm_def', 'RowID' => $id, 'DocumentID' => $instanceid, 'Values'=>$data)) == 'OK') {
	    return array('success' => TRUE, 'data' => $id);
	} else {
	    return array('success' => FALSE, 'msg' => 'Error while create new id');
	}
    }
    function getRows($sort=array())
		{
	    $res = $this->jservice->get(array('Action' => 'GetViewData','Sort'=>$sort,'FieldList'=>'B2G(iu_cm_defid) as iu_cm_defid, B2G(iu_cm_defid) as id,B2G(instanceid) as instanceid, iu_cm_def_BRIEF_F(iu_cm_defid , NULL) as  brief,  DATE_FORMAT(thedate,\'%Y-%m-%d %H:%i:%s\') as  thedate,B2G(TheProcess) theprocess, iu_urok_def_BRIEF_F(theprocess, NULL) as theprocess_grid,isdiscussion, case isdiscussion  when -1 then \'Да\' when 0 then \'Нет\'End  as isdiscussion_grid,B2G(theDoc) thedoc, iu_urok_docs_BRIEF_F(thedoc, NULL) as thedoc_grid,B2G(theVideo) thevideo, iu_urok_video_BRIEF_F(thevideo, NULL) as thevideo_grid,thetheme,B2G(TheAuthor) theauthor, iu_u_def_BRIEF_F(theauthor, NULL) as theauthor_grid', 'ViewName' => 'iu_cm_def'));
	    if (count($res)) {
	        return $res;
	    } else {
	        return null;
	    }
		}
    function getRowsByInstance($id,$sort=array())
		{
	$res = $this->jservice->get(array('Action' => 'GetViewData','Sort'=>$sort,'FieldList'=>'B2G(iu_cm_defid) as iu_cm_defid, B2G(iu_cm_defid) as id,B2G(instanceid) as instanceid, iu_cm_def_BRIEF_F(iu_cm_defid , NULL) as  brief,  DATE_FORMAT(thedate,\'%Y-%m-%d %H:%i:%s\') as  thedate,B2G(TheProcess) theprocess, iu_urok_def_BRIEF_F(theprocess, NULL) as theprocess_grid,isdiscussion, case isdiscussion  when -1 then \'Да\' when 0 then \'Нет\'End  as isdiscussion_grid,B2G(theDoc) thedoc, iu_urok_docs_BRIEF_F(thedoc, NULL) as thedoc_grid,B2G(theVideo) thevideo, iu_urok_video_BRIEF_F(thevideo, NULL) as thevideo_grid,thetheme,B2G(TheAuthor) theauthor, iu_u_def_BRIEF_F(theauthor, NULL) as theauthor_grid', 'ViewName' => 'iu_cm_def', 'WhereClause' => 'instanceid=G2B(\''. $id . '\')'));
	if (count($res) == 0) {
	    return null;
	} else {
	    return $res;
	}
		}
    function getRowsByParent($id,$sort=array())
	{
	$res = $this->jservice->get(array('Action' => 'GetViewData','Sort'=>$sort,'FieldList'=>'B2G(iu_cm_defid) as iu_cm_defid, B2G(iu_cm_defid) as id,B2G(instanceid) as instanceid, iu_cm_def_BRIEF_F(iu_cm_defid , NULL) as  brief,  DATE_FORMAT(thedate,\'%Y-%m-%d %H:%i:%s\') as  thedate,B2G(TheProcess) theprocess, iu_urok_def_BRIEF_F(theprocess, NULL) as theprocess_grid,isdiscussion, case isdiscussion  when -1 then \'Да\' when 0 then \'Нет\'End  as isdiscussion_grid,B2G(theDoc) thedoc, iu_urok_docs_BRIEF_F(thedoc, NULL) as thedoc_grid,B2G(theVideo) thevideo, iu_urok_video_BRIEF_F(thevideo, NULL) as thevideo_grid,thetheme,B2G(TheAuthor) theauthor, iu_u_def_BRIEF_F(theauthor, NULL) as theauthor_grid', 'ViewName' => 'iu_cm_def', 'WhereClause' => ' parentstructrowid=G2B(\''. $id . '\')'));
	if (count($res) == 0) {
	    return null;
	} else {
	    return $res;
	}
  }
    function deleteRow($id = null) {
	  if (!empty($id) && $this->jservice->get(array('Action' => 'DeleteRow', 'PartName' => 'iu_cm_def', 'RowID' => $id)) == 'OK')
	    $result = array('success' => TRUE);
	else
	    $result = array('success' => FALSE, 'msg' => 'Error while deleting record!');
	return $result;
    }
	
	 function hideRow($id = null) {
	  if (!empty($id) && $this->jservice->get(array('Action' => 'HideRow', 'PartName' => 'iu_cm_def', 'RowID' => $id)) == 'OK')
	    $result = array('success' => TRUE);
	else
	    $result = array('success' => FALSE, 'msg' => 'Error while hiding record!');
	return $result;
    }
}
?>
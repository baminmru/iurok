
<?php
class  M_iud_videotype extends CI_Model {
    function getRow($empId) {
    $result = array('success' => false, 'msg' => 'No Row ID for retrive data');
	if (!empty($empId)){
	    $res = $this->jservice->get(array('Action' => 'GetRowData','FieldList'=>'B2G(iud_videotypeid) as iud_videotypeid, B2G(iud_videotypeid) as id,B2G(instanceid) as instanceid, iud_videotype_BRIEF_F(iud_videotypeid , NULL) as  brief,sequence,B2G(filetype) filetype, iud_filetype_BRIEF_F(filetype, NULL) as filetype_grid,name,B2G(versionpolicy) versionpolicy, iud_filestoretype_BRIEF_F(versionpolicy, NULL) as versionpolicy_grid,nocomments, case nocomments  when -1 then \'Да\' when 0 then \'Нет\'End  as nocomments_grid', 'PartName' => 'iud_videotype', 'ID' =>  $empId 	));
	    if (!empty($res)) {
	        $result = $res[0];
	    }
	}
	return $result;
    }
    function setRow($data)  {
	    $data = (array)$data;
	if (!empty($data)) {
	    if (empty($data['iud_videotypeid'])) {
	        $data['iud_videotypeid'] = $this->jservice->get(array('Action' => 'NewGuid'));
	        $res=$this->jservice->get(array('Action' => 'NewRow', 'PartName' => 'iud_videotype', 'RowID' => $data['iud_videotypeid'], 'DocumentID' => $data['instanceid'], 'Values'=>$data));
	       if(isset($res[0])){
	       	if($res[0]->result!='ok'){
	       		return array('success' => FALSE, 'msg' => $res[0]->result);
	       	} 
	       }else{
	       	return array('success' => FALSE, 'msg' => 'Unknown error' );
	       }
	    }else{
	    $res = $this->jservice->get(array('Action' => 'UpdateRow', 'PartName' => 'iud_videotype', 'RowID' => $data['iud_videotypeid'], 'DocumentID' => $data['instanceid'], 'Values'=>$data));
	       if(isset($res[0])){
	       	if($res[0]->result!='ok'){
	       		return array('success' => FALSE, 'msg' => $res[0]->result);
	       	} 
	       }else{
	       	return array('success' => FALSE, 'msg' => 'Unknown error' );
	       }
	    }
	    return array('success' => TRUE, 'data' => $this->getRow($data['iud_videotypeid'] ));
	} else {
	    return array('success' => FALSE, 'msg' => 'No data to store on server');
	}
    }
    function newRow($instanceid,$data)  {
	  $id = $this->jservice->get(array('Action' => 'NewGuid'));
	if ($this->jservice->get(array('Action' => 'NewRow', 'PartName' => 'iud_videotype', 'RowID' => $id, 'DocumentID' => $instanceid, 'Values'=>$data)) == 'OK') {
	    return array('success' => TRUE, 'data' => $id);
	} else {
	    return array('success' => FALSE, 'msg' => 'Error while create new id');
	}
    }
    function getRows($sort=array())
		{
	    $res = $this->jservice->get(array('Action' => 'GetViewData','Sort'=>$sort,'FieldList'=>'B2G(iud_videotypeid) as iud_videotypeid, B2G(iud_videotypeid) as id,B2G(instanceid) as instanceid, iud_videotype_BRIEF_F(iud_videotypeid , NULL) as  brief,sequence,B2G(filetype) filetype, iud_filetype_BRIEF_F(filetype, NULL) as filetype_grid,name,B2G(versionpolicy) versionpolicy, iud_filestoretype_BRIEF_F(versionpolicy, NULL) as versionpolicy_grid,nocomments, case nocomments  when -1 then \'Да\' when 0 then \'Нет\'End  as nocomments_grid', 'ViewName' => 'iud_videotype'));
	    if (count($res)) {
	        return $res;
	    } else {
	        return null;
	    }
		}
    function getRowsByInstance($id,$sort=array())
		{
	$res = $this->jservice->get(array('Action' => 'GetViewData','Sort'=>$sort,'FieldList'=>'B2G(iud_videotypeid) as iud_videotypeid, B2G(iud_videotypeid) as id,B2G(instanceid) as instanceid, iud_videotype_BRIEF_F(iud_videotypeid , NULL) as  brief,sequence,B2G(filetype) filetype, iud_filetype_BRIEF_F(filetype, NULL) as filetype_grid,name,B2G(versionpolicy) versionpolicy, iud_filestoretype_BRIEF_F(versionpolicy, NULL) as versionpolicy_grid,nocomments, case nocomments  when -1 then \'Да\' when 0 then \'Нет\'End  as nocomments_grid', 'ViewName' => 'iud_videotype', 'WhereClause' => 'instanceid=G2B(\''. $id . '\')'));
	if (count($res) == 0) {
	    return null;
	} else {
	    return $res;
	}
		}
    function getRowsByParent($id,$sort=array())
	{
	$res = $this->jservice->get(array('Action' => 'GetViewData','Sort'=>$sort,'FieldList'=>'B2G(iud_videotypeid) as iud_videotypeid, B2G(iud_videotypeid) as id,B2G(instanceid) as instanceid, iud_videotype_BRIEF_F(iud_videotypeid , NULL) as  brief,sequence,B2G(filetype) filetype, iud_filetype_BRIEF_F(filetype, NULL) as filetype_grid,name,B2G(versionpolicy) versionpolicy, iud_filestoretype_BRIEF_F(versionpolicy, NULL) as versionpolicy_grid,nocomments, case nocomments  when -1 then \'Да\' when 0 then \'Нет\'End  as nocomments_grid', 'ViewName' => 'iud_videotype', 'WhereClause' => ' parentstructrowid=G2B(\''. $id . '\')'));
	if (count($res) == 0) {
	    return null;
	} else {
	    return $res;
	}
  }
    function deleteRow($id = null) {
	  if (!empty($id) && $this->jservice->get(array('Action' => 'DeleteRow', 'PartName' => 'iud_videotype', 'RowID' => $id)) == 'OK')
	    $result = array('success' => TRUE);
	else
	    $result = array('success' => FALSE, 'msg' => 'Error while deleting record!');
	return $result;
    }
}
?>
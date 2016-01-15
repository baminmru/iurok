
<?php
class  M_iud_doctype extends CI_Model {
    function getRow($empId) {
    $result = array('success' => false, 'msg' => 'No Row ID for retrive data');
	if (!empty($empId)){
	    $res = $this->jservice->get(array('Action' => 'GetRowData','FieldList'=>'B2G(iud_doctypeid) as iud_doctypeid, B2G(iud_doctypeid) as id,B2G(instanceid) as instanceid, iud_doctype_BRIEF_F(iud_doctypeid , NULL) as  brief,sequence,name,B2G(filetype) filetype, iud_filetype_BRIEF_F(filetype, NULL) as filetype_grid,B2G(versionpolicy) versionpolicy, iud_filestoretype_BRIEF_F(versionpolicy, NULL) as versionpolicy_grid', 'PartName' => 'iud_doctype', 'ID' =>  $empId 	));
	    if (!empty($res)) {
	        $result = $res[0];
	    }
	}
	return $result;
    }
    function setRow($data)  {
	    $data = (array)$data;
	if (!empty($data)) {
	    if (empty($data['iud_doctypeid'])) {
	        $data['iud_doctypeid'] = $this->jservice->get(array('Action' => 'NewGuid'));
	        $res=$this->jservice->get(array('Action' => 'NewRow', 'PartName' => 'iud_doctype', 'RowID' => $data['iud_doctypeid'], 'DocumentID' => $data['instanceid'], 'Values'=>$data));
	       if(isset($res[0])){
	       	if($res[0]->result!='ok'){
	       		return array('success' => FALSE, 'msg' => $res[0]->result);
	       	} 
	       }else{
	       	return array('success' => FALSE, 'msg' => 'Unknown error' );
	       }
	    }else{
	    $res = $this->jservice->get(array('Action' => 'UpdateRow', 'PartName' => 'iud_doctype', 'RowID' => $data['iud_doctypeid'], 'DocumentID' => $data['instanceid'], 'Values'=>$data));
	       if(isset($res[0])){
	       	if($res[0]->result!='ok'){
	       		return array('success' => FALSE, 'msg' => $res[0]->result);
	       	} 
	       }else{
	       	return array('success' => FALSE, 'msg' => 'Unknown error' );
	       }
	    }
	    return array('success' => TRUE, 'data' => $this->getRow($data['iud_doctypeid'] ));
	} else {
	    return array('success' => FALSE, 'msg' => 'No data to store on server');
	}
    }
    function newRow($instanceid,$data)  {
	  $id = $this->jservice->get(array('Action' => 'NewGuid'));
	if ($this->jservice->get(array('Action' => 'NewRow', 'PartName' => 'iud_doctype', 'RowID' => $id, 'DocumentID' => $instanceid, 'Values'=>$data)) == 'OK') {
	    return array('success' => TRUE, 'data' => $id);
	} else {
	    return array('success' => FALSE, 'msg' => 'Error while create new id');
	}
    }
    function getRows($sort=array())
		{
	    $res = $this->jservice->get(array('Action' => 'GetViewData','Sort'=>$sort,'FieldList'=>'B2G(iud_doctypeid) as iud_doctypeid, B2G(iud_doctypeid) as id,B2G(instanceid) as instanceid, iud_doctype_BRIEF_F(iud_doctypeid , NULL) as  brief,sequence,name,B2G(filetype) filetype, iud_filetype_BRIEF_F(filetype, NULL) as filetype_grid,B2G(versionpolicy) versionpolicy, iud_filestoretype_BRIEF_F(versionpolicy, NULL) as versionpolicy_grid', 'ViewName' => 'iud_doctype'));
	    if (count($res)) {
	        return $res;
	    } else {
	        return null;
	    }
		}
    function getRowsByInstance($id,$sort=array())
		{
	$res = $this->jservice->get(array('Action' => 'GetViewData','Sort'=>$sort,'FieldList'=>'B2G(iud_doctypeid) as iud_doctypeid, B2G(iud_doctypeid) as id,B2G(instanceid) as instanceid, iud_doctype_BRIEF_F(iud_doctypeid , NULL) as  brief,sequence,name,B2G(filetype) filetype, iud_filetype_BRIEF_F(filetype, NULL) as filetype_grid,B2G(versionpolicy) versionpolicy, iud_filestoretype_BRIEF_F(versionpolicy, NULL) as versionpolicy_grid', 'ViewName' => 'iud_doctype', 'WhereClause' => 'instanceid=G2B(\''. $id . '\')'));
	if (count($res) == 0) {
	    return null;
	} else {
	    return $res;
	}
		}
    function getRowsByParent($id,$sort=array())
	{
	$res = $this->jservice->get(array('Action' => 'GetViewData','Sort'=>$sort,'FieldList'=>'B2G(iud_doctypeid) as iud_doctypeid, B2G(iud_doctypeid) as id,B2G(instanceid) as instanceid, iud_doctype_BRIEF_F(iud_doctypeid , NULL) as  brief,sequence,name,B2G(filetype) filetype, iud_filetype_BRIEF_F(filetype, NULL) as filetype_grid,B2G(versionpolicy) versionpolicy, iud_filestoretype_BRIEF_F(versionpolicy, NULL) as versionpolicy_grid', 'ViewName' => 'iud_doctype', 'WhereClause' => ' parentstructrowid=G2B(\''. $id . '\')'));
	if (count($res) == 0) {
	    return null;
	} else {
	    return $res;
	}
  }
    function deleteRow($id = null) {
	  if (!empty($id) && $this->jservice->get(array('Action' => 'DeleteRow', 'PartName' => 'iud_doctype', 'RowID' => $id)) == 'OK')
	    $result = array('success' => TRUE);
	else
	    $result = array('success' => FALSE, 'msg' => 'Error while deleting record!');
	return $result;
    }
}
?>
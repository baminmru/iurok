
<?php
class  M_iud_filetype extends CI_Model {
    function getRow($empId) {
    $result = array('success' => false, 'msg' => 'No Row ID for retrive data');
	if (!empty($empId)){
	    $res = $this->jservice->get(array('Action' => 'GetRowData','FieldList'=>'B2G(iud_filetypeid) as iud_filetypeid, B2G(iud_filetypeid) as id,B2G(instanceid) as instanceid, iud_filetype_BRIEF_F(iud_filetypeid , NULL) as  brief,name,allowtiming, case allowtiming  when -1 then \'Да\' when 0 then \'Нет\'End  as allowtiming_grid', 'PartName' => 'iud_filetype', 'ID' =>  $empId 	));
	    if (!empty($res)) {
	        $result = $res[0];
	    }
	}
	return $result;
    }
    function setRow($data)  {
	    $data = (array)$data;
	if (!empty($data)) {
	    if (empty($data['iud_filetypeid'])) {
	        $data['iud_filetypeid'] = $this->jservice->get(array('Action' => 'NewGuid'));
	        $res=$this->jservice->get(array('Action' => 'NewRow', 'PartName' => 'iud_filetype', 'RowID' => $data['iud_filetypeid'], 'DocumentID' => $data['instanceid'], 'Values'=>$data));
	       if(isset($res[0])){
	       	if($res[0]->result!='ok'){
	       		return array('success' => FALSE, 'msg' => $res[0]->result);
	       	} 
	       }else{
	       	return array('success' => FALSE, 'msg' => 'Unknown error' );
	       }
	    }else{
	    $res = $this->jservice->get(array('Action' => 'UpdateRow', 'PartName' => 'iud_filetype', 'RowID' => $data['iud_filetypeid'], 'DocumentID' => $data['instanceid'], 'Values'=>$data));
	       if(isset($res[0])){
	       	if($res[0]->result!='ok'){
	       		return array('success' => FALSE, 'msg' => $res[0]->result);
	       	} 
	       }else{
	       	return array('success' => FALSE, 'msg' => 'Unknown error' );
	       }
	    }
	    return array('success' => TRUE, 'data' => $this->getRow($data['iud_filetypeid'] ));
	} else {
	    return array('success' => FALSE, 'msg' => 'No data to store on server');
	}
    }
    function newRow($instanceid,$data)  {
	  $id = $this->jservice->get(array('Action' => 'NewGuid'));
	if ($this->jservice->get(array('Action' => 'NewRow', 'PartName' => 'iud_filetype', 'RowID' => $id, 'DocumentID' => $instanceid, 'Values'=>$data)) == 'OK') {
	    return array('success' => TRUE, 'data' => $id);
	} else {
	    return array('success' => FALSE, 'msg' => 'Error while create new id');
	}
    }
    function getRows($sort=array())
		{
	    $res = $this->jservice->get(array('Action' => 'GetViewData','Sort'=>$sort,'FieldList'=>'B2G(iud_filetypeid) as iud_filetypeid, B2G(iud_filetypeid) as id,B2G(instanceid) as instanceid, iud_filetype_BRIEF_F(iud_filetypeid , NULL) as  brief,name,allowtiming, case allowtiming  when -1 then \'Да\' when 0 then \'Нет\'End  as allowtiming_grid', 'ViewName' => 'iud_filetype'));
	    if (count($res)) {
	        return $res;
	    } else {
	        return null;
	    }
		}
    function getRowsByInstance($id,$sort=array())
		{
	$res = $this->jservice->get(array('Action' => 'GetViewData','Sort'=>$sort,'FieldList'=>'B2G(iud_filetypeid) as iud_filetypeid, B2G(iud_filetypeid) as id,B2G(instanceid) as instanceid, iud_filetype_BRIEF_F(iud_filetypeid , NULL) as  brief,name,allowtiming, case allowtiming  when -1 then \'Да\' when 0 then \'Нет\'End  as allowtiming_grid', 'ViewName' => 'iud_filetype', 'WhereClause' => 'instanceid=G2B(\''. $id . '\')'));
	if (count($res) == 0) {
	    return null;
	} else {
	    return $res;
	}
		}
    function getRowsByParent($id,$sort=array())
	{
	$res = $this->jservice->get(array('Action' => 'GetViewData','Sort'=>$sort,'FieldList'=>'B2G(iud_filetypeid) as iud_filetypeid, B2G(iud_filetypeid) as id,B2G(instanceid) as instanceid, iud_filetype_BRIEF_F(iud_filetypeid , NULL) as  brief,name,allowtiming, case allowtiming  when -1 then \'Да\' when 0 then \'Нет\'End  as allowtiming_grid', 'ViewName' => 'iud_filetype', 'WhereClause' => ' parentstructrowid=G2B(\''. $id . '\')'));
	if (count($res) == 0) {
	    return null;
	} else {
	    return $res;
	}
  }
    function deleteRow($id = null) {
	  if (!empty($id) && $this->jservice->get(array('Action' => 'DeleteRow', 'PartName' => 'iud_filetype', 'RowID' => $id)) == 'OK')
	    $result = array('success' => TRUE);
	else
	    $result = array('success' => FALSE, 'msg' => 'Error while deleting record!');
	return $result;
    }
}
?>
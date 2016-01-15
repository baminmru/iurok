
<?php
class  M_iud_sn_def extends CI_Model {
    function getRow($empId) {
    $result = array('success' => false, 'msg' => 'No Row ID for retrive data');
	if (!empty($empId)){
	    $res = $this->jservice->get(array('Action' => 'GetRowData','FieldList'=>'B2G(iud_sn_defid) as iud_sn_defid, B2G(iud_sn_defid) as id,B2G(instanceid) as instanceid, iud_sn_def_BRIEF_F(iud_sn_defid , NULL) as  brief,name,sequence,isfinal, case isfinal  when -1 then \'Да\' when 0 then \'Нет\'End  as isfinal_grid', 'PartName' => 'iud_sn_def', 'ID' =>  $empId 	));
	    if (!empty($res)) {
	        $result = $res[0];
	    }
	}
	return $result;
    }
    function setRow($data)  {
	    $data = (array)$data;
	if (!empty($data)) {
	    if (empty($data['iud_sn_defid'])) {
	        $data['iud_sn_defid'] = $this->jservice->get(array('Action' => 'NewGuid'));
	        $res=$this->jservice->get(array('Action' => 'NewRow', 'PartName' => 'iud_sn_def', 'RowID' => $data['iud_sn_defid'], 'DocumentID' => $data['instanceid'], 'Values'=>$data));
	       if(isset($res[0])){
	       	if($res[0]->result!='ok'){
	       		return array('success' => FALSE, 'msg' => $res[0]->result);
	       	} 
	       }else{
	       	return array('success' => FALSE, 'msg' => 'Unknown error' );
	       }
	    }else{
	    $res = $this->jservice->get(array('Action' => 'UpdateRow', 'PartName' => 'iud_sn_def', 'RowID' => $data['iud_sn_defid'], 'DocumentID' => $data['instanceid'], 'Values'=>$data));
	       if(isset($res[0])){
	       	if($res[0]->result!='ok'){
	       		return array('success' => FALSE, 'msg' => $res[0]->result);
	       	} 
	       }else{
	       	return array('success' => FALSE, 'msg' => 'Unknown error' );
	       }
	    }
	    return array('success' => TRUE, 'data' => $this->getRow($data['iud_sn_defid'] ));
	} else {
	    return array('success' => FALSE, 'msg' => 'No data to store on server');
	}
    }
    function newRow($instanceid,$data)  {
	  $id = $this->jservice->get(array('Action' => 'NewGuid'));
	if ($this->jservice->get(array('Action' => 'NewRow', 'PartName' => 'iud_sn_def', 'RowID' => $id, 'DocumentID' => $instanceid, 'Values'=>$data)) == 'OK') {
	    return array('success' => TRUE, 'data' => $id);
	} else {
	    return array('success' => FALSE, 'msg' => 'Error while create new id');
	}
    }
    function getRows($sort=array())
		{
	    $res = $this->jservice->get(array('Action' => 'GetViewData','Sort'=>$sort,'FieldList'=>'B2G(iud_sn_defid) as iud_sn_defid, B2G(iud_sn_defid) as id,B2G(instanceid) as instanceid, iud_sn_def_BRIEF_F(iud_sn_defid , NULL) as  brief,name,sequence,isfinal, case isfinal  when -1 then \'Да\' when 0 then \'Нет\'End  as isfinal_grid', 'ViewName' => 'iud_sn_def'));
	    if (count($res)) {
	        return $res;
	    } else {
	        return null;
	    }
		}
    function getRowsByInstance($id,$sort=array())
		{
	$res = $this->jservice->get(array('Action' => 'GetViewData','Sort'=>$sort,'FieldList'=>'B2G(iud_sn_defid) as iud_sn_defid, B2G(iud_sn_defid) as id,B2G(instanceid) as instanceid, iud_sn_def_BRIEF_F(iud_sn_defid , NULL) as  brief,name,sequence,isfinal, case isfinal  when -1 then \'Да\' when 0 then \'Нет\'End  as isfinal_grid', 'ViewName' => 'iud_sn_def', 'WhereClause' => 'instanceid=G2B(\''. $id . '\')'));
	if (count($res) == 0) {
	    return null;
	} else {
	    return $res;
	}
		}
		
		
	function getRowsFinal($sort=array())
		{
	    $res = $this->jservice->get(array('Action' => 'GetViewData','Sort'=>$sort,'FieldList'=>'B2G(iud_sn_defid) as iud_sn_defid, B2G(iud_sn_defid) as id,B2G(instanceid) as instanceid, iud_sn_def_BRIEF_F(iud_sn_defid , NULL) as  brief,name,sequence,isfinal, case isfinal  when -1 then \'Да\' when 0 then \'Нет\'End  as isfinal_grid', 'ViewName' => 'iud_sn_def','WhereClause' => 'isfinal=-1'));
	    if (count($res)) {
	        return $res;
	    } else {
	        return null;
	    }
		}
    function getRowsByInstanceFinal($id,$sort=array())
		{
	$res = $this->jservice->get(array('Action' => 'GetViewData','Sort'=>$sort,'FieldList'=>'B2G(iud_sn_defid) as iud_sn_defid, B2G(iud_sn_defid) as id,B2G(instanceid) as instanceid, iud_sn_def_BRIEF_F(iud_sn_defid , NULL) as  brief,name,sequence,isfinal, case isfinal  when -1 then \'Да\' when 0 then \'Нет\'End  as isfinal_grid', 'ViewName' => 'iud_sn_def', 'WhereClause' => 'isfinal=-1 and instanceid=G2B(\''. $id . '\')'));
	if (count($res) == 0) {
	    return null;
	} else {
	    return $res;
	}
		}
    function getRowsByParent($id,$sort=array())
	{
	$res = $this->jservice->get(array('Action' => 'GetViewData','Sort'=>$sort,'FieldList'=>'B2G(iud_sn_defid) as iud_sn_defid, B2G(iud_sn_defid) as id,B2G(instanceid) as instanceid, iud_sn_def_BRIEF_F(iud_sn_defid , NULL) as  brief,name,sequence,isfinal, case isfinal  when -1 then \'Да\' when 0 then \'Нет\'End  as isfinal_grid', 'ViewName' => 'iud_sn_def', 'WhereClause' => ' parentstructrowid=G2B(\''. $id . '\')'));
	if (count($res) == 0) {
	    return null;
	} else {
	    return $res;
	}
  }
    function deleteRow($id = null) {
	  if (!empty($id) && $this->jservice->get(array('Action' => 'DeleteRow', 'PartName' => 'iud_sn_def', 'RowID' => $id)) == 'OK')
	    $result = array('success' => TRUE);
	else
	    $result = array('success' => FALSE, 'msg' => 'Error while deleting record!');
	return $result;
    }
}
?>
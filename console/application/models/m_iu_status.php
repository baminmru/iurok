
<?php
class  M_iu_status extends CI_Model {
    function getRow($empId) {
    $result = array('success' => false, 'msg' => 'No Row ID for retrive data');
	if (!empty($empId)){
	    $res = $this->jservice->get(array('Action' => 'GetRowData','FieldList'=>'B2G(iu_statusid) as iu_statusid, B2G(iu_statusid) as id,B2G(instanceid) as instanceid, iu_status_BRIEF_F(iu_statusid , NULL) as  brief,sequence,B2G(TheProcess) theprocess, iud_process_def_BRIEF_F(theprocess, NULL) as theprocess_grid,B2G(TheStage) thestage, iud_stagedef_BRIEF_F(thestage, NULL) as thestage_grid,name,isstartupstate, case isstartupstate  when -1 then \'Да\' when 0 then \'Нет\'End  as isstartupstate_grid,isfinishstate, case isfinishstate  when -1 then \'Да\' when 0 then \'Нет\'End  as isfinishstate_grid', 'PartName' => 'iu_status', 'ID' =>  $empId 	));
	    if (!empty($res)) {
	        $result = $res[0];
	    }
	}
	return $result;
    }
    function setRow($data)  {
	    $data = (array)$data;
	if (!empty($data)) {
	    if (empty($data['iu_statusid'])) {
	        $data['iu_statusid'] = $this->jservice->get(array('Action' => 'NewGuid'));
	        $res=$this->jservice->get(array('Action' => 'NewRow', 'PartName' => 'iu_status', 'RowID' => $data['iu_statusid'], 'DocumentID' => $data['instanceid'], 'Values'=>$data));
	       if(isset($res[0])){
	       	if($res[0]->result!='ok'){
	       		return array('success' => FALSE, 'msg' => $res[0]->result);
	       	} 
	       }else{
	       	return array('success' => FALSE, 'msg' => 'Unknown error' );
	       }
	    }else{
	    $res = $this->jservice->get(array('Action' => 'UpdateRow', 'PartName' => 'iu_status', 'RowID' => $data['iu_statusid'], 'DocumentID' => $data['instanceid'], 'Values'=>$data));
	       if(isset($res[0])){
	       	if($res[0]->result!='ok'){
	       		return array('success' => FALSE, 'msg' => $res[0]->result);
	       	} 
	       }else{
	       	return array('success' => FALSE, 'msg' => 'Unknown error' );
	       }
	    }
	    return array('success' => TRUE, 'data' => $this->getRow($data['iu_statusid'] ));
	} else {
	    return array('success' => FALSE, 'msg' => 'No data to store on server');
	}
    }
    function newRow($instanceid,$data)  {
	  $id = $this->jservice->get(array('Action' => 'NewGuid'));
	if ($this->jservice->get(array('Action' => 'NewRow', 'PartName' => 'iu_status', 'RowID' => $id, 'DocumentID' => $instanceid, 'Values'=>$data)) == 'OK') {
	    return array('success' => TRUE, 'data' => $id);
	} else {
	    return array('success' => FALSE, 'msg' => 'Error while create new id');
	}
    }
    function getRows($sort=array())
		{
	    $res = $this->jservice->get(array('Action' => 'GetViewData','Sort'=>$sort,'FieldList'=>'B2G(iu_statusid) as iu_statusid, B2G(iu_statusid) as id,B2G(instanceid) as instanceid, iu_status_BRIEF_F(iu_statusid , NULL) as  brief,sequence,B2G(TheProcess) theprocess, iud_process_def_BRIEF_F(theprocess, NULL) as theprocess_grid,B2G(TheStage) thestage, iud_stagedef_BRIEF_F(thestage, NULL) as thestage_grid,name,isstartupstate, case isstartupstate  when -1 then \'Да\' when 0 then \'Нет\'End  as isstartupstate_grid,isfinishstate, case isfinishstate  when -1 then \'Да\' when 0 then \'Нет\'End  as isfinishstate_grid', 'ViewName' => 'iu_status'));
	    if (count($res)) {
	        return $res;
	    } else {
	        return null;
	    }
		}
    function getRowsByInstance($id,$sort=array())
		{
	$res = $this->jservice->get(array('Action' => 'GetViewData','Sort'=>$sort,'FieldList'=>'B2G(iu_statusid) as iu_statusid, B2G(iu_statusid) as id,B2G(instanceid) as instanceid, iu_status_BRIEF_F(iu_statusid , NULL) as  brief,sequence,B2G(TheProcess) theprocess, iud_process_def_BRIEF_F(theprocess, NULL) as theprocess_grid,B2G(TheStage) thestage, iud_stagedef_BRIEF_F(thestage, NULL) as thestage_grid,name,isstartupstate, case isstartupstate  when -1 then \'Да\' when 0 then \'Нет\'End  as isstartupstate_grid,isfinishstate, case isfinishstate  when -1 then \'Да\' when 0 then \'Нет\'End  as isfinishstate_grid', 'ViewName' => 'iu_status', 'WhereClause' => 'instanceid=G2B(\''. $id . '\')'));
	if (count($res) == 0) {
	    return null;
	} else {
	    return $res;
	}
		}
		
	function getRowsUS($thestage,$urokid,$sort=array())
	{
	$res = $this->jservice->get(array('Action' => 'GetViewData','Sort'=>$sort,
	'FieldList'=>'*', 'ViewName' => 'v_iu_status_us', 'WhereClause' => 'thestage=\''. $thestage . '\'  and urokid=\''.$urokid.'\''));
	if (count($res) == 0) {
	    return null;
	} else {
	    return $res;
	}
	}
	
	function getRowsSIB($sibid,$sort=array())
	{
	$res = $this->jservice->get(array('Action' => 'GetViewData','Sort'=>$sort,
	'FieldList'=>'*', 'ViewName' => 'v_iu_status_sib', 'WhereClause' => 'siblingid=\''. $sibid . '\' '));
	if (count($res) == 0) {
	    return null;
	} else {
	    return $res;
	}
	}
    function getRowsByParent($id,$sort=array())
	{
	$res = $this->jservice->get(array('Action' => 'GetViewData','Sort'=>$sort,'FieldList'=>'B2G(iu_statusid) as iu_statusid, B2G(iu_statusid) as id,B2G(instanceid) as instanceid, iu_status_BRIEF_F(iu_statusid , NULL) as  brief,sequence,B2G(TheProcess) theprocess, iud_process_def_BRIEF_F(theprocess, NULL) as theprocess_grid,B2G(TheStage) thestage, iud_stagedef_BRIEF_F(thestage, NULL) as thestage_grid,name,isstartupstate, case isstartupstate  when -1 then \'Да\' when 0 then \'Нет\'End  as isstartupstate_grid,isfinishstate, case isfinishstate  when -1 then \'Да\' when 0 then \'Нет\'End  as isfinishstate_grid', 'ViewName' => 'iu_status', 'WhereClause' => ' parentstructrowid=G2B(\''. $id . '\')'));
	if (count($res) == 0) {
	    return null;
	} else {
	    return $res;
	}
  }
    function deleteRow($id = null) {
	  if (!empty($id) && $this->jservice->get(array('Action' => 'DeleteRow', 'PartName' => 'iu_status', 'RowID' => $id)) == 'OK')
	    $result = array('success' => TRUE);
	else
	    $result = array('success' => FALSE, 'msg' => 'Error while deleting record!');
	return $result;
    }
}
?>
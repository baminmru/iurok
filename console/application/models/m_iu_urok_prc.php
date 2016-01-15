
<?php
class  M_iu_urok_prc extends CI_Model {
    function getRow($empId) {
    $result = array('success' => false, 'msg' => 'No Row ID for retrive data');
	if (!empty($empId)){
	    $res = $this->jservice->get(array('Action' => 'GetRowData','FieldList'=>'B2G(iu_urok_prcid) as iu_urok_prcid, B2G(iu_urok_prcid) as id,B2G(instanceid) as instanceid, iu_urok_prc_BRIEF_F(iu_urok_prcid , NULL) as  brief,B2G(topstage) topstage, iud_stagedef_BRIEF_F(topstage, NULL) as topstage_grid,isdone, case isdone  when -1 then \'Да\' when 0 then \'Нет\'End  as isdone_grid,manualcontrol, case manualcontrol  when -1 then \'Да\' when 0 then \'Нет\'End  as manualcontrol_grid,taskdelayed,B2G(laststate) laststate, iud_sn_def_BRIEF_F(laststate, NULL) as laststate_grid,lastmessage,B2G(TheProcess) theprocess, iu_urok_def_BRIEF_F(theprocess, NULL) as theprocess_grid,B2G(iu_urok_stage) iu_urok_stage, iu_status_BRIEF_F(iu_urok_stage, NULL) as iu_urok_stage_grid', 'PartName' => 'iu_urok_prc', 'ID' =>  $empId 	));
	    if (!empty($res)) {
	        $result = $res[0];
	    }
	}
	return $result;
    }
    function setRow($data)  {
	    $data = (array)$data;
	if (!empty($data)) {
	    if (empty($data['iu_urok_prcid'])) {
	        $data['iu_urok_prcid'] = $this->jservice->get(array('Action' => 'NewGuid'));
	        $res=$this->jservice->get(array('Action' => 'NewRow', 'PartName' => 'iu_urok_prc', 'RowID' => $data['iu_urok_prcid'], 'DocumentID' => $data['instanceid'], 'Values'=>$data));
	       if(isset($res[0])){
	       	if($res[0]->result!='ok'){
	       		return array('success' => FALSE, 'msg' => $res[0]->result);
	       	} 
	       }else{
	       	return array('success' => FALSE, 'msg' => 'Unknown error' );
	       }
	    }else{
	    $res = $this->jservice->get(array('Action' => 'UpdateRow', 'PartName' => 'iu_urok_prc', 'RowID' => $data['iu_urok_prcid'], 'DocumentID' => $data['instanceid'], 'Values'=>$data));
	       if(isset($res[0])){
	       	if($res[0]->result!='ok'){
	       		return array('success' => FALSE, 'msg' => $res[0]->result);
	       	} 
	       }else{
	       	return array('success' => FALSE, 'msg' => 'Unknown error' );
	       }
	    }
	    return array('success' => TRUE, 'data' => $this->getRow($data['iu_urok_prcid'] ));
	} else {
	    return array('success' => FALSE, 'msg' => 'No data to store on server');
	}
    }
    function newRow($instanceid,$data)  {
	  $id = $this->jservice->get(array('Action' => 'NewGuid'));
	if ($this->jservice->get(array('Action' => 'NewRow', 'PartName' => 'iu_urok_prc', 'RowID' => $id, 'DocumentID' => $instanceid, 'Values'=>$data)) == 'OK') {
	    return array('success' => TRUE, 'data' => $id);
	} else {
	    return array('success' => FALSE, 'msg' => 'Error while create new id');
	}
    }
    function getRows($sort=array())
		{
	    $res = $this->jservice->get(array('Action' => 'GetViewData','Sort'=>$sort,'FieldList'=>'B2G(iu_urok_prcid) as iu_urok_prcid, B2G(iu_urok_prcid) as id,B2G(instanceid) as instanceid, iu_urok_prc_BRIEF_F(iu_urok_prcid , NULL) as  brief,B2G(topstage) topstage, iud_stagedef_BRIEF_F(topstage, NULL) as topstage_grid,isdone, case isdone  when -1 then \'Да\' when 0 then \'Нет\'End  as isdone_grid,manualcontrol, case manualcontrol  when -1 then \'Да\' when 0 then \'Нет\'End  as manualcontrol_grid,taskdelayed,B2G(laststate) laststate, iud_sn_def_BRIEF_F(laststate, NULL) as laststate_grid,lastmessage,B2G(TheProcess) theprocess, iu_urok_def_BRIEF_F(theprocess, NULL) as theprocess_grid,B2G(iu_urok_stage) iu_urok_stage, iu_status_BRIEF_F(iu_urok_stage, NULL) as iu_urok_stage_grid', 'ViewName' => 'iu_urok_prc'));
	    if (count($res)) {
	        return $res;
	    } else {
	        return null;
	    }
		}
    function getRowsByInstance($id,$sort=array())
		{
	$res = $this->jservice->get(array('Action' => 'GetViewData','Sort'=>$sort,'FieldList'=>'B2G(iu_urok_prcid) as iu_urok_prcid, B2G(iu_urok_prcid) as id,B2G(instanceid) as instanceid, iu_urok_prc_BRIEF_F(iu_urok_prcid , NULL) as  brief,B2G(topstage) topstage, iud_stagedef_BRIEF_F(topstage, NULL) as topstage_grid,isdone, case isdone  when -1 then \'Да\' when 0 then \'Нет\'End  as isdone_grid,manualcontrol, case manualcontrol  when -1 then \'Да\' when 0 then \'Нет\'End  as manualcontrol_grid,taskdelayed,B2G(laststate) laststate, iud_sn_def_BRIEF_F(laststate, NULL) as laststate_grid,lastmessage,B2G(TheProcess) theprocess, iu_urok_def_BRIEF_F(theprocess, NULL) as theprocess_grid,B2G(iu_urok_stage) iu_urok_stage, iu_status_BRIEF_F(iu_urok_stage, NULL) as iu_urok_stage_grid', 'ViewName' => 'iu_urok_prc', 'WhereClause' => 'instanceid=G2B(\''. $id . '\')'));
	if (count($res) == 0) {
	    return null;
	} else {
	    return $res;
	}
		}
    function getRowsByParent($id,$sort=array())
	{
	$res = $this->jservice->get(array('Action' => 'GetViewData','Sort'=>$sort,'FieldList'=>'B2G(iu_urok_prcid) as iu_urok_prcid, B2G(iu_urok_prcid) as id,B2G(instanceid) as instanceid, iu_urok_prc_BRIEF_F(iu_urok_prcid , NULL) as  brief,B2G(topstage) topstage, iud_stagedef_BRIEF_F(topstage, NULL) as topstage_grid,isdone, case isdone  when -1 then \'Да\' when 0 then \'Нет\'End  as isdone_grid,manualcontrol, case manualcontrol  when -1 then \'Да\' when 0 then \'Нет\'End  as manualcontrol_grid,taskdelayed,B2G(laststate) laststate, iud_sn_def_BRIEF_F(laststate, NULL) as laststate_grid,lastmessage,B2G(TheProcess) theprocess, iu_urok_def_BRIEF_F(theprocess, NULL) as theprocess_grid,B2G(iu_urok_stage) iu_urok_stage, iu_status_BRIEF_F(iu_urok_stage, NULL) as iu_urok_stage_grid', 'ViewName' => 'iu_urok_prc', 'WhereClause' => ' parentstructrowid=G2B(\''. $id . '\')'));
	if (count($res) == 0) {
	    return null;
	} else {
	    return $res;
	}
  }
    function deleteRow($id = null) {
	  if (!empty($id) && $this->jservice->get(array('Action' => 'DeleteRow', 'PartName' => 'iu_urok_prc', 'RowID' => $id)) == 'OK')
	    $result = array('success' => TRUE);
	else
	    $result = array('success' => FALSE, 'msg' => 'Error while deleting record!');
	return $result;
    }
}
?>
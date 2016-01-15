
<?php
class  M_iu_urok_creators extends CI_Model {
    function getRow($empId) {
    $result = array('success' => false, 'msg' => 'No Row ID for retrive data');
	if (!empty($empId)){
	    $res = $this->jservice->get(array('Action' => 'GetRowData','FieldList'=>'B2G(iu_urok_creatorsid) as iu_urok_creatorsid, B2G(iu_urok_creatorsid) as id,B2G(instanceid) as instanceid, iu_urok_creators_BRIEF_F(iu_urok_creatorsid , NULL) as  brief,B2G(processrole) processrole, iu_crole_BRIEF_F(processrole, NULL) as processrole_grid,B2G(doer) doer, iu_u_def_BRIEF_F(doer, NULL) as doer_grid,doers, iu_crole_MREF_F(doers, NULL) as  doers_grid,B2G(selectby) selectby, iu_u_def_BRIEF_F(selectby, NULL) as selectby_grid,  DATE_FORMAT(selectday,\'%Y-%m-%d %H:%i:%s\') as  selectday', 'PartName' => 'iu_urok_creators', 'ID' =>  $empId 	));
	    if (!empty($res)) {
	        $result = $res[0];
	    }
	}
	return $result;
    }
    function setRow($data)  {
	    $data = (array)$data;
	if (!empty($data)) {
	    if (empty($data['iu_urok_creatorsid'])) {
	        $data['iu_urok_creatorsid'] = $this->jservice->get(array('Action' => 'NewGuid'));
	        $res=$this->jservice->get(array('Action' => 'NewRow', 'PartName' => 'iu_urok_creators', 'RowID' => $data['iu_urok_creatorsid'], 'DocumentID' => $data['instanceid'], 'Values'=>$data));
	       if(isset($res[0])){
	       	if($res[0]->result!='ok'){
	       		return array('success' => FALSE, 'msg' => $res[0]->result);
	       	} 
	       }else{
	       	return array('success' => FALSE, 'msg' => 'Unknown error' );
	       }
	    }else{
	    $res = $this->jservice->get(array('Action' => 'UpdateRow', 'PartName' => 'iu_urok_creators', 'RowID' => $data['iu_urok_creatorsid'], 'DocumentID' => $data['instanceid'], 'Values'=>$data));
	       if(isset($res[0])){
	       	if($res[0]->result!='ok'){
	       		return array('success' => FALSE, 'msg' => $res[0]->result);
	       	} 
	       }else{
	       	return array('success' => FALSE, 'msg' => 'Unknown error' );
	       }
	    }
	    return array('success' => TRUE, 'data' => $this->getRow($data['iu_urok_creatorsid'] ));
	} else {
	    return array('success' => FALSE, 'msg' => 'No data to store on server');
	}
    }
    function newRow($instanceid,$data)  {
	  $id = $this->jservice->get(array('Action' => 'NewGuid'));
	if ($this->jservice->get(array('Action' => 'NewRow', 'PartName' => 'iu_urok_creators', 'RowID' => $id, 'DocumentID' => $instanceid, 'Values'=>$data)) == 'OK') {
	    return array('success' => TRUE, 'data' => $id);
	} else {
	    return array('success' => FALSE, 'msg' => 'Error while create new id');
	}
    }
    function getRows($sort=array())
		{
	    $res = $this->jservice->get(array('Action' => 'GetViewData','Sort'=>$sort,'FieldList'=>'B2G(iu_urok_creatorsid) as iu_urok_creatorsid, B2G(iu_urok_creatorsid) as id,B2G(instanceid) as instanceid, iu_urok_creators_BRIEF_F(iu_urok_creatorsid , NULL) as  brief,B2G(processrole) processrole, iu_crole_BRIEF_F(processrole, NULL) as processrole_grid,B2G(doer) doer, iu_u_def_BRIEF_F(doer, NULL) as doer_grid,doers, iu_crole_MREF_F(doers, NULL) as  doers_grid,B2G(selectby) selectby, iu_u_def_BRIEF_F(selectby, NULL) as selectby_grid,  DATE_FORMAT(selectday,\'%Y-%m-%d %H:%i:%s\') as  selectday', 'ViewName' => 'iu_urok_creators'));
	    if (count($res)) {
	        return $res;
	    } else {
	        return null;
	    }
		}
    function getRowsByInstance($id,$sort=array())
		{
	$res = $this->jservice->get(array('Action' => 'GetViewData','Sort'=>$sort,'FieldList'=>'B2G(iu_urok_creatorsid) as iu_urok_creatorsid, B2G(iu_urok_creatorsid) as id,B2G(instanceid) as instanceid, iu_urok_creators_BRIEF_F(iu_urok_creatorsid , NULL) as  brief,B2G(processrole) processrole, iu_crole_BRIEF_F(processrole, NULL) as processrole_grid,B2G(doer) doer, iu_u_def_BRIEF_F(doer, NULL) as doer_grid,doers, iu_crole_MREF_F(doers, NULL) as  doers_grid,B2G(selectby) selectby, iu_u_def_BRIEF_F(selectby, NULL) as selectby_grid,  DATE_FORMAT(selectday,\'%Y-%m-%d %H:%i:%s\') as  selectday', 'ViewName' => 'iu_urok_creators', 'WhereClause' => 'instanceid=G2B(\''. $id . '\')'));
	if (count($res) == 0) {
	    return null;
	} else {
	    return $res;
	}
		}
    function getRowsByParent($id,$sort=array())
	{
	$res = $this->jservice->get(array('Action' => 'GetViewData','Sort'=>$sort,'FieldList'=>'B2G(iu_urok_creatorsid) as iu_urok_creatorsid, B2G(iu_urok_creatorsid) as id,B2G(instanceid) as instanceid, iu_urok_creators_BRIEF_F(iu_urok_creatorsid , NULL) as  brief,B2G(processrole) processrole, iu_crole_BRIEF_F(processrole, NULL) as processrole_grid,B2G(doer) doer, iu_u_def_BRIEF_F(doer, NULL) as doer_grid,doers, iu_crole_MREF_F(doers, NULL) as  doers_grid,B2G(selectby) selectby, iu_u_def_BRIEF_F(selectby, NULL) as selectby_grid,  DATE_FORMAT(selectday,\'%Y-%m-%d %H:%i:%s\') as  selectday', 'ViewName' => 'iu_urok_creators', 'WhereClause' => ' parentstructrowid=G2B(\''. $id . '\')'));
	if (count($res) == 0) {
	    return null;
	} else {
	    return $res;
	}
  }
    function deleteRow($id = null) {
	  if (!empty($id) && $this->jservice->get(array('Action' => 'DeleteRow', 'PartName' => 'iu_urok_creators', 'RowID' => $id)) == 'OK')
	    $result = array('success' => TRUE);
	else
	    $result = array('success' => FALSE, 'msg' => 'Error while deleting record!');
	return $result;
    }
}
?>
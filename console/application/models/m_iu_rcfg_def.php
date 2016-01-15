
<?php
class  M_iu_rcfg_def extends CI_Model {
    function getRow($empId) {
    $result = array('success' => false, 'msg' => 'No Row ID for retrive data');
	if (!empty($empId)){
	    $res = $this->jservice->get(array('Action' => 'GetRowData','FieldList'=>'B2G(iu_rcfg_defid) as iu_rcfg_defid, B2G(iu_rcfg_defid) as id,B2G(instanceid) as instanceid, iu_rcfg_def_BRIEF_F(iu_rcfg_defid , NULL) as  brief,B2G(therole) therole, iu_crole_BRIEF_F(therole, NULL) as therole_grid', 'PartName' => 'iu_rcfg_def', 'ID' =>  $empId 	));
	    if (!empty($res)) {
	        $result = $res[0];
	    }
	}
	return $result;
    }
    function setRow($data)  {
	    $data = (array)$data;
	if (!empty($data)) {
	    if (empty($data['iu_rcfg_defid'])) {
	        $data['iu_rcfg_defid'] = $this->jservice->get(array('Action' => 'NewGuid'));
	        $res=$this->jservice->get(array('Action' => 'NewRow', 'PartName' => 'iu_rcfg_def', 'RowID' => $data['iu_rcfg_defid'], 'DocumentID' => $data['instanceid'], 'Values'=>$data));
	       if(isset($res[0])){
	       	if($res[0]->result!='ok'){
	       		return array('success' => FALSE, 'msg' => $res[0]->result);
	       	} 
	       }else{
	       	return array('success' => FALSE, 'msg' => 'Unknown error' );
	       }
	    }else{
	    $res = $this->jservice->get(array('Action' => 'UpdateRow', 'PartName' => 'iu_rcfg_def', 'RowID' => $data['iu_rcfg_defid'], 'DocumentID' => $data['instanceid'], 'Values'=>$data));
	       if(isset($res[0])){
	       	if($res[0]->result!='ok'){
	       		return array('success' => FALSE, 'msg' => $res[0]->result);
	       	} 
	       }else{
	       	return array('success' => FALSE, 'msg' => 'Unknown error' );
	       }
	    }
	    return array('success' => TRUE, 'data' => $this->getRow($data['iu_rcfg_defid'] ));
	} else {
	    return array('success' => FALSE, 'msg' => 'No data to store on server');
	}
    }
    function newRow($instanceid,$data)  {
	  $id = $this->jservice->get(array('Action' => 'NewGuid'));
	if ($this->jservice->get(array('Action' => 'NewRow', 'PartName' => 'iu_rcfg_def', 'RowID' => $id, 'DocumentID' => $instanceid, 'Values'=>$data)) == 'OK') {
	    return array('success' => TRUE, 'data' => $id);
	} else {
	    return array('success' => FALSE, 'msg' => 'Error while create new id');
	}
    }
    function getRows($sort=array())
		{
	    $res = $this->jservice->get(array('Action' => 'GetViewData','Sort'=>$sort,'FieldList'=>'B2G(iu_rcfg_defid) as iu_rcfg_defid, B2G(iu_rcfg_defid) as id,B2G(instanceid) as instanceid, iu_rcfg_def_BRIEF_F(iu_rcfg_defid , NULL) as  brief,B2G(therole) therole, iu_crole_BRIEF_F(therole, NULL) as therole_grid', 'ViewName' => 'iu_rcfg_def'));
	    if (count($res)) {
	        return $res;
	    } else {
	        return null;
	    }
		}
    function getRowsByInstance($id,$sort=array())
		{
	$res = $this->jservice->get(array('Action' => 'GetViewData','Sort'=>$sort,'FieldList'=>'B2G(iu_rcfg_defid) as iu_rcfg_defid, B2G(iu_rcfg_defid) as id,B2G(instanceid) as instanceid, iu_rcfg_def_BRIEF_F(iu_rcfg_defid , NULL) as  brief,B2G(therole) therole, iu_crole_BRIEF_F(therole, NULL) as therole_grid', 'ViewName' => 'iu_rcfg_def', 'WhereClause' => 'instanceid=G2B(\''. $id . '\')'));
	if (count($res) == 0) {
	    return null;
	} else {
	    return $res;
	}
		}
    function getRowsByParent($id,$sort=array())
	{
	$res = $this->jservice->get(array('Action' => 'GetViewData','Sort'=>$sort,'FieldList'=>'B2G(iu_rcfg_defid) as iu_rcfg_defid, B2G(iu_rcfg_defid) as id,B2G(instanceid) as instanceid, iu_rcfg_def_BRIEF_F(iu_rcfg_defid , NULL) as  brief,B2G(therole) therole, iu_crole_BRIEF_F(therole, NULL) as therole_grid', 'ViewName' => 'iu_rcfg_def', 'WhereClause' => ' parentstructrowid=G2B(\''. $id . '\')'));
	if (count($res) == 0) {
	    return null;
	} else {
	    return $res;
	}
  }
    function deleteRow($id = null) {
	  if (!empty($id) && $this->jservice->get(array('Action' => 'ArchiveRow', 'PartName' => 'iu_rcfg_def', 'RowID' => $id)) == 'OK')
	    $result = array('success' => TRUE);
	else
	    $result = array('success' => FALSE, 'msg' => 'Error while deleting record!');
	return $result;
    }
}
?>
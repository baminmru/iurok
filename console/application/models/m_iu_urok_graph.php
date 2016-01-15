
<?php
class  M_iu_urok_graph extends CI_Model {
    function getRow($empId) {
    $result = array('success' => false, 'msg' => 'No Row ID for retrive data');
	if (!empty($empId)){
	    $res = $this->jservice->get(array('Action' => 'GetRowData','FieldList'=>'B2G(iu_urok_graphid) as iu_urok_graphid, B2G(iu_urok_graphid) as id,B2G(instanceid) as instanceid, iu_urok_graph_BRIEF_F(iu_urok_graphid , NULL) as  brief,  DATE_FORMAT(stageenddate,\'%Y-%m-%d %H:%i:%s\') as  stageenddate,  DATE_FORMAT(planstartdate,\'%Y-%m-%d\') as  planstartdate,passnumber,stagepercent,B2G(theStatus) thestatus, iu_status_BRIEF_F(thestatus, NULL) as thestatus_grid,  DATE_FORMAT(stagestartdate,\'%Y-%m-%d %H:%i:%s\') as  stagestartdate,planduration', 'PartName' => 'iu_urok_graph', 'ID' =>  $empId 	));
	    if (!empty($res)) {
	        $result = $res[0];
	    }
	}
	return $result;
    }
    function setRow($data)  {
	    $data = (array)$data;
	if (!empty($data)) {
	    if (empty($data['iu_urok_graphid'])) {
	        $data['iu_urok_graphid'] = $this->jservice->get(array('Action' => 'NewGuid'));
	        $res=$this->jservice->get(array('Action' => 'NewRow', 'PartName' => 'iu_urok_graph', 'RowID' => $data['iu_urok_graphid'], 'DocumentID' => $data['instanceid'], 'Values'=>$data));
	       if(isset($res[0])){
	       	if($res[0]->result!='ok'){
	       		return array('success' => FALSE, 'msg' => $res[0]->result);
	       	} 
	       }else{
	       	return array('success' => FALSE, 'msg' => 'Unknown error' );
	       }
	    }else{
	    $res = $this->jservice->get(array('Action' => 'UpdateRow', 'PartName' => 'iu_urok_graph', 'RowID' => $data['iu_urok_graphid'], 'DocumentID' => $data['instanceid'], 'Values'=>$data));
	       if(isset($res[0])){
	       	if($res[0]->result!='ok'){
	       		return array('success' => FALSE, 'msg' => $res[0]->result);
	       	} 
	       }else{
	       	return array('success' => FALSE, 'msg' => 'Unknown error' );
	       }
	    }
	    return array('success' => TRUE, 'data' => $this->getRow($data['iu_urok_graphid'] ));
	} else {
	    return array('success' => FALSE, 'msg' => 'No data to store on server');
	}
    }
    function newRow($instanceid,$data)  {
	  $id = $this->jservice->get(array('Action' => 'NewGuid'));
	if ($this->jservice->get(array('Action' => 'NewRow', 'PartName' => 'iu_urok_graph', 'RowID' => $id, 'DocumentID' => $instanceid, 'Values'=>$data)) == 'OK') {
	    return array('success' => TRUE, 'data' => $id);
	} else {
	    return array('success' => FALSE, 'msg' => 'Error while create new id');
	}
    }
    function getRows($sort=array())
		{
	    $res = $this->jservice->get(array('Action' => 'GetViewData','Sort'=>$sort,'FieldList'=>'B2G(iu_urok_graphid) as iu_urok_graphid, B2G(iu_urok_graphid) as id,B2G(instanceid) as instanceid, iu_urok_graph_BRIEF_F(iu_urok_graphid , NULL) as  brief,  DATE_FORMAT(stageenddate,\'%Y-%m-%d %H:%i:%s\') as  stageenddate,  DATE_FORMAT(planstartdate,\'%Y-%m-%d\') as  planstartdate,passnumber,stagepercent,B2G(theStatus) thestatus, iu_status_BRIEF_F(thestatus, NULL) as thestatus_grid,  DATE_FORMAT(stagestartdate,\'%Y-%m-%d %H:%i:%s\') as  stagestartdate,planduration', 'ViewName' => 'iu_urok_graph'));
	    if (count($res)) {
	        return $res;
	    } else {
	        return null;
	    }
		}
    function getRowsByInstance($id,$sort=array())
		{
	$res = $this->jservice->get(array('Action' => 'GetViewData','Sort'=>$sort,'FieldList'=>'B2G(iu_urok_graphid) as iu_urok_graphid, B2G(iu_urok_graphid) as id,B2G(instanceid) as instanceid, iu_urok_graph_BRIEF_F(iu_urok_graphid , NULL) as  brief,  DATE_FORMAT(stageenddate,\'%Y-%m-%d %H:%i:%s\') as  stageenddate,  DATE_FORMAT(planstartdate,\'%Y-%m-%d\') as  planstartdate,passnumber,stagepercent,B2G(theStatus) thestatus, iu_status_BRIEF_F(thestatus, NULL) as thestatus_grid,  DATE_FORMAT(stagestartdate,\'%Y-%m-%d %H:%i:%s\') as  stagestartdate,planduration', 'ViewName' => 'iu_urok_graph', 'WhereClause' => 'instanceid=G2B(\''. $id . '\')'));
	if (count($res) == 0) {
	    return null;
	} else {
	    return $res;
	}
		}
    function getRowsByParent($id,$sort=array())
	{
	$res = $this->jservice->get(array('Action' => 'GetViewData','Sort'=>$sort,'FieldList'=>'B2G(iu_urok_graphid) as iu_urok_graphid, B2G(iu_urok_graphid) as id,B2G(instanceid) as instanceid, iu_urok_graph_BRIEF_F(iu_urok_graphid , NULL) as  brief,  DATE_FORMAT(stageenddate,\'%Y-%m-%d %H:%i:%s\') as  stageenddate,  DATE_FORMAT(planstartdate,\'%Y-%m-%d\') as  planstartdate,passnumber,stagepercent,B2G(theStatus) thestatus, iu_status_BRIEF_F(thestatus, NULL) as thestatus_grid,  DATE_FORMAT(stagestartdate,\'%Y-%m-%d %H:%i:%s\') as  stagestartdate,planduration', 'ViewName' => 'iu_urok_graph', 'WhereClause' => ' parentstructrowid=G2B(\''. $id . '\')'));
	if (count($res) == 0) {
	    return null;
	} else {
	    return $res;
	}
  }
    function deleteRow($id = null) {
	  if (!empty($id) && $this->jservice->get(array('Action' => 'DeleteRow', 'PartName' => 'iu_urok_graph', 'RowID' => $id)) == 'OK')
	    $result = array('success' => TRUE);
	else
	    $result = array('success' => FALSE, 'msg' => 'Error while deleting record!');
	return $result;
    }
}
?>

<?php
class  M_dinamicfilterscript extends CI_Model {
    function getRow($empId) {
    $result = array('success' => false, 'msg' => 'No Row ID for retrive data');
	if (!empty($empId)){
	    $res = $this->jservice->get(array('Action' => 'GetRowData','FieldList'=>'B2G(dinamicfilterscriptid) as dinamicfilterscriptid, B2G(dinamicfilterscriptid) as id,B2G(parentstructrowid) as parentid, DINAMICFILTERSCRIPT_BRIEF_F(dinamicfilterscriptid , NULL) as  brief,B2G(Target) target, GENERATOR_TARGET_BRIEF_F(target, NULL) as target_grid,code', 'PartName' => 'dinamicfilterscript', 'ID' =>  $empId 	));
	    if (!empty($res)) {
	        $result = $res[0];
	    }
	}
	return $result;
    }
    function setRow($data)  {
	    $data = (array)$data;
	if (!empty($data)) {
	    if (empty($data['dinamicfilterscriptid'])) {
	        $data['dinamicfilterscriptid'] = $this->jservice->get(array('Action' => 'NewGuid'));
	        $res=$this->jservice->get(array('Action' => 'NewRow', 'PartName' => 'dinamicfilterscript', 'RowID' => $data['dinamicfilterscriptid'], 'DocumentID' => $data['instanceid'],'ParentID' => $data['parentid'], 'Values'=>$data));
	       if(isset($res[0])){
	       	if($res[0]->result!='ok'){
	       		return array('success' => FALSE, 'msg' => $res[0]->result);
	       	} 
	       }else{
	       	return array('success' => FALSE, 'msg' => 'Unknown error' );
	       }
	    }else{
	    $res = $this->jservice->get(array('Action' => 'UpdateRow', 'PartName' => 'dinamicfilterscript', 'RowID' => $data['dinamicfilterscriptid'], 'DocumentID' => $data['instanceid'],'ParentID' => $data['parentid'], 'Values'=>$data));
	       if(isset($res[0])){
	       	if($res[0]->result!='ok'){
	       		return array('success' => FALSE, 'msg' => $res[0]->result);
	       	} 
	       }else{
	       	return array('success' => FALSE, 'msg' => 'Unknown error' );
	       }
	    }
	    return array('success' => TRUE, 'data' => $this->getRow($data['dinamicfilterscriptid'] ));
	} else {
	    return array('success' => FALSE, 'msg' => 'No data to store on server');
	}
    }
    function newRow($instanceid,$parentid,$data)  {
	  $id = $this->jservice->get(array('Action' => 'NewGuid'));
	if ($this->jservice->get(array('Action' => 'NewRow', 'PartName' => 'dinamicfilterscript', 'RowID' => $id, 'DocumentID' => $instanceid,'ParentID'=>$parentid, 'Values'=>$data)) == 'OK') {
	    return array('success' => TRUE, 'data' => $id);
	} else {
	    return array('success' => FALSE, 'msg' => 'Error while create new id');
	}
    }
    function getRows($sort=array())
		{
	    $res = $this->jservice->get(array('Action' => 'GetViewData','Sort'=>$sort,'FieldList'=>'B2G(dinamicfilterscriptid) as dinamicfilterscriptid, B2G(dinamicfilterscriptid) as id,B2G(parentstructrowid) as parentid, DINAMICFILTERSCRIPT_BRIEF_F(dinamicfilterscriptid , NULL) as  brief,B2G(Target) target, GENERATOR_TARGET_BRIEF_F(target, NULL) as target_grid,code', 'ViewName' => 'dinamicfilterscript'));
	    if (count($res)) {
	        return $res;
	    } else {
	        return null;
	    }
		}
    function getRowsByInstance($id,$sort=array())
		{
	$res = $this->jservice->get(array('Action' => 'GetViewData','Sort'=>$sort,'FieldList'=>'B2G(dinamicfilterscriptid) as dinamicfilterscriptid, B2G(dinamicfilterscriptid) as id,B2G(parentstructrowid) as parentid, DINAMICFILTERSCRIPT_BRIEF_F(dinamicfilterscriptid , NULL) as  brief,B2G(Target) target, GENERATOR_TARGET_BRIEF_F(target, NULL) as target_grid,code', 'ViewName' => 'dinamicfilterscript', 'WhereClause' => 'instanceid=G2B(\''. $id . '\')'));
	if (count($res) == 0) {
	    return null;
	} else {
	    return $res;
	}
		}
    function getRowsByParent($id,$sort=array())
	{
	$res = $this->jservice->get(array('Action' => 'GetViewData','Sort'=>$sort,'FieldList'=>'B2G(dinamicfilterscriptid) as dinamicfilterscriptid, B2G(dinamicfilterscriptid) as id,B2G(parentstructrowid) as parentid, DINAMICFILTERSCRIPT_BRIEF_F(dinamicfilterscriptid , NULL) as  brief,B2G(Target) target, GENERATOR_TARGET_BRIEF_F(target, NULL) as target_grid,code', 'ViewName' => 'dinamicfilterscript', 'WhereClause' => ' parentstructrowid=G2B(\''. $id . '\')'));
	if (count($res) == 0) {
	    return null;
	} else {
	    return $res;
	}
  }
    function deleteRow($id = null) {
	  if (!empty($id) && $this->jservice->get(array('Action' => 'DeleteRow', 'PartName' => 'dinamicfilterscript', 'RowID' => $id)) == 'OK')
	    $result = array('success' => TRUE);
	else
	    $result = array('success' => FALSE, 'msg' => 'Error while deleting record!');
	return $result;
    }
}
?>
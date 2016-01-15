
<?php
class  M_iu_orgtree extends CI_Model {
    function getRow($empId) {
    $result = array('success' => false, 'msg' => 'No Row ID for retrive data');
	if (!empty($empId)){
	    $res = $this->jservice->get(array('Action' => 'GetRowData','FieldList'=>'B2G(iu_orgtreeid) as iu_orgtreeid, B2G(iu_orgtreeid) as id,B2G(instanceid) as instanceid,B2G(parentrowid) as parentrowid, iu_orgtree_BRIEF_F(iu_orgtreeid , NULL) as  brief,name', 'PartName' => 'iu_orgtree', 'ID' =>  $empId 	));
	    if (!empty($res)) {
	        $result = $res[0];
	    }
	}
	return $result;
    }
    function setRow($data)  {
	    $data = (array)$data;
	if (!empty($data)) {
	    if (empty($data['iu_orgtreeid'])) {
	        $data['iu_orgtreeid'] = $this->jservice->get(array('Action' => 'NewGuid'));
	        $res=$this->jservice->get(array('Action' => 'NewRow', 'PartName' => 'iu_orgtree', 'RowID' => $data['iu_orgtreeid'], 'DocumentID' => $data['instanceid'],'TreeID'=>$data['treeid'], 'Values'=>$data));
	       if(isset($res[0])){
	       	if($res[0]->result!='ok'){
	       		return array('success' => FALSE, 'msg' => $res[0]->result);
	       	} 
	       }else{
	       	return array('success' => FALSE, 'msg' => 'Unknown error' );
	       }
	    }else{
	    $res = $this->jservice->get(array('Action' => 'UpdateRow', 'PartName' => 'iu_orgtree', 'RowID' => $data['iu_orgtreeid'], 'DocumentID' => $data['instanceid'],'TreeID'=>$data['treeid'], 'Values'=>$data));
	       if(isset($res[0])){
	       	if($res[0]->result!='ok'){
	       		return array('success' => FALSE, 'msg' => $res[0]->result);
	       	} 
	       }else{
	       	return array('success' => FALSE, 'msg' => 'Unknown error' );
	       }
	    }
	    return array('success' => TRUE, 'data' => $this->getRow($data['iu_orgtreeid'] ));
	} else {
	    return array('success' => FALSE, 'msg' => 'No data to store on server');
	}
    }
    function newRow($instanceid,$treeid,$data)  {
	  $id = $this->jservice->get(array('Action' => 'NewGuid'));
	if ($this->jservice->get(array('Action' => 'NewRow', 'PartName' => 'iu_orgtree', 'RowID' => $id, 'DocumentID' => $instanceid,'TreeID'=>$treeid, 'Values'=>$data)) == 'OK') {
	    return array('success' => TRUE, 'data' => $id);
	} else {
	    return array('success' => FALSE, 'msg' => 'Error while create new id');
	}
    }
    function getRows($sort=array())
		{
	    $res = $this->jservice->get(array('Action' => 'GetViewData','Sort'=>$sort,'FieldList'=>'B2G(iu_orgtreeid) as iu_orgtreeid, B2G(iu_orgtreeid) as id,B2G(instanceid) as instanceid,B2G(parentrowid) as parentrowid, iu_orgtree_BRIEF_F(iu_orgtreeid , NULL) as  brief,name', 'ViewName' => 'iu_orgtree'));
	    if (count($res)) {
	        return $res;
	    } else {
	        return null;
	    }
		}
    function getRowsByInstance($id,$sort=array())
		{
	$res = $this->jservice->get(array('Action' => 'GetViewData','Sort'=>$sort,'FieldList'=>'B2G(iu_orgtreeid) as iu_orgtreeid, B2G(iu_orgtreeid) as id,B2G(instanceid) as instanceid,B2G(parentrowid) as parentrowid, iu_orgtree_BRIEF_F(iu_orgtreeid , NULL) as  brief,name', 'ViewName' => 'iu_orgtree', 'WhereClause' => 'instanceid=G2B(\''. $id . '\')'));
	if (count($res) == 0) {
	    return null;
	} else {
	    return $res;
	}
		}
    function getRowsByParent($id,$sort=array())
	{
	$res = $this->jservice->get(array('Action' => 'GetViewData','Sort'=>$sort,'FieldList'=>'B2G(iu_orgtreeid) as iu_orgtreeid, B2G(iu_orgtreeid) as id,B2G(instanceid) as instanceid,B2G(parentrowid) as parentrowid, iu_orgtree_BRIEF_F(iu_orgtreeid , NULL) as  brief,name', 'ViewName' => 'iu_orgtree', 'WhereClause' => ' parentstructrowid=G2B(\''. $id . '\')'));
	if (count($res) == 0) {
	    return null;
	} else {
	    return $res;
	}
  }
    function getRowsByTree($treeid,$sort=array())
		{
	    $res = $this->jservice->get(array('Action' => 'GetViewData','Sort'=>$sort,'FieldList'=>'B2G(iu_orgtreeid) as iu_orgtreeid, B2G(iu_orgtreeid) as id,B2G(instanceid) as instanceid,B2G(parentrowid) as parentrowid, iu_orgtree_BRIEF_F(iu_orgtreeid , NULL) as  brief,name', 'ViewName' => 'iu_orgtree', 'WhereClause' => 'parentrowid=G2B(\''.$treeid.'\')'));
	    if (count($res)) {
	        return $res;
	    } else {
	        return null;
	    }
		}
    function getRowsByInstanceTree($id,$treeid,$sort=array())
		{
	$res = $this->jservice->get(array('Action' => 'GetViewData','Sort'=>$sort,'FieldList'=>'B2G(iu_orgtreeid) as iu_orgtreeid, B2G(iu_orgtreeid) as id,B2G(instanceid) as instanceid,B2G(parentrowid) as parentrowid, iu_orgtree_BRIEF_F(iu_orgtreeid , NULL) as  brief,name', 'ViewName' => 'iu_orgtree', 'WhereClause' => 'instanceid=G2B(\''. $id . '\') and parentrowid=G2B(\''.$treeid.'\')'));
	if (count($res) == 0) {
	    return null;
	} else {
	    return $res;
	}
		}
    function getRowsByParentTree($id,$treeid,$sort=array())
	{
	$res = $this->jservice->get(array('Action' => 'GetViewData','Sort'=>$sort,'FieldList'=>'B2G(iu_orgtreeid) as iu_orgtreeid, B2G(iu_orgtreeid) as id,B2G(instanceid) as instanceid,B2G(parentrowid) as parentrowid, iu_orgtree_BRIEF_F(iu_orgtreeid , NULL) as  brief,name', 'ViewName' => 'iu_orgtree', 'WhereClause' => ' parentstructrowid=G2B(\''. $id . '\') and parentrowid=G2B(\''.$treeid.'\')'));
	if (count($res) == 0) {
	    return null;
	} else {
	    return $res;
	}
  }
    function deleteRow($id = null) {
	  if (!empty($id) && $this->jservice->get(array('Action' => 'DeleteRow', 'PartName' => 'iu_orgtree', 'RowID' => $id)) == 'OK')
	    $result = array('success' => TRUE);
	else
	    $result = array('success' => FALSE, 'msg' => 'Error while deleting record!');
	return $result;
    }
}
?>
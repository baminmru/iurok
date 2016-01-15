﻿
<?php
class  M_partview extends CI_Model {
    function getRow($empId) {
    $result = array('success' => false, 'msg' => 'No Row ID for retrive data');
	if (!empty($empId)){
	    $res = $this->jservice->get(array('Action' => 'GetRowData','FieldList'=>'B2G(partviewid) as partviewid, B2G(partviewid) as id,B2G(parentstructrowid) as parentid, PARTVIEW_BRIEF_F(partviewid , NULL) as  brief,filterfield2,filterfield0,the_alias,forchoose, case forchoose  when -1 then \'Да\' when 0 then \'Нет\'End  as forchoose_grid,filterfield1,filterfield3,name', 'PartName' => 'partview', 'ID' =>  $empId 	));
	    if (!empty($res)) {
	        $result = $res[0];
	    }
	}
	return $result;
    }
    function setRow($data)  {
	    $data = (array)$data;
	if (!empty($data)) {
	    if (empty($data['partviewid'])) {
	        $data['partviewid'] = $this->jservice->get(array('Action' => 'NewGuid'));
	        $res=$this->jservice->get(array('Action' => 'NewRow', 'PartName' => 'partview', 'RowID' => $data['partviewid'], 'DocumentID' => $data['instanceid'],'ParentID' => $data['parentid'], 'Values'=>$data));
	       if(isset($res[0])){
	       	if($res[0]->result!='ok'){
	       		return array('success' => FALSE, 'msg' => $res[0]->result);
	       	} 
	       }else{
	       	return array('success' => FALSE, 'msg' => 'Unknown error' );
	       }
	    }else{
	    $res = $this->jservice->get(array('Action' => 'UpdateRow', 'PartName' => 'partview', 'RowID' => $data['partviewid'], 'DocumentID' => $data['instanceid'],'ParentID' => $data['parentid'], 'Values'=>$data));
	       if(isset($res[0])){
	       	if($res[0]->result!='ok'){
	       		return array('success' => FALSE, 'msg' => $res[0]->result);
	       	} 
	       }else{
	       	return array('success' => FALSE, 'msg' => 'Unknown error' );
	       }
	    }
	    return array('success' => TRUE, 'data' => $this->getRow($data['partviewid'] ));
	} else {
	    return array('success' => FALSE, 'msg' => 'No data to store on server');
	}
    }
    function newRow($instanceid,$parentid,$data)  {
	  $id = $this->jservice->get(array('Action' => 'NewGuid'));
	if ($this->jservice->get(array('Action' => 'NewRow', 'PartName' => 'partview', 'RowID' => $id, 'DocumentID' => $instanceid,'ParentID'=>$parentid, 'Values'=>$data)) == 'OK') {
	    return array('success' => TRUE, 'data' => $id);
	} else {
	    return array('success' => FALSE, 'msg' => 'Error while create new id');
	}
    }
    function getRows($sort=array())
		{
	    $res = $this->jservice->get(array('Action' => 'GetViewData','Sort'=>$sort,'FieldList'=>'B2G(partviewid) as partviewid, B2G(partviewid) as id,B2G(parentstructrowid) as parentid, PARTVIEW_BRIEF_F(partviewid , NULL) as  brief,filterfield2,filterfield0,the_alias,forchoose, case forchoose  when -1 then \'Да\' when 0 then \'Нет\'End  as forchoose_grid,filterfield1,filterfield3,name', 'ViewName' => 'partview'));
	    if (count($res)) {
	        return $res;
	    } else {
	        return null;
	    }
		}
    function getRowsByInstance($id,$sort=array())
		{
	$res = $this->jservice->get(array('Action' => 'GetViewData','Sort'=>$sort,'FieldList'=>'B2G(partviewid) as partviewid, B2G(partviewid) as id,B2G(parentstructrowid) as parentid, PARTVIEW_BRIEF_F(partviewid , NULL) as  brief,filterfield2,filterfield0,the_alias,forchoose, case forchoose  when -1 then \'Да\' when 0 then \'Нет\'End  as forchoose_grid,filterfield1,filterfield3,name', 'ViewName' => 'partview', 'WhereClause' => 'instanceid=G2B(\''. $id . '\')'));
	if (count($res) == 0) {
	    return null;
	} else {
	    return $res;
	}
		}
    function getRowsByParent($id,$sort=array())
	{
	$res = $this->jservice->get(array('Action' => 'GetViewData','Sort'=>$sort,'FieldList'=>'B2G(partviewid) as partviewid, B2G(partviewid) as id,B2G(parentstructrowid) as parentid, PARTVIEW_BRIEF_F(partviewid , NULL) as  brief,filterfield2,filterfield0,the_alias,forchoose, case forchoose  when -1 then \'Да\' when 0 then \'Нет\'End  as forchoose_grid,filterfield1,filterfield3,name', 'ViewName' => 'partview', 'WhereClause' => ' parentstructrowid=G2B(\''. $id . '\')'));
	if (count($res) == 0) {
	    return null;
	} else {
	    return $res;
	}
  }
    function deleteRow($id = null) {
	  if (!empty($id) && $this->jservice->get(array('Action' => 'DeleteRow', 'PartName' => 'partview', 'RowID' => $id)) == 'OK')
	    $result = array('success' => TRUE);
	else
	    $result = array('success' => FALSE, 'msg' => 'Error while deleting record!');
	return $result;
    }
}
?>
﻿
<?php
class  M_iu_stage_doc extends CI_Model {
    function getRow($empId) {
    $result = array('success' => false, 'msg' => 'No Row ID for retrive data');
	if (!empty($empId)){
	    $res = $this->jservice->get(array('Action' => 'GetRowData','FieldList'=>'B2G(iu_stage_docid) as iu_stage_docid, B2G(iu_stage_docid) as id,B2G(instanceid) as instanceid, iu_stage_doc_BRIEF_F(iu_stage_docid , NULL) as  brief,name,B2G(doctype) doctype, iud_doctype_BRIEF_F(doctype, NULL) as doctype_grid,allowdoc, case allowdoc  when -1 then \'Да\' when 0 then \'Нет\'End  as allowdoc_grid,info', 'PartName' => 'iu_stage_doc', 'ID' =>  $empId 	));
	    if (!empty($res)) {
	        $result = $res[0];
	    }
	}
	return $result;
    }
    function setRow($data)  {
	    $data = (array)$data;
	if (!empty($data)) {
	    if (empty($data['iu_stage_docid'])) {
	        $data['iu_stage_docid'] = $this->jservice->get(array('Action' => 'NewGuid'));
	        $res=$this->jservice->get(array('Action' => 'NewRow', 'PartName' => 'iu_stage_doc', 'RowID' => $data['iu_stage_docid'], 'DocumentID' => $data['instanceid'], 'Values'=>$data));
	       if(isset($res[0])){
	       	if($res[0]->result!='ok'){
	       		return array('success' => FALSE, 'msg' => $res[0]->result);
	       	} 
	       }else{
	       	return array('success' => FALSE, 'msg' => 'Unknown error' );
	       }
	    }else{
	    $res = $this->jservice->get(array('Action' => 'UpdateRow', 'PartName' => 'iu_stage_doc', 'RowID' => $data['iu_stage_docid'], 'DocumentID' => $data['instanceid'], 'Values'=>$data));
	       if(isset($res[0])){
	       	if($res[0]->result!='ok'){
	       		return array('success' => FALSE, 'msg' => $res[0]->result);
	       	} 
	       }else{
	       	return array('success' => FALSE, 'msg' => 'Unknown error' );
	       }
	    }
	    return array('success' => TRUE, 'data' => $this->getRow($data['iu_stage_docid'] ));
	} else {
	    return array('success' => FALSE, 'msg' => 'No data to store on server');
	}
    }
    function newRow($instanceid,$data)  {
	  $id = $this->jservice->get(array('Action' => 'NewGuid'));
	if ($this->jservice->get(array('Action' => 'NewRow', 'PartName' => 'iu_stage_doc', 'RowID' => $id, 'DocumentID' => $instanceid, 'Values'=>$data)) == 'OK') {
	    return array('success' => TRUE, 'data' => $id);
	} else {
	    return array('success' => FALSE, 'msg' => 'Error while create new id');
	}
    }
    function getRows($sort=array())
		{
	    $res = $this->jservice->get(array('Action' => 'GetViewData','Sort'=>$sort,'FieldList'=>'B2G(iu_stage_docid) as iu_stage_docid, B2G(iu_stage_docid) as id,B2G(instanceid) as instanceid, iu_stage_doc_BRIEF_F(iu_stage_docid , NULL) as  brief,name,B2G(doctype) doctype, iud_doctype_BRIEF_F(doctype, NULL) as doctype_grid,allowdoc, case allowdoc  when -1 then \'Да\' when 0 then \'Нет\'End  as allowdoc_grid,info', 'ViewName' => 'iu_stage_doc'));
	    if (count($res)) {
	        return $res;
	    } else {
	        return null;
	    }
		}
    function getRowsByInstance($id,$sort=array())
		{
	$res = $this->jservice->get(array('Action' => 'GetViewData','Sort'=>$sort,'FieldList'=>'B2G(iu_stage_docid) as iu_stage_docid, B2G(iu_stage_docid) as id,B2G(instanceid) as instanceid, iu_stage_doc_BRIEF_F(iu_stage_docid , NULL) as  brief,name,B2G(doctype) doctype, iud_doctype_BRIEF_F(doctype, NULL) as doctype_grid,allowdoc, case allowdoc  when -1 then \'Да\' when 0 then \'Нет\'End  as allowdoc_grid,info', 'ViewName' => 'iu_stage_doc', 'WhereClause' => 'instanceid=G2B(\''. $id . '\')'));
	if (count($res) == 0) {
	    return null;
	} else {
	    return $res;
	}
		}
    function getRowsByParent($id,$sort=array())
	{
	$res = $this->jservice->get(array('Action' => 'GetViewData','Sort'=>$sort,'FieldList'=>'B2G(iu_stage_docid) as iu_stage_docid, B2G(iu_stage_docid) as id,B2G(instanceid) as instanceid, iu_stage_doc_BRIEF_F(iu_stage_docid , NULL) as  brief,name,B2G(doctype) doctype, iud_doctype_BRIEF_F(doctype, NULL) as doctype_grid,allowdoc, case allowdoc  when -1 then \'Да\' when 0 then \'Нет\'End  as allowdoc_grid,info', 'ViewName' => 'iu_stage_doc', 'WhereClause' => ' parentstructrowid=G2B(\''. $id . '\')'));
	if (count($res) == 0) {
	    return null;
	} else {
	    return $res;
	}
  }
    function deleteRow($id = null) {
	  if (!empty($id) && $this->jservice->get(array('Action' => 'DeleteRow', 'PartName' => 'iu_stage_doc', 'RowID' => $id)) == 'OK')
	    $result = array('success' => TRUE);
	else
	    $result = array('success' => FALSE, 'msg' => 'Error while deleting record!');
	return $result;
    }
}
?>

<?php
class  M_fieldsrcdef extends CI_Model {
    function getRow($empId) {
    $result = array('success' => false, 'msg' => 'No Row ID for retrive data');
	if (!empty($empId)){
	    $res = $this->jservice->get(array('Action' => 'GetRowData','FieldList'=>'B2G(fieldsrcdefid) as fieldsrcdefid, B2G(fieldsrcdefid) as id,B2G(parentstructrowid) as parentid, FIELDSRCDEF_BRIEF_F(fieldsrcdefid , NULL) as  brief,connectionstring,descriptionstring,sortfield,provider,filterstring,datasource,dontshowdialog, case dontshowdialog  when 0 then \'Нет\' when 1 then \'Да\'End  as dontshowdialog_grid,briefstring,idfield', 'PartName' => 'fieldsrcdef', 'ID' =>  $empId 	));
	    if (!empty($res)) {
	        $result = $res[0];
	    }
	}
	return $result;
    }
    function setRow($data)  {
	    $data = (array)$data;
	if (!empty($data)) {
	    if (empty($data['fieldsrcdefid'])) {
	        $data['fieldsrcdefid'] = $this->jservice->get(array('Action' => 'NewGuid'));
	        $res=$this->jservice->get(array('Action' => 'NewRow', 'PartName' => 'fieldsrcdef', 'RowID' => $data['fieldsrcdefid'], 'DocumentID' => $data['instanceid'],'ParentID' => $data['parentid'], 'Values'=>$data));
	       if(isset($res[0])){
	       	if($res[0]->result!='ok'){
	       		return array('success' => FALSE, 'msg' => $res[0]->result);
	       	} 
	       }else{
	       	return array('success' => FALSE, 'msg' => 'Unknown error' );
	       }
	    }else{
	    $res = $this->jservice->get(array('Action' => 'UpdateRow', 'PartName' => 'fieldsrcdef', 'RowID' => $data['fieldsrcdefid'], 'DocumentID' => $data['instanceid'],'ParentID' => $data['parentid'], 'Values'=>$data));
	       if(isset($res[0])){
	       	if($res[0]->result!='ok'){
	       		return array('success' => FALSE, 'msg' => $res[0]->result);
	       	} 
	       }else{
	       	return array('success' => FALSE, 'msg' => 'Unknown error' );
	       }
	    }
	    return array('success' => TRUE, 'data' => $this->getRow($data['fieldsrcdefid'] ));
	} else {
	    return array('success' => FALSE, 'msg' => 'No data to store on server');
	}
    }
    function newRow($instanceid,$parentid,$data)  {
	  $id = $this->jservice->get(array('Action' => 'NewGuid'));
	if ($this->jservice->get(array('Action' => 'NewRow', 'PartName' => 'fieldsrcdef', 'RowID' => $id, 'DocumentID' => $instanceid,'ParentID'=>$parentid, 'Values'=>$data)) == 'OK') {
	    return array('success' => TRUE, 'data' => $id);
	} else {
	    return array('success' => FALSE, 'msg' => 'Error while create new id');
	}
    }
    function getRows($sort=array())
		{
	    $res = $this->jservice->get(array('Action' => 'GetViewData','Sort'=>$sort,'FieldList'=>'B2G(fieldsrcdefid) as fieldsrcdefid, B2G(fieldsrcdefid) as id,B2G(parentstructrowid) as parentid, FIELDSRCDEF_BRIEF_F(fieldsrcdefid , NULL) as  brief,connectionstring,descriptionstring,sortfield,provider,filterstring,datasource,dontshowdialog, case dontshowdialog  when 0 then \'Нет\' when 1 then \'Да\'End  as dontshowdialog_grid,briefstring,idfield', 'ViewName' => 'fieldsrcdef'));
	    if (count($res)) {
	        return $res;
	    } else {
	        return null;
	    }
		}
    function getRowsByInstance($id,$sort=array())
		{
	$res = $this->jservice->get(array('Action' => 'GetViewData','Sort'=>$sort,'FieldList'=>'B2G(fieldsrcdefid) as fieldsrcdefid, B2G(fieldsrcdefid) as id,B2G(parentstructrowid) as parentid, FIELDSRCDEF_BRIEF_F(fieldsrcdefid , NULL) as  brief,connectionstring,descriptionstring,sortfield,provider,filterstring,datasource,dontshowdialog, case dontshowdialog  when 0 then \'Нет\' when 1 then \'Да\'End  as dontshowdialog_grid,briefstring,idfield', 'ViewName' => 'fieldsrcdef', 'WhereClause' => 'instanceid=G2B(\''. $id . '\')'));
	if (count($res) == 0) {
	    return null;
	} else {
	    return $res;
	}
		}
    function getRowsByParent($id,$sort=array())
	{
	$res = $this->jservice->get(array('Action' => 'GetViewData','Sort'=>$sort,'FieldList'=>'B2G(fieldsrcdefid) as fieldsrcdefid, B2G(fieldsrcdefid) as id,B2G(parentstructrowid) as parentid, FIELDSRCDEF_BRIEF_F(fieldsrcdefid , NULL) as  brief,connectionstring,descriptionstring,sortfield,provider,filterstring,datasource,dontshowdialog, case dontshowdialog  when 0 then \'Нет\' when 1 then \'Да\'End  as dontshowdialog_grid,briefstring,idfield', 'ViewName' => 'fieldsrcdef', 'WhereClause' => ' parentstructrowid=G2B(\''. $id . '\')'));
	if (count($res) == 0) {
	    return null;
	} else {
	    return $res;
	}
  }
    function deleteRow($id = null) {
	  if (!empty($id) && $this->jservice->get(array('Action' => 'DeleteRow', 'PartName' => 'fieldsrcdef', 'RowID' => $id)) == 'OK')
	    $result = array('success' => TRUE);
	else
	    $result = array('success' => FALSE, 'msg' => 'Error while deleting record!');
	return $result;
    }
}
?>
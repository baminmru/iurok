
<?php
class  M_fieldtype extends CI_Model {
    function getRow($empId) {
    $result = array('success' => false, 'msg' => 'No Row ID for retrive data');
	if (!empty($empId)){
	    $res = $this->jservice->get(array('Action' => 'GetRowData','FieldList'=>'B2G(fieldtypeid) as fieldtypeid, B2G(fieldtypeid) as id,B2G(instanceid) as instanceid, FIELDTYPE_BRIEF_F(fieldtypeid , NULL) as  brief,delayedsave, case delayedsave  when -1 then \'Да\' when 0 then \'Нет\'End  as delayedsave_grid,typestyle, case typestyle  when 0 then \'Скалярный тип\' when 1 then \'Выражение\' when 2 then \'Перечисление\' when 3 then \'Интервал\' when 4 then \'Ссылка\' when 5 then \'Элемент оформления\'End  as typestyle_grid,name,gridsorttype, case gridsorttype  when 0 then \'As String\' when 1 then \'As Numeric\' when 2 then \'As Date\'End  as gridsorttype_grid,the_comment,allowsize, case allowsize  when -1 then \'Да\' when 0 then \'Нет\'End  as allowsize_grid,allowlikesearch, case allowlikesearch  when -1 then \'Да\' when 0 then \'Нет\'End  as allowlikesearch_grid,maximum,minimum', 'PartName' => 'fieldtype', 'ID' =>  $empId 	));
	    if (!empty($res)) {
	        $result = $res[0];
	    }
	}
	return $result;
    }
    function setRow($data)  {
	    $data = (array)$data;
	if (!empty($data)) {
	    if (empty($data['fieldtypeid'])) {
	        $data['fieldtypeid'] = $this->jservice->get(array('Action' => 'NewGuid'));
	        $res=$this->jservice->get(array('Action' => 'NewRow', 'PartName' => 'fieldtype', 'RowID' => $data['fieldtypeid'], 'DocumentID' => $data['instanceid'], 'Values'=>$data));
	       if(isset($res[0])){
	       	if($res[0]->result!='ok'){
	       		return array('success' => FALSE, 'msg' => $res[0]->result);
	       	} 
	       }else{
	       	return array('success' => FALSE, 'msg' => 'Unknown error' );
	       }
	    }else{
	    $res = $this->jservice->get(array('Action' => 'UpdateRow', 'PartName' => 'fieldtype', 'RowID' => $data['fieldtypeid'], 'DocumentID' => $data['instanceid'], 'Values'=>$data));
	       if(isset($res[0])){
	       	if($res[0]->result!='ok'){
	       		return array('success' => FALSE, 'msg' => $res[0]->result);
	       	} 
	       }else{
	       	return array('success' => FALSE, 'msg' => 'Unknown error' );
	       }
	    }
	    return array('success' => TRUE, 'data' => $this->getRow($data['fieldtypeid'] ));
	} else {
	    return array('success' => FALSE, 'msg' => 'No data to store on server');
	}
    }
    function newRow($instanceid,$data)  {
	  $id = $this->jservice->get(array('Action' => 'NewGuid'));
	if ($this->jservice->get(array('Action' => 'NewRow', 'PartName' => 'fieldtype', 'RowID' => $id, 'DocumentID' => $instanceid, 'Values'=>$data)) == 'OK') {
	    return array('success' => TRUE, 'data' => $id);
	} else {
	    return array('success' => FALSE, 'msg' => 'Error while create new id');
	}
    }
    function getRows($sort=array())
		{
	    $res = $this->jservice->get(array('Action' => 'GetViewData','Sort'=>$sort,'FieldList'=>'B2G(fieldtypeid) as fieldtypeid, B2G(fieldtypeid) as id,B2G(instanceid) as instanceid, FIELDTYPE_BRIEF_F(fieldtypeid , NULL) as  brief,delayedsave, case delayedsave  when -1 then \'Да\' when 0 then \'Нет\'End  as delayedsave_grid,typestyle, case typestyle  when 0 then \'Скалярный тип\' when 1 then \'Выражение\' when 2 then \'Перечисление\' when 3 then \'Интервал\' when 4 then \'Ссылка\' when 5 then \'Элемент оформления\'End  as typestyle_grid,name,gridsorttype, case gridsorttype  when 0 then \'As String\' when 1 then \'As Numeric\' when 2 then \'As Date\'End  as gridsorttype_grid,the_comment,allowsize, case allowsize  when -1 then \'Да\' when 0 then \'Нет\'End  as allowsize_grid,allowlikesearch, case allowlikesearch  when -1 then \'Да\' when 0 then \'Нет\'End  as allowlikesearch_grid,maximum,minimum', 'ViewName' => 'fieldtype'));
	    if (count($res)) {
	        return $res;
	    } else {
	        return null;
	    }
		}
    function getRowsByInstance($id,$sort=array())
		{
	$res = $this->jservice->get(array('Action' => 'GetViewData','Sort'=>$sort,'FieldList'=>'B2G(fieldtypeid) as fieldtypeid, B2G(fieldtypeid) as id,B2G(instanceid) as instanceid, FIELDTYPE_BRIEF_F(fieldtypeid , NULL) as  brief,delayedsave, case delayedsave  when -1 then \'Да\' when 0 then \'Нет\'End  as delayedsave_grid,typestyle, case typestyle  when 0 then \'Скалярный тип\' when 1 then \'Выражение\' when 2 then \'Перечисление\' when 3 then \'Интервал\' when 4 then \'Ссылка\' when 5 then \'Элемент оформления\'End  as typestyle_grid,name,gridsorttype, case gridsorttype  when 0 then \'As String\' when 1 then \'As Numeric\' when 2 then \'As Date\'End  as gridsorttype_grid,the_comment,allowsize, case allowsize  when -1 then \'Да\' when 0 then \'Нет\'End  as allowsize_grid,allowlikesearch, case allowlikesearch  when -1 then \'Да\' when 0 then \'Нет\'End  as allowlikesearch_grid,maximum,minimum', 'ViewName' => 'fieldtype', 'WhereClause' => 'instanceid=G2B(\''. $id . '\')'));
	if (count($res) == 0) {
	    return null;
	} else {
	    return $res;
	}
		}
    function getRowsByParent($id,$sort=array())
	{
	$res = $this->jservice->get(array('Action' => 'GetViewData','Sort'=>$sort,'FieldList'=>'B2G(fieldtypeid) as fieldtypeid, B2G(fieldtypeid) as id,B2G(instanceid) as instanceid, FIELDTYPE_BRIEF_F(fieldtypeid , NULL) as  brief,delayedsave, case delayedsave  when -1 then \'Да\' when 0 then \'Нет\'End  as delayedsave_grid,typestyle, case typestyle  when 0 then \'Скалярный тип\' when 1 then \'Выражение\' when 2 then \'Перечисление\' when 3 then \'Интервал\' when 4 then \'Ссылка\' when 5 then \'Элемент оформления\'End  as typestyle_grid,name,gridsorttype, case gridsorttype  when 0 then \'As String\' when 1 then \'As Numeric\' when 2 then \'As Date\'End  as gridsorttype_grid,the_comment,allowsize, case allowsize  when -1 then \'Да\' when 0 then \'Нет\'End  as allowsize_grid,allowlikesearch, case allowlikesearch  when -1 then \'Да\' when 0 then \'Нет\'End  as allowlikesearch_grid,maximum,minimum', 'ViewName' => 'fieldtype', 'WhereClause' => ' parentstructrowid=G2B(\''. $id . '\')'));
	if (count($res) == 0) {
	    return null;
	} else {
	    return $res;
	}
  }
    function deleteRow($id = null) {
	  if (!empty($id) && $this->jservice->get(array('Action' => 'DeleteRow', 'PartName' => 'fieldtype', 'RowID' => $id)) == 'OK')
	    $result = array('success' => TRUE);
	else
	    $result = array('success' => FALSE, 'msg' => 'Error while deleting record!');
	return $result;
    }
}
?>
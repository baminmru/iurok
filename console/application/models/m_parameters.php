
<?php
class  M_parameters extends CI_Model {
    function getRow($empId) {
    $result = array('success' => false, 'msg' => 'No Row ID for retrive data');
	if (!empty($empId)){
	    $res = $this->jservice->get(array('Action' => 'GetRowData','FieldList'=>'B2G(parametersid) as parametersid, B2G(parametersid) as id,B2G(parentstructrowid) as parentid, PARAMETERS_BRIEF_F(parametersid , NULL) as  brief,caption,B2G(RefToPart) reftopart, PART_BRIEF_F(reftopart, NULL) as reftopart_grid,outparam, case outparam  when -1 then \'Да\' when 0 then \'Нет\'End  as outparam_grid,datasize,name,B2G(TypeOfParm) typeofparm, FIELDTYPE_BRIEF_F(typeofparm, NULL) as typeofparm_grid,sequence,referencetype, case referencetype  when 0 then \'Скалярное поле ( не ссылка)\' when 1 then \'На объект \' when 2 then \'На строку раздела\' when 3 then \'На источник данных\'End  as referencetype_grid,allownull, case allownull  when -1 then \'Да\' when 0 then \'Нет\'End  as allownull_grid,B2G(RefToType) reftotype, OBJECTTYPE_BRIEF_F(reftotype, NULL) as reftotype_grid', 'PartName' => 'parameters', 'ID' =>  $empId 	));
	    if (!empty($res)) {
	        $result = $res[0];
	    }
	}
	return $result;
    }
    function setRow($data)  {
	    $data = (array)$data;
	if (!empty($data)) {
	    if (empty($data['parametersid'])) {
	        $data['parametersid'] = $this->jservice->get(array('Action' => 'NewGuid'));
	        $res=$this->jservice->get(array('Action' => 'NewRow', 'PartName' => 'parameters', 'RowID' => $data['parametersid'], 'DocumentID' => $data['instanceid'],'ParentID' => $data['parentid'], 'Values'=>$data));
	       if(isset($res[0])){
	       	if($res[0]->result!='ok'){
	       		return array('success' => FALSE, 'msg' => $res[0]->result);
	       	} 
	       }else{
	       	return array('success' => FALSE, 'msg' => 'Unknown error' );
	       }
	    }else{
	    $res = $this->jservice->get(array('Action' => 'UpdateRow', 'PartName' => 'parameters', 'RowID' => $data['parametersid'], 'DocumentID' => $data['instanceid'],'ParentID' => $data['parentid'], 'Values'=>$data));
	       if(isset($res[0])){
	       	if($res[0]->result!='ok'){
	       		return array('success' => FALSE, 'msg' => $res[0]->result);
	       	} 
	       }else{
	       	return array('success' => FALSE, 'msg' => 'Unknown error' );
	       }
	    }
	    return array('success' => TRUE, 'data' => $this->getRow($data['parametersid'] ));
	} else {
	    return array('success' => FALSE, 'msg' => 'No data to store on server');
	}
    }
    function newRow($instanceid,$parentid,$data)  {
	  $id = $this->jservice->get(array('Action' => 'NewGuid'));
	if ($this->jservice->get(array('Action' => 'NewRow', 'PartName' => 'parameters', 'RowID' => $id, 'DocumentID' => $instanceid,'ParentID'=>$parentid, 'Values'=>$data)) == 'OK') {
	    return array('success' => TRUE, 'data' => $id);
	} else {
	    return array('success' => FALSE, 'msg' => 'Error while create new id');
	}
    }
    function getRows($sort=array())
		{
	    $res = $this->jservice->get(array('Action' => 'GetViewData','Sort'=>$sort,'FieldList'=>'B2G(parametersid) as parametersid, B2G(parametersid) as id,B2G(parentstructrowid) as parentid, PARAMETERS_BRIEF_F(parametersid , NULL) as  brief,caption,B2G(RefToPart) reftopart, PART_BRIEF_F(reftopart, NULL) as reftopart_grid,outparam, case outparam  when -1 then \'Да\' when 0 then \'Нет\'End  as outparam_grid,datasize,name,B2G(TypeOfParm) typeofparm, FIELDTYPE_BRIEF_F(typeofparm, NULL) as typeofparm_grid,sequence,referencetype, case referencetype  when 0 then \'Скалярное поле ( не ссылка)\' when 1 then \'На объект \' when 2 then \'На строку раздела\' when 3 then \'На источник данных\'End  as referencetype_grid,allownull, case allownull  when -1 then \'Да\' when 0 then \'Нет\'End  as allownull_grid,B2G(RefToType) reftotype, OBJECTTYPE_BRIEF_F(reftotype, NULL) as reftotype_grid', 'ViewName' => 'parameters'));
	    if (count($res)) {
	        return $res;
	    } else {
	        return null;
	    }
		}
    function getRowsByInstance($id,$sort=array())
		{
	$res = $this->jservice->get(array('Action' => 'GetViewData','Sort'=>$sort,'FieldList'=>'B2G(parametersid) as parametersid, B2G(parametersid) as id,B2G(parentstructrowid) as parentid, PARAMETERS_BRIEF_F(parametersid , NULL) as  brief,caption,B2G(RefToPart) reftopart, PART_BRIEF_F(reftopart, NULL) as reftopart_grid,outparam, case outparam  when -1 then \'Да\' when 0 then \'Нет\'End  as outparam_grid,datasize,name,B2G(TypeOfParm) typeofparm, FIELDTYPE_BRIEF_F(typeofparm, NULL) as typeofparm_grid,sequence,referencetype, case referencetype  when 0 then \'Скалярное поле ( не ссылка)\' when 1 then \'На объект \' when 2 then \'На строку раздела\' when 3 then \'На источник данных\'End  as referencetype_grid,allownull, case allownull  when -1 then \'Да\' when 0 then \'Нет\'End  as allownull_grid,B2G(RefToType) reftotype, OBJECTTYPE_BRIEF_F(reftotype, NULL) as reftotype_grid', 'ViewName' => 'parameters', 'WhereClause' => 'instanceid=G2B(\''. $id . '\')'));
	if (count($res) == 0) {
	    return null;
	} else {
	    return $res;
	}
		}
    function getRowsByParent($id,$sort=array())
	{
	$res = $this->jservice->get(array('Action' => 'GetViewData','Sort'=>$sort,'FieldList'=>'B2G(parametersid) as parametersid, B2G(parametersid) as id,B2G(parentstructrowid) as parentid, PARAMETERS_BRIEF_F(parametersid , NULL) as  brief,caption,B2G(RefToPart) reftopart, PART_BRIEF_F(reftopart, NULL) as reftopart_grid,outparam, case outparam  when -1 then \'Да\' when 0 then \'Нет\'End  as outparam_grid,datasize,name,B2G(TypeOfParm) typeofparm, FIELDTYPE_BRIEF_F(typeofparm, NULL) as typeofparm_grid,sequence,referencetype, case referencetype  when 0 then \'Скалярное поле ( не ссылка)\' when 1 then \'На объект \' when 2 then \'На строку раздела\' when 3 then \'На источник данных\'End  as referencetype_grid,allownull, case allownull  when -1 then \'Да\' when 0 then \'Нет\'End  as allownull_grid,B2G(RefToType) reftotype, OBJECTTYPE_BRIEF_F(reftotype, NULL) as reftotype_grid', 'ViewName' => 'parameters', 'WhereClause' => ' parentstructrowid=G2B(\''. $id . '\')'));
	if (count($res) == 0) {
	    return null;
	} else {
	    return $res;
	}
  }
    function deleteRow($id = null) {
	  if (!empty($id) && $this->jservice->get(array('Action' => 'DeleteRow', 'PartName' => 'parameters', 'RowID' => $id)) == 'OK')
	    $result = array('success' => TRUE);
	else
	    $result = array('success' => FALSE, 'msg' => 'Error while deleting record!');
	return $result;
    }
}
?>

<?php
class  M_field extends CI_Model {
    function getRow($empId) {
    $result = array('success' => false, 'msg' => 'No Row ID for retrive data');
	if (!empty($empId)){
	    $res = $this->jservice->get(array('Action' => 'GetRowData','FieldList'=>'B2G(fieldid) as fieldid, B2G(fieldid) as id,B2G(parentstructrowid) as parentid, FIELD_BRIEF_F(fieldid , NULL) as  brief,name,allownull, case allownull  when -1 then \'Да\' when 0 then \'Нет\'End  as allownull_grid,themask,B2G(RefToPart) reftopart, PART_BRIEF_F(reftopart, NULL) as reftopart_grid,tabname,B2G(TheNumerator) thenumerator,INSTANCE_BRIEF_F(thenumerator, NULL) as  thenumerator_grid,shablonbrief,datasize,caption,fieldgroupbox,thestyle,zonetemplate,thecomment,B2G(RefToType) reftotype, OBJECTTYPE_BRIEF_F(reftotype, NULL) as reftotype_grid,isbrief, case isbrief  when -1 then \'Да\' when 0 then \'Нет\'End  as isbrief_grid,B2G(FieldType) fieldtype, FIELDTYPE_BRIEF_F(fieldtype, NULL) as fieldtype_grid,isautonumber, case isautonumber  when -1 then \'Да\' when 0 then \'Нет\'End  as isautonumber_grid,referencetype, case referencetype  when 0 then \'Скалярное поле ( не ссылка)\' when 1 then \'На объект \' when 2 then \'На строку раздела\' when 3 then \'На источник данных\'End  as referencetype_grid,sequence,internalreference, case internalreference  when -1 then \'Да\' when 0 then \'Нет\'End  as internalreference_grid,createrefonly, case createrefonly  when -1 then \'Да\' when 0 then \'Нет\'End  as createrefonly_grid,istabbrief, case istabbrief  when -1 then \'Да\' when 0 then \'Нет\'End  as istabbrief_grid,thenameclass,B2G(NumberDateField) numberdatefield, FIELD_BRIEF_F(numberdatefield, NULL) as numberdatefield_grid', 'PartName' => 'field', 'ID' =>  $empId 	));
	    if (!empty($res)) {
	        $result = $res[0];
	    }
	}
	return $result;
    }
    function setRow($data)  {
	    $data = (array)$data;
	if (!empty($data)) {
	    if (empty($data['fieldid'])) {
	        $data['fieldid'] = $this->jservice->get(array('Action' => 'NewGuid'));
	        $res=$this->jservice->get(array('Action' => 'NewRow', 'PartName' => 'field', 'RowID' => $data['fieldid'], 'DocumentID' => $data['instanceid'],'ParentID' => $data['parentid'], 'Values'=>$data));
	       if(isset($res[0])){
	       	if($res[0]->result!='ok'){
	       		return array('success' => FALSE, 'msg' => $res[0]->result);
	       	} 
	       }else{
	       	return array('success' => FALSE, 'msg' => 'Unknown error' );
	       }
	    }else{
	    $res = $this->jservice->get(array('Action' => 'UpdateRow', 'PartName' => 'field', 'RowID' => $data['fieldid'], 'DocumentID' => $data['instanceid'],'ParentID' => $data['parentid'], 'Values'=>$data));
	       if(isset($res[0])){
	       	if($res[0]->result!='ok'){
	       		return array('success' => FALSE, 'msg' => $res[0]->result);
	       	} 
	       }else{
	       	return array('success' => FALSE, 'msg' => 'Unknown error' );
	       }
	    }
	    return array('success' => TRUE, 'data' => $this->getRow($data['fieldid'] ));
	} else {
	    return array('success' => FALSE, 'msg' => 'No data to store on server');
	}
    }
    function newRow($instanceid,$parentid,$data)  {
	  $id = $this->jservice->get(array('Action' => 'NewGuid'));
	if ($this->jservice->get(array('Action' => 'NewRow', 'PartName' => 'field', 'RowID' => $id, 'DocumentID' => $instanceid,'ParentID'=>$parentid, 'Values'=>$data)) == 'OK') {
	    return array('success' => TRUE, 'data' => $id);
	} else {
	    return array('success' => FALSE, 'msg' => 'Error while create new id');
	}
    }
    function getRows($sort=array())
		{
	    $res = $this->jservice->get(array('Action' => 'GetViewData','Sort'=>$sort,'FieldList'=>'B2G(fieldid) as fieldid, B2G(fieldid) as id,B2G(parentstructrowid) as parentid, FIELD_BRIEF_F(fieldid , NULL) as  brief,name,allownull, case allownull  when -1 then \'Да\' when 0 then \'Нет\'End  as allownull_grid,themask,B2G(RefToPart) reftopart, PART_BRIEF_F(reftopart, NULL) as reftopart_grid,tabname,B2G(TheNumerator) thenumerator,INSTANCE_BRIEF_F(thenumerator, NULL) as  thenumerator_grid,shablonbrief,datasize,caption,fieldgroupbox,thestyle,zonetemplate,thecomment,B2G(RefToType) reftotype, OBJECTTYPE_BRIEF_F(reftotype, NULL) as reftotype_grid,isbrief, case isbrief  when -1 then \'Да\' when 0 then \'Нет\'End  as isbrief_grid,B2G(FieldType) fieldtype, FIELDTYPE_BRIEF_F(fieldtype, NULL) as fieldtype_grid,isautonumber, case isautonumber  when -1 then \'Да\' when 0 then \'Нет\'End  as isautonumber_grid,referencetype, case referencetype  when 0 then \'Скалярное поле ( не ссылка)\' when 1 then \'На объект \' when 2 then \'На строку раздела\' when 3 then \'На источник данных\'End  as referencetype_grid,sequence,internalreference, case internalreference  when -1 then \'Да\' when 0 then \'Нет\'End  as internalreference_grid,createrefonly, case createrefonly  when -1 then \'Да\' when 0 then \'Нет\'End  as createrefonly_grid,istabbrief, case istabbrief  when -1 then \'Да\' when 0 then \'Нет\'End  as istabbrief_grid,thenameclass,B2G(NumberDateField) numberdatefield, FIELD_BRIEF_F(numberdatefield, NULL) as numberdatefield_grid', 'ViewName' => 'field'));
	    if (count($res)) {
	        return $res;
	    } else {
	        return null;
	    }
		}
    function getRowsByInstance($id,$sort=array())
		{
	$res = $this->jservice->get(array('Action' => 'GetViewData','Sort'=>$sort,'FieldList'=>'B2G(fieldid) as fieldid, B2G(fieldid) as id,B2G(parentstructrowid) as parentid, FIELD_BRIEF_F(fieldid , NULL) as  brief,name,allownull, case allownull  when -1 then \'Да\' when 0 then \'Нет\'End  as allownull_grid,themask,B2G(RefToPart) reftopart, PART_BRIEF_F(reftopart, NULL) as reftopart_grid,tabname,B2G(TheNumerator) thenumerator,INSTANCE_BRIEF_F(thenumerator, NULL) as  thenumerator_grid,shablonbrief,datasize,caption,fieldgroupbox,thestyle,zonetemplate,thecomment,B2G(RefToType) reftotype, OBJECTTYPE_BRIEF_F(reftotype, NULL) as reftotype_grid,isbrief, case isbrief  when -1 then \'Да\' when 0 then \'Нет\'End  as isbrief_grid,B2G(FieldType) fieldtype, FIELDTYPE_BRIEF_F(fieldtype, NULL) as fieldtype_grid,isautonumber, case isautonumber  when -1 then \'Да\' when 0 then \'Нет\'End  as isautonumber_grid,referencetype, case referencetype  when 0 then \'Скалярное поле ( не ссылка)\' when 1 then \'На объект \' when 2 then \'На строку раздела\' when 3 then \'На источник данных\'End  as referencetype_grid,sequence,internalreference, case internalreference  when -1 then \'Да\' when 0 then \'Нет\'End  as internalreference_grid,createrefonly, case createrefonly  when -1 then \'Да\' when 0 then \'Нет\'End  as createrefonly_grid,istabbrief, case istabbrief  when -1 then \'Да\' when 0 then \'Нет\'End  as istabbrief_grid,thenameclass,B2G(NumberDateField) numberdatefield, FIELD_BRIEF_F(numberdatefield, NULL) as numberdatefield_grid', 'ViewName' => 'field', 'WhereClause' => 'instanceid=G2B(\''. $id . '\')'));
	if (count($res) == 0) {
	    return null;
	} else {
	    return $res;
	}
		}
    function getRowsByParent($id,$sort=array())
	{
	$res = $this->jservice->get(array('Action' => 'GetViewData','Sort'=>$sort,'FieldList'=>'B2G(fieldid) as fieldid, B2G(fieldid) as id,B2G(parentstructrowid) as parentid, FIELD_BRIEF_F(fieldid , NULL) as  brief,name,allownull, case allownull  when -1 then \'Да\' when 0 then \'Нет\'End  as allownull_grid,themask,B2G(RefToPart) reftopart, PART_BRIEF_F(reftopart, NULL) as reftopart_grid,tabname,B2G(TheNumerator) thenumerator,INSTANCE_BRIEF_F(thenumerator, NULL) as  thenumerator_grid,shablonbrief,datasize,caption,fieldgroupbox,thestyle,zonetemplate,thecomment,B2G(RefToType) reftotype, OBJECTTYPE_BRIEF_F(reftotype, NULL) as reftotype_grid,isbrief, case isbrief  when -1 then \'Да\' when 0 then \'Нет\'End  as isbrief_grid,B2G(FieldType) fieldtype, FIELDTYPE_BRIEF_F(fieldtype, NULL) as fieldtype_grid,isautonumber, case isautonumber  when -1 then \'Да\' when 0 then \'Нет\'End  as isautonumber_grid,referencetype, case referencetype  when 0 then \'Скалярное поле ( не ссылка)\' when 1 then \'На объект \' when 2 then \'На строку раздела\' when 3 then \'На источник данных\'End  as referencetype_grid,sequence,internalreference, case internalreference  when -1 then \'Да\' when 0 then \'Нет\'End  as internalreference_grid,createrefonly, case createrefonly  when -1 then \'Да\' when 0 then \'Нет\'End  as createrefonly_grid,istabbrief, case istabbrief  when -1 then \'Да\' when 0 then \'Нет\'End  as istabbrief_grid,thenameclass,B2G(NumberDateField) numberdatefield, FIELD_BRIEF_F(numberdatefield, NULL) as numberdatefield_grid', 'ViewName' => 'field', 'WhereClause' => ' parentstructrowid=G2B(\''. $id . '\')'));
	if (count($res) == 0) {
	    return null;
	} else {
	    return $res;
	}
  }
    function deleteRow($id = null) {
	  if (!empty($id) && $this->jservice->get(array('Action' => 'DeleteRow', 'PartName' => 'field', 'RowID' => $id)) == 'OK')
	    $result = array('success' => TRUE);
	else
	    $result = array('success' => FALSE, 'msg' => 'Error while deleting record!');
	return $result;
    }
}
?>
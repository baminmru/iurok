
<?php
class  M_generator_target extends CI_Model {
    function getRow($empId) {
    $result = array('success' => false, 'msg' => 'No Row ID for retrive data');
	if (!empty($empId)){
	    $res = $this->jservice->get(array('Action' => 'GetRowData','FieldList'=>'B2G(generator_targetid) as generator_targetid, B2G(generator_targetid) as id,B2G(parentstructrowid) as parentid, GENERATOR_TARGET_BRIEF_F(generator_targetid , NULL) as  brief,name,generatorstyle, case generatorstyle  when 0 then \'Один тип\' when 1 then \'Все типы сразу\'End  as generatorstyle_grid,queuename,thedevelopmentenv, case thedevelopmentenv  when 0 then \'VB6\' when 1 then \'DOTNET\' when 2 then \'JAVA\' when 3 then \'OTHER\'End  as thedevelopmentenv_grid,generatorprogid,targettype, case targettype  when 0 then \'СУБД\' when 1 then \'МОДЕЛЬ\' when 2 then \'Приложение\' when 3 then \'Документация\' when 4 then \'АРМ\'End  as targettype_grid', 'PartName' => 'generator_target', 'ID' =>  $empId 	));
	    if (!empty($res)) {
	        $result = $res[0];
	    }
	}
	return $result;
    }
    function setRow($data)  {
	    $data = (array)$data;
	if (!empty($data)) {
	    if (empty($data['generator_targetid'])) {
	        $data['generator_targetid'] = $this->jservice->get(array('Action' => 'NewGuid'));
	        $res=$this->jservice->get(array('Action' => 'NewRow', 'PartName' => 'generator_target', 'RowID' => $data['generator_targetid'], 'DocumentID' => $data['instanceid'],'ParentID' => $data['parentid'], 'Values'=>$data));
	       if(isset($res[0])){
	       	if($res[0]->result!='ok'){
	       		return array('success' => FALSE, 'msg' => $res[0]->result);
	       	} 
	       }else{
	       	return array('success' => FALSE, 'msg' => 'Unknown error' );
	       }
	    }else{
	    $res = $this->jservice->get(array('Action' => 'UpdateRow', 'PartName' => 'generator_target', 'RowID' => $data['generator_targetid'], 'DocumentID' => $data['instanceid'],'ParentID' => $data['parentid'], 'Values'=>$data));
	       if(isset($res[0])){
	       	if($res[0]->result!='ok'){
	       		return array('success' => FALSE, 'msg' => $res[0]->result);
	       	} 
	       }else{
	       	return array('success' => FALSE, 'msg' => 'Unknown error' );
	       }
	    }
	    return array('success' => TRUE, 'data' => $this->getRow($data['generator_targetid'] ));
	} else {
	    return array('success' => FALSE, 'msg' => 'No data to store on server');
	}
    }
    function newRow($instanceid,$parentid,$data)  {
	  $id = $this->jservice->get(array('Action' => 'NewGuid'));
	if ($this->jservice->get(array('Action' => 'NewRow', 'PartName' => 'generator_target', 'RowID' => $id, 'DocumentID' => $instanceid,'ParentID'=>$parentid, 'Values'=>$data)) == 'OK') {
	    return array('success' => TRUE, 'data' => $id);
	} else {
	    return array('success' => FALSE, 'msg' => 'Error while create new id');
	}
    }
    function getRows($sort=array())
		{
	    $res = $this->jservice->get(array('Action' => 'GetViewData','Sort'=>$sort,'FieldList'=>'B2G(generator_targetid) as generator_targetid, B2G(generator_targetid) as id,B2G(parentstructrowid) as parentid, GENERATOR_TARGET_BRIEF_F(generator_targetid , NULL) as  brief,name,generatorstyle, case generatorstyle  when 0 then \'Один тип\' when 1 then \'Все типы сразу\'End  as generatorstyle_grid,queuename,thedevelopmentenv, case thedevelopmentenv  when 0 then \'VB6\' when 1 then \'DOTNET\' when 2 then \'JAVA\' when 3 then \'OTHER\'End  as thedevelopmentenv_grid,generatorprogid,targettype, case targettype  when 0 then \'СУБД\' when 1 then \'МОДЕЛЬ\' when 2 then \'Приложение\' when 3 then \'Документация\' when 4 then \'АРМ\'End  as targettype_grid', 'ViewName' => 'generator_target'));
	    if (count($res)) {
	        return $res;
	    } else {
	        return null;
	    }
		}
    function getRowsByInstance($id,$sort=array())
		{
	$res = $this->jservice->get(array('Action' => 'GetViewData','Sort'=>$sort,'FieldList'=>'B2G(generator_targetid) as generator_targetid, B2G(generator_targetid) as id,B2G(parentstructrowid) as parentid, GENERATOR_TARGET_BRIEF_F(generator_targetid , NULL) as  brief,name,generatorstyle, case generatorstyle  when 0 then \'Один тип\' when 1 then \'Все типы сразу\'End  as generatorstyle_grid,queuename,thedevelopmentenv, case thedevelopmentenv  when 0 then \'VB6\' when 1 then \'DOTNET\' when 2 then \'JAVA\' when 3 then \'OTHER\'End  as thedevelopmentenv_grid,generatorprogid,targettype, case targettype  when 0 then \'СУБД\' when 1 then \'МОДЕЛЬ\' when 2 then \'Приложение\' when 3 then \'Документация\' when 4 then \'АРМ\'End  as targettype_grid', 'ViewName' => 'generator_target', 'WhereClause' => 'instanceid=G2B(\''. $id . '\')'));
	if (count($res) == 0) {
	    return null;
	} else {
	    return $res;
	}
		}
    function getRowsByParent($id,$sort=array())
	{
	$res = $this->jservice->get(array('Action' => 'GetViewData','Sort'=>$sort,'FieldList'=>'B2G(generator_targetid) as generator_targetid, B2G(generator_targetid) as id,B2G(parentstructrowid) as parentid, GENERATOR_TARGET_BRIEF_F(generator_targetid , NULL) as  brief,name,generatorstyle, case generatorstyle  when 0 then \'Один тип\' when 1 then \'Все типы сразу\'End  as generatorstyle_grid,queuename,thedevelopmentenv, case thedevelopmentenv  when 0 then \'VB6\' when 1 then \'DOTNET\' when 2 then \'JAVA\' when 3 then \'OTHER\'End  as thedevelopmentenv_grid,generatorprogid,targettype, case targettype  when 0 then \'СУБД\' when 1 then \'МОДЕЛЬ\' when 2 then \'Приложение\' when 3 then \'Документация\' when 4 then \'АРМ\'End  as targettype_grid', 'ViewName' => 'generator_target', 'WhereClause' => ' parentstructrowid=G2B(\''. $id . '\')'));
	if (count($res) == 0) {
	    return null;
	} else {
	    return $res;
	}
  }
    function deleteRow($id = null) {
	  if (!empty($id) && $this->jservice->get(array('Action' => 'DeleteRow', 'PartName' => 'generator_target', 'RowID' => $id)) == 'OK')
	    $result = array('success' => TRUE);
	else
	    $result = array('success' => FALSE, 'msg' => 'Error while deleting record!');
	return $result;
    }
}
?>
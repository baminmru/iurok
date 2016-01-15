
<?php
class  M_part extends CI_Model {
    function getRow($empId) {
    $result = array('success' => false, 'msg' => 'No Row ID for retrive data');
	if (!empty($empId)){
	    $res = $this->jservice->get(array('Action' => 'GetRowData','FieldList'=>'B2G(partid) as partid, B2G(partid) as id,B2G(parentstructrowid) as parentid,B2G(parentrowid) as parentrowid, PART_BRIEF_F(partid , NULL) as  brief,particoncls,rulebrief,integerpkey, case integerpkey  when -1 then \'Да\' when 0 then \'Нет\'End  as integerpkey_grid,manualregister, case manualregister  when -1 then \'Да\' when 0 then \'Нет\'End  as manualregister_grid,B2G(OnDelete) ondelete, PARTMENU_BRIEF_F(ondelete, NULL) as ondelete_grid,addbehaivor, case addbehaivor  when 0 then \'AddForm\' when 1 then \'RefreshOnly\' when 2 then \'RunAction\'End  as addbehaivor_grid,name,B2G(OnSave) onsave, PARTMENU_BRIEF_F(onsave, NULL) as onsave_grid,B2G(OnCreate) oncreate, PARTMENU_BRIEF_F(oncreate, NULL) as oncreate_grid,the_comment,usearchiving, case usearchiving  when -1 then \'Да\' when 0 then \'Нет\'End  as usearchiving_grid,B2G(OnRun) onrun, PARTMENU_BRIEF_F(onrun, NULL) as onrun_grid,B2G(ExtenderObject) extenderobject,INSTANCE_BRIEF_F(extenderobject, NULL) as  extenderobject_grid,nolog, case nolog  when -1 then \'Да\' when 0 then \'Нет\'End  as nolog_grid,shablonbrief,parttype, case parttype  when 0 then \'Строка\' when 1 then \'Коллекция\' when 2 then \'Дерево\' when 3 then \'Расширение\' when 4 then \'Расширение с данными\'End  as parttype_grid,sequence,isjormalchange, case isjormalchange  when -1 then \'Да\' when 0 then \'Нет\'End  as isjormalchange_grid,caption', 'PartName' => 'part', 'ID' =>  $empId 	));
	    if (!empty($res)) {
	        $result = $res[0];
	    }
	}
	return $result;
    }
    function setRow($data)  {
	    $data = (array)$data;
	if (!empty($data)) {
	    if (empty($data['partid'])) {
	        $data['partid'] = $this->jservice->get(array('Action' => 'NewGuid'));
	        $res=$this->jservice->get(array('Action' => 'NewRow', 'PartName' => 'part', 'RowID' => $data['partid'], 'DocumentID' => $data['instanceid'],'TreeID'=>$data['treeid'], 'Values'=>$data));
	       if(isset($res[0])){
	       	if($res[0]->result!='ok'){
	       		return array('success' => FALSE, 'msg' => $res[0]->result);
	       	} 
	       }else{
	       	return array('success' => FALSE, 'msg' => 'Unknown error' );
	       }
	    }else{
	    $res = $this->jservice->get(array('Action' => 'UpdateRow', 'PartName' => 'part', 'RowID' => $data['partid'], 'DocumentID' => $data['instanceid'],'TreeID'=>$data['treeid'], 'Values'=>$data));
	       if(isset($res[0])){
	       	if($res[0]->result!='ok'){
	       		return array('success' => FALSE, 'msg' => $res[0]->result);
	       	} 
	       }else{
	       	return array('success' => FALSE, 'msg' => 'Unknown error' );
	       }
	    }
	    return array('success' => TRUE, 'data' => $this->getRow($data['partid'] ));
	} else {
	    return array('success' => FALSE, 'msg' => 'No data to store on server');
	}
    }
    function newRow($instanceid,$treeid,$data)  {
	  $id = $this->jservice->get(array('Action' => 'NewGuid'));
	if ($this->jservice->get(array('Action' => 'NewRow', 'PartName' => 'part', 'RowID' => $id, 'DocumentID' => $instanceid,'TreeID'=>$treeid, 'Values'=>$data)) == 'OK') {
	    return array('success' => TRUE, 'data' => $id);
	} else {
	    return array('success' => FALSE, 'msg' => 'Error while create new id');
	}
    }
    function getRows($sort=array())
		{
	    $res = $this->jservice->get(array('Action' => 'GetViewData','Sort'=>$sort,'FieldList'=>'B2G(partid) as partid, B2G(partid) as id,B2G(parentstructrowid) as parentid,B2G(parentrowid) as parentrowid, PART_BRIEF_F(partid , NULL) as  brief,particoncls,rulebrief,integerpkey, case integerpkey  when -1 then \'Да\' when 0 then \'Нет\'End  as integerpkey_grid,manualregister, case manualregister  when -1 then \'Да\' when 0 then \'Нет\'End  as manualregister_grid,B2G(OnDelete) ondelete, PARTMENU_BRIEF_F(ondelete, NULL) as ondelete_grid,addbehaivor, case addbehaivor  when 0 then \'AddForm\' when 1 then \'RefreshOnly\' when 2 then \'RunAction\'End  as addbehaivor_grid,name,B2G(OnSave) onsave, PARTMENU_BRIEF_F(onsave, NULL) as onsave_grid,B2G(OnCreate) oncreate, PARTMENU_BRIEF_F(oncreate, NULL) as oncreate_grid,the_comment,usearchiving, case usearchiving  when -1 then \'Да\' when 0 then \'Нет\'End  as usearchiving_grid,B2G(OnRun) onrun, PARTMENU_BRIEF_F(onrun, NULL) as onrun_grid,B2G(ExtenderObject) extenderobject,INSTANCE_BRIEF_F(extenderobject, NULL) as  extenderobject_grid,nolog, case nolog  when -1 then \'Да\' when 0 then \'Нет\'End  as nolog_grid,shablonbrief,parttype, case parttype  when 0 then \'Строка\' when 1 then \'Коллекция\' when 2 then \'Дерево\' when 3 then \'Расширение\' when 4 then \'Расширение с данными\'End  as parttype_grid,sequence,isjormalchange, case isjormalchange  when -1 then \'Да\' when 0 then \'Нет\'End  as isjormalchange_grid,caption', 'ViewName' => 'part'));
	    if (count($res)) {
	        return $res;
	    } else {
	        return null;
	    }
		}
    function getRowsByInstance($id,$sort=array())
		{
	$res = $this->jservice->get(array('Action' => 'GetViewData','Sort'=>$sort,'FieldList'=>'B2G(partid) as partid, B2G(partid) as id,B2G(parentstructrowid) as parentid,B2G(parentrowid) as parentrowid, PART_BRIEF_F(partid , NULL) as  brief,particoncls,rulebrief,integerpkey, case integerpkey  when -1 then \'Да\' when 0 then \'Нет\'End  as integerpkey_grid,manualregister, case manualregister  when -1 then \'Да\' when 0 then \'Нет\'End  as manualregister_grid,B2G(OnDelete) ondelete, PARTMENU_BRIEF_F(ondelete, NULL) as ondelete_grid,addbehaivor, case addbehaivor  when 0 then \'AddForm\' when 1 then \'RefreshOnly\' when 2 then \'RunAction\'End  as addbehaivor_grid,name,B2G(OnSave) onsave, PARTMENU_BRIEF_F(onsave, NULL) as onsave_grid,B2G(OnCreate) oncreate, PARTMENU_BRIEF_F(oncreate, NULL) as oncreate_grid,the_comment,usearchiving, case usearchiving  when -1 then \'Да\' when 0 then \'Нет\'End  as usearchiving_grid,B2G(OnRun) onrun, PARTMENU_BRIEF_F(onrun, NULL) as onrun_grid,B2G(ExtenderObject) extenderobject,INSTANCE_BRIEF_F(extenderobject, NULL) as  extenderobject_grid,nolog, case nolog  when -1 then \'Да\' when 0 then \'Нет\'End  as nolog_grid,shablonbrief,parttype, case parttype  when 0 then \'Строка\' when 1 then \'Коллекция\' when 2 then \'Дерево\' when 3 then \'Расширение\' when 4 then \'Расширение с данными\'End  as parttype_grid,sequence,isjormalchange, case isjormalchange  when -1 then \'Да\' when 0 then \'Нет\'End  as isjormalchange_grid,caption', 'ViewName' => 'part', 'WhereClause' => 'instanceid=G2B(\''. $id . '\')'));
	if (count($res) == 0) {
	    return null;
	} else {
	    return $res;
	}
		}
    function getRowsByParent($id,$sort=array())
	{
	$res = $this->jservice->get(array('Action' => 'GetViewData','Sort'=>$sort,'FieldList'=>'B2G(partid) as partid, B2G(partid) as id,B2G(parentstructrowid) as parentid,B2G(parentrowid) as parentrowid, PART_BRIEF_F(partid , NULL) as  brief,particoncls,rulebrief,integerpkey, case integerpkey  when -1 then \'Да\' when 0 then \'Нет\'End  as integerpkey_grid,manualregister, case manualregister  when -1 then \'Да\' when 0 then \'Нет\'End  as manualregister_grid,B2G(OnDelete) ondelete, PARTMENU_BRIEF_F(ondelete, NULL) as ondelete_grid,addbehaivor, case addbehaivor  when 0 then \'AddForm\' when 1 then \'RefreshOnly\' when 2 then \'RunAction\'End  as addbehaivor_grid,name,B2G(OnSave) onsave, PARTMENU_BRIEF_F(onsave, NULL) as onsave_grid,B2G(OnCreate) oncreate, PARTMENU_BRIEF_F(oncreate, NULL) as oncreate_grid,the_comment,usearchiving, case usearchiving  when -1 then \'Да\' when 0 then \'Нет\'End  as usearchiving_grid,B2G(OnRun) onrun, PARTMENU_BRIEF_F(onrun, NULL) as onrun_grid,B2G(ExtenderObject) extenderobject,INSTANCE_BRIEF_F(extenderobject, NULL) as  extenderobject_grid,nolog, case nolog  when -1 then \'Да\' when 0 then \'Нет\'End  as nolog_grid,shablonbrief,parttype, case parttype  when 0 then \'Строка\' when 1 then \'Коллекция\' when 2 then \'Дерево\' when 3 then \'Расширение\' when 4 then \'Расширение с данными\'End  as parttype_grid,sequence,isjormalchange, case isjormalchange  when -1 then \'Да\' when 0 then \'Нет\'End  as isjormalchange_grid,caption', 'ViewName' => 'part', 'WhereClause' => ' parentstructrowid=G2B(\''. $id . '\')'));
	if (count($res) == 0) {
	    return null;
	} else {
	    return $res;
	}
  }
    function getRowsByTree($treeid,$sort=array())
		{
	    $res = $this->jservice->get(array('Action' => 'GetViewData','Sort'=>$sort,'FieldList'=>'B2G(partid) as partid, B2G(partid) as id,B2G(parentstructrowid) as parentid,B2G(parentrowid) as parentrowid, PART_BRIEF_F(partid , NULL) as  brief,particoncls,rulebrief,integerpkey, case integerpkey  when -1 then \'Да\' when 0 then \'Нет\'End  as integerpkey_grid,manualregister, case manualregister  when -1 then \'Да\' when 0 then \'Нет\'End  as manualregister_grid,B2G(OnDelete) ondelete, PARTMENU_BRIEF_F(ondelete, NULL) as ondelete_grid,addbehaivor, case addbehaivor  when 0 then \'AddForm\' when 1 then \'RefreshOnly\' when 2 then \'RunAction\'End  as addbehaivor_grid,name,B2G(OnSave) onsave, PARTMENU_BRIEF_F(onsave, NULL) as onsave_grid,B2G(OnCreate) oncreate, PARTMENU_BRIEF_F(oncreate, NULL) as oncreate_grid,the_comment,usearchiving, case usearchiving  when -1 then \'Да\' when 0 then \'Нет\'End  as usearchiving_grid,B2G(OnRun) onrun, PARTMENU_BRIEF_F(onrun, NULL) as onrun_grid,B2G(ExtenderObject) extenderobject,INSTANCE_BRIEF_F(extenderobject, NULL) as  extenderobject_grid,nolog, case nolog  when -1 then \'Да\' when 0 then \'Нет\'End  as nolog_grid,shablonbrief,parttype, case parttype  when 0 then \'Строка\' when 1 then \'Коллекция\' when 2 then \'Дерево\' when 3 then \'Расширение\' when 4 then \'Расширение с данными\'End  as parttype_grid,sequence,isjormalchange, case isjormalchange  when -1 then \'Да\' when 0 then \'Нет\'End  as isjormalchange_grid,caption', 'ViewName' => 'part', 'WhereClause' => 'parentrowid=G2B(\''.$treeid.'\')'));
	    if (count($res)) {
	        return $res;
	    } else {
	        return null;
	    }
		}
    function getRowsByInstanceTree($id,$treeid,$sort=array())
		{
	$res = $this->jservice->get(array('Action' => 'GetViewData','Sort'=>$sort,'FieldList'=>'B2G(partid) as partid, B2G(partid) as id,B2G(parentstructrowid) as parentid,B2G(parentrowid) as parentrowid, PART_BRIEF_F(partid , NULL) as  brief,particoncls,rulebrief,integerpkey, case integerpkey  when -1 then \'Да\' when 0 then \'Нет\'End  as integerpkey_grid,manualregister, case manualregister  when -1 then \'Да\' when 0 then \'Нет\'End  as manualregister_grid,B2G(OnDelete) ondelete, PARTMENU_BRIEF_F(ondelete, NULL) as ondelete_grid,addbehaivor, case addbehaivor  when 0 then \'AddForm\' when 1 then \'RefreshOnly\' when 2 then \'RunAction\'End  as addbehaivor_grid,name,B2G(OnSave) onsave, PARTMENU_BRIEF_F(onsave, NULL) as onsave_grid,B2G(OnCreate) oncreate, PARTMENU_BRIEF_F(oncreate, NULL) as oncreate_grid,the_comment,usearchiving, case usearchiving  when -1 then \'Да\' when 0 then \'Нет\'End  as usearchiving_grid,B2G(OnRun) onrun, PARTMENU_BRIEF_F(onrun, NULL) as onrun_grid,B2G(ExtenderObject) extenderobject,INSTANCE_BRIEF_F(extenderobject, NULL) as  extenderobject_grid,nolog, case nolog  when -1 then \'Да\' when 0 then \'Нет\'End  as nolog_grid,shablonbrief,parttype, case parttype  when 0 then \'Строка\' when 1 then \'Коллекция\' when 2 then \'Дерево\' when 3 then \'Расширение\' when 4 then \'Расширение с данными\'End  as parttype_grid,sequence,isjormalchange, case isjormalchange  when -1 then \'Да\' when 0 then \'Нет\'End  as isjormalchange_grid,caption', 'ViewName' => 'part', 'WhereClause' => 'instanceid=G2B(\''. $id . '\') and parentrowid=G2B(\''.$treeid.'\')'));
	if (count($res) == 0) {
	    return null;
	} else {
	    return $res;
	}
		}
    function getRowsByParentTree($id,$treeid,$sort=array())
	{
	$res = $this->jservice->get(array('Action' => 'GetViewData','Sort'=>$sort,'FieldList'=>'B2G(partid) as partid, B2G(partid) as id,B2G(parentstructrowid) as parentid,B2G(parentrowid) as parentrowid, PART_BRIEF_F(partid , NULL) as  brief,particoncls,rulebrief,integerpkey, case integerpkey  when -1 then \'Да\' when 0 then \'Нет\'End  as integerpkey_grid,manualregister, case manualregister  when -1 then \'Да\' when 0 then \'Нет\'End  as manualregister_grid,B2G(OnDelete) ondelete, PARTMENU_BRIEF_F(ondelete, NULL) as ondelete_grid,addbehaivor, case addbehaivor  when 0 then \'AddForm\' when 1 then \'RefreshOnly\' when 2 then \'RunAction\'End  as addbehaivor_grid,name,B2G(OnSave) onsave, PARTMENU_BRIEF_F(onsave, NULL) as onsave_grid,B2G(OnCreate) oncreate, PARTMENU_BRIEF_F(oncreate, NULL) as oncreate_grid,the_comment,usearchiving, case usearchiving  when -1 then \'Да\' when 0 then \'Нет\'End  as usearchiving_grid,B2G(OnRun) onrun, PARTMENU_BRIEF_F(onrun, NULL) as onrun_grid,B2G(ExtenderObject) extenderobject,INSTANCE_BRIEF_F(extenderobject, NULL) as  extenderobject_grid,nolog, case nolog  when -1 then \'Да\' when 0 then \'Нет\'End  as nolog_grid,shablonbrief,parttype, case parttype  when 0 then \'Строка\' when 1 then \'Коллекция\' when 2 then \'Дерево\' when 3 then \'Расширение\' when 4 then \'Расширение с данными\'End  as parttype_grid,sequence,isjormalchange, case isjormalchange  when -1 then \'Да\' when 0 then \'Нет\'End  as isjormalchange_grid,caption', 'ViewName' => 'part', 'WhereClause' => ' parentstructrowid=G2B(\''. $id . '\') and parentrowid=G2B(\''.$treeid.'\')'));
	if (count($res) == 0) {
	    return null;
	} else {
	    return $res;
	}
  }
    function deleteRow($id = null) {
	  if (!empty($id) && $this->jservice->get(array('Action' => 'DeleteRow', 'PartName' => 'part', 'RowID' => $id)) == 'OK')
	    $result = array('success' => TRUE);
	else
	    $result = array('success' => FALSE, 'msg' => 'Error while deleting record!');
	return $result;
    }
}
?>

<?php
class  M_objecttype extends CI_Model {
    function getRow($empId) {
    $result = array('success' => false, 'msg' => 'No Row ID for retrive data');
	if (!empty($empId)){
	    $res = $this->jservice->get(array('Action' => 'GetRowData','FieldList'=>'B2G(objecttypeid) as objecttypeid, B2G(objecttypeid) as id,B2G(instanceid) as instanceid, OBJECTTYPE_BRIEF_F(objecttypeid , NULL) as  brief,objiconcls,name,thecomment,useownership, case useownership  when -1 then \'Да\' when 0 then \'Нет\'End  as useownership_grid,B2G(OnDelete) ondelete, TYPEMENU_BRIEF_F(ondelete, NULL) as ondelete_grid,usearchiving, case usearchiving  when -1 then \'Да\' when 0 then \'Нет\'End  as usearchiving_grid,replicatype, case replicatype  when 0 then \'Весь документ\' when 1 then \'Построчно\' when 2 then \'Локальный\'End  as replicatype_grid,B2G(OnCreate) oncreate, TYPEMENU_BRIEF_F(oncreate, NULL) as oncreate_grid,commitfullobject, case commitfullobject  when -1 then \'Да\' when 0 then \'Нет\'End  as commitfullobject_grid,allowreftoobject, case allowreftoobject  when -1 then \'Да\' when 0 then \'Нет\'End  as allowreftoobject_grid,B2G(Package) package, MTZAPP_BRIEF_F(package, NULL) as package_grid,B2G(OnRun) onrun, TYPEMENU_BRIEF_F(onrun, NULL) as onrun_grid,the_comment,B2G(ChooseView) chooseview, PARTVIEW_BRIEF_F(chooseview, NULL) as chooseview_grid,issingleinstance, case issingleinstance  when -1 then \'Да\' when 0 then \'Нет\'End  as issingleinstance_grid,allowsearch, case allowsearch  when -1 then \'Да\' when 0 then \'Нет\'End  as allowsearch_grid', 'PartName' => 'objecttype', 'ID' =>  $empId 	));
	    if (!empty($res)) {
	        $result = $res[0];
	    }
	}
	return $result;
    }
    function setRow($data)  {
	    $data = (array)$data;
	if (!empty($data)) {
	    if (empty($data['objecttypeid'])) {
	        $data['objecttypeid'] = $this->jservice->get(array('Action' => 'NewGuid'));
	        $res=$this->jservice->get(array('Action' => 'NewRow', 'PartName' => 'objecttype', 'RowID' => $data['objecttypeid'], 'DocumentID' => $data['instanceid'], 'Values'=>$data));
	       if(isset($res[0])){
	       	if($res[0]->result!='ok'){
	       		return array('success' => FALSE, 'msg' => $res[0]->result);
	       	} 
	       }else{
	       	return array('success' => FALSE, 'msg' => 'Unknown error' );
	       }
	    }else{
	    $res = $this->jservice->get(array('Action' => 'UpdateRow', 'PartName' => 'objecttype', 'RowID' => $data['objecttypeid'], 'DocumentID' => $data['instanceid'], 'Values'=>$data));
	       if(isset($res[0])){
	       	if($res[0]->result!='ok'){
	       		return array('success' => FALSE, 'msg' => $res[0]->result);
	       	} 
	       }else{
	       	return array('success' => FALSE, 'msg' => 'Unknown error' );
	       }
	    }
	    return array('success' => TRUE, 'data' => $this->getRow($data['objecttypeid'] ));
	} else {
	    return array('success' => FALSE, 'msg' => 'No data to store on server');
	}
    }
    function newRow($instanceid,$data)  {
	  $id = $this->jservice->get(array('Action' => 'NewGuid'));
	if ($this->jservice->get(array('Action' => 'NewRow', 'PartName' => 'objecttype', 'RowID' => $id, 'DocumentID' => $instanceid, 'Values'=>$data)) == 'OK') {
	    return array('success' => TRUE, 'data' => $id);
	} else {
	    return array('success' => FALSE, 'msg' => 'Error while create new id');
	}
    }
    function getRows($sort=array())
		{
	    $res = $this->jservice->get(array('Action' => 'GetViewData','Sort'=>$sort,'FieldList'=>'B2G(objecttypeid) as objecttypeid, B2G(objecttypeid) as id,B2G(instanceid) as instanceid, OBJECTTYPE_BRIEF_F(objecttypeid , NULL) as  brief,objiconcls,name,thecomment,useownership, case useownership  when -1 then \'Да\' when 0 then \'Нет\'End  as useownership_grid,B2G(OnDelete) ondelete, TYPEMENU_BRIEF_F(ondelete, NULL) as ondelete_grid,usearchiving, case usearchiving  when -1 then \'Да\' when 0 then \'Нет\'End  as usearchiving_grid,replicatype, case replicatype  when 0 then \'Весь документ\' when 1 then \'Построчно\' when 2 then \'Локальный\'End  as replicatype_grid,B2G(OnCreate) oncreate, TYPEMENU_BRIEF_F(oncreate, NULL) as oncreate_grid,commitfullobject, case commitfullobject  when -1 then \'Да\' when 0 then \'Нет\'End  as commitfullobject_grid,allowreftoobject, case allowreftoobject  when -1 then \'Да\' when 0 then \'Нет\'End  as allowreftoobject_grid,B2G(Package) package, MTZAPP_BRIEF_F(package, NULL) as package_grid,B2G(OnRun) onrun, TYPEMENU_BRIEF_F(onrun, NULL) as onrun_grid,the_comment,B2G(ChooseView) chooseview, PARTVIEW_BRIEF_F(chooseview, NULL) as chooseview_grid,issingleinstance, case issingleinstance  when -1 then \'Да\' when 0 then \'Нет\'End  as issingleinstance_grid,allowsearch, case allowsearch  when -1 then \'Да\' when 0 then \'Нет\'End  as allowsearch_grid', 'ViewName' => 'objecttype'));
	    if (count($res)) {
	        return $res;
	    } else {
	        return null;
	    }
		}
    function getRowsByInstance($id,$sort=array())
		{
	$res = $this->jservice->get(array('Action' => 'GetViewData','Sort'=>$sort,'FieldList'=>'B2G(objecttypeid) as objecttypeid, B2G(objecttypeid) as id,B2G(instanceid) as instanceid, OBJECTTYPE_BRIEF_F(objecttypeid , NULL) as  brief,objiconcls,name,thecomment,useownership, case useownership  when -1 then \'Да\' when 0 then \'Нет\'End  as useownership_grid,B2G(OnDelete) ondelete, TYPEMENU_BRIEF_F(ondelete, NULL) as ondelete_grid,usearchiving, case usearchiving  when -1 then \'Да\' when 0 then \'Нет\'End  as usearchiving_grid,replicatype, case replicatype  when 0 then \'Весь документ\' when 1 then \'Построчно\' when 2 then \'Локальный\'End  as replicatype_grid,B2G(OnCreate) oncreate, TYPEMENU_BRIEF_F(oncreate, NULL) as oncreate_grid,commitfullobject, case commitfullobject  when -1 then \'Да\' when 0 then \'Нет\'End  as commitfullobject_grid,allowreftoobject, case allowreftoobject  when -1 then \'Да\' when 0 then \'Нет\'End  as allowreftoobject_grid,B2G(Package) package, MTZAPP_BRIEF_F(package, NULL) as package_grid,B2G(OnRun) onrun, TYPEMENU_BRIEF_F(onrun, NULL) as onrun_grid,the_comment,B2G(ChooseView) chooseview, PARTVIEW_BRIEF_F(chooseview, NULL) as chooseview_grid,issingleinstance, case issingleinstance  when -1 then \'Да\' when 0 then \'Нет\'End  as issingleinstance_grid,allowsearch, case allowsearch  when -1 then \'Да\' when 0 then \'Нет\'End  as allowsearch_grid', 'ViewName' => 'objecttype', 'WhereClause' => 'instanceid=G2B(\''. $id . '\')'));
	if (count($res) == 0) {
	    return null;
	} else {
	    return $res;
	}
		}
    function getRowsByParent($id,$sort=array())
	{
	$res = $this->jservice->get(array('Action' => 'GetViewData','Sort'=>$sort,'FieldList'=>'B2G(objecttypeid) as objecttypeid, B2G(objecttypeid) as id,B2G(instanceid) as instanceid, OBJECTTYPE_BRIEF_F(objecttypeid , NULL) as  brief,objiconcls,name,thecomment,useownership, case useownership  when -1 then \'Да\' when 0 then \'Нет\'End  as useownership_grid,B2G(OnDelete) ondelete, TYPEMENU_BRIEF_F(ondelete, NULL) as ondelete_grid,usearchiving, case usearchiving  when -1 then \'Да\' when 0 then \'Нет\'End  as usearchiving_grid,replicatype, case replicatype  when 0 then \'Весь документ\' when 1 then \'Построчно\' when 2 then \'Локальный\'End  as replicatype_grid,B2G(OnCreate) oncreate, TYPEMENU_BRIEF_F(oncreate, NULL) as oncreate_grid,commitfullobject, case commitfullobject  when -1 then \'Да\' when 0 then \'Нет\'End  as commitfullobject_grid,allowreftoobject, case allowreftoobject  when -1 then \'Да\' when 0 then \'Нет\'End  as allowreftoobject_grid,B2G(Package) package, MTZAPP_BRIEF_F(package, NULL) as package_grid,B2G(OnRun) onrun, TYPEMENU_BRIEF_F(onrun, NULL) as onrun_grid,the_comment,B2G(ChooseView) chooseview, PARTVIEW_BRIEF_F(chooseview, NULL) as chooseview_grid,issingleinstance, case issingleinstance  when -1 then \'Да\' when 0 then \'Нет\'End  as issingleinstance_grid,allowsearch, case allowsearch  when -1 then \'Да\' when 0 then \'Нет\'End  as allowsearch_grid', 'ViewName' => 'objecttype', 'WhereClause' => ' parentstructrowid=G2B(\''. $id . '\')'));
	if (count($res) == 0) {
	    return null;
	} else {
	    return $res;
	}
  }
    function deleteRow($id = null) {
	  if (!empty($id) && $this->jservice->get(array('Action' => 'DeleteRow', 'PartName' => 'objecttype', 'RowID' => $id)) == 'OK')
	    $result = array('success' => TRUE);
	else
	    $result = array('success' => FALSE, 'msg' => 'Error while deleting record!');
	return $result;
    }
}
?>
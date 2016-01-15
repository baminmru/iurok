
<?php
class  M_partmenu extends CI_Model {
    function getRow($empId) {
    $result = array('success' => false, 'msg' => 'No Row ID for retrive data');
	if (!empty($empId)){
	    $res = $this->jservice->get(array('Action' => 'GetRowData','FieldList'=>'B2G(partmenuid) as partmenuid, B2G(partmenuid) as id,B2G(parentstructrowid) as parentid, PARTMENU_BRIEF_F(partmenuid , NULL) as  brief,B2G(the_Action) the_action, SHAREDMETHOD_BRIEF_F(the_action, NULL) as the_action_grid,name,caption,ismenuitem, case ismenuitem  when -1 then \'Да\' when 0 then \'Нет\'End  as ismenuitem_grid,istoolbarbutton, case istoolbarbutton  when -1 then \'Да\' when 0 then \'Нет\'End  as istoolbarbutton_grid,hotkey,tooltip', 'PartName' => 'partmenu', 'ID' =>  $empId 	));
	    if (!empty($res)) {
	        $result = $res[0];
	    }
	}
	return $result;
    }
    function setRow($data)  {
	    $data = (array)$data;
	if (!empty($data)) {
	    if (empty($data['partmenuid'])) {
	        $data['partmenuid'] = $this->jservice->get(array('Action' => 'NewGuid'));
	        $res=$this->jservice->get(array('Action' => 'NewRow', 'PartName' => 'partmenu', 'RowID' => $data['partmenuid'], 'DocumentID' => $data['instanceid'],'ParentID' => $data['parentid'], 'Values'=>$data));
	       if(isset($res[0])){
	       	if($res[0]->result!='ok'){
	       		return array('success' => FALSE, 'msg' => $res[0]->result);
	       	} 
	       }else{
	       	return array('success' => FALSE, 'msg' => 'Unknown error' );
	       }
	    }else{
	    $res = $this->jservice->get(array('Action' => 'UpdateRow', 'PartName' => 'partmenu', 'RowID' => $data['partmenuid'], 'DocumentID' => $data['instanceid'],'ParentID' => $data['parentid'], 'Values'=>$data));
	       if(isset($res[0])){
	       	if($res[0]->result!='ok'){
	       		return array('success' => FALSE, 'msg' => $res[0]->result);
	       	} 
	       }else{
	       	return array('success' => FALSE, 'msg' => 'Unknown error' );
	       }
	    }
	    return array('success' => TRUE, 'data' => $this->getRow($data['partmenuid'] ));
	} else {
	    return array('success' => FALSE, 'msg' => 'No data to store on server');
	}
    }
    function newRow($instanceid,$parentid,$data)  {
	  $id = $this->jservice->get(array('Action' => 'NewGuid'));
	if ($this->jservice->get(array('Action' => 'NewRow', 'PartName' => 'partmenu', 'RowID' => $id, 'DocumentID' => $instanceid,'ParentID'=>$parentid, 'Values'=>$data)) == 'OK') {
	    return array('success' => TRUE, 'data' => $id);
	} else {
	    return array('success' => FALSE, 'msg' => 'Error while create new id');
	}
    }
    function getRows($sort=array())
		{
	    $res = $this->jservice->get(array('Action' => 'GetViewData','Sort'=>$sort,'FieldList'=>'B2G(partmenuid) as partmenuid, B2G(partmenuid) as id,B2G(parentstructrowid) as parentid, PARTMENU_BRIEF_F(partmenuid , NULL) as  brief,B2G(the_Action) the_action, SHAREDMETHOD_BRIEF_F(the_action, NULL) as the_action_grid,name,caption,ismenuitem, case ismenuitem  when -1 then \'Да\' when 0 then \'Нет\'End  as ismenuitem_grid,istoolbarbutton, case istoolbarbutton  when -1 then \'Да\' when 0 then \'Нет\'End  as istoolbarbutton_grid,hotkey,tooltip', 'ViewName' => 'partmenu'));
	    if (count($res)) {
	        return $res;
	    } else {
	        return null;
	    }
		}
    function getRowsByInstance($id,$sort=array())
		{
	$res = $this->jservice->get(array('Action' => 'GetViewData','Sort'=>$sort,'FieldList'=>'B2G(partmenuid) as partmenuid, B2G(partmenuid) as id,B2G(parentstructrowid) as parentid, PARTMENU_BRIEF_F(partmenuid , NULL) as  brief,B2G(the_Action) the_action, SHAREDMETHOD_BRIEF_F(the_action, NULL) as the_action_grid,name,caption,ismenuitem, case ismenuitem  when -1 then \'Да\' when 0 then \'Нет\'End  as ismenuitem_grid,istoolbarbutton, case istoolbarbutton  when -1 then \'Да\' when 0 then \'Нет\'End  as istoolbarbutton_grid,hotkey,tooltip', 'ViewName' => 'partmenu', 'WhereClause' => 'instanceid=G2B(\''. $id . '\')'));
	if (count($res) == 0) {
	    return null;
	} else {
	    return $res;
	}
		}
    function getRowsByParent($id,$sort=array())
	{
	$res = $this->jservice->get(array('Action' => 'GetViewData','Sort'=>$sort,'FieldList'=>'B2G(partmenuid) as partmenuid, B2G(partmenuid) as id,B2G(parentstructrowid) as parentid, PARTMENU_BRIEF_F(partmenuid , NULL) as  brief,B2G(the_Action) the_action, SHAREDMETHOD_BRIEF_F(the_action, NULL) as the_action_grid,name,caption,ismenuitem, case ismenuitem  when -1 then \'Да\' when 0 then \'Нет\'End  as ismenuitem_grid,istoolbarbutton, case istoolbarbutton  when -1 then \'Да\' when 0 then \'Нет\'End  as istoolbarbutton_grid,hotkey,tooltip', 'ViewName' => 'partmenu', 'WhereClause' => ' parentstructrowid=G2B(\''. $id . '\')'));
	if (count($res) == 0) {
	    return null;
	} else {
	    return $res;
	}
  }
    function deleteRow($id = null) {
	  if (!empty($id) && $this->jservice->get(array('Action' => 'DeleteRow', 'PartName' => 'partmenu', 'RowID' => $id)) == 'OK')
	    $result = array('success' => TRUE);
	else
	    $result = array('success' => FALSE, 'msg' => 'Error while deleting record!');
	return $result;
    }
}
?>
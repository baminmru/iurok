
<?php
class  M_partview_lnk extends CI_Model {
    function getRow($empId) {
    $result = array('success' => false, 'msg' => 'No Row ID for retrive data');
	if (!empty($empId)){
	    $res = $this->jservice->get(array('Action' => 'GetRowData','FieldList'=>'B2G(partview_lnkid) as partview_lnkid, B2G(partview_lnkid) as id,B2G(parentstructrowid) as parentid, PARTVIEW_LNK_BRIEF_F(partview_lnkid , NULL) as  brief,B2G(TheJoinDestination) thejoindestination, ViewColumn_BRIEF_F(thejoindestination, NULL) as thejoindestination_grid,handjoin,seq,B2G(TheJoinSource) thejoinsource, ViewColumn_BRIEF_F(thejoinsource, NULL) as thejoinsource_grid,B2G(TheView) theview, PARTVIEW_BRIEF_F(theview, NULL) as theview_grid,reftype, case reftype  when 0 then \'Нет\' when 1 then \'Ссылка на объект\' when 2 then \'Ссылка на строку\' when 3 then \'Связка InstanceID (в передлах объекта)\' when 4 then \'Связка ParentStructRowID  (в передлах объекта)\'End  as reftype_grid', 'PartName' => 'partview_lnk', 'ID' =>  $empId 	));
	    if (!empty($res)) {
	        $result = $res[0];
	    }
	}
	return $result;
    }
    function setRow($data)  {
	    $data = (array)$data;
	if (!empty($data)) {
	    if (empty($data['partview_lnkid'])) {
	        $data['partview_lnkid'] = $this->jservice->get(array('Action' => 'NewGuid'));
	        $res=$this->jservice->get(array('Action' => 'NewRow', 'PartName' => 'partview_lnk', 'RowID' => $data['partview_lnkid'], 'DocumentID' => $data['instanceid'],'ParentID' => $data['parentid'], 'Values'=>$data));
	       if(isset($res[0])){
	       	if($res[0]->result!='ok'){
	       		return array('success' => FALSE, 'msg' => $res[0]->result);
	       	} 
	       }else{
	       	return array('success' => FALSE, 'msg' => 'Unknown error' );
	       }
	    }else{
	    $res = $this->jservice->get(array('Action' => 'UpdateRow', 'PartName' => 'partview_lnk', 'RowID' => $data['partview_lnkid'], 'DocumentID' => $data['instanceid'],'ParentID' => $data['parentid'], 'Values'=>$data));
	       if(isset($res[0])){
	       	if($res[0]->result!='ok'){
	       		return array('success' => FALSE, 'msg' => $res[0]->result);
	       	} 
	       }else{
	       	return array('success' => FALSE, 'msg' => 'Unknown error' );
	       }
	    }
	    return array('success' => TRUE, 'data' => $this->getRow($data['partview_lnkid'] ));
	} else {
	    return array('success' => FALSE, 'msg' => 'No data to store on server');
	}
    }
    function newRow($instanceid,$parentid,$data)  {
	  $id = $this->jservice->get(array('Action' => 'NewGuid'));
	if ($this->jservice->get(array('Action' => 'NewRow', 'PartName' => 'partview_lnk', 'RowID' => $id, 'DocumentID' => $instanceid,'ParentID'=>$parentid, 'Values'=>$data)) == 'OK') {
	    return array('success' => TRUE, 'data' => $id);
	} else {
	    return array('success' => FALSE, 'msg' => 'Error while create new id');
	}
    }
    function getRows($sort=array())
		{
	    $res = $this->jservice->get(array('Action' => 'GetViewData','Sort'=>$sort,'FieldList'=>'B2G(partview_lnkid) as partview_lnkid, B2G(partview_lnkid) as id,B2G(parentstructrowid) as parentid, PARTVIEW_LNK_BRIEF_F(partview_lnkid , NULL) as  brief,B2G(TheJoinDestination) thejoindestination, ViewColumn_BRIEF_F(thejoindestination, NULL) as thejoindestination_grid,handjoin,seq,B2G(TheJoinSource) thejoinsource, ViewColumn_BRIEF_F(thejoinsource, NULL) as thejoinsource_grid,B2G(TheView) theview, PARTVIEW_BRIEF_F(theview, NULL) as theview_grid,reftype, case reftype  when 0 then \'Нет\' when 1 then \'Ссылка на объект\' when 2 then \'Ссылка на строку\' when 3 then \'Связка InstanceID (в передлах объекта)\' when 4 then \'Связка ParentStructRowID  (в передлах объекта)\'End  as reftype_grid', 'ViewName' => 'partview_lnk'));
	    if (count($res)) {
	        return $res;
	    } else {
	        return null;
	    }
		}
    function getRowsByInstance($id,$sort=array())
		{
	$res = $this->jservice->get(array('Action' => 'GetViewData','Sort'=>$sort,'FieldList'=>'B2G(partview_lnkid) as partview_lnkid, B2G(partview_lnkid) as id,B2G(parentstructrowid) as parentid, PARTVIEW_LNK_BRIEF_F(partview_lnkid , NULL) as  brief,B2G(TheJoinDestination) thejoindestination, ViewColumn_BRIEF_F(thejoindestination, NULL) as thejoindestination_grid,handjoin,seq,B2G(TheJoinSource) thejoinsource, ViewColumn_BRIEF_F(thejoinsource, NULL) as thejoinsource_grid,B2G(TheView) theview, PARTVIEW_BRIEF_F(theview, NULL) as theview_grid,reftype, case reftype  when 0 then \'Нет\' when 1 then \'Ссылка на объект\' when 2 then \'Ссылка на строку\' when 3 then \'Связка InstanceID (в передлах объекта)\' when 4 then \'Связка ParentStructRowID  (в передлах объекта)\'End  as reftype_grid', 'ViewName' => 'partview_lnk', 'WhereClause' => 'instanceid=G2B(\''. $id . '\')'));
	if (count($res) == 0) {
	    return null;
	} else {
	    return $res;
	}
		}
    function getRowsByParent($id,$sort=array())
	{
	$res = $this->jservice->get(array('Action' => 'GetViewData','Sort'=>$sort,'FieldList'=>'B2G(partview_lnkid) as partview_lnkid, B2G(partview_lnkid) as id,B2G(parentstructrowid) as parentid, PARTVIEW_LNK_BRIEF_F(partview_lnkid , NULL) as  brief,B2G(TheJoinDestination) thejoindestination, ViewColumn_BRIEF_F(thejoindestination, NULL) as thejoindestination_grid,handjoin,seq,B2G(TheJoinSource) thejoinsource, ViewColumn_BRIEF_F(thejoinsource, NULL) as thejoinsource_grid,B2G(TheView) theview, PARTVIEW_BRIEF_F(theview, NULL) as theview_grid,reftype, case reftype  when 0 then \'Нет\' when 1 then \'Ссылка на объект\' when 2 then \'Ссылка на строку\' when 3 then \'Связка InstanceID (в передлах объекта)\' when 4 then \'Связка ParentStructRowID  (в передлах объекта)\'End  as reftype_grid', 'ViewName' => 'partview_lnk', 'WhereClause' => ' parentstructrowid=G2B(\''. $id . '\')'));
	if (count($res) == 0) {
	    return null;
	} else {
	    return $res;
	}
  }
    function deleteRow($id = null) {
	  if (!empty($id) && $this->jservice->get(array('Action' => 'DeleteRow', 'PartName' => 'partview_lnk', 'RowID' => $id)) == 'OK')
	    $result = array('success' => TRUE);
	else
	    $result = array('success' => FALSE, 'msg' => 'Error while deleting record!');
	return $result;
    }
}
?>
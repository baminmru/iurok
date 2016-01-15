
<?php
class  M_iu_cm_time extends CI_Model {
    function getRow($empId) {
    $result = array('success' => false, 'msg' => 'No Row ID for retrive data');
	if (!empty($empId)){
	    $res = $this->jservice->get(array('Action' => 'GetRowData','FieldList'=>'B2G(iu_cm_timeid) as iu_cm_timeid, B2G(iu_cm_timeid) as id,B2G(instanceid) as instanceid, iu_cm_time_BRIEF_F(iu_cm_timeid , NULL) as  brief,starttime,thefile,thefile_ext,  DATE_FORMAT(thedate,\'%Y-%m-%d %H:%i:%s\') as  thedate,ischecked, case ischecked  when -1 then \'Да\' when 0 then \'Нет\'End  as ischecked_grid,curatoronly, case curatoronly  when -1 then \'Да\' when 0 then \'Нет\'End  as curatoronly_grid,info,B2G(TheAuthor) theauthor, iu_u_def_BRIEF_F(theauthor, NULL) as theauthor_grid,endtime,B2G(messagetype) messagetype, iud_mt_def_BRIEF_F(messagetype, NULL) as messagetype_grid,theref', 'PartName' => 'iu_cm_time', 'ID' =>  $empId 	));
	    if (!empty($res)) {
	        $result = $res[0];
	    }
	}
	return $result;
    }
    function setRow($data)  {
	    $data = (array)$data;
//////////////////////////// support file data for: thefile
    if ($_FILES['thefile_fu']['size'] > 0 ) {
       $ext = pathinfo($_FILES['thefile_fu']['name'], PATHINFO_EXTENSION);
       $orig = pathinfo($_FILES['thefile_fu']['name'], PATHINFO_BASENAME) ;
       $filename = strtolower(trim($this->jservice->get(array('Action' => 'NewGuid')),'{}') . '.' . $ext);
       if (move_uploaded_file($_FILES['thefile_fu']['tmp_name'], $this->jservice->temp_file_path().$filename)) {
          $file_data = file_get_contents($this->jservice->temp_file_path().$filename);
          $this->jservice->get(array('Action' => 'AddFile', 'FileName'=>$filename, 'Data'=>utf8_encode($file_data), 'FileID'=>'iu_files',
            'OrigName'=>$orig   ));
          unlink($this->jservice->temp_file_path().$filename);
       }
	   if (!empty($data)) {
	        $data['thefile']=$filename;
	        $data['thefile_ext']=$ext;
       }
    }
//////////////////////////// end support file data for: thefile
	if (!empty($data)) {
	    if (empty($data['iu_cm_timeid'])) {
	        $data['iu_cm_timeid'] = $this->jservice->get(array('Action' => 'NewGuid'));
	        $res=$this->jservice->get(array('Action' => 'NewRow', 'PartName' => 'iu_cm_time', 'RowID' => $data['iu_cm_timeid'], 'DocumentID' => $data['instanceid'], 'Values'=>$data));
	       if(isset($res[0])){
	       	if($res[0]->result!='ok'){
	       		return array('success' => FALSE, 'msg' => $res[0]->result);
	       	} 
	       }else{
	       	return array('success' => FALSE, 'msg' => 'Unknown error' );
	       }
	    }else{
	    $res = $this->jservice->get(array('Action' => 'UpdateRow', 'PartName' => 'iu_cm_time', 'RowID' => $data['iu_cm_timeid'], 'DocumentID' => $data['instanceid'], 'Values'=>$data));
	       if(isset($res[0])){
	       	if($res[0]->result!='ok'){
	       		return array('success' => FALSE, 'msg' => $res[0]->result);
	       	} 
	       }else{
	       	return array('success' => FALSE, 'msg' => 'Unknown error' );
	       }
	    }
	    return array('success' => TRUE, 'data' => $this->getRow($data['iu_cm_timeid'] ));
	} else {
	    return array('success' => FALSE, 'msg' => 'No data to store on server');
	}
    }
    function newRow($instanceid,$data)  {
	  $id = $this->jservice->get(array('Action' => 'NewGuid'));
	if ($this->jservice->get(array('Action' => 'NewRow', 'PartName' => 'iu_cm_time', 'RowID' => $id, 'DocumentID' => $instanceid, 'Values'=>$data)) == 'OK') {
	    return array('success' => TRUE, 'data' => $id);
	} else {
	    return array('success' => FALSE, 'msg' => 'Error while create new id');
	}
    }
    function getRows($sort=array())
		{
	    $res = $this->jservice->get(array('Action' => 'GetViewData','Sort'=>$sort,'FieldList'=>'B2G(iu_cm_timeid) as iu_cm_timeid, B2G(iu_cm_timeid) as id,B2G(instanceid) as instanceid, iu_cm_time_BRIEF_F(iu_cm_timeid , NULL) as  brief,starttime,thefile,thefile_ext,  DATE_FORMAT(thedate,\'%Y-%m-%d %H:%i:%s\') as  thedate,ischecked, case ischecked  when -1 then \'Да\' when 0 then \'Нет\'End  as ischecked_grid,curatoronly, case curatoronly  when -1 then \'Да\' when 0 then \'Нет\'End  as curatoronly_grid,info,B2G(TheAuthor) theauthor, iu_u_def_BRIEF_F(theauthor, NULL) as theauthor_grid,endtime,B2G(messagetype) messagetype, iud_mt_def_BRIEF_F(messagetype, NULL) as messagetype_grid,theref', 'ViewName' => 'iu_cm_time'));
	    if (count($res)) {
	        return $res;
	    } else {
	        return null;
	    }
		}
    function getRowsByInstance($id,$curator,$sort=array())
		{
		if($curator=='false'){
			$res = $this->jservice->get(array('Action' => 'GetViewData','Sort'=>$sort,'FieldList'=>'B2G(iu_cm_timeid) as iu_cm_timeid, B2G(iu_cm_timeid) as id,B2G(instanceid) as instanceid, iu_cm_time_BRIEF_F(iu_cm_timeid , NULL) as  brief,starttime,thefile,thefile_ext,  DATE_FORMAT(thedate,\'%Y-%m-%d %H:%i:%s\') as  thedate,ischecked, case ischecked  when -1 then \'Да\' when 0 then \'Нет\'End  as ischecked_grid,curatoronly, case curatoronly  when -1 then \'Да\' when 0 then \'Нет\'End  as curatoronly_grid,info,B2G(TheAuthor) theauthor, iu_u_def_BRIEF_F(theauthor, NULL) as theauthor_grid,endtime,B2G(messagetype) messagetype, iud_mt_def_BRIEF_F(messagetype, NULL) as messagetype_grid,theref',
			'ViewName' => 'iu_cm_time',
			'WhereClause' => '(instanceid=G2B(\''. $id . '\') and ( curatoronly=0 or curatoronly is null) )'));
		}else{
			$res = $this->jservice->get(array('Action' => 'GetViewData','Sort'=>$sort,'FieldList'=>'B2G(iu_cm_timeid) as iu_cm_timeid, B2G(iu_cm_timeid) as id,B2G(instanceid) as instanceid, iu_cm_time_BRIEF_F(iu_cm_timeid , NULL) as  brief,starttime,thefile,thefile_ext,  DATE_FORMAT(thedate,\'%Y-%m-%d %H:%i:%s\') as  thedate,ischecked, case ischecked  when -1 then \'Да\' when 0 then \'Нет\'End  as ischecked_grid,curatoronly, case curatoronly  when -1 then \'Да\' when 0 then \'Нет\'End  as curatoronly_grid,info,B2G(TheAuthor) theauthor, iu_u_def_BRIEF_F(theauthor, NULL) as theauthor_grid,endtime,B2G(messagetype) messagetype, iud_mt_def_BRIEF_F(messagetype, NULL) as messagetype_grid,theref',
			'ViewName' => 'iu_cm_time',
			'WhereClause' => 'instanceid=G2B(\''. $id . '\')'));
			}
		if (count($res) == 0) {
			return null;
		} else {
			return $res;
		}
	}
    function getRowsByParent($id,$sort=array())
	{
	$res = $this->jservice->get(array('Action' => 'GetViewData','Sort'=>$sort,'FieldList'=>'B2G(iu_cm_timeid) as iu_cm_timeid, B2G(iu_cm_timeid) as id,B2G(instanceid) as instanceid, iu_cm_time_BRIEF_F(iu_cm_timeid , NULL) as  brief,starttime,thefile,thefile_ext,  DATE_FORMAT(thedate,\'%Y-%m-%d %H:%i:%s\') as  thedate,ischecked, case ischecked  when -1 then \'Да\' when 0 then \'Нет\'End  as ischecked_grid,curatoronly, case curatoronly  when -1 then \'Да\' when 0 then \'Нет\'End  as curatoronly_grid,info,B2G(TheAuthor) theauthor, iu_u_def_BRIEF_F(theauthor, NULL) as theauthor_grid,endtime,B2G(messagetype) messagetype, iud_mt_def_BRIEF_F(messagetype, NULL) as messagetype_grid,theref', 'ViewName' => 'iu_cm_time', 'WhereClause' => ' parentstructrowid=G2B(\''. $id . '\')'));
	if (count($res) == 0) {
	    return null;
	} else {
	    return $res;
	}
  }
    function deleteRow($id = null) {
	  if (!empty($id) && $this->jservice->get(array('Action' => 'DeleteRow', 'PartName' => 'iu_cm_time', 'RowID' => $id)) == 'OK')
	    $result = array('success' => TRUE);
	else
	    $result = array('success' => FALSE, 'msg' => 'Error while deleting record!');
	return $result;
    }
	
	function hideRow($id = null) {
	  if (!empty($id) && $this->jservice->get(array('Action' => 'HideRow', 'PartName' => 'iu_cm_time', 'RowID' => $id)) == 'OK')
	    $result = array('success' => TRUE);
	else
	    $result = array('success' => FALSE, 'msg' => 'Error while hiding record!');
	return $result;
    }
}
?>
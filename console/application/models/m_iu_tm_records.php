
<?php
class  M_iu_tm_records extends CI_Model {
    function getRow($empId) {
    $result = array('success' => false, 'msg' => 'No Row ID for retrive data');
	if (!empty($empId)){
	    $res = $this->jservice->get(array('Action' => 'GetRowData','FieldList'=>'B2G(iu_tm_recordsid) as iu_tm_recordsid, B2G(iu_tm_recordsid) as id,B2G(instanceid) as instanceid, iu_tm_records_BRIEF_F(iu_tm_recordsid , NULL) as  brief,passport,inn,snils,bankinfo,scanpassport,scanpassport_ext,scaninn,scaninn_ext,scansnils,scansnils_ext,info,tmfile,tmfile_ext,thecomment', 'PartName' => 'iu_tm_records', 'ID' =>  $empId 	));
	    if (!empty($res)) {
	        $result = $res[0];
	    }
	}
	return $result;
    }
    function setRow($data)  {
	    $data = (array)$data;
//////////////////////////// support file data for: scanpassport
    if ($_FILES['scanpassport_fu']['size'] > 0 ) {
       $ext = pathinfo($_FILES['scanpassport_fu']['name'], PATHINFO_EXTENSION);
       $orig = pathinfo($_FILES['scanpassport_fu']['name'], PATHINFO_BASENAME) ;
       $filename = strtolower(trim($this->jservice->get(array('Action' => 'NewGuid')),'{}') . '.' . $ext);
       if (move_uploaded_file($_FILES['scanpassport_fu']['tmp_name'], $this->jservice->temp_file_path().$filename)) {
          $file_data = file_get_contents($this->jservice->temp_file_path().$filename);
          $this->jservice->get(array('Action' => 'AddFile', 'FileName'=>$filename, 'Data'=>utf8_encode($file_data), 'FileID'=>'iu_files',
            'OrigName'=>$orig   ));
          unlink($this->jservice->temp_file_path().$filename);
       }
	   if (!empty($data)) {
	        $data['scanpassport']=$filename;
	        $data['scanpassport_ext']=$ext;
       }
    }
//////////////////////////// end support file data for: scanpassport
//////////////////////////// support file data for: scaninn
    if ($_FILES['scaninn_fu']['size'] > 0 ) {
       $ext = pathinfo($_FILES['scaninn_fu']['name'], PATHINFO_EXTENSION);
       $orig = pathinfo($_FILES['scaninn_fu']['name'], PATHINFO_BASENAME) ;
       $filename = strtolower(trim($this->jservice->get(array('Action' => 'NewGuid')),'{}') . '.' . $ext);
       if (move_uploaded_file($_FILES['scaninn_fu']['tmp_name'], $this->jservice->temp_file_path().$filename)) {
          $file_data = file_get_contents($this->jservice->temp_file_path().$filename);
          $this->jservice->get(array('Action' => 'AddFile', 'FileName'=>$filename, 'Data'=>utf8_encode($file_data), 'FileID'=>'iu_files',
            'OrigName'=>$orig   ));
          unlink($this->jservice->temp_file_path().$filename);
       }
	   if (!empty($data)) {
	        $data['scaninn']=$filename;
	        $data['scaninn_ext']=$ext;
       }
    }
//////////////////////////// end support file data for: scaninn
//////////////////////////// support file data for: scansnils
    if ($_FILES['scansnils_fu']['size'] > 0 ) {
       $ext = pathinfo($_FILES['scansnils_fu']['name'], PATHINFO_EXTENSION);
       $orig = pathinfo($_FILES['scansnils_fu']['name'], PATHINFO_BASENAME) ;
       $filename = strtolower(trim($this->jservice->get(array('Action' => 'NewGuid')),'{}') . '.' . $ext);
       if (move_uploaded_file($_FILES['scansnils_fu']['tmp_name'], $this->jservice->temp_file_path().$filename)) {
          $file_data = file_get_contents($this->jservice->temp_file_path().$filename);
          $this->jservice->get(array('Action' => 'AddFile', 'FileName'=>$filename, 'Data'=>utf8_encode($file_data), 'FileID'=>'iu_files',
            'OrigName'=>$orig   ));
          unlink($this->jservice->temp_file_path().$filename);
       }
	   if (!empty($data)) {
	        $data['scansnils']=$filename;
	        $data['scansnils_ext']=$ext;
       }
    }
//////////////////////////// end support file data for: scansnils
//////////////////////////// support file data for: tmfile
    if ($_FILES['tmfile_fu']['size'] > 0 ) {
       $ext = pathinfo($_FILES['tmfile_fu']['name'], PATHINFO_EXTENSION);
       $orig = pathinfo($_FILES['tmfile_fu']['name'], PATHINFO_BASENAME) ;
       $filename = strtolower(trim($this->jservice->get(array('Action' => 'NewGuid')),'{}') . '.' . $ext);
       if (move_uploaded_file($_FILES['tmfile_fu']['tmp_name'], $this->jservice->temp_file_path().$filename)) {
          $file_data = file_get_contents($this->jservice->temp_file_path().$filename);
          $this->jservice->get(array('Action' => 'AddFile', 'FileName'=>$filename, 'Data'=>utf8_encode($file_data), 'FileID'=>'iu_files',
            'OrigName'=>$orig   ));
          unlink($this->jservice->temp_file_path().$filename);
       }
	   if (!empty($data)) {
	        $data['tmfile']=$filename;
	        $data['tmfile_ext']=$ext;
       }
    }
//////////////////////////// end support file data for: tmfile
	if (!empty($data)) {
	    if (empty($data['iu_tm_recordsid'])) {
	        $data['iu_tm_recordsid'] = $this->jservice->get(array('Action' => 'NewGuid'));
	        $res=$this->jservice->get(array('Action' => 'NewRow', 'PartName' => 'iu_tm_records', 'RowID' => $data['iu_tm_recordsid'], 'DocumentID' => $data['instanceid'], 'Values'=>$data));
	       if(isset($res[0])){
	       	if($res[0]->result!='ok'){
	       		return array('success' => FALSE, 'msg' => $res[0]->result);
	       	} 
	       }else{
	       	return array('success' => FALSE, 'msg' => 'Unknown error' );
	       }
	    }else{
	    $res = $this->jservice->get(array('Action' => 'UpdateRow', 'PartName' => 'iu_tm_records', 'RowID' => $data['iu_tm_recordsid'], 'DocumentID' => $data['instanceid'], 'Values'=>$data));
	       if(isset($res[0])){
	       	if($res[0]->result!='ok'){
	       		return array('success' => FALSE, 'msg' => $res[0]->result);
	       	} 
	       }else{
	       	return array('success' => FALSE, 'msg' => 'Unknown error' );
	       }
	    }
	    return array('success' => TRUE, 'data' => $this->getRow($data['iu_tm_recordsid'] ));
	} else {
	    return array('success' => FALSE, 'msg' => 'No data to store on server');
	}
    }
    function newRow($instanceid,$data)  {
	  $id = $this->jservice->get(array('Action' => 'NewGuid'));
	if ($this->jservice->get(array('Action' => 'NewRow', 'PartName' => 'iu_tm_records', 'RowID' => $id, 'DocumentID' => $instanceid, 'Values'=>$data)) == 'OK') {
	    return array('success' => TRUE, 'data' => $id);
	} else {
	    return array('success' => FALSE, 'msg' => 'Error while create new id');
	}
    }
    function getRows($sort=array())
		{
	    $res = $this->jservice->get(array('Action' => 'GetViewData','Sort'=>$sort,'FieldList'=>'B2G(iu_tm_recordsid) as iu_tm_recordsid, B2G(iu_tm_recordsid) as id,B2G(instanceid) as instanceid, iu_tm_records_BRIEF_F(iu_tm_recordsid , NULL) as  brief,passport,inn,snils,bankinfo,scanpassport,scanpassport_ext,scaninn,scaninn_ext,scansnils,scansnils_ext,info,tmfile,tmfile_ext,thecomment', 'ViewName' => 'iu_tm_records'));
	    if (count($res)) {
	        return $res;
	    } else {
	        return null;
	    }
		}
    function getRowsByInstance($id,$sort=array())
		{
	$res = $this->jservice->get(array('Action' => 'GetViewData','Sort'=>$sort,'FieldList'=>'B2G(iu_tm_recordsid) as iu_tm_recordsid, B2G(iu_tm_recordsid) as id,B2G(instanceid) as instanceid, iu_tm_records_BRIEF_F(iu_tm_recordsid , NULL) as  brief,passport,inn,snils,bankinfo,scanpassport,scanpassport_ext,scaninn,scaninn_ext,scansnils,scansnils_ext,info,tmfile,tmfile_ext,thecomment', 'ViewName' => 'iu_tm_records', 'WhereClause' => 'instanceid=G2B(\''. $id . '\')'));
	if (count($res) == 0) {
	    return null;
	} else {
	    return $res;
	}
		}
    function getRowsByParent($id,$sort=array())
	{
	$res = $this->jservice->get(array('Action' => 'GetViewData','Sort'=>$sort,'FieldList'=>'B2G(iu_tm_recordsid) as iu_tm_recordsid, B2G(iu_tm_recordsid) as id,B2G(instanceid) as instanceid, iu_tm_records_BRIEF_F(iu_tm_recordsid , NULL) as  brief,passport,inn,snils,bankinfo,scanpassport,scanpassport_ext,scaninn,scaninn_ext,scansnils,scansnils_ext,info,tmfile,tmfile_ext,thecomment', 'ViewName' => 'iu_tm_records', 'WhereClause' => ' parentstructrowid=G2B(\''. $id . '\')'));
	if (count($res) == 0) {
	    return null;
	} else {
	    return $res;
	}
  }
    function deleteRow($id = null) {
	  if (!empty($id) && $this->jservice->get(array('Action' => 'DeleteRow', 'PartName' => 'iu_tm_records', 'RowID' => $id)) == 'OK')
	    $result = array('success' => TRUE);
	else
	    $result = array('success' => FALSE, 'msg' => 'Error while deleting record!');
	return $result;
    }
}
?>
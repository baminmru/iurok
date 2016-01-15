
<?php
class  M_iu_tm_acts extends CI_Model {
    function getRowTemp($empId) {
    $result = array('success' => false, 'msg' => 'No Row ID for retrive data');
	if (!empty($empId)){
	    $res = $this->jservice->get(array('Action' => 'GetRowDataTemp','FieldList'=>'B2G(iu_tm_actsid) as iu_tm_actsid, B2G(iu_tm_actsid) as id,B2G(parentstructrowid) as parentid, iu_tm_acts_BRIEF_F(iu_tm_actsid , NULL) as  brief,aktfile,aktfile_ext,paymentfile,paymentfile_ext,  DATE_FORMAT(paymentdate,\'%Y-%m-%d\') as  paymentdate,payment,thecomment,quantity,avancefile,avancefile_ext,aktnum,msgfile,msgfile_ext', 'PartName' => 'iu_tm_acts', 'ID' =>  $empId 	));
	    if (!empty($res)) {
	        $result = $res[0];
	    }
	}
	return $result;
    }
    function getRow($empId) {
    $result = array('success' => false, 'msg' => 'No Row ID for retrive data');
	if (!empty($empId)){
	    $res = $this->jservice->get(array('Action' => 'GetRowData','FieldList'=>'B2G(iu_tm_actsid) as iu_tm_actsid, B2G(iu_tm_actsid) as id,B2G(parentstructrowid) as parentid, iu_tm_acts_BRIEF_F(iu_tm_actsid , NULL) as  brief,aktfile,aktfile_ext,paymentfile,paymentfile_ext,  DATE_FORMAT(paymentdate,\'%Y-%m-%d\') as  paymentdate,payment,thecomment,quantity,avancefile,avancefile_ext,aktnum,msgfile,msgfile_ext', 'PartName' => 'iu_tm_acts', 'ID' =>  $empId 	));
	    if (!empty($res)) {
	        $result = $res[0];
	    }
	}
	return $result;
    }
    function setRow($data)  {
	    $data = (array)$data;
//////////////////////////// support file data for: aktfile
    if ($_FILES['aktfile_fu']['size'] > 0 ) {
       $ext = pathinfo($_FILES['aktfile_fu']['name'], PATHINFO_EXTENSION);
       $orig = pathinfo($_FILES['aktfile_fu']['name'], PATHINFO_BASENAME) ;
       $filename = strtolower(trim($this->jservice->get(array('Action' => 'NewGuid')),'{}') . '.' . $ext);
       if (move_uploaded_file($_FILES['aktfile_fu']['tmp_name'], $this->jservice->temp_file_path().$filename)) {
          $file_data = file_get_contents($this->jservice->temp_file_path().$filename);
          $this->jservice->get(array('Action' => 'AddFile', 'FileName'=>$filename, 'Data'=>utf8_encode($file_data), 'FileID'=>'iu_files',
            'OrigName'=>$orig   ));
          unlink($this->jservice->temp_file_path().$filename);
       }
	   if (!empty($data)) {
	        $data['aktfile']=$filename;
	        $data['aktfile_ext']=$ext;
       }
    }
//////////////////////////// end support file data for: aktfile
//////////////////////////// support file data for: paymentfile
    if ($_FILES['paymentfile_fu']['size'] > 0 ) {
       $ext = pathinfo($_FILES['paymentfile_fu']['name'], PATHINFO_EXTENSION);
       $orig = pathinfo($_FILES['paymentfile_fu']['name'], PATHINFO_BASENAME) ;
       $filename = strtolower(trim($this->jservice->get(array('Action' => 'NewGuid')),'{}') . '.' . $ext);
       if (move_uploaded_file($_FILES['paymentfile_fu']['tmp_name'], $this->jservice->temp_file_path().$filename)) {
          $file_data = file_get_contents($this->jservice->temp_file_path().$filename);
          $this->jservice->get(array('Action' => 'AddFile', 'FileName'=>$filename, 'Data'=>utf8_encode($file_data), 'FileID'=>'iu_files',
            'OrigName'=>$orig   ));
          unlink($this->jservice->temp_file_path().$filename);
       }
	   if (!empty($data)) {
	        $data['paymentfile']=$filename;
	        $data['paymentfile_ext']=$ext;
       }
    }
//////////////////////////// end support file data for: paymentfile
//////////////////////////// support file data for: avancefile
    if ($_FILES['avancefile_fu']['size'] > 0 ) {
       $ext = pathinfo($_FILES['avancefile_fu']['name'], PATHINFO_EXTENSION);
       $orig = pathinfo($_FILES['avancefile_fu']['name'], PATHINFO_BASENAME) ;
       $filename = strtolower(trim($this->jservice->get(array('Action' => 'NewGuid')),'{}') . '.' . $ext);
       if (move_uploaded_file($_FILES['avancefile_fu']['tmp_name'], $this->jservice->temp_file_path().$filename)) {
          $file_data = file_get_contents($this->jservice->temp_file_path().$filename);
          $this->jservice->get(array('Action' => 'AddFile', 'FileName'=>$filename, 'Data'=>utf8_encode($file_data), 'FileID'=>'iu_files',
            'OrigName'=>$orig   ));
          unlink($this->jservice->temp_file_path().$filename);
       }
	   if (!empty($data)) {
	        $data['avancefile']=$filename;
	        $data['avancefile_ext']=$ext;
       }
    }
//////////////////////////// end support file data for: avancefile
//////////////////////////// support file data for: msgfile
    if ($_FILES['msgfile_fu']['size'] > 0 ) {
       $ext = pathinfo($_FILES['msgfile_fu']['name'], PATHINFO_EXTENSION);
       $orig = pathinfo($_FILES['msgfile_fu']['name'], PATHINFO_BASENAME) ;
       $filename = strtolower(trim($this->jservice->get(array('Action' => 'NewGuid')),'{}') . '.' . $ext);
       if (move_uploaded_file($_FILES['msgfile_fu']['tmp_name'], $this->jservice->temp_file_path().$filename)) {
          $file_data = file_get_contents($this->jservice->temp_file_path().$filename);
          $this->jservice->get(array('Action' => 'AddFile', 'FileName'=>$filename, 'Data'=>utf8_encode($file_data), 'FileID'=>'iu_files',
            'OrigName'=>$orig   ));
          unlink($this->jservice->temp_file_path().$filename);
       }
	   if (!empty($data)) {
	        $data['msgfile']=$filename;
	        $data['msgfile_ext']=$ext;
       }
    }
//////////////////////////// end support file data for: msgfile
	if (!empty($data)) {
	    if (empty($data['iu_tm_actsid'])) {
	        $data['iu_tm_actsid'] = $this->jservice->get(array('Action' => 'NewGuid'));
	        $res=$this->jservice->get(array('Action' => 'NewRow', 'PartName' => 'iu_tm_acts', 'RowID' => $data['iu_tm_actsid'], 'DocumentID' => $data['instanceid'],'ParentID' => $data['parentid'], 'Values'=>$data));
	       if(isset($res[0])){
	       	if($res[0]->result!='ok'){
	       		return array('success' => FALSE, 'msg' => $res[0]->result);
	       	} 
	       }else{
	       	return array('success' => FALSE, 'msg' => 'Unknown error' );
	       }
	    }else{
	    $res = $this->jservice->get(array('Action' => 'UpdateRow', 'PartName' => 'iu_tm_acts', 'RowID' => $data['iu_tm_actsid'], 'DocumentID' => $data['instanceid'],'ParentID' => $data['parentid'], 'Values'=>$data));
	       if(isset($res[0])){
	       	if($res[0]->result!='ok'){
	       		return array('success' => FALSE, 'msg' => $res[0]->result);
	       	} 
	       }else{
	       	return array('success' => FALSE, 'msg' => 'Unknown error' );
	       }
	    }
	    return array('success' => TRUE, 'data' => $this->getRowTemp($data['iu_tm_actsid'] ));
	} else {
	    return array('success' => FALSE, 'msg' => 'No data to store on server');
	}
    }
    function newRow($instanceid,$parentid,$data)  {
	  $id = $this->jservice->get(array('Action' => 'NewGuid'));
	if ($this->jservice->get(array('Action' => 'NewRow', 'PartName' => 'iu_tm_acts', 'RowID' => $id, 'DocumentID' => $instanceid,'ParentID'=>$parentid, 'Values'=>$data)) == 'OK') {
	    return array('success' => TRUE, 'data' => $id);
	} else {
	    return array('success' => FALSE, 'msg' => 'Error while create new id');
	}
    }
    function getRowsTemp($sort=array())
		{
	    $res = $this->jservice->get(array('Action' => 'GetViewDataTemp','Sort'=>$sort,'FieldList'=>'B2G(iu_tm_actsid) as iu_tm_actsid, B2G(iu_tm_actsid) as id,B2G(parentstructrowid) as parentid, iu_tm_acts_BRIEF_F(iu_tm_actsid , NULL) as  brief,aktfile,aktfile_ext,paymentfile,paymentfile_ext,  DATE_FORMAT(paymentdate,\'%Y-%m-%d\') as  paymentdate,payment,thecomment,quantity,avancefile,avancefile_ext,aktnum,msgfile,msgfile_ext', 'ViewName' => 'iu_tm_acts'));
	    if (count($res)) {
	        return $res;
	    } else {
	        return null;
	    }
		}
    function getRowsByInstanceTemp($id,$sort=array())
		{
	$res = $this->jservice->get(array('Action' => 'GetViewDataTemp','Sort'=>$sort,'FieldList'=>'B2G(iu_tm_actsid) as iu_tm_actsid, B2G(iu_tm_actsid) as id,B2G(parentstructrowid) as parentid, iu_tm_acts_BRIEF_F(iu_tm_actsid , NULL) as  brief,aktfile,aktfile_ext,paymentfile,paymentfile_ext,  DATE_FORMAT(paymentdate,\'%Y-%m-%d\') as  paymentdate,payment,thecomment,quantity,avancefile,avancefile_ext,aktnum,msgfile,msgfile_ext', 'ViewName' => 'iu_tm_acts', 'WhereClause' => 'instanceid=G2B(\''. $id . '\')'));
	if (count($res) == 0) {
	    return null;
	} else {
	    return $res;
	}
		}
    function getRowsByParentTemp($id,$sort=array())
	{
	$res = $this->jservice->get(array('Action' => 'GetViewDataTemp','Sort'=>$sort,'FieldList'=>'B2G(iu_tm_actsid) as iu_tm_actsid, B2G(iu_tm_actsid) as id,B2G(parentstructrowid) as parentid, iu_tm_acts_BRIEF_F(iu_tm_actsid , NULL) as  brief,aktfile,aktfile_ext,paymentfile,paymentfile_ext,  DATE_FORMAT(paymentdate,\'%Y-%m-%d\') as  paymentdate,payment,thecomment,quantity,avancefile,avancefile_ext,aktnum,msgfile,msgfile_ext', 'ViewName' => 'iu_tm_acts', 'WhereClause' => ' parentstructrowid=G2B(\''. $id . '\')'));
	if (count($res) == 0) {
	    return null;
	} else {
	    return $res;
	}
  }
    function getRows($sort=array())
		{
	    $res = $this->jservice->get(array('Action' => 'GetViewData','Sort'=>$sort,'FieldList'=>'B2G(iu_tm_actsid) as iu_tm_actsid, B2G(iu_tm_actsid) as id,B2G(parentstructrowid) as parentid, iu_tm_acts_BRIEF_F(iu_tm_actsid , NULL) as  brief,aktfile,aktfile_ext,paymentfile,paymentfile_ext,  DATE_FORMAT(paymentdate,\'%Y-%m-%d\') as  paymentdate,payment,thecomment,quantity,avancefile,avancefile_ext,aktnum,msgfile,msgfile_ext', 'ViewName' => 'iu_tm_acts'));
	    if (count($res)) {
	        return $res;
	    } else {
	        return null;
	    }
		}
    function getRowsByInstance($id,$sort=array())
		{
	$res = $this->jservice->get(array('Action' => 'GetViewData','Sort'=>$sort,'FieldList'=>'B2G(iu_tm_actsid) as iu_tm_actsid, B2G(iu_tm_actsid) as id,B2G(parentstructrowid) as parentid, iu_tm_acts_BRIEF_F(iu_tm_actsid , NULL) as  brief,aktfile,aktfile_ext,paymentfile,paymentfile_ext,  DATE_FORMAT(paymentdate,\'%Y-%m-%d\') as  paymentdate,payment,thecomment,quantity,avancefile,avancefile_ext,aktnum,msgfile,msgfile_ext', 'ViewName' => 'iu_tm_acts', 'WhereClause' => 'instanceid=G2B(\''. $id . '\')'));
	if (count($res) == 0) {
	    return null;
	} else {
	    return $res;
	}
		}
    function getRowsByParent($id,$sort=array())
	{
	$res = $this->jservice->get(array('Action' => 'GetViewData','Sort'=>$sort,'FieldList'=>'B2G(iu_tm_actsid) as iu_tm_actsid, B2G(iu_tm_actsid) as id,B2G(parentstructrowid) as parentid, iu_tm_acts_BRIEF_F(iu_tm_actsid , NULL) as  brief,aktfile,aktfile_ext,paymentfile,paymentfile_ext,  DATE_FORMAT(paymentdate,\'%Y-%m-%d\') as  paymentdate,payment,thecomment,quantity,avancefile,avancefile_ext,aktnum,msgfile,msgfile_ext', 'ViewName' => 'iu_tm_acts', 'WhereClause' => ' parentstructrowid=G2B(\''. $id . '\')'));
	if (count($res) == 0) {
	    return null;
	} else {
	    return $res;
	}
  }
    function deleteRow($id = null) {
	  if (!empty($id) && $this->jservice->get(array('Action' => 'DeleteRow', 'PartName' => 'iu_tm_acts', 'RowID' => $id)) == 'OK')
	    $result = array('success' => TRUE);
	else
	    $result = array('success' => FALSE, 'msg' => 'Error while deleting record!');
	return $result;
    }
}
?>
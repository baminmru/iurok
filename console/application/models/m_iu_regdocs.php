
<?php
class  M_iu_regdocs extends CI_Model {
    function getRow($empId) {
    $result = array('success' => false, 'msg' => 'No Row ID for retrive data');
	if (!empty($empId)){
	    $res = $this->jservice->get(array('Action' => 'GetRowData','FieldList'=>'B2G(iu_regdocsid) as iu_regdocsid, B2G(iu_regdocsid) as id,B2G(parentstructrowid) as parentid, iu_regdocs_BRIEF_F(iu_regdocsid , NULL) as  brief,docname,thedoc,thedoc_ext,thecomment,origname', 'PartName' => 'iu_regdocs', 'ID' =>  $empId 	));
	    if (!empty($res)) {
	        $result = $res[0];
	    }
	}
	return $result;
    }
    function setRow($data)  {
	    $data = (array)$data;
//////////////////////////// support file data for: thedoc
    if ($_FILES['thedoc_fu']['size'] > 0 ) {
       $ext = pathinfo($_FILES['thedoc_fu']['name'], PATHINFO_EXTENSION);
       $orig = pathinfo($_FILES['thedoc_fu']['name'], PATHINFO_BASENAME) ;
       $filename = strtolower(trim($this->jservice->get(array('Action' => 'NewGuid')),'{}') . '.' . $ext);
       if (move_uploaded_file($_FILES['thedoc_fu']['tmp_name'], $this->jservice->temp_file_path().$filename)) {
          $file_data = file_get_contents($this->jservice->temp_file_path().$filename);
          $this->jservice->get(array('Action' => 'AddFile', 'FileName'=>$filename, 'Data'=>utf8_encode($file_data), 'FileID'=>'iu_files',
            'OrigName'=>$orig   ));
          unlink($this->jservice->temp_file_path().$filename);
       }
	   if (!empty($data)) {
	        $data['thedoc']=$filename;
	        $data['thedoc_ext']=$ext;
       }
    }
//////////////////////////// end support file data for: thedoc
	if (!empty($data)) {
	    if (empty($data['iu_regdocsid'])) {
	        $data['iu_regdocsid'] = $this->jservice->get(array('Action' => 'NewGuid'));
	        $res=$this->jservice->get(array('Action' => 'NewRow', 'PartName' => 'iu_regdocs', 'RowID' => $data['iu_regdocsid'], 'DocumentID' => $data['instanceid'],'ParentID' => $data['parentid'], 'Values'=>$data));
	       if(isset($res[0])){
	       	if($res[0]->result!='ok'){
	       		return array('success' => FALSE, 'msg' => $res[0]->result);
	       	} 
	       }else{
	       	return array('success' => FALSE, 'msg' => 'Unknown error' );
	       }
	    }else{
	    $res = $this->jservice->get(array('Action' => 'UpdateRow', 'PartName' => 'iu_regdocs', 'RowID' => $data['iu_regdocsid'], 'DocumentID' => $data['instanceid'],'ParentID' => $data['parentid'], 'Values'=>$data));
	       if(isset($res[0])){
	       	if($res[0]->result!='ok'){
	       		return array('success' => FALSE, 'msg' => $res[0]->result);
	       	} 
	       }else{
	       	return array('success' => FALSE, 'msg' => 'Unknown error' );
	       }
	    }
	    return array('success' => TRUE, 'data' => $this->getRow($data['iu_regdocsid'] ));
	} else {
	    return array('success' => FALSE, 'msg' => 'No data to store on server');
	}
    }
    function newRow($instanceid,$parentid,$data)  {
	  $id = $this->jservice->get(array('Action' => 'NewGuid'));
	if ($this->jservice->get(array('Action' => 'NewRow', 'PartName' => 'iu_regdocs', 'RowID' => $id, 'DocumentID' => $instanceid,'ParentID'=>$parentid, 'Values'=>$data)) == 'OK') {
	    return array('success' => TRUE, 'data' => $id);
	} else {
	    return array('success' => FALSE, 'msg' => 'Error while create new id');
	}
    }
    function getRows($sort=array())
		{
	    $res = $this->jservice->get(array('Action' => 'GetViewData','Sort'=>$sort,'FieldList'=>'B2G(iu_regdocsid) as iu_regdocsid, B2G(iu_regdocsid) as id,B2G(parentstructrowid) as parentid, iu_regdocs_BRIEF_F(iu_regdocsid , NULL) as  brief,docname,thedoc,thedoc_ext,thecomment,origname', 'ViewName' => 'iu_regdocs'));
	    if (count($res)) {
	        return $res;
	    } else {
	        return null;
	    }
		}
    function getRowsByInstance($id,$sort=array())
		{
	$res = $this->jservice->get(array('Action' => 'GetViewData','Sort'=>$sort,'FieldList'=>'B2G(iu_regdocsid) as iu_regdocsid, B2G(iu_regdocsid) as id,B2G(parentstructrowid) as parentid, iu_regdocs_BRIEF_F(iu_regdocsid , NULL) as  brief,docname,thedoc,thedoc_ext,thecomment,origname', 'ViewName' => 'iu_regdocs', 'WhereClause' => 'instanceid=G2B(\''. $id . '\')'));
	if (count($res) == 0) {
	    return null;
	} else {
	    return $res;
	}
		}
    function getRowsByParent($id,$sort=array())
	{
	$res = $this->jservice->get(array('Action' => 'GetViewData','Sort'=>$sort,'FieldList'=>'B2G(iu_regdocsid) as iu_regdocsid, B2G(iu_regdocsid) as id,B2G(parentstructrowid) as parentid, iu_regdocs_BRIEF_F(iu_regdocsid , NULL) as  brief,docname,thedoc,thedoc_ext,thecomment,origname', 'ViewName' => 'iu_regdocs', 'WhereClause' => ' parentstructrowid=G2B(\''. $id . '\')'));
	if (count($res) == 0) {
	    return null;
	} else {
	    return $res;
	}
  }
    function deleteRow($id = null) {
	  if (!empty($id) && $this->jservice->get(array('Action' => 'DeleteRow', 'PartName' => 'iu_regdocs', 'RowID' => $id)) == 'OK')
	    $result = array('success' => TRUE);
	else
	    $result = array('success' => FALSE, 'msg' => 'Error while deleting record!');
	return $result;
    }
}
?>
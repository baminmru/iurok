
<?php
class  M_iu_urok_docs extends CI_Model {
    function getRow($empId) {
    $result = array('success' => false, 'msg' => 'No Row ID for retrive data');
	if (!empty($empId)){
	    $res = $this->jservice->get(array('Action' => 'GetRowData','FieldList'=>'B2G(iu_urok_docsid) as iu_urok_docsid, B2G(iu_urok_docsid) as id,B2G(instanceid) as instanceid, iu_urok_docs_BRIEF_F(iu_urok_docsid , NULL) as  brief,B2G(DocType) doctype, iud_doctype_BRIEF_F(doctype, NULL) as doctype_grid,B2G(AddBy) addby, iu_u_def_BRIEF_F(addby, NULL) as addby_grid,  DATE_FORMAT(adddate,\'%Y-%m-%d %H:%i:%s\') as  adddate,version,activeversion, case activeversion  when -1 then \'Да\' when 0 then \'Нет\'End  as activeversion_grid,B2G(filereftype) filereftype, iud_rt_def_BRIEF_F(filereftype, NULL) as filereftype_grid,fileref,fileref_ext,fileurl,filetext,info,origname', 'PartName' => 'iu_urok_docs', 'ID' =>  $empId 	));
	    if (!empty($res)) {
	        $result = $res[0];
	    }
	}
	return $result;
    }
    function setRow($data)  {
	    $data = (array)$data;
//////////////////////////// support file data for: fileref
    if ($_FILES['fileref_fu']['size'] > 0 ) {
       $ext = pathinfo($_FILES['fileref_fu']['name'], PATHINFO_EXTENSION);
       $orig = pathinfo($_FILES['fileref_fu']['name'], PATHINFO_BASENAME) ;
       $filename = strtolower(trim($this->jservice->get(array('Action' => 'NewGuid')),'{}') . '.' . $ext);
       if (move_uploaded_file($_FILES['fileref_fu']['tmp_name'], $this->jservice->temp_file_path().$filename)) {
          $file_data = file_get_contents($this->jservice->temp_file_path().$filename);
          $this->jservice->get(array('Action' => 'AddFile', 'FileName'=>$filename, 'Data'=>utf8_encode($file_data), 'FileID'=>'iu_files',
            'OrigName'=>$orig   ));
          unlink($this->jservice->temp_file_path().$filename);
       }
	   if (!empty($data)) {
	        $data['fileref']=$filename;
	        $data['fileref_ext']=$ext;
       }
    }
//////////////////////////// end support file data for: fileref
	if (!empty($data)) {
	    if (empty($data['iu_urok_docsid'])) {
	        $data['iu_urok_docsid'] = $this->jservice->get(array('Action' => 'NewGuid'));
	        $res=$this->jservice->get(array('Action' => 'NewRow', 'PartName' => 'iu_urok_docs', 'RowID' => $data['iu_urok_docsid'], 'DocumentID' => $data['instanceid'], 'Values'=>$data));
	       if(isset($res[0])){
	       	if($res[0]->result!='ok'){
	       		return array('success' => FALSE, 'msg' => $res[0]->result);
	       	} 
	       }else{
	       	return array('success' => FALSE, 'msg' => 'Unknown error' );
	       }
	    }else{
	    $res = $this->jservice->get(array('Action' => 'UpdateRow', 'PartName' => 'iu_urok_docs', 'RowID' => $data['iu_urok_docsid'], 'DocumentID' => $data['instanceid'], 'Values'=>$data));
	       if(isset($res[0])){
	       	if($res[0]->result!='ok'){
	       		return array('success' => FALSE, 'msg' => $res[0]->result);
	       	} 
	       }else{
	       	return array('success' => FALSE, 'msg' => 'Unknown error' );
	       }
	    }
	    return array('success' => TRUE, 'data' => $this->getRow($data['iu_urok_docsid'] ));
	} else {
	    return array('success' => FALSE, 'msg' => 'No data to store on server');
	}
    }
    function newRow($instanceid,$data)  {
	  $id = $this->jservice->get(array('Action' => 'NewGuid'));
	if ($this->jservice->get(array('Action' => 'NewRow', 'PartName' => 'iu_urok_docs', 'RowID' => $id, 'DocumentID' => $instanceid, 'Values'=>$data)) == 'OK') {
	    return array('success' => TRUE, 'data' => $id);
	} else {
	    return array('success' => FALSE, 'msg' => 'Error while create new id');
	}
    }
    function getRows($sort=array())
		{
	    $res = $this->jservice->get(array('Action' => 'GetViewData','Sort'=>$sort,'FieldList'=>'B2G(iu_urok_docsid) as iu_urok_docsid, B2G(iu_urok_docsid) as id,B2G(instanceid) as instanceid, iu_urok_docs_BRIEF_F(iu_urok_docsid , NULL) as  brief,B2G(DocType) doctype, iud_doctype_BRIEF_F(doctype, NULL) as doctype_grid,B2G(AddBy) addby, iu_u_def_BRIEF_F(addby, NULL) as addby_grid,  DATE_FORMAT(adddate,\'%Y-%m-%d %H:%i:%s\') as  adddate,version,activeversion, case activeversion  when -1 then \'Да\' when 0 then \'Нет\'End  as activeversion_grid,B2G(filereftype) filereftype, iud_rt_def_BRIEF_F(filereftype, NULL) as filereftype_grid,fileref,fileref_ext,fileurl,filetext,info,origname', 'ViewName' => 'iu_urok_docs'));
	    if (count($res)) {
	        return $res;
	    } else {
	        return null;
	    }
		}
    function getRowsByInstance($id,$sort=array())
		{
	$res = $this->jservice->get(array('Action' => 'GetViewData','Sort'=>$sort,'FieldList'=>'B2G(iu_urok_docsid) as iu_urok_docsid, B2G(iu_urok_docsid) as id,B2G(instanceid) as instanceid, iu_urok_docs_BRIEF_F(iu_urok_docsid , NULL) as  brief,B2G(DocType) doctype, iud_doctype_BRIEF_F(doctype, NULL) as doctype_grid,B2G(AddBy) addby, iu_u_def_BRIEF_F(addby, NULL) as addby_grid,  DATE_FORMAT(adddate,\'%Y-%m-%d %H:%i:%s\') as  adddate,version,activeversion, case activeversion  when -1 then \'Да\' when 0 then \'Нет\'End  as activeversion_grid,B2G(filereftype) filereftype, iud_rt_def_BRIEF_F(filereftype, NULL) as filereftype_grid,fileref,fileref_ext,fileurl,filetext,info,origname', 'ViewName' => 'iu_urok_docs', 'WhereClause' => 'instanceid=G2B(\''. $id . '\')'));
	if (count($res) == 0) {
	    return null;
	} else {
	    return $res;
	}
		}
    function getRowsByParent($id,$sort=array())
	{
	$res = $this->jservice->get(array('Action' => 'GetViewData','Sort'=>$sort,'FieldList'=>'B2G(iu_urok_docsid) as iu_urok_docsid, B2G(iu_urok_docsid) as id,B2G(instanceid) as instanceid, iu_urok_docs_BRIEF_F(iu_urok_docsid , NULL) as  brief,B2G(DocType) doctype, iud_doctype_BRIEF_F(doctype, NULL) as doctype_grid,B2G(AddBy) addby, iu_u_def_BRIEF_F(addby, NULL) as addby_grid,  DATE_FORMAT(adddate,\'%Y-%m-%d %H:%i:%s\') as  adddate,version,activeversion, case activeversion  when -1 then \'Да\' when 0 then \'Нет\'End  as activeversion_grid,B2G(filereftype) filereftype, iud_rt_def_BRIEF_F(filereftype, NULL) as filereftype_grid,fileref,fileref_ext,fileurl,filetext,info,origname', 'ViewName' => 'iu_urok_docs', 'WhereClause' => ' parentstructrowid=G2B(\''. $id . '\')'));
	if (count($res) == 0) {
	    return null;
	} else {
	    return $res;
	}
  }
    function deleteRow($id = null) {
	  if (!empty($id) && $this->jservice->get(array('Action' => 'DeleteRow', 'PartName' => 'iu_urok_docs', 'RowID' => $id)) == 'OK')
	    $result = array('success' => TRUE);
	else
	    $result = array('success' => FALSE, 'msg' => 'Error while deleting record!');
	return $result;
    }
}
?>
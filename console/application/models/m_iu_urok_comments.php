
<?php
class  M_iu_urok_comments extends CI_Model {
    function getRow($empId) {
    $result = array('success' => false, 'msg' => 'No Row ID for retrive data');
	if (!empty($empId)){
	    $res = $this->jservice->get(array('Action' => 'GetRowData','FieldList'=>'B2G(iu_urok_commentsid) as iu_urok_commentsid, B2G(iu_urok_commentsid) as id,B2G(parentstructrowid) as parentid, iu_urok_comments_BRIEF_F(iu_urok_commentsid , NULL) as  brief,info,timemarker,B2G(TheAuthor) theauthor, iu_u_def_BRIEF_F(theauthor, NULL) as theauthor_grid,  DATE_FORMAT(thedate,\'%Y-%m-%d %H:%i:%s\') as  thedate', 'PartName' => 'iu_urok_comments', 'ID' =>  $empId 	));
	    if (!empty($res)) {
	        $result = $res[0];
	    }
	}
	return $result;
    }
    function setRow($data)  {
	    $data = (array)$data;
	if (!empty($data)) {
	    if (empty($data['iu_urok_commentsid'])) {
	        $data['iu_urok_commentsid'] = $this->jservice->get(array('Action' => 'NewGuid'));
	        $res=$this->jservice->get(array('Action' => 'NewRow', 'PartName' => 'iu_urok_comments', 'RowID' => $data['iu_urok_commentsid'], 'DocumentID' => $data['instanceid'],'ParentID' => $data['parentid'], 'Values'=>$data));
	       if(isset($res[0])){
	       	if($res[0]->result!='ok'){
	       		return array('success' => FALSE, 'msg' => $res[0]->result);
	       	} 
	       }else{
	       	return array('success' => FALSE, 'msg' => 'Unknown error' );
	       }
	    }else{
	    $res = $this->jservice->get(array('Action' => 'UpdateRow', 'PartName' => 'iu_urok_comments', 'RowID' => $data['iu_urok_commentsid'], 'DocumentID' => $data['instanceid'],'ParentID' => $data['parentid'], 'Values'=>$data));
	       if(isset($res[0])){
	       	if($res[0]->result!='ok'){
	       		return array('success' => FALSE, 'msg' => $res[0]->result);
	       	} 
	       }else{
	       	return array('success' => FALSE, 'msg' => 'Unknown error' );
	       }
	    }
	    return array('success' => TRUE, 'data' => $this->getRow($data['iu_urok_commentsid'] ));
	} else {
	    return array('success' => FALSE, 'msg' => 'No data to store on server');
	}
    }
    function newRow($instanceid,$parentid,$data)  {
	  $id = $this->jservice->get(array('Action' => 'NewGuid'));
	if ($this->jservice->get(array('Action' => 'NewRow', 'PartName' => 'iu_urok_comments', 'RowID' => $id, 'DocumentID' => $instanceid,'ParentID'=>$parentid, 'Values'=>$data)) == 'OK') {
	    return array('success' => TRUE, 'data' => $id);
	} else {
	    return array('success' => FALSE, 'msg' => 'Error while create new id');
	}
    }
    function getRows($sort=array())
		{
	    $res = $this->jservice->get(array('Action' => 'GetViewData','Sort'=>$sort,'FieldList'=>'B2G(iu_urok_commentsid) as iu_urok_commentsid, B2G(iu_urok_commentsid) as id,B2G(parentstructrowid) as parentid, iu_urok_comments_BRIEF_F(iu_urok_commentsid , NULL) as  brief,info,timemarker,B2G(TheAuthor) theauthor, iu_u_def_BRIEF_F(theauthor, NULL) as theauthor_grid,  DATE_FORMAT(thedate,\'%Y-%m-%d %H:%i:%s\') as  thedate', 'ViewName' => 'iu_urok_comments'));
	    if (count($res)) {
	        return $res;
	    } else {
	        return null;
	    }
		}
    function getRowsByInstance($id,$sort=array())
		{
	$res = $this->jservice->get(array('Action' => 'GetViewData','Sort'=>$sort,'FieldList'=>'B2G(iu_urok_commentsid) as iu_urok_commentsid, B2G(iu_urok_commentsid) as id,B2G(parentstructrowid) as parentid, iu_urok_comments_BRIEF_F(iu_urok_commentsid , NULL) as  brief,info,timemarker,B2G(TheAuthor) theauthor, iu_u_def_BRIEF_F(theauthor, NULL) as theauthor_grid,  DATE_FORMAT(thedate,\'%Y-%m-%d %H:%i:%s\') as  thedate', 'ViewName' => 'iu_urok_comments', 'WhereClause' => 'instanceid=G2B(\''. $id . '\')'));
	if (count($res) == 0) {
	    return null;
	} else {
	    return $res;
	}
		}
    function getRowsByParent($id,$sort=array())
	{
	$res = $this->jservice->get(array('Action' => 'GetViewData','Sort'=>$sort,'FieldList'=>'B2G(iu_urok_commentsid) as iu_urok_commentsid, B2G(iu_urok_commentsid) as id,B2G(parentstructrowid) as parentid, iu_urok_comments_BRIEF_F(iu_urok_commentsid , NULL) as  brief,info,timemarker,B2G(TheAuthor) theauthor, iu_u_def_BRIEF_F(theauthor, NULL) as theauthor_grid,  DATE_FORMAT(thedate,\'%Y-%m-%d %H:%i:%s\') as  thedate', 'ViewName' => 'iu_urok_comments', 'WhereClause' => ' parentstructrowid=G2B(\''. $id . '\')'));
	if (count($res) == 0) {
	    return null;
	} else {
	    return $res;
	}
  }
    function deleteRow($id = null) {
	  if (!empty($id) && $this->jservice->get(array('Action' => 'DeleteRow', 'PartName' => 'iu_urok_comments', 'RowID' => $id)) == 'OK')
	    $result = array('success' => TRUE);
	else
	    $result = array('success' => FALSE, 'msg' => 'Error while deleting record!');
	return $result;
    }
}
?>
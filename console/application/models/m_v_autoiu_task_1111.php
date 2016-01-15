
<?php
class  M_v_autoiu_task extends CI_Model {
    public function  __construct()
    {
         parent::__construct();
    }
    function newRow($objtype,$name)  {
               $id = $this->jservice->get(array('Action'=>'NewGuid'));
               $this->jservice->get(array('Action'=>'NewDocument', 'TypeName'=>'iu_t', 'DocumentID'=>$id, 'DocumentCaption'=>$name));
               $rowid = $this->jservice->get(array('Action'=>'NewGuid'));
               $this->jservice->get(array('Action'=>'NewRow', 'PartName'=>'iu_task', 'RowID'=>$rowid, 'DocumentID'=>$id));
                if ($id) {
                    return array('success'=>TRUE, 'data' => $id, 'rowid'=>$rowid);
                }
                else {
                    $return= array('success'=>FALSE, 'msg' => 'Error while create new id');
				    return $return;
                }
    }
      function getRowsSL($offset,$limit, $sort = array(), $filter = null)
{
        $filter = (array)json_decode($filter);
       	$cond ='';
        $whereclause = '';
    try{
	    foreach($filter as $obj) {
		    $tmp = json_decode($obj->value);
		    if(is_array($tmp)) $obj->value = $tmp;	
		    switch($obj->property) {
			    //case 'value':
			    	//$cond = '';
			    	//break;
			  case 'iu_task_createdate_le':
			  $cond = 'iu_task_createdate<="'.$obj->value.'"';
			  break;
			  case 'iu_task_createdate_ge':
			  $cond = 'iu_task_createdate>="'.$obj->value.'"';
			  break;
			  case 'iu_task_senttodoer_le':
			  $cond = 'iu_task_senttodoer<="'.$obj->value.'"';
			  break;
			  case 'iu_task_senttodoer_ge':
			  $cond = 'iu_task_senttodoer>="'.$obj->value.'"';
			  break;
			  case 'iu_task_planenddate_le':
			  $cond = 'iu_task_planenddate<="'.$obj->value.'"';
			  break;
			  case 'iu_task_planenddate_ge':
			  $cond = 'iu_task_planenddate>="'.$obj->value.'"';
			  break;
			  case 'iu_task_finishdate_le':
			  $cond = 'iu_task_finishdate<="'.$obj->value.'"';
			  break;
			  case 'iu_task_finishdate_ge':
			  $cond = 'iu_task_finishdate>="'.$obj->value.'"';
			  break;
		    	default:
			    	if(isset($obj->value))
			    	{
			    		if(is_array($obj->value))
				    	{
				    		$cond = $obj->property . ' IN ("' . implode('", "',$obj->value).'") ';
				    		//echo $cond;
					    }else
					    {
					    	$cond = $obj->property . ' LIKE "%' . $obj->value . '%"';
					    }
				    }else{
				        $cond='1=1';
				    }
		    }
		    $whereclause .= (empty($whereclause)) ? $cond : ' AND ' . $cond;
	    }
    }catch(Exception $e) {
	    log_message('error','Exception: '. $e->getMessage());
    }
	 if (isset($offset) && isset($limit)) {
	    $res = $this->jservice->get(array('Action' => 'GetViewData', 'ViewName' => 'v_autoiu_task','FieldList'=>'ucode,urokid,instanceid,id,DATE_FORMAT(iu_task_createdate,\'%Y-%m-%d %H:%i:%s\') iu_task_createdate,iu_task_ischecked,iu_task_taskfinished,iu_task_info,iu_task_contoller,iu_task_doer,iu_task_processstatus,iu_task_subj,DATE_FORMAT(iu_task_senttodoer,\'%Y-%m-%d %H:%i:%s\') iu_task_senttodoer,DATE_FORMAT(iu_task_planenddate,\'%Y-%m-%d %H:%i:%s\') iu_task_planenddate,iu_task_theprocess,iu_task_statetask,DATE_FORMAT(iu_task_finishdate,\'%Y-%m-%d %H:%i:%s\') iu_task_finishdate','Sort'=>$sort, 'WhereClause' => $whereclause,'Limit'=>$limit,'Offset'=>$offset));
	} else {
	    $res = $this->jservice->get(array('Action' => 'GetViewData', 'ViewName' => 'v_autoiu_task','FieldList'=>'ucode,urokid,instanceid,id,DATE_FORMAT(iu_task_createdate,\'%Y-%m-%d %H:%i:%s\') iu_task_createdate,iu_task_ischecked,iu_task_taskfinished,iu_task_info,iu_task_contoller,iu_task_doer,iu_task_processstatus,iu_task_subj,DATE_FORMAT(iu_task_senttodoer,\'%Y-%m-%d %H:%i:%s\') iu_task_senttodoer,DATE_FORMAT(iu_task_planenddate,\'%Y-%m-%d %H:%i:%s\') iu_task_planenddate,iu_task_theprocess,iu_task_statetask,DATE_FORMAT(iu_task_finishdate,\'%Y-%m-%d %H:%i:%s\') iu_task_finishdate','Sort'=>$sort, 'WhereClause' => $whereclause));
	}
	$root = new stdClass();
	$root->total = $this->jservice->get(array('Action' => 'CountView', 'ViewName' => 'v_autoiu_task','FieldList'=>'ucode,urokid,instanceid,id,DATE_FORMAT(iu_task_createdate,\'%Y-%m-%d %H:%i:%s\') iu_task_createdate,iu_task_ischecked,iu_task_taskfinished,iu_task_info,iu_task_contoller,iu_task_doer,iu_task_processstatus,iu_task_subj,DATE_FORMAT(iu_task_senttodoer,\'%Y-%m-%d %H:%i:%s\') iu_task_senttodoer,DATE_FORMAT(iu_task_planenddate,\'%Y-%m-%d %H:%i:%s\') iu_task_planenddate,iu_task_theprocess,iu_task_statetask,DATE_FORMAT(iu_task_finishdate,\'%Y-%m-%d %H:%i:%s\') iu_task_finishdate', 'WhereClause' => $whereclause));
	$root->success = true;
	$root->rows = $res;
	return $root;
}
    function deleteRow($id = null) {
	    $this->jservice->get(array('Action'=>'DeleteDocument', 'TypeName'=>'iu_t', 'DocumentID'=>$id));
	    $return = array('success' => true);
	    return $return;
    }
}
?>
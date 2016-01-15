
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
      function getRowsSL($offset,$limit, $sort = array(), $filter = null, $archived=0)
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
					
			   case 'urokdone':
			   switch($obj->value) {
				 
				   case '1':
						$cond = " (iu_task_urokdone=-1) ";
				   break;
				   
				   case '0':
						$cond = " (iu_task_urokdone=0) ";
				   break;
				   
				   case '2':
						$cond = " ( (iu_task_urokdone=0 ) or (iu_task_urokdone=-1 and ( iu_task_finishdate is null or DATEDIFF(now(),iu_task_finishdate) < 61) ) ) ";
				   break;
			   }
				break;	
			  case 'filtermode':
			   switch($obj->value) {
				   case 'all':
						$cond = " (iu_task_urokdone=0) ";
				   break;
				   case 'done':
					   $cond = "( ( ( iu_task_taskfinished_val=-1 or iu_task_taskcancelled_val=-1) and iu_task_contoller='') or  ( iu_task_contoller<>'' and (iu_task_ischecked_val=-1 or iu_task_taskcancelled_val=-1))) and (iu_task_urokdone=0 )  ";
				   break;
				   case 'active':
						$cond = "(( iu_task_taskfinished_val<>-1 and iu_task_taskcancelled_val<>-1 and iu_task_contoller='' ) or ( iu_task_contoller<>''  and  (( (iu_task_ischecked_val is null) or (iu_task_ischecked_val=0 ) )) and iu_task_taskcancelled_val<>-1) ) and (iu_task_urokdone=0 ) ";
				   break;
				    case 'plus':
					   $cond = "( ( ( iu_task_taskfinished_val=-1 or iu_task_taskcancelled_val=-1) and iu_task_contoller='') or  ( iu_task_contoller<>'' and (iu_task_ischecked_val=-1 or iu_task_taskcancelled_val=-1))) and  ( (iu_task_urokdone=0 ) or (iu_task_urokdone=-1 and ( iu_task_finishdate is null or DATEDIFF(now(),iu_task_finishdate) < 61) ) ) ";
				   break;
			   }
				
				break;
			  case 'iu_task_finishdate_le':
			  $cond = 'iu_task_finishdate<="'.$obj->value.'"';
			  break;
			  case 'iu_task_finishdate_ge':
			  $cond = 'iu_task_finishdate>="'.$obj->value.'"';
			  break;
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
	$counter=0;
	 if (isset($offset) && isset($limit)) {
		if($offset==0)
			$counter=1;
	    $res = $this->jservice->get(array('Action' => 'GetViewData', 'ViewName' => 'v_autoiu_task',
		'FieldList'=>'iu_task_manualtask,iu_urok_def_curator_id,iu_urok_def_curator,iu_urok_def_theteacher,iu_urok_def_laststate,iu_urok_def_subject,iu_urok_def_thequarter,iu_urok_def_processtype,iu_task_isdelegated,iu_task_doer_states,iu_task_doer_id,iu_task_controller_id,ucode,urokid,instanceid,id,DATE_FORMAT(iu_task_finishdate,\'%Y-%m-%d %H:%i:%s\') iu_task_finishdate,DATE_FORMAT(iu_task_createdate,\'%Y-%m-%d %H:%i:%s\') iu_task_createdate,iu_task_delegatefrom,iu_task_doer_states,DATE_FORMAT(iu_task_senttodoer,\'%Y-%m-%d %H:%i:%s\') iu_task_senttodoer,iu_task_taskfinished,iu_task_controller_comment,DATE_FORMAT(iu_task_planenddate,\'%Y-%m-%d %H:%i:%s\') iu_task_planenddate,iu_task_doer,iu_task_processstatus,iu_task_taskcancelled,iu_task_info,iu_task_statetask,iu_task_ischecked,iu_task_contoller,iu_task_subj,iu_task_doer_comment,iu_task_theprocess','Sort'=>$sort, 'WhereClause' => $whereclause,'Limit'=>$limit,'Offset'=>$offset,'archived'=>$archived));
	} else {
		$counter=1;
	    $res = $this->jservice->get(array('Action' => 'GetViewData', 'ViewName' => 'v_autoiu_task',
		'FieldList'=>'iu_task_manualtask,iu_urok_def_curator_id,iu_urok_def_curator,iu_urok_def_theteacher,iu_urok_def_laststate,iu_urok_def_subject,iu_urok_def_thequarter,iu_urok_def_processtype,iu_task_isdelegated,iu_task_doer_states,iu_task_doer_id,iu_task_controller_id,ucode,urokid,instanceid,id,DATE_FORMAT(iu_task_finishdate,\'%Y-%m-%d %H:%i:%s\') iu_task_finishdate,DATE_FORMAT(iu_task_createdate,\'%Y-%m-%d %H:%i:%s\') iu_task_createdate,iu_task_delegatefrom,iu_task_doer_states,DATE_FORMAT(iu_task_senttodoer,\'%Y-%m-%d %H:%i:%s\') iu_task_senttodoer,iu_task_taskfinished,iu_task_controller_comment,DATE_FORMAT(iu_task_planenddate,\'%Y-%m-%d %H:%i:%s\') iu_task_planenddate,iu_task_doer,iu_task_processstatus,iu_task_taskcancelled,iu_task_info,iu_task_statetask,iu_task_ischecked,iu_task_contoller,iu_task_subj,iu_task_doer_comment,iu_task_theprocess','Sort'=>$sort, 'WhereClause' => $whereclause,'archived'=>$archived));
	}
	$root = new stdClass();
	if($counter==1){
		$root->total = $this->jservice->get(array('Action' => 'CountView', 'ViewName' => 'v_autoiu_task',
		'FieldList'=>'iu_urok_def_curator_id,iu_urok_def_curator,iu_urok_def_theteacher,iu_urok_def_laststate,iu_urok_def_subject,iu_urok_def_thequarter,iu_urok_def_processtype,iu_task_isdelegated,iu_task_doer_states,iu_task_doer_id,iu_task_controller_id,ucode,urokid,instanceid,id,DATE_FORMAT(iu_task_finishdate,\'%Y-%m-%d %H:%i:%s\') iu_task_finishdate,DATE_FORMAT(iu_task_createdate,\'%Y-%m-%d %H:%i:%s\') iu_task_createdate,iu_task_delegatefrom,iu_task_doer_states,DATE_FORMAT(iu_task_senttodoer,\'%Y-%m-%d %H:%i:%s\') iu_task_senttodoer,iu_task_taskfinished,iu_task_controller_comment,DATE_FORMAT(iu_task_planenddate,\'%Y-%m-%d %H:%i:%s\') iu_task_planenddate,iu_task_doer,iu_task_processstatus,iu_task_taskcancelled,iu_task_info,iu_task_statetask,iu_task_ischecked,iu_task_contoller,iu_task_subj,iu_task_doer_comment,iu_task_theprocess', 'WhereClause' => $whereclause,'archived'=>$archived));
		$_SESSION["m_v_autoiu_task_getRowsSL"]=$root->total;
	}else{
		$root->total=$_SESSION["m_v_autoiu_task_getRowsSL"];
	}
	$root->success = true;
	$root->rows = $res;
	return $root;
}
    function deleteRow($id = null) {
	    $this->jservice->get(array('Action'=>'ArchiveDocument', 'TypeName'=>'iu_t', 'DocumentID'=>$id));
	    $return = array('success' => true);
	    return $return;
    }
}
?>
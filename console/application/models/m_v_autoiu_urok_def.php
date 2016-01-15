
<?php
class  M_v_autoiu_urok_def extends CI_Model {
    public function  __construct()
    {
         parent::__construct();
    }
    function newRow($objtype,$name,$data)  {
               $id = $this->jservice->get(array('Action'=>'NewGuid'));
               $this->jservice->get(array('Action'=>'NewDocument', 'TypeName'=>'iu_urok', 'DocumentID'=>$id, 'DocumentCaption'=>$name));
               $rowid = $this->jservice->get(array('Action'=>'NewGuid'));
               $this->jservice->get(array('Action'=>'NewRow', 'PartName'=>'iu_urok_def', 'RowID'=>$rowid, 'DocumentID'=>$id,'Values'=>$data));
                if ($id) {
                    return array('success'=>TRUE, 'data' => $id);
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
			  case 'iu_urok_def_schooldate_le':
			  $cond = 'iu_urok_def_schooldate<="'.$obj->value.'"';
			  break;
			  case 'iu_urok_def_schooldate_ge':
			  $cond = 'iu_urok_def_schooldate>="'.$obj->value.'"';
			  break;
			  case 'iu_urok_def_datecreated_le':
			  $cond = 'iu_urok_def_datecreated<="'.$obj->value.'"';
			  break;
			  case 'iu_urok_def_datecreated_ge':
			  $cond = 'iu_urok_def_datecreated>="'.$obj->value.'"';
			  break;
			   case 'iu_urok_def_theclassnum':
			   if ($obj->value!='%')
					$cond = 'iu_urok_def_theclassnum="'.$obj->value.'"';
				else
					$cond = 'iu_urok_def_theclassnum LIKE  "'.$obj->value.'"';
			  break;
			  
			  
		    	default:
			    	//if(isset($obj->value))
			    	{
			    		if(is_array($obj->value))
				    	{
				    		$cond = $obj->property . ' IN ("' . implode('", "',$obj->value).'") ';
				    		//echo $cond;
					    }else
					    {
					    	$cond = $obj->property . ' LIKE "%' . $obj->value . '%"';
					    }
				   // }else{
					//	$cond=' 1=1 ';
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
	    $res = $this->jservice->get(array('Action' => 'GetViewData', 'ViewName' => 'v_autoiu_urok_def',
		'FieldList'=>'instanceid,id,iu_urok_def_theclassnum,iu_urok_def_iu_urok_stage,iu_urok_def_testpageref,iu_urok_def_subject,
		iu_urok_def_rtheme,iu_urok_def_ucode,iu_urok_def_schooldate ,DATE_FORMAT(iu_urok_def_datecreated,\'%Y-%m-%d %H:%i:%s\') iu_urok_def_datecreated,
		DATE_FORMAT(iu_urok_def_actiondate,\'%Y-%m-%d %H:%i:%s\') iu_urok_def_actiondate,
		DATE_FORMAT(iu_urok_def_actiondate2,\'%Y-%m-%d %H:%i:%s\') iu_urok_def_actiondate2,
		iu_urok_def_ckksn,
		iu_urok_def_thefilm,
		iu_urok_def_thefilmurl,
		iu_urok_def_pubstate,
		iu_urok_def_mainref,iu_urok_def_topstage,iu_urok_def_coursetype,iu_urok_def_isdone,iu_urok_def_methodist,
		iu_urok_def_processtype,iu_urok_def_maketown,iu_urok_def_curator,iu_urok_def_thequarter,iu_urok_def_theteacher,
		iu_urok_def_methodist2,iu_urok_def_classtheme,iu_urok_def_plannum,iu_urok_def_manualcontrol,
		iu_urok_def_taskdelayed,iu_urok_def_laststate,iu_urok_def_lastmessage,
		DATE_FORMAT(iu_urok_def_lastplanned,\'%Y-%m-%d %H:%i:%s\') iu_urok_def_lastplanned,
		iu_urok_def_lastdoer
		','Sort'=>$sort, 'WhereClause' => $whereclause,'Limit'=>$limit,'Offset'=>$offset,'archived'=>$archived));
	} else {
		$counter=1;
	    $res = $this->jservice->get(array('Action' => 'GetViewData', 'ViewName' => 'v_autoiu_urok_def',
		'FieldList'=>'instanceid,id,iu_urok_def_theclassnum,iu_urok_def_iu_urok_stage,iu_urok_def_testpageref,iu_urok_def_subject,
		iu_urok_def_rtheme,iu_urok_def_ucode,iu_urok_def_schooldate ,DATE_FORMAT(iu_urok_def_datecreated,\'%Y-%m-%d %H:%i:%s\') iu_urok_def_datecreated,
				DATE_FORMAT(iu_urok_def_actiondate,\'%Y-%m-%d %H:%i:%s\') iu_urok_def_actiondate,
		DATE_FORMAT(iu_urok_def_actiondate2,\'%Y-%m-%d %H:%i:%s\') iu_urok_def_actiondate2,
		iu_urok_def_ckksn,
		iu_urok_def_thefilm,
		iu_urok_def_thefilmurl,
		iu_urok_def_pubstate,
		iu_urok_def_mainref,iu_urok_def_topstage,iu_urok_def_coursetype,iu_urok_def_isdone,iu_urok_def_methodist,
		iu_urok_def_processtype,iu_urok_def_maketown,iu_urok_def_curator,iu_urok_def_thequarter,iu_urok_def_theteacher,
		iu_urok_def_methodist2,iu_urok_def_classtheme,iu_urok_def_plannum,iu_urok_def_manualcontrol,iu_urok_def_taskdelayed,
		iu_urok_def_laststate,iu_urok_def_lastmessage,
		DATE_FORMAT(iu_urok_def_lastplanned,\'%Y-%m-%d %H:%i:%s\') iu_urok_def_lastplanned,
		iu_urok_def_lastdoer
		','Sort'=>$sort, 'WhereClause' => $whereclause,'archived'=>$archived));
	}
	session_start();
	$root = new stdClass();
	if($counter==1){
		$root->total = $this->jservice->get(array('Action' => 'CountView', 'ViewName' => 'v_autoiu_urok_def','FieldList'=>'instanceid,id', 'WhereClause' => $whereclause,'archived'=>$archived));
		$_SESSION["m_v_autoiu_urok_def_getRowsSL"]=$root->total;
	}else{
		$root->total=$_SESSION["m_v_autoiu_urok_def_getRowsSL"];
	}
	$root->success = true;
	$root->rows = $res;
	return $root;
}


function getRowsSLArch($offset,$limit, $sort = array(), $filter = null, $archived=0)
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
			  case 'iu_urok_def_schooldate_le':
			  $cond = 'iu_urok_def_schooldate<="'.$obj->value.'"';
			  break;
			  case 'iu_urok_def_schooldate_ge':
			  $cond = 'iu_urok_def_schooldate>="'.$obj->value.'"';
			  break;
			  case 'iu_urok_def_datecreated_le':
			  $cond = 'iu_urok_def_datecreated<="'.$obj->value.'"';
			  break;
			  case 'iu_urok_def_datecreated_ge':
			  $cond = 'iu_urok_def_datecreated>="'.$obj->value.'"';
			  break;
			  
			  case 'iu_urok_def_ckksn_null':
			  $cond = 'iu_urok_def_ckksn =""';
			  break;
			  
			   case 'iu_urok_def_theclassnum':
			   if ($obj->value!='%')
					$cond = 'iu_urok_def_theclassnum="'.$obj->value.'"';
				else
					$cond = 'iu_urok_def_theclassnum LIKE  "'.$obj->value.'"';
			  break;
		    	default:
			    	//if(isset($obj->value))
			    	{
			    		if(is_array($obj->value))
				    	{
				    		$cond = $obj->property . ' IN ("' . implode('", "',$obj->value).'") ';
				    		//echo $cond;
					    }else
					    {
					    	$cond = $obj->property . ' LIKE "%' . $obj->value . '%"';
					    }
				   // }else{
					//	$cond=' 1=1 ';
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
	    $res = $this->jservice->get(array('Action' => 'GetViewData', 'ViewName' => 'v_autoiu_urok_def_arch','FieldList'=>'instanceid,id,iu_urok_def_theclassnum,iu_urok_def_iu_urok_stage,iu_urok_def_testpageref,iu_urok_def_subject,iu_urok_def_rtheme,iu_urok_def_ucode,iu_urok_def_schooldate ,DATE_FORMAT(iu_urok_def_datecreated,\'%Y-%m-%d %H:%i:%s\') iu_urok_def_datecreated,
		DATE_FORMAT(iu_urok_def_actiondate,\'%Y-%m-%d %H:%i:%s\') iu_urok_def_actiondate,
		DATE_FORMAT(iu_urok_def_actiondate2,\'%Y-%m-%d %H:%i:%s\') iu_urok_def_actiondate2,
		iu_urok_def_ckksn,
		iu_urok_def_thefilm,
		iu_urok_def_thefilmurl,
			iu_urok_def_pubstate,
		iu_urok_def_mainref,iu_urok_def_topstage,iu_urok_def_coursetype,iu_urok_def_isdone,iu_urok_def_methodist,iu_urok_def_processtype,iu_urok_def_maketown,iu_urok_def_curator,iu_urok_def_thequarter,iu_urok_def_theteacher,iu_urok_def_methodist2,iu_urok_def_classtheme,iu_urok_def_plannum,iu_urok_def_manualcontrol,iu_urok_def_taskdelayed,iu_urok_def_laststate,iu_urok_def_lastmessage','Sort'=>$sort, 'WhereClause' => $whereclause,'Limit'=>$limit,'Offset'=>$offset,'archived'=>$archived));
	} else {
		$counter=1;
	    $res = $this->jservice->get(array('Action' => 'GetViewData', 'ViewName' => 'v_autoiu_urok_def_arch','FieldList'=>'instanceid,id,iu_urok_def_theclassnum,iu_urok_def_iu_urok_stage,iu_urok_def_testpageref,iu_urok_def_subject,iu_urok_def_rtheme,iu_urok_def_ucode,iu_urok_def_schooldate ,DATE_FORMAT(iu_urok_def_datecreated,\'%Y-%m-%d %H:%i:%s\') iu_urok_def_datecreated,
				DATE_FORMAT(iu_urok_def_actiondate,\'%Y-%m-%d %H:%i:%s\') iu_urok_def_actiondate,
		DATE_FORMAT(iu_urok_def_actiondate2,\'%Y-%m-%d %H:%i:%s\') iu_urok_def_actiondate2,
		iu_urok_def_ckksn,
		iu_urok_def_thefilm,
		iu_urok_def_thefilmurl,
			iu_urok_def_pubstate,
		iu_urok_def_mainref,iu_urok_def_topstage,iu_urok_def_coursetype,iu_urok_def_isdone,iu_urok_def_methodist,iu_urok_def_processtype,iu_urok_def_maketown,iu_urok_def_curator,iu_urok_def_thequarter,iu_urok_def_theteacher,iu_urok_def_methodist2,iu_urok_def_classtheme,iu_urok_def_plannum,iu_urok_def_manualcontrol,iu_urok_def_taskdelayed,iu_urok_def_laststate,iu_urok_def_lastmessage','Sort'=>$sort, 'WhereClause' => $whereclause,'archived'=>$archived));
	}
	session_start();
	$root = new stdClass();
	
	if($counter==1){
		$root->total = $this->jservice->get(array('Action' => 'CountView', 'ViewName' => 'v_autoiu_urok_def_arch','FieldList'=>'instanceid,id,iu_urok_def_theclassnum,iu_urok_def_iu_urok_stage,iu_urok_def_testpageref,iu_urok_def_subject,iu_urok_def_rtheme,iu_urok_def_ucode,iu_urok_def_schooldate ,DATE_FORMAT(iu_urok_def_datecreated,\'%Y-%m-%d %H:%i:%s\') iu_urok_def_datecreated,iu_urok_def_mainref,iu_urok_def_topstage,iu_urok_def_coursetype,iu_urok_def_isdone,iu_urok_def_methodist,iu_urok_def_processtype,iu_urok_def_maketown,iu_urok_def_curator,iu_urok_def_thequarter,iu_urok_def_theteacher,iu_urok_def_methodist2,iu_urok_def_classtheme,iu_urok_def_plannum,iu_urok_def_manualcontrol,iu_urok_def_taskdelayed,iu_urok_def_laststate,iu_urok_def_lastmessage', 'WhereClause' => $whereclause,'archived'=>$archived));
		$_SESSION["m_v_autoiu_urok_def_getRowsSLArch"]=$root->total;
	}else{
		$root->total =$_SESSION["m_v_autoiu_urok_def_getRowsSLArch"];
	}
	$root->success = true;
	$root->rows = $res;
	return $root;
}




function getRowsSLTrash($offset,$limit, $sort = array(), $filter = null, $archived=0)
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
			  case 'iu_urok_def_schooldate_le':
			  $cond = 'iu_urok_def_schooldate<="'.$obj->value.'"';
			  break;
			  case 'iu_urok_def_schooldate_ge':
			  $cond = 'iu_urok_def_schooldate>="'.$obj->value.'"';
			  break;
			  case 'iu_urok_def_datecreated_le':
			  $cond = 'iu_urok_def_datecreated<="'.$obj->value.'"';
			  break;
			  case 'iu_urok_def_datecreated_ge':
			  $cond = 'iu_urok_def_datecreated>="'.$obj->value.'"';
			  break;
			   case 'iu_urok_def_theclassnum':
			   if ($obj->value!='%')
					$cond = 'iu_urok_def_theclassnum="'.$obj->value.'"';
				else
				$cond = 'iu_urok_def_theclassnum LIKE  "'.$obj->value.'"';
			  break;
		    	default:
			    	//if(isset($obj->value))
			    	{
			    		if(is_array($obj->value))
				    	{
				    		$cond = $obj->property . ' IN ("' . implode('", "',$obj->value).'") ';
				    		//echo $cond;
					    }else
					    {
					    	$cond = $obj->property . ' LIKE "%' . $obj->value . '%"';
					    }
				   // }else{
					//	$cond=' 1=1 ';
					}
		    }
		    $whereclause .= (empty($whereclause)) ? $cond : ' AND ' . $cond;
	    }
    }catch(Exception $e) {
	    log_message('error','Exception: '. $e->getMessage());
    }
	 if (isset($offset) && isset($limit)) {
	    $res = $this->jservice->get(array('Action' => 'GetViewData', 'ViewName' => 'v_autoiu_urok_def_trash','FieldList'=>'instanceid,id,iu_urok_def_theclassnum,iu_urok_def_iu_urok_stage,iu_urok_def_testpageref,iu_urok_def_subject,iu_urok_def_rtheme,iu_urok_def_ucode,iu_urok_def_schooldate ,DATE_FORMAT(iu_urok_def_datecreated,\'%Y-%m-%d %H:%i:%s\') iu_urok_def_datecreated,
		DATE_FORMAT(iu_urok_def_actiondate,\'%Y-%m-%d %H:%i:%s\') iu_urok_def_actiondate,
		DATE_FORMAT(iu_urok_def_actiondate2,\'%Y-%m-%d %H:%i:%s\') iu_urok_def_actiondate2,
		iu_urok_def_ckksn,
		iu_urok_def_thefilm,
		iu_urok_def_thefilmurl,
		iu_urok_def_mainref,iu_urok_def_topstage,iu_urok_def_coursetype,iu_urok_def_isdone,iu_urok_def_methodist,iu_urok_def_processtype,iu_urok_def_maketown,iu_urok_def_curator,iu_urok_def_thequarter,iu_urok_def_theteacher,iu_urok_def_methodist2,iu_urok_def_classtheme,iu_urok_def_plannum,iu_urok_def_manualcontrol,iu_urok_def_taskdelayed,iu_urok_def_laststate,iu_urok_def_lastmessage','Sort'=>$sort, 'WhereClause' => $whereclause,'Limit'=>$limit,'Offset'=>$offset,'archived'=>$archived));
	} else {
	    $res = $this->jservice->get(array('Action' => 'GetViewData', 'ViewName' => 'v_autoiu_urok_def_trash','FieldList'=>'instanceid,id,iu_urok_def_theclassnum,iu_urok_def_iu_urok_stage,iu_urok_def_testpageref,iu_urok_def_subject,iu_urok_def_rtheme,iu_urok_def_ucode,iu_urok_def_schooldate ,DATE_FORMAT(iu_urok_def_datecreated,\'%Y-%m-%d %H:%i:%s\') iu_urok_def_datecreated,
				DATE_FORMAT(iu_urok_def_actiondate,\'%Y-%m-%d %H:%i:%s\') iu_urok_def_actiondate,
		DATE_FORMAT(iu_urok_def_actiondate2,\'%Y-%m-%d %H:%i:%s\') iu_urok_def_actiondate2,
		iu_urok_def_ckksn,
		iu_urok_def_thefilm,
		iu_urok_def_thefilmurl,
		iu_urok_def_mainref,iu_urok_def_topstage,iu_urok_def_coursetype,iu_urok_def_isdone,iu_urok_def_methodist,iu_urok_def_processtype,iu_urok_def_maketown,iu_urok_def_curator,iu_urok_def_thequarter,iu_urok_def_theteacher,iu_urok_def_methodist2,iu_urok_def_classtheme,iu_urok_def_plannum,iu_urok_def_manualcontrol,iu_urok_def_taskdelayed,iu_urok_def_laststate,iu_urok_def_lastmessage','Sort'=>$sort, 'WhereClause' => $whereclause,'archived'=>$archived));
	}
	$root = new stdClass();
	$root->total = $this->jservice->get(array('Action' => 'CountView', 'ViewName' => 'v_autoiu_urok_def_trash','FieldList'=>'instanceid,id,iu_urok_def_theclassnum,iu_urok_def_iu_urok_stage,iu_urok_def_testpageref,iu_urok_def_subject,iu_urok_def_rtheme,iu_urok_def_ucode,iu_urok_def_schooldate ,DATE_FORMAT(iu_urok_def_datecreated,\'%Y-%m-%d %H:%i:%s\') iu_urok_def_datecreated,iu_urok_def_mainref,iu_urok_def_topstage,iu_urok_def_coursetype,iu_urok_def_isdone,iu_urok_def_methodist,iu_urok_def_processtype,iu_urok_def_maketown,iu_urok_def_curator,iu_urok_def_thequarter,iu_urok_def_theteacher,iu_urok_def_methodist2,iu_urok_def_classtheme,iu_urok_def_plannum,iu_urok_def_manualcontrol,iu_urok_def_taskdelayed,iu_urok_def_laststate,iu_urok_def_lastmessage', 'WhereClause' => $whereclause,'archived'=>$archived));
	$root->success = true;
	$root->rows = $res;
	return $root;
}


    function deleteRow($id = null) {
	    $this->jservice->get(array('Action'=>'ArchiveDocument', 'TypeName'=>'iu_urok', 'DocumentID'=>$id));
	    $return = array('success' => true);
	    return $return;
    }
}
?>
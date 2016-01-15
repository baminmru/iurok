﻿
<?php
class  M_v_autoiu_l_def extends CI_Model {
    public function  __construct()
    {
         parent::__construct();
    }
    function newRow($objtype,$name)  {
               $id = $this->jservice->get(array('Action'=>'NewGuid'));
               $this->jservice->get(array('Action'=>'NewDocument', 'TypeName'=>'iu_l', 'DocumentID'=>$id, 'DocumentCaption'=>$name));
               $rowid = $this->jservice->get(array('Action'=>'NewGuid'));
               $this->jservice->get(array('Action'=>'NewRow', 'PartName'=>'iu_l_def', 'RowID'=>$rowid, 'DocumentID'=>$id));
                if ($id) {
                    return array('success'=>TRUE, 'data' => $id, 'rowid'=>$rowid);
                }
                else {
                    $return= array('success'=>FALSE, 'msg' => 'Error while create new id');
				    return $return;
                }
    }
      function getRowsSL($offset,$limit, $sort = array(), $filter = null){
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
			  case 'iu_l_def_readdate_le':
			  $cond = 'iu_l_def_readdate<="'.$obj->value.'"';
			  break;
			  case 'iu_l_def_readdate_ge':
			  $cond = 'iu_l_def_readdate>="'.$obj->value.'"';
			  break;
			  case 'iu_l_def_createdate_le':
			  $cond = 'iu_l_def_createdate<="'.$obj->value.'"';
			  break;
			  case 'iu_l_def_createdate_ge':
			  $cond = 'iu_l_def_createdate>="'.$obj->value.'"';
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
	    $res = $this->jservice->get(array('Action' => 'GetViewData', 'ViewName' => 'v_autoiu_l_def','FieldList'=>'instanceid,id,DATE_FORMAT(iu_l_def_readdate,\'%Y-%m-%d %H:%i:%s\') iu_l_def_readdate,DATE_FORMAT(iu_l_def_createdate,\'%Y-%m-%d %H:%i:%s\') iu_l_def_createdate,iu_l_def_doer,iu_l_def_doer_id,iu_l_def_info,iu_l_def_sender,iu_l_def_sender_id','Sort'=>$sort, 'WhereClause' => $whereclause,'Limit'=>$limit,'Offset'=>$offset));
	} else {
	    $res = $this->jservice->get(array('Action' => 'GetViewData', 'ViewName' => 'v_autoiu_l_def','FieldList'=>'instanceid,id,DATE_FORMAT(iu_l_def_readdate,\'%Y-%m-%d %H:%i:%s\') iu_l_def_readdate,DATE_FORMAT(iu_l_def_createdate,\'%Y-%m-%d %H:%i:%s\') iu_l_def_createdate,iu_l_def_doer,iu_l_def_doer_id,iu_l_def_info,iu_l_def_sender,iu_l_def_sender_id','Sort'=>$sort, 'WhereClause' => $whereclause));
	}
	$root = new stdClass();
	$root->total = $this->jservice->get(array('Action' => 'CountView', 'ViewName' => 'v_autoiu_l_def','FieldList'=>'instanceid,id,DATE_FORMAT(iu_l_def_readdate,\'%Y-%m-%d %H:%i:%s\') iu_l_def_readdate,DATE_FORMAT(iu_l_def_createdate,\'%Y-%m-%d %H:%i:%s\') iu_l_def_createdate,iu_l_def_doer,iu_l_def_doer_id,iu_l_def_info,iu_l_def_sender,iu_l_def_sender_id', 'WhereClause' => $whereclause));
	$root->success = true;
	$root->rows = $res;
	return $root;
}
    function deleteRow($id = null) {
	    $this->jservice->get(array('Action'=>'DeleteDocument', 'TypeName'=>'iu_l', 'DocumentID'=>$id));
	    $return = array('success' => true);
	    return $return;
    }
	
	  function readRow($id = null) {
	    $this->jservice->get(array('Action'=>'ReadLC', 'DocumentID'=>$id));
	    $return = array('success' => true);
	    return $return;
    }
}
?>
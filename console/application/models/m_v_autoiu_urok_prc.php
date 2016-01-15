
<?php
class  M_v_autoiu_urok_prc extends CI_Model {
    public function  __construct()
    {
         parent::__construct();
    }
    function newRow($objtype,$name)  {
               $id = $this->jservice->get(array('Action'=>'NewGuid'));
               $this->jservice->get(array('Action'=>'NewDocument', 'TypeName'=>'iu_us', 'DocumentID'=>$id, 'DocumentCaption'=>$name));
               $rowid = $this->jservice->get(array('Action'=>'NewGuid'));
               $this->jservice->get(array('Action'=>'NewRow', 'PartName'=>'iu_urok_prc', 'RowID'=>$rowid, 'DocumentID'=>$id));
                if ($id) {
                    return array('success'=>TRUE, 'data' => $id, 'rowid'=>$rowid);
                }
                else {
                    $return= array('success'=>FALSE, 'msg' => 'Error while create new id');
				    return $return;
                }
    }
      function getRowsSL($offset,$limit, $sort = array(), $filter = null, $archived=0){
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
			  case 'iu_urok_prc_taskdelayed_le':
			  $cond = 'iu_urok_prc_taskdelayed<='.$obj->value;
			  break;
			  case 'iu_urok_prc_taskdelayed_ge':
			  $cond = 'iu_urok_prc_taskdelayed>='.$obj->value;
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
	    $res = $this->jservice->get(array('Action' => 'GetViewData', 'ViewName' => 'v_autoiu_urok_prc','FieldList'=>'instanceid,id,iu_urok_prc_manualcontrol,iu_urok_prc_laststate,iu_urok_prc_taskdelayed,iu_urok_prc_topstage,iu_urok_prc_theprocess,iu_urok_prc_iu_urok_stage,iu_urok_prc_lastmessage,iu_urok_prc_isdone','Sort'=>$sort, 'WhereClause' => $whereclause,'Limit'=>$limit,'Offset'=>$offset,'archived'=>$archived));
	} else {
	    $res = $this->jservice->get(array('Action' => 'GetViewData', 'ViewName' => 'v_autoiu_urok_prc','FieldList'=>'instanceid,id,iu_urok_prc_manualcontrol,iu_urok_prc_laststate,iu_urok_prc_taskdelayed,iu_urok_prc_topstage,iu_urok_prc_theprocess,iu_urok_prc_iu_urok_stage,iu_urok_prc_lastmessage,iu_urok_prc_isdone','Sort'=>$sort, 'WhereClause' => $whereclause));
	}
	$root = new stdClass();
	$root->total = $this->jservice->get(array('Action' => 'CountView', 'ViewName' => 'v_autoiu_urok_prc','FieldList'=>'instanceid,id,iu_urok_prc_manualcontrol,iu_urok_prc_laststate,iu_urok_prc_taskdelayed,iu_urok_prc_topstage,iu_urok_prc_theprocess,iu_urok_prc_iu_urok_stage,iu_urok_prc_lastmessage,iu_urok_prc_isdone', 'WhereClause' => $whereclause,'archived'=>$archived));
	$root->success = true;
	$root->rows = $res;
	return $root;
}
    function deleteRow($id = null) {
	    $this->jservice->get(array('Action'=>'ArchiveDocument', 'TypeName'=>'iu_us', 'DocumentID'=>$id));
	    $return = array('success' => true);
	    return $return;
    }
}
?>

<?php
class  M_v_autoiu_tmdef extends CI_Model {
    public function  __construct()
    {
         parent::__construct();
    }
    function newRow($objtype,$name)  {
               $id = $this->jservice->get(array('Action'=>'NewGuid'));
               $this->jservice->get(array('Action'=>'NewDocument', 'TypeName'=>'iu_tm', 'DocumentID'=>$id, 'DocumentCaption'=>$name));
               $rowid = $this->jservice->get(array('Action'=>'NewGuid'));
               $this->jservice->get(array('Action'=>'NewRow', 'PartName'=>'iu_tmdef', 'RowID'=>$rowid, 'DocumentID'=>$id));
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
	    $res = $this->jservice->get(array('Action' => 'GetViewData', 'ViewName' => 'v_autoiu_tmdef','FieldList'=>'instanceid,id,iu_tmdef_workat,iu_tmdef_lastname,iu_tmdef_sendtomail,iu_tmdef_classes,iu_tmdef_surname,iu_tmdef_email,iu_tmdef_regal,iu_tmdef_thephone,iu_tmdef_subjects,iu_tmdef_name,iu_tmdef_ismethodist,iu_tmdef_thetown','Sort'=>$sort, 'WhereClause' => $whereclause,'Limit'=>$limit,'Offset'=>$offset,'archived'=>$archived));
	} else {
	    $res = $this->jservice->get(array('Action' => 'GetViewData', 'ViewName' => 'v_autoiu_tmdef','FieldList'=>'instanceid,id,iu_tmdef_workat,iu_tmdef_lastname,iu_tmdef_sendtomail,iu_tmdef_classes,iu_tmdef_surname,iu_tmdef_email,iu_tmdef_regal,iu_tmdef_thephone,iu_tmdef_subjects,iu_tmdef_name,iu_tmdef_ismethodist,iu_tmdef_thetown','Sort'=>$sort, 'WhereClause' => $whereclause));
	}
	$root = new stdClass();
	$root->total = $this->jservice->get(array('Action' => 'CountView', 'ViewName' => 'v_autoiu_tmdef','FieldList'=>'instanceid,id,iu_tmdef_workat,iu_tmdef_lastname,iu_tmdef_sendtomail,iu_tmdef_classes,iu_tmdef_surname,iu_tmdef_email,iu_tmdef_regal,iu_tmdef_thephone,iu_tmdef_subjects,iu_tmdef_name,iu_tmdef_ismethodist,iu_tmdef_thetown', 'WhereClause' => $whereclause,'archived'=>$archived));
	$root->success = true;
	$root->rows = $res;
	return $root;
}
    function deleteRow($id = null) {
	    $this->jservice->get(array('Action'=>'ArchiveDocument', 'TypeName'=>'iu_tm', 'DocumentID'=>$id));
	    $return = array('success' => true);
	    return $return;
    }
}
?>
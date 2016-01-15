
<?php
class  M_v_autoiu_u_def extends CI_Model {
    public function  __construct()
    {
         parent::__construct();
    }
    function newRow($objtype,$name)  {
               $id = $this->jservice->get(array('Action'=>'NewGuid'));
               $this->jservice->get(array('Action'=>'NewDocument', 'TypeName'=>'iu_u', 'DocumentID'=>$id, 'DocumentCaption'=>$name));
               $rowid = $this->jservice->get(array('Action'=>'NewGuid'));
               $this->jservice->get(array('Action'=>'NewRow', 'PartName'=>'iu_u_def', 'RowID'=>$rowid, 'DocumentID'=>$id));
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
			  case 'iu_u_def_lastsend_le':
			  $cond = 'iu_u_def_lastsend<="'.$obj->value.'"';
			  break;
			  case 'iu_u_def_lastsend_ge':
			  $cond = 'iu_u_def_lastsend>="'.$obj->value.'"';
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
	    $res = $this->jservice->get(array('Action' => 'GetViewData', 'ViewName' => 'v_autoiu_u_def',
		'FieldList'=>'instanceid,id,iu_u_def_currole,iu_u_def_sendtomail,iu_u_def_name,iu_u_def_thetown,iu_u_def_freelancer,iu_u_def_surname,iu_u_def_lastname,iu_u_def_thephone,
		DATE_FORMAT(iu_u_def_lastsend,\'%Y-%m-%d %H:%i:%s\') iu_u_def_lastsend,iu_u_def_email,iu_u_def_login',
		'Sort'=>$sort, 'WhereClause' => $whereclause,'Limit'=>$limit,'Offset'=>$offset,'archived'=>$archived));
	} else {
	    $res = $this->jservice->get(array('Action' => 'GetViewData', 'ViewName' => 'v_autoiu_u_def',
		'FieldList'=>'instanceid,id,iu_u_def_currole,iu_u_def_sendtomail,iu_u_def_name,iu_u_def_thetown,iu_u_def_freelancer,iu_u_def_surname,iu_u_def_lastname,iu_u_def_thephone,
		DATE_FORMAT(iu_u_def_lastsend,\'%Y-%m-%d %H:%i:%s\') iu_u_def_lastsend,iu_u_def_email,iu_u_def_login',
		'Sort'=>$sort, 'WhereClause' => $whereclause));
	}
	$root = new stdClass();
	$root->total = $this->jservice->get(array('Action' => 'CountView', 'ViewName' => 'v_autoiu_u_def',
	'FieldList'=>'*',
	'WhereClause' => $whereclause,'archived'=>$archived));
	$root->success = true;
	$root->rows = $res;
	return $root;
}
    function deleteRow($id = null) {
	    $this->jservice->get(array('Action'=>'ArchiveDocument', 'TypeName'=>'iu_u', 'DocumentID'=>$id));
	    $return = array('success' => true);
	    return $return;
    }
}
?>
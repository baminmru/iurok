<?php
class  M_v_allcomments extends CI_Model {
    public function  __construct()
    {
         parent::__construct();
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
			  case 'thedate_le':
			  $cond = 'thedate<="'.$obj->value.'"';
			  break;
			  case 'thedatedate_ge':
			  $cond = 'thedate>="'.$obj->value.'"';
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
	    $res = $this->jservice->get(array('Action' => 'GetViewData', 'ViewName' => 'v_allcomments',
		'FieldList'=>'DATE_FORMAT(thedate,\'%Y-%m-%d %H:%i:%s\') thedate,theauthor,starttime,endtime,info,name,subject,ucode,uid,rtheme,classtheme,teacher',
		'Sort'=>$sort, 
		'WhereClause' => $whereclause,
		'Limit'=>$limit,'Offset'=>$offset,
		'archived'=>$archived));
	} else {
		$counter=1;
	    $res = $this->jservice->get(array('Action' => 'GetViewData', 'ViewName' => 'v_allcomments',
		'FieldList'=>'DATE_FORMAT(thedate,\'%Y-%m-%d %H:%i:%s\') thedate,theauthor,starttime,endtime,info,name,subject,ucode,uid,rtheme,classtheme,teacher',
		'Sort'=>$sort, 
		'WhereClause' => $whereclause,
		'archived'=>$archived));
	}
	$root = new stdClass();
	if($counter==1){
		$root->total = $this->jservice->get(array('Action' => 'CountView', 'ViewName' => 'v_allcomments',
		'FieldList'=>'DATE_FORMAT(thedate,\'%Y-%m-%d %H:%i:%s\') thedate,theauthor,starttime,endtime,info,name,subject,ucode,uid,rtheme,classtheme', 'WhereClause' => $whereclause,'archived'=>$archived));
		$_SESSION["m_v_allcomment_getRowsSL"]=$root->total;
	}else{
		$root->total=$_SESSION["m_v_allcomment_getRowsSL"];
	}
	$root->success = true;
	$root->rows = $res;
	return $root;
}
   
}
?>
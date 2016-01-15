<?php
	 class C_iu_u_def extends CI_Controller {
    function __construct() {
         parent::__construct();
        $this->_loadModels();
    }
    function setRow() {
          log_message('debug', 'iu_u_def.setRow post : '.json_encode($this->input->post(NULL, FALSE)));
          log_message('debug', 'iu_u_def.getRows get : '.json_encode($this->input->get(NULL, FALSE)));
          $data = array(
                'iu_u_defid' =>  $this->input->get_post('iu_u_defid', TRUE)
                ,'instanceid' =>  $this->input->get_post('instanceid', TRUE)
                ,'lastname' =>   $this->input->get_post('lastname', TRUE)
                ,'name' =>   $this->input->get_post('name', TRUE)
                ,'surname' =>   $this->input->get_post('surname', TRUE)
                ,'currole' =>   $this->input->get_post('currole', TRUE)
                ,'thetown' =>   $this->input->get_post('thetown', TRUE)
                ,'sendtomail' =>   $this->input->get_post('sendtomail', TRUE)
                ,'freelancer' =>   $this->input->get_post('freelancer', TRUE)
                ,'email' =>   $this->input->get_post('email', TRUE)
                ,'thephone' =>   $this->input->get_post('thephone', TRUE)
                ,'login' =>   $this->input->get_post('login', TRUE)
                ,'lastsend' =>   $this->input->get_post('lastsend', TRUE)
            );
            $iu_u_def = $this->m_iu_u_def->setRow($data);
            print json_encode($iu_u_def);
    }
    function newRow() {
            log_message('debug', 'iu_u_def.newRow post : '.json_encode($this->input->post(NULL, FALSE)));
          $data = array(
                'iu_u_defid' =>  $this->input->get_post('iu_u_defid', TRUE)
                ,'instanceid' =>  $this->input->get_post('instanceid', TRUE)
                ,'lastname' =>   $this->input->get_post('lastname', TRUE)
                ,'name' =>   $this->input->get_post('name', TRUE)
                ,'surname' =>   $this->input->get_post('surname', TRUE)
                ,'currole' =>   $this->input->get_post('currole', TRUE)
                ,'thetown' =>   $this->input->get_post('thetown', TRUE)
                ,'sendtomail' =>   $this->input->get_post('sendtomail', TRUE)
                ,'freelancer' =>   $this->input->get_post('freelancer', TRUE)
                ,'email' =>   $this->input->get_post('email', TRUE)
                ,'thephone' =>   $this->input->get_post('thephone', TRUE)
                ,'login' =>   $this->input->get_post('login', TRUE)
                ,'lastsend' =>   $this->input->get_post('lastsend', TRUE)
            );
                $instanceid =  $this->input->get_post('instanceid', TRUE);
            $iu_u_def= $this->m_iu_u_def->newRow($instanceid,$data);
            $return = $iu_u_def;
            print json_encode($return);
    }
    function getRowTemp() {
        log_message('debug', 'iu_u_def.getRow post : '.json_encode($this->input->post(NULL, FALSE)));
        $empId  =  $this->input->get_post('id', TRUE);
        if (isset($empId)) {
            $iu_u_def = $this->m_iu_u_def->getRowTemp($empId);
            $return = array(
                'success' => true,
                'data'    => $iu_u_def
            );
            print json_encode($return);
        }
    }
    function getRowsTemp() {
            $group = $this->input->get('group', FALSE); 
           $sort = $this->input->get('sort', FALSE);
           if(!$sort && $group) $sort = $group;
           if(!$sort || $group == $sort) 
            {
            	$sort = json_decode($sort);
            	$sort[] = array('property'=>'lastname', 'direction'=>'ASC');
            	$sort = json_encode($sort);
            }
            $instanceid=$this->input->get('instanceid', FALSE);
            if(isset($instanceid)){
                if($instanceid!=''){
                    $iu_u_def= $this->m_iu_u_def->getRowsByInstanceTemp($instanceid,$sort);
                }else{
                    $iu_u_def= $this->m_iu_u_def->getRowsTemp($sort);
                }
            }else{
              $iu_u_def= $this->m_iu_u_def->getRowsTemp($sort);
            }
            $return = array(
                'success' =>  TRUE ,
                'data'    => $iu_u_def
            );
        print json_encode($return);
    }
    function getRowsByInstanceTemp() {
        log_message('debug', 'iu_u_def.getRowsByInstance post : '.json_encode($this->input->post(NULL, FALSE)));
            $group = $this->input->get('group', FALSE); 
           $sort = $this->input->get('sort', FALSE);
           if(!$sort && $group) $sort = $group;
           if(!$sort || $group == $sort) 
            {
            	$sort = json_decode($sort);
            	$sort[] = array('property'=>'lastname', 'direction'=>'ASC');
            	$sort = json_encode($sort);
            }
        $InstId  =  $this->input->get_post('instanceid', TRUE);
        if (strlen($InstId) > 0) {
            $iu_u_def= $this->m_iu_u_def->getRowsByInstanceTemp($InstId,$sort);
            $return = array(
                'success' =>  TRUE ,
                'data'    => $iu_u_def
            );
        }
        else {
            $return = array(
                'success' => FALSE,
                'msg'     => 'Need instanceid to query.'
            );
        }
        print json_encode($return);
    }
    function getRowsByParentTemp() {
        log_message('debug', 'iu_u_def.getRowsByParent post : '.json_encode($this->input->post(NULL, FALSE)));
            $group = $this->input->get('group', FALSE); 
           $sort = $this->input->get('sort', FALSE);
           if(!$sort && $group) $sort = $group;
           if(!$sort || $group == $sort) 
            {
            	$sort = json_decode($sort);
            	$sort[] = array('property'=>'lastname', 'direction'=>'ASC');
            	$sort = json_encode($sort);
            }
        $ParentId  =  $this->input->get_post('parentid', TRUE);
        if (strlen($ParentId) > 0) {
            $iu_u_def= $this->m_iu_u_def->getRowsByParentTemp($ParentId,$sort);
            $return = array(
                'success' => TRUE,
                'data'    => $iu_u_def
            );
        }
        else {
            $return = array(
                'success' => FALSE,
                'msg'     => 'Need parent parentid to query.'
            );
        }
        print json_encode($return);
    }
    function getRow() {
        log_message('debug', 'iu_u_def.getRow post : '.json_encode($this->input->post(NULL, FALSE)));
        $empId  =  $this->input->get_post('id', TRUE);
        if (isset($empId)) {
            $iu_u_def = $this->m_iu_u_def->getRow($empId);
            $return = array(
                'success' => true,
                'data'    => $iu_u_def
            );
            print json_encode($return);
        }
    }
    function getRows() {
            $group = $this->input->get('group', FALSE); 
           $sort = $this->input->get('sort', FALSE);
           if(!$sort && $group) $sort = $group;
           if(!$sort || $group == $sort) 
            {
            	$sort = json_decode($sort);
            	$sort[] = array('property'=>'lastname', 'direction'=>'ASC');
            	$sort = json_encode($sort);
            }
            $instanceid=$this->input->get('instanceid', FALSE);
            if(isset($instanceid)){
                if($instanceid!=''){
                    $iu_u_def= $this->m_iu_u_def->getRowsByInstance($instanceid,$sort);
                }else{
                    $iu_u_def= $this->m_iu_u_def->getRows($sort);
                }
            }else{
              $iu_u_def= $this->m_iu_u_def->getRows($sort);
            }
            $return = array(
                'success' =>  TRUE ,
                'data'    => $iu_u_def
            );
        print json_encode($return);
    }
    function getRowsByInstance() {
        log_message('debug', 'iu_u_def.getRowsByInstance post : '.json_encode($this->input->post(NULL, FALSE)));
            $group = $this->input->get('group', FALSE); 
           $sort = $this->input->get('sort', FALSE);
           if(!$sort && $group) $sort = $group;
           if(!$sort || $group == $sort) 
            {
            	$sort = json_decode($sort);
            	$sort[] = array('property'=>'lastname', 'direction'=>'ASC');
            	$sort = json_encode($sort);
            }
        $InstId  =  $this->input->get_post('instanceid', TRUE);
        if (strlen($InstId) > 0) {
            $iu_u_def= $this->m_iu_u_def->getRowsByInstance($InstId,$sort);
            $return = array(
                'success' =>  TRUE ,
                'data'    => $iu_u_def
            );
        }
        else {
            $return = array(
                'success' => FALSE,
                'msg'     => 'Need instanceid to query.'
            );
        }
        print json_encode($return);
    }
    function getRowsByParent() {
        log_message('debug', 'iu_u_def.getRowsByParent post : '.json_encode($this->input->post(NULL, FALSE)));
            $group = $this->input->get('group', FALSE); 
           $sort = $this->input->get('sort', FALSE);
           if(!$sort && $group) $sort = $group;
           if(!$sort || $group == $sort) 
            {
            	$sort = json_decode($sort);
            	$sort[] = array('property'=>'lastname', 'direction'=>'ASC');
            	$sort = json_encode($sort);
            }
        $ParentId  =  $this->input->get_post('parentid', TRUE);
        if (strlen($ParentId) > 0) {
            $iu_u_def= $this->m_iu_u_def->getRowsByParent($ParentId,$sort);
            $return = array(
                'success' => TRUE,
                'data'    => $iu_u_def
            );
        }
        else {
            $return = array(
                'success' => FALSE,
                'msg'     => 'Need parent parentid to query.'
            );
        }
        print json_encode($return);
    }
    function deleteRow() {
        log_message('debug', 'iu_u_def.deleteRow post : '.json_encode($this->input->post(NULL, FALSE)));
        $tempId  =  $this->input->get_post('iu_u_defid', TRUE);
        if (strlen($tempId) > 0) {
            $return = $this->m_iu_u_def->deleteRow($tempId);
        }
        else {
            $return = array(
                'success' => FALSE,
                'msg'     => 'No  ID to delete'
            );
        }
        print json_encode($return);
    }
    private function _loadModels () {
        $this->load->model('M_iu_u_def', 'm_iu_u_def');
    }
}
?>
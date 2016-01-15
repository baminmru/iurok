<?php
	 class C_iu_tmdef extends CI_Controller {
    function __construct() {
         parent::__construct();
        $this->_loadModels();
    }
    function setRow() {
          log_message('debug', 'iu_tmdef.setRow post : '.json_encode($this->input->post(NULL, FALSE)));
          log_message('debug', 'iu_tmdef.getRows get : '.json_encode($this->input->get(NULL, FALSE)));
          $data = array(
                'iu_tmdefid' =>  $this->input->get_post('iu_tmdefid', TRUE)
                ,'instanceid' =>  $this->input->get_post('instanceid', TRUE)
                ,'lastname' =>   $this->input->get_post('lastname', TRUE)
                ,'name' =>   $this->input->get_post('name', TRUE)
                ,'surname' =>   $this->input->get_post('surname', TRUE)
                ,'subjects' =>   $this->input->get_post('subjects', TRUE)
                ,'classes' =>   $this->input->get_post('classes', TRUE)
                ,'thephone' =>   $this->input->get_post('thephone', TRUE)
                ,'email' =>   $this->input->get_post('email', TRUE)
                ,'sendtomail' =>   $this->input->get_post('sendtomail', TRUE)
                ,'regal' =>   $this->input->get_post('regal', TRUE)
                ,'ismethodist' =>   $this->input->get_post('ismethodist', TRUE)
                ,'thetown' =>   $this->input->get_post('thetown', TRUE)
                ,'workat' =>   $this->input->get_post('workat', TRUE)
            );
            $iu_tmdef = $this->m_iu_tmdef->setRow($data);
            print json_encode($iu_tmdef);
    }
    function newRow() {
            log_message('debug', 'iu_tmdef.newRow post : '.json_encode($this->input->post(NULL, FALSE)));
          $data = array(
                'iu_tmdefid' =>  $this->input->get_post('iu_tmdefid', TRUE)
                ,'instanceid' =>  $this->input->get_post('instanceid', TRUE)
                ,'lastname' =>   $this->input->get_post('lastname', TRUE)
                ,'name' =>   $this->input->get_post('name', TRUE)
                ,'surname' =>   $this->input->get_post('surname', TRUE)
                ,'subjects' =>   $this->input->get_post('subjects', TRUE)
                ,'classes' =>   $this->input->get_post('classes', TRUE)
                ,'thephone' =>   $this->input->get_post('thephone', TRUE)
                ,'email' =>   $this->input->get_post('email', TRUE)
                ,'sendtomail' =>   $this->input->get_post('sendtomail', TRUE)
                ,'regal' =>   $this->input->get_post('regal', TRUE)
                ,'ismethodist' =>   $this->input->get_post('ismethodist', TRUE)
                ,'thetown' =>   $this->input->get_post('thetown', TRUE)
                ,'workat' =>   $this->input->get_post('workat', TRUE)
            );
                $instanceid =  $this->input->get_post('instanceid', TRUE);
            $iu_tmdef= $this->m_iu_tmdef->newRow($instanceid,$data);
            $return = $iu_tmdef;
            print json_encode($return);
    }
    function getRow() {
        log_message('debug', 'iu_tmdef.getRow post : '.json_encode($this->input->post(NULL, FALSE)));
        $empId  =  $this->input->get_post('id', TRUE);
        if (isset($empId)) {
            $iu_tmdef = $this->m_iu_tmdef->getRow($empId);
            $return = array(
                'success' => true,
                'data'    => $iu_tmdef
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
                    $iu_tmdef= $this->m_iu_tmdef->getRowsByInstance($instanceid,$sort);
                }else{
                    $iu_tmdef= $this->m_iu_tmdef->getRows($sort);
                }
            }else{
              $iu_tmdef= $this->m_iu_tmdef->getRows($sort);
            }
            $return = array(
                'success' =>  TRUE ,
                'data'    => $iu_tmdef
            );
        print json_encode($return);
    }
    function getRowsByInstance() {
        log_message('debug', 'iu_tmdef.getRowsByInstance post : '.json_encode($this->input->post(NULL, FALSE)));
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
            $iu_tmdef= $this->m_iu_tmdef->getRowsByInstance($InstId,$sort);
            $return = array(
                'success' =>  TRUE ,
                'data'    => $iu_tmdef
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
        log_message('debug', 'iu_tmdef.getRowsByParent post : '.json_encode($this->input->post(NULL, FALSE)));
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
            $iu_tmdef= $this->m_iu_tmdef->getRowsByParent($ParentId,$sort);
            $return = array(
                'success' => TRUE,
                'data'    => $iu_tmdef
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
        log_message('debug', 'iu_tmdef.deleteRow post : '.json_encode($this->input->post(NULL, FALSE)));
        $tempId  =  $this->input->get_post('iu_tmdefid', TRUE);
        if (strlen($tempId) > 0) {
            $return = $this->m_iu_tmdef->deleteRow($tempId);
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
        $this->load->model('M_iu_tmdef', 'm_iu_tmdef');
    }
}
?>
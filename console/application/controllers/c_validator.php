<?php
	 class C_validator extends CI_Controller {
    function __construct() {
         parent::__construct();
        $this->_loadModels();
    }
    function setRow() {
          log_message('debug', 'VALIDATOR.setRow post : '.json_encode($this->input->post(NULL, FALSE)));
          log_message('debug', 'VALIDATOR.getRows get : '.json_encode($this->input->get(NULL, FALSE)));
          $data = array(
                'validatorid' =>  $this->input->get_post('validatorid', TRUE)
                ,'instanceid' =>  $this->input->get_post('instanceid', TRUE)
                ,'parentid' =>  $this->input->get_post('parentid', TRUE)
                ,'target' =>   $this->input->get_post('target', TRUE)
                ,'code' =>   $this->input->get_post('code', TRUE)
            );
            $validator = $this->m_validator->setRow($data);
            print json_encode($validator);
    }
    function newRow() {
            log_message('debug', 'VALIDATOR.newRow post : '.json_encode($this->input->post(NULL, FALSE)));
          $data = array(
                'validatorid' =>  $this->input->get_post('validatorid', TRUE)
                ,'instanceid' =>  $this->input->get_post('instanceid', TRUE)
                ,'parentid' =>  $this->input->get_post('parentid', TRUE)
                ,'target' =>   $this->input->get_post('target', TRUE)
                ,'code' =>   $this->input->get_post('code', TRUE)
            );
                $instanceid =  $this->input->get_post('instanceid', TRUE);
                $parentid =  $this->input->get_post('parentid', TRUE);
            $validator= $this->m_validator->newRow($instanceid,$parentid,$data);
            $return = $validator;
            print json_encode($return);
    }
    function getRow() {
        log_message('debug', 'VALIDATOR.getRow post : '.json_encode($this->input->post(NULL, FALSE)));
        $empId  =  $this->input->get_post('id', TRUE);
        if (isset($empId)) {
            $validator = $this->m_validator->getRow($empId);
            $return = array(
                'success' => true,
                'data'    => $validator
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
            	$sort[] = array('property'=>'target', 'direction'=>'ASC');
            	$sort = json_encode($sort);
            }
            $parentid=$this->input->get('parentid', FALSE);
            if(isset($parentid)){
                if($parentid!=''){
                    $validator= $this->m_validator->getRowsByParent($parentid,$sort);
                }else{
                    $validator= $this->m_validator->getRows($sort);
                }
            }else{
              $validator= $this->m_validator->getRows($sort);
            }
            $return = array(
                'success' =>  TRUE ,
                'data'    => $validator
            );
        print json_encode($return);
    }
    function getRowsByInstance() {
        log_message('debug', 'VALIDATOR.getRowsByInstance post : '.json_encode($this->input->post(NULL, FALSE)));
            $group = $this->input->get('group', FALSE); 
           $sort = $this->input->get('sort', FALSE);
           if(!$sort && $group) $sort = $group;
           if(!$sort || $group == $sort) 
            {
            	$sort = json_decode($sort);
            	$sort[] = array('property'=>'target', 'direction'=>'ASC');
            	$sort = json_encode($sort);
            }
        $InstId  =  $this->input->get_post('instanceid', TRUE);
        if (strlen($InstId) > 0) {
            $validator= $this->m_validator->getRowsByInstance($InstId,$sort);
            $return = array(
                'success' =>  TRUE ,
                'data'    => $validator
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
        log_message('debug', 'VALIDATOR.getRowsByParent post : '.json_encode($this->input->post(NULL, FALSE)));
            $group = $this->input->get('group', FALSE); 
           $sort = $this->input->get('sort', FALSE);
           if(!$sort && $group) $sort = $group;
           if(!$sort || $group == $sort) 
            {
            	$sort = json_decode($sort);
            	$sort[] = array('property'=>'target', 'direction'=>'ASC');
            	$sort = json_encode($sort);
            }
        $ParentId  =  $this->input->get_post('parentid', TRUE);
        if (strlen($ParentId) > 0) {
            $validator= $this->m_validator->getRowsByParent($ParentId,$sort);
            $return = array(
                'success' => TRUE,
                'data'    => $validator
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
        log_message('debug', 'VALIDATOR.deleteRow post : '.json_encode($this->input->post(NULL, FALSE)));
        $tempId  =  $this->input->get_post('validatorid', TRUE);
        if (strlen($tempId) > 0) {
            $return = $this->m_validator->deleteRow($tempId);
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
        $this->load->model('M_validator', 'm_validator');
    }
}
?>
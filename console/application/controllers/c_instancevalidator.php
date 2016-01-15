<?php
	 class C_instancevalidator extends CI_Controller {
    function __construct() {
         parent::__construct();
        $this->_loadModels();
    }
    function setRow() {
          log_message('debug', 'INSTANCEVALIDATOR.setRow post : '.json_encode($this->input->post(NULL, FALSE)));
          log_message('debug', 'INSTANCEVALIDATOR.getRows get : '.json_encode($this->input->get(NULL, FALSE)));
          $data = array(
                'instancevalidatorid' =>  $this->input->get_post('instancevalidatorid', TRUE)
                ,'instanceid' =>  $this->input->get_post('instanceid', TRUE)
                ,'parentid' =>  $this->input->get_post('parentid', TRUE)
                ,'target' =>   $this->input->get_post('target', TRUE)
                ,'code' =>   $this->input->get_post('code', TRUE)
            );
            $instancevalidator = $this->m_instancevalidator->setRow($data);
            print json_encode($instancevalidator);
    }
    function newRow() {
            log_message('debug', 'INSTANCEVALIDATOR.newRow post : '.json_encode($this->input->post(NULL, FALSE)));
          $data = array(
                'instancevalidatorid' =>  $this->input->get_post('instancevalidatorid', TRUE)
                ,'instanceid' =>  $this->input->get_post('instanceid', TRUE)
                ,'parentid' =>  $this->input->get_post('parentid', TRUE)
                ,'target' =>   $this->input->get_post('target', TRUE)
                ,'code' =>   $this->input->get_post('code', TRUE)
            );
                $instanceid =  $this->input->get_post('instanceid', TRUE);
                $parentid =  $this->input->get_post('parentid', TRUE);
            $instancevalidator= $this->m_instancevalidator->newRow($instanceid,$parentid,$data);
            $return = $instancevalidator;
            print json_encode($return);
    }
    function getRow() {
        log_message('debug', 'INSTANCEVALIDATOR.getRow post : '.json_encode($this->input->post(NULL, FALSE)));
        $empId  =  $this->input->get_post('id', TRUE);
        if (isset($empId)) {
            $instancevalidator = $this->m_instancevalidator->getRow($empId);
            $return = array(
                'success' => true,
                'data'    => $instancevalidator
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
                    $instancevalidator= $this->m_instancevalidator->getRowsByParent($parentid,$sort);
                }else{
                    $instancevalidator= $this->m_instancevalidator->getRows($sort);
                }
            }else{
              $instancevalidator= $this->m_instancevalidator->getRows($sort);
            }
            $return = array(
                'success' =>  TRUE ,
                'data'    => $instancevalidator
            );
        print json_encode($return);
    }
    function getRowsByInstance() {
        log_message('debug', 'INSTANCEVALIDATOR.getRowsByInstance post : '.json_encode($this->input->post(NULL, FALSE)));
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
            $instancevalidator= $this->m_instancevalidator->getRowsByInstance($InstId,$sort);
            $return = array(
                'success' =>  TRUE ,
                'data'    => $instancevalidator
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
        log_message('debug', 'INSTANCEVALIDATOR.getRowsByParent post : '.json_encode($this->input->post(NULL, FALSE)));
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
            $instancevalidator= $this->m_instancevalidator->getRowsByParent($ParentId,$sort);
            $return = array(
                'success' => TRUE,
                'data'    => $instancevalidator
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
        log_message('debug', 'INSTANCEVALIDATOR.deleteRow post : '.json_encode($this->input->post(NULL, FALSE)));
        $tempId  =  $this->input->get_post('instancevalidatorid', TRUE);
        if (strlen($tempId) > 0) {
            $return = $this->m_instancevalidator->deleteRow($tempId);
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
        $this->load->model('M_instancevalidator', 'm_instancevalidator');
    }
}
?>
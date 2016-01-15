<?php
	 class C_fieldvalidator extends CI_Controller {
    function __construct() {
         parent::__construct();
        $this->_loadModels();
    }
    function setRow() {
          log_message('debug', 'FIELDVALIDATOR.setRow post : '.json_encode($this->input->post(NULL, FALSE)));
          log_message('debug', 'FIELDVALIDATOR.getRows get : '.json_encode($this->input->get(NULL, FALSE)));
          $data = array(
                'fieldvalidatorid' =>  $this->input->get_post('fieldvalidatorid', TRUE)
                ,'instanceid' =>  $this->input->get_post('instanceid', TRUE)
                ,'parentid' =>  $this->input->get_post('parentid', TRUE)
                ,'target' =>   $this->input->get_post('target', TRUE)
                ,'code' =>   $this->input->get_post('code', TRUE)
            );
            $fieldvalidator = $this->m_fieldvalidator->setRow($data);
            print json_encode($fieldvalidator);
    }
    function newRow() {
            log_message('debug', 'FIELDVALIDATOR.newRow post : '.json_encode($this->input->post(NULL, FALSE)));
          $data = array(
                'fieldvalidatorid' =>  $this->input->get_post('fieldvalidatorid', TRUE)
                ,'instanceid' =>  $this->input->get_post('instanceid', TRUE)
                ,'parentid' =>  $this->input->get_post('parentid', TRUE)
                ,'target' =>   $this->input->get_post('target', TRUE)
                ,'code' =>   $this->input->get_post('code', TRUE)
            );
                $instanceid =  $this->input->get_post('instanceid', TRUE);
                $parentid =  $this->input->get_post('parentid', TRUE);
            $fieldvalidator= $this->m_fieldvalidator->newRow($instanceid,$parentid,$data);
            $return = $fieldvalidator;
            print json_encode($return);
    }
    function getRow() {
        log_message('debug', 'FIELDVALIDATOR.getRow post : '.json_encode($this->input->post(NULL, FALSE)));
        $empId  =  $this->input->get_post('id', TRUE);
        if (isset($empId)) {
            $fieldvalidator = $this->m_fieldvalidator->getRow($empId);
            $return = array(
                'success' => true,
                'data'    => $fieldvalidator
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
                    $fieldvalidator= $this->m_fieldvalidator->getRowsByParent($parentid,$sort);
                }else{
                    $fieldvalidator= $this->m_fieldvalidator->getRows($sort);
                }
            }else{
              $fieldvalidator= $this->m_fieldvalidator->getRows($sort);
            }
            $return = array(
                'success' =>  TRUE ,
                'data'    => $fieldvalidator
            );
        print json_encode($return);
    }
    function getRowsByInstance() {
        log_message('debug', 'FIELDVALIDATOR.getRowsByInstance post : '.json_encode($this->input->post(NULL, FALSE)));
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
            $fieldvalidator= $this->m_fieldvalidator->getRowsByInstance($InstId,$sort);
            $return = array(
                'success' =>  TRUE ,
                'data'    => $fieldvalidator
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
        log_message('debug', 'FIELDVALIDATOR.getRowsByParent post : '.json_encode($this->input->post(NULL, FALSE)));
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
            $fieldvalidator= $this->m_fieldvalidator->getRowsByParent($ParentId,$sort);
            $return = array(
                'success' => TRUE,
                'data'    => $fieldvalidator
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
        log_message('debug', 'FIELDVALIDATOR.deleteRow post : '.json_encode($this->input->post(NULL, FALSE)));
        $tempId  =  $this->input->get_post('fieldvalidatorid', TRUE);
        if (strlen($tempId) > 0) {
            $return = $this->m_fieldvalidator->deleteRow($tempId);
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
        $this->load->model('M_fieldvalidator', 'm_fieldvalidator');
    }
}
?>
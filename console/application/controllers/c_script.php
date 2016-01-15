﻿<?php
	 class C_script extends CI_Controller {
    function __construct() {
         parent::__construct();
        $this->_loadModels();
    }
    function setRow() {
          log_message('debug', 'SCRIPT.setRow post : '.json_encode($this->input->post(NULL, FALSE)));
          log_message('debug', 'SCRIPT.getRows get : '.json_encode($this->input->get(NULL, FALSE)));
          $data = array(
                'scriptid' =>  $this->input->get_post('scriptid', TRUE)
                ,'instanceid' =>  $this->input->get_post('instanceid', TRUE)
                ,'parentid' =>  $this->input->get_post('parentid', TRUE)
                ,'target' =>   $this->input->get_post('target', TRUE)
                ,'code' =>   $this->input->get_post('code', TRUE)
            );
            $script = $this->m_script->setRow($data);
            print json_encode($script);
    }
    function newRow() {
            log_message('debug', 'SCRIPT.newRow post : '.json_encode($this->input->post(NULL, FALSE)));
          $data = array(
                'scriptid' =>  $this->input->get_post('scriptid', TRUE)
                ,'instanceid' =>  $this->input->get_post('instanceid', TRUE)
                ,'parentid' =>  $this->input->get_post('parentid', TRUE)
                ,'target' =>   $this->input->get_post('target', TRUE)
                ,'code' =>   $this->input->get_post('code', TRUE)
            );
                $instanceid =  $this->input->get_post('instanceid', TRUE);
                $parentid =  $this->input->get_post('parentid', TRUE);
            $script= $this->m_script->newRow($instanceid,$parentid,$data);
            $return = $script;
            print json_encode($return);
    }
    function getRow() {
        log_message('debug', 'SCRIPT.getRow post : '.json_encode($this->input->post(NULL, FALSE)));
        $empId  =  $this->input->get_post('id', TRUE);
        if (isset($empId)) {
            $script = $this->m_script->getRow($empId);
            $return = array(
                'success' => true,
                'data'    => $script
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
                    $script= $this->m_script->getRowsByParent($parentid,$sort);
                }else{
                    $script= $this->m_script->getRows($sort);
                }
            }else{
              $script= $this->m_script->getRows($sort);
            }
            $return = array(
                'success' =>  TRUE ,
                'data'    => $script
            );
        print json_encode($return);
    }
    function getRowsByInstance() {
        log_message('debug', 'SCRIPT.getRowsByInstance post : '.json_encode($this->input->post(NULL, FALSE)));
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
            $script= $this->m_script->getRowsByInstance($InstId,$sort);
            $return = array(
                'success' =>  TRUE ,
                'data'    => $script
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
        log_message('debug', 'SCRIPT.getRowsByParent post : '.json_encode($this->input->post(NULL, FALSE)));
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
            $script= $this->m_script->getRowsByParent($ParentId,$sort);
            $return = array(
                'success' => TRUE,
                'data'    => $script
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
        log_message('debug', 'SCRIPT.deleteRow post : '.json_encode($this->input->post(NULL, FALSE)));
        $tempId  =  $this->input->get_post('scriptid', TRUE);
        if (strlen($tempId) > 0) {
            $return = $this->m_script->deleteRow($tempId);
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
        $this->load->model('M_script', 'm_script');
    }
}
?>
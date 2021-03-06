﻿<?php
	 class C_iu_stage_doc extends CI_Controller {
    function __construct() {
         parent::__construct();
        $this->_loadModels();
    }
    function setRow() {
          log_message('debug', 'iu_stage_doc.setRow post : '.json_encode($this->input->post(NULL, FALSE)));
          log_message('debug', 'iu_stage_doc.getRows get : '.json_encode($this->input->get(NULL, FALSE)));
          $data = array(
                'iu_stage_docid' =>  $this->input->get_post('iu_stage_docid', TRUE)
                ,'instanceid' =>  $this->input->get_post('instanceid', TRUE)
,'allowdoc' =>   $this->input->get_post('allowdoc', TRUE)
,'name' =>   $this->input->get_post('name', TRUE)
,'info' =>   $this->input->get_post('info', TRUE)
,'doctype' =>   $this->input->get_post('doctype', TRUE)
            );
            $iu_stage_doc = $this->m_iu_stage_doc->setRow($data);
            print json_encode($iu_stage_doc);
    }
    function newRow() {
            log_message('debug', 'iu_stage_doc.newRow post : '.json_encode($this->input->post(NULL, FALSE)));
          $data = array(
                'iu_stage_docid' =>  $this->input->get_post('iu_stage_docid', TRUE)
                ,'instanceid' =>  $this->input->get_post('instanceid', TRUE)
,'allowdoc' =>   $this->input->get_post('allowdoc', TRUE)
,'name' =>   $this->input->get_post('name', TRUE)
,'info' =>   $this->input->get_post('info', TRUE)
,'doctype' =>   $this->input->get_post('doctype', TRUE)
            );
                $instanceid =  $this->input->get_post('instanceid', TRUE);
            $iu_stage_doc= $this->m_iu_stage_doc->newRow($instanceid,$data);
            $return = $iu_stage_doc;
            print json_encode($return);
    }
    function getRow() {
        log_message('debug', 'iu_stage_doc.getRow post : '.json_encode($this->input->post(NULL, FALSE)));
        $empId  =  $this->input->get_post('id', TRUE);
        if (isset($empId)) {
            $iu_stage_doc = $this->m_iu_stage_doc->getRow($empId);
            $return = array(
                'success' => true,
                'data'    => $iu_stage_doc
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
            	$sort[] = array('property'=>'name', 'direction'=>'ASC');
            	$sort = json_encode($sort);
            }
            $instanceid=$this->input->get('instanceid', FALSE);
            if(isset($instanceid)){
                if($instanceid!=''){
                    $iu_stage_doc= $this->m_iu_stage_doc->getRowsByInstance($instanceid,$sort);
                }else{
                    $iu_stage_doc= $this->m_iu_stage_doc->getRows($sort);
                }
            }else{
              $iu_stage_doc= $this->m_iu_stage_doc->getRows($sort);
            }
            $return = array(
                'success' =>  TRUE ,
                'data'    => $iu_stage_doc
            );
        print json_encode($return);
    }
    function getRowsByInstance() {
        log_message('debug', 'iu_stage_doc.getRowsByInstance post : '.json_encode($this->input->post(NULL, FALSE)));
            $group = $this->input->get('group', FALSE); 
           $sort = $this->input->get('sort', FALSE);
           if(!$sort && $group) $sort = $group;
           if(!$sort || $group == $sort) 
            {
            	$sort = json_decode($sort);
            	$sort[] = array('property'=>'name', 'direction'=>'ASC');
            	$sort = json_encode($sort);
            }
        $InstId  =  $this->input->get_post('instanceid', TRUE);
        if (strlen($InstId) > 0) {
            $iu_stage_doc= $this->m_iu_stage_doc->getRowsByInstance($InstId,$sort);
            $return = array(
                'success' =>  TRUE ,
                'data'    => $iu_stage_doc
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
        log_message('debug', 'iu_stage_doc.getRowsByParent post : '.json_encode($this->input->post(NULL, FALSE)));
            $group = $this->input->get('group', FALSE); 
           $sort = $this->input->get('sort', FALSE);
           if(!$sort && $group) $sort = $group;
           if(!$sort || $group == $sort) 
            {
            	$sort = json_decode($sort);
            	$sort[] = array('property'=>'name', 'direction'=>'ASC');
            	$sort = json_encode($sort);
            }
        $ParentId  =  $this->input->get_post('parentid', TRUE);
        if (strlen($ParentId) > 0) {
            $iu_stage_doc= $this->m_iu_stage_doc->getRowsByParent($ParentId,$sort);
            $return = array(
                'success' => TRUE,
                'data'    => $iu_stage_doc
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
        log_message('debug', 'iu_stage_doc.deleteRow post : '.json_encode($this->input->post(NULL, FALSE)));
        $tempId  =  $this->input->get_post('iu_stage_docid', TRUE);
        if (strlen($tempId) > 0) {
            $return = $this->m_iu_stage_doc->deleteRow($tempId);
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
        $this->load->model('M_iu_stage_doc', 'm_iu_stage_doc');
    }
}
?>
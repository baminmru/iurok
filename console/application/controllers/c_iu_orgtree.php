<?php
	 class C_iu_orgtree extends CI_Controller {
    function __construct() {
         parent::__construct();
        $this->_loadModels();
    }
    function setRow() {
          log_message('debug', 'iu_orgtree.setRow post : '.json_encode($this->input->post(NULL, FALSE)));
          log_message('debug', 'iu_orgtree.getRows get : '.json_encode($this->input->get(NULL, FALSE)));
          $data = array(
                'iu_orgtreeid' =>  $this->input->get_post('iu_orgtreeid', TRUE)
                ,'instanceid' =>  $this->input->get_post('instanceid', TRUE)
                ,'treeid' =>  $this->input->get_post('treeid', TRUE)
                ,'name' =>   $this->input->get_post('name', TRUE)
            );
            $iu_orgtree = $this->m_iu_orgtree->setRow($data);
            print json_encode($iu_orgtree);
    }
    function newRow() {
            log_message('debug', 'iu_orgtree.newRow post : '.json_encode($this->input->post(NULL, FALSE)));
          $data = array(
                'iu_orgtreeid' =>  $this->input->get_post('iu_orgtreeid', TRUE)
                ,'instanceid' =>  $this->input->get_post('instanceid', TRUE)
                ,'treeid' =>  $this->input->get_post('treeid', TRUE)
                ,'name' =>   $this->input->get_post('name', TRUE)
            );
                $instanceid =  $this->input->get_post('instanceid', TRUE);
            $treeid=$this->input->post('treeid', FALSE);
            $iu_orgtree= $this->m_iu_orgtree->newRow($instanceid,$treeid,$data);
            $return = $iu_orgtree;
            print json_encode($return);
    }
    function getRow() {
        log_message('debug', 'iu_orgtree.getRow post : '.json_encode($this->input->post(NULL, FALSE)));
        $empId  =  $this->input->get_post('id', TRUE);
            $treeid  =  $this->input->get_post('treeid', TRUE);
        if (isset($empId)) {
            $iu_orgtree = $this->m_iu_orgtree->getRow($empId,$treeid);
            $return = array(
                'success' => true,
                'data'    => $iu_orgtree
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
           	$treeid=$this->input->get('treeid', FALSE);
                     if(isset($instanceid)){
                         if($instanceid!=''){
           			if(isset($treeid)){
           				log_message('debug', 'iu_orgtree.getRows getRowsByInstanceTree');
           				$iu_orgtree= $this->m_iu_orgtree->getRowsByInstanceTree($instanceid,$treeid,$sort);
           			}else{
           				log_message('debug', 'iu_orgtree.getRows getRowsByInstance');
           				$iu_orgtree= $this->m_iu_orgtree->getRowsByInstance($instanceid,$sort);
           			}
                         }else{
                             if(isset($treeid)){
           				log_message('debug', 'iu_orgtree.getRows getRowsByTree');
           				$iu_orgtree= $this->m_iu_orgtree->getRowsByTree($treeid,$sort);
           			}else{
           				log_message('debug', 'iu_orgtree.getRows getRows');
           				$iu_orgtree= $this->m_iu_orgtree->getRows($sort);
           			}
                         }
                     }else{
           			if(isset($treeid)){
           				log_message('debug', 'iu_orgtree.getRows getRowsByTree');
           				$iu_orgtree= $this->m_iu_orgtree->getRowsByTree($treeid,$sort);
           			}else{
           				log_message('debug', 'iu_orgtree.getRows getRows');
           				$iu_orgtree= $this->m_iu_orgtree->getRows($sort);
           			}
                     }
           print json_encode($iu_orgtree);
    }
    function getRowsByInstance() {
        log_message('debug', 'iu_orgtree.getRowsByInstance post : '.json_encode($this->input->post(NULL, FALSE)));
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
            $iu_orgtree= $this->m_iu_orgtree->getRowsByInstance($InstId,$sort);
            $return = array(
                'success' =>  TRUE ,
                'data'    => $iu_orgtree
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
        log_message('debug', 'iu_orgtree.getRowsByParent post : '.json_encode($this->input->post(NULL, FALSE)));
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
            $iu_orgtree= $this->m_iu_orgtree->getRowsByParent($ParentId,$sort);
            $return = array(
                'success' => TRUE,
                'data'    => $iu_orgtree
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
        log_message('debug', 'iu_orgtree.deleteRow post : '.json_encode($this->input->post(NULL, FALSE)));
        $tempId  =  $this->input->get_post('iu_orgtreeid', TRUE);
        if (strlen($tempId) > 0) {
            $return = $this->m_iu_orgtree->deleteRow($tempId);
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
        $this->load->model('M_iu_orgtree', 'm_iu_orgtree');
    }
}
?>
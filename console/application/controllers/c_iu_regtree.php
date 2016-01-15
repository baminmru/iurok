<?php
	 class C_iu_regtree extends CI_Controller {
    function __construct() {
         parent::__construct();
        $this->_loadModels();
    }
    function setRow() {
          log_message('debug', 'iu_regtree.setRow post : '.json_encode($this->input->post(NULL, FALSE)));
          log_message('debug', 'iu_regtree.getRows get : '.json_encode($this->input->get(NULL, FALSE)));
          $data = array(
                'iu_regtreeid' =>  $this->input->get_post('iu_regtreeid', TRUE)
                ,'instanceid' =>  $this->input->get_post('instanceid', TRUE)
                ,'treeid' =>  $this->input->get_post('treeid', TRUE)
                ,'name' =>   $this->input->get_post('name', TRUE)
            );
            $iu_regtree = $this->m_iu_regtree->setRow($data);
            print json_encode($iu_regtree);
    }
    function newRow() {
            log_message('debug', 'iu_regtree.newRow post : '.json_encode($this->input->post(NULL, FALSE)));
          $data = array(
                'iu_regtreeid' =>  $this->input->get_post('iu_regtreeid', TRUE)
                ,'instanceid' =>  $this->input->get_post('instanceid', TRUE)
                ,'treeid' =>  $this->input->get_post('treeid', TRUE)
                ,'name' =>   $this->input->get_post('name', TRUE)
            );
                $instanceid =  $this->input->get_post('instanceid', TRUE);
            $treeid=$this->input->post('treeid', FALSE);
            $iu_regtree= $this->m_iu_regtree->newRow($instanceid,$treeid,$data);
            $return = $iu_regtree;
            print json_encode($return);
    }
    function getRow() {
        log_message('debug', 'iu_regtree.getRow post : '.json_encode($this->input->post(NULL, FALSE)));
        $empId  =  $this->input->get_post('id', TRUE);
            $treeid  =  $this->input->get_post('treeid', TRUE);
        if (isset($empId)) {
            $iu_regtree = $this->m_iu_regtree->getRow($empId,$treeid);
            $return = array(
                'success' => true,
                'data'    => $iu_regtree
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
           				log_message('debug', 'iu_regtree.getRows getRowsByInstanceTree');
           				$iu_regtree= $this->m_iu_regtree->getRowsByInstanceTree($instanceid,$treeid,$sort);
           			}else{
           				log_message('debug', 'iu_regtree.getRows getRowsByInstance');
           				$iu_regtree= $this->m_iu_regtree->getRowsByInstance($instanceid,$sort);
           			}
                         }else{
                             if(isset($treeid)){
           				log_message('debug', 'iu_regtree.getRows getRowsByTree');
           				$iu_regtree= $this->m_iu_regtree->getRowsByTree($treeid,$sort);
           			}else{
           				log_message('debug', 'iu_regtree.getRows getRows');
           				$iu_regtree= $this->m_iu_regtree->getRows($sort);
           			}
                         }
                     }else{
           			if(isset($treeid)){
           				log_message('debug', 'iu_regtree.getRows getRowsByTree');
           				$iu_regtree= $this->m_iu_regtree->getRowsByTree($treeid,$sort);
           			}else{
           				log_message('debug', 'iu_regtree.getRows getRows');
           				$iu_regtree= $this->m_iu_regtree->getRows($sort);
           			}
                     }
           print json_encode($iu_regtree);
    }
    function getRowsByInstance() {
        log_message('debug', 'iu_regtree.getRowsByInstance post : '.json_encode($this->input->post(NULL, FALSE)));
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
            $iu_regtree= $this->m_iu_regtree->getRowsByInstance($InstId,$sort);
            $return = array(
                'success' =>  TRUE ,
                'data'    => $iu_regtree
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
        log_message('debug', 'iu_regtree.getRowsByParent post : '.json_encode($this->input->post(NULL, FALSE)));
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
            $iu_regtree= $this->m_iu_regtree->getRowsByParent($ParentId,$sort);
            $return = array(
                'success' => TRUE,
                'data'    => $iu_regtree
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
        log_message('debug', 'iu_regtree.deleteRow post : '.json_encode($this->input->post(NULL, FALSE)));
        $tempId  =  $this->input->get_post('iu_regtreeid', TRUE);
        if (strlen($tempId) > 0) {
            $return = $this->m_iu_regtree->deleteRow($tempId);
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
        $this->load->model('M_iu_regtree', 'm_iu_regtree');
    }
}
?>
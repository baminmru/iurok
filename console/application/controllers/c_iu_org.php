<?php
	 class C_iu_org extends CI_Controller {
    function __construct() {
         parent::__construct();
        $this->_loadModels();
    }
    function setRow() {
          log_message('debug', 'iu_org.setRow post : '.json_encode($this->input->post(NULL, FALSE)));
          log_message('debug', 'iu_org.getRows get : '.json_encode($this->input->get(NULL, FALSE)));
          $data = array(
                'iu_orgid' =>  $this->input->get_post('iu_orgid', TRUE)
                ,'instanceid' =>  $this->input->get_post('instanceid', TRUE)
                ,'treeid' =>  $this->input->get_post('treeid', TRUE)
,'name' =>   $this->input->get_post('name', TRUE)
            );
            $iu_org = $this->m_iu_org->setRow($data);
            print json_encode($iu_org);
    }
    function newRow() {
            log_message('debug', 'iu_org.newRow post : '.json_encode($this->input->post(NULL, FALSE)));
          $data = array(
                'iu_orgid' =>  $this->input->get_post('iu_orgid', TRUE)
                ,'instanceid' =>  $this->input->get_post('instanceid', TRUE)
                ,'treeid' =>  $this->input->get_post('treeid', TRUE)
,'name' =>   $this->input->get_post('name', TRUE)
            );
                $instanceid =  $this->input->get_post('instanceid', TRUE);
            $treeid=$this->input->post('treeid', FALSE);
            $iu_org= $this->m_iu_org->newRow($instanceid,$treeid,$data);
            $return = $iu_org;
            print json_encode($return);
    }
    function getRow() {
        log_message('debug', 'iu_org.getRow post : '.json_encode($this->input->post(NULL, FALSE)));
        $empId  =  $this->input->get_post('id', TRUE);
            $treeid  =  $this->input->get_post('treeid', TRUE);
        if (isset($empId)) {
            $iu_org = $this->m_iu_org->getRow($empId,$treeid);
            $return = array(
                'success' => true,
                'data'    => $iu_org
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
           				log_message('debug', 'iu_org.getRows getRowsByInstanceTree');
           				$iu_org= $this->m_iu_org->getRowsByInstanceTree($instanceid,$treeid,$sort);
           			}else{
           				log_message('debug', 'iu_org.getRows getRowsByInstance');
           				$iu_org= $this->m_iu_org->getRowsByInstance($instanceid,$sort);
           			}
                         }else{
                             if(isset($treeid)){
           				log_message('debug', 'iu_org.getRows getRowsByTree');
           				$iu_org= $this->m_iu_org->getRowsByTree($treeid,$sort);
           			}else{
           				log_message('debug', 'iu_org.getRows getRows');
           				$iu_org= $this->m_iu_org->getRows($sort);
           			}
                         }
                     }else{
           			if(isset($treeid)){
           				log_message('debug', 'iu_org.getRows getRowsByTree');
           				$iu_org= $this->m_iu_org->getRowsByTree($treeid,$sort);
           			}else{
           				log_message('debug', 'iu_org.getRows getRows');
           				$iu_org= $this->m_iu_org->getRows($sort);
           			}
                     }
           print json_encode($iu_org);
    }
    function getRowsByInstance() {
        log_message('debug', 'iu_org.getRowsByInstance post : '.json_encode($this->input->post(NULL, FALSE)));
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
            $iu_org= $this->m_iu_org->getRowsByInstance($InstId,$sort);
            $return = array(
                'success' =>  TRUE ,
                'data'    => $iu_org
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
        log_message('debug', 'iu_org.getRowsByParent post : '.json_encode($this->input->post(NULL, FALSE)));
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
            $iu_org= $this->m_iu_org->getRowsByParent($ParentId,$sort);
            $return = array(
                'success' => TRUE,
                'data'    => $iu_org
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
        log_message('debug', 'iu_org.deleteRow post : '.json_encode($this->input->post(NULL, FALSE)));
        $tempId  =  $this->input->get_post('iu_orgid', TRUE);
        if (strlen($tempId) > 0) {
            $return = $this->m_iu_org->deleteRow($tempId);
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
        $this->load->model('M_iu_org', 'm_iu_org');
    }
}
?>
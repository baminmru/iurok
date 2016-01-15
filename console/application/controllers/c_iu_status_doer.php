<?php
	 class C_iu_status_doer extends CI_Controller {
    function __construct() {
         parent::__construct();
        $this->_loadModels();
    }
    function setRow() {
          log_message('debug', 'iu_status_doer.setRow post : '.json_encode($this->input->post(NULL, FALSE)));
          log_message('debug', 'iu_status_doer.getRows get : '.json_encode($this->input->get(NULL, FALSE)));
          $data = array(
                'iu_status_doerid' =>  $this->input->get_post('iu_status_doerid', TRUE)
                ,'instanceid' =>  $this->input->get_post('instanceid', TRUE)
                ,'doertype' =>   $this->input->get_post('doertype', TRUE)
                ,'doerallowed' =>   $this->input->get_post('doerallowed', TRUE)
            );
            $iu_status_doer = $this->m_iu_status_doer->setRow($data);
            print json_encode($iu_status_doer);
    }
    function newRow() {
            log_message('debug', 'iu_status_doer.newRow post : '.json_encode($this->input->post(NULL, FALSE)));
          $data = array(
                'iu_status_doerid' =>  $this->input->get_post('iu_status_doerid', TRUE)
                ,'instanceid' =>  $this->input->get_post('instanceid', TRUE)
                ,'doertype' =>   $this->input->get_post('doertype', TRUE)
                ,'doerallowed' =>   $this->input->get_post('doerallowed', TRUE)
            );
                $instanceid =  $this->input->get_post('instanceid', TRUE);
            $iu_status_doer= $this->m_iu_status_doer->newRow($instanceid,$data);
            $return = $iu_status_doer;
            print json_encode($return);
    }
    function getRow() {
        log_message('debug', 'iu_status_doer.getRow post : '.json_encode($this->input->post(NULL, FALSE)));
        $empId  =  $this->input->get_post('id', TRUE);
        if (isset($empId)) {
            $iu_status_doer = $this->m_iu_status_doer->getRow($empId);
            $return = array(
                'success' => true,
                'data'    => $iu_status_doer
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
            	$sort[] = array('property'=>'doertype', 'direction'=>'ASC');
            	$sort = json_encode($sort);
            }
            $instanceid=$this->input->get('instanceid', FALSE);
            if(isset($instanceid)){
                if($instanceid!=''){
                    $iu_status_doer= $this->m_iu_status_doer->getRowsByInstance($instanceid,$sort);
                }else{
                    $iu_status_doer= $this->m_iu_status_doer->getRows($sort);
                }
            }else{
              $iu_status_doer= $this->m_iu_status_doer->getRows($sort);
            }
            $return = array(
                'success' =>  TRUE ,
                'data'    => $iu_status_doer
            );
        print json_encode($return);
    }
    function getRowsByInstance() {
        log_message('debug', 'iu_status_doer.getRowsByInstance post : '.json_encode($this->input->post(NULL, FALSE)));
            $group = $this->input->get('group', FALSE); 
           $sort = $this->input->get('sort', FALSE);
           if(!$sort && $group) $sort = $group;
           if(!$sort || $group == $sort) 
            {
            	$sort = json_decode($sort);
            	$sort[] = array('property'=>'doertype', 'direction'=>'ASC');
            	$sort = json_encode($sort);
            }
        $InstId  =  $this->input->get_post('instanceid', TRUE);
        if (strlen($InstId) > 0) {
            $iu_status_doer= $this->m_iu_status_doer->getRowsByInstance($InstId,$sort);
            $return = array(
                'success' =>  TRUE ,
                'data'    => $iu_status_doer
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
        log_message('debug', 'iu_status_doer.getRowsByParent post : '.json_encode($this->input->post(NULL, FALSE)));
            $group = $this->input->get('group', FALSE); 
           $sort = $this->input->get('sort', FALSE);
           if(!$sort && $group) $sort = $group;
           if(!$sort || $group == $sort) 
            {
            	$sort = json_decode($sort);
            	$sort[] = array('property'=>'doertype', 'direction'=>'ASC');
            	$sort = json_encode($sort);
            }
        $ParentId  =  $this->input->get_post('parentid', TRUE);
        if (strlen($ParentId) > 0) {
            $iu_status_doer= $this->m_iu_status_doer->getRowsByParent($ParentId,$sort);
            $return = array(
                'success' => TRUE,
                'data'    => $iu_status_doer
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
        log_message('debug', 'iu_status_doer.deleteRow post : '.json_encode($this->input->post(NULL, FALSE)));
        $tempId  =  $this->input->get_post('iu_status_doerid', TRUE);
        if (strlen($tempId) > 0) {
            $return = $this->m_iu_status_doer->deleteRow($tempId);
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
        $this->load->model('M_iu_status_doer', 'm_iu_status_doer');
    }
}
?>
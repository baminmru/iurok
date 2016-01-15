<?php
	 class C_iu_crole extends CI_Controller {
    function __construct() {
         parent::__construct();
        $this->_loadModels();
    }
    function setRow() {
          log_message('debug', 'iu_crole.setRow post : '.json_encode($this->input->post(NULL, FALSE)));
          log_message('debug', 'iu_crole.getRows get : '.json_encode($this->input->get(NULL, FALSE)));
          $data = array(
                'iu_croleid' =>  $this->input->get_post('iu_croleid', TRUE)
                ,'instanceid' =>  $this->input->get_post('instanceid', TRUE)
                ,'name' =>   $this->input->get_post('name', TRUE)
                ,'allowsetuser' =>   $this->input->get_post('allowsetuser', TRUE)
            );
            $iu_crole = $this->m_iu_crole->setRow($data);
            print json_encode($iu_crole);
    }
    function newRow() {
            log_message('debug', 'iu_crole.newRow post : '.json_encode($this->input->post(NULL, FALSE)));
          $data = array(
                'iu_croleid' =>  $this->input->get_post('iu_croleid', TRUE)
                ,'instanceid' =>  $this->input->get_post('instanceid', TRUE)
                ,'name' =>   $this->input->get_post('name', TRUE)
                ,'allowsetuser' =>   $this->input->get_post('allowsetuser', TRUE)
            );
                $instanceid =  $this->input->get_post('instanceid', TRUE);
            $iu_crole= $this->m_iu_crole->newRow($instanceid,$data);
            $return = $iu_crole;
            print json_encode($return);
    }
    function getRow() {
        log_message('debug', 'iu_crole.getRow post : '.json_encode($this->input->post(NULL, FALSE)));
        $empId  =  $this->input->get_post('id', TRUE);
        if (isset($empId)) {
            $iu_crole = $this->m_iu_crole->getRow($empId);
            $return = array(
                'success' => true,
                'data'    => $iu_crole
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
                    $iu_crole= $this->m_iu_crole->getRowsByInstance($instanceid,$sort);
                }else{
                    $iu_crole= $this->m_iu_crole->getRows($sort);
                }
            }else{
              $iu_crole= $this->m_iu_crole->getRows($sort);
            }
            $return = array(
                'success' =>  TRUE ,
                'data'    => $iu_crole
            );
        print json_encode($return);
    }
    function getRowsByInstance() {
        log_message('debug', 'iu_crole.getRowsByInstance post : '.json_encode($this->input->post(NULL, FALSE)));
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
            $iu_crole= $this->m_iu_crole->getRowsByInstance($InstId,$sort);
            $return = array(
                'success' =>  TRUE ,
                'data'    => $iu_crole
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
        log_message('debug', 'iu_crole.getRowsByParent post : '.json_encode($this->input->post(NULL, FALSE)));
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
            $iu_crole= $this->m_iu_crole->getRowsByParent($ParentId,$sort);
            $return = array(
                'success' => TRUE,
                'data'    => $iu_crole
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
        log_message('debug', 'iu_crole.deleteRow post : '.json_encode($this->input->post(NULL, FALSE)));
        $tempId  =  $this->input->get_post('iu_croleid', TRUE);
        if (strlen($tempId) > 0) {
            $return = $this->m_iu_crole->deleteRow($tempId);
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
        $this->load->model('M_iu_crole', 'm_iu_crole');
    }
}
?>
<?php
	 class C_iud_mt_def extends CI_Controller {
    function __construct() {
         parent::__construct();
        $this->_loadModels();
    }
    function setRow() {
          log_message('debug', 'iud_mt_def.setRow post : '.json_encode($this->input->post(NULL, FALSE)));
          log_message('debug', 'iud_mt_def.getRows get : '.json_encode($this->input->get(NULL, FALSE)));
          $data = array(
                'iud_mt_defid' =>  $this->input->get_post('iud_mt_defid', TRUE)
                ,'instanceid' =>  $this->input->get_post('instanceid', TRUE)
                ,'name' =>   $this->input->get_post('name', TRUE)
                ,'mticon' =>   $this->input->get_post('mticon', TRUE)
            );
            $iud_mt_def = $this->m_iud_mt_def->setRow($data);
            print json_encode($iud_mt_def);
    }
    function newRow() {
            log_message('debug', 'iud_mt_def.newRow post : '.json_encode($this->input->post(NULL, FALSE)));
          $data = array(
                'iud_mt_defid' =>  $this->input->get_post('iud_mt_defid', TRUE)
                ,'instanceid' =>  $this->input->get_post('instanceid', TRUE)
                ,'name' =>   $this->input->get_post('name', TRUE)
                ,'mticon' =>   $this->input->get_post('mticon', TRUE)
            );
                $instanceid =  $this->input->get_post('instanceid', TRUE);
            $iud_mt_def= $this->m_iud_mt_def->newRow($instanceid,$data);
            $return = $iud_mt_def;
            print json_encode($return);
    }
    function getRow() {
        log_message('debug', 'iud_mt_def.getRow post : '.json_encode($this->input->post(NULL, FALSE)));
        $empId  =  $this->input->get_post('id', TRUE);
        if (isset($empId)) {
            $iud_mt_def = $this->m_iud_mt_def->getRow($empId);
            $return = array(
                'success' => true,
                'data'    => $iud_mt_def
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
                    $iud_mt_def= $this->m_iud_mt_def->getRowsByInstance($instanceid,$sort);
                }else{
                    $iud_mt_def= $this->m_iud_mt_def->getRows($sort);
                }
            }else{
              $iud_mt_def= $this->m_iud_mt_def->getRows($sort);
            }
            $return = array(
                'success' =>  TRUE ,
                'data'    => $iud_mt_def
            );
        print json_encode($return);
    }
    function getRowsByInstance() {
        log_message('debug', 'iud_mt_def.getRowsByInstance post : '.json_encode($this->input->post(NULL, FALSE)));
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
            $iud_mt_def= $this->m_iud_mt_def->getRowsByInstance($InstId,$sort);
            $return = array(
                'success' =>  TRUE ,
                'data'    => $iud_mt_def
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
        log_message('debug', 'iud_mt_def.getRowsByParent post : '.json_encode($this->input->post(NULL, FALSE)));
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
            $iud_mt_def= $this->m_iud_mt_def->getRowsByParent($ParentId,$sort);
            $return = array(
                'success' => TRUE,
                'data'    => $iud_mt_def
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
        log_message('debug', 'iud_mt_def.deleteRow post : '.json_encode($this->input->post(NULL, FALSE)));
        $tempId  =  $this->input->get_post('iud_mt_defid', TRUE);
        if (strlen($tempId) > 0) {
            $return = $this->m_iud_mt_def->deleteRow($tempId);
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
        $this->load->model('M_iud_mt_def', 'm_iud_mt_def');
    }
}
?>
<?php
	 class C_iud_town extends CI_Controller {
    function __construct() {
         parent::__construct();
        $this->_loadModels();
    }
    function setRow() {
          log_message('debug', 'iud_town.setRow post : '.json_encode($this->input->post(NULL, FALSE)));
          log_message('debug', 'iud_town.getRows get : '.json_encode($this->input->get(NULL, FALSE)));
          $data = array(
                'iud_townid' =>  $this->input->get_post('iud_townid', TRUE)
                ,'instanceid' =>  $this->input->get_post('instanceid', TRUE)
                ,'name' =>   $this->input->get_post('name', TRUE)
            );
            $iud_town = $this->m_iud_town->setRow($data);
            print json_encode($iud_town);
    }
    function newRow() {
            log_message('debug', 'iud_town.newRow post : '.json_encode($this->input->post(NULL, FALSE)));
          $data = array(
                'iud_townid' =>  $this->input->get_post('iud_townid', TRUE)
                ,'instanceid' =>  $this->input->get_post('instanceid', TRUE)
                ,'name' =>   $this->input->get_post('name', TRUE)
            );
                $instanceid =  $this->input->get_post('instanceid', TRUE);
            $iud_town= $this->m_iud_town->newRow($instanceid,$data);
            $return = $iud_town;
            print json_encode($return);
    }
    function getRow() {
        log_message('debug', 'iud_town.getRow post : '.json_encode($this->input->post(NULL, FALSE)));
        $empId  =  $this->input->get_post('id', TRUE);
        if (isset($empId)) {
            $iud_town = $this->m_iud_town->getRow($empId);
            $return = array(
                'success' => true,
                'data'    => $iud_town
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
                    $iud_town= $this->m_iud_town->getRowsByInstance($instanceid,$sort);
                }else{
                    $iud_town= $this->m_iud_town->getRows($sort);
                }
            }else{
              $iud_town= $this->m_iud_town->getRows($sort);
            }
            $return = array(
                'success' =>  TRUE ,
                'data'    => $iud_town
            );
        print json_encode($return);
    }
    function getRowsByInstance() {
        log_message('debug', 'iud_town.getRowsByInstance post : '.json_encode($this->input->post(NULL, FALSE)));
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
            $iud_town= $this->m_iud_town->getRowsByInstance($InstId,$sort);
            $return = array(
                'success' =>  TRUE ,
                'data'    => $iud_town
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
        log_message('debug', 'iud_town.getRowsByParent post : '.json_encode($this->input->post(NULL, FALSE)));
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
            $iud_town= $this->m_iud_town->getRowsByParent($ParentId,$sort);
            $return = array(
                'success' => TRUE,
                'data'    => $iud_town
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
        log_message('debug', 'iud_town.deleteRow post : '.json_encode($this->input->post(NULL, FALSE)));
        $tempId  =  $this->input->get_post('iud_townid', TRUE);
        if (strlen($tempId) > 0) {
            $return = $this->m_iud_town->deleteRow($tempId);
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
        $this->load->model('M_iud_town', 'm_iud_town');
    }
}
?>
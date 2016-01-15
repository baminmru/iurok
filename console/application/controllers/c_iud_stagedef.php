<?php
	 class C_iud_stagedef extends CI_Controller {
    function __construct() {
         parent::__construct();
        $this->_loadModels();
    }
    function setRow() {
          log_message('debug', 'iud_stagedef.setRow post : '.json_encode($this->input->post(NULL, FALSE)));
          log_message('debug', 'iud_stagedef.getRows get : '.json_encode($this->input->get(NULL, FALSE)));
          $data = array(
                'iud_stagedefid' =>  $this->input->get_post('iud_stagedefid', TRUE)
                ,'instanceid' =>  $this->input->get_post('instanceid', TRUE)
                ,'name' =>   $this->input->get_post('name', TRUE)
                ,'sequence' =>   $this->input->get_post('sequence', TRUE)
                ,'stageicon' =>   $this->input->get_post('stageicon', TRUE)
            );
            $iud_stagedef = $this->m_iud_stagedef->setRow($data);
            print json_encode($iud_stagedef);
    }
    function newRow() {
            log_message('debug', 'iud_stagedef.newRow post : '.json_encode($this->input->post(NULL, FALSE)));
          $data = array(
                'iud_stagedefid' =>  $this->input->get_post('iud_stagedefid', TRUE)
                ,'instanceid' =>  $this->input->get_post('instanceid', TRUE)
                ,'name' =>   $this->input->get_post('name', TRUE)
                ,'sequence' =>   $this->input->get_post('sequence', TRUE)
                ,'stageicon' =>   $this->input->get_post('stageicon', TRUE)
            );
                $instanceid =  $this->input->get_post('instanceid', TRUE);
            $iud_stagedef= $this->m_iud_stagedef->newRow($instanceid,$data);
            $return = $iud_stagedef;
            print json_encode($return);
    }
    function getRow() {
        log_message('debug', 'iud_stagedef.getRow post : '.json_encode($this->input->post(NULL, FALSE)));
        $empId  =  $this->input->get_post('id', TRUE);
        if (isset($empId)) {
            $iud_stagedef = $this->m_iud_stagedef->getRow($empId);
            $return = array(
                'success' => true,
                'data'    => $iud_stagedef
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
            	$sort[] = array('property'=>'sequence', 'direction'=>'ASC');
            	$sort = json_encode($sort);
            }
            $instanceid=$this->input->get('instanceid', FALSE);
            if(isset($instanceid)){
                if($instanceid!=''){
                    $iud_stagedef= $this->m_iud_stagedef->getRowsByInstance($instanceid,$sort);
                }else{
                    $iud_stagedef= $this->m_iud_stagedef->getRows($sort);
                }
            }else{
              $iud_stagedef= $this->m_iud_stagedef->getRows($sort);
            }
            $return = array(
                'success' =>  TRUE ,
                'data'    => $iud_stagedef
            );
        print json_encode($return);
    }
    function getRowsByInstance() {
        log_message('debug', 'iud_stagedef.getRowsByInstance post : '.json_encode($this->input->post(NULL, FALSE)));
            $group = $this->input->get('group', FALSE); 
           $sort = $this->input->get('sort', FALSE);
           if(!$sort && $group) $sort = $group;
           if(!$sort || $group == $sort) 
            {
            	$sort = json_decode($sort);
            	$sort[] = array('property'=>'sequence', 'direction'=>'ASC');
            	$sort = json_encode($sort);
            }
        $InstId  =  $this->input->get_post('instanceid', TRUE);
        if (strlen($InstId) > 0) {
            $iud_stagedef= $this->m_iud_stagedef->getRowsByInstance($InstId,$sort);
            $return = array(
                'success' =>  TRUE ,
                'data'    => $iud_stagedef
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
        log_message('debug', 'iud_stagedef.getRowsByParent post : '.json_encode($this->input->post(NULL, FALSE)));
            $group = $this->input->get('group', FALSE); 
           $sort = $this->input->get('sort', FALSE);
           if(!$sort && $group) $sort = $group;
           if(!$sort || $group == $sort) 
            {
            	$sort = json_decode($sort);
            	$sort[] = array('property'=>'sequence', 'direction'=>'ASC');
            	$sort = json_encode($sort);
            }
        $ParentId  =  $this->input->get_post('parentid', TRUE);
        if (strlen($ParentId) > 0) {
            $iud_stagedef= $this->m_iud_stagedef->getRowsByParent($ParentId,$sort);
            $return = array(
                'success' => TRUE,
                'data'    => $iud_stagedef
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
        log_message('debug', 'iud_stagedef.deleteRow post : '.json_encode($this->input->post(NULL, FALSE)));
        $tempId  =  $this->input->get_post('iud_stagedefid', TRUE);
        if (strlen($tempId) > 0) {
            $return = $this->m_iud_stagedef->deleteRow($tempId);
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
        $this->load->model('M_iud_stagedef', 'm_iud_stagedef');
    }
}
?>
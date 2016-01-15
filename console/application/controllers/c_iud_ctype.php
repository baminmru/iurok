<?php
	 class C_iud_ctype extends CI_Controller {
    function __construct() {
         parent::__construct();
        $this->_loadModels();
    }
    function setRow() {
          log_message('debug', 'iud_ctype.setRow post : '.json_encode($this->input->post(NULL, FALSE)));
          log_message('debug', 'iud_ctype.getRows get : '.json_encode($this->input->get(NULL, FALSE)));
          $data = array(
                'iud_ctypeid' =>  $this->input->get_post('iud_ctypeid', TRUE)
                ,'instanceid' =>  $this->input->get_post('instanceid', TRUE)
                ,'name' =>   $this->input->get_post('name', TRUE)
            );
            $iud_ctype = $this->m_iud_ctype->setRow($data);
            print json_encode($iud_ctype);
    }
    function newRow() {
            log_message('debug', 'iud_ctype.newRow post : '.json_encode($this->input->post(NULL, FALSE)));
          $data = array(
                'iud_ctypeid' =>  $this->input->get_post('iud_ctypeid', TRUE)
                ,'instanceid' =>  $this->input->get_post('instanceid', TRUE)
                ,'name' =>   $this->input->get_post('name', TRUE)
            );
                $instanceid =  $this->input->get_post('instanceid', TRUE);
            $iud_ctype= $this->m_iud_ctype->newRow($instanceid,$data);
            $return = $iud_ctype;
            print json_encode($return);
    }
    function getRow() {
        log_message('debug', 'iud_ctype.getRow post : '.json_encode($this->input->post(NULL, FALSE)));
        $empId  =  $this->input->get_post('id', TRUE);
        if (isset($empId)) {
            $iud_ctype = $this->m_iud_ctype->getRow($empId);
            $return = array(
                'success' => true,
                'data'    => $iud_ctype
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
                    $iud_ctype= $this->m_iud_ctype->getRowsByInstance($instanceid,$sort);
                }else{
                    $iud_ctype= $this->m_iud_ctype->getRows($sort);
                }
            }else{
              $iud_ctype= $this->m_iud_ctype->getRows($sort);
            }
            $return = array(
                'success' =>  TRUE ,
                'data'    => $iud_ctype
            );
        print json_encode($return);
    }
    function getRowsByInstance() {
        log_message('debug', 'iud_ctype.getRowsByInstance post : '.json_encode($this->input->post(NULL, FALSE)));
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
            $iud_ctype= $this->m_iud_ctype->getRowsByInstance($InstId,$sort);
            $return = array(
                'success' =>  TRUE ,
                'data'    => $iud_ctype
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
        log_message('debug', 'iud_ctype.getRowsByParent post : '.json_encode($this->input->post(NULL, FALSE)));
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
            $iud_ctype= $this->m_iud_ctype->getRowsByParent($ParentId,$sort);
            $return = array(
                'success' => TRUE,
                'data'    => $iud_ctype
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
        log_message('debug', 'iud_ctype.deleteRow post : '.json_encode($this->input->post(NULL, FALSE)));
        $tempId  =  $this->input->get_post('iud_ctypeid', TRUE);
        if (strlen($tempId) > 0) {
            $return = $this->m_iud_ctype->deleteRow($tempId);
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
        $this->load->model('M_iud_ctype', 'm_iud_ctype');
    }
}
?>
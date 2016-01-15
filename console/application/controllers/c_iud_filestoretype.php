<?php
	 class C_iud_filestoretype extends CI_Controller {
    function __construct() {
         parent::__construct();
        $this->_loadModels();
    }
    function setRow() {
          log_message('debug', 'iud_filestoretype.setRow post : '.json_encode($this->input->post(NULL, FALSE)));
          log_message('debug', 'iud_filestoretype.getRows get : '.json_encode($this->input->get(NULL, FALSE)));
          $data = array(
                'iud_filestoretypeid' =>  $this->input->get_post('iud_filestoretypeid', TRUE)
                ,'instanceid' =>  $this->input->get_post('instanceid', TRUE)
                ,'name' =>   $this->input->get_post('name', TRUE)
            );
            $iud_filestoretype = $this->m_iud_filestoretype->setRow($data);
            print json_encode($iud_filestoretype);
    }
    function newRow() {
            log_message('debug', 'iud_filestoretype.newRow post : '.json_encode($this->input->post(NULL, FALSE)));
          $data = array(
                'iud_filestoretypeid' =>  $this->input->get_post('iud_filestoretypeid', TRUE)
                ,'instanceid' =>  $this->input->get_post('instanceid', TRUE)
                ,'name' =>   $this->input->get_post('name', TRUE)
            );
                $instanceid =  $this->input->get_post('instanceid', TRUE);
            $iud_filestoretype= $this->m_iud_filestoretype->newRow($instanceid,$data);
            $return = $iud_filestoretype;
            print json_encode($return);
    }
    function getRow() {
        log_message('debug', 'iud_filestoretype.getRow post : '.json_encode($this->input->post(NULL, FALSE)));
        $empId  =  $this->input->get_post('id', TRUE);
        if (isset($empId)) {
            $iud_filestoretype = $this->m_iud_filestoretype->getRow($empId);
            $return = array(
                'success' => true,
                'data'    => $iud_filestoretype
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
                    $iud_filestoretype= $this->m_iud_filestoretype->getRowsByInstance($instanceid,$sort);
                }else{
                    $iud_filestoretype= $this->m_iud_filestoretype->getRows($sort);
                }
            }else{
              $iud_filestoretype= $this->m_iud_filestoretype->getRows($sort);
            }
            $return = array(
                'success' =>  TRUE ,
                'data'    => $iud_filestoretype
            );
        print json_encode($return);
    }
    function getRowsByInstance() {
        log_message('debug', 'iud_filestoretype.getRowsByInstance post : '.json_encode($this->input->post(NULL, FALSE)));
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
            $iud_filestoretype= $this->m_iud_filestoretype->getRowsByInstance($InstId,$sort);
            $return = array(
                'success' =>  TRUE ,
                'data'    => $iud_filestoretype
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
        log_message('debug', 'iud_filestoretype.getRowsByParent post : '.json_encode($this->input->post(NULL, FALSE)));
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
            $iud_filestoretype= $this->m_iud_filestoretype->getRowsByParent($ParentId,$sort);
            $return = array(
                'success' => TRUE,
                'data'    => $iud_filestoretype
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
        log_message('debug', 'iud_filestoretype.deleteRow post : '.json_encode($this->input->post(NULL, FALSE)));
        $tempId  =  $this->input->get_post('iud_filestoretypeid', TRUE);
        if (strlen($tempId) > 0) {
            $return = $this->m_iud_filestoretype->deleteRow($tempId);
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
        $this->load->model('M_iud_filestoretype', 'm_iud_filestoretype');
    }
}
?>
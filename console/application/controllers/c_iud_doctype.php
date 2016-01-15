<?php
	 class C_iud_doctype extends CI_Controller {
    function __construct() {
         parent::__construct();
        $this->_loadModels();
    }
    function setRow() {
          log_message('debug', 'iud_doctype.setRow post : '.json_encode($this->input->post(NULL, FALSE)));
          log_message('debug', 'iud_doctype.getRows get : '.json_encode($this->input->get(NULL, FALSE)));
          $data = array(
                'iud_doctypeid' =>  $this->input->get_post('iud_doctypeid', TRUE)
                ,'instanceid' =>  $this->input->get_post('instanceid', TRUE)
                ,'sequence' =>   $this->input->get_post('sequence', TRUE)
                ,'name' =>   $this->input->get_post('name', TRUE)
                ,'filetype' =>   $this->input->get_post('filetype', TRUE)
                ,'versionpolicy' =>   $this->input->get_post('versionpolicy', TRUE)
            );
            $iud_doctype = $this->m_iud_doctype->setRow($data);
            print json_encode($iud_doctype);
    }
    function newRow() {
            log_message('debug', 'iud_doctype.newRow post : '.json_encode($this->input->post(NULL, FALSE)));
          $data = array(
                'iud_doctypeid' =>  $this->input->get_post('iud_doctypeid', TRUE)
                ,'instanceid' =>  $this->input->get_post('instanceid', TRUE)
                ,'sequence' =>   $this->input->get_post('sequence', TRUE)
                ,'name' =>   $this->input->get_post('name', TRUE)
                ,'filetype' =>   $this->input->get_post('filetype', TRUE)
                ,'versionpolicy' =>   $this->input->get_post('versionpolicy', TRUE)
            );
                $instanceid =  $this->input->get_post('instanceid', TRUE);
            $iud_doctype= $this->m_iud_doctype->newRow($instanceid,$data);
            $return = $iud_doctype;
            print json_encode($return);
    }
    function getRow() {
        log_message('debug', 'iud_doctype.getRow post : '.json_encode($this->input->post(NULL, FALSE)));
        $empId  =  $this->input->get_post('id', TRUE);
        if (isset($empId)) {
            $iud_doctype = $this->m_iud_doctype->getRow($empId);
            $return = array(
                'success' => true,
                'data'    => $iud_doctype
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
                    $iud_doctype= $this->m_iud_doctype->getRowsByInstance($instanceid,$sort);
                }else{
                    $iud_doctype= $this->m_iud_doctype->getRows($sort);
                }
            }else{
              $iud_doctype= $this->m_iud_doctype->getRows($sort);
            }
            $return = array(
                'success' =>  TRUE ,
                'data'    => $iud_doctype
            );
        print json_encode($return);
    }
    function getRowsByInstance() {
        log_message('debug', 'iud_doctype.getRowsByInstance post : '.json_encode($this->input->post(NULL, FALSE)));
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
            $iud_doctype= $this->m_iud_doctype->getRowsByInstance($InstId,$sort);
            $return = array(
                'success' =>  TRUE ,
                'data'    => $iud_doctype
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
        log_message('debug', 'iud_doctype.getRowsByParent post : '.json_encode($this->input->post(NULL, FALSE)));
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
            $iud_doctype= $this->m_iud_doctype->getRowsByParent($ParentId,$sort);
            $return = array(
                'success' => TRUE,
                'data'    => $iud_doctype
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
        log_message('debug', 'iud_doctype.deleteRow post : '.json_encode($this->input->post(NULL, FALSE)));
        $tempId  =  $this->input->get_post('iud_doctypeid', TRUE);
        if (strlen($tempId) > 0) {
            $return = $this->m_iud_doctype->deleteRow($tempId);
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
        $this->load->model('M_iud_doctype', 'm_iud_doctype');
    }
}
?>
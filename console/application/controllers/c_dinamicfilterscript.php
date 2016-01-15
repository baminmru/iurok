<?php
	 class C_dinamicfilterscript extends CI_Controller {
    function __construct() {
         parent::__construct();
        $this->_loadModels();
    }
    function setRow() {
          log_message('debug', 'DINAMICFILTERSCRIPT.setRow post : '.json_encode($this->input->post(NULL, FALSE)));
          log_message('debug', 'DINAMICFILTERSCRIPT.getRows get : '.json_encode($this->input->get(NULL, FALSE)));
          $data = array(
                'dinamicfilterscriptid' =>  $this->input->get_post('dinamicfilterscriptid', TRUE)
                ,'instanceid' =>  $this->input->get_post('instanceid', TRUE)
                ,'parentid' =>  $this->input->get_post('parentid', TRUE)
                ,'target' =>   $this->input->get_post('target', TRUE)
                ,'code' =>   $this->input->get_post('code', TRUE)
            );
            $dinamicfilterscript = $this->m_dinamicfilterscript->setRow($data);
            print json_encode($dinamicfilterscript);
    }
    function newRow() {
            log_message('debug', 'DINAMICFILTERSCRIPT.newRow post : '.json_encode($this->input->post(NULL, FALSE)));
          $data = array(
                'dinamicfilterscriptid' =>  $this->input->get_post('dinamicfilterscriptid', TRUE)
                ,'instanceid' =>  $this->input->get_post('instanceid', TRUE)
                ,'parentid' =>  $this->input->get_post('parentid', TRUE)
                ,'target' =>   $this->input->get_post('target', TRUE)
                ,'code' =>   $this->input->get_post('code', TRUE)
            );
                $instanceid =  $this->input->get_post('instanceid', TRUE);
                $parentid =  $this->input->get_post('parentid', TRUE);
            $dinamicfilterscript= $this->m_dinamicfilterscript->newRow($instanceid,$parentid,$data);
            $return = $dinamicfilterscript;
            print json_encode($return);
    }
    function getRow() {
        log_message('debug', 'DINAMICFILTERSCRIPT.getRow post : '.json_encode($this->input->post(NULL, FALSE)));
        $empId  =  $this->input->get_post('id', TRUE);
        if (isset($empId)) {
            $dinamicfilterscript = $this->m_dinamicfilterscript->getRow($empId);
            $return = array(
                'success' => true,
                'data'    => $dinamicfilterscript
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
            	$sort[] = array('property'=>'target', 'direction'=>'ASC');
            	$sort = json_encode($sort);
            }
            $parentid=$this->input->get('parentid', FALSE);
            if(isset($parentid)){
                if($parentid!=''){
                    $dinamicfilterscript= $this->m_dinamicfilterscript->getRowsByParent($parentid,$sort);
                }else{
                    $dinamicfilterscript= $this->m_dinamicfilterscript->getRows($sort);
                }
            }else{
              $dinamicfilterscript= $this->m_dinamicfilterscript->getRows($sort);
            }
            $return = array(
                'success' =>  TRUE ,
                'data'    => $dinamicfilterscript
            );
        print json_encode($return);
    }
    function getRowsByInstance() {
        log_message('debug', 'DINAMICFILTERSCRIPT.getRowsByInstance post : '.json_encode($this->input->post(NULL, FALSE)));
            $group = $this->input->get('group', FALSE); 
           $sort = $this->input->get('sort', FALSE);
           if(!$sort && $group) $sort = $group;
           if(!$sort || $group == $sort) 
            {
            	$sort = json_decode($sort);
            	$sort[] = array('property'=>'target', 'direction'=>'ASC');
            	$sort = json_encode($sort);
            }
        $InstId  =  $this->input->get_post('instanceid', TRUE);
        if (strlen($InstId) > 0) {
            $dinamicfilterscript= $this->m_dinamicfilterscript->getRowsByInstance($InstId,$sort);
            $return = array(
                'success' =>  TRUE ,
                'data'    => $dinamicfilterscript
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
        log_message('debug', 'DINAMICFILTERSCRIPT.getRowsByParent post : '.json_encode($this->input->post(NULL, FALSE)));
            $group = $this->input->get('group', FALSE); 
           $sort = $this->input->get('sort', FALSE);
           if(!$sort && $group) $sort = $group;
           if(!$sort || $group == $sort) 
            {
            	$sort = json_decode($sort);
            	$sort[] = array('property'=>'target', 'direction'=>'ASC');
            	$sort = json_encode($sort);
            }
        $ParentId  =  $this->input->get_post('parentid', TRUE);
        if (strlen($ParentId) > 0) {
            $dinamicfilterscript= $this->m_dinamicfilterscript->getRowsByParent($ParentId,$sort);
            $return = array(
                'success' => TRUE,
                'data'    => $dinamicfilterscript
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
        log_message('debug', 'DINAMICFILTERSCRIPT.deleteRow post : '.json_encode($this->input->post(NULL, FALSE)));
        $tempId  =  $this->input->get_post('dinamicfilterscriptid', TRUE);
        if (strlen($tempId) > 0) {
            $return = $this->m_dinamicfilterscript->deleteRow($tempId);
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
        $this->load->model('M_dinamicfilterscript', 'm_dinamicfilterscript');
    }
}
?>
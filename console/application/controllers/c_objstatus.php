<?php
	 class C_objstatus extends CI_Controller {
    function __construct() {
         parent::__construct();
        $this->_loadModels();
    }
    function setRow() {
          log_message('debug', 'OBJSTATUS.setRow post : '.json_encode($this->input->post(NULL, FALSE)));
          log_message('debug', 'OBJSTATUS.getRows get : '.json_encode($this->input->get(NULL, FALSE)));
          $data = array(
                'objstatusid' =>  $this->input->get_post('objstatusid', TRUE)
                ,'instanceid' =>  $this->input->get_post('instanceid', TRUE)
                ,'parentid' =>  $this->input->get_post('parentid', TRUE)
                ,'name' =>   $this->input->get_post('name', TRUE)
                ,'isstartup' =>   $this->input->get_post('isstartup', TRUE)
                ,'isarchive' =>   $this->input->get_post('isarchive', TRUE)
                ,'the_comment' =>   $this->input->get_post('the_comment', TRUE)
            );
            $objstatus = $this->m_objstatus->setRow($data);
            print json_encode($objstatus);
    }
    function newRow() {
            log_message('debug', 'OBJSTATUS.newRow post : '.json_encode($this->input->post(NULL, FALSE)));
          $data = array(
                'objstatusid' =>  $this->input->get_post('objstatusid', TRUE)
                ,'instanceid' =>  $this->input->get_post('instanceid', TRUE)
                ,'parentid' =>  $this->input->get_post('parentid', TRUE)
                ,'name' =>   $this->input->get_post('name', TRUE)
                ,'isstartup' =>   $this->input->get_post('isstartup', TRUE)
                ,'isarchive' =>   $this->input->get_post('isarchive', TRUE)
                ,'the_comment' =>   $this->input->get_post('the_comment', TRUE)
            );
                $instanceid =  $this->input->get_post('instanceid', TRUE);
                $parentid =  $this->input->get_post('parentid', TRUE);
            $objstatus= $this->m_objstatus->newRow($instanceid,$parentid,$data);
            $return = $objstatus;
            print json_encode($return);
    }
    function getRow() {
        log_message('debug', 'OBJSTATUS.getRow post : '.json_encode($this->input->post(NULL, FALSE)));
        $empId  =  $this->input->get_post('id', TRUE);
        if (isset($empId)) {
            $objstatus = $this->m_objstatus->getRow($empId);
            $return = array(
                'success' => true,
                'data'    => $objstatus
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
            $parentid=$this->input->get('parentid', FALSE);
            if(isset($parentid)){
                if($parentid!=''){
                    $objstatus= $this->m_objstatus->getRowsByParent($parentid,$sort);
                }else{
                    $objstatus= $this->m_objstatus->getRows($sort);
                }
            }else{
              $objstatus= $this->m_objstatus->getRows($sort);
            }
            $return = array(
                'success' =>  TRUE ,
                'data'    => $objstatus
            );
        print json_encode($return);
    }
    function getRowsByInstance() {
        log_message('debug', 'OBJSTATUS.getRowsByInstance post : '.json_encode($this->input->post(NULL, FALSE)));
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
            $objstatus= $this->m_objstatus->getRowsByInstance($InstId,$sort);
            $return = array(
                'success' =>  TRUE ,
                'data'    => $objstatus
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
        log_message('debug', 'OBJSTATUS.getRowsByParent post : '.json_encode($this->input->post(NULL, FALSE)));
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
            $objstatus= $this->m_objstatus->getRowsByParent($ParentId,$sort);
            $return = array(
                'success' => TRUE,
                'data'    => $objstatus
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
        log_message('debug', 'OBJSTATUS.deleteRow post : '.json_encode($this->input->post(NULL, FALSE)));
        $tempId  =  $this->input->get_post('objstatusid', TRUE);
        if (strlen($tempId) > 0) {
            $return = $this->m_objstatus->deleteRow($tempId);
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
        $this->load->model('M_objstatus', 'm_objstatus');
    }
}
?>
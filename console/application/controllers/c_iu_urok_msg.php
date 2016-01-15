<?php
	 class C_iu_urok_msg extends CI_Controller {
    function __construct() {
         parent::__construct();
        $this->_loadModels();
    }
    function setRow() {
          log_message('debug', 'iu_urok_msg.setRow post : '.json_encode($this->input->post(NULL, FALSE)));
          log_message('debug', 'iu_urok_msg.getRows get : '.json_encode($this->input->get(NULL, FALSE)));
          $data = array(
                'iu_urok_msgid' =>  $this->input->get_post('iu_urok_msgid', TRUE)
                ,'instanceid' =>  $this->input->get_post('instanceid', TRUE)
                ,'info' =>   $this->input->get_post('info', TRUE)
                ,'thedate' =>   $this->input->get_post('thedate', TRUE)
            );
            $iu_urok_msg = $this->m_iu_urok_msg->setRow($data);
            print json_encode($iu_urok_msg);
    }
    function newRow() {
            log_message('debug', 'iu_urok_msg.newRow post : '.json_encode($this->input->post(NULL, FALSE)));
          $data = array(
                'iu_urok_msgid' =>  $this->input->get_post('iu_urok_msgid', TRUE)
                ,'instanceid' =>  $this->input->get_post('instanceid', TRUE)
                ,'info' =>   $this->input->get_post('info', TRUE)
                ,'thedate' =>   $this->input->get_post('thedate', TRUE)
            );
                $instanceid =  $this->input->get_post('instanceid', TRUE);
            $iu_urok_msg= $this->m_iu_urok_msg->newRow($instanceid,$data);
            $return = $iu_urok_msg;
            print json_encode($return);
    }
    function getRow() {
        log_message('debug', 'iu_urok_msg.getRow post : '.json_encode($this->input->post(NULL, FALSE)));
        $empId  =  $this->input->get_post('id', TRUE);
        if (isset($empId)) {
            $iu_urok_msg = $this->m_iu_urok_msg->getRow($empId);
            $return = array(
                'success' => true,
                'data'    => $iu_urok_msg
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
            	$sort[] = array('property'=>'info', 'direction'=>'ASC');
            	$sort = json_encode($sort);
            }
            $instanceid=$this->input->get('instanceid', FALSE);
            if(isset($instanceid)){
                if($instanceid!=''){
                    $iu_urok_msg= $this->m_iu_urok_msg->getRowsByInstance($instanceid,$sort);
                }else{
                    $iu_urok_msg= $this->m_iu_urok_msg->getRows($sort);
                }
            }else{
              $iu_urok_msg= $this->m_iu_urok_msg->getRows($sort);
            }
            $return = array(
                'success' =>  TRUE ,
                'data'    => $iu_urok_msg
            );
        print json_encode($return);
    }
    function getRowsByInstance() {
        log_message('debug', 'iu_urok_msg.getRowsByInstance post : '.json_encode($this->input->post(NULL, FALSE)));
            $group = $this->input->get('group', FALSE); 
           $sort = $this->input->get('sort', FALSE);
           if(!$sort && $group) $sort = $group;
           if(!$sort || $group == $sort) 
            {
            	$sort = json_decode($sort);
            	$sort[] = array('property'=>'info', 'direction'=>'ASC');
            	$sort = json_encode($sort);
            }
        $InstId  =  $this->input->get_post('instanceid', TRUE);
        if (strlen($InstId) > 0) {
            $iu_urok_msg= $this->m_iu_urok_msg->getRowsByInstance($InstId,$sort);
            $return = array(
                'success' =>  TRUE ,
                'data'    => $iu_urok_msg
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
        log_message('debug', 'iu_urok_msg.getRowsByParent post : '.json_encode($this->input->post(NULL, FALSE)));
            $group = $this->input->get('group', FALSE); 
           $sort = $this->input->get('sort', FALSE);
           if(!$sort && $group) $sort = $group;
           if(!$sort || $group == $sort) 
            {
            	$sort = json_decode($sort);
            	$sort[] = array('property'=>'info', 'direction'=>'ASC');
            	$sort = json_encode($sort);
            }
        $ParentId  =  $this->input->get_post('parentid', TRUE);
        if (strlen($ParentId) > 0) {
            $iu_urok_msg= $this->m_iu_urok_msg->getRowsByParent($ParentId,$sort);
            $return = array(
                'success' => TRUE,
                'data'    => $iu_urok_msg
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
        log_message('debug', 'iu_urok_msg.deleteRow post : '.json_encode($this->input->post(NULL, FALSE)));
        $tempId  =  $this->input->get_post('iu_urok_msgid', TRUE);
        if (strlen($tempId) > 0) {
            $return = $this->m_iu_urok_msg->deleteRow($tempId);
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
        $this->load->model('M_iu_urok_msg', 'm_iu_urok_msg');
    }
}
?>
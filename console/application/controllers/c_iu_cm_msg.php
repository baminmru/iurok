<?php
	 class C_iu_cm_msg extends CI_Controller {
    function __construct() {
         parent::__construct();
        $this->_loadModels();
    }
    function setRow() {
          log_message('debug', 'iu_cm_msg.setRow post : '.json_encode($this->input->post(NULL, FALSE)));
          log_message('debug', 'iu_cm_msg.getRows get : '.json_encode($this->input->get(NULL, FALSE)));
          $data = array(
                'iu_cm_msgid' =>  $this->input->get_post('iu_cm_msgid', TRUE)
                ,'instanceid' =>  $this->input->get_post('instanceid', TRUE)
                ,'treeid' =>  $this->input->get_post('treeid', TRUE)
                ,'info' =>   $this->input->get_post('info', TRUE)
                ,'messagetype' =>   $this->input->get_post('messagetype', TRUE)
                ,'theauthor' =>   $this->input->get_post('theauthor', TRUE)
                ,'thedate' =>   $this->input->get_post('thedate', TRUE)
                ,'thefile' =>   $this->input->get_post('thefile', TRUE)
                ,'thefile_ext' =>   $this->input->get_post('thefile_ext', TRUE)
                ,'theref' =>   $this->input->get_post('theref', TRUE)
            );
            $iu_cm_msg = $this->m_iu_cm_msg->setRow($data);
            print json_encode($iu_cm_msg);
    }
    function newRow() {
            log_message('debug', 'iu_cm_msg.newRow post : '.json_encode($this->input->post(NULL, FALSE)));
          $data = array(
                'iu_cm_msgid' =>  $this->input->get_post('iu_cm_msgid', TRUE)
                ,'instanceid' =>  $this->input->get_post('instanceid', TRUE)
                ,'treeid' =>  $this->input->get_post('treeid', TRUE)
                ,'info' =>   $this->input->get_post('info', TRUE)
                ,'messagetype' =>   $this->input->get_post('messagetype', TRUE)
                ,'theauthor' =>   $this->input->get_post('theauthor', TRUE)
                ,'thedate' =>   $this->input->get_post('thedate', TRUE)
                ,'thefile' =>   $this->input->get_post('thefile', TRUE)
                ,'thefile_ext' =>   $this->input->get_post('thefile_ext', TRUE)
                ,'theref' =>   $this->input->get_post('theref', TRUE)
            );
                $instanceid =  $this->input->get_post('instanceid', TRUE);
            $treeid=$this->input->post('treeid', FALSE);
            $iu_cm_msg= $this->m_iu_cm_msg->newRow($instanceid,$treeid,$data);
            $return = $iu_cm_msg;
            print json_encode($return);
    }
    function getRow() {
        log_message('debug', 'iu_cm_msg.getRow post : '.json_encode($this->input->post(NULL, FALSE)));
        $empId  =  $this->input->get_post('id', TRUE);
            $treeid  =  $this->input->get_post('treeid', TRUE);
        if (isset($empId)) {
            $iu_cm_msg = $this->m_iu_cm_msg->getRow($empId,$treeid);
            $return = array(
                'success' => true,
                'data'    => $iu_cm_msg
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
            	$sort[] = array('property'=>'theauthor', 'direction'=>'ASC');
            	$sort = json_encode($sort);
            }
            $instanceid=$this->input->get('instanceid', FALSE);
           	$treeid=$this->input->get('treeid', FALSE);
                     if(isset($instanceid)){
                         if($instanceid!=''){
           			if(isset($treeid)){
           				log_message('debug', 'iu_cm_msg.getRows getRowsByInstanceTree');
           				$iu_cm_msg= $this->m_iu_cm_msg->getRowsByInstanceTree($instanceid,$treeid,$sort);
           			}else{
           				log_message('debug', 'iu_cm_msg.getRows getRowsByInstance');
           				$iu_cm_msg= $this->m_iu_cm_msg->getRowsByInstance($instanceid,$sort);
           			}
                         }else{
                             if(isset($treeid)){
           				log_message('debug', 'iu_cm_msg.getRows getRowsByTree');
           				$iu_cm_msg= $this->m_iu_cm_msg->getRowsByTree($treeid,$sort);
           			}else{
           				log_message('debug', 'iu_cm_msg.getRows getRows');
           				$iu_cm_msg= $this->m_iu_cm_msg->getRows($sort);
           			}
                         }
                     }else{
           			if(isset($treeid)){
           				log_message('debug', 'iu_cm_msg.getRows getRowsByTree');
           				$iu_cm_msg= $this->m_iu_cm_msg->getRowsByTree($treeid,$sort);
           			}else{
           				log_message('debug', 'iu_cm_msg.getRows getRows');
           				$iu_cm_msg= $this->m_iu_cm_msg->getRows($sort);
           			}
                     }
           print json_encode($iu_cm_msg);
    }
    function getRowsByInstance() {
        log_message('debug', 'iu_cm_msg.getRowsByInstance post : '.json_encode($this->input->post(NULL, FALSE)));
            $group = $this->input->get('group', FALSE); 
           $sort = $this->input->get('sort', FALSE);
           if(!$sort && $group) $sort = $group;
           if(!$sort || $group == $sort) 
            {
            	$sort = json_decode($sort);
            	$sort[] = array('property'=>'theauthor', 'direction'=>'ASC');
            	$sort = json_encode($sort);
            }
        $InstId  =  $this->input->get_post('instanceid', TRUE);
        if (strlen($InstId) > 0) {
            $iu_cm_msg= $this->m_iu_cm_msg->getRowsByInstance($InstId,$sort);
            $return = array(
                'success' =>  TRUE ,
                'data'    => $iu_cm_msg
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
        log_message('debug', 'iu_cm_msg.getRowsByParent post : '.json_encode($this->input->post(NULL, FALSE)));
            $group = $this->input->get('group', FALSE); 
           $sort = $this->input->get('sort', FALSE);
           if(!$sort && $group) $sort = $group;
           if(!$sort || $group == $sort) 
            {
            	$sort = json_decode($sort);
            	$sort[] = array('property'=>'theauthor', 'direction'=>'ASC');
            	$sort = json_encode($sort);
            }
        $ParentId  =  $this->input->get_post('parentid', TRUE);
        if (strlen($ParentId) > 0) {
            $iu_cm_msg= $this->m_iu_cm_msg->getRowsByParent($ParentId,$sort);
            $return = array(
                'success' => TRUE,
                'data'    => $iu_cm_msg
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
        log_message('debug', 'iu_cm_msg.deleteRow post : '.json_encode($this->input->post(NULL, FALSE)));
        $tempId  =  $this->input->get_post('iu_cm_msgid', TRUE);
        if (strlen($tempId) > 0) {
            $return = $this->m_iu_cm_msg->deleteRow($tempId);
        }
        else {
            $return = array(
                'success' => FALSE,
                'msg'     => 'No  ID to delete'
            );
        }
        print json_encode($return);
    }
	
	 function hideRow() {
        log_message('debug', 'iu_cm_msg.hideRow post : '.json_encode($this->input->post(NULL, FALSE)));
        $tempId  =  $this->input->get_post('iu_cm_msgid', TRUE);
        if (strlen($tempId) > 0) {
            $return = $this->m_iu_cm_msg->hideRow($tempId);
        }
        else {
            $return = array(
                'success' => FALSE,
                'msg'     => 'No  ID to hide'
            );
        }
        print json_encode($return);
    }
    private function _loadModels () {
        $this->load->model('M_iu_cm_msg', 'm_iu_cm_msg');
    }
}
?>
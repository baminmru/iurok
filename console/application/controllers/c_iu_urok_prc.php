<?php
	 class C_iu_urok_prc extends CI_Controller {
    function __construct() {
         parent::__construct();
        $this->_loadModels();
    }
    function setRow() {
          log_message('debug', 'iu_urok_prc.setRow post : '.json_encode($this->input->post(NULL, FALSE)));
          log_message('debug', 'iu_urok_prc.getRows get : '.json_encode($this->input->get(NULL, FALSE)));
          $data = array(
                'iu_urok_prcid' =>  $this->input->get_post('iu_urok_prcid', TRUE)
                ,'instanceid' =>  $this->input->get_post('instanceid', TRUE)
                ,'theprocess' =>   $this->input->get_post('theprocess', TRUE)
                ,'topstage' =>   $this->input->get_post('topstage', TRUE)
                ,'iu_urok_stage' =>   $this->input->get_post('iu_urok_stage', TRUE)
                ,'isdone' =>   $this->input->get_post('isdone', TRUE)
                ,'laststate' =>   $this->input->get_post('laststate', TRUE)
                ,'lastmessage' =>   $this->input->get_post('lastmessage', TRUE)
                ,'manualcontrol' =>   $this->input->get_post('manualcontrol', TRUE)
                ,'taskdelayed' =>   $this->input->get_post('taskdelayed', TRUE)
            );
            $iu_urok_prc = $this->m_iu_urok_prc->setRow($data);
            print json_encode($iu_urok_prc);
    }
    function newRow() {
            log_message('debug', 'iu_urok_prc.newRow post : '.json_encode($this->input->post(NULL, FALSE)));
          $data = array(
                'iu_urok_prcid' =>  $this->input->get_post('iu_urok_prcid', TRUE)
                ,'instanceid' =>  $this->input->get_post('instanceid', TRUE)
                ,'theprocess' =>   $this->input->get_post('theprocess', TRUE)
                ,'topstage' =>   $this->input->get_post('topstage', TRUE)
                ,'iu_urok_stage' =>   $this->input->get_post('iu_urok_stage', TRUE)
                ,'isdone' =>   $this->input->get_post('isdone', TRUE)
                ,'laststate' =>   $this->input->get_post('laststate', TRUE)
                ,'lastmessage' =>   $this->input->get_post('lastmessage', TRUE)
                ,'manualcontrol' =>   $this->input->get_post('manualcontrol', TRUE)
                ,'taskdelayed' =>   $this->input->get_post('taskdelayed', TRUE)
            );
                $instanceid =  $this->input->get_post('instanceid', TRUE);
            $iu_urok_prc= $this->m_iu_urok_prc->newRow($instanceid,$data);
            $return = $iu_urok_prc;
            print json_encode($return);
    }
    function getRow() {
        log_message('debug', 'iu_urok_prc.getRow post : '.json_encode($this->input->post(NULL, FALSE)));
        $empId  =  $this->input->get_post('id', TRUE);
        if (isset($empId)) {
            $iu_urok_prc = $this->m_iu_urok_prc->getRow($empId);
            $return = array(
                'success' => true,
                'data'    => $iu_urok_prc
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
            	$sort[] = array('property'=>'theprocess', 'direction'=>'ASC');
            	$sort = json_encode($sort);
            }
            $instanceid=$this->input->get('instanceid', FALSE);
            if(isset($instanceid)){
                if($instanceid!=''){
                    $iu_urok_prc= $this->m_iu_urok_prc->getRowsByInstance($instanceid,$sort);
                }else{
                    $iu_urok_prc= $this->m_iu_urok_prc->getRows($sort);
                }
            }else{
              $iu_urok_prc= $this->m_iu_urok_prc->getRows($sort);
            }
            $return = array(
                'success' =>  TRUE ,
                'data'    => $iu_urok_prc
            );
        print json_encode($return);
    }
    function getRowsByInstance() {
        log_message('debug', 'iu_urok_prc.getRowsByInstance post : '.json_encode($this->input->post(NULL, FALSE)));
            $group = $this->input->get('group', FALSE); 
           $sort = $this->input->get('sort', FALSE);
           if(!$sort && $group) $sort = $group;
           if(!$sort || $group == $sort) 
            {
            	$sort = json_decode($sort);
            	$sort[] = array('property'=>'theprocess', 'direction'=>'ASC');
            	$sort = json_encode($sort);
            }
        $InstId  =  $this->input->get_post('instanceid', TRUE);
        if (strlen($InstId) > 0) {
            $iu_urok_prc= $this->m_iu_urok_prc->getRowsByInstance($InstId,$sort);
            $return = array(
                'success' =>  TRUE ,
                'data'    => $iu_urok_prc
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
        log_message('debug', 'iu_urok_prc.getRowsByParent post : '.json_encode($this->input->post(NULL, FALSE)));
            $group = $this->input->get('group', FALSE); 
           $sort = $this->input->get('sort', FALSE);
           if(!$sort && $group) $sort = $group;
           if(!$sort || $group == $sort) 
            {
            	$sort = json_decode($sort);
            	$sort[] = array('property'=>'theprocess', 'direction'=>'ASC');
            	$sort = json_encode($sort);
            }
        $ParentId  =  $this->input->get_post('parentid', TRUE);
        if (strlen($ParentId) > 0) {
            $iu_urok_prc= $this->m_iu_urok_prc->getRowsByParent($ParentId,$sort);
            $return = array(
                'success' => TRUE,
                'data'    => $iu_urok_prc
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
        log_message('debug', 'iu_urok_prc.deleteRow post : '.json_encode($this->input->post(NULL, FALSE)));
        $tempId  =  $this->input->get_post('iu_urok_prcid', TRUE);
        if (strlen($tempId) > 0) {
            $return = $this->m_iu_urok_prc->deleteRow($tempId);
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
        $this->load->model('M_iu_urok_prc', 'm_iu_urok_prc');
    }
}
?>
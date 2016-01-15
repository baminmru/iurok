<?php
	 class C_iu_plevent extends CI_Controller {
    function __construct() {
         parent::__construct();
        $this->_loadModels();
    }
    function setRow() {
          log_message('debug', 'iu_plevent.setRow post : '.json_encode($this->input->post(NULL, FALSE)));
          log_message('debug', 'iu_plevent.getRows get : '.json_encode($this->input->get(NULL, FALSE)));
          $data = array(
                'iu_pleventid' =>  $this->input->get_post('iu_pleventid', TRUE)
                ,'instanceid' =>  $this->input->get_post('instanceid', TRUE)
                ,'eventtype' =>   $this->input->get_post('eventtype', TRUE)
                ,'info' =>   $this->input->get_post('info', TRUE)
                ,'doer' =>   $this->input->get_post('doer', TRUE)
                ,'createdate' =>   $this->input->get_post('createdate', TRUE)
                ,'theprocess' =>   $this->input->get_post('theprocess', TRUE)
                ,'processstatus' =>   $this->input->get_post('processstatus', TRUE)
                ,'statetask' =>   $this->input->get_post('statetask', TRUE)
                ,'thedoc' =>   $this->input->get_post('thedoc', TRUE)
                ,'thevideo' =>   $this->input->get_post('thevideo', TRUE)
                ,'thediscussion' =>   $this->input->get_post('thediscussion', TRUE)
            );
            $iu_plevent = $this->m_iu_plevent->setRow($data);
            print json_encode($iu_plevent);
    }
    function newRow() {
            log_message('debug', 'iu_plevent.newRow post : '.json_encode($this->input->post(NULL, FALSE)));
          $data = array(
                'iu_pleventid' =>  $this->input->get_post('iu_pleventid', TRUE)
                ,'instanceid' =>  $this->input->get_post('instanceid', TRUE)
                ,'eventtype' =>   $this->input->get_post('eventtype', TRUE)
                ,'info' =>   $this->input->get_post('info', TRUE)
                ,'doer' =>   $this->input->get_post('doer', TRUE)
                ,'createdate' =>   $this->input->get_post('createdate', TRUE)
                ,'theprocess' =>   $this->input->get_post('theprocess', TRUE)
                ,'processstatus' =>   $this->input->get_post('processstatus', TRUE)
                ,'statetask' =>   $this->input->get_post('statetask', TRUE)
                ,'thedoc' =>   $this->input->get_post('thedoc', TRUE)
                ,'thevideo' =>   $this->input->get_post('thevideo', TRUE)
                ,'thediscussion' =>   $this->input->get_post('thediscussion', TRUE)
            );
                $instanceid =  $this->input->get_post('instanceid', TRUE);
            $iu_plevent= $this->m_iu_plevent->newRow($instanceid,$data);
            $return = $iu_plevent;
            print json_encode($return);
    }
    function getRow() {
        log_message('debug', 'iu_plevent.getRow post : '.json_encode($this->input->post(NULL, FALSE)));
        $empId  =  $this->input->get_post('id', TRUE);
        if (isset($empId)) {
            $iu_plevent = $this->m_iu_plevent->getRow($empId);
            $return = array(
                'success' => true,
                'data'    => $iu_plevent
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
            	$sort[] = array('property'=>'eventtype', 'direction'=>'ASC');
            	$sort = json_encode($sort);
            }
            $instanceid=$this->input->get('instanceid', FALSE);
            if(isset($instanceid)){
                if($instanceid!=''){
                    $iu_plevent= $this->m_iu_plevent->getRowsByInstance($instanceid,$sort);
                }else{
                    $iu_plevent= $this->m_iu_plevent->getRows($sort);
                }
            }else{
              $iu_plevent= $this->m_iu_plevent->getRows($sort);
            }
            $return = array(
                'success' =>  TRUE ,
                'data'    => $iu_plevent
            );
        print json_encode($return);
    }
    function getRowsByInstance() {
        log_message('debug', 'iu_plevent.getRowsByInstance post : '.json_encode($this->input->post(NULL, FALSE)));
            $group = $this->input->get('group', FALSE); 
           $sort = $this->input->get('sort', FALSE);
           if(!$sort && $group) $sort = $group;
           if(!$sort || $group == $sort) 
            {
            	$sort = json_decode($sort);
            	$sort[] = array('property'=>'eventtype', 'direction'=>'ASC');
            	$sort = json_encode($sort);
            }
        $InstId  =  $this->input->get_post('instanceid', TRUE);
        if (strlen($InstId) > 0) {
            $iu_plevent= $this->m_iu_plevent->getRowsByInstance($InstId,$sort);
            $return = array(
                'success' =>  TRUE ,
                'data'    => $iu_plevent
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
        log_message('debug', 'iu_plevent.getRowsByParent post : '.json_encode($this->input->post(NULL, FALSE)));
            $group = $this->input->get('group', FALSE); 
           $sort = $this->input->get('sort', FALSE);
           if(!$sort && $group) $sort = $group;
           if(!$sort || $group == $sort) 
            {
            	$sort = json_decode($sort);
            	$sort[] = array('property'=>'eventtype', 'direction'=>'ASC');
            	$sort = json_encode($sort);
            }
        $ParentId  =  $this->input->get_post('parentid', TRUE);
        if (strlen($ParentId) > 0) {
            $iu_plevent= $this->m_iu_plevent->getRowsByParent($ParentId,$sort);
            $return = array(
                'success' => TRUE,
                'data'    => $iu_plevent
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
        log_message('debug', 'iu_plevent.deleteRow post : '.json_encode($this->input->post(NULL, FALSE)));
        $tempId  =  $this->input->get_post('iu_pleventid', TRUE);
        if (strlen($tempId) > 0) {
            $return = $this->m_iu_plevent->deleteRow($tempId);
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
        $this->load->model('M_iu_plevent', 'm_iu_plevent');
    }
}
?>
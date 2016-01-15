<?php
	 class C_nextstate extends CI_Controller {
    function __construct() {
         parent::__construct();
        $this->_loadModels();
    }
    function setRow() {
          log_message('debug', 'NEXTSTATE.setRow post : '.json_encode($this->input->post(NULL, FALSE)));
          log_message('debug', 'NEXTSTATE.getRows get : '.json_encode($this->input->get(NULL, FALSE)));
          $data = array(
                'nextstateid' =>  $this->input->get_post('nextstateid', TRUE)
                ,'instanceid' =>  $this->input->get_post('instanceid', TRUE)
                ,'parentid' =>  $this->input->get_post('parentid', TRUE)
                ,'thestate' =>   $this->input->get_post('thestate', TRUE)
            );
            $nextstate = $this->m_nextstate->setRow($data);
            print json_encode($nextstate);
    }
    function newRow() {
            log_message('debug', 'NEXTSTATE.newRow post : '.json_encode($this->input->post(NULL, FALSE)));
          $data = array(
                'nextstateid' =>  $this->input->get_post('nextstateid', TRUE)
                ,'instanceid' =>  $this->input->get_post('instanceid', TRUE)
                ,'parentid' =>  $this->input->get_post('parentid', TRUE)
                ,'thestate' =>   $this->input->get_post('thestate', TRUE)
            );
                $instanceid =  $this->input->get_post('instanceid', TRUE);
                $parentid =  $this->input->get_post('parentid', TRUE);
            $nextstate= $this->m_nextstate->newRow($instanceid,$parentid,$data);
            $return = $nextstate;
            print json_encode($return);
    }
    function getRow() {
        log_message('debug', 'NEXTSTATE.getRow post : '.json_encode($this->input->post(NULL, FALSE)));
        $empId  =  $this->input->get_post('id', TRUE);
        if (isset($empId)) {
            $nextstate = $this->m_nextstate->getRow($empId);
            $return = array(
                'success' => true,
                'data'    => $nextstate
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
            	$sort[] = array('property'=>'thestate', 'direction'=>'ASC');
            	$sort = json_encode($sort);
            }
            $parentid=$this->input->get('parentid', FALSE);
            if(isset($parentid)){
                if($parentid!=''){
                    $nextstate= $this->m_nextstate->getRowsByParent($parentid,$sort);
                }else{
                    $nextstate= $this->m_nextstate->getRows($sort);
                }
            }else{
              $nextstate= $this->m_nextstate->getRows($sort);
            }
            $return = array(
                'success' =>  TRUE ,
                'data'    => $nextstate
            );
        print json_encode($return);
    }
    function getRowsByInstance() {
        log_message('debug', 'NEXTSTATE.getRowsByInstance post : '.json_encode($this->input->post(NULL, FALSE)));
            $group = $this->input->get('group', FALSE); 
           $sort = $this->input->get('sort', FALSE);
           if(!$sort && $group) $sort = $group;
           if(!$sort || $group == $sort) 
            {
            	$sort = json_decode($sort);
            	$sort[] = array('property'=>'thestate', 'direction'=>'ASC');
            	$sort = json_encode($sort);
            }
        $InstId  =  $this->input->get_post('instanceid', TRUE);
        if (strlen($InstId) > 0) {
            $nextstate= $this->m_nextstate->getRowsByInstance($InstId,$sort);
            $return = array(
                'success' =>  TRUE ,
                'data'    => $nextstate
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
        log_message('debug', 'NEXTSTATE.getRowsByParent post : '.json_encode($this->input->post(NULL, FALSE)));
            $group = $this->input->get('group', FALSE); 
           $sort = $this->input->get('sort', FALSE);
           if(!$sort && $group) $sort = $group;
           if(!$sort || $group == $sort) 
            {
            	$sort = json_decode($sort);
            	$sort[] = array('property'=>'thestate', 'direction'=>'ASC');
            	$sort = json_encode($sort);
            }
        $ParentId  =  $this->input->get_post('parentid', TRUE);
        if (strlen($ParentId) > 0) {
            $nextstate= $this->m_nextstate->getRowsByParent($ParentId,$sort);
            $return = array(
                'success' => TRUE,
                'data'    => $nextstate
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
        log_message('debug', 'NEXTSTATE.deleteRow post : '.json_encode($this->input->post(NULL, FALSE)));
        $tempId  =  $this->input->get_post('nextstateid', TRUE);
        if (strlen($tempId) > 0) {
            $return = $this->m_nextstate->deleteRow($tempId);
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
        $this->load->model('M_nextstate', 'm_nextstate');
    }
}
?>
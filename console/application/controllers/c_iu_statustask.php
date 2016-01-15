<?php
	 class C_iu_statustask extends CI_Controller {
    function __construct() {
         parent::__construct();
        $this->_loadModels();
    }
    function setRow() {
          log_message('debug', 'iu_statustask.setRow post : '.json_encode($this->input->post(NULL, FALSE)));
          log_message('debug', 'iu_statustask.getRows get : '.json_encode($this->input->get(NULL, FALSE)));
          $data = array(
                'iu_statustaskid' =>  $this->input->get_post('iu_statustaskid', TRUE)
                ,'instanceid' =>  $this->input->get_post('instanceid', TRUE)
                ,'name' =>   $this->input->get_post('name', TRUE)
                ,'doertype' =>   $this->input->get_post('doertype', TRUE)
                ,'duration_plan' =>   $this->input->get_post('duration_plan', TRUE)
                ,'info' =>   $this->input->get_post('info', TRUE)
                ,'contoller' =>   $this->input->get_post('contoller', TRUE)
                ,'statusonclose' =>   $this->input->get_post('statusonclose', TRUE)
                ,'possiblestatuses' =>   $this->input->get_post('possiblestatuses', TRUE)
                ,'finishallowed' =>   $this->input->get_post('finishallowed', TRUE)
                ,'tasksequence' =>   $this->input->get_post('tasksequence', TRUE)
                ,'afterall' =>   $this->input->get_post('afterall', TRUE)
            );
            $iu_statustask = $this->m_iu_statustask->setRow($data);
            print json_encode($iu_statustask);
    }
    function newRow() {
            log_message('debug', 'iu_statustask.newRow post : '.json_encode($this->input->post(NULL, FALSE)));
          $data = array(
                'iu_statustaskid' =>  $this->input->get_post('iu_statustaskid', TRUE)
                ,'instanceid' =>  $this->input->get_post('instanceid', TRUE)
                ,'name' =>   $this->input->get_post('name', TRUE)
                ,'doertype' =>   $this->input->get_post('doertype', TRUE)
                ,'duration_plan' =>   $this->input->get_post('duration_plan', TRUE)
                ,'info' =>   $this->input->get_post('info', TRUE)
                ,'contoller' =>   $this->input->get_post('contoller', TRUE)
                ,'statusonclose' =>   $this->input->get_post('statusonclose', TRUE)
                ,'possiblestatuses' =>   $this->input->get_post('possiblestatuses', TRUE)
                ,'finishallowed' =>   $this->input->get_post('finishallowed', TRUE)
                ,'tasksequence' =>   $this->input->get_post('tasksequence', TRUE)
                ,'afterall' =>   $this->input->get_post('afterall', TRUE)
            );
                $instanceid =  $this->input->get_post('instanceid', TRUE);
            $iu_statustask= $this->m_iu_statustask->newRow($instanceid,$data);
            $return = $iu_statustask;
            print json_encode($return);
    }
    function getRow() {
        log_message('debug', 'iu_statustask.getRow post : '.json_encode($this->input->post(NULL, FALSE)));
        $empId  =  $this->input->get_post('id', TRUE);
        if (isset($empId)) {
            $iu_statustask = $this->m_iu_statustask->getRow($empId);
            $return = array(
                'success' => true,
                'data'    => $iu_statustask
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
            	$sort[] = array('property'=>'tasksequence', 'direction'=>'ASC');
            	$sort = json_encode($sort);
            }
            $instanceid=$this->input->get('instanceid', FALSE);
            if(isset($instanceid)){
                if($instanceid!=''){
                    $iu_statustask= $this->m_iu_statustask->getRowsByInstance($instanceid,$sort);
                }else{
                    $iu_statustask= $this->m_iu_statustask->getRows($sort);
                }
            }else{
              $iu_statustask= $this->m_iu_statustask->getRows($sort);
            }
            $return = array(
                'success' =>  TRUE ,
                'data'    => $iu_statustask
            );
        print json_encode($return);
    }
    function getRowsByInstance() {
        log_message('debug', 'iu_statustask.getRowsByInstance post : '.json_encode($this->input->post(NULL, FALSE)));
            $group = $this->input->get('group', FALSE); 
           $sort = $this->input->get('sort', FALSE);
           if(!$sort && $group) $sort = $group;
           if(!$sort || $group == $sort) 
            {
            	$sort = json_decode($sort);
            	$sort[] = array('property'=>'tasksequence', 'direction'=>'ASC');
            	$sort = json_encode($sort);
            }
        $InstId  =  $this->input->get_post('instanceid', TRUE);
        if (strlen($InstId) > 0) {
            $iu_statustask= $this->m_iu_statustask->getRowsByInstance($InstId,$sort);
            $return = array(
                'success' =>  TRUE ,
                'data'    => $iu_statustask
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
        log_message('debug', 'iu_statustask.getRowsByParent post : '.json_encode($this->input->post(NULL, FALSE)));
            $group = $this->input->get('group', FALSE); 
           $sort = $this->input->get('sort', FALSE);
           if(!$sort && $group) $sort = $group;
           if(!$sort || $group == $sort) 
            {
            	$sort = json_decode($sort);
            	$sort[] = array('property'=>'tasksequence', 'direction'=>'ASC');
            	$sort = json_encode($sort);
            }
        $ParentId  =  $this->input->get_post('parentid', TRUE);
        if (strlen($ParentId) > 0) {
            $iu_statustask= $this->m_iu_statustask->getRowsByParent($ParentId,$sort);
            $return = array(
                'success' => TRUE,
                'data'    => $iu_statustask
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
        log_message('debug', 'iu_statustask.deleteRow post : '.json_encode($this->input->post(NULL, FALSE)));
        $tempId  =  $this->input->get_post('iu_statustaskid', TRUE);
        if (strlen($tempId) > 0) {
            $return = $this->m_iu_statustask->deleteRow($tempId);
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
        $this->load->model('M_iu_statustask', 'm_iu_statustask');
    }
}
?>
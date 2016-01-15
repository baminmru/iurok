<?php
	 class C_iu_task extends CI_Controller {
    function __construct() {
         parent::__construct();
        $this->_loadModels();
    }
    function setRow() {
          log_message('debug', 'iu_task.setRow post : '.json_encode($this->input->post(NULL, FALSE)));
          log_message('debug', 'iu_task.getRows get : '.json_encode($this->input->get(NULL, FALSE)));
          $data = array(
                'iu_taskid' =>  $this->input->get_post('iu_taskid', TRUE)
                ,'instanceid' =>  $this->input->get_post('instanceid', TRUE)
                ,'doer' =>   $this->input->get_post('doer', TRUE)
                ,'contoller' =>   $this->input->get_post('contoller', TRUE)
                ,'subj' =>   $this->input->get_post('subj', TRUE)
                ,'createdate' =>   $this->input->get_post('createdate', TRUE)
                ,'planenddate' =>   $this->input->get_post('planenddate', TRUE)
                ,'info' =>   $this->input->get_post('info', TRUE)
                ,'manualtask' =>   $this->input->get_post('manualtask', TRUE)
                ,'theprocess' =>   $this->input->get_post('theprocess', TRUE)
                ,'doer_comment' =>   $this->input->get_post('doer_comment', TRUE)
                ,'doer_states' =>   $this->input->get_post('doer_states', TRUE)
                ,'controller_comment' =>   $this->input->get_post('controller_comment', TRUE)
                ,'taskfinished' =>   $this->input->get_post('taskfinished', TRUE)
                ,'ischecked' =>   $this->input->get_post('ischecked', TRUE)
                ,'finishdate' =>   $this->input->get_post('finishdate', TRUE)
                ,'taskcancelled' =>   $this->input->get_post('taskcancelled', TRUE)
                ,'senttodoer' =>   $this->input->get_post('senttodoer', TRUE)
                ,'isdelegated' =>   $this->input->get_post('isdelegated', TRUE)
                ,'processstatus' =>   $this->input->get_post('processstatus', TRUE)
                ,'statetask' =>   $this->input->get_post('statetask', TRUE)
                ,'delegatefrom' =>   $this->input->get_post('delegatefrom', TRUE)
            );
            $iu_task = $this->m_iu_task->setRow($data);
            print json_encode($iu_task);
    }
    function newRow() {
            log_message('debug', 'iu_task.newRow post : '.json_encode($this->input->post(NULL, FALSE)));
          $data = array(
                'iu_taskid' =>  $this->input->get_post('iu_taskid', TRUE)
                ,'instanceid' =>  $this->input->get_post('instanceid', TRUE)
                ,'doer' =>   $this->input->get_post('doer', TRUE)
                ,'contoller' =>   $this->input->get_post('contoller', TRUE)
                ,'subj' =>   $this->input->get_post('subj', TRUE)
                ,'createdate' =>   $this->input->get_post('createdate', TRUE)
                ,'planenddate' =>   $this->input->get_post('planenddate', TRUE)
                ,'info' =>   $this->input->get_post('info', TRUE)
                ,'manualtask' =>   $this->input->get_post('manualtask', TRUE)
                ,'theprocess' =>   $this->input->get_post('theprocess', TRUE)
                ,'doer_comment' =>   $this->input->get_post('doer_comment', TRUE)
                ,'doer_states' =>   $this->input->get_post('doer_states', TRUE)
                ,'controller_comment' =>   $this->input->get_post('controller_comment', TRUE)
                ,'taskfinished' =>   $this->input->get_post('taskfinished', TRUE)
                ,'ischecked' =>   $this->input->get_post('ischecked', TRUE)
                ,'finishdate' =>   $this->input->get_post('finishdate', TRUE)
                ,'taskcancelled' =>   $this->input->get_post('taskcancelled', TRUE)
                ,'senttodoer' =>   $this->input->get_post('senttodoer', TRUE)
                ,'isdelegated' =>   $this->input->get_post('isdelegated', TRUE)
                ,'processstatus' =>   $this->input->get_post('processstatus', TRUE)
                ,'statetask' =>   $this->input->get_post('statetask', TRUE)
                ,'delegatefrom' =>   $this->input->get_post('delegatefrom', TRUE)
            );
                $instanceid =  $this->input->get_post('instanceid', TRUE);
            $iu_task= $this->m_iu_task->newRow($instanceid,$data);
            $return = $iu_task;
            print json_encode($return);
    }
    function getRow() {
        log_message('debug', 'iu_task.getRow post : '.json_encode($this->input->post(NULL, FALSE)));
        $empId  =  $this->input->get_post('id', TRUE);
        if (isset($empId)) {
            $iu_task = $this->m_iu_task->getRow($empId);
            $return = array(
                'success' => true,
                'data'    => $iu_task
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
            	$sort[] = array('property'=>'doer', 'direction'=>'ASC');
            	$sort = json_encode($sort);
            }
            $instanceid=$this->input->get('instanceid', FALSE);
            if(isset($instanceid)){
                if($instanceid!=''){
                    $iu_task= $this->m_iu_task->getRowsByInstance($instanceid,$sort);
                }else{
                    $iu_task= $this->m_iu_task->getRows($sort);
                }
            }else{
              $iu_task= $this->m_iu_task->getRows($sort);
            }
            $return = array(
                'success' =>  TRUE ,
                'data'    => $iu_task
            );
        print json_encode($return);
    }
    function getRowsByInstance() {
        log_message('debug', 'iu_task.getRowsByInstance post : '.json_encode($this->input->post(NULL, FALSE)));
            $group = $this->input->get('group', FALSE); 
           $sort = $this->input->get('sort', FALSE);
           if(!$sort && $group) $sort = $group;
           if(!$sort || $group == $sort) 
            {
            	$sort = json_decode($sort);
            	$sort[] = array('property'=>'doer', 'direction'=>'ASC');
            	$sort = json_encode($sort);
            }
        $InstId  =  $this->input->get_post('instanceid', TRUE);
        if (strlen($InstId) > 0) {
            $iu_task= $this->m_iu_task->getRowsByInstance($InstId,$sort);
            $return = array(
                'success' =>  TRUE ,
                'data'    => $iu_task
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
        log_message('debug', 'iu_task.getRowsByParent post : '.json_encode($this->input->post(NULL, FALSE)));
            $group = $this->input->get('group', FALSE); 
           $sort = $this->input->get('sort', FALSE);
           if(!$sort && $group) $sort = $group;
           if(!$sort || $group == $sort) 
            {
            	$sort = json_decode($sort);
            	$sort[] = array('property'=>'doer', 'direction'=>'ASC');
            	$sort = json_encode($sort);
            }
        $ParentId  =  $this->input->get_post('parentid', TRUE);
        if (strlen($ParentId) > 0) {
            $iu_task= $this->m_iu_task->getRowsByParent($ParentId,$sort);
            $return = array(
                'success' => TRUE,
                'data'    => $iu_task
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
        log_message('debug', 'iu_task.deleteRow post : '.json_encode($this->input->post(NULL, FALSE)));
        $tempId  =  $this->input->get_post('iu_taskid', TRUE);
        if (strlen($tempId) > 0) {
            $return = $this->m_iu_task->deleteRow($tempId);
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
        $this->load->model('M_iu_task', 'm_iu_task');
    }
}
?>
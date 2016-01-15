<?php
	 class C_iu_stage_task extends CI_Controller {
    function __construct() {
         parent::__construct();
        $this->_loadModels();
    }
    function setRow() {
          log_message('debug', 'iu_stage_task.setRow post : '.json_encode($this->input->post(NULL, FALSE)));
          log_message('debug', 'iu_stage_task.getRows get : '.json_encode($this->input->get(NULL, FALSE)));
          $data = array(
                'iu_stage_taskid' =>  $this->input->get_post('iu_stage_taskid', TRUE)
                ,'instanceid' =>  $this->input->get_post('instanceid', TRUE)
,'thetask' =>   $this->input->get_post('thetask', TRUE)
            );
            $iu_stage_task = $this->m_iu_stage_task->setRow($data);
            print json_encode($iu_stage_task);
    }
    function newRow() {
            log_message('debug', 'iu_stage_task.newRow post : '.json_encode($this->input->post(NULL, FALSE)));
          $data = array(
                'iu_stage_taskid' =>  $this->input->get_post('iu_stage_taskid', TRUE)
                ,'instanceid' =>  $this->input->get_post('instanceid', TRUE)
,'thetask' =>   $this->input->get_post('thetask', TRUE)
            );
                $instanceid =  $this->input->get_post('instanceid', TRUE);
            $iu_stage_task= $this->m_iu_stage_task->newRow($instanceid,$data);
            $return = $iu_stage_task;
            print json_encode($return);
    }
    function getRow() {
        log_message('debug', 'iu_stage_task.getRow post : '.json_encode($this->input->post(NULL, FALSE)));
        $empId  =  $this->input->get_post('id', TRUE);
        if (isset($empId)) {
            $iu_stage_task = $this->m_iu_stage_task->getRow($empId);
            $return = array(
                'success' => true,
                'data'    => $iu_stage_task
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
            	$sort[] = array('property'=>'thetask', 'direction'=>'ASC');
            	$sort = json_encode($sort);
            }
            $instanceid=$this->input->get('instanceid', FALSE);
            if(isset($instanceid)){
                if($instanceid!=''){
                    $iu_stage_task= $this->m_iu_stage_task->getRowsByInstance($instanceid,$sort);
                }else{
                    $iu_stage_task= $this->m_iu_stage_task->getRows($sort);
                }
            }else{
              $iu_stage_task= $this->m_iu_stage_task->getRows($sort);
            }
            $return = array(
                'success' =>  TRUE ,
                'data'    => $iu_stage_task
            );
        print json_encode($return);
    }
    function getRowsByInstance() {
        log_message('debug', 'iu_stage_task.getRowsByInstance post : '.json_encode($this->input->post(NULL, FALSE)));
            $group = $this->input->get('group', FALSE); 
           $sort = $this->input->get('sort', FALSE);
           if(!$sort && $group) $sort = $group;
           if(!$sort || $group == $sort) 
            {
            	$sort = json_decode($sort);
            	$sort[] = array('property'=>'thetask', 'direction'=>'ASC');
            	$sort = json_encode($sort);
            }
        $InstId  =  $this->input->get_post('instanceid', TRUE);
        if (strlen($InstId) > 0) {
            $iu_stage_task= $this->m_iu_stage_task->getRowsByInstance($InstId,$sort);
            $return = array(
                'success' =>  TRUE ,
                'data'    => $iu_stage_task
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
        log_message('debug', 'iu_stage_task.getRowsByParent post : '.json_encode($this->input->post(NULL, FALSE)));
            $group = $this->input->get('group', FALSE); 
           $sort = $this->input->get('sort', FALSE);
           if(!$sort && $group) $sort = $group;
           if(!$sort || $group == $sort) 
            {
            	$sort = json_decode($sort);
            	$sort[] = array('property'=>'thetask', 'direction'=>'ASC');
            	$sort = json_encode($sort);
            }
        $ParentId  =  $this->input->get_post('parentid', TRUE);
        if (strlen($ParentId) > 0) {
            $iu_stage_task= $this->m_iu_stage_task->getRowsByParent($ParentId,$sort);
            $return = array(
                'success' => TRUE,
                'data'    => $iu_stage_task
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
        log_message('debug', 'iu_stage_task.deleteRow post : '.json_encode($this->input->post(NULL, FALSE)));
        $tempId  =  $this->input->get_post('iu_stage_taskid', TRUE);
        if (strlen($tempId) > 0) {
            $return = $this->m_iu_stage_task->deleteRow($tempId);
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
        $this->load->model('M_iu_stage_task', 'm_iu_stage_task');
    }
}
?>
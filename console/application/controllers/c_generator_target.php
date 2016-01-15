<?php
	 class C_generator_target extends CI_Controller {
    function __construct() {
         parent::__construct();
        $this->_loadModels();
    }
    function setRow() {
          log_message('debug', 'GENERATOR_TARGET.setRow post : '.json_encode($this->input->post(NULL, FALSE)));
          log_message('debug', 'GENERATOR_TARGET.getRows get : '.json_encode($this->input->get(NULL, FALSE)));
          $data = array(
                'generator_targetid' =>  $this->input->get_post('generator_targetid', TRUE)
                ,'instanceid' =>  $this->input->get_post('instanceid', TRUE)
                ,'parentid' =>  $this->input->get_post('parentid', TRUE)
                ,'name' =>   $this->input->get_post('name', TRUE)
                ,'targettype' =>   $this->input->get_post('targettype', TRUE)
                ,'queuename' =>   $this->input->get_post('queuename', TRUE)
                ,'generatorprogid' =>   $this->input->get_post('generatorprogid', TRUE)
                ,'generatorstyle' =>   $this->input->get_post('generatorstyle', TRUE)
                ,'thedevelopmentenv' =>   $this->input->get_post('thedevelopmentenv', TRUE)
            );
            $generator_target = $this->m_generator_target->setRow($data);
            print json_encode($generator_target);
    }
    function newRow() {
            log_message('debug', 'GENERATOR_TARGET.newRow post : '.json_encode($this->input->post(NULL, FALSE)));
          $data = array(
                'generator_targetid' =>  $this->input->get_post('generator_targetid', TRUE)
                ,'instanceid' =>  $this->input->get_post('instanceid', TRUE)
                ,'parentid' =>  $this->input->get_post('parentid', TRUE)
                ,'name' =>   $this->input->get_post('name', TRUE)
                ,'targettype' =>   $this->input->get_post('targettype', TRUE)
                ,'queuename' =>   $this->input->get_post('queuename', TRUE)
                ,'generatorprogid' =>   $this->input->get_post('generatorprogid', TRUE)
                ,'generatorstyle' =>   $this->input->get_post('generatorstyle', TRUE)
                ,'thedevelopmentenv' =>   $this->input->get_post('thedevelopmentenv', TRUE)
            );
                $instanceid =  $this->input->get_post('instanceid', TRUE);
                $parentid =  $this->input->get_post('parentid', TRUE);
            $generator_target= $this->m_generator_target->newRow($instanceid,$parentid,$data);
            $return = $generator_target;
            print json_encode($return);
    }
    function getRow() {
        log_message('debug', 'GENERATOR_TARGET.getRow post : '.json_encode($this->input->post(NULL, FALSE)));
        $empId  =  $this->input->get_post('id', TRUE);
        if (isset($empId)) {
            $generator_target = $this->m_generator_target->getRow($empId);
            $return = array(
                'success' => true,
                'data'    => $generator_target
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
                    $generator_target= $this->m_generator_target->getRowsByParent($parentid,$sort);
                }else{
                    $generator_target= $this->m_generator_target->getRows($sort);
                }
            }else{
              $generator_target= $this->m_generator_target->getRows($sort);
            }
            $return = array(
                'success' =>  TRUE ,
                'data'    => $generator_target
            );
        print json_encode($return);
    }
    function getRowsByInstance() {
        log_message('debug', 'GENERATOR_TARGET.getRowsByInstance post : '.json_encode($this->input->post(NULL, FALSE)));
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
            $generator_target= $this->m_generator_target->getRowsByInstance($InstId,$sort);
            $return = array(
                'success' =>  TRUE ,
                'data'    => $generator_target
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
        log_message('debug', 'GENERATOR_TARGET.getRowsByParent post : '.json_encode($this->input->post(NULL, FALSE)));
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
            $generator_target= $this->m_generator_target->getRowsByParent($ParentId,$sort);
            $return = array(
                'success' => TRUE,
                'data'    => $generator_target
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
        log_message('debug', 'GENERATOR_TARGET.deleteRow post : '.json_encode($this->input->post(NULL, FALSE)));
        $tempId  =  $this->input->get_post('generator_targetid', TRUE);
        if (strlen($tempId) > 0) {
            $return = $this->m_generator_target->deleteRow($tempId);
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
        $this->load->model('M_generator_target', 'm_generator_target');
    }
}
?>
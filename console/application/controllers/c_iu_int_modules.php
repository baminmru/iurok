<?php
	 class C_iu_int_modules extends CI_Controller {
    function __construct() {
         parent::__construct();
        $this->_loadModels();
    }
    function setRow() {
          log_message('debug', 'iu_int_modules.setRow post : '.json_encode($this->input->post(NULL, FALSE)));
          log_message('debug', 'iu_int_modules.getRows get : '.json_encode($this->input->get(NULL, FALSE)));
          $data = array(
                'iu_int_modulesid' =>  $this->input->get_post('iu_int_modulesid', TRUE)
                ,'instanceid' =>  $this->input->get_post('instanceid', TRUE)
                ,'sequence' =>   $this->input->get_post('sequence', TRUE)
                ,'theicon' =>   $this->input->get_post('theicon', TRUE)
                ,'groupname' =>   $this->input->get_post('groupname', TRUE)
                ,'name' =>   $this->input->get_post('name', TRUE)
                ,'caption' =>   $this->input->get_post('caption', TRUE)
                ,'visiblecontrol' =>   $this->input->get_post('visiblecontrol', TRUE)
                ,'controldocmode' =>   $this->input->get_post('controldocmode', TRUE)
                ,'otherdocmode' =>   $this->input->get_post('otherdocmode', TRUE)
                ,'mydocmode' =>   $this->input->get_post('mydocmode', TRUE)
                ,'allobjects' =>   $this->input->get_post('allobjects', TRUE)
                ,'colegsobject' =>   $this->input->get_post('colegsobject', TRUE)
                ,'substructobjects' =>   $this->input->get_post('substructobjects', TRUE)
            );
            $iu_int_modules = $this->m_iu_int_modules->setRow($data);
            print json_encode($iu_int_modules);
    }
    function newRow() {
            log_message('debug', 'iu_int_modules.newRow post : '.json_encode($this->input->post(NULL, FALSE)));
          $data = array(
                'iu_int_modulesid' =>  $this->input->get_post('iu_int_modulesid', TRUE)
                ,'instanceid' =>  $this->input->get_post('instanceid', TRUE)
                ,'sequence' =>   $this->input->get_post('sequence', TRUE)
                ,'theicon' =>   $this->input->get_post('theicon', TRUE)
                ,'groupname' =>   $this->input->get_post('groupname', TRUE)
                ,'name' =>   $this->input->get_post('name', TRUE)
                ,'caption' =>   $this->input->get_post('caption', TRUE)
                ,'visiblecontrol' =>   $this->input->get_post('visiblecontrol', TRUE)
                ,'controldocmode' =>   $this->input->get_post('controldocmode', TRUE)
                ,'otherdocmode' =>   $this->input->get_post('otherdocmode', TRUE)
                ,'mydocmode' =>   $this->input->get_post('mydocmode', TRUE)
                ,'allobjects' =>   $this->input->get_post('allobjects', TRUE)
                ,'colegsobject' =>   $this->input->get_post('colegsobject', TRUE)
                ,'substructobjects' =>   $this->input->get_post('substructobjects', TRUE)
            );
                $instanceid =  $this->input->get_post('instanceid', TRUE);
            $iu_int_modules= $this->m_iu_int_modules->newRow($instanceid,$data);
            $return = $iu_int_modules;
            print json_encode($return);
    }
    function getRow() {
        log_message('debug', 'iu_int_modules.getRow post : '.json_encode($this->input->post(NULL, FALSE)));
        $empId  =  $this->input->get_post('id', TRUE);
        if (isset($empId)) {
            $iu_int_modules = $this->m_iu_int_modules->getRow($empId);
            $return = array(
                'success' => true,
                'data'    => $iu_int_modules
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
            	$sort[] = array('property'=>'sequence', 'direction'=>'ASC');
            	$sort = json_encode($sort);
            }
            $instanceid=$this->input->get('instanceid', FALSE);
            if(isset($instanceid)){
                if($instanceid!=''){
                    $iu_int_modules= $this->m_iu_int_modules->getRowsByInstance($instanceid,$sort);
                }else{
                    $iu_int_modules= $this->m_iu_int_modules->getRows($sort);
                }
            }else{
              $iu_int_modules= $this->m_iu_int_modules->getRows($sort);
            }
            $return = array(
                'success' =>  TRUE ,
                'data'    => $iu_int_modules
            );
        print json_encode($return);
    }
    function getRowsByInstance() {
        log_message('debug', 'iu_int_modules.getRowsByInstance post : '.json_encode($this->input->post(NULL, FALSE)));
            $group = $this->input->get('group', FALSE); 
           $sort = $this->input->get('sort', FALSE);
           if(!$sort && $group) $sort = $group;
           if(!$sort || $group == $sort) 
            {
            	$sort = json_decode($sort);
            	$sort[] = array('property'=>'sequence', 'direction'=>'ASC');
            	$sort = json_encode($sort);
            }
        $InstId  =  $this->input->get_post('instanceid', TRUE);
        if (strlen($InstId) > 0) {
            $iu_int_modules= $this->m_iu_int_modules->getRowsByInstance($InstId,$sort);
            $return = array(
                'success' =>  TRUE ,
                'data'    => $iu_int_modules
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
        log_message('debug', 'iu_int_modules.getRowsByParent post : '.json_encode($this->input->post(NULL, FALSE)));
            $group = $this->input->get('group', FALSE); 
           $sort = $this->input->get('sort', FALSE);
           if(!$sort && $group) $sort = $group;
           if(!$sort || $group == $sort) 
            {
            	$sort = json_decode($sort);
            	$sort[] = array('property'=>'sequence', 'direction'=>'ASC');
            	$sort = json_encode($sort);
            }
        $ParentId  =  $this->input->get_post('parentid', TRUE);
        if (strlen($ParentId) > 0) {
            $iu_int_modules= $this->m_iu_int_modules->getRowsByParent($ParentId,$sort);
            $return = array(
                'success' => TRUE,
                'data'    => $iu_int_modules
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
        log_message('debug', 'iu_int_modules.deleteRow post : '.json_encode($this->input->post(NULL, FALSE)));
        $tempId  =  $this->input->get_post('iu_int_modulesid', TRUE);
        if (strlen($tempId) > 0) {
            $return = $this->m_iu_int_modules->deleteRow($tempId);
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
        $this->load->model('M_iu_int_modules', 'm_iu_int_modules');
    }
}
?>
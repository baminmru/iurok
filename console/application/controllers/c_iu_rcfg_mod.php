<?php
	 class C_iu_rcfg_mod extends CI_Controller {
    function __construct() {
         parent::__construct();
        $this->_loadModels();
    }
    function setRow() {
          log_message('debug', 'iu_rcfg_mod.setRow post : '.json_encode($this->input->post(NULL, FALSE)));
          log_message('debug', 'iu_rcfg_mod.getRows get : '.json_encode($this->input->get(NULL, FALSE)));
          $data = array(
                'iu_rcfg_modid' =>  $this->input->get_post('iu_rcfg_modid', TRUE)
                ,'instanceid' =>  $this->input->get_post('instanceid', TRUE)
                ,'sequence' =>   $this->input->get_post('sequence', TRUE)
                ,'caption' =>   $this->input->get_post('caption', TRUE)
                ,'theicon' =>   $this->input->get_post('theicon', TRUE)
                ,'name' =>   $this->input->get_post('name', TRUE)
                ,'groupname' =>   $this->input->get_post('groupname', TRUE)
                ,'moduleaccessible' =>   $this->input->get_post('moduleaccessible', TRUE)
                ,'visiblecontrol' =>   $this->input->get_post('visiblecontrol', TRUE)
                ,'allobjects' =>   $this->input->get_post('allobjects', TRUE)
                ,'colegsobject' =>   $this->input->get_post('colegsobject', TRUE)
                ,'substructobjects' =>   $this->input->get_post('substructobjects', TRUE)
                ,'tmobjects' =>   $this->input->get_post('tmobjects', TRUE)
                ,'mydocmode' =>   $this->input->get_post('mydocmode', TRUE)
                ,'otherdocmode' =>   $this->input->get_post('otherdocmode', TRUE)
                ,'controldocmode' =>   $this->input->get_post('controldocmode', TRUE)
            );
            $iu_rcfg_mod = $this->m_iu_rcfg_mod->setRow($data);
            print json_encode($iu_rcfg_mod);
    }
    function newRow() {
            log_message('debug', 'iu_rcfg_mod.newRow post : '.json_encode($this->input->post(NULL, FALSE)));
          $data = array(
                'iu_rcfg_modid' =>  $this->input->get_post('iu_rcfg_modid', TRUE)
                ,'instanceid' =>  $this->input->get_post('instanceid', TRUE)
                ,'sequence' =>   $this->input->get_post('sequence', TRUE)
                ,'caption' =>   $this->input->get_post('caption', TRUE)
                ,'theicon' =>   $this->input->get_post('theicon', TRUE)
                ,'name' =>   $this->input->get_post('name', TRUE)
                ,'groupname' =>   $this->input->get_post('groupname', TRUE)
                ,'moduleaccessible' =>   $this->input->get_post('moduleaccessible', TRUE)
                ,'visiblecontrol' =>   $this->input->get_post('visiblecontrol', TRUE)
                ,'allobjects' =>   $this->input->get_post('allobjects', TRUE)
                ,'colegsobject' =>   $this->input->get_post('colegsobject', TRUE)
                ,'substructobjects' =>   $this->input->get_post('substructobjects', TRUE)
                ,'tmobjects' =>   $this->input->get_post('tmobjects', TRUE)
                ,'mydocmode' =>   $this->input->get_post('mydocmode', TRUE)
                ,'otherdocmode' =>   $this->input->get_post('otherdocmode', TRUE)
                ,'controldocmode' =>   $this->input->get_post('controldocmode', TRUE)
            );
                $instanceid =  $this->input->get_post('instanceid', TRUE);
            $iu_rcfg_mod= $this->m_iu_rcfg_mod->newRow($instanceid,$data);
            $return = $iu_rcfg_mod;
            print json_encode($return);
    }
    function getRow() {
        log_message('debug', 'iu_rcfg_mod.getRow post : '.json_encode($this->input->post(NULL, FALSE)));
        $empId  =  $this->input->get_post('id', TRUE);
        if (isset($empId)) {
            $iu_rcfg_mod = $this->m_iu_rcfg_mod->getRow($empId);
            $return = array(
                'success' => true,
                'data'    => $iu_rcfg_mod
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
                    $iu_rcfg_mod= $this->m_iu_rcfg_mod->getRowsByInstance($instanceid,$sort);
                }else{
                    $iu_rcfg_mod= $this->m_iu_rcfg_mod->getRows($sort);
                }
            }else{
              $iu_rcfg_mod= $this->m_iu_rcfg_mod->getRows($sort);
            }
            $return = array(
                'success' =>  TRUE ,
                'data'    => $iu_rcfg_mod
            );
        print json_encode($return);
    }
    function getRowsByInstance() {
        log_message('debug', 'iu_rcfg_mod.getRowsByInstance post : '.json_encode($this->input->post(NULL, FALSE)));
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
            $iu_rcfg_mod= $this->m_iu_rcfg_mod->getRowsByInstance($InstId,$sort);
            $return = array(
                'success' =>  TRUE ,
                'data'    => $iu_rcfg_mod
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
        log_message('debug', 'iu_rcfg_mod.getRowsByParent post : '.json_encode($this->input->post(NULL, FALSE)));
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
            $iu_rcfg_mod= $this->m_iu_rcfg_mod->getRowsByParent($ParentId,$sort);
            $return = array(
                'success' => TRUE,
                'data'    => $iu_rcfg_mod
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
        log_message('debug', 'iu_rcfg_mod.deleteRow post : '.json_encode($this->input->post(NULL, FALSE)));
        $tempId  =  $this->input->get_post('iu_rcfg_modid', TRUE);
        if (strlen($tempId) > 0) {
            $return = $this->m_iu_rcfg_mod->deleteRow($tempId);
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
        $this->load->model('M_iu_rcfg_mod', 'm_iu_rcfg_mod');
    }
}
?>
<?php
	 class C_iu_cmodule extends CI_Controller {
    function __construct() {
         parent::__construct();
        $this->_loadModels();
    }
    function setRow() {
          log_message('debug', 'iu_cmodule.setRow post : '.json_encode($this->input->post(NULL, FALSE)));
          log_message('debug', 'iu_cmodule.getRows get : '.json_encode($this->input->get(NULL, FALSE)));
          $data = array(
                'iu_cmoduleid' =>  $this->input->get_post('iu_cmoduleid', TRUE)
                ,'instanceid' =>  $this->input->get_post('instanceid', TRUE)
                ,'groupname' =>   $this->input->get_post('groupname', TRUE)
                ,'caption' =>   $this->input->get_post('caption', TRUE)
                ,'sequence' =>   $this->input->get_post('sequence', TRUE)
                ,'moduleaccessible' =>   $this->input->get_post('moduleaccessible', TRUE)
                ,'theicon' =>   $this->input->get_post('theicon', TRUE)
                ,'name' =>   $this->input->get_post('name', TRUE)
                ,'allobjects' =>   $this->input->get_post('allobjects', TRUE)
                ,'colegsobject' =>   $this->input->get_post('colegsobject', TRUE)
                ,'substructobjects' =>   $this->input->get_post('substructobjects', TRUE)
                ,'mydocmode' =>   $this->input->get_post('mydocmode', TRUE)
                ,'controldocmode' =>   $this->input->get_post('controldocmode', TRUE)
                ,'otherdocmode' =>   $this->input->get_post('otherdocmode', TRUE)
            );
            $iu_cmodule = $this->m_iu_cmodule->setRow($data);
            print json_encode($iu_cmodule);
    }
    function newRow() {
            log_message('debug', 'iu_cmodule.newRow post : '.json_encode($this->input->post(NULL, FALSE)));
          $data = array(
                'iu_cmoduleid' =>  $this->input->get_post('iu_cmoduleid', TRUE)
                ,'instanceid' =>  $this->input->get_post('instanceid', TRUE)
                ,'groupname' =>   $this->input->get_post('groupname', TRUE)
                ,'caption' =>   $this->input->get_post('caption', TRUE)
                ,'sequence' =>   $this->input->get_post('sequence', TRUE)
                ,'moduleaccessible' =>   $this->input->get_post('moduleaccessible', TRUE)
                ,'theicon' =>   $this->input->get_post('theicon', TRUE)
                ,'name' =>   $this->input->get_post('name', TRUE)
                ,'allobjects' =>   $this->input->get_post('allobjects', TRUE)
                ,'colegsobject' =>   $this->input->get_post('colegsobject', TRUE)
                ,'substructobjects' =>   $this->input->get_post('substructobjects', TRUE)
                ,'mydocmode' =>   $this->input->get_post('mydocmode', TRUE)
                ,'controldocmode' =>   $this->input->get_post('controldocmode', TRUE)
                ,'otherdocmode' =>   $this->input->get_post('otherdocmode', TRUE)
            );
                $instanceid =  $this->input->get_post('instanceid', TRUE);
            $iu_cmodule= $this->m_iu_cmodule->newRow($instanceid,$data);
            $return = $iu_cmodule;
            print json_encode($return);
    }
    function getRow() {
        log_message('debug', 'iu_cmodule.getRow post : '.json_encode($this->input->post(NULL, FALSE)));
        $empId  =  $this->input->get_post('id', TRUE);
        if (isset($empId)) {
            $iu_cmodule = $this->m_iu_cmodule->getRow($empId);
            $return = array(
                'success' => true,
                'data'    => $iu_cmodule
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
                    $iu_cmodule= $this->m_iu_cmodule->getRowsByInstance($instanceid,$sort);
                }else{
                    $iu_cmodule= $this->m_iu_cmodule->getRows($sort);
                }
            }else{
              $iu_cmodule= $this->m_iu_cmodule->getRows($sort);
            }
            $return = array(
                'success' =>  TRUE ,
                'data'    => $iu_cmodule
            );
        print json_encode($return);
    }
    function getRowsByInstance() {
        log_message('debug', 'iu_cmodule.getRowsByInstance post : '.json_encode($this->input->post(NULL, FALSE)));
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
            $iu_cmodule= $this->m_iu_cmodule->getRowsByInstance($InstId,$sort);
            $return = array(
                'success' =>  TRUE ,
                'data'    => $iu_cmodule
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
        log_message('debug', 'iu_cmodule.getRowsByParent post : '.json_encode($this->input->post(NULL, FALSE)));
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
            $iu_cmodule= $this->m_iu_cmodule->getRowsByParent($ParentId,$sort);
            $return = array(
                'success' => TRUE,
                'data'    => $iu_cmodule
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
        log_message('debug', 'iu_cmodule.deleteRow post : '.json_encode($this->input->post(NULL, FALSE)));
        $tempId  =  $this->input->get_post('iu_cmoduleid', TRUE);
        if (strlen($tempId) > 0) {
            $return = $this->m_iu_cmodule->deleteRow($tempId);
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
        $this->load->model('M_iu_cmodule', 'm_iu_cmodule');
    }
}
?>
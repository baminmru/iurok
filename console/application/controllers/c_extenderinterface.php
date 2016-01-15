<?php
	 class C_extenderinterface extends CI_Controller {
    function __construct() {
         parent::__construct();
        $this->_loadModels();
    }
    function setRow() {
          log_message('debug', 'ExtenderInterface.setRow post : '.json_encode($this->input->post(NULL, FALSE)));
          log_message('debug', 'ExtenderInterface.getRows get : '.json_encode($this->input->get(NULL, FALSE)));
          $data = array(
                'extenderinterfaceid' =>  $this->input->get_post('extenderinterfaceid', TRUE)
                ,'instanceid' =>  $this->input->get_post('instanceid', TRUE)
                ,'parentid' =>  $this->input->get_post('parentid', TRUE)
                ,'thename' =>   $this->input->get_post('thename', TRUE)
                ,'targetplatform' =>   $this->input->get_post('targetplatform', TRUE)
                ,'theobject' =>   $this->input->get_post('theobject', TRUE)
                ,'theconfig' =>   $this->input->get_post('theconfig', TRUE)
            );
            $extenderinterface = $this->m_extenderinterface->setRow($data);
            print json_encode($extenderinterface);
    }
    function newRow() {
            log_message('debug', 'ExtenderInterface.newRow post : '.json_encode($this->input->post(NULL, FALSE)));
          $data = array(
                'extenderinterfaceid' =>  $this->input->get_post('extenderinterfaceid', TRUE)
                ,'instanceid' =>  $this->input->get_post('instanceid', TRUE)
                ,'parentid' =>  $this->input->get_post('parentid', TRUE)
                ,'thename' =>   $this->input->get_post('thename', TRUE)
                ,'targetplatform' =>   $this->input->get_post('targetplatform', TRUE)
                ,'theobject' =>   $this->input->get_post('theobject', TRUE)
                ,'theconfig' =>   $this->input->get_post('theconfig', TRUE)
            );
                $instanceid =  $this->input->get_post('instanceid', TRUE);
                $parentid =  $this->input->get_post('parentid', TRUE);
            $extenderinterface= $this->m_extenderinterface->newRow($instanceid,$parentid,$data);
            $return = $extenderinterface;
            print json_encode($return);
    }
    function getRow() {
        log_message('debug', 'ExtenderInterface.getRow post : '.json_encode($this->input->post(NULL, FALSE)));
        $empId  =  $this->input->get_post('id', TRUE);
        if (isset($empId)) {
            $extenderinterface = $this->m_extenderinterface->getRow($empId);
            $return = array(
                'success' => true,
                'data'    => $extenderinterface
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
            	$sort[] = array('property'=>'thename', 'direction'=>'ASC');
            	$sort = json_encode($sort);
            }
            $parentid=$this->input->get('parentid', FALSE);
            if(isset($parentid)){
                if($parentid!=''){
                    $extenderinterface= $this->m_extenderinterface->getRowsByParent($parentid,$sort);
                }else{
                    $extenderinterface= $this->m_extenderinterface->getRows($sort);
                }
            }else{
              $extenderinterface= $this->m_extenderinterface->getRows($sort);
            }
            $return = array(
                'success' =>  TRUE ,
                'data'    => $extenderinterface
            );
        print json_encode($return);
    }
    function getRowsByInstance() {
        log_message('debug', 'ExtenderInterface.getRowsByInstance post : '.json_encode($this->input->post(NULL, FALSE)));
            $group = $this->input->get('group', FALSE); 
           $sort = $this->input->get('sort', FALSE);
           if(!$sort && $group) $sort = $group;
           if(!$sort || $group == $sort) 
            {
            	$sort = json_decode($sort);
            	$sort[] = array('property'=>'thename', 'direction'=>'ASC');
            	$sort = json_encode($sort);
            }
        $InstId  =  $this->input->get_post('instanceid', TRUE);
        if (strlen($InstId) > 0) {
            $extenderinterface= $this->m_extenderinterface->getRowsByInstance($InstId,$sort);
            $return = array(
                'success' =>  TRUE ,
                'data'    => $extenderinterface
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
        log_message('debug', 'ExtenderInterface.getRowsByParent post : '.json_encode($this->input->post(NULL, FALSE)));
            $group = $this->input->get('group', FALSE); 
           $sort = $this->input->get('sort', FALSE);
           if(!$sort && $group) $sort = $group;
           if(!$sort || $group == $sort) 
            {
            	$sort = json_decode($sort);
            	$sort[] = array('property'=>'thename', 'direction'=>'ASC');
            	$sort = json_encode($sort);
            }
        $ParentId  =  $this->input->get_post('parentid', TRUE);
        if (strlen($ParentId) > 0) {
            $extenderinterface= $this->m_extenderinterface->getRowsByParent($ParentId,$sort);
            $return = array(
                'success' => TRUE,
                'data'    => $extenderinterface
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
        log_message('debug', 'ExtenderInterface.deleteRow post : '.json_encode($this->input->post(NULL, FALSE)));
        $tempId  =  $this->input->get_post('extenderinterfaceid', TRUE);
        if (strlen($tempId) > 0) {
            $return = $this->m_extenderinterface->deleteRow($tempId);
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
        $this->load->model('M_extenderinterface', 'm_extenderinterface');
    }
}
?>
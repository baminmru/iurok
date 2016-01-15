<?php
	 class C_objectmode extends CI_Controller {
    function __construct() {
         parent::__construct();
        $this->_loadModels();
    }
    function setRow() {
          log_message('debug', 'OBJECTMODE.setRow post : '.json_encode($this->input->post(NULL, FALSE)));
          log_message('debug', 'OBJECTMODE.getRows get : '.json_encode($this->input->get(NULL, FALSE)));
          $data = array(
                'objectmodeid' =>  $this->input->get_post('objectmodeid', TRUE)
                ,'instanceid' =>  $this->input->get_post('instanceid', TRUE)
                ,'parentid' =>  $this->input->get_post('parentid', TRUE)
                ,'name' =>   $this->input->get_post('name', TRUE)
                ,'defaultmode' =>   $this->input->get_post('defaultmode', TRUE)
                ,'thecomment' =>   $this->input->get_post('thecomment', TRUE)
            );
            $objectmode = $this->m_objectmode->setRow($data);
            print json_encode($objectmode);
    }
    function newRow() {
            log_message('debug', 'OBJECTMODE.newRow post : '.json_encode($this->input->post(NULL, FALSE)));
          $data = array(
                'objectmodeid' =>  $this->input->get_post('objectmodeid', TRUE)
                ,'instanceid' =>  $this->input->get_post('instanceid', TRUE)
                ,'parentid' =>  $this->input->get_post('parentid', TRUE)
                ,'name' =>   $this->input->get_post('name', TRUE)
                ,'defaultmode' =>   $this->input->get_post('defaultmode', TRUE)
                ,'thecomment' =>   $this->input->get_post('thecomment', TRUE)
            );
                $instanceid =  $this->input->get_post('instanceid', TRUE);
                $parentid =  $this->input->get_post('parentid', TRUE);
            $objectmode= $this->m_objectmode->newRow($instanceid,$parentid,$data);
            $return = $objectmode;
            print json_encode($return);
    }
    function getRow() {
        log_message('debug', 'OBJECTMODE.getRow post : '.json_encode($this->input->post(NULL, FALSE)));
        $empId  =  $this->input->get_post('id', TRUE);
        if (isset($empId)) {
            $objectmode = $this->m_objectmode->getRow($empId);
            $return = array(
                'success' => true,
                'data'    => $objectmode
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
                    $objectmode= $this->m_objectmode->getRowsByParent($parentid,$sort);
                }else{
                    $objectmode= $this->m_objectmode->getRows($sort);
                }
            }else{
              $objectmode= $this->m_objectmode->getRows($sort);
            }
            $return = array(
                'success' =>  TRUE ,
                'data'    => $objectmode
            );
        print json_encode($return);
    }
    function getRowsByInstance() {
        log_message('debug', 'OBJECTMODE.getRowsByInstance post : '.json_encode($this->input->post(NULL, FALSE)));
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
            $objectmode= $this->m_objectmode->getRowsByInstance($InstId,$sort);
            $return = array(
                'success' =>  TRUE ,
                'data'    => $objectmode
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
        log_message('debug', 'OBJECTMODE.getRowsByParent post : '.json_encode($this->input->post(NULL, FALSE)));
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
            $objectmode= $this->m_objectmode->getRowsByParent($ParentId,$sort);
            $return = array(
                'success' => TRUE,
                'data'    => $objectmode
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
        log_message('debug', 'OBJECTMODE.deleteRow post : '.json_encode($this->input->post(NULL, FALSE)));
        $tempId  =  $this->input->get_post('objectmodeid', TRUE);
        if (strlen($tempId) > 0) {
            $return = $this->m_objectmode->deleteRow($tempId);
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
        $this->load->model('M_objectmode', 'm_objectmode');
    }
}
?>
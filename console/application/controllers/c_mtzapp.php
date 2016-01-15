<?php
	 class C_mtzapp extends CI_Controller {
    function __construct() {
         parent::__construct();
        $this->_loadModels();
    }
    function setRow() {
          log_message('debug', 'MTZAPP.setRow post : '.json_encode($this->input->post(NULL, FALSE)));
          log_message('debug', 'MTZAPP.getRows get : '.json_encode($this->input->get(NULL, FALSE)));
          $data = array(
                'mtzappid' =>  $this->input->get_post('mtzappid', TRUE)
                ,'instanceid' =>  $this->input->get_post('instanceid', TRUE)
                ,'name' =>   $this->input->get_post('name', TRUE)
                ,'dbname' =>   $this->input->get_post('dbname', TRUE)
                ,'thecomment' =>   $this->input->get_post('thecomment', TRUE)
            );
            $mtzapp = $this->m_mtzapp->setRow($data);
            print json_encode($mtzapp);
    }
    function newRow() {
            log_message('debug', 'MTZAPP.newRow post : '.json_encode($this->input->post(NULL, FALSE)));
          $data = array(
                'mtzappid' =>  $this->input->get_post('mtzappid', TRUE)
                ,'instanceid' =>  $this->input->get_post('instanceid', TRUE)
                ,'name' =>   $this->input->get_post('name', TRUE)
                ,'dbname' =>   $this->input->get_post('dbname', TRUE)
                ,'thecomment' =>   $this->input->get_post('thecomment', TRUE)
            );
                $instanceid =  $this->input->get_post('instanceid', TRUE);
            $mtzapp= $this->m_mtzapp->newRow($instanceid,$data);
            $return = $mtzapp;
            print json_encode($return);
    }
    function getRow() {
        log_message('debug', 'MTZAPP.getRow post : '.json_encode($this->input->post(NULL, FALSE)));
        $empId  =  $this->input->get_post('id', TRUE);
        if (isset($empId)) {
            $mtzapp = $this->m_mtzapp->getRow($empId);
            $return = array(
                'success' => true,
                'data'    => $mtzapp
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
            $instanceid=$this->input->get('instanceid', FALSE);
            if(isset($instanceid)){
                if($instanceid!=''){
                    $mtzapp= $this->m_mtzapp->getRowsByInstance($instanceid,$sort);
                }else{
                    $mtzapp= $this->m_mtzapp->getRows($sort);
                }
            }else{
              $mtzapp= $this->m_mtzapp->getRows($sort);
            }
            $return = array(
                'success' =>  TRUE ,
                'data'    => $mtzapp
            );
        print json_encode($return);
    }
    function getRowsByInstance() {
        log_message('debug', 'MTZAPP.getRowsByInstance post : '.json_encode($this->input->post(NULL, FALSE)));
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
            $mtzapp= $this->m_mtzapp->getRowsByInstance($InstId,$sort);
            $return = array(
                'success' =>  TRUE ,
                'data'    => $mtzapp
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
        log_message('debug', 'MTZAPP.getRowsByParent post : '.json_encode($this->input->post(NULL, FALSE)));
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
            $mtzapp= $this->m_mtzapp->getRowsByParent($ParentId,$sort);
            $return = array(
                'success' => TRUE,
                'data'    => $mtzapp
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
        log_message('debug', 'MTZAPP.deleteRow post : '.json_encode($this->input->post(NULL, FALSE)));
        $tempId  =  $this->input->get_post('mtzappid', TRUE);
        if (strlen($tempId) > 0) {
            $return = $this->m_mtzapp->deleteRow($tempId);
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
        $this->load->model('M_mtzapp', 'm_mtzapp');
    }
}
?>
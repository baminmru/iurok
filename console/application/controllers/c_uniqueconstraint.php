<?php
	 class C_uniqueconstraint extends CI_Controller {
    function __construct() {
         parent::__construct();
        $this->_loadModels();
    }
    function setRow() {
          log_message('debug', 'UNIQUECONSTRAINT.setRow post : '.json_encode($this->input->post(NULL, FALSE)));
          log_message('debug', 'UNIQUECONSTRAINT.getRows get : '.json_encode($this->input->get(NULL, FALSE)));
          $data = array(
                'uniqueconstraintid' =>  $this->input->get_post('uniqueconstraintid', TRUE)
                ,'instanceid' =>  $this->input->get_post('instanceid', TRUE)
                ,'parentid' =>  $this->input->get_post('parentid', TRUE)
                ,'name' =>   $this->input->get_post('name', TRUE)
                ,'perparent' =>   $this->input->get_post('perparent', TRUE)
                ,'thecomment' =>   $this->input->get_post('thecomment', TRUE)
            );
            $uniqueconstraint = $this->m_uniqueconstraint->setRow($data);
            print json_encode($uniqueconstraint);
    }
    function newRow() {
            log_message('debug', 'UNIQUECONSTRAINT.newRow post : '.json_encode($this->input->post(NULL, FALSE)));
          $data = array(
                'uniqueconstraintid' =>  $this->input->get_post('uniqueconstraintid', TRUE)
                ,'instanceid' =>  $this->input->get_post('instanceid', TRUE)
                ,'parentid' =>  $this->input->get_post('parentid', TRUE)
                ,'name' =>   $this->input->get_post('name', TRUE)
                ,'perparent' =>   $this->input->get_post('perparent', TRUE)
                ,'thecomment' =>   $this->input->get_post('thecomment', TRUE)
            );
                $instanceid =  $this->input->get_post('instanceid', TRUE);
                $parentid =  $this->input->get_post('parentid', TRUE);
            $uniqueconstraint= $this->m_uniqueconstraint->newRow($instanceid,$parentid,$data);
            $return = $uniqueconstraint;
            print json_encode($return);
    }
    function getRow() {
        log_message('debug', 'UNIQUECONSTRAINT.getRow post : '.json_encode($this->input->post(NULL, FALSE)));
        $empId  =  $this->input->get_post('id', TRUE);
        if (isset($empId)) {
            $uniqueconstraint = $this->m_uniqueconstraint->getRow($empId);
            $return = array(
                'success' => true,
                'data'    => $uniqueconstraint
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
                    $uniqueconstraint= $this->m_uniqueconstraint->getRowsByParent($parentid,$sort);
                }else{
                    $uniqueconstraint= $this->m_uniqueconstraint->getRows($sort);
                }
            }else{
              $uniqueconstraint= $this->m_uniqueconstraint->getRows($sort);
            }
            $return = array(
                'success' =>  TRUE ,
                'data'    => $uniqueconstraint
            );
        print json_encode($return);
    }
    function getRowsByInstance() {
        log_message('debug', 'UNIQUECONSTRAINT.getRowsByInstance post : '.json_encode($this->input->post(NULL, FALSE)));
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
            $uniqueconstraint= $this->m_uniqueconstraint->getRowsByInstance($InstId,$sort);
            $return = array(
                'success' =>  TRUE ,
                'data'    => $uniqueconstraint
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
        log_message('debug', 'UNIQUECONSTRAINT.getRowsByParent post : '.json_encode($this->input->post(NULL, FALSE)));
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
            $uniqueconstraint= $this->m_uniqueconstraint->getRowsByParent($ParentId,$sort);
            $return = array(
                'success' => TRUE,
                'data'    => $uniqueconstraint
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
        log_message('debug', 'UNIQUECONSTRAINT.deleteRow post : '.json_encode($this->input->post(NULL, FALSE)));
        $tempId  =  $this->input->get_post('uniqueconstraintid', TRUE);
        if (strlen($tempId) > 0) {
            $return = $this->m_uniqueconstraint->deleteRow($tempId);
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
        $this->load->model('M_uniqueconstraint', 'm_uniqueconstraint');
    }
}
?>
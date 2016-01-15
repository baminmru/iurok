<?php
	 class C_parentpackage extends CI_Controller {
    function __construct() {
         parent::__construct();
        $this->_loadModels();
    }
    function setRow() {
          log_message('debug', 'ParentPackage.setRow post : '.json_encode($this->input->post(NULL, FALSE)));
          log_message('debug', 'ParentPackage.getRows get : '.json_encode($this->input->get(NULL, FALSE)));
          $data = array(
                'parentpackageid' =>  $this->input->get_post('parentpackageid', TRUE)
                ,'instanceid' =>  $this->input->get_post('instanceid', TRUE)
                ,'parentid' =>  $this->input->get_post('parentid', TRUE)
                ,'package' =>   $this->input->get_post('package', TRUE)
            );
            $parentpackage = $this->m_parentpackage->setRow($data);
            print json_encode($parentpackage);
    }
    function newRow() {
            log_message('debug', 'ParentPackage.newRow post : '.json_encode($this->input->post(NULL, FALSE)));
          $data = array(
                'parentpackageid' =>  $this->input->get_post('parentpackageid', TRUE)
                ,'instanceid' =>  $this->input->get_post('instanceid', TRUE)
                ,'parentid' =>  $this->input->get_post('parentid', TRUE)
                ,'package' =>   $this->input->get_post('package', TRUE)
            );
                $instanceid =  $this->input->get_post('instanceid', TRUE);
                $parentid =  $this->input->get_post('parentid', TRUE);
            $parentpackage= $this->m_parentpackage->newRow($instanceid,$parentid,$data);
            $return = $parentpackage;
            print json_encode($return);
    }
    function getRow() {
        log_message('debug', 'ParentPackage.getRow post : '.json_encode($this->input->post(NULL, FALSE)));
        $empId  =  $this->input->get_post('id', TRUE);
        if (isset($empId)) {
            $parentpackage = $this->m_parentpackage->getRow($empId);
            $return = array(
                'success' => true,
                'data'    => $parentpackage
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
            	$sort[] = array('property'=>'package', 'direction'=>'ASC');
            	$sort = json_encode($sort);
            }
            $parentid=$this->input->get('parentid', FALSE);
            if(isset($parentid)){
                if($parentid!=''){
                    $parentpackage= $this->m_parentpackage->getRowsByParent($parentid,$sort);
                }else{
                    $parentpackage= $this->m_parentpackage->getRows($sort);
                }
            }else{
              $parentpackage= $this->m_parentpackage->getRows($sort);
            }
            $return = array(
                'success' =>  TRUE ,
                'data'    => $parentpackage
            );
        print json_encode($return);
    }
    function getRowsByInstance() {
        log_message('debug', 'ParentPackage.getRowsByInstance post : '.json_encode($this->input->post(NULL, FALSE)));
            $group = $this->input->get('group', FALSE); 
           $sort = $this->input->get('sort', FALSE);
           if(!$sort && $group) $sort = $group;
           if(!$sort || $group == $sort) 
            {
            	$sort = json_decode($sort);
            	$sort[] = array('property'=>'package', 'direction'=>'ASC');
            	$sort = json_encode($sort);
            }
        $InstId  =  $this->input->get_post('instanceid', TRUE);
        if (strlen($InstId) > 0) {
            $parentpackage= $this->m_parentpackage->getRowsByInstance($InstId,$sort);
            $return = array(
                'success' =>  TRUE ,
                'data'    => $parentpackage
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
        log_message('debug', 'ParentPackage.getRowsByParent post : '.json_encode($this->input->post(NULL, FALSE)));
            $group = $this->input->get('group', FALSE); 
           $sort = $this->input->get('sort', FALSE);
           if(!$sort && $group) $sort = $group;
           if(!$sort || $group == $sort) 
            {
            	$sort = json_decode($sort);
            	$sort[] = array('property'=>'package', 'direction'=>'ASC');
            	$sort = json_encode($sort);
            }
        $ParentId  =  $this->input->get_post('parentid', TRUE);
        if (strlen($ParentId) > 0) {
            $parentpackage= $this->m_parentpackage->getRowsByParent($ParentId,$sort);
            $return = array(
                'success' => TRUE,
                'data'    => $parentpackage
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
        log_message('debug', 'ParentPackage.deleteRow post : '.json_encode($this->input->post(NULL, FALSE)));
        $tempId  =  $this->input->get_post('parentpackageid', TRUE);
        if (strlen($tempId) > 0) {
            $return = $this->m_parentpackage->deleteRow($tempId);
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
        $this->load->model('M_parentpackage', 'm_parentpackage');
    }
}
?>
<?php
	 class C_genpackage extends CI_Controller {
    function __construct() {
         parent::__construct();
        $this->_loadModels();
    }
    function setRow() {
          log_message('debug', 'GENPACKAGE.setRow post : '.json_encode($this->input->post(NULL, FALSE)));
          log_message('debug', 'GENPACKAGE.getRows get : '.json_encode($this->input->get(NULL, FALSE)));
          $data = array(
                'genpackageid' =>  $this->input->get_post('genpackageid', TRUE)
                ,'instanceid' =>  $this->input->get_post('instanceid', TRUE)
                ,'name' =>   $this->input->get_post('name', TRUE)
            );
            $genpackage = $this->m_genpackage->setRow($data);
            print json_encode($genpackage);
    }
    function newRow() {
            log_message('debug', 'GENPACKAGE.newRow post : '.json_encode($this->input->post(NULL, FALSE)));
          $data = array(
                'genpackageid' =>  $this->input->get_post('genpackageid', TRUE)
                ,'instanceid' =>  $this->input->get_post('instanceid', TRUE)
                ,'name' =>   $this->input->get_post('name', TRUE)
            );
                $instanceid =  $this->input->get_post('instanceid', TRUE);
            $genpackage= $this->m_genpackage->newRow($instanceid,$data);
            $return = $genpackage;
            print json_encode($return);
    }
    function getRow() {
        log_message('debug', 'GENPACKAGE.getRow post : '.json_encode($this->input->post(NULL, FALSE)));
        $empId  =  $this->input->get_post('id', TRUE);
        if (isset($empId)) {
            $genpackage = $this->m_genpackage->getRow($empId);
            $return = array(
                'success' => true,
                'data'    => $genpackage
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
                    $genpackage= $this->m_genpackage->getRowsByInstance($instanceid,$sort);
                }else{
                    $genpackage= $this->m_genpackage->getRows($sort);
                }
            }else{
              $genpackage= $this->m_genpackage->getRows($sort);
            }
            $return = array(
                'success' =>  TRUE ,
                'data'    => $genpackage
            );
        print json_encode($return);
    }
    function getRowsByInstance() {
        log_message('debug', 'GENPACKAGE.getRowsByInstance post : '.json_encode($this->input->post(NULL, FALSE)));
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
            $genpackage= $this->m_genpackage->getRowsByInstance($InstId,$sort);
            $return = array(
                'success' =>  TRUE ,
                'data'    => $genpackage
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
        log_message('debug', 'GENPACKAGE.getRowsByParent post : '.json_encode($this->input->post(NULL, FALSE)));
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
            $genpackage= $this->m_genpackage->getRowsByParent($ParentId,$sort);
            $return = array(
                'success' => TRUE,
                'data'    => $genpackage
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
        log_message('debug', 'GENPACKAGE.deleteRow post : '.json_encode($this->input->post(NULL, FALSE)));
        $tempId  =  $this->input->get_post('genpackageid', TRUE);
        if (strlen($tempId) > 0) {
            $return = $this->m_genpackage->deleteRow($tempId);
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
        $this->load->model('M_genpackage', 'm_genpackage');
    }
}
?>
<?php
	 class C_parameters extends CI_Controller {
    function __construct() {
         parent::__construct();
        $this->_loadModels();
    }
    function setRow() {
          log_message('debug', 'PARAMETERS.setRow post : '.json_encode($this->input->post(NULL, FALSE)));
          log_message('debug', 'PARAMETERS.getRows get : '.json_encode($this->input->get(NULL, FALSE)));
          $data = array(
                'parametersid' =>  $this->input->get_post('parametersid', TRUE)
                ,'instanceid' =>  $this->input->get_post('instanceid', TRUE)
                ,'parentid' =>  $this->input->get_post('parentid', TRUE)
                ,'sequence' =>   $this->input->get_post('sequence', TRUE)
                ,'name' =>   $this->input->get_post('name', TRUE)
                ,'caption' =>   $this->input->get_post('caption', TRUE)
                ,'typeofparm' =>   $this->input->get_post('typeofparm', TRUE)
                ,'datasize' =>   $this->input->get_post('datasize', TRUE)
                ,'allownull' =>   $this->input->get_post('allownull', TRUE)
                ,'outparam' =>   $this->input->get_post('outparam', TRUE)
                ,'referencetype' =>   $this->input->get_post('referencetype', TRUE)
                ,'reftotype' =>   $this->input->get_post('reftotype', TRUE)
                ,'reftopart' =>   $this->input->get_post('reftopart', TRUE)
            );
            $parameters = $this->m_parameters->setRow($data);
            print json_encode($parameters);
    }
    function newRow() {
            log_message('debug', 'PARAMETERS.newRow post : '.json_encode($this->input->post(NULL, FALSE)));
          $data = array(
                'parametersid' =>  $this->input->get_post('parametersid', TRUE)
                ,'instanceid' =>  $this->input->get_post('instanceid', TRUE)
                ,'parentid' =>  $this->input->get_post('parentid', TRUE)
                ,'sequence' =>   $this->input->get_post('sequence', TRUE)
                ,'name' =>   $this->input->get_post('name', TRUE)
                ,'caption' =>   $this->input->get_post('caption', TRUE)
                ,'typeofparm' =>   $this->input->get_post('typeofparm', TRUE)
                ,'datasize' =>   $this->input->get_post('datasize', TRUE)
                ,'allownull' =>   $this->input->get_post('allownull', TRUE)
                ,'outparam' =>   $this->input->get_post('outparam', TRUE)
                ,'referencetype' =>   $this->input->get_post('referencetype', TRUE)
                ,'reftotype' =>   $this->input->get_post('reftotype', TRUE)
                ,'reftopart' =>   $this->input->get_post('reftopart', TRUE)
            );
                $instanceid =  $this->input->get_post('instanceid', TRUE);
                $parentid =  $this->input->get_post('parentid', TRUE);
            $parameters= $this->m_parameters->newRow($instanceid,$parentid,$data);
            $return = $parameters;
            print json_encode($return);
    }
    function getRow() {
        log_message('debug', 'PARAMETERS.getRow post : '.json_encode($this->input->post(NULL, FALSE)));
        $empId  =  $this->input->get_post('id', TRUE);
        if (isset($empId)) {
            $parameters = $this->m_parameters->getRow($empId);
            $return = array(
                'success' => true,
                'data'    => $parameters
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
            $parentid=$this->input->get('parentid', FALSE);
            if(isset($parentid)){
                if($parentid!=''){
                    $parameters= $this->m_parameters->getRowsByParent($parentid,$sort);
                }else{
                    $parameters= $this->m_parameters->getRows($sort);
                }
            }else{
              $parameters= $this->m_parameters->getRows($sort);
            }
            $return = array(
                'success' =>  TRUE ,
                'data'    => $parameters
            );
        print json_encode($return);
    }
    function getRowsByInstance() {
        log_message('debug', 'PARAMETERS.getRowsByInstance post : '.json_encode($this->input->post(NULL, FALSE)));
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
            $parameters= $this->m_parameters->getRowsByInstance($InstId,$sort);
            $return = array(
                'success' =>  TRUE ,
                'data'    => $parameters
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
        log_message('debug', 'PARAMETERS.getRowsByParent post : '.json_encode($this->input->post(NULL, FALSE)));
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
            $parameters= $this->m_parameters->getRowsByParent($ParentId,$sort);
            $return = array(
                'success' => TRUE,
                'data'    => $parameters
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
        log_message('debug', 'PARAMETERS.deleteRow post : '.json_encode($this->input->post(NULL, FALSE)));
        $tempId  =  $this->input->get_post('parametersid', TRUE);
        if (strlen($tempId) > 0) {
            $return = $this->m_parameters->deleteRow($tempId);
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
        $this->load->model('M_parameters', 'm_parameters');
    }
}
?>
<?php
	 class C_fldextenders extends CI_Controller {
    function __construct() {
         parent::__construct();
        $this->_loadModels();
    }
    function setRow() {
          log_message('debug', 'FldExtenders.setRow post : '.json_encode($this->input->post(NULL, FALSE)));
          log_message('debug', 'FldExtenders.getRows get : '.json_encode($this->input->get(NULL, FALSE)));
          $data = array(
                'fldextendersid' =>  $this->input->get_post('fldextendersid', TRUE)
                ,'instanceid' =>  $this->input->get_post('instanceid', TRUE)
                ,'parentid' =>  $this->input->get_post('parentid', TRUE)
                ,'thename' =>   $this->input->get_post('thename', TRUE)
                ,'targetplatform' =>   $this->input->get_post('targetplatform', TRUE)
                ,'theobject' =>   $this->input->get_post('theobject', TRUE)
                ,'theconfig' =>   $this->input->get_post('theconfig', TRUE)
            );
            $fldextenders = $this->m_fldextenders->setRow($data);
            print json_encode($fldextenders);
    }
    function newRow() {
            log_message('debug', 'FldExtenders.newRow post : '.json_encode($this->input->post(NULL, FALSE)));
          $data = array(
                'fldextendersid' =>  $this->input->get_post('fldextendersid', TRUE)
                ,'instanceid' =>  $this->input->get_post('instanceid', TRUE)
                ,'parentid' =>  $this->input->get_post('parentid', TRUE)
                ,'thename' =>   $this->input->get_post('thename', TRUE)
                ,'targetplatform' =>   $this->input->get_post('targetplatform', TRUE)
                ,'theobject' =>   $this->input->get_post('theobject', TRUE)
                ,'theconfig' =>   $this->input->get_post('theconfig', TRUE)
            );
                $instanceid =  $this->input->get_post('instanceid', TRUE);
                $parentid =  $this->input->get_post('parentid', TRUE);
            $fldextenders= $this->m_fldextenders->newRow($instanceid,$parentid,$data);
            $return = $fldextenders;
            print json_encode($return);
    }
    function getRow() {
        log_message('debug', 'FldExtenders.getRow post : '.json_encode($this->input->post(NULL, FALSE)));
        $empId  =  $this->input->get_post('id', TRUE);
        if (isset($empId)) {
            $fldextenders = $this->m_fldextenders->getRow($empId);
            $return = array(
                'success' => true,
                'data'    => $fldextenders
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
                    $fldextenders= $this->m_fldextenders->getRowsByParent($parentid,$sort);
                }else{
                    $fldextenders= $this->m_fldextenders->getRows($sort);
                }
            }else{
              $fldextenders= $this->m_fldextenders->getRows($sort);
            }
            $return = array(
                'success' =>  TRUE ,
                'data'    => $fldextenders
            );
        print json_encode($return);
    }
    function getRowsByInstance() {
        log_message('debug', 'FldExtenders.getRowsByInstance post : '.json_encode($this->input->post(NULL, FALSE)));
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
            $fldextenders= $this->m_fldextenders->getRowsByInstance($InstId,$sort);
            $return = array(
                'success' =>  TRUE ,
                'data'    => $fldextenders
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
        log_message('debug', 'FldExtenders.getRowsByParent post : '.json_encode($this->input->post(NULL, FALSE)));
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
            $fldextenders= $this->m_fldextenders->getRowsByParent($ParentId,$sort);
            $return = array(
                'success' => TRUE,
                'data'    => $fldextenders
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
        log_message('debug', 'FldExtenders.deleteRow post : '.json_encode($this->input->post(NULL, FALSE)));
        $tempId  =  $this->input->get_post('fldextendersid', TRUE);
        if (strlen($tempId) > 0) {
            $return = $this->m_fldextenders->deleteRow($tempId);
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
        $this->load->model('M_fldextenders', 'm_fldextenders');
    }
}
?>
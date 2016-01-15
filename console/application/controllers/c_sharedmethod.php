<?php
	 class C_sharedmethod extends CI_Controller {
    function __construct() {
         parent::__construct();
        $this->_loadModels();
    }
    function setRow() {
          log_message('debug', 'SHAREDMETHOD.setRow post : '.json_encode($this->input->post(NULL, FALSE)));
          log_message('debug', 'SHAREDMETHOD.getRows get : '.json_encode($this->input->get(NULL, FALSE)));
          $data = array(
                'sharedmethodid' =>  $this->input->get_post('sharedmethodid', TRUE)
                ,'instanceid' =>  $this->input->get_post('instanceid', TRUE)
                ,'name' =>   $this->input->get_post('name', TRUE)
                ,'the_comment' =>   $this->input->get_post('the_comment', TRUE)
                ,'returntype' =>   $this->input->get_post('returntype', TRUE)
            );
            $sharedmethod = $this->m_sharedmethod->setRow($data);
            print json_encode($sharedmethod);
    }
    function newRow() {
            log_message('debug', 'SHAREDMETHOD.newRow post : '.json_encode($this->input->post(NULL, FALSE)));
          $data = array(
                'sharedmethodid' =>  $this->input->get_post('sharedmethodid', TRUE)
                ,'instanceid' =>  $this->input->get_post('instanceid', TRUE)
                ,'name' =>   $this->input->get_post('name', TRUE)
                ,'the_comment' =>   $this->input->get_post('the_comment', TRUE)
                ,'returntype' =>   $this->input->get_post('returntype', TRUE)
            );
                $instanceid =  $this->input->get_post('instanceid', TRUE);
            $sharedmethod= $this->m_sharedmethod->newRow($instanceid,$data);
            $return = $sharedmethod;
            print json_encode($return);
    }
    function getRow() {
        log_message('debug', 'SHAREDMETHOD.getRow post : '.json_encode($this->input->post(NULL, FALSE)));
        $empId  =  $this->input->get_post('id', TRUE);
        if (isset($empId)) {
            $sharedmethod = $this->m_sharedmethod->getRow($empId);
            $return = array(
                'success' => true,
                'data'    => $sharedmethod
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
                    $sharedmethod= $this->m_sharedmethod->getRowsByInstance($instanceid,$sort);
                }else{
                    $sharedmethod= $this->m_sharedmethod->getRows($sort);
                }
            }else{
              $sharedmethod= $this->m_sharedmethod->getRows($sort);
            }
            $return = array(
                'success' =>  TRUE ,
                'data'    => $sharedmethod
            );
        print json_encode($return);
    }
    function getRowsByInstance() {
        log_message('debug', 'SHAREDMETHOD.getRowsByInstance post : '.json_encode($this->input->post(NULL, FALSE)));
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
            $sharedmethod= $this->m_sharedmethod->getRowsByInstance($InstId,$sort);
            $return = array(
                'success' =>  TRUE ,
                'data'    => $sharedmethod
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
        log_message('debug', 'SHAREDMETHOD.getRowsByParent post : '.json_encode($this->input->post(NULL, FALSE)));
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
            $sharedmethod= $this->m_sharedmethod->getRowsByParent($ParentId,$sort);
            $return = array(
                'success' => TRUE,
                'data'    => $sharedmethod
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
        log_message('debug', 'SHAREDMETHOD.deleteRow post : '.json_encode($this->input->post(NULL, FALSE)));
        $tempId  =  $this->input->get_post('sharedmethodid', TRUE);
        if (strlen($tempId) > 0) {
            $return = $this->m_sharedmethod->deleteRow($tempId);
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
        $this->load->model('M_sharedmethod', 'm_sharedmethod');
    }
}
?>
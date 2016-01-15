<?php
	 class C_iu_state_tasklink extends CI_Controller {
    function __construct() {
         parent::__construct();
        $this->_loadModels();
    }
    function setRow() {
          log_message('debug', 'iu_state_tasklink.setRow post : '.json_encode($this->input->post(NULL, FALSE)));
          log_message('debug', 'iu_state_tasklink.getRows get : '.json_encode($this->input->get(NULL, FALSE)));
          $data = array(
                'iu_state_tasklinkid' =>  $this->input->get_post('iu_state_tasklinkid', TRUE)
                ,'instanceid' =>  $this->input->get_post('instanceid', TRUE)
                ,'parentid' =>  $this->input->get_post('parentid', TRUE)
                ,'doctype' =>   $this->input->get_post('doctype', TRUE)
                ,'allversions' =>   $this->input->get_post('allversions', TRUE)
            );
            $iu_state_tasklink = $this->m_iu_state_tasklink->setRow($data);
            print json_encode($iu_state_tasklink);
    }
    function newRow() {
            log_message('debug', 'iu_state_tasklink.newRow post : '.json_encode($this->input->post(NULL, FALSE)));
          $data = array(
                'iu_state_tasklinkid' =>  $this->input->get_post('iu_state_tasklinkid', TRUE)
                ,'instanceid' =>  $this->input->get_post('instanceid', TRUE)
                ,'parentid' =>  $this->input->get_post('parentid', TRUE)
                ,'doctype' =>   $this->input->get_post('doctype', TRUE)
                ,'allversions' =>   $this->input->get_post('allversions', TRUE)
            );
                $instanceid =  $this->input->get_post('instanceid', TRUE);
                $parentid =  $this->input->get_post('parentid', TRUE);
            $iu_state_tasklink= $this->m_iu_state_tasklink->newRow($instanceid,$parentid,$data);
            $return = $iu_state_tasklink;
            print json_encode($return);
    }
    function getRow() {
        log_message('debug', 'iu_state_tasklink.getRow post : '.json_encode($this->input->post(NULL, FALSE)));
        $empId  =  $this->input->get_post('id', TRUE);
        if (isset($empId)) {
            $iu_state_tasklink = $this->m_iu_state_tasklink->getRow($empId);
            $return = array(
                'success' => true,
                'data'    => $iu_state_tasklink
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
            	$sort[] = array('property'=>'doctype', 'direction'=>'ASC');
            	$sort = json_encode($sort);
            }
            $parentid=$this->input->get('parentid', FALSE);
            if(isset($parentid)){
                if($parentid!=''){
                    $iu_state_tasklink= $this->m_iu_state_tasklink->getRowsByParent($parentid,$sort);
                }else{
                    $iu_state_tasklink= $this->m_iu_state_tasklink->getRows($sort);
                }
            }else{
              $iu_state_tasklink= $this->m_iu_state_tasklink->getRows($sort);
            }
            $return = array(
                'success' =>  TRUE ,
                'data'    => $iu_state_tasklink
            );
        print json_encode($return);
    }
    function getRowsByInstance() {
        log_message('debug', 'iu_state_tasklink.getRowsByInstance post : '.json_encode($this->input->post(NULL, FALSE)));
            $group = $this->input->get('group', FALSE); 
           $sort = $this->input->get('sort', FALSE);
           if(!$sort && $group) $sort = $group;
           if(!$sort || $group == $sort) 
            {
            	$sort = json_decode($sort);
            	$sort[] = array('property'=>'doctype', 'direction'=>'ASC');
            	$sort = json_encode($sort);
            }
        $InstId  =  $this->input->get_post('instanceid', TRUE);
        if (strlen($InstId) > 0) {
            $iu_state_tasklink= $this->m_iu_state_tasklink->getRowsByInstance($InstId,$sort);
            $return = array(
                'success' =>  TRUE ,
                'data'    => $iu_state_tasklink
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
        log_message('debug', 'iu_state_tasklink.getRowsByParent post : '.json_encode($this->input->post(NULL, FALSE)));
            $group = $this->input->get('group', FALSE); 
           $sort = $this->input->get('sort', FALSE);
           if(!$sort && $group) $sort = $group;
           if(!$sort || $group == $sort) 
            {
            	$sort = json_decode($sort);
            	$sort[] = array('property'=>'doctype', 'direction'=>'ASC');
            	$sort = json_encode($sort);
            }
        $ParentId  =  $this->input->get_post('parentid', TRUE);
        if (strlen($ParentId) > 0) {
            $iu_state_tasklink= $this->m_iu_state_tasklink->getRowsByParent($ParentId,$sort);
            $return = array(
                'success' => TRUE,
                'data'    => $iu_state_tasklink
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
        log_message('debug', 'iu_state_tasklink.deleteRow post : '.json_encode($this->input->post(NULL, FALSE)));
        $tempId  =  $this->input->get_post('iu_state_tasklinkid', TRUE);
        if (strlen($tempId) > 0) {
            $return = $this->m_iu_state_tasklink->deleteRow($tempId);
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
        $this->load->model('M_iu_state_tasklink', 'm_iu_state_tasklink');
    }
}
?>
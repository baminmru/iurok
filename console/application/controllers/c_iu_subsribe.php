<?php
	 class C_iu_subsribe extends CI_Controller {
    function __construct() {
         parent::__construct();
        $this->_loadModels();
    }
    function setRow() {
          log_message('debug', 'iu_subsribe.setRow post : '.json_encode($this->input->post(NULL, FALSE)));
          log_message('debug', 'iu_subsribe.getRows get : '.json_encode($this->input->get(NULL, FALSE)));
          $data = array(
                'iu_subsribeid' =>  $this->input->get_post('iu_subsribeid', TRUE)
                ,'instanceid' =>  $this->input->get_post('instanceid', TRUE)
                ,'subscriber' =>   $this->input->get_post('subscriber', TRUE)
                ,'isactive' =>   $this->input->get_post('isactive', TRUE)
                ,'scandate' =>   $this->input->get_post('scandate', TRUE)
                ,'eventtype' =>   $this->input->get_post('eventtype', TRUE)
                ,'theprocess' =>   $this->input->get_post('theprocess', TRUE)
                ,'processstatus' =>   $this->input->get_post('processstatus', TRUE)
                ,'statetask' =>   $this->input->get_post('statetask', TRUE)
                ,'doer' =>   $this->input->get_post('doer', TRUE)
                ,'thedoc' =>   $this->input->get_post('thedoc', TRUE)
                ,'thevideo' =>   $this->input->get_post('thevideo', TRUE)
                ,'thediscussion' =>   $this->input->get_post('thediscussion', TRUE)
            );
            $iu_subsribe = $this->m_iu_subsribe->setRow($data);
            print json_encode($iu_subsribe);
    }
    function newRow() {
            log_message('debug', 'iu_subsribe.newRow post : '.json_encode($this->input->post(NULL, FALSE)));
          $data = array(
                'iu_subsribeid' =>  $this->input->get_post('iu_subsribeid', TRUE)
                ,'instanceid' =>  $this->input->get_post('instanceid', TRUE)
                ,'subscriber' =>   $this->input->get_post('subscriber', TRUE)
                ,'isactive' =>   $this->input->get_post('isactive', TRUE)
                ,'scandate' =>   $this->input->get_post('scandate', TRUE)
                ,'eventtype' =>   $this->input->get_post('eventtype', TRUE)
                ,'theprocess' =>   $this->input->get_post('theprocess', TRUE)
                ,'processstatus' =>   $this->input->get_post('processstatus', TRUE)
                ,'statetask' =>   $this->input->get_post('statetask', TRUE)
                ,'doer' =>   $this->input->get_post('doer', TRUE)
                ,'thedoc' =>   $this->input->get_post('thedoc', TRUE)
                ,'thevideo' =>   $this->input->get_post('thevideo', TRUE)
                ,'thediscussion' =>   $this->input->get_post('thediscussion', TRUE)
            );
                $instanceid =  $this->input->get_post('instanceid', TRUE);
            $iu_subsribe= $this->m_iu_subsribe->newRow($instanceid,$data);
            $return = $iu_subsribe;
            print json_encode($return);
    }
    function getRowTemp() {
        log_message('debug', 'iu_subsribe.getRow post : '.json_encode($this->input->post(NULL, FALSE)));
        $empId  =  $this->input->get_post('id', TRUE);
        if (isset($empId)) {
            $iu_subsribe = $this->m_iu_subsribe->getRowTemp($empId);
            $return = array(
                'success' => true,
                'data'    => $iu_subsribe
            );
            print json_encode($return);
        }
    }
    function getRowsTemp() {
            $group = $this->input->get('group', FALSE); 
           $sort = $this->input->get('sort', FALSE);
           if(!$sort && $group) $sort = $group;
           if(!$sort || $group == $sort) 
            {
            	$sort = json_decode($sort);
            	$sort[] = array('property'=>'subscriber_grid', 'direction'=>'ASC');
            	$sort = json_encode($sort);
            }
            $instanceid=$this->input->get('instanceid', FALSE);
            if(isset($instanceid)){
                if($instanceid!=''){
                    $iu_subsribe= $this->m_iu_subsribe->getRowsByInstanceTemp($instanceid,$sort);
                }else{
                    $iu_subsribe= $this->m_iu_subsribe->getRowsTemp($sort);
                }
            }else{
              $iu_subsribe= $this->m_iu_subsribe->getRowsTemp($sort);
            }
            $return = array(
                'success' =>  TRUE ,
                'data'    => $iu_subsribe
            );
        print json_encode($return);
    }
    function getRowsByInstanceTemp() {
        log_message('debug', 'iu_subsribe.getRowsByInstance post : '.json_encode($this->input->post(NULL, FALSE)));
            $group = $this->input->get('group', FALSE); 
           $sort = $this->input->get('sort', FALSE);
           if(!$sort && $group) $sort = $group;
           if(!$sort || $group == $sort) 
            {
            	$sort = json_decode($sort);
            	$sort[] = array('property'=>'subscriber', 'direction'=>'ASC');
            	$sort = json_encode($sort);
            }
        $InstId  =  $this->input->get_post('instanceid', TRUE);
        if (strlen($InstId) > 0) {
            $iu_subsribe= $this->m_iu_subsribe->getRowsByInstanceTemp($InstId,$sort);
            $return = array(
                'success' =>  TRUE ,
                'data'    => $iu_subsribe
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
    function getRowsByParentTemp() {
        log_message('debug', 'iu_subsribe.getRowsByParent post : '.json_encode($this->input->post(NULL, FALSE)));
            $group = $this->input->get('group', FALSE); 
           $sort = $this->input->get('sort', FALSE);
           if(!$sort && $group) $sort = $group;
           if(!$sort || $group == $sort) 
            {
            	$sort = json_decode($sort);
            	$sort[] = array('property'=>'subscriber', 'direction'=>'ASC');
            	$sort = json_encode($sort);
            }
        $ParentId  =  $this->input->get_post('parentid', TRUE);
        if (strlen($ParentId) > 0) {
            $iu_subsribe= $this->m_iu_subsribe->getRowsByParentTemp($ParentId,$sort);
            $return = array(
                'success' => TRUE,
                'data'    => $iu_subsribe
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
    function getRow() {
        log_message('debug', 'iu_subsribe.getRow post : '.json_encode($this->input->post(NULL, FALSE)));
        $empId  =  $this->input->get_post('id', TRUE);
        if (isset($empId)) {
            $iu_subsribe = $this->m_iu_subsribe->getRow($empId);
            $return = array(
                'success' => true,
                'data'    => $iu_subsribe
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
            	$sort[] = array('property'=>'subscriber', 'direction'=>'ASC');
            	$sort = json_encode($sort);
            }
            $instanceid=$this->input->get('instanceid', FALSE);
            if(isset($instanceid)){
                if($instanceid!=''){
                    $iu_subsribe= $this->m_iu_subsribe->getRowsByInstance($instanceid,$sort);
                }else{
                    $iu_subsribe= $this->m_iu_subsribe->getRows($sort);
                }
            }else{
              $iu_subsribe= $this->m_iu_subsribe->getRows($sort);
            }
            $return = array(
                'success' =>  TRUE ,
                'data'    => $iu_subsribe
            );
        print json_encode($return);
    }
    function getRowsByInstance() {
        log_message('debug', 'iu_subsribe.getRowsByInstance post : '.json_encode($this->input->post(NULL, FALSE)));
            $group = $this->input->get('group', FALSE); 
           $sort = $this->input->get('sort', FALSE);
           if(!$sort && $group) $sort = $group;
           if(!$sort || $group == $sort) 
            {
            	$sort = json_decode($sort);
            	$sort[] = array('property'=>'subscriber', 'direction'=>'ASC');
            	$sort = json_encode($sort);
            }
        $InstId  =  $this->input->get_post('instanceid', TRUE);
        if (strlen($InstId) > 0) {
            $iu_subsribe= $this->m_iu_subsribe->getRowsByInstance($InstId,$sort);
            $return = array(
                'success' =>  TRUE ,
                'data'    => $iu_subsribe
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
        log_message('debug', 'iu_subsribe.getRowsByParent post : '.json_encode($this->input->post(NULL, FALSE)));
            $group = $this->input->get('group', FALSE); 
           $sort = $this->input->get('sort', FALSE);
           if(!$sort && $group) $sort = $group;
           if(!$sort || $group == $sort) 
            {
            	$sort = json_decode($sort);
            	$sort[] = array('property'=>'subscriber', 'direction'=>'ASC');
            	$sort = json_encode($sort);
            }
        $ParentId  =  $this->input->get_post('parentid', TRUE);
        if (strlen($ParentId) > 0) {
            $iu_subsribe= $this->m_iu_subsribe->getRowsByParent($ParentId,$sort);
            $return = array(
                'success' => TRUE,
                'data'    => $iu_subsribe
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
        log_message('debug', 'iu_subsribe.deleteRow post : '.json_encode($this->input->post(NULL, FALSE)));
        $tempId  =  $this->input->get_post('iu_subsribeid', TRUE);
        if (strlen($tempId) > 0) {
            $return = $this->m_iu_subsribe->deleteRow($tempId);
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
        $this->load->model('M_iu_subsribe', 'm_iu_subsribe');
    }
}
?>
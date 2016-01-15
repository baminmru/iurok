<?php
	 class C_localizeinfo extends CI_Controller {
    function __construct() {
         parent::__construct();
        $this->_loadModels();
    }
    function setRow() {
          log_message('debug', 'LocalizeInfo.setRow post : '.json_encode($this->input->post(NULL, FALSE)));
          log_message('debug', 'LocalizeInfo.getRows get : '.json_encode($this->input->get(NULL, FALSE)));
          $data = array(
                'localizeinfoid' =>  $this->input->get_post('localizeinfoid', TRUE)
                ,'instanceid' =>  $this->input->get_post('instanceid', TRUE)
                ,'langfull' =>   $this->input->get_post('langfull', TRUE)
                ,'langshort' =>   $this->input->get_post('langshort', TRUE)
            );
            $localizeinfo = $this->m_localizeinfo->setRow($data);
            print json_encode($localizeinfo);
    }
    function newRow() {
            log_message('debug', 'LocalizeInfo.newRow post : '.json_encode($this->input->post(NULL, FALSE)));
          $data = array(
                'localizeinfoid' =>  $this->input->get_post('localizeinfoid', TRUE)
                ,'instanceid' =>  $this->input->get_post('instanceid', TRUE)
                ,'langfull' =>   $this->input->get_post('langfull', TRUE)
                ,'langshort' =>   $this->input->get_post('langshort', TRUE)
            );
                $instanceid =  $this->input->get_post('instanceid', TRUE);
            $localizeinfo= $this->m_localizeinfo->newRow($instanceid,$data);
            $return = $localizeinfo;
            print json_encode($return);
    }
    function getRow() {
        log_message('debug', 'LocalizeInfo.getRow post : '.json_encode($this->input->post(NULL, FALSE)));
        $empId  =  $this->input->get_post('id', TRUE);
        if (isset($empId)) {
            $localizeinfo = $this->m_localizeinfo->getRow($empId);
            $return = array(
                'success' => true,
                'data'    => $localizeinfo
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
            	$sort[] = array('property'=>'langfull', 'direction'=>'ASC');
            	$sort = json_encode($sort);
            }
            $instanceid=$this->input->get('instanceid', FALSE);
            if(isset($instanceid)){
                if($instanceid!=''){
                    $localizeinfo= $this->m_localizeinfo->getRowsByInstance($instanceid,$sort);
                }else{
                    $localizeinfo= $this->m_localizeinfo->getRows($sort);
                }
            }else{
              $localizeinfo= $this->m_localizeinfo->getRows($sort);
            }
            $return = array(
                'success' =>  TRUE ,
                'data'    => $localizeinfo
            );
        print json_encode($return);
    }
    function getRowsByInstance() {
        log_message('debug', 'LocalizeInfo.getRowsByInstance post : '.json_encode($this->input->post(NULL, FALSE)));
            $group = $this->input->get('group', FALSE); 
           $sort = $this->input->get('sort', FALSE);
           if(!$sort && $group) $sort = $group;
           if(!$sort || $group == $sort) 
            {
            	$sort = json_decode($sort);
            	$sort[] = array('property'=>'langfull', 'direction'=>'ASC');
            	$sort = json_encode($sort);
            }
        $InstId  =  $this->input->get_post('instanceid', TRUE);
        if (strlen($InstId) > 0) {
            $localizeinfo= $this->m_localizeinfo->getRowsByInstance($InstId,$sort);
            $return = array(
                'success' =>  TRUE ,
                'data'    => $localizeinfo
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
        log_message('debug', 'LocalizeInfo.getRowsByParent post : '.json_encode($this->input->post(NULL, FALSE)));
            $group = $this->input->get('group', FALSE); 
           $sort = $this->input->get('sort', FALSE);
           if(!$sort && $group) $sort = $group;
           if(!$sort || $group == $sort) 
            {
            	$sort = json_decode($sort);
            	$sort[] = array('property'=>'langfull', 'direction'=>'ASC');
            	$sort = json_encode($sort);
            }
        $ParentId  =  $this->input->get_post('parentid', TRUE);
        if (strlen($ParentId) > 0) {
            $localizeinfo= $this->m_localizeinfo->getRowsByParent($ParentId,$sort);
            $return = array(
                'success' => TRUE,
                'data'    => $localizeinfo
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
        log_message('debug', 'LocalizeInfo.deleteRow post : '.json_encode($this->input->post(NULL, FALSE)));
        $tempId  =  $this->input->get_post('localizeinfoid', TRUE);
        if (strlen($tempId) > 0) {
            $return = $this->m_localizeinfo->deleteRow($tempId);
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
        $this->load->model('M_localizeinfo', 'm_localizeinfo');
    }
}
?>
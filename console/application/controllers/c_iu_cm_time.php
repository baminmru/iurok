<?php
	 class C_iu_cm_time extends CI_Controller {
    function __construct() {
         parent::__construct();
        $this->_loadModels();
    }
    function setRow() {
          log_message('debug', 'iu_cm_time.setRow post : '.json_encode($this->input->post(NULL, FALSE)));
          log_message('debug', 'iu_cm_time.getRows get : '.json_encode($this->input->get(NULL, FALSE)));
          $data = array(
                'iu_cm_timeid' =>  $this->input->get_post('iu_cm_timeid', TRUE)
                ,'instanceid' =>  $this->input->get_post('instanceid', TRUE)
                ,'messagetype' =>   $this->input->get_post('messagetype', TRUE)
                ,'thedate' =>   $this->input->get_post('thedate', TRUE)
                ,'theauthor' =>   $this->input->get_post('theauthor', TRUE)
                ,'endtime' =>   $this->input->get_post('endtime', TRUE)
                ,'info' =>   $this->input->get_post('info', TRUE)
                ,'starttime' =>   $this->input->get_post('starttime', TRUE)
                ,'ischecked' =>   $this->input->get_post('ischecked', TRUE)
                ,'thefile' =>   $this->input->get_post('thefile', TRUE)
                ,'thefile_ext' =>   $this->input->get_post('thefile_ext', TRUE)
                ,'theref' =>   $this->input->get_post('theref', TRUE)
                ,'curatoronly' =>   $this->input->get_post('curatoronly', TRUE)
            );
            $iu_cm_time = $this->m_iu_cm_time->setRow($data);
            print json_encode($iu_cm_time);
    }
    function newRow() {
            log_message('debug', 'iu_cm_time.newRow post : '.json_encode($this->input->post(NULL, FALSE)));
          $data = array(
                'iu_cm_timeid' =>  $this->input->get_post('iu_cm_timeid', TRUE)
                ,'instanceid' =>  $this->input->get_post('instanceid', TRUE)
                ,'messagetype' =>   $this->input->get_post('messagetype', TRUE)
                ,'thedate' =>   $this->input->get_post('thedate', TRUE)
                ,'theauthor' =>   $this->input->get_post('theauthor', TRUE)
                ,'endtime' =>   $this->input->get_post('endtime', TRUE)
                ,'info' =>   $this->input->get_post('info', TRUE)
                ,'starttime' =>   $this->input->get_post('starttime', TRUE)
                ,'ischecked' =>   $this->input->get_post('ischecked', TRUE)
                ,'thefile' =>   $this->input->get_post('thefile', TRUE)
                ,'thefile_ext' =>   $this->input->get_post('thefile_ext', TRUE)
                ,'theref' =>   $this->input->get_post('theref', TRUE)
                ,'curatoronly' =>   $this->input->get_post('curatoronly', TRUE)
            );
                $instanceid =  $this->input->get_post('instanceid', TRUE);
            $iu_cm_time= $this->m_iu_cm_time->newRow($instanceid,$data);
            $return = $iu_cm_time;
            print json_encode($return);
    }
    function getRow() {
        log_message('debug', 'iu_cm_time.getRow post : '.json_encode($this->input->post(NULL, FALSE)));
        $empId  =  $this->input->get_post('id', TRUE);
        if (isset($empId)) {
            $iu_cm_time = $this->m_iu_cm_time->getRow($empId);
            $return = array(
                'success' => true,
                'data'    => $iu_cm_time
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
            	$sort[] = array('property'=>'thedate', 'direction'=>'ASC');
            	$sort = json_encode($sort);
            }
            $instanceid=$this->input->get('instanceid', FALSE);
			$curator=$this->input->get('curator', FALSE);
		
            if(isset($instanceid)){
                if($instanceid!=''){
                    $iu_cm_time= $this->m_iu_cm_time->getRowsByInstance($instanceid,$curator,$sort);
                }else{
                    $iu_cm_time= $this->m_iu_cm_time->getRows($sort);
                }
            }else{
              $iu_cm_time= $this->m_iu_cm_time->getRows($sort);
            }
            $return = array(
                'success' =>  TRUE ,
                'data'    => $iu_cm_time
            );
        print json_encode($return);
    }
    function getRowsByInstance() {
        log_message('debug', 'iu_cm_time.getRowsByInstance post : '.json_encode($this->input->post(NULL, FALSE)));
            $group = $this->input->get('group', FALSE); 
           $sort = $this->input->get('sort', FALSE);
           if(!$sort && $group) $sort = $group;
           if(!$sort || $group == $sort) 
            {
            	$sort = json_decode($sort);
            	$sort[] = array('property'=>'thedate', 'direction'=>'ASC');
            	$sort = json_encode($sort);
            }
        $InstId  =  $this->input->get_post('instanceid', TRUE);
        if (strlen($InstId) > 0) {
            $iu_cm_time= $this->m_iu_cm_time->getRowsByInstance($InstId,$sort);
            $return = array(
                'success' =>  TRUE ,
                'data'    => $iu_cm_time
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
        log_message('debug', 'iu_cm_time.getRowsByParent post : '.json_encode($this->input->post(NULL, FALSE)));
            $group = $this->input->get('group', FALSE); 
           $sort = $this->input->get('sort', FALSE);
           if(!$sort && $group) $sort = $group;
           if(!$sort || $group == $sort) 
            {
            	$sort = json_decode($sort);
            	$sort[] = array('property'=>'thedate', 'direction'=>'ASC');
            	$sort = json_encode($sort);
            }
        $ParentId  =  $this->input->get_post('parentid', TRUE);
        if (strlen($ParentId) > 0) {
            $iu_cm_time= $this->m_iu_cm_time->getRowsByParent($ParentId,$sort);
            $return = array(
                'success' => TRUE,
                'data'    => $iu_cm_time
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
        log_message('debug', 'iu_cm_time.deleteRow post : '.json_encode($this->input->post(NULL, FALSE)));
        $tempId  =  $this->input->get_post('iu_cm_timeid', TRUE);
        if (strlen($tempId) > 0) {
            $return = $this->m_iu_cm_time->deleteRow($tempId);
        }
        else {
            $return = array(
                'success' => FALSE,
                'msg'     => 'No  ID to delete'
            );
        }
        print json_encode($return);
    }
	
	 function hideRow() {
        log_message('debug', 'iu_cm_time.hideRow post : '.json_encode($this->input->post(NULL, FALSE)));
        $tempId  =  $this->input->get_post('iu_cm_timeid', TRUE);
        if (strlen($tempId) > 0) {
            $return = $this->m_iu_cm_time->hideRow($tempId);
        }
        else {
            $return = array(
                'success' => FALSE,
                'msg'     => 'No  ID to hide'
            );
        }
        print json_encode($return);
    }
	
	
    private function _loadModels () {
        $this->load->model('M_iu_cm_time', 'm_iu_cm_time');
    }
}
?>
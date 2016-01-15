<?php
	 class C_mtz2job_def extends CI_Controller {
    function __construct() {
         parent::__construct();
        $this->_loadModels();
    }
    function setRow() {
          log_message('debug', 'MTZ2JOB_DEF.setRow post : '.json_encode($this->input->post(NULL, FALSE)));
          log_message('debug', 'MTZ2JOB_DEF.getRows get : '.json_encode($this->input->get(NULL, FALSE)));
          $data = array(
                'mtz2job_defid' =>  $this->input->get_post('mtz2job_defid', TRUE)
                ,'instanceid' =>  $this->input->get_post('instanceid', TRUE)
                ,'eventdate' =>   $this->input->get_post('eventdate', TRUE)
                ,'eventype' =>   $this->input->get_post('eventype', TRUE)
                ,'thruobject' =>   $this->input->get_post('thruobject', TRUE)
                ,'thrustate' =>   $this->input->get_post('thrustate', TRUE)
                ,'nextstate' =>   $this->input->get_post('nextstate', TRUE)
                ,'processdate' =>   $this->input->get_post('processdate', TRUE)
                ,'processed' =>   $this->input->get_post('processed', TRUE)
            );
            $mtz2job_def = $this->m_mtz2job_def->setRow($data);
            print json_encode($mtz2job_def);
    }
    function newRow() {
            log_message('debug', 'MTZ2JOB_DEF.newRow post : '.json_encode($this->input->post(NULL, FALSE)));
          $data = array(
                'mtz2job_defid' =>  $this->input->get_post('mtz2job_defid', TRUE)
                ,'instanceid' =>  $this->input->get_post('instanceid', TRUE)
                ,'eventdate' =>   $this->input->get_post('eventdate', TRUE)
                ,'eventype' =>   $this->input->get_post('eventype', TRUE)
                ,'thruobject' =>   $this->input->get_post('thruobject', TRUE)
                ,'thrustate' =>   $this->input->get_post('thrustate', TRUE)
                ,'nextstate' =>   $this->input->get_post('nextstate', TRUE)
                ,'processdate' =>   $this->input->get_post('processdate', TRUE)
                ,'processed' =>   $this->input->get_post('processed', TRUE)
            );
                $instanceid =  $this->input->get_post('instanceid', TRUE);
            $mtz2job_def= $this->m_mtz2job_def->newRow($instanceid,$data);
            $return = $mtz2job_def;
            print json_encode($return);
    }
    function getRow() {
        log_message('debug', 'MTZ2JOB_DEF.getRow post : '.json_encode($this->input->post(NULL, FALSE)));
        $empId  =  $this->input->get_post('id', TRUE);
        if (isset($empId)) {
            $mtz2job_def = $this->m_mtz2job_def->getRow($empId);
            $return = array(
                'success' => true,
                'data'    => $mtz2job_def
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
            	$sort[] = array('property'=>'eventdate', 'direction'=>'ASC');
            	$sort = json_encode($sort);
            }
            $instanceid=$this->input->get('instanceid', FALSE);
            if(isset($instanceid)){
                if($instanceid!=''){
                    $mtz2job_def= $this->m_mtz2job_def->getRowsByInstance($instanceid,$sort);
                }else{
                    $mtz2job_def= $this->m_mtz2job_def->getRows($sort);
                }
            }else{
              $mtz2job_def= $this->m_mtz2job_def->getRows($sort);
            }
            $return = array(
                'success' =>  TRUE ,
                'data'    => $mtz2job_def
            );
        print json_encode($return);
    }
    function getRowsByInstance() {
        log_message('debug', 'MTZ2JOB_DEF.getRowsByInstance post : '.json_encode($this->input->post(NULL, FALSE)));
            $group = $this->input->get('group', FALSE); 
           $sort = $this->input->get('sort', FALSE);
           if(!$sort && $group) $sort = $group;
           if(!$sort || $group == $sort) 
            {
            	$sort = json_decode($sort);
            	$sort[] = array('property'=>'eventdate', 'direction'=>'ASC');
            	$sort = json_encode($sort);
            }
        $InstId  =  $this->input->get_post('instanceid', TRUE);
        if (strlen($InstId) > 0) {
            $mtz2job_def= $this->m_mtz2job_def->getRowsByInstance($InstId,$sort);
            $return = array(
                'success' =>  TRUE ,
                'data'    => $mtz2job_def
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
        log_message('debug', 'MTZ2JOB_DEF.getRowsByParent post : '.json_encode($this->input->post(NULL, FALSE)));
            $group = $this->input->get('group', FALSE); 
           $sort = $this->input->get('sort', FALSE);
           if(!$sort && $group) $sort = $group;
           if(!$sort || $group == $sort) 
            {
            	$sort = json_decode($sort);
            	$sort[] = array('property'=>'eventdate', 'direction'=>'ASC');
            	$sort = json_encode($sort);
            }
        $ParentId  =  $this->input->get_post('parentid', TRUE);
        if (strlen($ParentId) > 0) {
            $mtz2job_def= $this->m_mtz2job_def->getRowsByParent($ParentId,$sort);
            $return = array(
                'success' => TRUE,
                'data'    => $mtz2job_def
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
        log_message('debug', 'MTZ2JOB_DEF.deleteRow post : '.json_encode($this->input->post(NULL, FALSE)));
        $tempId  =  $this->input->get_post('mtz2job_defid', TRUE);
        if (strlen($tempId) > 0) {
            $return = $this->m_mtz2job_def->deleteRow($tempId);
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
        $this->load->model('M_mtz2job_def', 'm_mtz2job_def');
    }
}
?>
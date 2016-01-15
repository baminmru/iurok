<?php
	 class C_iu_urok_discuss extends CI_Controller {
    function __construct() {
         parent::__construct();
        $this->_loadModels();
    }
    function setRow() {
          log_message('debug', 'iu_urok_discuss.setRow post : '.json_encode($this->input->post(NULL, FALSE)));
          log_message('debug', 'iu_urok_discuss.getRows get : '.json_encode($this->input->get(NULL, FALSE)));
          $data = array(
                'iu_urok_discussid' =>  $this->input->get_post('iu_urok_discussid', TRUE)
                ,'instanceid' =>  $this->input->get_post('instanceid', TRUE)
                ,'thetheme' =>   $this->input->get_post('thetheme', TRUE)
                ,'thedate' =>   $this->input->get_post('thedate', TRUE)
                ,'theauthor' =>   $this->input->get_post('theauthor', TRUE)
            );
            $iu_urok_discuss = $this->m_iu_urok_discuss->setRow($data);
            print json_encode($iu_urok_discuss);
    }
    function newRow() {
            log_message('debug', 'iu_urok_discuss.newRow post : '.json_encode($this->input->post(NULL, FALSE)));
          $data = array(
                'iu_urok_discussid' =>  $this->input->get_post('iu_urok_discussid', TRUE)
                ,'instanceid' =>  $this->input->get_post('instanceid', TRUE)
                ,'thetheme' =>   $this->input->get_post('thetheme', TRUE)
                ,'thedate' =>   $this->input->get_post('thedate', TRUE)
                ,'theauthor' =>   $this->input->get_post('theauthor', TRUE)
            );
                $instanceid =  $this->input->get_post('instanceid', TRUE);
            $iu_urok_discuss= $this->m_iu_urok_discuss->newRow($instanceid,$data);
            $return = $iu_urok_discuss;
            print json_encode($return);
    }
    function getRow() {
        log_message('debug', 'iu_urok_discuss.getRow post : '.json_encode($this->input->post(NULL, FALSE)));
        $empId  =  $this->input->get_post('id', TRUE);
        if (isset($empId)) {
            $iu_urok_discuss = $this->m_iu_urok_discuss->getRow($empId);
            $return = array(
                'success' => true,
                'data'    => $iu_urok_discuss
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
            	$sort[] = array('property'=>'thetheme', 'direction'=>'ASC');
            	$sort = json_encode($sort);
            }
            $instanceid=$this->input->get('instanceid', FALSE);
            if(isset($instanceid)){
                if($instanceid!=''){
                    $iu_urok_discuss= $this->m_iu_urok_discuss->getRowsByInstance($instanceid,$sort);
                }else{
                    $iu_urok_discuss= $this->m_iu_urok_discuss->getRows($sort);
                }
            }else{
              $iu_urok_discuss= $this->m_iu_urok_discuss->getRows($sort);
            }
            $return = array(
                'success' =>  TRUE ,
                'data'    => $iu_urok_discuss
            );
        print json_encode($return);
    }
    function getRowsByInstance() {
        log_message('debug', 'iu_urok_discuss.getRowsByInstance post : '.json_encode($this->input->post(NULL, FALSE)));
            $group = $this->input->get('group', FALSE); 
           $sort = $this->input->get('sort', FALSE);
           if(!$sort && $group) $sort = $group;
           if(!$sort || $group == $sort) 
            {
            	$sort = json_decode($sort);
            	$sort[] = array('property'=>'thetheme', 'direction'=>'ASC');
            	$sort = json_encode($sort);
            }
        $InstId  =  $this->input->get_post('instanceid', TRUE);
        if (strlen($InstId) > 0) {
            $iu_urok_discuss= $this->m_iu_urok_discuss->getRowsByInstance($InstId,$sort);
            $return = array(
                'success' =>  TRUE ,
                'data'    => $iu_urok_discuss
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
        log_message('debug', 'iu_urok_discuss.getRowsByParent post : '.json_encode($this->input->post(NULL, FALSE)));
            $group = $this->input->get('group', FALSE); 
           $sort = $this->input->get('sort', FALSE);
           if(!$sort && $group) $sort = $group;
           if(!$sort || $group == $sort) 
            {
            	$sort = json_decode($sort);
            	$sort[] = array('property'=>'thetheme', 'direction'=>'ASC');
            	$sort = json_encode($sort);
            }
        $ParentId  =  $this->input->get_post('parentid', TRUE);
        if (strlen($ParentId) > 0) {
            $iu_urok_discuss= $this->m_iu_urok_discuss->getRowsByParent($ParentId,$sort);
            $return = array(
                'success' => TRUE,
                'data'    => $iu_urok_discuss
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
        log_message('debug', 'iu_urok_discuss.deleteRow post : '.json_encode($this->input->post(NULL, FALSE)));
        $tempId  =  $this->input->get_post('iu_urok_discussid', TRUE);
        if (strlen($tempId) > 0) {
            $return = $this->m_iu_urok_discuss->deleteRow($tempId);
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
        $this->load->model('M_iu_urok_discuss', 'm_iu_urok_discuss');
    }
}
?>
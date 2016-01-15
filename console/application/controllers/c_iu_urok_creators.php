<?php
	 class C_iu_urok_creators extends CI_Controller {
    function __construct() {
         parent::__construct();
        $this->_loadModels();
    }
    function setRow() {
          log_message('debug', 'iu_urok_creators.setRow post : '.json_encode($this->input->post(NULL, FALSE)));
          log_message('debug', 'iu_urok_creators.getRows get : '.json_encode($this->input->get(NULL, FALSE)));
          $data = array(
                'iu_urok_creatorsid' =>  $this->input->get_post('iu_urok_creatorsid', TRUE)
                ,'instanceid' =>  $this->input->get_post('instanceid', TRUE)
                ,'processrole' =>   $this->input->get_post('processrole', TRUE)
                ,'doer' =>   $this->input->get_post('doer', TRUE)
                ,'doers' =>   $this->input->get_post('doers', TRUE)
                ,'selectby' =>   $this->input->get_post('selectby', TRUE)
                ,'selectday' =>   $this->input->get_post('selectday', TRUE)
            );
            $iu_urok_creators = $this->m_iu_urok_creators->setRow($data);
            print json_encode($iu_urok_creators);
    }
    function newRow() {
            log_message('debug', 'iu_urok_creators.newRow post : '.json_encode($this->input->post(NULL, FALSE)));
          $data = array(
                'iu_urok_creatorsid' =>  $this->input->get_post('iu_urok_creatorsid', TRUE)
                ,'instanceid' =>  $this->input->get_post('instanceid', TRUE)
                ,'processrole' =>   $this->input->get_post('processrole', TRUE)
                ,'doer' =>   $this->input->get_post('doer', TRUE)
                ,'doers' =>   $this->input->get_post('doers', TRUE)
                ,'selectby' =>   $this->input->get_post('selectby', TRUE)
                ,'selectday' =>   $this->input->get_post('selectday', TRUE)
            );
                $instanceid =  $this->input->get_post('instanceid', TRUE);
            $iu_urok_creators= $this->m_iu_urok_creators->newRow($instanceid,$data);
            $return = $iu_urok_creators;
            print json_encode($return);
    }
    function getRow() {
        log_message('debug', 'iu_urok_creators.getRow post : '.json_encode($this->input->post(NULL, FALSE)));
        $empId  =  $this->input->get_post('id', TRUE);
        if (isset($empId)) {
            $iu_urok_creators = $this->m_iu_urok_creators->getRow($empId);
            $return = array(
                'success' => true,
                'data'    => $iu_urok_creators
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
            	$sort[] = array('property'=>'processrole', 'direction'=>'ASC');
            	$sort = json_encode($sort);
            }
            $instanceid=$this->input->get('instanceid', FALSE);
            if(isset($instanceid)){
                if($instanceid!=''){
                    $iu_urok_creators= $this->m_iu_urok_creators->getRowsByInstance($instanceid,$sort);
                }else{
                    $iu_urok_creators= $this->m_iu_urok_creators->getRows($sort);
                }
            }else{
              $iu_urok_creators= $this->m_iu_urok_creators->getRows($sort);
            }
            $return = array(
                'success' =>  TRUE ,
                'data'    => $iu_urok_creators
            );
        print json_encode($return);
    }
    function getRowsByInstance() {
        log_message('debug', 'iu_urok_creators.getRowsByInstance post : '.json_encode($this->input->post(NULL, FALSE)));
            $group = $this->input->get('group', FALSE); 
           $sort = $this->input->get('sort', FALSE);
           if(!$sort && $group) $sort = $group;
           if(!$sort || $group == $sort) 
            {
            	$sort = json_decode($sort);
            	$sort[] = array('property'=>'processrole', 'direction'=>'ASC');
            	$sort = json_encode($sort);
            }
        $InstId  =  $this->input->get_post('instanceid', TRUE);
        if (strlen($InstId) > 0) {
            $iu_urok_creators= $this->m_iu_urok_creators->getRowsByInstance($InstId,$sort);
            $return = array(
                'success' =>  TRUE ,
                'data'    => $iu_urok_creators
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
        log_message('debug', 'iu_urok_creators.getRowsByParent post : '.json_encode($this->input->post(NULL, FALSE)));
            $group = $this->input->get('group', FALSE); 
           $sort = $this->input->get('sort', FALSE);
           if(!$sort && $group) $sort = $group;
           if(!$sort || $group == $sort) 
            {
            	$sort = json_decode($sort);
            	$sort[] = array('property'=>'processrole', 'direction'=>'ASC');
            	$sort = json_encode($sort);
            }
        $ParentId  =  $this->input->get_post('parentid', TRUE);
        if (strlen($ParentId) > 0) {
            $iu_urok_creators= $this->m_iu_urok_creators->getRowsByParent($ParentId,$sort);
            $return = array(
                'success' => TRUE,
                'data'    => $iu_urok_creators
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
        log_message('debug', 'iu_urok_creators.deleteRow post : '.json_encode($this->input->post(NULL, FALSE)));
        $tempId  =  $this->input->get_post('iu_urok_creatorsid', TRUE);
        if (strlen($tempId) > 0) {
            $return = $this->m_iu_urok_creators->deleteRow($tempId);
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
        $this->load->model('M_iu_urok_creators', 'm_iu_urok_creators');
    }
}
?>
<?php
	 class C_iu_orgusr extends CI_Controller {
    function __construct() {
         parent::__construct();
        $this->_loadModels();
    }
    function setRow() {
          log_message('debug', 'iu_orgusr.setRow post : '.json_encode($this->input->post(NULL, FALSE)));
          log_message('debug', 'iu_orgusr.getRows get : '.json_encode($this->input->get(NULL, FALSE)));
          $data = array(
                'iu_orgusrid' =>  $this->input->get_post('iu_orgusrid', TRUE)
                ,'instanceid' =>  $this->input->get_post('instanceid', TRUE)
                ,'parentid' =>  $this->input->get_post('parentid', TRUE)
                ,'orguser' =>   $this->input->get_post('orguser', TRUE)
                ,'ismanager' =>   $this->input->get_post('ismanager', TRUE)
            );
            $iu_orgusr = $this->m_iu_orgusr->setRow($data);
            print json_encode($iu_orgusr);
    }
    function newRow() {
            log_message('debug', 'iu_orgusr.newRow post : '.json_encode($this->input->post(NULL, FALSE)));
          $data = array(
                'iu_orgusrid' =>  $this->input->get_post('iu_orgusrid', TRUE)
                ,'instanceid' =>  $this->input->get_post('instanceid', TRUE)
                ,'parentid' =>  $this->input->get_post('parentid', TRUE)
                ,'orguser' =>   $this->input->get_post('orguser', TRUE)
                ,'ismanager' =>   $this->input->get_post('ismanager', TRUE)
            );
                $instanceid =  $this->input->get_post('instanceid', TRUE);
                $parentid =  $this->input->get_post('parentid', TRUE);
            $iu_orgusr= $this->m_iu_orgusr->newRow($instanceid,$parentid,$data);
            $return = $iu_orgusr;
            print json_encode($return);
    }
    function getRow() {
        log_message('debug', 'iu_orgusr.getRow post : '.json_encode($this->input->post(NULL, FALSE)));
        $empId  =  $this->input->get_post('id', TRUE);
        if (isset($empId)) {
            $iu_orgusr = $this->m_iu_orgusr->getRow($empId);
            $return = array(
                'success' => true,
                'data'    => $iu_orgusr
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
            	$sort[] = array('property'=>'orguser', 'direction'=>'ASC');
            	$sort = json_encode($sort);
            }
            $parentid=$this->input->get('parentid', FALSE);
            if(isset($parentid)){
                if($parentid!=''){
                    $iu_orgusr= $this->m_iu_orgusr->getRowsByParent($parentid,$sort);
                }else{
                    $iu_orgusr= $this->m_iu_orgusr->getRows($sort);
                }
            }else{
              $iu_orgusr= $this->m_iu_orgusr->getRows($sort);
            }
            $return = array(
                'success' =>  TRUE ,
                'data'    => $iu_orgusr
            );
        print json_encode($return);
    }
    function getRowsByInstance() {
        log_message('debug', 'iu_orgusr.getRowsByInstance post : '.json_encode($this->input->post(NULL, FALSE)));
            $group = $this->input->get('group', FALSE); 
           $sort = $this->input->get('sort', FALSE);
           if(!$sort && $group) $sort = $group;
           if(!$sort || $group == $sort) 
            {
            	$sort = json_decode($sort);
            	$sort[] = array('property'=>'orguser', 'direction'=>'ASC');
            	$sort = json_encode($sort);
            }
        $InstId  =  $this->input->get_post('instanceid', TRUE);
        if (strlen($InstId) > 0) {
            $iu_orgusr= $this->m_iu_orgusr->getRowsByInstance($InstId,$sort);
            $return = array(
                'success' =>  TRUE ,
                'data'    => $iu_orgusr
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
        log_message('debug', 'iu_orgusr.getRowsByParent post : '.json_encode($this->input->post(NULL, FALSE)));
            $group = $this->input->get('group', FALSE); 
           $sort = $this->input->get('sort', FALSE);
           if(!$sort && $group) $sort = $group;
           if(!$sort || $group == $sort) 
            {
            	$sort = json_decode($sort);
            	$sort[] = array('property'=>'orguser', 'direction'=>'ASC');
            	$sort = json_encode($sort);
            }
        $ParentId  =  $this->input->get_post('parentid', TRUE);
        if (strlen($ParentId) > 0) {
            $iu_orgusr= $this->m_iu_orgusr->getRowsByParent($ParentId,$sort);
            $return = array(
                'success' => TRUE,
                'data'    => $iu_orgusr
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
        log_message('debug', 'iu_orgusr.deleteRow post : '.json_encode($this->input->post(NULL, FALSE)));
        $tempId  =  $this->input->get_post('iu_orgusrid', TRUE);
        if (strlen($tempId) > 0) {
            $return = $this->m_iu_orgusr->deleteRow($tempId);
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
        $this->load->model('M_iu_orgusr', 'm_iu_orgusr');
    }
}
?>
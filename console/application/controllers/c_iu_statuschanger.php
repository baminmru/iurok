<?php
	 class C_iu_statuschanger extends CI_Controller {
    function __construct() {
         parent::__construct();
        $this->_loadModels();
    }
    function setRow() {
          log_message('debug', 'iu_statuschanger.setRow post : '.json_encode($this->input->post(NULL, FALSE)));
          log_message('debug', 'iu_statuschanger.getRows get : '.json_encode($this->input->get(NULL, FALSE)));
          $data = array(
                'iu_statuschangerid' =>  $this->input->get_post('iu_statuschangerid', TRUE)
                ,'instanceid' =>  $this->input->get_post('instanceid', TRUE)
                ,'parentid' =>  $this->input->get_post('parentid', TRUE)
                ,'whocan' =>   $this->input->get_post('whocan', TRUE)
                ,'checkdocuments' =>   $this->input->get_post('checkdocuments', TRUE)
            );
            $iu_statuschanger = $this->m_iu_statuschanger->setRow($data);
            print json_encode($iu_statuschanger);
    }
    function newRow() {
            log_message('debug', 'iu_statuschanger.newRow post : '.json_encode($this->input->post(NULL, FALSE)));
          $data = array(
                'iu_statuschangerid' =>  $this->input->get_post('iu_statuschangerid', TRUE)
                ,'instanceid' =>  $this->input->get_post('instanceid', TRUE)
                ,'parentid' =>  $this->input->get_post('parentid', TRUE)
                ,'whocan' =>   $this->input->get_post('whocan', TRUE)
                ,'checkdocuments' =>   $this->input->get_post('checkdocuments', TRUE)
            );
                $instanceid =  $this->input->get_post('instanceid', TRUE);
                $parentid =  $this->input->get_post('parentid', TRUE);
            $iu_statuschanger= $this->m_iu_statuschanger->newRow($instanceid,$parentid,$data);
            $return = $iu_statuschanger;
            print json_encode($return);
    }
    function getRow() {
        log_message('debug', 'iu_statuschanger.getRow post : '.json_encode($this->input->post(NULL, FALSE)));
        $empId  =  $this->input->get_post('id', TRUE);
        if (isset($empId)) {
            $iu_statuschanger = $this->m_iu_statuschanger->getRow($empId);
            $return = array(
                'success' => true,
                'data'    => $iu_statuschanger
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
            	$sort[] = array('property'=>'whocan', 'direction'=>'ASC');
            	$sort = json_encode($sort);
            }
            $parentid=$this->input->get('parentid', FALSE);
            if(isset($parentid)){
                if($parentid!=''){
                    $iu_statuschanger= $this->m_iu_statuschanger->getRowsByParent($parentid,$sort);
                }else{
                    $iu_statuschanger= $this->m_iu_statuschanger->getRows($sort);
                }
            }else{
              $iu_statuschanger= $this->m_iu_statuschanger->getRows($sort);
            }
            $return = array(
                'success' =>  TRUE ,
                'data'    => $iu_statuschanger
            );
        print json_encode($return);
    }
    function getRowsByInstance() {
        log_message('debug', 'iu_statuschanger.getRowsByInstance post : '.json_encode($this->input->post(NULL, FALSE)));
            $group = $this->input->get('group', FALSE); 
           $sort = $this->input->get('sort', FALSE);
           if(!$sort && $group) $sort = $group;
           if(!$sort || $group == $sort) 
            {
            	$sort = json_decode($sort);
            	$sort[] = array('property'=>'whocan', 'direction'=>'ASC');
            	$sort = json_encode($sort);
            }
        $InstId  =  $this->input->get_post('instanceid', TRUE);
        if (strlen($InstId) > 0) {
            $iu_statuschanger= $this->m_iu_statuschanger->getRowsByInstance($InstId,$sort);
            $return = array(
                'success' =>  TRUE ,
                'data'    => $iu_statuschanger
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
        log_message('debug', 'iu_statuschanger.getRowsByParent post : '.json_encode($this->input->post(NULL, FALSE)));
            $group = $this->input->get('group', FALSE); 
           $sort = $this->input->get('sort', FALSE);
           if(!$sort && $group) $sort = $group;
           if(!$sort || $group == $sort) 
            {
            	$sort = json_decode($sort);
            	$sort[] = array('property'=>'whocan', 'direction'=>'ASC');
            	$sort = json_encode($sort);
            }
        $ParentId  =  $this->input->get_post('parentid', TRUE);
        if (strlen($ParentId) > 0) {
            $iu_statuschanger= $this->m_iu_statuschanger->getRowsByParent($ParentId,$sort);
            $return = array(
                'success' => TRUE,
                'data'    => $iu_statuschanger
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
        log_message('debug', 'iu_statuschanger.deleteRow post : '.json_encode($this->input->post(NULL, FALSE)));
        $tempId  =  $this->input->get_post('iu_statuschangerid', TRUE);
        if (strlen($tempId) > 0) {
            $return = $this->m_iu_statuschanger->deleteRow($tempId);
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
        $this->load->model('M_iu_statuschanger', 'm_iu_statuschanger');
    }
}
?>
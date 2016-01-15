<?php
	 class C_iu_tmcadr extends CI_Controller {
    function __construct() {
         parent::__construct();
        $this->_loadModels();
    }
    function setRow() {
          log_message('debug', 'iu_tmcadr.setRow post : '.json_encode($this->input->post(NULL, FALSE)));
          log_message('debug', 'iu_tmcadr.getRows get : '.json_encode($this->input->get(NULL, FALSE)));
          $data = array(
                'iu_tmcadrid' =>  $this->input->get_post('iu_tmcadrid', TRUE)
                ,'instanceid' =>  $this->input->get_post('instanceid', TRUE)
                ,'photo' =>   $this->input->get_post('photo', TRUE)
                ,'photo_ext' =>   $this->input->get_post('photo_ext', TRUE)
                ,'info' =>   $this->input->get_post('info', TRUE)
                ,'mastercadr' =>   $this->input->get_post('mastercadr', TRUE)
            );
            $iu_tmcadr = $this->m_iu_tmcadr->setRow($data);
            print json_encode($iu_tmcadr);
    }
    function newRow() {
            log_message('debug', 'iu_tmcadr.newRow post : '.json_encode($this->input->post(NULL, FALSE)));
          $data = array(
                'iu_tmcadrid' =>  $this->input->get_post('iu_tmcadrid', TRUE)
                ,'instanceid' =>  $this->input->get_post('instanceid', TRUE)
                ,'photo' =>   $this->input->get_post('photo', TRUE)
                ,'photo_ext' =>   $this->input->get_post('photo_ext', TRUE)
                ,'info' =>   $this->input->get_post('info', TRUE)
                ,'mastercadr' =>   $this->input->get_post('mastercadr', TRUE)
            );
                $instanceid =  $this->input->get_post('instanceid', TRUE);
            $iu_tmcadr= $this->m_iu_tmcadr->newRow($instanceid,$data);
            $return = $iu_tmcadr;
            print json_encode($return);
    }
    function getRow() {
        log_message('debug', 'iu_tmcadr.getRow post : '.json_encode($this->input->post(NULL, FALSE)));
        $empId  =  $this->input->get_post('id', TRUE);
        if (isset($empId)) {
            $iu_tmcadr = $this->m_iu_tmcadr->getRow($empId);
            $return = array(
                'success' => true,
                'data'    => $iu_tmcadr
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
            	$sort[] = array('property'=>'info', 'direction'=>'ASC');
            	$sort = json_encode($sort);
            }
            $instanceid=$this->input->get('instanceid', FALSE);
            if(isset($instanceid)){
                if($instanceid!=''){
                    $iu_tmcadr= $this->m_iu_tmcadr->getRowsByInstance($instanceid,$sort);
                }else{
                    $iu_tmcadr= $this->m_iu_tmcadr->getRows($sort);
                }
            }else{
              $iu_tmcadr= $this->m_iu_tmcadr->getRows($sort);
            }
            $return = array(
                'success' =>  TRUE ,
                'data'    => $iu_tmcadr
            );
        print json_encode($return);
    }
    function getRowsByInstance() {
        log_message('debug', 'iu_tmcadr.getRowsByInstance post : '.json_encode($this->input->post(NULL, FALSE)));
            $group = $this->input->get('group', FALSE); 
           $sort = $this->input->get('sort', FALSE);
           if(!$sort && $group) $sort = $group;
           if(!$sort || $group == $sort) 
            {
            	$sort = json_decode($sort);
            	$sort[] = array('property'=>'info', 'direction'=>'ASC');
            	$sort = json_encode($sort);
            }
        $InstId  =  $this->input->get_post('instanceid', TRUE);
        if (strlen($InstId) > 0) {
            $iu_tmcadr= $this->m_iu_tmcadr->getRowsByInstance($InstId,$sort);
            $return = array(
                'success' =>  TRUE ,
                'data'    => $iu_tmcadr
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
        log_message('debug', 'iu_tmcadr.getRowsByParent post : '.json_encode($this->input->post(NULL, FALSE)));
            $group = $this->input->get('group', FALSE); 
           $sort = $this->input->get('sort', FALSE);
           if(!$sort && $group) $sort = $group;
           if(!$sort || $group == $sort) 
            {
            	$sort = json_decode($sort);
            	$sort[] = array('property'=>'info', 'direction'=>'ASC');
            	$sort = json_encode($sort);
            }
        $ParentId  =  $this->input->get_post('parentid', TRUE);
        if (strlen($ParentId) > 0) {
            $iu_tmcadr= $this->m_iu_tmcadr->getRowsByParent($ParentId,$sort);
            $return = array(
                'success' => TRUE,
                'data'    => $iu_tmcadr
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
        log_message('debug', 'iu_tmcadr.deleteRow post : '.json_encode($this->input->post(NULL, FALSE)));
        $tempId  =  $this->input->get_post('iu_tmcadrid', TRUE);
        if (strlen($tempId) > 0) {
            $return = $this->m_iu_tmcadr->deleteRow($tempId);
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
        $this->load->model('M_iu_tmcadr', 'm_iu_tmcadr');
    }
}
?>
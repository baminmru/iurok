<?php
	 class C_iu_statusnext extends CI_Controller {
    function __construct() {
         parent::__construct();
        $this->_loadModels();
    }
    function setRow() {
          log_message('debug', 'iu_statusnext.setRow post : '.json_encode($this->input->post(NULL, FALSE)));
          log_message('debug', 'iu_statusnext.getRows get : '.json_encode($this->input->get(NULL, FALSE)));
          $data = array(
                'iu_statusnextid' =>  $this->input->get_post('iu_statusnextid', TRUE)
                ,'instanceid' =>  $this->input->get_post('instanceid', TRUE)
                ,'nextstatus' =>   $this->input->get_post('nextstatus', TRUE)
                ,'statusafter' =>   $this->input->get_post('statusafter', TRUE)
            );
            $iu_statusnext = $this->m_iu_statusnext->setRow($data);
            print json_encode($iu_statusnext);
    }
    function newRow() {
            log_message('debug', 'iu_statusnext.newRow post : '.json_encode($this->input->post(NULL, FALSE)));
          $data = array(
                'iu_statusnextid' =>  $this->input->get_post('iu_statusnextid', TRUE)
                ,'instanceid' =>  $this->input->get_post('instanceid', TRUE)
                ,'nextstatus' =>   $this->input->get_post('nextstatus', TRUE)
                ,'statusafter' =>   $this->input->get_post('statusafter', TRUE)
            );
                $instanceid =  $this->input->get_post('instanceid', TRUE);
            $iu_statusnext= $this->m_iu_statusnext->newRow($instanceid,$data);
            $return = $iu_statusnext;
            print json_encode($return);
    }
    function getRow() {
        log_message('debug', 'iu_statusnext.getRow post : '.json_encode($this->input->post(NULL, FALSE)));
        $empId  =  $this->input->get_post('id', TRUE);
        if (isset($empId)) {
            $iu_statusnext = $this->m_iu_statusnext->getRow($empId);
            $return = array(
                'success' => true,
                'data'    => $iu_statusnext
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
            	$sort[] = array('property'=>'nextstatus', 'direction'=>'ASC');
            	$sort = json_encode($sort);
            }
            $instanceid=$this->input->get('instanceid', FALSE);
            if(isset($instanceid)){
                if($instanceid!=''){
                    $iu_statusnext= $this->m_iu_statusnext->getRowsByInstance($instanceid,$sort);
                }else{
                    $iu_statusnext= $this->m_iu_statusnext->getRows($sort);
                }
            }else{
              $iu_statusnext= $this->m_iu_statusnext->getRows($sort);
            }
            $return = array(
                'success' =>  TRUE ,
                'data'    => $iu_statusnext
            );
        print json_encode($return);
    }
    function getRowsByInstance() {
        log_message('debug', 'iu_statusnext.getRowsByInstance post : '.json_encode($this->input->post(NULL, FALSE)));
            $group = $this->input->get('group', FALSE); 
           $sort = $this->input->get('sort', FALSE);
           if(!$sort && $group) $sort = $group;
           if(!$sort || $group == $sort) 
            {
            	$sort = json_decode($sort);
            	$sort[] = array('property'=>'nextstatus', 'direction'=>'ASC');
            	$sort = json_encode($sort);
            }
        $InstId  =  $this->input->get_post('instanceid', TRUE);
        if (strlen($InstId) > 0) {
            $iu_statusnext= $this->m_iu_statusnext->getRowsByInstance($InstId,$sort);
            $return = array(
                'success' =>  TRUE ,
                'data'    => $iu_statusnext
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
        log_message('debug', 'iu_statusnext.getRowsByParent post : '.json_encode($this->input->post(NULL, FALSE)));
            $group = $this->input->get('group', FALSE); 
           $sort = $this->input->get('sort', FALSE);
           if(!$sort && $group) $sort = $group;
           if(!$sort || $group == $sort) 
            {
            	$sort = json_decode($sort);
            	$sort[] = array('property'=>'nextstatus', 'direction'=>'ASC');
            	$sort = json_encode($sort);
            }
        $ParentId  =  $this->input->get_post('parentid', TRUE);
        if (strlen($ParentId) > 0) {
            $iu_statusnext= $this->m_iu_statusnext->getRowsByParent($ParentId,$sort);
            $return = array(
                'success' => TRUE,
                'data'    => $iu_statusnext
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
        log_message('debug', 'iu_statusnext.deleteRow post : '.json_encode($this->input->post(NULL, FALSE)));
        $tempId  =  $this->input->get_post('iu_statusnextid', TRUE);
        if (strlen($tempId) > 0) {
            $return = $this->m_iu_statusnext->deleteRow($tempId);
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
        $this->load->model('M_iu_statusnext', 'm_iu_statusnext');
    }
}
?>
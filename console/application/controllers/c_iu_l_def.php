<?php
	 class C_iu_l_def extends CI_Controller {
    function __construct() {
         parent::__construct();
        $this->_loadModels();
    }
    function setRow() {
          log_message('debug', 'iu_l_def.setRow post : '.json_encode($this->input->post(NULL, FALSE)));
          log_message('debug', 'iu_l_def.getRows get : '.json_encode($this->input->get(NULL, FALSE)));
          $data = array(
                'iu_l_defid' =>  $this->input->get_post('iu_l_defid', TRUE)
                ,'instanceid' =>  $this->input->get_post('instanceid', TRUE)
                ,'sender' =>   $this->input->get_post('sender', TRUE)
                ,'doer' =>   $this->input->get_post('doer', TRUE)
                ,'info' =>   $this->input->get_post('info', TRUE)
                ,'createdate' =>   $this->input->get_post('createdate', TRUE)
                ,'readdate' =>   $this->input->get_post('readdate', TRUE)
            );
            $iu_l_def = $this->m_iu_l_def->setRow($data);
            print json_encode($iu_l_def);
    }
    function newRow() {
            log_message('debug', 'iu_l_def.newRow post : '.json_encode($this->input->post(NULL, FALSE)));
          $data = array(
                'iu_l_defid' =>  $this->input->get_post('iu_l_defid', TRUE)
                ,'instanceid' =>  $this->input->get_post('instanceid', TRUE)
                ,'sender' =>   $this->input->get_post('sender', TRUE)
                ,'doer' =>   $this->input->get_post('doer', TRUE)
                ,'info' =>   $this->input->get_post('info', TRUE)
                ,'createdate' =>   $this->input->get_post('createdate', TRUE)
                ,'readdate' =>   $this->input->get_post('readdate', TRUE)
            );
                $instanceid =  $this->input->get_post('instanceid', TRUE);
            $iu_l_def= $this->m_iu_l_def->newRow($instanceid,$data);
            $return = $iu_l_def;
            print json_encode($return);
    }
    function getRow() {
        log_message('debug', 'iu_l_def.getRow post : '.json_encode($this->input->post(NULL, FALSE)));
        $empId  =  $this->input->get_post('id', TRUE);
        if (isset($empId)) {
            $iu_l_def = $this->m_iu_l_def->getRow($empId);
            $return = array(
                'success' => true,
                'data'    => $iu_l_def
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
            	$sort[] = array('property'=>'sender', 'direction'=>'ASC');
            	$sort = json_encode($sort);
            }
            $instanceid=$this->input->get('instanceid', FALSE);
            if(isset($instanceid)){
                if($instanceid!=''){
                    $iu_l_def= $this->m_iu_l_def->getRowsByInstance($instanceid,$sort);
                }else{
                    $iu_l_def= $this->m_iu_l_def->getRows($sort);
                }
            }else{
              $iu_l_def= $this->m_iu_l_def->getRows($sort);
            }
            $return = array(
                'success' =>  TRUE ,
                'data'    => $iu_l_def
            );
        print json_encode($return);
    }
    function getRowsByInstance() {
        log_message('debug', 'iu_l_def.getRowsByInstance post : '.json_encode($this->input->post(NULL, FALSE)));
            $group = $this->input->get('group', FALSE); 
           $sort = $this->input->get('sort', FALSE);
           if(!$sort && $group) $sort = $group;
           if(!$sort || $group == $sort) 
            {
            	$sort = json_decode($sort);
            	$sort[] = array('property'=>'sender', 'direction'=>'ASC');
            	$sort = json_encode($sort);
            }
        $InstId  =  $this->input->get_post('instanceid', TRUE);
        if (strlen($InstId) > 0) {
            $iu_l_def= $this->m_iu_l_def->getRowsByInstance($InstId,$sort);
            $return = array(
                'success' =>  TRUE ,
                'data'    => $iu_l_def
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
        log_message('debug', 'iu_l_def.getRowsByParent post : '.json_encode($this->input->post(NULL, FALSE)));
            $group = $this->input->get('group', FALSE); 
           $sort = $this->input->get('sort', FALSE);
           if(!$sort && $group) $sort = $group;
           if(!$sort || $group == $sort) 
            {
            	$sort = json_decode($sort);
            	$sort[] = array('property'=>'sender', 'direction'=>'ASC');
            	$sort = json_encode($sort);
            }
        $ParentId  =  $this->input->get_post('parentid', TRUE);
        if (strlen($ParentId) > 0) {
            $iu_l_def= $this->m_iu_l_def->getRowsByParent($ParentId,$sort);
            $return = array(
                'success' => TRUE,
                'data'    => $iu_l_def
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
        log_message('debug', 'iu_l_def.deleteRow post : '.json_encode($this->input->post(NULL, FALSE)));
        $tempId  =  $this->input->get_post('iu_l_defid', TRUE);
        if (strlen($tempId) > 0) {
            $return = $this->m_iu_l_def->deleteRow($tempId);
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
        $this->load->model('M_iu_l_def', 'm_iu_l_def');
    }
}
?>
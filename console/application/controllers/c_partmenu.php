<?php
	 class C_partmenu extends CI_Controller {
    function __construct() {
         parent::__construct();
        $this->_loadModels();
    }
    function setRow() {
          log_message('debug', 'PARTMENU.setRow post : '.json_encode($this->input->post(NULL, FALSE)));
          log_message('debug', 'PARTMENU.getRows get : '.json_encode($this->input->get(NULL, FALSE)));
          $data = array(
                'partmenuid' =>  $this->input->get_post('partmenuid', TRUE)
                ,'instanceid' =>  $this->input->get_post('instanceid', TRUE)
                ,'parentid' =>  $this->input->get_post('parentid', TRUE)
                ,'name' =>   $this->input->get_post('name', TRUE)
                ,'caption' =>   $this->input->get_post('caption', TRUE)
                ,'tooltip' =>   $this->input->get_post('tooltip', TRUE)
                ,'the_action' =>   $this->input->get_post('the_action', TRUE)
                ,'ismenuitem' =>   $this->input->get_post('ismenuitem', TRUE)
                ,'istoolbarbutton' =>   $this->input->get_post('istoolbarbutton', TRUE)
                ,'hotkey' =>   $this->input->get_post('hotkey', TRUE)
            );
            $partmenu = $this->m_partmenu->setRow($data);
            print json_encode($partmenu);
    }
    function newRow() {
            log_message('debug', 'PARTMENU.newRow post : '.json_encode($this->input->post(NULL, FALSE)));
          $data = array(
                'partmenuid' =>  $this->input->get_post('partmenuid', TRUE)
                ,'instanceid' =>  $this->input->get_post('instanceid', TRUE)
                ,'parentid' =>  $this->input->get_post('parentid', TRUE)
                ,'name' =>   $this->input->get_post('name', TRUE)
                ,'caption' =>   $this->input->get_post('caption', TRUE)
                ,'tooltip' =>   $this->input->get_post('tooltip', TRUE)
                ,'the_action' =>   $this->input->get_post('the_action', TRUE)
                ,'ismenuitem' =>   $this->input->get_post('ismenuitem', TRUE)
                ,'istoolbarbutton' =>   $this->input->get_post('istoolbarbutton', TRUE)
                ,'hotkey' =>   $this->input->get_post('hotkey', TRUE)
            );
                $instanceid =  $this->input->get_post('instanceid', TRUE);
                $parentid =  $this->input->get_post('parentid', TRUE);
            $partmenu= $this->m_partmenu->newRow($instanceid,$parentid,$data);
            $return = $partmenu;
            print json_encode($return);
    }
    function getRow() {
        log_message('debug', 'PARTMENU.getRow post : '.json_encode($this->input->post(NULL, FALSE)));
        $empId  =  $this->input->get_post('id', TRUE);
        if (isset($empId)) {
            $partmenu = $this->m_partmenu->getRow($empId);
            $return = array(
                'success' => true,
                'data'    => $partmenu
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
            	$sort[] = array('property'=>'name', 'direction'=>'ASC');
            	$sort = json_encode($sort);
            }
            $parentid=$this->input->get('parentid', FALSE);
            if(isset($parentid)){
                if($parentid!=''){
                    $partmenu= $this->m_partmenu->getRowsByParent($parentid,$sort);
                }else{
                    $partmenu= $this->m_partmenu->getRows($sort);
                }
            }else{
              $partmenu= $this->m_partmenu->getRows($sort);
            }
            $return = array(
                'success' =>  TRUE ,
                'data'    => $partmenu
            );
        print json_encode($return);
    }
    function getRowsByInstance() {
        log_message('debug', 'PARTMENU.getRowsByInstance post : '.json_encode($this->input->post(NULL, FALSE)));
            $group = $this->input->get('group', FALSE); 
           $sort = $this->input->get('sort', FALSE);
           if(!$sort && $group) $sort = $group;
           if(!$sort || $group == $sort) 
            {
            	$sort = json_decode($sort);
            	$sort[] = array('property'=>'name', 'direction'=>'ASC');
            	$sort = json_encode($sort);
            }
        $InstId  =  $this->input->get_post('instanceid', TRUE);
        if (strlen($InstId) > 0) {
            $partmenu= $this->m_partmenu->getRowsByInstance($InstId,$sort);
            $return = array(
                'success' =>  TRUE ,
                'data'    => $partmenu
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
        log_message('debug', 'PARTMENU.getRowsByParent post : '.json_encode($this->input->post(NULL, FALSE)));
            $group = $this->input->get('group', FALSE); 
           $sort = $this->input->get('sort', FALSE);
           if(!$sort && $group) $sort = $group;
           if(!$sort || $group == $sort) 
            {
            	$sort = json_decode($sort);
            	$sort[] = array('property'=>'name', 'direction'=>'ASC');
            	$sort = json_encode($sort);
            }
        $ParentId  =  $this->input->get_post('parentid', TRUE);
        if (strlen($ParentId) > 0) {
            $partmenu= $this->m_partmenu->getRowsByParent($ParentId,$sort);
            $return = array(
                'success' => TRUE,
                'data'    => $partmenu
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
        log_message('debug', 'PARTMENU.deleteRow post : '.json_encode($this->input->post(NULL, FALSE)));
        $tempId  =  $this->input->get_post('partmenuid', TRUE);
        if (strlen($tempId) > 0) {
            $return = $this->m_partmenu->deleteRow($tempId);
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
        $this->load->model('M_partmenu', 'm_partmenu');
    }
}
?>
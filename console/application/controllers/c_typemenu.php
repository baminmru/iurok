<?php
	 class C_typemenu extends CI_Controller {
    function __construct() {
         parent::__construct();
        $this->_loadModels();
    }
    function setRow() {
          log_message('debug', 'TYPEMENU.setRow post : '.json_encode($this->input->post(NULL, FALSE)));
          log_message('debug', 'TYPEMENU.getRows get : '.json_encode($this->input->get(NULL, FALSE)));
          $data = array(
                'typemenuid' =>  $this->input->get_post('typemenuid', TRUE)
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
            $typemenu = $this->m_typemenu->setRow($data);
            print json_encode($typemenu);
    }
    function newRow() {
            log_message('debug', 'TYPEMENU.newRow post : '.json_encode($this->input->post(NULL, FALSE)));
          $data = array(
                'typemenuid' =>  $this->input->get_post('typemenuid', TRUE)
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
            $typemenu= $this->m_typemenu->newRow($instanceid,$parentid,$data);
            $return = $typemenu;
            print json_encode($return);
    }
    function getRow() {
        log_message('debug', 'TYPEMENU.getRow post : '.json_encode($this->input->post(NULL, FALSE)));
        $empId  =  $this->input->get_post('id', TRUE);
        if (isset($empId)) {
            $typemenu = $this->m_typemenu->getRow($empId);
            $return = array(
                'success' => true,
                'data'    => $typemenu
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
                    $typemenu= $this->m_typemenu->getRowsByParent($parentid,$sort);
                }else{
                    $typemenu= $this->m_typemenu->getRows($sort);
                }
            }else{
              $typemenu= $this->m_typemenu->getRows($sort);
            }
            $return = array(
                'success' =>  TRUE ,
                'data'    => $typemenu
            );
        print json_encode($return);
    }
    function getRowsByInstance() {
        log_message('debug', 'TYPEMENU.getRowsByInstance post : '.json_encode($this->input->post(NULL, FALSE)));
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
            $typemenu= $this->m_typemenu->getRowsByInstance($InstId,$sort);
            $return = array(
                'success' =>  TRUE ,
                'data'    => $typemenu
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
        log_message('debug', 'TYPEMENU.getRowsByParent post : '.json_encode($this->input->post(NULL, FALSE)));
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
            $typemenu= $this->m_typemenu->getRowsByParent($ParentId,$sort);
            $return = array(
                'success' => TRUE,
                'data'    => $typemenu
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
        log_message('debug', 'TYPEMENU.deleteRow post : '.json_encode($this->input->post(NULL, FALSE)));
        $tempId  =  $this->input->get_post('typemenuid', TRUE);
        if (strlen($tempId) > 0) {
            $return = $this->m_typemenu->deleteRow($tempId);
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
        $this->load->model('M_typemenu', 'm_typemenu');
    }
}
?>
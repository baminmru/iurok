<?php
	 class C_fieldmenu extends CI_Controller {
    function __construct() {
         parent::__construct();
        $this->_loadModels();
    }
    function setRow() {
          log_message('debug', 'FIELDMENU.setRow post : '.json_encode($this->input->post(NULL, FALSE)));
          log_message('debug', 'FIELDMENU.getRows get : '.json_encode($this->input->get(NULL, FALSE)));
          $data = array(
                'fieldmenuid' =>  $this->input->get_post('fieldmenuid', TRUE)
                ,'instanceid' =>  $this->input->get_post('instanceid', TRUE)
                ,'parentid' =>  $this->input->get_post('parentid', TRUE)
                ,'name' =>   $this->input->get_post('name', TRUE)
                ,'caption' =>   $this->input->get_post('caption', TRUE)
                ,'tooltip' =>   $this->input->get_post('tooltip', TRUE)
                ,'actionid' =>   $this->input->get_post('actionid', TRUE)
                ,'ismenuitem' =>   $this->input->get_post('ismenuitem', TRUE)
                ,'istoolbarbutton' =>   $this->input->get_post('istoolbarbutton', TRUE)
                ,'hotkey' =>   $this->input->get_post('hotkey', TRUE)
            );
            $fieldmenu = $this->m_fieldmenu->setRow($data);
            print json_encode($fieldmenu);
    }
    function newRow() {
            log_message('debug', 'FIELDMENU.newRow post : '.json_encode($this->input->post(NULL, FALSE)));
          $data = array(
                'fieldmenuid' =>  $this->input->get_post('fieldmenuid', TRUE)
                ,'instanceid' =>  $this->input->get_post('instanceid', TRUE)
                ,'parentid' =>  $this->input->get_post('parentid', TRUE)
                ,'name' =>   $this->input->get_post('name', TRUE)
                ,'caption' =>   $this->input->get_post('caption', TRUE)
                ,'tooltip' =>   $this->input->get_post('tooltip', TRUE)
                ,'actionid' =>   $this->input->get_post('actionid', TRUE)
                ,'ismenuitem' =>   $this->input->get_post('ismenuitem', TRUE)
                ,'istoolbarbutton' =>   $this->input->get_post('istoolbarbutton', TRUE)
                ,'hotkey' =>   $this->input->get_post('hotkey', TRUE)
            );
                $instanceid =  $this->input->get_post('instanceid', TRUE);
                $parentid =  $this->input->get_post('parentid', TRUE);
            $fieldmenu= $this->m_fieldmenu->newRow($instanceid,$parentid,$data);
            $return = $fieldmenu;
            print json_encode($return);
    }
    function getRow() {
        log_message('debug', 'FIELDMENU.getRow post : '.json_encode($this->input->post(NULL, FALSE)));
        $empId  =  $this->input->get_post('id', TRUE);
        if (isset($empId)) {
            $fieldmenu = $this->m_fieldmenu->getRow($empId);
            $return = array(
                'success' => true,
                'data'    => $fieldmenu
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
                    $fieldmenu= $this->m_fieldmenu->getRowsByParent($parentid,$sort);
                }else{
                    $fieldmenu= $this->m_fieldmenu->getRows($sort);
                }
            }else{
              $fieldmenu= $this->m_fieldmenu->getRows($sort);
            }
            $return = array(
                'success' =>  TRUE ,
                'data'    => $fieldmenu
            );
        print json_encode($return);
    }
    function getRowsByInstance() {
        log_message('debug', 'FIELDMENU.getRowsByInstance post : '.json_encode($this->input->post(NULL, FALSE)));
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
            $fieldmenu= $this->m_fieldmenu->getRowsByInstance($InstId,$sort);
            $return = array(
                'success' =>  TRUE ,
                'data'    => $fieldmenu
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
        log_message('debug', 'FIELDMENU.getRowsByParent post : '.json_encode($this->input->post(NULL, FALSE)));
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
            $fieldmenu= $this->m_fieldmenu->getRowsByParent($ParentId,$sort);
            $return = array(
                'success' => TRUE,
                'data'    => $fieldmenu
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
        log_message('debug', 'FIELDMENU.deleteRow post : '.json_encode($this->input->post(NULL, FALSE)));
        $tempId  =  $this->input->get_post('fieldmenuid', TRUE);
        if (strlen($tempId) > 0) {
            $return = $this->m_fieldmenu->deleteRow($tempId);
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
        $this->load->model('M_fieldmenu', 'm_fieldmenu');
    }
}
?>
<?php
	 class C_enumitem extends CI_Controller {
    function __construct() {
         parent::__construct();
        $this->_loadModels();
    }
    function setRow() {
          log_message('debug', 'ENUMITEM.setRow post : '.json_encode($this->input->post(NULL, FALSE)));
          log_message('debug', 'ENUMITEM.getRows get : '.json_encode($this->input->get(NULL, FALSE)));
          $data = array(
                'enumitemid' =>  $this->input->get_post('enumitemid', TRUE)
                ,'instanceid' =>  $this->input->get_post('instanceid', TRUE)
                ,'parentid' =>  $this->input->get_post('parentid', TRUE)
                ,'name' =>   $this->input->get_post('name', TRUE)
                ,'namevalue' =>   $this->input->get_post('namevalue', TRUE)
                ,'nameincode' =>   $this->input->get_post('nameincode', TRUE)
            );
            $enumitem = $this->m_enumitem->setRow($data);
            print json_encode($enumitem);
    }
    function newRow() {
            log_message('debug', 'ENUMITEM.newRow post : '.json_encode($this->input->post(NULL, FALSE)));
          $data = array(
                'enumitemid' =>  $this->input->get_post('enumitemid', TRUE)
                ,'instanceid' =>  $this->input->get_post('instanceid', TRUE)
                ,'parentid' =>  $this->input->get_post('parentid', TRUE)
                ,'name' =>   $this->input->get_post('name', TRUE)
                ,'namevalue' =>   $this->input->get_post('namevalue', TRUE)
                ,'nameincode' =>   $this->input->get_post('nameincode', TRUE)
            );
                $instanceid =  $this->input->get_post('instanceid', TRUE);
                $parentid =  $this->input->get_post('parentid', TRUE);
            $enumitem= $this->m_enumitem->newRow($instanceid,$parentid,$data);
            $return = $enumitem;
            print json_encode($return);
    }
    function getRow() {
        log_message('debug', 'ENUMITEM.getRow post : '.json_encode($this->input->post(NULL, FALSE)));
        $empId  =  $this->input->get_post('id', TRUE);
        if (isset($empId)) {
            $enumitem = $this->m_enumitem->getRow($empId);
            $return = array(
                'success' => true,
                'data'    => $enumitem
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
                    $enumitem= $this->m_enumitem->getRowsByParent($parentid,$sort);
                }else{
                    $enumitem= $this->m_enumitem->getRows($sort);
                }
            }else{
              $enumitem= $this->m_enumitem->getRows($sort);
            }
            $return = array(
                'success' =>  TRUE ,
                'data'    => $enumitem
            );
        print json_encode($return);
    }
    function getRowsByInstance() {
        log_message('debug', 'ENUMITEM.getRowsByInstance post : '.json_encode($this->input->post(NULL, FALSE)));
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
            $enumitem= $this->m_enumitem->getRowsByInstance($InstId,$sort);
            $return = array(
                'success' =>  TRUE ,
                'data'    => $enumitem
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
        log_message('debug', 'ENUMITEM.getRowsByParent post : '.json_encode($this->input->post(NULL, FALSE)));
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
            $enumitem= $this->m_enumitem->getRowsByParent($ParentId,$sort);
            $return = array(
                'success' => TRUE,
                'data'    => $enumitem
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
        log_message('debug', 'ENUMITEM.deleteRow post : '.json_encode($this->input->post(NULL, FALSE)));
        $tempId  =  $this->input->get_post('enumitemid', TRUE);
        if (strlen($tempId) > 0) {
            $return = $this->m_enumitem->deleteRow($tempId);
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
        $this->load->model('M_enumitem', 'm_enumitem');
    }
}
?>
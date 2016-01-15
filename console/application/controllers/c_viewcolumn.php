<?php
	 class C_viewcolumn extends CI_Controller {
    function __construct() {
         parent::__construct();
        $this->_loadModels();
    }
    function setRow() {
          log_message('debug', 'ViewColumn.setRow post : '.json_encode($this->input->post(NULL, FALSE)));
          log_message('debug', 'ViewColumn.getRows get : '.json_encode($this->input->get(NULL, FALSE)));
          $data = array(
                'viewcolumnid' =>  $this->input->get_post('viewcolumnid', TRUE)
                ,'instanceid' =>  $this->input->get_post('instanceid', TRUE)
                ,'parentid' =>  $this->input->get_post('parentid', TRUE)
                ,'sequence' =>   $this->input->get_post('sequence', TRUE)
                ,'name' =>   $this->input->get_post('name', TRUE)
                ,'the_alias' =>   $this->input->get_post('the_alias', TRUE)
                ,'frompart' =>   $this->input->get_post('frompart', TRUE)
                ,'field' =>   $this->input->get_post('field', TRUE)
                ,'aggregation' =>   $this->input->get_post('aggregation', TRUE)
                ,'expression' =>   $this->input->get_post('expression', TRUE)
                ,'forcombo' =>   $this->input->get_post('forcombo', TRUE)
            );
            $viewcolumn = $this->m_viewcolumn->setRow($data);
            print json_encode($viewcolumn);
    }
    function newRow() {
            log_message('debug', 'ViewColumn.newRow post : '.json_encode($this->input->post(NULL, FALSE)));
          $data = array(
                'viewcolumnid' =>  $this->input->get_post('viewcolumnid', TRUE)
                ,'instanceid' =>  $this->input->get_post('instanceid', TRUE)
                ,'parentid' =>  $this->input->get_post('parentid', TRUE)
                ,'sequence' =>   $this->input->get_post('sequence', TRUE)
                ,'name' =>   $this->input->get_post('name', TRUE)
                ,'the_alias' =>   $this->input->get_post('the_alias', TRUE)
                ,'frompart' =>   $this->input->get_post('frompart', TRUE)
                ,'field' =>   $this->input->get_post('field', TRUE)
                ,'aggregation' =>   $this->input->get_post('aggregation', TRUE)
                ,'expression' =>   $this->input->get_post('expression', TRUE)
                ,'forcombo' =>   $this->input->get_post('forcombo', TRUE)
            );
                $instanceid =  $this->input->get_post('instanceid', TRUE);
                $parentid =  $this->input->get_post('parentid', TRUE);
            $viewcolumn= $this->m_viewcolumn->newRow($instanceid,$parentid,$data);
            $return = $viewcolumn;
            print json_encode($return);
    }
    function getRow() {
        log_message('debug', 'ViewColumn.getRow post : '.json_encode($this->input->post(NULL, FALSE)));
        $empId  =  $this->input->get_post('id', TRUE);
        if (isset($empId)) {
            $viewcolumn = $this->m_viewcolumn->getRow($empId);
            $return = array(
                'success' => true,
                'data'    => $viewcolumn
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
            	$sort[] = array('property'=>'sequence', 'direction'=>'ASC');
            	$sort = json_encode($sort);
            }
            $parentid=$this->input->get('parentid', FALSE);
            if(isset($parentid)){
                if($parentid!=''){
                    $viewcolumn= $this->m_viewcolumn->getRowsByParent($parentid,$sort);
                }else{
                    $viewcolumn= $this->m_viewcolumn->getRows($sort);
                }
            }else{
              $viewcolumn= $this->m_viewcolumn->getRows($sort);
            }
            $return = array(
                'success' =>  TRUE ,
                'data'    => $viewcolumn
            );
        print json_encode($return);
    }
    function getRowsByInstance() {
        log_message('debug', 'ViewColumn.getRowsByInstance post : '.json_encode($this->input->post(NULL, FALSE)));
            $group = $this->input->get('group', FALSE); 
           $sort = $this->input->get('sort', FALSE);
           if(!$sort && $group) $sort = $group;
           if(!$sort || $group == $sort) 
            {
            	$sort = json_decode($sort);
            	$sort[] = array('property'=>'sequence', 'direction'=>'ASC');
            	$sort = json_encode($sort);
            }
        $InstId  =  $this->input->get_post('instanceid', TRUE);
        if (strlen($InstId) > 0) {
            $viewcolumn= $this->m_viewcolumn->getRowsByInstance($InstId,$sort);
            $return = array(
                'success' =>  TRUE ,
                'data'    => $viewcolumn
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
        log_message('debug', 'ViewColumn.getRowsByParent post : '.json_encode($this->input->post(NULL, FALSE)));
            $group = $this->input->get('group', FALSE); 
           $sort = $this->input->get('sort', FALSE);
           if(!$sort && $group) $sort = $group;
           if(!$sort || $group == $sort) 
            {
            	$sort = json_decode($sort);
            	$sort[] = array('property'=>'sequence', 'direction'=>'ASC');
            	$sort = json_encode($sort);
            }
        $ParentId  =  $this->input->get_post('parentid', TRUE);
        if (strlen($ParentId) > 0) {
            $viewcolumn= $this->m_viewcolumn->getRowsByParent($ParentId,$sort);
            $return = array(
                'success' => TRUE,
                'data'    => $viewcolumn
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
        log_message('debug', 'ViewColumn.deleteRow post : '.json_encode($this->input->post(NULL, FALSE)));
        $tempId  =  $this->input->get_post('viewcolumnid', TRUE);
        if (strlen($tempId) > 0) {
            $return = $this->m_viewcolumn->deleteRow($tempId);
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
        $this->load->model('M_viewcolumn', 'm_viewcolumn');
    }
}
?>
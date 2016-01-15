<?php
	 class C_partview extends CI_Controller {
    function __construct() {
         parent::__construct();
        $this->_loadModels();
    }
    function setRow() {
          log_message('debug', 'PARTVIEW.setRow post : '.json_encode($this->input->post(NULL, FALSE)));
          log_message('debug', 'PARTVIEW.getRows get : '.json_encode($this->input->get(NULL, FALSE)));
          $data = array(
                'partviewid' =>  $this->input->get_post('partviewid', TRUE)
                ,'instanceid' =>  $this->input->get_post('instanceid', TRUE)
                ,'parentid' =>  $this->input->get_post('parentid', TRUE)
                ,'name' =>   $this->input->get_post('name', TRUE)
                ,'the_alias' =>   $this->input->get_post('the_alias', TRUE)
                ,'forchoose' =>   $this->input->get_post('forchoose', TRUE)
                ,'filterfield0' =>   $this->input->get_post('filterfield0', TRUE)
                ,'filterfield1' =>   $this->input->get_post('filterfield1', TRUE)
                ,'filterfield2' =>   $this->input->get_post('filterfield2', TRUE)
                ,'filterfield3' =>   $this->input->get_post('filterfield3', TRUE)
            );
            $partview = $this->m_partview->setRow($data);
            print json_encode($partview);
    }
    function newRow() {
            log_message('debug', 'PARTVIEW.newRow post : '.json_encode($this->input->post(NULL, FALSE)));
          $data = array(
                'partviewid' =>  $this->input->get_post('partviewid', TRUE)
                ,'instanceid' =>  $this->input->get_post('instanceid', TRUE)
                ,'parentid' =>  $this->input->get_post('parentid', TRUE)
                ,'name' =>   $this->input->get_post('name', TRUE)
                ,'the_alias' =>   $this->input->get_post('the_alias', TRUE)
                ,'forchoose' =>   $this->input->get_post('forchoose', TRUE)
                ,'filterfield0' =>   $this->input->get_post('filterfield0', TRUE)
                ,'filterfield1' =>   $this->input->get_post('filterfield1', TRUE)
                ,'filterfield2' =>   $this->input->get_post('filterfield2', TRUE)
                ,'filterfield3' =>   $this->input->get_post('filterfield3', TRUE)
            );
                $instanceid =  $this->input->get_post('instanceid', TRUE);
                $parentid =  $this->input->get_post('parentid', TRUE);
            $partview= $this->m_partview->newRow($instanceid,$parentid,$data);
            $return = $partview;
            print json_encode($return);
    }
    function getRow() {
        log_message('debug', 'PARTVIEW.getRow post : '.json_encode($this->input->post(NULL, FALSE)));
        $empId  =  $this->input->get_post('id', TRUE);
        if (isset($empId)) {
            $partview = $this->m_partview->getRow($empId);
            $return = array(
                'success' => true,
                'data'    => $partview
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
                    $partview= $this->m_partview->getRowsByParent($parentid,$sort);
                }else{
                    $partview= $this->m_partview->getRows($sort);
                }
            }else{
              $partview= $this->m_partview->getRows($sort);
            }
            $return = array(
                'success' =>  TRUE ,
                'data'    => $partview
            );
        print json_encode($return);
    }
    function getRowsByInstance() {
        log_message('debug', 'PARTVIEW.getRowsByInstance post : '.json_encode($this->input->post(NULL, FALSE)));
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
            $partview= $this->m_partview->getRowsByInstance($InstId,$sort);
            $return = array(
                'success' =>  TRUE ,
                'data'    => $partview
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
        log_message('debug', 'PARTVIEW.getRowsByParent post : '.json_encode($this->input->post(NULL, FALSE)));
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
            $partview= $this->m_partview->getRowsByParent($ParentId,$sort);
            $return = array(
                'success' => TRUE,
                'data'    => $partview
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
        log_message('debug', 'PARTVIEW.deleteRow post : '.json_encode($this->input->post(NULL, FALSE)));
        $tempId  =  $this->input->get_post('partviewid', TRUE);
        if (strlen($tempId) > 0) {
            $return = $this->m_partview->deleteRow($tempId);
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
        $this->load->model('M_partview', 'm_partview');
    }
}
?>
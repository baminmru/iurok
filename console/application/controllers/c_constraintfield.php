<?php
	 class C_constraintfield extends CI_Controller {
    function __construct() {
         parent::__construct();
        $this->_loadModels();
    }
    function setRow() {
          log_message('debug', 'CONSTRAINTFIELD.setRow post : '.json_encode($this->input->post(NULL, FALSE)));
          log_message('debug', 'CONSTRAINTFIELD.getRows get : '.json_encode($this->input->get(NULL, FALSE)));
          $data = array(
                'constraintfieldid' =>  $this->input->get_post('constraintfieldid', TRUE)
                ,'instanceid' =>  $this->input->get_post('instanceid', TRUE)
                ,'parentid' =>  $this->input->get_post('parentid', TRUE)
                ,'thefield' =>   $this->input->get_post('thefield', TRUE)
            );
            $constraintfield = $this->m_constraintfield->setRow($data);
            print json_encode($constraintfield);
    }
    function newRow() {
            log_message('debug', 'CONSTRAINTFIELD.newRow post : '.json_encode($this->input->post(NULL, FALSE)));
          $data = array(
                'constraintfieldid' =>  $this->input->get_post('constraintfieldid', TRUE)
                ,'instanceid' =>  $this->input->get_post('instanceid', TRUE)
                ,'parentid' =>  $this->input->get_post('parentid', TRUE)
                ,'thefield' =>   $this->input->get_post('thefield', TRUE)
            );
                $instanceid =  $this->input->get_post('instanceid', TRUE);
                $parentid =  $this->input->get_post('parentid', TRUE);
            $constraintfield= $this->m_constraintfield->newRow($instanceid,$parentid,$data);
            $return = $constraintfield;
            print json_encode($return);
    }
    function getRow() {
        log_message('debug', 'CONSTRAINTFIELD.getRow post : '.json_encode($this->input->post(NULL, FALSE)));
        $empId  =  $this->input->get_post('id', TRUE);
        if (isset($empId)) {
            $constraintfield = $this->m_constraintfield->getRow($empId);
            $return = array(
                'success' => true,
                'data'    => $constraintfield
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
            	$sort[] = array('property'=>'thefield', 'direction'=>'ASC');
            	$sort = json_encode($sort);
            }
            $parentid=$this->input->get('parentid', FALSE);
            if(isset($parentid)){
                if($parentid!=''){
                    $constraintfield= $this->m_constraintfield->getRowsByParent($parentid,$sort);
                }else{
                    $constraintfield= $this->m_constraintfield->getRows($sort);
                }
            }else{
              $constraintfield= $this->m_constraintfield->getRows($sort);
            }
            $return = array(
                'success' =>  TRUE ,
                'data'    => $constraintfield
            );
        print json_encode($return);
    }
    function getRowsByInstance() {
        log_message('debug', 'CONSTRAINTFIELD.getRowsByInstance post : '.json_encode($this->input->post(NULL, FALSE)));
            $group = $this->input->get('group', FALSE); 
           $sort = $this->input->get('sort', FALSE);
           if(!$sort && $group) $sort = $group;
           if(!$sort || $group == $sort) 
            {
            	$sort = json_decode($sort);
            	$sort[] = array('property'=>'thefield', 'direction'=>'ASC');
            	$sort = json_encode($sort);
            }
        $InstId  =  $this->input->get_post('instanceid', TRUE);
        if (strlen($InstId) > 0) {
            $constraintfield= $this->m_constraintfield->getRowsByInstance($InstId,$sort);
            $return = array(
                'success' =>  TRUE ,
                'data'    => $constraintfield
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
        log_message('debug', 'CONSTRAINTFIELD.getRowsByParent post : '.json_encode($this->input->post(NULL, FALSE)));
            $group = $this->input->get('group', FALSE); 
           $sort = $this->input->get('sort', FALSE);
           if(!$sort && $group) $sort = $group;
           if(!$sort || $group == $sort) 
            {
            	$sort = json_decode($sort);
            	$sort[] = array('property'=>'thefield', 'direction'=>'ASC');
            	$sort = json_encode($sort);
            }
        $ParentId  =  $this->input->get_post('parentid', TRUE);
        if (strlen($ParentId) > 0) {
            $constraintfield= $this->m_constraintfield->getRowsByParent($ParentId,$sort);
            $return = array(
                'success' => TRUE,
                'data'    => $constraintfield
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
        log_message('debug', 'CONSTRAINTFIELD.deleteRow post : '.json_encode($this->input->post(NULL, FALSE)));
        $tempId  =  $this->input->get_post('constraintfieldid', TRUE);
        if (strlen($tempId) > 0) {
            $return = $this->m_constraintfield->deleteRow($tempId);
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
        $this->load->model('M_constraintfield', 'm_constraintfield');
    }
}
?>
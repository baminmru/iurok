<?php
	 class C_fieldexpression extends CI_Controller {
    function __construct() {
         parent::__construct();
        $this->_loadModels();
    }
    function setRow() {
          log_message('debug', 'FIELDEXPRESSION.setRow post : '.json_encode($this->input->post(NULL, FALSE)));
          log_message('debug', 'FIELDEXPRESSION.getRows get : '.json_encode($this->input->get(NULL, FALSE)));
          $data = array(
                'fieldexpressionid' =>  $this->input->get_post('fieldexpressionid', TRUE)
                ,'instanceid' =>  $this->input->get_post('instanceid', TRUE)
                ,'parentid' =>  $this->input->get_post('parentid', TRUE)
                ,'target' =>   $this->input->get_post('target', TRUE)
                ,'code' =>   $this->input->get_post('code', TRUE)
            );
            $fieldexpression = $this->m_fieldexpression->setRow($data);
            print json_encode($fieldexpression);
    }
    function newRow() {
            log_message('debug', 'FIELDEXPRESSION.newRow post : '.json_encode($this->input->post(NULL, FALSE)));
          $data = array(
                'fieldexpressionid' =>  $this->input->get_post('fieldexpressionid', TRUE)
                ,'instanceid' =>  $this->input->get_post('instanceid', TRUE)
                ,'parentid' =>  $this->input->get_post('parentid', TRUE)
                ,'target' =>   $this->input->get_post('target', TRUE)
                ,'code' =>   $this->input->get_post('code', TRUE)
            );
                $instanceid =  $this->input->get_post('instanceid', TRUE);
                $parentid =  $this->input->get_post('parentid', TRUE);
            $fieldexpression= $this->m_fieldexpression->newRow($instanceid,$parentid,$data);
            $return = $fieldexpression;
            print json_encode($return);
    }
    function getRow() {
        log_message('debug', 'FIELDEXPRESSION.getRow post : '.json_encode($this->input->post(NULL, FALSE)));
        $empId  =  $this->input->get_post('id', TRUE);
        if (isset($empId)) {
            $fieldexpression = $this->m_fieldexpression->getRow($empId);
            $return = array(
                'success' => true,
                'data'    => $fieldexpression
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
            	$sort[] = array('property'=>'target', 'direction'=>'ASC');
            	$sort = json_encode($sort);
            }
            $parentid=$this->input->get('parentid', FALSE);
            if(isset($parentid)){
                if($parentid!=''){
                    $fieldexpression= $this->m_fieldexpression->getRowsByParent($parentid,$sort);
                }else{
                    $fieldexpression= $this->m_fieldexpression->getRows($sort);
                }
            }else{
              $fieldexpression= $this->m_fieldexpression->getRows($sort);
            }
            $return = array(
                'success' =>  TRUE ,
                'data'    => $fieldexpression
            );
        print json_encode($return);
    }
    function getRowsByInstance() {
        log_message('debug', 'FIELDEXPRESSION.getRowsByInstance post : '.json_encode($this->input->post(NULL, FALSE)));
            $group = $this->input->get('group', FALSE); 
           $sort = $this->input->get('sort', FALSE);
           if(!$sort && $group) $sort = $group;
           if(!$sort || $group == $sort) 
            {
            	$sort = json_decode($sort);
            	$sort[] = array('property'=>'target', 'direction'=>'ASC');
            	$sort = json_encode($sort);
            }
        $InstId  =  $this->input->get_post('instanceid', TRUE);
        if (strlen($InstId) > 0) {
            $fieldexpression= $this->m_fieldexpression->getRowsByInstance($InstId,$sort);
            $return = array(
                'success' =>  TRUE ,
                'data'    => $fieldexpression
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
        log_message('debug', 'FIELDEXPRESSION.getRowsByParent post : '.json_encode($this->input->post(NULL, FALSE)));
            $group = $this->input->get('group', FALSE); 
           $sort = $this->input->get('sort', FALSE);
           if(!$sort && $group) $sort = $group;
           if(!$sort || $group == $sort) 
            {
            	$sort = json_decode($sort);
            	$sort[] = array('property'=>'target', 'direction'=>'ASC');
            	$sort = json_encode($sort);
            }
        $ParentId  =  $this->input->get_post('parentid', TRUE);
        if (strlen($ParentId) > 0) {
            $fieldexpression= $this->m_fieldexpression->getRowsByParent($ParentId,$sort);
            $return = array(
                'success' => TRUE,
                'data'    => $fieldexpression
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
        log_message('debug', 'FIELDEXPRESSION.deleteRow post : '.json_encode($this->input->post(NULL, FALSE)));
        $tempId  =  $this->input->get_post('fieldexpressionid', TRUE);
        if (strlen($tempId) > 0) {
            $return = $this->m_fieldexpression->deleteRow($tempId);
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
        $this->load->model('M_fieldexpression', 'm_fieldexpression');
    }
}
?>
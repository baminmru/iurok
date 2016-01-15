<?php
	 class C_methodrestriction extends CI_Controller {
    function __construct() {
         parent::__construct();
        $this->_loadModels();
    }
    function setRow() {
          log_message('debug', 'METHODRESTRICTION.setRow post : '.json_encode($this->input->post(NULL, FALSE)));
          log_message('debug', 'METHODRESTRICTION.getRows get : '.json_encode($this->input->get(NULL, FALSE)));
          $data = array(
                'methodrestrictionid' =>  $this->input->get_post('methodrestrictionid', TRUE)
                ,'instanceid' =>  $this->input->get_post('instanceid', TRUE)
                ,'parentid' =>  $this->input->get_post('parentid', TRUE)
                ,'part' =>   $this->input->get_post('part', TRUE)
                ,'method' =>   $this->input->get_post('method', TRUE)
                ,'isrestricted' =>   $this->input->get_post('isrestricted', TRUE)
            );
            $methodrestriction = $this->m_methodrestriction->setRow($data);
            print json_encode($methodrestriction);
    }
    function newRow() {
            log_message('debug', 'METHODRESTRICTION.newRow post : '.json_encode($this->input->post(NULL, FALSE)));
          $data = array(
                'methodrestrictionid' =>  $this->input->get_post('methodrestrictionid', TRUE)
                ,'instanceid' =>  $this->input->get_post('instanceid', TRUE)
                ,'parentid' =>  $this->input->get_post('parentid', TRUE)
                ,'part' =>   $this->input->get_post('part', TRUE)
                ,'method' =>   $this->input->get_post('method', TRUE)
                ,'isrestricted' =>   $this->input->get_post('isrestricted', TRUE)
            );
                $instanceid =  $this->input->get_post('instanceid', TRUE);
                $parentid =  $this->input->get_post('parentid', TRUE);
            $methodrestriction= $this->m_methodrestriction->newRow($instanceid,$parentid,$data);
            $return = $methodrestriction;
            print json_encode($return);
    }
    function getRow() {
        log_message('debug', 'METHODRESTRICTION.getRow post : '.json_encode($this->input->post(NULL, FALSE)));
        $empId  =  $this->input->get_post('id', TRUE);
        if (isset($empId)) {
            $methodrestriction = $this->m_methodrestriction->getRow($empId);
            $return = array(
                'success' => true,
                'data'    => $methodrestriction
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
            	$sort[] = array('property'=>'method', 'direction'=>'ASC');
            	$sort = json_encode($sort);
            }
            $parentid=$this->input->get('parentid', FALSE);
            if(isset($parentid)){
                if($parentid!=''){
                    $methodrestriction= $this->m_methodrestriction->getRowsByParent($parentid,$sort);
                }else{
                    $methodrestriction= $this->m_methodrestriction->getRows($sort);
                }
            }else{
              $methodrestriction= $this->m_methodrestriction->getRows($sort);
            }
            $return = array(
                'success' =>  TRUE ,
                'data'    => $methodrestriction
            );
        print json_encode($return);
    }
    function getRowsByInstance() {
        log_message('debug', 'METHODRESTRICTION.getRowsByInstance post : '.json_encode($this->input->post(NULL, FALSE)));
            $group = $this->input->get('group', FALSE); 
           $sort = $this->input->get('sort', FALSE);
           if(!$sort && $group) $sort = $group;
           if(!$sort || $group == $sort) 
            {
            	$sort = json_decode($sort);
            	$sort[] = array('property'=>'method', 'direction'=>'ASC');
            	$sort = json_encode($sort);
            }
        $InstId  =  $this->input->get_post('instanceid', TRUE);
        if (strlen($InstId) > 0) {
            $methodrestriction= $this->m_methodrestriction->getRowsByInstance($InstId,$sort);
            $return = array(
                'success' =>  TRUE ,
                'data'    => $methodrestriction
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
        log_message('debug', 'METHODRESTRICTION.getRowsByParent post : '.json_encode($this->input->post(NULL, FALSE)));
            $group = $this->input->get('group', FALSE); 
           $sort = $this->input->get('sort', FALSE);
           if(!$sort && $group) $sort = $group;
           if(!$sort || $group == $sort) 
            {
            	$sort = json_decode($sort);
            	$sort[] = array('property'=>'method', 'direction'=>'ASC');
            	$sort = json_encode($sort);
            }
        $ParentId  =  $this->input->get_post('parentid', TRUE);
        if (strlen($ParentId) > 0) {
            $methodrestriction= $this->m_methodrestriction->getRowsByParent($ParentId,$sort);
            $return = array(
                'success' => TRUE,
                'data'    => $methodrestriction
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
        log_message('debug', 'METHODRESTRICTION.deleteRow post : '.json_encode($this->input->post(NULL, FALSE)));
        $tempId  =  $this->input->get_post('methodrestrictionid', TRUE);
        if (strlen($tempId) > 0) {
            $return = $this->m_methodrestriction->deleteRow($tempId);
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
        $this->load->model('M_methodrestriction', 'm_methodrestriction');
    }
}
?>
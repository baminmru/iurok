<?php
	 class C_structrestriction extends CI_Controller {
    function __construct() {
         parent::__construct();
        $this->_loadModels();
    }
    function setRow() {
          log_message('debug', 'STRUCTRESTRICTION.setRow post : '.json_encode($this->input->post(NULL, FALSE)));
          log_message('debug', 'STRUCTRESTRICTION.getRows get : '.json_encode($this->input->get(NULL, FALSE)));
          $data = array(
                'structrestrictionid' =>  $this->input->get_post('structrestrictionid', TRUE)
                ,'instanceid' =>  $this->input->get_post('instanceid', TRUE)
                ,'parentid' =>  $this->input->get_post('parentid', TRUE)
                ,'struct' =>   $this->input->get_post('struct', TRUE)
                ,'allowread' =>   $this->input->get_post('allowread', TRUE)
                ,'allowadd' =>   $this->input->get_post('allowadd', TRUE)
                ,'allowedit' =>   $this->input->get_post('allowedit', TRUE)
                ,'allowdelete' =>   $this->input->get_post('allowdelete', TRUE)
            );
            $structrestriction = $this->m_structrestriction->setRow($data);
            print json_encode($structrestriction);
    }
    function newRow() {
            log_message('debug', 'STRUCTRESTRICTION.newRow post : '.json_encode($this->input->post(NULL, FALSE)));
          $data = array(
                'structrestrictionid' =>  $this->input->get_post('structrestrictionid', TRUE)
                ,'instanceid' =>  $this->input->get_post('instanceid', TRUE)
                ,'parentid' =>  $this->input->get_post('parentid', TRUE)
                ,'struct' =>   $this->input->get_post('struct', TRUE)
                ,'allowread' =>   $this->input->get_post('allowread', TRUE)
                ,'allowadd' =>   $this->input->get_post('allowadd', TRUE)
                ,'allowedit' =>   $this->input->get_post('allowedit', TRUE)
                ,'allowdelete' =>   $this->input->get_post('allowdelete', TRUE)
            );
                $instanceid =  $this->input->get_post('instanceid', TRUE);
                $parentid =  $this->input->get_post('parentid', TRUE);
            $structrestriction= $this->m_structrestriction->newRow($instanceid,$parentid,$data);
            $return = $structrestriction;
            print json_encode($return);
    }
    function getRow() {
        log_message('debug', 'STRUCTRESTRICTION.getRow post : '.json_encode($this->input->post(NULL, FALSE)));
        $empId  =  $this->input->get_post('id', TRUE);
        if (isset($empId)) {
            $structrestriction = $this->m_structrestriction->getRow($empId);
            $return = array(
                'success' => true,
                'data'    => $structrestriction
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
            	$sort[] = array('property'=>'struct', 'direction'=>'ASC');
            	$sort = json_encode($sort);
            }
            $parentid=$this->input->get('parentid', FALSE);
            if(isset($parentid)){
                if($parentid!=''){
                    $structrestriction= $this->m_structrestriction->getRowsByParent($parentid,$sort);
                }else{
                    $structrestriction= $this->m_structrestriction->getRows($sort);
                }
            }else{
              $structrestriction= $this->m_structrestriction->getRows($sort);
            }
            $return = array(
                'success' =>  TRUE ,
                'data'    => $structrestriction
            );
        print json_encode($return);
    }
    function getRowsByInstance() {
        log_message('debug', 'STRUCTRESTRICTION.getRowsByInstance post : '.json_encode($this->input->post(NULL, FALSE)));
            $group = $this->input->get('group', FALSE); 
           $sort = $this->input->get('sort', FALSE);
           if(!$sort && $group) $sort = $group;
           if(!$sort || $group == $sort) 
            {
            	$sort = json_decode($sort);
            	$sort[] = array('property'=>'struct', 'direction'=>'ASC');
            	$sort = json_encode($sort);
            }
        $InstId  =  $this->input->get_post('instanceid', TRUE);
        if (strlen($InstId) > 0) {
            $structrestriction= $this->m_structrestriction->getRowsByInstance($InstId,$sort);
            $return = array(
                'success' =>  TRUE ,
                'data'    => $structrestriction
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
        log_message('debug', 'STRUCTRESTRICTION.getRowsByParent post : '.json_encode($this->input->post(NULL, FALSE)));
            $group = $this->input->get('group', FALSE); 
           $sort = $this->input->get('sort', FALSE);
           if(!$sort && $group) $sort = $group;
           if(!$sort || $group == $sort) 
            {
            	$sort = json_decode($sort);
            	$sort[] = array('property'=>'struct', 'direction'=>'ASC');
            	$sort = json_encode($sort);
            }
        $ParentId  =  $this->input->get_post('parentid', TRUE);
        if (strlen($ParentId) > 0) {
            $structrestriction= $this->m_structrestriction->getRowsByParent($ParentId,$sort);
            $return = array(
                'success' => TRUE,
                'data'    => $structrestriction
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
        log_message('debug', 'STRUCTRESTRICTION.deleteRow post : '.json_encode($this->input->post(NULL, FALSE)));
        $tempId  =  $this->input->get_post('structrestrictionid', TRUE);
        if (strlen($tempId) > 0) {
            $return = $this->m_structrestriction->deleteRow($tempId);
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
        $this->load->model('M_structrestriction', 'm_structrestriction');
    }
}
?>
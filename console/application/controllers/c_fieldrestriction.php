<?php
	 class C_fieldrestriction extends CI_Controller {
    function __construct() {
         parent::__construct();
        $this->_loadModels();
    }
    function setRow() {
          log_message('debug', 'FIELDRESTRICTION.setRow post : '.json_encode($this->input->post(NULL, FALSE)));
          log_message('debug', 'FIELDRESTRICTION.getRows get : '.json_encode($this->input->get(NULL, FALSE)));
          $data = array(
                'fieldrestrictionid' =>  $this->input->get_post('fieldrestrictionid', TRUE)
                ,'instanceid' =>  $this->input->get_post('instanceid', TRUE)
                ,'parentid' =>  $this->input->get_post('parentid', TRUE)
                ,'thepart' =>   $this->input->get_post('thepart', TRUE)
                ,'thefield' =>   $this->input->get_post('thefield', TRUE)
                ,'allowread' =>   $this->input->get_post('allowread', TRUE)
                ,'allowmodify' =>   $this->input->get_post('allowmodify', TRUE)
                ,'mandatoryfield' =>   $this->input->get_post('mandatoryfield', TRUE)
            );
            $fieldrestriction = $this->m_fieldrestriction->setRow($data);
            print json_encode($fieldrestriction);
    }
    function newRow() {
            log_message('debug', 'FIELDRESTRICTION.newRow post : '.json_encode($this->input->post(NULL, FALSE)));
          $data = array(
                'fieldrestrictionid' =>  $this->input->get_post('fieldrestrictionid', TRUE)
                ,'instanceid' =>  $this->input->get_post('instanceid', TRUE)
                ,'parentid' =>  $this->input->get_post('parentid', TRUE)
                ,'thepart' =>   $this->input->get_post('thepart', TRUE)
                ,'thefield' =>   $this->input->get_post('thefield', TRUE)
                ,'allowread' =>   $this->input->get_post('allowread', TRUE)
                ,'allowmodify' =>   $this->input->get_post('allowmodify', TRUE)
                ,'mandatoryfield' =>   $this->input->get_post('mandatoryfield', TRUE)
            );
                $instanceid =  $this->input->get_post('instanceid', TRUE);
                $parentid =  $this->input->get_post('parentid', TRUE);
            $fieldrestriction= $this->m_fieldrestriction->newRow($instanceid,$parentid,$data);
            $return = $fieldrestriction;
            print json_encode($return);
    }
    function getRow() {
        log_message('debug', 'FIELDRESTRICTION.getRow post : '.json_encode($this->input->post(NULL, FALSE)));
        $empId  =  $this->input->get_post('id', TRUE);
        if (isset($empId)) {
            $fieldrestriction = $this->m_fieldrestriction->getRow($empId);
            $return = array(
                'success' => true,
                'data'    => $fieldrestriction
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
            	$sort[] = array('property'=>'thepart', 'direction'=>'ASC');
            	$sort = json_encode($sort);
            }
            $parentid=$this->input->get('parentid', FALSE);
            if(isset($parentid)){
                if($parentid!=''){
                    $fieldrestriction= $this->m_fieldrestriction->getRowsByParent($parentid,$sort);
                }else{
                    $fieldrestriction= $this->m_fieldrestriction->getRows($sort);
                }
            }else{
              $fieldrestriction= $this->m_fieldrestriction->getRows($sort);
            }
            $return = array(
                'success' =>  TRUE ,
                'data'    => $fieldrestriction
            );
        print json_encode($return);
    }
    function getRowsByInstance() {
        log_message('debug', 'FIELDRESTRICTION.getRowsByInstance post : '.json_encode($this->input->post(NULL, FALSE)));
            $group = $this->input->get('group', FALSE); 
           $sort = $this->input->get('sort', FALSE);
           if(!$sort && $group) $sort = $group;
           if(!$sort || $group == $sort) 
            {
            	$sort = json_decode($sort);
            	$sort[] = array('property'=>'thepart', 'direction'=>'ASC');
            	$sort = json_encode($sort);
            }
        $InstId  =  $this->input->get_post('instanceid', TRUE);
        if (strlen($InstId) > 0) {
            $fieldrestriction= $this->m_fieldrestriction->getRowsByInstance($InstId,$sort);
            $return = array(
                'success' =>  TRUE ,
                'data'    => $fieldrestriction
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
        log_message('debug', 'FIELDRESTRICTION.getRowsByParent post : '.json_encode($this->input->post(NULL, FALSE)));
            $group = $this->input->get('group', FALSE); 
           $sort = $this->input->get('sort', FALSE);
           if(!$sort && $group) $sort = $group;
           if(!$sort || $group == $sort) 
            {
            	$sort = json_decode($sort);
            	$sort[] = array('property'=>'thepart', 'direction'=>'ASC');
            	$sort = json_encode($sort);
            }
        $ParentId  =  $this->input->get_post('parentid', TRUE);
        if (strlen($ParentId) > 0) {
            $fieldrestriction= $this->m_fieldrestriction->getRowsByParent($ParentId,$sort);
            $return = array(
                'success' => TRUE,
                'data'    => $fieldrestriction
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
        log_message('debug', 'FIELDRESTRICTION.deleteRow post : '.json_encode($this->input->post(NULL, FALSE)));
        $tempId  =  $this->input->get_post('fieldrestrictionid', TRUE);
        if (strlen($tempId) > 0) {
            $return = $this->m_fieldrestriction->deleteRow($tempId);
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
        $this->load->model('M_fieldrestriction', 'm_fieldrestriction');
    }
}
?>
<?php
	 class C_field extends CI_Controller {
    function __construct() {
         parent::__construct();
        $this->_loadModels();
    }
    function setRow() {
          log_message('debug', 'FIELD.setRow post : '.json_encode($this->input->post(NULL, FALSE)));
          log_message('debug', 'FIELD.getRows get : '.json_encode($this->input->get(NULL, FALSE)));
          $data = array(
                'fieldid' =>  $this->input->get_post('fieldid', TRUE)
                ,'instanceid' =>  $this->input->get_post('instanceid', TRUE)
                ,'parentid' =>  $this->input->get_post('parentid', TRUE)
                ,'tabname' =>   $this->input->get_post('tabname', TRUE)
                ,'fieldgroupbox' =>   $this->input->get_post('fieldgroupbox', TRUE)
                ,'sequence' =>   $this->input->get_post('sequence', TRUE)
                ,'caption' =>   $this->input->get_post('caption', TRUE)
                ,'name' =>   $this->input->get_post('name', TRUE)
                ,'fieldtype' =>   $this->input->get_post('fieldtype', TRUE)
                ,'isbrief' =>   $this->input->get_post('isbrief', TRUE)
                ,'istabbrief' =>   $this->input->get_post('istabbrief', TRUE)
                ,'allownull' =>   $this->input->get_post('allownull', TRUE)
                ,'datasize' =>   $this->input->get_post('datasize', TRUE)
                ,'referencetype' =>   $this->input->get_post('referencetype', TRUE)
                ,'reftotype' =>   $this->input->get_post('reftotype', TRUE)
                ,'reftopart' =>   $this->input->get_post('reftopart', TRUE)
                ,'thestyle' =>   $this->input->get_post('thestyle', TRUE)
                ,'internalreference' =>   $this->input->get_post('internalreference', TRUE)
                ,'createrefonly' =>   $this->input->get_post('createrefonly', TRUE)
                ,'isautonumber' =>   $this->input->get_post('isautonumber', TRUE)
                ,'thenumerator' =>   $this->input->get_post('thenumerator', TRUE)
                ,'zonetemplate' =>   $this->input->get_post('zonetemplate', TRUE)
                ,'numberdatefield' =>   $this->input->get_post('numberdatefield', TRUE)
                ,'thecomment' =>   $this->input->get_post('thecomment', TRUE)
                ,'shablonbrief' =>   $this->input->get_post('shablonbrief', TRUE)
                ,'thenameclass' =>   $this->input->get_post('thenameclass', TRUE)
                ,'themask' =>   $this->input->get_post('themask', TRUE)
            );
            $field = $this->m_field->setRow($data);
            print json_encode($field);
    }
    function newRow() {
            log_message('debug', 'FIELD.newRow post : '.json_encode($this->input->post(NULL, FALSE)));
          $data = array(
                'fieldid' =>  $this->input->get_post('fieldid', TRUE)
                ,'instanceid' =>  $this->input->get_post('instanceid', TRUE)
                ,'parentid' =>  $this->input->get_post('parentid', TRUE)
                ,'tabname' =>   $this->input->get_post('tabname', TRUE)
                ,'fieldgroupbox' =>   $this->input->get_post('fieldgroupbox', TRUE)
                ,'sequence' =>   $this->input->get_post('sequence', TRUE)
                ,'caption' =>   $this->input->get_post('caption', TRUE)
                ,'name' =>   $this->input->get_post('name', TRUE)
                ,'fieldtype' =>   $this->input->get_post('fieldtype', TRUE)
                ,'isbrief' =>   $this->input->get_post('isbrief', TRUE)
                ,'istabbrief' =>   $this->input->get_post('istabbrief', TRUE)
                ,'allownull' =>   $this->input->get_post('allownull', TRUE)
                ,'datasize' =>   $this->input->get_post('datasize', TRUE)
                ,'referencetype' =>   $this->input->get_post('referencetype', TRUE)
                ,'reftotype' =>   $this->input->get_post('reftotype', TRUE)
                ,'reftopart' =>   $this->input->get_post('reftopart', TRUE)
                ,'thestyle' =>   $this->input->get_post('thestyle', TRUE)
                ,'internalreference' =>   $this->input->get_post('internalreference', TRUE)
                ,'createrefonly' =>   $this->input->get_post('createrefonly', TRUE)
                ,'isautonumber' =>   $this->input->get_post('isautonumber', TRUE)
                ,'thenumerator' =>   $this->input->get_post('thenumerator', TRUE)
                ,'zonetemplate' =>   $this->input->get_post('zonetemplate', TRUE)
                ,'numberdatefield' =>   $this->input->get_post('numberdatefield', TRUE)
                ,'thecomment' =>   $this->input->get_post('thecomment', TRUE)
                ,'shablonbrief' =>   $this->input->get_post('shablonbrief', TRUE)
                ,'thenameclass' =>   $this->input->get_post('thenameclass', TRUE)
                ,'themask' =>   $this->input->get_post('themask', TRUE)
            );
                $instanceid =  $this->input->get_post('instanceid', TRUE);
                $parentid =  $this->input->get_post('parentid', TRUE);
            $field= $this->m_field->newRow($instanceid,$parentid,$data);
            $return = $field;
            print json_encode($return);
    }
    function getRow() {
        log_message('debug', 'FIELD.getRow post : '.json_encode($this->input->post(NULL, FALSE)));
        $empId  =  $this->input->get_post('id', TRUE);
        if (isset($empId)) {
            $field = $this->m_field->getRow($empId);
            $return = array(
                'success' => true,
                'data'    => $field
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
                    $field= $this->m_field->getRowsByParent($parentid,$sort);
                }else{
                    $field= $this->m_field->getRows($sort);
                }
            }else{
              $field= $this->m_field->getRows($sort);
            }
            $return = array(
                'success' =>  TRUE ,
                'data'    => $field
            );
        print json_encode($return);
    }
    function getRowsByInstance() {
        log_message('debug', 'FIELD.getRowsByInstance post : '.json_encode($this->input->post(NULL, FALSE)));
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
            $field= $this->m_field->getRowsByInstance($InstId,$sort);
            $return = array(
                'success' =>  TRUE ,
                'data'    => $field
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
        log_message('debug', 'FIELD.getRowsByParent post : '.json_encode($this->input->post(NULL, FALSE)));
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
            $field= $this->m_field->getRowsByParent($ParentId,$sort);
            $return = array(
                'success' => TRUE,
                'data'    => $field
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
        log_message('debug', 'FIELD.deleteRow post : '.json_encode($this->input->post(NULL, FALSE)));
        $tempId  =  $this->input->get_post('fieldid', TRUE);
        if (strlen($tempId) > 0) {
            $return = $this->m_field->deleteRow($tempId);
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
        $this->load->model('M_field', 'm_field');
    }
}
?>
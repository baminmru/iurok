<?php
	 class C_fieldtypemap extends CI_Controller {
    function __construct() {
         parent::__construct();
        $this->_loadModels();
    }
    function setRow() {
          log_message('debug', 'FIELDTYPEMAP.setRow post : '.json_encode($this->input->post(NULL, FALSE)));
          log_message('debug', 'FIELDTYPEMAP.getRows get : '.json_encode($this->input->get(NULL, FALSE)));
          $data = array(
                'fieldtypemapid' =>  $this->input->get_post('fieldtypemapid', TRUE)
                ,'instanceid' =>  $this->input->get_post('instanceid', TRUE)
                ,'parentid' =>  $this->input->get_post('parentid', TRUE)
                ,'target' =>   $this->input->get_post('target', TRUE)
                ,'stoagetype' =>   $this->input->get_post('stoagetype', TRUE)
                ,'fixedsize' =>   $this->input->get_post('fixedsize', TRUE)
            );
            $fieldtypemap = $this->m_fieldtypemap->setRow($data);
            print json_encode($fieldtypemap);
    }
    function newRow() {
            log_message('debug', 'FIELDTYPEMAP.newRow post : '.json_encode($this->input->post(NULL, FALSE)));
          $data = array(
                'fieldtypemapid' =>  $this->input->get_post('fieldtypemapid', TRUE)
                ,'instanceid' =>  $this->input->get_post('instanceid', TRUE)
                ,'parentid' =>  $this->input->get_post('parentid', TRUE)
                ,'target' =>   $this->input->get_post('target', TRUE)
                ,'stoagetype' =>   $this->input->get_post('stoagetype', TRUE)
                ,'fixedsize' =>   $this->input->get_post('fixedsize', TRUE)
            );
                $instanceid =  $this->input->get_post('instanceid', TRUE);
                $parentid =  $this->input->get_post('parentid', TRUE);
            $fieldtypemap= $this->m_fieldtypemap->newRow($instanceid,$parentid,$data);
            $return = $fieldtypemap;
            print json_encode($return);
    }
    function getRow() {
        log_message('debug', 'FIELDTYPEMAP.getRow post : '.json_encode($this->input->post(NULL, FALSE)));
        $empId  =  $this->input->get_post('id', TRUE);
        if (isset($empId)) {
            $fieldtypemap = $this->m_fieldtypemap->getRow($empId);
            $return = array(
                'success' => true,
                'data'    => $fieldtypemap
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
                    $fieldtypemap= $this->m_fieldtypemap->getRowsByParent($parentid,$sort);
                }else{
                    $fieldtypemap= $this->m_fieldtypemap->getRows($sort);
                }
            }else{
              $fieldtypemap= $this->m_fieldtypemap->getRows($sort);
            }
            $return = array(
                'success' =>  TRUE ,
                'data'    => $fieldtypemap
            );
        print json_encode($return);
    }
    function getRowsByInstance() {
        log_message('debug', 'FIELDTYPEMAP.getRowsByInstance post : '.json_encode($this->input->post(NULL, FALSE)));
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
            $fieldtypemap= $this->m_fieldtypemap->getRowsByInstance($InstId,$sort);
            $return = array(
                'success' =>  TRUE ,
                'data'    => $fieldtypemap
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
        log_message('debug', 'FIELDTYPEMAP.getRowsByParent post : '.json_encode($this->input->post(NULL, FALSE)));
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
            $fieldtypemap= $this->m_fieldtypemap->getRowsByParent($ParentId,$sort);
            $return = array(
                'success' => TRUE,
                'data'    => $fieldtypemap
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
        log_message('debug', 'FIELDTYPEMAP.deleteRow post : '.json_encode($this->input->post(NULL, FALSE)));
        $tempId  =  $this->input->get_post('fieldtypemapid', TRUE);
        if (strlen($tempId) > 0) {
            $return = $this->m_fieldtypemap->deleteRow($tempId);
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
        $this->load->model('M_fieldtypemap', 'm_fieldtypemap');
    }
}
?>
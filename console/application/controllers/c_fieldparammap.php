<?php
	 class C_fieldparammap extends CI_Controller {
    function __construct() {
         parent::__construct();
        $this->_loadModels();
    }
    function setRow() {
          log_message('debug', 'FIELDPARAMMAP.setRow post : '.json_encode($this->input->post(NULL, FALSE)));
          log_message('debug', 'FIELDPARAMMAP.getRows get : '.json_encode($this->input->get(NULL, FALSE)));
          $data = array(
                'fieldparammapid' =>  $this->input->get_post('fieldparammapid', TRUE)
                ,'instanceid' =>  $this->input->get_post('instanceid', TRUE)
                ,'parentid' =>  $this->input->get_post('parentid', TRUE)
                ,'fieldname' =>   $this->input->get_post('fieldname', TRUE)
                ,'paramname' =>   $this->input->get_post('paramname', TRUE)
                ,'noedit' =>   $this->input->get_post('noedit', TRUE)
            );
            $fieldparammap = $this->m_fieldparammap->setRow($data);
            print json_encode($fieldparammap);
    }
    function newRow() {
            log_message('debug', 'FIELDPARAMMAP.newRow post : '.json_encode($this->input->post(NULL, FALSE)));
          $data = array(
                'fieldparammapid' =>  $this->input->get_post('fieldparammapid', TRUE)
                ,'instanceid' =>  $this->input->get_post('instanceid', TRUE)
                ,'parentid' =>  $this->input->get_post('parentid', TRUE)
                ,'fieldname' =>   $this->input->get_post('fieldname', TRUE)
                ,'paramname' =>   $this->input->get_post('paramname', TRUE)
                ,'noedit' =>   $this->input->get_post('noedit', TRUE)
            );
                $instanceid =  $this->input->get_post('instanceid', TRUE);
                $parentid =  $this->input->get_post('parentid', TRUE);
            $fieldparammap= $this->m_fieldparammap->newRow($instanceid,$parentid,$data);
            $return = $fieldparammap;
            print json_encode($return);
    }
    function getRow() {
        log_message('debug', 'FIELDPARAMMAP.getRow post : '.json_encode($this->input->post(NULL, FALSE)));
        $empId  =  $this->input->get_post('id', TRUE);
        if (isset($empId)) {
            $fieldparammap = $this->m_fieldparammap->getRow($empId);
            $return = array(
                'success' => true,
                'data'    => $fieldparammap
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
            	$sort[] = array('property'=>'fieldname', 'direction'=>'ASC');
            	$sort = json_encode($sort);
            }
            $parentid=$this->input->get('parentid', FALSE);
            if(isset($parentid)){
                if($parentid!=''){
                    $fieldparammap= $this->m_fieldparammap->getRowsByParent($parentid,$sort);
                }else{
                    $fieldparammap= $this->m_fieldparammap->getRows($sort);
                }
            }else{
              $fieldparammap= $this->m_fieldparammap->getRows($sort);
            }
            $return = array(
                'success' =>  TRUE ,
                'data'    => $fieldparammap
            );
        print json_encode($return);
    }
    function getRowsByInstance() {
        log_message('debug', 'FIELDPARAMMAP.getRowsByInstance post : '.json_encode($this->input->post(NULL, FALSE)));
            $group = $this->input->get('group', FALSE); 
           $sort = $this->input->get('sort', FALSE);
           if(!$sort && $group) $sort = $group;
           if(!$sort || $group == $sort) 
            {
            	$sort = json_decode($sort);
            	$sort[] = array('property'=>'fieldname', 'direction'=>'ASC');
            	$sort = json_encode($sort);
            }
        $InstId  =  $this->input->get_post('instanceid', TRUE);
        if (strlen($InstId) > 0) {
            $fieldparammap= $this->m_fieldparammap->getRowsByInstance($InstId,$sort);
            $return = array(
                'success' =>  TRUE ,
                'data'    => $fieldparammap
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
        log_message('debug', 'FIELDPARAMMAP.getRowsByParent post : '.json_encode($this->input->post(NULL, FALSE)));
            $group = $this->input->get('group', FALSE); 
           $sort = $this->input->get('sort', FALSE);
           if(!$sort && $group) $sort = $group;
           if(!$sort || $group == $sort) 
            {
            	$sort = json_decode($sort);
            	$sort[] = array('property'=>'fieldname', 'direction'=>'ASC');
            	$sort = json_encode($sort);
            }
        $ParentId  =  $this->input->get_post('parentid', TRUE);
        if (strlen($ParentId) > 0) {
            $fieldparammap= $this->m_fieldparammap->getRowsByParent($ParentId,$sort);
            $return = array(
                'success' => TRUE,
                'data'    => $fieldparammap
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
        log_message('debug', 'FIELDPARAMMAP.deleteRow post : '.json_encode($this->input->post(NULL, FALSE)));
        $tempId  =  $this->input->get_post('fieldparammapid', TRUE);
        if (strlen($tempId) > 0) {
            $return = $this->m_fieldparammap->deleteRow($tempId);
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
        $this->load->model('M_fieldparammap', 'm_fieldparammap');
    }
}
?>
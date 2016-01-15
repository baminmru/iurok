<?php
	 class C_partparammap extends CI_Controller {
    function __construct() {
         parent::__construct();
        $this->_loadModels();
    }
    function setRow() {
          log_message('debug', 'PARTPARAMMAP.setRow post : '.json_encode($this->input->post(NULL, FALSE)));
          log_message('debug', 'PARTPARAMMAP.getRows get : '.json_encode($this->input->get(NULL, FALSE)));
          $data = array(
                'partparammapid' =>  $this->input->get_post('partparammapid', TRUE)
                ,'instanceid' =>  $this->input->get_post('instanceid', TRUE)
                ,'parentid' =>  $this->input->get_post('parentid', TRUE)
                ,'fieldname' =>   $this->input->get_post('fieldname', TRUE)
                ,'paramname' =>   $this->input->get_post('paramname', TRUE)
                ,'noedit' =>   $this->input->get_post('noedit', TRUE)
            );
            $partparammap = $this->m_partparammap->setRow($data);
            print json_encode($partparammap);
    }
    function newRow() {
            log_message('debug', 'PARTPARAMMAP.newRow post : '.json_encode($this->input->post(NULL, FALSE)));
          $data = array(
                'partparammapid' =>  $this->input->get_post('partparammapid', TRUE)
                ,'instanceid' =>  $this->input->get_post('instanceid', TRUE)
                ,'parentid' =>  $this->input->get_post('parentid', TRUE)
                ,'fieldname' =>   $this->input->get_post('fieldname', TRUE)
                ,'paramname' =>   $this->input->get_post('paramname', TRUE)
                ,'noedit' =>   $this->input->get_post('noedit', TRUE)
            );
                $instanceid =  $this->input->get_post('instanceid', TRUE);
                $parentid =  $this->input->get_post('parentid', TRUE);
            $partparammap= $this->m_partparammap->newRow($instanceid,$parentid,$data);
            $return = $partparammap;
            print json_encode($return);
    }
    function getRow() {
        log_message('debug', 'PARTPARAMMAP.getRow post : '.json_encode($this->input->post(NULL, FALSE)));
        $empId  =  $this->input->get_post('id', TRUE);
        if (isset($empId)) {
            $partparammap = $this->m_partparammap->getRow($empId);
            $return = array(
                'success' => true,
                'data'    => $partparammap
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
                    $partparammap= $this->m_partparammap->getRowsByParent($parentid,$sort);
                }else{
                    $partparammap= $this->m_partparammap->getRows($sort);
                }
            }else{
              $partparammap= $this->m_partparammap->getRows($sort);
            }
            $return = array(
                'success' =>  TRUE ,
                'data'    => $partparammap
            );
        print json_encode($return);
    }
    function getRowsByInstance() {
        log_message('debug', 'PARTPARAMMAP.getRowsByInstance post : '.json_encode($this->input->post(NULL, FALSE)));
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
            $partparammap= $this->m_partparammap->getRowsByInstance($InstId,$sort);
            $return = array(
                'success' =>  TRUE ,
                'data'    => $partparammap
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
        log_message('debug', 'PARTPARAMMAP.getRowsByParent post : '.json_encode($this->input->post(NULL, FALSE)));
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
            $partparammap= $this->m_partparammap->getRowsByParent($ParentId,$sort);
            $return = array(
                'success' => TRUE,
                'data'    => $partparammap
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
        log_message('debug', 'PARTPARAMMAP.deleteRow post : '.json_encode($this->input->post(NULL, FALSE)));
        $tempId  =  $this->input->get_post('partparammapid', TRUE);
        if (strlen($tempId) > 0) {
            $return = $this->m_partparammap->deleteRow($tempId);
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
        $this->load->model('M_partparammap', 'm_partparammap');
    }
}
?>
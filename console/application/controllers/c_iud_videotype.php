<?php
	 class C_iud_videotype extends CI_Controller {
    function __construct() {
         parent::__construct();
        $this->_loadModels();
    }
    function setRow() {
          log_message('debug', 'iud_videotype.setRow post : '.json_encode($this->input->post(NULL, FALSE)));
          log_message('debug', 'iud_videotype.getRows get : '.json_encode($this->input->get(NULL, FALSE)));
          $data = array(
                'iud_videotypeid' =>  $this->input->get_post('iud_videotypeid', TRUE)
                ,'instanceid' =>  $this->input->get_post('instanceid', TRUE)
                ,'sequence' =>   $this->input->get_post('sequence', TRUE)
                ,'filetype' =>   $this->input->get_post('filetype', TRUE)
                ,'name' =>   $this->input->get_post('name', TRUE)
                ,'versionpolicy' =>   $this->input->get_post('versionpolicy', TRUE)
                ,'nocomments' =>   $this->input->get_post('nocomments', TRUE)
            );
            $iud_videotype = $this->m_iud_videotype->setRow($data);
            print json_encode($iud_videotype);
    }
    function newRow() {
            log_message('debug', 'iud_videotype.newRow post : '.json_encode($this->input->post(NULL, FALSE)));
          $data = array(
                'iud_videotypeid' =>  $this->input->get_post('iud_videotypeid', TRUE)
                ,'instanceid' =>  $this->input->get_post('instanceid', TRUE)
                ,'sequence' =>   $this->input->get_post('sequence', TRUE)
                ,'filetype' =>   $this->input->get_post('filetype', TRUE)
                ,'name' =>   $this->input->get_post('name', TRUE)
                ,'versionpolicy' =>   $this->input->get_post('versionpolicy', TRUE)
                ,'nocomments' =>   $this->input->get_post('nocomments', TRUE)
            );
                $instanceid =  $this->input->get_post('instanceid', TRUE);
            $iud_videotype= $this->m_iud_videotype->newRow($instanceid,$data);
            $return = $iud_videotype;
            print json_encode($return);
    }
    function getRow() {
        log_message('debug', 'iud_videotype.getRow post : '.json_encode($this->input->post(NULL, FALSE)));
        $empId  =  $this->input->get_post('id', TRUE);
        if (isset($empId)) {
            $iud_videotype = $this->m_iud_videotype->getRow($empId);
            $return = array(
                'success' => true,
                'data'    => $iud_videotype
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
            $instanceid=$this->input->get('instanceid', FALSE);
            if(isset($instanceid)){
                if($instanceid!=''){
                    $iud_videotype= $this->m_iud_videotype->getRowsByInstance($instanceid,$sort);
                }else{
                    $iud_videotype= $this->m_iud_videotype->getRows($sort);
                }
            }else{
              $iud_videotype= $this->m_iud_videotype->getRows($sort);
            }
            $return = array(
                'success' =>  TRUE ,
                'data'    => $iud_videotype
            );
        print json_encode($return);
    }
    function getRowsByInstance() {
        log_message('debug', 'iud_videotype.getRowsByInstance post : '.json_encode($this->input->post(NULL, FALSE)));
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
            $iud_videotype= $this->m_iud_videotype->getRowsByInstance($InstId,$sort);
            $return = array(
                'success' =>  TRUE ,
                'data'    => $iud_videotype
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
        log_message('debug', 'iud_videotype.getRowsByParent post : '.json_encode($this->input->post(NULL, FALSE)));
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
            $iud_videotype= $this->m_iud_videotype->getRowsByParent($ParentId,$sort);
            $return = array(
                'success' => TRUE,
                'data'    => $iud_videotype
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
        log_message('debug', 'iud_videotype.deleteRow post : '.json_encode($this->input->post(NULL, FALSE)));
        $tempId  =  $this->input->get_post('iud_videotypeid', TRUE);
        if (strlen($tempId) > 0) {
            $return = $this->m_iud_videotype->deleteRow($tempId);
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
        $this->load->model('M_iud_videotype', 'm_iud_videotype');
    }
}
?>
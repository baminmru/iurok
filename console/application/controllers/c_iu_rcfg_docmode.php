<?php
	 class C_iu_rcfg_docmode extends CI_Controller {
    function __construct() {
         parent::__construct();
        $this->_loadModels();
    }
    function setRow() {
          log_message('debug', 'iu_rcfg_docmode.setRow post : '.json_encode($this->input->post(NULL, FALSE)));
          log_message('debug', 'iu_rcfg_docmode.getRows get : '.json_encode($this->input->get(NULL, FALSE)));
          $data = array(
                'iu_rcfg_docmodeid' =>  $this->input->get_post('iu_rcfg_docmodeid', TRUE)
                ,'instanceid' =>  $this->input->get_post('instanceid', TRUE)
                ,'the_document' =>   $this->input->get_post('the_document', TRUE)
                ,'addmode' =>   $this->input->get_post('addmode', TRUE)
                ,'editmode' =>   $this->input->get_post('editmode', TRUE)
                ,'allowadd' =>   $this->input->get_post('allowadd', TRUE)
                ,'allowdelete' =>   $this->input->get_post('allowdelete', TRUE)
                ,'allowdelegate' =>   $this->input->get_post('allowdelegate', TRUE)
            );
            $iu_rcfg_docmode = $this->m_iu_rcfg_docmode->setRow($data);
            print json_encode($iu_rcfg_docmode);
    }
    function newRow() {
            log_message('debug', 'iu_rcfg_docmode.newRow post : '.json_encode($this->input->post(NULL, FALSE)));
          $data = array(
                'iu_rcfg_docmodeid' =>  $this->input->get_post('iu_rcfg_docmodeid', TRUE)
                ,'instanceid' =>  $this->input->get_post('instanceid', TRUE)
                ,'the_document' =>   $this->input->get_post('the_document', TRUE)
                ,'addmode' =>   $this->input->get_post('addmode', TRUE)
                ,'editmode' =>   $this->input->get_post('editmode', TRUE)
                ,'allowadd' =>   $this->input->get_post('allowadd', TRUE)
                ,'allowdelete' =>   $this->input->get_post('allowdelete', TRUE)
                ,'allowdelegate' =>   $this->input->get_post('allowdelegate', TRUE)
            );
                $instanceid =  $this->input->get_post('instanceid', TRUE);
            $iu_rcfg_docmode= $this->m_iu_rcfg_docmode->newRow($instanceid,$data);
            $return = $iu_rcfg_docmode;
            print json_encode($return);
    }
    function getRow() {
        log_message('debug', 'iu_rcfg_docmode.getRow post : '.json_encode($this->input->post(NULL, FALSE)));
        $empId  =  $this->input->get_post('id', TRUE);
        if (isset($empId)) {
            $iu_rcfg_docmode = $this->m_iu_rcfg_docmode->getRow($empId);
            $return = array(
                'success' => true,
                'data'    => $iu_rcfg_docmode
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
            	$sort[] = array('property'=>'the_document', 'direction'=>'ASC');
            	$sort = json_encode($sort);
            }
            $instanceid=$this->input->get('instanceid', FALSE);
            if(isset($instanceid)){
                if($instanceid!=''){
                    $iu_rcfg_docmode= $this->m_iu_rcfg_docmode->getRowsByInstance($instanceid,$sort);
                }else{
                    $iu_rcfg_docmode= $this->m_iu_rcfg_docmode->getRows($sort);
                }
            }else{
              $iu_rcfg_docmode= $this->m_iu_rcfg_docmode->getRows($sort);
            }
            $return = array(
                'success' =>  TRUE ,
                'data'    => $iu_rcfg_docmode
            );
        print json_encode($return);
    }
    function getRowsByInstance() {
        log_message('debug', 'iu_rcfg_docmode.getRowsByInstance post : '.json_encode($this->input->post(NULL, FALSE)));
            $group = $this->input->get('group', FALSE); 
           $sort = $this->input->get('sort', FALSE);
           if(!$sort && $group) $sort = $group;
           if(!$sort || $group == $sort) 
            {
            	$sort = json_decode($sort);
            	$sort[] = array('property'=>'the_document', 'direction'=>'ASC');
            	$sort = json_encode($sort);
            }
        $InstId  =  $this->input->get_post('instanceid', TRUE);
        if (strlen($InstId) > 0) {
            $iu_rcfg_docmode= $this->m_iu_rcfg_docmode->getRowsByInstance($InstId,$sort);
            $return = array(
                'success' =>  TRUE ,
                'data'    => $iu_rcfg_docmode
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
        log_message('debug', 'iu_rcfg_docmode.getRowsByParent post : '.json_encode($this->input->post(NULL, FALSE)));
            $group = $this->input->get('group', FALSE); 
           $sort = $this->input->get('sort', FALSE);
           if(!$sort && $group) $sort = $group;
           if(!$sort || $group == $sort) 
            {
            	$sort = json_decode($sort);
            	$sort[] = array('property'=>'the_document', 'direction'=>'ASC');
            	$sort = json_encode($sort);
            }
        $ParentId  =  $this->input->get_post('parentid', TRUE);
        if (strlen($ParentId) > 0) {
            $iu_rcfg_docmode= $this->m_iu_rcfg_docmode->getRowsByParent($ParentId,$sort);
            $return = array(
                'success' => TRUE,
                'data'    => $iu_rcfg_docmode
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
        log_message('debug', 'iu_rcfg_docmode.deleteRow post : '.json_encode($this->input->post(NULL, FALSE)));
        $tempId  =  $this->input->get_post('iu_rcfg_docmodeid', TRUE);
        if (strlen($tempId) > 0) {
            $return = $this->m_iu_rcfg_docmode->deleteRow($tempId);
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
        $this->load->model('M_iu_rcfg_docmode', 'm_iu_rcfg_docmode');
    }
}
?>
<?php
	 class C_iu_urok_docs extends CI_Controller {
    function __construct() {
         parent::__construct();
        $this->_loadModels();
    }
    function setRow() {
          log_message('debug', 'iu_urok_docs.setRow post : '.json_encode($this->input->post(NULL, FALSE)));
          log_message('debug', 'iu_urok_docs.getRows get : '.json_encode($this->input->get(NULL, FALSE)));
          $data = array(
                'iu_urok_docsid' =>  $this->input->get_post('iu_urok_docsid', TRUE)
                ,'instanceid' =>  $this->input->get_post('instanceid', TRUE)
                ,'doctype' =>   $this->input->get_post('doctype', TRUE)
                ,'addby' =>   $this->input->get_post('addby', TRUE)
                ,'adddate' =>   $this->input->get_post('adddate', TRUE)
                ,'version' =>   $this->input->get_post('version', TRUE)
                ,'activeversion' =>   $this->input->get_post('activeversion', TRUE)
                ,'filereftype' =>   $this->input->get_post('filereftype', TRUE)
                ,'fileref' =>   $this->input->get_post('fileref', TRUE)
                ,'fileref_ext' =>   $this->input->get_post('fileref_ext', TRUE)
                ,'fileurl' =>   $this->input->get_post('fileurl', TRUE)
                ,'filetext' =>   $this->input->get_post('filetext', TRUE)
                ,'info' =>   $this->input->get_post('info', TRUE)
                ,'origname' =>   $this->input->get_post('origname', TRUE)
            );
            $iu_urok_docs = $this->m_iu_urok_docs->setRow($data);
            print json_encode($iu_urok_docs);
    }
    function newRow() {
            log_message('debug', 'iu_urok_docs.newRow post : '.json_encode($this->input->post(NULL, FALSE)));
          $data = array(
                'iu_urok_docsid' =>  $this->input->get_post('iu_urok_docsid', TRUE)
                ,'instanceid' =>  $this->input->get_post('instanceid', TRUE)
                ,'doctype' =>   $this->input->get_post('doctype', TRUE)
                ,'addby' =>   $this->input->get_post('addby', TRUE)
                ,'adddate' =>   $this->input->get_post('adddate', TRUE)
                ,'version' =>   $this->input->get_post('version', TRUE)
                ,'activeversion' =>   $this->input->get_post('activeversion', TRUE)
                ,'filereftype' =>   $this->input->get_post('filereftype', TRUE)
                ,'fileref' =>   $this->input->get_post('fileref', TRUE)
                ,'fileref_ext' =>   $this->input->get_post('fileref_ext', TRUE)
                ,'fileurl' =>   $this->input->get_post('fileurl', TRUE)
                ,'filetext' =>   $this->input->get_post('filetext', TRUE)
                ,'info' =>   $this->input->get_post('info', TRUE)
                ,'origname' =>   $this->input->get_post('origname', TRUE)
            );
                $instanceid =  $this->input->get_post('instanceid', TRUE);
            $iu_urok_docs= $this->m_iu_urok_docs->newRow($instanceid,$data);
            $return = $iu_urok_docs;
            print json_encode($return);
    }
    function getRow() {
        log_message('debug', 'iu_urok_docs.getRow post : '.json_encode($this->input->post(NULL, FALSE)));
        $empId  =  $this->input->get_post('id', TRUE);
        if (isset($empId)) {
            $iu_urok_docs = $this->m_iu_urok_docs->getRow($empId);
            $return = array(
                'success' => true,
                'data'    => $iu_urok_docs
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
            	$sort[] = array('property'=>'doctype', 'direction'=>'ASC');
            	$sort = json_encode($sort);
            }
            $instanceid=$this->input->get('instanceid', FALSE);
            if(isset($instanceid)){
                if($instanceid!=''){
                    $iu_urok_docs= $this->m_iu_urok_docs->getRowsByInstance($instanceid,$sort);
                }else{
                    $iu_urok_docs= $this->m_iu_urok_docs->getRows($sort);
                }
            }else{
              $iu_urok_docs= $this->m_iu_urok_docs->getRows($sort);
            }
            $return = array(
                'success' =>  TRUE ,
                'data'    => $iu_urok_docs
            );
        print json_encode($return);
    }
    function getRowsByInstance() {
        log_message('debug', 'iu_urok_docs.getRowsByInstance post : '.json_encode($this->input->post(NULL, FALSE)));
            $group = $this->input->get('group', FALSE); 
           $sort = $this->input->get('sort', FALSE);
           if(!$sort && $group) $sort = $group;
           if(!$sort || $group == $sort) 
            {
            	$sort = json_decode($sort);
            	$sort[] = array('property'=>'doctype', 'direction'=>'ASC');
            	$sort = json_encode($sort);
            }
        $InstId  =  $this->input->get_post('instanceid', TRUE);
        if (strlen($InstId) > 0) {
            $iu_urok_docs= $this->m_iu_urok_docs->getRowsByInstance($InstId,$sort);
            $return = array(
                'success' =>  TRUE ,
                'data'    => $iu_urok_docs
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
        log_message('debug', 'iu_urok_docs.getRowsByParent post : '.json_encode($this->input->post(NULL, FALSE)));
            $group = $this->input->get('group', FALSE); 
           $sort = $this->input->get('sort', FALSE);
           if(!$sort && $group) $sort = $group;
           if(!$sort || $group == $sort) 
            {
            	$sort = json_decode($sort);
            	$sort[] = array('property'=>'doctype', 'direction'=>'ASC');
            	$sort = json_encode($sort);
            }
        $ParentId  =  $this->input->get_post('parentid', TRUE);
        if (strlen($ParentId) > 0) {
            $iu_urok_docs= $this->m_iu_urok_docs->getRowsByParent($ParentId,$sort);
            $return = array(
                'success' => TRUE,
                'data'    => $iu_urok_docs
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
        log_message('debug', 'iu_urok_docs.deleteRow post : '.json_encode($this->input->post(NULL, FALSE)));
        $tempId  =  $this->input->get_post('iu_urok_docsid', TRUE);
        if (strlen($tempId) > 0) {
            $return = $this->m_iu_urok_docs->deleteRow($tempId);
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
        $this->load->model('M_iu_urok_docs', 'm_iu_urok_docs');
    }
}
?>
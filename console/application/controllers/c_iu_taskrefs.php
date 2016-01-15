<?php
	 class C_iu_taskrefs extends CI_Controller {
    function __construct() {
         parent::__construct();
        $this->_loadModels();
    }
    function setRow() {
          log_message('debug', 'iu_taskrefs.setRow post : '.json_encode($this->input->post(NULL, FALSE)));
          log_message('debug', 'iu_taskrefs.getRows get : '.json_encode($this->input->get(NULL, FALSE)));
          $data = array(
                'iu_taskrefsid' =>  $this->input->get_post('iu_taskrefsid', TRUE)
                ,'instanceid' =>  $this->input->get_post('instanceid', TRUE)
                ,'dtypename' =>   $this->input->get_post('dtypename', TRUE)
                ,'filereftype' =>   $this->input->get_post('filereftype', TRUE)
                ,'theref' =>   $this->input->get_post('theref', TRUE)
                ,'theref_ext' =>   $this->input->get_post('theref_ext', TRUE)
                ,'fileurl' =>   $this->input->get_post('fileurl', TRUE)
                ,'filetext' =>   $this->input->get_post('filetext', TRUE)
                ,'info' =>   $this->input->get_post('info', TRUE)
                ,'version' =>   $this->input->get_post('version', TRUE)
                ,'addby' =>   $this->input->get_post('addby', TRUE)
                ,'adddate' =>   $this->input->get_post('adddate', TRUE)
                ,'origname' =>   $this->input->get_post('origname', TRUE)
            );
            $iu_taskrefs = $this->m_iu_taskrefs->setRow($data);
            print json_encode($iu_taskrefs);
    }
    function newRow() {
            log_message('debug', 'iu_taskrefs.newRow post : '.json_encode($this->input->post(NULL, FALSE)));
          $data = array(
                'iu_taskrefsid' =>  $this->input->get_post('iu_taskrefsid', TRUE)
                ,'instanceid' =>  $this->input->get_post('instanceid', TRUE)
                ,'dtypename' =>   $this->input->get_post('dtypename', TRUE)
                ,'filereftype' =>   $this->input->get_post('filereftype', TRUE)
                ,'theref' =>   $this->input->get_post('theref', TRUE)
                ,'theref_ext' =>   $this->input->get_post('theref_ext', TRUE)
                ,'fileurl' =>   $this->input->get_post('fileurl', TRUE)
                ,'filetext' =>   $this->input->get_post('filetext', TRUE)
                ,'info' =>   $this->input->get_post('info', TRUE)
                ,'version' =>   $this->input->get_post('version', TRUE)
                ,'addby' =>   $this->input->get_post('addby', TRUE)
                ,'adddate' =>   $this->input->get_post('adddate', TRUE)
                ,'origname' =>   $this->input->get_post('origname', TRUE)
            );
                $instanceid =  $this->input->get_post('instanceid', TRUE);
            $iu_taskrefs= $this->m_iu_taskrefs->newRow($instanceid,$data);
            $return = $iu_taskrefs;
            print json_encode($return);
    }
    function getRow() {
        log_message('debug', 'iu_taskrefs.getRow post : '.json_encode($this->input->post(NULL, FALSE)));
        $empId  =  $this->input->get_post('id', TRUE);
        if (isset($empId)) {
            $iu_taskrefs = $this->m_iu_taskrefs->getRow($empId);
            $return = array(
                'success' => true,
                'data'    => $iu_taskrefs
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
            	$sort[] = array('property'=>'info', 'direction'=>'ASC');
            	$sort = json_encode($sort);
            }
            $instanceid=$this->input->get('instanceid', FALSE);
            if(isset($instanceid)){
                if($instanceid!=''){
                    $iu_taskrefs= $this->m_iu_taskrefs->getRowsByInstance($instanceid,$sort);
                }else{
                    $iu_taskrefs= $this->m_iu_taskrefs->getRows($sort);
                }
            }else{
              $iu_taskrefs= $this->m_iu_taskrefs->getRows($sort);
            }
            $return = array(
                'success' =>  TRUE ,
                'data'    => $iu_taskrefs
            );
        print json_encode($return);
    }
    function getRowsByInstance() {
        log_message('debug', 'iu_taskrefs.getRowsByInstance post : '.json_encode($this->input->post(NULL, FALSE)));
            $group = $this->input->get('group', FALSE); 
           $sort = $this->input->get('sort', FALSE);
           if(!$sort && $group) $sort = $group;
           if(!$sort || $group == $sort) 
            {
            	$sort = json_decode($sort);
            	$sort[] = array('property'=>'info', 'direction'=>'ASC');
            	$sort = json_encode($sort);
            }
        $InstId  =  $this->input->get_post('instanceid', TRUE);
        if (strlen($InstId) > 0) {
            $iu_taskrefs= $this->m_iu_taskrefs->getRowsByInstance($InstId,$sort);
            $return = array(
                'success' =>  TRUE ,
                'data'    => $iu_taskrefs
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
        log_message('debug', 'iu_taskrefs.getRowsByParent post : '.json_encode($this->input->post(NULL, FALSE)));
            $group = $this->input->get('group', FALSE); 
           $sort = $this->input->get('sort', FALSE);
           if(!$sort && $group) $sort = $group;
           if(!$sort || $group == $sort) 
            {
            	$sort = json_decode($sort);
            	$sort[] = array('property'=>'info', 'direction'=>'ASC');
            	$sort = json_encode($sort);
            }
        $ParentId  =  $this->input->get_post('parentid', TRUE);
        if (strlen($ParentId) > 0) {
            $iu_taskrefs= $this->m_iu_taskrefs->getRowsByParent($ParentId,$sort);
            $return = array(
                'success' => TRUE,
                'data'    => $iu_taskrefs
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
        log_message('debug', 'iu_taskrefs.deleteRow post : '.json_encode($this->input->post(NULL, FALSE)));
        $tempId  =  $this->input->get_post('iu_taskrefsid', TRUE);
        if (strlen($tempId) > 0) {
            $return = $this->m_iu_taskrefs->deleteRow($tempId);
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
        $this->load->model('M_iu_taskrefs', 'm_iu_taskrefs');
    }
}
?>
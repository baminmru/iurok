<?php
	 class C_iu_taskattach extends CI_Controller {
    function __construct() {
         parent::__construct();
        $this->_loadModels();
    }
    function setRow() {
          log_message('debug', 'iu_taskattach.setRow post : '.json_encode($this->input->post(NULL, FALSE)));
          log_message('debug', 'iu_taskattach.getRows get : '.json_encode($this->input->get(NULL, FALSE)));
          $data = array(
                'iu_taskattachid' =>  $this->input->get_post('iu_taskattachid', TRUE)
                ,'instanceid' =>  $this->input->get_post('instanceid', TRUE)
                ,'dtype' =>   $this->input->get_post('dtype', TRUE)
                ,'filereftype' =>   $this->input->get_post('filereftype', TRUE)
                ,'theref' =>   $this->input->get_post('theref', TRUE)
                ,'theref_ext' =>   $this->input->get_post('theref_ext', TRUE)
                ,'fileurl' =>   $this->input->get_post('fileurl', TRUE)
                ,'filetext' =>   $this->input->get_post('filetext', TRUE)
                ,'info' =>   $this->input->get_post('info', TRUE)
                ,'origname' =>   $this->input->get_post('origname', TRUE)
            );
            $iu_taskattach = $this->m_iu_taskattach->setRow($data);
            print json_encode($iu_taskattach);
    }
    function newRow() {
            log_message('debug', 'iu_taskattach.newRow post : '.json_encode($this->input->post(NULL, FALSE)));
          $data = array(
                'iu_taskattachid' =>  $this->input->get_post('iu_taskattachid', TRUE)
                ,'instanceid' =>  $this->input->get_post('instanceid', TRUE)
                ,'dtype' =>   $this->input->get_post('dtype', TRUE)
                ,'filereftype' =>   $this->input->get_post('filereftype', TRUE)
                ,'theref' =>   $this->input->get_post('theref', TRUE)
                ,'theref_ext' =>   $this->input->get_post('theref_ext', TRUE)
                ,'fileurl' =>   $this->input->get_post('fileurl', TRUE)
                ,'filetext' =>   $this->input->get_post('filetext', TRUE)
                ,'info' =>   $this->input->get_post('info', TRUE)
                ,'origname' =>   $this->input->get_post('origname', TRUE)
            );
                $instanceid =  $this->input->get_post('instanceid', TRUE);
            $iu_taskattach= $this->m_iu_taskattach->newRow($instanceid,$data);
            $return = $iu_taskattach;
            print json_encode($return);
    }
    function getRow() {
        log_message('debug', 'iu_taskattach.getRow post : '.json_encode($this->input->post(NULL, FALSE)));
        $empId  =  $this->input->get_post('id', TRUE);
        if (isset($empId)) {
            $iu_taskattach = $this->m_iu_taskattach->getRow($empId);
            $return = array(
                'success' => true,
                'data'    => $iu_taskattach
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
                    $iu_taskattach= $this->m_iu_taskattach->getRowsByInstance($instanceid,$sort);
                }else{
                    $iu_taskattach= $this->m_iu_taskattach->getRows($sort);
                }
            }else{
              $iu_taskattach= $this->m_iu_taskattach->getRows($sort);
            }
            $return = array(
                'success' =>  TRUE ,
                'data'    => $iu_taskattach
            );
        print json_encode($return);
    }
    function getRowsByInstance() {
        log_message('debug', 'iu_taskattach.getRowsByInstance post : '.json_encode($this->input->post(NULL, FALSE)));
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
            $iu_taskattach= $this->m_iu_taskattach->getRowsByInstance($InstId,$sort);
            $return = array(
                'success' =>  TRUE ,
                'data'    => $iu_taskattach
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
        log_message('debug', 'iu_taskattach.getRowsByParent post : '.json_encode($this->input->post(NULL, FALSE)));
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
            $iu_taskattach= $this->m_iu_taskattach->getRowsByParent($ParentId,$sort);
            $return = array(
                'success' => TRUE,
                'data'    => $iu_taskattach
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
        log_message('debug', 'iu_taskattach.deleteRow post : '.json_encode($this->input->post(NULL, FALSE)));
        $tempId  =  $this->input->get_post('iu_taskattachid', TRUE);
        if (strlen($tempId) > 0) {
            $return = $this->m_iu_taskattach->deleteRow($tempId);
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
        $this->load->model('M_iu_taskattach', 'm_iu_taskattach');
    }
}
?>
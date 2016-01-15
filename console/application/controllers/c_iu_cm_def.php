<?php
	 class C_iu_cm_def extends CI_Controller {
    function __construct() {
         parent::__construct();
        $this->_loadModels();
    }
    function setRow() {
          log_message('debug', 'iu_cm_def.setRow post : '.json_encode($this->input->post(NULL, FALSE)));
          log_message('debug', 'iu_cm_def.getRows get : '.json_encode($this->input->get(NULL, FALSE)));
          $data = array(
                'iu_cm_defid' =>  $this->input->get_post('iu_cm_defid', TRUE)
                ,'instanceid' =>  $this->input->get_post('instanceid', TRUE)
                ,'theprocess' =>   $this->input->get_post('theprocess', TRUE)
                ,'thevideo' =>   $this->input->get_post('thevideo', TRUE)
                ,'thedoc' =>   $this->input->get_post('thedoc', TRUE)
                ,'isdiscussion' =>   $this->input->get_post('isdiscussion', TRUE)
                ,'thetheme' =>   $this->input->get_post('thetheme', TRUE)
                ,'thedate' =>   $this->input->get_post('thedate', TRUE)
                ,'theauthor' =>   $this->input->get_post('theauthor', TRUE)
            );
            $iu_cm_def = $this->m_iu_cm_def->setRow($data);
            print json_encode($iu_cm_def);
    }
    function newRow() {
            log_message('debug', 'iu_cm_def.newRow post : '.json_encode($this->input->post(NULL, FALSE)));
          $data = array(
                'iu_cm_defid' =>  $this->input->get_post('iu_cm_defid', TRUE)
                ,'instanceid' =>  $this->input->get_post('instanceid', TRUE)
                ,'theprocess' =>   $this->input->get_post('theprocess', TRUE)
                ,'thevideo' =>   $this->input->get_post('thevideo', TRUE)
                ,'thedoc' =>   $this->input->get_post('thedoc', TRUE)
                ,'isdiscussion' =>   $this->input->get_post('isdiscussion', TRUE)
                ,'thetheme' =>   $this->input->get_post('thetheme', TRUE)
                ,'thedate' =>   $this->input->get_post('thedate', TRUE)
                ,'theauthor' =>   $this->input->get_post('theauthor', TRUE)
            );
                $instanceid =  $this->input->get_post('instanceid', TRUE);
            $iu_cm_def= $this->m_iu_cm_def->newRow($instanceid,$data);
            $return = $iu_cm_def;
            print json_encode($return);
    }
    function getRow() {
        log_message('debug', 'iu_cm_def.getRow post : '.json_encode($this->input->post(NULL, FALSE)));
        $empId  =  $this->input->get_post('id', TRUE);
        if (isset($empId)) {
            $iu_cm_def = $this->m_iu_cm_def->getRow($empId);
            $return = array(
                'success' => true,
                'data'    => $iu_cm_def
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
            	$sort[] = array('property'=>'theprocess', 'direction'=>'ASC');
            	$sort = json_encode($sort);
            }
            $instanceid=$this->input->get('instanceid', FALSE);
            if(isset($instanceid)){
                if($instanceid!=''){
                    $iu_cm_def= $this->m_iu_cm_def->getRowsByInstance($instanceid,$sort);
                }else{
                    $iu_cm_def= $this->m_iu_cm_def->getRows($sort);
                }
            }else{
              $iu_cm_def= $this->m_iu_cm_def->getRows($sort);
            }
            $return = array(
                'success' =>  TRUE ,
                'data'    => $iu_cm_def
            );
        print json_encode($return);
    }
    function getRowsByInstance() {
        log_message('debug', 'iu_cm_def.getRowsByInstance post : '.json_encode($this->input->post(NULL, FALSE)));
            $group = $this->input->get('group', FALSE); 
           $sort = $this->input->get('sort', FALSE);
           if(!$sort && $group) $sort = $group;
           if(!$sort || $group == $sort) 
            {
            	$sort = json_decode($sort);
            	$sort[] = array('property'=>'theprocess', 'direction'=>'ASC');
            	$sort = json_encode($sort);
            }
        $InstId  =  $this->input->get_post('instanceid', TRUE);
        if (strlen($InstId) > 0) {
            $iu_cm_def= $this->m_iu_cm_def->getRowsByInstance($InstId,$sort);
            $return = array(
                'success' =>  TRUE ,
                'data'    => $iu_cm_def
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
        log_message('debug', 'iu_cm_def.getRowsByParent post : '.json_encode($this->input->post(NULL, FALSE)));
            $group = $this->input->get('group', FALSE); 
           $sort = $this->input->get('sort', FALSE);
           if(!$sort && $group) $sort = $group;
           if(!$sort || $group == $sort) 
            {
            	$sort = json_decode($sort);
            	$sort[] = array('property'=>'theprocess', 'direction'=>'ASC');
            	$sort = json_encode($sort);
            }
        $ParentId  =  $this->input->get_post('parentid', TRUE);
        if (strlen($ParentId) > 0) {
            $iu_cm_def= $this->m_iu_cm_def->getRowsByParent($ParentId,$sort);
            $return = array(
                'success' => TRUE,
                'data'    => $iu_cm_def
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
        log_message('debug', 'iu_cm_def.deleteRow post : '.json_encode($this->input->post(NULL, FALSE)));
        $tempId  =  $this->input->get_post('iu_cm_defid', TRUE);
        if (strlen($tempId) > 0) {
            $return = $this->m_iu_cm_def->deleteRow($tempId);
        }
        else {
            $return = array(
                'success' => FALSE,
                'msg'     => 'No  ID to delete'
            );
        }
        print json_encode($return);
    }
	
	function hideRow() {
        log_message('debug', 'iu_cm_def.hideRow post : '.json_encode($this->input->post(NULL, FALSE)));
        $tempId  =  $this->input->get_post('iu_cm_defid', TRUE);
        if (strlen($tempId) > 0) {
            $return = $this->m_iu_cm_def->hideRow($tempId);
        }
        else {
            $return = array(
                'success' => FALSE,
                'msg'     => 'No  ID to hide'
            );
        }
        print json_encode($return);
    }
    private function _loadModels () {
        $this->load->model('M_iu_cm_def', 'm_iu_cm_def');
    }
}
?>
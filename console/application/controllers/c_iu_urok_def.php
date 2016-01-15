<?php
	 class C_iu_urok_def extends CI_Controller {
    function __construct() {
         parent::__construct();
        $this->_loadModels();
    }
    function setRow() {
          log_message('debug', 'iu_urok_def.setRow post : '.json_encode($this->input->post(NULL, FALSE)));
          log_message('debug', 'iu_urok_def.getRows get : '.json_encode($this->input->get(NULL, FALSE)));
          $data = array(
                'iu_urok_defid' =>  $this->input->get_post('iu_urok_defid', TRUE)
                ,'instanceid' =>  $this->input->get_post('instanceid', TRUE)
                ,'ucode' =>   $this->input->get_post('ucode', TRUE)
                ,'datecreated' =>   $this->input->get_post('datecreated', TRUE)
                ,'subject' =>   $this->input->get_post('subject', TRUE)
                ,'theclassnum' =>   $this->input->get_post('theclassnum', TRUE)
                ,'plannum' =>   $this->input->get_post('plannum', TRUE)
                ,'maketown' =>   $this->input->get_post('maketown', TRUE)
                ,'actiondate' =>   $this->input->get_post('actiondate', TRUE)
                ,'actiondate2' =>   $this->input->get_post('actiondate2', TRUE)
                ,'coursetype' =>   $this->input->get_post('coursetype', TRUE)
                ,'rtheme' =>   $this->input->get_post('rtheme', TRUE)
                ,'classtheme' =>   $this->input->get_post('classtheme', TRUE)
                ,'thequarter' =>   $this->input->get_post('thequarter', TRUE)
                ,'schooldate' =>   $this->input->get_post('schooldate', TRUE)
                ,'curator' =>   $this->input->get_post('curator', TRUE)
                ,'theteacher' =>   $this->input->get_post('theteacher', TRUE)
                ,'methodist' =>   $this->input->get_post('methodist', TRUE)
                ,'methodist2' =>   $this->input->get_post('methodist2', TRUE)
                ,'processtype' =>   $this->input->get_post('processtype', TRUE)
                ,'ckksn' =>   $this->input->get_post('ckksn', TRUE)
                ,'testpageref' =>   $this->input->get_post('testpageref', TRUE)
                ,'pubstate' =>   $this->input->get_post('pubstate', TRUE)
                ,'mainref' =>   $this->input->get_post('mainref', TRUE)
                ,'thefilm' =>   $this->input->get_post('thefilm', TRUE)
                ,'thefilmurl' =>   $this->input->get_post('thefilmurl', TRUE)
                ,'info' =>   $this->input->get_post('info', TRUE)
                ,'notes' =>   $this->input->get_post('notes', TRUE)
            );
            $iu_urok_def = $this->m_iu_urok_def->setRow($data);
            print json_encode($iu_urok_def);
    }
    function newRow() {
            log_message('debug', 'iu_urok_def.newRow post : '.json_encode($this->input->post(NULL, FALSE)));
          $data = array(
                'iu_urok_defid' =>  $this->input->get_post('iu_urok_defid', TRUE)
                ,'instanceid' =>  $this->input->get_post('instanceid', TRUE)
                ,'ucode' =>   $this->input->get_post('ucode', TRUE)
                ,'datecreated' =>   $this->input->get_post('datecreated', TRUE)
                ,'subject' =>   $this->input->get_post('subject', TRUE)
                ,'theclassnum' =>   $this->input->get_post('theclassnum', TRUE)
                ,'plannum' =>   $this->input->get_post('plannum', TRUE)
                ,'maketown' =>   $this->input->get_post('maketown', TRUE)
                ,'actiondate' =>   $this->input->get_post('actiondate', TRUE)
                ,'actiondate2' =>   $this->input->get_post('actiondate2', TRUE)
                ,'coursetype' =>   $this->input->get_post('coursetype', TRUE)
                ,'rtheme' =>   $this->input->get_post('rtheme', TRUE)
                ,'classtheme' =>   $this->input->get_post('classtheme', TRUE)
                ,'thequarter' =>   $this->input->get_post('thequarter', TRUE)
                ,'schooldate' =>   $this->input->get_post('schooldate', TRUE)
                ,'curator' =>   $this->input->get_post('curator', TRUE)
                ,'theteacher' =>   $this->input->get_post('theteacher', TRUE)
                ,'methodist' =>   $this->input->get_post('methodist', TRUE)
                ,'methodist2' =>   $this->input->get_post('methodist2', TRUE)
                ,'processtype' =>   $this->input->get_post('processtype', TRUE)
                ,'ckksn' =>   $this->input->get_post('ckksn', TRUE)
                ,'testpageref' =>   $this->input->get_post('testpageref', TRUE)
                ,'pubstate' =>   $this->input->get_post('pubstate', TRUE)
                ,'mainref' =>   $this->input->get_post('mainref', TRUE)
                ,'thefilm' =>   $this->input->get_post('thefilm', TRUE)
                ,'thefilmurl' =>   $this->input->get_post('thefilmurl', TRUE)
                ,'info' =>   $this->input->get_post('info', TRUE)
                ,'notes' =>   $this->input->get_post('notes', TRUE)
            );
                $instanceid =  $this->input->get_post('instanceid', TRUE);
            $iu_urok_def= $this->m_iu_urok_def->newRow($instanceid,$data);
            $return = $iu_urok_def;
            print json_encode($return);
    }
    function getRow() {
        log_message('debug', 'iu_urok_def.getRow post : '.json_encode($this->input->post(NULL, FALSE)));
        $empId  =  $this->input->get_post('id', TRUE);
        if (isset($empId)) {
            $iu_urok_def = $this->m_iu_urok_def->getRow($empId);
            $return = array(
                'success' => true,
                'data'    => $iu_urok_def
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
            	$sort[] = array('property'=>'classtheme', 'direction'=>'ASC');
            	$sort = json_encode($sort);
            }
            $instanceid=$this->input->get('instanceid', FALSE);
            if(isset($instanceid)){
                if($instanceid!=''){
                    $iu_urok_def= $this->m_iu_urok_def->getRowsByInstance($instanceid,$sort);
                }else{
                    $iu_urok_def= $this->m_iu_urok_def->getRows($sort);
                }
            }else{
              $iu_urok_def= $this->m_iu_urok_def->getRows($sort);
            }
            $return = array(
                'success' =>  TRUE ,
                'data'    => $iu_urok_def
            );
        print json_encode($return);
    }
    function getRowsByInstance() {
        log_message('debug', 'iu_urok_def.getRowsByInstance post : '.json_encode($this->input->post(NULL, FALSE)));
            $group = $this->input->get('group', FALSE); 
           $sort = $this->input->get('sort', FALSE);
           if(!$sort && $group) $sort = $group;
           if(!$sort || $group == $sort) 
            {
            	$sort = json_decode($sort);
            	$sort[] = array('property'=>'classtheme', 'direction'=>'ASC');
            	$sort = json_encode($sort);
            }
        $InstId  =  $this->input->get_post('instanceid', TRUE);
        if (strlen($InstId) > 0) {
            $iu_urok_def= $this->m_iu_urok_def->getRowsByInstance($InstId,$sort);
            $return = array(
                'success' =>  TRUE ,
                'data'    => $iu_urok_def
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
        log_message('debug', 'iu_urok_def.getRowsByParent post : '.json_encode($this->input->post(NULL, FALSE)));
            $group = $this->input->get('group', FALSE); 
           $sort = $this->input->get('sort', FALSE);
           if(!$sort && $group) $sort = $group;
           if(!$sort || $group == $sort) 
            {
            	$sort = json_decode($sort);
            	$sort[] = array('property'=>'classtheme', 'direction'=>'ASC');
            	$sort = json_encode($sort);
            }
        $ParentId  =  $this->input->get_post('parentid', TRUE);
        if (strlen($ParentId) > 0) {
            $iu_urok_def= $this->m_iu_urok_def->getRowsByParent($ParentId,$sort);
            $return = array(
                'success' => TRUE,
                'data'    => $iu_urok_def
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
        log_message('debug', 'iu_urok_def.deleteRow post : '.json_encode($this->input->post(NULL, FALSE)));
        $tempId  =  $this->input->get_post('iu_urok_defid', TRUE);
        if (strlen($tempId) > 0) {
            $return = $this->m_iu_urok_def->deleteRow($tempId);
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
        $this->load->model('M_iu_urok_def', 'm_iu_urok_def');
    }
}
?>
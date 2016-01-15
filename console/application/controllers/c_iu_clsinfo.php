<?php
	 class C_iu_clsinfo extends CI_Controller {
    function __construct() {
         parent::__construct();
        $this->_loadModels();
    }
    function setRow() {
          log_message('debug', 'iu_clsinfo.setRow post : '.json_encode($this->input->post(NULL, FALSE)));
          log_message('debug', 'iu_clsinfo.getRows get : '.json_encode($this->input->get(NULL, FALSE)));
          $data = array(
                'iu_clsinfoid' =>  $this->input->get_post('iu_clsinfoid', TRUE)
                ,'instanceid' =>  $this->input->get_post('instanceid', TRUE)
                ,'name' =>   $this->input->get_post('name', TRUE)
                ,'sequence' =>   $this->input->get_post('sequence', TRUE)
            );
            $iu_clsinfo = $this->m_iu_clsinfo->setRow($data);
            print json_encode($iu_clsinfo);
    }
    function newRow() {
            log_message('debug', 'iu_clsinfo.newRow post : '.json_encode($this->input->post(NULL, FALSE)));
          $data = array(
                'iu_clsinfoid' =>  $this->input->get_post('iu_clsinfoid', TRUE)
                ,'instanceid' =>  $this->input->get_post('instanceid', TRUE)
                ,'name' =>   $this->input->get_post('name', TRUE)
                ,'sequence' =>   $this->input->get_post('sequence', TRUE)
            );
                $instanceid =  $this->input->get_post('instanceid', TRUE);
            $iu_clsinfo= $this->m_iu_clsinfo->newRow($instanceid,$data);
            $return = $iu_clsinfo;
            print json_encode($return);
    }
    function getRow() {
        log_message('debug', 'iu_clsinfo.getRow post : '.json_encode($this->input->post(NULL, FALSE)));
        $empId  =  $this->input->get_post('id', TRUE);
        if (isset($empId)) {
            $iu_clsinfo = $this->m_iu_clsinfo->getRow($empId);
            $return = array(
                'success' => true,
                'data'    => $iu_clsinfo
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
                    $iu_clsinfo= $this->m_iu_clsinfo->getRowsByInstance($instanceid,$sort);
                }else{
                    $iu_clsinfo= $this->m_iu_clsinfo->getRows($sort);
                }
            }else{
              $iu_clsinfo= $this->m_iu_clsinfo->getRows($sort);
            }
            $return = array(
                'success' =>  TRUE ,
                'data'    => $iu_clsinfo
            );
        print json_encode($return);
    }
    function getRowsByInstance() {
        log_message('debug', 'iu_clsinfo.getRowsByInstance post : '.json_encode($this->input->post(NULL, FALSE)));
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
            $iu_clsinfo= $this->m_iu_clsinfo->getRowsByInstance($InstId,$sort);
            $return = array(
                'success' =>  TRUE ,
                'data'    => $iu_clsinfo
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
        log_message('debug', 'iu_clsinfo.getRowsByParent post : '.json_encode($this->input->post(NULL, FALSE)));
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
            $iu_clsinfo= $this->m_iu_clsinfo->getRowsByParent($ParentId,$sort);
            $return = array(
                'success' => TRUE,
                'data'    => $iu_clsinfo
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
        log_message('debug', 'iu_clsinfo.deleteRow post : '.json_encode($this->input->post(NULL, FALSE)));
        $tempId  =  $this->input->get_post('iu_clsinfoid', TRUE);
        if (strlen($tempId) > 0) {
            $return = $this->m_iu_clsinfo->deleteRow($tempId);
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
        $this->load->model('M_iu_clsinfo', 'm_iu_clsinfo');
    }
}
?>
<?php
	 class C_iu_stausdoc extends CI_Controller {
    function __construct() {
         parent::__construct();
        $this->_loadModels();
    }
    function setRow() {
          log_message('debug', 'iu_stausdoc.setRow post : '.json_encode($this->input->post(NULL, FALSE)));
          log_message('debug', 'iu_stausdoc.getRows get : '.json_encode($this->input->get(NULL, FALSE)));
          $data = array(
                'iu_stausdocid' =>  $this->input->get_post('iu_stausdocid', TRUE)
                ,'instanceid' =>  $this->input->get_post('instanceid', TRUE)
                ,'doctype' =>   $this->input->get_post('doctype', TRUE)
                ,'allowdoc' =>   $this->input->get_post('allowdoc', TRUE)
                ,'name' =>   $this->input->get_post('name', TRUE)
                ,'info' =>   $this->input->get_post('info', TRUE)
            );
            $iu_stausdoc = $this->m_iu_stausdoc->setRow($data);
            print json_encode($iu_stausdoc);
    }
    function newRow() {
            log_message('debug', 'iu_stausdoc.newRow post : '.json_encode($this->input->post(NULL, FALSE)));
          $data = array(
                'iu_stausdocid' =>  $this->input->get_post('iu_stausdocid', TRUE)
                ,'instanceid' =>  $this->input->get_post('instanceid', TRUE)
                ,'doctype' =>   $this->input->get_post('doctype', TRUE)
                ,'allowdoc' =>   $this->input->get_post('allowdoc', TRUE)
                ,'name' =>   $this->input->get_post('name', TRUE)
                ,'info' =>   $this->input->get_post('info', TRUE)
            );
                $instanceid =  $this->input->get_post('instanceid', TRUE);
            $iu_stausdoc= $this->m_iu_stausdoc->newRow($instanceid,$data);
            $return = $iu_stausdoc;
            print json_encode($return);
    }
    function getRow() {
        log_message('debug', 'iu_stausdoc.getRow post : '.json_encode($this->input->post(NULL, FALSE)));
        $empId  =  $this->input->get_post('id', TRUE);
        if (isset($empId)) {
            $iu_stausdoc = $this->m_iu_stausdoc->getRow($empId);
            $return = array(
                'success' => true,
                'data'    => $iu_stausdoc
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
                    $iu_stausdoc= $this->m_iu_stausdoc->getRowsByInstance($instanceid,$sort);
                }else{
                    $iu_stausdoc= $this->m_iu_stausdoc->getRows($sort);
                }
            }else{
              $iu_stausdoc= $this->m_iu_stausdoc->getRows($sort);
            }
            $return = array(
                'success' =>  TRUE ,
                'data'    => $iu_stausdoc
            );
        print json_encode($return);
    }
    function getRowsByInstance() {
        log_message('debug', 'iu_stausdoc.getRowsByInstance post : '.json_encode($this->input->post(NULL, FALSE)));
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
            $iu_stausdoc= $this->m_iu_stausdoc->getRowsByInstance($InstId,$sort);
            $return = array(
                'success' =>  TRUE ,
                'data'    => $iu_stausdoc
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
        log_message('debug', 'iu_stausdoc.getRowsByParent post : '.json_encode($this->input->post(NULL, FALSE)));
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
            $iu_stausdoc= $this->m_iu_stausdoc->getRowsByParent($ParentId,$sort);
            $return = array(
                'success' => TRUE,
                'data'    => $iu_stausdoc
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
        log_message('debug', 'iu_stausdoc.deleteRow post : '.json_encode($this->input->post(NULL, FALSE)));
        $tempId  =  $this->input->get_post('iu_stausdocid', TRUE);
        if (strlen($tempId) > 0) {
            $return = $this->m_iu_stausdoc->deleteRow($tempId);
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
        $this->load->model('M_iu_stausdoc', 'm_iu_stausdoc');
    }
}
?>
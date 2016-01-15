<?php
	 class C_genreference extends CI_Controller {
    function __construct() {
         parent::__construct();
        $this->_loadModels();
    }
    function setRow() {
          log_message('debug', 'GENREFERENCE.setRow post : '.json_encode($this->input->post(NULL, FALSE)));
          log_message('debug', 'GENREFERENCE.getRows get : '.json_encode($this->input->get(NULL, FALSE)));
          $data = array(
                'genreferenceid' =>  $this->input->get_post('genreferenceid', TRUE)
                ,'instanceid' =>  $this->input->get_post('instanceid', TRUE)
                ,'parentid' =>  $this->input->get_post('parentid', TRUE)
                ,'name' =>   $this->input->get_post('name', TRUE)
                ,'refclassid' =>   $this->input->get_post('refclassid', TRUE)
                ,'versionmajor' =>   $this->input->get_post('versionmajor', TRUE)
                ,'versionminor' =>   $this->input->get_post('versionminor', TRUE)
            );
            $genreference = $this->m_genreference->setRow($data);
            print json_encode($genreference);
    }
    function newRow() {
            log_message('debug', 'GENREFERENCE.newRow post : '.json_encode($this->input->post(NULL, FALSE)));
          $data = array(
                'genreferenceid' =>  $this->input->get_post('genreferenceid', TRUE)
                ,'instanceid' =>  $this->input->get_post('instanceid', TRUE)
                ,'parentid' =>  $this->input->get_post('parentid', TRUE)
                ,'name' =>   $this->input->get_post('name', TRUE)
                ,'refclassid' =>   $this->input->get_post('refclassid', TRUE)
                ,'versionmajor' =>   $this->input->get_post('versionmajor', TRUE)
                ,'versionminor' =>   $this->input->get_post('versionminor', TRUE)
            );
                $instanceid =  $this->input->get_post('instanceid', TRUE);
                $parentid =  $this->input->get_post('parentid', TRUE);
            $genreference= $this->m_genreference->newRow($instanceid,$parentid,$data);
            $return = $genreference;
            print json_encode($return);
    }
    function getRow() {
        log_message('debug', 'GENREFERENCE.getRow post : '.json_encode($this->input->post(NULL, FALSE)));
        $empId  =  $this->input->get_post('id', TRUE);
        if (isset($empId)) {
            $genreference = $this->m_genreference->getRow($empId);
            $return = array(
                'success' => true,
                'data'    => $genreference
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
            	$sort[] = array('property'=>'name', 'direction'=>'ASC');
            	$sort = json_encode($sort);
            }
            $parentid=$this->input->get('parentid', FALSE);
            if(isset($parentid)){
                if($parentid!=''){
                    $genreference= $this->m_genreference->getRowsByParent($parentid,$sort);
                }else{
                    $genreference= $this->m_genreference->getRows($sort);
                }
            }else{
              $genreference= $this->m_genreference->getRows($sort);
            }
            $return = array(
                'success' =>  TRUE ,
                'data'    => $genreference
            );
        print json_encode($return);
    }
    function getRowsByInstance() {
        log_message('debug', 'GENREFERENCE.getRowsByInstance post : '.json_encode($this->input->post(NULL, FALSE)));
            $group = $this->input->get('group', FALSE); 
           $sort = $this->input->get('sort', FALSE);
           if(!$sort && $group) $sort = $group;
           if(!$sort || $group == $sort) 
            {
            	$sort = json_decode($sort);
            	$sort[] = array('property'=>'name', 'direction'=>'ASC');
            	$sort = json_encode($sort);
            }
        $InstId  =  $this->input->get_post('instanceid', TRUE);
        if (strlen($InstId) > 0) {
            $genreference= $this->m_genreference->getRowsByInstance($InstId,$sort);
            $return = array(
                'success' =>  TRUE ,
                'data'    => $genreference
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
        log_message('debug', 'GENREFERENCE.getRowsByParent post : '.json_encode($this->input->post(NULL, FALSE)));
            $group = $this->input->get('group', FALSE); 
           $sort = $this->input->get('sort', FALSE);
           if(!$sort && $group) $sort = $group;
           if(!$sort || $group == $sort) 
            {
            	$sort = json_decode($sort);
            	$sort[] = array('property'=>'name', 'direction'=>'ASC');
            	$sort = json_encode($sort);
            }
        $ParentId  =  $this->input->get_post('parentid', TRUE);
        if (strlen($ParentId) > 0) {
            $genreference= $this->m_genreference->getRowsByParent($ParentId,$sort);
            $return = array(
                'success' => TRUE,
                'data'    => $genreference
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
        log_message('debug', 'GENREFERENCE.deleteRow post : '.json_encode($this->input->post(NULL, FALSE)));
        $tempId  =  $this->input->get_post('genreferenceid', TRUE);
        if (strlen($tempId) > 0) {
            $return = $this->m_genreference->deleteRow($tempId);
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
        $this->load->model('M_genreference', 'm_genreference');
    }
}
?>
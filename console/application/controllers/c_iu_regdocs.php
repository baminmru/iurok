<?php
	 class C_iu_regdocs extends CI_Controller {
    function __construct() {
         parent::__construct();
        $this->_loadModels();
    }
    function setRow() {
          log_message('debug', 'iu_regdocs.setRow post : '.json_encode($this->input->post(NULL, FALSE)));
          log_message('debug', 'iu_regdocs.getRows get : '.json_encode($this->input->get(NULL, FALSE)));
          $data = array(
                'iu_regdocsid' =>  $this->input->get_post('iu_regdocsid', TRUE)
                ,'instanceid' =>  $this->input->get_post('instanceid', TRUE)
                ,'parentid' =>  $this->input->get_post('parentid', TRUE)
                ,'docname' =>   $this->input->get_post('docname', TRUE)
                ,'thedoc' =>   $this->input->get_post('thedoc', TRUE)
                ,'thedoc_ext' =>   $this->input->get_post('thedoc_ext', TRUE)
                ,'thecomment' =>   $this->input->get_post('thecomment', TRUE)
                ,'origname' =>   $this->input->get_post('origname', TRUE)
            );
            $iu_regdocs = $this->m_iu_regdocs->setRow($data);
            print json_encode($iu_regdocs);
    }
    function newRow() {
            log_message('debug', 'iu_regdocs.newRow post : '.json_encode($this->input->post(NULL, FALSE)));
          $data = array(
                'iu_regdocsid' =>  $this->input->get_post('iu_regdocsid', TRUE)
                ,'instanceid' =>  $this->input->get_post('instanceid', TRUE)
                ,'parentid' =>  $this->input->get_post('parentid', TRUE)
                ,'docname' =>   $this->input->get_post('docname', TRUE)
                ,'thedoc' =>   $this->input->get_post('thedoc', TRUE)
                ,'thedoc_ext' =>   $this->input->get_post('thedoc_ext', TRUE)
                ,'thecomment' =>   $this->input->get_post('thecomment', TRUE)
                ,'origname' =>   $this->input->get_post('origname', TRUE)
            );
                $instanceid =  $this->input->get_post('instanceid', TRUE);
                $parentid =  $this->input->get_post('parentid', TRUE);
            $iu_regdocs= $this->m_iu_regdocs->newRow($instanceid,$parentid,$data);
            $return = $iu_regdocs;
            print json_encode($return);
    }
    function getRow() {
        log_message('debug', 'iu_regdocs.getRow post : '.json_encode($this->input->post(NULL, FALSE)));
        $empId  =  $this->input->get_post('id', TRUE);
        if (isset($empId)) {
            $iu_regdocs = $this->m_iu_regdocs->getRow($empId);
            $return = array(
                'success' => true,
                'data'    => $iu_regdocs
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
            	$sort[] = array('property'=>'docname', 'direction'=>'ASC');
            	$sort = json_encode($sort);
            }
            $parentid=$this->input->get('parentid', FALSE);
            if(isset($parentid)){
                if($parentid!=''){
                    $iu_regdocs= $this->m_iu_regdocs->getRowsByParent($parentid,$sort);
                }else{
                    $iu_regdocs= $this->m_iu_regdocs->getRows($sort);
                }
            }else{
              $iu_regdocs= $this->m_iu_regdocs->getRows($sort);
            }
            $return = array(
                'success' =>  TRUE ,
                'data'    => $iu_regdocs
            );
        print json_encode($return);
    }
    function getRowsByInstance() {
        log_message('debug', 'iu_regdocs.getRowsByInstance post : '.json_encode($this->input->post(NULL, FALSE)));
            $group = $this->input->get('group', FALSE); 
           $sort = $this->input->get('sort', FALSE);
           if(!$sort && $group) $sort = $group;
           if(!$sort || $group == $sort) 
            {
            	$sort = json_decode($sort);
            	$sort[] = array('property'=>'docname', 'direction'=>'ASC');
            	$sort = json_encode($sort);
            }
        $InstId  =  $this->input->get_post('instanceid', TRUE);
        if (strlen($InstId) > 0) {
            $iu_regdocs= $this->m_iu_regdocs->getRowsByInstance($InstId,$sort);
            $return = array(
                'success' =>  TRUE ,
                'data'    => $iu_regdocs
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
        log_message('debug', 'iu_regdocs.getRowsByParent post : '.json_encode($this->input->post(NULL, FALSE)));
            $group = $this->input->get('group', FALSE); 
           $sort = $this->input->get('sort', FALSE);
           if(!$sort && $group) $sort = $group;
           if(!$sort || $group == $sort) 
            {
            	$sort = json_decode($sort);
            	$sort[] = array('property'=>'docname', 'direction'=>'ASC');
            	$sort = json_encode($sort);
            }
        $ParentId  =  $this->input->get_post('parentid', TRUE);
        if (strlen($ParentId) > 0) {
            $iu_regdocs= $this->m_iu_regdocs->getRowsByParent($ParentId,$sort);
            $return = array(
                'success' => TRUE,
                'data'    => $iu_regdocs
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
        log_message('debug', 'iu_regdocs.deleteRow post : '.json_encode($this->input->post(NULL, FALSE)));
        $tempId  =  $this->input->get_post('iu_regdocsid', TRUE);
        if (strlen($tempId) > 0) {
            $return = $this->m_iu_regdocs->deleteRow($tempId);
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
        $this->load->model('M_iu_regdocs', 'm_iu_regdocs');
    }
}
?>
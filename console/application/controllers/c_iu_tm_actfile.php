<?php
	 class C_iu_tm_actfile extends CI_Controller {
    function __construct() {
         parent::__construct();
        $this->_loadModels();
    }
    function setRow() {
          log_message('debug', 'iu_tm_actfile.setRow post : '.json_encode($this->input->post(NULL, FALSE)));
          log_message('debug', 'iu_tm_actfile.getRows get : '.json_encode($this->input->get(NULL, FALSE)));
          $data = array(
                'iu_tm_actfileid' =>  $this->input->get_post('iu_tm_actfileid', TRUE)
                ,'instanceid' =>  $this->input->get_post('instanceid', TRUE)
                ,'parentid' =>  $this->input->get_post('parentid', TRUE)
                ,'dtype' =>   $this->input->get_post('dtype', TRUE)
                ,'theref' =>   $this->input->get_post('theref', TRUE)
                ,'theref_ext' =>   $this->input->get_post('theref_ext', TRUE)
                ,'info' =>   $this->input->get_post('info', TRUE)
            );
            $iu_tm_actfile = $this->m_iu_tm_actfile->setRow($data);
            print json_encode($iu_tm_actfile);
    }
    function newRow() {
            log_message('debug', 'iu_tm_actfile.newRow post : '.json_encode($this->input->post(NULL, FALSE)));
          $data = array(
                'iu_tm_actfileid' =>  $this->input->get_post('iu_tm_actfileid', TRUE)
                ,'instanceid' =>  $this->input->get_post('instanceid', TRUE)
                ,'parentid' =>  $this->input->get_post('parentid', TRUE)
                ,'dtype' =>   $this->input->get_post('dtype', TRUE)
                ,'theref' =>   $this->input->get_post('theref', TRUE)
                ,'theref_ext' =>   $this->input->get_post('theref_ext', TRUE)
                ,'info' =>   $this->input->get_post('info', TRUE)
            );
                $instanceid =  $this->input->get_post('instanceid', TRUE);
                $parentid =  $this->input->get_post('parentid', TRUE);
            $iu_tm_actfile= $this->m_iu_tm_actfile->newRow($instanceid,$parentid,$data);
            $return = $iu_tm_actfile;
            print json_encode($return);
    }
    function getRow() {
        log_message('debug', 'iu_tm_actfile.getRow post : '.json_encode($this->input->post(NULL, FALSE)));
        $empId  =  $this->input->get_post('id', TRUE);
        if (isset($empId)) {
            $iu_tm_actfile = $this->m_iu_tm_actfile->getRow($empId);
            $return = array(
                'success' => true,
                'data'    => $iu_tm_actfile
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
            $parentid=$this->input->get('parentid', FALSE);
            if(isset($parentid)){
                if($parentid!=''){
                    $iu_tm_actfile= $this->m_iu_tm_actfile->getRowsByParent($parentid,$sort);
                }else{
                    $iu_tm_actfile= $this->m_iu_tm_actfile->getRows($sort);
                }
            }else{
              $iu_tm_actfile= $this->m_iu_tm_actfile->getRows($sort);
            }
            $return = array(
                'success' =>  TRUE ,
                'data'    => $iu_tm_actfile
            );
        print json_encode($return);
    }
    function getRowsByInstance() {
        log_message('debug', 'iu_tm_actfile.getRowsByInstance post : '.json_encode($this->input->post(NULL, FALSE)));
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
            $iu_tm_actfile= $this->m_iu_tm_actfile->getRowsByInstance($InstId,$sort);
            $return = array(
                'success' =>  TRUE ,
                'data'    => $iu_tm_actfile
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
        log_message('debug', 'iu_tm_actfile.getRowsByParent post : '.json_encode($this->input->post(NULL, FALSE)));
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
            $iu_tm_actfile= $this->m_iu_tm_actfile->getRowsByParent($ParentId,$sort);
            $return = array(
                'success' => TRUE,
                'data'    => $iu_tm_actfile
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
        log_message('debug', 'iu_tm_actfile.deleteRow post : '.json_encode($this->input->post(NULL, FALSE)));
        $tempId  =  $this->input->get_post('iu_tm_actfileid', TRUE);
        if (strlen($tempId) > 0) {
            $return = $this->m_iu_tm_actfile->deleteRow($tempId);
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
        $this->load->model('M_iu_tm_actfile', 'm_iu_tm_actfile');
    }
}
?>
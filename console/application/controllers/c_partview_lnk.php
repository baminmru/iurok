<?php
	 class C_partview_lnk extends CI_Controller {
    function __construct() {
         parent::__construct();
        $this->_loadModels();
    }
    function setRow() {
          log_message('debug', 'PARTVIEW_LNK.setRow post : '.json_encode($this->input->post(NULL, FALSE)));
          log_message('debug', 'PARTVIEW_LNK.getRows get : '.json_encode($this->input->get(NULL, FALSE)));
          $data = array(
                'partview_lnkid' =>  $this->input->get_post('partview_lnkid', TRUE)
                ,'instanceid' =>  $this->input->get_post('instanceid', TRUE)
                ,'parentid' =>  $this->input->get_post('parentid', TRUE)
                ,'theview' =>   $this->input->get_post('theview', TRUE)
                ,'thejoinsource' =>   $this->input->get_post('thejoinsource', TRUE)
                ,'reftype' =>   $this->input->get_post('reftype', TRUE)
                ,'thejoindestination' =>   $this->input->get_post('thejoindestination', TRUE)
                ,'handjoin' =>   $this->input->get_post('handjoin', TRUE)
                ,'seq' =>   $this->input->get_post('seq', TRUE)
            );
            $partview_lnk = $this->m_partview_lnk->setRow($data);
            print json_encode($partview_lnk);
    }
    function newRow() {
            log_message('debug', 'PARTVIEW_LNK.newRow post : '.json_encode($this->input->post(NULL, FALSE)));
          $data = array(
                'partview_lnkid' =>  $this->input->get_post('partview_lnkid', TRUE)
                ,'instanceid' =>  $this->input->get_post('instanceid', TRUE)
                ,'parentid' =>  $this->input->get_post('parentid', TRUE)
                ,'theview' =>   $this->input->get_post('theview', TRUE)
                ,'thejoinsource' =>   $this->input->get_post('thejoinsource', TRUE)
                ,'reftype' =>   $this->input->get_post('reftype', TRUE)
                ,'thejoindestination' =>   $this->input->get_post('thejoindestination', TRUE)
                ,'handjoin' =>   $this->input->get_post('handjoin', TRUE)
                ,'seq' =>   $this->input->get_post('seq', TRUE)
            );
                $instanceid =  $this->input->get_post('instanceid', TRUE);
                $parentid =  $this->input->get_post('parentid', TRUE);
            $partview_lnk= $this->m_partview_lnk->newRow($instanceid,$parentid,$data);
            $return = $partview_lnk;
            print json_encode($return);
    }
    function getRow() {
        log_message('debug', 'PARTVIEW_LNK.getRow post : '.json_encode($this->input->post(NULL, FALSE)));
        $empId  =  $this->input->get_post('id', TRUE);
        if (isset($empId)) {
            $partview_lnk = $this->m_partview_lnk->getRow($empId);
            $return = array(
                'success' => true,
                'data'    => $partview_lnk
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
            	$sort[] = array('property'=>'theview', 'direction'=>'ASC');
            	$sort = json_encode($sort);
            }
            $parentid=$this->input->get('parentid', FALSE);
            if(isset($parentid)){
                if($parentid!=''){
                    $partview_lnk= $this->m_partview_lnk->getRowsByParent($parentid,$sort);
                }else{
                    $partview_lnk= $this->m_partview_lnk->getRows($sort);
                }
            }else{
              $partview_lnk= $this->m_partview_lnk->getRows($sort);
            }
            $return = array(
                'success' =>  TRUE ,
                'data'    => $partview_lnk
            );
        print json_encode($return);
    }
    function getRowsByInstance() {
        log_message('debug', 'PARTVIEW_LNK.getRowsByInstance post : '.json_encode($this->input->post(NULL, FALSE)));
            $group = $this->input->get('group', FALSE); 
           $sort = $this->input->get('sort', FALSE);
           if(!$sort && $group) $sort = $group;
           if(!$sort || $group == $sort) 
            {
            	$sort = json_decode($sort);
            	$sort[] = array('property'=>'theview', 'direction'=>'ASC');
            	$sort = json_encode($sort);
            }
        $InstId  =  $this->input->get_post('instanceid', TRUE);
        if (strlen($InstId) > 0) {
            $partview_lnk= $this->m_partview_lnk->getRowsByInstance($InstId,$sort);
            $return = array(
                'success' =>  TRUE ,
                'data'    => $partview_lnk
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
        log_message('debug', 'PARTVIEW_LNK.getRowsByParent post : '.json_encode($this->input->post(NULL, FALSE)));
            $group = $this->input->get('group', FALSE); 
           $sort = $this->input->get('sort', FALSE);
           if(!$sort && $group) $sort = $group;
           if(!$sort || $group == $sort) 
            {
            	$sort = json_decode($sort);
            	$sort[] = array('property'=>'theview', 'direction'=>'ASC');
            	$sort = json_encode($sort);
            }
        $ParentId  =  $this->input->get_post('parentid', TRUE);
        if (strlen($ParentId) > 0) {
            $partview_lnk= $this->m_partview_lnk->getRowsByParent($ParentId,$sort);
            $return = array(
                'success' => TRUE,
                'data'    => $partview_lnk
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
        log_message('debug', 'PARTVIEW_LNK.deleteRow post : '.json_encode($this->input->post(NULL, FALSE)));
        $tempId  =  $this->input->get_post('partview_lnkid', TRUE);
        if (strlen($tempId) > 0) {
            $return = $this->m_partview_lnk->deleteRow($tempId);
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
        $this->load->model('M_partview_lnk', 'm_partview_lnk');
    }
}
?>
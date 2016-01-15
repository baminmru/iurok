<?php
	 class C_iu_urok_sn extends CI_Controller {
    function __construct() {
         parent::__construct();
        $this->_loadModels();
    }
    function setRow() {
          log_message('debug', 'iu_urok_sn.setRow post : '.json_encode($this->input->post(NULL, FALSE)));
          log_message('debug', 'iu_urok_sn.getRows get : '.json_encode($this->input->get(NULL, FALSE)));
          $data = array(
                'iu_urok_snid' =>  $this->input->get_post('iu_urok_snid', TRUE)
                ,'instanceid' =>  $this->input->get_post('instanceid', TRUE)
                ,'statusdate' =>   $this->input->get_post('statusdate', TRUE)
                ,'urokstatus' =>   $this->input->get_post('urokstatus', TRUE)
            );
            $iu_urok_sn = $this->m_iu_urok_sn->setRow($data);
            print json_encode($iu_urok_sn);
    }
    function newRow() {
            log_message('debug', 'iu_urok_sn.newRow post : '.json_encode($this->input->post(NULL, FALSE)));
          $data = array(
                'iu_urok_snid' =>  $this->input->get_post('iu_urok_snid', TRUE)
                ,'instanceid' =>  $this->input->get_post('instanceid', TRUE)
                ,'statusdate' =>   $this->input->get_post('statusdate', TRUE)
                ,'urokstatus' =>   $this->input->get_post('urokstatus', TRUE)
            );
                $instanceid =  $this->input->get_post('instanceid', TRUE);
            $iu_urok_sn= $this->m_iu_urok_sn->newRow($instanceid,$data);
            $return = $iu_urok_sn;
            print json_encode($return);
    }
    function getRow() {
        log_message('debug', 'iu_urok_sn.getRow post : '.json_encode($this->input->post(NULL, FALSE)));
        $empId  =  $this->input->get_post('id', TRUE);
        if (isset($empId)) {
            $iu_urok_sn = $this->m_iu_urok_sn->getRow($empId);
            $return = array(
                'success' => true,
                'data'    => $iu_urok_sn
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
            	$sort[] = array('property'=>'urokstatus', 'direction'=>'ASC');
            	$sort = json_encode($sort);
            }
            $instanceid=$this->input->get('instanceid', FALSE);
            if(isset($instanceid)){
                if($instanceid!=''){
                    $iu_urok_sn= $this->m_iu_urok_sn->getRowsByInstance($instanceid,$sort);
                }else{
                    $iu_urok_sn= $this->m_iu_urok_sn->getRows($sort);
                }
            }else{
              $iu_urok_sn= $this->m_iu_urok_sn->getRows($sort);
            }
            $return = array(
                'success' =>  TRUE ,
                'data'    => $iu_urok_sn
            );
        print json_encode($return);
    }
    function getRowsByInstance() {
        log_message('debug', 'iu_urok_sn.getRowsByInstance post : '.json_encode($this->input->post(NULL, FALSE)));
            $group = $this->input->get('group', FALSE); 
           $sort = $this->input->get('sort', FALSE);
           if(!$sort && $group) $sort = $group;
           if(!$sort || $group == $sort) 
            {
            	$sort = json_decode($sort);
            	$sort[] = array('property'=>'urokstatus', 'direction'=>'ASC');
            	$sort = json_encode($sort);
            }
        $InstId  =  $this->input->get_post('instanceid', TRUE);
        if (strlen($InstId) > 0) {
            $iu_urok_sn= $this->m_iu_urok_sn->getRowsByInstance($InstId,$sort);
            $return = array(
                'success' =>  TRUE ,
                'data'    => $iu_urok_sn
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
        log_message('debug', 'iu_urok_sn.getRowsByParent post : '.json_encode($this->input->post(NULL, FALSE)));
            $group = $this->input->get('group', FALSE); 
           $sort = $this->input->get('sort', FALSE);
           if(!$sort && $group) $sort = $group;
           if(!$sort || $group == $sort) 
            {
            	$sort = json_decode($sort);
            	$sort[] = array('property'=>'urokstatus', 'direction'=>'ASC');
            	$sort = json_encode($sort);
            }
        $ParentId  =  $this->input->get_post('parentid', TRUE);
        if (strlen($ParentId) > 0) {
            $iu_urok_sn= $this->m_iu_urok_sn->getRowsByParent($ParentId,$sort);
            $return = array(
                'success' => TRUE,
                'data'    => $iu_urok_sn
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
        log_message('debug', 'iu_urok_sn.deleteRow post : '.json_encode($this->input->post(NULL, FALSE)));
        $tempId  =  $this->input->get_post('iu_urok_snid', TRUE);
        if (strlen($tempId) > 0) {
            $return = $this->m_iu_urok_sn->deleteRow($tempId);
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
        $this->load->model('M_iu_urok_sn', 'm_iu_urok_sn');
    }
}
?>
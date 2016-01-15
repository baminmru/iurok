<?php
	 class C_iu_status extends CI_Controller {
    function __construct() {
         parent::__construct();
        $this->_loadModels();
    }
    function setRow() {
          log_message('debug', 'iu_status.setRow post : '.json_encode($this->input->post(NULL, FALSE)));
          log_message('debug', 'iu_status.getRows get : '.json_encode($this->input->get(NULL, FALSE)));
          $data = array(
                'iu_statusid' =>  $this->input->get_post('iu_statusid', TRUE)
                ,'instanceid' =>  $this->input->get_post('instanceid', TRUE)
                ,'sequence' =>   $this->input->get_post('sequence', TRUE)
                ,'theprocess' =>   $this->input->get_post('theprocess', TRUE)
                ,'thestage' =>   $this->input->get_post('thestage', TRUE)
                ,'name' =>   $this->input->get_post('name', TRUE)
                ,'isstartupstate' =>   $this->input->get_post('isstartupstate', TRUE)
                ,'isfinishstate' =>   $this->input->get_post('isfinishstate', TRUE)
            );
            $iu_status = $this->m_iu_status->setRow($data);
            print json_encode($iu_status);
    }
    function newRow() {
            log_message('debug', 'iu_status.newRow post : '.json_encode($this->input->post(NULL, FALSE)));
          $data = array(
                'iu_statusid' =>  $this->input->get_post('iu_statusid', TRUE)
                ,'instanceid' =>  $this->input->get_post('instanceid', TRUE)
                ,'sequence' =>   $this->input->get_post('sequence', TRUE)
                ,'theprocess' =>   $this->input->get_post('theprocess', TRUE)
                ,'thestage' =>   $this->input->get_post('thestage', TRUE)
                ,'name' =>   $this->input->get_post('name', TRUE)
                ,'isstartupstate' =>   $this->input->get_post('isstartupstate', TRUE)
                ,'isfinishstate' =>   $this->input->get_post('isfinishstate', TRUE)
            );
                $instanceid =  $this->input->get_post('instanceid', TRUE);
            $iu_status= $this->m_iu_status->newRow($instanceid,$data);
            $return = $iu_status;
            print json_encode($return);
    }
    function getRow() {
        log_message('debug', 'iu_status.getRow post : '.json_encode($this->input->post(NULL, FALSE)));
        $empId  =  $this->input->get_post('id', TRUE);
        if (isset($empId)) {
            $iu_status = $this->m_iu_status->getRow($empId);
            $return = array(
                'success' => true,
                'data'    => $iu_status
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
			$thestage=$this->input->get('thestage', FALSE);
			$urokid=$this->input->get('urokid', FALSE);
			$sibling=$this->input->get('sibling', FALSE);
			
			log_message('debug', 'iu_status.getRows : thestage='.$thestage);
			log_message('debug', 'iu_status.getRows : sibling='.$sibling);
			log_message('debug', 'iu_status.getRows : urokid='.$urokid);
			log_message('debug', 'iu_status.getRows : instanceid='.$instanceid);
			
            if($instanceid.''!=''){
                $iu_status= $this->m_iu_status->getRowsByInstance($instanceid,$sort);
            }else{
				if($thestage.''!=''){
					$iu_status= $this->m_iu_status->getRowsUS($thestage, $urokid, $sort);
				}else{
					if($sibling.''!=''){
						$iu_status= $this->m_iu_status->getRowsSIB($sibling, $sort);
					}else{
					$iu_status= $this->m_iu_status->getRows($sort);
					}
			   }
            }
            $return = array(
                'success' =>  TRUE ,
                'data'    => $iu_status
            );
        print json_encode($return);
    }
    function getRowsByInstance() {
        log_message('debug', 'iu_status.getRowsByInstance post : '.json_encode($this->input->post(NULL, FALSE)));
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
            $iu_status= $this->m_iu_status->getRowsByInstance($InstId,$sort);
            $return = array(
                'success' =>  TRUE ,
                'data'    => $iu_status
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
        log_message('debug', 'iu_status.getRowsByParent post : '.json_encode($this->input->post(NULL, FALSE)));
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
            $iu_status= $this->m_iu_status->getRowsByParent($ParentId,$sort);
            $return = array(
                'success' => TRUE,
                'data'    => $iu_status
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
        log_message('debug', 'iu_status.deleteRow post : '.json_encode($this->input->post(NULL, FALSE)));
        $tempId  =  $this->input->get_post('iu_statusid', TRUE);
        if (strlen($tempId) > 0) {
            $return = $this->m_iu_status->deleteRow($tempId);
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
        $this->load->model('M_iu_status', 'm_iu_status');
    }
}
?>
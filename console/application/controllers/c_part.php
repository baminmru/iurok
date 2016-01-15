<?php
	 class C_part extends CI_Controller {
    function __construct() {
         parent::__construct();
        $this->_loadModels();
    }
    function setRow() {
          log_message('debug', 'PART.setRow post : '.json_encode($this->input->post(NULL, FALSE)));
          log_message('debug', 'PART.getRows get : '.json_encode($this->input->get(NULL, FALSE)));
          $data = array(
                'partid' =>  $this->input->get_post('partid', TRUE)
                ,'instanceid' =>  $this->input->get_post('instanceid', TRUE)
                ,'parentid' =>  $this->input->get_post('parentid', TRUE)
                ,'treeid' =>  $this->input->get_post('treeid', TRUE)
                ,'sequence' =>   $this->input->get_post('sequence', TRUE)
                ,'parttype' =>   $this->input->get_post('parttype', TRUE)
                ,'caption' =>   $this->input->get_post('caption', TRUE)
                ,'name' =>   $this->input->get_post('name', TRUE)
                ,'the_comment' =>   $this->input->get_post('the_comment', TRUE)
                ,'nolog' =>   $this->input->get_post('nolog', TRUE)
                ,'manualregister' =>   $this->input->get_post('manualregister', TRUE)
                ,'oncreate' =>   $this->input->get_post('oncreate', TRUE)
                ,'onsave' =>   $this->input->get_post('onsave', TRUE)
                ,'onrun' =>   $this->input->get_post('onrun', TRUE)
                ,'ondelete' =>   $this->input->get_post('ondelete', TRUE)
                ,'addbehaivor' =>   $this->input->get_post('addbehaivor', TRUE)
                ,'extenderobject' =>   $this->input->get_post('extenderobject', TRUE)
                ,'shablonbrief' =>   $this->input->get_post('shablonbrief', TRUE)
                ,'rulebrief' =>   $this->input->get_post('rulebrief', TRUE)
                ,'isjormalchange' =>   $this->input->get_post('isjormalchange', TRUE)
                ,'usearchiving' =>   $this->input->get_post('usearchiving', TRUE)
                ,'integerpkey' =>   $this->input->get_post('integerpkey', TRUE)
                ,'particoncls' =>   $this->input->get_post('particoncls', TRUE)
            );
            $part = $this->m_part->setRow($data);
            print json_encode($part);
    }
    function newRow() {
            log_message('debug', 'PART.newRow post : '.json_encode($this->input->post(NULL, FALSE)));
          $data = array(
                'partid' =>  $this->input->get_post('partid', TRUE)
                ,'instanceid' =>  $this->input->get_post('instanceid', TRUE)
                ,'parentid' =>  $this->input->get_post('parentid', TRUE)
                ,'treeid' =>  $this->input->get_post('treeid', TRUE)
                ,'sequence' =>   $this->input->get_post('sequence', TRUE)
                ,'parttype' =>   $this->input->get_post('parttype', TRUE)
                ,'caption' =>   $this->input->get_post('caption', TRUE)
                ,'name' =>   $this->input->get_post('name', TRUE)
                ,'the_comment' =>   $this->input->get_post('the_comment', TRUE)
                ,'nolog' =>   $this->input->get_post('nolog', TRUE)
                ,'manualregister' =>   $this->input->get_post('manualregister', TRUE)
                ,'oncreate' =>   $this->input->get_post('oncreate', TRUE)
                ,'onsave' =>   $this->input->get_post('onsave', TRUE)
                ,'onrun' =>   $this->input->get_post('onrun', TRUE)
                ,'ondelete' =>   $this->input->get_post('ondelete', TRUE)
                ,'addbehaivor' =>   $this->input->get_post('addbehaivor', TRUE)
                ,'extenderobject' =>   $this->input->get_post('extenderobject', TRUE)
                ,'shablonbrief' =>   $this->input->get_post('shablonbrief', TRUE)
                ,'rulebrief' =>   $this->input->get_post('rulebrief', TRUE)
                ,'isjormalchange' =>   $this->input->get_post('isjormalchange', TRUE)
                ,'usearchiving' =>   $this->input->get_post('usearchiving', TRUE)
                ,'integerpkey' =>   $this->input->get_post('integerpkey', TRUE)
                ,'particoncls' =>   $this->input->get_post('particoncls', TRUE)
            );
                $instanceid =  $this->input->get_post('instanceid', TRUE);
                $parentid =  $this->input->get_post('parentid', TRUE);
            $treeid=$this->input->post('treeid', FALSE);
            $part= $this->m_part->newRow($instanceid,$treeid,$data);
            $return = $part;
            print json_encode($return);
    }
    function getRow() {
        log_message('debug', 'PART.getRow post : '.json_encode($this->input->post(NULL, FALSE)));
        $empId  =  $this->input->get_post('id', TRUE);
            $treeid  =  $this->input->get_post('treeid', TRUE);
        if (isset($empId)) {
            $part = $this->m_part->getRow($empId,$treeid);
            $return = array(
                'success' => true,
                'data'    => $part
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
           	$treeid=$this->input->get('treeid', FALSE);
                     if(isset($instanceid)){
                         if($instanceid!=''){
           			if(isset($treeid)){
           				log_message('debug', 'PART.getRows getRowsByInstanceTree');
           				$part= $this->m_part->getRowsByInstanceTree($instanceid,$treeid,$sort);
           			}else{
           				log_message('debug', 'PART.getRows getRowsByInstance');
           				$part= $this->m_part->getRowsByInstance($instanceid,$sort);
           			}
                         }else{
                             if(isset($treeid)){
           				log_message('debug', 'PART.getRows getRowsByTree');
           				$part= $this->m_part->getRowsByTree($treeid,$sort);
           			}else{
           				log_message('debug', 'PART.getRows getRows');
           				$part= $this->m_part->getRows($sort);
           			}
                         }
                     }else{
           			if(isset($treeid)){
           				log_message('debug', 'PART.getRows getRowsByTree');
           				$part= $this->m_part->getRowsByTree($treeid,$sort);
           			}else{
           				log_message('debug', 'PART.getRows getRows');
           				$part= $this->m_part->getRows($sort);
           			}
                     }
           print json_encode($part);
    }
    function getRowsByInstance() {
        log_message('debug', 'PART.getRowsByInstance post : '.json_encode($this->input->post(NULL, FALSE)));
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
            $part= $this->m_part->getRowsByInstance($InstId,$sort);
            $return = array(
                'success' =>  TRUE ,
                'data'    => $part
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
        log_message('debug', 'PART.getRowsByParent post : '.json_encode($this->input->post(NULL, FALSE)));
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
            $part= $this->m_part->getRowsByParent($ParentId,$sort);
            $return = array(
                'success' => TRUE,
                'data'    => $part
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
        log_message('debug', 'PART.deleteRow post : '.json_encode($this->input->post(NULL, FALSE)));
        $tempId  =  $this->input->get_post('partid', TRUE);
        if (strlen($tempId) > 0) {
            $return = $this->m_part->deleteRow($tempId);
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
        $this->load->model('M_part', 'm_part');
    }
}
?>
<?php
	 class C_iu_tm_act extends CI_Controller {
    function __construct() {
         parent::__construct();
        $this->_loadModels();
    }
    function setRow() {
          log_message('debug', 'iu_tm_act.setRow post : '.json_encode($this->input->post(NULL, FALSE)));
          log_message('debug', 'iu_tm_act.getRows get : '.json_encode($this->input->get(NULL, FALSE)));
          $data = array(
                'iu_tm_actid' =>  $this->input->get_post('iu_tm_actid', TRUE)
                ,'instanceid' =>  $this->input->get_post('instanceid', TRUE)
                ,'aktnum' =>   $this->input->get_post('aktnum', TRUE)
                ,'aktfile' =>   $this->input->get_post('aktfile', TRUE)
                ,'aktfile_ext' =>   $this->input->get_post('aktfile_ext', TRUE)
                ,'paymentdate' =>   $this->input->get_post('paymentdate', TRUE)
                ,'payment' =>   $this->input->get_post('payment', TRUE)
                ,'quantity' =>   $this->input->get_post('quantity', TRUE)
                ,'thecomment' =>   $this->input->get_post('thecomment', TRUE)
            );
            $iu_tm_act = $this->m_iu_tm_act->setRow($data);
            print json_encode($iu_tm_act);
    }
    function newRow() {
            log_message('debug', 'iu_tm_act.newRow post : '.json_encode($this->input->post(NULL, FALSE)));
          $data = array(
                'iu_tm_actid' =>  $this->input->get_post('iu_tm_actid', TRUE)
                ,'instanceid' =>  $this->input->get_post('instanceid', TRUE)
                ,'aktnum' =>   $this->input->get_post('aktnum', TRUE)
                ,'aktfile' =>   $this->input->get_post('aktfile', TRUE)
                ,'aktfile_ext' =>   $this->input->get_post('aktfile_ext', TRUE)
                ,'paymentdate' =>   $this->input->get_post('paymentdate', TRUE)
                ,'payment' =>   $this->input->get_post('payment', TRUE)
                ,'quantity' =>   $this->input->get_post('quantity', TRUE)
                ,'thecomment' =>   $this->input->get_post('thecomment', TRUE)
            );
                $instanceid =  $this->input->get_post('instanceid', TRUE);
            $iu_tm_act= $this->m_iu_tm_act->newRow($instanceid,$data);
            $return = $iu_tm_act;
            print json_encode($return);
    }
    function getRow() {
        log_message('debug', 'iu_tm_act.getRow post : '.json_encode($this->input->post(NULL, FALSE)));
        $empId  =  $this->input->get_post('id', TRUE);
        if (isset($empId)) {
            $iu_tm_act = $this->m_iu_tm_act->getRow($empId);
            $return = array(
                'success' => true,
                'data'    => $iu_tm_act
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
            	$sort[] = array('property'=>'aktnum', 'direction'=>'ASC');
            	$sort = json_encode($sort);
            }
            $instanceid=$this->input->get('instanceid', FALSE);
            if(isset($instanceid)){
                if($instanceid!=''){
                    $iu_tm_act= $this->m_iu_tm_act->getRowsByInstance($instanceid,$sort);
                }else{
                    $iu_tm_act= $this->m_iu_tm_act->getRows($sort);
                }
            }else{
              $iu_tm_act= $this->m_iu_tm_act->getRows($sort);
            }
            $return = array(
                'success' =>  TRUE ,
                'data'    => $iu_tm_act
            );
        print json_encode($return);
    }
    function getRowsByInstance() {
        log_message('debug', 'iu_tm_act.getRowsByInstance post : '.json_encode($this->input->post(NULL, FALSE)));
            $group = $this->input->get('group', FALSE); 
           $sort = $this->input->get('sort', FALSE);
           if(!$sort && $group) $sort = $group;
           if(!$sort || $group == $sort) 
            {
            	$sort = json_decode($sort);
            	$sort[] = array('property'=>'aktnum', 'direction'=>'ASC');
            	$sort = json_encode($sort);
            }
        $InstId  =  $this->input->get_post('instanceid', TRUE);
        if (strlen($InstId) > 0) {
            $iu_tm_act= $this->m_iu_tm_act->getRowsByInstance($InstId,$sort);
            $return = array(
                'success' =>  TRUE ,
                'data'    => $iu_tm_act
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
        log_message('debug', 'iu_tm_act.getRowsByParent post : '.json_encode($this->input->post(NULL, FALSE)));
            $group = $this->input->get('group', FALSE); 
           $sort = $this->input->get('sort', FALSE);
           if(!$sort && $group) $sort = $group;
           if(!$sort || $group == $sort) 
            {
            	$sort = json_decode($sort);
            	$sort[] = array('property'=>'aktnum', 'direction'=>'ASC');
            	$sort = json_encode($sort);
            }
        $ParentId  =  $this->input->get_post('parentid', TRUE);
        if (strlen($ParentId) > 0) {
            $iu_tm_act= $this->m_iu_tm_act->getRowsByParent($ParentId,$sort);
            $return = array(
                'success' => TRUE,
                'data'    => $iu_tm_act
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
        log_message('debug', 'iu_tm_act.deleteRow post : '.json_encode($this->input->post(NULL, FALSE)));
        $tempId  =  $this->input->get_post('iu_tm_actid', TRUE);
        if (strlen($tempId) > 0) {
            $return = $this->m_iu_tm_act->deleteRow($tempId);
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
        $this->load->model('M_iu_tm_act', 'm_iu_tm_act');
    }
}
?>
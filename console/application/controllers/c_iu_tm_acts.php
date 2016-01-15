<?php
	 class C_iu_tm_acts extends CI_Controller {
    function __construct() {
         parent::__construct();
        $this->_loadModels();
    }
    function setRow() {
          log_message('debug', 'iu_tm_acts.setRow post : '.json_encode($this->input->post(NULL, FALSE)));
          log_message('debug', 'iu_tm_acts.getRows get : '.json_encode($this->input->get(NULL, FALSE)));
          $data = array(
                'iu_tm_actsid' =>  $this->input->get_post('iu_tm_actsid', TRUE)
                ,'instanceid' =>  $this->input->get_post('instanceid', TRUE)
                ,'parentid' =>  $this->input->get_post('parentid', TRUE)
                ,'aktnum' =>   $this->input->get_post('aktnum', TRUE)
                ,'aktfile' =>   $this->input->get_post('aktfile', TRUE)
                ,'aktfile_ext' =>   $this->input->get_post('aktfile_ext', TRUE)
                ,'quantity' =>   $this->input->get_post('quantity', TRUE)
                ,'payment' =>   $this->input->get_post('payment', TRUE)
                ,'paymentdate' =>   $this->input->get_post('paymentdate', TRUE)
                ,'msgfile' =>   $this->input->get_post('msgfile', TRUE)
                ,'msgfile_ext' =>   $this->input->get_post('msgfile_ext', TRUE)
                ,'paymentfile' =>   $this->input->get_post('paymentfile', TRUE)
                ,'paymentfile_ext' =>   $this->input->get_post('paymentfile_ext', TRUE)
                ,'avancefile' =>   $this->input->get_post('avancefile', TRUE)
                ,'avancefile_ext' =>   $this->input->get_post('avancefile_ext', TRUE)
                ,'thecomment' =>   $this->input->get_post('thecomment', TRUE)
            );
            $iu_tm_acts = $this->m_iu_tm_acts->setRow($data);
            print json_encode($iu_tm_acts);
    }
    function newRow() {
            log_message('debug', 'iu_tm_acts.newRow post : '.json_encode($this->input->post(NULL, FALSE)));
          $data = array(
                'iu_tm_actsid' =>  $this->input->get_post('iu_tm_actsid', TRUE)
                ,'instanceid' =>  $this->input->get_post('instanceid', TRUE)
                ,'parentid' =>  $this->input->get_post('parentid', TRUE)
                ,'aktnum' =>   $this->input->get_post('aktnum', TRUE)
                ,'aktfile' =>   $this->input->get_post('aktfile', TRUE)
                ,'aktfile_ext' =>   $this->input->get_post('aktfile_ext', TRUE)
                ,'quantity' =>   $this->input->get_post('quantity', TRUE)
                ,'payment' =>   $this->input->get_post('payment', TRUE)
                ,'paymentdate' =>   $this->input->get_post('paymentdate', TRUE)
                ,'msgfile' =>   $this->input->get_post('msgfile', TRUE)
                ,'msgfile_ext' =>   $this->input->get_post('msgfile_ext', TRUE)
                ,'paymentfile' =>   $this->input->get_post('paymentfile', TRUE)
                ,'paymentfile_ext' =>   $this->input->get_post('paymentfile_ext', TRUE)
                ,'avancefile' =>   $this->input->get_post('avancefile', TRUE)
                ,'avancefile_ext' =>   $this->input->get_post('avancefile_ext', TRUE)
                ,'thecomment' =>   $this->input->get_post('thecomment', TRUE)
            );
                $instanceid =  $this->input->get_post('instanceid', TRUE);
                $parentid =  $this->input->get_post('parentid', TRUE);
            $iu_tm_acts= $this->m_iu_tm_acts->newRow($instanceid,$parentid,$data);
            $return = $iu_tm_acts;
            print json_encode($return);
    }
    function getRowTemp() {
        log_message('debug', 'iu_tm_acts.getRow post : '.json_encode($this->input->post(NULL, FALSE)));
        $empId  =  $this->input->get_post('id', TRUE);
        if (isset($empId)) {
            $iu_tm_acts = $this->m_iu_tm_acts->getRowTemp($empId);
            $return = array(
                'success' => true,
                'data'    => $iu_tm_acts
            );
            print json_encode($return);
        }
    }
    function getRowsTemp() {
            $group = $this->input->get('group', FALSE); 
           $sort = $this->input->get('sort', FALSE);
           if(!$sort && $group) $sort = $group;
           if(!$sort || $group == $sort) 
            {
            	$sort = json_decode($sort);
            	$sort[] = array('property'=>'aktnum', 'direction'=>'ASC');
            	$sort = json_encode($sort);
            }
            $parentid=$this->input->get('parentid', FALSE);
            if(isset($parentid)){
                if($parentid!=''){
                    $iu_tm_acts= $this->m_iu_tm_acts->getRowsByParentTemp($parentid,$sort);
                }else{
                    $iu_tm_acts= $this->m_iu_tm_acts->getRowsTemp($sort);
                }
            }else{
              $iu_tm_acts= $this->m_iu_tm_acts->getRowsTemp($sort);
            }
            $return = array(
                'success' =>  TRUE ,
                'data'    => $iu_tm_acts
            );
        print json_encode($return);
    }
    function getRowsByInstanceTemp() {
        log_message('debug', 'iu_tm_acts.getRowsByInstance post : '.json_encode($this->input->post(NULL, FALSE)));
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
            $iu_tm_acts= $this->m_iu_tm_acts->getRowsByInstanceTemp($InstId,$sort);
            $return = array(
                'success' =>  TRUE ,
                'data'    => $iu_tm_acts
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
    function getRowsByParentTemp() {
        log_message('debug', 'iu_tm_acts.getRowsByParent post : '.json_encode($this->input->post(NULL, FALSE)));
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
            $iu_tm_acts= $this->m_iu_tm_acts->getRowsByParentTemp($ParentId,$sort);
            $return = array(
                'success' => TRUE,
                'data'    => $iu_tm_acts
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
    function getRow() {
        log_message('debug', 'iu_tm_acts.getRow post : '.json_encode($this->input->post(NULL, FALSE)));
        $empId  =  $this->input->get_post('id', TRUE);
        if (isset($empId)) {
            $iu_tm_acts = $this->m_iu_tm_acts->getRow($empId);
            $return = array(
                'success' => true,
                'data'    => $iu_tm_acts
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
            $parentid=$this->input->get('parentid', FALSE);
            if(isset($parentid)){
                if($parentid!=''){
                    $iu_tm_acts= $this->m_iu_tm_acts->getRowsByParent($parentid,$sort);
                }else{
                    $iu_tm_acts= $this->m_iu_tm_acts->getRows($sort);
                }
            }else{
              $iu_tm_acts= $this->m_iu_tm_acts->getRows($sort);
            }
            $return = array(
                'success' =>  TRUE ,
                'data'    => $iu_tm_acts
            );
        print json_encode($return);
    }
    function getRowsByInstance() {
        log_message('debug', 'iu_tm_acts.getRowsByInstance post : '.json_encode($this->input->post(NULL, FALSE)));
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
            $iu_tm_acts= $this->m_iu_tm_acts->getRowsByInstance($InstId,$sort);
            $return = array(
                'success' =>  TRUE ,
                'data'    => $iu_tm_acts
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
        log_message('debug', 'iu_tm_acts.getRowsByParent post : '.json_encode($this->input->post(NULL, FALSE)));
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
            $iu_tm_acts= $this->m_iu_tm_acts->getRowsByParent($ParentId,$sort);
            $return = array(
                'success' => TRUE,
                'data'    => $iu_tm_acts
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
        log_message('debug', 'iu_tm_acts.deleteRow post : '.json_encode($this->input->post(NULL, FALSE)));
        $tempId  =  $this->input->get_post('iu_tm_actsid', TRUE);
        if (strlen($tempId) > 0) {
            $return = $this->m_iu_tm_acts->deleteRow($tempId);
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
        $this->load->model('M_iu_tm_acts', 'm_iu_tm_acts');
    }
}
?>
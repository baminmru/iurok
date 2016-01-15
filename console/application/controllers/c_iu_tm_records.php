<?php
	 class C_iu_tm_records extends CI_Controller {
    function __construct() {
         parent::__construct();
        $this->_loadModels();
    }
    function setRow() {
          log_message('debug', 'iu_tm_records.setRow post : '.json_encode($this->input->post(NULL, FALSE)));
          log_message('debug', 'iu_tm_records.getRows get : '.json_encode($this->input->get(NULL, FALSE)));
          $data = array(
                'iu_tm_recordsid' =>  $this->input->get_post('iu_tm_recordsid', TRUE)
                ,'instanceid' =>  $this->input->get_post('instanceid', TRUE)
                ,'passport' =>   $this->input->get_post('passport', TRUE)
                ,'inn' =>   $this->input->get_post('inn', TRUE)
                ,'snils' =>   $this->input->get_post('snils', TRUE)
                ,'bankinfo' =>   $this->input->get_post('bankinfo', TRUE)
                ,'scanpassport' =>   $this->input->get_post('scanpassport', TRUE)
                ,'scanpassport_ext' =>   $this->input->get_post('scanpassport_ext', TRUE)
                ,'scaninn' =>   $this->input->get_post('scaninn', TRUE)
                ,'scaninn_ext' =>   $this->input->get_post('scaninn_ext', TRUE)
                ,'scansnils' =>   $this->input->get_post('scansnils', TRUE)
                ,'scansnils_ext' =>   $this->input->get_post('scansnils_ext', TRUE)
                ,'info' =>   $this->input->get_post('info', TRUE)
                ,'tmfile' =>   $this->input->get_post('tmfile', TRUE)
                ,'tmfile_ext' =>   $this->input->get_post('tmfile_ext', TRUE)
                ,'thecomment' =>   $this->input->get_post('thecomment', TRUE)
            );
            $iu_tm_records = $this->m_iu_tm_records->setRow($data);
            print json_encode($iu_tm_records);
    }
    function newRow() {
            log_message('debug', 'iu_tm_records.newRow post : '.json_encode($this->input->post(NULL, FALSE)));
          $data = array(
                'iu_tm_recordsid' =>  $this->input->get_post('iu_tm_recordsid', TRUE)
                ,'instanceid' =>  $this->input->get_post('instanceid', TRUE)
                ,'passport' =>   $this->input->get_post('passport', TRUE)
                ,'inn' =>   $this->input->get_post('inn', TRUE)
                ,'snils' =>   $this->input->get_post('snils', TRUE)
                ,'bankinfo' =>   $this->input->get_post('bankinfo', TRUE)
                ,'scanpassport' =>   $this->input->get_post('scanpassport', TRUE)
                ,'scanpassport_ext' =>   $this->input->get_post('scanpassport_ext', TRUE)
                ,'scaninn' =>   $this->input->get_post('scaninn', TRUE)
                ,'scaninn_ext' =>   $this->input->get_post('scaninn_ext', TRUE)
                ,'scansnils' =>   $this->input->get_post('scansnils', TRUE)
                ,'scansnils_ext' =>   $this->input->get_post('scansnils_ext', TRUE)
                ,'info' =>   $this->input->get_post('info', TRUE)
                ,'tmfile' =>   $this->input->get_post('tmfile', TRUE)
                ,'tmfile_ext' =>   $this->input->get_post('tmfile_ext', TRUE)
                ,'thecomment' =>   $this->input->get_post('thecomment', TRUE)
            );
                $instanceid =  $this->input->get_post('instanceid', TRUE);
            $iu_tm_records= $this->m_iu_tm_records->newRow($instanceid,$data);
            $return = $iu_tm_records;
            print json_encode($return);
    }
    function getRow() {
        log_message('debug', 'iu_tm_records.getRow post : '.json_encode($this->input->post(NULL, FALSE)));
        $empId  =  $this->input->get_post('id', TRUE);
        if (isset($empId)) {
            $iu_tm_records = $this->m_iu_tm_records->getRow($empId);
            $return = array(
                'success' => true,
                'data'    => $iu_tm_records
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
            	$sort[] = array('property'=>'passport', 'direction'=>'ASC');
            	$sort = json_encode($sort);
            }
            $instanceid=$this->input->get('instanceid', FALSE);
            if(isset($instanceid)){
                if($instanceid!=''){
                    $iu_tm_records= $this->m_iu_tm_records->getRowsByInstance($instanceid,$sort);
                }else{
                    $iu_tm_records= $this->m_iu_tm_records->getRows($sort);
                }
            }else{
              $iu_tm_records= $this->m_iu_tm_records->getRows($sort);
            }
            $return = array(
                'success' =>  TRUE ,
                'data'    => $iu_tm_records
            );
        print json_encode($return);
    }
    function getRowsByInstance() {
        log_message('debug', 'iu_tm_records.getRowsByInstance post : '.json_encode($this->input->post(NULL, FALSE)));
            $group = $this->input->get('group', FALSE); 
           $sort = $this->input->get('sort', FALSE);
           if(!$sort && $group) $sort = $group;
           if(!$sort || $group == $sort) 
            {
            	$sort = json_decode($sort);
            	$sort[] = array('property'=>'passport', 'direction'=>'ASC');
            	$sort = json_encode($sort);
            }
        $InstId  =  $this->input->get_post('instanceid', TRUE);
        if (strlen($InstId) > 0) {
            $iu_tm_records= $this->m_iu_tm_records->getRowsByInstance($InstId,$sort);
            $return = array(
                'success' =>  TRUE ,
                'data'    => $iu_tm_records
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
        log_message('debug', 'iu_tm_records.getRowsByParent post : '.json_encode($this->input->post(NULL, FALSE)));
            $group = $this->input->get('group', FALSE); 
           $sort = $this->input->get('sort', FALSE);
           if(!$sort && $group) $sort = $group;
           if(!$sort || $group == $sort) 
            {
            	$sort = json_decode($sort);
            	$sort[] = array('property'=>'passport', 'direction'=>'ASC');
            	$sort = json_encode($sort);
            }
        $ParentId  =  $this->input->get_post('parentid', TRUE);
        if (strlen($ParentId) > 0) {
            $iu_tm_records= $this->m_iu_tm_records->getRowsByParent($ParentId,$sort);
            $return = array(
                'success' => TRUE,
                'data'    => $iu_tm_records
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
        log_message('debug', 'iu_tm_records.deleteRow post : '.json_encode($this->input->post(NULL, FALSE)));
        $tempId  =  $this->input->get_post('iu_tm_recordsid', TRUE);
        if (strlen($tempId) > 0) {
            $return = $this->m_iu_tm_records->deleteRow($tempId);
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
        $this->load->model('M_iu_tm_records', 'm_iu_tm_records');
    }
}
?>
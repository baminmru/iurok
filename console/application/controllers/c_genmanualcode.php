<?php
	 class C_genmanualcode extends CI_Controller {
    function __construct() {
         parent::__construct();
        $this->_loadModels();
    }
    function setRow() {
          log_message('debug', 'GENMANUALCODE.setRow post : '.json_encode($this->input->post(NULL, FALSE)));
          log_message('debug', 'GENMANUALCODE.getRows get : '.json_encode($this->input->get(NULL, FALSE)));
          $data = array(
                'genmanualcodeid' =>  $this->input->get_post('genmanualcodeid', TRUE)
                ,'instanceid' =>  $this->input->get_post('instanceid', TRUE)
                ,'parentid' =>  $this->input->get_post('parentid', TRUE)
                ,'name' =>   $this->input->get_post('name', TRUE)
                ,'the_alias' =>   $this->input->get_post('the_alias', TRUE)
                ,'code' =>   $this->input->get_post('code', TRUE)
            );
            $genmanualcode = $this->m_genmanualcode->setRow($data);
            print json_encode($genmanualcode);
    }
    function newRow() {
            log_message('debug', 'GENMANUALCODE.newRow post : '.json_encode($this->input->post(NULL, FALSE)));
          $data = array(
                'genmanualcodeid' =>  $this->input->get_post('genmanualcodeid', TRUE)
                ,'instanceid' =>  $this->input->get_post('instanceid', TRUE)
                ,'parentid' =>  $this->input->get_post('parentid', TRUE)
                ,'name' =>   $this->input->get_post('name', TRUE)
                ,'the_alias' =>   $this->input->get_post('the_alias', TRUE)
                ,'code' =>   $this->input->get_post('code', TRUE)
            );
                $instanceid =  $this->input->get_post('instanceid', TRUE);
                $parentid =  $this->input->get_post('parentid', TRUE);
            $genmanualcode= $this->m_genmanualcode->newRow($instanceid,$parentid,$data);
            $return = $genmanualcode;
            print json_encode($return);
    }
    function getRow() {
        log_message('debug', 'GENMANUALCODE.getRow post : '.json_encode($this->input->post(NULL, FALSE)));
        $empId  =  $this->input->get_post('id', TRUE);
        if (isset($empId)) {
            $genmanualcode = $this->m_genmanualcode->getRow($empId);
            $return = array(
                'success' => true,
                'data'    => $genmanualcode
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
                    $genmanualcode= $this->m_genmanualcode->getRowsByParent($parentid,$sort);
                }else{
                    $genmanualcode= $this->m_genmanualcode->getRows($sort);
                }
            }else{
              $genmanualcode= $this->m_genmanualcode->getRows($sort);
            }
            $return = array(
                'success' =>  TRUE ,
                'data'    => $genmanualcode
            );
        print json_encode($return);
    }
    function getRowsByInstance() {
        log_message('debug', 'GENMANUALCODE.getRowsByInstance post : '.json_encode($this->input->post(NULL, FALSE)));
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
            $genmanualcode= $this->m_genmanualcode->getRowsByInstance($InstId,$sort);
            $return = array(
                'success' =>  TRUE ,
                'data'    => $genmanualcode
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
        log_message('debug', 'GENMANUALCODE.getRowsByParent post : '.json_encode($this->input->post(NULL, FALSE)));
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
            $genmanualcode= $this->m_genmanualcode->getRowsByParent($ParentId,$sort);
            $return = array(
                'success' => TRUE,
                'data'    => $genmanualcode
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
        log_message('debug', 'GENMANUALCODE.deleteRow post : '.json_encode($this->input->post(NULL, FALSE)));
        $tempId  =  $this->input->get_post('genmanualcodeid', TRUE);
        if (strlen($tempId) > 0) {
            $return = $this->m_genmanualcode->deleteRow($tempId);
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
        $this->load->model('M_genmanualcode', 'm_genmanualcode');
    }
}
?>
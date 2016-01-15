<?php
	 class C_iu_tm_dog extends CI_Controller {
    function __construct() {
         parent::__construct();
        $this->_loadModels();
    }
    function setRow() {
          log_message('debug', 'iu_tm_dog.setRow post : '.json_encode($this->input->post(NULL, FALSE)));
          log_message('debug', 'iu_tm_dog.getRows get : '.json_encode($this->input->get(NULL, FALSE)));
          $data = array(
                'iu_tm_dogid' =>  $this->input->get_post('iu_tm_dogid', TRUE)
                ,'instanceid' =>  $this->input->get_post('instanceid', TRUE)
                ,'thedate' =>   $this->input->get_post('thedate', TRUE)
                ,'thenumber' =>   $this->input->get_post('thenumber', TRUE)
                ,'dogfile' =>   $this->input->get_post('dogfile', TRUE)
                ,'dogfile_ext' =>   $this->input->get_post('dogfile_ext', TRUE)
                ,'info' =>   $this->input->get_post('info', TRUE)
            );
            $iu_tm_dog = $this->m_iu_tm_dog->setRow($data);
            print json_encode($iu_tm_dog);
    }
    function newRow() {
            log_message('debug', 'iu_tm_dog.newRow post : '.json_encode($this->input->post(NULL, FALSE)));
          $data = array(
                'iu_tm_dogid' =>  $this->input->get_post('iu_tm_dogid', TRUE)
                ,'instanceid' =>  $this->input->get_post('instanceid', TRUE)
                ,'thedate' =>   $this->input->get_post('thedate', TRUE)
                ,'thenumber' =>   $this->input->get_post('thenumber', TRUE)
                ,'dogfile' =>   $this->input->get_post('dogfile', TRUE)
                ,'dogfile_ext' =>   $this->input->get_post('dogfile_ext', TRUE)
                ,'info' =>   $this->input->get_post('info', TRUE)
            );
                $instanceid =  $this->input->get_post('instanceid', TRUE);
            $iu_tm_dog= $this->m_iu_tm_dog->newRow($instanceid,$data);
            $return = $iu_tm_dog;
            print json_encode($return);
    }
    function getRow() {
        log_message('debug', 'iu_tm_dog.getRow post : '.json_encode($this->input->post(NULL, FALSE)));
        $empId  =  $this->input->get_post('id', TRUE);
        if (isset($empId)) {
            $iu_tm_dog = $this->m_iu_tm_dog->getRow($empId);
            $return = array(
                'success' => true,
                'data'    => $iu_tm_dog
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
            	$sort[] = array('property'=>'thedate', 'direction'=>'ASC');
            	$sort = json_encode($sort);
            }
            $instanceid=$this->input->get('instanceid', FALSE);
            if(isset($instanceid)){
                if($instanceid!=''){
                    $iu_tm_dog= $this->m_iu_tm_dog->getRowsByInstance($instanceid,$sort);
                }else{
                    $iu_tm_dog= $this->m_iu_tm_dog->getRows($sort);
                }
            }else{
              $iu_tm_dog= $this->m_iu_tm_dog->getRows($sort);
            }
            $return = array(
                'success' =>  TRUE ,
                'data'    => $iu_tm_dog
            );
        print json_encode($return);
    }
    function getRowsByInstance() {
        log_message('debug', 'iu_tm_dog.getRowsByInstance post : '.json_encode($this->input->post(NULL, FALSE)));
            $group = $this->input->get('group', FALSE); 
           $sort = $this->input->get('sort', FALSE);
           if(!$sort && $group) $sort = $group;
           if(!$sort || $group == $sort) 
            {
            	$sort = json_decode($sort);
            	$sort[] = array('property'=>'thedate', 'direction'=>'ASC');
            	$sort = json_encode($sort);
            }
        $InstId  =  $this->input->get_post('instanceid', TRUE);
        if (strlen($InstId) > 0) {
            $iu_tm_dog= $this->m_iu_tm_dog->getRowsByInstance($InstId,$sort);
            $return = array(
                'success' =>  TRUE ,
                'data'    => $iu_tm_dog
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
        log_message('debug', 'iu_tm_dog.getRowsByParent post : '.json_encode($this->input->post(NULL, FALSE)));
            $group = $this->input->get('group', FALSE); 
           $sort = $this->input->get('sort', FALSE);
           if(!$sort && $group) $sort = $group;
           if(!$sort || $group == $sort) 
            {
            	$sort = json_decode($sort);
            	$sort[] = array('property'=>'thedate', 'direction'=>'ASC');
            	$sort = json_encode($sort);
            }
        $ParentId  =  $this->input->get_post('parentid', TRUE);
        if (strlen($ParentId) > 0) {
            $iu_tm_dog= $this->m_iu_tm_dog->getRowsByParent($ParentId,$sort);
            $return = array(
                'success' => TRUE,
                'data'    => $iu_tm_dog
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
        log_message('debug', 'iu_tm_dog.deleteRow post : '.json_encode($this->input->post(NULL, FALSE)));
        $tempId  =  $this->input->get_post('iu_tm_dogid', TRUE);
        if (strlen($tempId) > 0) {
            $return = $this->m_iu_tm_dog->deleteRow($tempId);
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
        $this->load->model('M_iu_tm_dog', 'm_iu_tm_dog');
    }
}
?>
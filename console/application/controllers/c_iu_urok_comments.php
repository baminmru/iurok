<?php
	 class C_iu_urok_comments extends CI_Controller {
    function __construct() {
         parent::__construct();
        $this->_loadModels();
    }
    function setRow() {
          log_message('debug', 'iu_urok_comments.setRow post : '.json_encode($this->input->post(NULL, FALSE)));
          log_message('debug', 'iu_urok_comments.getRows get : '.json_encode($this->input->get(NULL, FALSE)));
          $data = array(
                'iu_urok_commentsid' =>  $this->input->get_post('iu_urok_commentsid', TRUE)
                ,'instanceid' =>  $this->input->get_post('instanceid', TRUE)
                ,'parentid' =>  $this->input->get_post('parentid', TRUE)
                ,'timemarker' =>   $this->input->get_post('timemarker', TRUE)
                ,'thedate' =>   $this->input->get_post('thedate', TRUE)
                ,'theauthor' =>   $this->input->get_post('theauthor', TRUE)
                ,'info' =>   $this->input->get_post('info', TRUE)
            );
            $iu_urok_comments = $this->m_iu_urok_comments->setRow($data);
            print json_encode($iu_urok_comments);
    }
    function newRow() {
            log_message('debug', 'iu_urok_comments.newRow post : '.json_encode($this->input->post(NULL, FALSE)));
          $data = array(
                'iu_urok_commentsid' =>  $this->input->get_post('iu_urok_commentsid', TRUE)
                ,'instanceid' =>  $this->input->get_post('instanceid', TRUE)
                ,'parentid' =>  $this->input->get_post('parentid', TRUE)
                ,'timemarker' =>   $this->input->get_post('timemarker', TRUE)
                ,'thedate' =>   $this->input->get_post('thedate', TRUE)
                ,'theauthor' =>   $this->input->get_post('theauthor', TRUE)
                ,'info' =>   $this->input->get_post('info', TRUE)
            );
                $instanceid =  $this->input->get_post('instanceid', TRUE);
                $parentid =  $this->input->get_post('parentid', TRUE);
            $iu_urok_comments= $this->m_iu_urok_comments->newRow($instanceid,$parentid,$data);
            $return = $iu_urok_comments;
            print json_encode($return);
    }
    function getRow() {
        log_message('debug', 'iu_urok_comments.getRow post : '.json_encode($this->input->post(NULL, FALSE)));
        $empId  =  $this->input->get_post('id', TRUE);
        if (isset($empId)) {
            $iu_urok_comments = $this->m_iu_urok_comments->getRow($empId);
            $return = array(
                'success' => true,
                'data'    => $iu_urok_comments
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
            	$sort[] = array('property'=>'timemarker', 'direction'=>'ASC');
            	$sort = json_encode($sort);
            }
            $parentid=$this->input->get('parentid', FALSE);
            if(isset($parentid)){
                if($parentid!=''){
                    $iu_urok_comments= $this->m_iu_urok_comments->getRowsByParent($parentid,$sort);
                }else{
                    $iu_urok_comments= $this->m_iu_urok_comments->getRows($sort);
                }
            }else{
              $iu_urok_comments= $this->m_iu_urok_comments->getRows($sort);
            }
            $return = array(
                'success' =>  TRUE ,
                'data'    => $iu_urok_comments
            );
        print json_encode($return);
    }
    function getRowsByInstance() {
        log_message('debug', 'iu_urok_comments.getRowsByInstance post : '.json_encode($this->input->post(NULL, FALSE)));
            $group = $this->input->get('group', FALSE); 
           $sort = $this->input->get('sort', FALSE);
           if(!$sort && $group) $sort = $group;
           if(!$sort || $group == $sort) 
            {
            	$sort = json_decode($sort);
            	$sort[] = array('property'=>'timemarker', 'direction'=>'ASC');
            	$sort = json_encode($sort);
            }
        $InstId  =  $this->input->get_post('instanceid', TRUE);
        if (strlen($InstId) > 0) {
            $iu_urok_comments= $this->m_iu_urok_comments->getRowsByInstance($InstId,$sort);
            $return = array(
                'success' =>  TRUE ,
                'data'    => $iu_urok_comments
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
        log_message('debug', 'iu_urok_comments.getRowsByParent post : '.json_encode($this->input->post(NULL, FALSE)));
            $group = $this->input->get('group', FALSE); 
           $sort = $this->input->get('sort', FALSE);
           if(!$sort && $group) $sort = $group;
           if(!$sort || $group == $sort) 
            {
            	$sort = json_decode($sort);
            	$sort[] = array('property'=>'timemarker', 'direction'=>'ASC');
            	$sort = json_encode($sort);
            }
        $ParentId  =  $this->input->get_post('parentid', TRUE);
        if (strlen($ParentId) > 0) {
            $iu_urok_comments= $this->m_iu_urok_comments->getRowsByParent($ParentId,$sort);
            $return = array(
                'success' => TRUE,
                'data'    => $iu_urok_comments
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
        log_message('debug', 'iu_urok_comments.deleteRow post : '.json_encode($this->input->post(NULL, FALSE)));
        $tempId  =  $this->input->get_post('iu_urok_commentsid', TRUE);
        if (strlen($tempId) > 0) {
            $return = $this->m_iu_urok_comments->deleteRow($tempId);
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
        $this->load->model('M_iu_urok_comments', 'm_iu_urok_comments');
    }
}
?>
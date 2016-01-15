<?php
	 class C_objecttype extends CI_Controller {
    function __construct() {
         parent::__construct();
        $this->_loadModels();
    }
    function setRow() {
          log_message('debug', 'OBJECTTYPE.setRow post : '.json_encode($this->input->post(NULL, FALSE)));
          log_message('debug', 'OBJECTTYPE.getRows get : '.json_encode($this->input->get(NULL, FALSE)));
          $data = array(
                'objecttypeid' =>  $this->input->get_post('objecttypeid', TRUE)
                ,'instanceid' =>  $this->input->get_post('instanceid', TRUE)
                ,'package' =>   $this->input->get_post('package', TRUE)
                ,'the_comment' =>   $this->input->get_post('the_comment', TRUE)
                ,'name' =>   $this->input->get_post('name', TRUE)
                ,'issingleinstance' =>   $this->input->get_post('issingleinstance', TRUE)
                ,'chooseview' =>   $this->input->get_post('chooseview', TRUE)
                ,'onrun' =>   $this->input->get_post('onrun', TRUE)
                ,'oncreate' =>   $this->input->get_post('oncreate', TRUE)
                ,'ondelete' =>   $this->input->get_post('ondelete', TRUE)
                ,'allowreftoobject' =>   $this->input->get_post('allowreftoobject', TRUE)
                ,'allowsearch' =>   $this->input->get_post('allowsearch', TRUE)
                ,'replicatype' =>   $this->input->get_post('replicatype', TRUE)
                ,'thecomment' =>   $this->input->get_post('thecomment', TRUE)
                ,'useownership' =>   $this->input->get_post('useownership', TRUE)
                ,'usearchiving' =>   $this->input->get_post('usearchiving', TRUE)
                ,'commitfullobject' =>   $this->input->get_post('commitfullobject', TRUE)
                ,'objiconcls' =>   $this->input->get_post('objiconcls', TRUE)
            );
            $objecttype = $this->m_objecttype->setRow($data);
            print json_encode($objecttype);
    }
    function newRow() {
            log_message('debug', 'OBJECTTYPE.newRow post : '.json_encode($this->input->post(NULL, FALSE)));
          $data = array(
                'objecttypeid' =>  $this->input->get_post('objecttypeid', TRUE)
                ,'instanceid' =>  $this->input->get_post('instanceid', TRUE)
                ,'package' =>   $this->input->get_post('package', TRUE)
                ,'the_comment' =>   $this->input->get_post('the_comment', TRUE)
                ,'name' =>   $this->input->get_post('name', TRUE)
                ,'issingleinstance' =>   $this->input->get_post('issingleinstance', TRUE)
                ,'chooseview' =>   $this->input->get_post('chooseview', TRUE)
                ,'onrun' =>   $this->input->get_post('onrun', TRUE)
                ,'oncreate' =>   $this->input->get_post('oncreate', TRUE)
                ,'ondelete' =>   $this->input->get_post('ondelete', TRUE)
                ,'allowreftoobject' =>   $this->input->get_post('allowreftoobject', TRUE)
                ,'allowsearch' =>   $this->input->get_post('allowsearch', TRUE)
                ,'replicatype' =>   $this->input->get_post('replicatype', TRUE)
                ,'thecomment' =>   $this->input->get_post('thecomment', TRUE)
                ,'useownership' =>   $this->input->get_post('useownership', TRUE)
                ,'usearchiving' =>   $this->input->get_post('usearchiving', TRUE)
                ,'commitfullobject' =>   $this->input->get_post('commitfullobject', TRUE)
                ,'objiconcls' =>   $this->input->get_post('objiconcls', TRUE)
            );
                $instanceid =  $this->input->get_post('instanceid', TRUE);
            $objecttype= $this->m_objecttype->newRow($instanceid,$data);
            $return = $objecttype;
            print json_encode($return);
    }
    function getRow() {
        log_message('debug', 'OBJECTTYPE.getRow post : '.json_encode($this->input->post(NULL, FALSE)));
        $empId  =  $this->input->get_post('id', TRUE);
        if (isset($empId)) {
            $objecttype = $this->m_objecttype->getRow($empId);
            $return = array(
                'success' => true,
                'data'    => $objecttype
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
            	$sort[] = array('property'=>'package', 'direction'=>'ASC');
            	$sort = json_encode($sort);
            }
            $instanceid=$this->input->get('instanceid', FALSE);
            if(isset($instanceid)){
                if($instanceid!=''){
                    $objecttype= $this->m_objecttype->getRowsByInstance($instanceid,$sort);
                }else{
                    $objecttype= $this->m_objecttype->getRows($sort);
                }
            }else{
              $objecttype= $this->m_objecttype->getRows($sort);
            }
            $return = array(
                'success' =>  TRUE ,
                'data'    => $objecttype
            );
        print json_encode($return);
    }
    function getRowsByInstance() {
        log_message('debug', 'OBJECTTYPE.getRowsByInstance post : '.json_encode($this->input->post(NULL, FALSE)));
            $group = $this->input->get('group', FALSE); 
           $sort = $this->input->get('sort', FALSE);
           if(!$sort && $group) $sort = $group;
           if(!$sort || $group == $sort) 
            {
            	$sort = json_decode($sort);
            	$sort[] = array('property'=>'package', 'direction'=>'ASC');
            	$sort = json_encode($sort);
            }
        $InstId  =  $this->input->get_post('instanceid', TRUE);
        if (strlen($InstId) > 0) {
            $objecttype= $this->m_objecttype->getRowsByInstance($InstId,$sort);
            $return = array(
                'success' =>  TRUE ,
                'data'    => $objecttype
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
        log_message('debug', 'OBJECTTYPE.getRowsByParent post : '.json_encode($this->input->post(NULL, FALSE)));
            $group = $this->input->get('group', FALSE); 
           $sort = $this->input->get('sort', FALSE);
           if(!$sort && $group) $sort = $group;
           if(!$sort || $group == $sort) 
            {
            	$sort = json_decode($sort);
            	$sort[] = array('property'=>'package', 'direction'=>'ASC');
            	$sort = json_encode($sort);
            }
        $ParentId  =  $this->input->get_post('parentid', TRUE);
        if (strlen($ParentId) > 0) {
            $objecttype= $this->m_objecttype->getRowsByParent($ParentId,$sort);
            $return = array(
                'success' => TRUE,
                'data'    => $objecttype
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
        log_message('debug', 'OBJECTTYPE.deleteRow post : '.json_encode($this->input->post(NULL, FALSE)));
        $tempId  =  $this->input->get_post('objecttypeid', TRUE);
        if (strlen($tempId) > 0) {
            $return = $this->m_objecttype->deleteRow($tempId);
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
        $this->load->model('M_objecttype', 'm_objecttype');
    }
}
?>
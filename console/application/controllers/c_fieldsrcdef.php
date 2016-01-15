<?php
	 class C_fieldsrcdef extends CI_Controller {
    function __construct() {
         parent::__construct();
        $this->_loadModels();
    }
    function setRow() {
          log_message('debug', 'FIELDSRCDEF.setRow post : '.json_encode($this->input->post(NULL, FALSE)));
          log_message('debug', 'FIELDSRCDEF.getRows get : '.json_encode($this->input->get(NULL, FALSE)));
          $data = array(
                'fieldsrcdefid' =>  $this->input->get_post('fieldsrcdefid', TRUE)
                ,'instanceid' =>  $this->input->get_post('instanceid', TRUE)
                ,'parentid' =>  $this->input->get_post('parentid', TRUE)
                ,'provider' =>   $this->input->get_post('provider', TRUE)
                ,'connectionstring' =>   $this->input->get_post('connectionstring', TRUE)
                ,'datasource' =>   $this->input->get_post('datasource', TRUE)
                ,'idfield' =>   $this->input->get_post('idfield', TRUE)
                ,'briefstring' =>   $this->input->get_post('briefstring', TRUE)
                ,'filterstring' =>   $this->input->get_post('filterstring', TRUE)
                ,'sortfield' =>   $this->input->get_post('sortfield', TRUE)
                ,'descriptionstring' =>   $this->input->get_post('descriptionstring', TRUE)
                ,'dontshowdialog' =>   $this->input->get_post('dontshowdialog', TRUE)
            );
            $fieldsrcdef = $this->m_fieldsrcdef->setRow($data);
            print json_encode($fieldsrcdef);
    }
    function newRow() {
            log_message('debug', 'FIELDSRCDEF.newRow post : '.json_encode($this->input->post(NULL, FALSE)));
          $data = array(
                'fieldsrcdefid' =>  $this->input->get_post('fieldsrcdefid', TRUE)
                ,'instanceid' =>  $this->input->get_post('instanceid', TRUE)
                ,'parentid' =>  $this->input->get_post('parentid', TRUE)
                ,'provider' =>   $this->input->get_post('provider', TRUE)
                ,'connectionstring' =>   $this->input->get_post('connectionstring', TRUE)
                ,'datasource' =>   $this->input->get_post('datasource', TRUE)
                ,'idfield' =>   $this->input->get_post('idfield', TRUE)
                ,'briefstring' =>   $this->input->get_post('briefstring', TRUE)
                ,'filterstring' =>   $this->input->get_post('filterstring', TRUE)
                ,'sortfield' =>   $this->input->get_post('sortfield', TRUE)
                ,'descriptionstring' =>   $this->input->get_post('descriptionstring', TRUE)
                ,'dontshowdialog' =>   $this->input->get_post('dontshowdialog', TRUE)
            );
                $instanceid =  $this->input->get_post('instanceid', TRUE);
                $parentid =  $this->input->get_post('parentid', TRUE);
            $fieldsrcdef= $this->m_fieldsrcdef->newRow($instanceid,$parentid,$data);
            $return = $fieldsrcdef;
            print json_encode($return);
    }
    function getRow() {
        log_message('debug', 'FIELDSRCDEF.getRow post : '.json_encode($this->input->post(NULL, FALSE)));
        $empId  =  $this->input->get_post('id', TRUE);
        if (isset($empId)) {
            $fieldsrcdef = $this->m_fieldsrcdef->getRow($empId);
            $return = array(
                'success' => true,
                'data'    => $fieldsrcdef
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
            	$sort[] = array('property'=>'datasource', 'direction'=>'ASC');
            	$sort = json_encode($sort);
            }
            $parentid=$this->input->get('parentid', FALSE);
            if(isset($parentid)){
                if($parentid!=''){
                    $fieldsrcdef= $this->m_fieldsrcdef->getRowsByParent($parentid,$sort);
                }else{
                    $fieldsrcdef= $this->m_fieldsrcdef->getRows($sort);
                }
            }else{
              $fieldsrcdef= $this->m_fieldsrcdef->getRows($sort);
            }
            $return = array(
                'success' =>  TRUE ,
                'data'    => $fieldsrcdef
            );
        print json_encode($return);
    }
    function getRowsByInstance() {
        log_message('debug', 'FIELDSRCDEF.getRowsByInstance post : '.json_encode($this->input->post(NULL, FALSE)));
            $group = $this->input->get('group', FALSE); 
           $sort = $this->input->get('sort', FALSE);
           if(!$sort && $group) $sort = $group;
           if(!$sort || $group == $sort) 
            {
            	$sort = json_decode($sort);
            	$sort[] = array('property'=>'datasource', 'direction'=>'ASC');
            	$sort = json_encode($sort);
            }
        $InstId  =  $this->input->get_post('instanceid', TRUE);
        if (strlen($InstId) > 0) {
            $fieldsrcdef= $this->m_fieldsrcdef->getRowsByInstance($InstId,$sort);
            $return = array(
                'success' =>  TRUE ,
                'data'    => $fieldsrcdef
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
        log_message('debug', 'FIELDSRCDEF.getRowsByParent post : '.json_encode($this->input->post(NULL, FALSE)));
            $group = $this->input->get('group', FALSE); 
           $sort = $this->input->get('sort', FALSE);
           if(!$sort && $group) $sort = $group;
           if(!$sort || $group == $sort) 
            {
            	$sort = json_decode($sort);
            	$sort[] = array('property'=>'datasource', 'direction'=>'ASC');
            	$sort = json_encode($sort);
            }
        $ParentId  =  $this->input->get_post('parentid', TRUE);
        if (strlen($ParentId) > 0) {
            $fieldsrcdef= $this->m_fieldsrcdef->getRowsByParent($ParentId,$sort);
            $return = array(
                'success' => TRUE,
                'data'    => $fieldsrcdef
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
        log_message('debug', 'FIELDSRCDEF.deleteRow post : '.json_encode($this->input->post(NULL, FALSE)));
        $tempId  =  $this->input->get_post('fieldsrcdefid', TRUE);
        if (strlen($tempId) > 0) {
            $return = $this->m_fieldsrcdef->deleteRow($tempId);
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
        $this->load->model('M_fieldsrcdef', 'm_fieldsrcdef');
    }
}
?>
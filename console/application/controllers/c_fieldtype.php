<?php
	 class C_fieldtype extends CI_Controller {
    function __construct() {
         parent::__construct();
        $this->_loadModels();
    }
    function setRow() {
          log_message('debug', 'FIELDTYPE.setRow post : '.json_encode($this->input->post(NULL, FALSE)));
          log_message('debug', 'FIELDTYPE.getRows get : '.json_encode($this->input->get(NULL, FALSE)));
          $data = array(
                'fieldtypeid' =>  $this->input->get_post('fieldtypeid', TRUE)
                ,'instanceid' =>  $this->input->get_post('instanceid', TRUE)
                ,'name' =>   $this->input->get_post('name', TRUE)
                ,'typestyle' =>   $this->input->get_post('typestyle', TRUE)
                ,'the_comment' =>   $this->input->get_post('the_comment', TRUE)
                ,'allowsize' =>   $this->input->get_post('allowsize', TRUE)
                ,'minimum' =>   $this->input->get_post('minimum', TRUE)
                ,'maximum' =>   $this->input->get_post('maximum', TRUE)
                ,'allowlikesearch' =>   $this->input->get_post('allowlikesearch', TRUE)
                ,'gridsorttype' =>   $this->input->get_post('gridsorttype', TRUE)
                ,'delayedsave' =>   $this->input->get_post('delayedsave', TRUE)
            );
            $fieldtype = $this->m_fieldtype->setRow($data);
            print json_encode($fieldtype);
    }
    function newRow() {
            log_message('debug', 'FIELDTYPE.newRow post : '.json_encode($this->input->post(NULL, FALSE)));
          $data = array(
                'fieldtypeid' =>  $this->input->get_post('fieldtypeid', TRUE)
                ,'instanceid' =>  $this->input->get_post('instanceid', TRUE)
                ,'name' =>   $this->input->get_post('name', TRUE)
                ,'typestyle' =>   $this->input->get_post('typestyle', TRUE)
                ,'the_comment' =>   $this->input->get_post('the_comment', TRUE)
                ,'allowsize' =>   $this->input->get_post('allowsize', TRUE)
                ,'minimum' =>   $this->input->get_post('minimum', TRUE)
                ,'maximum' =>   $this->input->get_post('maximum', TRUE)
                ,'allowlikesearch' =>   $this->input->get_post('allowlikesearch', TRUE)
                ,'gridsorttype' =>   $this->input->get_post('gridsorttype', TRUE)
                ,'delayedsave' =>   $this->input->get_post('delayedsave', TRUE)
            );
                $instanceid =  $this->input->get_post('instanceid', TRUE);
            $fieldtype= $this->m_fieldtype->newRow($instanceid,$data);
            $return = $fieldtype;
            print json_encode($return);
    }
    function getRow() {
        log_message('debug', 'FIELDTYPE.getRow post : '.json_encode($this->input->post(NULL, FALSE)));
        $empId  =  $this->input->get_post('id', TRUE);
        if (isset($empId)) {
            $fieldtype = $this->m_fieldtype->getRow($empId);
            $return = array(
                'success' => true,
                'data'    => $fieldtype
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
            $instanceid=$this->input->get('instanceid', FALSE);
            if(isset($instanceid)){
                if($instanceid!=''){
                    $fieldtype= $this->m_fieldtype->getRowsByInstance($instanceid,$sort);
                }else{
                    $fieldtype= $this->m_fieldtype->getRows($sort);
                }
            }else{
              $fieldtype= $this->m_fieldtype->getRows($sort);
            }
            $return = array(
                'success' =>  TRUE ,
                'data'    => $fieldtype
            );
        print json_encode($return);
    }
    function getRowsByInstance() {
        log_message('debug', 'FIELDTYPE.getRowsByInstance post : '.json_encode($this->input->post(NULL, FALSE)));
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
            $fieldtype= $this->m_fieldtype->getRowsByInstance($InstId,$sort);
            $return = array(
                'success' =>  TRUE ,
                'data'    => $fieldtype
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
        log_message('debug', 'FIELDTYPE.getRowsByParent post : '.json_encode($this->input->post(NULL, FALSE)));
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
            $fieldtype= $this->m_fieldtype->getRowsByParent($ParentId,$sort);
            $return = array(
                'success' => TRUE,
                'data'    => $fieldtype
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
        log_message('debug', 'FIELDTYPE.deleteRow post : '.json_encode($this->input->post(NULL, FALSE)));
        $tempId  =  $this->input->get_post('fieldtypeid', TRUE);
        if (strlen($tempId) > 0) {
            $return = $this->m_fieldtype->deleteRow($tempId);
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
        $this->load->model('M_fieldtype', 'm_fieldtype');
    }
}
?>
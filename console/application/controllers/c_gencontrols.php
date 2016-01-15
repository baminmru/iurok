<?php
	 class C_gencontrols extends CI_Controller {
    function __construct() {
         parent::__construct();
        $this->_loadModels();
    }
    function setRow() {
          log_message('debug', 'GENCONTROLS.setRow post : '.json_encode($this->input->post(NULL, FALSE)));
          log_message('debug', 'GENCONTROLS.getRows get : '.json_encode($this->input->get(NULL, FALSE)));
          $data = array(
                'gencontrolsid' =>  $this->input->get_post('gencontrolsid', TRUE)
                ,'instanceid' =>  $this->input->get_post('instanceid', TRUE)
                ,'parentid' =>  $this->input->get_post('parentid', TRUE)
                ,'controlprogid' =>   $this->input->get_post('controlprogid', TRUE)
                ,'controlclassid' =>   $this->input->get_post('controlclassid', TRUE)
                ,'versionmajor' =>   $this->input->get_post('versionmajor', TRUE)
                ,'versionminor' =>   $this->input->get_post('versionminor', TRUE)
            );
            $gencontrols = $this->m_gencontrols->setRow($data);
            print json_encode($gencontrols);
    }
    function newRow() {
            log_message('debug', 'GENCONTROLS.newRow post : '.json_encode($this->input->post(NULL, FALSE)));
          $data = array(
                'gencontrolsid' =>  $this->input->get_post('gencontrolsid', TRUE)
                ,'instanceid' =>  $this->input->get_post('instanceid', TRUE)
                ,'parentid' =>  $this->input->get_post('parentid', TRUE)
                ,'controlprogid' =>   $this->input->get_post('controlprogid', TRUE)
                ,'controlclassid' =>   $this->input->get_post('controlclassid', TRUE)
                ,'versionmajor' =>   $this->input->get_post('versionmajor', TRUE)
                ,'versionminor' =>   $this->input->get_post('versionminor', TRUE)
            );
                $instanceid =  $this->input->get_post('instanceid', TRUE);
                $parentid =  $this->input->get_post('parentid', TRUE);
            $gencontrols= $this->m_gencontrols->newRow($instanceid,$parentid,$data);
            $return = $gencontrols;
            print json_encode($return);
    }
    function getRow() {
        log_message('debug', 'GENCONTROLS.getRow post : '.json_encode($this->input->post(NULL, FALSE)));
        $empId  =  $this->input->get_post('id', TRUE);
        if (isset($empId)) {
            $gencontrols = $this->m_gencontrols->getRow($empId);
            $return = array(
                'success' => true,
                'data'    => $gencontrols
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
            	$sort[] = array('property'=>'controlprogid', 'direction'=>'ASC');
            	$sort = json_encode($sort);
            }
            $parentid=$this->input->get('parentid', FALSE);
            if(isset($parentid)){
                if($parentid!=''){
                    $gencontrols= $this->m_gencontrols->getRowsByParent($parentid,$sort);
                }else{
                    $gencontrols= $this->m_gencontrols->getRows($sort);
                }
            }else{
              $gencontrols= $this->m_gencontrols->getRows($sort);
            }
            $return = array(
                'success' =>  TRUE ,
                'data'    => $gencontrols
            );
        print json_encode($return);
    }
    function getRowsByInstance() {
        log_message('debug', 'GENCONTROLS.getRowsByInstance post : '.json_encode($this->input->post(NULL, FALSE)));
            $group = $this->input->get('group', FALSE); 
           $sort = $this->input->get('sort', FALSE);
           if(!$sort && $group) $sort = $group;
           if(!$sort || $group == $sort) 
            {
            	$sort = json_decode($sort);
            	$sort[] = array('property'=>'controlprogid', 'direction'=>'ASC');
            	$sort = json_encode($sort);
            }
        $InstId  =  $this->input->get_post('instanceid', TRUE);
        if (strlen($InstId) > 0) {
            $gencontrols= $this->m_gencontrols->getRowsByInstance($InstId,$sort);
            $return = array(
                'success' =>  TRUE ,
                'data'    => $gencontrols
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
        log_message('debug', 'GENCONTROLS.getRowsByParent post : '.json_encode($this->input->post(NULL, FALSE)));
            $group = $this->input->get('group', FALSE); 
           $sort = $this->input->get('sort', FALSE);
           if(!$sort && $group) $sort = $group;
           if(!$sort || $group == $sort) 
            {
            	$sort = json_decode($sort);
            	$sort[] = array('property'=>'controlprogid', 'direction'=>'ASC');
            	$sort = json_encode($sort);
            }
        $ParentId  =  $this->input->get_post('parentid', TRUE);
        if (strlen($ParentId) > 0) {
            $gencontrols= $this->m_gencontrols->getRowsByParent($ParentId,$sort);
            $return = array(
                'success' => TRUE,
                'data'    => $gencontrols
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
        log_message('debug', 'GENCONTROLS.deleteRow post : '.json_encode($this->input->post(NULL, FALSE)));
        $tempId  =  $this->input->get_post('gencontrolsid', TRUE);
        if (strlen($tempId) > 0) {
            $return = $this->m_gencontrols->deleteRow($tempId);
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
        $this->load->model('M_gencontrols', 'm_gencontrols');
    }
}
?>
﻿
    <?php
	 class C_v_autoiu_rcfg_def extends CI_Controller {
    function __construct() {
         parent::__construct();
        $this->_loadModels();
    }
    function newRow() {
            log_message('debug', 'AUTOiu_rcfg_def.newRow post : '.json_encode($this->input->post(NULL, FALSE)));
            $name  =  $this->input->get_post('name', TRUE);
            $objtype  =  $this->input->get_post('objtype', TRUE);
            $autoiu_rcfg_def= $this->m_v_autoiu_rcfg_def->newRow($name,$objtype);
            $return = $autoiu_rcfg_def;
            print json_encode($return);
    }
    function getRows() {
            log_message('debug', 'AUTOiu_rcfg_def.getRows post : '.json_encode($this->input->post(NULL, FALSE)));
           $start=$this->input->get('start', FALSE);
           $limit=$this->input->get('limit', FALSE);
       $group = $this->input->get('group', FALSE);  
      $sort = $this->input->get('sort', FALSE);
      if(!$sort && $group) $sort = $group;
      if(!$sort || $group == $sort) 
          {
              $sort = json_decode($sort);
              $sort[] = array('property'=>'iu_rcfg_def_therole', 'direction'=>'ASC');
              $sort = json_encode($sort);
          }
          $filter = $this->input->get('filter', FALSE);
           $autoiu_rcfg_def= $this->m_v_autoiu_rcfg_def->getRowsSL($start,$limit,$sort,$filter);
           print json_encode($autoiu_rcfg_def);
    }
    function deleteRow() {
        log_message('debug', 'AUTOiu_rcfg_def.deleteRow post : '.json_encode($this->input->post(NULL, FALSE)));
        $tempId  =  $this->input->get_post('instanceid', TRUE);
        if (strlen($tempId) > 0) {
            $return = $this->m_v_autoiu_rcfg_def->deleteRow($tempId);
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
        $this->load->model('M_v_autoiu_rcfg_def', 'm_v_autoiu_rcfg_def');
    }
}
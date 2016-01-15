
    <?php
	 class C_v_autoiu_tmdef extends CI_Controller {
    function __construct() {
         parent::__construct();
        $this->_loadModels();
    }
    function newRow() {
            log_message('debug', 'AUTOiu_tmdef.newRow post : '.json_encode($this->input->post(NULL, FALSE)));
            $name  =  $this->input->get_post('name', TRUE);
            $objtype  =  $this->input->get_post('objtype', TRUE);
            $autoiu_tmdef= $this->m_v_autoiu_tmdef->newRow($name,$objtype);
            $return = $autoiu_tmdef;
            print json_encode($return);
    }
    function getRows() {
            log_message('debug', 'AUTOiu_tmdef.getRows post : '.json_encode($this->input->post(NULL, FALSE)));
           $start=$this->input->get('start', FALSE);
           $limit=$this->input->get('limit', FALSE);
       $group = $this->input->get('group', FALSE);  
      $sort = $this->input->get('sort', FALSE);
	    $archived = $this->input->get('archived', FALSE);
	    if(!$archived) $archived=0;
      if(!$sort && $group) $sort = $group;
      if(!$sort || $group == $sort) 
          {
              $sort = json_decode($sort);
              $sort[] = array('property'=>'iu_tmdef_lastname', 'direction'=>'ASC');
              $sort = json_encode($sort);
          }
          $filter = $this->input->get('filter', FALSE);
           $autoiu_tmdef= $this->m_v_autoiu_tmdef->getRowsSL($start,$limit,$sort,$filter,$archived);
           print json_encode($autoiu_tmdef);
    }
    function deleteRow() {
        log_message('debug', 'AUTOiu_tmdef.deleteRow post : '.json_encode($this->input->post(NULL, FALSE)));
        $tempId  =  $this->input->get_post('instanceid', TRUE);
        if (strlen($tempId) > 0) {
            $return = $this->m_v_autoiu_tmdef->deleteRow($tempId);
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
        $this->load->model('M_v_autoiu_tmdef', 'm_v_autoiu_tmdef');
    }
}
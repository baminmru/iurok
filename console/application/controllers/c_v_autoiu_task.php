
    <?php
	 class C_v_autoiu_task extends CI_Controller {
    function __construct() {
         parent::__construct();
        $this->_loadModels();
    }
    function newRow() {
            log_message('debug', 'AUTOiu_task.newRow post : '.json_encode($this->input->post(NULL, FALSE)));
            $name  =  $this->input->get_post('name', TRUE);
            $objtype  =  $this->input->get_post('objtype', TRUE);
            $autoiu_task= $this->m_v_autoiu_task->newRow($name,$objtype);
            $return = $autoiu_task;
            print json_encode($return);
    }
    function getRows() {
            log_message('debug', 'AUTOiu_task.getRows post : '.json_encode($this->input->post(NULL, FALSE)));
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
              $sort[] = array('property'=>'iu_task_createdate', 'direction'=>'DESC');
              $sort = json_encode($sort);
          }
          $filter = $this->input->get('filter', FALSE);
           $autoiu_task= $this->m_v_autoiu_task->getRowsSL($start,$limit,$sort,$filter,$archived);
           print json_encode($autoiu_task);
    }
    function deleteRow() {
        log_message('debug', 'AUTOiu_task.deleteRow post : '.json_encode($this->input->post(NULL, FALSE)));
        $tempId  =  $this->input->get_post('instanceid', TRUE);
        if (strlen($tempId) > 0) {
            $return = $this->m_v_autoiu_task->deleteRow($tempId);
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
        $this->load->model('M_v_autoiu_task', 'm_v_autoiu_task');
    }
}
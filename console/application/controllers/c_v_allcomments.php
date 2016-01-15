
    <?php
	 class C_v_allcomments extends CI_Controller {
    function __construct() {
         parent::__construct();
		 log_message('debug', 'C_v_allcomments.construct');
        $this->_loadModels();
    }
   
    function getRows() {
            log_message('debug', 'allcomments.getRows post : '.json_encode($this->input->post(NULL, FALSE)));
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
		  $sort[] = array('property'=>'thedate', 'direction'=>'DESC');
		  $sort = json_encode($sort);
	  }
	  $filter = $this->input->get('filter', FALSE);
	   $autoiu_task= $this->m_v_allcomments->getRowsSL($start,$limit,$sort,$filter,$archived);
	   print json_encode($autoiu_task);
    }
   
    private function _loadModels () {
        $this->load->model('M_v_allcomments', 'm_v_allcomments');
    }
}
<?php if (!defined('BASEPATH')) exit('No direct script access allowed');
class Comment extends CI_Controller
{
	function __construct() {
         parent::__construct();
        $this->_loadModels();
    }
    public function index()
    {
	       $this->load->view('commentview');
    }
	
	 private function _loadModels () {
        $this->load->model('M_urokcard', 'm_urokcard');
    }
	
	 function getDef() {
        log_message('debug', 'iu_urok_def.getRowsByInstance post : '.json_encode($this->input->post(NULL, FALSE)));
            $group = $this->input->get('group', FALSE); 
           $sort = $this->input->get('sort', FALSE);
           if(!$sort && $group) $sort = $group;
           if(!$sort || $group == $sort) 
            {
            	$sort = json_decode($sort);
            	$sort[] = array('property'=>'ucode', 'direction'=>'ASC');
            	$sort = json_encode($sort);
            }
        $Id  =  $this->input->get_post('id', TRUE);
        if (strlen($Id) > 0) {
            $iu_urok_def= $this->m_urokcard->getDef($Id,$sort);
            $return = array(
                'success' =>  TRUE ,
                'data'    => $iu_urok_def
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
	
	function getDocs() {
           $group = $this->input->get('group', FALSE); 
           $sort = $this->input->get('sort', FALSE);
           if(!$sort && $group) $sort = $group;
           if(!$sort || $group == $sort) 
            {
            	$sort = json_decode($sort);
            	$sort[] = array('property'=>'doctype', 'direction'=>'ASC');
            	$sort = json_encode($sort);
            }
			$InstId  =  $this->input->get_post('instanceid', TRUE);
			if (strlen($InstId) > 0) {
				$iu_urok_docs= $this->m_urokcard->getDocs($InstId,$sort);
				$return = array(
					'success' =>  TRUE ,
					'data'    => $iu_urok_docs
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
	
	function getVideo() {
           $group = $this->input->get('group', FALSE); 
          // $sort = $this->input->get('sort', FALSE);
           //if(!$sort && $group) $sort = $group;
          // if(!$sort || $group == $sort) 
         //   {
          //  	$sort = json_decode($sort);
				$sort=array();
            	//$sort[] = array('property'=>'doctype', 'direction'=>'ASC');
				//$sort[] = array('property'=>'version', 'direction'=>'DESC');
				$sort[] = array('property'=>'iu_urok_video.adddate', 'direction'=>'DESC');
            	$sort = json_encode($sort);
         //   }
			$InstId  =  $this->input->get_post('instanceid', TRUE);
			if (strlen($InstId) > 0) {
				$iu_urok_docs= $this->m_urokcard->getVideo($InstId,$sort);
				$return = array(
					'success' =>  TRUE ,
					'data'    => $iu_urok_docs
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
	
	
	
	
	
	function getVideoCommentsHeader(){
		   $group = $this->input->get('group', FALSE); 
           $sort = $this->input->get('sort', FALSE);
           if(!$sort && $group) $sort = $group;
           if(!$sort || $group == $sort) 
            {
            	$sort = json_decode($sort);
            	$sort[] = array('property'=>'theprocess_grid', 'direction'=>'ASC');
            	$sort = json_encode($sort);
            }
		$Id  =  $this->input->get_post('videoid', TRUE);
        if (strlen($Id) > 0) {
            $iu_vc= $this->m_urokcard->getVideoCommentsHeader($Id,$sort);
            $return = array(
                'success' =>  TRUE ,
                'data'    => $iu_vc
            );
        }
        else {
            $return = array(
                'success' => FALSE,
                'msg'     => 'Need videoid to query.'
            );
        }
        print json_encode($return);
	}
	
	
	function getCommonComments(){
		
		$Id  =  $this->input->get_post('instanceid', TRUE);
		$curator  =  $this->input->get_post('curator', TRUE);
        if (strlen($Id) > 0) {
            $return= $this->m_urokcard->getCommonComments($Id,$curator );
           
        }
        else {
            $return = array(
                'success' => FALSE,
                'msg'     => 'Need id to query.'
            );
        }
        print json_encode($return);
	}
	
	function getVideoComments(){
		
		$Id  =  $this->input->get_post('instanceid', TRUE);
		$curator  =  $this->input->get_post('curator', TRUE);
        if (strlen($Id) > 0) {
            $return= $this->m_urokcard->getVideoComments($Id,$curator);
           
        }
        else {
            $return = array(
                'success' => FALSE,
                'msg'     => 'Need id to query.'
            );
        }
        print json_encode($return);
	}
}